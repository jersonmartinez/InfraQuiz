function parseQuizContent(markdown) {
    console.log('📝 Parsing quiz content...');

    // Enhanced fallback parser - Use consistent parsing logic
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    let isInExplanation = false;
    let explanationText = '';

    // Enhanced regex patterns
    const questionPattern = /^###\s*\d+\.\s*(.+)/;
    const optionPattern = /^([A-D])\)\s*(.+)/;
    const answerPattern = /^\*\*(?:Respuesta correcta|Correct Answer)\*\*:\s*([A-D])\)/;
    const explanationPattern = /^>\s*(.+)/;

    console.log('🔍 Parsing patterns initialized');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines but preserve them in explanation
        if (!line) {
            if (isInExplanation) {
                explanationText += '\n';
            }
            continue;
        }

        // Question detection
        const questionMatch = line.match(questionPattern);
        if (questionMatch) {
            // Save previous question
            if (currentQuestion && currentOptions.length > 0) {
                currentQuestion.options = currentOptions;
                if (explanationText.trim()) {
                    currentQuestion.explanation = explanationText.trim();
                    console.log(`💡 Explanation for question: ${explanationText.substring(0, 50)}...`);
                } else {
                    console.log(`⚠️ No explanation found for question: ${currentQuestion.text.substring(0, 50)}...`);
                }
                questions.push(currentQuestion);
                console.log(`✅ Question saved: ${currentQuestion.text.substring(0, 50)}... (explanation: ${!!currentQuestion.explanation})`);
            }

            // Extract emoji and text from question
            const fullQuestionText = questionMatch[1];
            const { emoji, text, difficulty } = extractEmojiAndText(fullQuestionText);

            currentQuestion = {
                text: text,
                emoji: emoji,
                difficulty: difficulty || 'beginner',
                options: [],
                explanation: ''
            };

            currentOptions = [];
            isInExplanation = false;
            explanationText = '';
            console.log(`📋 Found question: ${text.substring(0, 50)}...`);
            continue;
        }

        // Option detection with emoji extraction
        const optionMatch = line.match(optionPattern);
        if (optionMatch && currentQuestion) {
            const letter = optionMatch[1];
            const fullOptionText = optionMatch[2];

            // Extract emoji from option text
            const { emoji, text } = extractEmojiAndText(fullOptionText);

            currentOptions.push({
                letter: letter,
                text: text,
                emoji: emoji,
                isCorrect: false
            });
            continue;
        }

        // Answer detection
        const answerMatch = line.match(answerPattern);
        if (answerMatch && currentOptions.length > 0) {
            const correctLetter = answerMatch[1];
            const correctOption = currentOptions.find(opt => opt.letter === correctLetter);
            if (correctOption) {
                correctOption.isCorrect = true;
                console.log(`✅ Correct answer marked: ${correctLetter} for question: ${currentQuestion.text.substring(0, 50)}...`);
            } else {
                console.warn(`⚠️ Could not find option with letter ${correctLetter} for question: ${currentQuestion.text.substring(0, 50)}...`);
            }
            continue;
        }

        // Explanation detection - FIXED: Better handling of multi-line explanations
        if (line.startsWith('>')) {
            if (!isInExplanation) {
                isInExplanation = true;
                explanationText = line.substring(1).trim();
                console.log(`💡 Found explanation start: ${explanationText.substring(0, 50)}...`);
            } else {
                // Continue existing explanation
                explanationText += ' ' + line.substring(1).trim();
                console.log(`💡 Continuing explanation: ${line.substring(1).trim().substring(0, 30)}...`);
            }
            continue;
        }

        // End explanation when we hit a new question or non-explanation content
        if (isInExplanation && !line.startsWith('>')) {
            // Check if this is the start of a new question
            if (line.match(questionPattern)) {
                isInExplanation = false;
                console.log(`💡 Explanation ended by new question: ${explanationText.substring(0, 50)}...`);
            } else {
                // End explanation for other content
                isInExplanation = false;
                console.log(`💡 Explanation ended by other content: ${explanationText.substring(0, 50)}...`);
            }
        }
    }

    // Save last question
    if (currentQuestion && currentOptions.length > 0) {
        currentQuestion.options = currentOptions;
        if (explanationText.trim()) {
            currentQuestion.explanation = explanationText.trim();
            console.log(`💡 Explanation for last question: ${explanationText.substring(0, 50)}...`);
        } else {
            console.log(`⚠️ No explanation found for last question: ${currentQuestion.text.substring(0, 50)}...`);
        }
        questions.push(currentQuestion);
        console.log(`✅ Last question saved: ${currentQuestion.text.substring(0, 50)}... (explanation: ${!!currentQuestion.explanation})`);
    }

    console.log(`✅ Parsed ${questions.length} questions with emojis`);

    // Log questions with explanations for debugging
    const questionsWithExplanations = questions.filter(q => q.explanation);
    console.log(`📊 Questions with explanations: ${questionsWithExplanations.length}/${questions.length}`);

    return questions;
}

/**
 * Extract emoji, text and difficulty from a text string
 */
