// InfraQuiz JavaScript functionality - Enhanced Version

// Default language
let currentLanguage = localStorage.getItem('quizLanguage') || 'en';

// Supported technologies with display names and icons
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

// Translations object for static texts
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
        'quiz_complete_title': '🎉 You have completed the quiz! Your final score is:',
        'quiz_score_details': (score, total) => `You got ${score} out of ${total} questions correct.`, 
        'restart_quiz': 'Restart Quiz',
        'back_to_categories': 'Back to Categories',
        'coming_soon_message': 'This category will be available soon. Check back later!',
        'difficulty_beginner': 'Beginner',
        'difficulty_intermediate': 'Intermediate',
        'difficulty_advanced': 'Advanced',
        'questions_count': (count) => `${count} questions`,
        'estimated_time': (minutes) => `~${minutes} min`,
        'editor_nav': 'Editor',
        'analytics_nav': 'Analytics'
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
        'quiz_complete_title': '🎉 Has completado el quiz! Tu puntuación final es:',
        'quiz_score_details': (score, total) => `Obtuviste ${score} de ${total} preguntas correctas.`, 
        'restart_quiz': 'Reiniciar Quiz',
        'back_to_categories': 'Volver a Categorías',
        'coming_soon_message': 'Esta categoría estará disponible pronto. ¡Vuelve más tarde!',
        'difficulty_beginner': 'Principiante',
        'difficulty_intermediate': 'Intermedio',
        'difficulty_advanced': 'Avanzado',
        'questions_count': (count) => `${count} preguntas`,
        'estimated_time': (minutes) => `~${minutes} min`,
        'editor_nav': 'Editor',
        'analytics_nav': 'Analíticas'
    }
};

// Function to apply translations to static texts
function applyTranslations() {
    const currentTranslations = translations[currentLanguage];

    // Navbar links
    const homeLink = document.querySelector('a[href="#home"]');
    const quizzesLink = document.querySelector('a[href="#quizzes"]');
    const aboutLink = document.querySelector('a[href="#about"]');
    const editorLink = document.querySelector('a[href="quiz-editor.html"]');
    const analyticsLink = document.querySelector('a[href="analytics.html"]');
    
    if (homeLink) homeLink.textContent = currentTranslations.home_nav;
    if (quizzesLink) quizzesLink.textContent = currentTranslations.quizzes_nav;
    if (aboutLink) aboutLink.textContent = currentTranslations.about_nav;
    if (editorLink) editorLink.textContent = currentTranslations.editor_nav;
    if (analyticsLink) analyticsLink.textContent = currentTranslations.analytics_nav;

    // Hero Section
    document.querySelector('h1.display-3').innerHTML = currentTranslations.hero_title;
    document.querySelector('p.lead.mb-4.opacity-75').textContent = currentTranslations.hero_description;
    document.querySelector('button[onclick="startRandomQuiz()"]').innerHTML = `<i class="bi bi-play-circle me-2"></i> ${currentTranslations.start_random_quiz}`;
    document.querySelector('button[onclick="scrollToQuizzes()"]').innerHTML = `<i class="bi bi-list-check me-2"></i> ${currentTranslations.browse_categories}`;

    // Quiz Categories Section
    document.querySelector('#quizzes h2').innerHTML = currentTranslations.quiz_categories_title;
    document.querySelector('#quizzes p.lead').textContent = currentTranslations.quiz_categories_subtitle;

    // About Section
    document.querySelector('#about h2').textContent = currentTranslations.about_infraquiz_title;
    document.querySelector('#about p.lead.mb-4').textContent = currentTranslations.about_description_1;
    document.querySelector('#about p.mb-4').textContent = currentTranslations.about_description_2;
    document.querySelector('#about ul li:nth-child(1)').innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_1}`;
    document.querySelector('#about ul li:nth-child(2)').innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_2}`;
    document.querySelector('#about ul li:nth-child(3)').innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_3}`;
    document.querySelector('#about ul li:nth-child(4)').innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_4}`;
    document.querySelector('#about a[href*="github.com"]').innerHTML = `<i class="bi bi-github me-2"></i> ${currentTranslations.view_on_github}`;

    // Footer
    document.querySelector('footer p.mb-0').innerHTML = currentTranslations.footer_text;
}

