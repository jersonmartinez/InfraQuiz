import React from 'react';

// Quiz Card Skeleton
export const QuizCardSkeleton = () => (
    <div className="animate-pulse">
        <div className="glass-panel p-6 rounded-2xl h-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
            <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-white/10"></div>
                <div className="w-16 h-6 rounded-full bg-gray-200 dark:bg-white/10"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-lg mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-lg mb-6 w-full"></div>
            <div className="flex items-center gap-4 mb-6">
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20"></div>
            </div>
            <div className="h-12 bg-gray-200 dark:bg-white/10 rounded-xl w-full"></div>
        </div>
    </div>
);

// Quiz Question Skeleton
export const QuizQuestionSkeleton = () => (
    <div className="animate-pulse">
        <div className="glass-panel p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            {/* Question */}
            <div className="space-y-3 mb-8">
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-lg w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-lg w-5/6"></div>
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-lg w-3/4"></div>
            </div>
            {/* Options */}
            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-14 bg-gray-200 dark:bg-white/10 rounded-xl w-full"></div>
                ))}
            </div>
        </div>
    </div>
);

// Analytics Card Skeleton
export const AnalyticsCardSkeleton = () => (
    <div className="animate-pulse glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-white/10"></div>
            <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-16"></div>
            </div>
        </div>
    </div>
);

// History Item Skeleton
export const HistoryItemSkeleton = () => (
    <div className="animate-pulse glass-panel p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/10"></div>
                <div>
                    <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-32"></div>
                </div>
            </div>
            <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-full w-16"></div>
        </div>
    </div>
);

// Grid Skeleton (for quiz selection)
export const QuizGridSkeleton = ({ count = 6 }) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <QuizCardSkeleton key={i} />
        ))}
    </div>
);

export default {
    QuizCardSkeleton,
    QuizQuestionSkeleton,
    AnalyticsCardSkeleton,
    HistoryItemSkeleton,
    QuizGridSkeleton,
};
