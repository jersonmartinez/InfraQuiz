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
<<<<<<< HEAD
                const parsedQuestions = await quizService.getQuiz(topic, language, setNumber);
=======
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
>>>>>>> 36b37b2db629ea452b0386b18ac558026e296681
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
