/**
 * Flashcard Integration Module
 * Bridges flashcards with gamification and analytics systems
 */

class FlashcardIntegration {
    constructor() {
        this.gamificationEngine = null;
        this.analyticsSystem = null;
        this.flashcardSystem = null;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            // Wait for gamification system to load
            await this.waitForGamificationSystem();

            // Initialize integration
            this.setupEventListeners();
            this.enhanceFlashcardExperience();
            this.initialized = true;

            console.log('Flashcard integration initialized successfully');
        } catch (error) {
            console.warn('Flashcard integration failed to initialize:', error);
        }
    }

    async waitForGamificationSystem() {
        return new Promise((resolve, reject) => {
            const checkGamification = () => {
                if (window.gamificationEngine) {
                    this.gamificationEngine = window.gamificationEngine;
                    resolve();
                } else if (document.readyState === 'complete') {
                    // Fallback: try to initialize without gamification
                    resolve();
                } else {
                    setTimeout(checkGamification, 100);
                }
            };
            checkGamification();
        });
    }

    setupEventListeners() {
        // Listen for flashcard events
        document.addEventListener('flashcardStudied', (e) => {
            this.handleFlashcardStudied(e.detail);
        });

        document.addEventListener('flashcardSessionComplete', (e) => {
            this.handleSessionComplete(e.detail);
        });

        document.addEventListener('flashcardAchievement', (e) => {
            this.handleAchievement(e.detail);
        });
    }

    handleFlashcardStudied(data) {
        if (!this.gamificationEngine) return;

        // Award XP based on performance
        const xpMultiplier = this.calculateXPMultiplier(data.rating, data.streak);
        const baseXP = 10;
        const totalXP = Math.round(baseXP * xpMultiplier);

        this.gamificationEngine.awardXP(totalXP, 'flashcard_study');

        // Update learning analytics
        this.updateLearningAnalytics(data);

        // Check for achievements
        this.checkForAchievements(data);
    }

    calculateXPMultiplier(rating, streak) {
        let multiplier = 1;

        // Rating multiplier
        const ratingMultipliers = {
            again: 0.5,
            hard: 0.8,
            good: 1.2,
            easy: 1.5
        };
        multiplier *= ratingMultipliers[rating] || 1;

        // Streak multiplier
        if (streak >= 10) multiplier *= 1.5;
        else if (streak >= 5) multiplier *= 1.2;

        return multiplier;
    }

    handleSessionComplete(data) {
        if (!this.gamificationEngine) return;

        // Award session completion bonus
        const sessionXP = Math.min(data.cardsStudied * 5, 100);
        this.gamificationEngine.awardXP(sessionXP, 'flashcard_session_complete');

        // Update user stats
        this.updateUserStats(data);

        // Show session summary with gamification elements
        this.showEnhancedSessionSummary(data);
    }

    handleAchievement(data) {
        if (!this.gamificationEngine) return;

        // Trigger achievement celebration
        this.gamificationEngine.unlockAchievement(data.achievementId);

        // Show achievement notification
        this.showAchievementNotification(data);
    }

    updateLearningAnalytics(data) {
        // Store detailed learning metrics
        const analytics = {
            timestamp: new Date().toISOString(),
            cardId: data.cardId,
            rating: data.rating,
            timeSpent: data.timeSpent,
            category: data.category,
            difficulty: data.difficulty,
            streak: data.streak
        };

        // Store in localStorage for now (could be sent to server later)
        this.storeAnalytics(analytics);
    }

    updateUserStats(data) {
        const stats = this.getUserStats();
        stats.totalStudyTime += data.totalTime;
        stats.totalCardsStudied += data.cardsStudied;
        stats.sessionsCompleted += 1;
        stats.averageAccuracy = this.calculateAverageAccuracy(stats, data);

        this.saveUserStats(stats);
    }

    checkForAchievements(data) {
        const achievements = [
            { id: 'first_card', condition: () => data.totalStudied >= 1, name: 'First Steps' },
            { id: 'study_streak_5', condition: () => data.streak >= 5, name: 'Study Streak' },
            { id: 'perfect_session', condition: () => data.accuracy >= 95, name: 'Perfect Session' },
            { id: 'speed_demon', condition: () => data.avgTimePerCard < 30, name: 'Speed Demon' },
            { id: 'knowledge_master', condition: () => data.masteredCards >= 50, name: 'Knowledge Master' }
        ];

        achievements.forEach(achievement => {
            if (achievement.condition() && !this.isAchievementUnlocked(achievement.id)) {
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        const unlockedAchievements = this.getUnlockedAchievements();
        unlockedAchievements.push({
            id: achievement.id,
            name: achievement.name,
            unlockedAt: new Date().toISOString()
        });
        localStorage.setItem('flashcardAchievements', JSON.stringify(unlockedAchievements));

        // Trigger achievement event
        document.dispatchEvent(new CustomEvent('flashcardAchievement', {
            detail: { achievementId: achievement.id, name: achievement.name }
        }));
    }

    showAchievementNotification(data) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-text">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">${data.name}</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate and remove
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }

    showEnhancedSessionSummary(data) {
        const summary = document.querySelector('.session-results');
        if (!summary) return;

        // Add gamification elements to existing summary
        const gamificationBonus = document.createElement('div');
        gamificationBonus.className = 'gamification-bonus';
        gamificationBonus.innerHTML = `
            <div class="bonus-xp">
                <span class="bonus-icon">⭐</span>
                <span class="bonus-text">+${Math.min(data.cardsStudied * 5, 100)} XP earned!</span>
            </div>
        `;

        summary.appendChild(gamificationBonus);
    }

    enhanceFlashcardExperience() {
        // Add level indicator to flashcards
        this.addLevelIndicator();

        // Add streak counter
        this.addStreakCounter();

        // Add progress visualization
        this.addProgressVisualization();
    }

    addLevelIndicator() {
        if (!this.gamificationEngine) return;

        const levelIndicator = document.createElement('div');
        levelIndicator.className = 'level-indicator';
        levelIndicator.innerHTML = `
            <span class="level-text">Level ${this.gamificationEngine.getCurrentLevel()}</span>
            <div class="level-progress">
                <div class="level-progress-fill" style="width: ${this.gamificationEngine.getLevelProgress()}%"></div>
            </div>
        `;

        const container = document.querySelector('.flashcard-container');
        if (container) {
            container.insertBefore(levelIndicator, container.firstChild);
        }
    }

    addStreakCounter() {
        const streakCounter = document.createElement('div');
        streakCounter.className = 'streak-counter';
        streakCounter.innerHTML = `
            <span class="streak-icon">🔥</span>
            <span class="streak-text">0</span>
        `;

        const statsContainer = document.querySelector('.session-stats');
        if (statsContainer) {
            statsContainer.appendChild(streakCounter);
        }
    }

    addProgressVisualization() {
        // Enhanced progress bar with milestones
        const progressContainer = document.querySelector('.study-progress');
        if (!progressContainer) return;

        const milestones = document.createElement('div');
        milestones.className = 'progress-milestones';
        milestones.innerHTML = `
            <div class="milestone" style="left: 25%">25%</div>
            <div class="milestone" style="left: 50%">50%</div>
            <div class="milestone" style="left: 75%">75%</div>
            <div class="milestone" style="left: 100%">100%</div>
        `;

        progressContainer.appendChild(milestones);
    }

    // Utility methods
    getUserStats() {
        const defaultStats = {
            totalStudyTime: 0,
            totalCardsStudied: 0,
            sessionsCompleted: 0,
            averageAccuracy: 0,
            currentStreak: 0,
            longestStreak: 0
        };

        try {
            const saved = localStorage.getItem('flashcardUserStats');
            return saved ? JSON.parse(saved) : defaultStats;
        } catch {
            return defaultStats;
        }
    }

    saveUserStats(stats) {
        localStorage.setItem('flashcardUserStats', JSON.stringify(stats));
    }

    calculateAverageAccuracy(stats, sessionData) {
        const totalCorrect = stats.averageAccuracy * stats.totalCardsStudied + sessionData.correctAnswers;
        const totalCards = stats.totalCardsStudied + sessionData.cardsStudied;
        return totalCards > 0 ? Math.round((totalCorrect / totalCards) * 100) : 0;
    }

    storeAnalytics(analytics) {
        try {
            const existing = JSON.parse(localStorage.getItem('flashcardAnalytics') || '[]');
            existing.push(analytics);

            // Keep only last 1000 entries to prevent storage bloat
            if (existing.length > 1000) {
                existing.splice(0, existing.length - 1000);
            }

            localStorage.setItem('flashcardAnalytics', JSON.stringify(existing));
        } catch (error) {
            console.warn('Failed to store analytics:', error);
        }
    }

    getUnlockedAchievements() {
        try {
            return JSON.parse(localStorage.getItem('flashcardAchievements') || '[]');
        } catch {
            return [];
        }
    }

    isAchievementUnlocked(achievementId) {
        const unlocked = this.getUnlockedAchievements();
        return unlocked.some(a => a.id === achievementId);
    }
}

// CSS for integration enhancements
const integrationStyles = `
.achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-teal));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.achievement-notification.show {
    transform: translateX(0);
}

.achievement-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.achievement-icon {
    font-size: 2rem;
}

.achievement-title {
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.9;
}

.achievement-name {
    font-weight: 700;
    font-size: 1.1rem;
}

.level-indicator {
    background: var(--white);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    box-shadow: var(--flashcard-shadow);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.level-text {
    font-weight: 600;
    color: var(--primary-blue);
}

.level-progress {
    flex: 1;
    height: 6px;
    background: var(--gray-200);
    border-radius: 3px;
    overflow: hidden;
}

.level-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-blue), var(--secondary-teal));
    border-radius: 3px;
    transition: width 0.3s ease;
}

.streak-counter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #f97316;
}

.streak-icon {
    font-size: 1.2rem;
}

.progress-milestones {
    position: relative;
    margin-top: 0.5rem;
}

.milestone {
    position: absolute;
    top: -20px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray-600);
    transform: translateX(-50%);
}

.gamification-bonus {
    margin-top: 1rem;
    padding: 0.75rem;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-radius: 8px;
    text-align: center;
    border: 1px solid #f59e0b;
}

.bonus-xp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #92400e;
}

.bonus-icon {
    font-size: 1.2rem;
}

/* Dark mode support */
body.dark-mode .achievement-notification {
    background: linear-gradient(135deg, var(--gray-800), var(--gray-700));
}

body.dark-mode .level-indicator {
    background: var(--gray-800);
    color: var(--white);
}

body.dark-mode .gamification-bonus {
    background: linear-gradient(135deg, #374151, #4b5563);
    color: var(--white);
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = integrationStyles;
document.head.appendChild(styleSheet);

// Initialize integration when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.flashcardIntegration = new FlashcardIntegration();
    window.flashcardIntegration.initialize();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlashcardIntegration;
}