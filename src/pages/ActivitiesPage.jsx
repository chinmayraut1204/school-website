import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Award, Compass, BookOpen, Target, Calendar, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

const ActivitiesPage = () => {
  const { gallery } = useSchoolData();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'All Activities' },
    { id: 'academic', name: 'Academic' },
    { id: 'sports', name: 'Sports & Games' },
    { id: 'cultural', name: 'Cultural Events' }
  ];

  const activities = [
    {
      category: 'academic',
      title: 'Digital Literacy & Coding Bootcamps',
      date: 'Weekly Classes',
      desc: 'Students learn HTML, block programming, and basic computational logic inside our ICT laboratories.',
      icon: <BookOpen className="w-5 h-5" />,
      img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80'
    },
    {
      category: 'sports',
      title: 'District Level Archery Trials',
      date: 'October 2025',
      desc: 'Discovering traditional tribal archery talent and placing them into district coaching programs.',
      icon: <Target className="w-5 h-5" />,
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=80'
    },
    {
      category: 'cultural',
      title: 'Tribal Folk Dance & Music Assembly',
      date: 'January 2026',
      desc: 'Annual festival celebrating the rich cultural traditions, drumming, and Tarpa dances of the Warli community.',
      icon: <Sparkles className="w-5 h-5" />,
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80'
    },
    {
      category: 'academic',
      title: 'Chemistry & Physics Laboratory Fairs',
      date: 'December 2025',
      desc: 'Experiential science models demonstrated by high school classes, promoting practical understanding.',
      icon: <Compass className="w-5 h-5" />,
      img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=500&q=80'
    },
    {
      category: 'sports',
      title: 'Annual Athletic Relay Championship',
      date: 'February 2026',
      desc: 'Ashramschool athletes secured top medals in track and relay races in the Taluka school games.',
      icon: <Award className="w-5 h-5" />,
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredActivities = activeTab === 'all'
    ? activities
    : activities.filter(a => a.category === activeTab);

  // Gallery items for activities page (Sports + Events)
  const activityGallery = gallery.filter(item => item.category === 'Sports' || item.category === 'Events');

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
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Campus Vibrancy</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            School Activities
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Co-curricular excellence, traditional tribal heritage, sports, and science exhibitions.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 space-y-24">
        
        {/* Navigation Filters */}
        <div className="flex justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-300
                ${activeTab === cat.id 
                  ? 'bg-indigo-650 dark:bg-indigo-600 border-indigo-650 text-white shadow-lg shadow-indigo-500/10' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Timeline Layout of Activities */}
        <section className="max-w-5xl mx-auto relative pl-8 border-l border-slate-250 dark:border-slate-800 space-y-16 py-6 text-left">
          {filteredActivities.map((act, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-4 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 flex items-center justify-center z-10 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </div>

              {/* Text Card */}
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  {act.date}
                </span>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {act.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {act.desc}
                </p>
              </div>

              {/* Image Preview Container */}
              <div className="lg:col-span-5 relative aspect-video rounded-3xl overflow-hidden shadow-md border border-slate-200/50 dark:border-slate-800/40">
                <img src={act.img} alt={act.title} className="w-full h-full object-cover hover:scale-102 transition-transform" />
              </div>

            </motion.div>
          ))}
        </section>

        {/* Co-curricular Gallery showcase */}
        {activityGallery.length > 0 && (
          <section className="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Activity Snapshots</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Moments captured during our sports relay meets, music festivals, and programs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityGallery.map(item => (
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
        )}

      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default ActivitiesPage;
