import React from 'react';
import { useQuizHistory } from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';
import { Clock, Calendar, Award, Trash2 } from 'lucide-react';
import { getTopicEmoji } from './QuizSelection';

const QuizHistory = () => {
    const { history, clearHistory } = useQuizHistory();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('history.title')}</h1>
                    {history.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                            {t('history.clearHistory')}
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                        <Award size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">{t('history.noHistory')}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item, index) => (
                            <div key={index} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white dark:hover:bg-white/5 transition-colors bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                                        {getTopicEmoji(item.topic)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg capitalize text-gray-900 dark:text-white">{item.topic}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-center">
                                        <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">{t('history.score')}</div>
                                        <div className={`text-2xl font-bold ${item.percentage >= 70 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                            {item.percentage}%
                                        </div>
                                    </div>
                                    <div className="w-16 h-16 relative flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-white/10" />
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none"
                                                className={item.percentage >= 70 ? 'text-green-500' : 'text-yellow-500'}
                                                strokeDasharray={`${(item.percentage / 100) * 175} 175`}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizHistory;
