import React from 'react';
import { Link } from 'react-router-dom';
import { useQuizProgress, useQuizHistory } from '../hooks/useLocalStorage';
import { getTopicEmoji } from '../utils/topicUtils';
import { Play, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const { savedProgress } = useQuizProgress();
    const { history } = useQuizHistory();

    // Get all paused quizzes
    const pausedQuizzes = Object.entries(savedProgress || {}).map(([topic, progress]) => ({
        topic,
        ...progress,
    }));

    // Get quiz completion stats
    const getQuizStats = (topic) => {
        const topicHistory = history.filter(q => q.topic === topic);
        return {
            completed: topicHistory.length,
            bestScore: topicHistory.length > 0 ? Math.max(...topicHistory.map(q => q.percentage)) : 0,
            lastCompleted: topicHistory.length > 0 ? topicHistory[0].date : null,
        };
    };

    if (pausedQuizzes.length === 0) {
        return null;
    }

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Clock className="text-blue-400" size={28} />
                    Continue Learning
                </h2>
                <span className="text-sm text-gray-400">{pausedQuizzes.length} paused quiz{pausedQuizzes.length > 1 ? 'zes' : ''}</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pausedQuizzes.map(({ topic, currentQuestion, totalQuestions, savedAt }) => {
                    const stats = getQuizStats(topic);
                    const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);

                    return (
                        <Link
                            key={topic}
                            to={`/quiz/${topic}?resume=true`}
                            className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-all hover:scale-105 group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{getTopicEmoji(topic)}</span>
                                    <h3 className="text-lg font-semibold capitalize">{topic}</h3>
                                </div>
                                <div className="px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                    <Play size={14} className="text-blue-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-white font-semibold">{currentQuestion + 1} / {totalQuestions}</span>
                                </div>

                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>

                                {stats.completed > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-white/10">
                                        <CheckCircle size={12} className="text-green-400" />
                                        <span>Completed {stats.completed}x • Best: {stats.bestScore}%</span>
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 pt-1">
                                    Saved {new Date(savedAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/10">
                                <span className="text-sm text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                                    <Play size={14} />
                                    Resume Quiz
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
