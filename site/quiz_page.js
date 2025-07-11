// quiz_page.js: Enhanced quiz page functionality with better interactivity and loading

// Global variables for the quiz on this page
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let quizData = {};
let currentLanguage = localStorage.getItem('quizLanguage') || 'en';
let quizTimer = null;
let startTime = null;

// Supported technologies (replicated for quiz_page context)
const technologies = [
    { id: 'bash', name: 'Bash Scripting', icon: 'bi-terminal', color: 'success', description: 'Master shell scripting fundamentals and automation' },
    { id: 'python', name: 'Python Automation', icon: 'bi-code-slash', color: 'primary', description: 'Learn Python for DevOps and automation tasks' },
    { id: 'terraform', name: 'Terraform', icon: 'bi-gear', color: 'warning', description: 'Infrastructure as Code with HashiCorp Terraform' },
    { id: 'aws', name: 'AWS', icon: 'bi-cloud', color: 'info', description: 'Amazon Web Services and cloud computing' },
    { id: 'docker', name: 'Docker', icon: 'bi-boxes', color: 'dark', description: 'Containerization with Docker' },
    { id: 'kubernetes', name: 'Kubernetes', icon: 'bi-boxes', color: 'danger', description: 'Orchestrate containers with Kubernetes' },
    { id: 'ansible', name: 'Ansible', icon: 'bi-server', color: 'secondary', description: 'Automation with Ansible' },
    { id: 'github', name: 'GitHub Actions', icon: 'bi-github', color: 'purple', description: 'CI/CD with GitHub Actions' },
    { id: 'cicd', name: 'CI/CD', icon: 'bi-arrow-repeat', color: 'orange', description: 'Continuous Integration and Delivery concepts' },
    { id: 'monitoring', name: 'Monitoring', icon: 'bi-bar-chart-line', color: 'pink', description: 'System and application monitoring' },
    { id: 'security', name: 'Security', icon: 'bi-shield-lock', color: 'cyan', description: 'DevSecOps practices and principles' },
    { id: 'networking', name: 'Networking', icon: 'bi-globe', color: 'teal', description: 'Network fundamentals for DevOps' },
    { id: 'databases', name: 'Databases', icon: 'bi-database', color: 'brown', description: 'Database concepts and management' },
    { id: 'mixed', name: 'Mixed Quiz', icon: 'bi-shuffle', color: 'danger', description: 'Random questions from all categories' }
];

