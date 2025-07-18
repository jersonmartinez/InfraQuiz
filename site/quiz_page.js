// quiz_page.js: Enhanced quiz page functionality - Optimized Version

// === GLOBAL QUIZ STATE ===
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let startTime = null;
let quizTimer = null;
let quizElapsedSeconds = 0;
let selectedQuestions = [];

// Get configuration from main script
const config = window.InfraQuiz?.config || {
    GITHUB_REPO: 'jersonmartinez/InfraQuiz',
    GITHUB_BRANCH: 'main',
    MAX_QUESTIONS_PER_QUIZ: 21
};

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

function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'} me-2"></i>
        ${message}
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

function showError(message) {
    const errorElement = document.getElementById('quizError');
    const messageElement = document.getElementById('quizErrorMessage');
    const loadingElement = document.getElementById('quizLoading');
    const contentElement = document.getElementById('quizContent');
    
    if (errorElement && messageElement) {
        messageElement.textContent = message;
        errorElement.style.display = 'block';
        if (loadingElement) loadingElement.style.display = 'none';
        if (contentElement) contentElement.style.display = 'none';
    }
}

function renderProgressIndicator() {
    const progressContainer = document.getElementById('quizProgressIndicator');
    if (!progressContainer || !currentQuiz) return;
    
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    
    progressContainer.innerHTML = `
        <div class="quiz-progress-info mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold">Question ${currentQuestionIndex + 1} of ${totalQuestions}</span>
                <span class="text-muted">Score: ${score}/${currentQuestionIndex + 1}</span>
            </div>
            <div class="progress mt-2" style="height: 8px;">
                <div class="progress-bar bg-primary" role="progressbar" 
                     style="width: ${progress}%" 
                     aria-valuenow="${progress}" 
                     aria-valuemin="0" 
                     aria-valuemax="100"></div>
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
    
    // Update question text
    questionTextElement.innerHTML = `${question.text} <span class="difficulty-indicator difficulty-${question.difficulty}"></span>`;
    
    // Clear previous options and feedback
    optionsContainer.innerHTML = '';
    if (feedbackElement) {
        feedbackElement.classList.add('d-none');
        feedbackElement.innerHTML = '';
    }
    if (nextButton) {
        nextButton.style.display = 'none';
    }
    
    // Render options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'list-group-item list-group-item-action quiz-option';
        optionElement.innerHTML = `
            <div class="d-flex align-items-center">
                <span class="option-letter me-3">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
            </div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index, option.isCorrect));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update progress
    renderProgressIndicator();
}

function selectOption(selectedIndex, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('nextQuestionBtn');
    
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
    
    // Show feedback
    if (feedbackElement) {
        const question = currentQuiz[currentQuestionIndex];
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? '✅' : '❌';
        
        feedbackElement.innerHTML = `
            <div class="alert alert-${isCorrect ? 'success' : 'danger'} ${feedbackClass}">
                <h6>${feedbackIcon} ${isCorrect ? 'Correct!' : 'Incorrect'}</h6>
                <p class="mb-0"><strong>Explanation:</strong> ${question.explanation}</p>
            </div>
        `;
        feedbackElement.classList.remove('d-none');
    }
    
    // Show next button
    if (nextButton) {
        nextButton.style.display = 'inline-block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showQuizResults() {
    const resultsElement = document.getElementById('quizResults');
    const contentElement = document.getElementById('quizContent');
    const scoreElement = document.getElementById('finalScore');
    
    if (!resultsElement || !scoreElement) return;
    
    contentElement.style.display = 'none';
    resultsElement.style.display = 'block';
    
    const percentage = Math.round((score / totalQuestions) * 100);
    const translations = getTranslations();
    const currentLanguage = getCurrentLanguage();
    
    let performanceMessage = '';
    if (percentage >= 90) {
        performanceMessage = '🏆 Excellent work!';
    } else if (percentage >= 75) {
        performanceMessage = '🎉 Great job!';
    } else if (percentage >= 60) {
        performanceMessage = '👍 Good effort!';
    } else {
        performanceMessage = '📚 Keep studying!';
    }
    
    scoreElement.innerHTML = `
        <div class="text-center">
            <h4>${performanceMessage}</h4>
            <p class="lead">You scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong> questions</p>
            <div class="score-percentage">
                <span class="display-4 fw-bold text-primary">${percentage}%</span>
            </div>
        </div>
    `;
    
    // Save quiz statistics
    saveQuizStats();
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
    
    if (!category || !difficulty) {
        showError('Missing quiz parameters. Please select a quiz from the main page.');
        return;
    }
    
    try {
        showLoading(true);
        
        // Load quiz content
        const quizContent = await loadQuizContent(category, language);
        const allQuestions = parseQuizContent(quizContent);
        
        if (allQuestions.length === 0) {
            throw new Error('No valid questions found in quiz file');
        }
        
        // Filter by difficulty
        let filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
        
        // Fallback if no questions for specific difficulty
        if (filteredQuestions.length === 0) {
            console.warn(`No questions found for ${difficulty} difficulty, using all questions`);
            filteredQuestions = allQuestions;
        }
        
        // Select random subset
        const maxQuestions = Math.min(filteredQuestions.length, config.MAX_QUESTIONS_PER_QUIZ);
        selectedQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, maxQuestions);
        
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
        
        console.log(`✅ Quiz initialized: ${totalQuestions} questions loaded`);
        showNotification(`Quiz loaded: ${totalQuestions} ${difficulty} questions`, 'success');
        
    } catch (error) {
        console.error('❌ Failed to initialize quiz:', error);
        showError(`Failed to load the ${category} quiz. Please try again or select a different category.`);
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

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('📚 Quiz page DOM loaded, initializing...');
    initializeQuiz();
});