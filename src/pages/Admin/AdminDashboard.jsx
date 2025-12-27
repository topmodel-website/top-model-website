import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming firebase export is at src/firebase.js
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LogOut, ArrowUpDown, Eye, Trash2, Download } from 'lucide-react';
import * as XLSX from 'xlsx'; // Import for Excel export if we add it, or remove if not needed yet. Let's stick to basic table first.

import ApplicantModal from './ApplicantModal';

const AdminDashboard = () => {
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const navigate = useNavigate();

    // Route Protection
    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/admin');
        }
    }, [navigate]);

    // Fetch Data
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "applications"));
                const apps = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Handle Timestamp objects from Firestore
                    let date = "Bilinmiyor";
                    if (data.createdAt) {
                        // Check if it's a Firestore Timestamp (has search/nseconds)
                        if (data.createdAt.seconds) {
                            date = new Date(data.createdAt.seconds * 1000).toLocaleDateString('tr-TR');
                        } else if (typeof data.createdAt === 'string') {
                            // Legacy string date if any
                            date = new Date(data.createdAt).toLocaleDateString('tr-TR');
                        }
                    }

                    return {
                        id: doc.id,
                        ...data,
                        formattedDate: date
                    };
                });
                setApplicants(apps);
                setFilteredApplicants(apps);
            } catch (error) {
                console.error("Error fetching documents: ", error);
                alert("Veriler yüklenirken bir hata oluştu: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, []);

    // Search Logic
    useEffect(() => {
        const results = applicants.filter(app => {
            const searchLower = searchTerm.toLowerCase();
            return (
                app.nameSurname?.toLowerCase().includes(searchLower) ||
                app.email?.toLowerCase().includes(searchLower) ||
                app.city?.toLowerCase().includes(searchLower) ||
                app.formattedDate?.includes(searchLower)
            );
        });

        // Apply Sorting
        if (sortConfig.key) {
            results.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredApplicants(results);
    }, [searchTerm, applicants, sortConfig]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        navigate('/admin');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredApplicants.map(app => ({
            "Tarih": app.formattedDate,
            "İsim Soyisim": app.nameSurname,
            "E-posta": app.email,
            "Telefon": app.phone,
            "Şehir": app.city,
            "Yaş": app.age,
            "Boy": app.height,
            "Kilo": app.weight,
            "Instagram": app.instagram
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Başvurular");
        XLSX.writeFile(wb, "Basvurular.xlsx");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-deepBlack flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deepBlack text-white p-8 pt-32">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gold">Başvuru Yönetimi</h1>
                        <p className="text-gray-400 mt-1">Toplam {applicants.length} başvuru</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Download size={18} /> Excel İndir
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg transition-all"
                        >
                            <LogOut size={18} /> Çıkış Yap
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative">
                    <input
                        type="text"
                        placeholder="İsim, e-posta veya şehir ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                </div>

                {/* Table */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/40 text-gray-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4 cursor-pointer hover:text-gold transition-colors" onClick={() => handleSort('createdAt')}>
                                        <div className="flex items-center gap-1">Tarih <ArrowUpDown size={14} /></div>
                                    </th>
                                    <th className="p-4 cursor-pointer hover:text-gold transition-colors" onClick={() => handleSort('nameSurname')}>
                                        <div className="flex items-center gap-1">İsim Soyisim <ArrowUpDown size={14} /></div>
                                    </th>
                                    <th className="p-4">İletişim</th>
                                    <th className="p-4">Fiziksel</th>
                                    <th className="p-4">Konum</th>
                                    <th className="p-4 text-center">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredApplicants.map((app) => (
                                    <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 whitespace-nowrap text-gray-300">{app.formattedDate}</td>
                                        <td className="p-4">
                                            <div className="font-medium text-white">{app.nameSurname}</div>
                                            <div className="text-xs text-gray-500">ID: {app.id}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-300">{app.email}</div>
                                            <div className="text-sm text-gray-500">{app.phone}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-300">{app.height}cm / {app.weight}kg</div>
                                            <div className="text-sm text-gray-500">{app.age} Yaş</div>
                                        </td>
                                        <td className="p-4 text-gray-300">{app.city}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setSelectedApplicant(app)}
                                                    className="bg-gold/10 hover:bg-gold text-gold hover:text-black p-2 rounded-lg transition-all"
                                                    title="Detayları Gör"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {filteredApplicants.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Aradığınız kriterlere uygun başvuru bulunamadı.
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedApplicant && (
                    <ApplicantModal
                        applicant={selectedApplicant}
                        onClose={() => setSelectedApplicant(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
