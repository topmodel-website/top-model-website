import React from 'react';
import { motion } from 'framer-motion';

const Management = () => {
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
                        <div className="relative rounded-lg overflow-hidden aspect-[3/4] bg-gray-800">
                            {/* Placeholder for Ali Durgut's image */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-gray-600">
                                <span className="text-lg">Ali Durgut Photo</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h4 className="text-gold uppercase tracking-widest font-bold mb-2">Management</h4>
                        <h1 className="text-5xl font-serif font-bold text-white mb-8">Ali Durgut</h1>

                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                As the visionary behind Top Model of Universe and Top Model of Türkiye, Ali Durgut has dedicated his career to discovering and nurturing world-class talent.
                            </p>
                            <p>
                                With years of experience in the fashion and entertainment industry, he has successfully organized prestigious events that bridge cultures and celebrate beauty in all its forms.
                            </p>
                            <p>
                                His management philosophy focuses on professional development, discipline, and creating international opportunities for aspiring models.
                            </p>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <h3 className="text-gold font-serif text-2xl mb-4">Contact for Management</h3>
                            <p className="text-white">info@topmodelofuniverse.com</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Management;
