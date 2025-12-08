import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from '../data/galleryData';

const RotatingGalleryImage = ({ className, interval = 5000, overlayClassName = "" }) => {
    // Filter images from 2022, 2023, and 2024
    const validImages = galleryData.filter(img => ['2022', '2023', '2024'].includes(img.category));

    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * validImages.length));

    useEffect(() => {
        if (validImages.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * validImages.length);
                } while (nextIndex === prevIndex);
                return nextIndex;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [validImages.length, interval]);

    if (validImages.length === 0) return null;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <AnimatePresence mode='popLayout'>
                <motion.img
                    key={validImages[currentIndex].src}
                    src={validImages[currentIndex].src}
                    alt={validImages[currentIndex].alt || "Gallery Image"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>
            {/* Optional Overlay */}
            <div className={`absolute inset-0 z-10 ${overlayClassName}`} />
        </div>
    );
};

export default RotatingGalleryImage;
