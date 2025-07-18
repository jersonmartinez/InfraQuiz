// InfraQuiz JavaScript functionality - Optimized Version

// === CONFIGURATION ===
const INFRAQUIZ_CONFIG = {
    VERSION: '2.0.0',
    GITHUB_REPO: 'jersonmartinez/InfraQuiz',
    GITHUB_BRANCH: 'main',
    DEFAULT_LANGUAGE: 'en',
    MAX_QUESTIONS_PER_QUIZ: 21,
    QUIZ_BASE_PATH: '../quizzes'
};

// === LOGO COMPONENT ===
const INFRAQUIZ_LOGO = {
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
        <rect x="2" y="2" width="28" height="28" rx="6" fill="#fff" stroke="#222" stroke-width="2"/>
        <rect x="8" y="8" width="16" height="16" rx="4" fill="#222"/>
        <rect x="12" y="12" width="8" height="8" rx="2" fill="#fff"/>
    </svg>`,
    
    create: function(width = 32, height = 32) {
        return this.svg.replace(/width="\d+"/, `width="${width}"`).replace(/height="\d+"/, `height="${height}"`);
    },
    
    favicon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>`
};

// Global state
let currentLanguage = localStorage.getItem('quizLanguage') || INFRAQUIZ_CONFIG.DEFAULT_LANGUAGE;

// === TECHNOLOGY CONFIGURATION ===
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

// === TRANSLATIONS ===
const translations = {
    'en': {
        'home_nav': 'Home',
        'quizzes_nav': 'Quizzes',
        'about_nav': 'About',
        'editor_nav': 'Editor',
        'analytics_nav': 'Analytics',
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
        'error_quiz_not_available': (category) => `The ${category} quiz is not available right now.`,
        'quiz_completed': 'Quiz Completed!',
        'your_score': 'Your Score:',
        'correct_answers': 'Correct Answers:',
        'restart_quiz': 'Restart Quiz',
        'back_to_categories': 'Back to Categories',
        'quiz_complete_title': '🎉 Quiz Completed!',
        'quiz_score_message': (score, total) => `You scored ${score} out of ${total} questions!`,
        'difficulty_beginner': 'Beginner',
        'difficulty_intermediate': 'Intermediate', 
        'difficulty_advanced': 'Advanced',
        'select_difficulty': 'Select Difficulty',
        'questions_available': (count) => `${count} questions available`,
        'start_quiz': 'Start Quiz',
        'correct_feedback': 'Correct!',
        'incorrect_feedback': 'Incorrect',
        'explanation_label': 'Explanation',
        'question_progress': (current, total) => `Question ${current} of ${total}`,
        'score_progress': (score, total) => `Score: ${score}/${total}`,
        'loading_content': 'Fetching questions from repository...',
        'try_again': 'Try Again',
        'debug_test': 'Debug Test'
    },
    'es': {
        'home_nav': 'Inicio',
        'quizzes_nav': 'Cuestionarios',
        'about_nav': 'Acerca de',
        'editor_nav': 'Editor',
        'analytics_nav': 'Analíticas',
        'hero_title': '🚀 Domina DevOps con Cuestionarios Interactivos',
        'hero_description': 'Aprende scripting en Bash, automatización con Python, Terraform, AWS y más a través de cuestionarios interactivos y atractivos diseñados para profesionales DevOps.',
        'start_random_quiz': 'Iniciar Cuestionario Aleatorio',
        'browse_categories': 'Explorar Categorías',
        'quiz_categories_title': '📚 Categorías de Cuestionarios',
        'quiz_categories_subtitle': 'Elige tu ruta de aprendizaje o toma un cuestionario mixto',
        'about_infraquiz_title': 'Acerca de InfraQuiz',
        'about_description_1': 'InfraQuiz es un repositorio público que contiene cuestionarios interactivos sobre herramientas y metodologías DevOps. Perfecto para reforzar conocimientos, preparación de entrevistas o estudio de certificaciones.',
        'about_description_2': 'Cada cuestionario incluye:',
        'about_feature_1': '1 respuesta correcta por pregunta',
        'about_feature_2': 'Explicaciones técnicas breves',
        'about_feature_3': 'Formato visual y atractivo con emojis',
        'about_feature_4': 'Categorías mixtas o aleatorias para probar tu conocimiento',
        'view_on_github': 'Ver en GitHub',
        'footer_text': '© 2024 InfraQuiz. Hecho con ❤️ para la comunidad DevOps.',
        'modal_close': 'Cerrar',
        'next_question': 'Siguiente Pregunta',
        'loading_quiz': 'Cargando cuestionario...',
        'loading_questions': 'Cargando preguntas...',
        'error_title': 'Error',
        'error_no_quizzes_available': 'No hay cuestionarios disponibles para iniciar. Por favor, recarga la página.',
        'error_quiz_not_available': (category) => `El cuestionario de ${category} no está disponible en este momento.`,
        'quiz_completed': '¡Cuestionario Completado!',
        'your_score': 'Tu Puntuación:',
        'correct_answers': 'Respuestas Correctas:',
        'restart_quiz': 'Reiniciar Cuestionario',
        'back_to_categories': 'Volver a Categorías',
        'quiz_complete_title': '🎉 ¡Cuestionario Completado!',
        'quiz_score_message': (score, total) => `¡Respondiste correctamente ${score} de ${total} preguntas!`,
        'difficulty_beginner': 'Principiante',
        'difficulty_intermediate': 'Intermedio',
        'difficulty_advanced': 'Avanzado',
        'select_difficulty': 'Seleccionar Dificultad',
        'questions_available': (count) => `${count} preguntas disponibles`,
        'start_quiz': 'Iniciar Cuestionario',
        'correct_feedback': '¡Correcto!',
        'incorrect_feedback': 'Incorrecto',
        'explanation_label': 'Explicación',
        'question_progress': (current, total) => `Pregunta ${current} de ${total}`,
        'score_progress': (score, total) => `Puntuación: ${score}/${total}`,
        'loading_content': 'Obteniendo preguntas del repositorio...',
        'try_again': 'Intentar de Nuevo',
        'debug_test': 'Prueba de Depuración'
    }
};

