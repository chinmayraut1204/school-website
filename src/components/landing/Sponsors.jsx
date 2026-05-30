import React from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';

const Sponsors = () => {
  const { sponsors } = useSchoolData();

  if (!sponsors || sponsors.length === 0) return null;

  // Quadruple items to ensure seamless infinite looping carousel
  const carouselItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 text-center">
          In Partnership with Renowned Organizations & CSR Partners
        </h4>
      </div>

      {/* Infinite scrolling row */}
      <div className="flex w-full overflow-hidden select-none whitespace-nowrap relative">
        {/* Soft fading overlays on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 sm:gap-24 animate-marquee-sponsors hover:[animation-play-state:paused] py-4 items-center">
          {carouselItems.map((sponsor, index) => (
            <div 
              key={`${sponsor.id}-${index}`}
              className="flex items-center gap-2 group transition-opacity duration-300"
            >
              {/* Mock Logo Icon */}
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center font-extrabold text-sm text-indigo-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300">
                {sponsor.logoText || sponsor.name.substring(0,2).toUpperCase()}
              </div>
              <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
