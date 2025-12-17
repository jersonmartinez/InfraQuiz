import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Server, Cloud, Code, Shield, Database, Workflow, Layers, ArrowRight, Clock } from 'lucide-react';
import { useQuizProgress, useQuizHistory } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';

const topics = [
    { id: 'bash', name: 'Bash Scripting', emoji: '🐚', icon: <Terminal className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />, desc: 'Shell automation & scripting' },
    { id: 'docker', name: 'Docker', emoji: '🐳', icon: <Code className="w-8 h-8 text-blue-500 dark:text-blue-400" />, desc: 'Containerization basics' },
    { id: 'kubernetes', name: 'Kubernetes', emoji: '☸️', icon: <Cloud className="w-8 h-8 text-blue-600 dark:text-blue-500" />, desc: 'Orchestration & scaling' },
    { id: 'terraform', name: 'Terraform', emoji: '💠', icon: <Workflow className="w-8 h-8 text-purple-500 dark:text-purple-400" />, desc: 'Infrastructure as Code' },
    { id: 'ansible', name: 'Ansible', emoji: '📜', icon: <Layers className="w-8 h-8 text-red-500 dark:text-red-400" />, desc: 'Configuration management' },
    { id: 'aws', name: 'AWS Cloud', emoji: '☁️', icon: <Cloud className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />, desc: 'Cloud services & arch' },
    { id: 'cicd', name: 'CI/CD', emoji: '🔄', icon: <Workflow className="w-8 h-8 text-orange-600 dark:text-orange-500" />, desc: 'Continuous Integration' },
    { id: 'github', name: 'GitHub', emoji: '🐙', icon: <Code className="w-8 h-8 text-gray-600 dark:text-gray-400" />, desc: 'Version control & collaboration' },
    { id: 'databases', name: 'Databases', emoji: '💾', icon: <Database className="w-8 h-8 text-green-500 dark:text-green-400" />, desc: 'SQL & NoSQL concepts' },
    { id: 'security', name: 'DevSecOps', emoji: '🔒', icon: <Shield className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />, desc: 'Security best practices' },
    { id: 'python', name: 'Python Ops', emoji: '🐍', icon: <Code className="w-8 h-8 text-blue-400 dark:text-blue-300" />, desc: 'Python for DevOps' },
    { id: 'monitoring', name: 'Monitoring', emoji: '📊', icon: <Server className="w-8 h-8 text-pink-500 dark:text-pink-400" />, desc: 'Observability & metrics' },
    { id: 'networking', name: 'Networking', emoji: '🌐', icon: <Cloud className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />, desc: 'Network fundamentals' },
    { id: 'mixed', name: 'Mixed Topics', emoji: '🎯', icon: <Layers className="w-8 h-8 text-violet-500 dark:text-violet-400" />, desc: 'DevOps Mix' },
];

export const getTopicEmoji = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    return topic?.emoji || '📝';
};

const QuizSelection = () => {
    const { savedProgress } = useQuizProgress();
    const { history } = useQuizHistory();
    const { language, t } = useLanguage();
    const [filter, setFilter] = useState('');
    const [questionCounts, setQuestionCounts] = useState({});

    const filteredTopics = topics.filter(topic =>
        topic.name.toLowerCase().includes(filter.toLowerCase()) ||
        topic.desc.toLowerCase().includes(filter.toLowerCase())
    );

    // Fetch and count questions for each topic
    useEffect(() => {
        const fetchQuestionCounts = async () => {
            const counts = {};

            for (const topic of topics) {
                try {
                    const response = await fetch(`/quizzes/${topic.id}/${language}/questions1.md`);
                    if (response.ok) {
                        const text = await response.text();
                        // Count questions by counting "### [number]" pattern
                        const matches = text.match(/###\s+\d+\./g);
                        counts[topic.id] = matches ? matches.length : 0;
                    } else {
                        counts[topic.id] = 0;
                    }
                } catch (error) {
                    counts[topic.id] = 0;
                }
            }

            setQuestionCounts(counts);
        };

        fetchQuestionCounts();
    }, [language]); // Re-fetch when language changes

    const getTopicStats = (topicId) => {
        const topicHistory = history.filter(h => h.topic === topicId);
        const bestScore = topicHistory.length > 0 ? Math.max(...topicHistory.map(h => h.percentage)) : 0;
        const lastPlayed = topicHistory.length > 0 ? topicHistory[0].date : null;
        return { bestScore, lastPlayed, attempts: topicHistory.length };
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('selection.title')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">{t('selection.subtitle')}</p>
                </div>

                {/* Search/Filter */}
                <div className="max-w-md mx-auto mb-12">
                    <input
                        type="text"
                        placeholder={t('selection.searchPlaceholder')}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTopics.map((topic) => {
                        const progress = savedProgress[topic.id];
                        const stats = getTopicStats(topic.id);
                        const hasProgress = progress && progress.currentQuestion > 0;
                        const questionCount = questionCounts[topic.id] || 0;

                        return (
                            <div key={topic.id} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl transform transition-transform group-hover:scale-[1.02] duration-300"></div>
                                <div className="relative glass-panel p-6 rounded-2xl h-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-blue-500/30 transition-all">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-3 bg-white/50 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            {topic.icon}
                                        </div>
                                        {stats.bestScore > 0 && (
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${stats.bestScore >= 90 ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' :
                                                stats.bestScore >= 70 ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                                                    'bg-gray-500/10 border-gray-500/20 text-gray-600 dark:text-gray-400'
                                                }`}>
                                                {stats.bestScore}% {t('selection.bestScore')}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                                        {topic.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 min-h-[40px]">{topic.desc}</p>

                                    {hasProgress ? (
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                <span>{t('selection.progress')}</span>
                                                <span>{Math.round((progress.currentQuestion / progress.totalQuestions) * 100)}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 transition-all duration-500"
                                                    style={{ width: `${(progress.currentQuestion / progress.totalQuestions) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-6 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1"><Clock size={14} /> ~15m</span>
                                            <span className="flex items-center gap-1">
                                                <Layers size={14} />
                                                {questionCount > 0 ? `${questionCount} ${t('selection.questions')}` : '...'}
                                            </span>
                                        </div>
                                    )}

                                    <Link
                                        to={`/quiz/${topic.id}${hasProgress ? '?resume=true' : ''}`}
                                        className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${hasProgress
                                            ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20'
                                            : 'bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10'
                                            }`}
                                    >
                                        {hasProgress ? (
                                            <>{t('selection.resumeQuiz')} <ArrowRight size={18} /></>
                                        ) : (
                                            <>{t('selection.start')} <ArrowRight size={18} /></>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizSelection;