// === CORE QUIZ FUNCTIONS ===

/**
 * Enhanced quiz loading with GitHub integration and local fallback
 */
async function loadQuizFile(category, language) {
    const fileName = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
    console.log(`🔍 Loading quiz: ${category}/${language}/${fileName}`);
    
    // Define loading strategies in order of preference
    const loadingStrategies = [
        // 1. GitHub raw content (most up-to-date)
        {
            name: 'GitHub Raw',
            url: `https://raw.githubusercontent.com/${INFRAQUIZ_CONFIG.GITHUB_REPO}/${INFRAQUIZ_CONFIG.GITHUB_BRANCH}/quizzes/${category}/${language}/${fileName}`
        },
        // 2. Relative paths for local development/deployment
        {
            name: 'Local Relative',
            url: `${INFRAQUIZ_CONFIG.QUIZ_BASE_PATH}/${category}/${language}/${fileName}`
        },
        {
            name: 'Root Relative',
            url: `/quizzes/${category}/${language}/${fileName}`
        },
        {
            name: 'Current Dir',
            url: `./quizzes/${category}/${language}/${fileName}`
        }
    ];
    
    let lastError = null;
    
    // Try each strategy
    for (const strategy of loadingStrategies) {
        try {
            console.log(`📡 Trying ${strategy.name}: ${strategy.url}`);
            const response = await fetch(strategy.url);
            
            if (response.ok) {
                const content = await response.text();
                
                // Validate content
                if (content.length < 100) {
                    throw new Error('Content too small - likely not a valid quiz file');
                }
                
                if (content.includes('404') || content.includes('Not Found')) {
                    throw new Error('Content appears to be a 404 page');
                }
                
                console.log(`✅ Successfully loaded from ${strategy.name} (${Math.round(content.length / 1024)}KB)`);
                return content;
            }
            
            lastError = new Error(`${strategy.name}: HTTP ${response.status}`);
            
        } catch (error) {
            console.warn(`❌ Failed with ${strategy.name}:`, error.message);
            lastError = error;
        }
    }
    
    // Try localStorage as final fallback
    try {
        const savedQuizzes = JSON.parse(localStorage.getItem('infraquiz_saved_quizzes') || '[]');
        const matchingQuiz = savedQuizzes.find(quiz => 
            quiz.category === category && 
            (quiz.language === language || !quiz.language)
        );
        
        if (matchingQuiz) {
            console.log('📦 Using saved quiz from localStorage:', matchingQuiz.title);
            return generateMarkdownFromQuizData(matchingQuiz);
        }
    } catch (storageError) {
        console.warn('❌ localStorage fallback failed:', storageError);
    }
    
    console.error(`❌ All strategies failed for ${category}/${language}/${fileName}`);
    throw lastError || new Error('Quiz file not found in any source');
}

