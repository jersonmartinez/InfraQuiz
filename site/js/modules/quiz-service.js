/**
 * Quiz Service Module
 * Handles fetching and processing of quiz data
 */
(function () {
    const QuizService = {
        /**
         * Fetch quiz content for a specific category and language
         * @param {string} category - Quiz category (e.g., 'docker', 'aws')
         * @param {string} language - Language code ('en' or 'es')
         * @returns {Promise<string>} - Markdown content of the quiz
         */
        async fetchQuizContent(category, language = 'en') {
            console.log(`📥 QuizService: Fetching ${category} (${language})...`);

            // 1. Try using the centralized GitHub service if available
            if (window.InfraQuiz && window.InfraQuiz.github) {
                try {
                    return await window.InfraQuiz.github.fetchQuizContent(category, language);
                } catch (e) {
                    console.warn('QuizService: GitHub service failed, falling back to local fetch', e);
                }
            }

            // 2. Fallback to direct fetch strategies
            // 2. Fallback to direct fetch strategies
            const strategies = [
                // Strategy A: Root path (for production/GitHub Pages if served from root)
                `/quizzes/${category}/${language}/questions1.md`,
                // Strategy B: Relative path (for local dev or subfolder hosting)
                `../quizzes/${category}/${language}/questions1.md`,
                // Strategy C: Direct path (if site is root)
                `quizzes/${category}/${language}/questions1.md`
            ];

            for (const url of strategies) {
                try {
                    console.log(`QuizService: Trying ${url}...`);
                    const response = await fetch(url);
                    if (response.ok) {
                        const text = await response.text();
                        if (text && text.length > 0) {
                            console.log(`QuizService: Successfully loaded from ${url}`);
                            return text;
                        }
                    }
                } catch (e) {
                    // Continue to next strategy
                }
            }

            throw new Error(`Could not load quiz content for ${category} (${language})`);
        },

        /**
         * Get available categories
         * @returns {Promise<Array>} - List of category objects
         */
        async getCategories() {
            if (window.InfraQuiz && window.InfraQuiz.config && window.InfraQuiz.config.categories) {
                return window.InfraQuiz.config.categories;
            }

            try {
                const response = await fetch('config/categories.json');
                if (response.ok) {
                    return await response.json();
                }
            } catch (e) {
                console.warn('QuizService: Failed to load categories config', e);
            }

            return []; // Return empty if failed
        }
    };

    // Expose to global scope
    window.InfraQuiz = window.InfraQuiz || {};
    window.InfraQuiz.QuizService = QuizService;

    console.log('✅ QuizService module loaded');
})();
