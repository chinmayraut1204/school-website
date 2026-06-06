import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Gallery from '../components/landing/Gallery';
import CampusLife from '../components/landing/CampusLife';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Navigation Headers */}
      <Navbar />

      {/* Landing Blocks */}
      <main>
        <Hero />
        <About />
        <Gallery />
        <CampusLife />
        <Contact />
      </main>

      {/* Global Utilities */}
      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
