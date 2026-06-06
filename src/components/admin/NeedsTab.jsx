import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2 } from 'lucide-react';
import Button from '../common/Button';

const NeedsTab = () => {
  const { needs, addNeed, deleteNeed } = useSchoolData();
  const { showToast } = useToast();

  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      showToast('Need description cannot be empty.', 'error');
      return;
    }

    try {
      await addNeed({
        text: text.trim()
      });

      showToast('New school need added successfully!', 'success');
      setText('');
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to save to database.';
      showToast(`Adding need failed: ${errMsg}`, 'error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Create Need Form */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm h-fit">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider">
          Add New School Need
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Need Description</label>
            <textarea
              required
              placeholder="e.g. DSE CUT OFF 2025-26"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none resize-none"
            />
          </div>

          <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
            Add Need
          </Button>
        </form>
      </div>

      {/* Active Needs List */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Active School Needs Marquee Feed
        </h3>

        <div className="space-y-3">
          {needs && needs.map((need) => (
            <div 
              key={need.id}
              className="p-5 rounded-2xl border flex items-start justify-between gap-4 transition-all duration-300 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-250 dark:border-indigo-900/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{need.date}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                  {need.text}
                </p>
              </div>

              <button
                onClick={async () => {
                  try {
                    await deleteNeed(need.id);
                    showToast('School need deleted.', 'info');
                  } catch (err) {
                    console.error(err);
                    const errMsg = err.response?.data?.error || err.message || 'Failed to delete from database.';
                    showToast(`Deletion failed: ${errMsg}`, 'error');
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors flex-shrink-0"
                title="Delete Need"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
          {(!needs || needs.length === 0) && (
            <div className="text-xs text-slate-400 py-6 text-center">
              No active school needs. Add one on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeedsTab;
