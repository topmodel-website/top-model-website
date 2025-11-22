import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Youtube } from 'lucide-react';

const Contact = () => {
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
                        <h1 className="text-5xl font-serif font-bold text-gold mb-8">Get in Touch</h1>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            For inquiries regarding sponsorship, participation, or press, please contact us using the information below.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                                    <p className="text-gray-400">info@topmodelofuniverse.com</p>
                                    <p className="text-gray-400">management@topmodelofuniverse.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">Location</h3>
                                    <p className="text-gray-400">Istanbul, Turkiye</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
                            <div className="flex gap-4">
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
                            </div>
                        </div>
                    </motion.div>

                    {/* Map / Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full min-h-[400px] bg-gray-800 rounded-2xl overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568644396922-5c3bfae12521?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-50 hover:opacity-70 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-serif text-2xl tracking-widest">ISTANBUL</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
