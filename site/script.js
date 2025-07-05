// InfraQuiz JavaScript functionality

// Default language
let currentLanguage = localStorage.getItem('quizLanguage') || 'en'; // Get language from local storage or default to English

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
        'coming_soon_message': 'This category will be available soon. Check back later!'
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
        'coming_soon_message': 'Esta categoría estará disponible pronto. ¡Vuelve más tarde!'
    }
};

// Function to apply translations to static texts
function applyTranslations() {
    const currentTranslations = translations[currentLanguage];

    // Navbar links
    document.querySelector('a[href="#home"]').textContent = currentTranslations.home_nav;
    document.querySelector('a[href="#quizzes"]').textContent = currentTranslations.quizzes_nav;
    document.querySelector('a[href="#about"]').textContent = currentTranslations.about_nav;

    // Hero Section
    document.querySelector('h1.display-3').innerHTML = currentTranslations.hero_title; // Use innerHTML for emojis
    document.querySelector('p.lead.mb-4.opacity-75').textContent = currentTranslations.hero_description;
    document.querySelector('button[onclick="startRandomQuiz()"]').innerHTML = `<i class="bi bi-play-circle me-2"></i> ${currentTranslations.start_random_quiz}`;
    document.querySelector('button[onclick="scrollToQuizzes()"]').innerHTML = `<i class="bi bi-list-check me-2"></i> ${currentTranslations.browse_categories}`;

    // Quiz Categories Section
    document.querySelector('#quizzes h2').innerHTML = currentTranslations.quiz_categories_title; // Use innerHTML for emojis
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
    document.querySelector('footer p.mb-0').innerHTML = currentTranslations.footer_text; // Use innerHTML for emojis
}

// Initialize the application
window.addEventListener('load', function() { // Ensure all resources including MDBootstrap are loaded
    // Add a small delay to ensure MDBootstrap is fully initialized and globally available
    setTimeout(() => {
        if (typeof mdb !== 'undefined') { // Check if MDBootstrap is loaded
            console.log("MDBootstrap (mdb object) found, initializing app.");
            initializeNavigation();
            initializeDarkMode(); // Initialize dark mode
            initializeLanguageSelector();
            renderQuizCategories(); // Render categories dynamically
            applyTranslations(); // Apply translations on initial load

            // Initialize AOS after content is loaded
            AOS.init();
        } else {
            console.error("MDBootstrap (mdb object) still not found after delay. There might be a deeper issue.");
            // Optionally, show a user-friendly error message or retry more aggressively
        }
    }, 100); // 100ms delay, might be enough for async script execution
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
            if (window.innerWidth < 992) { // Bootstrap's 'lg' breakpoint is 992px
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
            // Adjust offset for fixed navbar height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - mainNavbar.offsetHeight - 50) { // Added buffer
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
    if (!languageSelector) return; // Ensure the element exists

    languageSelector.value = currentLanguage;
    languageSelector.addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        localStorage.setItem('quizLanguage', currentLanguage); // Save language preference
        renderQuizCategories(); // Re-render categories with correct titles/descriptions
        applyTranslations(); // Apply translations after language change
    });
}

// Render quiz categories dynamically
function renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    container.innerHTML = ''; // Clear existing categories

    technologies.forEach((tech, index) => {
        // Skip 'mixed' category from dynamic rendering if preferred, or handle it specially
        // For now, it's included.
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        // Add AOS animations to quiz cards
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', `${index * 100}`); // Stagger animations

        col.innerHTML = `
            <div class="card quiz-card h-100 shadow-3">
                <div class="card-body text-center">
                    <i class="bi ${tech.icon} display-4 text-${tech.color} mb-3"></i>
                    <h5 class="card-title fw-bold mb-2">${tech.name}</h5>
                    <p class="card-text text-muted"><small>${tech.description}</small></p>
                    <div class="d-flex justify-content-center flex-wrap gap-2 mt-3">
                        <a href="quiz.html?category=${tech.id}&level=beginner&lang=${currentLanguage}" class="btn btn-success btn-sm m-0">Beginner</a>
                        <a href="quiz.html?category=${tech.id}&level=intermediate&lang=${currentLanguage}" class="btn btn-warning btn-sm m-0">Intermediate</a>
                        <a href="quiz.html?category=${tech.id}&level=advanced&lang=${currentLanguage}" class="btn btn-danger btn-sm m-0">Advanced</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Scroll to quizzes section
function scrollToQuizzes() {
    document.getElementById('quizzes').scrollIntoView({ behavior: 'smooth' });
} 