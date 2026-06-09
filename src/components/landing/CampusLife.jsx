import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';

const CampusLife = () => {
  const { campusLife } = useSchoolData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const items = campusLife || [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCards);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  return (
    <section 
      id="campus-life" 
      className="pt-8 pb-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background blur blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-emerald-200/10 dark:bg-emerald-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
              Visual Memories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Sponsors
            </h2>
            <div className="h-1 w-20 bg-[#1b1a55] dark:bg-indigo-500 mb-6 rounded-full" />
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We are deeply grateful to our sponsors and partners who support our mission and help provide residential care and quality education to our tribal students.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button 
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed z-20 bg-white dark:bg-slate-900 shadow-sm cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentIndex(prev => Math.min(maxIndex, prev + 1))}
              disabled={currentIndex === maxIndex}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed z-20 bg-white dark:bg-slate-900 shadow-sm cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-out py-4"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {items.map((item, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCards}%` }}
              >
                {/* Achievement style card */}
                <motion.div
                  className="relative h-[380px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800/80 group cursor-pointer flex flex-col justify-end p-6 hover:-translate-y-1.5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  {/* Full image background */}
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Card Content overlay */}
                  <div className="relative z-20 text-left">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-400 mb-2 tracking-widest block">
                      Active Sponsor
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8 relative z-20">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'bg-indigo-600 dark:bg-indigo-400 w-8' 
                    : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampusLife;
