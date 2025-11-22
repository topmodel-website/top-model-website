import React from 'react';
import { motion } from 'framer-motion';
import YearSection from '../components/YearSection';
import { turkiyeData } from '../data/turkiyeData';

const Turkiye = () => {
    return (
        <div className="min-h-screen bg-deepBlack">
            {/* Header */}
            <div className="relative py-24 bg-gradient-to-b from-white/5 to-deepBlack">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
                    >
                        Top Model of Türkiye
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        The national pride. Celebrating the best models from Turkey.
                    </p>
                </div>
            </div>

            {/* Years */}
            <div className="pb-20">
                {turkiyeData.map((data) => (
                    <YearSection key={data.year} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Turkiye;