// Enhanced translations object
const translations = {
    'en': {
        'home_nav': 'Home',
        'quizzes_nav': 'Quizzes',
        'about_nav': 'About',
        'hero_title': '🚀 Master DevOps with Interactive Quizzes',
        'hero_description': 'Learn Bash scripting, Python automation, Terraform, AWS and more through engaging, bite-sized quizzes designed for DevOps professionals.',
        'start_random_quiz': 'Start Random Quiz',
        'browse_categories': 'Browse Categories',
        'quiz_categories_title': '📚 Quiz Categories',
        'quiz_categories_subtitle': 'Choose your learning path or take a mixed quiz',
        'about_infraquiz_title': 'About InfraQuiz',
        'about_description_1': 'InfraQuiz is a public repository containing interactive quizzes about DevOps tools and methodologies. Perfect for reinforcing knowledge, interview preparation, or certification study.',
        'about_description_2': 'Each quiz includes:',
        'about_feature_1': '1 correct answer per question',
        'about_feature_2': 'Brief technical explanations',
        'about_feature_3': 'Visual and engaging format with emojis',
        'about_feature_4': 'Mixed or random categories to test your knowledge',
        'view_on_github': 'View on GitHub',
        'footer_text': '© 2024 InfraQuiz. Made with ❤️ for the DevOps community.',
        'modal_close': 'Close',
        'next_question': 'Next Question',
        'loading_quiz': 'Loading quiz...',
        'loading_questions': 'Loading questions...',
        'error_title': 'Error',
        'error_no_quizzes_available': 'No quizzes available to start. Please try reloading the page.',
        'error_quiz_not_available': (techName) => `The ${techName} quiz is not available yet. Please try another category.`,
        'correct_feedback': 'Correct!',
        'incorrect_feedback': 'Incorrect.',
        'correct_answer_was': 'The correct answer was:',
        'quiz_complete_title': '🎉 Quiz Completed!',
        'quiz_score_details': (score, total) => `You got ${score} out of ${total} questions correct.`,
        'quiz_time_taken': (minutes, seconds) => `Time taken: ${minutes}m ${seconds}s`,
        'quiz_accuracy': (percentage) => `Accuracy: ${percentage}%`,
        'restart_quiz': 'Restart Quiz',
        'back_to_categories': 'Back to Categories',
        'coming_soon_message': 'This category will be available soon. Check back later!',
        'question_progress': (current, total) => `Question ${current} of ${total}`,
        'score_progress': (score, total) => `Score: ${score}/${total}`,
        'time_remaining': (minutes, seconds) => `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`,
        'difficulty_beginner': 'Beginner',
        'difficulty_intermediate': 'Intermediate',
        'difficulty_advanced': 'Advanced'
    },
    'es': {
        'home_nav': 'Inicio',
        'quizzes_nav': 'Quizzes',
        'about_nav': 'Acerca de',
        'hero_title': '🚀 Domina DevOps con Quizzes Interactivos',
        'hero_description': 'Aprende scripting Bash, automatización con Python, Terraform, AWS y más a través de quizzes atractivos y concisos diseñados para profesionales de DevOps.',
        'start_random_quiz': 'Iniciar Quiz Aleatorio',
        'browse_categories': 'Explorar Categorías',
        'quiz_categories_title': '📚 Categorías de Quizzes',
        'quiz_categories_subtitle': 'Elige tu ruta de aprendizaje o toma un quiz mixto',
        'about_infraquiz_title': 'Acerca de InfraQuiz',
        'about_description_1': 'InfraQuiz es un repositorio público que contiene quizzes interactivos sobre herramientas y metodologías DevOps. Perfecto para reforzar conocimientos, preparación de entrevistas o estudio para certificaciones.',
        'about_description_2': 'Cada quiz incluye:',
        'about_feature_1': '1 respuesta correcta por pregunta',
        'about_feature_2': 'Breves explicaciones técnicas',
        'about_feature_3': 'Formato visual y atractivo con emojis',
        'about_feature_4': 'Categorías mixtas o aleatorias para probar tus conocimientos',
        'view_on_github': 'Ver en GitHub',
        'footer_text': '© 2024 InfraQuiz. Hecho con ❤️ para la comunidad DevOps.',
        'modal_close': 'Cerrar',
        'next_question': 'Siguiente Pregunta',
        'loading_quiz': 'Cargando quiz...',
        'loading_questions': 'Cargando preguntas...',
        'error_title': 'Error',
        'error_no_quizzes_available': 'No hay quizzes disponibles para iniciar. Por favor, intenta recargar la página.',
        'error_quiz_not_available': (techName) => `El quiz de ${techName} no está disponible todavía. Por favor, intenta otra categoría.`,
        'correct_feedback': '¡Correcto!',
        'incorrect_feedback': 'Incorrecto.',
        'correct_answer_was': 'La respuesta correcta era:',
        'quiz_complete_title': '🎉 ¡Quiz Completado!',
        'quiz_score_details': (score, total) => `Obtuviste ${score} de ${total} preguntas correctas.`,
        'quiz_time_taken': (minutes, seconds) => `Tiempo empleado: ${minutes}m ${seconds}s`,
        'quiz_accuracy': (percentage) => `Precisión: ${percentage}%`,
        'restart_quiz': 'Reiniciar Quiz',
        'back_to_categories': 'Volver a Categorías',
        'coming_soon_message': 'Esta categoría estará disponible pronto. ¡Vuelve más tarde!',
        'question_progress': (current, total) => `Pregunta ${current} de ${total}`,
        'score_progress': (score, total) => `Puntuación: ${score}/${total}`,
        'time_remaining': (minutes, seconds) => `Tiempo: ${minutes}:${seconds.toString().padStart(2, '0')}`,
        'difficulty_beginner': 'Principiante',
        'difficulty_intermediate': 'Intermedio',
        'difficulty_advanced': 'Avanzado'
    }
};

/**
 * Constructs the file path for a quiz markdown file based on technology ID and language.
 * Updated to use the correct repository structure.
 */
function getQuizFilePath(techId, language) {
    const fileName = (language === 'en') ? 'questions1.md' : 'cuestionario1.md';
    // Use the correct path structure for the GitHub repository
    return `https://raw.githubusercontent.com/jersonmartinez/InfraQuiz/main/quizzes/${techId}/${language}/${fileName}`;
}

