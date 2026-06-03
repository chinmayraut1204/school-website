import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const notices = [
  "IEEE IC3ET Papers in IEEE Xplore.",
  "Faculty Recruitment 2026-27",
  "CUT OFF F.E 2025-26",
  "DSE CUT OFF 2025-26",
  "ME CUT OFF 2025-26",
  "MMS CUT OFF 2025-26",
  "M.E. Admission Enquiry Form 2026-27",
  "Admission Enquiry for B.E. Courses (4 years) A.Y. 2026-27"
];

const Hero = () => {
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
              <h3 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 tracking-wider text-center mt-2 uppercase font-sans">
                School Needs
              </h3>
              {/* Downward indicator arrow */}
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-yellow-400 mt-3 mb-2" />
            </div>

            {/* List Container with vertical scrolling */}
            <div className="relative flex-1 w-full overflow-hidden mt-2 rounded-2xl bg-black/15 p-2">
              {/* Fade masks */}
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#002f6c]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#002f6c]/40 to-transparent z-10 pointer-events-none" />

              <div className="h-full overflow-hidden relative">
                <div className="animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col gap-4 py-2">
                  {/* First list copy */}
                  {notices.map((text, idx) => (
                    <div 
                      key={`notice-1-${idx}`}
                      className="flex items-start text-white/90 hover:text-yellow-300 transition-all duration-200 px-4 py-3 rounded-xl hover:bg-white/5 border-b border-white/5 hover:border-yellow-400/20 group"
                    >
                      <span className="text-[14px] font-semibold tracking-wide text-left leading-relaxed">{text}</span>
                    </div>
                  ))}
                  {/* Second list copy for seamless loop */}
                  {notices.map((text, idx) => (
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
