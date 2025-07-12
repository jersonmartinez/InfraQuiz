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

// === PARSER ROBUSTO PARA OPCIONES CON EMOJIS Y NODOS FLEXIBLES ===
function parseMarkdownQuiz(markdown) {
    console.log('🔍 [PRO] Parsing quiz with marked (emoji options, flexible nodes)...');
    const html = marked.parse(markdown);
    const container = document.createElement('div');
    container.innerHTML = html;
    const questions = [];
    let log = [];
    let qCount = 0;
    let malformed = 0;
    const optionEmojis = ['📝', '🔄', '📦', '🎯'];
    function clean(text) {
        return text.replace(/\s+/g, ' ').trim();
    }
    function extractDifficulty(text) {
        if (/🏷️\s*beginner/i.test(text) || /🟢/.test(text)) return 'beginner';
        if (/🏷️\s*intermediate/i.test(text) || /🟡/.test(text)) return 'intermediate';
        if (/🏷️\s*advanced/i.test(text) || /🔴/.test(text)) return 'advanced';
        return '';
    }
    function extractOption(line) {
        for (const emoji of optionEmojis) {
            if (line.startsWith(emoji)) {
                return clean(line.replace(emoji, ''));
            }
        }
        return null;
    }
    function extractCorrect(line) {
        return line.replace(/^(\*\*|)(Correct Answer|Respuesta Correcta):(\*\*|)\s*/i, '').replace(/^📝|🔄|📦|🎯/, '').trim();
    }
    function extractExplanation(line) {
        return line.replace(/^(\*\*|)(Explanation|Explicación):(\*\*|)\s*/i, '').replace(/^💡/, '').trim();
    }
    // Recorrer todos los nodos y agrupar por pregunta
    const nodes = Array.from(container.childNodes);
    let i = 0;
    while (i < nodes.length) {
        const el = nodes[i];
        if (el.nodeType === 1 && el.tagName === 'H3') {
            // Nueva pregunta
            let current = {
                text: clean(el.textContent),
                options: [],
                answer: '',
                explanation: '',
                difficulty: extractDifficulty(el.textContent),
            };
            i++;
            // Recorrer nodos hasta el siguiente <h3> o fin
            while (i < nodes.length && !(nodes[i].nodeType === 1 && nodes[i].tagName === 'H3')) {
                const n = nodes[i];
                // Opciones en <p>
                if (n.nodeType === 1 && n.tagName === 'P') {
                    const opt = extractOption(n.textContent.trim());
                    if (opt !== null) {
                        current.options.push(opt);
                    } else if (/^(\*\*|)(Correct Answer|Respuesta Correcta):(\*\*|)/i.test(n.textContent.trim())) {
                        current.answer = extractCorrect(n.textContent.trim());
                    } else if (/^(\*\*|)(Explanation|Explicación):(\*\*|)/i.test(n.textContent.trim())) {
                        current.explanation = extractExplanation(n.textContent.trim());
                    } else if (/^💡/.test(n.textContent.trim())) {
                        current.explanation = clean(n.textContent.trim().replace(/^💡/, ''));
                    } else if (/🏷️|🟢|🟡|🔴/.test(n.textContent.trim())) {
                        current.difficulty = extractDifficulty(n.textContent.trim());
                    }
                }
                // Opciones en <ul><li>
                if (n.nodeType === 1 && n.tagName === 'UL') {
                    for (const li of n.children) {
                        const opt = extractOption(li.textContent.trim());
                        if (opt !== null) {
                            current.options.push(opt);
                        }
                    }
                }
                // Opciones en texto plano (nodos de texto)
                if (n.nodeType === 3) {
                    const opt = extractOption(n.textContent.trim());
                    if (opt !== null) {
                        current.options.push(opt);
                    }
                }
                i++;
            }
            // Validar y guardar pregunta
            qCount++;
            if (current.options.length === 4 && current.answer && current.difficulty) {
                questions.push(current);
                log.push(`✅ Q${qCount}: "${clean(current.text)}" - ${current.difficulty}`);
            } else {
                malformed++;
                log.push(`⚠️ Malformed Q${qCount}: "${clean(current.text)}" - ${current.options.length} options`);
            }
        } else {
            i++;
        }
    }
    // Log resumen
    console.log('📊 [PRO] Parsing Results:');
    console.log(`  ✅ Parsed: ${questions.length}`);
    console.log(`  ⚠️ Malformed: ${malformed}`);
    log.forEach(l => console.log('   ', l));
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

// --- ADVANCED UX, LEADERBOARD, RANDOMIZATION, MULTIMEDIA, ACCESSIBILITY, ROBUSTNESS ---

// --- Timer ---
let quizTimerInterval = null;
let quizElapsedSeconds = 0;
function startQuizTimer() {
    quizElapsedSeconds = 0;
    updateQuizTimerDisplay();
    if (quizTimerInterval) clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        quizElapsedSeconds++;
        updateQuizTimerDisplay();
    }, 1000);
}
function stopQuizTimer() {
    if (quizTimerInterval) clearInterval(quizTimerInterval);
}
function updateQuizTimerDisplay() {
    const timerEl = document.getElementById('quizTimer');
    if (timerEl) {
        const min = Math.floor(quizElapsedSeconds / 60);
        const sec = quizElapsedSeconds % 60;
        timerEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    }
}