/**
 * Optimized markdown parser for quiz content
 */
function parseMarkdownQuiz(markdown) {
    console.log('📝 Parsing quiz markdown...');
    
    if (!markdown || markdown.length < 100) {
        console.warn('⚠️ Invalid or empty markdown content');
        return [];
    }
    
    // Check for placeholder content
    if (markdown.includes('Este archivo necesita ser completado') || 
        markdown.includes('This file needs to be completed')) {
        console.warn('⚠️ Placeholder content detected');
        return [];
    }
    
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    let currentCorrectAnswer = '';
    let currentExplanation = '';
    let inQuestionBlock = false;
    
    const optionEmojis = ['📝', '🔄', '📦', '🎯'];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '') continue;
        
        // Detect question start (H3 with emoji and number)
        if (line.match(/^### (?:\d+\.\s*)?(?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)/)) {
            // Save previous question if complete
            if (currentQuestion && currentOptions.length >= 3 && currentOptions.length <= 4) {
                // Find and mark correct option
                const correctIndex = currentOptions.findIndex(opt => 
                    opt.text === currentCorrectAnswer || 
                    opt.text.includes(currentCorrectAnswer) ||
                    opt.isCorrect
                );
                
                if (correctIndex === -1 && currentOptions.length > 0) {
                    // Fallback: mark first option as correct if no match found
                    currentOptions[0].isCorrect = true;
                }
                
                currentQuestion.options = currentOptions;
                currentQuestion.explanation = currentExplanation.trim();
                questions.push(currentQuestion);
                
                console.log(`✅ Added question: "${currentQuestion.text.substring(0, 50)}..." (${currentOptions.length} options)`);
            } else if (currentQuestion) {
                console.warn(`⚠️ Skipping malformed question: "${currentQuestion.text.substring(0, 50)}..." (${currentOptions.length} options)`);
            }
            
            // Extract difficulty from emoji
            const difficultyMatch = line.match(/(🟢|🟡|🔴)$/);
            let difficulty = 'beginner';
            if (difficultyMatch) {
                switch (difficultyMatch[1]) {
                    case '🟢': difficulty = 'beginner'; break;
                    case '🟡': difficulty = 'intermediate'; break;
                    case '🔴': difficulty = 'advanced'; break;
                }
            }
            
            // Create new question - preserve the initial emoji
            const questionTextMatch = line.match(/^### (?:\d+\.\s*)?([❓🧠💭🤔🔧⚙️🔍🚀])\s*(.+?)\s*(🟢|🟡|🔴)\s*$/);
            let questionEmoji = '';
            let questionText = '';
            
            if (questionTextMatch) {
                questionEmoji = questionTextMatch[1];
                questionText = questionTextMatch[2].trim();
            } else {
                // Fallback parsing
                questionText = line.replace(/^### (?:\d+\.\s*)?(?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)\s*/, '').replace(/(?:🟢|🟡|🔴)\s*$/, '').trim();
            }
            
            currentQuestion = {
                emoji: questionEmoji,
                text: questionText,
                difficulty: difficulty,
                options: [],
                explanation: ''
            };
            
            currentOptions = [];
            currentCorrectAnswer = '';
            currentExplanation = '';
            inQuestionBlock = true;
            console.log(`🔍 Starting new question: "${currentQuestion.text.substring(0, 50)}..."`);
            continue;
        }
        
        // Only process options if we're in a question block and don't have too many options already
        if (inQuestionBlock && currentOptions.length < 4) {
            // Check for option format: A) 📝 text
            const optionMatch = line.match(/^([A-H])\)\s*(📝|🔄|📦|🎯)\s*(.+)$/);
            if (optionMatch) {
                const optionLetter = optionMatch[1];
                const emoji = optionMatch[2];
                const optionText = optionMatch[3].trim();
                const isCorrect = emoji === '📝'; // First emoji is typically correct
                
                // Check if this option letter already exists (avoid duplicates)
                const existingOption = currentOptions.find(opt => opt.letter === optionLetter);
                if (!existingOption) {
                    currentOptions.push({
                        letter: optionLetter,
                        text: optionText,
                        isCorrect: isCorrect
                    });
                    
                    console.log(`   Option ${optionLetter}: ${emoji} ${optionText.substring(0, 30)}... (correct: ${isCorrect})`);
                }
                continue;
            }
            
            // Alternative format: lines starting directly with emoji
            if (optionEmojis.some(emoji => line.startsWith(emoji))) {
                const emoji = optionEmojis.find(e => line.startsWith(e));
                const isCorrect = emoji === '📝';
                const optionText = line.substring(2).trim();
                
                // Generate option letter
                const optionLetter = String.fromCharCode(65 + currentOptions.length); // A, B, C, D
                
                if (currentOptions.length < 4) {
                    currentOptions.push({
                        letter: optionLetter,
                        text: optionText,
                        isCorrect: isCorrect
                    });
                    
                    console.log(`   Option ${optionLetter}: ${emoji} ${optionText.substring(0, 30)}... (correct: ${isCorrect})`);
                }
                continue;
            }
        }
        
        // Detect correct answer - stop processing options after this
        if (line.includes('**Correct Answer:**') || line.includes('**Respuesta Correcta:**') || line.includes('**Respuesta correcta:**')) {
            inQuestionBlock = false; // Stop looking for more options
            
            // Look for the answer in the same line or next line
            let answerLine = line;
            if (i + 1 < lines.length) {
                answerLine += ' ' + lines[i + 1].trim();
            }
            
            // Extract the correct answer
            const answerMatch = answerLine.match(/(?:Correct Answer|Respuesta Correcta|Respuesta correcta):\*?\*?\s*([A-H]\)?\s*)?📝\s*(.+?)(?:\n|$)/i);
            if (answerMatch) {
                currentCorrectAnswer = answerMatch[2].trim();
                console.log(`   Correct answer: ${currentCorrectAnswer.substring(0, 30)}...`);
            }
            continue;
        }
        
        // Detect explanation
        if (line.startsWith('> 💡') || line.startsWith('> ⚡') || line.startsWith('> 🔍') || line.startsWith('> 📘') || line.startsWith('> 🔄')) {
            currentExplanation = line.replace(/^> [💡⚡🔍📘🔄]\s*/, '').trim();
            console.log(`   Explanation: ${currentExplanation.substring(0, 30)}...`);
            continue;
        }
    }
    
    // Don't forget the last question
    if (currentQuestion && currentOptions.length >= 3 && currentOptions.length <= 4) {
        const correctIndex = currentOptions.findIndex(opt => 
            opt.text === currentCorrectAnswer || 
            opt.text.includes(currentCorrectAnswer) ||
            opt.isCorrect
        );
        
        if (correctIndex === -1 && currentOptions.length > 0) {
            currentOptions[0].isCorrect = true;
        }
        
        currentQuestion.options = currentOptions;
        currentQuestion.explanation = currentExplanation.trim();
        questions.push(currentQuestion);
        
        console.log(`✅ Added final question: "${currentQuestion.text.substring(0, 50)}..." (${currentOptions.length} options)`);
    }
    
    console.log(`✅ Parsed ${questions.length} questions successfully`);
    
    // Debug: log first question details if available
    if (questions.length > 0) {
        const firstQ = questions[0];
        console.log('🔍 First question details:', {
            text: firstQ.text,
            difficulty: firstQ.difficulty,
            optionsCount: firstQ.options.length,
            correctOption: firstQ.options.find(opt => opt.isCorrect)?.text,
            explanation: firstQ.explanation?.substring(0, 50)
        });
    }
    
    return questions;
}

