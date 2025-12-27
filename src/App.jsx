import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Universe from './pages/Universe';
import Turkiye from './pages/Turkiye';
import Apply from './pages/Apply';
import Management from './pages/Management';

import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Sponsors from './pages/Sponsors';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/universe" element={<Universe />} />
                    <Route path="/turkiye" element={<Turkiye />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/management" element={<Management />} />

                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
