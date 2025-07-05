// InfraQuiz JavaScript functionality

// Default language
let currentLanguage = localStorage.getItem('quizLanguage') || 'en'; // Get language from local storage or default to English

// Global variables
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let quizData = {};

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
            loadQuizData();
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
        loadQuizData(); // Reload quiz data for the new language
        renderQuizCategories(); // Re-render categories with correct titles/descriptions
        applyTranslations(); // Apply translations after language change
    });
}

/**
 * Constructs the file path for a quiz markdown file based on technology ID and language.
 * @param {string} techId - The ID of the technology (e.g., 'bash', 'python').
 * @param {string} language - The language code (e.g., 'en', 'es').
 * @returns {string} The relative path to the quiz markdown file.
 */
function getQuizFilePath(techId, language) {
    // Assuming a convention like quizzes/bash/en/cuestionario1.md
    // For now, let's assume 'cuestionario1.md' is the only quiz file per category/language
    // We might expand this later for multiple quizzes per category
    return `quizzes/${techId}/${language}/cuestionario1.md`;
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
            <div class="card quiz-card h-100 shadow-3" onclick="loadQuiz('${tech.id}')">
                <div class="card-body text-center">
                    <i class="bi ${tech.icon} display-4 text-${tech.color} mb-3"></i>
                    <h5 class="card-title">${tech.name}</h5>
                    <p class="card-text">${tech.description}</p>
                    <div class="difficulty-badges">
                        <span class="badge bg-success">Beginner</span>
                        <span class="badge bg-warning">Intermediate</span>
                        <span class="badge bg-danger">Advanced</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Load quiz data from markdown files
async function loadQuizData() {
    quizData = {}; // Clear existing data
    showLoading(true); // Show loading spinner
    
    const fetchPromises = technologies.map(async tech => {
        const filePath = getQuizFilePath(tech.id, currentLanguage);
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const markdown = await response.text();
                quizData[tech.id] = parseMarkdownQuiz(markdown);
            } else {
                console.warn(`Quiz file not found for ${tech.id} (${currentLanguage}): ${filePath}`);
                quizData[tech.id] = []; // Assign empty array if file not found
            }
        } catch (error) {
            console.error(`Error fetching quiz for ${tech.id} (${currentLanguage}):`, error);
            quizData[tech.id] = []; // Assign empty array on error
        }
    });

    await Promise.all(fetchPromises);
    showLoading(false); // Hide loading spinner
    console.log('Quiz data loaded successfully', quizData);
}

// Parse markdown quiz content
function parseMarkdownQuiz(markdown) {
    const questions = [];
    const lines = markdown.split('\n');
    let currentQuestion = null;
    let currentOptions = [];
    let currentExplanation = '';
    let inQuestionBlock = false; // Flag to indicate if we are inside a question's content block
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') continue;

        // Skip placeholder text for empty quizzes
        if (line.includes('Este archivo necesita ser completado') || 
            line.includes('This file needs to be completed')) {
            console.warn("Placeholder content detected, returning empty quiz.");
            return []; // If placeholder found, return an empty array for this quiz
        }
        
        // Detect question start (using common emoji patterns)
        if (line.match(/^(?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)/) && line.includes('Difficulty:')) {
            // Save previous question if exists and is valid
            if (currentQuestion && currentOptions.length > 0) {
                currentQuestion.options = currentOptions;
                currentQuestion.explanation = currentExplanation.trim();
                questions.push(currentQuestion);
            }
            
            // Start new question
            const difficultyMatch = line.match(/Difficulty: (🟢|🟡|🔴)/);
            let difficulty = 'unknown';
            if (difficultyMatch) {
                switch (difficultyMatch[1]) {
                    case '🟢': difficulty = 'beginner'; break;
                    case '🟡': difficulty = 'intermediate'; break;
                    case '🔴': difficulty = 'advanced'; break;
                }
            }

            currentQuestion = {
                text: line.replace(/^(?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)\s*|\s*Difficulty: (?:🟢|🟡|🔴)/g, '').trim(),
                difficulty: difficulty,
                options: [],
                explanation: ''
            };
            currentOptions = [];
            currentExplanation = '';
            inQuestionBlock = true;
            continue;
        }
        
        // Detect options using specific emojis
        if (inQuestionBlock && line.match(/^(?:📝|🔄|📦|🎯)/)) {
            const isCorrect = line.startsWith('📝'); // Option starting with 📝 is the correct one
            const optionText = line.substring(2).trim(); // Remove emoji and space
            currentOptions.push({
                text: optionText,
                isCorrect: isCorrect
            });
            // Reset explanation gathering once options start
            currentExplanation = ''; 
            continue;
        }

        // Detect explanation header and content
        if (inQuestionBlock) {
            if (line.includes('**Correct Answer:**') || line.includes('**Respuesta Correcta:**') ||
                line.includes('**Explanation:**') || line.includes('**Explicación:**')) {
                // This is an explanation header, start collecting from here
                currentExplanation = line.replace(/\*\*(Correct Answer|Respuesta Correcta|Explanation|Explicación):\*\*/g, '').trim();
            } else if (currentExplanation !== '') {
                // Continue collecting explanation lines
                currentExplanation += '\n' + line;
            }
        }
    }
    
    // Add the last question if it exists and is valid
    if (currentQuestion && currentOptions.length > 0) {
        currentQuestion.options = currentOptions;
        currentQuestion.explanation = currentExplanation.trim();
        questions.push(currentQuestion);
    }
    
    return questions;
}

