import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const NotFound = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-6">
            <div className="max-w-lg w-full text-center">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-gray-100 dark:text-white/5 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center animate-pulse">
                            <Search className="w-12 h-12 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('notFound.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {t('notFound.description')}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
                    >
                        <Home size={20} />
                        {t('notFound.goHome')}
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold rounded-xl transition-all border border-gray-200 dark:border-white/10"
                    >
                        <ArrowLeft size={20} />
                        {t('notFound.goBack')}
                    </button>
                </div>

                {/* Suggestions */}
                <div className="mt-12 p-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        {t('notFound.suggestions')}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link
                            to="/quiz/docker"
                            className="px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-colors"
                        >
                            🐳 Docker Quiz
                        </Link>
                        <Link
                            to="/quiz/kubernetes"
                            className="px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-sm hover:bg-purple-500/20 transition-colors"
                        >
                            ☸️ Kubernetes Quiz
                        </Link>
                        <Link
                            to="/quiz/terraform"
                            className="px-4 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg text-sm hover:bg-violet-500/20 transition-colors"
                        >
                            💠 Terraform Quiz
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
