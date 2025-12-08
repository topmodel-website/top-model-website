import React from 'react';
import { motion } from 'framer-motion';
import YearSection from '../components/YearSection';
import { universeData } from '../data/universeData';
import { useTranslation } from 'react-i18next';

const Universe = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-deepBlack">
            {/* Header */}
            <div className="relative py-24 bg-gradient-to-b from-gold/10 to-deepBlack">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8 flex justify-center"
                    >
                        <img
                            src="/gallery/universe-logo.png"
                            alt="Top Model of Universe"
                            className="h-32 md:h-48 w-auto object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-gold mb-6"
                    >
                        {t('universe.title')}
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t('universe.description')}
                    </p>
                </div>
            </div>

            {/* Years */}
            <div className="pb-20">
                {universeData.map((data) => (
                    <YearSection key={data.year} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Universe;
