import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Youtube, Facebook, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RotatingGalleryImage from '../components/RotatingGalleryImage';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-deepBlack py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl font-serif font-bold text-gold mb-8">{t('contact.getInTouch')}</h1>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            {t('contact.description')}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">{t('contact.phone')}</h3>
                                    <p className="text-gray-400">+90 543 581 15 79</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">{t('contact.emailUs')}</h3>
                                    <p className="text-gray-400">info@topmodelofuniverse.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">{t('contact.locationTitle')}</h3>
                                    <p className="text-gray-400">{t('contact.location')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h3 className="text-white font-bold text-lg mb-6">{t('contact.followUs')}</h3>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://instagram.com/topmodelofuniverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-white/5 rounded-full text-white hover:bg-gold hover:text-deepBlack transition-all duration-300"
                                >
                                    <Instagram className="w-5 h-5 mr-2" /> @topmodelofuniverse
                                </a>
                                <a
                                    href="https://instagram.com/topmodelofturkiye"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-white/5 rounded-full text-white hover:bg-gold hover:text-deepBlack transition-all duration-300"
                                >
                                    <Instagram className="w-5 h-5 mr-2" /> @topmodelofturkiye
                                </a>
                                <a
                                    href="https://www.youtube.com/@topmodelofuniverse/videos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-white/5 rounded-full text-white hover:bg-gold hover:text-deepBlack transition-all duration-300"
                                >
                                    <Youtube className="w-5 h-5 mr-2" /> @topmodelofuniverse
                                </a>
                                <a
                                    href="https://www.facebook.com/topmodelofuniverse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-white/5 rounded-full text-white hover:bg-gold hover:text-deepBlack transition-all duration-300"
                                >
                                    <Facebook className="w-5 h-5 mr-2" /> Top Model of Universe
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map / Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full min-h-[400px] bg-gray-800 rounded-2xl overflow-hidden relative group shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop"
                            alt="World Map Network"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale sepia brightness-50 contrast-125"
                        />
                        <div className="absolute inset-0 bg-deepBlack/20 transition-colors duration-500" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            <div className="flex items-center gap-6 transform transition-transform duration-500 group-hover:scale-105">
                                <img
                                    src="/gallery/universe-logo.png"
                                    alt="Top Model of Universe"
                                    className="h-24 md:h-28 w-auto object-contain drop-shadow-lg"
                                />
                                <div className="h-16 w-px bg-gold/60"></div>
                                <img
                                    src="/gallery/turkiye-logo.png"
                                    alt="Top Model of Turkiye"
                                    className="h-24 md:h-28 w-auto object-contain drop-shadow-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
