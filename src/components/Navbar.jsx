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

        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-deepBlack/80 backdrop-blur-lg border-b border-white/5 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src="/gallery/crown-logo.png"
                                alt="Top Model Logo"
                                className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8 lg:space-x-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative group py-2 text-xs lg:text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${isActive(link.path)
                                        ? 'text-gold'
                                        : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold transform transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}
                                    />
                                </Link>
                            ))}

                            {/* Language Switcher */}
                            <div className="flex items-center space-x-1 ml-6 border-l border-white/10 pl-6 h-6">
                                <button
                                    onClick={() => changeLanguage('tr')}
                                    className={`text-xs font-bold transition-colors hover:text-gold ${i18n.language === 'tr' ? 'text-gold' : 'text-gray-500'}`}
                                >
                                    TR
                                </button>
                                <span className="text-gray-700 text-xs">/</span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`text-xs font-bold transition-colors hover:text-gold ${i18n.language === 'en' ? 'text-gold' : 'text-gray-500'}`}
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
                            className="inline-flex items-center justify-center p-2 rounded-full text-gold hover:text-white hover:bg-white/5 transition-all focus:outline-none"
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
                        className="md:hidden bg-deepBlack/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={`block text-center text-lg font-serif tracking-widest uppercase py-2 transition-colors ${isActive(link.path)
                                        ? 'text-gold'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex justify-center items-center space-x-6 pt-6 border-t border-white/5 mt-4">
                                <button
                                    onClick={() => changeLanguage('tr')}
                                    className={`text-sm font-bold tracking-widest ${i18n.language === 'tr' ? 'text-gold' : 'text-gray-500'}`}
                                >
                                    TR
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`text-sm font-bold tracking-widest ${i18n.language === 'en' ? 'text-gold' : 'text-gray-500'}`}
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
