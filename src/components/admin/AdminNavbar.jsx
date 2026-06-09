import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, Bell, User } from 'lucide-react';

const AdminNavbar = ({ activeTab, setSidebarOpen, sidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  const getTitle = () => {
    switch (activeTab) {
      case 'content': return 'Content Management';
      case 'admissions': return 'Admissions Manager';
      case 'announcements': return 'Announcement Board';
      case 'needs': return 'School Needs Manager';
      case 'gallery': return 'Gallery Media Manager';
      case 'campus-life': return 'Sponsors';
      case 'infrastructure': return 'Campus Infrastructure';
      case 'staff': return 'Staff Manager';
      case 'student-counts': return 'Student Data Manager';
      default: return 'Admin Desk';
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Tab Title / Mobile Collapse trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
          {getTitle()}
        </h1>
      </div>

      {/* Control panel */}
      <div className="flex items-center gap-4">
        {/* Light/Dark Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Admin Desk</span>
            <span className="text-[10px] text-slate-400">Principal Office</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
