import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSchoolData } from '../../context/SchoolDataContext';

const About = () => {
  const { schoolContent } = useSchoolData();

  return (
    <section 
      id="about" 
      className="pt-24 pb-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-0 w-[30vw] h-[30vw] bg-emerald-200/10 dark:bg-emerald-900/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 w-[35vw] h-[35vw] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Welcome Section (Split Row like VJTI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              Welcome to Eklavya Ashramschool
            </h2>
            
            <div className="space-y-5 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                {schoolContent.about}
              </p>
              <div className="border-l-4 border-[#1b1a55] dark:border-indigo-500 pl-4 space-y-3 py-1 bg-slate-100/50 dark:bg-slate-900/30">
                <p className="text-xs sm:text-sm">
                  <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-wide block mb-1">Our Sacred Mission</strong>
                  {schoolContent.mission}
                </p>
                <p className="text-xs sm:text-sm">
                  <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-wide block mb-1">Our Vision</strong>
                  {schoolContent.vision}
                </p>
              </div>
            </div>

            <Link 
              to="/about-school" 
              className="inline-flex items-center justify-center bg-[#1b1a55] dark:bg-indigo-600 hover:bg-[#2b2980] dark:hover:bg-indigo-750 text-white font-semibold text-sm tracking-wider px-8 py-3.5 transition-colors duration-200 select-none uppercase shadow-md"
            >
              Read more
            </Link>
          </motion.div>

          {/* Right Column: School Assembly Image */}
          <motion.div 
            className="lg:col-span-5 relative w-full flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="relative overflow-hidden border border-slate-200/50 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full">
              <img 
                src="/school-assembly.jpg" 
                alt="Eklavya Ashramschool Assembly" 
                className="w-full h-auto aspect-[16/10] object-cover hover:scale-[1.015] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
