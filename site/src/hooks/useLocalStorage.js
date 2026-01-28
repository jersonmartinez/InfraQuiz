import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

export const useQuizHistory = () => {
    const [history, setHistory] = useLocalStorage('quizHistory', []);

    const addQuizResult = (result) => {
        setHistory((prev) => [{ ...result, id: Date.now(), date: new Date().toISOString() }, ...prev]);
    };

    const clearHistory = () => setHistory([]);
    const getTopicHistory = (topic) => history.filter((quiz) => quiz.topic === topic);

    const getStats = () => {
        if (history.length === 0) {
            return { totalQuizzes: 0, averageScore: 0, bestScore: 0, worstScore: 0, totalTimeSpent: 0, favoriteTopics: [], recentQuizzes: [], weakTopics: [] };
        }
        const scores = history.map((q) => q.percentage);
        const topicStats = {};

        history.forEach((quiz) => {
            if (!topicStats[quiz.topic]) {
                topicStats[quiz.topic] = { count: 0, totalScore: 0 };
            }
            topicStats[quiz.topic].count++;
            topicStats[quiz.topic].totalScore += quiz.percentage;
        });

        const favoriteTopics = Object.entries(topicStats)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 3)
            .map(([topic]) => topic);

        const weakTopics = Object.entries(topicStats)
            .filter(([, data]) => (data.totalScore / data.count) < 70)
            .map(([topic]) => topic);

        return {
            totalQuizzes: history.length,
            averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
            bestScore: Math.max(...scores),
            worstScore: Math.min(...scores),
            totalTimeSpent: history.reduce((sum, q) => sum + (q.timeSpent || 0), 0),
            favoriteTopics,
            weakTopics,
            recentQuizzes: history.slice(0, 5),
        };
    };

    return { history, addQuizResult, clearHistory, getTopicHistory, getStats };
};

export const useQuizProgress = () => {
    const [savedProgress, setSavedProgress] = useLocalStorage('quizProgress', {});

    const saveProgress = (topic, progress) => {
        setSavedProgress((prev) => ({ ...prev, [topic]: { ...progress, savedAt: new Date().toISOString() } }));
    };

    const getProgress = (topic) => savedProgress[topic] || null;

    const clearProgress = (topic) => {
        setSavedProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[topic];
            return newProgress;
        });
    };

    const hasProgress = (topic) => !!savedProgress[topic];

    return { savedProgress, saveProgress, getProgress, clearProgress, hasProgress };
};

export const useAchievements = () => {
    const [achievements, setAchievements] = useLocalStorage('achievements', {});
    const { history } = useQuizHistory();

    const checkAchievements = (quizResult) => {
        const newAchievements = { ...achievements };
        let unlocked = [];

        if (!newAchievements.first_quiz && history.length === 1) {
            newAchievements.first_quiz = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('first_quiz');
        }

        if (!newAchievements.perfectionist && quizResult.percentage === 100) {
            newAchievements.perfectionist = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('perfectionist');
        }

        const highScores = history.filter((q) => q.percentage >= 90).length;
        if (!newAchievements.master && highScores >= 5) {
            newAchievements.master = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('master');
        }

        const uniqueTopics = new Set(history.map((q) => q.topic));
        if (!newAchievements.polyglot && uniqueTopics.size >= 5) {
            newAchievements.polyglot = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('polyglot');
        }

        if (!newAchievements.speed_demon && quizResult.timeSpent < 300) {
            newAchievements.speed_demon = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('speed_demon');
        }

        const today = new Date().toDateString();
        const todayQuizzes = history.filter(q => new Date(q.date).toDateString() === today).length;
        if (!newAchievements.on_fire && todayQuizzes >= 3) {
            newAchievements.on_fire = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('on_fire');
        }

        const expertScores = history.filter((q) => q.percentage >= 95).length;
        if (!newAchievements.expert && expertScores >= 10) {
            newAchievements.expert = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('expert');
        }

        const topicBestScores = {};
        history.forEach(quiz => {
            if (!topicBestScores[quiz.topic] || quiz.percentage > topicBestScores[quiz.topic]) {
                topicBestScores[quiz.topic] = quiz.percentage;
            }
        });
        const allTopicsAbove90 = Object.values(topicBestScores).every(score => score >= 90);
        if (!newAchievements.legend && Object.keys(topicBestScores).length === 14 && allTopicsAbove90) {
            newAchievements.legend = { unlocked: true, date: new Date().toISOString() };
            unlocked.push('legend');
        }

        if (unlocked.length > 0) setAchievements(newAchievements);
        return unlocked;
    };

    return { achievements, checkAchievements };
};
