import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-deepBlack border-t border-gold/20 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <img
                                src="/gallery/crown-logo.png"
                                alt="Logo"
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-400 text-sm">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h4 className="text-white font-semibold mb-4">{t('footer.followUs')}</h4>
                        <div className="flex justify-center space-x-6">
                            <a href="https://instagram.com/topmodelofuniverse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://instagram.com/topmodelofturkiye" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.youtube.com/@topmodelofuniverse/videos" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                                <Youtube size={24} />
                            </a>
                            <a href="https://www.facebook.com/topmodelofuniverse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="text-center md:text-right">
                        <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
                        <p className="text-gray-400 text-sm">info@topmodelofuniverse.com</p>
                        <p className="text-gray-400 text-sm">{t('contact.location')}</p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} Top Model of Universe. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
