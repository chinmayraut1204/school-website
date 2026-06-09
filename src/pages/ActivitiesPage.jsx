import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { useSchoolData } from '../context/SchoolDataContext';
import campusGround from '../assets/campus_ground.jpg';

const ActivitiesPage = () => {
  const { gallery } = useSchoolData();

  return (
    <div 
      className="relative min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${campusGround})` }}
    >
      {/* Page-wide dark overlay */}
      <div className="absolute inset-0 bg-slate-950/70 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Hero Header */}
        <section className="relative pt-36 pb-20 text-white overflow-hidden bg-transparent">

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Campus Vibrancy</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            School Activities
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            Co-curricular excellence, traditional tribal heritage, sports, and science exhibitions.
          </p>
        </div>
      </section>

      {/* Main Content with solid background */}
      <div className="bg-slate-50 dark:bg-slate-950 relative z-20 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
        <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Co-curricular Gallery showcase */}
        {gallery && gallery.length > 0 ? (
          <section className="space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Activity Snapshots</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Moments captured during our sports relay meets, music festivals, and programs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map(item => (
                <div 
                  key={item.id}
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-sm group border border-slate-200/50 dark:border-slate-850"
                >
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-left">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 mb-0.5 tracking-wider">{item.category}</span>
                    <h4 className="text-xs font-bold text-white leading-relaxed">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-20 text-slate-400 text-xs font-semibold">
            No activities or snapshots available at this moment. Check back later!
          </div>
        )}
        </main>
      </div>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
      </div>
    </div>
  );
};

export default ActivitiesPage;
