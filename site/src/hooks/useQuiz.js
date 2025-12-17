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
                // Construct path: /quizzes/terraform/en/questions1.md
                // Note: We might need to make 'questions1' dynamic later, but for now hardcode or pass as arg.
                // Let's try to fetch questions1.md by default.
                const path = `/quizzes/${topic}/${language}/questions1.md`;

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
