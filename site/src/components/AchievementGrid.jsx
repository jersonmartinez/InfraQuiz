import React from 'react';
import AchievementBadge from './AchievementBadge';
import { ACHIEVEMENT_DATA } from '../data/achievementData';

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

export default AchievementGrid;
