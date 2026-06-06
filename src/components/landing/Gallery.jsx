import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSchoolData } from '../../context/SchoolDataContext';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const { gallery } = useSchoolData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, gallery.length - visibleCards);

  // Auto-play interval for horizontal scrolling
  useEffect(() => {
    if (isPaused || activeImageIdx !== null) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, activeImageIdx]);

  const handleOpenLightbox = (idx) => {
    setActiveImageIdx(idx);
  };

  const handleCloseLightbox = () => {
    setActiveImageIdx(null);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="gallery" 
      className="pt-8 pb-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background blur blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[35vw] h-[35vw] bg-emerald-200/10 dark:bg-emerald-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
              Visual Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Gallery
            </h2>
            <div className="h-1 w-20 bg-[#1b1a55] dark:bg-indigo-500 mb-6 rounded-full" />
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Explore snapshots of our student events, laboratory setups, daily campus meals, and athletic meet achievements.
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
            {gallery.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCards}%` }}
              >
                {/* Photo Card */}
                <motion.div
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-200/50 dark:border-slate-800/50 hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleOpenLightbox(idx)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Glassmorphic caption overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left z-10">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 mb-1 tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                      <ZoomIn className="w-4 h-4" />
                      Expand Image
                    </div>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <motion.div 
            className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
          >
            {/* Close button */}
            <button 
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none z-55 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Arrow */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none z-55 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image & Caption Box */}
            <div 
              className="relative max-w-4xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={gallery[activeImageIdx].url} 
                alt={gallery[activeImageIdx].title} 
                className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              <div className="text-center text-white max-w-xl">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  {gallery[activeImageIdx].category}
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1">
                  {gallery[activeImageIdx].title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Image {activeImageIdx + 1} of {gallery.length}
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={handleNextImage}
              className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none z-55 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