function extractEmojiAndText(text) {
    if (!text) return { emoji: '', text: '', difficulty: 'beginner' };

    // Enhanced emoji pattern
    const emojiPattern = /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🔧|📝|⚙️|🛠️|💻|🖥️|📊|📈|📉|🔍|🔎|⭐|✨|💡|🎯|🚀|🔒|🔓|⚡|🌟|💯|📚|📖|🎓|🏆|✅|❌|⚠️|ℹ️|💭|🧠|🔗|🌐|📱|💾|🗄️|📂|📁|🔍|🔎|📝|✏️|📄|📋|📌|📍|🎨|🖼️|🖊️|✒️|🖋️|📐|📏|🔢|💰|💳|💎|🏅|🥇|🥈|🥉|🔄|📦)\s*/u;

    // Difficulty color emojis
    const difficultyPattern = /(🟢|🟡|🔴)/g;

    let emoji = '';
    let cleanText = text;
    let difficulty = 'beginner';

    // Extract main emoji (first one found)
    const emojiMatches = text.match(emojiPattern);
    if (emojiMatches && emojiMatches.length > 0) {
        emoji = emojiMatches[0];
    }

    // Extract difficulty from color emoji
    const difficultyMatches = text.match(difficultyPattern);
    if (difficultyMatches) {
        const colorEmoji = difficultyMatches[0];
        switch (colorEmoji) {
            case '🟢': difficulty = 'beginner'; break;
            case '🟡': difficulty = 'intermediate'; break;
            case '🔴': difficulty = 'advanced'; break;
        }
    }

    // Clean text by removing emojis
    cleanText = text.replace(emojiPattern, '').replace(difficultyPattern, '').trim();

    return { emoji, text: cleanText, difficulty };
}

// === QUIZ DISPLAY FUNCTIONS ===

function showLoading(isLoading) {
    const loadingElement = document.getElementById('quizLoading');
    const contentElement = document.getElementById('quizContent');

    if (loadingElement && contentElement) {
        loadingElement.style.display = isLoading ? 'block' : 'none';
        contentElement.style.display = isLoading ? 'none' : 'block';
    }
}

// === INITIALIZATION AND LANGUAGE SUPPORT ===

function applyQuizTranslations() {
    const currentLanguage = getCurrentLanguage();
    const translations = getTranslations();

    if (!translations[currentLanguage]) return;

    // Apply translations to elements with data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        const translation = translations[currentLanguage][key];

        if (translation) {
            if (typeof translation === 'function') {
                // For functions that need parameters, we'll handle them specifically
                return;
            }
            element.textContent = translation;
        }
    });

    // Update page language
    document.documentElement.lang = currentLanguage;
}

/**
 * Setup quiz navigation handlers
 */
function setupQuizNavigation() {
    // Back to categories button
    const backBtn = document.getElementById('backToCategoriesBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }

    // Back to categories from results button
    const backFromResultsBtn = document.getElementById('backToCategoriesFromResultsBtn');
    if (backFromResultsBtn) {
        backFromResultsBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }

    // Restart quiz button
    const restartBtn = document.getElementById('restartQuizBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function () {
            location.reload();
        });
    }

    // Next question button
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextQuestion();
        });
    }

    console.log('✅ Quiz navigation setup completed');
}

/**
 * Show loading state
 */
function showLoadingState() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'block';
    }
}

/**
 * Hide loading state
 */
function hideLoadingState() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

/**
 * Show error message
 */
function showError(message) {
    const errorScreen = document.getElementById('errorScreen');
    const quizContent = document.getElementById('quizContent');

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
                                    Volver a Categorías
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if (quizContent) {
        quizContent.style.display = 'none';
    }
}

function showLoading(show) {
    const loadingDiv = document.getElementById('quizLoading');
    const errorDiv = document.getElementById('quizError');
    const contentDiv = document.getElementById('quizContent');

    console.log(`🔄 showLoading(${show}) called`);

    if (show) {
        if (loadingDiv) {
            loadingDiv.style.display = 'block';
            console.log('📱 Loading screen shown');
        }
        if (errorDiv) {
            errorDiv.style.display = 'none';
            console.log('📱 Error screen hidden');
        }
        if (contentDiv) {
            contentDiv.style.display = 'none';
            console.log('📱 Quiz content hidden');
        }
    } else {
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
            console.log('📱 Loading screen hidden');
        }
        if (errorDiv) {
            errorDiv.style.display = 'none';
            console.log('📱 Error screen hidden');
        }
        if (contentDiv) {
            contentDiv.style.display = 'block';
            console.log('📱 Quiz content shown');
        }
    }

    // Apply translations
    applyQuizTranslations();
}

