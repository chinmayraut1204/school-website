import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ShieldAlert } from 'lucide-react';
import Button from '../common/Button';
import { useSchoolData } from '../../context/SchoolDataContext';

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Stats', href: '#stats' },
  { name: 'Faculty', href: '#faculty' },
  { name: 'Activities', href: '#activities' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { schoolContact } = useSchoolData();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Background solid change
      setScrolled(window.scrollY > 20);

      // Scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (!isLandingPage) {
      navigate('/' + href);
      // Wait for navigation and then scroll
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
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled 
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-lg' 
            : 'bg-transparent py-5'
          }
        `}
      >
        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/logo.jpg" 
              alt="Shri Gagangiri Trust Logo" 
              className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-200 dark:border-slate-800 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Eklavya Campus
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-none mt-0.5">
                Ashramschool & Junior College
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link, i) => (
              <motion.a
                key={link.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 dark:after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm" icon={<ShieldAlert className="w-4 h-4" />}>
                Admin Panel
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              glow
              icon={<Heart className="w-4 h-4 text-rose-300 fill-rose-300" />}
              onClick={(e) => handleNavClick('#donation', e)}
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <Link to="/admin" className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
              <ShieldAlert className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
            className="fixed inset-x-0 top-[68px] z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-6 px-6 flex flex-col gap-6 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-2 border-b border-slate-100 dark:border-slate-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                glow
                icon={<Heart className="w-4 h-4 text-rose-300 fill-rose-300" />}
                onClick={(e) => handleNavClick('#donation', e)}
                className="w-full"
              >
                Donate Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
