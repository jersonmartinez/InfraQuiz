import React from 'react';
import { ACHIEVEMENT_DATA } from '../data/achievementData';

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

export default AchievementNotification;