function renderProgressIndicator() {
    const progressIndicator = document.getElementById('progressIndicator');
    if (!progressIndicator || !currentQuiz) {
        console.warn('Progress indicator element not found or quiz not loaded');
        return;
    }

    const currentLanguage = getCurrentLanguage();
    const translations = getTranslations();

    // Verify consistency
    if (currentQuiz.length !== totalQuestions) {
        console.warn(`⚠️ Inconsistency in progress: currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
        totalQuestions = currentQuiz.length;
        console.log(`🔧 Corrected totalQuestions to ${totalQuestions}`);
    }

    const questionProgressText = currentLanguage === 'es'
        ? `Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`
        : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

    const scoreProgressText = currentLanguage === 'es'
        ? `Puntuación: ${score}/${totalQuestions}`
        : `Score: ${score}/${totalQuestions}`;

    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

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

    console.log(`📊 Progress updated: ${currentQuestionIndex + 1}/${totalQuestions}, Score: ${score}`);
}

function showQuestion() {
    console.log(`🔍 showQuestion called: currentQuestionIndex=${currentQuestionIndex}, currentQuiz.length=${currentQuiz?.length}, totalQuestions=${totalQuestions}`);

    // Verify quiz state consistency
    if (currentQuiz && currentQuiz.length !== totalQuestions) {
        console.warn(`⚠️ Inconsistency detected: currentQuiz.length=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
        totalQuestions = currentQuiz.length;
        console.log(`🔧 Corrected totalQuestions to ${totalQuestions}`);
    }

    if (!currentQuiz || currentQuestionIndex >= currentQuiz.length) {
        console.log('🏁 No more questions, showing results');
        console.log(`📊 Final stats: Score=${score}/${totalQuestions}, Questions shown=${currentQuestionIndex}`);
        showQuizResults();
        return;
    }

    const question = currentQuiz[currentQuestionIndex];
    const questionTextElement = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('nextQuestionBtn');

    if (!questionTextElement || !optionsContainer) {
        console.error('Required elements not found');
        return;
    }

    console.log('📝 Showing question:', {
        text: question.text?.substring(0, 50) + '...',
        emoji: question.emoji,
        difficulty: question.difficulty,
        optionsCount: question.options?.length,
        questionIndex: currentQuestionIndex + 1,
        totalQuestions: totalQuestions,
        hasExplanation: !!question.explanation,
        explanationLength: question.explanation ? question.explanation.length : 0
    });

    // Get question emoji - prioritize question.emoji, then difficulty-based
    let displayEmoji = question.emoji || getCategoryEmoji('mixed');
    if (!displayEmoji || displayEmoji.length === 0) {
        displayEmoji = getQuestionEmoji(question.difficulty);
    }

    // Format question text
    const formattedText = formatQuestionText(question.text);
    const difficultyBadge = getDifficultyBadge(question.difficulty);

    // Update question display with proper emoji positioning
    questionTextElement.innerHTML = `
        <div class="d-flex align-items-start gap-3 mb-3">
            <span class="question-emoji">${displayEmoji}</span>
            <div class="flex-grow-1">
                <div class="question-text">${formattedText}</div>
                <div class="mt-2">${difficultyBadge}</div>
            </div>
        </div>
    `;

    // Clear previous options and feedback
    optionsContainer.innerHTML = '';
    if (feedbackElement) {
        feedbackElement.classList.add('d-none');
        feedbackElement.innerHTML = '';
    }
    if (nextButton) {
        nextButton.style.display = 'none';
    }

    // Render options with emojis and better styling
    if (question.options && question.options.length > 0) {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'list-group-item list-group-item-action quiz-option';

            // Use option letter if available, otherwise generate one
            const optionLetter = option.letter || String.fromCharCode(65 + index);

            // Format option text with emoji
            let optionText = option.text || '';
            let optionEmoji = option.emoji || '';

            // If no emoji extracted but text starts with emoji, try to extract it
            if (!optionEmoji && optionText) {
                const emojiMatch = optionText.match(/^([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🔧|📝|⚙️|🛠️|💻|🖥️|📊|📈|📉|🔍|🔎|⭐|✨|💡|🎯|🚀|🔒|🔓|⚡|🌟|💯|📚|📖|🎓|🏆|✅|❌|⚠️|ℹ️|💭|🧠|🔗|🌐|📱|💾|🗄️|📂|📁|🔍|🔎|📝|✏️|📄|📋|📌|📍|🎨|🖼️|🖊️|✒️|🖋️|📐|📏|🔢|💰|💳|💎|🏅|🥇|🥈|🥉|🔄|📦)\s*/u);
                if (emojiMatch) {
                    optionEmoji = emojiMatch[1];
                    optionText = optionText.replace(emojiMatch[0], '').trim();
                }
            }

            // Format the final option text with Marked.js
            const formattedOptionText = formatOptionText(optionText);

            optionElement.innerHTML = `
                <div class="d-flex align-items-start gap-3">
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

        console.log(`✅ Rendered ${question.options.length} options with emojis`);
    } else {
        console.error('❌ No options found for question');
        optionsContainer.innerHTML = '<p class="text-danger">Error: No options available for this question.</p>';
    }

    // Update progress
    renderProgressIndicator();

    // Make sure quiz content is visible
    const quizContent = document.getElementById('quizContent');
    if (quizContent) {
        quizContent.style.display = 'block';
        console.log('✅ Quiz content displayed');
    }
}

function selectOption(selectedIndex, isCorrect) {
    console.log(`🎯 selectOption called: selectedIndex=${selectedIndex}, isCorrect=${isCorrect}`);
    console.log(`🎯 Current question options:`, currentQuiz[currentQuestionIndex].options.map((opt, idx) => ({
        index: idx,
        letter: opt.letter,
        text: opt.text.substring(0, 30) + '...',
        isCorrect: opt.isCorrect
    })));

    const options = document.querySelectorAll('.quiz-option');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('nextQuestionBtn');
    const currentLanguage = getCurrentLanguage();
    const translations = getTranslations();

    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        option.classList.remove('selected');
    });

    // Mark selected option
    options[selectedIndex].classList.add('selected');

    // Show correct/incorrect styling
    currentQuiz[currentQuestionIndex].options.forEach((option, index) => {
        // Clear any existing styling first
        options[index].classList.remove('correct', 'incorrect');

        if (option.isCorrect) {
            // Always show correct answer in green
            options[index].classList.add('correct');
            console.log(`🟢 Option ${index} (${option.letter}) marked as correct`);
        } else if (index === selectedIndex && !isCorrect) {
            // Show selected incorrect answer in red
            options[index].classList.add('incorrect');
            console.log(`🔴 Option ${index} (${option.letter}) marked as incorrect (selected wrong answer)`);
        }
    });

    // Update score
    if (isCorrect) {
        score++;
    }

    // Show feedback with explanation
    if (feedbackElement) {
        const question = currentQuiz[currentQuestionIndex];
        const explanationLabel = translations[currentLanguage]?.explanation_label || 'Explicación';

        console.log('🔍 Current question details:', {
            index: currentQuestionIndex,
            text: question.text.substring(0, 50) + '...',
            hasExplanation: !!question.explanation,
            explanationLength: question.explanation ? question.explanation.length : 0
        });

        // Enhanced explanation rendering with proper emoji handling
        let explanationHTML = '';
        if (question.explanation && question.explanation.trim()) {
            console.log('🔍 Original explanation:', question.explanation);

            // Try to render with Marked.js first
            let renderedExplanation = renderMarkdown(question.explanation);
            console.log('🔍 Rendered explanation type:', typeof renderedExplanation);
            console.log('🔍 Rendered explanation value:', renderedExplanation);

            // Safety check for [object Object] or invalid results
            if (renderedExplanation === '[object Object]' || !renderedExplanation || typeof renderedExplanation !== 'string') {
                console.warn('🔍 Marked.js failed, using fallback renderer');
                renderedExplanation = fallbackMarkdownRender(question.explanation);
                console.log('🔍 Fallback explanation:', renderedExplanation);
            }

            // Final safety check and cleanup
            const finalExplanation = String(renderedExplanation || question.explanation).trim();
            console.log('🔍 Final explanation:', finalExplanation);

            if (finalExplanation && finalExplanation !== '[object Object]') {
                explanationHTML = `
                    <div class="explanation-content-wrapper">
                        <strong>${explanationLabel}:</strong>
                        <div class="explanation-text">${finalExplanation}</div>
                    </div>
                `;
            } else {
                console.warn('⚠️ Explanation rendering failed completely, showing default message');
                const defaultMessage = isCorrect
                    ? (currentLanguage === 'es' ? '¡Correcto! Respuesta acertada.' : 'Correct! Well done.')
                    : (currentLanguage === 'es' ? 'Incorrecto. Revisa la respuesta correcta.' : 'Incorrect. Check the correct answer.');
                explanationHTML = `<div class="explanation-text">${defaultMessage}</div>`;
            }
        } else {
            console.warn('⚠️ No explanation found for current question');
            // Show a default message if no explanation is available
            const defaultMessage = isCorrect
                ? (currentLanguage === 'es' ? '¡Correcto! Respuesta acertada.' : 'Correct! Well done.')
                : (currentLanguage === 'es' ? 'Incorrecto. Revisa la respuesta correcta.' : 'Incorrect. Check the correct answer.');
            explanationHTML = `<div class="explanation-text">${defaultMessage}</div>`;
        }

        // Show feedback with explanation
        feedbackElement.innerHTML = `
            <div class="alert ${isCorrect ? 'alert-success' : 'alert-danger'} fade-in" style="padding: 0.75rem; margin-bottom: 0;">
                ${explanationHTML}
            </div>
        `;
        feedbackElement.classList.remove('d-none');

        // Scroll to feedback to make it visible
        setTimeout(() => {
            feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Show next button or finish button
    if (nextButton) {
        const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
        const nextButtonText = isLastQuestion
            ? (translations[currentLanguage]?.finish_quiz || 'Finalizar Quiz')
            : (translations[currentLanguage]?.next_question || 'Siguiente Pregunta');

        console.log(`🔘 Button state: isLastQuestion=${isLastQuestion}, currentQuestionIndex=${currentQuestionIndex}, totalQuestions=${totalQuestions}`);
        console.log(`🔘 Button text: ${nextButtonText}`);
        console.log(`🔘 Quiz state: currentQuiz.length=${currentQuiz?.length}`);

        // Verify consistency
        if (currentQuiz && currentQuiz.length !== totalQuestions) {
            console.warn(`⚠️ Inconsistency in selectOption: currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
            totalQuestions = currentQuiz.length;
            console.log(`🔧 Corrected totalQuestions to ${totalQuestions}`);
        }

        nextButton.innerHTML = `${nextButtonText} <i class="bi bi-arrow-right ms-2"></i>`;
        nextButton.style.display = 'inline-block';

        // Change button style for last question
        if (isLastQuestion) {
            nextButton.classList.remove('btn-primary');
            nextButton.classList.add('btn-success');
        } else {
            nextButton.classList.remove('btn-success');
            nextButton.classList.add('btn-primary');
        }
    }

    console.log(`📊 Answer selected: ${isCorrect ? 'Correct' : 'Incorrect'}, Score: ${score}/${totalQuestions}`);
}

function nextQuestion() {
    console.log(`🔄 nextQuestion called: currentQuestionIndex=${currentQuestionIndex} -> ${currentQuestionIndex + 1}`);
    console.log(`🔄 Quiz state: currentQuiz.length=${currentQuiz?.length}, totalQuestions=${totalQuestions}`);

    currentQuestionIndex++;

    // Verify that we're not going beyond the available questions
    if (currentQuiz && currentQuestionIndex >= currentQuiz.length) {
        console.log(`🏁 Reached end of quiz: currentQuestionIndex=${currentQuestionIndex}, currentQuiz.length=${currentQuiz.length}`);
    }

    showQuestion();
}

function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const resultsScreen = document.getElementById('resultsScreen');
    const resultsContent = document.getElementById('resultsContent');

    if (!resultsScreen || !resultsContent) {
        console.error('Results screen elements not found');
        return;
    }

    // Hide quiz content and show results
    if (quizContent) quizContent.style.display = 'none';
    resultsScreen.style.display = 'block';

    const currentLanguage = getCurrentLanguage();
    const translations = getTranslations();

    const percentage = Math.round((score / totalQuestions) * 100);

    console.log(`🏁 Quiz results: score=${score}, totalQuestions=${totalQuestions}, percentage=${percentage}%`);
    console.log(`🏁 Questions shown: ${currentQuestionIndex + 1}, currentQuiz.length=${currentQuiz?.length}`);

    const completedTitle = translations[currentLanguage]?.quiz_complete_title || '🎉 Quiz Completed!';
    const scoreMessage = translations[currentLanguage]?.quiz_score_message
        ? translations[currentLanguage].quiz_score_message(score, totalQuestions)
        : `You scored ${score} out of ${totalQuestions} questions!`;

    // Performance evaluation
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

    // Save quiz stats
    saveQuizStats();

    console.log(`🏁 Quiz completed! Final score: ${score}/${totalQuestions} (${percentage}%)`);
}