// Initialize the application
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof mdb !== 'undefined') {
            console.log("MDBootstrap (mdb object) found, initializing app.");
            initializeNavigation();
            initializeDarkMode();
            initializeLanguageSelector();
            renderQuizCategories();
            applyTranslations();
            initializeRandomQuiz();
            AOS.init();
        } else {
            console.error("MDBootstrap (mdb object) still not found after delay. There might be a deeper issue.");
        }
    }, 100);
});

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mainNavbar = document.getElementById('main-navbar');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Collapse navbar on mobile after clicking a link
            if (window.innerWidth < 992) {
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const collapseInstance = mdb.Collapse.getInstance(navbarCollapse);
                    if (collapseInstance) {
                        collapseInstance.hide();
                    }
                }
            }
        });
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNavbar.classList.add('shadow-2');
            mainNavbar.classList.remove('shadow-0');
        } else {
            mainNavbar.classList.remove('shadow-2');
            mainNavbar.classList.add('shadow-0');
        }
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - mainNavbar.offsetHeight - 50) {
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

// Initialize dark mode
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
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

// Initialize language selector
function initializeLanguageSelector() {
    const languageSelector = document.getElementById('languageSelector');
    if (!languageSelector) return;

    languageSelector.value = currentLanguage;
    languageSelector.addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        localStorage.setItem('quizLanguage', currentLanguage);
        renderQuizCategories();
        applyTranslations();
    });
}

// Initialize random quiz functionality
function initializeRandomQuiz() {
    // Add click event listener for the random quiz button
    const randomQuizBtn = document.querySelector('button[onclick="startRandomQuiz()"]');
    if (randomQuizBtn) {
        randomQuizBtn.addEventListener('click', startRandomQuiz);
    }
}

// Start random quiz function
function startRandomQuiz() {
    // Get a random technology (excluding 'mixed')
    const availableTechs = technologies.filter(tech => tech.id !== 'mixed');
    const randomTech = availableTechs[Math.floor(Math.random() * availableTechs.length)];
    const difficulties = ['beginner', 'intermediate', 'advanced'];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    // Navigate to quiz page with random parameters
    window.location.href = `quiz.html?category=${randomTech.id}&level=${randomDifficulty}&lang=${currentLanguage}`;
}

