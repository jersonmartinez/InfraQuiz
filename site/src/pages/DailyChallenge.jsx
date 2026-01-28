import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { quizService } from '../services/quizService';
import { useQuizGame } from '../hooks/useQuizGame';
import QuizResults from '../components/quiz/QuizResults';
import Timer from '../components/Timer';
import { getTopicEmoji, getTopicName } from '../utils/topicUtils';
import { Trophy, Calendar, Zap, Loader2, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useInfraPoints } from '../hooks/useLocalStorage';
import FormattedText from '../components/FormattedText';
import { ExternalLink } from 'lucide-react';

const DailyChallenge = () => {
    const { language } = useLanguage();
    const { addPoints } = useInfraPoints();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDailyQuestions = async () => {
            setLoading(true);
            try {
                // Use date as seed for daily challenge consistency
                const today = new Date();
                const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

                const allTopics = ['bash', 'docker', 'kubernetes', 'terraform', 'aws', 'cicd', 'github', 'databases', 'security', 'python', 'monitoring', 'networking'];

                // Deterministically pick 5 topics based on seed
                const selectedTopics = [];
                let tempSeed = seed;
                for (let i = 0; i < 5; i++) {
                    const index = tempSeed % allTopics.length;
                    selectedTopics.push(allTopics[index]);
                    allTopics.splice(index, 1);
                    tempSeed = Math.floor(tempSeed / 7);
                }

                const dailyPool = [];
                await Promise.all(selectedTopics.map(async (topic) => {
                    try {
                        const setQs = await quizService.getQuiz(topic, language, 1);
                        // Pick 2 random questions from each topic
                        const shuffled = [...setQs].sort((a, b) => (seed % a.id) - (seed % b.id));
                        dailyPool.push(...shuffled.slice(0, 2).map(q => ({ ...q, topic })));
                    } catch (err) {
                        console.error(`Failed to load daily topic: ${topic}`, err);
                    }
                }));

                setQuestions(dailyPool.sort(() => Math.random() - 0.5));
            } catch {
                setError("Failed to generate daily challenge. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDailyQuestions();
    }, [language]);

    const game = useQuizGame('daily-challenge', questions, 0);

    const handleChallengeFinish = () => {
        const percentage = Math.round((game.score / questions.length) * 100);
        if (percentage >= 80) {
            addPoints(100); // 100 bonus points for daily challenge
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#FFD700', '#FFA500', '#FF4500']
            });
        }
        game.handleFinish();
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <p className="text-gray-500 font-bold">Generating today's challenge...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
    );

    if (game.showResults) {
        return (
            <div className="animate-fade-in">
                <div className="max-w-4xl mx-auto pt-24 px-6 text-center">
                    <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
                        <Trophy className="text-yellow-500 w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Daily Challenge Complete!</h1>
                    <p className="text-gray-500 mb-12">You've tackled the selected topics for today.</p>
                </div>
                <QuizResults
                    score={game.score}
                    total={questions.length}
                    onRetry={game.handleRetry}
                    answers={game.answers}
                    questions={questions}
                />
            </div>
        );
    }


    return (
        <div className="min-h-screen pt-24 px-6 pb-12 relative animate-fade-in">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Calendar size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <Trophy size={18} className="text-yellow-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Daily Challenge</span>
                        </div>
                        <h1 className="text-2xl font-black">Infrastructure Hero</h1>
                        <p className="text-sm text-white/70">10 Questions • Multi-topic Review</p>
                    </div>
                    <div className="relative z-10 text-right">
                        <div className="text-3xl font-black">+{game.score * 10}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/80">Current Est. IP</div>
                    </div>
                </div>

                {!game.hasStarted ? (
                    <div className="glass-panel p-12 rounded-3xl text-center border border-white/10 bg-white/5 animate-slide-up">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="text-blue-500 w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Are you ready?</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                            Finish with 80% or more to earn a <span className="text-yellow-500 font-bold">100 IP Bonus</span> and special badge recognition.
                        </p>
                        <button
                            onClick={game.handleStart}
                            className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all text-lg"
                        >
                            Start Challenge
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{getTopicEmoji(game.currentQuestion?.topic)}</span>
                                <span className="text-xs font-black uppercase tracking-widest text-blue-500">{getTopicName(game.currentQuestion?.topic)}</span>
                            </div>
                            <Timer
                                startTime={game.startTime}
                                isActive={game.hasStarted && !game.isPaused}
                                pausedTime={game.pausedTime}
                                onTimeUp={handleChallengeFinish}
                            />
                        </div>

                        <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${game.progressPercentage}%` }} />
                        </div>

                        <div className="glass-panel p-8 rounded-2xl bg-white/5 shadow-sm border border-white/5 mb-6">
                            <FormattedText className="text-2xl font-bold mb-8 leading-relaxed text-gray-900 dark:text-white" text={game.currentQuestion?.question} />

                            <div className="space-y-3">
                                {game.shuffledOptions.map((option, index) => {
                                    const displayLetter = ['A', 'B', 'C', 'D'][index];
                                    const isSelected = game.selectedOption?.letter === option.letter;
                                    const correctLetter = game.currentQuestion.correctAnswer.match(/^([A-D])\)/)?.[1];
                                    const isCorrect = option.letter === correctLetter;

                                    let optionClass = "w-full p-4 rounded-xl text-left transition-all border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-between text-gray-900 dark:text-white ";

                                    if (game.isAnswered) {
                                        if (isSelected && isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/10 flex items-center justify-between ";
                                        else if (isSelected && !isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-red-500/50 bg-red-500/10 flex items-center justify-between ";
                                        else if (isCorrect) optionClass = "w-full p-4 rounded-xl text-left border border-green-500/50 bg-green-500/20 flex items-center justify-between opacity-70 ";
                                        else optionClass += "opacity-40 ";
                                    }

                                    return (
                                        <button
                                            key={option.letter}
                                            onClick={() => game.handleOptionClick(option)}
                                            disabled={game.isAnswered}
                                            className={optionClass}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="font-bold text-blue-500">{displayLetter}</span>
                                                <FormattedText text={option.text} />
                                            </span>
                                            {game.isAnswered && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                                            {game.isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {game.isAnswered && (
                            <div className="animate-slide-up">
                                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl mb-6 italic text-gray-700 dark:text-gray-300">
                                    <FormattedText text={game.currentQuestion.explanation} />
                                    {game.currentQuestion.referenceUrl && (
                                        <div className="mt-4 pt-4 border-t border-blue-500/10 flex justify-end">
                                            <a
                                                href={game.currentQuestion.referenceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
                                            >
                                                Docs <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={game.currentQuestionIndex === questions.length - 1 ? handleChallengeFinish : game.handleNext}
                                        className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center gap-2"
                                    >
                                        {game.currentQuestionIndex === questions.length - 1 ? 'Finish Challenge' : 'Next Question'}
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DailyChallenge;