/**
 * Generate markdown from quiz data (for custom quizzes)
 */
function generateMarkdownFromQuizData(quizData) {
    const categoryEmoji = {
        'bash': '💻',
        'python': '🐍', 
        'terraform': '🏗️',
        'aws': '☁️',
        'docker': '🐳',
        'kubernetes': '⚙️',
        'ansible': '🔧',
        'github': '🐙',
        'cicd': '🔄',
        'monitoring': '📊',
        'security': '🔐',
        'networking': '🌐',
        'databases': '🗄️',
        'mixed': '🔧'
    }[quizData.category] || '❓';

    let markdown = `# ${categoryEmoji} ${quizData.title}\n\n## Questions\n\n`;

    quizData.questions.forEach((question, index) => {
        const difficultyEmoji = {
            'beginner': '🟢',
            'intermediate': '🟡', 
            'advanced': '🔴'
        }[question.difficulty];

        const optionEmojis = ['📝', '🔄', '📦', '🎯'];

        markdown += `### ${question.emoji} ${question.text} ${difficultyEmoji}\n\n`;

        question.options.forEach((option, optIndex) => {
            markdown += `${optionEmojis[optIndex]} ${option.text}\n`;
        });

        const correctOption = question.options.find(opt => opt.isCorrect);
        markdown += `\n**Correct Answer:**\n📝 ${correctOption.text}\n\n`;
        markdown += `**Explanation:**\n> 💡 ${question.explanation}\n\n`;
        
        if (index < quizData.questions.length - 1) {
            markdown += '---\n\n';
        }
    });

    return markdown;
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        'success': 'check-circle',
        'error': 'x-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    
    const icon = iconMap[type] || 'info-circle';
    
    notification.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="bi bi-${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// === INITIALIZATION ===
function applyTranslations() {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function initializeNavigation() {
    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = INFRAQUIZ_LOGO.favicon;
    }
    
    // Replace logo SVGs with the centralized version
    const logoContainers = document.querySelectorAll('.navbar-brand span:first-child, .infraquiz-logo');
    logoContainers.forEach(container => {
        const isLarge = container.classList.contains('infraquiz-logo');
        container.innerHTML = INFRAQUIZ_LOGO.create(isLarge ? 80 : 32, isLarge ? 80 : 32);
    });
    
    // Set up navigation event handlers
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
        });
    });
}

