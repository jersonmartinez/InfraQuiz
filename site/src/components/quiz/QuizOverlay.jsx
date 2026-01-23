import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Save, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PausedOverlay = ({ onResume }) => {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 animate-fade-in">
            <div className="glass-panel p-8 rounded-2xl max-w-md mx-4 text-center bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl">
                <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Save size={40} className="text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t('quiz.pausedTitle')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('quiz.pausedText')}</p>
                </div>
                <div className="space-y-3">
                    <button
                        onClick={onResume}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-blue-500/20"
                    >
                        <Play size={20} />
                        {t('quiz.resumeBtn')}
                    </button>
                    <Link
                        to="/quiz"
                        className="block w-full px-6 py-4 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-xl transition-all font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
                    >
                        {t('quiz.backBtn')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const SaveDialog = ({ onSave, onCancel, isExiting }) => {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl max-w-md mx-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('quiz.saveDialogTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t('quiz.saveDialogText')}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold"
                    >
                        <Save size={18} />
                        {isExiting ? t('quiz.saveExit') : t('quiz.savePause')}
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 rounded-xl transition-all text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
                    >
                        <X size={18} />
                        {t('quiz.cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};
