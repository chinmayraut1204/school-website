import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight, Users, GraduationCap, Award } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';
import Button from '../common/Button';

const Hero = () => {
  const { totalRaised, schoolStats } = useSchoolData();

  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const stats = [
    { icon: <Users className="w-5 h-5 text-indigo-500" />, label: 'Active Students', value: `${schoolStats.totalStudents}+` },
    { icon: <GraduationCap className="w-5 h-5 text-emerald-500" />, label: 'Success Pass Rate', value: `${schoolStats.passRate}%` },
    { icon: <Award className="w-5 h-5 text-amber-500" />, label: 'Total Raised', value: `₹${totalRaised.toLocaleString()}` },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
    >
      {/* Dynamic Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-emerald-200/30 dark:bg-emerald-900/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Floating Grid SVG Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            color: 'var(--color-indigo-500)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={textVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Transforming Public Education
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={textVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            Empower Dreams.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400">
              Transform Futures.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={textVariants}
            className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8"
          >
            We believe that financial constraints should never stand in the way of a child's imagination. Join us in providing modern labs, books, and resources to government school students.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          >
            <Button
              variant="primary"
              size="lg"
              glow
              onClick={() => handleScrollTo('#donation')}
              icon={<Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-pulse" />}
            >
              Support Our Kids
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollTo('#about')}
              icon={<ChevronRight className="w-5 h-5" />}
            >
              Explore Impact
            </Button>
          </motion.div>

          {/* Inline Statistics Cards */}
          <motion.div 
            variants={textVariants}
            className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-200 dark:border-slate-800 pt-8 w-full"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  {stat.icon}
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {stat.label}
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual Image */}
        <motion.div 
          className="lg:col-span-5 relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        >
          {/* Main Visual Image Card with Glowing Borders */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800/80 group">
            {/* Soft backdrop glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-emerald-500 opacity-20 blur-xl group-hover:scale-105 transition-transform duration-500" />
            
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" 
              alt="School Children Studying" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
            
            {/* Glass Overlays */}
            <div className="absolute inset-x-4 bottom-4 backdrop-blur-xl bg-white/20 dark:bg-slate-950/40 border border-white/20 dark:border-slate-800/60 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1 block">
                Model Institution
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                "Learning should not be limited by where you are born."
              </p>
            </div>
          </div>
          
          {/* Floating Bubble element 1 */}
          <motion.div 
            className="absolute -top-6 -right-6 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">✓</div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Govt Affiliated</span>
              <span className="text-[10px] text-slate-400">100% Tax Exempt</span>
            </div>
          </motion.div>
          
          {/* Floating Bubble element 2 */}
          <motion.div 
            className="absolute -bottom-2 -left-6 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold">✨</div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Digital Classroom</span>
              <span className="text-[10px] text-slate-400">Phase 2 Live</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