// Enhanced markdown quiz parser
function parseMarkdownQuiz(markdown) {
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    let currentExplanation = '';
    let inQuestionBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '') continue;

        // Skip placeholder text
        if (line.includes('Este archivo necesita ser completado') || 
            line.includes('This file needs to be completed')) {
            console.warn("Placeholder content detected, returning empty quiz.");
            return [];
        }
        
        // Detect question start with enhanced emoji detection
        if (line.match(/^(?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)/)) {
            if (currentQuestion && currentOptions.length > 0) {
                currentQuestion.options = currentOptions;
                currentQuestion.explanation = currentExplanation.trim();
                questions.push(currentQuestion);
            }
            
            const difficultyMatch = line.match(/(🟢|🟡|🔴)$/);
            let difficulty = 'unknown';
            if (difficultyMatch) {
                switch (difficultyMatch[1]) {
                    case '🟢': difficulty = 'beginner'; break;
                    case '🟡': difficulty = 'intermediate'; break;
                    case '🔴': difficulty = 'advanced'; break;
                }
            }

            currentQuestion = {
                text: line.replace(/^(?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)\s*|(?:🟢|🟡|🔴)\s*$/g, '').trim(),
                difficulty: difficulty,
                options: [],
                explanation: ''
            };
            currentOptions = [];
            currentExplanation = '';
            inQuestionBlock = true;
            continue;
        }
        
        // Detect options with enhanced parsing
        if (inQuestionBlock && line.match(/^(?:📝|🔄|📦|🎯)/)) {
            const isCorrect = line.startsWith('📝');
            const optionText = line.substring(2).trim();
            currentOptions.push({
                text: optionText,
                isCorrect: isCorrect
            });
            currentExplanation = '';
            continue;
        }

        // Enhanced explanation detection
        if (inQuestionBlock) {
            if (line.includes('**Correct Answer:**') || line.includes('**Respuesta Correcta:**') ||
                line.includes('**Explanation:**') || line.includes('**Explicación:**')) {
                currentExplanation = line.replace(/\*\*(Correct Answer|Respuesta Correcta|Explanation|Explicación):\*\*/g, '').trim();
            } else if (currentExplanation !== '') {
                currentExplanation += '\n' + line;
            }
        }
    }
    
    if (currentQuestion && currentOptions.length > 0) {
        currentQuestion.options = currentOptions;
        currentQuestion.explanation = currentExplanation.trim();
        questions.push(currentQuestion);
    }
    
    console.log('Parsed questions:', questions);
    return questions;
}

// Enhanced question display with animations and better UI
function showQuestion() {
    const quizContentDiv = document.getElementById('quizContent');
    const quizLoadingDiv = document.getElementById('quizLoading');
    const quizResultsDiv = document.getElementById('quizResults');
    const quizErrorDiv = document.getElementById('quizError');

    quizLoadingDiv.style.display = 'none';
    quizResultsDiv.style.display = 'none';
    quizErrorDiv.style.display = 'none';
    quizContentDiv.style.display = 'block';

    const questionTextElement = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackElement = document.getElementById('feedback');
    const progressBar = document.querySelector('#quizContent .progress-bar');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Hide feedback and next button initially
    feedbackElement.classList.add('d-none');
    feedbackElement.innerHTML = '';
    nextQuestionBtn.style.display = 'none';

    if (currentQuestionIndex < totalQuestions) {
        const question = currentQuiz[currentQuestionIndex];
        const progress = ((currentQuestionIndex) / totalQuestions) * 100;

        // Update progress bar with animation
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
        
        // Update quiz title with progress
        const quizPageTitle = document.getElementById('quizPageTitle');
        const techName = technologies.find(t => t.id === getUrlParameter('category'))?.name || 'Quiz';
        quizPageTitle.textContent = `${techName} - ${translations[currentLanguage].question_progress(currentQuestionIndex + 1, totalQuestions)}`;

        // Add question with animation
        questionTextElement.innerHTML = question.text;
        questionTextElement.classList.add('fade-in');

        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'list-group-item list-group-item-action ripple shadow-1 quiz-option';
            optionElement.setAttribute('data-mdb-ripple-color', 'primary');
            optionElement.setAttribute('data-index', index);
            optionElement.innerHTML = `
                <div class="d-flex align-items-center">
                    <span class="option-letter me-3">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option.text}</span>
                </div>
            `;
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
            
            // Add staggered animation
            setTimeout(() => {
                optionElement.classList.add('slide-in');
            }, index * 100);
        });
    } else {
        showQuizResults();
    }
}

