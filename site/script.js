// InfraQuiz JavaScript functionality

// Idioma por defecto
let currentLanguage = 'en'; // 'es' para español, 'en' para inglés

// Global variables
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let quizData = {};

// Lista de tecnologías soportadas
const technologies = [
    'bash', 'python', 'terraform', 'aws', 'docker', 'kubernetes', 'ansible',
    'github', 'cicd', 'monitoring', 'security', 'networking', 'databases', 'mixed'
];

// Quiz data structure (dinámico según idioma)
function getQuizFilePath(tech) {
    if (currentLanguage === 'es') {
        return `quizzes/${tech}/es/cuestionario1.md`;
    } else {
        return `quizzes/${tech}/en/questions1.md`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLanguageSelector();
    loadQuizData();
});

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize language selector
function initializeLanguageSelector() {
    // Agrega un selector de idioma en la barra de navegación
    const nav = document.querySelector('.navbar-nav');
    if (!nav) return;
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `
        <select id="languageSelector" class="form-select form-select-sm ms-2" style="width: auto; display: inline-block;">
            <option value="en">English</option>
            <option value="es">Español</option>
        </select>
    `;
    nav.appendChild(li);
    document.getElementById('languageSelector').value = currentLanguage;
    document.getElementById('languageSelector').addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        loadQuizData();
    });
}

// Load quiz data from markdown files
async function loadQuizData() {
    quizData = {};
    try {
        for (const tech of technologies) {
            const filePath = getQuizFilePath(tech);
            const response = await fetch(filePath);
            if (response.ok) {
                const markdown = await response.text();
                quizData[tech] = parseMarkdownQuiz(markdown);
            } else {
                quizData[tech] = [];
            }
        }
        console.log('Quiz data loaded successfully');
    } catch (error) {
        console.error('Error loading quiz data:', error);
        showError('Failed to load quiz data. Please try again later.');
    }
}

// Parse markdown quiz content
function parseMarkdownQuiz(markdown) {
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    let currentExplanation = '';
    let inQuestion = false;
    let inOptions = false;
    let inExplanation = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip headers and empty lines
        if (line.startsWith('#') || line === '') continue;
        
        // Detect question start
        if (line.includes('❓') || line.includes('🧠') || line.includes('💭') || 
            line.includes('🤔') || line.includes('🔧') || line.includes('⚙️') ||
            line.includes('🔍') || line.includes('🚀')) {
            
            // Save previous question if exists
            if (currentQuestion) {
                currentQuestion.options = currentOptions;
                currentQuestion.explanation = currentExplanation;
                questions.push(currentQuestion);
            }
            
            // Start new question
            currentQuestion = {
                text: line.replace(/^.*?[❓🧠💭🤔🔧⚙️🔍🚀]\s*/, '').replace(/🟢|🟡|🔴$/, '').trim(),
                difficulty: line.includes('🟢') ? 'beginner' : line.includes('🟡') ? 'intermediate' : 'advanced',
                options: [],
                explanation: ''
            };
            currentOptions = [];
            currentExplanation = '';
            inQuestion = true;
            inOptions = false;
            inExplanation = false;
            continue;
        }
        
        // Detect options
        if (line.startsWith('📝') || line.startsWith('🔄') || line.startsWith('📦') || line.startsWith('🎯')) {
            inOptions = true;
            inExplanation = false;
            const optionText = line.substring(2).trim();
            currentOptions.push({
                text: optionText,
                isCorrect: line.startsWith('📝') // First option is correct
            });
            continue;
        }
        
        // Detect explanation
        if (line.startsWith('**Correct Answer:**')) {
            inExplanation = true;
            inOptions = false;
            continue;
        }
        
        // Collect explanation text
        if (inExplanation && line.startsWith('**Explanation:**')) {
            currentExplanation = line.replace('**Explanation:**', '').trim();
            continue;
        }
        
        if (inExplanation && line.startsWith('💡') || line.startsWith('🔍') || 
            line.startsWith('⚡') || line.startsWith('🩺') || line.startsWith('🔧')) {
            currentExplanation += ' ' + line.trim();
        }
    }
    
    // Add last question
    if (currentQuestion) {
        currentQuestion.options = currentOptions;
        currentQuestion.explanation = currentExplanation;
        questions.push(currentQuestion);
    }
    
    return questions;
}

// Start a random quiz
function startRandomQuiz() {
    const quizTypes = Object.keys(quizData);
    const randomType = quizTypes[Math.floor(Math.random() * quizTypes.length)];
    loadQuiz(randomType);
}

// Load a specific quiz
function loadQuiz(quizType) {
    if (!quizData[quizType] || quizData[quizType].length === 0) {
        showError('Quiz not available yet. Please try another category.');
        return;
    }
    
    currentQuiz = quizType;
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = Math.min(5, quizData[quizType].length); // Limit to 5 questions
    
    showQuestion();
    showQuizModal();
}

// Show quiz modal
function showQuizModal() {
    const modal = new bootstrap.Modal(document.getElementById('quizModal'));
    const title = document.getElementById('quizTitle');
    
    const quizNames = {
        'bash': '🐚 Bash Scripting Quiz',
        'python': '🐍 Python Automation Quiz',
        'terraform': '🛠️ Terraform Quiz',
        'aws': '☁️ AWS Quiz',
        'mixed': '🎯 Mixed DevOps Quiz'
    };
    
    title.textContent = quizNames[currentQuiz] || 'Quiz';
    modal.show();
}

