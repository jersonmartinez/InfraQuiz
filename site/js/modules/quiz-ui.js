/**
 * Quiz UI Module
 * Handles DOM manipulation and UI updates
 */
(function () {
    window.InfraQuiz = window.InfraQuiz || {};

    // UI Constants
    const ELEMENTS = {
        loading: 'quizLoading',
        content: 'quizContent',
        error: 'quizError',
        results: 'resultsScreen',
        questionText: 'questionText',
        optionsContainer: 'optionsContainer',
        feedback: 'feedback',
        nextBtn: 'nextQuestionBtn',
        progress: 'progressIndicator',
        resultsContent: 'resultsContent'
    };

    function getElement(id) {
        return document.getElementById(id);
    }

    // Translations
    const TRANSLATIONS = {
        es: {
            explanation_label: 'Explicación',
            finish_quiz: 'Finalizar Quiz',
            next_question: 'Siguiente Pregunta',
            quiz_complete_title: '🎉 ¡Quiz Completado!',
            quiz_score_message: (score, total) => `¡Has obtenido ${score} de ${total} puntos!`,
            difficulty_beginner: 'Principiante',
            difficulty_intermediate: 'Intermedio',
            difficulty_advanced: 'Avanzado'
        },
        en: {
            explanation_label: 'Explanation',
            finish_quiz: 'Finish Quiz',
            next_question: 'Next Question',
            quiz_complete_title: '🎉 Quiz Completed!',
            quiz_score_message: (score, total) => `You scored ${score} out of ${total} questions!`,
            difficulty_beginner: 'Beginner',
            difficulty_intermediate: 'Intermediate',
            difficulty_advanced: 'Advanced'
        }
    };

    function getCurrentLanguage() {
        return window.InfraQuiz?.state?.language || 'es';
    }

    function showLoading(show) {
        const loadingDiv = getElement(ELEMENTS.loading);
        const errorDiv = getElement(ELEMENTS.error);
        const contentDiv = getElement(ELEMENTS.content);
        const resultsDiv = getElement(ELEMENTS.results);

        if (show) {
            if (loadingDiv) loadingDiv.style.display = 'block';
            if (errorDiv) errorDiv.style.display = 'none';
            if (contentDiv) contentDiv.style.display = 'none';
            if (resultsDiv) resultsDiv.style.display = 'none';
        } else {
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (errorDiv) errorDiv.style.display = 'none';
            if (contentDiv) contentDiv.style.display = 'block';
        }
    }

    function showError(message) {
        const errorScreen = getElement(ELEMENTS.error);
        const quizContent = getElement(ELEMENTS.content);
        const loadingScreen = getElement(ELEMENTS.loading);

        if (loadingScreen) loadingScreen.style.display = 'none';
        if (quizContent) quizContent.style.display = 'none';

        if (errorScreen) {
            errorScreen.style.display = 'block';
            errorScreen.innerHTML = `
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-8">
                            <div class="quiz-card text-center">
                                <div class="card-body">
                                    <div class="mb-4">
                                        <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
                                    </div>
                                    <h4 class="text-danger mb-3">Error</h4>
                                    <p class="text-muted mb-4">${message}</p>
                                    <button onclick="window.location.href='index.html'" class="btn btn-primary">
                                        <i class="bi bi-arrow-left me-2"></i>
                                        Back to Categories
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function renderProgressIndicator() {
        const progressIndicator = getElement(ELEMENTS.progress);
        if (!progressIndicator) return;

        const state = window.InfraQuiz.State.data;
        const currentLanguage = getCurrentLanguage();
        const translations = TRANSLATIONS;

        const questionProgressText = currentLanguage === 'es'
            ? `Pregunta ${state.currentQuestionIndex + 1} de ${state.totalQuestions}`
            : `Question ${state.currentQuestionIndex + 1} of ${state.totalQuestions}`;

        const scoreProgressText = currentLanguage === 'es'
            ? `Puntuación: ${state.score}/${state.totalQuestions}`
            : `Score: ${state.score}/${state.totalQuestions}`;

        const progressPercentage = ((state.currentQuestionIndex + 1) / state.totalQuestions) * 100;

        progressIndicator.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="mb-0 fw-bold">${questionProgressText}</h6>
                <span class="badge bg-primary">${scoreProgressText}</span>
            </div>
            <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar" style="width: ${progressPercentage}%" 
                     aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
        `;
    }

    function showQuestion() {
        const state = window.InfraQuiz.State.data;
        const question = window.InfraQuiz.State.getCurrentQuestion();

        if (!question) {
            showQuizResults();
            return;
        }

        const questionTextElement = getElement(ELEMENTS.questionText);
        const optionsContainer = getElement(ELEMENTS.optionsContainer);
        const feedbackElement = getElement(ELEMENTS.feedback);
        const nextButton = getElement(ELEMENTS.nextBtn);

        if (!questionTextElement || !optionsContainer) return;

        // Get emojis
        let displayEmoji = question.emoji || getCategoryEmoji('mixed');
        if (!displayEmoji || displayEmoji.length === 0) {
            displayEmoji = getQuestionEmoji(question.difficulty);
        }

        // Format text
        const formattedText = formatText(question.text);
        const difficultyBadge = getDifficultyBadge(question.difficulty);

        // Render Question
        questionTextElement.innerHTML = `
            <div class="d-flex align-items-start gap-3 mb-3 fade-in">
                <span class="question-emoji">${displayEmoji}</span>
                <div class="flex-grow-1">
                    <div class="question-text">${formattedText}</div>
                    <div class="mt-2">${difficultyBadge}</div>
                </div>
            </div>
        `;

        // Reset UI
        optionsContainer.innerHTML = '';
        if (feedbackElement) {
            feedbackElement.classList.add('d-none');
            feedbackElement.innerHTML = '';
        }
        if (nextButton) {
            nextButton.style.display = 'none';
        }

        // Render Options
        if (question.options && question.options.length > 0) {
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('button');
                optionElement.className = 'list-group-item list-group-item-action quiz-option';

                const optionLetter = option.letter || String.fromCharCode(65 + index);
                let optionText = option.text || '';
                let optionEmoji = option.emoji || '';

                // Extract emoji if not present but in text
                if (!optionEmoji && optionText) {
                    const { emoji, text } = window.InfraQuiz.Parser.extractEmojiAndText(optionText);
                    if (emoji) {
                        optionEmoji = emoji;
                        optionText = text;
                    }
                }

                const formattedOptionText = formatText(optionText);

                optionElement.innerHTML = `
                    <div class="d-flex align-items-start gap-3 fade-in" style="animation-delay: ${index * 0.1}s">
                        <span class="option-letter">${optionLetter}</span>
                        <div class="option-text">
                            ${optionEmoji ? `<span class="option-emoji">${optionEmoji}</span> ` : ''}
                            <span class="option-content">${formattedOptionText}</span>
                        </div>
                    </div>
                `;

                optionElement.addEventListener('click', () => selectOption(index, option.isCorrect));
                optionsContainer.appendChild(optionElement);
            });
        }

        renderProgressIndicator();
        showLoading(false);
    }

    function selectOption(selectedIndex, isCorrect) {
        const options = document.querySelectorAll('.quiz-option');
        const feedbackElement = getElement(ELEMENTS.feedback);
        const nextButton = getElement(ELEMENTS.nextBtn);
        const currentLanguage = getCurrentLanguage();
        const translations = TRANSLATIONS;

        const state = window.InfraQuiz.State.data;
        const question = window.InfraQuiz.State.getCurrentQuestion();

        // Disable options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            option.classList.remove('selected');
        });

        options[selectedIndex].classList.add('selected');

        // Show correct/incorrect
        question.options.forEach((option, index) => {
            options[index].classList.remove('correct', 'incorrect');
            if (option.isCorrect) {
                options[index].classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                options[index].classList.add('incorrect');
            }
        });

        // Update State
        window.InfraQuiz.State.addAnswer(isCorrect);

        // Show Feedback
        if (feedbackElement) {
            const explanationLabel = translations[currentLanguage]?.explanation_label || 'Explanation';
            let explanationHTML = '';

            if (question.explanation && question.explanation.trim()) {
                const renderedExplanation = formatText(question.explanation);
                explanationHTML = `
                    <div class="explanation-content-wrapper">
                        <strong>${explanationLabel}:</strong>
                        <div class="explanation-text">${renderedExplanation}</div>
                    </div>
                `;
            } else {
                const defaultMessage = isCorrect
                    ? (currentLanguage === 'es' ? '¡Correcto!' : 'Correct!')
                    : (currentLanguage === 'es' ? 'Incorrecto.' : 'Incorrect.');
                explanationHTML = `<div class="explanation-text">${defaultMessage}</div>`;
            }

            feedbackElement.innerHTML = `
                <div class="alert ${isCorrect ? 'alert-success' : 'alert-danger'} fade-in" style="padding: 0.75rem; margin-bottom: 0;">
                    ${explanationHTML}
                </div>
            `;
            feedbackElement.classList.remove('d-none');

            setTimeout(() => {
                feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }

        // Show Next Button
        if (nextButton) {
            const isLastQuestion = state.currentQuestionIndex === state.totalQuestions - 1;
            const nextButtonText = isLastQuestion
                ? (translations[currentLanguage]?.finish_quiz || 'Finish Quiz')
                : (translations[currentLanguage]?.next_question || 'Next Question');

            nextButton.innerHTML = `${nextButtonText} <i class="bi bi-arrow-right ms-2"></i>`;
            nextButton.style.display = 'inline-block';

            if (isLastQuestion) {
                nextButton.classList.remove('btn-primary');
                nextButton.classList.add('btn-success');
            } else {
                nextButton.classList.remove('btn-success');
                nextButton.classList.add('btn-primary');
            }
        }
    }

    function showQuizResults() {
        const quizContent = getElement(ELEMENTS.content);
        const resultsScreen = getElement(ELEMENTS.results);
        const resultsContent = getElement(ELEMENTS.resultsContent);
        const state = window.InfraQuiz.State.data;
        const currentLanguage = getCurrentLanguage();
        const translations = TRANSLATIONS;


        if (quizContent) quizContent.style.display = 'none';
        if (resultsScreen) resultsScreen.style.display = 'block';

        const percentage = Math.round((state.score / state.totalQuestions) * 100);

        const completedTitle = translations[currentLanguage]?.quiz_complete_title || '🎉 Quiz Completed!';
        const scoreMessage = translations[currentLanguage]?.quiz_score_message
            ? translations[currentLanguage].quiz_score_message(state.score, state.totalQuestions)
            : `You scored ${state.score} out of ${state.totalQuestions} questions!`;

        let performanceClass = 'text-danger';
        let performanceEmoji = '😔';
        let performanceMessage = '';

        if (percentage >= 90) {
            performanceClass = 'text-success';
            performanceEmoji = '🏆';
            performanceMessage = currentLanguage === 'es' ? '¡Excelente trabajo!' : 'Excellent work!';
        } else if (percentage >= 75) {
            performanceClass = 'text-info';
            performanceEmoji = '🎯';
            performanceMessage = currentLanguage === 'es' ? '¡Muy bien!' : 'Great job!';
        } else if (percentage >= 60) {
            performanceClass = 'text-warning';
            performanceEmoji = '📈';
            performanceMessage = currentLanguage === 'es' ? 'Buen esfuerzo' : 'Good effort';
        } else {
            performanceMessage = currentLanguage === 'es' ? 'Sigue practicando' : 'Keep practicing';
        }

        if (resultsContent) {
            resultsContent.innerHTML = `
                <div class="text-center">
                    <div class="score-percentage ${performanceClass} mb-3">${percentage}%</div>
                    <h2 class="mb-3">${completedTitle}</h2>
                    <p class="lead mb-4">${scoreMessage}</p>
                    <div class="performance-badge">
                        <span class="display-6">${performanceEmoji}</span>
                        <p class="mt-2 fw-bold ${performanceClass}">${performanceMessage}</p>
                    </div>
                </div>
            `;
        }
    }

    // Helper functions
    function formatText(text) {
        if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
            return marked.parse(text);
        } else if (typeof marked === 'function') {
            return marked(text);
        }
        return text;
    }

    function getQuestionEmoji(difficulty) {
        const emojis = { 'beginner': '🟢', 'intermediate': '🟡', 'advanced': '🔴' };
        return emojis[difficulty] || '🟢';
    }

    function getCategoryEmoji(category) {
        const categoryEmojis = {
            'bash': '🐚', 'python': '🐍', 'terraform': '🏗️', 'aws': '☁️',
            'docker': '🐳', 'kubernetes': '☸️', 'ansible': '🔧', 'github': '🐙',
            'cicd': '🔄', 'monitoring': '📊', 'security': '🛡️', 'networking': '🌐',
            'databases': '🗄️', 'mixed': '🔧'
        };
        return categoryEmojis[category] || '❓';
    }

    function getDifficultyBadge(difficulty) {
        const translations = TRANSLATIONS;
        const currentLanguage = getCurrentLanguage();

        const difficultyLabels = {
            'beginner': translations[currentLanguage]?.difficulty_beginner || 'Beginner',
            'intermediate': translations[currentLanguage]?.difficulty_intermediate || 'Intermediate',
            'advanced': translations[currentLanguage]?.difficulty_advanced || 'Advanced'
        };

        const badgeColors = {
            'beginner': 'success',
            'intermediate': 'warning',
            'advanced': 'danger'
        };

        return `<span class="badge bg-${badgeColors[difficulty]} difficulty-badge">${difficultyLabels[difficulty]}</span>`;
    }

    window.InfraQuiz.UI = {
        showLoading,
        showError,
        showQuestion,
        selectOption,
        showQuizResults,
        renderProgressIndicator
    };
})();