function saveQuizStats() {
    try {
        const category = getUrlParameter('category');
        const difficulty = getUrlParameter('level');
        const language = getCurrentLanguage();

        if (!category || !difficulty) return;

        const stats = JSON.parse(localStorage.getItem('infraquiz_stats') || '{}');
        const categoryKey = `${category}_${language}`;

        if (!stats[categoryKey]) {
            stats[categoryKey] = {
                totalQuizzes: 0,
                totalQuestions: 0,
                totalCorrect: 0,
                bestScore: 0,
                averageScore: 0,
                totalTime: 0
            };
        }

        const categoryStats = stats[categoryKey];
        categoryStats.totalQuizzes++;
        categoryStats.totalQuestions += totalQuestions;
        categoryStats.totalCorrect += score;

        const currentScore = Math.round((score / totalQuestions) * 100);
        categoryStats.bestScore = Math.max(categoryStats.bestScore, currentScore);
        categoryStats.averageScore = Math.round((categoryStats.totalCorrect / categoryStats.totalQuestions) * 100);

        if (startTime) {
            categoryStats.totalTime += Date.now() - startTime;
        }

        localStorage.setItem('infraquiz_stats', JSON.stringify(stats));

        console.log('📊 Quiz stats saved:', categoryStats);

    } catch (error) {
        console.warn('Failed to save quiz stats:', error);
    }
}

