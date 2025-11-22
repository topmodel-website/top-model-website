import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    const stats = [
        { icon: <Globe className="w-8 h-8 text-gold" />, value: "30+", label: t('home.stats.countries') },
        { icon: <Users className="w-8 h-8 text-gold" />, value: "500+", label: t('home.stats.candidates') },
        { icon: <Star className="w-8 h-8 text-gold" />, value: "15+", label: t('home.stats.years') },
    ];

    return (
        <div className="bg-deepBlack min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop"
                        alt="Fashion Runway"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">
                            {t('home.heroTitle')}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 mb-10 font-light tracking-wide"
                    >
                        {t('home.heroSubtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            to="/universe"
                            className="group inline-flex items-center px-8 py-4 bg-gold text-deepBlack font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
                        >
                            {t('home.explore')}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-24 px-4 bg-deepBlack relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-6">
                                {t('home.introTitle')}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {t('home.introText')}
                            </p>
                            <div className="grid grid-cols-3 gap-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="flex justify-center mb-3">{stat.icon}</div>
                                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 border-2 border-gold/20 rounded-lg transform rotate-3" />
                            <img
                                src="https://images.unsplash.com/photo-1569388330292-79cc1ec67270?q=80&w=2070&auto=format&fit=crop"
                                alt="Model"
                                className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
