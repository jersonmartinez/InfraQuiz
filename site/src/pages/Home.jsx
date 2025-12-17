import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, Server, Cloud, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative px-6 py-20 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up text-gray-900 dark:text-white">
                            {t('home.title')}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
                            {t('home.subtitle')}
                        </p>

                        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <Link to="/quiz" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                                {t('home.start')} <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-6 py-20 border-t border-gray-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">{t('home.popular')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Server}
                            title={t('home.features.iac.title')}
                            desc={t('home.features.iac.desc')}
                            color="text-purple-500 dark:text-purple-400"
                            bg="bg-purple-500/10"
                        />
                        <FeatureCard
                            icon={Cloud}
                            title={t('home.features.cloud.title')}
                            desc={t('home.features.cloud.desc')}
                            color="text-blue-500 dark:text-blue-400"
                            bg="bg-blue-500/10"
                        />
                        <FeatureCard
                            icon={Shield}
                            title={t('home.features.devsecops.title')}
                            desc={t('home.features.devsecops.desc')}
                            color="text-green-500 dark:text-green-400"
                            bg="bg-green-500/10"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, color, bg }) => (
    <div className="group p-8 rounded-2xl bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
        <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

export default Home;