// --- Progress Bar & Counter ---
function renderProgressIndicator() {
    const container = document.getElementById('quizProgressIndicator');
    if (!container) return;
    const progress = ((currentQuestionIndex) / totalQuestions) * 100;
    container.innerHTML = `
        <div class="progress flex-grow-1 me-3" style="height: 12px; min-width: 120px;">
            <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="fw-bold">${translations[currentLanguage].question_progress(currentQuestionIndex + 1, totalQuestions)}</div>
        <div id="quizTimer" class="quiz-timer" aria-live="polite" tabindex="0"></div>
    `;
    updateQuizTimerDisplay();
}

// --- Keyboard Navigation ---
function setupKeyboardNavigation() {
    document.onkeydown = (e) => {
        if (!currentQuiz || currentQuestionIndex >= totalQuestions) return;
        const options = document.querySelectorAll('.quiz-option');
        let focused = Array.from(options).findIndex(opt => opt === document.activeElement);
        // 1-4 or A-D
        if (e.key >= '1' && e.key <= String(options.length)) {
            options[parseInt(e.key) - 1].focus();
        } else if (e.key.toLowerCase() >= 'a' && e.key.toLowerCase() < String.fromCharCode('a'.charCodeAt(0) + options.length)) {
            options[e.key.toLowerCase().charCodeAt(0) - 97].focus();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (focused < options.length - 1) options[focused + 1].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (focused > 0) options[focused - 1].focus();
        } else if (e.key === 'Enter' && focused !== -1) {
            options[focused].click();
        }
    };
}