function restartQuiz() {
    // Reset quiz state
    score = 0;
    currentQuestionIndex = 0;
    startTime = Date.now();

    console.log(`🔄 Quiz restarted: currentQuiz.length=${currentQuiz?.length}, totalQuestions=${totalQuestions}`);

    // Verify consistency before restart
    if (currentQuiz && currentQuiz.length !== totalQuestions) {
        console.warn(`⚠️ Inconsistency before restart: currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
        totalQuestions = currentQuiz.length;
        console.log(`🔧 Corrected totalQuestions to ${totalQuestions}`);
    }

    // Hide results screen and show quiz content
    const resultsScreen = document.getElementById('resultsScreen');
    const quizContent = document.getElementById('quizContent');

    if (resultsScreen) resultsScreen.style.display = 'none';
    if (quizContent) quizContent.style.display = 'block';

    // Show first question
    showQuestion();

    console.log('🔄 Quiz restarted');
}

// === QUIZ INITIALIZATION ===

async function initializeQuiz() {
    console.log('🚀 Initializing quiz page...');

    // Apply centralized logo
    if (window.InfraQuiz?.logo) {
        const logoContainers = document.querySelectorAll('.navbar-brand span:first-child');
        logoContainers.forEach(container => {
            container.innerHTML = window.InfraQuiz.logo.create(32, 32);
        });
    }

    // Dark mode and language are now handled globally by script.js
    // No need to set up dark mode or language selector here

    // Get quiz parameters
    const category = getUrlParameter('category');
    const difficulty = getUrlParameter('level');
    const language = getCurrentLanguage();

    console.log('📋 Quiz Parameters:', { category, difficulty, language });

    if (!category || !difficulty) {
        showError('Missing quiz parameters. Please select a quiz from the main page.');
        return;
    }

    try {
        showLoading(true);

        console.log('🔄 Starting quiz loading process...');

        // Load quiz content
        const quizContent = await loadQuizContent(category, language);
        console.log(`📄 Loaded content (${quizContent.length} chars):`);
        console.log('Content preview:', quizContent.substring(0, 200) + '...');

        // Parse quiz content - Use the same parsing function as startQuiz for consistency
        let allQuestions;
        console.log('🔍 Starting to parse quiz content...');

        // Use parseQuizContent for consistency with startQuiz
        allQuestions = parseQuizContent(quizContent);

        console.log(`📊 Parsing results: ${allQuestions.length} questions found`);

        if (allQuestions.length === 0) {
            console.error('❌ No questions parsed - detailed content analysis:');
            console.log('First 500 chars:', quizContent.substring(0, 500));
            console.log('Content includes ### headers:', quizContent.includes('###'));
            console.log('Content includes question emojis:', /[❓🧠💭🤔🔧⚙️🔍🚀☸️🐳🔄🌐]/.test(quizContent));
            console.log('Content includes difficulty emojis:', /[🟢🟡🔴]/.test(quizContent));
            console.log('Content includes option emojis:', /[📝🔄📦🎯☸️🐳🌐🔧]/.test(quizContent));
            console.log('Lines starting with ###:', quizContent.split('\n').filter(line => line.trim().startsWith('###')).slice(0, 5));

            // More specific error message based on content analysis
            let specificError = 'No valid questions found in quiz file.';

            if (!quizContent.includes('###')) {
                specificError = 'No question headers (###) found in the quiz file.';
            } else if (!/[🟢🟡🔴]/.test(quizContent)) {
                specificError = 'No difficulty indicators (🟢🟡🔴) found in questions.';
            } else if (!/[📝🔄📦🎯☸️🐳🌐🔧]/.test(quizContent)) {
                specificError = 'No option emojis found in the quiz content.';
            } else if (!quizContent.includes('**Respuesta correcta**') && !quizContent.includes('**Correct Answer**')) {
                specificError = 'No correct answer indicators found in the quiz.';
            }

            throw new Error(`${specificError} The quiz format may need adjustment for category: ${category}.`);
        }

        // Log first question for verification
        if (allQuestions.length > 0) {
            console.log('🔍 First question details:', {
                text: allQuestions[0].text,
                difficulty: allQuestions[0].difficulty,
                optionsCount: allQuestions[0].options?.length,
                hasCorrectOption: allQuestions[0].options?.some(opt => opt.isCorrect),
                hasExplanation: !!allQuestions[0].explanation
            });
        }

        // Filter by difficulty
        let filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
        console.log(`🎯 Filtered to ${filteredQuestions.length} questions for difficulty: ${difficulty}`);

        // Log questions with explanations before filtering
        const questionsWithExplanationsBefore = allQuestions.filter(q => q.explanation);
        console.log(`📝 Questions with explanations before filtering: ${questionsWithExplanationsBefore.length}/${allQuestions.length}`);

        // Fallback if no questions for specific difficulty
        if (filteredQuestions.length === 0) {
            console.warn(`No questions found for ${difficulty} difficulty, using all questions`);
            filteredQuestions = allQuestions;

            // Try to categorize questions by position if no difficulty markers
            if (difficulty === 'beginner') {
                filteredQuestions = allQuestions.slice(0, Math.ceil(allQuestions.length / 3));
            } else if (difficulty === 'intermediate') {
                const start = Math.ceil(allQuestions.length / 3);
                const end = Math.ceil(allQuestions.length * 2 / 3);
                filteredQuestions = allQuestions.slice(start, end);
            } else if (difficulty === 'advanced') {
                filteredQuestions = allQuestions.slice(Math.ceil(allQuestions.length * 2 / 3));
            }

            console.log(`📊 Fallback distribution: ${filteredQuestions.length} questions assigned to ${difficulty}`);
        }

        // Log questions with explanations after filtering
        const questionsWithExplanationsAfter = filteredQuestions.filter(q => q.explanation);
        console.log(`📝 Questions with explanations after filtering: ${questionsWithExplanationsAfter.length}/${filteredQuestions.length}`);

        // Select random subset - FIXED: Ensure we don't exceed available questions
        const maxQuestions = Math.min(filteredQuestions.length, config.MAX_QUESTIONS_PER_QUIZ);
        selectedQuestions = shuffleArray(filteredQuestions).slice(0, maxQuestions);

        console.log(`🎲 Selected ${selectedQuestions.length} random questions from ${filteredQuestions.length} available`);
        console.log(`🎲 Max questions per quiz: ${config.MAX_QUESTIONS_PER_QUIZ}`);

        // Log selected questions with explanations
        const selectedWithExplanations = selectedQuestions.filter(q => q.explanation);
        console.log(`📝 Selected questions with explanations: ${selectedWithExplanations.length}/${selectedQuestions.length}`);

        // Initialize quiz state - FIXED: Use selectedQuestions.length consistently
        currentQuiz = selectedQuestions;
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        totalQuestions = selectedQuestions.length; // FIXED: Use selectedQuestions.length for consistency
        startTime = Date.now();

        console.log(`✅ Quiz initialized: ${totalQuestions} questions`);
        console.log(`✅ Verification: selectedQuestions.length=${selectedQuestions.length}, currentQuiz.length=${currentQuiz.length}, totalQuestions=${totalQuestions}`);

        // Verify consistency
        if (selectedQuestions.length !== currentQuiz.length || currentQuiz.length !== totalQuestions) {
            console.error(`❌ Inconsistency detected: selectedQuestions=${selectedQuestions.length}, currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
        }

        // Apply translations
        applyQuizTranslations();

        // Setup event listeners
        setupEventListeners();

        // Show first question
        showQuestion();

        hideLoadingState();

    } catch (error) {
        console.error('❌ Error initializing quiz:', error);
        hideLoadingState();
        showError(`Error loading quiz: ${error.message}`);
    }
}

