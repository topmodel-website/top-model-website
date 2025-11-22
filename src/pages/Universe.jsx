import React from 'react';
import { motion } from 'framer-motion';
import YearSection from '../components/YearSection';
import { universeData } from '../data/universeData';

const Universe = () => {
    return (
        <div className="min-h-screen bg-deepBlack">
            {/* Header */}
            <div className="relative py-24 bg-gradient-to-b from-gold/10 to-deepBlack">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-gold mb-6"
                    >
                        Top Model of Universe
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        A legacy of international beauty and talent. Discover the history of our prestigious competition.
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
