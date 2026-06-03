import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ShieldAlert, ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import { useSchoolData } from '../../context/SchoolDataContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { schoolContact, announcements } = useSchoolData();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, e) => {
    setIsOpen(false);
    setAboutDropdownOpen(false);

    if (href.startsWith('/')) {
      // It is a React Router route path
      return; // Handled by standard Link component
    }

    e.preventDefault();
    if (!isLandingPage) {
      navigate('/' + href);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isAboutActive = 
    location.pathname === '/about-school' || 
    location.pathname === '/about-founder' || 
    location.pathname === '/about-principal';

  const isActive = (href) => {
    if (href.startsWith('/')) {
      return location.pathname === href;
    }
    if (href.startsWith('#')) {
      return isLandingPage && location.hash === href;
    }
    return false;
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      {/* Top Banner (Header Layout from photo) */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 transition-colors relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: School Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="Eklavya Ashramschool Logo" 
              className="h-20 sm:h-24 w-auto object-contain bg-white p-1 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700"
            />
          </Link>

          {/* Middle: Centered Names in Marathi and English */}
          <div className="flex flex-col text-center justify-center items-center flex-1 max-w-3xl px-2">
            <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-indigo-905 dark:text-indigo-400 tracking-wide leading-tight">
              एकलव्य प्राथमिक, माध्यमिक आश्रमशाळा आणि कनिष्ठ महाविद्यालय हिरडपाडा
            </h1>
            <h2 className="text-xs sm:text-sm lg:text-base font-bold text-slate-700 dark:text-slate-200 mt-1.5 leading-snug">
              Eklavya Primary, Secondary Ashramschool and Junior College Hiradpada
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold mt-1.5 uppercase tracking-wide">
              तालुका : जव्हार, जिल्हा : पालघर &nbsp;|&nbsp; Tal : Jawhar, Dist : Palghar
            </p>
            <p className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase mt-1 tracking-wider">
              Govt. Aided Residential Ashramschool &nbsp;•&nbsp; 80G Tax Exempt &nbsp;•&nbsp; CSR Approved
            </p>
          </div>

          {/* Right: Social Icons & Tiers */}
          <div className="flex flex-col items-center md:items-end justify-center gap-2.5 flex-shrink-0">
            {/* Social Media Link Icons */}
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-650 flex items-center justify-center transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-600 hover:text-pink-600 flex items-center justify-center transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.274-1.03-.808-1.838-1.838-2.113C19.78 3.5 12 3.5 12 3.5s-7.78 0-9.66.54c-1.03.275-1.838 1.083-2.113 2.113C.0 8.04.0 12 .0 12s0 3.96.227 5.837c.275 1.03 1.083 1.838 2.113 2.113C4.22 20.5 12 20.5 12 20.5s7.78 0 9.66-.54c1.03-.275 1.838-1.083 2.113-2.113C24 15.96 24 12 24 12s0-3.96-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            {/* Subline badges */}
          </div>

        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header
        className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-indigo-950 dark:bg-slate-950 border-b border-indigo-900/50 dark:border-slate-900 shadow-lg"
      >
        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-100 z-50" style={{ width: `${scrollProgress * 100}%` }} />

        {/* Navigation Bar Row */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">
          {/* Compact Logo Brand for sticky status */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <img 
              src="/logo.jpg" 
              alt="Eklavya Ashramschool Logo" 
              className="w-9 h-9 rounded-lg object-contain bg-white border border-slate-700 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-white group-hover:text-indigo-300 transition-colors">
                Eklavya Campus
              </span>
              <span className="text-[8px] text-indigo-200 font-bold leading-none mt-0.5">
                Ashramschool & Jr. College
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Home Link */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-2 ${
                location.pathname === '/' && !location.hash
                  ? 'text-indigo-350 dark:text-indigo-400'
                  : 'text-slate-200 hover:text-indigo-350 dark:hover:text-indigo-400'
              }`}
            >
              Home
            </Link>

            {/* About Dropdown Trigger */}
            <div 
              className="relative group/about"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-2 flex items-center gap-1 focus:outline-none ${
                  isAboutActive
                    ? 'text-indigo-355 dark:text-indigo-400'
                    : 'text-slate-200 hover:text-indigo-355 dark:hover:text-indigo-400'
                }`}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover/about:rotate-180 transition-transform duration-300" />
              </button>

              {/* About Dropdown Menu */}
              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 rounded-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-55 text-left text-slate-800 dark:text-slate-200"
                  >
                    <Link
                      to="/about-school"
                      className={`block px-4 py-2.5 text-xs font-semibold transition-colors ${
                        location.pathname === '/about-school'
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-850/50'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-indigo-600'
                      }`}
                    >
                      About School
                    </Link>
                    <Link
                      to="/about-founder"
                      className={`block px-4 py-2.5 text-xs font-semibold transition-colors ${
                        location.pathname === '/about-founder'
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-850/50'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-indigo-600'
                      }`}
                    >
                      About Founder
                    </Link>
                    <Link
                      to="/about-principal"
                      className={`block px-4 py-2.5 text-xs font-semibold transition-colors ${
                        location.pathname === '/about-principal'
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-850/50'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-indigo-600'
                      }`}
                    >
                      About Principal
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Navbar Routes */}
            {[
              { name: 'Faculty', path: '/faculty' },
              { name: 'Activities', path: '/activities' },
              { name: 'Sponsors', path: '/sponsors' }
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-2 ${
                  isActive(link.path)
                    ? 'text-indigo-350 dark:text-indigo-400'
                    : 'text-slate-200 hover:text-indigo-350 dark:hover:text-indigo-400'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Contact scroll anchor link */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick('#contact', e)}
              className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-2 ${
                isActive('#contact')
                  ? 'text-indigo-350 dark:text-indigo-400'
                  : 'text-slate-200 hover:text-indigo-350 dark:hover:text-indigo-400'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/admin">
              <Button 
                variant="outline" 
                size="sm"
                icon={<ShieldAlert className="w-4 h-4" />}
                className="!text-slate-200 hover:!text-white hover:bg-white/10"
              >
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <Link to="/admin" className="p-2 text-slate-300 hover:text-white">
              <ShieldAlert className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:bg-indigo-900/50 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling News Ticker */}
        <div className="w-full bg-[#FFF8E7] dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-305 py-1.5 px-6 border-t border-indigo-900/30 dark:border-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="flex-shrink-0 px-2 py-0.5 rounded bg-yellow-250 dark:bg-yellow-900/50 text-[9px] font-bold uppercase tracking-wider text-yellow-900 dark:text-yellow-250 animate-pulse">
              LATEST:
            </span>
            <marquee 
              behavior="scroll" 
              direction="left" 
              scrollamount="3.5"
              onMouseEnter={(e) => e.currentTarget.stop()}
              onMouseLeave={(e) => e.currentTarget.start()}
              className="text-xs font-semibold tracking-wide cursor-pointer select-none flex-grow w-full"
            >
              {announcements && announcements.length > 0 
                ? announcements.map(ann => ann.text).join(" \u00a0\u00a0\u00a0\u00a0\u2022\u00a0\u00a0\u00a0\u00a0 ") 
                : "Welcome to Eklavya Primary, Secondary Ashramschool and Junior College Hiradpada."
              }
            </marquee>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-6 px-6 flex flex-col gap-6 shadow-2xl lg:hidden text-left"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-900 transition-colors ${
                  location.pathname === '/' && !location.hash ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Home
              </Link>
              
              {/* Mobile About Submenu */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block pt-1 pl-1">About Us</span>
                <Link
                  to="/about-school"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold pl-4 py-1.5 transition-colors ${
                    location.pathname === '/about-school' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-350'
                  }`}
                >
                  About School
                </Link>
                <Link
                  to="/about-founder"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold pl-4 py-1.5 transition-colors ${
                    location.pathname === '/about-founder' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-350'
                  }`}
                >
                  About Founder
                </Link>
                <Link
                  to="/about-principal"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold pl-4 py-1.5 transition-colors ${
                    location.pathname === '/about-principal' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-350'
                  }`}
                >
                  About Principal
                </Link>
              </div>

              {/* Mobile other routes */}
              {[
                { name: 'Faculty', path: '/faculty' },
                { name: 'Activities', path: '/activities' },
                { name: 'Sponsors', path: '/sponsors' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-900 transition-colors ${
                    isActive(link.path) ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <a
                href="#contact"
                onClick={(e) => handleNavClick('#contact', e)}
                className={`text-sm font-bold uppercase tracking-wider py-2 border-b border-slate-100 dark:border-slate-900 transition-colors ${
                  isActive('#contact') ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                Contact
              </a>
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
