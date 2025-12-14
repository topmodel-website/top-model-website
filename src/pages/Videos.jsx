import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { videoData } from '../data/videoData';

const Videos = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setFilter(category);
        }
    }, [location]);

    // Get unique categories
    const categories = ['all', ...new Set(videoData.map(v => v.category))];

    // Filter videos
    const filteredVideos = filter === 'all'
        ? videoData
        : videoData.filter(v => v.category === filter);

    const openLightbox = (video, index) => {
        setSelectedVideo({ ...video, index });
    };

    const closeLightbox = () => {
        setSelectedVideo(null);
    };

    const nextVideo = (e) => {
        e.stopPropagation();
        if (!selectedVideo) return;
        const total = filteredVideos.length;
        const newIndex = (selectedVideo.index + 1) % total;
        setSelectedVideo({ ...filteredVideos[newIndex], index: newIndex });
    };

    const prevVideo = (e) => {
        e.stopPropagation();
        if (!selectedVideo) return;
        const total = filteredVideos.length;
        const newIndex = (selectedVideo.index - 1 + total) % total;
        setSelectedVideo({ ...filteredVideos[newIndex], index: newIndex });
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
                        {t('videos.title')}
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        {t('videos.subtitle')}
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
                                {cat === 'all' ? t('videos.allVideos') : cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Grid */}
                {filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((video, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx % 3 * 0.1 }}
                                className="relative group rounded-xl overflow-hidden bg-white/5 cursor-pointer border border-white/10 aspect-video"
                                onClick={() => openLightbox(video, idx)}
                            >
                                {video.type === 'local' ? (
                                    <video
                                        src={video.src}
                                        muted
                                        loop
                                        playsInline
                                        onMouseOver={e => e.target.play()}
                                        onMouseOut={e => e.target.pause()}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pl-1">
                                        <Play className="text-black w-8 h-8 fill-current" />
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                        <LayoutGrid className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">{t('videos.noVideos')}</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedVideo && (
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
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors z-10"
                            onClick={prevVideo}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors z-10"
                            onClick={nextVideo}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                            {selectedVideo.type === 'local' ? (
                                <video
                                    src={selectedVideo.src}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                />
                            ) : (
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                                    title={selectedVideo.title}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Videos;
