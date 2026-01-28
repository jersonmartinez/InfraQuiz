import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ startTime, isActive = true, pausedTime = 0, limit = 0, onTimeUp }) => {
    const [seconds, setSeconds] = useState(() => {
        const currentSeconds = Math.floor(pausedTime / 1000);
        return limit > 0 ? Math.max(0, limit - currentSeconds) : currentSeconds;
    });

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime + pausedTime) / 1000);

            if (limit > 0) {
                const remaining = Math.max(0, limit - elapsed);
                setSeconds(remaining);
                if (remaining === 0 && onTimeUp) {
                    clearInterval(interval);
                    onTimeUp();
                }
            } else {
                setSeconds(elapsed);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, isActive, pausedTime, limit, onTimeUp]);

    const formatTime = (secs) => {
        const mins = Math.floor(secs / 60);
        const s = secs % 60;
        return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`flex items-center gap-2 ${limit > 0 && seconds < 30 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;
