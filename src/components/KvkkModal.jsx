import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { kvkkText } from '../data/kvkkData';

const KvkkModal = ({ isOpen, onClose }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language === 'tr' ? 'tr' : 'en';
    const text = kvkkText[currentLang];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-deepBlack border border-gold/20 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                        <h2 className="text-xl font-serif font-bold text-gold pr-8">
                            {text.title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] text-gray-300 text-sm leading-relaxed custom-scrollbar">
                        <div dangerouslySetInnerHTML={{ __html: text.content }} />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default KvkkModal;
