import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle, Upload, X, FileText, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import KvkkModal from '../components/KvkkModal';
import { countryCodes } from '../data/countryCodes';

const Apply = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        nameSurname: '',
        gender: '',
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
        countryCode: '+90',
        email: '',
        kvkkAccepted: false
    });



    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [showKvkk, setShowKvkk] = useState(false);
    const [showConditionsModal, setShowConditionsModal] = useState(true);
    const [isConditionsExpanded, setIsConditionsExpanded] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handlePhoneChange = (e) => {
        // Remove non-digit characters
        let value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits (standard without country code)
        if (value.length > 10) value = value.slice(0, 10);

        // Format: 5XX XXX XX XX
        if (value.length > 6) {
            value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;
        } else if (value.length > 3) {
            value = `${value.slice(0, 3)} ${value.slice(3)}`;
        }

        setFormData({ ...formData, phone: value });
    };

    const handleTextOnly = (e) => {
        // Allow letters (including Turkish), spaces, and basic punctuation like . or ' if needed, but strict 'text' usually means letters.
        // Regex for letters (unicode property \p{L}) is best but JS support varies.
        // Simple regex: /[^a-zA-Z\sğüşıöçĞÜŞİÖÇ]/g
        const value = e.target.value.replace(/[^a-zA-Z\sğüşıöçĞÜŞİÖÇ]/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleNumberOnly = (e) => {
        // Allow only digits
        const value = e.target.value.replace(/\D/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + photos.length > 4) {
            alert(t('apply.messages.maxPhotos'));
            return;
        }

        const newPhotos = files.map(file => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));
        setPhotos(prev => [...prev, ...newPhotos]);
    };

    const removePhoto = (index) => {
        setPhotos(prev => {
            const newPhotos = [...prev];
            URL.revokeObjectURL(newPhotos[index].preview);
            newPhotos.splice(index, 1);
            return newPhotos;
        });
    };

    const sendConfirmationEmail = async (toEmail, name) => {
        // Register at https://www.emailjs.com/ to get your Service ID, Template ID, and Public Key.
        const SERVICE_ID = 'service_apz25cg';
        const TEMPLATE_ID = 'template_tfo1uqp';
        const PUBLIC_KEY = 'eny4UzUI9xIX2WcGr';

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!formData.kvkkAccepted) {
            setStatus({ type: 'error', message: t('apply.messages.kvkkRequired') });
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        try {
            // Generate a reference with an ID beforehand
            const docRef = doc(collection(db, 'applications'));
            const applicationId = docRef.id;

            // 1. Upload Photos to Firebase Storage (using Name_ID as folder)
            const photoUrls = await Promise.all(photos.map(async (photoObj, index) => {
                const safeName = formData.nameSurname.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                // Folder format: name_surname_DOCUMENTID
                const folderName = `${safeName}_${applicationId}`;
                const fileName = `photo_${index + 1}_${Date.now()}.jpg`;
                const storageRef = ref(storage, `applications/${folderName}/${fileName}`);

                const snapshot = await uploadBytes(storageRef, photoObj.file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL;
            }));

            // 2. Save Application Data to Firestore using the pre-generated ID
            await setDoc(docRef, {
                ...formData,
                phone: `${formData.countryCode} ${formData.phone}`,
                photos: photoUrls,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            // 3. Send Confirmation Email
            await sendConfirmationEmail(formData.email, formData.nameSurname);

            setStatus({ type: 'success', message: t('apply.messages.success') });
            setFormData({
                nameSurname: '', gender: '', age: '', height: '', weight: '', education: '', city: '',
                instagram: '', tshirtSize: '', swimsuitSize: '', shoeSize: '', passportExpiry: '',
                experience: '', agency: '', pastContests: '', phone: '', email: '', hasPassport: '', hasExperience: '', hasAgency: '', hasPastContests: '', kvkkAccepted: false
            });
            setPhotos([]);
        } catch (error) {
            setStatus({ type: 'error', message: error.message || t('apply.messages.error') });
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-deepBlack py-20">
            {/* KVKK Modal */}
            <KvkkModal isOpen={showKvkk} onClose={() => setShowKvkk(false)} />

            {/* Application Conditions Modal - Auto Open */}
            <AnimatePresence>
                {showConditionsModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowConditionsModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-deepBlack border border-gold/30 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="text-xl font-serif text-gold flex items-center gap-2">
                                    <Info className="w-5 h-5" />
                                    {t('apply.conditions.title')}
                                </h3>
                                <button
                                    onClick={() => setShowConditionsModal(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
                                <ul className="space-y-4 mb-6">
                                    {t('apply.conditions.items', { returnObjects: true }).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-300">
                                            <span className="text-gold mt-1.5">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gold font-serif text-lg italic text-center whitespace-pre-line border-t border-white/10 pt-6">
                                    {t('apply.conditions.footer')}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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

                {/* Application Conditions */}
                {/* Application Conditions - Collapsible */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-deepBlack border border-gold/30 rounded-2xl mb-12 shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden cursor-pointer group"
                    onClick={() => setIsConditionsExpanded(!isConditionsExpanded)}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Info className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl md:text-3xl font-serif text-white group-hover:text-gold transition-colors">
                                    {t('apply.conditions.title')}
                                </h2>
                            </div>
                            <motion.div
                                animate={{ rotate: isConditionsExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-6 h-6 text-gold" />
                            </motion.div>
                        </div>

                        <AnimatePresence>
                            {isConditionsExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <ul className="space-y-4 mb-8 mt-6">
                                        {t('apply.conditions.items', { returnObjects: true }).map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-300">
                                                <span className="text-gold mt-1.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-white/10 pt-6">
                                        <p className="text-gold font-serif text-lg italic text-center whitespace-pre-line">
                                            {t('apply.conditions.footer')}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                                    onChange={handleTextOnly}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.gender')}</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="" disabled>{t('apply.form.genderOptions.placeholder')}</option>
                                    <option value="female">{t('apply.form.genderOptions.female')}</option>
                                    <option value="male">{t('apply.form.genderOptions.male')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.age')}</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleNumberOnly}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.city')}</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleTextOnly}
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
                                    type="text"
                                    inputMode="numeric"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleNumberOnly}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="175"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.weight')}</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleNumberOnly}
                                    required
                                    className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                    placeholder="55"
                                />
                            </div>
                            <div>
                                <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-wider">{t('apply.form.shoeSize')}</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    name="shoeSize"
                                    value={formData.shoeSize}
                                    onChange={handleNumberOnly}
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
                                <div className="flex gap-4">
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        className="w-24 bg-deepBlack/50 border border-white/10 rounded-lg px-2 py-3 text-white focus:border-gold focus:outline-none transition-colors appearance-none text-center"
                                    >
                                        {countryCodes.map((item) => (
                                            <option key={`${item.country}-${item.code}`} value={item.code}>
                                                {item.country} ({item.code})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        required
                                        className="flex-1 w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                        placeholder="5XX XXX XX XX"
                                    />
                                </div>
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
                                        required
                                        className="w-full bg-deepBlack/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                                        placeholder="@username"
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
                                        <img src={photo.preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
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
                                onClick={() => setShowKvkk(true)}
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
