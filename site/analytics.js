// Analytics Dashboard JavaScript - Advanced Learning Analytics

class AnalyticsDashboard {
    constructor() {
        this.currentLanguage = localStorage.getItem('quizLanguage') || 'en';
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeDarkMode();
        this.loadAnalyticsData();
        this.renderDashboard();
    }

    setupEventListeners() {
        document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());
        document.getElementById('clearDataBtn').addEventListener('click', () => this.clearData());
        document.getElementById('refreshDataBtn').addEventListener('click', () => this.refreshData());

        // Language selector
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
            languageSelector.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                localStorage.setItem('quizLanguage', this.currentLanguage);
                this.renderDashboard();
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

    loadAnalyticsData() {
        // Load data from localStorage
        this.stats = JSON.parse(localStorage.getItem('infraquiz_stats') || '{}');
        this.achievements = JSON.parse(localStorage.getItem('infraquiz_achievements') || '[]');
        this.events = JSON.parse(localStorage.getItem('infraquiz_events') || '[]');
        this.aggregated = JSON.parse(localStorage.getItem('infraquiz_aggregated') || '{}');
    }

    renderDashboard() {
        this.renderOverviewCards();
        this.renderCategoryPerformanceChart();
        this.renderProgressChart();
        this.renderCategoryBreakdown();
        this.renderRecentAchievements();
        this.renderLearningPathsProgress();
    }

    renderOverviewCards() {
        // Calculate overview statistics
        const totalQuizzes = Object.values(this.stats).reduce((sum, stat) => sum + stat.totalQuizzes, 0);
        const totalScores = Object.values(this.stats).reduce((sum, stat) => sum + (stat.averageScore * stat.totalQuizzes), 0);
        const averageScore = totalQuizzes > 0 ? Math.round(totalScores / totalQuizzes) : 0;
        const totalTime = Object.values(this.stats).reduce((sum, stat) => sum + stat.totalTime, 0);
        const totalTimeHours = Math.round(totalTime / 3600000); // Convert ms to hours

        document.getElementById('totalQuizzesCompleted').textContent = totalQuizzes;
        document.getElementById('averageScore').textContent = `${averageScore}%`;
        document.getElementById('totalTimeSpent').textContent = `${totalTimeHours}h`;
        document.getElementById('achievementsUnlocked').textContent = this.achievements.length;
    }

