import React from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { Megaphone } from 'lucide-react';

const Ticker = () => {
  const { announcements } = useSchoolData();

  if (!announcements || announcements.length === 0) return null;

  // Duplicate items to ensure smooth infinite loop scroll
  const marqueeItems = [...announcements, ...announcements, ...announcements];

  return (
    <div className="relative z-20 w-full bg-slate-900 border-y border-indigo-950 dark:border-indigo-500/20 py-3 shadow-md overflow-hidden flex items-center">
      {/* Label Badge */}
      <div className="absolute left-0 z-30 h-full bg-slate-900 pr-4 pl-6 flex items-center shadow-[15px_0_15px_-5px_rgba(15,23,42,1)] border-r border-indigo-950/20">
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider">
          <Megaphone className="w-3.5 h-3.5 animate-bounce" />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Latest Updates
        </div>
      </div>

      {/* Scrolling Text Marquee Track */}
      <div className="flex w-full overflow-hidden select-none whitespace-nowrap pl-48">
        <div className="flex gap-16 animate-marquee hover:[animation-play-state:paused] py-1 cursor-pointer">
          {marqueeItems.map((ann, index) => (
            <div 
              key={`${ann.id}-${index}`} 
              className="flex items-center gap-3 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                ann.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                ann.type === 'warning' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' :
                'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]'
              }`} />
              <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">
                {ann.date}
              </span>
              <span>{ann.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