// --- Leaderboard Local Storage ---
function saveLeaderboard(category, level, score, time) {
    const key = `infraquiz_leaderboard_${category}_${level}`;
    let board = JSON.parse(localStorage.getItem(key) || '[]');
    board.push({ score, time, date: new Date().toISOString() });
    board = board.sort((a, b) => b.score - a.score || a.time - b.time).slice(0, 5);
    localStorage.setItem(key, JSON.stringify(board));
}
function renderLeaderboard(category, level) {
    const key = `infraquiz_leaderboard_${category}_${level}`;
    let board = JSON.parse(localStorage.getItem(key) || '[]');
    if (!board.length) return '';
    return `
    <div class="leaderboard">
        <div class="leaderboard-title">🏆 Top 5 (${category} - ${level})</div>
        <ul class="leaderboard-list">
            ${board.map((entry, i) => `<li><span>#${i+1}</span> <span class="leaderboard-score">${entry.score}</span> <span class="leaderboard-time">${Math.floor(entry.time/60)}:${(entry.time%60).toString().padStart(2,'0')}</span></li>`).join('')}
        </ul>
    </div>`;
}

// --- Random Question Selection ---
function selectRandomQuestions(allQuestions, count) {
    if (allQuestions.length <= count) return allQuestions;
    const shuffled = allQuestions.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// --- Multimedia in Explanations ---
function renderExplanationWithMedia(explanation) {
    if (!explanation) return '';
    
    let html = explanation;
    
    // Secure image rendering (only allow common image hosts)
    const allowedImageHosts = ['imgur.com', 'github.com', 'githubusercontent.com', 'cloudfront.net'];
    const imageRegex = /(https?:\/\/(?:[^\/]+\.)?(?:imgur\.com|github\.com|githubusercontent\.com|cloudfront\.net)[^\s]+\.(?:png|jpg|jpeg|gif|webp))/gi;
    
    html = html.replace(imageRegex, (match) => {
        const isAllowed = allowedImageHosts.some(host => match.includes(host));
        if (isAllowed) {
            return `<img src="${match}" alt="Explanation diagram" style="max-width:100%; height:auto; margin:1em 0; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);" loading="lazy" />`;
        }
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">[Image: ${match}]</a>`;
    });
    
    // Convert URLs to links (excluding images already processed)
    html = html.replace(/(https?:\/\/[^\s<]+)/gi, (match) => {
        if (match.match(/\.(png|jpg|jpeg|gif|webp)$/i)) return match; // Skip images
        return `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-decoration-none">${match} <i class="bi bi-box-arrow-up-right"></i></a>`;
    });
    
    // Enhanced markdown support
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/`(.*?)`/g, '<code class="bg-light p-1 rounded">$1</code>');
    
    // Convert line breaks to proper HTML
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// --- ARIA/Accessibility ---
function applyAriaToOptions() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.setAttribute('role', 'button');
        opt.setAttribute('tabindex', '0');
        opt.setAttribute('aria-label', `Option ${i+1}`);
        opt.setAttribute('aria-selected', 'false');
    });
}

// --- Share Results ---
function renderShareButtons(score, total, category, level, time) {
    const url = encodeURIComponent(window.location.href.split('?')[0] + `?category=${category}&level=${level}`);
    const text = encodeURIComponent(`I scored ${score}/${total} in ${category} (${level}) on InfraQuiz! Try to beat my score!`);
    return `
    <div class="d-flex gap-2 justify-content-center mt-3">
        <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" class="btn btn-outline-primary btn-sm"><i class="bi bi-twitter"></i> Twitter</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" class="btn btn-outline-primary btn-sm"><i class="bi bi-linkedin"></i> LinkedIn</a>
        <a href="https://wa.me/?text=${text}%20${url}" target="_blank" class="btn btn-outline-success btn-sm"><i class="bi bi-whatsapp"></i> WhatsApp</a>
        <button class="btn btn-outline-secondary btn-sm" onclick="navigator.clipboard.writeText('${text} ${url}')"><i class="bi bi-clipboard"></i> Copy</button>
    </div>`;
}

// --- Voice Reading ---
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utter);
    }
}

// --- INTEGRATION OF ADVANCED FEATURES INTO QUIZ FLOW ---

// Store selected questions for this session
let selectedQuestions = [];

