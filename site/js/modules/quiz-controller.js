/**
 * Quiz Controller Module
 * Orchestrates the quiz flow using Parser, UI, and State modules
 */

export class QuizController {
    constructor() {
        this.config = {
            maxQuestions: 10
        };
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;
        console.log('🚀 Initializing quiz controller...');

        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const level = urlParams.get('level') || 'beginner';
        const language = urlParams.get('lang') || window.InfraQuiz?.state?.language || 'es';

        if (!category) {
            window.InfraQuiz.UI.showError('No quiz category selected.');
            return;
        }

        try {
            window.InfraQuiz.UI.showLoading(true);

            // Load content using QuizService
            const content = await window.InfraQuiz.QuizService.fetchQuizContent(category, language);

            // Parse content
            let questions = window.InfraQuiz.Parser.parseQuizContent(content);

            if (!questions || questions.length === 0) {
                throw new Error('No valid questions found in quiz file.');
            }

            // Filter by difficulty if needed
            if (level !== 'mixed' && level !== 'all') {
                const filtered = questions.filter(q => q.difficulty === level);
                if (filtered.length > 0) {
                    questions = filtered;
                } else {
                    console.warn(`No questions found for difficulty ${level}, using all questions.`);
                }
            }

            // Shuffle and limit
            questions = this.shuffleArray(questions);
            if (questions.length > this.config.maxQuestions) {
                questions = questions.slice(0, this.config.maxQuestions);
            }

            // Set State
            window.InfraQuiz.State.setQuiz(questions);

            // Setup Event Listeners
            this.setupEventListeners();

            // Show First Question
            window.InfraQuiz.UI.showQuestion();

            this.initialized = true;

        } catch (error) {
            console.error('❌ Error initializing quiz:', error);
            window.InfraQuiz.UI.showError(error.message);
        }
    }

    setupEventListeners() {
        // Next Button
        const nextBtn = document.getElementById('nextQuestionBtn');
        if (nextBtn) {
            // Remove old listeners by cloning
            const newBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newBtn, nextBtn);

            newBtn.addEventListener('click', () => {
                if (window.InfraQuiz.State.nextQuestion()) {
                    window.InfraQuiz.UI.showQuestion();
                } else {
                    window.InfraQuiz.UI.showQuizResults();
                }
            });
        }

        // Restart Button
        const restartBtn = document.getElementById('restartQuizBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                window.InfraQuiz.State.reset();
                window.InfraQuiz.UI.showLoading(false);
                window.InfraQuiz.UI.showQuestion();
            });
        }

        // Back Buttons
        const backButtons = document.querySelectorAll('#backToCategoriesBtn, #backToCategoriesFromResultsBtn, #errorBackToCategoriesBtn');
        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = 'index.html#quizzes';
            });
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleKeyboard(e) {
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.quiz-option');
            if (options[optionIndex] && !options[optionIndex].style.pointerEvents) {
                options[optionIndex].click();
            }
        } else if (e.key === 'Enter' || e.key === ' ') {
            const nextButton = document.getElementById('nextQuestionBtn');
            if (nextButton && nextButton.style.display !== 'none') {
                e.preventDefault();
                nextButton.click();
            }
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure dependencies are loaded
    if (window.InfraQuiz && window.InfraQuiz.Parser && window.InfraQuiz.UI && window.InfraQuiz.State) {
        const controller = new QuizController();
        controller.initialize();

        // Expose for debugging
        window.InfraQuiz.Controller = controller;
    } else {
        console.error('❌ Quiz dependencies not loaded. Waiting...');
        // Simple retry mechanism
        setTimeout(() => {
            if (window.InfraQuiz && window.InfraQuiz.Parser && window.InfraQuiz.UI && window.InfraQuiz.State) {
                const controller = new QuizController();
                controller.initialize();
                window.InfraQuiz.Controller = controller;
            }
        }, 500);
    }
});
