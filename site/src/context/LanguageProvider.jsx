import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('infraquiz-lang');
        return saved || (navigator.language.startsWith('es') ? 'es' : 'en');
    });

    useEffect(() => {
        localStorage.setItem('infraquiz-lang', language);
        document.documentElement.lang = language;
    }, [language]);

    const t = (path) => {
        const keys = path.split('.');
        let current = translations[language];
        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
