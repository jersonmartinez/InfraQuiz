import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { useQuizHistory, useAchievements, useQuizProgress } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { getTopicEmoji } from './QuizSelection';
import Timer from '../components/Timer';
import Breadcrumb from '../components/Breadcrumb';
import { QuizQuestionSkeleton } from '../components/SkeletonLoader';
import { ArrowRight, RefreshCw, Home, CheckCircle, XCircle, Keyboard, Save, X, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const Quiz = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const { language, t } = useLanguage();
    const { questions, loading, error } = useQuiz(topic, language);
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

    // 1. Load saved progress
    useEffect(() => {
        const savedProgress = getProgress(topic);
        if (savedProgress && questions.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const shouldResume = urlParams.get('resume') === 'true';

            if (shouldResume) {
                setCurrentQuestionIndex(savedProgress.currentQuestion || 0);
                setScore(savedProgress.score || 0);

                // Ensure answers is always an array
                const loadedAnswers = Array.isArray(savedProgress.answers) ? savedProgress.answers : [];
                setAnswers(loadedAnswers);

                setPausedTime(savedProgress.pausedTime || 0);
                // Don't set startTime here, we set it on start/resume

                // Check if the current question was already answered in the saved progress
                if (loadedAnswers.length > (savedProgress.currentQuestion || 0)) {
                    setIsAnswered(true);
                } else {
                    setIsAnswered(false);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic, questions.length]);

    // 2. Shuffle options when question changes
    useEffect(() => {
        if (questions.length > 0 && questions[currentQuestionIndex]) {
            const options = [...questions[currentQuestionIndex].options];
            // Simple shuffle
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            setShuffledOptions(options);

            // Reset selection state for new question
            // Only reset if we don't have an answer for this index yet (handled by separate effect for restoration)
            // We intentionally don't include answers in deps to avoid reshuffling on answer
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [currentQuestionIndex, questions]); // REMOVED answers.length to prevent reshuffle on click

    // 3. Restore selected option visual state if answered
    useEffect(() => {
        if (questions.length > 0 && answers.length > currentQuestionIndex && shuffledOptions.length > 0) {
            const savedAnswer = answers[currentQuestionIndex];
            if (savedAnswer) {
                const option = shuffledOptions.find(opt => opt.letter === savedAnswer.selectedOption);
                if (option) {
                    setSelectedOption(option);
                    setIsAnswered(true); // Reinforce answered state
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

    // Prevent leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!showResults && currentQuestionIndex > 0 && !isPaused && hasStarted) {
                e.preventDefault();
                e.returnValue = t('quiz.unsavedText');
                return e.returnValue;
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [showResults, currentQuestionIndex, isPaused, hasStarted, t]);

    const handleStart = () => {
        setHasStarted(true);
        setStartTime(Date.now());
    };

    const handleSaveProgress = () => {
        const currentTime = Date.now();
        const totalPausedTime = pausedTime + (currentTime - startTime);

        const progress = {
            currentQuestion: currentQuestionIndex,
            score,
            answers,
            totalQuestions: questions.length,
            pausedTime: totalPausedTime,
        };
        saveProgress(topic, progress);
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
            setPendingNavigation(-1); // Go back one step in history
            setShowSaveDialog(true);
        } else {
            navigate(-1);
        }
    };

    const handleRetry = () => {
        // Reset all quiz state without page reload
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

        // Safety check for answers array
        const currentAnswers = Array.isArray(answers) ? answers : [];

        setAnswers([...currentAnswers, {
            questionId: currentQuestion.id,
            correct: isCorrect,
            selectedOption: option.letter,
            correctOption: correctLetter,
        }]);
    };

    const handleNext = () => {
        if (isPaused || !hasStarted) return;
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            clearProgress(topic);
            const timeSpent = Math.floor((pausedTime + (Date.now() - startTime)) / 1000);
            const percentage = Math.round((score / questions.length) * 100);
            const quizResult = { topic, score, total: questions.length, percentage, timeSpent, answers };
            addQuizResult(quizResult);
            const newAchievements = checkAchievements(quizResult);
            if (newAchievements.length > 0) console.log('🎉 New achievements unlocked:', newAchievements);

            // Trigger confetti for good scores (70%+)
            if (percentage >= 70) {
                const duration = percentage >= 90 ? 3000 : 2000;
                const particleCount = percentage >= 90 ? 150 : 100;

                confetti({
                    particleCount,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
                });

                // Extra burst for excellent scores
                if (percentage >= 90) {
                    setTimeout(() => {
                        confetti({
                            particleCount: 100,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: ['#3b82f6', '#8b5cf6', '#10b981'],
                        });
                        confetti({
                            particleCount: 100,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: ['#f59e0b', '#ec4899', '#6366f1'],
                        });
                    }, 250);
                }
            }

            setShowResults(true);
        }
    };

    const renderText = (text) => {
        if (!text) return '';
        // Only replace truly problematic characters (replacement char and black diamond)
        // Do NOT remove \u{FE0F} as it's the Variation Selector-16 needed for emoji rendering
        const cleanText = text.replace(/[\u{FFFD}◆]/gu, '📝');
        return cleanText.split(/(`[^`]+`)/).map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                const code = part.slice(1, -1);
                return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">{code}</code>;
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
    if (error) return <div className="min-h-screen pt-24 text-center px-6"><h2 className="text-2xl font-bold text-red-500 mb-4">{t('quiz.error')}</h2><p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p><Link to="/quiz" className="px-6 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-lg transition-colors text-gray-900 dark:text-white border border-gray-200 dark:border-white/10">{t('quiz.backToSelection')}</Link></div>;
    if (questions.length === 0) return <div className="min-h-screen pt-24 text-center px-6"><h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500 mb-4">{t('quiz.noQuestions')}</h2><p className="text-gray-600 dark:text-gray-400 mb-8">{t('quiz.noQuestionsText')}</p><Link to="/quiz" className="px-6 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-lg transition-colors text-gray-900 dark:text-white border border-gray-200 dark:border-white/10">{t('quiz.backToSelection')}</Link></div>;

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];

    if (showResults) {
        return (
            <div className="min-h-screen pt-24 px-6 pb-12 flex items-center justify-center">
                <div className="glass-panel p-8 rounded-2xl max-w-2xl w-full text-center bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <h2 className="text-3xl font-bold mb-6">{t('quiz.completedTitle')}</h2>
                    <div className="mb-8">
                        <div className="text-6xl font-bold text-gradient mb-2">{Math.round((score / questions.length) * 100)}%</div>
                        <p className="text-gray-600 dark:text-gray-400">{t('quiz.correctText').replace('{score}', score).replace('{total}', questions.length)}</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button onClick={handleRetry} className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"><RefreshCw size={20} /> {t('quiz.tryAgain')}</button>
                        <Link to="/quiz" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-xl transition-colors text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"><Home size={20} /> {t('quiz.otherQuizzes')}</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 relative">
            <div className="max-w-3xl mx-auto">
                <Breadcrumb items={[{ label: t('quiz.back'), href: '/quiz' }, { label: topic }]} onBack={handleBack} />
                <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-400"><Keyboard size={16} /><span>{t('quiz.keyboardHint')}</span></div>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider text-sm flex items-center gap-2"><span className="text-2xl">{getTopicEmoji(topic)}</span>{topic} Quiz</span>
                    <div className="flex items-center gap-4">
                        <Timer startTime={startTime} isActive={!showResults && !isPaused && hasStarted} pausedTime={pausedTime} />
                        {!isPaused && hasStarted ? (
                            <button onClick={() => setShowSaveDialog(true)} className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-lg transition-colors text-gray-900 dark:text-white border border-gray-200 dark:border-white/10" title={t('quiz.save')}><Save size={16} />{t('quiz.save')}</button>
                        ) : isPaused ? (
                            <button onClick={handleResume} className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors" title={t('quiz.resume')}><Play size={16} />{t('quiz.resume')}</button>
                        ) : null}
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{currentQuestionIndex + 1} / {questions.length}</span>
                    </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-8 overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} /></div>

                <div className="relative">
                    {/* Blur Overlay for Start Screen */}
                    {!hasStarted && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-black/20 rounded-2xl">
                            <button
                                onClick={handleStart}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3 text-lg"
                            >
                                <Play size={24} fill="currentColor" />
                                {t('quiz.startOverlay')}
                            </button>
                        </div>
                    )}

                    <div className={`glass-panel p-6 md:p-8 rounded-2xl mb-6 transition-all duration-300 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 ${isPaused ? 'opacity-30 blur-sm pointer-events-none select-none' : ''}`}>
                        <h2 className="text-2xl font-semibold mb-8 leading-relaxed text-gray-900 dark:text-white">{renderText(currentQuestion.question)}</h2>
                        <div className="space-y-3">
                            {shuffledOptions.map((option, index) => {
                                const displayLetter = ['A', 'B', 'C', 'D'][index];
                                const isSelected = selectedOption?.letter === option.letter;
                                const isCorrect = option.letter === correctLetter;
                                let optionClass = "w-full p-4 rounded-xl text-left transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-between group text-gray-900 dark:text-white ";
                                if (isAnswered) {
                                    if (isSelected && isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/10 flex items-center justify-between ";
                                    else if (isSelected && !isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-red-500/50 bg-red-500/10 flex items-center justify-between ";
                                    else if (isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/10 flex items-center justify-between ";
                                    else optionClass += "opacity-50 ";
                                }
                                return (
                                    <button key={option.letter} onClick={() => handleOptionClick(option)} disabled={isAnswered || isPaused || !hasStarted} className={optionClass}>
                                        <span className="flex items-center gap-3"><span className="font-semibold text-gray-600 dark:text-gray-400">{displayLetter})</span><span>{renderText(option.text)}</span></span>
                                        {isAnswered && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                                        {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {isAnswered && !isPaused && hasStarted && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl"><h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">💡 {t('quiz.explanation')}</h3><div className="text-gray-700 dark:text-gray-300 leading-relaxed">{renderText(currentQuestion.explanation)}</div></div>
                        <div className="flex justify-end"><button onClick={handleNext} className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg">{currentQuestionIndex === questions.length - 1 ? t('quiz.finish') : t('quiz.next')}<ArrowRight size={20} /></button></div>
                    </div>
                )}

                {isAnswered && isPaused && hasStarted && (
                    <div className={`space-y-6 transition-all duration-300 ${isPaused ? 'opacity-30 blur-sm pointer-events-none select-none' : ''}`}>
                        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl"><h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">💡 {t('quiz.explanation')}</h3><div className="text-gray-300 leading-relaxed">{renderText(currentQuestion.explanation)}</div></div>
                        <div className="flex justify-end"><button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/10">{currentQuestionIndex === questions.length - 1 ? t('quiz.finish') : t('quiz.next')}<ArrowRight size={20} /></button></div>
                    </div>
                )}

                {/* Paused Overlay */}
                {isPaused && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
                        <div className="glass-panel p-8 rounded-2xl max-w-md mx-4 text-center bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                            <div className="mb-6">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Save size={40} className="text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t('quiz.pausedTitle')}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{t('quiz.pausedText')}</p>
                            </div>
                            <div className="space-y-3">
                                <button onClick={handleResume} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors font-semibold">
                                    <Play size={20} />
                                    {t('quiz.resumeBtn')}
                                </button>
                                <Link to="/quiz" className="block w-full px-6 py-4 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-xl transition-colors font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10">
                                    {t('quiz.backBtn')}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Dialog */}
                {showSaveDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="glass-panel p-6 rounded-2xl max-w-md mx-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('quiz.saveDialogTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('quiz.saveDialogText')}</p>
                            <div className="flex gap-3">
                                <button onClick={handleSaveProgress} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"><Save size={18} />{pendingNavigation ? t('quiz.saveExit') : t('quiz.savePause')}</button>
                                <button onClick={() => { setShowSaveDialog(false); setPendingNavigation(null); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-xl transition-colors text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"><X size={18} />{t('quiz.cancel')}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
