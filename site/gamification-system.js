// === INFRAQUIZ GAMIFICATION & ADVANCED LEARNING SYSTEM ===

class GamificationEngine {
    constructor() {
        this.userProfile = this.loadUserProfile();
        this.achievements = this.loadAchievements();
        this.learningPaths = this.initializeLearningPaths();
        this.adaptiveEngine = new AdaptiveLearningEngine();
        this.flashcardSystem = new FlashcardSystem();
        this.collaborationSystem = new CollaborationSystem();
        this.notesSystem = new NotesSystem();
        this.reminderSystem = new ReminderSystem();
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

        // Difficulty multiplier
        const difficultyMultiplier = {
            'beginner': 1,
            'intermediate': 1.5,
            'advanced': 2,
            'expert': 2.5
        };

        // Time bonus (faster = more XP, but not too fast)
        let timeBonus = 1;
        const optimalTime = this.getOptimalTime(difficulty);
        if (timeSpent < optimalTime * 0.5) timeBonus = 1.2; // Too fast
        else if (timeSpent < optimalTime * 0.8) timeBonus = 1.5; // Optimal
        else if (timeSpent < optimalTime * 1.2) timeBonus = 1.2; // Good
        else timeBonus = 0.8; // Too slow

        // Streak bonus
        const streakBonus = Math.min(this.userProfile.streak * 0.1, 2);

        // Correct answer bonus
        const correctnessBonus = correct ? 1 : 0.2;

        const finalXP = Math.round(
            baseXP *
            difficultyMultiplier[difficulty] *
            timeBonus *
            streakBonus *
            correctnessBonus
        );

        return finalXP;
    }

    getOptimalTime(difficulty) {
        const times = {
            'beginner': 45,
            'intermediate': 60,
            'advanced': 90,
            'expert': 120
        };
        return times[difficulty] || 60;
    }

    addExperience(xp, category) {
        this.userProfile.experience += xp;
        this.userProfile.totalXP += xp;

        // Update skills
        if (!this.userProfile.skills[category]) {
            this.userProfile.skills[category] = { xp: 0, level: 1 };
        }
        this.userProfile.skills[category].xp += xp;

        // Check for level up
        this.checkLevelUp();

        // Check for achievements
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
            {
                id: 'first_quiz',
                name: 'First Steps',
                description: 'Complete your first quiz',
                icon: '🎯',
                condition: () => this.userProfile.totalQuizzes >= 1,
                reward: 50
            },
            {
                id: 'streak_master',
                name: 'Streak Master',
                description: 'Maintain a 7-day streak',
                icon: '🔥',
                condition: () => this.userProfile.longestStreak >= 7,
                reward: 100
            },
            {
                id: 'speed_demon',
                name: 'Speed Demon',
                description: 'Complete a quiz in under 5 minutes',
                icon: '⚡',
                condition: () => this.userProfile.fastestQuiz < 300,
                reward: 75
            },
            {
                id: 'perfectionist',
                name: 'Perfectionist',
                description: 'Score 100% on any quiz',
                icon: '⭐',
                condition: () => this.userProfile.bestScore === 100,
                reward: 150
            },
            {
                id: 'polyglot',
                name: 'Polyglot',
                description: 'Complete quizzes in both languages',
                icon: '🌍',
                condition: () => this.userProfile.languagesUsed >= 2,
                reward: 80
            },
            {
                id: 'marathon_runner',
                name: 'Marathon Runner',
                description: 'Spend 10 hours learning',
                icon: '🏃',
                condition: () => this.userProfile.totalTime >= 36000,
                reward: 200
            }
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

    // === ADAPTIVE LEARNING ENGINE ===

    updateAdaptiveDifficulty(category, score, timeSpent) {
        if (!this.userProfile.skills[category]) {
            this.userProfile.skills[category] = { level: 1, performance: [] };
        }

        const skill = this.userProfile.skills[category];
        skill.performance.push({ score, time: timeSpent, timestamp: Date.now() });

        // Keep only last 10 performances
        if (skill.performance.length > 10) {
            skill.performance = skill.performance.slice(-10);
        }

        // Calculate adaptive difficulty
        const avgScore = skill.performance.reduce((sum, p) => sum + p.score, 0) / skill.performance.length;
        const avgTime = skill.performance.reduce((sum, p) => sum + p.time, 0) / skill.performance.length;

        if (avgScore > 85 && avgTime < this.getOptimalTime(skill.level)) {
            skill.level = Math.min(skill.level + 1, 4); // Max level 4 (expert)
        } else if (avgScore < 60) {
            skill.level = Math.max(skill.level - 1, 1); // Min level 1 (beginner)
        }

        this.saveUserProfile();
    }

    getRecommendedDifficulty(category) {
        if (this.userProfile.preferences.difficulty === 'adaptive') {
            return this.userProfile.skills[category]?.level || 1;
        }
        return this.userProfile.preferences.difficulty;
    }

    // === LEARNING PATHS SYSTEM ===

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
        this.showNotification(
            `🎉 Level Up! You're now level ${this.userProfile.level}!`,
            'level_up',
            5000
        );
    }

