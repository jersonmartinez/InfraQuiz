/**
 * Gamification Engine Module
 * Handles user progress, achievements, and adaptive learning
 */

export class GamificationEngine {
    constructor() {
        this.userProfile = this.loadUserProfile();
        this.achievements = this.loadAchievements();
        this.learningPaths = this.initializeLearningPaths();
        this.adaptiveEngine = new AdaptiveLearningEngine();
        this.flashcardSystem = null;
        this.collaborationSystem = new CollaborationSystem();
        this.notesSystem = new NotesSystem();
        this.reminderSystem = new ReminderSystem();
    }

    registerFlashcardSystem(system) {
        this.flashcardSystem = system;
        console.log('✅ Flashcard system registered with GamificationEngine');
    }

    loadUserProfile() {
        return JSON.parse(localStorage.getItem('infraquiz_user_profile') || JSON.stringify({
            level: 1,
            experience: 0,
            totalXP: 0,
            streak: 0,
            longestStreak: 0,
            totalQuizzes: 0,
            totalCorrect: 0,
            totalTime: 0,
            skills: {},
            preferences: {
                difficulty: 'adaptive',
                notifications: true,
                reminders: true,
                soundEffects: true
            },
            unlockedFeatures: ['basic_quiz'],
            lastActive: Date.now()
        }));
    }

    saveUserProfile() {
        localStorage.setItem('infraquiz_user_profile', JSON.stringify(this.userProfile));
    }

    // === EXPERIENCE & LEVELING SYSTEM ===

    calculateXP(question, timeSpent, difficulty, correct) {
        let baseXP = 10;
        const difficultyMultiplier = { 'beginner': 1, 'intermediate': 1.5, 'advanced': 2, 'expert': 2.5 };

        let timeBonus = 1;
        const optimalTime = this.getOptimalTime(difficulty);
        if (timeSpent < optimalTime * 0.5) timeBonus = 1.2;
        else if (timeSpent < optimalTime * 0.8) timeBonus = 1.5;
        else if (timeSpent < optimalTime * 1.2) timeBonus = 1.2;
        else timeBonus = 0.8;

        const streakBonus = Math.min(this.userProfile.streak * 0.1, 2);
        const correctnessBonus = correct ? 1 : 0.2;

        return Math.round(baseXP * difficultyMultiplier[difficulty] * timeBonus * streakBonus * correctnessBonus);
    }

    getOptimalTime(difficulty) {
        const times = { 'beginner': 45, 'intermediate': 60, 'advanced': 90, 'expert': 120 };
        return times[difficulty] || 60;
    }

    addExperience(xp, category) {
        this.userProfile.experience += xp;
        this.userProfile.totalXP += xp;

        if (!this.userProfile.skills[category]) {
            this.userProfile.skills[category] = { xp: 0, level: 1 };
        }
        this.userProfile.skills[category].xp += xp;

        this.checkLevelUp();
        this.checkAchievements();
        this.saveUserProfile();
    }

    checkLevelUp() {
        const xpForNextLevel = this.getXPForLevel(this.userProfile.level + 1);
        if (this.userProfile.experience >= xpForNextLevel) {
            this.userProfile.level++;
            this.userProfile.experience -= xpForNextLevel;
            this.triggerLevelUp();
        }
    }

    getXPForLevel(level) {
        return Math.round(100 * Math.pow(1.2, level - 1));
    }

    triggerLevelUp() {
        this.showLevelUpNotification();
        this.unlockNewFeatures();
        this.updateUI();
    }

    // === ACHIEVEMENT SYSTEM ===

    loadAchievements() {
        return JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
    }