function setupEventListeners() {
    // Next question button
    const nextButton = document.getElementById('nextQuestionBtn');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            console.log(`🔘 Next button clicked: currentQuestionIndex=${currentQuestionIndex}, totalQuestions=${totalQuestions}`);
            console.log(`🔘 Quiz state: currentQuiz.length=${currentQuiz?.length}`);

            // Verify consistency before proceeding
            if (currentQuiz && currentQuiz.length !== totalQuestions) {
                console.warn(`⚠️ Inconsistency in button click: currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
                totalQuestions = currentQuiz.length;
                console.log(`🔧 Corrected totalQuestions to ${totalQuestions}`);
            }

            // Check if this is the last question
            if (currentQuestionIndex === totalQuestions - 1) {
                console.log('🏁 Last question reached, showing results');
                showQuizResults();
            } else {
                console.log('🔄 Moving to next question');
                nextQuestion();
            }
        });
    }

    // Restart quiz button
    const restartButton = document.getElementById('restartQuizBtn');
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    }

    // Back to categories buttons
    const backButtons = document.querySelectorAll('#backToCategoriesBtn, #backToCategoriesFromResultsBtn, #errorBackToCategoriesBtn');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'index.html#quizzes';
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
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
    });
}

function getQuestionEmoji(difficulty) {
    const emojis = {
        'beginner': '🟢',
        'intermediate': '🟡',
        'advanced': '🔴'
    };
    return emojis[difficulty] || '🟢';
}

function getCategoryEmoji(category) {
    const categoryEmojis = {
        'bash': '🐚',
        'python': '🐍',
        'terraform': '🏗️',
        'aws': '☁️',
        'docker': '🐳',
        'kubernetes': '☸️',
        'ansible': '🔧',
        'github': '🐙',
        'cicd': '🔄',
        'monitoring': '📊',
        'security': '🛡️',
        'networking': '🌐',
        'databases': '🗄️',
        'mixed': '🔧'
    };
    return categoryEmojis[category] || '❓';
}

function getDifficultyBadge(difficulty) {
    const translations = getTranslations();
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

/**
 * Handle language change during quiz - Now handled by script.js
 * This function is kept for backward compatibility but the actual functionality
 * is now managed by the global initializeLanguageToggle() function in script.js
 */
function handleLanguageChange() {
    // Language change is now handled globally by script.js
    // This function is kept for backward compatibility
    console.log('🌍 Language change handled by global script.js');
}

/**
 * Get current quiz category from URL or stored state
 */
function getCurrentQuizCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || localStorage.getItem('infraquiz_current_category');
}

/**
 * Get current quiz file from URL or stored state
 */
function getCurrentQuizFile() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('quiz') || localStorage.getItem('infraquiz_current_quiz');
}

/**
 * Enhanced loadQuiz function with language parameter
 */
async function loadQuiz(category, quizFile, language = null) {
    const lang = language || getCurrentLanguage();
    const langFolder = lang === 'en' ? 'en' : 'es';

    // Store current quiz info
    localStorage.setItem('infraquiz_current_category', category);
    localStorage.setItem('infraquiz_current_quiz', quizFile);

    try {
        showLoadingState();

        const quizUrl = `${GITHUB_CONFIG.BASE_URL}/quizzes/${category}/${langFolder}/${quizFile}`;
        console.log(`📥 Loading quiz from: ${quizUrl}`);

        const response = await fetch(quizUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const content = await response.text();
        console.log(`✅ Quiz content loaded (${content.length} characters)`);

        currentQuiz = parseQuizContent(content);

        if (!currentQuiz || currentQuiz.length === 0) {
            throw new Error('No valid questions found in quiz file');
        }

        console.log(`✅ Quiz parsed successfully: ${currentQuiz.length} questions`);

        // Log questions with explanations for debugging
        const questionsWithExplanations = currentQuiz.filter(q => q.explanation);
        console.log(`📝 Questions with explanations in loadQuiz: ${questionsWithExplanations.length}/${currentQuiz.length}`);

        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        totalQuestions = currentQuiz.length;

        console.log(`✅ Quiz state reset: currentQuiz.length=${currentQuiz.length}, totalQuestions=${totalQuestions}`);

        // Verify consistency
        if (currentQuiz.length !== totalQuestions) {
            console.error(`❌ Inconsistency detected in loadQuiz: currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
        }

        hideLoadingState();
        return Promise.resolve();

    } catch (error) {
        console.error('❌ Error loading quiz:', error);
        hideLoadingState();
        throw error;
    }
}

