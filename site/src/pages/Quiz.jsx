import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { useLanguage } from '../context/LanguageContext';
import { useQuizGame } from '../hooks/useQuizGame';
import { getTopicEmoji, getTopicName } from './QuizSelection';
import Timer from '../components/Timer';
import Breadcrumb from '../components/Breadcrumb';
import { QuizQuestionSkeleton } from '../components/SkeletonLoader';
import { ArrowRight, CheckCircle, XCircle, Keyboard, Save, Play, Layers, BookOpen, Eye, Search, Clock, Flag, PlayCircle } from 'lucide-react';

import { useQuizHistory } from '../hooks/useLocalStorage';
import { quizService } from '../services/quizService';

// Modular components
import QuizResults from '../components/quiz/QuizResults';
import { PausedOverlay, SaveDialog } from '../components/quiz/QuizOverlay';

const Quiz = () => {
    const { topic } = useParams();
    const [searchParams] = useSearchParams();
    const setNumber = parseInt(searchParams.get('set') || '1');
    const mode = searchParams.get('mode'); // 'study'
    const { language, setLanguage, t } = useLanguage();

    // Data Fetching
    const { questions: starndardQuestions, loading: standardLoading, error: standardError } = useQuiz(topic, language, setNumber);

    // Smart Study Logic
    const { history } = useQuizHistory();
    const [smartQuestions, setSmartQuestions] = React.useState([]);
    const [smartLoading, setSmartLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchSmartQuestions = async () => {
            if (mode !== 'smart') return;
            setSmartLoading(true);
            try {
                // Find missed questions from history
                const topicHistory = history.filter(h => h.topic === topic);
                const missedMap = new Map(); // set -> Set(ids)

                topicHistory.forEach(h => {
                    if (!h.set) return; // Skip if set is unknown
                    h.answers.forEach(a => {
                        if (!a.correct) {
                            if (!missedMap.has(h.set)) missedMap.set(h.set, new Set());
                            missedMap.get(h.set).add(a.questionId);
                        }
                    });
                });

                // Fetch necessary sets
                const setsToFetch = Array.from(missedMap.keys());
                const questionsMap = new Map(); // uniqueKey -> question

                await Promise.all(setsToFetch.map(async (setNum) => {
                    const setQuestions = await quizService.getQuiz(topic, language, setNum);
                    const targetIds = missedMap.get(setNum);
                    setQuestions.forEach(q => {
                        if (targetIds.has(q.id)) {
                            // Use a unique key to avoid duplicates if user missed same q multiple times
                            const key = `${setNum}-${q.id}`;
                            if (!questionsMap.has(key)) {
                                questionsMap.set(key, { ...q, explanation: `(Review) ${q.explanation}` });
                            }
                        }
                    });
                }));

                setSmartQuestions(Array.from(questionsMap.values()));
            } catch (err) {
                console.error("Failed to load smart questions", err);
            } finally {
                setSmartLoading(false);
            }
        };

        fetchSmartQuestions();
    }, [mode, topic, language, history]);

    const questions = mode === 'smart' ? smartQuestions : starndardQuestions;
    const loading = mode === 'smart' ? smartLoading : standardLoading;
    const error = mode === 'smart' ? (smartQuestions.length === 0 && !smartLoading ? "No questions found for Smart Study." : null) : standardError;

    // Game Logic
    const game = useQuizGame(topic, questions, setNumber);

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

    if (game.showResults) {
        return <QuizResults score={game.score} total={game.filteredQuestions.length} onRetry={game.handleRetry} answers={game.answers} questions={game.filteredQuestions} />;
    }

    if (mode === 'study') {
        const filteredStudy = questions.filter(q =>
            q.question.toLowerCase().includes(game.studySearch.toLowerCase()) ||
            q.explanation.toLowerCase().includes(game.studySearch.toLowerCase())
        );

        return (
            <div className="min-h-screen pt-24 px-6 pb-12 animate-fade-in relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div className="flex-grow">
                            <Breadcrumb items={[{ label: t('quiz.back'), href: '/quiz' }, { label: `${getTopicName(topic)} Study Guide` }]} onBack={game.handleBack} />
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
                                    value={game.studySearch}
                                    onChange={(e) => game.setStudySearch(e.target.value)}
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
                                <p className="text-gray-500 font-bold">No concepts found for "{game.studySearch}"</p>
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
                <Breadcrumb items={[{ label: t('quiz.back'), href: '/quiz' }, { label: `${getTopicName(topic)} - Set ${setNumber}` }]} onBack={game.handleBack} />

                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm flex items-center gap-2">
                        <span className="text-2xl">{getTopicEmoji(topic)}</span>
                        {getTopicName(topic)} Quiz (Set {setNumber})
                    </span>
                    <div className="flex items-center gap-4">
                        <Timer
                            startTime={game.startTime}
                            isActive={!game.showResults && !game.isPaused && game.hasStarted}
                            pausedTime={game.pausedTime}
                            limit={game.timeLimit}
                            onTimeUp={game.handleFinish}
                        />
                        {!game.isPaused && game.hasStarted && (
                            <button onClick={() => game.setShowSaveDialog(true)} className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10" title={t('quiz.save')}>
                                <Save size={16} />{t('quiz.save')}
                            </button>
                        )}
                        <button
                            onClick={() => game.setIsFlashcardMode(!game.isFlashcardMode)}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all ${game.isFlashcardMode ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20'}`}
                            title={game.isFlashcardMode ? 'Switch to Quiz Mode' : 'Switch to Flashcard Mode'}
                        >
                            <BookOpen size={16} />
                            <span className="hidden sm:inline">{game.isFlashcardMode ? 'Flashcards' : 'Quiz Mode'}</span>
                        </button>
                        <button
                            onClick={() => {
                                if (game.timeLimit === 0) game.setTimeLimit(600); // 10 mins
                                else game.setTimeLimit(0);
                            }}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all ${game.timeLimit > 0 ? 'bg-orange-600 text-white border-orange-500 shadow-lg' : 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20'}`}
                            title={game.timeLimit > 0 ? 'Disable Timer' : 'Enable 10-Minute Challenge'}
                        >
                            <Clock size={16} />
                            <span className="hidden sm:inline">{game.timeLimit > 0 ? 'Timed' : 'Challenge'}</span>
                        </button>
                        {game.isPaused && (
                            <button
                                onClick={game.handleResume}
                                className="p-2 ml-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg transition-colors"
                                title="Resume"
                                aria-label="Resume Quiz"
                            >
                                <PlayCircle size={20} />
                            </button>
                        )}
                        {!game.isPaused && game.hasStarted && (
                            <button
                                onClick={game.toggleMark}
                                className={`p-2 ml-2 rounded-lg transition-colors ${game.markedQuestions.has(game.currentQuestionIndex)
                                    ? 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30'
                                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                                    }`}
                                title="Mark for Review"
                                aria-label={game.markedQuestions.has(game.currentQuestionIndex) ? "Unmark Question" : "Mark Question for Review"}
                            >
                                <Flag size={20} fill={game.markedQuestions.has(game.currentQuestionIndex) ? "currentColor" : "none"} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${game.progressPercentage}%` }} />
                </div>

                <div className="relative">
                    {!game.hasStarted && (
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
                                                onClick={() => game.setDifficultyFilter(d)}
                                                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${game.difficultyFilter === d ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
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
                                                onClick={() => game.setTimeLimit(t)}
                                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${game.timeLimit === t ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
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
                                                onClick={() => game.setQuestionLimit(q)}
                                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${game.questionLimit === q ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                {q === 'all' ? 'All' : 'Quick 10'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button onClick={game.handleStart} className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3 text-lg mb-4">
                                <Play size={24} fill="currentColor" /> {t('quiz.startOverlay')}
                            </button>

                            <p className="text-gray-500 text-sm">{game.filteredQuestions.length} Questions Available</p>
                        </div>
                    )}

                    <div className={`glass-panel p-6 md:p-8 rounded-2xl mb-6 transition-all duration-300 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 ${game.isPaused ? 'opacity-30 blur-sm pointer-events-none' : ''}`}>
                        {game.currentQuestion ? (
                            <>
                                <h2 className="text-2xl font-semibold mb-8 leading-relaxed text-gray-900 dark:text-white flex gap-3">
                                    <span className="flex items-center gap-2 text-blue-500">
                                        {game.currentQuestion.id}.
                                        {game.markedQuestions.has(game.currentQuestionIndex) && (
                                            <Flag size={24} className="text-orange-500" fill="currentColor" />
                                        )}
                                    </span>
                                    {renderText(game.currentQuestion.question)}
                                </h2>

                                <div className="space-y-3">
                                    {game.isFlashcardMode ? (
                                        !game.isRevealed ? (
                                            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl animate-fade-in text-center">
                                                <Eye size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                                                <button
                                                    onClick={() => game.setIsRevealed(true)}
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
                                                        {game.currentQuestion.correctAnswer}
                                                    </p>
                                                </div>

                                                {!game.isAnswered && (
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => game.handleFlashcardClick(true)}
                                                            className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <CheckCircle size={20} /> I knew it!
                                                        </button>
                                                        <button
                                                            onClick={() => game.handleFlashcardClick(false)}
                                                            className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <XCircle size={20} /> I missed it
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    ) : (
                                        game.shuffledOptions.map((option, index) => {
                                            const displayLetter = ['A', 'B', 'C', 'D'][index];
                                            const isSelected = game.selectedOption?.letter === option.letter;
                                            const correctLetter = game.currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
                                            const isCorrect = option.letter === correctLetter;

                                            let optionClass = "w-full p-4 rounded-xl text-left transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-between text-gray-900 dark:text-white ";

                                            if (game.isAnswered) {
                                                if (isSelected && isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/10 flex items-center justify-between ";
                                                else if (isSelected && !isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-red-500/50 bg-red-500/10 flex items-center justify-between ";
                                                else if (isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/20 flex items-center justify-between ";
                                                else optionClass += "opacity-50 ";
                                            }

                                            return (
                                                <button
                                                    key={option.letter}
                                                    onClick={() => game.handleOptionClick(option)}
                                                    disabled={game.isAnswered || game.isPaused || !game.hasStarted}
                                                    className={optionClass}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span className="font-bold text-blue-500">{displayLetter}</span>
                                                        <span>{renderText(option.text)}</span>
                                                    </span>
                                                    {game.isAnswered && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                                                    {game.isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="py-20 text-center text-gray-400">
                                Loading question...
                            </div>
                        )}
                    </div>
                </div>

                {game.isAnswered && !game.isPaused && game.hasStarted && (
                    <div className="space-y-6 animate-slide-up">
                        <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-xl">
                            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">💡 {t('quiz.explanation')}</h3>
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed italic">{renderText(game.currentQuestion.explanation)}</div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={game.handleNext} className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg scale-105">
                                {game.currentQuestionIndex === game.filteredQuestions.length - 1 ? t('quiz.finish') : t('quiz.next')}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {game.isPaused && <PausedOverlay onResume={game.handleResume} />}
                {game.showSaveDialog && <SaveDialog onSave={game.handleSaveProgress} onCancel={() => { game.setShowSaveDialog(false); game.setPendingNavigation(null); }} isExiting={!!game.pendingNavigation} />}

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-widest">
                    <Keyboard size={14} />
                    <span>{t('quiz.keyboardHint')}</span>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