    checkAchievements() {
        const achievements = [
            { id: 'first_quiz', name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', condition: () => this.userProfile.totalQuizzes >= 1, reward: 50 },
            { id: 'streak_master', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', condition: () => this.userProfile.longestStreak >= 7, reward: 100 },
            { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a quiz in under 5 minutes', icon: '⚡', condition: () => this.userProfile.fastestQuiz < 300, reward: 75 },
            { id: 'perfectionist', name: 'Perfectionist', description: 'Score 100% on any quiz', icon: '⭐', condition: () => this.userProfile.bestScore === 100, reward: 150 },
            { id: 'polyglot', name: 'Polyglot', description: 'Complete quizzes in both languages', icon: '🌍', condition: () => this.userProfile.languagesUsed >= 2, reward: 80 },
            { id: 'marathon_runner', name: 'Marathon Runner', description: 'Spend 10 hours learning', icon: '🏃', condition: () => this.userProfile.totalTime >= 36000, reward: 200 }
        ];

        achievements.forEach(achievement => {
            if (!this.achievements.includes(achievement.id) && achievement.condition()) {
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        this.achievements.push(achievement.id);
        this.addExperience(achievement.reward, 'achievement');
        this.showAchievementNotification(achievement);
        localStorage.setItem('infraquiz_achievements', JSON.stringify(this.achievements));
    }

    // === ADAPTIVE LEARNING ===

    updateAdaptiveDifficulty(category, score, timeSpent) {
        if (!this.userProfile.skills[category]) {
            this.userProfile.skills[category] = { level: 1, performance: [] };
        }

        const skill = this.userProfile.skills[category];
        skill.performance.push({ score, time: timeSpent, timestamp: Date.now() });

        if (skill.performance.length > 10) skill.performance = skill.performance.slice(-10);

        const avgScore = skill.performance.reduce((sum, p) => sum + p.score, 0) / skill.performance.length;
        const avgTime = skill.performance.reduce((sum, p) => sum + p.time, 0) / skill.performance.length;

        if (avgScore > 85 && avgTime < this.getOptimalTime(skill.level)) {
            skill.level = Math.min(skill.level + 1, 4);
        } else if (avgScore < 60) {
            skill.level = Math.max(skill.level - 1, 1);
        }

        this.saveUserProfile();
    }

    getRecommendedDifficulty(category) {
        if (this.userProfile.preferences.difficulty === 'adaptive') {
            return this.userProfile.skills[category]?.level || 1;
        }
        return this.userProfile.preferences.difficulty;
    }

    // === LEARNING PATHS ===

    initializeLearningPaths() {
        return {
            'devops_fundamentals': {
                name: 'DevOps Fundamentals',
                description: 'Master the basics of DevOps culture and practices',
                steps: [
                    { category: 'bash', difficulty: 'beginner', required: true },
                    { category: 'github', difficulty: 'beginner', required: true },
                    { category: 'docker', difficulty: 'beginner', required: true },
                    { category: 'cicd', difficulty: 'intermediate', required: false }
                ],
                rewards: ['devops_certificate', 'bonus_xp_100']
            },
            'cloud_architect': {
                name: 'Cloud Architect',
                description: 'Become proficient in cloud infrastructure and services',
                steps: [
                    { category: 'aws', difficulty: 'intermediate', required: true },
                    { category: 'terraform', difficulty: 'intermediate', required: true },
                    { category: 'kubernetes', difficulty: 'advanced', required: true },
                    { category: 'monitoring', difficulty: 'intermediate', required: false }
                ],
                rewards: ['cloud_expert_badge', 'bonus_xp_200']
            },
            'security_specialist': {
                name: 'Security Specialist',
                description: 'Learn DevSecOps and security best practices',
                steps: [
                    { category: 'security', difficulty: 'intermediate', required: true },
                    { category: 'docker', difficulty: 'intermediate', required: true },
                    { category: 'kubernetes', difficulty: 'intermediate', required: true },
                    { category: 'monitoring', difficulty: 'advanced', required: false }
                ],
                rewards: ['security_expert_badge', 'bonus_xp_150']
            }
        };
    }

    getLearningPathProgress(pathId) {
        const path = this.learningPaths[pathId];
        if (!path) return null;

        let completedSteps = 0;
        let totalSteps = path.steps.length;

        path.steps.forEach(step => {
            const skill = this.userProfile.skills[step.category];
            if (skill && skill.level >= this.getDifficultyLevel(step.difficulty)) {
                completedSteps++;
            }
        });

        return {
            completed: completedSteps,
            total: totalSteps,
            percentage: Math.round((completedSteps / totalSteps) * 100),
            nextStep: path.steps[completedSteps]
        };
    }

    getDifficultyLevel(difficulty) {
        const levels = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
        return levels[difficulty] || 1;
    }

    // === UI NOTIFICATIONS ===

    showLevelUpNotification() {
        this.showNotification(`🎉 Level Up! You're now level ${this.userProfile.level}!`, 'level_up', 5000);
    }

    showAchievementNotification(achievement) {
        this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}! +${achievement.reward} XP`, 'achievement', 7000);
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `gamification-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-text">${message}</span>
            </div>
            <div class="notification-progress"></div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) notification.parentElement.removeChild(notification);
            }, 300);
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = { 'level_up': '⬆️', 'achievement': '🏆', 'streak': '🔥', 'bonus': '💎', 'info': 'ℹ️' };
        return icons[type] || 'ℹ️';
    }

    // === UTILITY ===

    updateUI() {
        const levelElement = document.getElementById('user-level');
        if (levelElement) levelElement.textContent = this.userProfile.level;

        const xpElement = document.getElementById('user-xp');
        if (xpElement) {
            const xpForNext = this.getXPForLevel(this.userProfile.level + 1);
            xpElement.textContent = `${this.userProfile.experience}/${xpForNext}`;
        }

        this.updateProgressBars();
    }

    updateProgressBars() {
        const xpBar = document.getElementById('xp-progress-bar');
        if (xpBar) {
            const xpForNext = this.getXPForLevel(this.userProfile.level + 1);
            const percentage = (this.userProfile.experience / xpForNext) * 100;
            xpBar.style.width = `${percentage}%`;
        }
    }

    unlockNewFeatures() {
        console.log('Checking for new features to unlock...');
    }
}

// === SUB-SYSTEMS ===

class AdaptiveLearningEngine {
    constructor() {
        this.learningPatterns = this.loadLearningPatterns();
    }

    loadLearningPatterns() {
        return JSON.parse(localStorage.getItem('infraquiz_learning_patterns') || '{}');
    }

    analyzePerformance(quizData) {
        // Simplified analysis for brevity
        return { strengths: [], weaknesses: [] };
    }
}

class CollaborationSystem {
    constructor() {
        this.friends = [];
        this.challenges = [];
    }
}

class NotesSystem {
    constructor() {
        this.notes = {};
    }
}

class ReminderSystem {
    constructor() {
        this.reminders = [];
    }
}

// Initialize global instance
window.InfraQuiz = window.InfraQuiz || {};
window.InfraQuiz.gamification = new GamificationEngine();
window.gamificationEngine = window.InfraQuiz.gamification; // Backward compatibility