    renderCategoryPerformanceChart() {
        const canvas = document.getElementById('categoryPerformanceChart');
        if (!canvas) {
            console.warn('Category performance chart canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts.categoryPerformance) {
            this.charts.categoryPerformance.destroy();
        }

        // Process data by category
        const categoryData = {};
        this.events.filter(event => event.type === 'quiz_completion').forEach(event => {
            const category = event.data.category;
            if (!categoryData[category]) {
                categoryData[category] = { total: 0, count: 0 };
            }
            categoryData[category].total += event.data.score;
            categoryData[category].count++;
        });

        const labels = Object.keys(categoryData);
        const data = labels.map(category => 
            Math.round(categoryData[category].total / categoryData[category].count)
        );

        // Set canvas size explicitly
        canvas.style.height = '300px';
        canvas.style.maxHeight = '300px';

        this.charts.categoryPerformance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(cat => this.getCategoryDisplayName(cat)),
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(199, 199, 199, 0.8)',
                        'rgba(83, 102, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(83, 102, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    renderProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) {
            console.warn('Progress chart canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts.progress) {
            this.charts.progress.destroy();
        }

        // Process events to create timeline data
        const completionEvents = this.events.filter(event => event.type === 'quiz_completion');
        const timelineData = this.processTimelineData(completionEvents);

        // Set canvas size explicitly
        canvas.style.height = '300px';
        canvas.style.maxHeight = '300px';

        this.charts.progress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timelineData.labels,
                datasets: [{
                    label: 'Average Score',
                    data: timelineData.scores,
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Score: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    processTimelineData(events) {
        if (events.length === 0) {
            return { labels: [], scores: [] };
        }

        // Group events by day
        const dailyData = {};
        events.forEach(event => {
            const date = new Date(event.timestamp).toDateString();
            if (!dailyData[date]) {
                dailyData[date] = [];
            }
            dailyData[date].push(event.data.score);
        });

        // Calculate daily averages
        const labels = [];
        const scores = [];
        
        Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b)).forEach(date => {
            const dayScores = dailyData[date];
            const average = dayScores.reduce((sum, score) => sum + score, 0) / dayScores.length;
            
            labels.push(new Date(date).toLocaleDateString());
            scores.push(Math.round(average));
        });

        return { labels, scores };
    }

    renderCategoryBreakdown() {
        const container = document.getElementById('categoryBreakdown');
        
        if (Object.keys(this.stats).length === 0) {
            container.innerHTML = '<p class="text-muted">No quiz data available yet. Complete some quizzes to see your progress!</p>';
            return;
        }

        let html = '';
        Object.entries(this.stats).forEach(([category, stats]) => {
            const displayName = this.getCategoryDisplayName(category);
            const progressPercentage = Math.min(stats.averageScore, 100);
            
            html += `
                <div class="category-stat-item mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold">${displayName}</span>
                        <span class="text-muted">${stats.totalQuizzes} quizzes</span>
                    </div>
                    <div class="progress mb-2" style="height: 8px;">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${progressPercentage}%" 
                             aria-valuenow="${progressPercentage}" 
                             aria-valuemin="0" 
                             aria-valuemax="100"></div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small class="text-muted">Average: ${stats.averageScore}%</small>
                        <small class="text-muted">Best: ${stats.bestScore}%</small>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderRecentAchievements() {
        const container = document.getElementById('recentAchievements');
        
        if (this.achievements.length === 0) {
            container.innerHTML = '<p class="text-muted">No achievements unlocked yet. Keep learning to earn your first achievement!</p>';
            return;
        }

        // Get achievement definitions
        const achievementDefs = {
            'first_quiz': { name: { en: 'First Steps', es: 'Primeros Pasos' }, icon: '🎯' },
            'bash_master': { name: { en: 'Shell Master', es: 'Maestro de Shell' }, icon: '💻' },
            'streak_7': { name: { en: 'Week Warrior', es: 'Guerrero Semanal' }, icon: '🔥' },
            'perfect_score': { name: { en: 'Perfectionist', es: 'Perfeccionista' }, icon: '⭐' },
            'devops_explorer': { name: { en: 'DevOps Explorer', es: 'Explorador DevOps' }, icon: '🗺️' },
            'speed_demon': { name: { en: 'Speed Demon', es: 'Demonio de Velocidad' }, icon: '⚡' }
        };

        let html = '';
        this.achievements.slice(-5).reverse().forEach(achievementId => {
            const achievement = achievementDefs[achievementId];
            if (achievement) {
                html += `
                    <div class="achievement-item mb-3">
                        <div class="d-flex align-items-center">
                            <span class="achievement-icon me-3">${achievement.icon}</span>
                            <div>
                                <div class="fw-bold">${achievement.name[this.currentLanguage]}</div>
                                <small class="text-muted">Recently unlocked</small>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        container.innerHTML = html || '<p class="text-muted">No recent achievements.</p>';
    }

    renderLearningPathsProgress() {
        const container = document.getElementById('learningPathsProgress');
        
        // Define learning paths
        const learningPaths = {
            'devops_beginner': {
                name: { en: 'DevOps Beginner', es: 'DevOps Principiante' },
                steps: ['bash', 'github', 'docker', 'cicd']
            },
            'cloud_engineer': {
                name: { en: 'Cloud Engineer', es: 'Ingeniero Cloud' },
                steps: ['aws', 'terraform', 'kubernetes', 'monitoring']
            },
            'security_specialist': {
                name: { en: 'Security Specialist', es: 'Especialista en Seguridad' },
                steps: ['security', 'docker', 'kubernetes', 'monitoring']
            }
        };

        let html = '';
        Object.entries(learningPaths).forEach(([pathId, path]) => {
            const progress = this.calculatePathProgress(path.steps);
            
            html += `
                <div class="learning-path-progress mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0">${path.name[this.currentLanguage]}</h6>
                        <span class="text-muted">${progress.completed}/${progress.total}</span>
                    </div>
                    <div class="progress mb-2" style="height: 10px;">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${progress.percentage}%" 
                             aria-valuenow="${progress.percentage}" 
                             aria-valuemin="0" 
                             aria-valuemax="100"></div>
                    </div>
                    <div class="learning-path-steps">
                        ${path.steps.map(step => {
                            const isCompleted = this.stats[step] && this.stats[step].bestScore >= 70;
                            return `
                                <span class="learning-step-mini ${isCompleted ? 'completed' : ''}">
                                    ${this.getCategoryDisplayName(step)}
                                </span>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    calculatePathProgress(steps) {
        let completed = 0;
        steps.forEach(step => {
            if (this.stats[step] && this.stats[step].bestScore >= 70) {
                completed++;
            }
        });

        return {
            completed,
            total: steps.length,
            percentage: Math.round((completed / steps.length) * 100)
        };
    }

    getCategoryDisplayName(category) {
        const names = {
            'bash': 'Bash',
            'python': 'Python',
            'terraform': 'Terraform',
            'aws': 'AWS',
            'docker': 'Docker',
            'kubernetes': 'Kubernetes',
            'ansible': 'Ansible',
            'github': 'GitHub',
            'cicd': 'CI/CD',
            'monitoring': 'Monitoring',
            'security': 'Security',
            'networking': 'Networking',
            'databases': 'Databases',
            'mixed': 'Mixed'
        };
        return names[category] || category;
    }

    exportData() {
        const exportData = {
            stats: this.stats,
            achievements: this.achievements,
            events: this.events.slice(-100), // Last 100 events
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `infraquiz-analytics-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showNotification('Analytics data exported successfully!', 'success');
    }

    clearData() {
        if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
            localStorage.removeItem('infraquiz_stats');
            localStorage.removeItem('infraquiz_achievements');
            localStorage.removeItem('infraquiz_events');
            localStorage.removeItem('infraquiz_aggregated');
            
            this.loadAnalyticsData();
            this.renderDashboard();
            
            this.showNotification('All analytics data cleared', 'success');
        }
    }

    refreshData() {
        this.loadAnalyticsData();
        this.renderDashboard();
        this.showNotification('Analytics data refreshed', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `