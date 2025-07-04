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

// Quiz data structure (dynamic based on language)
function getQuizFilePath(techId) {
    const fileName = (currentLanguage === 'es') ? 'cuestionario1.md' : 'questions1.md';
    return `quizzes/${techId}/${currentLanguage}/${fileName}`;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDarkMode(); // Initialize dark mode
    initializeLanguageSelector();
    renderQuizCategories(); // Render categories dynamically
    loadQuizData();
});

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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
    const nav = document.querySelector('.navbar-nav');
    if (!nav) return;
    
    // Check if the selector already exists to avoid duplication
    if (!document.getElementById('languageSelector')) {
        const li = document.createElement('li');
        li.className = 'nav-item ms-lg-3'; // Add margin for spacing
        li.innerHTML = `
            <select id="languageSelector" class="form-select form-select-sm" aria-label="Language selector">
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        `;
        nav.appendChild(li);
    }

    const languageSelector = document.getElementById('languageSelector');
    languageSelector.value = currentLanguage;
    languageSelector.addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        localStorage.setItem('quizLanguage', currentLanguage); // Save language preference
        loadQuizData(); // Reload quiz data for the new language
        renderQuizCategories(); // Re-render categories with correct titles/descriptions
    });
}

// Render quiz categories dynamically
function renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    container.innerHTML = ''; // Clear existing categories

    technologies.forEach(tech => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="card quiz-card h-100" onclick="loadQuiz('${tech.id}')">
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
        const filePath = getQuizFilePath(tech.id);
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
        
        // Detect options
        if (inQuestionBlock && (line.startsWith('- [ ] ') || line.startsWith('- [x] '))) {
            const isCorrect = line.startsWith('- [x] ');
            const optionText = line.substring(6).trim();
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
        showError(currentLanguage === 'es' ? 'No hay quizzes disponibles para iniciar. Intenta recargar la página.' : 'No quizzes available to start. Please try reloading the page.');
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
        showError(currentLanguage === 'es' ?
            `El quiz de ${techName} no está disponible todavía. Por favor, intenta otra categoría.` :
            `The ${techName} quiz is not available yet. Please try another category.`);
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
    const quizModal = new bootstrap.Modal(document.getElementById('quizModal'));
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
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="text-muted float-end mt-1">${currentQuestionIndex} / ${totalQuestions}</small>
            </div>
            <p class="quiz-question">${question.text}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" data-index="${index}">
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
            <h6>${currentLanguage === 'es' ? '¡Correcto!' : 'Correct!'} <i class="bi bi-check-circle-fill text-success"></i></h6>
            <p>${question.explanation}</p>
        `;
    } else {
        selectedOptionElement.classList.add('incorrect');
        if (correctOptionIndex !== -1) {
            quizOptions[correctOptionIndex].classList.add('correct'); // Highlight correct answer
        }
        explanationElement.innerHTML = `
            <h6>${currentLanguage === 'es' ? 'Incorrecto.' : 'Incorrect.'} <i class="bi bi-x-circle-fill text-danger"></i></h6>
            <p>${currentLanguage === 'es' ? 'La respuesta correcta era:' : 'The correct answer was:'} <strong>${question.options[correctOptionIndex].text}</strong></p>
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

    const resultMessage = currentLanguage === 'es' ?
        `Has completado el quiz! Tu puntuación final es:` :
        `You have completed the quiz! Your final score is:`;
    const scoreDetails = currentLanguage === 'es' ?
        `Obtuviste ${score} de ${totalQuestions} preguntas correctas.` :
        `You got ${score} out of ${totalQuestions} questions correct.`;

    questionContainer.innerHTML = `
        <div class="quiz-results text-center py-4">
            <h3 class="display-4 fw-bold mb-3">🎉 ${resultMessage}</h3>
            <div class="quiz-score mb-4">
                <p class="h4 mb-0">${score} / ${totalQuestions}</p>
            </div>
            <p class="lead">${scoreDetails}</p>
            <div class="d-grid gap-2 col-md-8 mx-auto mt-4">
                <button class="btn btn-primary btn-lg" onclick="restartQuiz()">${currentLanguage === 'es' ? 'Reiniciar Quiz' : 'Restart Quiz'}</button>
                <button class="btn btn-outline-secondary btn-lg" data-bs-dismiss="modal">${currentLanguage === 'es' ? 'Volver a Categorías' : 'Back to Categories'}</button>
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
    showError(currentLanguage === 'es' ?
        'Esta categoría estará disponible pronto. ¡Vuelve más tarde!' :
        'This category will be available soon. Check back later!');
}

// Show generic error modal
function showError(message) {
    document.getElementById('errorMessage').innerText = message;
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}

// Show/hide loading spinner in quiz modal
function showLoading(isLoading) {
    const quizContent = document.getElementById('quizContent');
    if (isLoading) {
        quizContent.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">${currentLanguage === 'es' ? 'Cargando...' : 'Loading...'}</span>
                </div>
                <p class="mt-3 lead">${currentLanguage === 'es' ? 'Cargando preguntas...' : 'Loading questions...'}</p>
            </div>
        `;
    } else {
        // Clear loading spinner, content will be replaced by showQuestion or showQuizResults
        // No direct action needed here, as showQuestion/showQuizResults will overwrite
    }
} 