// Override: Enhanced quiz loading function with all integrations
async function loadQuizPage(category, level, language) {
    console.log(`🚀 Loading quiz: ${category} (${level}) in ${language}`);
    showLoading(true);
    
    const filePath = getQuizFilePath(category, language);
    const startTime = performance.now();
    
    try {
        console.log(`📡 Fetching quiz from: ${filePath}`);
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const markdown = await response.text();
        console.log(`📄 Downloaded ${Math.round(markdown.length / 1024)}KB of content`);
        
        if (markdown.length < 100) {
            throw new Error('Quiz file appears to be empty or too small');
        }
        
        // Parse with enhanced parser
        const allQuestions = parseMarkdownQuiz(markdown);
        
        if (allQuestions.length === 0) {
            throw new Error('No valid questions found in quiz file');
        }
        
        // Filter by difficulty with fallback
        let filteredQuestions = allQuestions.filter(q => q.difficulty === level);
        
        // Fallback: if no questions for specific difficulty, try to distribute
        if (filteredQuestions.length === 0) {
            console.warn(`⚠️ No questions found for difficulty "${level}". Attempting smart distribution...`);
            
            const totalQuestions = allQuestions.length;
            const questionsPerLevel = Math.ceil(totalQuestions / 3);
            
            if (level === 'beginner') {
                filteredQuestions = allQuestions.slice(0, questionsPerLevel);
            } else if (level === 'intermediate') {
                filteredQuestions = allQuestions.slice(questionsPerLevel, questionsPerLevel * 2);
            } else if (level === 'advanced') {
                filteredQuestions = allQuestions.slice(questionsPerLevel * 2);
            }
            
            // Update difficulty for consistency
            filteredQuestions.forEach(q => q.difficulty = level);
            
            console.log(`🔄 Smart distribution: assigned ${filteredQuestions.length} questions to ${level} level`);
        }
        
        // Select random questions (max 21 for optimal UX)
        selectedQuestions = selectRandomQuestions(filteredQuestions, 21);
        
        if (selectedQuestions.length === 0) {
            throw new Error(`No questions available for difficulty level: ${level}`);
        }
        
        // Initialize quiz state
        currentQuiz = selectedQuestions;
        currentQuestionIndex = 0;
        score = 0;
        totalQuestions = currentQuiz.length;
        startTime = Date.now();
        quizElapsedSeconds = 0;
        
        const loadTime = Math.round(performance.now() - startTime);
        console.log(`✅ Quiz loaded successfully in ${loadTime}ms! Ready to start with ${totalQuestions} questions.`);
        
        // Start the quiz experience
        showLoading(false);
        renderProgressIndicator();
        startQuizTimer();
        showQuestion();
        setupKeyboardNavigation();
        
        // Analytics and user feedback
        showQuizLoadedToast(category, level, totalQuestions, loadTime);
        
    } catch (error) {
        const loadTime = Math.round(performance.now() - startTime);
        console.error(`❌ Quiz loading failed after ${loadTime}ms:`, error);
        
        // Enhanced error messages for users
        let userMessage = translations[language].error_quiz_not_available(category);
        
        if (error.message.includes('HTTP 404')) {
            userMessage += '\n\n📁 Quiz file not found. This category might not be available yet.';
        } else if (error.message.includes('HTTP 403')) {
            userMessage += '\n\n🔒 Access denied. Please try again later.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            userMessage += '\n\n🌐 Network connection issue. Please check your internet connection and try again.';
        } else if (error.message.includes('empty') || error.message.includes('too small')) {
            userMessage += '\n\n📄 Quiz content appears to be incomplete. Please try another category.';
        } else if (error.message.includes('No valid questions')) {
            userMessage += '\n\n📝 Quiz format issue detected. Please report this to the developers.';
        } else {
            userMessage += `\n\n🔧 Technical details: ${error.message}`;
        }
        
        showError(userMessage);
        
        // Suggest alternatives
        suggestAlternativeQuizzes(category, level);
    }
}

