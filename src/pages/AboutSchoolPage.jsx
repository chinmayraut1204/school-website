import React from 'react';
import { motion } from 'framer-motion';
import { useSchoolData } from '../context/SchoolDataContext';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Landmark, Compass, Award, Calendar, Layers, ShieldCheck } from 'lucide-react';

const AboutSchoolPage = () => {
  const { schoolContent, schoolContact } = useSchoolData();

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
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-emerald-500/10 rounded-full blur-[140px]" />
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" 
            alt="School Campus Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Institutional Profile</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            About Our School
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover the legacy, mission, and learning infrastructure of Eklavya Ashramschool Hiradpada.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 space-y-24">
        
        {/* Core Narrative / Introduction */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Providing Quality Education to Tribal Children Since 2006
            </h2>
            <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed">
              {schoolContent.about}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 mt-0.5">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Boarding Facility</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">100% free residential rooms, meals, and medical desk for boys and girls.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Govt Aided</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Operating under the department of tribal welfare guidelines, ensuring high standards.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-emerald-500 opacity-20 blur-xl rounded-3xl" />
            <div className="relative aspect-[4/3] sm:aspect-[1.5] lg:aspect-square rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" 
                alt="Students studying in library" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Mission Card */}
          <GlassCard glowColor="rgba(99, 102, 241, 0.15)" className="p-8 group hover:border-indigo-500/30 text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Sacred Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {schoolContent.mission}
            </p>
          </GlassCard>

          {/* Vision Card */}
          <GlassCard glowColor="rgba(16, 185, 129, 0.15)" className="p-8 group hover:border-emerald-500/30 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {schoolContent.vision}
            </p>
          </GlassCard>
        </motion.section>

        {/* Infrastructure Details */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Campus Infrastructure</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Modern learning facilities helping tribal kids touch the digital skies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 text-left space-y-4">
              <div className="h-44 w-full rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80" 
                  alt="Computer Lab" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base">Computer & ICT Lab</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Equipped with desktop computer modules, power backup systems, and internet to provide coding, typing, and analytical tools.</p>
            </GlassCard>

            <GlassCard className="p-6 text-left space-y-4">
              <div className="h-44 w-full rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80" 
                  alt="Science Lab" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base">Modern Science Labs</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Practical setup for Chemistry, Physics, and Biology experiments, promoting experiential learning and discovery.</p>
            </GlassCard>

            <GlassCard className="p-6 text-left space-y-4">
              <div className="h-44 w-full rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80" 
                  alt="Smart Classrooms" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-base">Digital Smart Classrooms</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Equipped with digital projectors, audio setups, and visual learning libraries to make education interactive and fun.</p>
            </GlassCard>
          </div>
        </section>

        {/* History Timeline */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Our Historic Journey</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Key milestones of our residential academy</p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32">
            {(schoolContent.history || []).map((milestone, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="relative mb-12 last:mb-0 pl-8 md:pl-0"
              >
                <div className="hidden md:block absolute -left-32 w-24 text-right pr-6 font-extrabold text-lg text-indigo-650 dark:text-indigo-400">
                  {milestone.year}
                </div>

                <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 flex items-center justify-center z-10 shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                </div>

                <div className="md:ml-12 bg-white/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm">
                  <span className="inline-flex md:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {milestone.year}
                  </span>
                  
                  <h4 className="text-base font-extrabold text-slate-850 dark:text-white mb-2">{milestone.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default AboutSchoolPage;
