// Quiz Editor JavaScript - Advanced Quiz Creation Tool

class QuizEditor {
    constructor() {
        this.questions = [];
        this.currentLanguage = localStorage.getItem('quizLanguage') || 'en';
        this.questionCounter = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeDarkMode();
        this.updateStats();
    }

    setupEventListeners() {
        // Toolbar buttons
        document.getElementById('newQuizBtn').addEventListener('click', () => this.newQuiz());
        document.getElementById('loadQuizBtn').addEventListener('click', () => this.loadQuiz());
        document.getElementById('saveQuizBtn').addEventListener('click', () => this.saveQuiz());
        document.getElementById('previewQuizBtn').addEventListener('click', () => this.previewQuiz());
        document.getElementById('exportMarkdownBtn').addEventListener('click', () => this.exportMarkdown());
        document.getElementById('addQuestionBtn').addEventListener('click', () => this.addQuestion());
        document.getElementById('testQuizBtn').addEventListener('click', () => this.testQuiz());

        // Language selector
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
            languageSelector.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                localStorage.setItem('quizLanguage', this.currentLanguage);
            });
        }
    }

    initializeDarkMode() {
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

    newQuiz() {
        if (this.questions.length > 0) {
            if (!confirm('Are you sure you want to create a new quiz? All unsaved changes will be lost.')) {
                return;
            }
        }
        
        this.questions = [];
        this.questionCounter = 0;
        document.getElementById('quizTitle').value = '';
        document.getElementById('quizCategory').value = '';
        document.getElementById('questionsContainer').innerHTML = '';
        this.updateStats();
        this.showNotification('New quiz created', 'success');
    }

    addQuestion() {
        const questionId = ++this.questionCounter;
        const questionHtml = this.createQuestionHTML(questionId);
        
        const questionsContainer = document.getElementById('questionsContainer');
        questionsContainer.insertAdjacentHTML('beforeend', questionHtml);
        
        this.setupQuestionEventListeners(questionId);
        this.updateStats();
        
        // Scroll to the new question
        const newQuestion = document.getElementById(`question-${questionId}`);
        newQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    createQuestionHTML(questionId) {
        return `
            <div class="question-editor" id="question-${questionId}">
                <div class="question-header">
                    <h5>Question ${questionId}</h5>
                    <div class="question-actions">
                        <button class="btn btn-sm btn-outline-primary" onclick="quizEditor.moveQuestionUp(${questionId})">
                            <i class="bi bi-arrow-up"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-primary" onclick="quizEditor.moveQuestionDown(${questionId})">
                            <i class="bi bi-arrow-down"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="quizEditor.deleteQuestion(${questionId})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="question-content">
                    <div class="row">
                        <div class="col-md-8">
                            <label class="form-label">Question Text</label>
                            <textarea class="quiz-editor-input quiz-editor-textarea" 
                                      id="questionText-${questionId}" 
                                      placeholder="Enter your question here..."
                                      rows="3"></textarea>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Difficulty</label>
                            <select class="quiz-editor-input" id="questionDifficulty-${questionId}">
                                <option value="beginner">🟢 Beginner</option>
                                <option value="intermediate">🟡 Intermediate</option>
                                <option value="advanced">🔴 Advanced</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="options-container">
                        <label class="form-label">Answer Options</label>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="option-input-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="correct-${questionId}" id="correct-${questionId}-0" value="0">
                                        <label class="form-check-label" for="correct-${questionId}-0">📝</label>
                                    </div>
                                    <input type="text" class="quiz-editor-input" id="option-${questionId}-0" placeholder="Option A">
                                </div>
                                <div class="option-input-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="correct-${questionId}" id="correct-${questionId}-1" value="1">
                                        <label class="form-check-label" for="correct-${questionId}-1">🔄</label>
                                    </div>
                                    <input type="text" class="quiz-editor-input" id="option-${questionId}-1" placeholder="Option B">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="option-input-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="correct-${questionId}" id="correct-${questionId}-2" value="2">
                                        <label class="form-check-label" for="correct-${questionId}-2">📦</label>
                                    </div>
                                    <input type="text" class="quiz-editor-input" id="option-${questionId}-2" placeholder="Option C">
                                </div>
                                <div class="option-input-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="correct-${questionId}" id="correct-${questionId}-3" value="3">
                                        <label class="form-check-label" for="correct-${questionId}-3">🎯</label>
                                    </div>
                                    <input type="text" class="quiz-editor-input" id="option-${questionId}-3" placeholder="Option D">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="explanation-container">
                        <label class="form-label">Explanation</label>
                        <textarea class="quiz-editor-input quiz-editor-textarea" 
                                  id="explanation-${questionId}" 
                                  placeholder="Provide a detailed explanation for the correct answer..."
                                  rows="3"></textarea>
                    </div>
                </div>
            </div>
        `;
    }

    setupQuestionEventListeners(questionId) {
        // Add event listeners for real-time updates
        const inputs = [
            `questionText-${questionId}`,
            `questionDifficulty-${questionId}`,
            `option-${questionId}-0`,
            `option-${questionId}-1`,
            `option-${questionId}-2`,
            `option-${questionId}-3`,
            `explanation-${questionId}`
        ];

        inputs.forEach(inputId => {
            const element = document.getElementById(inputId);
            if (element) {
                element.addEventListener('input', () => this.updateStats());
            }
        });

        // Add listeners for correct answer radio buttons
        for (let i = 0; i < 4; i++) {
            const radio = document.getElementById(`correct-${questionId}-${i}`);
            if (radio) {
                radio.addEventListener('change', () => this.updateStats());
            }
        }
    }

    deleteQuestion(questionId) {
        if (confirm('Are you sure you want to delete this question?')) {
            const questionElement = document.getElementById(`question-${questionId}`);
            if (questionElement) {
                questionElement.remove();
                this.updateStats();
                this.showNotification('Question deleted', 'success');
            }
        }
    }

    moveQuestionUp(questionId) {
        const questionElement = document.getElementById(`question-${questionId}`);
        const previousElement = questionElement.previousElementSibling;
        
        if (previousElement && previousElement.classList.contains('question-editor')) {
            questionElement.parentNode.insertBefore(questionElement, previousElement);
            this.showNotification('Question moved up', 'success');
        }
    }

    moveQuestionDown(questionId) {
        const questionElement = document.getElementById(`question-${questionId}`);
        const nextElement = questionElement.nextElementSibling;
        
        if (nextElement && nextElement.classList.contains('question-editor')) {
            questionElement.parentNode.insertBefore(nextElement, questionElement);
            this.showNotification('Question moved down', 'success');
        }
    }

    updateStats() {
        const questionElements = document.querySelectorAll('.question-editor');
        let beginnerCount = 0, intermediateCount = 0, advancedCount = 0;

        questionElements.forEach(element => {
            const difficultySelect = element.querySelector('select[id^="questionDifficulty-"]');
            if (difficultySelect) {
                switch (difficultySelect.value) {
                    case 'beginner': beginnerCount++; break;
                    case 'intermediate': intermediateCount++; break;
                    case 'advanced': advancedCount++; break;
                }
            }
        });

        document.getElementById('totalQuestions').textContent = questionElements.length;
        document.getElementById('beginnerCount').textContent = beginnerCount;
        document.getElementById('intermediateCount').textContent = intermediateCount;
        document.getElementById('advancedCount').textContent = advancedCount;
    }

    collectQuizData() {
        const quizData = {
            title: document.getElementById('quizTitle').value,
            category: document.getElementById('quizCategory').value,
            questions: []
        };

        const questionElements = document.querySelectorAll('.question-editor');
        
        questionElements.forEach(element => {
            const questionId = element.id.split('-')[1];
            const questionText = document.getElementById(`questionText-${questionId}`).value;
            const difficulty = document.getElementById(`questionDifficulty-${questionId}`).value;
            const explanation = document.getElementById(`explanation-${questionId}`).value;
            
            const options = [];
            let correctIndex = -1;
            
            for (let i = 0; i < 4; i++) {
                const optionText = document.getElementById(`option-${questionId}-${i}`).value;
                const isCorrect = document.getElementById(`correct-${questionId}-${i}`).checked;
                
                options.push({
                    text: optionText,
                    isCorrect: isCorrect
                });
                
                if (isCorrect) {
                    correctIndex = i;
                }
            }

            if (questionText && options.every(opt => opt.text) && correctIndex !== -1) {
                quizData.questions.push({
                    text: questionText,
                    difficulty: difficulty,
                    options: options,
                    explanation: explanation,
                    correctIndex: correctIndex
                });
            }
        });

        return quizData;
    }

    saveQuiz() {
        const quizData = this.collectQuizData();
        
        if (!quizData.title || !quizData.category) {
            this.showNotification('Please fill in quiz title and category', 'error');
            return;
        }
        
        if (quizData.questions.length === 0) {
            this.showNotification('Please add at least one question', 'error');
            return;
        }

        // Save to localStorage with enhanced metadata
        const savedQuizzes = JSON.parse(localStorage.getItem('infraquiz_saved_quizzes') || '[]');
        const quizId = Date.now().toString();
        
        const enhancedQuizData = {
            id: quizId,
            ...quizData,
            language: this.currentLanguage,
            isCustomQuiz: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Add metadata for better integration
            fileName: this.currentLanguage === 'en' ? 'questions1.md' : 'cuestionario1.md',
            totalQuestions: quizData.questions.length,
            difficulties: {
                beginner: quizData.questions.filter(q => q.difficulty === 'beginner').length,
                intermediate: quizData.questions.filter(q => q.difficulty === 'intermediate').length,
                advanced: quizData.questions.filter(q => q.difficulty === 'advanced').length
            }
        };
        
        // Remove existing quiz with same category and language if exists
        const existingIndex = savedQuizzes.findIndex(quiz => 
            quiz.category === quizData.category && 
            quiz.language === this.currentLanguage
        );
        
        if (existingIndex !== -1) {
            savedQuizzes[existingIndex] = enhancedQuizData;
            this.showNotification(`Quiz "${quizData.title}" updated successfully!`, 'success');
        } else {
            savedQuizzes.push(enhancedQuizData);
            this.showNotification(`Quiz "${quizData.title}" saved successfully!`, 'success');
        }
        
        localStorage.setItem('infraquiz_saved_quizzes', JSON.stringify(savedQuizzes));
        
        // Trigger a custom event to notify other parts of the app
        window.dispatchEvent(new CustomEvent('quizSaved', { 
            detail: { 
                quiz: enhancedQuizData,
                action: existingIndex !== -1 ? 'updated' : 'created'
            } 
        }));
    }

    loadQuiz() {
        const savedQuizzes = JSON.parse(localStorage.getItem('infraquiz_saved_quizzes') || '[]');
        
        if (savedQuizzes.length === 0) {
            this.showNotification('No saved quizzes found', 'warning');
            return;
        }

        // Create a simple selection dialog
        const quizList = savedQuizzes.map((quiz, index) => 
            `${index + 1}. ${quiz.title} (${quiz.category}) - ${quiz.questions.length} questions`
        ).join('\n');
        
        const selection = prompt(`Select a quiz to load:\n\n${quizList}\n\nEnter the number:`);
        const selectedIndex = parseInt(selection) - 1;
        
        if (selectedIndex >= 0 && selectedIndex < savedQuizzes.length) {
            this.loadQuizData(savedQuizzes[selectedIndex]);
        }
    }

    loadQuizData(quizData) {
        // Clear current quiz
        this.newQuiz();
        
        // Load metadata
        document.getElementById('quizTitle').value = quizData.title;
        document.getElementById('quizCategory').value = quizData.category;
        
        // Load questions
        quizData.questions.forEach((question, index) => {
            this.addQuestion();
            const questionId = this.questionCounter;
            
            document.getElementById(`questionText-${questionId}`).value = question.text;
            document.getElementById(`questionDifficulty-${questionId}`).value = question.difficulty;
            document.getElementById(`explanation-${questionId}`).value = question.explanation;
            
            question.options.forEach((option, optionIndex) => {
                document.getElementById(`option-${questionId}-${optionIndex}`).value = option.text;
                if (option.isCorrect) {
                    document.getElementById(`correct-${questionId}-${optionIndex}`).checked = true;
                }
            });
        });
        
        this.updateStats();
        this.showNotification(`Quiz "${quizData.title}" loaded successfully!`, 'success');
    }

    previewQuiz() {
        const quizData = this.collectQuizData();
        
        if (quizData.questions.length === 0) {
            this.showNotification('Please add at least one question to preview', 'error');
            return;
        }

        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = this.generatePreviewHTML(quizData);
        
        // Show modal
        const modal = new mdb.Modal(document.getElementById('previewModal'));
        modal.show();
    }

    generatePreviewHTML(quizData) {
        let html = `
            <div class="quiz-preview">
                <h3>${quizData.title}</h3>
                <p class="text-muted">Category: ${quizData.category} | Questions: ${quizData.questions.length}</p>
                <hr>
        `;

        quizData.questions.forEach((question, index) => {
            const difficultyEmoji = {
                'beginner': '🟢',
                'intermediate': '🟡',
                'advanced': '🔴'
            }[question.difficulty];

            const optionEmojis = ['📝', '🔄', '📦', '🎯'];

            html += `
                <div class="preview-question mb-4">
                    <h5>${index + 1}. ${question.text} ${difficultyEmoji}</h5>
                    <div class="preview-options">
                        ${question.options.map((option, optIndex) => `
                            <div class="preview-option ${option.isCorrect ? 'correct-option' : ''}">
                                ${optionEmojis[optIndex]} ${option.text}
                                ${option.isCorrect ? ' ✓' : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div class="preview-explanation">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                </div>
                <hr>
            `;
        });

        html += '</div>';
        return html;
    }

    exportMarkdown() {
        const quizData = this.collectQuizData();
        
        if (quizData.questions.length === 0) {
            this.showNotification('Please add at least one question to export', 'error');
            return;
        }

        const markdown = this.generateMarkdown(quizData);
        this.downloadFile(`${quizData.title || 'quiz'}.md`, markdown);
        this.showNotification('Markdown exported successfully!', 'success');
    }

    generateMarkdown(quizData) {
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

    testQuiz() {
        const quizData = this.collectQuizData();
        
        if (quizData.questions.length === 0) {
            this.showNotification('Please add at least one question to test', 'error');
            return;
        }

        // Save quiz data temporarily for testing
        sessionStorage.setItem('infraquiz_test_quiz', JSON.stringify(quizData));
        
        // Open quiz in new tab/window
        window.open('quiz.html?test=true', '_blank');
    }

    downloadFile(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    showNotification(message, type = 'info') {
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
}

// Initialize the quiz editor when the page loads
let quizEditor;
document.addEventListener('DOMContentLoaded', () => {
    quizEditor = new QuizEditor();
    
    // Add some sample questions for demonstration
    if (new URLSearchParams(window.location.search).get('demo') === 'true') {
        quizEditor.loadSampleQuiz();
    }
});

// Add sample quiz method
QuizEditor.prototype.loadSampleQuiz = function() {
    document.getElementById('quizTitle').value = 'Docker Basics - Sample Quiz';
    document.getElementById('quizCategory').value = 'docker';
    
    // Add a sample question
    this.addQuestion();
    const questionId = this.questionCounter;
    
    document.getElementById(`questionText-${questionId}`).value = 'What is the main purpose of Docker containers?';
    document.getElementById(`questionDifficulty-${questionId}`).value = 'beginner';
    document.getElementById(`option-${questionId}-0`).value = 'Package applications with their dependencies';
    document.getElementById(`option-${questionId}-1`).value = 'Replace virtual machines completely';
    document.getElementById(`option-${questionId}-2`).value = 'Provide a new programming language';
    document.getElementById(`option-${questionId}-3`).value = 'Store data permanently';
    document.getElementById(`correct-${questionId}-0`).checked = true;
    document.getElementById(`explanation-${questionId}`).value = 'Docker containers encapsulate applications with all their dependencies, ensuring they run consistently across different environments.';
    
    this.updateStats();
};