import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import ScrollToTop from '../components/common/ScrollToTop';
import { 
  Users, 
  UserPlus,
  LayoutGrid,
  List,
  TrendingUp,
  Award
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';

const StudentsPage = () => {
  const { studentCounts, classStudents } = useSchoolData();
  const [activeTab, setActiveTab] = useState('all'); // all, primary, secondary, college
  const [viewMode, setViewMode] = useState('grid'); // grid, table

  // Map classStudents data (from DB) to match the template field names
  const studentData = (classStudents || []).map(item => ({
    id: item.id,
    grade: item.grade,
    englishGrade: item.english_grade,
    boys: item.boys,
    girls: item.girls,
    total: item.total,
    section: item.section
  }));

  // Totals calculations
  const totalBoys = studentData.reduce((sum, item) => sum + item.boys, 0);
  const totalGirls = studentData.reduce((sum, item) => sum + item.girls, 0);
  const totalStudents = studentData.reduce((sum, item) => sum + item.total, 0);

  const filteredData = studentData.filter(item => {
    if (activeTab === 'all') return true;
    return item.section === activeTab;
  });

  // Section totals
  const sectionTotalStudents = filteredData.reduce((sum, item) => sum + item.total, 0);
  const sectionTotalBoys = filteredData.reduce((sum, item) => sum + item.boys, 0);
  const sectionTotalGirls = filteredData.reduce((sum, item) => sum + item.girls, 0);

  const tabs = [
    { id: 'all', label: 'सर्व वर्ग (All Classes)' },
    { id: 'primary', label: 'प्राथमिक विभाग (Grades 1-7)' },
    { id: 'secondary', label: 'माध्यमिक विभाग (Grades 8-10)' },
    { id: 'college', label: 'कनिष्ठ महाविद्यालय (Grades 11-12)' }
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
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Enrollment details</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            पटसंख्या (Student Strength)
          </h1>
          <div className="h-1 w-16 bg-[#1b1a55] dark:bg-indigo-500 mx-auto rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Eklavya Ashramschool class-wise enrollment numbers for Primary, Secondary, and Higher Secondary divisions.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 sm:py-20 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {/* Card 1: Total Student Strength */}
          <GlassCard className="p-6 border-slate-200/60 dark:border-slate-800/80 shadow-md relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-slate-100 dark:text-slate-900/40 w-24 h-24 pointer-events-none group-hover:scale-110 transition-transform duration-300">
              <Users className="w-full h-full opacity-50 dark:opacity-20" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-650 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">एकूण पटसंख्या (Total Strength)</h4>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{totalStudents}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">Currently enrolled residential pupils</p>
          </GlassCard>

          {/* Card 2: Total Boys */}
          <GlassCard className="p-6 border-slate-200/60 dark:border-slate-800/80 shadow-md relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-blue-100 dark:text-blue-950/20 w-24 h-24 pointer-events-none">
              <UserPlus className="w-full h-full opacity-30 dark:opacity-10" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5" />
            </div>
            <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">एकूण मुले (Total Boys)</h4>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{totalBoys}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {((totalBoys / totalStudents) * 100).toFixed(1)}% of total enrollment
            </p>
          </GlassCard>

          {/* Card 3: Total Girls */}
          <GlassCard className="p-6 border-slate-200/60 dark:border-slate-800/80 shadow-md relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-pink-100 dark:text-pink-950/20 w-24 h-24 pointer-events-none">
              <UserPlus className="w-full h-full opacity-30 dark:opacity-10" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5" />
            </div>
            <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1">एकूण मुली (Total Girls)</h4>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{totalGirls}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {((totalGirls / totalStudents) * 100).toFixed(1)}% of total enrollment
            </p>
          </GlassCard>
        </section>

        {/* Gender Balance Chart/Slider bar */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 rounded-[24px] shadow-sm text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-855 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                स्त्री-पुरुष पटसंख्या प्रमाण (Gender Distribution Balance)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Perfectly balanced gender ratios reflecting equal access to boarding education.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold font-mono">
              <span className="text-blue-500">मुले (Boys): {((totalBoys / totalStudents) * 100).toFixed(1)}%</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-pink-500">मुली (Girls): {((totalGirls / totalStudents) * 100).toFixed(1)}%</span>
            </div>
          </div>

          {/* Balanced Bar representation */}
          <div className="w-full h-6 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden flex shadow-inner border border-slate-200/20">
            <div 
              style={{ width: `${(totalBoys / totalStudents) * 100}%` }} 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-500 relative group transition-all duration-500"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{totalBoys}</span>
            </div>
            <div 
              style={{ width: `${(totalGirls / totalStudents) * 100}%` }} 
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 relative group transition-all duration-500"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{totalGirls}</span>
            </div>
          </div>
        </section>

        {/* Yearly Strength History Section */}
        {studentCounts && studentCounts.length > 0 && (
          <section className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">वार्षिक पटसंख्या इतिहास (Yearly Strength History)</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Historical summary of student enrollment numbers by academic year</p>
              <div className="h-0.5 w-12 bg-[#1b1a55] dark:bg-indigo-500 mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {studentCounts.map((item) => (
                <GlassCard key={item.id} className="p-6 hover:border-indigo-500/20 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-sm font-black text-indigo-650 dark:text-indigo-400 font-mono">{item.academic_year}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 font-bold text-slate-600 dark:text-slate-400">Academic Year</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-blue-50/50 dark:bg-blue-950/10 p-2.5 rounded-xl border border-blue-100/30">
                      <span className="text-[10px] text-blue-500 font-bold uppercase block mb-1">मुले (Boys)</span>
                      <span className="text-base font-black text-slate-850 dark:text-white font-mono">{item.boys}</span>
                    </div>
                    <div className="bg-pink-50/50 dark:bg-pink-950/10 p-2.5 rounded-xl border border-pink-100/30">
                      <span className="text-[10px] text-pink-500 font-bold uppercase block mb-1">मुली (Girls)</span>
                      <span className="text-base font-black text-slate-850 dark:text-white font-mono">{item.girls}</span>
                    </div>
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-2.5 rounded-xl border border-indigo-100/30">
                      <span className="text-[10px] text-indigo-500 font-bold uppercase block mb-1">एकूण (Total)</span>
                      <span className="text-base font-black text-indigo-650 dark:text-indigo-400 font-mono">{item.total}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* Tab Selection & Layout Controls Row */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-850 pb-5">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-indigo-650 dark:bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">मांडणी (View):</span>
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                title="Table List View"
              >
                <List className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Section Totals Sub-banner */}
        {activeTab !== 'all' && (
          <div className="w-full bg-[#FFF8E7] dark:bg-yellow-950/20 text-yellow-900 dark:text-yellow-250 py-3.5 px-6 rounded-2xl border border-yellow-200/30 text-left text-xs font-bold flex flex-wrap gap-4 items-center justify-between shadow-sm">
            <span>
              निवडलेला विभाग पटसंख्या (Selected Section Strength):
            </span>
            <div className="flex items-center gap-4 text-xs font-mono font-black">
              <span>एकूण (Total): {sectionTotalStudents}</span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400">मुले (Boys): {sectionTotalBoys}</span>
              <span>•</span>
              <span className="text-pink-600 dark:text-pink-400">मुली (Girls): {sectionTotalGirls}</span>
            </div>
          </div>
        )}

        {/* Main Content Display Area */}
        <section className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              // GRID VIEW
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left"
              >
                {filteredData.map((item) => {
                  const boysPercent = ((item.boys / item.total) * 100).toFixed(0);
                  const girlsPercent = ((item.girls / item.total) * 100).toFixed(0);
                  
                  return (
                    <GlassCard 
                      key={item.id} 
                      className="p-5 flex flex-col justify-between hover:border-indigo-500/20 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="space-y-4">
                        {/* Title of Class */}
                        <div className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <h4 className="text-base font-extrabold text-slate-855 dark:text-white leading-tight">
                              {item.grade}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              {item.englishGrade}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center font-black text-xs text-indigo-650 dark:text-indigo-400 shadow-inner">
                            {item.total}
                          </div>
                        </div>

                        {/* Boys & Girls Count Breakdown */}
                        <div className="space-y-2 text-xs font-semibold">
                          <div className="flex justify-between text-slate-600 dark:text-slate-450">
                            <span className="flex items-center gap-1.5 text-blue-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              मुले (Boys)
                            </span>
                            <span className="font-bold font-mono">{item.boys}</span>
                          </div>
                          <div className="flex justify-between text-slate-600 dark:text-slate-450">
                            <span className="flex items-center gap-1.5 text-pink-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                              मुली (Girls)
                            </span>
                            <span className="font-bold font-mono">{item.girls}</span>
                          </div>
                        </div>
                      </div>

                      {/* Mini balance line */}
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-950 mt-4 overflow-hidden flex border border-slate-200/10">
                        <div style={{ width: `${boysPercent}%` }} className="h-full bg-blue-400" />
                        <div style={{ width: `${girlsPercent}%` }} className="h-full bg-pink-400" />
                      </div>
                    </GlassCard>
                  );
                })}
              </motion.div>
            ) : (
              // TABLE VIEW
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-md"
              >
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs font-semibold">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                        <th className="px-6 py-4 pl-8 text-center w-20">अनुक्रम (Sr. No.)</th>
                        <th className="px-6 py-4">इयत्ता / तुकडी (Class / Section)</th>
                        <th className="px-6 py-4">इंग्रजी वर्ग (Grade Title)</th>
                        <th className="px-6 py-4 text-center text-blue-500 w-32">मुले (Boys)</th>
                        <th className="px-6 py-4 text-center text-pink-500 w-32">मुली (Girls)</th>
                        <th className="px-6 py-4 text-center text-indigo-600 dark:text-indigo-400 w-36 pl-8">एकूण (Total Enrollment)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-350">
                      {filteredData.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors font-bold">
                          <td className="px-6 py-4 pl-8 text-center text-slate-400 font-mono">{idx + 1}</td>
                          <td className="px-6 py-4 text-slate-900 dark:text-white text-sm">{item.grade}</td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">{item.englishGrade}</td>
                          <td className="px-6 py-4 text-center font-mono text-slate-800 dark:text-slate-200">{item.boys}</td>
                          <td className="px-6 py-4 text-center font-mono text-slate-800 dark:text-slate-200">{item.girls}</td>
                          <td className="px-6 py-4 text-center font-mono text-indigo-650 dark:text-indigo-400 font-black text-sm bg-indigo-50/10 dark:bg-indigo-950/5 pl-8">{item.total}</td>
                        </tr>
                      ))}
                      
                      {/* Sub-total summary row inside filtered lists */}
                      {activeTab !== 'all' && (
                        <tr className="bg-slate-50/50 dark:bg-slate-950/30 font-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800">
                          <td className="px-6 py-4 pl-8 text-center text-slate-400 font-mono">#</td>
                          <td className="px-6 py-4 uppercase tracking-wider text-xs">विभाग एकूण (Section Total)</td>
                          <td className="px-6 py-4 text-xs text-slate-450 font-bold">Sub-total Count</td>
                          <td className="px-6 py-4 text-center font-mono text-blue-600 dark:text-blue-400 text-sm">{sectionTotalBoys}</td>
                          <td className="px-6 py-4 text-center font-mono text-pink-600 dark:text-pink-400 text-sm">{sectionTotalGirls}</td>
                          <td className="px-6 py-4 text-center font-mono text-indigo-600 dark:text-indigo-400 text-base bg-indigo-50/35 dark:bg-indigo-950/15 pl-8">{sectionTotalStudents}</td>
                        </tr>
                      )}

                      {/* Grand Total row displayed when viewing ALL classes */}
                      {activeTab === 'all' && (
                        <tr className="bg-slate-100/40 dark:bg-slate-950/60 font-black text-slate-900 dark:text-white border-t-2 border-slate-200 dark:border-slate-800">
                          <td className="px-6 py-4 pl-8 text-center text-slate-400 font-mono">★</td>
                          <td className="px-6 py-4 uppercase tracking-wider text-xs font-black">एकूण (Grand Total)</td>
                          <td className="px-6 py-4 text-xs text-slate-450 font-bold">Total Strength Summary</td>
                          <td className="px-6 py-4 text-center font-mono text-blue-600 dark:text-blue-400 text-sm">{totalBoys}</td>
                          <td className="px-6 py-4 text-center font-mono text-pink-600 dark:text-pink-400 text-sm">{totalGirls}</td>
                          <td className="px-6 py-4 text-center font-mono text-indigo-650 dark:text-indigo-400 text-base bg-indigo-50/40 dark:bg-indigo-950/20 pl-8">{totalStudents}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      <Footer />
      <ThemeSwitcher />
      <ScrollToTop />
    </div>
  );
};

export default StudentsPage;
