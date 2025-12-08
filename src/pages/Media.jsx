import React from 'react';
import { motion } from 'framer-motion';
import { Play, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Media = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-deepBlack py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-serif font-bold text-gold mb-6">{t('media.title')}</h1>
                    <p className="text-gray-400 text-xl">{t('media.subtitle')}</p>
                </motion.div>

                {/* Videos Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center">
                        <Play className="text-gold mr-3" /> {t('media.videos')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white/5 rounded-lg overflow-hidden group cursor-pointer">
                                <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                                        <Play className="w-6 h-6 text-white fill-current" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-gold transition-colors">
                                        {t('media.eventHighlight')} {2026 - item}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {t('media.recap')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* News Section */}
                <div>
                    <h2 className="text-3xl font-serif text-white mb-8 flex items-center">
                        <Newspaper className="text-gold mr-3" /> {t('media.news')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex gap-6 bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
                                <div className="w-24 h-24 bg-gray-800 rounded-md flex-shrink-0" />
                                <div>
                                    <span className="text-gold text-xs font-bold tracking-wider uppercase mb-2 block">{t('media.pressTag')}</span>
                                    <h3 className="text-lg font-serif text-white mb-2">
                                        {t('media.newsItemTitle')}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {t('media.newsItemDesc')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Media;
