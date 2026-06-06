import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { Award, Heart, HelpCircle, Users, CheckCircle2 } from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

const SponsorsPage = () => {
  const { sponsors } = useSchoolData();

  // Helper to add contribution metadata dynamically
  const getSponsorMeta = (logoText) => {
    switch (logoText) {
      case 'EGF':
        return { cat: 'Gold Partner', scope: 'Infrastructure Support', desc: 'Sponsoring smart classroom boards, visual desks, and solar power arrays.' };
      case 'FTS':
        return { cat: 'Technology Partner', scope: 'Digital Literacy', desc: 'Providing desktop computer systems, programming manuals, and lab software.' };
      case 'CHT':
        return { cat: 'Silver Partner', scope: 'Residential Welfare', desc: 'Contributing dormitory cupboards, hostel lighting fixtures, and filtration kits.' };
      case 'APEX':
        return { cat: 'Logistics Partner', scope: 'Supply Chain support', desc: 'Ensuring weekly supply of books, science kits, and sports accessories.' };
      case 'SSE':
        return { cat: 'Eco-Green Partner', scope: 'Clean campus energy', desc: 'Configuring rooftop solar systems to support round-the-clock power to ICT labs.' };
      case 'PFC':
        return { cat: 'Nutrition Partner', scope: 'Student Protein Diet', desc: 'Funding daily balanced hostel nutrition packs, milk, and seasonal fruits.' };
      default:
        return { cat: 'Associate Partner', scope: 'General Welfare Fund', desc: 'Supporting scholarship funds and local sports trial travel costs.' };
    }
  };

  const formattedSponsors = sponsors.map(s => ({
    ...s,
    ...getSponsorMeta(s.logoText)
  }));

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
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">CSR Partnerships</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            Our Partners & Sponsors
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Corporate Social Responsibility (CSR) collaborators powering Eklavya Ashramschool digital models.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10 space-y-24">
        
        {/* Sponsors list grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Active Corporates & Foundations</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Powering our academic classrooms, athletic coaching, and boarding hostel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {formattedSponsors.map((spon, idx) => (
              <GlassCard key={spon.id} className="p-6 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
                <div className="space-y-4">
                  {/* Mock corporate logo */}
                  <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-slate-200/50 dark:border-slate-850 shadow-inner group">
                    <span className="text-2xl font-black text-indigo-650 dark:text-indigo-400 tracking-widest opacity-80 group-hover:scale-105 transition-transform">
                      {spon.logoText}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-850 dark:text-white text-base leading-tight">
                      {spon.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-500 tracking-wider pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{spon.scope}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
                      {spon.desc}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-850 pt-4 mt-6 flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>CATEGORY:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{spon.cat}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Corporate sponsorship tiers explanation */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-8 sm:p-10 rounded-[32px] text-left shadow-sm">
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">CSR Sponsorship Tiers</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We offer structured CSR partnership opportunities under Section 135 rules, providing tax exemptions under Section 80G. Invest in tribal education and track your contributions in real-time.
            </p>

            <ul className="space-y-3.5 text-xs font-semibold text-slate-650 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>**Infrastructure Sponsorship**: Solar power setups, ICT laboratories, or hostel beds.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>**Student Nutrition**: Fund monthly balanced diets, hostel groceries, or milk packs.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>**Safety Scholarships**: Sponsoring school books, uniforms, or PE trials travel.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-850">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-rose-400 text-rose-500 animate-pulse" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">A Heartfelt Thank You</h4>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
              We extend our deep gratitude to our institutional partners and individual CSR contributors. Your donations provide residential hostel safety, high-grade education materials, and digital capabilities to 480+ tribal children.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default SponsorsPage;
