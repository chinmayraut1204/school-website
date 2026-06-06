import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSchoolData } from '../context/SchoolDataContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { 
  GraduationCap, 
  Search, 
  FileDown, 
  Calendar, 
  ExternalLink,
  ClipboardList,
  AlertCircle
} from 'lucide-react';

const ResultsPage = () => {
  const { results, loading } = useSchoolData();
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const openPDF = (pdfSource) => {
    if (!pdfSource) return;
    try {
      if (pdfSource.startsWith('data:application/pdf;base64,')) {
        const base64Data = pdfSource.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL, '_blank');
      } else {
        window.open(pdfSource, '_blank');
      }
    } catch (err) {
      console.error('Error opening PDF:', err);
      showToast('This PDF attachment is corrupted, truncated, or invalid.', 'error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // Filter logic
  const filteredResults = results.filter(res => {
    const matchesSearch = 
      res.standard_division.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.name_of_examination.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-10 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Academic Portal</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight tracking-tight">
            EXAMINATION <span className="text-indigo-400">RESULTS BOARD</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Search, filter, and view the latest academic results, board sheets, and regular class assessment notifications.
          </p>
        </div>
      </section>

      {/* Main Results Board Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 space-y-8">
        
        {/* Search Row */}
        <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-250/30 dark:border-slate-800/80 p-4 rounded-3xl shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by Standard, Division or Exam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Results Table Section */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-xs font-bold uppercase mt-4 tracking-wider">Loading results board...</p>
          </div>
        ) : (
          <GlassCard className="border border-slate-200/40 dark:border-slate-800/40 overflow-hidden shadow-xl">
            {filteredResults.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ClipboardList className="w-12 h-12 text-slate-350 dark:text-slate-700 mx-auto" />
                <h3 className="text-sm font-extrabold text-slate-750 dark:text-slate-200">No Results Found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any results matching "{searchQuery}". Try refining your standard title or division search terms.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                      <tr className="bg-slate-100/60 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold">
                      <th className="px-6 py-4 font-black text-[11px] sm:text-xs text-center w-20">Sr. No.</th>
                      <th className="px-6 py-4 font-black text-[11px] sm:text-xs">Standard / Division</th>
                      <th className="px-6 py-4 font-black text-[11px] sm:text-xs">Name of Examination</th>
                      <th className="px-6 py-4 font-black text-[11px] sm:text-xs">Result Date</th>
                    </tr>
                  </thead>
                  
                  <motion.tbody 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="divide-y divide-slate-200 dark:divide-slate-800/80 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {filteredResults.map((res, index) => (
                      <motion.tr 
                        key={res.id} 
                        variants={itemVariants}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-950/20 transition-colors group"
                      >
                        <td className="px-6 py-4.5 text-center font-mono font-bold text-slate-400 dark:text-slate-500">
                          {index + 1}
                        </td>
                        
                        <td className="px-6 py-4.5 font-bold text-slate-900 dark:text-white">
                          {res.standard_division}
                        </td>
                        
                        <td className="px-6 py-4.5 font-bold text-slate-750 dark:text-slate-300">
                          {res.pdf_url ? (
                            <button 
                              onClick={() => openPDF(res.pdf_url)}
                              className="text-indigo-650 hover:text-indigo-850 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline inline-flex items-center gap-1.5 cursor-pointer text-left focus:outline-none"
                              title="Click to View PDF Result Sheet"
                            >
                              <span>{res.name_of_examination}</span>
                              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ) : (
                            <span>{res.name_of_examination}</span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4.5 text-slate-500 dark:text-slate-400 font-mono">
                          {res.result_date}
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            )}
          </GlassCard>
        )}


      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default ResultsPage;
