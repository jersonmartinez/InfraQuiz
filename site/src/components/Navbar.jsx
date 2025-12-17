import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X, History, Globe, BarChart2, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.topics'), path: '/quiz' },
        { name: t('nav.history'), path: '/history', icon: History },
        { name: t('nav.analytics'), path: '/analytics', icon: BarChart2 },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                            <Terminal className="text-white" size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Infra<span className="text-blue-600 dark:text-blue-400">Quiz</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 ${location.pathname === link.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                {link.icon && <link.icon size={16} />}
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
                            >
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                            >
                                <Globe size={16} className="text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                                <span className="uppercase">{language}</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 animate-fade-in">
                    <div className="px-6 py-8 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block text-lg font-medium ${location.pathname === link.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                            <button
                                onClick={() => { toggleTheme(); setIsOpen(false); }}
                                className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                <span>{theme === 'dark' ? t('theme.light') : t('theme.dark')}</span>
                            </button>

                            <button
                                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                                className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2"
                            >
                                <Globe size={20} />
                                <span className="uppercase">{language === 'en' ? 'Español' : 'English'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
