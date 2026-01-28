import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Target, Clock, Zap, RefreshCw, ChevronUp, BookOpen, Home } from 'lucide-react';
import { getTopicEmoji, getTopicName } from '../../utils/topicUtils';

const QuizResults = ({ score, total, onRetry, answers, questions, timeSpent }) => {
    const { topic } = useParams();
    const [showReview, setShowReview] = useState(false);
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const percentage = Math.round((score / total) * 100);

    // Animate percentage on mount
    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = percentage / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= percentage) {
                setAnimatedPercentage(percentage);
                clearInterval(timer);
            } else {
                setAnimatedPercentage(Math.round(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [percentage]);

    // Determine performance level
    const getPerformanceLevel = () => {
        if (percentage >= 90) return { label: 'Outstanding!', color: 'from-emerald-500 to-green-400', emoji: '🏆', message: 'You crushed it! Expert level performance.' };
        if (percentage >= 80) return { label: 'Excellent!', color: 'from-blue-500 to-cyan-400', emoji: '🌟', message: 'Great job! You really know your stuff.' };
        if (percentage >= 70) return { label: 'Good Job!', color: 'from-yellow-500 to-orange-400', emoji: '👏', message: 'Solid performance! Keep practicing.' };
        if (percentage >= 50) return { label: 'Keep Going!', color: 'from-orange-500 to-red-400', emoji: '💪', message: 'You\'re getting there! Review and try again.' };
        return { label: 'Keep Learning!', color: 'from-red-500 to-pink-400', emoji: '📚', message: 'Don\'t give up! Every expert was once a beginner.' };
    };

    const performance = getPerformanceLevel();
    const correctAnswers = answers.filter(a => a.correct).length;
    const incorrectAnswers = answers.filter(a => !a.correct).length;

    // Helper function to render text with cleaned emojis and code highlighting
    const renderText = (text) => {
        if (!text) return '';
        // Remove broken emojis (replacement character, diamond, surrogates) that appear before questions
        // These are often the result of encoding issues with the markdown source files
        const cleanText = text
            .replace(/[\u{FFFD}◆\u{25C6}\uD800-\uDFFF]/gu, '') // Remove broken emoji placeholders entirely
            .replace(/^[\s]*/, '') // Trim leading whitespace
            .trim();

        // Render inline code blocks
        return cleanText.split(/(`[^`]+`)/).map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    // Calculate time per question
    const avgTimePerQuestion = timeSpent ? Math.round(timeSpent / total) : null;

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                {/* Main Results Card */}
                <div className="relative overflow-hidden glass-panel rounded-3xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl mb-8">
                    {/* Decorative background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${performance.color} rounded-full blur-[100px] opacity-30`}></div>
                        <div className={`absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br ${performance.color} rounded-full blur-[100px] opacity-20`}></div>
                    </div>

                    <div className="relative p-8 md:p-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/10 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 mb-4 border border-gray-200 dark:border-white/10">
                                <span className="text-xl">{getTopicEmoji(topic)}</span>
                                {getTopicName(topic)} Quiz Complete
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
                                {performance.label} {performance.emoji}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">{performance.message}</p>
                        </div>

                        {/* Score Circle */}
                        <div className="flex justify-center mb-10">
                            <div className="relative w-48 h-48">
                                {/* Background circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="none"
                                        className="text-gray-200 dark:text-white/10"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="url(#gradient)"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={`${(animatedPercentage / 100) * 553} 553`}
                                        className="transition-all duration-300"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-black text-gray-900 dark:text-white">{animatedPercentage}%</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{score} / {total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                            <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 text-center">
                                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-1">
                                    <CheckCircle2 size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Correct</span>
                                </div>
                                <div className="text-3xl font-black text-green-600 dark:text-green-400">{correctAnswers}</div>
                            </div>
                            <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-center">
                                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 mb-1">
                                    <XCircle size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Missed</span>
                                </div>
                                <div className="text-3xl font-black text-red-600 dark:text-red-400">{incorrectAnswers}</div>
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center">
                                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                                    <Target size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Accuracy</span>
                                </div>
                                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{percentage}%</div>
                            </div>
                            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-center">
                                <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                                    <Clock size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Avg Time</span>
                                </div>
                                <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{avgTimePerQuestion || 0}s</div>
                            </div>
                            <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-center">
                                <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                                    <Zap size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Questions</span>
                                </div>
                                <div className="text-3xl font-black text-orange-600 dark:text-orange-400">{total}</div>
                            </div>
                        </div>

                        {/* Progress Bar Breakdown */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                <span>Performance Breakdown</span>
                                <span>{correctAnswers} correct, {incorrectAnswers} missed</span>
                            </div>
                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden flex">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000"
                                    style={{ width: `${(correctAnswers / total) * 100}%` }}
                                />
                                <div
                                    className="h-full bg-gradient-to-r from-red-500 to-pink-400 transition-all duration-1000"
                                    style={{ width: `${(incorrectAnswers / total) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={onRetry}
                                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-500/25 font-bold text-lg"
                            >
                                <RefreshCw size={22} /> Try Again
                            </button>
                            <button
                                onClick={() => setShowReview(!showReview)}
                                className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 rounded-2xl transition-all text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-bold text-lg"
                            >
                                {showReview ? <ChevronUp size={22} /> : <BookOpen size={22} />}
                                {showReview ? 'Hide Review' : 'Review Answers'}
                            </button>
                            <Link
                                to="/quiz"
                                className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 rounded-2xl transition-all text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-bold text-lg"
                            >
                                <Home size={22} /> All Quizzes
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                {showReview && (
                    <div className="space-y-4 animate-slide-up">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                <BookOpen className="text-blue-500" /> Answer Review
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">
                                    {correctAnswers} Correct
                                </span>
                                <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-sm font-bold">
                                    {incorrectAnswers} Missed
                                </span>
                            </div>
                        </div>

                        {questions.map((q, idx) => {
                            const answer = answers.find(a => a.questionId === q.id);
                            const isCorrect = answer?.correct;
                            const selectedOption = q.options.find(o => o.letter === answer?.selectedOption);
                            const correctOption = q.options.find(o => o.letter === answer?.correctOption);

                            return (
                                <div
                                    key={q.id}
                                    className={`glass-panel p-6 rounded-2xl border-2 transition-all ${isCorrect
                                        ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50'
                                        : 'border-red-500/30 bg-red-500/5 hover:border-red-500/50'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                                            }`}>
                                            {isCorrect
                                                ? <CheckCircle2 className="text-green-500 w-6 h-6" />
                                                : <XCircle className="text-red-500 w-6 h-6" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                                    Question {idx + 1}
                                                </span>
                                                {q.difficulty && (
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${q.difficulty === 'easy' ? 'bg-green-500/10 text-green-500' :
                                                        q.difficulty === 'hard' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-yellow-500/10 text-yellow-500'
                                                        }`}>
                                                        {q.difficulty}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-bold text-gray-900 dark:text-white text-lg mb-4 leading-relaxed">{renderText(q.question)}</p>

                                            <div className="space-y-2 mb-4">
                                                <div className={`p-3 rounded-xl border ${isCorrect
                                                    ? 'bg-green-500/10 border-green-500/20'
                                                    : 'bg-red-500/10 border-red-500/20'
                                                    }`}>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Your Answer</span>
                                                    <p className={`font-semibold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                        {answer?.selectedOption}) {renderText(selectedOption?.text) || 'No answer'}
                                                    </p>
                                                </div>

                                                {!isCorrect && (
                                                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Correct Answer</span>
                                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                                            {answer?.correctOption}) {renderText(correctOption?.text) || 'N/A'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {q.explanation && (
                                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                                        <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Explanation</span>
                                                    </div>
                                                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed italic">{renderText(q.explanation)}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bottom Actions */}
                        <div className="flex justify-center pt-6">
                            <button
                                onClick={onRetry}
                                className="flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-500/25 font-bold text-lg"
                            >
                                <RefreshCw size={22} /> Try This Quiz Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizResults;
