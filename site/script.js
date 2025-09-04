// === INFRAQUIZ - ENHANCED JAVASCRIPT ===

// === CONFIGURATION ===
const INFRAQUIZ_CONFIG = {
    VERSION: '2.0.0',
    GITHUB_REPO: 'jersonmartinez/InfraQuiz',
    GITHUB_BRANCH: 'main',
    DEFAULT_LANGUAGE: 'en',
    MAX_QUESTIONS_PER_QUIZ: 21,
    QUIZ_BASE_PATH: '../quizzes'
};

// === GLOBAL STATE ===
let currentLanguage = localStorage.getItem('quizLanguage') || INFRAQUIZ_CONFIG.DEFAULT_LANGUAGE;
let isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// === TRANSLATIONS ===
const translations = {
    en: {
        // Navigation
        home_nav: 'Home',
        quizzes_nav: 'Quizzes',
        flashcards_nav: 'Flashcards',
        about_nav: 'About',
        editor_nav: 'Editor',
        analytics_nav: 'Analytics',
        
        // Hero Section
        hero_title: 'Master DevOps with Interactive Quizzes',
        hero_description: 'Dive into the world of DevOps with our comprehensive collection of interactive quizzes. From Bash scripting to Kubernetes orchestration, master the tools that power modern infrastructure.',
        start_random_quiz: 'Start Random Quiz',
        study_flashcards: 'Study Flashcards',
        browse_categories: 'Browse Categories',
        
        // Quiz Categories
        quiz_categories_title: 'Quiz Categories',
        quiz_categories_subtitle: 'Choose your learning path and master DevOps technologies',
        
        // Quiz Cards
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        
        // Tooltips
        beginner_tooltip: 'Perfect for newcomers to DevOps concepts',
        intermediate_tooltip: 'For those with some DevOps experience',
        advanced_tooltip: 'Challenging questions for DevOps experts',
        
        // Footer
        footer_text: '© 2025 InfraQuiz. Made with ❤️ for the DevOps community.',
        finish_quiz: 'Finish Quiz',
        
        // Flashcards Section
        flashcards_title: 'Interactive Flashcards',
        flashcards_description: 'Master DevOps concepts with our advanced spaced repetition system. Study smarter, not harder with personalized learning paths and gamified progress tracking.',
        feature_spaced: 'Spaced Repetition Algorithm',
        feature_gamified: 'Gamified Learning Experience',
        feature_progress: 'Detailed Progress Analytics',
        feature_adaptive: 'Adaptive Difficulty',
        start_flashcards: 'Start Studying Now',
        cards_available: 'Cards Available',
        categories_covered: 'Categories',
        algorithm_used: 'Algorithm'
    },
    es: {
        // Navigation
        home_nav: 'Inicio',
        quizzes_nav: 'Cuestionarios',
        flashcards_nav: 'Tarjetas',
        about_nav: 'Acerca de',
        editor_nav: 'Editor',
        analytics_nav: 'Analíticas',
        
        // Hero Section
        hero_title: 'Domina DevOps con Cuestionarios Interactivos',
        hero_description: 'Sumérgete en el mundo de DevOps con nuestra colección completa de cuestionarios interactivos. Desde scripting en Bash hasta orquestación con Kubernetes, domina las herramientas que impulsan la infraestructura moderna.',
        start_random_quiz: 'Iniciar Cuestionario Aleatorio',
        study_flashcards: 'Estudiar Tarjetas',
        browse_categories: 'Explorar Categorías',
        
        // Quiz Categories
        quiz_categories_title: 'Categorías de Cuestionarios',
        quiz_categories_subtitle: 'Elige tu ruta de aprendizaje y domina las tecnologías DevOps',
        
        // Quiz Cards
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        
        // Tooltips
        beginner_tooltip: 'Perfecto para principiantes en conceptos DevOps',
        intermediate_tooltip: 'Para aquellos con algo de experiencia en DevOps',
        advanced_tooltip: 'Preguntas desafiantes para expertos en DevOps',
        
        // Footer
        footer_text: '© 2025 InfraQuiz. Hecho con ❤️ para la comunidad DevOps.',
        finish_quiz: 'Finalizar Cuestionario',
        
        // Flashcards Section
        flashcards_title: 'Tarjetas Interactivas',
        flashcards_description: 'Domina conceptos DevOps con nuestro avanzado sistema de repetición espaciada. Estudia de manera más inteligente con rutas de aprendizaje personalizadas y seguimiento gamificado del progreso.',
        feature_spaced: 'Algoritmo de Repetición Espaciada',
        feature_gamified: 'Experiencia de Aprendizaje Gamificada',
        feature_progress: 'Analíticas Detalladas de Progreso',
        feature_adaptive: 'Dificultad Adaptativa',
        start_flashcards: 'Comenzar a Estudiar Ahora',
        cards_available: 'Tarjetas Disponibles',
        categories_covered: 'Categorías',
        algorithm_used: 'Algoritmo'
    }
};

