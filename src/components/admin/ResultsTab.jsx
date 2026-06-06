import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, Plus, Upload, FileText, Calendar, GraduationCap, X, ExternalLink } from 'lucide-react';
import Button from '../common/Button';

const ResultsTab = () => {
  const { results, addResult, deleteResult } = useSchoolData();
  const { showToast } = useToast();

  const [standardDivision, setStandardDivision] = useState('');
  const [nameOfExamination, setNameOfExamination] = useState('');
  const [resultDate, setResultDate] = useState(() => {
    // Default to today's date in YYYY-MM-DD for date input
    return new Date().toISOString().split('T')[0];
  });
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const openPDF = (pdfSource) => {
    if (!pdfSource) return;
    try {
      if (pdfSource.startsWith('data:application/pdf;base64,')) {
        const base64Data = pdfSource.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL, '_blank');
      } else {
        window.open(pdfSource, '_blank');
      }
    } catch (err) {
      console.error('Error opening PDF:', err);
      showToast('This PDF attachment is corrupted, truncated, or invalid.', 'error');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showToast('Please select a valid PDF document.', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
      showToast('PDF file size exceeds the 2MB limit.', 'error');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPdfUrl(event.target.result);
      showToast('Result PDF uploaded and processed successfully!', 'success');
    };
    reader.onerror = () => {
      showToast('Error reading PDF file.', 'error');
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setPdfUrl('');
    setFileName('');
    const fileInput = document.getElementById('result-pdf-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!standardDivision.trim()) {
      showToast('Standard / Division is required.', 'error');
      return;
    }
    if (!nameOfExamination.trim()) {
      showToast('Name of Examination is required.', 'error');
      return;
    }
    if (!resultDate) {
      showToast('Result date is required.', 'error');
      return;
    }

    // Format date from YYYY-MM-DD to DD/MM/YYYY for the student-facing list
    const [year, month, day] = resultDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    try {
      await addResult({
        standard_division: standardDivision.trim(),
        name_of_examination: nameOfExamination.trim(),
        result_date: formattedDate,
        pdf_url: pdfUrl || null
      });

      showToast('Result published successfully!', 'success');
      
      // Reset Form
      setStandardDivision('');
      setNameOfExamination('');
      setResultDate(new Date().toISOString().split('T')[0]);
      clearFile();
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to save to database.';
      showToast(`Publication failed: ${errMsg}`, 'error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* Publish Result Card */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm h-fit">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Publish New Result
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Standard & Division</label>
            <input
              type="text"
              required
              placeholder="e.g. XII - Science (Div A)"
              value={standardDivision}
              onChange={(e) => setStandardDivision(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Name of Examination</label>
            <input
              type="text"
              required
              placeholder="e.g. HSC BOARD EXAM - REGULAR MARCH 2026"
              value={nameOfExamination}
              onChange={(e) => setNameOfExamination(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Result Publication Date</label>
            <div className="relative">
              <input
                type="date"
                required
                value={resultDate}
                onChange={(e) => setResultDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Attach Result Sheet PDF (Optional)</label>
            {!pdfUrl ? (
              <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 transition-colors text-center cursor-pointer">
                <input
                  type="file"
                  id="result-pdf-upload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-1">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-500">Upload Result PDF</span>
                  <span className="text-[9px] text-slate-400">Max size: 2MB</span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-slate-950/60 border border-indigo-200/50 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-indigo-650 dark:text-indigo-400 min-w-0">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold truncate max-w-[200px]">
                    {fileName || 'result_attachment.pdf'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900 hover:text-slate-600 transition-colors"
                  title="Remove File"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <Button type="submit" variant="primary" size="sm" className="w-full font-bold pt-3 pb-3">
            Publish Results Row
          </Button>
        </form>
      </div>

      {/* Results List Card */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Currently Published Results
        </h3>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-semibold">
              No results published yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold">
                    <th className="px-4 py-3.5 pl-6 font-extrabold text-[10px]">Standard / Div</th>
                    <th className="px-4 py-3.5 font-extrabold text-[10px]">Name of Examination</th>
                    <th className="px-4 py-3.5 font-extrabold text-[10px]">Date</th>
                    <th className="px-4 py-3.5 font-extrabold text-[10px] text-center">Attachment</th>
                    <th className="px-4 py-3.5 pr-6 text-right font-extrabold text-[10px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                  {results.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors">
                      <td className="px-4 py-3.5 pl-6 font-bold text-slate-800 dark:text-white">
                        {res.standard_division}
                      </td>
                      <td className="px-4 py-3.5 max-w-[200px] truncate" title={res.name_of_examination}>
                        {res.pdf_url ? (
                          <button
                            onClick={() => openPDF(res.pdf_url)}
                            className="text-indigo-650 hover:text-indigo-850 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline cursor-pointer font-bold text-left focus:outline-none"
                            title="Click to View Result PDF"
                          >
                            {res.name_of_examination}
                          </button>
                        ) : (
                          res.name_of_examination
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 font-mono">
                        {res.result_date}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {res.pdf_url ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase">
                            PDF
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-400 text-[9px] font-black uppercase">
                            None
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 pr-6 text-right">
                        <button
                          onClick={async () => {
                            try {
                              await deleteResult(res.id);
                              showToast('Result record deleted.', 'info');
                            } catch (err) {
                              console.error(err);
                              const errMsg = err.response?.data?.error || err.message || 'Failed to delete from database.';
                              showToast(`Deletion failed: ${errMsg}`, 'error');
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default ResultsTab;
