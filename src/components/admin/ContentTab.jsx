import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { FileText, Award, Layers } from 'lucide-react';
import Button from '../common/Button';

const ContentTab = () => {
  const { schoolContent, schoolStats, updateSchoolContent, updateSchoolStats } = useSchoolData();
  const { showToast } = useToast();

  const [about, setAbout] = useState(schoolContent.about);
  const [mission, setMission] = useState(schoolContent.mission);
  const [vision, setVision] = useState(schoolContent.vision);

  const [students, setStudents] = useState(schoolStats.totalStudents);
  const [teachers, setTeachers] = useState(schoolStats.teachersCount);
  const [passRate, setPassRate] = useState(schoolStats.passRate);
  const [smartRooms, setSmartRooms] = useState(schoolStats.smartClassrooms);

  const handleSaveText = (e) => {
    e.preventDefault();
    updateSchoolContent({
      about,
      mission,
      vision
    });
    showToast('School descriptions updated successfully!', 'success');
  };

  const handleSaveStats = (e) => {
    e.preventDefault();
    const parsedStudents = parseInt(students, 10);
    const parsedTeachers = parseInt(teachers, 10);
    const parsedPass = parseFloat(passRate);
    const parsedSmart = parseInt(smartRooms, 10);

    if (isNaN(parsedStudents) || isNaN(parsedTeachers) || isNaN(parsedPass) || isNaN(parsedSmart)) {
      showToast('Please enter valid numeric figures.', 'error');
      return;
    }

    updateSchoolStats({
      totalStudents: parsedStudents,
      teachersCount: parsedTeachers,
      passRate: parsedPass,
      smartClassrooms: parsedSmart
    });

    showToast('School metrics dashboard updated!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
      {/* Narrative Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm space-y-6">
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
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Mission Mission statement</label>
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

      {/* Numeric Stats Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 text-emerald-500" />
            Core Academic Statistics
          </h3>

          <form onSubmit={handleSaveStats} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Students</label>
                <input
                  type="number"
                  required
                  value={students}
                  onChange={(e) => setStudents(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Teachers</label>
                <input
                  type="number"
                  required
                  value={teachers}
                  onChange={(e) => setTeachers(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Exams Pass Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={passRate}
                  onChange={(e) => setPassRate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Smart Classrooms</label>
                <input
                  type="number"
                  required
                  value={smartRooms}
                  onChange={(e) => setSmartRooms(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" variant="secondary" size="sm" className="w-full font-bold">
              Update Dashboard Metrics
            </Button>
          </form>
        </div>

        {/* Informative notice box */}
        <div className="mt-6 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-[10px] font-medium leading-relaxed text-slate-500 dark:text-slate-400">
          💡 Updating these fields will immediately update the live counters, graphs, and ratio trackers displayed on the main school landing page for active public visitors.
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