/**
 * Scroll to top functionality
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Show/hide scroll to top button based on scroll position
 */
function handleScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

/**
 * Enhanced initialization with Marked.js verification
 */
function initializeQuizPage() {
    console.log('🚀 Initializing quiz page...');

    // Verify Marked.js is available and check version
    if (typeof marked !== 'undefined') {
        console.log('✅ Marked.js is available');

        // Check available methods
        if (typeof marked.parse === 'function') {
            console.log('📋 Marked version: v4+ (has parse method)');
        } else if (typeof marked === 'function') {
            console.log('📋 Marked version: Legacy (marked is function)');
        }

        // Log available methods for debugging
        console.log('🔧 Available marked methods:', Object.getOwnPropertyNames(marked));
    } else {
        console.warn('⚠️ Marked.js not available - using fallback renderer');
    }

    // Dark mode and language are now handled globally by script.js
    // No need to call initializeDarkMode() or handleLanguageChange()

    // Apply initial translations
    applyQuizTranslations();

    // Setup scroll to top
    handleScrollToTop();

    // Setup quiz navigation
    setupQuizNavigation();

    // Load quiz using initializeQuiz for direct access
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const level = urlParams.get('level') || 'beginner';
    const language = urlParams.get('lang') || getCurrentLanguage();

    if (category) {
        console.log(`📚 Loading quiz directly: ${category} (${level}, ${language})`);
        // Use initializeQuiz for direct quiz access to ensure consistent explanation handling
        initializeQuiz();
    } else {
        console.log('⚠️ No quiz parameters found in URL');
        showError('No quiz selected. Please go back to categories.');
    }
}

