import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Hardcoded PIN for simplicity as requested
    // In a real production app with sensitive data, this should be backend-validated
    const CORRECT_PIN = "1923";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === CORRECT_PIN) {
            // Set session storage flag
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Geçersiz PIN Kodu');
            setPin('');
        }
    };

    return (
        <div className="min-h-screen bg-deepBlack flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-gold" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Yönetici Girişi</h1>
                    <p className="text-gray-400">Devam etmek için PIN kodunu giriniz</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => {
                                setPin(e.target.value);
                                setError('');
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-center text-2xl tracking-widest"
                            placeholder="****"
                            maxLength={4}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gold text-deepBlack font-bold py-3.5 rounded-lg hover:bg-white transition-colors duration-300 transform hover:scale-[1.02]"
                    >
                        GİRİŞ YAP
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
