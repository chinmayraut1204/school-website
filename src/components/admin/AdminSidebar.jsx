import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Megaphone, 
  Image as ImageIcon, 
  Home, 
  LogOut,
  Award
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'content', name: 'School Content', icon: <FileText className="w-5 h-5" /> },
    { id: 'announcements', name: 'Announcements', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'gallery', name: 'Gallery Manager', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'campus-life', name: 'Sponsors', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-400 flex flex-col justify-between h-full py-6">
      {/* Header Logo */}
      <div className="px-6 mb-8 text-left">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="Shri Gagangiri Trust Logo" 
            className="w-11 h-11 rounded-xl object-contain bg-white border border-slate-800 p-0.5 shadow-md"
          />
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-wider text-slate-100">
              Eklavya Admin
            </span>
            <span className="text-[9px] text-slate-500 font-bold">
              Trust Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Tabs Menu */}
      <nav className="flex-grow px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
              ${activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                : 'hover:bg-slate-800/60 hover:text-slate-200'
              }
            `}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 pt-6 border-t border-slate-800 space-y-1">
        <Link 
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800/60 hover:text-slate-200 transition-colors"
        >
          <Home className="w-5 h-5" />
          Landing Home
        </Link>
        <button
          onClick={() => {
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
