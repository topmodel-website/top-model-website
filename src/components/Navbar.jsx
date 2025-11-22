import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.universe'), path: '/universe' },
        { name: t('nav.turkiye'), path: '/turkiye' },
        { name: t('nav.apply'), path: '/apply' },
        { name: t('nav.management'), path: '/management' },
        { name: t('nav.media'), path: '/media' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-deepBlack/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-serif font-bold text-gold tracking-wider">
                            TOP MODEL
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive(link.path)
                                            ? 'text-gold'
                                            : 'text-gray-300 hover:text-gold'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Language Switcher */}
                            <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
                                <button
                                    onClick={() => changeLanguage('tr')}
                                    className={`text-sm font-medium transition-colors ${i18n.language === 'tr' ? 'text-gold' : 'text-gray-400 hover:text-white'}`}
                                >
                                    TR
                                </button>
                                <span className="text-gray-600">|</span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`text-sm font-medium transition-colors ${i18n.language === 'en' ? 'text-gold' : 'text-gray-400 hover:text-white'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gold hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-deepBlack border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                            ? 'text-gold bg-white/5'
                                            : 'text-gray-300 hover:text-gold hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-4 px-3 py-4 mt-2 border-t border-white/10">
                                <button
                                    onClick={() => changeLanguage('tr')}
                                    className={`text-base font-medium ${i18n.language === 'tr' ? 'text-gold' : 'text-gray-400'}`}
                                >
                                    TR
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`text-base font-medium ${i18n.language === 'en' ? 'text-gold' : 'text-gray-400'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
