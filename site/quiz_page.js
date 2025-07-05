// quiz_page.js: Handles the logic for displaying and managing a single quiz.

// Global variables for the quiz on this page
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let quizData = {}; // This will hold the parsed data for the current quiz
let currentLanguage = localStorage.getItem('quizLanguage') || 'en'; // Default to English

// Supported technologies (replicated for quiz_page context, could be optimized later if needed)
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

// Translations object for static texts (replicated for quiz_page context, also for quiz_page context)
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

// Show a question
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

        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
        
        // Update current question / total questions display
        const quizPageTitle = document.getElementById('quizPageTitle');
        quizPageTitle.textContent = `${technologies.find(t => t.id === getUrlParameter('category'))?.name || 'Quiz'} (${currentQuestionIndex + 1}/${totalQuestions})`;

        questionTextElement.innerHTML = question.text;

        optionsContainer.innerHTML = ''; // Clear previous options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'list-group-item list-group-item-action ripple shadow-1 quiz-option';
            optionElement.setAttribute('data-mdb-ripple-color', 'primary');
            optionElement.setAttribute('data-index', index);
            optionElement.textContent = option.text;
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
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
    const feedbackElement = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
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

    if (question.options[optionIndex].isCorrect) {
        selectedOptionElement.classList.add('correct');
        score++;
        feedbackElement.innerHTML = `
            <h6 class="text-success">${translations[currentLanguage].correct_feedback} <i class="bi bi-check-circle-fill"></i></h6>
            <div class="quiz-explanation rounded-3 p-3 mt-3">
                <p>${question.explanation}</p>
            </div>
        `;
    } else {
        selectedOptionElement.classList.add('incorrect');
        if (correctOptionIndex !== -1) {
            quizOptions[correctOptionIndex].classList.add('correct'); // Highlight correct answer
        }
        feedbackElement.innerHTML = `
            <h6 class="text-danger">${translations[currentLanguage].incorrect_feedback} <i class="bi bi-x-circle-fill"></i></h6>
            <p class="mb-1">${translations[currentLanguage].correct_answer_was} <strong>${question.options[correctOptionIndex].text}</strong></p>
            <div class="quiz-explanation rounded-3 p-3 mt-3">
                <p>${question.explanation}</p>
            </div>
        `;
    }
    feedbackElement.classList.remove('d-none');
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
    const quizContentDiv = document.getElementById('quizContent');
    const quizResultsDiv = document.getElementById('quizResults');

    quizContentDiv.style.display = 'none';
    quizResultsDiv.style.display = 'block';

    const finalScoreElement = document.getElementById('finalScore');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const backToCategoriesResultsBtn = document.getElementById('backToCategoriesResultsBtn');
    const quizCompleteTitle = document.querySelector('#quizResults h3');

    quizCompleteTitle.textContent = translations[currentLanguage].quiz_complete_title;
    finalScoreElement.textContent = translations[currentLanguage].quiz_score_details(score, totalQuestions);

    restartQuizBtn.addEventListener('click', restartQuiz);
    backToCategoriesResultsBtn.addEventListener('click', () => { window.location.href = 'index.html#quizzes'; });
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Show general error on quiz page
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

// Show/hide loading spinner on quiz page
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
    name = name.replace(/[\\[\\]]/g, '\\$&'); // Escape brackets
    const regex = new RegExp('[?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
}

// Initialize quiz page when DOM is ready and MDBootstrap is loaded
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof mdb !== 'undefined') {
            console.log("MDBootstrap (mdb object) found on quiz_page, initializing quiz.");
            
            // Apply dark mode based on localStorage
            if (localStorage.getItem('darkMode') === 'enabled') {
                document.body.classList.add('dark-mode');
                // Also set the toggle on the navigation if it exists
                const darkModeToggle = document.getElementById('darkModeToggle');
                if (darkModeToggle) {
                    darkModeToggle.checked = true;
                }
            }
            
            // Initialize dark mode toggle event listener for quiz page
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

            // Initialize language selector for quiz page
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector) {
                languageSelector.value = currentLanguage;
                languageSelector.addEventListener('change', function(e) {
                    currentLanguage = e.target.value;
                    localStorage.setItem('quizLanguage', currentLanguage);
                    // Reload the quiz with the new language
                    const category = getUrlParameter('category');
                    const level = getUrlParameter('level');
                    if (category && level) {
                        loadQuizPage(category, level, currentLanguage);
                    } else {
                        // Fallback or navigate back to index if parameters are missing
                        window.location.href = 'index.html';
                    }
                });
            }

            // Event listeners for quiz navigation buttons
            document.getElementById('nextQuestionBtn')?.addEventListener('click', nextQuestion);
            document.getElementById('backToCategoriesBtn')?.addEventListener('click', () => { window.location.href = 'index.html#quizzes'; });
            // Note: restartQuizBtn and backToCategoriesResultsBtn listeners are added in showQuizResults

            // Load the quiz based on URL parameters
            const category = getUrlParameter('category');
            const level = getUrlParameter('level');
            if (category && level) {
                loadQuizPage(category, level, currentLanguage); // New function to load quiz for this page
            } else {
                showError(translations[currentLanguage].error_no_quizzes_available); // Show error if no params
            }

            AOS.init(); // Initialize AOS
        } else {
            console.error("MDBootstrap (mdb object) still not found on quiz_page after delay. There might be a deeper issue.");
            // Optionally, show a user-friendly error message or retry more aggressively
        }
    }, 100); // Small delay to ensure MDBootstrap is ready
});

// New function to load and display quiz on this page
async function loadQuizPage(category, level, language) {
    showLoading(true);
    const filePath = getQuizFilePath(category, language); // Use the global helper function
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const markdown = await response.text();
            const allQuestions = parseMarkdownQuiz(markdown);
            
            // Filter questions by difficulty level
            const filteredQuestions = allQuestions.filter(q => q.difficulty === level);

            if (filteredQuestions.length > 0) {
                currentQuiz = filteredQuestions;
                currentQuestionIndex = 0;
                score = 0;
                totalQuestions = currentQuiz.length;
                showLoading(false);
                showQuestion(); // Start displaying questions
            } else {
                showError(translations[language].error_quiz_not_available(category) + ". No questions found for this difficulty level.");
            }
        } else {
            showError(translations[language].error_quiz_not_available(category) + ". Quiz file not found.");
        }
    } catch (error) {
        console.error("Error loading quiz:", error);
        showError(translations[language].error_quiz_not_available(category) + ". An error occurred.");
    }
} 