// === QUIZ TECHNOLOGIES ===
const quizTechnologies = [
    {
        id: 'bash',
        name: { en: 'Bash Scripting', es: 'Scripting Bash' },
        description: { en: 'Master shell scripting fundamentals and automation', es: 'Domina los fundamentos del scripting de shell y automatización' },
        icon: 'bi-terminal',
        color: 'var(--bash-green)',
        difficulties: ['beginner', 'intermediate']
    },
    {
        id: 'python',
        name: { en: 'Python Automation', es: 'Automatización Python' },
        description: { en: 'Learn Python for DevOps and automation tasks', es: 'Aprende Python para tareas de DevOps y automatización' },
        icon: 'bi-code-slash',
        color: 'var(--python-blue)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'terraform',
        name: { en: 'Terraform', es: 'Terraform' },
        description: { en: 'Infrastructure as Code with HashiCorp Terraform', es: 'Infraestructura como Código con HashiCorp Terraform' },
        icon: 'bi-gear',
        color: 'var(--terraform-purple)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'aws',
        name: { en: 'AWS', es: 'AWS' },
        description: { en: 'Amazon Web Services and cloud computing', es: 'Amazon Web Services y computación en la nube' },
        icon: 'bi-cloud',
        color: 'var(--aws-orange)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'docker',
        name: { en: 'Docker', es: 'Docker' },
        description: { en: 'Containerization with Docker', es: 'Containerización con Docker' },
        icon: 'bi-box',
        color: 'var(--docker-blue)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'kubernetes',
        name: { en: 'Kubernetes', es: 'Kubernetes' },
        description: { en: 'Orchestrate containers with Kubernetes', es: 'Orquesta contenedores con Kubernetes' },
        icon: 'bi-diagram-3',
        color: 'var(--kubernetes-blue)',
        difficulties: ['intermediate', 'advanced']
    },
    {
        id: 'ansible',
        name: { en: 'Ansible', es: 'Ansible' },
        description: { en: 'Automation with Ansible', es: 'Automatización con Ansible' },
        icon: 'bi-tools',
        color: 'var(--ansible-red)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'github',
        name: { en: 'GitHub Actions', es: 'GitHub Actions' },
        description: { en: 'CI/CD with GitHub Actions', es: 'CI/CD con GitHub Actions' },
        icon: 'bi-github',
        color: 'var(--github-black)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'cicd',
        name: { en: 'CI/CD', es: 'CI/CD' },
        description: { en: 'Continuous Integration and Deployment', es: 'Integración y Despliegue Continuo' },
        icon: 'bi-arrow-repeat',
        color: 'var(--cicd-purple)',
        difficulties: ['beginner', 'intermediate']
    },
    {
        id: 'monitoring',
        name: { en: 'Monitoring', es: 'Monitoreo' },
        description: { en: 'System monitoring and observability', es: 'Monitoreo de sistemas y observabilidad' },
        icon: 'bi-graph-up',
        color: 'var(--monitoring-orange)',
        difficulties: ['intermediate', 'advanced']
    },
    {
        id: 'security',
        name: { en: 'Security', es: 'Seguridad' },
        description: { en: 'DevOps security practices and tools', es: 'Prácticas y herramientas de seguridad DevOps' },
        icon: 'bi-shield-check',
        color: 'var(--security-red)',
        difficulties: ['intermediate', 'advanced']
    },
    {
        id: 'networking',
        name: { en: 'Networking', es: 'Redes' },
        description: { en: 'Network configuration and management', es: 'Configuración y gestión de redes' },
        icon: 'bi-hdd-network',
        color: 'var(--networking-teal)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'databases',
        name: { en: 'Databases', es: 'Bases de Datos' },
        description: { en: 'Database administration and optimization', es: 'Administración y optimización de bases de datos' },
        icon: 'bi-database',
        color: 'var(--database-brown)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    },
    {
        id: 'mixed',
        name: { en: 'Mixed', es: 'Mixto' },
        description: { en: 'Random questions from all categories', es: 'Preguntas aleatorias de todas las categorías' },
        icon: 'bi-shuffle',
        color: 'var(--secondary-purple)',
        difficulties: ['beginner', 'intermediate', 'advanced']
    }
];

// === UTILITY FUNCTIONS ===
function getCurrentLanguage() {
    return currentLanguage;
}

function getTranslations() {
    return translations[currentLanguage] || translations.en;
}

function applyTranslations() {
    const elements = document.querySelectorAll('[data-lang-key]');
    const t = getTranslations();
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
}

// === ENHANCED THEME SWITCH ===
function initializeThemeSwitch() {
    // Check for new theme switch (landing page)
    const themeSwitch = document.getElementById('themeSwitch');
    // Check for legacy dark mode switch (quiz pages)
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Set initial state
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (themeSwitch) {
            themeSwitch.setAttribute('data-theme', 'dark');
        }
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (themeSwitch) {
            themeSwitch.setAttribute('data-theme', 'light');
        }
        if (darkModeToggle) {
            darkModeToggle.checked = false;
        }
    }

    // Add click event for new theme switch
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                themeSwitch.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                themeSwitch.setAttribute('data-theme', 'light');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Add change event for legacy dark mode switch
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            isDarkMode = this.checked;
            
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
}

