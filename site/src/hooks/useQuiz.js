import { useState, useEffect } from 'react';
import { parseQuizMarkdown } from '../utils/quizParser';

export const useQuiz = (topic, language = 'en') => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                // Construct path with base URL from Vite config
                // import.meta.env.BASE_URL includes the base path (e.g., '/InfraQuiz/')
                const fileName = language === 'es' ? 'cuestionario1.md' : 'questions1.md';
                const path = `${import.meta.env.BASE_URL}quizzes/${topic}/${language}/${fileName}`;

                const response = await fetch(path);

                if (!response.ok) {
                    throw new Error(`Failed to load quiz for ${topic}`);
                }

                const text = await response.text();
                const parsedQuestions = parseQuizMarkdown(text);
                setQuestions(parsedQuestions);
                setError(null);
            } catch (err) {
                console.error('Error loading quiz:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (topic) {
            fetchQuiz();
        }
    }, [topic, language]);

    return { questions, loading, error };
};
