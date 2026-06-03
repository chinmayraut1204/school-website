import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';

const carouselItems = [
  {
    title: "Classroom Activities",
    description: "Interactive learning in modern digital classrooms.",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Science Lab",
    description: "Hands-on experiments in our physics, chemistry, and biology labs.",
    url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Computer Lab",
    description: "Coding bootcamps and digital literacy training sessions.",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Sports Events",
    description: "Fierce athletics meets, volleyball championships, and archery drills.",
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Cultural Programs",
    description: "Traditional Warli art workshops and folk music celebrations.",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Annual Day",
    description: "Grand stage performances, dramas, and academic prize distributions.",
    url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Competitions",
    description: "Inter-school science exhibitions, chess tourneys, and debates.",
    url: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "School Celebrations",
    description: "Republic Day parades, Independence Day events, and festivals.",
    url: "https://images.unsplash.com/photo-1505232458627-539c1793a52d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Educational Tours",
    description: "Outdoor environmental excursions, museum visits, and science city tours.",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Student Achievements",
    description: "Celebrating state-level archery champions and top rankers.",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
  }
];

const CampusLife = () => {
  const { campusLife } = useSchoolData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const items = campusLife && campusLife.length > 0 ? campusLife : carouselItems;

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
      className="pt-8 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
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
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mb-6 rounded-full" />
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
                      Eklavya Campus
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