function initializeDarkMode() {
    console.log('🌙 Initializing dark mode...');
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Apply dark mode immediately if saved
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        console.log('🌙 Dark mode applied from localStorage');
    }
    
    // Find dark mode toggle on current page
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Set toggle state
        darkModeToggle.checked = isDarkMode;
        
        // Add event listener
        darkModeToggle.addEventListener('change', function() {
            console.log('🌙 Dark mode toggle changed:', this.checked);
            
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
                console.log('🌙 Dark mode enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
                console.log('☀️ Dark mode disabled');
            }
            
            // Trigger custom event for other components
            window.dispatchEvent(new CustomEvent('darkModeChanged', {
                detail: { enabled: this.checked }
            }));
        });
        
        console.log('🌙 Dark mode toggle initialized');
    } else {
        console.warn('⚠️ Dark mode toggle not found on this page');
    }
}

function initializeLanguageSelector() {
    const languageSelector = document.getElementById('languageSelector');
    if (!languageSelector) return;
    
    languageSelector.value = currentLanguage;
    languageSelector.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('quizLanguage', currentLanguage);
        applyTranslations();
        renderQuizCategories(); // Re-render with new language
    });
}

function initializeRandomQuiz() {
    const randomQuizBtn = document.querySelector('[onclick="startRandomQuiz()"]');
    if (randomQuizBtn) {
        randomQuizBtn.addEventListener('click', startRandomQuiz);
        randomQuizBtn.removeAttribute('onclick');
    }
}

