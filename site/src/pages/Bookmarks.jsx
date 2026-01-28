import React from 'react';
import { useBookmarks } from '../hooks/useLocalStorage';
import { getTopicEmoji, getTopicName } from '../utils/topicUtils';
import { Bookmark, ArrowLeft, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormattedText from '../components/FormattedText';

const Bookmarks = () => {
    const { bookmarks, toggleBookmark } = useBookmarks();


    return (
        <div className="min-h-screen pt-24 px-6 pb-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors mb-2 text-sm font-bold">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <Bookmark className="text-blue-500" size={32} /> My Bookmarks
                        </h1>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-blue-500">{bookmarks.length}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Saved Questions</div>
                    </div>
                </div>

                {bookmarks.length === 0 ? (
                    <div className="text-center py-20 glass-panel rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                        <Bookmark size={64} className="mx-auto mb-4 text-gray-200 dark:text-white/5" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No bookmarks yet</h2>
                        <p className="text-gray-500">Save tricky questions during your quizzes to review them here.</p>
                        <Link to="/quiz" className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl">
                            Start Learning
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookmarks.map((q) => (
                            <div key={q.id} className="glass-panel p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 relative group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{getTopicEmoji(q.topic)}</span>
                                        <span className="text-xs font-black uppercase tracking-widest text-blue-500">{getTopicName(q.topic)}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleBookmark(q)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Remove Bookmark"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <FormattedText className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed" text={q.question} />

                                <div className="grid md:grid-cols-2 gap-3 mb-6">
                                    {q.options.map(opt => {
                                        const isCorrect = opt.letter === q.correctAnswer.match(/^([A-D])\)/)?.[1];
                                        return (
                                            <div key={opt.letter} className={`p-4 rounded-xl border ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-gray-100 dark:border-white/5 opacity-60'} flex items-center gap-3`}>
                                                <span className={`font-bold ${isCorrect ? 'text-green-500' : 'text-gray-400'}`}>{opt.letter}</span>
                                                <FormattedText className="text-xs text-gray-700 dark:text-gray-300" text={opt.text} />
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl italic text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                                        <span className="font-black text-xs text-blue-500 uppercase not-italic tracking-tighter">Explanation</span>
                                    </div>
                                    <FormattedText text={q.explanation} />
                                    {q.referenceUrl && (
                                        <div className="mt-4 pt-4 border-t border-blue-500/10 flex justify-end">
                                            <a
                                                href={q.referenceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
                                            >
                                                Docs <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
