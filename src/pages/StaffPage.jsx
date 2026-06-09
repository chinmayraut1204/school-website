import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSchoolData } from '../context/SchoolDataContext';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Mail, GraduationCap, Briefcase } from 'lucide-react';

const StaffPage = ({ section }) => {
  const { faculty } = useSchoolData();

  const filteredFaculty = faculty.filter(member => {
    return member.type === section;
  });

  const principalStaff = filteredFaculty.filter(member => member.category === 'principal');
  const primarySchoolStaff = filteredFaculty.filter(member => (member.category || 'school_section') === 'school_section');
  const ashramSchoolStaff = filteredFaculty.filter(member => member.category === 'ashramschool');

  const groups = [
    {
      id: 'principal',
      title: 'Principal',
      colorClass: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/30',
      borderClass: 'border-slate-200 dark:border-slate-800',
      staff: principalStaff
    },
    {
      id: 'school_section',
      title: 'School Section',
      colorClass: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/30',
      borderClass: 'border-slate-200 dark:border-slate-800',
      staff: primarySchoolStaff
    },
    {
      id: 'ashramschool',
      title: 'Hostel Section',
      colorClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/30',
      borderClass: 'border-slate-200 dark:border-slate-800',
      staff: ashramSchoolStaff
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-28 pb-10 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Staff Directory</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            {section === 'primary' ? 'Primary School Staff' : 'Secondary School Staff'}
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {section === 'primary' 
              ? 'Dedicated primary teachers laying down strong learning foundations for Grades 1-7.' 
              : 'Experienced secondary and junior college educators guiding Grades 8-12.'}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 space-y-12">
        


        {/* Grouped Staff Listings */}
        <div className="space-y-16">
          {groups.map((group) => group.staff.length > 0 && (
            <div key={group.id} className="space-y-6">
              <div className={`flex items-center gap-3 border-b ${group.borderClass} pb-3 text-left`}>
                <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {group.title}
                </h2>
                <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${group.colorClass}`}>
                  {group.staff.length} {group.staff.length === 1 ? 'Educator' : 'Educators'}
                </span>
              </div>
              
              <motion.div 
                layout 
                className={group.id === 'principal' 
                  ? "flex justify-center text-left w-full" 
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
                }
              >
                <AnimatePresence mode="popLayout">
                  {group.staff.map((member) => (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className={group.id === 'principal' ? "w-full max-w-sm" : ""}
                    >
                      <div className="h-full flex flex-col justify-between py-4 px-2 transition-all duration-300">
                        <div className="space-y-4 flex flex-col items-center w-full">
                          {/* Portrait Image (Square Shape) */}
                          <div className="w-56 h-64 rounded-2xl overflow-hidden relative shadow-md border-2 border-slate-150 dark:border-slate-850/50 bg-slate-50 dark:bg-slate-950/40">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Member Info */}
                          <div className="space-y-2 text-center flex flex-col items-center w-full px-2">
                            <h3 className="font-extrabold text-slate-855 dark:text-white text-lg sm:text-xl leading-tight">
                              {member.name}
                            </h3>
                            
                            <div className="text-sm sm:text-base text-indigo-650 dark:text-indigo-400 font-bold">
                              {member.role.split(' & ')[0]}
                            </div>

                            <div className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                              {member.qualification}
                            </div>

                            {member.bio && (
                              <p className="text-xs sm:text-sm text-slate-450 dark:text-slate-400 leading-relaxed pt-1">
                                {member.bio}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Mail footer */}
                        {member.email && (
                          <div className="border-t border-slate-100 dark:border-slate-850 pt-4 mt-6 px-1 flex items-center justify-between w-full">
                            <span className="text-xs text-slate-400 font-bold">CONTACT</span>
                            <a 
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-650 dark:text-indigo-400 hover:underline"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Email Desk
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>

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

export default StaffPage;
