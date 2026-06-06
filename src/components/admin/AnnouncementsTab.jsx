import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, Send, Plus } from 'lucide-react';
import Button from '../common/Button';

const AnnouncementsTab = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useSchoolData();
  const { showToast } = useToast();

  const [text, setText] = useState('');
  const [type, setType] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      showToast('Announcement content cannot be empty.', 'error');
      return;
    }

    try {
      await addAnnouncement({
        text: text.trim(),
        type
      });

      showToast('New announcement published successfully!', 'success');
      setText('');
      setType('info');
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to save to database.';
      showToast(`Publishing failed: ${errMsg}`, 'error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Create Announcement Form */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm h-fit">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider">
          Publish New Announcement
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Alert Text Message</label>
            <textarea
              required
              placeholder="e.g. 🏆 Our school won the regional debating championship!"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Badge Priority Highlight</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'info', name: 'Info Blue', bg: 'border-indigo-500/30 text-indigo-500' },
                { id: 'success', name: 'Success Green', bg: 'border-emerald-500/30 text-emerald-500' },
                { id: 'warning', name: 'Warning Orange', bg: 'border-amber-500/30 text-amber-500' }
              ].map(t => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`
                    py-2 text-[10px] font-bold border rounded-lg transition-all duration-300
                    ${type === t.id
                      ? 'bg-slate-900 dark:bg-slate-950 border-slate-950 dark:border-indigo-500 text-white dark:text-indigo-400 font-extrabold shadow-sm'
                      : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800'
                    }
                  `}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
            Publish Notice
          </Button>
        </form>
      </div>

      {/* Active Bulletins Grid */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Active Notices Marquee Feed
        </h3>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div 
              key={ann.id}
              className={`
                p-5 rounded-2xl border flex items-start justify-between gap-4 transition-all duration-300
                ${ann.type === 'success' ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-900/40' :
                  ann.type === 'warning' ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-250 dark:border-amber-900/40' :
                  'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-250 dark:border-indigo-900/40'
                }
              `}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    ann.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    ann.type === 'warning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {ann.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{ann.date}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                  {ann.text}
                </p>
              </div>

              <button
                onClick={async () => {
                  try {
                    await deleteAnnouncement(ann.id);
                    showToast('Announcement notice deleted.', 'info');
                  } catch (err) {
                    console.error(err);
                    const errMsg = err.response?.data?.error || err.message || 'Failed to delete from database.';
                    showToast(`Deletion failed: ${errMsg}`, 'error');
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors flex-shrink-0"
                title="Delete Notice"
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

export default AnnouncementsTab;
