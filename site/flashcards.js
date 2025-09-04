/**
 * Flashcards Interactive System
 * Integrates with GamificationEngine for spaced repetition learning
 */

class FlashcardSystem {
    constructor() {
        this.currentCard = null;
        this.currentIndex = 0;
        this.studySession = {
            startTime: null,
            cardsStudied: 0,
            correctAnswers: 0,
            totalTime: 0,
            difficulty: 'mixed'
        };
        this.isFlipped = false;
        this.studyMode = 'review'; // review, new, difficult
        this.cards = [];
        this.sessionStats = {
            again: 0,
            hard: 0,
            good: 0,
            easy: 0
        };

        this.initializeEventListeners();
        this.loadCards();
    }

    initializeEventListeners() {
        // Card flip on click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.flashcard') && !e.target.closest('.card-actions')) {
                this.flipCard();
            }
        });

        // Difficulty buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-difficulty')) {
                const button = e.target.closest('.btn-difficulty');
                const rating = button.dataset.rating;
                this.rateCard(rating);
            }
        });

        // Study controls
        document.addEventListener('change', (e) => {
            if (e.target.id === 'study-mode') {
                this.changeStudyMode(e.target.value);
            }
            if (e.target.id === 'category-filter') {
                this.filterByCategory(e.target.value);
            }
        });

        // Start study session
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-study') {
                this.startStudySession();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.currentCard) {
                switch(e.key.toLowerCase()) {
                    case ' ':
                    case 'enter':
                        e.preventDefault();
                        this.flipCard();
                        break;
                    case '1':
                        e.preventDefault();
                        this.rateCard('again');
                        break;
                    case '2':
                        e.preventDefault();
                        this.rateCard('hard');
                        break;
                    case '3':
                        e.preventDefault();
                        this.rateCard('good');
                        break;
                    case '4':
                        e.preventDefault();
                        this.rateCard('easy');
                        break;
                }
            }
        });
    }

    async loadCards() {
        try {
            // Load cards from quiz data
            const quizData = await this.loadQuizData();
            this.cards = this.convertToFlashcards(quizData);
            this.updateStats();
            this.renderCard();
        } catch (error) {
            console.error('Error loading flashcards:', error);
            this.showNoCardsMessage();
        }
    }

    async loadQuizData() {
        const categories = ['ansible', 'aws', 'bash', 'cicd', 'databases', 'docker', 'github', 'kubernetes', 'monitoring', 'networking', 'python', 'security', 'terraform'];
        const allQuestions = [];

        for (const category of categories) {
            try {
                const response = await fetch(`../quizzes/${category}/en/questions1.md`);
                if (response.ok) {
                    const content = await response.text();
                    const questions = this.parseMarkdownQuestions(content, category);
                    allQuestions.push(...questions);
                }
            } catch (error) {
                console.warn(`Could not load ${category} questions:`, error);
            }
        }

        return allQuestions;
    }

    parseMarkdownQuestions(content, category) {
        const questions = [];
        const lines = content.split('\n');
        let currentQuestion = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('### ')) {
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    id: Date.now() + Math.random(),
                    category: category,
                    question: line.replace('### ', ''),
                    answers: [],
                    correctAnswer: null,
                    difficulty: this.calculateDifficulty(line),
                    sm2Data: {
                        interval: 1,
                        repetitions: 0,
                        easeFactor: 2.5,
                        nextReview: new Date()
                    }
                };
            } else if (line.startsWith('- ') && currentQuestion) {
                const answer = line.replace('- ', '');
                const isCorrect = answer.includes('**') || answer.startsWith('**');
                const cleanAnswer = answer.replace(/\*\*/g, '');

                currentQuestion.answers.push(cleanAnswer);
                if (isCorrect) {
                    currentQuestion.correctAnswer = cleanAnswer;
                }
            }
        }

        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        return questions;
    }

    calculateDifficulty(question) {
        const text = question.toLowerCase();
        if (text.includes('advanced') || text.includes('complex') || text.length > 100) {
            return 'hard';
        } else if (text.includes('basic') || text.includes('simple') || text.length < 50) {
            return 'easy';
        }
        return 'medium';
    }

    convertToFlashcards(questions) {
        return questions.map(q => ({
            id: q.id,
            category: q.category,
            front: q.question,
            back: q.correctAnswer || q.answers[0] || 'Answer not available',
            difficulty: q.difficulty,
            sm2Data: q.sm2Data,
            studied: false,
            lastReviewed: null
        }));
    }

    changeStudyMode(mode) {
        this.studyMode = mode;
        this.filterCards();
        this.currentIndex = 0;
        this.renderCard();
    }

    filterByCategory(category) {
        this.categoryFilter = category;
        this.filterCards();
        this.currentIndex = 0;
        this.renderCard();
    }

    filterCards() {
        let filtered = [...this.cards];

        // Filter by study mode
        const now = new Date();
        switch (this.studyMode) {
            case 'new':
                filtered = filtered.filter(card => !card.studied);
                break;
            case 'review':
                filtered = filtered.filter(card => card.sm2Data.nextReview <= now);
                break;
            case 'difficult':
                filtered = filtered.filter(card => card.difficulty === 'hard' || card.sm2Data.repetitions < 2);
                break;
        }

        // Filter by category
        if (this.categoryFilter && this.categoryFilter !== 'all') {
            filtered = filtered.filter(card => card.category === this.categoryFilter);
        }

        this.filteredCards = filtered;
    }

    startStudySession() {
        this.studySession.startTime = new Date();
        this.studySession.cardsStudied = 0;
        this.studySession.correctAnswers = 0;
        this.sessionStats = { again: 0, hard: 0, good: 0, easy: 0 };

        this.filterCards();
        this.currentIndex = 0;
        this.renderCard();
        this.updateSessionStats();

        // Show study interface
        document.querySelector('.study-controls').style.display = 'none';
        document.querySelector('.flashcard-study').style.display = 'block';
    }

    renderCard() {
        if (!this.filteredCards || this.filteredCards.length === 0) {
            this.showNoCardsMessage();
            return;
        }

        this.currentCard = this.filteredCards[this.currentIndex];
        const container = document.querySelector('.flashcard-stack');

        if (!container) return;

        container.innerHTML = `
            <div class="flashcard" data-card-id="${this.currentCard.id}">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <div class="card-content">
                            <div class="card-category">${this.currentCard.category}</div>
                            <div class="card-question">${this.currentCard.front}</div>
                            <div class="tap-hint">👆 Tap to reveal answer</div>
                        </div>
                    </div>
                    <div class="flashcard-back">
                        <div class="card-content">
                            <div class="card-category">${this.currentCard.category}</div>
                            <div class="card-question">${this.currentCard.front}</div>
                            <div class="card-answer">${this.currentCard.back}</div>
                            <div class="card-difficulty">${this.currentCard.difficulty}</div>
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-difficulty again-btn" data-rating="again">
                                <i class="fas fa-redo"></i> Again (1)
                            </button>
                            <button class="btn btn-difficulty hard-btn" data-rating="hard">
                                <i class="fas fa-exclamation-triangle"></i> Hard (2)
                            </button>
                            <button class="btn btn-difficulty good-btn" data-rating="good">
                                <i class="fas fa-check"></i> Good (3)
                            </button>
                            <button class="btn btn-difficulty easy-btn" data-rating="easy">
                                <i class="fas fa-star"></i> Easy (4)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.isFlipped = false;
        this.updateProgress();
    }

    flipCard() {
        if (!this.currentCard) return;

        const flashcard = document.querySelector('.flashcard');
        if (!flashcard) return;

        this.isFlipped = !this.isFlipped;
        flashcard.classList.toggle('flipped');

        // Show actions when flipped
        const actions = flashcard.querySelector('.card-actions');
        if (actions) {
            actions.style.display = this.isFlipped ? 'flex' : 'none';
        }
    }

    rateCard(rating) {
        if (!this.currentCard) return;

        // Update SM-2 algorithm
        this.updateSM2Data(rating);

        // Update session stats
        this.sessionStats[rating]++;
        this.studySession.cardsStudied++;

        // Award XP based on rating
        this.awardXP(rating);

        // Move to next card
        this.nextCard();

        // Update UI
        this.updateSessionStats();
        this.updateProgress();
    }

    updateSM2Data(rating) {
        const card = this.currentCard;
        const quality = this.ratingToQuality(rating);

        if (quality >= 3) {
            // Correct response
            if (card.sm2Data.repetitions === 0) {
                card.sm2Data.interval = 1;
            } else if (card.sm2Data.repetitions === 1) {
                card.sm2Data.interval = 6;
            } else {
                card.sm2Data.interval = Math.round(card.sm2Data.interval * card.sm2Data.easeFactor);
            }
            card.sm2Data.repetitions++;
        } else {
            // Incorrect response
            card.sm2Data.repetitions = 0;
            card.sm2Data.interval = 1;
        }

        // Update ease factor
        card.sm2Data.easeFactor = card.sm2Data.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        card.sm2Data.easeFactor = Math.max(1.3, card.sm2Data.easeFactor);

        // Calculate next review date
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + card.sm2Data.interval);
        card.sm2Data.nextReview = nextReview;

        card.studied = true;
        card.lastReviewed = new Date();
    }

    ratingToQuality(rating) {
        const qualities = { again: 0, hard: 2, good: 3, easy: 4 };
        return qualities[rating] || 3;
    }

    awardXP(rating) {
        const xpValues = { again: 5, hard: 10, good: 15, easy: 20 };
        const xp = xpValues[rating] || 10;

        // Use gamification system if available
        if (window.gamificationEngine) {
            window.gamificationEngine.awardXP(xp, 'flashcard_study');
        }
    }

    nextCard() {
        this.currentIndex++;
        this.isFlipped = false;

        if (this.currentIndex >= this.filteredCards.length) {
            this.endStudySession();
        } else {
            this.renderCard();
        }
    }

    endStudySession() {
        const endTime = new Date();
        this.studySession.totalTime = (endTime - this.studySession.startTime) / 1000; // seconds

        this.showSessionResults();
        this.saveProgress();
    }

    showSessionResults() {
        const container = document.querySelector('.flashcard-container');
        const accuracy = this.studySession.cardsStudied > 0 ?
            Math.round((this.sessionStats.good + this.sessionStats.easy) / this.studySession.cardsStudied * 100) : 0;

        container.innerHTML = `
            <div class="study-complete">
                <h2>🎉 Study Session Complete!</h2>
                <div class="session-results">
                    <div class="result-stat">
                        <div class="result-number">${this.studySession.cardsStudied}</div>
                        <div class="result-label">Cards Studied</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-number">${Math.floor(this.studySession.totalTime / 60)}:${(this.studySession.totalTime % 60).toFixed(0).padStart(2, '0')}</div>
                        <div class="result-label">Time Spent</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-number">${accuracy}%</div>
                        <div class="result-label">Accuracy</div>
                    </div>
                </div>
                <div class="session-message">
                    ${this.getSessionMessage(accuracy)}
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="location.reload()">Study Again</button>
                    <button class="btn btn-secondary" onclick="window.location.href='index.html'">Back to Home</button>
                </div>
            </div>
        `;
    }

    getSessionMessage(accuracy) {
        if (accuracy >= 90) return "Outstanding! You're mastering these concepts! 🏆";
        if (accuracy >= 75) return "Great job! Keep up the excellent work! 👏";
        if (accuracy >= 60) return "Good progress! A bit more practice will help. 💪";
        return "Keep practicing! Every expert was once a beginner. 📚";
    }

    updateProgress() {
        const progress = document.querySelector('.progress-fill');
        if (progress && this.filteredCards.length > 0) {
            const percentage = ((this.currentIndex + 1) / this.filteredCards.length) * 100;
            progress.style.width = `${percentage}%`;
        }
    }

    updateSessionStats() {
        const statsContainer = document.querySelector('.session-stats');
        if (!statsContainer) return;

        statsContainer.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Again</div>
                <div class="stat-value">${this.sessionStats.again}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Hard</div>
                <div class="stat-value">${this.sessionStats.hard}</div>
            </div>
            <div class="stat-item">
                <div class="stat-item">
                <div class="stat-label">Good</div>
                <div class="stat-value">${this.sessionStats.good}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Easy</div>
                <div class="stat-value">${this.sessionStats.easy}</div>
            </div>
        `;
    }

    updateStats() {
        const totalCards = this.cards.length;
        const studiedCards = this.cards.filter(card => card.studied).length;
        const dueCards = this.cards.filter(card => card.sm2Data.nextReview <= new Date()).length;

        // Update stats cards
        document.querySelector('.stats-number:nth-child(1)').textContent = totalCards;
        document.querySelector('.stats-number:nth-child(2)').textContent = studiedCards;
        document.querySelector('.stats-number:nth-child(3)').textContent = dueCards;
    }

    showNoCardsMessage() {
        const container = document.querySelector('.flashcard-container');
        if (!container) return;

        container.innerHTML = `
            <div class="no-cards-message">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>No Cards Available</h3>
                <p>Try changing your study mode or category filter.</p>
            </div>
        `;
    }

    saveProgress() {
        try {
            const progress = {
                cards: this.cards,
                lastSession: this.studySession,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('flashcardProgress', JSON.stringify(progress));
        } catch (error) {
            console.warn('Could not save progress:', error);
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('flashcardProgress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.cards = progress.cards || [];
                this.updateStats();
            }
        } catch (error) {
            console.warn('Could not load progress:', error);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.flashcardSystem = new FlashcardSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlashcardSystem;
}