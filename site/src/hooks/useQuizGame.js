import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useQuizHistory, useAchievements, useQuizProgress } from './useLocalStorage';

export const useQuizGame = (topic, questions, setNumber) => {
    const navigate = useNavigate();
    const { addQuizResult } = useQuizHistory();
    const { checkAchievements } = useAchievements();
    const { saveProgress, getProgress, clearProgress } = useQuizProgress();

    // Game State
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

    // Mode State
    const [isFlashcardMode, setIsFlashcardMode] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    // Filters & Limits (kept in hook as they affect game flow)
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

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const progressPercentage = filteredQuestions.length > 0 ? Math.round(((currentQuestionIndex) / filteredQuestions.length) * 100) : 0;

    // 1. Load saved progress
    useEffect(() => {
        const savedProgress = getProgress(topic);
        if (savedProgress && questions.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const shouldResume = urlParams.get('resume') === 'true';

            if (shouldResume) {
                const savedIndex = savedProgress.currentQuestion || 0;
                if (savedIndex < questions.length) {
                    setCurrentQuestionIndex(savedIndex);
                    setScore(savedProgress.score || 0);
                    const loadedAnswers = Array.isArray(savedProgress.answers) ? savedProgress.answers : [];
                    setAnswers(loadedAnswers);
                    setPausedTime(savedProgress.pausedTime || 0);
                    if (loadedAnswers.length > savedIndex) {
                        setIsAnswered(true);
                    } else {
                        setIsAnswered(false);
                    }
                } else {
                    // Progress index is out of bounds (likely from a different set), reset to start
                    setCurrentQuestionIndex(0);
                    clearProgress(topic);
                }
            }
        }
    }, [topic, questions.length, getProgress]);

    // 2. Shuffle options
    useEffect(() => {
        if (filteredQuestions.length > 0 && filteredQuestions[currentQuestionIndex]) {
            const options = [...filteredQuestions[currentQuestionIndex].options];
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            setShuffledOptions(options);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [currentQuestionIndex, filteredQuestions]);

    // 3. Restore visual state
    useEffect(() => {
        if (filteredQuestions.length > 0 && answers.length > currentQuestionIndex && shuffledOptions.length > 0) {
            const savedAnswer = answers[currentQuestionIndex];
            if (savedAnswer) {
                const option = shuffledOptions.find(opt => opt.letter === savedAnswer.selectedOption);
                if (option) {
                    setSelectedOption(option);
                    setIsAnswered(true);
                }
            }
        }
    }, [shuffledOptions, answers, currentQuestionIndex, filteredQuestions.length]);

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

    const [markedQuestions, setMarkedQuestions] = useState(new Set());

    // ... (existing state)

    const toggleMark = () => {
        const newMarked = new Set(markedQuestions);
        if (newMarked.has(currentQuestionIndex)) {
            newMarked.delete(currentQuestionIndex);
        } else {
            newMarked.add(currentQuestionIndex);
        }
        setMarkedQuestions(newMarked);
    };

    const handleFinish = () => {
        clearProgress(topic);
        const timeSpent = Math.floor((pausedTime + (Date.now() - startTime)) / 1000);
        const percentage = Math.round((score / filteredQuestions.length) * 100);
        // Include 'set' in the result for Smart Study features
        const quizResult = {
            topic,
            score,
            total: filteredQuestions.length,
            percentage,
            timeSpent,
            answers,
            set: setNumber // Save the set number!
        };
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
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            handleFinish();
        }
    };

    const handleFlashcardClick = (known) => {
        if (!isAnswered && !isPaused && hasStarted) {
            setIsAnswered(true);
            if (known) setScore(score + 1);
            setAnswers([...answers, {
                questionId: currentQuestion.id,
                correct: known,
                selectedOption: known ? 'known' : 'unknown',
                correctOption: 'known',
            }]);
        }
    };

    // ... (existing functions)

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
        markedQuestions, // Exported

        // Setters
        setIsFlashcardMode,
        setIsRevealed,
        setStudySearch,
        setTimeLimit,
        setQuestionLimit,
        setDifficultyFilter,
        setShowSaveDialog,
        setPendingNavigation,

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
        toggleMark // Exported
    };
};
