import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { FileText } from 'lucide-react';
import Button from '../common/Button';

const ContentTab = () => {
  const { schoolContent, updateSchoolContent } = useSchoolData();
  const { showToast } = useToast();

  const [about, setAbout] = useState(schoolContent.about);
  const [mission, setMission] = useState(schoolContent.mission);
  const [vision, setVision] = useState(schoolContent.vision);

  const handleSaveText = async (e) => {
    e.preventDefault();
    try {
      await updateSchoolContent({
        about,
        mission,
        vision
      });
      showToast('School descriptions updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to save to database.';
      showToast(`Update failed: ${errMsg}`, 'error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Narrative Section */}
      <div className="lg:col-span-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          School Descriptions & Narrative
        </h3>

        <form onSubmit={handleSaveText} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">About Narrative</label>
            <textarea
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-250 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Mission statement</label>
            <textarea
              required
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-250 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Vision Statement</label>
            <textarea
              required
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-250 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <Button type="submit" variant="primary" size="sm" className="w-full font-bold">
            Update Narrative
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContentTab;
