import React from 'react';

import { ACHIEVEMENT_DATA } from '../data/achievementData';

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

export default AchievementBadge;
