// quiz_page.js: Enhanced quiz page functionality - Optimized Version

// === CONFIGURATION ===
const config = {
    MAX_QUESTIONS_PER_QUIZ: 21,
    GITHUB_REPO: 'jersonmartinez/InfraQuiz',
    GITHUB_BRANCH: 'main',
    QUIZ_BASE_PATH: '../quizzes'
};

// === GLOBAL VARIABLES ===
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let startTime = null;
let selectedQuestions = [];

// === UTILITY FUNCTIONS ===
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getCurrentLanguage() {
    return localStorage.getItem('quizLanguage') || 'en';
}

function getTranslations() {
    return window.InfraQuiz?.translations || {};
}

/**
 * Simple markdown renderer for quiz content
 */
function renderMarkdown(text) {
    if (!text) return '';
    
    return text
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic text
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="quiz-code">$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // Line breaks
        .replace(/\n/g, '<br>')
        // Preserve emojis and special characters
        .trim();
}

/**
 * Clean and format question text
 */
function formatQuestionText(text) {
    if (!text) return '';
    
    // Remove question number and emoji prefix if present
    let cleanText = text.replace(/^\d+\.\s*/, '').trim();
    
    // Render markdown
    return renderMarkdown(cleanText);
}

/**
 * Format option text with markdown rendering
 */
function formatOptionText(text) {
    if (!text) return '';
    
    // Render markdown in option text
    return renderMarkdown(text);
}

function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'} me-2"></i>
        ${renderMarkdown(message)}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// === QUIZ LOADING FUNCTIONS ===

/**
 * Enhanced quiz loading with GitHub integration
 */
