import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Mail, Phone, Ruler, Weight, Instagram, ExternalLink } from 'lucide-react';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';

const ApplicantModal = ({ applicant, onClose }) => {
    const [photos, setPhotos] = useState([]);
    const [loadingPhotos, setLoadingPhotos] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!applicant) return;

            setLoadingPhotos(true);
            setPhotos([]);

            // STRATEGY 1: Check if photos are already in the Firestore document
            if (applicant.photos && Array.isArray(applicant.photos) && applicant.photos.length > 0) {
                console.log("Using photos from Firestore document:", applicant.photos);
                setPhotos(applicant.photos);
                setLoadingPhotos(false);
                return;
            }

            console.log("No photos in document, trying Storage folders for ID:", applicant.id);

            // STRATEGY 2: Fallback - Try to find them in Storage folders
            try {
                // Try primary ID folder first
                const folderRef = ref(storage, `applications/${applicant.id}`);

                try {
                    const res = await listAll(folderRef);
                    if (res.items.length > 0) {
                        const urls = await Promise.all(
                            res.items.map((itemRef) => getDownloadURL(itemRef))
                        );
                        setPhotos(urls);
                        setLoadingPhotos(false);
                        return;
                    }
                } catch (e) {
                    console.log("Folder lookup failed for ID:", e);
                }

                // Try legacy name path as fallback
                try {
                    const legacyFolderRef = ref(storage, `applications/${applicant.nameSurname}`);
                    const resLegacy = await listAll(legacyFolderRef);
                    if (resLegacy.items.length > 0) {
                        const urlsLegacy = await Promise.all(
                            resLegacy.items.map((itemRef) => getDownloadURL(itemRef))
                        );
                        setPhotos(urlsLegacy);
                        setLoadingPhotos(false);
                        return;
                    }
                } catch (e) {
                    console.log("Legacy folder lookup failed:", e);
                }

            } catch (error) {
                console.error("Error fetching photos:", error);
            } finally {
                setLoadingPhotos(false);
            }
        };

        fetchPhotos();
    }, [applicant]);

    if (!applicant) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-deepBlack border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-gold hover:text-black rounded-full text-white transition-all z-50"
                >
                    <X size={24} />
                </button>

                {/* Left: Info Panel */}
                <div className="w-full md:w-1/3 bg-white/5 p-8 overflow-y-auto border-r border-white/10 custom-scrollbar">
                    <div className="mb-8">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-white mb-2">{applicant.nameSurname}</h2>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${applicant.gender === 'male' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'}`}>
                                {applicant.gender === 'male' ? 'Erkek' : 'Kadın'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar size={14} />
                            Başvuru: {applicant.formattedDate}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Status Section */}
                        <div className="bg-black/20 p-4 rounded-xl space-y-3">
                            <h3 className="text-gold text-sm font-bold uppercase tracking-wider">İletişim</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail size={16} className="text-gray-500 min-w-[16px]" />
                                    <span className="text-sm break-all">{applicant.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Phone size={16} className="text-gray-500 min-w-[16px]" />
                                    <span className="text-sm">{applicant.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <MapPin size={16} className="text-gray-500 min-w-[16px]" />
                                    <span className="text-sm">{applicant.city}</span>
                                </div>
                                {applicant.instagram && (
                                    <a
                                        href={`https://instagram.com/${applicant.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-gold hover:underline"
                                    >
                                        <Instagram size={16} className="min-w-[16px]" />
                                        <span className="text-sm">@{applicant.instagram.replace('@', '')}</span>
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Physical Stats */}
                        <div className="bg-black/20 p-4 rounded-xl space-y-3">
                            <h3 className="text-gold text-sm font-bold uppercase tracking-wider">Fiziksel Özellikler</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-3 rounded-lg text-center">
                                    <Ruler size={20} className="mx-auto text-gray-500 mb-1" />
                                    <div className="text-lg font-bold text-white">{applicant.height}</div>
                                    <div className="text-xs text-gray-500">Boy (cm)</div>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg text-center">
                                    <Weight size={20} className="mx-auto text-gray-500 mb-1" />
                                    <div className="text-lg font-bold text-white">{applicant.weight}</div>
                                    <div className="text-xs text-gray-500">Kilo (kg)</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <div className="text-white font-bold">{applicant.shoeSize}</div>
                                    <div className="text-[10px] text-gray-500">Ayakkabı</div>
                                </div>
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <div className="text-white font-bold">{applicant.tshirtSize}</div>
                                    <div className="text-[10px] text-gray-500">T-Shirt</div>
                                </div>
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <div className="text-white font-bold">{applicant.swimsuitSize}</div>
                                    <div className="text-[10px] text-gray-500">Mayo</div>
                                </div>
                            </div>

                            <div className="bg-white/5 p-3 rounded-lg flex justify-between items-center mt-2">
                                <span className="text-gray-400 text-sm">Yaş (D. Tarihi)</span>
                                <span className="text-white font-medium">{applicant.birthDate || applicant.age}</span>
                            </div>
                        </div>

                        {/* Education & Status */}
                        <div className="bg-black/20 p-4 rounded-xl space-y-3">
                            <h3 className="text-gold text-sm font-bold uppercase tracking-wider">Eğitim & Durum</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Eğitim Durumu</div>
                                    <div className="text-white text-sm">{applicant.education}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Pasaport</div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className={applicant.hasPassport === 'yes' ? 'text-green-400' : 'text-red-400'}>
                                            {applicant.hasPassport === 'yes' ? 'Var' : 'Yok'}
                                        </span>
                                        {applicant.hasPassport === 'yes' && (
                                            <span className="text-gray-400">({applicant.passportExpiry})</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-black/20 p-4 rounded-xl space-y-3">
                            <h3 className="text-gold text-sm font-bold uppercase tracking-wider">Deneyimler</h3>

                            {/* Contest History */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-500 uppercase">Yarışma Geçmişi</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${applicant.hasPastContests === 'yes' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                                        {applicant.hasPastContests === 'yes' ? 'Var' : 'Yok'}
                                    </span>
                                </div>
                                {applicant.hasPastContests === 'yes' && (
                                    <p className="text-sm text-gray-300 bg-white/5 p-2 rounded mt-1 italic">
                                        "{applicant.pastContests}"
                                    </p>
                                )}
                            </div>

                            {/* Agency */}
                            <div className="pt-2 border-t border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-500 uppercase">Ajans</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${applicant.hasAgency === 'yes' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                                        {applicant.hasAgency === 'yes' ? 'Var' : 'Yok'}
                                    </span>
                                </div>
                                {applicant.hasAgency === 'yes' && (
                                    <p className="text-sm text-gray-300 bg-white/5 p-2 rounded mt-1 italic">
                                        "{applicant.agency}"
                                    </p>
                                )}
                            </div>

                            {/* Experience */}
                            <div className="pt-2 border-t border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-500 uppercase">Oyunculuk/Modellik</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${applicant.hasExperience === 'yes' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                                        {applicant.hasExperience === 'yes' ? 'Var' : 'Yok'}
                                    </span>
                                </div>
                                {applicant.hasExperience === 'yes' && (
                                    <p className="text-sm text-gray-300 bg-white/5 p-2 rounded mt-1 italic">
                                        "{applicant.experience}"
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right: Gallery */}
                <div className="w-full md:w-2/3 bg-black p-8 overflow-y-auto">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        Başvuru Fotoğrafları
                        <span className="text-sm font-normal text-gray-500 bg-white/10 px-2 py-1 rounded-full">
                            {photos.length}
                        </span>
                    </h3>

                    {loadingPhotos ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                        </div>
                    ) : photos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {photos.map((url, idx) => (
                                <div key={idx} className="group relative aspect-[3/4] bg-white/5 rounded-xl overflow-hidden cursor-zoom-in">
                                    <img
                                        src={url}
                                        alt={`Applicant Photo ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                        title="Tam Boyut Aç"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                            <div className="text-4xl mb-2">📷</div>
                            <p>Fotoğraf bulunamadı veya yüklenemedi.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ApplicantModal;
