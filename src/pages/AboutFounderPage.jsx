import React from 'react';
import { motion } from 'framer-motion';
import { useSchoolData } from '../context/SchoolDataContext';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Quote, Sparkles, Award, Heart, CheckCircle2, Bookmark } from 'lucide-react';

const AboutFounderPage = () => {
  const { schoolContact } = useSchoolData();



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
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Trust Leadership</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Our Founder
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            The visionary behind Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 space-y-20">
        
        {/* Founder Profile & Message */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Profile Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500 to-indigo-500 opacity-20 blur-xl rounded-3xl animate-pulse" />
            <GlassCard className="p-8 text-center space-y-6 relative border-slate-200 dark:border-slate-800">
              <div className="w-48 h-48 rounded-full border-4 border-amber-500/30 overflow-hidden mx-auto shadow-lg relative group">
                <img 
                  src="/founder.jpg" 
                  alt="Founder Portrait" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Hon'ble Dilip Narayan Patekar</h2>
                <span className="text-xl font-black text-slate-700 dark:text-white leading-tight">Founder & Chairman</span>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar Tal : Jawhar, Dist : Palghar</span>
              </div>
            </GlassCard>
          </div>

          {/* Message Section */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              President's Address
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              "Education is the greatest tool for tribal empowerment and social justice."
            </h3>

            <div className="relative pl-8 border-l-2 border-amber-500/30 text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed space-y-4">
              <Quote className="absolute top-0 left-2 w-6 h-6 text-amber-500/20 rotate-180" />
              <p>
                Marginalized tribal (Adivasi) families in rural regions like Jawhar, Palghar have faced economic and literacy challenges for generations. Eklavya Ashramschool Hiradpada was founded with a singular focus: to bridge this digital and educational divide.
              </p>
              <p>
                We believe that financial constraints should never stand in the way of a child's imagination. By providing digital smart classrooms, fully equipped laboratories, and nourishing meals in a residential space, we help our kids cultivate their analytical capabilities and character.
              </p>
              <p>
                Your support, whether through infrastructure sponsorships or scholarship donations, provides these young minds with the resources to achieve high-school grades matching private schools and construct a self-reliant future.
              </p>
            </div>
          </div>
        </section>



      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default AboutFounderPage;
