import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Calendar, ArrowRight } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';
import GlassCard from '../common/GlassCard';

const About = () => {
  const { schoolContent } = useSchoolData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <section 
      id="about" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-0 w-[30vw] h-[30vw] bg-emerald-200/20 dark:bg-emerald-900/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 w-[35vw] h-[35vw] bg-indigo-200/20 dark:bg-indigo-900/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block"
          >
            Who We Are
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6"
          >
            Nurturing Minds, Building Leaders Since 1994
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto mb-6 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            {schoolContent.about}
          </motion.p>
        </div>

        {/* Mission & Vision Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {/* Mission Card */}
          <GlassCard glowColor="rgba(99, 102, 241, 0.2)" className="p-8 group hover:border-indigo-500/30">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Sacred Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {schoolContent.mission}
            </p>
          </GlassCard>

          {/* Vision Card */}
          <GlassCard glowColor="rgba(16, 185, 129, 0.2)" className="p-8 group hover:border-emerald-500/30">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {schoolContent.vision}
            </p>
          </GlassCard>
        </motion.div>

        {/* Timeline / History Block */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Historic Journey</h3>
            <p className="text-slate-500 text-xs mt-2">Key milestones that shaped our academy</p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32">
            {schoolContent.history.map((milestone, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="relative mb-12 last:mb-0 pl-8 md:pl-0"
              >
                {/* Year tag for larger screens */}
                <div className="hidden md:block absolute -left-32 w-24 text-right pr-6 font-extrabold text-lg text-indigo-600 dark:text-indigo-400">
                  {milestone.year}
                </div>

                {/* Timeline Node Point */}
                <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 dark:border-indigo-400 flex items-center justify-center z-10 shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                </div>

                {/* Content Box */}
                <div className="md:ml-12 bg-white/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  {/* Mobile Year Badge */}
                  <span className="inline-flex md:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {milestone.year}
                  </span>
                  
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                    {milestone.title}
                  </h4>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
