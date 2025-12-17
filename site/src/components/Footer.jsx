import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Heart, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-3 group mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                                <Terminal className="text-white" size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                                Infra<span className="text-blue-600 dark:text-blue-400">Quiz</span>
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.quickLinks')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    {t('nav.home')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/quiz" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    {t('nav.topics')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/analytics" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    {t('nav.analytics')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/history" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    {t('nav.history')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Topics */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.popularTopics')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/quiz/docker" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    🐳 Docker
                                </Link>
                            </li>
                            <li>
                                <Link to="/quiz/kubernetes" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    ☸️ Kubernetes
                                </Link>
                            </li>
                            <li>
                                <Link to="/quiz/terraform" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    💠 Terraform
                                </Link>
                            </li>
                            <li>
                                <Link to="/quiz/aws" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                    ☁️ AWS
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 dark:text-gray-500 text-sm flex items-center gap-1">
                        © {currentYear} InfraQuiz. {t('footer.madeWith')} <Heart size={14} className="text-red-500 fill-red-500" /> {t('footer.forDevOps')}
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/jersonmartinez/InfraQuiz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                        >
                            <Github size={18} />
                            <span>GitHub</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
