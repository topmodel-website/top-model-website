import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from '../data/galleryData';

const RotatingGalleryImage = ({ className, interval = 5000, overlayClassName = "", categories = ['2022', '2023', '2024', '2025'] }) => {
    // Filter images based on provided categories
    const validImages = galleryData.filter(img => categories.includes(img.category));

    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * validImages.length));
    const [nextIndex, setNextIndex] = useState(() => Math.floor(Math.random() * validImages.length));

    useEffect(() => {
        if (validImages.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex(prevCurrent => {
                // Switch to the pre-decided next image
                const newCurrent = nextIndex;

                // Calculate the subsequent image to start preloading
                let newNext;
                do {
                    newNext = Math.floor(Math.random() * validImages.length);
                } while (newNext === newCurrent);

                setNextIndex(newNext);
                return newCurrent;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [validImages.length, interval, nextIndex]);

    if (validImages.length === 0) return null;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Preload next image */}
            {validImages[nextIndex] && (
                <img
                    src={validImages[nextIndex].src}
                    alt=""
                    className="hidden"
                    style={{ display: 'none' }}
                />
            )}
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
