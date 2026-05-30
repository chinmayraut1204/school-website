import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, PlusCircle, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const SponsorsTab = () => {
  const { sponsors, addSponsor, deleteSponsor } = useSchoolData();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [logoText, setLogoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Sponsor name is required.', 'error');
      return;
    }

    const initials = logoText.trim() || name.substring(0,3).toUpperCase();

    addSponsor({
      name: name.trim(),
      logoText: initials
    });

    showToast(`Partner ${name} successfully listed!`, 'success');
    setName('');
    setLogoText('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Form column */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl h-fit">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider">
          Add New Sponsor Logo
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Company / Partner Name</label>
            <input 
              type="text"
              required
              placeholder="e.g. Google India CSR"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Logo Initials (2-4 characters)</label>
            <input 
              type="text"
              placeholder="e.g. GGL"
              maxLength={4}
              value={logoText}
              onChange={(e) => setLogoText(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
            Record Sponsor Partner
          </Button>
        </form>
      </div>

      {/* Grid list column */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Active Sponsors Registry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sponsors.map(sponsor => (
            <div 
              key={sponsor.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                {/* Visual Initials Badge */}
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-black text-xs text-indigo-500">
                  {sponsor.logoText || sponsor.name.substring(0,2).toUpperCase()}
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-150">{sponsor.name}</h4>
                  <span className="text-[9px] text-slate-400">CSR Sponsor Partner</span>
                </div>
              </div>

              <button
                onClick={() => {
                  deleteSponsor(sponsor.id);
                  showToast('Sponsor partner removed.', 'info');
                }}
                className="p-2 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                title="Remove partner"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsTab;
