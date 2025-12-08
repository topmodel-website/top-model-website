import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Mic, Trophy, Award, Instagram } from 'lucide-react';
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
        <div className="flex items-center justify-center gap-2">
            <p className="text-white font-medium text-lg">{name}</p>
        </div>
        {country && (
            <p className="text-gray-400 text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-1">
                <span className="text-lg">{getFlag(country)}</span> {country}
            </p>
        )}
    </div>
);

const getRankTitle = (rank, type = 'standard') => {
    const titles = {
        1: "Winner",
        2: "1st Runner Up",
        3: "2nd Runner Up",
        4: "3rd Runner Up",
        5: "4th Runner Up"
    };
    return titles[rank] || `${rank}. Place`;
};

const ListItem = ({ rank, name, country, title, instagram }) => {
    const displayTitle = title || getRankTitle(rank);

    return (
        <li className="flex items-center justify-between py-4 border-b border-white/10 last:border-0 group">
            <div className="flex items-center flex-1">
                <div className="flex flex-col">
                    <span className="text-gold text-xs font-bold uppercase tracking-wider mb-1">
                        {displayTitle}
                    </span>
                    <span className="text-gray-200 flex items-center gap-2 font-medium mb-1">
                        {country && <span className="text-lg">{getFlag(country)}</span>}
                        {country}
                    </span>
                    <span className="text-gray-400 text-sm">{name}</span>
                </div>
            </div>
            {instagram && (
                <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-gold hover:bg-gold hover:text-black transition-all duration-300 border border-gold/30 hover:border-gold hover:scale-110 ml-4 shrink-0"
                    title={`${name} Instagram`}
                >
                    <Instagram className="w-5 h-5" />
                </a>
            )}
        </li>
    );
};

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

                {/* Winners & Top 5 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Women's Column */}
                    <div className="flex flex-col gap-8">
                        {winners[0] && <WinnerCard {...winners[0]} />}
                        {top5.women && top5.women.length > 0 && (
                            <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full">
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

                    {/* Men's Column */}
                    <div className="flex flex-col gap-8">
                        {winners[1] && <WinnerCard {...winners[1]} />}
                        {top5.men && top5.men.length > 0 && (
                            <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full">
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
                    </div>
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
                                        {award.names.map((item, idx) => {
                                            const isObject = typeof item === 'object' && item !== null;
                                            const name = isObject ? item.name : item;
                                            const instagram = isObject ? item.instagram : null;

                                            return (
                                                <div key={idx} className="flex items-center justify-center gap-2">
                                                    <p className="text-gray-300">{name}</p>
                                                    {instagram && (
                                                        <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                                                            <Instagram className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery Placeholder */}
                <div className="text-center">
                    <Link
                        to={`/gallery?category=${year}`}
                        className="inline-block px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-deepBlack transition-all duration-300 uppercase tracking-widest text-sm font-bold"
                    >
                        {t('yearSection.viewGallery')} {year}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default YearSection;