// Enhanced option selection with better feedback
function selectOption(event) {
    const selectedOptionElement = event.currentTarget;
    const optionIndex = parseInt(selectedOptionElement.dataset.index);
    const question = currentQuiz[currentQuestionIndex];
    const feedbackElement = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const quizOptions = document.querySelectorAll('.quiz-option');

    // Disable further clicks
    quizOptions.forEach(opt => {
        opt.removeEventListener('click', selectOption);
        opt.style.cursor = 'default';
        opt.classList.add('pe-none');
    });

    // Mark selected option
    selectedOptionElement.classList.add('selected');

    // Reveal correct answer and explanation
    const correctOptionIndex = question.options.findIndex(option => option.isCorrect);

    if (question.options[optionIndex].isCorrect) {
        selectedOptionElement.classList.add('correct');
        score++;
        
        // Add success animation
        selectedOptionElement.classList.add('feedback-correct');
        
        feedbackElement.innerHTML = `
            <div class="alert alert-success border-0 shadow-sm">
                <div class="d-flex align-items-center">
                    <i class="bi bi-check-circle-fill text-success me-3" style="font-size: 1.5rem;"></i>
                    <div>
                        <h6 class="mb-1">${translations[currentLanguage].correct_feedback}</h6>
                        <p class="mb-0 small">Great job! You got this one right.</p>
                    </div>
                </div>
            </div>
            <div class="quiz-explanation mt-3">
                <h6 class="text-primary mb-2"><i class="bi bi-lightbulb me-2"></i>Explanation</h6>
                <p class="mb-0">${question.explanation}</p>
            </div>
        `;
    } else {
        selectedOptionElement.classList.add('incorrect');
        if (correctOptionIndex !== -1) {
            quizOptions[correctOptionIndex].classList.add('correct');
        }
        
        // Add error animation
        selectedOptionElement.classList.add('feedback-incorrect');
        
        feedbackElement.innerHTML = `
            <div class="alert alert-danger border-0 shadow-sm">
                <div class="d-flex align-items-center">
                    <i class="bi bi-x-circle-fill text-danger me-3" style="font-size: 1.5rem;"></i>
                    <div>
                        <h6 class="mb-1">${translations[currentLanguage].incorrect_feedback}</h6>
                        <p class="mb-0 small">${translations[currentLanguage].correct_answer_was} <strong>${question.options[correctOptionIndex].text}</strong></p>
                    </div>
                </div>
            </div>
            <div class="quiz-explanation mt-3">
                <h6 class="text-primary mb-2"><i class="bi bi-lightbulb me-2"></i>Explanation</h6>
                <p class="mb-0">${question.explanation}</p>
            </div>
        `;
    }
    
    feedbackElement.classList.remove('d-none');
    feedbackElement.classList.add('slide-in-up');
    
    nextQuestionBtn.style.display = 'block';
    nextQuestionBtn.classList.add('fade-in');
}

// Enhanced next question function
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        showQuizResults();
    }
}

// Enhanced quiz results with detailed statistics
function showQuizResults() {
    const quizContentDiv = document.getElementById('quizContent');
    const quizResultsDiv = document.getElementById('quizResults');

    quizContentDiv.style.display = 'none';
    quizResultsDiv.style.display = 'block';

    const finalScoreElement = document.getElementById('finalScore');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const backToCategoriesResultsBtn = document.getElementById('backToCategoriesResultsBtn');
    const quizCompleteTitle = document.querySelector('#quizResults h3');

    // Calculate statistics
    const accuracy = Math.round((score / totalQuestions) * 100);
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    quizCompleteTitle.textContent = translations[currentLanguage].quiz_complete_title;
    
    finalScoreElement.innerHTML = `
        <div class="row text-center">
            <div class="col-md-4">
                <div class="stat-card bg-success text-white p-3 rounded-3 mb-3">
                    <h4 class="mb-1">${score}/${totalQuestions}</h4>
                    <small>${translations[currentLanguage].quiz_score_details(score, totalQuestions)}</small>
                </div>
            </div>
            <div class="col-md-4">
                <div class="stat-card bg-primary text-white p-3 rounded-3 mb-3">
                    <h4 class="mb-1">${accuracy}%</h4>
                    <small>${translations[currentLanguage].quiz_accuracy(accuracy)}</small>
                </div>
            </div>
            <div class="col-md-4">
                <div class="stat-card bg-info text-white p-3 rounded-3 mb-3">
                    <h4 class="mb-1">${minutes}:${seconds.toString().padStart(2, '0')}</h4>
                    <small>${translations[currentLanguage].quiz_time_taken(minutes, seconds)}</small>
                </div>
            </div>
        </div>
    `;

    restartQuizBtn.addEventListener('click', restartQuiz);
    backToCategoriesResultsBtn.addEventListener('click', () => { window.location.href = 'index.html#quizzes'; });
}

// Enhanced restart quiz function
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startTime = Date.now();
    showQuestion();
}

