import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-deepBlack text-white">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
            <BackToTopButton />
        </div>
    );
};

export default Layout;