async function loadQuizContent(category, language) {
    console.log(`🔍 Loading quiz content: ${category} (${language})`);
    
    // Use the optimized loadQuizFile from main script
    if (window.InfraQuiz?.loadQuizFile) {
        try {
            return await window.InfraQuiz.loadQuizFile(category, language);
        } catch (error) {
            console.warn('Main loadQuizFile failed, using fallback:', error);
        }
    }
    
    // Fallback implementation
    const fileName = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
    const githubUrl = `https://raw.githubusercontent.com/${config.GITHUB_REPO}/${config.GITHUB_BRANCH}/quizzes/${category}/${language}/${fileName}`;
    
    try {
        console.log(`📡 Fetching from GitHub: ${githubUrl}`);
        const response = await fetch(githubUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub fetch failed: ${response.status}`);
        }
        
        const content = await response.text();
        
        if (content.length < 100 || content.includes('404')) {
            throw new Error('Invalid content received');
        }
        
        console.log(`✅ Successfully loaded from GitHub (${Math.round(content.length / 1024)}KB)`);
        return content;
        
    } catch (error) {
        console.error('❌ Failed to load quiz content:', error);
        throw new Error(`Failed to load quiz for ${category}/${language}`);
    }
}

/**
 * Enhanced markdown parser
 */
function parseQuizContent(markdown) {
    console.log('📝 Parsing quiz content...');
    
    // Use the optimized parser from main script if available
    if (window.InfraQuiz?.parseMarkdownQuiz) {
        return window.InfraQuiz.parseMarkdownQuiz(markdown);
    }
    
    // Fallback simple parser
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.match(/^### (?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)/)) {
            if (currentQuestion && currentOptions.length === 4) {
                currentQuestion.options = currentOptions;
                questions.push(currentQuestion);
            }
            
            const difficultyMatch = line.match(/(🟢|🟡|🔴)$/);
            let difficulty = 'beginner';
            if (difficultyMatch) {
                switch (difficultyMatch[1]) {
                    case '🟢': difficulty = 'beginner'; break;
                    case '🟡': difficulty = 'intermediate'; break;
                    case '🔴': difficulty = 'advanced'; break;
                }
            }
            
            currentQuestion = {
                text: line.replace(/^### (?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)\s*/, '').replace(/(?:🟢|🟡|🔴)\s*$/, '').trim(),
                difficulty: difficulty,
                options: [],
                explanation: ''
            };
            currentOptions = [];
        }
        
        if (line.match(/^(?:📝|🔄|📦|🎯)/)) {
            const isCorrect = line.startsWith('📝');
            const optionText = line.substring(2).trim();
            currentOptions.push({
                text: optionText,
                isCorrect: isCorrect
            });
        }
        
        if (line.startsWith('> 💡')) {
            if (currentQuestion) {
                currentQuestion.explanation = line.replace(/^> 💡\s*/, '').trim();
            }
        }
    }
    
    if (currentQuestion && currentOptions.length === 4) {
        currentQuestion.options = currentOptions;
        questions.push(currentQuestion);
    }
    
    console.log(`✅ Parsed ${questions.length} questions`);
    return questions;
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

// Enhanced error display
function showError(message) {
    console.log('❌ Showing error:', message);
    
    const errorDiv = document.getElementById('quizError');
    const errorMessage = document.getElementById('quizErrorMessage');
    const loadingDiv = document.getElementById('quizLoading');
    const contentDiv = document.getElementById('quizContent');
    
    // Hide loading and content
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
        console.log('📱 Loading screen hidden');
    }
    if (contentDiv) {
        contentDiv.style.display = 'none';
        console.log('📱 Quiz content hidden');
    }
    
    // Show error
    if (errorDiv) {
        errorDiv.style.display = 'block';
        console.log('📱 Error screen shown');
    }
    if (errorMessage) {
        errorMessage.innerHTML = renderMarkdown(message);
    }
    
    // Apply translations to error screen
    applyQuizTranslations();
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
    const progressIndicator = document.getElementById('quizProgressIndicator');
    if (!progressIndicator || !currentQuiz) return;
    
    const currentLanguage = getCurrentLanguage();
    const translations = getTranslations();
    
    const questionProgress = translations[currentLanguage]?.question_progress 
        ? translations[currentLanguage].question_progress(currentQuestionIndex + 1, totalQuestions)
        : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        
    const scoreProgress = translations[currentLanguage]?.score_progress 
        ? translations[currentLanguage].score_progress(score, currentQuestionIndex)
        : `Score: ${score}/${currentQuestionIndex}`;
    
    const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;
    
    progressIndicator.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-bold">${questionProgress}</h6>
            <span class="badge bg-primary">${scoreProgress}</span>
        </div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%" 
                 aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>
    `;
}

function showQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.length) {
        showQuizResults();
        return;
    }
    
    const question = currentQuiz[currentQuestionIndex];
    const questionTextElement = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('nextQuestionBtn');
    
    if (!questionTextElement || !optionsContainer) return;
    
    // Update question text with emoji and markdown rendering
    const questionEmoji = question.emoji || getQuestionEmoji(question.difficulty);
    const formattedText = formatQuestionText(question.text);
    const difficultyBadge = getDifficultyBadge(question.difficulty);
    
    questionTextElement.innerHTML = `
        <div class="d-flex align-items-start gap-3 mb-3">
            <span class="question-emoji">${questionEmoji}</span>
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
    
    // Render options with better styling and markdown support
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'list-group-item list-group-item-action quiz-option';
        optionElement.innerHTML = `
            <div class="d-flex align-items-start gap-3">
                <span class="option-letter">${option.letter || String.fromCharCode(65 + index)}</span>
                <div class="option-text">${formatOptionText(option.text)}</div>
            </div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index, option.isCorrect));
        optionsContainer.appendChild(optionElement);
    });
    
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
        if (option.isCorrect) {
            options[index].classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            options[index].classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Show feedback with markdown rendering
    if (feedbackElement) {
        const question = currentQuiz[currentQuestionIndex];
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? '✅' : '❌';
        
        const correctFeedback = translations[currentLanguage]?.correct_feedback || 'Correct!';
        const incorrectFeedback = translations[currentLanguage]?.incorrect_feedback || 'Incorrect';
        const explanationLabel = translations[currentLanguage]?.explanation_label || 'Explanation';
        
        const feedbackTitle = isCorrect ? correctFeedback : incorrectFeedback;
        const explanationText = renderMarkdown(question.explanation || '');
        
        feedbackElement.innerHTML = `
            <div class="alert alert-${isCorrect ? 'success' : 'danger'} ${feedbackClass} fade-in">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="feedback-icon">${feedbackIcon}</span>
                    <h6 class="mb-0 fw-bold">${feedbackTitle}</h6>
                </div>
                ${explanationText ? `
                    <div class="explanation-content">
                        <strong>${explanationLabel}:</strong>
                        <div class="explanation-text mt-2">${explanationText}</div>
                    </div>
                ` : ''}
            </div>
        `;
        feedbackElement.classList.remove('d-none');
    }
    
    // Show next button
    if (nextButton) {
        const nextButtonText = translations[currentLanguage]?.next_question || 'Next Question';
        nextButton.innerHTML = `${nextButtonText} <i class="bi bi-arrow-right ms-2"></i>`;
        nextButton.style.display = 'inline-block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    
    if (!quizResults || !finalScore) return;
    
    // Hide quiz content and show results
    if (quizContent) quizContent.style.display = 'none';
    quizResults.style.display = 'block';
    
    const currentLanguage = getCurrentLanguage();
    const translations = getTranslations();
    
    const percentage = Math.round((score / totalQuestions) * 100);
    
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
    
    finalScore.innerHTML = `
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
    
    // Setup restart and back button functionality
    const restartBtn = document.getElementById('restartQuizBtn');
    const backBtn = document.getElementById('backToCategoriesResultsBtn');
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            score = 0;
            currentQuestionIndex = 0;
            startTime = Date.now();
            
            quizResults.style.display = 'none';
            if (quizContent) quizContent.style.display = 'block';
            
            showQuestion();
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html#quizzes';
        });
    }
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
    currentQuestionIndex = 0;
    score = 0;
    startTime = Date.now();
    
    const resultsElement = document.getElementById('quizResults');
    const contentElement = document.getElementById('quizContent');
    
    if (resultsElement && contentElement) {
        resultsElement.style.display = 'none';
        contentElement.style.display = 'block';
    }
    
    showQuestion();
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
    
    // Setup dark mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    // Setup language selector
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.value = getCurrentLanguage();
    }
    
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
        
        // Parse quiz content
        let allQuestions;
        console.log('🔍 Starting to parse quiz content...');
        
        if (window.InfraQuiz?.parseMarkdownQuiz) {
            console.log('✅ Using main parseMarkdownQuiz function');
            allQuestions = window.InfraQuiz.parseMarkdownQuiz(quizContent);
        } else {
            console.log('⚠️ Using fallback parseQuizContent function');
            allQuestions = parseQuizContent(quizContent);
        }
        
        console.log(`📊 Parsing results: ${allQuestions.length} questions found`);
        
        if (allQuestions.length === 0) {
            console.error('❌ No questions parsed - detailed content analysis:');
            console.log('First 500 chars:', quizContent.substring(0, 500));
            console.log('Content includes ### headers:', quizContent.includes('###'));
            console.log('Content includes emojis:', /[📝🔄📦🎯]/.test(quizContent));
            console.log('Lines starting with ###:', quizContent.split('\n').filter(line => line.trim().startsWith('###')).slice(0, 5));
            
            throw new Error('No valid questions found in quiz file. Parser may need adjustment.');
        }
        
        // Log first question for verification
        if (allQuestions.length > 0) {
            console.log('🔍 First question details:', {
                text: allQuestions[0].text,
                difficulty: allQuestions[0].difficulty,
                optionsCount: allQuestions[0].options?.length,
                hasCorrectOption: allQuestions[0].options?.some(opt => opt.isCorrect)
            });
        }
        
        // Filter by difficulty
        let filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
        console.log(`🎯 Filtered to ${filteredQuestions.length} questions for difficulty: ${difficulty}`);
        
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
        
        // Select random subset
        const maxQuestions = Math.min(filteredQuestions.length, config.MAX_QUESTIONS_PER_QUIZ);
        selectedQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, maxQuestions);
        
        console.log(`🎲 Selected ${selectedQuestions.length} random questions from ${filteredQuestions.length} available`);
        
        // Initialize quiz state
        currentQuiz = selectedQuestions;
        currentQuestionIndex = 0;
        score = 0;
        totalQuestions = currentQuiz.length;
        startTime = Date.now();
        
        // Setup event listeners
        setupEventListeners();
        
        // Start quiz
        showLoading(false);
        showQuestion();
        
        console.log(`✅ Quiz initialized successfully: ${totalQuestions} questions loaded`);
        showNotification(`Quiz loaded: ${totalQuestions} ${difficulty} questions`, 'success');
        
    } catch (error) {
        console.error('❌ Failed to initialize quiz:', error);
        console.error('Error stack:', error.stack);
        
        let errorMessage = `Failed to load the ${category} quiz. `;
        
        if (error.message.includes('No valid questions')) {
            errorMessage += 'The quiz content could not be parsed properly. This might be a format issue.';
        } else if (error.message.includes('Failed to load quiz')) {
            errorMessage += 'Could not fetch the quiz content. Please check your internet connection.';
        } else {
            errorMessage += error.message;
        }
        
        errorMessage += `\n\nTechnical details: ${error.message}`;
        
        showError(errorMessage);
    }
}

function setupEventListeners() {
    // Next question button
    const nextButton = document.getElementById('nextQuestionBtn');
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }
    
    // Restart quiz button
    const restartButton = document.getElementById('restartQuizBtn');
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    }
    
    // Back to categories buttons
    const backButtons = document.querySelectorAll('#backToCategoriesBtn, #backToCategoriesResultsBtn, #errorBackToCategoriesBtn');
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

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('📚 Quiz page DOM loaded, initializing...');
    initializeQuiz();
});