// Render quiz categories dynamically with enhanced features
function renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    container.innerHTML = '';

    technologies.forEach((tech, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', `${index * 100}`);

        const currentTranslations = translations[currentLanguage];
        const userStats = getUserStats(tech.id);
        const recommendedDifficulty = getRecommendedDifficulty(tech.id);
        
        col.innerHTML = `
            <div class="card quiz-card h-100 shadow-3" data-category="${tech.id}">
                <div class="card-body text-center">
                    <i class="bi ${tech.icon} display-4 mb-3"></i>
                    <h5 class="card-title fw-bold mb-2">${tech.name}</h5>
                    <p class="card-text text-muted"><small>${tech.description}</small></p>
                    ${renderUserProgress(tech.id, userStats)}
                    <div class="d-flex justify-content-center flex-wrap gap-2 mt-3">
                        <a href="quiz.html?category=${tech.id}&level=beginner&lang=${currentLanguage}" 
                           class="btn btn-success btn-sm m-0 ${recommendedDifficulty === 'beginner' ? 'recommended' : ''}" 
                           data-bs-toggle="tooltip" 
                           data-bs-placement="top" 
                           title="${currentTranslations.difficulty_beginner} - ${currentTranslations.questions_count(21)}">
                            ${currentTranslations.difficulty_beginner}
                            ${recommendedDifficulty === 'beginner' ? ' ⭐' : ''}
                        </a>
                        <a href="quiz.html?category=${tech.id}&level=intermediate&lang=${currentLanguage}" 
                           class="btn btn-warning btn-sm m-0 ${recommendedDifficulty === 'intermediate' ? 'recommended' : ''}"
                           data-bs-toggle="tooltip" 
                           data-bs-placement="top" 
                           title="${currentTranslations.difficulty_intermediate} - ${currentTranslations.questions_count(21)}">
                            ${currentTranslations.difficulty_intermediate}
                            ${recommendedDifficulty === 'intermediate' ? ' ⭐' : ''}
                        </a>
                        <a href="quiz.html?category=${tech.id}&level=advanced&lang=${currentLanguage}" 
                           class="btn btn-danger btn-sm m-0 ${recommendedDifficulty === 'advanced' ? 'recommended' : ''}"
                           data-bs-toggle="tooltip" 
                           data-bs-placement="top" 
                           title="${currentTranslations.difficulty_advanced} - ${currentTranslations.questions_count(21)}">
                            ${currentTranslations.difficulty_advanced}
                            ${recommendedDifficulty === 'advanced' ? ' ⭐' : ''}
                        </a>
                    </div>
                    ${renderAchievements(tech.id)}
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    // Initialize tooltips
    if (typeof mdb !== 'undefined' && mdb.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new mdb.Tooltip(tooltipTriggerEl);
        });
    }
}

// Scroll to quizzes section
function scrollToQuizzes() {
    document.getElementById('quizzes').scrollIntoView({ behavior: 'smooth' });
}

// Enhanced quiz loading function with better error handling
async function loadQuizFile(category, language) {
    const fileName = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
    const filePath = `../quizzes/${category}/${language}/${fileName}`;
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        console.error(`Error loading quiz file: ${filePath}`, error);
        throw error;
    }
}

// Parse markdown quiz content with enhanced parsing
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
        
        // Detect question start
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
        
        // Detect options
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

        // Detect explanation
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

// Export functions for use in other files
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage
};

// ===== SISTEMA DE GAMIFICACIÓN Y PROGRESO =====

// Sistema de logros
const achievements = {
    'first_quiz': { 
        name: { en: 'First Steps', es: 'Primeros Pasos' }, 
        description: { en: 'Complete your first quiz', es: 'Completa tu primer quiz' },
        icon: '🎯'
    },
    'bash_master': { 
        name: { en: 'Shell Master', es: 'Maestro de Shell' }, 
        description: { en: 'Score 90%+ on Bash quiz', es: 'Obtén 90%+ en el quiz de Bash' },
        icon: '💻'
    },
    'streak_7': { 
        name: { en: 'Week Warrior', es: 'Guerrero Semanal' }, 
        description: { en: '7-day learning streak', es: 'Racha de aprendizaje de 7 días' },
        icon: '🔥'
    },
    'perfect_score': { 
        name: { en: 'Perfectionist', es: 'Perfeccionista' }, 
        description: { en: 'Get 100% on any quiz', es: 'Obtén 100% en cualquier quiz' },
        icon: '⭐'
    },
    'devops_explorer': {
        name: { en: 'DevOps Explorer', es: 'Explorador DevOps' },
        description: { en: 'Try quizzes from 5 different categories', es: 'Prueba quizzes de 5 categorías diferentes' },
        icon: '🗺️'
    },
    'speed_demon': {
        name: { en: 'Speed Demon', es: 'Demonio de Velocidad' },
        description: { en: 'Complete a quiz in under 5 minutes', es: 'Completa un quiz en menos de 5 minutos' },
        icon: '⚡'
    }
};

// Obtener estadísticas del usuario
function getUserStats(category) {
    const stats = JSON.parse(localStorage.getItem('infraquiz_stats') || '{}');
    return stats[category] || { 
        totalQuizzes: 0, 
        bestScore: 0, 
        averageScore: 0, 
        totalTime: 0,
        lastPlayed: null,
        streak: 0
    };
}

// Guardar estadísticas del usuario
function saveUserStats(category, score, totalQuestions, timeSpent) {
    const stats = JSON.parse(localStorage.getItem('infraquiz_stats') || '{}');
    const categoryStats = stats[category] || { 
        totalQuizzes: 0, 
        bestScore: 0, 
        averageScore: 0, 
        totalTime: 0,
        scores: [],
        lastPlayed: null,
        streak: 0
    };

    const percentage = Math.round((score / totalQuestions) * 100);
    
    categoryStats.totalQuizzes++;
    categoryStats.bestScore = Math.max(categoryStats.bestScore, percentage);
    categoryStats.scores.push(percentage);
    categoryStats.averageScore = Math.round(categoryStats.scores.reduce((a, b) => a + b, 0) / categoryStats.scores.length);
    categoryStats.totalTime += timeSpent;
    categoryStats.lastPlayed = Date.now();
    
    // Calcular racha
    const today = new Date().toDateString();
    const lastPlayed = categoryStats.lastPlayed ? new Date(categoryStats.lastPlayed).toDateString() : null;
    if (lastPlayed === today) {
        // Mismo día, mantener racha
    } else if (lastPlayed === new Date(Date.now() - 86400000).toDateString()) {
        // Día anterior, incrementar racha
        categoryStats.streak++;
    } else {
        // Reiniciar racha
        categoryStats.streak = 1;
    }

    stats[category] = categoryStats;
    localStorage.setItem('infraquiz_stats', JSON.stringify(stats));
    
    // Verificar logros
    checkAchievements(category, percentage, timeSpent, categoryStats);
    
    return categoryStats;
}

// Verificar y otorgar logros
function checkAchievements(category, score, timeSpent, stats) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const newAchievements = [];

    // Primer quiz
    if (stats.totalQuizzes === 1 && !userAchievements.includes('first_quiz')) {
        newAchievements.push('first_quiz');
    }

    // Maestro de categoría específica
    if (category === 'bash' && score >= 90 && !userAchievements.includes('bash_master')) {
        newAchievements.push('bash_master');
    }

    // Puntuación perfecta
    if (score === 100 && !userAchievements.includes('perfect_score')) {
        newAchievements.push('perfect_score');
    }

    // Racha de 7 días
    if (stats.streak >= 7 && !userAchievements.includes('streak_7')) {
        newAchievements.push('streak_7');
    }

    // Explorador DevOps (5 categorías diferentes)
    const allStats = JSON.parse(localStorage.getItem('infraquiz_stats') || '{}');
    const categoriesPlayed = Object.keys(allStats).filter(cat => allStats[cat].totalQuizzes > 0);
    if (categoriesPlayed.length >= 5 && !userAchievements.includes('devops_explorer')) {
        newAchievements.push('devops_explorer');
    }

    // Demonio de velocidad (menos de 5 minutos)
    if (timeSpent < 300000 && !userAchievements.includes('speed_demon')) {
        newAchievements.push('speed_demon');
    }

    // Guardar nuevos logros
    if (newAchievements.length > 0) {
        const updatedAchievements = [...userAchievements, ...newAchievements];
        localStorage.setItem('infraquiz_achievements', JSON.stringify(updatedAchievements));
        
        // Mostrar notificaciones de logros
        newAchievements.forEach(achievementId => {
            showAchievementNotification(achievementId);
        });
    }
}

// Mostrar notificación de logro
function showAchievementNotification(achievementId) {
    const achievement = achievements[achievementId];
    if (!achievement) return;

    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-badge">
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-text">
                <div class="achievement-name">${achievement.name[currentLanguage]}</div>
                <div class="achievement-desc">${achievement.description[currentLanguage]}</div>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remover después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Obtener dificultad recomendada basada en rendimiento
function getRecommendedDifficulty(category) {
    const stats = getUserStats(category);
    
    if (stats.totalQuizzes === 0) {
        return 'beginner';
    }
    
    if (stats.averageScore >= 85) {
        return 'advanced';
    } else if (stats.averageScore >= 70) {
        return 'intermediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty: getRecommendedDifficulty,
    renderUserProgress,
    renderAchievements
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// ===== SISTEMA DE CACHÉ Y OPTIMIZACIÓN =====

class QuizCache {
    constructor() {
        this.cache = new Map();
        this.maxAge = 24 * 60 * 60 * 1000; // 24 horas
        this.maxSize = 50; // Máximo 50 quizzes en caché
    }
    
    async getQuiz(category, language) {
        const key = `${category}-${language}`;
        const cached = this.cache.get(key);
        
        if (cached && (Date.now() - cached.timestamp) < this.maxAge) {
            console.log(`Quiz cargado desde caché: ${key}`);
            return cached.data;
        }
        
        try {
            const data = await this.fetchQuiz(category, language);
            this.setCache(key, data);
            return data;
        } catch (error) {
            // Si hay error y tenemos caché expirado, usarlo como fallback
            if (cached) {
                console.warn(`Usando caché expirado para ${key} debido a error de red`);
                return cached.data;
            }
            throw error;
        }
    }
    
    async fetchQuiz(category, language) {
        const fileName = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
        const filePath = `../quizzes/${category}/${language}/${fileName}`;
        
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.text();
    }
    
    setCache(key, data) {
        // Limpiar caché si está lleno
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
    
    clearCache() {
        this.cache.clear();
    }
}

// Instancia global del caché
const quizCache = new QuizCache();

// ===== SISTEMA DE COMPARTIR SOCIAL =====

function shareResults(category, score, totalQuestions, difficulty) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const techName = technologies.find(t => t.id === category)?.name || category;
    
    const shareData = {
        title: `InfraQuiz: ${percentage}% en ${techName}`,
        text: `¡Acabo de completar el quiz de ${techName} (${difficulty}) con ${score}/${totalQuestions} respuestas correctas! 🎯`,
        url: window.location.origin + window.location.pathname
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(console.error);
    } else {
        // Fallback: copiar al portapapeles
        const shareText = `${shareData.text}\n${shareData.url}`;
        copyToClipboard(shareText);
        showNotification('¡Resultado copiado al portapapeles!', 'success');
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== SISTEMA DE ANALYTICS PRIVADO =====

class PrivacyFriendlyAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
    }
    
    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    trackQuizStart(category, difficulty) {
        this.logEvent('quiz_start', {
            category,
            difficulty,
            timestamp: Date.now(),
            session: this.sessionId
        });
    }
    
    trackQuizCompletion(category, score, totalQuestions, timeSpent, difficulty) {
        const data = {
            category,
            difficulty,
            score: Math.round((score / totalQuestions) * 100),
            timeSpent: Math.round(timeSpent / 1000),
            timestamp: Date.now(),
            session: this.sessionId
        };
        
        this.logEvent('quiz_completion', data);
        this.updateAggregatedStats(data);
    }
    
    trackAchievement(achievementId) {
        this.logEvent('achievement_unlocked', {
            achievement: achievementId,
            timestamp: Date.now(),
            session: this.sessionId
        });
    }
    
    logEvent(eventType, data) {
        const events = JSON.parse(localStorage.getItem('infraquiz_events') || '[]');
        events.push({
            type: eventType,
            data,
            timestamp: Date.now()
        });
        
        // Mantener solo los últimos 1000 eventos
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('infraquiz_events', JSON.stringify(events));
    }
    
    updateAggregatedStats(data) {
        const aggregated = JSON.parse(localStorage.getItem('infraquiz_aggregated') || '{}');
        
        if (!aggregated[data.category]) {
            aggregated[data.category] = {
                totalQuizzes: 0,
                totalScore: 0,
                totalTime: 0,
                difficulties: { beginner: 0, intermediate: 0, advanced: 0 }
            };
        }
        
        const categoryStats = aggregated[data.category];
        categoryStats.totalQuizzes++;
        categoryStats.totalScore += data.score;
        categoryStats.totalTime += data.timeSpent;
        categoryStats.difficulties[data.difficulty]++;
        
        localStorage.setItem('infraquiz_aggregated', JSON.stringify(aggregated));
    }
    
    getInsights() {
        const aggregated = JSON.parse(localStorage.getItem('infraquiz_aggregated') || '{}');
        const insights = {};
        
        Object.keys(aggregated).forEach(category => {
            const stats = aggregated[category];
            insights[category] = {
                averageScore: Math.round(stats.totalScore / stats.totalQuizzes),
                averageTime: Math.round(stats.totalTime / stats.totalQuizzes),
                totalQuizzes: stats.totalQuizzes,
                preferredDifficulty: Object.keys(stats.difficulties).reduce((a, b) => 
                    stats.difficulties[a] > stats.difficulties[b] ? a : b
                )
            };
        });
        
        return insights;
    }
}

// Instancia global de analytics
const analytics = new PrivacyFriendlyAnalytics();

// ===== SISTEMA DE MODO OFFLINE =====

class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupEventListeners();
        this.checkOnlineStatus();
    }
    
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.hideOfflineIndicator();
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineIndicator();
        });
    }
    
    checkOnlineStatus() {
        if (!this.isOnline) {
            this.showOfflineIndicator();
        }
    }
    
    showOfflineIndicator() {
        let indicator = document.getElementById('offline-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'offline-indicator';
            indicator.className = 'offline-indicator';
            indicator.innerHTML = `
                <i class="bi bi-wifi-off me-2"></i>
                ${currentLanguage === 'es' ? 'Modo sin conexión' : 'Offline mode'}
            `;
            document.body.appendChild(indicator);
        }
    }
    
    hideOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    async syncOfflineData() {
        // Sincronizar datos guardados offline cuando vuelva la conexión
        const offlineData = JSON.parse(localStorage.getItem('infraquiz_offline_sync') || '[]');
        
        for (const data of offlineData) {
            try {
                // Aquí se podría enviar a un servidor si fuera necesario
                console.log('Syncing offline data:', data);
            } catch (error) {
                console.error('Error syncing offline data:', error);
            }
        }
        
        // Limpiar datos offline sincronizados
        localStorage.removeItem('infraquiz_offline_sync');
    }
    
    saveOfflineData(data) {
        const offlineData = JSON.parse(localStorage.getItem('infraquiz_offline_sync') || '[]');
        offlineData.push({
            ...data,
            timestamp: Date.now()
        });
        localStorage.setItem('infraquiz_offline_sync', JSON.stringify(offlineData));
    }
}

// Instancia global del gestor offline
const offlineManager = new OfflineManager();

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    shareResults,
    analytics,
    offlineManager,
    quizCache
};rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}rmediate';
    } else {
        return 'beginner';
    }
}

// Renderizar progreso del usuario
function renderUserProgress(category, stats) {
    if (stats.totalQuizzes === 0) {
        return '<div class="user-progress-empty">¡Comienza tu primer quiz!</div>';
    }

    const progressPercentage = Math.min(stats.averageScore, 100);
    
    return `
        <div class="user-progress mb-3">
            <div class="progress-ring-container">
                <svg class="progress-ring" width="60" height="60">
                    <circle class="progress-ring-circle" cx="30" cy="30" r="25"></circle>
                    <circle class="progress-ring-progress" cx="30" cy="30" r="25" 
                            style="stroke-dashoffset: ${157 - (157 * progressPercentage) / 100}"></circle>
                </svg>
                <div class="progress-text">${stats.averageScore}%</div>
            </div>
            <div class="progress-stats">
                <small class="text-muted">${stats.totalQuizzes} quizzes completados</small>
            </div>
        </div>
    `;
}

// Renderizar logros de categoría
function renderAchievements(category) {
    const userAchievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    const categoryAchievements = userAchievements.filter(id => {
        const achievement = achievements[id];
        return achievement && (id.includes(category) || ['first_quiz', 'perfect_score', 'streak_7', 'devops_explorer', 'speed_demon'].includes(id));
    });

    if (categoryAchievements.length === 0) {
        return '';
    }

    return `
        <div class="category-achievements mt-2">
            ${categoryAchievements.map(id => `
                <span class="achievement-mini" title="${achievements[id].description[currentLanguage]}">
                    ${achievements[id].icon}
                </span>
            `).join('')}
        </div>
    `;
}

// ===== SISTEMA DE CACHÉ Y OPTIMIZACIÓN =====

class QuizCache {
    constructor() {
        this.cache = new Map();
        this.maxAge = 24 * 60 * 60 * 1000; // 24 horas
        this.maxSize = 50; // Máximo 50 quizzes en caché
    }
    
    async getQuiz(category, language) {
        const key = `${category}-${language}`;
        const cached = this.cache.get(key);
        
        if (cached && (Date.now() - cached.timestamp) < this.maxAge) {
            console.log(`Quiz cargado desde caché: ${key}`);
            return cached.data;
        }
        
        try {
            const data = await this.fetchQuiz(category, language);
            this.setCache(key, data);
            return data;
        } catch (error) {
            // Si hay error y tenemos caché expirado, usarlo como fallback
            if (cached) {
                console.warn(`Usando caché expirado para ${key} debido a error de red`);
                return cached.data;
            }
            throw error;
        }
    }
    
    async fetchQuiz(category, language) {
        const fileName = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
        const filePath = `../quizzes/${category}/${language}/${fileName}`;
        
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.text();
    }
    
    setCache(key, data) {
        // Limpiar caché si está lleno
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
    
    clearCache() {
        this.cache.clear();
    }
}

// Instancia global del caché
const quizCache = new QuizCache();

// ===== SISTEMA DE COMPARTIR SOCIAL =====

function shareResults(category, score, totalQuestions, difficulty) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const techName = technologies.find(t => t.id === category)?.name || category;
    
    const shareData = {
        title: `InfraQuiz: ${percentage}% en ${techName}`,
        text: `¡Acabo de completar el quiz de ${techName} (${difficulty}) con ${score}/${totalQuestions} respuestas correctas! 🎯`,
        url: window.location.origin + window.location.pathname
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(console.error);
    } else {
        // Fallback: copiar al portapapeles
        const shareText = `${shareData.text}\n${shareData.url}`;
        copyToClipboard(shareText);
        showNotification('¡Resultado copiado al portapapeles!', 'success');
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== SISTEMA DE ANALYTICS PRIVADO =====

class PrivacyFriendlyAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
    }
    
    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    trackQuizStart(category, difficulty) {
        this.logEvent('quiz_start', {
            category,
            difficulty,
            timestamp: Date.now(),
            session: this.sessionId
        });
    }
    
    trackQuizCompletion(category, score, totalQuestions, timeSpent, difficulty) {
        const data = {
            category,
            difficulty,
            score: Math.round((score / totalQuestions) * 100),
            timeSpent: Math.round(timeSpent / 1000),
            timestamp: Date.now(),
            session: this.sessionId
        };
        
        this.logEvent('quiz_completion', data);
        this.updateAggregatedStats(data);
    }
    
    trackAchievement(achievementId) {
        this.logEvent('achievement_unlocked', {
            achievement: achievementId,
            timestamp: Date.now(),
            session: this.sessionId
        });
    }
    
    logEvent(eventType, data) {
        const events = JSON.parse(localStorage.getItem('infraquiz_events') || '[]');
        events.push({
            type: eventType,
            data,
            timestamp: Date.now()
        });
        
        // Mantener solo los últimos 1000 eventos
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('infraquiz_events', JSON.stringify(events));
    }
    
    updateAggregatedStats(data) {
        const aggregated = JSON.parse(localStorage.getItem('infraquiz_aggregated') || '{}');
        
        if (!aggregated[data.category]) {
            aggregated[data.category] = {
                totalQuizzes: 0,
                totalScore: 0,
                totalTime: 0,
                difficulties: { beginner: 0, intermediate: 0, advanced: 0 }
            };
        }
        
        const categoryStats = aggregated[data.category];
        categoryStats.totalQuizzes++;
        categoryStats.totalScore += data.score;
        categoryStats.totalTime += data.timeSpent;
        categoryStats.difficulties[data.difficulty]++;
        
        localStorage.setItem('infraquiz_aggregated', JSON.stringify(aggregated));
    }
    
    getInsights() {
        const aggregated = JSON.parse(localStorage.getItem('infraquiz_aggregated') || '{}');
        const insights = {};
        
        Object.keys(aggregated).forEach(category => {
            const stats = aggregated[category];
            insights[category] = {
                averageScore: Math.round(stats.totalScore / stats.totalQuizzes),
                averageTime: Math.round(stats.totalTime / stats.totalQuizzes),
                totalQuizzes: stats.totalQuizzes,
                preferredDifficulty: Object.keys(stats.difficulties).reduce((a, b) => 
                    stats.difficulties[a] > stats.difficulties[b] ? a : b
                )
            };
        });
        
        return insights;
    }
}

// Instancia global de analytics
const analytics = new PrivacyFriendlyAnalytics();

// ===== SISTEMA DE MODO OFFLINE =====

class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupEventListeners();
        this.checkOnlineStatus();
    }
    
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.hideOfflineIndicator();
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineIndicator();
        });
    }
    
    checkOnlineStatus() {
        if (!this.isOnline) {
            this.showOfflineIndicator();
        }
    }
    
    showOfflineIndicator() {
        let indicator = document.getElementById('offline-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'offline-indicator';
            indicator.className = 'offline-indicator';
            indicator.innerHTML = `
                <i class="bi bi-wifi-off me-2"></i>
                ${currentLanguage === 'es' ? 'Modo sin conexión' : 'Offline mode'}
            `;
            document.body.appendChild(indicator);
        }
    }
    
    hideOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    async syncOfflineData() {
        // Sincronizar datos guardados offline cuando vuelva la conexión
        const offlineData = JSON.parse(localStorage.getItem('infraquiz_offline_sync') || '[]');
        
        for (const data of offlineData) {
            try {
                // Aquí se podría enviar a un servidor si fuera necesario
                console.log('Syncing offline data:', data);
            } catch (error) {
                console.error('Error syncing offline data:', error);
            }
        }
        
        // Limpiar datos offline sincronizados
        localStorage.removeItem('infraquiz_offline_sync');
    }
    
    saveOfflineData(data) {
        const offlineData = JSON.parse(localStorage.getItem('infraquiz_offline_sync') || '[]');
        offlineData.push({
            ...data,
            timestamp: Date.now()
        });
        localStorage.setItem('infraquiz_offline_sync', JSON.stringify(offlineData));
    }
}

// Instancia global del gestor offline
const offlineManager = new OfflineManager();

// ===== SISTEMA DE RUTAS DE APRENDIZAJE =====

const learningPaths = {
    'devops_beginner': {
        name: { en: 'DevOps Beginner', es: 'DevOps Principiante' },
        description: { en: 'Start your DevOps journey', es: 'Comienza tu viaje en DevOps' },
        steps: [
            { category: 'bash', difficulty: 'beginner' },
            { category: 'github', difficulty: 'beginner' },
            { category: 'docker', difficulty: 'beginner' },
            { category: 'cicd', difficulty: 'beginner' }
        ]
    },
    'cloud_engineer': {
        name: { en: 'Cloud Engineer', es: 'Ingeniero Cloud' },
        description: { en: 'Master cloud technologies', es: 'Domina las tecnologías cloud' },
        steps: [
            { category: 'aws', difficulty: 'intermediate' },
            { category: 'terraform', difficulty: 'intermediate' },
            { category: 'kubernetes', difficulty: 'advanced' },
            { category: 'monitoring', difficulty: 'intermediate' }
        ]
    },
    'security_specialist': {
        name: { en: 'Security Specialist', es: 'Especialista en Seguridad' },
        description: { en: 'Focus on DevSecOps practices', es: 'Enfócate en prácticas DevSecOps' },
        steps: [
            { category: 'security', difficulty: 'beginner' },
            { category: 'docker', difficulty: 'intermediate' },
            { category: 'kubernetes', difficulty: 'intermediate' },
            { category: 'monitoring', difficulty: 'advanced' }
        ]
    }
};

function renderLearningPaths() {
    const container = document.getElementById('learning-paths-container');
    if (!container) return;

    container.innerHTML = Object.keys(learningPaths).map(pathId => {
        const path = learningPaths[pathId];
        const progress = calculatePathProgress(pathId);
        
        return `
            <div class="learning-path-card" data-path="${pathId}">
                <h4>${path.name[currentLanguage]}</h4>
                <p class="text-muted">${path.description[currentLanguage]}</p>
                <div class="learning-path">
                    ${path.steps.map((step, index) => {
                        const tech = technologies.find(t => t.id === step.category);
                        const isCompleted = isStepCompleted(step.category, step.difficulty);
                        const isCurrent = index === progress.currentStep;
                        
                        return `
                            <div class="learning-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                                <div class="learning-step-icon">
                                    <i class="bi ${tech.icon}"></i>
                                </div>
                                <div class="learning-step-title">${tech.name}</div>
                                <div class="learning-step-difficulty">${step.difficulty}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="path-progress">
                    <div class="progress">
                        <div class="progress-bar" style="width: ${progress.percentage}%"></div>
                    </div>
                    <small class="text-muted">${progress.completed}/${progress.total} completado</small>
                </div>
            </div>
        `;
    }).join('');
}

function calculatePathProgress(pathId) {
    const path = learningPaths[pathId];
    let completed = 0;
    let currentStep = 0;
    
    path.steps.forEach((step, index) => {
        if (isStepCompleted(step.category, step.difficulty)) {
            completed++;
        } else if (currentStep === completed) {
            currentStep = index;
        }
    });
    
    return {
        completed,
        total: path.steps.length,
        percentage: Math.round((completed / path.steps.length) * 100),
        currentStep: currentStep < path.steps.length ? currentStep : -1
    };
}

function isStepCompleted(category, difficulty) {
    const stats = getUserStats(category);
    // Considerar completado si ha hecho al menos un quiz con 70% o más
    return stats.bestScore >= 70;
}

// Actualizar las exportaciones
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    translations,
    technologies,
    currentLanguage,
    getUserStats,
    saveUserStats,
    checkAchievements,
    getRecommendedDifficulty,
    shareResults,
    analytics,
    offlineManager,
    quizCache
};