// Show current question
function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    const nextButton = document.getElementById('nextQuestion');
    const question = quizData[currentQuiz][currentQuestionIndex];
    
    if (!question) {
        showQuizResults();
        return;
    }
    
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    
    quizContent.innerHTML = `
        <div class="quiz-progress">
            <div class="d-flex justify-content-between mb-2">
                <span>Question ${currentQuestionIndex + 1} of ${totalQuestions}</span>
                <span>Score: ${score}/${totalQuestions}</span>
            </div>
            <div class="progress">
                <div class="progress-bar" style="width: ${progress}%"></div>
            </div>
        </div>
        
        <div class="quiz-question">
            ${question.text}
        </div>
        
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <div class="quiz-option" data-index="${index}" onclick="selectOption(${index})">
                    ${option.text}
                </div>
            `).join('')}
        </div>
        
        <div class="quiz-explanation" style="display: none;">
            ${question.explanation}
        </div>
    `;
    
    nextButton.style.display = 'none';
}

// Select an option
function selectOption(optionIndex) {
    const options = document.querySelectorAll('.quiz-option');
    const explanation = document.querySelector('.quiz-explanation');
    const nextButton = document.getElementById('nextQuestion');
    const question = quizData[currentQuiz][currentQuestionIndex];
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Mark selected option
    options[optionIndex].classList.add('selected');
    
    // Check if correct
    if (question.options[optionIndex].isCorrect) {
        options[optionIndex].classList.add('correct');
        score++;
    } else {
        options[optionIndex].classList.add('incorrect');
        // Show correct answer
        question.options.forEach((option, index) => {
            if (option.isCorrect) {
                options[index].classList.add('correct');
            }
        });
    }
    
    // Show explanation
    if (explanation) {
        explanation.style.display = 'block';
    }
    
    // Show next button
    nextButton.style.display = 'inline-block';
    nextButton.onclick = nextQuestion;
}

// Go to next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        showQuizResults();
    }
}

// Show quiz results
function showQuizResults() {
    const quizContent = document.getElementById('quizContent');
    const nextButton = document.getElementById('nextQuestion');
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let message = '';
    let color = '';
    
    if (percentage >= 80) {
        message = '🎉 Excellent! You\'re a DevOps expert!';
        color = 'success';
    } else if (percentage >= 60) {
        message = '👍 Good job! Keep learning!';
        color = 'primary';
    } else {
        message = '📚 Keep practicing! You\'ll get better!';
        color = 'warning';
    }
    
    quizContent.innerHTML = `
        <div class="quiz-score">
            <h3>${message}</h3>
            <h2>Final Score: ${score}/${totalQuestions} (${percentage}%)</h2>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn btn-${color} me-2" onclick="restartQuiz()">
                <i class="bi bi-arrow-clockwise"></i> Try Again
            </button>
            <button class="btn btn-outline-primary" onclick="startRandomQuiz()">
                <i class="bi bi-shuffle"></i> Another Quiz
            </button>
        </div>
    `;
    
    nextButton.style.display = 'none';
}

// Restart current quiz
function restartQuiz() {
    loadQuiz(currentQuiz);
}

// Scroll to quizzes section
function scrollToQuizzes() {
    document.getElementById('quizzes').scrollIntoView({ behavior: 'smooth' });
}

// Show coming soon message
function showComingSoon() {
    const modal = new bootstrap.Modal(document.getElementById('quizModal'));
    const title = document.getElementById('quizTitle');
    const content = document.getElementById('quizContent');
    const nextButton = document.getElementById('nextQuestion');
    
    title.textContent = '🚧 Coming Soon';
    content.innerHTML = `
        <div class="text-center">
            <i class="bi bi-tools display-1 text-muted mb-4"></i>
            <h4>More quizzes are on the way!</h4>
            <p class="lead">We're working on adding quizzes for:</p>
            <ul class="list-unstyled">
                <li><i class="bi bi-check-circle text-success"></i> Docker & Kubernetes</li>
                <li><i class="bi bi-check-circle text-success"></i> CI/CD Pipelines</li>
                <li><i class="bi bi-check-circle text-success"></i> Monitoring & Observability</li>
                <li><i class="bi bi-check-circle text-success"></i> Security & Compliance</li>
            </ul>
            <p>Stay tuned for updates!</p>
        </div>
    `;
    nextButton.style.display = 'none';
    modal.show();
}

// Show error message
function showError(message) {
    const modal = new bootstrap.Modal(document.getElementById('quizModal'));
    const title = document.getElementById('quizTitle');
    const content = document.getElementById('quizContent');
    const nextButton = document.getElementById('nextQuestion');
    
    title.textContent = '❌ Error';
    content.innerHTML = `
        <div class="text-center">
            <i class="bi bi-exclamation-triangle display-1 text-danger mb-4"></i>
            <p class="lead">${message}</p>
        </div>
    `;
    nextButton.style.display = 'none';
    modal.show();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('quizModal');
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            bootstrap.Modal.getInstance(modal).hide();
        } else if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.quiz-option');
            if (options[optionIndex] && !options[optionIndex].classList.contains('selected')) {
                selectOption(optionIndex);
            }
        } else if (e.key === 'Enter') {
            const nextButton = document.getElementById('nextQuestion');
            if (nextButton.style.display !== 'none') {
                nextQuestion();
            }
        }
    }
});

// Add loading state
function showLoading() {
    return '<div class="text-center"><div class="loading-spinner"></div><p>Loading quiz...</p></div>';
} 