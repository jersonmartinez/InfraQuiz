/**
 * Analytics Module
 * Handles data loading, processing, and visualization for the analytics dashboard.
 */

class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.data = {
            stats: {},
            achievements: [],
            events: [],
            flashcardStats: {}
        };
        this.config = {
            achievements: {},
            learningPaths: {}
        };

        this.init();
    }

    async init() {
        await this.loadConfig();
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
    }

    async loadConfig() {
        try {
            const [achievementsRes, pathsRes] = await Promise.all([
                fetch('config/achievements.json'),
                fetch('config/learning-paths.json')
            ]);

            this.config.achievements = await achievementsRes.json();
            this.config.learningPaths = await pathsRes.json();
        } catch (error) {
            console.error('Failed to load analytics config:', error);
        }
    }

    loadData() {
        const get = (key, def) => JSON.parse(localStorage.getItem(key) || JSON.stringify(def));

        this.data.stats = get('infraquiz_stats', {});
        this.data.achievements = get('infraquiz_achievements', []);
        this.data.events = get('infraquiz_events', []);
        this.data.flashcardStats = get('flashcardUserStats', {});
        this.data.flashcardAchievements = get('flashcardAchievements', []);
    }

    setupEventListeners() {
        const bind = (id, fn) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', fn.bind(this));
        };

        bind('exportDataBtn', this.exportData);
        bind('clearDataBtn', this.clearData);
        bind('refreshDataBtn', this.refreshData);
    }

    renderDashboard() {
        this.renderOverview();
        this.renderCharts();
        this.renderBreakdown();
        this.renderAchievements();
        this.renderLearningPaths();
    }

    renderOverview() {
        const stats = Object.values(this.data.stats);
        const totalQuizzes = stats.reduce((sum, s) => sum + s.totalQuizzes, 0);
        const totalScore = stats.reduce((sum, s) => sum + (s.averageScore * s.totalQuizzes), 0);
        const avgScore = totalQuizzes ? Math.round(totalScore / totalQuizzes) : 0;

        const quizTime = stats.reduce((sum, s) => sum + s.totalTime, 0);
        const flashTime = (this.data.flashcardStats.totalStudyTime || 0) * 1000; // Convert s to ms
        const totalHours = Math.round((quizTime + flashTime) / 3600000);

        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        setText('totalQuizzesCompleted', totalQuizzes + (this.data.flashcardStats.totalCardsStudied || 0));
        setText('averageScore', `${avgScore}%`);
        setText('totalTimeSpent', `${totalHours}h`);
        setText('achievementsUnlocked', this.data.achievements.length + this.data.flashcardAchievements.length);
    }

    renderCharts() {
        this.renderCategoryChart();
        this.renderProgressChart();
    }

    renderCategoryChart() {
        const ctx = document.getElementById('categoryPerformanceChart')?.getContext('2d');
        if (!ctx) return;

        const catData = {};
        this.data.events
            .filter(e => e.type === 'quiz_completion')
            .forEach(e => {
                const cat = e.data.category;
                if (!catData[cat]) catData[cat] = { sum: 0, count: 0 };
                catData[cat].sum += e.data.score;
                catData[cat].count++;
            });

        const labels = Object.keys(catData);
        const data = labels.map(c => Math.round(catData[c].sum / catData[c].count));

        if (this.charts.category) this.charts.category.destroy();

        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(l => l.toUpperCase()),
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    renderProgressChart() {
        const ctx = document.getElementById('progressChart')?.getContext('2d');
        if (!ctx) return;

        const events = this.data.events.filter(e => e.type === 'quiz_completion');
        const daily = {};

        events.forEach(e => {
            const date = new Date(e.timestamp).toLocaleDateString();
            if (!daily[date]) daily[date] = [];
            daily[date].push(e.data.score);
        });

        const labels = Object.keys(daily).sort((a, b) => new Date(a) - new Date(b));
        const data = labels.map(d => {
            const scores = daily[d];
            return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        });

        if (this.charts.progress) this.charts.progress.destroy();

        this.charts.progress = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Average Score',
                    data,
                    borderColor: '#36A2EB',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    renderBreakdown() {
        const container = document.getElementById('categoryBreakdown');
        if (!container) return;

        const html = Object.entries(this.data.stats).map(([cat, stat]) => `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span>${cat.toUpperCase()}</span>
                    <small>${stat.totalQuizzes} quizzes</small>
                </div>
                <div class="progress" style="height: 8px">
                    <div class="progress-bar" style="width: ${stat.averageScore}%"></div>
                </div>
                <div class="d-flex justify-content-between mt-1">
                    <small class="text-muted">Avg: ${stat.averageScore}%</small>
                    <small class="text-muted">Best: ${stat.bestScore}%</small>
                </div>
            </div>
        `).join('');

        container.innerHTML = html || '<p class="text-muted">No data available.</p>';
    }

    renderAchievements() {
        const container = document.getElementById('recentAchievements');
        if (!container) return;

        const lang = window.InfraQuiz?.state?.language || 'en';
        const recent = this.data.achievements.slice(-5).reverse();

        const html = recent.map(id => {
            const def = this.config.achievements[id];
            if (!def) return '';
            return `
                <div class="d-flex align-items-center mb-3">
                    <span class="fs-4 me-3">${def.icon}</span>
                    <div>
                        <div class="fw-bold">${def.name[lang]}</div>
                        <small class="text-muted">Unlocked</small>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html || '<p class="text-muted">No achievements yet.</p>';
    }

    renderLearningPaths() {
        const container = document.getElementById('learningPathsProgress');
        if (!container) return;

        const lang = window.InfraQuiz?.state?.language || 'en';

        const html = Object.values(this.config.learningPaths).map(path => {
            const completed = path.steps.filter(step =>
                this.data.stats[step] && this.data.stats[step].bestScore >= 70
            ).length;
            const total = path.steps.length;
            const percent = Math.round((completed / total) * 100);

            return `
                <div class="mb-4">
                    <div class="d-flex justify-content-between mb-1">
                        <h6>${path.name[lang]}</h6>
                        <small>${completed}/${total}</small>
                    </div>
                    <div class="progress" style="height: 10px">
                        <div class="progress-bar bg-success" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    exportData() {
        const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `infraquiz-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }

    clearData() {
        if (confirm('Clear all data?')) {
            localStorage.clear();
            location.reload();
        }
    }

    refreshData() {
        this.loadData();
        this.renderDashboard();
        window.InfraQuiz.showNotification('Data refreshed', 'success');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsDashboard();
});
