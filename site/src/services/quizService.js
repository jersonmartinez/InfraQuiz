import { parseQuizMarkdown } from '../utils/quizParser';

/**
 * Quiz Service - Handles all quiz-related data fetching and processing.
 */
export const quizService = {
    /**
     * Fetches and parses a quiz by topic and language.
     * @param {string} topic - The topic ID (e.g., 'docker')
     * @param {string} language - The language code (e.g., 'en')
     * @param {number} setNumber - The question set number (default 1)
     * @returns {Promise<Array>} - Array of parsed questions
     */
    async getQuiz(topic, language = 'en', setNumber = 1) {
        try {
            const path = `/quizzes/${topic}/${language}/questions${setNumber}.md`;
            const response = await fetch(path);

            if (!response.ok) {
                throw new Error(`Cloud not find quiz for ${topic} in ${language}`);
            }

            const text = await response.text();
            return parseQuizMarkdown(text);
        } catch (error) {
            console.error('QuizService.getQuiz error:', error);
            throw error;
        }
    },

    /**
     * Counts questions in a specific quiz file.
     * @param {string} topic - The topic ID
     * @param {string} language - The language code
     * @param {number} setNumber - The set number
     * @returns {Promise<number>} - Number of questions
     */
    async getQuestionCount(topic, language = 'en', setNumber = 1) {
        try {
            const path = `/quizzes/${topic}/${language}/questions${setNumber}.md`;
            const response = await fetch(path);

            if (!response.ok) return 0;

            const text = await response.text();
            const matches = text.match(/###\s+\d+\./g);
            return matches ? matches.length : 0;
        } catch (error) {
            return 0;
        }
    }
};
