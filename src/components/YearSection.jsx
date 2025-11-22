import React from 'react';
import { MapPin, Calendar, Mic, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFlag } from '../utils/flags';
import { useTranslation } from 'react-i18next';

const WinnerCard = ({ title, name, country, image }) => (
    <div className="bg-white/5 border border-gold/20 p-6 rounded-lg text-center hover:border-gold/50 transition-colors duration-300">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-b from-gold/20 to-transparent flex items-center justify-center overflow-hidden">
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
                <Trophy className="w-12 h-12 text-gold" />
            )}
        </div>
        <h4 className="text-gold font-serif text-xl mb-1">{title}</h4>
        <p className="text-white font-medium text-lg">{name}</p>
        {country && (
            <p className="text-gray-400 text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-1">
                <span className="text-lg">{getFlag(country)}</span> {country}
            </p>
        )}
    </div>
);

const ListItem = ({ rank, name, country }) => (
    <li className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
        <span className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs flex items-center justify-center mr-3 font-bold">
                {rank}
            </span>
            <span className="text-gray-200 flex items-center gap-2">
                {country && <span className="text-lg">{getFlag(country)}</span>}
                {country || name}
            </span>
        </span>
        {name && country && <span className="text-gray-400 text-sm">{name}</span>}
        {!country && name && <span className="text-gray-400 text-sm">{name}</span>}
    </li>
);

const YearSection = ({ data }) => {
    const { year, location, date, hosts, winners, top5, mentions } = data;
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20 border-b border-gold/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark mb-4">
                        {year}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gold mr-2" />
                            <span>{location}</span>
                        </div>
                        {date && (
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 text-gold mr-2" />
                                <span>{date}</span>
                            </div>
                        )}
                        <div className="flex items-center">
                            <Mic className="w-4 h-4 text-gold mr-2" />
                            <span>{t('yearSection.hosts')}: {hosts}</span>
                        </div>
                    </div>
                </div>

                {/* Main Winners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
                    {winners.map((winner, index) => (
                        <WinnerCard key={index} {...winner} />
                    ))}
                </div>

                {/* Top 5 Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {top5.men && (
                        <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                            <h3 className="text-2xl font-serif text-gold mb-6 flex items-center">
                                <Award className="w-6 h-6 mr-2" /> {t('yearSection.top5Men')}
                            </h3>
                            <ul className="space-y-2">
                                {top5.men.map((item, idx) => (
                                    <ListItem key={idx} rank={idx + 1} {...item} />
                                ))}
                            </ul>
                        </div>
                    )}

                    {top5.women && (
                        <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                            <h3 className="text-2xl font-serif text-gold mb-6 flex items-center">
                                <Award className="w-6 h-6 mr-2" /> {t('yearSection.top5Women')}
                            </h3>
                            <ul className="space-y-2">
                                {top5.women.map((item, idx) => (
                                    <ListItem key={idx} rank={idx + 1} {...item} />
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Mentions / Special Awards */}
                {mentions && mentions.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-3xl font-serif text-center text-gold mb-10">{t('yearSection.specialAwards')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentions.map((award, index) => (
                                <div key={index} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                    <h4 className="text-gold font-serif text-lg mb-3 flex items-center justify-center">
                                        <Award className="w-4 h-4 mr-2" /> {award.title}
                                    </h4>
                                    <div className="space-y-1 text-center">
                                        {award.names.map((name, idx) => (
                                            <p key={idx} className="text-gray-300">{name}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery Placeholder */}
                <div className="text-center">
                    <button className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-deepBlack transition-all duration-300 uppercase tracking-widest text-sm font-bold">
                        {t('yearSection.viewGallery')} {year}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default YearSection;
