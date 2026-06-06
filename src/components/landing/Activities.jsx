import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Cpu, Palette, Filter } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const categories = ['All', 'Academic', 'Labs', 'Sports', 'Arts'];

const activitiesData = [
  {
    id: 'act-1',
    title: 'Robotics & STEAM Club',
    category: 'Academic',
    desc: 'Empowering children with hands-on coding, mechanical constructs, and Arduino motherboard sensors.',
    icon: <Cpu className="w-5 h-5 text-indigo-500" />,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'act-2',
    title: 'Physics & Chemistry Practicals',
    category: 'Labs',
    desc: 'Experiential science models where textbooks come to life via testing, acid reaction demonstrations, and basic mechanics.',
    icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'act-3',
    title: 'Annual Sports Relay Training',
    category: 'Sports',
    desc: 'Empowering track runners and athletes with structured conditioning drills, coordination matches, and inter-state trial meets.',
    icon: <Trophy className="w-5 h-5 text-amber-500" />,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'act-4',
    title: 'Dramatic Arts & Speech Club',
    category: 'Arts',
    desc: 'Boosts child confidence, grammar skills, and literature analysis through weekly dramatic theater plays and poetry recitations.',
    icon: <Palette className="w-5 h-5 text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'act-5',
    title: 'Computer Coding Foundation',
    category: 'Labs',
    desc: 'Introducing children to digital literacy, HTML website templates, keyboard typing speed drills, and scratch block tools.',
    icon: <Cpu className="w-5 h-5 text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'act-6',
    title: 'Organic Eco-Campus Initiative',
    category: 'Academic',
    desc: 'Fostering ecological ethics. Students maintain a small organic kitchen garden, learning composting, geology, and botany.',
    icon: <BookOpen className="w-5 h-5 text-teal-500" />,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80'
  }
];

const Activities = () => {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredActivities = selectedCat === 'All'
    ? activitiesData
    : activitiesData.filter(act => act.category === selectedCat);

  return (
    <section 
      id="activities" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Co-Curriculars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Explore School Activities
          </h2>
          <div className="h-1 w-20 bg-[#1b1a55] dark:bg-indigo-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Beyond text books, we nurture our students with practical labs, athletic fields, and art studios to unlock their full potential.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Filter className="w-4 h-4" />
            Filter By:
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`
                px-5 py-2 text-xs font-bold rounded-full border transition-all duration-300
                ${selectedCat === cat 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((act) => (
              <motion.div
                key={act.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <GlassCard 
                  hoverEffect 
                  glowColor="rgba(99, 102, 241, 0.12)"
                  className="flex flex-col h-full hover:border-indigo-500/35 overflow-hidden"
                  animate={false}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={act.image} 
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 shadow-md">
                      {act.icon}
                    </div>
                    <div className="absolute bottom-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-sm">
                      {act.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between text-left">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {act.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
