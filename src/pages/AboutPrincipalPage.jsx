import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Quote, ShieldAlert, Sparkles, BookOpen, Compass, Award } from 'lucide-react';

const AboutPrincipalPage = () => {
  const leadershipPhilosophy = [
    { title: "Student-First Leadership", desc: "Every administrative decision centers around student health, mental well-being, and safe residential support." },
    { title: "Equal Opportunity Learning", desc: "Enforcing modern smart-class methodologies to ensure tribal children access materials matching urban schools." },
    { title: "Empathetic Mentorship", desc: "Operating hostels under high standards of residential boarding care, ensuring children feel respected and safe." }
  ];

  const educationalGoals = [
    { target: "100% Exams Pass Rate", detail: "Improving the final examination grade averages via structured coaching and support programs." },
    { target: "Digital Literacy for All", desc: "Empowering every secondary/high-school student with desktop programming and typing capabilities." },
    { target: "Sports Talent Scouting", desc: "Discovering athletic, running, and archery talent in tribal kids and placing them in state sports academy selections." }
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
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">School Administration</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Our Principal
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Message, leadership philosophy, and educational goals from the desk of the Principal.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 space-y-20">
        
        {/* Principal Profile and Message */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Profile Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 blur-xl rounded-3xl animate-pulse" />
            <GlassCard className="p-8 text-center space-y-6 relative border-slate-200 dark:border-slate-800">
              <div className="w-48 h-48 rounded-full border-4 border-indigo-500/30 overflow-hidden mx-auto shadow-lg relative group">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Principal Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight font-sans">Mrs. Shanti Swaroop</h2>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mt-1">Principal & Hindi Literature Head</span>
                <span className="text-[10px] text-slate-500 font-bold block mt-1">25+ Years of Educational Leadership</span>
              </div>
              
              <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-6 text-left space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400">QUALIFICATION:</span>
                  <span className="text-slate-700 dark:text-slate-200">M.A. in Literature, B.Ed</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400">OFFICE CONTACT:</span>
                  <span className="text-slate-750 dark:text-slate-200">principal@eklavya.org</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Message Section */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Principal's Desk Message
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              "We strive to foster an educational environment where tribal students can build robust futures with pride and capability."
            </h3>

            <div className="relative pl-8 border-l-2 border-indigo-500/30 text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed space-y-4">
              <Quote className="absolute top-0 left-2 w-6 h-6 text-indigo-500/20 rotate-180" />
              <p>
                Welcome to Eklavya Primary, Secondary Ashramschool and Junior College Hiradpada. As the leader of this residential academy, I feel honored to mentor 480+ tribal boys and girls from rural residential homes.
              </p>
              <p>
                Our objective is to deliver comprehensive growth: combining academic excellence with vocational readiness and sports discoverability. Backed by donor resources and state welfare departments, we operate digital rooms, modern math setups, and a sports center.
              </p>
              <p>
                We maintain high boarding standards in our hostels, providing clean hydration, medical desks, and balanced high-protein meals so that our students can focus entirely on learning, programming, and sports.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Philosophy */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Leadership Philosophy</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Foundational values guiding our administrative policies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipPhilosophy.map((p, idx) => (
              <GlassCard key={idx} className="p-6 text-left space-y-3 hover:border-indigo-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase tracking-wider">{p.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Educational Goals */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Educational Goals</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Strategic targets we pursue for student development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationalGoals.map((g, idx) => (
              <GlassCard key={idx} className="p-6 text-left space-y-3 hover:border-indigo-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase tracking-wider">{g.target}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{g.desc || g.detail}</p>
              </GlassCard>
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

export default AboutPrincipalPage;
