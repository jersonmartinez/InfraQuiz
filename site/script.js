// === INFRAQUIZ - ENHANCED JAVASCRIPT ===

// === CONFIGURATION ===
// Config is now managed by window.InfraQuiz.config in enhanced-config.js

// === GLOBAL STATE ===
let currentLanguage = localStorage.getItem('quizLanguage') || window.InfraQuiz?.config?.quiz?.defaultLanguage || 'en';
let isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// === TRANSLATIONS ===
// Translations are now managed by window.InfraQuiz.ui.getTranslations()

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
    return window.InfraQuiz?.ui?.getTranslations(currentLanguage) || {};
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

// === ENHANCED THEME SWITCH WITH ACCESSIBILITY ===
function initializeThemeSwitch() {
    // Check for new theme switch (landing page)
    const themeSwitch = document.getElementById('themeSwitch');
    // Check for legacy dark mode switch (quiz pages)
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Set initial state with accessibility attributes
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.setAttribute('data-theme', 'dark');
        if (themeSwitch) {
            themeSwitch.setAttribute('data-theme', 'dark');
            themeSwitch.setAttribute('aria-pressed', 'true');
            themeSwitch.setAttribute('aria-label', 'Switch to light mode');
        }
        if (darkModeToggle) {
            darkModeToggle.checked = true;
            darkModeToggle.setAttribute('aria-label', 'Dark mode enabled');
        }
    } else {
        document.body.classList.remove('dark-mode');
        document.body.setAttribute('data-theme', 'light');
        if (themeSwitch) {
            themeSwitch.setAttribute('data-theme', 'light');
            themeSwitch.setAttribute('aria-pressed', 'false');
            themeSwitch.setAttribute('aria-label', 'Switch to dark mode');
        }
        if (darkModeToggle) {
            darkModeToggle.checked = false;
            darkModeToggle.setAttribute('aria-label', 'Light mode enabled');
        }
    }

    // Add click and keyboard event for new theme switch
    if (themeSwitch) {
        const toggleTheme = () => {
            isDarkMode = !isDarkMode;

            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                document.body.setAttribute('data-theme', 'dark');
                themeSwitch.setAttribute('data-theme', 'dark');
                themeSwitch.setAttribute('aria-pressed', 'true');
                themeSwitch.setAttribute('aria-label', 'Switch to light mode');
                localStorage.setItem('darkMode', 'enabled');
                window.InfraQuiz.ui.showNotification('Dark mode enabled', 'success');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.setAttribute('data-theme', 'light');
                themeSwitch.setAttribute('data-theme', 'light');
                themeSwitch.setAttribute('aria-pressed', 'false');
                themeSwitch.setAttribute('aria-label', 'Switch to dark mode');
                localStorage.setItem('darkMode', 'disabled');
                window.InfraQuiz.ui.showNotification('Light mode enabled', 'success');
            }
        };

        themeSwitch.addEventListener('click', toggleTheme);
        themeSwitch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    // Add change event for legacy dark mode switch
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            isDarkMode = this.checked;

            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                document.body.setAttribute('data-theme', 'dark');
                this.setAttribute('aria-label', 'Dark mode enabled');
                localStorage.setItem('darkMode', 'enabled');
                window.InfraQuiz.ui.showNotification('Dark mode enabled', 'success');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.setAttribute('data-theme', 'light');
                this.setAttribute('aria-label', 'Light mode enabled');
                localStorage.setItem('darkMode', 'disabled');
                window.InfraQuiz.ui.showNotification('Light mode enabled', 'success');
            }
        });
    }
}

// === ENHANCED LANGUAGE TOGGLE WITH ACCESSIBILITY ===
function initializeLanguageToggle() {
    // Check for new language toggle (landing page)
    const languageToggle = document.getElementById('languageToggle');
    // Check for legacy language selector (quiz pages)
    const languageSelector = document.getElementById('languageSelector');

    // Set initial state with accessibility attributes
    if (languageToggle) {
        languageToggle.setAttribute('data-lang', currentLanguage);
        languageToggle.setAttribute('aria-pressed', currentLanguage === 'es' ? 'true' : 'false');
        languageToggle.setAttribute('aria-label', `Switch to ${currentLanguage === 'en' ? 'Spanish' : 'English'}`);
    }

    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.setAttribute('aria-label', 'Select language');
    }

    // Add click and keyboard event for new language toggle
    if (languageToggle) {
        const toggleLanguage = () => {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            localStorage.setItem('quizLanguage', currentLanguage);

            languageToggle.setAttribute('data-lang', currentLanguage);
            languageToggle.setAttribute('aria-pressed', currentLanguage === 'es' ? 'true' : 'false');
            languageToggle.setAttribute('aria-label', `Switch to ${currentLanguage === 'en' ? 'Spanish' : 'English'}`);

            applyTranslations();

            // Re-render quiz categories if they exist
            const container = document.getElementById('quiz-categories-container');
            if (container) {
                renderQuizCategories();
            }

            // Announce language change to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Language switched to ${currentLanguage === 'en' ? 'English' : 'Spanish'}`;
            document.body.appendChild(announcement);

            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);

            window.InfraQuiz.ui.showNotification(`Language switched to ${currentLanguage === 'en' ? 'English' : 'Spanish'}`, 'success');
        };

        languageToggle.addEventListener('click', toggleLanguage);
        languageToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLanguage();
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

            window.InfraQuiz.ui.showNotification(`Language switched to ${currentLanguage === 'en' ? 'English' : 'Spanish'}`, 'success');
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
    if (window.InfraQuiz?.github) {
        return await window.InfraQuiz.github.fetchQuizContent(category, language);
    } else {
        console.error('InfraQuiz GitHub service not available');
        throw new Error('Service not available');
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
        window.InfraQuiz.ui.showNotification('Error starting random quiz', 'error');
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
    if (window.InfraQuiz?.ui) {
        window.InfraQuiz.ui.showNotification(message, type);
    }
}

// === ACCESSIBILITY ENHANCEMENTS ===
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('main-content');
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }

    // Enhanced keyboard navigation for cards
    const quizCards = document.querySelectorAll('.quiz-card');
    quizCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Start quiz for ${card.querySelector('.card-title').textContent}`);

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const firstButton = card.querySelector('.difficulty-btn');
                if (firstButton) {
                    firstButton.click();
                }
            }
        });
    });

    // Focus management for modals and overlays
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Announce page changes to screen readers
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const addedContent = Array.from(mutation.addedNodes)
                    .filter(node => node.nodeType === Node.ELEMENT_NODE)
                    .find(node => node.matches('.notification, .alert'));

                if (addedContent) {
                    // Announce dynamic content to screen readers
                    const announcement = document.createElement('div');
                    announcement.setAttribute('aria-live', 'assertive');
                    announcement.setAttribute('aria-atomic', 'true');
                    announcement.className = 'sr-only';
                    announcement.textContent = addedContent.textContent;
                    document.body.appendChild(announcement);

                    setTimeout(() => {
                        if (document.body.contains(announcement)) {
                            document.body.removeChild(announcement);
                        }
                    }, 1000);
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // High contrast mode detection
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handleContrastChange = (e) => {
        if (e.matches) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    };

    mediaQuery.addEventListener('change', handleContrastChange);
    handleContrastChange(mediaQuery);

    // Reduced motion detection
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
        if (e.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    };

    motionQuery.addEventListener('change', handleMotionChange);
    handleMotionChange(motionQuery);
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
    initializeAccessibility(); // Add accessibility initialization

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