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

  const achievements = [
    { year: '1998', title: 'Established the Welfare Trust', desc: 'Registered Shri Gagangiri Adivasi Shikshan Prasarak Sanstha Jamsar to spearhead education in Jawhar.' },
    { year: '2004', title: 'Primary Learning Centers', desc: 'Established non-formal educational camps in distant forest hamlets for tribal children.' },
    { year: '2006', title: 'Inauguration of Eklavya Ashramschool', desc: 'Acquired lands and built the first batch of classrooms for Hiradpada residential school.' },
    { year: '2012', title: 'State Tribal Welfare Recognition', desc: 'Honored by the government of Maharashtra for contributions to tribal literacy.' },
    { year: '2019', title: 'Tribal Higher Education Drive', desc: 'Successfully launched the Junior College wing (Grades 11 & 12) for Arts & Science streams.' }
  ];

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
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Trust Leadership</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Our Founder
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto rounded-full" />
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
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
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Founder Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Shri. Chinmay Raut</h2>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mt-1">Founder President</span>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">{schoolContact.trustName}</span>
              </div>
              
              <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-6 grid grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CSR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">80G Tax Exempt</span>
                </div>
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

        {/* Vision details cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Compassionate Care</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Focusing not just on test grades, but on providing high-protein diets, medical desks, and safe residential hostels for boys and girls.</p>
          </GlassCard>

          <GlassCard className="p-6 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Educational Vision</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Providing high-grade computer training, English literacy classes, and sports coaching to help tribal kids clear state board examinations with flying colors.</p>
          </GlassCard>

          <GlassCard className="p-6 text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Socio-Economic Bridge</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Empowering tribal communities by producing future engineers, teachers, and athletes who can break the cycle of poverty and uplift their families.</p>
          </GlassCard>
        </section>

        {/* Timeline of Achievements */}
        <section className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Founder's Timeline of Action</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Important trust accomplishments under leadership</p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32">
            {achievements.map((item, idx) => (
              <div 
                key={idx}
                className="relative mb-8 last:mb-0 pl-8 md:pl-0"
              >
                <div className="hidden md:block absolute -left-32 w-24 text-right pr-6 font-extrabold text-sm text-amber-500">
                  {item.year}
                </div>

                <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-amber-500 flex items-center justify-center z-10 shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>

                <div className="md:ml-12 bg-white/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm">
                  <span className="inline-flex md:hidden items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3">
                    {item.year}
                  </span>
                  
                  <h4 className="text-sm font-extrabold text-slate-850 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
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

export default AboutFounderPage;
