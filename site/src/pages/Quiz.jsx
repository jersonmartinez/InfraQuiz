import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { useQuizHistory, useAchievements, useQuizProgress } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { getTopicEmoji, getTopicName } from './QuizSelection';
import Timer from '../components/Timer';
import Breadcrumb from '../components/Breadcrumb';
import { QuizQuestionSkeleton } from '../components/SkeletonLoader';
import { ArrowRight, CheckCircle, XCircle, Keyboard, Save, Play, Layers, BookOpen, Eye, Search, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

// Modular components
import QuizResults from '../components/quiz/QuizResults';
import { PausedOverlay, SaveDialog } from '../components/quiz/QuizOverlay';

const Quiz = () => {
    const { topic } = useParams();
    const [searchParams] = useSearchParams();
    const setNumber = parseInt(searchParams.get('set') || '1');
    const mode = searchParams.get('mode'); // 'study'
    const navigate = useNavigate();
    const { language, setLanguage, t } = useLanguage();
    const { questions, loading, error } = useQuiz(topic, language, setNumber);
    const { addQuizResult } = useQuizHistory();
    const { checkAchievements } = useAchievements();
    const { saveProgress, getProgress, clearProgress } = useQuizProgress();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [answers, setAnswers] = useState([]);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [pausedTime, setPausedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [isFlashcardMode, setIsFlashcardMode] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [timeLimit, setTimeLimit] = useState(0); // 0 = no limit
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [questionLimit, setQuestionLimit] = useState('all'); // 'all' or '10'
    const [studySearch, setStudySearch] = useState('');

    const filteredQuestions = useMemo(() => {
        let qs = difficultyFilter === 'all'
            ? questions
            : questions.filter(q => q.difficulty === difficultyFilter);

        if (questionLimit === '10') {
            return qs.slice(0, 10);
        }
        return qs;
    }, [questions, difficultyFilter, questionLimit]);

    // 1. Load saved progress
    useEffect(() => {
        const savedProgress = getProgress(topic);
        if (savedProgress && questions.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const shouldResume = urlParams.get('resume') === 'true';

            if (shouldResume) {
                setCurrentQuestionIndex(savedProgress.currentQuestion || 0);
                setScore(savedProgress.score || 0);
                const loadedAnswers = Array.isArray(savedProgress.answers) ? savedProgress.answers : [];
                setAnswers(loadedAnswers);
                setPausedTime(savedProgress.pausedTime || 0);
                if (loadedAnswers.length > (savedProgress.currentQuestion || 0)) {
                    setIsAnswered(true);
                } else {
                    setIsAnswered(false);
                }
            }
        }
    }, [topic, questions.length]);

    // 2. Shuffle options
    useEffect(() => {
        if (questions.length > 0 && questions[currentQuestionIndex]) {
            const options = [...questions[currentQuestionIndex].options];
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            setShuffledOptions(options);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [currentQuestionIndex, questions]);

    // 3. Restore visual state
    useEffect(() => {
        if (questions.length > 0 && answers.length > currentQuestionIndex && shuffledOptions.length > 0) {
            const savedAnswer = answers[currentQuestionIndex];
            if (savedAnswer) {
                const option = shuffledOptions.find(opt => opt.letter === savedAnswer.selectedOption);
                if (option) {
                    setSelectedOption(option);
                    setIsAnswered(true);
                }
            }
        }
    }, [shuffledOptions, answers, currentQuestionIndex, questions.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (showResults || showSaveDialog || isPaused || !hasStarted) return;
            const key = e.key.toUpperCase();
            const keyIndex = ['A', 'B', 'C', 'D'].indexOf(key);

            if (keyIndex !== -1 && keyIndex < shuffledOptions.length && !isAnswered) {
                const option = shuffledOptions[keyIndex];
                if (option) handleOptionClick(option);
            }
            if (e.key === 'Enter' && isAnswered) handleNext();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [shuffledOptions, isAnswered, showResults, showSaveDialog, isPaused, currentQuestionIndex, score, answers, hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
        setStartTime(Date.now());
    };

    const handleSaveProgress = () => {
        const currentTime = Date.now();
        const totalPausedTime = pausedTime + (currentTime - startTime);
        saveProgress(topic, {
            currentQuestion: currentQuestionIndex,
            score,
            answers,
            totalQuestions: questions.length,
            pausedTime: totalPausedTime,
        });
        setShowSaveDialog(false);
        if (pendingNavigation) {
            navigate(pendingNavigation);
        } else {
            setIsPaused(true);
            setPausedTime(totalPausedTime);
        }
    };

    const handleResume = () => {
        setIsPaused(false);
        setStartTime(Date.now());
    };

    const handleBack = () => {
        if (!showResults && !isPaused && hasStarted && (currentQuestionIndex > 0 || answers.length > 0)) {
            setPendingNavigation(-1);
            setShowSaveDialog(true);
        } else {
            navigate(-1);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
        setAnswers([]);
        setStartTime(Date.now());
        setPausedTime(0);
        setIsPaused(false);
        setHasStarted(false);
        clearProgress(topic);
    };

    const handleOptionClick = (option) => {
        if (isAnswered || isPaused || !hasStarted) return;
        setSelectedOption(option);
        setIsAnswered(true);
        const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
        const isCorrect = option.letter === correctLetter;
        if (isCorrect) setScore(score + 1);
        setAnswers([...answers, {
            questionId: currentQuestion.id,
            correct: isCorrect,
            selectedOption: option.letter,
            correctOption: correctLetter,
        }]);
    };

    const handleFinish = () => {
        clearProgress(topic);
        const timeSpent = Math.floor((pausedTime + (Date.now() - startTime)) / 1000);
        const percentage = Math.round((score / questions.length) * 100);
        const quizResult = { topic, score, total: questions.length, percentage, timeSpent, answers };
        addQuizResult(quizResult);
        checkAchievements(quizResult);

        if (percentage >= 70) {
            confetti({
                particleCount: percentage >= 90 ? 150 : 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
            });
        }
        setShowResults(true);
    };

    const handleNext = () => {
        if (isPaused || !hasStarted) return;
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsRevealed(false);
        } else {
            handleFinish();
        }
    };

    const renderText = (text) => {
        if (!text) return '';
        const cleanText = text.replace(/[\u{FFFD}◆\u{25C6}\uD800-\uDFFF]/gu, '📝');
        return cleanText.split(/(`[^`]+`)/).map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    if (loading) return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-32 mb-4 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                </div>
                <QuizQuestionSkeleton />
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen pt-24 text-center px-6">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{t('quiz.error')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
            <Link to="/quiz" className="px-6 py-3 bg-white dark:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10">
                {t('quiz.backToSelection')}
            </Link>
        </div>
    );

    if (questions.length === 0) return (
        <div className="min-h-screen pt-24 text-center px-6">
            <div className="max-w-md mx-auto glass-panel p-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Layers className="text-yellow-500 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('quiz.noQuestions')}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Set {setNumber} for {getTopicName(topic)} might not be available in {language === 'es' ? 'Spanish' : 'English'} yet.
                </p>
                <div className="flex flex-col gap-3">
                    {language === 'es' && (
                        <button
                            onClick={() => {
                                setLanguage('en');
                                // The useEffect in useQuiz will trigger a re-fetch because 'language' changes
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                        >
                            Try in English
                        </button>
                    )}
                    {setNumber > 1 && (
                        <Link to={`/quiz/${topic}?set=1`} className="px-6 py-3 bg-white dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-bold border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20 transition-all">
                            Try Set 1
                        </Link>
                    )}
                    <Link to="/quiz" className="px-6 py-3 bg-white dark:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition-all">
                        {t('quiz.backToSelection')}
                    </Link>
                </div>
            </div>
        </div>
    );

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];

    if (showResults) {
        return <QuizResults score={score} total={filteredQuestions.length} onRetry={handleRetry} answers={answers} questions={filteredQuestions} />;
    }

    if (mode === 'study') {
        const filteredStudy = questions.filter(q =>
            q.question.toLowerCase().includes(studySearch.toLowerCase()) ||
            q.explanation.toLowerCase().includes(studySearch.toLowerCase())
        );

        return (
            <div className="min-h-screen pt-24 px-6 pb-12 animate-fade-in relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div className="flex-grow">
                            <Breadcrumb items={[{ label: t('quiz.back'), href: '/quiz' }, { label: `${getTopicName(topic)} Study Guide` }]} onBack={handleBack} />
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-4 tracking-tight">
                                {getTopicEmoji(topic)} {getTopicName(topic)}: <span className="text-blue-600">Explorer</span>
                            </h1>
                            <p className="text-gray-500 mt-2 font-medium">Master the concepts with detailed breakdowns.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search concepts..."
                                    value={studySearch}
                                    onChange={(e) => setStudySearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-64"
                                />
                            </div>
                            <Link to={`/quiz/${topic}`} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                                Take Quiz
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredStudy.length === 0 ? (
                            <div className="text-center py-20 glass-panel rounded-2xl">
                                <Search size={48} className="mx-auto mb-4 text-gray-300" />
                                <p className="text-gray-500 font-bold">No concepts found for "{studySearch}"</p>
                            </div>
                        ) : (
                            filteredStudy.map((q, idx) => (
                                <div key={q.id} className="glass-panel p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-blue-500/20 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">Concept #{idx + 1}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${q.difficulty === 'easy' ? 'bg-green-500/10 text-green-500' :
                                            q.difficulty === 'hard' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                            }`}>{q.difficulty}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">{renderText(q.question)}</h3>

                                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                                        {q.options.map(opt => {
                                            const isCorrect = opt.letter === q.correctAnswer.match(/^([A-D])\)/)?.[1];
                                            return (
                                                <div key={opt.letter} className={`p-4 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-gray-100 dark:border-white/5 opacity-40'} flex items-center gap-3 transition-opacity hover:opacity-100`}>
                                                    <span className={`font-bold ${isCorrect ? 'text-green-500' : 'text-gray-400'}`}>{opt.letter}</span>
                                                    <span className="text-xs text-gray-700 dark:text-gray-300 leading-snug">{renderText(opt.text)}</span>
                                                    {isCorrect && <CheckCircle size={14} className="text-green-500 ml-auto flex-shrink-0" />}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 rounded-xl italic text-gray-700 dark:text-gray-300 leading-relaxed shadow-inner">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                                            <span className="font-black text-xs text-blue-500 uppercase not-italic tracking-tighter">Deep Knowledge</span>
                                        </div>
                                        {renderText(q.explanation)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 relative animate-fade-in">
            <div className="max-w-3xl mx-auto">
                <Breadcrumb items={[{ label: t('quiz.back'), href: '/quiz' }, { label: `${getTopicName(topic)} - Set ${setNumber}` }]} onBack={handleBack} />

                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="text-2xl">{getTopicEmoji(topic)}</span>
                        {getTopicName(topic)} Quiz (Set {setNumber})
                    </span>
                    <div className="flex items-center gap-4">
                        <Timer
                            startTime={startTime}
                            isActive={!showResults && !isPaused && hasStarted}
                            pausedTime={pausedTime}
                            limit={timeLimit}
                            onTimeUp={handleFinish}
                        />
                        {!isPaused && hasStarted && (
                            <button onClick={() => setShowSaveDialog(true)} className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10" title={t('quiz.save')}>
                                <Save size={16} />{t('quiz.save')}
                            </button>
                        )}
                        <button
                            onClick={() => setIsFlashcardMode(!isFlashcardMode)}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all ${isFlashcardMode ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20'}`}
                            title={isFlashcardMode ? 'Switch to Quiz Mode' : 'Switch to Flashcard Mode'}
                        >
                            <BookOpen size={16} />
                            <span className="hidden sm:inline">{isFlashcardMode ? 'Flashcards' : 'Quiz Mode'}</span>
                        </button>
                        <button
                            onClick={() => {
                                if (timeLimit === 0) setTimeLimit(600); // 10 mins
                                else setTimeLimit(0);
                            }}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all ${timeLimit > 0 ? 'bg-orange-600 text-white border-orange-500 shadow-lg' : 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20'}`}
                            title={timeLimit > 0 ? 'Disable Timer' : 'Enable 10-Minute Challenge'}
                        >
                            <Clock size={16} />
                            <span className="hidden sm:inline">{timeLimit > 0 ? 'Timed' : 'Challenge'}</span>
                        </button>
                        {isPaused && (
                            <button onClick={handleResume} className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg transition-colors">
                                <Play size={16} />{t('quiz.resume')}
                            </button>
                        )}
                        <span className="text-gray-600 dark:text-gray-400 text-sm font-mono">{currentQuestionIndex + 1} / {filteredQuestions.length}</span>
                    </div>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${progress}%` }} />
                </div>

                <div className="relative">
                    {!hasStarted && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md bg-black/60 rounded-2xl animate-fade-in p-8 text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">{getTopicName(topic)}</h2>
                            <p className="text-gray-300 mb-8">Select your difficulty and challenge level</p>

                            <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm">
                                <div className="space-y-4 col-span-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">Difficulty</p>
                                    <div className="flex bg-white/10 p-1 rounded-xl w-full">
                                        {['all', 'easy', 'medium', 'hard'].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setDifficultyFilter(d)}
                                                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${difficultyFilter === d ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                {d === 'all' ? 'All' : d === 'easy' ? '🟢' : d === 'medium' ? '🟡' : '🔴'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">Time Limit</p>
                                    <div className="flex bg-white/10 p-1 rounded-xl w-full">
                                        {[0, 300, 600, 900].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setTimeLimit(t)}
                                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${timeLimit === t ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                {t === 0 ? 'Off' : `${t / 60}m`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">Length</p>
                                    <div className="flex bg-white/10 p-1 rounded-xl w-full">
                                        {['all', '10'].map(q => (
                                            <button
                                                key={q}
                                                onClick={() => setQuestionLimit(q)}
                                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${questionLimit === q ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                {q === 'all' ? 'All' : 'Quick 10'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleStart} className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3 text-lg mb-4">
                                <Play size={24} fill="currentColor" /> {t('quiz.startOverlay')}
                            </button>

                            <p className="text-gray-500 text-sm">{filteredQuestions.length} Questions Available</p>
                        </div>
                    )}

                    <div className={`glass-panel p-6 md:p-8 rounded-2xl mb-6 transition-all duration-300 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 ${isPaused ? 'opacity-30 blur-sm pointer-events-none' : ''}`}>
                        <h2 className="text-2xl font-semibold mb-8 leading-relaxed text-gray-900 dark:text-white">
                            {renderText(currentQuestion.question)}
                        </h2>

                        <div className="space-y-3">
                            {isFlashcardMode ? (
                                !isRevealed ? (
                                    <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl animate-fade-in text-center">
                                        <Eye size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                                        <button
                                            onClick={() => setIsRevealed(true)}
                                            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/25"
                                        >
                                            Show Answer
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                                            <p className="text-xs font-bold text-green-600 uppercase mb-2">Correct Answer</p>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                {currentQuestion.correctAnswer}
                                            </p>
                                        </div>

                                        {!isAnswered && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => {
                                                        const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
                                                        setScore(score + 1);
                                                        setAnswers([...answers, { questionId: currentQuestion.id, correct: true, selectedOption: correctLetter, correctOption: correctLetter }]);
                                                        setIsAnswered(true);
                                                    }}
                                                    className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle size={20} /> I knew it!
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
                                                        setAnswers([...answers, { questionId: currentQuestion.id, correct: false, selectedOption: 'Missed', correctOption: correctLetter }]);
                                                        setIsAnswered(true);
                                                    }}
                                                    className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                                >
                                                    <XCircle size={20} /> I missed it
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            ) : (
                                shuffledOptions.map((option, index) => {
                                    const displayLetter = ['A', 'B', 'C', 'D'][index];
                                    const isSelected = selectedOption?.letter === option.letter;
                                    const isCorrect = option.letter === correctLetter;

                                    let optionClass = "w-full p-4 rounded-xl text-left transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-between text-gray-900 dark:text-white ";

                                    if (isAnswered) {
                                        if (isSelected && isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/10 flex items-center justify-between ";
                                        else if (isSelected && !isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-red-500/50 bg-red-500/10 flex items-center justify-between ";
                                        else if (isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/20 flex items-center justify-between ";
                                        else optionClass += "opacity-50 ";
                                    }

                                    return (
                                        <button
                                            key={option.letter}
                                            onClick={() => handleOptionClick(option)}
                                            disabled={isAnswered || isPaused || !hasStarted}
                                            className={optionClass}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="font-bold text-blue-500">{displayLetter}</span>
                                                <span>{renderText(option.text)}</span>
                                            </span>
                                            {isAnswered && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                                            {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {isAnswered && !isPaused && hasStarted && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-xl">
                            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">💡 {t('quiz.explanation')}</h3>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed italic">{renderText(currentQuestion.explanation)}</div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleNext} className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg scale-105">
                                {currentQuestionIndex === filteredQuestions.length - 1 ? t('quiz.finish') : t('quiz.next')}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {isPaused && <PausedOverlay onResume={handleResume} />}
                {showSaveDialog && <SaveDialog onSave={handleSaveProgress} onCancel={() => { setShowSaveDialog(false); setPendingNavigation(null); }} isExiting={!!pendingNavigation} />}

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-widest">
                    <Keyboard size={14} />
                    <span>{t('quiz.keyboardHint')}</span>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
