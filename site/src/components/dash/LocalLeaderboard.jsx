import React from 'react';
import { useQuizHistory } from '../../hooks/useLocalStorage';
import { Trophy, Medal, Crown } from 'lucide-react';
import { getTopicName, getTopicEmoji } from '../../utils/topicUtils';

const LocalLeaderboard = () => {
    const { history } = useQuizHistory();

    // Group by topic and find best score for each
    const topicBests = history.reduce((acc, current) => {
        if (!acc[current.topic] || current.percentage > acc[current.topic].percentage) {
            acc[current.topic] = current;
        }
        return acc;
    }, {});

    const sortedBests = Object.values(topicBests).sort((a, b) => b.percentage - a.percentage);

    if (sortedBests.length === 0) return null;

    return (
        <div className="glass-panel p-8 rounded-3xl border border-blue-500/10 bg-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Crown size={120} />
            </div>

            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                <Trophy className="text-yellow-500" /> Hall of Fame
            </h2>

            <div className="space-y-4">
                {sortedBests.slice(0, 5).map((entry, index) => (
                    <div key={entry.topic} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-blue-500/20 transition-all group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${index === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                                index === 1 ? 'bg-gray-300 text-gray-500' :
                                    index === 2 ? 'bg-amber-600/20 text-amber-700' :
                                        'bg-blue-500/10 text-blue-500'
                            }`}>
                            {index === 0 ? <Crown size={20} /> : index + 1}
                        </div>

                        <div className="flex-grow">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{getTopicEmoji(entry.topic)}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{getTopicName(entry.topic)}</span>
                            </div>
                            <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">
                                Best: {entry.percentage}% • {entry.score}/{entry.total}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className={`text-xl font-black ${entry.percentage >= 90 ? 'text-green-500' : 'text-blue-500'}`}>
                                {Math.round(entry.percentage)}%
                            </div>
                            <Medal size={16} className={`ml-auto mt-1 ${index === 0 ? 'text-yellow-500' : 'text-gray-400 opacity-30'
                                }`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocalLeaderboard;
