import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';
import { Trash2, Plus, GraduationCap, AlertCircle, Pencil, X } from 'lucide-react';

const ClassStudentsTab = () => {
  const { classStudents, addClassStudent, updateClassStudent, deleteClassStudent } = useSchoolData();
  const { showToast } = useToast();

  const [grade, setGrade] = useState('');
  const [englishGrade, setEnglishGrade] = useState('');
  const [boys, setBoys] = useState('');
  const [girls, setGirls] = useState('');
  const [section, setSection] = useState('primary');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterSection, setFilterSection] = useState('all');

  const resetForm = () => {
    setGrade('');
    setEnglishGrade('');
    setBoys('');
    setGirls('');
    setSection('primary');
    setSortOrder('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!grade.trim()) {
      showToast('Grade name (Marathi) is required.', 'error');
      return;
    }
    if (!englishGrade.trim()) {
      showToast('English grade name is required.', 'error');
      return;
    }
    if (boys === '' || parseInt(boys, 10) < 0) {
      showToast('Boys count must be 0 or greater.', 'error');
      return;
    }
    if (girls === '' || parseInt(girls, 10) < 0) {
      showToast('Girls count must be 0 or greater.', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        grade: grade.trim(),
        english_grade: englishGrade.trim(),
        boys: parseInt(boys, 10),
        girls: parseInt(girls, 10),
        section,
        sort_order: sortOrder ? parseInt(sortOrder, 10) : 0
      };

      if (editingId) {
        await updateClassStudent(editingId, payload);
        showToast('Class record updated successfully!', 'success');
      } else {
        await addClassStudent(payload);
        showToast('New class record added!', 'success');
      }
      resetForm();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.error || err.message || 'Failed to save record.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteClassStudent(id);
      showToast(`"${name}" removed successfully.`, 'info');
      if (editingId === id) resetForm();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete record.', 'error');
    }
  };

  const handleEdit = (item) => {
    setGrade(item.grade);
    setEnglishGrade(item.english_grade);
    setBoys(item.boys.toString());
    setGirls(item.girls.toString());
    setSection(item.section);
    setSortOrder(item.sort_order?.toString() || '');
    setEditingId(item.id);
    showToast(`Editing "${item.english_grade}". Update and save.`, 'info');
  };

  const filteredData = filterSection === 'all'
    ? classStudents
    : classStudents.filter(item => item.section === filterSection);

  const sectionLabels = {
    primary: 'प्राथमिक (Primary)',
    secondary: 'माध्यमिक (Secondary)',
    college: 'कनिष्ठ महाविद्यालय (Jr College)'
  };

  const sectionColors = {
    primary: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
    secondary: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
    college: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Form Section */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl h-fit shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {editingId ? 'Edit Class Record' : 'Add Class Record'}
            </h3>
          </div>
          {editingId && (
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors"
              title="Cancel Editing"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Grade Name — Marathi (इयत्ता)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. १ली (अ)"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Grade Name — English
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1st Standard (A)"
              value={englishGrade}
              onChange={(e) => setEnglishGrade(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Boys (मुले)
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="Count"
                value={boys}
                onChange={(e) => setBoys(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Girls (मुली)
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="Count"
                value={girls}
                onChange={(e) => setGirls(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Section (विभाग)
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
              >
                <option value="primary">Primary (1-7)</option>
                <option value="secondary">Secondary (8-10)</option>
                <option value="college">Jr College (11-12)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Sort Order (क्रम)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Display order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          {/* Automatic Total Preview */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Calculated Total (एकूण):</span>
            <span className="text-slate-900 dark:text-white font-mono text-sm">
              {(parseInt(boys, 10) || 0) + (parseInt(girls, 10) || 0)}
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="w-full font-bold pt-3 pb-3"
            disabled={loading}
          >
            {loading
              ? (editingId ? 'Updating...' : 'Adding...')
              : (editingId ? 'Update Class Record' : 'Add Class Record')
            }
          </Button>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-left">
            Class-wise Enrollment Records
          </h3>
          {/* Filter */}
          <div className="flex items-center gap-1.5">
            {['all', 'primary', 'secondary', 'college'].map(f => (
              <button
                key={f}
                onClick={() => setFilterSection(f)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  filterSection === f
                    ? 'bg-indigo-650 dark:bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80'
                }`}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
          {!filteredData || filteredData.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              No class records found. Add one on the left.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-semibold">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="px-4 py-3.5 text-center w-12">#</th>
                    <th className="px-4 py-3.5">इयत्ता (Class)</th>
                    <th className="px-4 py-3.5">English</th>
                    <th className="px-4 py-3.5 text-center w-16">Section</th>
                    <th className="px-4 py-3.5 text-center text-blue-500 w-16">Boys</th>
                    <th className="px-4 py-3.5 text-center text-pink-500 w-16">Girls</th>
                    <th className="px-4 py-3.5 text-center bg-indigo-50/10 dark:bg-indigo-950/5 w-16">Total</th>
                    <th className="px-4 py-3.5 text-right pr-4 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-bold text-slate-700 dark:text-slate-350">
                  {filteredData.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors ${editingId === item.id ? 'bg-indigo-50/30 dark:bg-indigo-950/10' : ''}`}
                    >
                      <td className="px-4 py-3 text-center text-slate-400 font-mono text-[10px]">
                        {item.sort_order || idx + 1}
                      </td>
                      <td className="px-4 py-3 text-slate-900 dark:text-white text-sm">
                        {item.grade}
                      </td>
                      <td className="px-4 py-3 text-[11px] text-slate-500 dark:text-slate-400">
                        {item.english_grade}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sectionColors[item.section] || 'bg-slate-100 text-slate-500'}`}>
                          {item.section}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-650 dark:text-slate-300">
                        {item.boys}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-650 dark:text-slate-300">
                        {item.girls}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-indigo-650 dark:text-indigo-400 font-black bg-indigo-50/10 dark:bg-indigo-950/5">
                        {item.total}
                      </td>
                      <td className="px-4 py-3 text-right pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
                            title="Edit Record"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.english_grade)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Totals Row */}
                  <tr className="bg-slate-50/50 dark:bg-slate-950/30 font-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800">
                    <td className="px-4 py-3 text-center text-slate-400 font-mono">★</td>
                    <td className="px-4 py-3 uppercase tracking-wider text-[10px]" colSpan={3}>
                      {filterSection === 'all' ? 'Grand Total (एकूण)' : `${filterSection} Total`}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-blue-600 dark:text-blue-400">
                      {filteredData.reduce((sum, i) => sum + i.boys, 0)}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-pink-600 dark:text-pink-400">
                      {filteredData.reduce((sum, i) => sum + i.girls, 0)}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-indigo-650 dark:text-indigo-400 font-black bg-indigo-50/20 dark:bg-indigo-950/10">
                      {filteredData.reduce((sum, i) => sum + i.total, 0)}
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassStudentsTab;
