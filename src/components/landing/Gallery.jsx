import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSchoolData } from '../../context/SchoolDataContext';
import GlassCard from '../common/GlassCard';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const { gallery } = useSchoolData();
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeImageIdx, setActiveImageIdx] = useState(null);

  const categories = ['All', 'Classrooms', 'Labs', 'Sports', 'Events'];

  const filteredItems = selectedCat === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCat);

  const handleOpenLightbox = (item) => {
    // Find index of this item in the filtered list
    const idx = filteredItems.findIndex(f => f.id === item.id);
    setActiveImageIdx(idx);
  };

  const handleCloseLightbox = () => {
    setActiveImageIdx(null);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="gallery" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Visual Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Campus Life & Activities
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Take a look inside our active school environment, containing interactive libraries, modern computer setups, soccer matches, and academic achievements.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`
                px-5 py-2 text-xs font-bold rounded-full border transition-all duration-300
                ${selectedCat === cat 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Framer motion handles layout animations */}
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-200/50 dark:border-slate-800/50"
              onClick={() => handleOpenLightbox(item)}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Blur Glass Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-400 mb-1 tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                  <ZoomIn className="w-4 h-4" />
                  Expand Image
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      {/* Note: In React, we use Framer Motion AnimatePresence directly */}
      {activeImageIdx !== null && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button 
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none z-55"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={handlePrevImage}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none z-55"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Caption Box */}
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={filteredItems[activeImageIdx].url} 
              alt={filteredItems[activeImageIdx].title} 
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="text-center text-white max-w-xl">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                {filteredItems[activeImageIdx].category}
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1">
                {filteredItems[activeImageIdx].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Image {activeImageIdx + 1} of {filteredItems.length}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNextImage}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none z-55"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
