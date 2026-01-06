import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// List of sponsor images found in public/gallery/sponsor
// Excludes PDFs as they cannot be rendered in img tags directly
const sponsorImages = [
    "Ekran Resmi 2026-01-06 13.12.08.png",

    "WhatsApp Image 2025-12-23 at 00.29.03 (1).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.03.jpeg",

    "WhatsApp Image 2025-12-23 at 00.29.04 (2).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.04 (3).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.04 (4).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.04.jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.05 (1).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.05 (2).jpeg",

    "WhatsApp Image 2025-12-23 at 00.29.05 (4).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.05 (5).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.05 (6).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.05 (7).jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.05.jpeg",
    "WhatsApp Image 2025-12-23 at 00.29.06 (2).jpeg",
    "WhatsApp Image 2025-12-23 at 00.33.16.jpeg",
    "WhatsApp Image 2025-12-23 at 00.34.51 (1).jpeg",
    "WhatsApp Image 2025-12-23 at 00.34.51 (2).jpeg",
    "WhatsApp Image 2025-12-23 at 00.34.51.jpeg",
    "WhatsApp Image 2025-12-23 at 00.37.17.jpeg",
    "Ekran Resmi 2025-12-25 10.23.09.png",
    "Ekran Resmi 2025-12-25 10.23.31.png",
    "Ekran Resmi 2025-12-25 10.23.57.png",
    "Ekran Resmi 2025-12-25 10.24.17.png",
    "Ekran Resmi 2025-12-25 10.24.53.png"
];

const Sponsors = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-deepBlack text-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gold mb-8">
                        {t('nav.sponsors')}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
                        {t('yearSection.specialAwards').replace('Özel Ödüller', '')} Our valued partners who support us in this journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sponsorImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-300 group"
                        >
                            <div className={`aspect-square flex items-center justify-center bg-white rounded-lg overflow-hidden ${img === "Ekran Resmi 2026-01-06 13.12.08.png" ? 'p-6' : 'p-4'}`}>
                                <img
                                    src={`/gallery/sponsor/${img}`}
                                    alt={`Sponsor ${index + 1}`}
                                    className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sponsors;
