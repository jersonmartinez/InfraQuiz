import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useQuizHistory, useAchievements, useQuizProgress, useBookmarks, useInfraPoints, useStreaks, useFailedQuestions } from './useLocalStorage';

export const useQuizGame = (topic, questions, setNumber) => {
    const navigate = useNavigate();
    const { addQuizResult } = useQuizHistory();
    const { checkAchievements } = useAchievements();
    const { saveProgress, getProgress, clearProgress } = useQuizProgress();
    const { toggleBookmark, isBookmarked } = useBookmarks();
    const { points, addPoints, spendPoints } = useInfraPoints();
    const { updateStreak } = useStreaks();
    const { addFailedQuestion } = useFailedQuestions();

    // Initial Progress Data
    const initialProgress = useMemo(() => {
        const resume = new URLSearchParams(window.location.search).get('resume') === 'true';
        const saved = getProgress(topic);
        return (resume && saved) ? saved : null;
    }, [topic, getProgress]);

    // Game State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => initialProgress?.currentQuestion || 0);
    const [showResults, setShowResults] = useState(false);
    const [startTime, setStartTime] = useState(() => Date.now());
    const [answers, setAnswers] = useState(() => initialProgress?.answers || []);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [pausedTime, setPausedTime] = useState(() => initialProgress?.pausedTime || 0);
    const [isPaused, setIsPaused] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);

    // Mode State
    const [isFlashcardMode, setIsFlashcardMode] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    // Filters & Limits
    const [timeLimit, setTimeLimit] = useState(0);
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [questionLimit, setQuestionLimit] = useState('all');
    const [studySearch, setStudySearch] = useState('');

    // Power-ups
    const [disabledOptions, setDisabledOptions] = useState(new Set());

    // Filtered Questions
    const filteredQuestions = useMemo(() => {
        let qs = difficultyFilter === 'all'
            ? questions
            : questions.filter(q => q.difficulty === difficultyFilter);

        if (questionLimit === '10') {
            return qs.slice(0, 10);
        }
        return qs;
    }, [questions, difficultyFilter, questionLimit]);

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const progressPercentage = filteredQuestions.length > 0 ? Math.round(((currentQuestionIndex) / filteredQuestions.length) * 100) : 0;

    // Derived Game State
    const score = useMemo(() => answers.filter(a => a.correct).length, [answers]);
    const currentAnswer = answers[currentQuestionIndex];
    const isAnswered = !!currentAnswer;

    // Shuffled Options (Deterministic based on question ID to satisfy purity)
    const shuffledOptions = useMemo(() => {
        if (!currentQuestion) return [];
        const options = [...currentQuestion.options];
        let seed = currentQuestion.id;
        for (let i = options.length - 1; i > 0; i--) {
            seed = (seed * 9301 + 49297) % 233280;
            const j = Math.floor((seed / 233280) * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    }, [currentQuestion]);

    const selectedOption = useMemo(() => {
        if (!currentAnswer) return null;
        return shuffledOptions.find(opt => opt.letter === currentAnswer.selectedOption) || null;
    }, [currentAnswer, shuffledOptions]);

    const handleStart = () => {
        setHasStarted(true);
        setStartTime(Date.now());
        setDisabledOptions(new Set());
    };

    const handleSaveProgress = () => {
        const currentTime = Date.now();
        const totalPausedTime = pausedTime + (currentTime - startTime);
        saveProgress(topic, {
            currentQuestion: currentQuestionIndex,
            score,
            answers,
            totalQuestions: filteredQuestions.length,
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
        setShowResults(false);
        setAnswers([]);
        setStartTime(Date.now());
        setPausedTime(0);
        setIsPaused(false);
        setHasStarted(false);
        setDisabledOptions(new Set());
        clearProgress(topic);
    };

    const handleOptionClick = useCallback((option) => {
        if (isAnswered || isPaused || !hasStarted || disabledOptions.has(option.letter)) return;
        const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
        const isCorrect = option.letter === correctLetter;

        if (isCorrect) {
            addPoints(10); // 10 points per correct answer
        } else {
            addFailedQuestion({ ...currentQuestion, topic }); // Save for flashcards
        }

        setAnswers([...answers, {
            questionId: currentQuestion.id,
            correct: isCorrect,
            selectedOption: option.letter,
            correctOption: correctLetter,
        }]);
    }, [isAnswered, isPaused, hasStarted, currentQuestion, answers, addPoints, disabledOptions, addFailedQuestion, topic]);

    const [markedQuestions, setMarkedQuestions] = useState(new Set());

    const toggleMark = () => {
        const newMarked = new Set(markedQuestions);
        if (newMarked.has(currentQuestionIndex)) {
            newMarked.delete(currentQuestionIndex);
        } else {
            newMarked.add(currentQuestionIndex);
        }
        setMarkedQuestions(newMarked);
    };

    const handleFinish = useCallback(() => {
        clearProgress(topic);
        const timeSpent = Math.floor((pausedTime + (Date.now() - startTime)) / 1000);
        const percentage = Math.round((score / filteredQuestions.length) * 100);
        const quizResult = {
            topic,
            score,
            total: filteredQuestions.length,
            percentage,
            timeSpent,
            answers,
            set: setNumber
        };
        addQuizResult(quizResult);
        checkAchievements(quizResult);
        updateStreak(); // Update streak on finish

        if (percentage >= 70) {
            confetti({
                particleCount: percentage >= 90 ? 150 : 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
            });
        }
        setShowResults(true);
    }, [topic, pausedTime, startTime, score, filteredQuestions.length, answers, setNumber, clearProgress, addQuizResult, checkAchievements, updateStreak]);

    const handleNext = useCallback(() => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setDisabledOptions(new Set());
        } else {
            handleFinish();
        }
    }, [currentQuestionIndex, filteredQuestions.length, handleFinish]);

    const handleFlashcardClick = (known) => {
        if (!isAnswered && !isPaused && hasStarted) {
            if (known) addPoints(10);
            setAnswers([...answers, {
                questionId: currentQuestion.id,
                correct: known,
                selectedOption: known ? 'known' : 'unknown',
                correctOption: 'known',
            }]);
        }
    };

    // Power-ups
    const handleUseFiftyFifty = () => {
        if (isAnswered || isPaused || !hasStarted || disabledOptions.size > 0) return;

        if (spendPoints(50)) { // 50 points for 50/50
            const correctLetter = currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
            const incorrectOptions = currentQuestion.options.filter(opt => opt.letter !== correctLetter);

            // Randomly pick two incorrect options to disable
            const toDisable = [...incorrectOptions]
                .sort(() => Math.random() - 0.5)
                .slice(0, 2)
                .map(opt => opt.letter);

            setDisabledOptions(new Set(toDisable));
        }
    };

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
    }, [shuffledOptions, isAnswered, showResults, showSaveDialog, isPaused, hasStarted, handleOptionClick, handleNext]);

    return {
        // State
        currentQuestionIndex,
        currentQuestion,
        filteredQuestions,
        selectedOption,
        isAnswered,
        score,
        showResults,
        shuffledOptions,
        startTime,
        answers,
        showSaveDialog,
        pausedTime,
        isPaused,
        hasStarted,
        isFlashcardMode,
        isRevealed,
        timeLimit,
        difficultyFilter,
        questionLimit,
        studySearch,
        progressPercentage,
        markedQuestions,
        points,
        isBookmarked: currentQuestion ? isBookmarked(currentQuestion.id) : false,
        disabledOptions,
        isFocusMode,

        // Setters
        setIsFlashcardMode,
        setIsRevealed,
        setStudySearch,
        setTimeLimit,
        setQuestionLimit,
        setDifficultyFilter,
        setShowSaveDialog,
        setPendingNavigation,
        setIsFocusMode,

        // Actions
        handleStart,
        handleSaveProgress,
        handleResume,
        handleBack,
        handleRetry,
        handleOptionClick,
        handleNext,
        handleFinish,
        handleFlashcardClick,
        toggleMark,
        handleToggleBookmark: () => currentQuestion && toggleBookmark(currentQuestion),
        handleUseFiftyFifty
    };
};