// Function to start random quiz with better error handling
async function startRandomQuiz() {
    console.log('🎲 Starting random quiz...');
    
    try {
        // Use only technologies we know work well
        const reliableTechs = ['bash', 'python', 'terraform', 'aws', 'docker', 'kubernetes'];
        const currentLanguage = getCurrentLanguage();
        
        // Select random technology from reliable ones
        const randomTech = reliableTechs[Math.floor(Math.random() * reliableTechs.length)];
        
        // Select random difficulty
        const difficulties = ['beginner', 'intermediate', 'advanced'];
        const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        
        console.log(`🎯 Selected: ${randomTech} - ${randomDifficulty} - ${currentLanguage}`);
        
        // Navigate to quiz directly (let quiz page handle the loading)
        const quizUrl = `quiz.html?category=${randomTech}&level=${randomDifficulty}&lang=${currentLanguage}`;
        console.log(`🚀 Navigating to: ${quizUrl}`);
        
        // Show loading feedback
        const translations = window.InfraQuiz?.translations || {};
        const loadingMessage = currentLanguage === 'es' 
            ? 'Iniciando cuestionario aleatorio...'
            : 'Starting random quiz...';
            
        showNotification(loadingMessage, 'info');
        
        // Navigate after brief delay to show the notification
        setTimeout(() => {
            window.location.href = quizUrl;
        }, 500);
        
    } catch (error) {
        console.error('❌ Failed to start random quiz:', error);
        
        const currentLanguage = getCurrentLanguage();
        const errorMessage = currentLanguage === 'es' 
            ? `Error al iniciar cuestionario aleatorio: ${error.message}. Por favor, intenta seleccionar un cuestionario específico.`
            : `Failed to start random quiz: ${error.message}. Please try selecting a specific quiz.`;
            
        showNotification(errorMessage, 'error');
    }
}

function renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    container.innerHTML = '';

    technologies.forEach(tech => {
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', Math.random() * 200);

        card.innerHTML = `
            <div class="quiz-card" data-category="${tech.id}">
                <div class="card-body text-center">
                    <i class="bi ${tech.icon} display-1 text-${tech.color} mb-3"></i>
                    <h5 class="card-title fw-bold">${tech.name}</h5>
                    <p class="card-text">${tech.description}</p>
                    <div class="d-flex gap-2 justify-content-center flex-wrap">
                        <button class="btn btn-outline-${tech.color} btn-sm quiz-level-btn" 
                                data-category="${tech.id}" data-level="beginner">
                            ${translations[currentLanguage].difficulty_beginner}
                        </button>
                        <button class="btn btn-outline-${tech.color} btn-sm quiz-level-btn" 
                                data-category="${tech.id}" data-level="intermediate">
                            ${translations[currentLanguage].difficulty_intermediate}
                        </button>
                        <button class="btn btn-outline-${tech.color} btn-sm quiz-level-btn" 
                                data-category="${tech.id}" data-level="advanced">
                            ${translations[currentLanguage].difficulty_advanced}
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Add event listeners to quiz buttons
    const quizButtons = container.querySelectorAll('.quiz-level-btn');
    quizButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            const level = e.target.getAttribute('data-level');
            window.location.href = `quiz.html?category=${category}&level=${level}&lang=${currentLanguage}`;
        });
    });
}

function scrollToQuizzes() {
    document.getElementById('quizzes').scrollIntoView({ behavior: 'smooth' });
}

// === GLOBAL INFRAQUIZ OBJECT ===
window.InfraQuiz = {
    config: INFRAQUIZ_CONFIG,
    logo: INFRAQUIZ_LOGO,
    technologies: technologies,
    translations: translations,
    currentLanguage: () => currentLanguage,
    loadQuizFile: loadQuizFile,
    parseMarkdownQuiz: parseMarkdownQuiz,
    generateMarkdownFromQuizData: generateMarkdownFromQuizData
};

// === INITIALIZATION ON DOM READY ===
document.addEventListener('DOMContentLoaded', () => {
    console.log(`🚀 InfraQuiz ${INFRAQUIZ_CONFIG.VERSION} initialized`);
    
    // Initialize core components
    initializeNavigation();
    initializeDarkMode();
    initializeLanguageSelector();
    initializeRandomQuiz();
    applyTranslations();
    
    // Render quiz categories if container exists
    if (document.getElementById('quiz-categories-container')) {
        renderQuizCategories();
    }
    
    console.log('✅ InfraQuiz ready!');
    
    // Notify that InfraQuiz is fully loaded
    window.dispatchEvent(new CustomEvent('infraquiz:loaded', {
        detail: { version: INFRAQUIZ_CONFIG.VERSION }
    }));
});