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
 * Enhanced markdown renderer for quiz content with emoji preservation
 */
function renderMarkdown(text) {
    if (!text) return '';
    
    // Preserve leading emoji if present
    const emojiMatch = text.match(/^([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🔧|📝|⚙️|🛠️|💻|🖥️|📊|📈|📉|🔍|🔎|⭐|✨|💡|🎯|🚀|🔒|🔓|⚡|🌟|💯|📚|📖|🎓|🏆|✅|❌|⚠️|ℹ️|💭|🧠|🔗|🌐|📱|💾|🗄️|📂|📁|🔍|🔎|📝|✏️|📄|📋|📌|📍|🎨|🖼️|🖊️|✒️|🖋️|📐|📏|🔢|💰|💳|💎|🏅|🥇|🥈|🥉)\s*/u);
    
    let emoji = '';
    let cleanText = text;
    
    if (emojiMatch) {
        emoji = emojiMatch[1];
        cleanText = text.replace(emojiMatch[0], '').trim();
    }
    
    // Apply markdown formatting to the remaining text
    const formattedText = cleanText
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic text
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Inline code - improved with length detection
        .replace(/`([^`]+)`/g, (match, code) => {
            const isLong = code.length > 20;
            const className = isLong ? 'quiz-code long-code' : 'quiz-code';
            return `<code class="${className}">${code}</code>`;
        })
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // Line breaks
        .replace(/\n/g, '<br>')
        .trim();
    
    // Return with emoji if present
    return emoji ? `<span class="explanation-emoji">${emoji}</span> ${formattedText}` : formattedText;
}

/**
 * Optimized markdown for questions - more conservative
 */
function formatQuestionText(text) {
    if (!text) return '';
    
    // Remove question number and emoji prefix if present
    let cleanText = text.replace(/^\d+\.\s*/, '').trim();
    
    // Light markdown rendering for questions
    return cleanText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="quiz-code">$1</code>')
        .trim();
}

/**
 * Enhanced markdown for options - preserves emojis and formatting
 */
function formatOptionText(text) {
    if (!text) return '';
    
    // Preserve leading emoji if present
    const emojiMatch = text.match(/^([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🔧|📝|⚙️|🛠️|💻|🖥️|📊|📈|📉|🔍|🔎|⭐|✨|💡|🎯|🚀|🔒|🔓|⚡|🌟|💯|📚|📖|🎓|🏆|✅|❌|⚠️|ℹ️|💭|🧠|🔗|🌐|📱|💾|🗄️|📂|📁|🔍|🔎|📝|✏️|📄|📋|📌|📍|🎨|🖼️|🖊️|✒️|🖋️|📐|📏|🔢|💰|💳|💎|🏅|🥇|🥈|🥉)\s*/u);
    
    let emoji = '';
    let cleanText = text;
    
    if (emojiMatch) {
        emoji = emojiMatch[1];
        cleanText = text.replace(emojiMatch[0], '').trim();
    }
    
    // Apply light markdown to the remaining text
    const formattedText = cleanText
        .replace(/`([^`]+)`/g, '<code class="quiz-code">$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .trim();
    
    // Return with emoji if present
    return emoji ? `<span class="option-emoji">${emoji}</span> ${formattedText}` : formattedText;
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
    
    if (!questionTextElement || !optionsContainer) {
        console.error('Required elements not found');
        return;
    }
    
    console.log('📝 Showing question:', {
        text: question.text,
        emoji: question.emoji,
        difficulty: question.difficulty,
        optionsCount: question.options?.length
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
    
    // Render options with better styling and markdown support
    if (question.options && question.options.length > 0) {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'list-group-item list-group-item-action quiz-option';
            
            // Use option letter if available, otherwise generate one
            const optionLetter = option.letter || String.fromCharCode(65 + index);
            
            optionElement.innerHTML = `
                <div class="d-flex align-items-start gap-3">
                    <span class="option-letter">${optionLetter}</span>
                    <div class="option-text">${formatOptionText(option.text)}</div>
                </div>
            `;
            
            optionElement.addEventListener('click', () => selectOption(index, option.isCorrect));
            optionsContainer.appendChild(optionElement);
        });
        
        console.log(`✅ Rendered ${question.options.length} options`);
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
    
    // Show feedback with enhanced markdown rendering
    if (feedbackElement) {
        const question = currentQuiz[currentQuestionIndex];
        const feedbackClass = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = isCorrect ? '✅' : '❌';
        
        const correctFeedback = translations[currentLanguage]?.correct_feedback || '¡Correcto!';
        const incorrectFeedback = translations[currentLanguage]?.incorrect_feedback || 'Incorrecto';
        const explanationLabel = translations[currentLanguage]?.explanation_label || 'Explicación';
        
        const feedbackTitle = isCorrect ? correctFeedback : incorrectFeedback;
        
        // Enhanced explanation rendering
        let explanationText = '';
        if (question.explanation) {
            explanationText = renderMarkdown(question.explanation);
        }
        
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
        const nextButtonText = translations[currentLanguage]?.next_question || 'Siguiente Pregunta';
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
 * Handle language change during quiz
 */
function handleLanguageChange() {
    const languageSelect = document.getElementById('languageSelect');
    if (!languageSelect) return;
    
    languageSelect.addEventListener('change', function() {
        const newLanguage = this.value;
        const currentLanguage = getCurrentLanguage();
        
        if (newLanguage !== currentLanguage) {
            console.log(`🌍 Language changed from ${currentLanguage} to ${newLanguage}`);
            
            // Update localStorage
            localStorage.setItem('infraquiz_language', newLanguage);
            
            // If we're in a quiz, reload the quiz in the new language
            if (currentQuiz && currentQuiz.length > 0) {
                const currentCategory = getCurrentQuizCategory();
                const currentQuizFile = getCurrentQuizFile();
                
                if (currentCategory && currentQuizFile) {
                    console.log(`🔄 Reloading quiz in ${newLanguage}: ${currentCategory}/${currentQuizFile}`);
                    
                    // Save current state
                    const savedState = {
                        questionIndex: currentQuestionIndex,
                        score: score,
                        answers: userAnswers.slice() // Copy array
                    };
                    
                    // Load quiz in new language
                    loadQuiz(currentCategory, currentQuizFile, newLanguage)
                        .then(() => {
                            // Restore state if quiz loaded successfully
                            if (savedState.questionIndex < currentQuiz.length) {
                                currentQuestionIndex = savedState.questionIndex;
                                score = savedState.score;
                                userAnswers = savedState.answers;
                                
                                // Show current question
                                showQuestion();
                                console.log(`✅ Quiz state restored at question ${currentQuestionIndex + 1}`);
                            } else {
                                // Start from beginning if state is invalid
                                console.log(`⚠️ Invalid state, starting from beginning`);
                                startQuiz();
                            }
                        })
                        .catch(error => {
                            console.error('❌ Error reloading quiz in new language:', error);
                            showError('Error loading quiz in the selected language. Please try again.');
                        });
                } else {
                    console.log('🔄 Not in quiz, just applying translations');
                }
            }
            
            // Apply translations to current page
            applyQuizTranslations();
        }
    });
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
        
        const quizUrl = `${CONFIG.GITHUB_RAW_BASE_URL}/quizzes/${category}/${langFolder}/${quizFile}`;
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
        
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        
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
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

/**
 * Enhanced initialization with all event handlers
 */
function initializeQuizPage() {
    console.log('🚀 Initializing quiz page...');
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Apply initial translations
    applyQuizTranslations();
    
    // Setup language change handler
    handleLanguageChange();
    
    // Setup scroll to top
    handleScrollToTop();
    
    // Setup quiz navigation
    setupQuizNavigation();
    
    // Load quiz if category and quiz parameters are present
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const quiz = urlParams.get('quiz');
    
    if (category && quiz) {
        console.log(`📚 Loading quiz: ${category}/${quiz}`);
        loadQuiz(category, quiz)
            .then(() => {
                startQuiz();
            })
            .catch(error => {
                console.error('❌ Error loading initial quiz:', error);
                showError('Error loading quiz. Please try again.');
            });
    } else {
        console.log('⚠️ No quiz parameters found in URL');
        showError('No quiz selected. Please go back to categories.');
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuizPage);
} else {
    initializeQuizPage();
}

// Make scrollToTop globally available
window.scrollToTop = scrollToTop;