/**
 * Start quiz with given parameters - Used for random quiz mode
 */
async function startQuiz(category, level, language) {
    try {
        showLoadingState();

        // Use existing loadQuizContent function
        const content = await loadQuizContent(category, language);
        currentQuiz = parseQuizContent(content);

        if (!currentQuiz || currentQuiz.length === 0) {
            throw new Error('No valid questions found in quiz');
        }

        // Filter by difficulty if needed
        if (level && level !== 'all') {
            currentQuiz = currentQuiz.filter(q => q.difficulty === level);
        }

        if (currentQuiz.length === 0) {
            throw new Error(`No questions found for difficulty: ${level}`);
        }

        // Shuffle and limit questions
        currentQuiz = shuffleArray(currentQuiz);
        if (currentQuiz.length > config.MAX_QUESTIONS_PER_QUIZ) {
            currentQuiz = currentQuiz.slice(0, config.MAX_QUESTIONS_PER_QUIZ);
        }

        // Log questions with explanations for debugging
        const questionsWithExplanations = currentQuiz.filter(q => q.explanation);
        console.log(`📝 Questions with explanations in startQuiz: ${questionsWithExplanations.length}/${currentQuiz.length}`);

        // Initialize quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        totalQuestions = currentQuiz.length;
        startTime = Date.now();

        console.log(`✅ Quiz started: ${totalQuestions} questions`);
        console.log(`✅ Verification: currentQuiz.length=${currentQuiz.length}, totalQuestions=${totalQuestions}`);

        // Verify consistency
        if (currentQuiz.length !== totalQuestions) {
            console.error(`❌ Inconsistency detected in startQuiz: currentQuiz=${currentQuiz.length}, totalQuestions=${totalQuestions}`);
        }

        hideLoadingState();
        showQuestion();

    } catch (error) {
        console.error('❌ Error starting quiz:', error);
        hideLoadingState();
        showError('Error loading quiz. Please try again.');
    }
}

/**
 * Shuffle array utility
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuizPage);
} else {
    initializeQuizPage();
}

// Make scrollToTop globally available
window.scrollToTop = scrollToTop;

/**
 * Initialize dark mode for quiz page - Now handled by script.js
 * This function is kept for backward compatibility but the actual functionality
 * is now managed by the global initializeThemeSwitch() function in script.js
 */
function initializeDarkMode() {
    // Dark mode is now handled globally by script.js
    // This function is kept for backward compatibility
    console.log('🌙 Dark mode handled by global script.js');
}