import { useState, useEffect } from 'react';
import { quizService } from '../services/quizService';

export const useQuiz = (topic, language = 'en', setNumber = 1) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const parsedQuestions = await quizService.getQuiz(topic, language, setNumber);
                setQuestions(parsedQuestions);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (topic) {
            fetchQuiz();
        }
    }, [topic, language, setNumber]);

    return { questions, loading, error };
};
