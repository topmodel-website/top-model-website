import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle, Upload, X, FileText } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import KvkkModal from '../components/KvkkModal';

const Apply = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        nameSurname: '',
        age: '',
        height: '',
        weight: '',
        education: '',
        city: '',
        instagram: '',
        tshirtSize: '',
        swimsuitSize: '',
        shoeSize: '',
        hasPassport: '',
        passportExpiry: '',
        hasExperience: '',
        experience: '',
        hasAgency: '',
        agency: '',
        hasPastContests: '',
        pastContests: '',
        phone: '',
        email: '',
        kvkkAccepted: false
    });
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isKvkkOpen, setIsKvkkOpen] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + photos.length > 4) {
            alert(t('apply.messages.maxPhotos'));
            return;
        }

        const processedPhotos = await Promise.all(files.map(file => processImage(file)));
        setPhotos(prev => [...prev, ...processedPhotos]);
    };

    const removePhoto = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    // Resize and convert to Base64
    const processImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality
                };
            };
        });
    };

    const sendConfirmationEmail = async (toEmail, name) => {
        // IMPORTANT: These are placeholder keys. You must replace them with your actual EmailJS keys.
        // Register at https://www.emailjs.com/ to get your Service ID, Template ID, and Public Key.
        const SERVICE_ID = 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        if (SERVICE_ID === 'YOUR_SERVICE_ID') {
            console.warn('EmailJS keys are missing. Email not sent.');
            return;
        }

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    to_email: toEmail,
                    to_name: name,
                    message: "Başvurunuz başarıyla alınmıştır. Değerlendirme sürecinden sonra sizinle iletişime geçilecektir."
                },
                PUBLIC_KEY
            );
            console.log('Confirmation email sent');
        } catch (error) {
            console.error('Email sending failed:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        if (photos.length !== 4) {
            setStatus({ type: 'error', message: t('apply.messages.minPhoto') });
            setLoading(false);
            return;
        }

        if (!formData.kvkkAccepted) {
            setStatus({ type: 'error', message: t('apply.messages.kvkkRequired') });
            setLoading(false);
            return;
        }

        try {
            // Save to Firestore
            await addDoc(collection(db, 'applications'), {
                ...formData,
                photos: photos,
                createdAt: serverTimestamp()
            });

            // Send Confirmation Email
            await sendConfirmationEmail(formData.email, formData.nameSurname);

            setStatus({ type: 'success', message: t('apply.messages.success') });
            setFormData({
                nameSurname: '', age: '', height: '', weight: '', education: '', city: '',
                instagram: '', tshirtSize: '', swimsuitSize: '', shoeSize: '', passportExpiry: '',
                experience: '', agency: '', pastContests: '', phone: '', email: '', kvkkAccepted: false
            });
            setPhotos([]);
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus({ type: 'error', message: t('apply.messages.error') });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-deepBlack py-20">
            <KvkkModal isOpen={isKvkkOpen} onClose={() => setIsKvkkOpen(false)} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center items-center gap-8 mb-8">
                        <img
                            src="/gallery/universe-logo.png"
                            alt="Top Model of Universe"
                            className="h-20 md:h-28 w-auto object-contain drop-shadow-xl"
                        />
                        <div className="h-16 w-px bg-gold/30"></div>
                        <img
                            src="/gallery/turkiye-logo.png"
                            alt="Top Model of Türkiye"
                            className="h-20 md:h-28 w-auto object-contain drop-shadow-xl"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">
                        {t('apply.title')}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {t('apply.subtitle')}
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="bg-white/5 p-8 md:p-12 rounded-2xl border border-gold/20 backdrop-blur-sm"
                >
                    {status.message && (
                        <div className={`mb-8 p-4 rounded-lg flex items-center ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {status.type === 'success' ? <CheckCircle className="mr-2" /> : <AlertCircle className="mr-2" />}
                            {status.message}
                        </div>
                    )}

                    {/* Section 1: Personal Information */}
                    <div className="mb-10">
                        <h3 className="text-xl font-serif font-bold text-white mb-6 border-b border-gold/30 pb-2">
                            {t('apply.sections.personalInfo')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.nameSurname')}</label>
                                <input
                                    type="text"
                                    name="nameSurname"
                                    value={formData.nameSurname}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.age')}</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.city')}</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.education')}</label>
                                <select
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="" disabled>{t('apply.form.educationOptions.placeholder')}</option>
                                    <option value="Ilköğretim">{t('apply.form.educationOptions.primary')}</option>
                                    <option value="Lise">{t('apply.form.educationOptions.highSchool')}</option>
                                    <option value="Ön Lisans">{t('apply.form.educationOptions.associate')}</option>
                                    <option value="Lisans">{t('apply.form.educationOptions.bachelor')}</option>
                                    <option value="Yüksek Lisans">{t('apply.form.educationOptions.master')}</option>
                                    <option value="Doktora">{t('apply.form.educationOptions.phd')}</option>
                                    <option value="Diğer">{t('apply.form.educationOptions.other')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Physical Stats */}
                    <div className="mb-10">
                        <h3 className="text-xl font-serif font-bold text-white mb-6 border-b border-gold/30 pb-2">
                            {t('apply.sections.physicalStats')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.height')}</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="175"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.weight')}</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="55"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.shoeSize')}</label>
                                <input
                                    type="number"
                                    name="shoeSize"
                                    value={formData.shoeSize}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="38"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.tshirtSize')}</label>
                                <input
                                    type="text"
                                    name="tshirtSize"
                                    value={formData.tshirtSize}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="S, M, L..."
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.swimsuitSize')}</label>
                                <input
                                    type="text"
                                    name="swimsuitSize"
                                    value={formData.swimsuitSize}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="36, 38..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Contact Info */}
                    <div className="mb-10">
                        <h3 className="text-xl font-serif font-bold text-white mb-6 border-b border-gold/30 pb-2">
                            {t('apply.sections.contactInfo')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.phone')}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="+90 555 000 0000"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.instagram')}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                        placeholder="@username (Optional)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Experience & Other */}
                    <div className="mb-10">
                        <h3 className="text-xl font-serif font-bold text-white mb-6 border-b border-gold/30 pb-2">
                            {t('apply.sections.experience')}
                        </h3>
                        <div className="space-y-8">
                            {/* Has Passport */}
                            <div>
                                <label className="block text-gold text-sm font-bold mb-3 uppercase tracking-wider">{t('apply.form.hasPassport')}</label>
                                <div className="flex space-x-8">
                                    {['yes', 'no'].map((option) => (
                                        <label key={option} className="inline-flex items-center cursor-pointer group">
                                            <div className={`relative flex items-center justify-center w-6 h-6 mr-3 border-2 rounded-full transition-all duration-300 ${formData.hasPassport === option ? 'border-gold bg-gold/10' : 'border-white/20 group-hover:border-gold/50'}`}>
                                                <input
                                                    type="radio"
                                                    name="hasPassport"
                                                    value={option}
                                                    checked={formData.hasPassport === option}
                                                    onChange={handleChange}
                                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                                />
                                                <div className={`w-2.5 h-2.5 rounded-full bg-gold transform transition-transform duration-300 ${formData.hasPassport === option ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                            <span className={`text-base transition-colors duration-300 ${formData.hasPassport === option ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'}`}>
                                                {t(`apply.form.${option}`)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {formData.hasPassport === 'yes' && (
                                    <div className="mt-4">
                                        <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.passportExpiry')}</label>
                                        <input
                                            type="text"
                                            name="passportExpiry"
                                            value={formData.passportExpiry}
                                            onChange={handleChange}
                                            required={formData.hasPassport === 'yes'}
                                            className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                            placeholder="2028"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Has Experience */}
                            <div>
                                <label className="block text-gold text-sm font-bold mb-3 uppercase tracking-wider">{t('apply.form.hasExperience')}</label>
                                <div className="flex space-x-8">
                                    {['yes', 'no'].map((option) => (
                                        <label key={option} className="inline-flex items-center cursor-pointer group">
                                            <div className={`relative flex items-center justify-center w-6 h-6 mr-3 border-2 rounded-full transition-all duration-300 ${formData.hasExperience === option ? 'border-gold bg-gold/10' : 'border-white/20 group-hover:border-gold/50'}`}>
                                                <input
                                                    type="radio"
                                                    name="hasExperience"
                                                    value={option}
                                                    checked={formData.hasExperience === option}
                                                    onChange={handleChange}
                                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                                />
                                                <div className={`w-2.5 h-2.5 rounded-full bg-gold transform transition-transform duration-300 ${formData.hasExperience === option ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                            <span className={`text-base transition-colors duration-300 ${formData.hasExperience === option ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'}`}>
                                                {t(`apply.form.${option}`)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {formData.hasExperience === 'yes' && (
                                    <div className="mt-4">
                                        <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.experience')}</label>
                                        <textarea
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            required={formData.hasExperience === 'yes'}
                                            className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors h-24 resize-none"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Has Agency */}
                            <div>
                                <label className="block text-gold text-sm font-bold mb-3 uppercase tracking-wider">{t('apply.form.hasAgency')}</label>
                                <div className="flex space-x-8">
                                    {['yes', 'no'].map((option) => (
                                        <label key={option} className="inline-flex items-center cursor-pointer group">
                                            <div className={`relative flex items-center justify-center w-6 h-6 mr-3 border-2 rounded-full transition-all duration-300 ${formData.hasAgency === option ? 'border-gold bg-gold/10' : 'border-white/20 group-hover:border-gold/50'}`}>
                                                <input
                                                    type="radio"
                                                    name="hasAgency"
                                                    value={option}
                                                    checked={formData.hasAgency === option}
                                                    onChange={handleChange}
                                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                                />
                                                <div className={`w-2.5 h-2.5 rounded-full bg-gold transform transition-transform duration-300 ${formData.hasAgency === option ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                            <span className={`text-base transition-colors duration-300 ${formData.hasAgency === option ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'}`}>
                                                {t(`apply.form.${option}`)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {formData.hasAgency === 'yes' && (
                                    <div className="mt-4">
                                        <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.agency')}</label>
                                        <input
                                            type="text"
                                            name="agency"
                                            value={formData.agency}
                                            onChange={handleChange}
                                            required={formData.hasAgency === 'yes'}
                                            className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Has Past Contests */}
                            <div>
                                <label className="block text-gold text-sm font-bold mb-3 uppercase tracking-wider">{t('apply.form.hasPastContests')}</label>
                                <div className="flex space-x-8">
                                    {['yes', 'no'].map((option) => (
                                        <label key={option} className="inline-flex items-center cursor-pointer group">
                                            <div className={`relative flex items-center justify-center w-6 h-6 mr-3 border-2 rounded-full transition-all duration-300 ${formData.hasPastContests === option ? 'border-gold bg-gold/10' : 'border-white/20 group-hover:border-gold/50'}`}>
                                                <input
                                                    type="radio"
                                                    name="hasPastContests"
                                                    value={option}
                                                    checked={formData.hasPastContests === option}
                                                    onChange={handleChange}
                                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                                />
                                                <div className={`w-2.5 h-2.5 rounded-full bg-gold transform transition-transform duration-300 ${formData.hasPastContests === option ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                            <span className={`text-base transition-colors duration-300 ${formData.hasPastContests === option ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'}`}>
                                                {t(`apply.form.${option}`)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {formData.hasPastContests === 'yes' && (
                                    <div className="mt-4">
                                        <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.pastContests')}</label>
                                        <input
                                            type="text"
                                            name="pastContests"
                                            value={formData.pastContests}
                                            onChange={handleChange}
                                            required={formData.hasPastContests === 'yes'}
                                            className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Photos */}
                    <div className="mb-8">
                        <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">
                            {t('apply.form.photos')}
                        </label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-gold/50 transition-colors bg-deepBlack/30 relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                                disabled={photos.length >= 4}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <div className="flex flex-col items-center justify-center">
                                <Upload className="w-8 h-8 text-gold mb-2" />
                                <p className="text-gray-400">{t('apply.form.uploadText')}</p>
                                <p className="text-xs text-gray-500 mt-2">{t('apply.form.maxSize')}</p>
                            </div>
                        </div>

                        {/* Photo Previews */}
                        {photos.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-4">
                                {photos.map((photo, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gold/20">
                                        <img src={photo} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removePhoto(index)}
                                            className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* KVKK Consent */}
                    <div className="mb-8 flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="kvkk"
                                name="kvkkAccepted"
                                type="checkbox"
                                checked={formData.kvkkAccepted}
                                onChange={handleChange}
                                className="w-4 h-4 border border-gold/50 rounded bg-deepBlack/50 focus:ring-gold text-gold"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="kvkk" className="font-medium text-gray-300">
                                {t('apply.form.kvkkConsent')}
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsKvkkOpen(true)}
                                className="ml-2 text-gold hover:underline inline-flex items-center"
                            >
                                <FileText size={14} className="mr-1" /> {t('apply.form.readKvkk')}
                            </button>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-4 bg-gold text-deepBlack font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> {t('apply.form.sending')}
                                </>
                            ) : (
                                <>
                                    {t('apply.form.submit')} <Send className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div >
        </div >
    );
};

export default Apply;
