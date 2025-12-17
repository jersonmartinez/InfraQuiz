import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ startTime, isActive = true, pausedTime = 0 }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setElapsed(Math.floor(pausedTime / 1000));
            return;
        }

        const interval = setInterval(() => {
            const currentElapsed = Math.floor((Date.now() - startTime + pausedTime) / 1000);
            setElapsed(currentElapsed);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, isActive, pausedTime]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(elapsed)}</span>
        </div>
    );
};

export default Timer;
