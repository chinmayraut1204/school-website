import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import ContentTab from '../components/admin/ContentTab';
import AnnouncementsTab from '../components/admin/AnnouncementsTab';
import NeedsTab from '../components/admin/NeedsTab';
import GalleryTab from '../components/admin/GalleryTab';
import CampusLifeTab from '../components/admin/CampusLifeTab';
import ResultsTab from '../components/admin/ResultsTab';
import InfrastructureTab from '../components/admin/InfrastructureTab';
import StaffTab from '../components/admin/StaffTab';
import StudentCountsTab from '../components/admin/StudentCountsTab';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return <ContentTab />;

      case 'announcements':
        return <AnnouncementsTab />;
      case 'needs':
        return <NeedsTab />;
      case 'gallery':
        return <GalleryTab />;
      case 'campus-life':
        return <CampusLifeTab />;
      case 'infrastructure':
        return <InfrastructureTab />;
      case 'results':
        return <ResultsTab />;
      case 'staff':
        return <StaffTab />;
      case 'student-counts':
        return <StudentCountsTab />;

      default:
        return <ContentTab />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Sidebar - Desktop Layout */}
      <div className="hidden md:block h-full">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Sidebar Drawer - Mobile Layout */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Sliding Sidebar Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden shadow-2xl h-full"
            >
              <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setSidebarOpen(false); // Auto close drawer
                }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Administrative Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Navigation Bar */}
        <AdminNavbar 
          activeTab={activeTab} 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />

        {/* Dashboard Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950/40 transition-colors">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
