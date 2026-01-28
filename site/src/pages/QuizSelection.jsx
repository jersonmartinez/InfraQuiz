import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Server, Cloud, Code, Shield, Database, Workflow, Layers, ArrowRight, Clock, Search, Box, Brain } from 'lucide-react';
import { useQuizProgress, useQuizHistory } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { quizService } from '../services/quizService';
import Breadcrumb from '../components/Breadcrumb';

const topics = [
    { id: 'bash', name: 'Bash Scripting', emoji: '🐚', icon: <Terminal className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />, desc: 'Shell automation & scripting', category: 'scripting' },
    { id: 'docker', name: 'Docker', emoji: '🐳', icon: <Code className="w-8 h-8 text-blue-500 dark:text-blue-400" />, desc: 'Containerization basics', category: 'containers' },
    { id: 'kubernetes', name: 'Kubernetes', emoji: '☸️', icon: <Cloud className="w-8 h-8 text-blue-600 dark:text-blue-500" />, desc: 'Orchestration & scaling', category: 'containers' },
    { id: 'terraform', name: 'Terraform', emoji: '💠', icon: <Workflow className="w-8 h-8 text-purple-500 dark:text-purple-400" />, desc: 'Infrastructure as Code', category: 'iac' },
    { id: 'ansible', name: 'Ansible', emoji: '📜', icon: <Layers className="w-8 h-8 text-red-500 dark:text-red-400" />, desc: 'Configuration management', category: 'iac' },
    { id: 'aws', name: 'AWS Cloud', emoji: '☁️', icon: <Cloud className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />, desc: 'Cloud services & arch', category: 'cloud' },
    { id: 'cicd', name: 'CI/CD', emoji: '🔄', icon: <Workflow className="w-8 h-8 text-orange-600 dark:text-orange-500" />, desc: 'Continuous Integration', category: 'devops' },
    { id: 'github', name: 'GitHub', emoji: '🐙', icon: <Code className="w-8 h-8 text-gray-600 dark:text-gray-400" />, desc: 'Version control & collaboration', category: 'devops' },
    { id: 'databases', name: 'Databases', emoji: '💾', icon: <Database className="w-8 h-8 text-green-500 dark:text-green-400" />, desc: 'SQL & NoSQL concepts', category: 'infrastructure' },
    { id: 'security', name: 'DevSecOps', emoji: '🔒', icon: <Shield className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />, desc: 'Security best practices', category: 'infrastructure' },
    { id: 'python', name: 'Python Ops', emoji: '🐍', icon: <Code className="w-8 h-8 text-blue-400 dark:text-blue-300" />, desc: 'Python for DevOps', category: 'scripting' },
    { id: 'monitoring', name: 'Monitoring', emoji: '📊', icon: <Server className="w-8 h-8 text-pink-500 dark:text-pink-400" />, desc: 'Observability & metrics', category: 'devops' },
    { id: 'networking', name: 'Networking', emoji: '🌐', icon: <Cloud className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />, desc: 'Network fundamentals', category: 'infrastructure' },
    { id: 'mixed', name: 'Mixed Topics', emoji: '🎯', icon: <Layers className="w-8 h-8 text-violet-500 dark:text-violet-400" />, desc: 'DevOps Mix', category: 'mixed' },
];

const CATEGORIES = [
    { id: 'all', name: 'All Topics' },
    { id: 'iac', name: 'IaC' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'containers', name: 'Containers' },
    { id: 'scripting', name: 'Scripting' },
    { id: 'devops', name: 'DevOps' },
    { id: 'infrastructure', name: 'Infra & Security' },
    { id: 'mixed', name: 'Mixed' },
];

export const getTopicName = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    return topic?.name || topicId;
};

export const getTopicEmoji = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    return topic?.emoji || '📝';
};

const QuizSelection = () => {
    const { savedProgress } = useQuizProgress();
    const { history } = useQuizHistory();
    const { language, t } = useLanguage();
    const [filter, setFilter] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [questionCounts, setQuestionCounts] = useState({});

    const filteredTopics = topics.filter(topic => {
        const matchesFilter = topic.name.toLowerCase().includes(filter.toLowerCase()) ||
            topic.desc.toLowerCase().includes(filter.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
        return matchesFilter && matchesCategory;
    });

    // Fetch and count questions for each topic
    useEffect(() => {
        const fetchQuestionCounts = async () => {
            const counts = {};

            for (const topic of topics) {
                counts[topic.id] = await quizService.getQuestionCount(topic.id, language);
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
                <Breadcrumb
                    items={[
                        { label: 'All Topics' }
                    ]}
                />
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('selection.title')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">{t('selection.subtitle')}</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
                    {/* Category Tabs */}
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full no-scrollbar mb-4 md:mb-0">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder={t('selection.searchPlaceholder')}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <Search size={20} />
                        </div>
                    </div>
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
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                <span className="flex items-center gap-1"><Clock size={14} /> ~15m</span>
                                                <span className="flex items-center gap-1">
                                                    <Layers size={14} />
                                                    {questionCount > 0 ? `${questionCount} ${t('selection.questions')}` : '...'}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((set) => (
                                                    <Link
                                                        key={set}
                                                        to={`/quiz/${topic.id}?set=${set}`}
                                                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 border border-gray-200 dark:border-white/10 text-[10px] font-bold transition-all"
                                                        title={`Start Set ${set}`}
                                                        aria-label={`Start ${topic.name} Set ${set}`}
                                                    >
                                                        S{set}
                                                    </Link>
                                                ))}
                                            </div>
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

                                    {/* Smart Study Button */}
                                    {(() => {
                                        const topicHistory = history.filter(h => h.topic === topic.id);
                                        const missedQuestions = topicHistory.flatMap(h =>
                                            h.answers
                                                .filter(a => !a.correct && h.set)
                                                .map(a => ({ set: h.set, id: a.questionId }))
                                        );
                                        const uniqueMissed = Array.from(new Set(missedQuestions.map(q => `${q.set}-${q.id}`)))
                                            .map(s => {
                                                const [set, id] = s.split('-');
                                                return { set: parseInt(set), id: parseInt(id) };
                                            });

                                        if (uniqueMissed.length >= 5) {
                                            return (
                                                <Link
                                                    to={`/quiz/${topic.id}?mode=smart`}
                                                    className="w-full mt-3 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20"
                                                >
                                                    <Brain size={18} />
                                                    Smart Study ({uniqueMissed.length})
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })()}
                                    <div className="mt-3 flex justify-center">
                                        <Link
                                            to={`/quiz/${topic.id}?mode=study`}
                                            className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 group/study"
                                        >
                                            <Box size={14} className="group-hover/study:rotate-12 transition-transform" />
                                            Study Reference Guide
                                        </Link>
                                    </div>
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