    showAchievementNotification(achievement) {
        this.showNotification(
            `🏆 Achievement Unlocked: ${achievement.name}! +${achievement.reward} XP`,
            'achievement',
            7000
        );
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

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Animate out
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            'level_up': '⬆️',
            'achievement': '🏆',
            'streak': '🔥',
            'bonus': '💎',
            'info': 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    // === UTILITY METHODS ===

    updateUI() {
        // Update level display
        const levelElement = document.getElementById('user-level');
        if (levelElement) {
            levelElement.textContent = this.userProfile.level;
        }

        // Update XP display
        const xpElement = document.getElementById('user-xp');
        if (xpElement) {
            const xpForNext = this.getXPForLevel(this.userProfile.level + 1);
            xpElement.textContent = `${this.userProfile.experience}/${xpForNext}`;
        }

        // Update progress bars
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

    // Initialize on page load
    static init() {
        window.InfraQuiz = window.InfraQuiz || {};
        window.InfraQuiz.gamification = new GamificationEngine();

        // Update UI on load
        window.InfraQuiz.gamification.updateUI();
    }
}

// === ADAPTIVE LEARNING ENGINE ===

class AdaptiveLearningEngine {
    constructor() {
        this.learningPatterns = this.loadLearningPatterns();
        // this.difficultyAdjustment = new DifficultyAdjustment(); // Removed - class not defined
    }

    loadLearningPatterns() {
        return JSON.parse(localStorage.getItem('infraquiz_learning_patterns') || '{}');
    }

    analyzePerformance(quizData) {
        const patterns = {
            strengths: [],
            weaknesses: [],
            timePatterns: [],
            difficultyProgression: []
        };

        // Analyze question performance
        quizData.questions.forEach((question, index) => {
            const timeSpent = quizData.timeSpent[index];
            const correct = quizData.answers[index];

            if (correct) {
                patterns.strengths.push(question.category);
            } else {
                patterns.weaknesses.push({
                    category: question.category,
                    difficulty: question.difficulty,
                    timeSpent
                });
            }

            patterns.timePatterns.push({
                difficulty: question.difficulty,
                timeSpent,
                correct
            });
        });

        // Identify patterns
        this.identifyPatterns(patterns);

        // Store for future reference
        this.saveLearningPatterns(patterns);

        return patterns;
    }

    identifyPatterns(patterns) {
        // Find most difficult categories
        const weaknessCount = {};
        patterns.weaknesses.forEach(w => {
            weaknessCount[w.category] = (weaknessCount[w.category] || 0) + 1;
        });

        patterns.problemAreas = Object.entries(weaknessCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([category]) => category);

        // Analyze time patterns
        patterns.timeEfficiency = this.analyzeTimePatterns(patterns.timePatterns);

        return patterns;
    }

    analyzeTimePatterns(timePatterns) {
        const byDifficulty = {};
        timePatterns.forEach(pattern => {
            if (!byDifficulty[pattern.difficulty]) {
                byDifficulty[pattern.difficulty] = [];
            }
            byDifficulty[pattern.difficulty].push(pattern);
        });

        const analysis = {};
        Object.entries(byDifficulty).forEach(([difficulty, patterns]) => {
            const avgTime = patterns.reduce((sum, p) => sum + p.timeSpent, 0) / patterns.length;
            const accuracy = patterns.filter(p => p.correct).length / patterns.length;

            analysis[difficulty] = {
                avgTime: Math.round(avgTime),
                accuracy: Math.round(accuracy * 100),
                efficiency: accuracy / (avgTime / 60) // accuracy per minute
            };
        });

        return analysis;
    }

    generateRecommendations(patterns) {
        const recommendations = [];

        // Recommend focus areas
        if (patterns.problemAreas.length > 0) {
            recommendations.push({
                type: 'focus_area',
                title: 'Focus on Weak Areas',
                description: `Spend more time on: ${patterns.problemAreas.join(', ')}`,
                action: 'practice_weak_areas'
            });
        }

        // Time management recommendations
        if (patterns.timeEfficiency) {
            Object.entries(patterns.timeEfficiency).forEach(([difficulty, stats]) => {
                if (stats.accuracy < 70) {
                    recommendations.push({
                        type: 'time_management',
                        title: `Improve ${difficulty} Speed`,
                        description: `You're spending too much time on ${difficulty} questions`,
                        action: 'practice_speed'
                    });
                }
            });
        }

        // Difficulty progression
        if (patterns.strengths.length > patterns.weaknesses.length) {
            recommendations.push({
                type: 'progression',
                title: 'Ready for Harder Challenges',
                description: 'Consider trying intermediate or advanced quizzes',
                action: 'increase_difficulty'
            });
        }

        return recommendations;
    }

    saveLearningPatterns(patterns) {
        localStorage.setItem('infraquiz_learning_patterns', JSON.stringify({
            ...patterns,
            timestamp: Date.now()
        }));
    }
}

// === FLASHCARD SYSTEM (Gamification) ===

class GamificationFlashcardSystem {
    constructor() {
        this.flashcards = this.loadFlashcards();
        this.studySessions = this.loadStudySessions();
    }

    loadFlashcards() {
        return JSON.parse(localStorage.getItem('infraquiz_flashcards') || '[]');
    }

    loadStudySessions() {
        return JSON.parse(localStorage.getItem('infraquiz_study_sessions') || '[]');
    }

    createFlashcard(question, explanation) {
        const flashcard = {
            id: Date.now().toString(),
            question: question.text,
            answer: explanation,
            category: question.category,
            difficulty: question.difficulty,
            created: Date.now(),
            lastReviewed: null,
            reviewCount: 0,
            easeFactor: 2.5, // SM-2 algorithm
            interval: 1,
            nextReview: Date.now()
        };

        this.flashcards.push(flashcard);
        this.saveFlashcards();

        return flashcard;
    }

    // Spaced Repetition using SM-2 Algorithm
    reviewFlashcard(flashcardId, quality) {
        const flashcard = this.flashcards.find(f => f.id === flashcardId);
        if (!flashcard) return;

        // SM-2 Algorithm
        if (quality >= 3) {
            // Correct response
            if (flashcard.reviewCount === 0) {
                flashcard.interval = 1;
            } else if (flashcard.reviewCount === 1) {
                flashcard.interval = 6;
            } else {
                flashcard.interval = Math.round(flashcard.interval * flashcard.easeFactor);
            }

            flashcard.reviewCount++;
        } else {
            // Incorrect response
            flashcard.interval = 1;
            flashcard.reviewCount = 0;
        }

        // Adjust ease factor
        flashcard.easeFactor = Math.max(1.3, flashcard.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

        // Calculate next review date
        flashcard.nextReview = Date.now() + (flashcard.interval * 24 * 60 * 60 * 1000);
        flashcard.lastReviewed = Date.now();

        this.saveFlashcards();
    }

    getDueFlashcards(limit = 20) {
        const now = Date.now();
        return this.flashcards
            .filter(card => card.nextReview <= now)
            .sort((a, b) => a.nextReview - b.nextReview)
            .slice(0, limit);
    }

    getFlashcardsByCategory(category) {
        return this.flashcards.filter(card => card.category === category);
    }

    saveFlashcards() {
        localStorage.setItem('infraquiz_flashcards', JSON.stringify(this.flashcards));
    }
}

// === COLLABORATION SYSTEM ===

class CollaborationSystem {
    constructor() {
        this.friends = this.loadFriends();
        this.challenges = this.loadChallenges();
        this.leaderboards = this.loadLeaderboards();
    }

    loadFriends() {
        return JSON.parse(localStorage.getItem('infraquiz_friends') || '[]');
    }

    loadChallenges() {
        return JSON.parse(localStorage.getItem('infraquiz_challenges') || '[]');
    }

    loadLeaderboards() {
        return JSON.parse(localStorage.getItem('infraquiz_leaderboards') || '{}');
    }

    createChallenge(friendId, category, difficulty, timeLimit) {
        const challenge = {
            id: Date.now().toString(),
            challengerId: 'current_user', // In real app, this would be actual user ID
            friendId: friendId,
            category: category,
            difficulty: difficulty,
            timeLimit: timeLimit,
            status: 'pending',
            created: Date.now(),
            expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
        };

        this.challenges.push(challenge);
        this.saveChallenges();

        return challenge;
    }

    acceptChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.status = 'accepted';
            challenge.acceptedAt = Date.now();
            this.saveChallenges();
        }
    }

    completeChallenge(challengeId, score, timeSpent) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.status = 'completed';
            challenge.score = score;
            challenge.timeSpent = timeSpent;
            challenge.completedAt = Date.now();
            this.saveChallenges();

            // Update leaderboards
            this.updateLeaderboards(challenge.category, score);
        }
    }

    updateLeaderboards(category, score) {
        if (!this.leaderboards[category]) {
            this.leaderboards[category] = [];
        }

        this.leaderboards[category].push({
            userId: 'current_user',
            score: score,
            timestamp: Date.now()
        });

        // Keep top 10 scores
        this.leaderboards[category] = this.leaderboards[category]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        this.saveLeaderboards();
    }

    getLeaderboard(category, limit = 10) {
        return (this.leaderboards[category] || [])
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    saveChallenges() {
        localStorage.setItem('infraquiz_challenges', JSON.stringify(this.challenges));
    }

    saveLeaderboards() {
        localStorage.setItem('infraquiz_leaderboards', JSON.stringify(this.leaderboards));
    }
}

