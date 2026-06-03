import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSchoolData } from '../context/SchoolDataContext';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Mail, GraduationCap, Briefcase, Filter } from 'lucide-react';

const FacultyPage = () => {
  const { faculty } = useSchoolData();
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Language & Lit', 'Science & Math', 'Creative Arts', 'PE & Sports'];

  // Map qualifications and departments dynamically
  const getFacultyMeta = (id) => {
    switch (id) {
      case 'fac-1':
        return { qualification: 'M.A. (Literature), B.Ed', dept: 'Language & Lit' };
      case 'fac-2':
        return { qualification: 'M.Sc (Physics), B.Ed', dept: 'Science & Math' };
      case 'fac-3':
        return { qualification: 'M.A. (English), D.Ed', dept: 'Creative Arts' };
      case 'fac-4':
        return { qualification: 'B.P.Ed (Physical Education)', dept: 'PE & Sports' };
      default:
        return { qualification: 'B.Sc / B.A., B.Ed', dept: 'Science & Math' };
    }
  };

  const filteredFaculty = faculty.map(member => ({
    ...member,
    ...getFacultyMeta(member.id)
  })).filter(member => selectedDept === 'All' || member.dept === selectedDept);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Our Educators</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Meet Our Faculty
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Highly certified and compassionate teachers guiding tribal student development.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 space-y-12">
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Filter Department</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`
                  px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-300
                  ${selectedDept === dept 
                    ? 'bg-indigo-650 dark:bg-indigo-600 border-indigo-650 text-white shadow-lg shadow-indigo-500/10' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }
                `}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaculty.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="h-full flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300">
                  <div className="space-y-4">
                    {/* Portrait Image */}
                    <div className="aspect-square rounded-2xl overflow-hidden relative shadow-inner">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold uppercase rounded-lg bg-slate-950/80 text-emerald-400 backdrop-blur-md">
                        {member.dept}
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="space-y-2 px-1">
                      <h3 className="font-extrabold text-slate-850 dark:text-white text-base leading-tight">
                        {member.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 font-bold">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{member.role.split(' & ')[0]}</span>
                      </div>

                      <div className="flex items-start gap-1.5 text-[11px] text-slate-500 font-semibold leading-relaxed pt-1">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span>{member.qualification}</span>
                      </div>

                      <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed pt-2">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Mail footer */}
                  <div className="border-t border-slate-100 dark:border-slate-850 pt-4 mt-6 px-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold">CONTACT</span>
                    <a 
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-650 dark:text-indigo-400 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Desk
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredFaculty.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-sm font-semibold">
            No educators listed under "{selectedDept}" department.
          </div>
        )}

      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default FacultyPage;
