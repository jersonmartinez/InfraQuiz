import React, { useState } from 'react';
import { useFailedQuestions, useInfraPoints } from '../hooks/useLocalStorage';
import { getTopicEmoji, getTopicName } from '../utils/topicUtils';
import { BookOpen, ArrowLeft, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormattedText from '../components/FormattedText';
import confetti from 'canvas-confetti';

const MistakesFlashcards = () => {
    const { failedQuestions, removeFailedQuestion } = useFailedQuestions();
    const { addPoints } = useInfraPoints();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);

    const currentQuestion = failedQuestions[currentIndex];

    const handleKnown = () => {
        addPoints(5); // Small reward for learning from mistakes
        removeFailedQuestion(currentQuestion.id, currentQuestion.topic);
        setIsRevealed(false);
        if (currentIndex >= failedQuestions.length - 1 && failedQuestions.length > 1) {
            setCurrentIndex(0);
        }

        if (failedQuestions.length === 1) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const handleNext = () => {
        setIsRevealed(false);
        setCurrentIndex((prev) => (prev + 1) % failedQuestions.length);
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors mb-2 text-sm font-bold">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <BookOpen className="text-purple-500" size={32} /> Smart Flashcards
                        </h1>
                    </div>
                </div>

                {failedQuestions.length === 0 ? (
                    <div className="text-center py-20 glass-panel rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                        <CheckCircle size={64} className="mx-auto mb-4 text-green-500/20" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">You're all caught up!</h2>
                        <p className="text-gray-500">Failed questions from quizzes will automatically appear here for review.</p>
                        <Link to="/quiz" className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl">
                            Challenge Yourself
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-full flex justify-between items-center mb-4 text-xs font-black uppercase tracking-widest text-gray-400">
                            <span>Question {currentIndex + 1} of {failedQuestions.length}</span>
                            <span className="text-purple-500">Learning Mode</span>
                        </div>

                        <div className="w-full aspect-[4/3] md:aspect-[16/9] perspective-1000 group relative">
                            <div className={`w-full h-full text-center transition-all duration-500 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
                                {/* Front: Question */}
                                <div className="absolute inset-0 backface-hidden glass-panel p-12 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center bg-white/5 shadow-2xl">
                                    <div className="flex items-center gap-2 mb-8">
                                        <span className="text-4xl">{getTopicEmoji(currentQuestion.topic)}</span>
                                        <span className="text-sm font-black text-blue-500 uppercase tracking-widest">{getTopicName(currentQuestion.topic)}</span>
                                    </div>
                                    <FormattedText className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed max-w-2xl" text={currentQuestion.question} />
                                    <button
                                        onClick={() => setIsRevealed(true)}
                                        className="mt-12 px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 flex items-center gap-3 transition-all hover:scale-105"
                                    >
                                        <Eye size={20} /> Reveal Answer
                                    </button>
                                </div>

                                {/* Back: Answer & Explanation */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel p-12 rounded-[2rem] border-2 border-purple-500/30 flex flex-col items-center bg-purple-500/5 shadow-2xl overflow-y-auto">
                                    <div className="text-xs font-black text-purple-500 uppercase tracking-widest mb-6">Correct Answer & Explanation</div>

                                    <div className="w-full p-6 bg-green-500/10 border border-green-500/20 rounded-2xl mb-6">
                                        <p className="text-green-500 font-bold text-xl mb-1">{currentQuestion.correctAnswer}</p>
                                    </div>

                                    <div className="w-full text-left bg-white/5 p-6 rounded-2xl border border-white/10 italic text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                        <FormattedText text={currentQuestion.explanation} />
                                    </div>

                                    <div className="mt-auto flex gap-4 w-full">
                                        <button
                                            onClick={handleKnown}
                                            className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                                        >
                                            <CheckCircle size={20} /> I Got It Now (+5 IP)
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="flex-1 py-4 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                                        >
                                            <XCircle size={20} /> Keep Reviewing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-bold border border-white/10 transition-all"
                            >
                                Skip Question
                            </button>
                            <button
                                onClick={() => removeFailedQuestion(currentQuestion.id, currentQuestion.topic)}
                                className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-bold border border-red-500/20 transition-all flex items-center gap-2"
                            >
                                <Trash2 size={16} /> Discard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MistakesFlashcards;