// === NOTES SYSTEM ===

class NotesSystem {
    constructor() {
        this.notes = this.loadNotes();
    }

    loadNotes() {
        return JSON.parse(localStorage.getItem('infraquiz_notes') || '{}');
    }

    addNote(questionId, note) {
        if (!this.notes[questionId]) {
            this.notes[questionId] = [];
        }

        this.notes[questionId].push({
            id: Date.now().toString(),
            content: note,
            created: Date.now(),
            updated: Date.now()
        });

        this.saveNotes();
    }

    updateNote(questionId, noteId, newContent) {
        if (this.notes[questionId]) {
            const note = this.notes[questionId].find(n => n.id === noteId);
            if (note) {
                note.content = newContent;
                note.updated = Date.now();
                this.saveNotes();
            }
        }
    }

    deleteNote(questionId, noteId) {
        if (this.notes[questionId]) {
            this.notes[questionId] = this.notes[questionId].filter(n => n.id !== noteId);
            this.saveNotes();
        }
    }

    getNotes(questionId) {
        return this.notes[questionId] || [];
    }

    saveNotes() {
        localStorage.setItem('infraquiz_notes', JSON.stringify(this.notes));
    }
}

// === REMINDER SYSTEM ===

class ReminderSystem {
    constructor() {
        this.reminders = this.loadReminders();
        this.initNotifications();
    }

