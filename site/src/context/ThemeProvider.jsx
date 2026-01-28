import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeContext } from './ThemeContext';

/**
 * Provider component for application theme management.
 * Handles dark/light mode and persist it to localStorage.
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('infraquiz-theme', 'dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
