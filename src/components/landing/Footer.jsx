import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Heart, Send, Globe, Mail, ArrowUpRight, HelpCircle, FileText } from 'lucide-react';

const Footer = () => {
  const { totalRaised, schoolStats, schoolContact } = useSchoolData();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed to newsletter updates successfully!', 'success');
    setEmail('');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-8 border-t border-slate-900 relative z-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[35vw] h-[35vw] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Column 1: Info & Stats */}
        <div className="md:col-span-4 flex flex-col items-start text-left gap-5">
          <Link to="/" onClick={handleScrollToTop} className="flex items-center gap-3 group">
            <img 
              src="/logo.jpg" 
              alt="Shri Gagangiri Trust Logo" 
              className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-800 p-0.5 shadow-md"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-wider uppercase text-white group-hover:text-indigo-400 transition-colors">
                Eklavya Campus
              </span>
              <span className="text-[9px] text-slate-500 font-medium">
                Ashramschool & Junior College
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Empowering tribal (Adivasi) residential school children in Jawhar, Palghar with modern science labs, computer rooms, high-protein meals, and scholarships under {schoolContact.trustName}.
          </p>
          
          {/* Active stats display */}
          <div className="flex items-center gap-6 mt-2">
            <div className="text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Raised Funds</span>
              <span className="text-sm font-extrabold text-emerald-400">₹{totalRaised.toLocaleString()}</span>
            </div>
            <div className="w-[1px] h-8 bg-slate-800" />
            <div className="text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Active Learners</span>
              <span className="text-sm font-extrabold text-indigo-400">{schoolStats.totalStudents}+ Students</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-2 flex flex-col items-start text-left gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Navigation</h4>
          <ul className="text-xs space-y-2 font-medium">
            {['About', 'Stats', 'Faculty', 'Activities', 'Gallery', 'Testimonials', 'FAQ', 'Contact'].map((link) => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Legal & Resources */}
        <div className="md:col-span-2 flex flex-col items-start text-left gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Resources</h4>
          <ul className="text-xs space-y-2 font-medium">
            <li className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Tax Exemption (80G)
            </li>
            <li className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Annual Audit Report
            </li>
            <li className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              Volunteer Portal
            </li>
            <li className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              State Education Board
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter sign-up */}
        <div className="md:col-span-4 flex flex-col items-start text-left gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Stay Updated</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to our quarterly newsletter reports for details on student progress, newly inaugurated smart classrooms, and library logs.
          </p>
          <form onSubmit={handleSubscribe} className="w-full mt-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              aria-label="Subscribe"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Copy row */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row gap-4 items-center justify-between text-left text-[11px] text-slate-600">
        <div>
          © {new Date().getFullYear()} {schoolContact.schoolName}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Use</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">CSR Regulations</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
