import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, Server, Cloud, Box, Target, Zap, Clock, Bookmark, Calendar, Trophy, Flame, BookOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useQuizHistory, useStreaks, useInfraPoints, useFailedQuestions } from '../hooks/useLocalStorage';
import { getTopicEmoji, getTopicName } from '../utils/topicUtils';
import LocalLeaderboard from '../components/dash/LocalLeaderboard';

const Home = () => {
    const { t } = useLanguage();
    const { getStats, history } = useQuizHistory();
    const { streakData } = useStreaks();
    const { points } = useInfraPoints();
    const { failedQuestions } = useFailedQuestions();
    const stats = getStats();

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative px-6 py-20 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-up">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">
                                    v2.5 Evolution
                                </span>
                                {streakData.currentStreak > 0 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-xs font-black border border-orange-500/20">
                                        <Flame size={14} className="fill-orange-500" />
                                        {streakData.currentStreak} DAY STREAK
                                    </div>
                                )}
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                                {t('home.title')}
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: '200ms' }}>
                                {t('home.subtitle')}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-12">
                                <Link to="/quiz" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                                    {t('home.start')} <ArrowRight size={20} />
                                </Link>
                                <Link to="/bookmarks" className="px-8 py-4 bg-white dark:bg-white/5 text-gray-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-white/10 transition-all hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2">
                                    <Bookmark size={20} /> My Bookmarks
                                </Link>
                            </div>
                        </div>

                        {/* Personalized Study Hub */}
                        <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 animate-fade-in-right">
                            <h2 className="text-2xl font-bold mb-6 flex items-center justify-between text-gray-900 dark:text-white">
                                <span className="flex items-center gap-2"><Zap className="text-blue-500" /> Study Dashboard</span>
                                <div className="flex items-center gap-1.5 bg-yellow-500/20 text-yellow-600 px-3 py-1 rounded-full text-xs font-black border border-yellow-500/20">
                                    <Zap size={14} className="fill-yellow-500" />
                                    {points} IP
                                </div>
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Avg Score</div>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{history.length > 0 ? Math.round(stats.averageScore) : 0}%</div>
                                </div>
                                <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 text-center relative overflow-hidden group">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Completed</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuizzes || 0}</div>
                                </div>
                            </div>

                            {/* Daily Challenge Card */}
                            <Link to="/daily-challenge" className="block p-4 mb-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl relative group overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-500/10">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                                    <Trophy size={64} />
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="text-purple-500" size={18} />
                                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">Daily Challenge</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Infrastructure Hero</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Complete 10 random questions for 100 extra IP!</p>
                            </Link>

                            {/* Mistakes Flashcards Banner */}
                            {failedQuestions.length > 0 && (
                                <Link to="/mistakes" className="block p-4 mb-8 bg-red-500/10 border border-red-500/20 rounded-2xl relative group overflow-hidden transition-all hover:bg-red-500/20 shadow-lg shadow-red-500/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500">
                                                <BookOpen size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-900 dark:text-white">Review {failedQuestions.length} Mistakes</h4>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Smart Flashcards ready</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={16} className="text-red-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            )}

                            {stats.weakTopics.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <Target size={16} className="text-red-500" /> Priority Study Topics
                                    </h3>
                                    <div className="space-y-3">
                                        {stats.weakTopics.slice(0, 3).map(topic => (
                                            <div key={topic} className="flex gap-2">
                                                <Link
                                                    to={`/quiz/${topic}`}
                                                    className="flex-grow flex items-center justify-between p-3 bg-white dark:bg-white/10 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-xl transition-all group border border-gray-100 dark:border-white/5"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{getTopicEmoji(topic)}</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{getTopicName(topic)}</span>
                                                    </div>
                                                    <Zap size={14} className="text-blue-400 group-hover:scale-125 transition-transform" />
                                                </Link>
                                                <Link
                                                    to={`/quiz/${topic}?mode=study`}
                                                    className="p-3 bg-white dark:bg-white/10 hover:bg-purple-500/10 dark:hover:bg-purple-500/10 rounded-xl transition-all group border border-gray-100 dark:border-white/5"
                                                    title="Review Guide"
                                                    aria-label={`Review Study Guide for ${getTopicName(topic)}`}
                                                >
                                                    <Box size={18} className="text-purple-400" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Leaderboard Section */}
                        <div className="animate-fade-in-left" style={{ animationDelay: '200ms' }}>
                            <LocalLeaderboard />
                        </div>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-6 py-20 border-t border-gray-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">{t('home.popular')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Server}
                            title={t('home.features.iac.title')}
                            desc={t('home.features.iac.desc')}
                            color="text-purple-500 dark:text-purple-400"
                            bg="bg-purple-500/10"
                            to="/quiz/category/iac"
                        />
                        <FeatureCard
                            icon={Cloud}
                            title={t('home.features.cloud.title')}
                            desc={t('home.features.cloud.desc')}
                            color="text-blue-500 dark:text-blue-400"
                            bg="bg-blue-500/10"
                            to="/quiz/category/cloud"
                        />
                        <FeatureCard
                            icon={Box}
                            title={t('home.features.containers.title')}
                            desc={t('home.features.containers.desc')}
                            color="text-green-500 dark:text-green-400"
                            bg="bg-green-500/10"
                            to="/quiz/category/containers"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};


const FeatureCard = (props) => {
    const { icon: Icon, title, desc, color, bg, to } = props;
    return (
        <Link to={to} className="group p-8 rounded-2xl bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 block">
            <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{desc}</p>
            <div className="text-blue-500 dark:text-blue-400 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore Quizzes <ArrowRight size={16} />
            </div>
        </Link>
    );
};

export default Home;
