// InfraQuiz JavaScript functionality - Clean Version

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
        'difficulty_advanced': 'Advanced',
        'questions_count': (count) => `${count} questions`,
        'estimated_time': (minutes) => `~${minutes} min`
    },
    'es': {
        'home_nav': 'Inicio',
        'quizzes_nav': 'Quizzes',
        'about_nav': 'Acerca de',
        'editor_nav': 'Editor',
        'analytics_nav': 'Analíticas',
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
        'difficulty_advanced': 'Avanzado',
        'questions_count': (count) => `${count} preguntas`,
        'estimated_time': (minutes) => `~${minutes} min`
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
    const heroTitle = document.querySelector('h1.display-3');
    const heroDesc = document.querySelector('p.lead.mb-4.opacity-75');
    const randomBtn = document.querySelector('button[onclick="startRandomQuiz()"]');
    const browseBtn = document.querySelector('button[onclick="scrollToQuizzes()"]');
    
    if (heroTitle) heroTitle.innerHTML = currentTranslations.hero_title;
    if (heroDesc) heroDesc.textContent = currentTranslations.hero_description;
    if (randomBtn) randomBtn.innerHTML = `<i class="bi bi-play-circle me-2"></i> ${currentTranslations.start_random_quiz}`;
    if (browseBtn) browseBtn.innerHTML = `<i class="bi bi-list-check me-2"></i> ${currentTranslations.browse_categories}`;

    // Quiz Categories Section
    const quizTitle = document.querySelector('#quizzes h2');
    const quizSubtitle = document.querySelector('#quizzes p.lead');
    
    if (quizTitle) quizTitle.innerHTML = currentTranslations.quiz_categories_title;
    if (quizSubtitle) quizSubtitle.textContent = currentTranslations.quiz_categories_subtitle;

    // About Section
    const aboutTitle = document.querySelector('#about h2');
    const aboutDesc1 = document.querySelector('#about p.lead.mb-4');
    const aboutDesc2 = document.querySelector('#about p.mb-4');
    const githubLink = document.querySelector('#about a[href*="github.com"]');
    
    if (aboutTitle) aboutTitle.textContent = currentTranslations.about_infraquiz_title;
    if (aboutDesc1) aboutDesc1.textContent = currentTranslations.about_description_1;
    if (aboutDesc2) aboutDesc2.textContent = currentTranslations.about_description_2;
    if (githubLink) githubLink.innerHTML = `<i class="bi bi-github me-2"></i> ${currentTranslations.view_on_github}`;

    // About features
    const features = document.querySelectorAll('#about ul li');
    if (features.length >= 4) {
        features[0].innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_1}`;
        features[1].innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_2}`;
        features[2].innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_3}`;
        features[3].innerHTML = `<i class="bi bi-check-circle text-success me-2"></i> ${currentTranslations.about_feature_4}`;
    }

    // Footer
    const footer = document.querySelector('footer p.mb-0');
    if (footer) footer.innerHTML = currentTranslations.footer_text;
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
            if (typeof AOS !== 'undefined') {
                AOS.init();
            }
        } else {
            console.error("MDBootstrap (mdb object) still not found after delay. There might be a deeper issue.");
        }
    }, 100);
});

// Listen for quiz saved events from the editor
window.addEventListener('quizSaved', function(event) {
    console.log('Quiz saved event received:', event.detail);
    // Re-render categories to show new custom quizzes
    renderQuizCategories();
    
    // Show notification if we're on the main page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const { quiz, action } = event.detail;
        const message = action === 'updated' 
            ? `Quiz "${quiz.title}" updated and is now available!`
            : `New quiz "${quiz.title}" created and is now available!`;
        
        // Simple notification (you can enhance this with a proper notification system)
        if (typeof showNotification === 'function') {
            showNotification(message, 'success');
        } else {
            console.log(message);
        }
    }
});

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mainNavbar = document.getElementById('main-navbar');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }

                // Collapse navbar on mobile after clicking a link
                if (window.innerWidth < 992) {
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const collapseInstance = mdb.Collapse.getInstance(navbarCollapse);
                        if (collapseInstance) {
                            collapseInstance.hide();
                        }
                    }
                }
            }
        });
    });

    // Add shadow to navbar on scroll
    if (mainNavbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('shadow-2');
                mainNavbar.classList.remove('shadow-0');
            } else {
                mainNavbar.classList.remove('shadow-2');
                mainNavbar.classList.add('shadow-0');
            }
        });
    }

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (mainNavbar ? mainNavbar.offsetHeight : 80) - 50) {
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
    if (!darkModeToggle) return;

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

// Render quiz categories dynamically
function renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    container.innerHTML = '';

    // Get custom quizzes from localStorage
    const savedQuizzes = JSON.parse(localStorage.getItem('infraquiz_saved_quizzes') || '[]');
    const customQuizzesByCategory = {};
    
    savedQuizzes.forEach(quiz => {
        if (!customQuizzesByCategory[quiz.category]) {
            customQuizzesByCategory[quiz.category] = [];
        }
        customQuizzesByCategory[quiz.category].push(quiz);
    });

    technologies.forEach((tech, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', `${index * 100}`);

        const currentTranslations = translations[currentLanguage];
        const customQuizzes = customQuizzesByCategory[tech.id] || [];
        const hasCustomQuizzes = customQuizzes.length > 0;
        
        // Build difficulty buttons
        let difficultyButtons = `
            <a href="quiz.html?category=${tech.id}&level=beginner&lang=${currentLanguage}" 
               class="btn btn-success btn-sm m-0" 
               data-bs-toggle="tooltip" 
               data-bs-placement="top" 
               title="${currentTranslations.difficulty_beginner} - ${currentTranslations.questions_count(21)}">
                ${currentTranslations.difficulty_beginner}
            </a>
            <a href="quiz.html?category=${tech.id}&level=intermediate&lang=${currentLanguage}" 
               class="btn btn-warning btn-sm m-0"
               data-bs-toggle="tooltip" 
               data-bs-placement="top" 
               title="${currentTranslations.difficulty_intermediate} - ${currentTranslations.questions_count(21)}">
                ${currentTranslations.difficulty_intermediate}
            </a>
            <a href="quiz.html?category=${tech.id}&level=advanced&lang=${currentLanguage}" 
               class="btn btn-danger btn-sm m-0"
               data-bs-toggle="tooltip" 
               data-bs-placement="top" 
               title="${currentTranslations.difficulty_advanced} - ${currentTranslations.questions_count(21)}">
                ${currentTranslations.difficulty_advanced}
            </a>
        `;

        // Add custom quiz buttons if available
        if (hasCustomQuizzes) {
            const customQuizButtons = customQuizzes.map(quiz => `
                <a href="quiz.html?category=${tech.id}&level=custom&lang=${currentLanguage}&custom=${quiz.id}" 
                   class="btn btn-info btn-sm m-0 mt-2" 
                   data-bs-toggle="tooltip" 
                   data-bs-placement="top" 
                   title="Custom: ${quiz.title} - ${quiz.totalQuestions} questions">
                    <i class="bi bi-star-fill me-1"></i>${quiz.title.substring(0, 15)}${quiz.title.length > 15 ? '...' : ''}
                </a>
            `).join('');
            
            difficultyButtons += `<div class="w-100"></div>${customQuizButtons}`;
        }
        
        col.innerHTML = `
            <div class="card quiz-card h-100 shadow-3 ${hasCustomQuizzes ? 'has-custom-quizzes' : ''}" data-category="${tech.id}">
                <div class="card-body text-center">
                    <i class="bi ${tech.icon} display-4 mb-3"></i>
                    <h5 class="card-title fw-bold mb-2">
                        ${tech.name}
                        ${hasCustomQuizzes ? '<i class="bi bi-star-fill text-warning ms-1" title="Has custom quizzes"></i>' : ''}
                    </h5>
                    <p class="card-text text-muted"><small>${tech.description}</small></p>
                    <div class="d-flex justify-content-center flex-wrap gap-2 mt-3">
                        ${difficultyButtons}
                    </div>
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
    const quizzesSection = document.getElementById('quizzes');
    if (quizzesSection) {
        quizzesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enhanced quiz loading function with better error handling and multiple path attempts
async function loadQuizFile(category, language) {
    const fileName = language === 'en' ? 'questions1.md' : 'cuestionario1.md';
    
    // Try multiple path configurations to handle different deployment scenarios
    const possiblePaths = [
        `./quizzes/${category}/${language}/${fileName}`,
        `../quizzes/${category}/${language}/${fileName}`,
        `/quizzes/${category}/${language}/${fileName}`,
        `quizzes/${category}/${language}/${fileName}`
    ];
    
    let lastError = null;
    
    for (const filePath of possiblePaths) {
        try {
            console.log(`Attempting to load quiz from: ${filePath}`);
            const response = await fetch(filePath);
            if (response.ok) {
                const content = await response.text();
                console.log(`Successfully loaded quiz from: ${filePath}`);
                return content;
            }
            lastError = new Error(`HTTP error! status: ${response.status} for path: ${filePath}`);
        } catch (error) {
            console.warn(`Failed to load from ${filePath}:`, error);
            lastError = error;
        }
    }
    
    // If all paths failed, try to load from localStorage (for editor-created quizzes)
    try {
        const savedQuizzes = JSON.parse(localStorage.getItem('infraquiz_saved_quizzes') || '[]');
        const matchingQuiz = savedQuizzes.find(quiz => 
            quiz.category === category && 
            (quiz.language === language || !quiz.language)
        );
        
        if (matchingQuiz) {
            console.log('Loading quiz from localStorage:', matchingQuiz.title);
            return generateMarkdownFromQuizData(matchingQuiz);
        }
    } catch (storageError) {
        console.warn('Failed to load from localStorage:', storageError);
    }
    
    console.error(`Failed to load quiz file for ${category}/${language}/${fileName} from all paths`);
    throw lastError || new Error('Quiz file not found');
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
        if (line.match(/^### (?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)/)) {
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
                text: line.replace(/^### (?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)\s*|(?:🟢|🟡|🔴)\s*$/g, '').trim(),
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

// Generate markdown from quiz data (for editor-created quizzes)
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

        markdown += `### ❓ ${question.text} ${difficultyEmoji}\n\n`;

        question.options.forEach((option, optIndex) => {
            markdown += `${optionEmojis[optIndex]} ${option.text}\n`;
        });

        const correctOption = question.options.find(opt => opt.isCorrect);
        markdown += `\n**Correct Answer:**\n📝 ${correctOption.text}\n\n`;
        markdown += `**Explanation:**\n💡 ${question.explanation}\n\n`;
        
        if (index < quizData.questions.length - 1) {
            markdown += '---\n\n';
        }
    });

    return markdown;
}

// Export functions for use in other files
window.InfraQuiz = {
    loadQuizFile,
    parseMarkdownQuiz,
    generateMarkdownFromQuizData,
    translations,
    technologies,
    currentLanguage
};