// === ENHANCED LANGUAGE TOGGLE ===
function initializeLanguageToggle() {
    // Check for new language toggle (landing page)
    const languageToggle = document.getElementById('languageToggle');
    // Check for legacy language selector (quiz pages)
    const languageSelector = document.getElementById('languageSelector');
    
    // Set initial state
    if (languageToggle) {
        languageToggle.setAttribute('data-lang', currentLanguage);
    }
    
    if (languageSelector) {
        languageSelector.value = currentLanguage;
    }

    // Add click event for new language toggle
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            localStorage.setItem('quizLanguage', currentLanguage);
            
            languageToggle.setAttribute('data-lang', currentLanguage);
            applyTranslations();
            
            // Re-render quiz categories if they exist
            const container = document.getElementById('quiz-categories-container');
            if (container) {
                renderQuizCategories();
            }
        });
    }

    // Add change event for legacy language selector
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('quizLanguage', currentLanguage);
            
            applyTranslations();
            
            // Re-render quiz categories if they exist
            const container = document.getElementById('quiz-categories-container');
            if (container) {
                renderQuizCategories();
            }
        });
    }
}

// === SCROLL TO TOP FUNCTIONALITY ===
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === DYNAMIC YEAR IN FOOTER ===
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// === NAVIGATION INITIALIZATION ===
function initializeNavigation() {
    console.log('🧭 Navigation initialized');
    
    // Navbar scroll effect
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === QUIZ FILE LOADING ===
async function loadQuizFile(category, language) {
    const config = {
        GITHUB_REPO: INFRAQUIZ_CONFIG.GITHUB_REPO,
        GITHUB_BRANCH: INFRAQUIZ_CONFIG.GITHUB_BRANCH,
        QUIZ_BASE_PATH: INFRAQUIZ_CONFIG.QUIZ_BASE_PATH
    };

    // Determine the correct filename based on language
    const quizFile = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
    const filePath = `${config.QUIZ_BASE_PATH}/${category}/${language}/${quizFile}`;
    
    // Try GitHub first
    const githubUrl = `https://raw.githubusercontent.com/${config.GITHUB_REPO}/${config.GITHUB_BRANCH}/quizzes/${category}/${language}/${quizFile}`;
    
    try {
        console.log(`📥 Loading quiz from GitHub: ${githubUrl}`);
        const response = await fetch(githubUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub HTTP ${response.status}: ${response.statusText}`);
        }
        
        const content = await response.text();
        console.log(`✅ Successfully loaded ${Math.round(content.length / 1024)}KB from GitHub`);
        return content;
        
    } catch (githubError) {
        console.warn(`⚠️ GitHub load failed: ${githubError.message}`);
        
        // Fallback to local file
        try {
            console.log(`📥 Trying local file: ${filePath}`);
            const localResponse = await fetch(filePath);
            
            if (!localResponse.ok) {
                throw new Error(`Local HTTP ${localResponse.status}: ${localResponse.statusText}`);
            }
            
            const content = await localResponse.text();
            console.log(`✅ Successfully loaded ${Math.round(content.length / 1024)}KB from local file`);
            return content;
            
        } catch (localError) {
            console.error(`❌ Local load also failed: ${localError.message}`);
            throw new Error(`Failed to load quiz file from both GitHub and local sources. GitHub error: ${githubError.message}, Local error: ${localError.message}`);
        }
    }
}

// === QUIZ PARSING ===
function parseMarkdownQuiz(markdown) {
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    let currentExplanation = '';
    let inExplanation = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;

        // Question header (###)
        if (line.startsWith('###')) {
            // Save previous question if exists
            if (currentQuestion && currentOptions.length > 0) {
                currentQuestion.options = currentOptions;
                currentQuestion.explanation = currentExplanation.trim();
                questions.push(currentQuestion);
            }

            // Start new question
            const questionText = line.replace(/^###\s*/, '').trim();
            const { emoji, text } = extractEmojiAndText(questionText);
            
            currentQuestion = {
                text: text,
                emoji: emoji,
                difficulty: extractDifficulty(questionText),
                options: [],
                explanation: ''
            };
            
            currentOptions = [];
            currentExplanation = '';
            inExplanation = false;
            continue;
        }

        // Options (📝, 🔄, 📦, 🎯)
        if (line.match(/^[📝🔄📦🎯]\s/)) {
            inExplanation = false;
            const optionText = line.replace(/^[📝🔄📦🎯]\s/, '').trim();
            const optionIndex = currentOptions.length;
            
            currentOptions.push({
                text: optionText,
                emoji: line.charAt(0),
                isCorrect: false
            });
            continue;
        }

        // Correct answer
        if (line.match(/^\*\*(?:Correct Answer|Respuesta correcta)\*\*:/)) {
            const match = line.match(/[A-D]\)/);
            if (match) {
                const correctLetter = match[0].charAt(0);
                const correctIndex = correctLetter.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
                
                if (currentOptions[correctIndex]) {
                    currentOptions[correctIndex].isCorrect = true;
                }
            }
            continue;
        }

        // Explanation
        if (line.match(/^\*\*(?:Explanation|Explicación)\*\*:/)) {
            inExplanation = true;
            currentExplanation = line.replace(/^\*\*(?:Explanation|Explicación)\*\*:\s*/, '').trim();
            continue;
        }

        // Continue explanation
        if (inExplanation && line) {
            currentExplanation += '\n' + line;
        }
    }

    // Add the last question
    if (currentQuestion && currentOptions.length > 0) {
        currentQuestion.options = currentOptions;
        currentQuestion.explanation = currentExplanation.trim();
        questions.push(currentQuestion);
    }

    return questions;
}

function extractEmojiAndText(text) {
    const emojiMatch = text.match(/^([📝🔄📦🎯💻🐍🏗️☁️🐳⚙️🔧🐙📊🔐🌐🗄️🔧])\s*(.*)/);
    if (emojiMatch) {
        return {
            emoji: emojiMatch[1],
            text: emojiMatch[2].trim()
        };
    }
    return {
        emoji: '❓',
        text: text
    };
}

function extractDifficulty(text) {
    if (text.includes('🟢') || text.toLowerCase().includes('beginner') || text.toLowerCase().includes('principiante')) {
        return 'beginner';
    } else if (text.includes('🔴') || text.toLowerCase().includes('advanced') || text.toLowerCase().includes('avanzado')) {
        return 'advanced';
    } else {
        return 'intermediate';
    }
}

// === QUIZ CATEGORIES RENDERING ===
function renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    const t = getTranslations();
    
    container.innerHTML = quizTechnologies.map(tech => {
        const difficultyButtons = tech.difficulties.map(difficulty => {
            const tooltipKey = `${difficulty}_tooltip`;
            return `
                <button class="difficulty-btn ${difficulty}" 
                        data-tooltip="${t[tooltipKey] || difficulty}"
                        onclick="startQuiz('${tech.id}', '${difficulty}', '${currentLanguage}')">
                    ${t[difficulty]}
                </button>
            `;
        }).join('');

        return `
            <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${Math.random() * 200}">
                <div class="quiz-card" data-category="${tech.id}">
                    <div class="card-body">
                        <div class="mb-3">
                            <i class="bi ${tech.icon}" style="font-size: 3rem; color: ${tech.color};"></i>
                        </div>
                        <h5 class="card-title">${tech.name[currentLanguage]}</h5>
                        <p class="card-text">${tech.description[currentLanguage]}</p>
                        <div class="difficulty-buttons">
                            ${difficultyButtons}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// === RANDOM QUIZ FUNCTIONALITY ===
async function startRandomQuiz() {
    try {
        // Select random technology and difficulty
        const randomTech = quizTechnologies[Math.floor(Math.random() * quizTechnologies.length)];
        const randomDifficulty = randomTech.difficulties[Math.floor(Math.random() * randomTech.difficulties.length)];
        
        console.log(`🎲 Starting random quiz: ${randomTech.id} - ${randomDifficulty}`);
        
        // Redirect to quiz page
        window.location.href = `quiz.html?category=${randomTech.id}&level=${randomDifficulty}&lang=${currentLanguage}`;
        
    } catch (error) {
        console.error('❌ Error starting random quiz:', error);
        showNotification('Error starting random quiz', 'error');
    }
}

function initializeRandomQuiz() {
    const randomQuizBtn = document.querySelector('[data-lang-key="start_random_quiz"]');
    if (randomQuizBtn) {
        randomQuizBtn.addEventListener('click', startRandomQuiz);
    } else {
        console.warn('⚠️ Random quiz button not found');
    }
}

// === QUIZ START FUNCTION ===
function startQuiz(category, level, language) {
    console.log(`🚀 Starting quiz: ${category} - ${level} - ${language}`);
    window.location.href = `quiz.html?category=${category}&level=${level}&lang=${language}`;
}

// === UTILITY FUNCTIONS ===
function scrollToQuizzes() {
    const quizzesSection = document.getElementById('quizzes');
    if (quizzesSection) {
        quizzesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
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

// === INITIALIZATION ===
function initializeInfraQuiz() {
    console.log('🚀 InfraQuiz 2.0.0 initialized');
    
    // Initialize all components
    initializeNavigation();
    initializeThemeSwitch();
    initializeLanguageToggle();
    initializeScrollToTop();
    initializeRandomQuiz();
    
    // Apply translations
    applyTranslations();
    
    // Update footer year
    updateFooterYear();
    
    // Render quiz categories if on main page
    const container = document.getElementById('quiz-categories-container');
    if (container) {
        renderQuizCategories();
    }
    
    console.log('✅ InfraQuiz ready!');
}

// === EXPORT FOR GLOBAL USE ===
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    getCurrentLanguage,
    getTranslations,
    startQuiz,
    startRandomQuiz,
    showNotification
};

// === DOCUMENT READY ===
document.addEventListener('DOMContentLoaded', initializeInfraQuiz);