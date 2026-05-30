import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Ticker from '../components/landing/Ticker';
import About from '../components/landing/About';
import StatsDashboard from '../components/landing/StatsDashboard';
import Faculty from '../components/landing/Faculty';
import Activities from '../components/landing/Activities';
import Donation from '../components/landing/Donation';
import Sponsors from '../components/landing/Sponsors';
import Gallery from '../components/landing/Gallery';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
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
        <Ticker />
        <About />
        <StatsDashboard />
        <Faculty />
        <Activities />
        <Donation />
        <Sponsors />
        <Gallery />
        <Testimonials />
        <FAQ />
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