// Start random quiz
function startRandomQuiz() {
    const availableTechs = technologies.filter(tech => quizData[tech.id] && quizData[tech.id].length > 0);
    if (availableTechs.length === 0) {
        showError(translations[currentLanguage].error_no_quizzes_available); // Use translation
        return;
    }
    const randomIndex = Math.floor(Math.random() * availableTechs.length);
    const randomTechId = availableTechs[randomIndex].id;
    loadQuiz(randomTechId);
}

// Load a specific quiz
function loadQuiz(quizType) {
    currentQuiz = quizData[quizType];
    if (!currentQuiz || currentQuiz.length === 0) {
        const techName = technologies.find(t => t.id === quizType)?.name || quizType;
        showError(translations[currentLanguage].error_quiz_not_available(techName)); // Use translation function
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = currentQuiz.length;
    document.getElementById('quizTitle').innerText = technologies.find(t => t.id === quizType)?.name || 'Quiz';
    
    showQuizModal();
}

// Show quiz modal
function showQuizModal() {
    // Use mdb.Modal instead of bootstrap.Modal
    const quizModal = new mdb.Modal(document.getElementById('quizModal'));
    quizModal.show();
    showQuestion();
}

// Show a question
function showQuestion() {
    const questionContainer = document.getElementById('quizContent');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    nextQuestionBtn.style.display = 'none'; // Hide next button initially

    if (currentQuestionIndex < totalQuestions) {
        const question = currentQuiz[currentQuestionIndex];
        const progress = ((currentQuestionIndex) / totalQuestions) * 100;

        questionContainer.innerHTML = `
            <div class="quiz-progress mb-3">
                <div class="progress rounded-pill">
                    <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="text-muted float-end mt-1">${currentQuestionIndex + 1} / ${totalQuestions}</small>
            </div>
            <p class="quiz-question">${question.text}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option ripple shadow-1" data-mdb-ripple-color="primary" data-index="${index}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none;"></div>
        `;

        document.querySelectorAll('.quiz-option').forEach(optionElement => {
            optionElement.addEventListener('click', selectOption);
        });
    } else {
        showQuizResults();
    }
}

// Select an option
function selectOption(event) {
    const selectedOptionElement = event.currentTarget;
    const optionIndex = parseInt(selectedOptionElement.dataset.index);
    const question = currentQuiz[currentQuestionIndex];
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const quizOptions = document.querySelectorAll('.quiz-option');

    // Disable further clicks on options
    quizOptions.forEach(opt => {
        opt.removeEventListener('click', selectOption);
        opt.style.cursor = 'default';
        opt.classList.add('pe-none'); // Prevent pointer events (MDBootstrap utility class)
    });

    // Mark selected option
    selectedOptionElement.classList.add('selected');

    // Reveal correct answer and explanation
    const correctOptionIndex = question.options.findIndex(option => option.isCorrect);
    const explanationElement = document.querySelector('.quiz-explanation');

    if (question.options[optionIndex].isCorrect) {
        selectedOptionElement.classList.add('correct');
        score++;
        explanationElement.innerHTML = `
            <h6>${translations[currentLanguage].correct_feedback} <i class="bi bi-check-circle-fill text-success"></i></h6>
            <p>${question.explanation}</p>
        `;
    } else {
        selectedOptionElement.classList.add('incorrect');
        if (correctOptionIndex !== -1) {
            quizOptions[correctOptionIndex].classList.add('correct'); // Highlight correct answer
        }
        explanationElement.innerHTML = `
            <h6>${translations[currentLanguage].incorrect_feedback} <i class="bi bi-x-circle-fill text-danger"></i></h6>
            <p>${translations[currentLanguage].correct_answer_was} <strong>${question.options[correctOptionIndex].text}</strong></p>
            <p>${question.explanation}</p>
        `;
    }
    explanationElement.style.display = 'block';
    nextQuestionBtn.style.display = 'block';
}

// Next question
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
    const questionContainer = document.getElementById('quizContent');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    nextQuestionBtn.style.display = 'none';

    const resultMessage = translations[currentLanguage].quiz_complete_title;
    const scoreDetails = translations[currentLanguage].quiz_score_details(score, totalQuestions);

    questionContainer.innerHTML = `
        <div class="quiz-results text-center py-4">
            <h3 class="display-4 fw-bold mb-3">🎉 ${resultMessage}</h3>
            <div class="quiz-score mb-4">
                <p class="h4 mb-0">${score} / ${totalQuestions}</p>
            </div>
            <p class="lead">${scoreDetails}</p>
            <div class="d-grid gap-2 col-md-8 mx-auto mt-4">
                <button class="btn btn-primary btn-lg shadow-2" onclick="restartQuiz()">${translations[currentLanguage].restart_quiz}</button>
                <button class="btn btn-outline-secondary btn-lg" data-mdb-dismiss="modal">${translations[currentLanguage].back_to_categories}</button>
            </div>
        </div>
    `;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Scroll to quizzes section
function scrollToQuizzes() {
    document.getElementById('quizzes').scrollIntoView({ behavior: 'smooth' });
}

// Show coming soon message
function showComingSoon() {
    showError(translations[currentLanguage].coming_soon_message); // Use translation
}

// Show generic error modal
function showError(message) {
    document.getElementById('errorMessage').innerText = message;
    // Use mdb.Modal instead of bootstrap.Modal
    const errorModal = new mdb.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

// Show/hide loading spinner in quiz modal
function showLoading(isLoading) {
    const quizContent = document.getElementById('quizContent');
    if (isLoading) {
        quizContent.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">${translations[currentLanguage].loading_quiz}</span>
                </div>
                <p class="mt-3 lead">${translations[currentLanguage].loading_questions}</p>
            </div>
        `;
    } else {
        // Clear loading spinner, content will be replaced by showQuestion or showQuizResults
        // No direct action needed here, as showQuestion/showQuizResults will overwrite
    }
} 