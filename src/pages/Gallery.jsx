import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { galleryData } from '../data/galleryData';

const Gallery = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setFilter(category);
        }
    }, [location]);

    // Get unique categories
    const categories = ['all', ...new Set(galleryData.map(img => img.category))];

    // Filter images
    const filteredImages = filter === 'all'
        ? galleryData
        : galleryData.filter(img => img.category === filter);

    const openLightbox = (img, index) => {
        setSelectedImage({ ...img, index });
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (!selectedImage) return;
        const total = filteredImages.length;
        const newIndex = (selectedImage.index + 1) % total;
        setSelectedImage({ ...filteredImages[newIndex], index: newIndex });
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (!selectedImage) return;
        const total = filteredImages.length;
        const newIndex = (selectedImage.index - 1 + total) % total;
        setSelectedImage({ ...filteredImages[newIndex], index: newIndex });
    };

    return (
        <div className="min-h-screen bg-deepBlack py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark mb-6">
                        {t('gallery.title')}
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        {t('gallery.subtitle')}
                    </p>
                </motion.div>

                {/* Filters */}
                {categories.length > 2 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 capitalize ${filter === cat
                                    ? 'bg-gold text-black border-gold'
                                    : 'bg-transparent text-gray-400 border-white/20 hover:border-gold hover:text-gold'
                                    }`}
                            >
                                {cat === 'all' ? t('gallery.allPhotos') : cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Grid */}
                {filteredImages.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {filteredImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx % 3 * 0.1 }}
                                className="break-inside-avoid relative group rounded-xl overflow-hidden bg-white/5 cursor-pointer border border-white/10"
                                onClick={() => openLightbox(img, idx)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <ZoomIn className="text-gold w-8 h-8" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                        <LayoutGrid className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">{t('gallery.noPhotos')}</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white p-2"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors"
                            onClick={nextImage}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
                            onClick={(e) => e.stopPropagation()}
                        />


                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