// Override: Enhanced showQuestion with progress, timer, ARIA, voice
function showQuestion() {
    const quizContentDiv = document.getElementById('quizContent');
    const quizLoadingDiv = document.getElementById('quizLoading');
    const quizResultsDiv = document.getElementById('quizResults');
    const quizErrorDiv = document.getElementById('quizError');
    quizLoadingDiv.style.display = 'none';
    quizResultsDiv.style.display = 'none';
    quizErrorDiv.style.display = 'none';
    quizContentDiv.style.display = 'block';
    renderProgressIndicator();
    updateQuizTimerDisplay();
    const questionTextElement = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackElement = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    feedbackElement.classList.add('d-none');
    feedbackElement.innerHTML = '';
    nextQuestionBtn.style.display = 'none';
    if (currentQuestionIndex < totalQuestions) {
        const question = currentQuiz[currentQuestionIndex];
        const quizPageTitle = document.getElementById('quizPageTitle');
        const techName = technologies.find(t => t.id === getUrlParameter('category'))?.name || 'Quiz';
        quizPageTitle.textContent = `${techName} - ${translations[currentLanguage].question_progress(currentQuestionIndex + 1, totalQuestions)}`;
        questionTextElement.innerHTML = question.text;
        // Add voice button
        questionTextElement.innerHTML += ` <button class="btn btn-sm btn-outline-secondary ms-2" aria-label="Read question aloud" onclick="window.speechSynthesis.cancel();speakText('${question.text.replace(/'/g, '\'')}')"><i class="bi bi-volume-up"></i></button>`;
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'list-group-item list-group-item-action ripple shadow-1 quiz-option';
            optionElement.setAttribute('data-mdb-ripple-color', 'primary');
            optionElement.setAttribute('data-index', index);
            optionElement.setAttribute('tabindex', '0');
            optionElement.setAttribute('role', 'button');
            optionElement.setAttribute('aria-label', `Option ${index+1}`);
            optionElement.setAttribute('aria-selected', 'false');
            optionElement.innerHTML = `
                <div class="d-flex align-items-center">
                    <span class="option-letter me-3">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option.text}</span>
                    <button class="btn btn-xs btn-link ms-2 visually-hidden" tabindex="-1" aria-label="Read option aloud" onclick="window.speechSynthesis.cancel();speakText('${option.text.replace(/'/g, '\'')}')"><i class="bi bi-volume-up"></i></button>
                </div>
            `;
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
            setTimeout(() => {
                optionElement.classList.add('slide-in');
            }, index * 100);
        });
        applyAriaToOptions();
        setupKeyboardNavigation();
    } else {
        showQuizResults();
    }
}

// Override: Enhanced selectOption with feedback, voice, keyboard
function selectOption(event) {
    const selectedOptionElement = event.currentTarget;
    const optionIndex = parseInt(selectedOptionElement.dataset.index);
    const question = currentQuiz[currentQuestionIndex];
    const feedbackElement = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(opt => {
        opt.removeEventListener('click', selectOption);
        opt.style.cursor = 'default';
        opt.classList.add('pe-none');
        opt.setAttribute('aria-selected', 'false');
    });
    selectedOptionElement.classList.add('selected');
    selectedOptionElement.setAttribute('aria-selected', 'true');
    const correctOptionIndex = question.options.findIndex(option => option.isCorrect);
    if (question.options[optionIndex].isCorrect) {
        selectedOptionElement.classList.add('correct');
        score++;
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
                <h6 class="text-primary mb-2"><i class="bi bi-lightbulb me-2"></i>Explanation <button class='btn btn-xs btn-outline-secondary ms-2' aria-label='Read explanation aloud' onclick='window.speechSynthesis.cancel();speakText("${question.explanation.replace(/"/g, '\"')}")'><i class='bi bi-volume-up'></i></button></h6>
                <div class="mb-0">${renderExplanationWithMedia(question.explanation)}</div>
            </div>
        `;
    } else {
        selectedOptionElement.classList.add('incorrect');
        if (correctOptionIndex !== -1) {
            quizOptions[correctOptionIndex].classList.add('correct');
        }
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
                <h6 class="text-primary mb-2"><i class="bi bi-lightbulb me-2"></i>Explanation <button class='btn btn-xs btn-outline-secondary ms-2' aria-label='Read explanation aloud' onclick='window.speechSynthesis.cancel();speakText("${question.explanation.replace(/"/g, '\"')}")'><i class='bi bi-volume-up'></i></button></h6>
                <div class="mb-0">${renderExplanationWithMedia(question.explanation)}</div>
            </div>
        `;
    }
    feedbackElement.classList.remove('d-none');
    feedbackElement.classList.add('slide-in-up');
    nextQuestionBtn.style.display = 'block';
    nextQuestionBtn.classList.add('fade-in');
    // Allow Enter to go to next question
    document.onkeydown = (e) => {
        if (e.key === 'Enter') nextQuestionBtn.click();
    };
}