// Enhanced error display
function showError(message) {
    const quizLoadingDiv = document.getElementById('quizLoading');
    const quizContentDiv = document.getElementById('quizContent');
    const quizResultsDiv = document.getElementById('quizResults');
    const quizErrorDiv = document.getElementById('quizError');
    const quizErrorMessageElement = document.getElementById('quizErrorMessage');
    const errorBackToCategoriesBtn = document.getElementById('errorBackToCategoriesBtn');

    quizLoadingDiv.style.display = 'none';
    quizContentDiv.style.display = 'none';
    quizResultsDiv.style.display = 'none';
    quizErrorDiv.style.display = 'block';

    quizErrorMessageElement.textContent = message;
    errorBackToCategoriesBtn.addEventListener('click', () => { window.location.href = 'index.html#quizzes'; });
}

// Enhanced loading display
function showLoading(isLoading) {
    const quizLoadingDiv = document.getElementById('quizLoading');
    const quizContentDiv = document.getElementById('quizContent');
    const quizResultsDiv = document.getElementById('quizResults');
    const quizErrorDiv = document.getElementById('quizError');

    if (isLoading) {
        quizLoadingDiv.style.display = 'block';
        quizContentDiv.style.display = 'none';
        quizResultsDiv.style.display = 'none';
        quizErrorDiv.style.display = 'none';
    } else {
        quizLoadingDiv.style.display = 'none';
    }
}

// Helper to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\\[\\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
}

// Enhanced quiz page initialization
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof mdb !== 'undefined') {
            console.log("MDBootstrap (mdb object) found on quiz_page, initializing quiz.");
            
            // Apply dark mode
            if (localStorage.getItem('darkMode') === 'enabled') {
                document.body.classList.add('dark-mode');
                const darkModeToggle = document.getElementById('darkModeToggle');
                if (darkModeToggle) {
                    darkModeToggle.checked = true;
                }
            }
            
            // Initialize dark mode toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
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

            // Initialize language selector
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector) {
                languageSelector.value = currentLanguage;
                languageSelector.addEventListener('change', function(e) {
                    currentLanguage = e.target.value;
                    localStorage.setItem('quizLanguage', currentLanguage);
                    const category = getUrlParameter('category');
                    const level = getUrlParameter('level');
                    if (category && level) {
                        loadQuizPage(category, level, currentLanguage);
                    } else {
                        window.location.href = 'index.html';
                    }
                });
            }

            // Event listeners for quiz navigation
            document.getElementById('nextQuestionBtn')?.addEventListener('click', nextQuestion);
            document.getElementById('backToCategoriesBtn')?.addEventListener('click', () => { window.location.href = 'index.html#quizzes'; });

            // Load the quiz based on URL parameters
            const category = getUrlParameter('category');
            const level = getUrlParameter('level');
            if (category && level) {
                loadQuizPage(category, level, currentLanguage);
            } else {
                showError(translations[currentLanguage].error_no_quizzes_available);
            }

            AOS.init();
        } else {
            console.error("MDBootstrap (mdb object) still not found on quiz_page after delay.");
        }
    }, 100);
});

// Enhanced quiz loading function with better error handling
async function loadQuizPage(category, level, language) {
    showLoading(true);
    const filePath = getQuizFilePath(category, language);
    
    try {
        console.log(`Loading quiz from: ${filePath}`);
        const response = await fetch(filePath);
        
        if (response.ok) {
            const markdown = await response.text();
            const allQuestions = parseMarkdownQuiz(markdown);
            
            // Filter questions by difficulty level
            const filteredQuestions = allQuestions.filter(q => q.difficulty === level);
            console.log(`All questions parsed: ${allQuestions.length}`);
            console.log(`Filtered questions for level ${level}: ${filteredQuestions.length}`);

            if (filteredQuestions.length > 0) {
                currentQuiz = filteredQuestions;
                currentQuestionIndex = 0;
                score = 0;
                totalQuestions = currentQuiz.length;
                startTime = Date.now();
                
                showLoading(false);
                showQuestion();
            } else {
                showError(`${translations[language].error_quiz_not_available(category)}. No questions found for this difficulty level.`);
            }
        } else {
            console.error(`HTTP error! status: ${response.status}`);
            showError(`${translations[language].error_quiz_not_available(category)}. Quiz file not found (HTTP ${response.status}).`);
        }
    } catch (error) {
        console.error("Error loading quiz:", error);
        showError(`${translations[language].error_quiz_not_available(category)}. Network error: ${error.message}`);
    }
} 