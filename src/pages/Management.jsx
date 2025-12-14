import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RotatingGalleryImage from '../components/RotatingGalleryImage';

const Management = () => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

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
                            <RotatingGalleryImage
                                categories={['ali_durgut']}
                                className="w-full h-full"
                                interval={4000}
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

                        <div className="relative">
                            <motion.div
                                initial={false}
                                animate={{ height: isExpanded ? 'auto' : 160 }}
                                transition={{ duration: 0.5 }}
                                className="relative overflow-hidden space-y-6 text-gray-300 leading-relaxed text-sm lg:text-base"
                            >
                                <p>{t('management.intro')}</p>

                                <h3 className="text-gold font-bold text-lg mt-6">{t('management.eurovisionTitle')}</h3>
                                <p>{t('management.eurovisionText')}</p>

                                <h3 className="text-gold font-bold text-lg mt-6">{t('management.fashionTitle')}</h3>
                                <p>{t('management.fashionText1')}</p>
                                <p>{t('management.fashionText2')}</p>
                                <p>{t('management.fashionText3')}</p>

                                <h3 className="text-gold font-bold text-lg mt-6">{t('management.visionTitle')}</h3>
                                <p>{t('management.visionText')}</p>

                                <blockquote className="border-l-4 border-gold pl-4 italic text-white my-6 bg-white/5 py-4 pr-4 rounded-r-lg">
                                    {t('management.quote')}
                                </blockquote>

                                {/* Show Less Button at the bottom of content */}
                                {isExpanded && (
                                    <div className="pt-4 flex justify-start">
                                        <button
                                            onClick={() => setIsExpanded(false)}
                                            className="text-gold hover:text-white font-bold tracking-wider uppercase text-sm border-b border-gold hover:border-white transition-colors pb-1"
                                        >
                                            {t('management.showLess')}
                                        </button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Gradient Overlay and Read More Button */}
                            {!isExpanded && (
                                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-deepBlack via-deepBlack/90 to-transparent flex items-end justify-start pb-0 z-10">
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="text-gold hover:text-white font-bold tracking-wider uppercase text-sm border-b border-gold hover:border-white transition-colors pb-1"
                                    >
                                        {t('management.readMore')}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <h3 className="text-gold font-serif text-2xl mb-4">{t('management.contactTitle')}</h3>
                            <p className="text-white mb-2 text-lg font-medium">+90 543 581 15 79</p>
                            <p className="text-white mb-4">info@topmodelofuniverse.com</p>
                            <a
                                href="https://www.instagram.com/alidurguttofficial/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gold hover:text-white transition-colors"
                            >
                                <Instagram className="w-5 h-5 mr-2" /> @alidurguttofficial
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Management;
