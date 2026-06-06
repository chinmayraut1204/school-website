import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';

const Hero = () => {
  const { needs } = useSchoolData();
  const [showDonateModal, setShowDonateModal] = useState(false);
  const noticesList = needs && needs.length > 0 ? needs.map(n => n.text) : [
    "DSE CUT OFF 2025-26",
    "ME CUT OFF 2025-26",
    "MMS CUT OFF 2025-26",
    "M.E. Admission Enquiry Form 2026-27"
  ];

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden pt-0 pb-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 w-full"
    >
      {/* Floating Grid SVG Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            color: 'var(--color-indigo-500)'
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 items-stretch relative z-10 w-full max-w-full px-0">
        {/* Left Column: School Building Image (like 2nd photo) */}
        <motion.div 
          className="lg:col-span-9 relative rounded-none overflow-hidden group h-[520px] w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle bottom shadow gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
          <img 
            src="/school-building.jpg" 
            alt="Eklavya Ashramschool Building" 
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
            loading="eager"
          />
          {/* Campus Name Label Overlay */}
          <div className="absolute bottom-6 left-6 z-20 select-none">
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              Campus Building
            </span>
            <h4 className="text-white text-xl sm:text-2xl font-extrabold mt-2 drop-shadow-md tracking-wide">
              Eklavya Ashramschool & Junior College
            </h4>
            <p className="text-white/80 text-xs sm:text-sm font-medium mt-1">
              Hiradpada, Jawhar, Palghar
            </p>
          </div>
        </motion.div>

        {/* Right Column: Notice Box (like 2nd photo) */}
        <motion.div 
          className="lg:col-span-3 relative flex justify-center items-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Notice Box styled like the reference */}
          <div className="relative w-full h-[520px] rounded-none overflow-hidden bg-[#002f6c] flex flex-col items-center pt-8 pb-6 px-6">
            {/* Header Content */}
            <div className="flex flex-col items-center select-none">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFF8E7] tracking-wider text-center mt-2 uppercase font-sans">
                School Needs
              </h3>
              {/* Downward indicator arrow */}
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#FFF8E7] mt-3 mb-2" />
            </div>

            {/* List Container with vertical scrolling */}
            <div className="relative flex-1 w-full overflow-hidden mt-2 rounded-2xl bg-black/15 p-2">
              {/* Fade masks */}
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#002f6c]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#002f6c]/40 to-transparent z-10 pointer-events-none" />

              <div className="h-full overflow-hidden relative">
                <div className="animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col gap-4 py-2">
                  {/* First list copy */}
                  {noticesList.map((text, idx) => (
                    <div 
                      key={`notice-1-${idx}`}
                      className="flex items-start text-white/90 hover:text-yellow-300 transition-all duration-200 px-4 py-3 rounded-xl hover:bg-white/5 border-b border-white/5 hover:border-yellow-400/20 group"
                    >
                      <span className="text-[14px] font-semibold tracking-wide text-left leading-relaxed">{text}</span>
                    </div>
                  ))}
                  {/* Second list copy for seamless loop */}
                  {noticesList.map((text, idx) => (
                    <div 
                      key={`notice-2-${idx}`}
                      className="flex items-start text-white/90 hover:text-yellow-300 transition-all duration-200 px-4 py-3 rounded-xl hover:bg-white/5 border-b border-white/5 hover:border-yellow-400/20 group"
                    >
                      <span className="text-[14px] font-semibold tracking-wide text-left leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Click-to-action hint at the bottom */}
            <div className="text-[11px] text-white/40 mt-4 select-none font-medium animate-pulse">
              Hover to pause scrolling • Click notices to read
            </div>

            {/* Donate Contact Button */}
            <button 
              onClick={() => setShowDonateModal(true)}
              className="w-full mt-4 py-2.5 px-4 bg-[#FFF8E7] hover:bg-yellow-50 active:scale-[0.98] text-[#002f6c] font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md transition-all duration-200 flex items-center justify-center group cursor-pointer select-none border-none outline-none"
            >
              Contact for Donate
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showDonateModal && (
          <div 
            className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 select-none cursor-zoom-out animate-fade-in"
            onClick={() => setShowDonateModal(false)}
          >
            <motion.div 
              className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center cursor-default text-slate-850 dark:text-slate-100"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowDonateModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none cursor-pointer border-none bg-transparent"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Info */}
              <div className="flex flex-col items-center mt-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Donate to Eklavya Ashramschool
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6 max-w-[280px]">
                  Choose your preferred option to coordinate your contribution with our administrative desk:
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/919545292231?text=Hello%20Eklavya%20Ashramschool%20desk%2C%20I%20would%20like%20to%20inquire%20about%20donating%20to%20the%20school."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-3.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/45 border border-emerald-250 dark:border-emerald-900/30 rounded-2xl transition-all duration-200 group text-left cursor-pointer decoration-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.66.986 3.288 1.486 4.908 1.486 5.489 0 9.954-4.466 9.957-9.959.002-2.661-1.034-5.159-2.918-7.046C16.71 1.748 14.215 1.71 11.56 1.71c-5.492 0-9.957 4.463-9.959 9.953-.001 1.758.485 3.413 1.42 4.91l-.994 3.633 3.73-.978-.17-.1zM17.487 14.39c-.3-.15-1.774-.875-2.049-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1-.892-1.675-1.993-1.875-2.343-.2-.35-.02-.54.16-.69.162-.135.35-.41.525-.615.175-.2.233-.35.35-.575.117-.225.058-.425-.03-.575-.088-.15-.675-1.625-.925-2.225-.244-.588-.491-.508-.675-.518-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52 1.433.62 2.244.75 3.037.67.875-.13 1.774-.725 2.024-1.393.25-.668.25-1.238.175-1.392-.075-.15-.275-.225-.575-.375z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Connect via WhatsApp
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      +91 9545292231 
                    </span>
                  </div>
                </a>

                {/* Email / Gmail */}
                <a 
                  href="mailto:gagangiriashram@gmail.com?subject=Donation%20Inquiry%20-%20Eklavya%20Ashramschool&body=Hello%20Eklavya%20Ashramschool%20desk%2C%20I%20would%20like%20to%20inquire%20about%20donating%20to%20the%2520school."
                  className="flex items-center gap-3 w-full p-3.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/45 border border-indigo-250 dark:border-indigo-900/30 rounded-2xl transition-all duration-200 group text-left cursor-pointer decoration-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-650 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Send Email (Gmail)
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      gagangiriashram@gmail.com
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
