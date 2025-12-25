import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Mobile dropdown state
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleDropdown = (name) => {
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.universe'), path: '/universe' },
        { name: t('nav.turkiye'), path: '/turkiye' },
        { name: t('nav.apply'), path: '/apply' },
        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.videos'), path: '/videos' },
        { name: t('nav.management'), path: '/management' },
        {
            name: t('nav.contact'),
            path: null, // Dropdown trigger
            children: [
                { name: t('nav.contactInfo'), path: '/contact' },
                { name: t('nav.sponsors'), path: '/sponsors' }
            ]
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-deepBlack/80 backdrop-blur-lg border-b border-white/5 shadow-lg">
            <div className="w-full px-6 sm:px-12 lg:px-16">
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
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-8 xl:space-x-12">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    {link.children ? (
                                        // Dropdown Parent (Desktop)
                                        <div className="relative group/dropdown py-4">
                                            <button className="flex items-center gap-1 text-xs xl:text-sm font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors duration-300">
                                                {link.name}
                                                <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-300" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full right-0 pt-6 invisible opacity-0 group-hover/dropdown:visible group-hover/dropdown:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/dropdown:translate-y-0 min-w-[240px]">
                                                {/* Ornament Triangle */}
                                                <div className="absolute top-4 right-6 w-4 h-4 bg-deepBlack border-l border-t border-white/10 transform rotate-45 z-10 transition-colors duration-300 group-hover/dropdown:border-gold/30"></div>

                                                <div className="bg-deepBlack/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] relative z-0 transition-colors duration-300 group-hover/dropdown:border-gold/30">
                                                    {/* Gold Line Accent (Animated) */}
                                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover/dropdown:opacity-100 transition-opacity duration-500"></div>

                                                    <div className="py-2.5">
                                                        {link.children.map((child) => (
                                                            <Link
                                                                key={child.name}
                                                                to={child.path}
                                                                className={`block px-6 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/5 hover:pl-8 group/item relative overflow-hidden ${isActive(child.path) ? 'text-gold bg-white/5 pl-8' : 'text-gray-400 hover:text-white'}`}
                                                            >
                                                                {/* Hover Highlight Line */}
                                                                <div className={`absolute top-0 left-0 w-[2px] h-full bg-gold transform transition-transform duration-300 ${isActive(child.path) ? 'translate-y-0' : '-translate-y-full group-hover/item:translate-y-0'}`}></div>

                                                                <div className="flex items-center gap-3 relative z-10">
                                                                    <span className={`w-1.5 h-1.5 rounded-full ring-1 ring-white/20 transition-all duration-300 ${isActive(child.path) ? 'bg-gold ring-gold scale-125' : 'bg-transparent group-hover/item:bg-gold group-hover/item:ring-gold group-hover/item:scale-125'}`}></span>
                                                                    {child.name}
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Standard Link
                                        <Link
                                            to={link.path}
                                            className={`relative py-2 text-xs xl:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${isActive(link.path)
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
                                    )}
                                </div>
                            ))}

                            {/* Language Switcher */}
                            <div className="flex items-center space-x-2 ml-4 border-l border-white/10 pl-8 h-6">
                                <button
                                    onClick={() => changeLanguage('tr')}
                                    className={`text-xs xl:text-sm font-bold transition-colors hover:text-gold ${i18n.language === 'tr' ? 'text-gold' : 'text-gray-500'}`}
                                >
                                    TR
                                </button>
                                <span className="text-gray-700 text-xs xl:text-sm">/</span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`text-xs xl:text-sm font-bold transition-colors hover:text-gold ${i18n.language === 'en' ? 'text-gold' : 'text-gray-500'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
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
                        className="lg:hidden bg-deepBlack/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.children ? (
                                        // Mobile Dropdown
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className="w-full flex items-center justify-center gap-2 text-lg font-serif tracking-widest uppercase py-2 text-gray-400 hover:text-white"
                                            >
                                                {link.name}
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {openDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="bg-white/5 rounded-lg overflow-hidden"
                                                    >
                                                        {link.children.map((child) => (
                                                            <Link
                                                                key={child.name}
                                                                to={child.path}
                                                                onClick={toggleMenu}
                                                                className={`block text-center py-3 text-sm tracking-wider uppercase ${isActive(child.path) ? 'text-gold' : 'text-gray-400'}`}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        // Standard Mobile Link
                                        <Link
                                            to={link.path}
                                            onClick={toggleMenu}
                                            className={`block text-center text-lg font-serif tracking-widest uppercase py-2 transition-colors ${isActive(link.path)
                                                ? 'text-gold'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
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