// Override: Enhanced showQuizResults with leaderboard and share
function showQuizResults() {
    const quizContentDiv = document.getElementById('quizContent');
    const quizResultsDiv = document.getElementById('quizResults');
    quizContentDiv.style.display = 'none';
    quizResultsDiv.style.display = 'block';
    stopQuizTimer();
    const finalScoreElement = document.getElementById('finalScore');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const backToCategoriesResultsBtn = document.getElementById('backToCategoriesResultsBtn');
    const quizCompleteTitle = document.querySelector('#quizResults h3');
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    const shareButtonsContainer = document.getElementById('shareButtonsContainer');
    // Calculate statistics
    const accuracy = Math.round((score / totalQuestions) * 100);
    const timeElapsed = quizElapsedSeconds;
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
    // Save and render leaderboard
    const category = getUrlParameter('category');
    const level = getUrlParameter('level');
    saveLeaderboard(category, level, score, quizElapsedSeconds);
    leaderboardContainer.innerHTML = renderLeaderboard(category, level);
    // Render share buttons
    shareButtonsContainer.innerHTML = renderShareButtons(score, totalQuestions, category, level, quizElapsedSeconds);
    restartQuizBtn.addEventListener('click', restartQuiz);
    backToCategoriesResultsBtn.addEventListener('click', () => { window.location.href = 'index.html#quizzes'; });
}

// Override: Enhanced restartQuiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizElapsedSeconds = 0;
    startQuizTimer();
    renderProgressIndicator();
    showQuestion();
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

// User feedback and suggestions
function showQuizLoadedToast(category, level, questionCount, loadTime) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed top-0 end-0 m-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                🎉 ${category} quiz loaded! ${questionCount} questions ready in ${loadTime}ms
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

function suggestAlternativeQuizzes(failedCategory, failedLevel) {
    const alternatives = technologies.filter(t => t.id !== failedCategory).slice(0, 3);
    const suggestionHTML = `
        <div class="mt-3 p-3 bg-light rounded">
            <h6>💡 Try these alternatives:</h6>
            ${alternatives.map(alt => `
                <a href="quiz.html?category=${alt.id}&level=${failedLevel}&lang=${currentLanguage}" 
                   class="btn btn-outline-primary btn-sm me-2 mb-2">
                    <i class="bi ${alt.icon}"></i> ${alt.name}
                </a>
            `).join('')}
        </div>
    `;
    
    const errorContainer = document.getElementById('quizError');
    if (errorContainer) {
        errorContainer.innerHTML += suggestionHTML;
    }
}

// Enhanced multimedia explanation rendering with security
function renderExplanationWithMedia(explanation) {
    if (!explanation) return '';
    
    let html = explanation;
    
    // Secure image rendering (only allow common image hosts)
    const allowedImageHosts = ['imgur.com', 'github.com', 'githubusercontent.com', 'cloudfront.net'];
    const imageRegex = /(https?:\/\/(?:[^\/]+\.)?(?:imgur\.com|github\.com|githubusercontent\.com|cloudfront\.net)[^\s]+\.(?:png|jpg|jpeg|gif|webp))/gi;
    
    html = html.replace(imageRegex, (match) => {
        const isAllowed = allowedImageHosts.some(host => match.includes(host));
        if (isAllowed) {
            return `<img src="${match}" alt="Explanation diagram" style="max-width:100%; height:auto; margin:1em 0; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);" loading="lazy" />`;
        }
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">[Image: ${match}]</a>`;
    });
    
    // Convert URLs to links (excluding images already processed)
    html = html.replace(/(https?:\/\/[^\s<]+)/gi, (match) => {
        if (match.match(/\.(png|jpg|jpeg|gif|webp)$/i)) return match; // Skip images
        return `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-decoration-none">${match} <i class="bi bi-box-arrow-up-right"></i></a>`;
    });
    
    // Enhanced markdown support
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/`(.*?)`/g, '<code class="bg-light p-1 rounded">$1</code>');
    
    // Convert line breaks to proper HTML
    html = html.replace(/\n/g, '<br>');
    
    return html;
} 