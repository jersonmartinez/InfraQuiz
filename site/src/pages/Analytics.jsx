import React from 'react';
import { Link } from 'react-router-dom';
import { useQuizHistory, useAchievements } from '../hooks/useLocalStorage';
import { AchievementGrid } from '../components/AchievementGrid';
import { Trophy, Target, Clock, TrendingUp, Award, Calendar } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Analytics = () => {
    const { history, getStats, clearHistory } = useQuizHistory();
    const { achievements } = useAchievements();
    const { t } = useLanguage();
    const stats = getStats();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (history.length === 0) {
        return (
            <div className="min-h-screen pt-24 px-6 pb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-panel p-12 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('analytics.noHistoryTitle')}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            {t('analytics.noHistoryText')}
                        </p>
                        <Link
                            to="/quiz"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors text-white font-medium"
                        >
                            {t('analytics.startFirst')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('analytics.title')}</h1>
                    <button
                        onClick={() => {
                            if (window.confirm(t('analytics.confirmClear'))) {
                                clearHistory();
                            }
                        }}
                        className="px-4 py-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                        {t('analytics.clearHistory')}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{t('analytics.totalQuizzes')}</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalQuizzes}</div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Target className="w-5 h-5 text-green-500 dark:text-green-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{t('analytics.avgScore')}</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averageScore.toFixed(1)}%</div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{t('analytics.bestScore')}</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.bestScore}%</div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{t('analytics.timeSpent')}</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{formatTime(stats.totalTimeSpent)}</div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="glass-panel p-6 rounded-2xl mb-8 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                        <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                        {t('analytics.achievements')}
                    </h2>
                    <AchievementGrid achievements={achievements} />
                </div>

                {/* Favorite Topics */}
                {stats.favoriteTopics.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl mb-8 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                            <TrendingUp className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                            {t('analytics.favoriteTopics')}
                        </h2>
                        <div className="flex gap-3">
                            {stats.favoriteTopics.map((topic) => (
                                <span
                                    key={topic}
                                    className="px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg capitalize text-gray-700 dark:text-gray-200"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Quizzes */}
                <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                        <Calendar className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                        {t('analytics.recentQuizzes')}
                    </h2>
                    <div className="space-y-3">
                        {stats.recentQuizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                        <span className="text-2xl font-bold">{quiz.percentage}%</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold capitalize text-gray-900 dark:text-white">{quiz.topic}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {quiz.score}/{quiz.total} correct • {formatTime(quiz.timeSpent)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{formatDate(quiz.date)}</div>
                                    <div className={`text-sm font-semibold ${quiz.percentage >= 90 ? 'text-green-500 dark:text-green-400' :
                                        quiz.percentage >= 70 ? 'text-yellow-500 dark:text-yellow-400' :
                                            'text-red-500 dark:text-red-400'
                                        }`}>
                                        {quiz.percentage >= 90 ? t('analytics.excellent') :
                                            quiz.percentage >= 70 ? t('analytics.good') :
                                                t('analytics.needsPractice')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* All History */}
                {history.length > 5 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('analytics.showing').replace('{count}', Math.min(5, history.length)).replace('{total}', history.length)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;
