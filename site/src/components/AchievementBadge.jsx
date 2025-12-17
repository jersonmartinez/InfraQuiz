import React from 'react';
import { Trophy, Target, Award, Zap, BookOpen, Star, Flame, GraduationCap } from 'lucide-react';

const ACHIEVEMENT_DATA = {
    first_quiz: {
        id: 'first_quiz',
        name: 'First Steps',
        description: 'Complete your first quiz',
        icon: Target,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/50',
    },
    perfectionist: {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Score 100% on any quiz',
        icon: Trophy,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/50',
    },
    master: {
        id: 'master',
        name: 'Master',
        description: 'Score 90%+ in 5 quizzes',
        icon: Award,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/50',
    },
    polyglot: {
        id: 'polyglot',
        name: 'Polyglot',
        description: 'Complete quizzes in 5 different topics',
        icon: BookOpen,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/50',
    },
    speed_demon: {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete a quiz in under 5 minutes',
        icon: Zap,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/50',
    },
    on_fire: {
        id: 'on_fire',
        name: 'On Fire',
        description: 'Complete 3 quizzes in one day',
        icon: Flame,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/50',
    },
    expert: {
        id: 'expert',
        name: 'Expert',
        description: 'Score 95%+ in 10 quizzes',
        icon: Star,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/50',
    },
    legend: {
        id: 'legend',
        name: 'Legend',
        description: 'Complete all topics with 90%+',
        icon: GraduationCap,
        color: 'text-pink-400',
        bgColor: 'bg-pink-500/10',
        borderColor: 'border-pink-500/50',
    },
};

const AchievementBadge = ({ achievementId, unlocked = false, date, size = 'md' }) => {
    const achievement = ACHIEVEMENT_DATA[achievementId];

    if (!achievement) return null;

    const Icon = achievement.icon;

    const sizes = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    const iconSizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`flex flex-col items-center gap-2 ${unlocked ? '' : 'opacity-40 grayscale'}`}>
            <div className={`
        ${sizes[size]} 
        rounded-full 
        border-2 
        ${unlocked ? achievement.borderColor : 'border-gray-600'}
        ${unlocked ? achievement.bgColor : 'bg-gray-800/50'}
        flex items-center justify-center
        transition-all duration-300
        ${unlocked ? 'hover:scale-110' : ''}
      `}>
                <Icon className={`${iconSizes[size]} ${unlocked ? achievement.color : 'text-gray-600'}`} />
            </div>
            <div className="text-center">
                <div className={`text-sm font-semibold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {achievement.name}
                </div>
                {unlocked && date && (
                    <div className="text-xs text-gray-400">
                        {new Date(date).toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
};

export const AchievementGrid = ({ achievements }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.keys(ACHIEVEMENT_DATA).map((id) => (
                <AchievementBadge
                    key={id}
                    achievementId={id}
                    unlocked={achievements[id]?.unlocked}
                    date={achievements[id]?.date}
                />
            ))}
        </div>
    );
};

export const AchievementNotification = ({ achievementId }) => {
    const achievement = ACHIEVEMENT_DATA[achievementId];
    if (!achievement) return null;

    const Icon = achievement.icon;

    return (
        <div className={`
      flex items-center gap-3 p-4 rounded-xl
      ${achievement.bgColor}
      border ${achievement.borderColor}
    `}>
            <Icon className={`w-8 h-8 ${achievement.color}`} />
            <div>
                <div className="font-semibold text-white">Achievement Unlocked!</div>
                <div className="text-sm text-gray-300">{achievement.name}</div>
            </div>
        </div>
    );
};

export default AchievementBadge;
export { ACHIEVEMENT_DATA };