    loadReminders() {
        return JSON.parse(localStorage.getItem('infraquiz_reminders') || '[]');
    }

    initNotifications() {
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }

    scheduleReminder(type, message, delay) {
        const reminder = {
            id: Date.now().toString(),
            type: type,
            message: message,
            scheduled: Date.now() + delay,
            created: Date.now()
        };

        this.reminders.push(reminder);
        this.saveReminders();

        setTimeout(() => {
            this.showReminder(reminder);
        }, delay);
    }

    showReminder(reminder) {
        // Remove from active reminders
        this.reminders = this.reminders.filter(r => r.id !== reminder.id);
        this.saveReminders();

        // Show notification
        if (Notification.permission === 'granted') {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const iconPath = isLocal ? './icon-192x192.png' : '/icon-192x192.png';

            new Notification('InfraQuiz Reminder', {
                body: reminder.message,
                icon: iconPath
            });
        }

        // Also show in-app notification
        if (window.InfraQuiz?.gamification) {
            window.InfraQuiz.gamification.showNotification(reminder.message, 'info', 5000);
        }
    }

    // Smart reminders based on user behavior
    scheduleSmartReminders() {
        const lastActive = window.InfraQuiz?.gamification?.userProfile?.lastActive;
        if (!lastActive) return;

        const daysSinceActive = (Date.now() - lastActive) / (1000 * 60 * 60 * 24);

        if (daysSinceActive > 1) {
            this.scheduleReminder(
                'study_reminder',
                'Ready to continue your DevOps learning journey?',
                1000 // 1 second for demo
            );
        }

        if (daysSinceActive > 3) {
            this.scheduleReminder(
                'streak_warning',
                'Your learning streak is about to break! Complete a quiz today.',
                2000 // 2 seconds for demo
            );
        }
    }

    saveReminders() {
        localStorage.setItem('infraquiz_reminders', JSON.stringify(this.reminders));
    }
}

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', () => {
    GamificationEngine.init();

    // Initialize subsystems
    if (window.InfraQuiz?.gamification) {
        window.InfraQuiz.gamification.adaptiveEngine = new AdaptiveLearningEngine();
        window.InfraQuiz.gamification.flashcardSystem = new GamificationFlashcardSystem();
        window.InfraQuiz.gamification.collaborationSystem = new CollaborationSystem();
        window.InfraQuiz.gamification.notesSystem = new NotesSystem();
        window.InfraQuiz.gamification.reminderSystem = new ReminderSystem();

        // Schedule smart reminders
        window.InfraQuiz.gamification.reminderSystem.scheduleSmartReminders();
    }

    console.log('🎮 Gamification system initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GamificationEngine,
        AdaptiveLearningEngine,
        GamificationFlashcardSystem,
        CollaborationSystem,
        NotesSystem,
        ReminderSystem
    };
}