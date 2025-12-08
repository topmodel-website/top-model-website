import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Management = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-deepBlack py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 border-2 border-gold/20 rounded-lg transform -rotate-3" />
                        <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-gray-800 shadow-2xl">
                            <img
                                src="/gallery/alidurgut.jpeg"
                                alt="Ali Durgut"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h4 className="text-gold uppercase tracking-widest font-bold mb-2">{t('management.title')}</h4>
                        <h1 className="text-5xl font-serif font-bold text-white mb-8">Ali Durgut</h1>
                        <h2 className="text-xl text-gold/80 mb-6">{t('management.role')}</h2>

                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>{t('management.bio1')}</p>
                            <p>{t('management.bio2')}</p>
                            <p>{t('management.bio3')}</p>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <h3 className="text-gold font-serif text-2xl mb-4">{t('management.contactTitle')}</h3>
                            <p className="text-white">info@topmodelofuniverse.com</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Management;
