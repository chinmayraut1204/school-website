import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import { Trash2, Eye, Search, Calendar, User, FileText, X, Phone, Mail, GraduationCap } from 'lucide-react';
import Button from '../common/Button';

const AdmissionsTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null); // Active application for full-detail modal
  const { showToast } = useToast();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admissions');
      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.error || err.message || 'Failed to load applications.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete the admission application of ${name}?`)) return;
    try {
      await api.delete(`/admissions/${id}`);
      showToast(`Application of ${name} deleted successfully.`, 'info');
      setApplications(prev => prev.filter(app => app.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete application record.', 'error');
    }
  };

  const getFullName = (app) => {
    return `${app.surname} ${app.first_name} ${app.father_name}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return dateStr;
    }
  };

  // Filter list based on search query
  const filteredApps = applications.filter(app => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = getFullName(app).toLowerCase();
    const email = (app.parent_email || '').toLowerCase();
    const mobile = (app.parent_mobile || '').toLowerCase();
    const branch = (app.branch || '').toLowerCase();
    return fullName.includes(searchLower) || email.includes(searchLower) || mobile.includes(searchLower) || branch.includes(searchLower);
  });

  return (
    <div className="space-y-6 text-left">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider">
            Admission Applications
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Review and manage student residential enrollment submissions.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-150 dark:border-indigo-900/40 px-4 py-2 rounded-2xl flex items-center gap-2 text-indigo-600 dark:text-indigo-400 select-none">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-bold font-mono">
            {applications.length} Total Submissions
          </span>
        </div>
      </div>

      {/* Controls: Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-4 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, parent phone, or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
        <button
          onClick={fetchApplications}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-755 hover:bg-slate-50 dark:hover:bg-slate-950/40 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer"
        >
          Refresh Data
        </button>
      </div>

      {/* Applications List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs font-semibold flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-indigo-650 border-t-transparent rounded-full animate-spin" />
            Loading submitted applications...
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs font-semibold flex flex-col items-center justify-center gap-2 select-none">
            <FileText className="w-10 h-10 text-slate-300 dark:text-slate-800" />
            No admission applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-semibold">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4 text-center">Branch & Year</th>
                  <th className="px-6 py-4">Parent Details</th>
                  <th className="px-6 py-4 text-right pr-6 w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-bold text-slate-700 dark:text-slate-350">
                {filteredApps.map((app) => {
                  const sName = getFullName(app);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors">
                      <td className="px-6 py-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {formatDate(app.submitted_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900 dark:text-white text-sm font-black">{sName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide">
                          Gender: {app.gender} • DOB: {app.dob}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/40">
                          {app.branch}
                        </span>
                        <div className="text-[10px] text-slate-400 font-bold mt-1">Year: {app.year}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-850 dark:text-slate-200 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {app.parent_mobile}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5 font-semibold">
                          <Mail className="w-3 h-3" />
                          {app.parent_email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-2 rounded-xl text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 text-[10px] font-black cursor-pointer border border-transparent hover:border-indigo-500/10"
                            title="View Full Application"
                          >
                            <Eye className="w-4 h-4" />
                            View Form
                          </button>
                          <button
                            onClick={() => handleDelete(app.id, sName)}
                            className="p-2 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FULL DETAIL MODAL OVERLAY */}
      {selectedApp && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10 rounded-t-3xl">
              <div>
                <span className="text-[10px] uppercase font-black text-indigo-500 tracking-widest">
                  Detailed Admission Profile
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-850 dark:text-white mt-0.5">
                  {getFullName(selectedApp)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable details wrapper */}
            <div className="p-6 overflow-y-auto space-y-8 text-xs font-semibold text-slate-600 dark:text-slate-350">
              
              {/* Section: Academic target */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Academic Year</span>
                  <span className="text-slate-900 dark:text-white text-sm font-black">{selectedApp.year}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Applying Branch</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm font-black uppercase">{selectedApp.branch}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">SSC / Class 10 Percentage</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black">{selectedApp.ssc_percentage}%</span>
                </div>
              </div>

              {/* Section: Student Profile Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider border-b border-slate-100 dark:border-slate-850 pb-1 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-500" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Surname</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.surname}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">First Name</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.first_name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Father Name</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.father_name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Mother Name</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.mother_name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Gender</span>
                    <span className="text-slate-900 dark:text-white uppercase">{selectedApp.gender}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Date of Birth</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.dob}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Place of Birth</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.place_of_birth || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Nationality</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.nationality}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Religion</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.religion}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Category</span>
                    <span className="text-slate-900 dark:text-white uppercase">{selectedApp.category}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Caste</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.caste || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Sub-Caste</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.sub_caste || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Section: Parent Contacts & Location */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider border-b border-slate-100 dark:border-slate-850 pb-1 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  Parent & Address Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Parent Full Name</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.parent_name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Relationship</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.parent_relationship || 'Father'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Parent Occupation</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.parent_occupation || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Native Place</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.native_place || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Parent Phone</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.parent_mobile}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Parent Email</span>
                    <span className="text-slate-900 dark:text-white">{selectedApp.parent_email}</span>
                  </div>
                </div>
                
                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Residential Address</span>
                    <p className="text-slate-800 dark:text-slate-200 text-xs font-semibold leading-relaxed">{selectedApp.residential_address}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Permanent Address</span>
                    <p className="text-slate-800 dark:text-slate-200 text-xs font-semibold leading-relaxed">{selectedApp.permanent_address}</p>
                  </div>
                </div>
              </div>

              {/* Section: Academic History */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider border-b border-slate-100 dark:border-slate-850 pb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  Academic History Records
                </h4>
                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-950 text-[9px] uppercase text-slate-400 border-b border-slate-150 dark:border-slate-850">
                        <th className="px-4 py-2">Examination Passed</th>
                        <th className="px-4 py-2">School/Board Name</th>
                        <th className="px-4 py-2 text-center">Passing Year</th>
                        <th className="px-4 py-2 text-center">Percentage / Marks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-850 dark:text-slate-200 font-bold">
                      {(() => {
                        let records = {};
                        try {
                          records = typeof selectedApp.academic_records === 'string'
                            ? JSON.parse(selectedApp.academic_records)
                            : selectedApp.academic_records || {};
                        } catch {
                          records = {};
                        }
                        
                        return ['ssc', 'eleventh'].map((examKey) => {
                          const record = records[examKey] || {};
                          return (
                            <tr key={examKey}>
                              <td className="px-4 py-2.5 font-black uppercase text-[10px] text-slate-400">
                                {examKey === 'ssc' ? 'Class 10 (SSC)' : 'Class 11 (FYJC)'}
                              </td>
                              <td className="px-4 py-2.5">{record.board || 'N/A'}</td>
                              <td className="px-4 py-2.5 text-center">{record.year || 'N/A'}</td>
                              <td className="px-4 py-2.5 text-center text-indigo-600 dark:text-indigo-400 font-black">
                                {record.marks ? `${record.marks}` : 'N/A'}
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section: Academic Subjects */}
              <div className="space-y-2">
                <h5 className="text-[10px] uppercase font-black text-slate-400 block mb-2 border-b border-slate-100 dark:border-slate-850 pb-1">
                  Requested Elective Subjects
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    let subjects = [];
                    try {
                      subjects = typeof selectedApp.subjects === 'string'
                        ? JSON.parse(selectedApp.subjects)
                        : selectedApp.subjects || [];
                    } catch {
                      subjects = [];
                    }
                    if (subjects.length === 0) return <span className="text-xs text-slate-400">No subjects selected.</span>;
                    return subjects.map((sub, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-2.5 py-1 rounded-xl text-xs text-slate-800 dark:text-slate-200">
                        {sub}
                      </span>
                    ));
                  })()}
                </div>
              </div>

              {/* Section: Declarations */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider border-b border-slate-100 dark:border-slate-850 pb-1">
                  Legal Certifications & Declarations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] leading-relaxed">
                  <div className="p-3 bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-150/40 dark:border-indigo-900/30 rounded-2xl">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">STUDENT NAME ATTESTATION</span>
                    "I, <span className="font-extrabold text-slate-900 dark:text-white">{selectedApp.student_name_declaration}</span>, declare that the above details are authentic. I promise to abide by all the residential hosteling rules and disciplines of Eklavya Ashramschool."
                  </div>
                  <div className="p-3 bg-purple-50/20 dark:bg-purple-950/10 border border-purple-150/40 dark:border-purple-900/30 rounded-2xl">
                    <span className="font-extrabold text-purple-600 dark:text-purple-400 block mb-1">PARENT RESPONSIBILITY ATTESTATION</span>
                    "I, <span className="font-extrabold text-slate-900 dark:text-white">{selectedApp.parent_name_declaration}</span>, certify that my ward has submitted correct information. I accept complete responsibility for coordinating with school desk and ensuring child's academic compliance."
                  </div>
                </div>
              </div>

              {/* Section: Attached Documents (Base64 / URL Links) */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider border-b border-slate-100 dark:border-slate-850 pb-1">
                  Uploaded Document Assets
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(() => {
                    let docs = {};
                    try {
                      docs = typeof selectedApp.documents === 'string'
                        ? JSON.parse(selectedApp.documents)
                        : selectedApp.documents || {};
                    } catch {
                      docs = {};
                    }

                    const labels = {
                      ssc_marksheet: 'SSC Marksheet (Class 10)'
                    };

                    return Object.entries(labels).map(([key, label]) => {
                      const fileData = docs[key] || (key === 'ssc_marksheet' ? docs.sscMarksheet : undefined);
                      if (!fileData) {
                        return (
                          <div key={key} className="p-3 bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 rounded-2xl text-center text-slate-400 flex flex-col items-center justify-center gap-1">
                            <span className="text-[10px] font-black uppercase text-slate-400">{label}</span>
                            <span className="text-[9px] font-bold">Not uploaded</span>
                          </div>
                        );
                      }

                      const isBase64 = fileData.startsWith('data:');
                      const linkHref = isBase64 ? fileData : fileData;
                      
                      return (
                        <div key={key} className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col justify-between gap-3 shadow-inner">
                          <div className="text-left">
                            <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block">{label}</span>
                            <span className="text-[8px] font-bold text-emerald-500 uppercase mt-0.5 block">File Attached</span>
                          </div>
                          
                          {/* Image preview for photo/signature if base64 */}
                          {isBase64 && (key === 'photo' || key === 'signature') ? (
                            <div className="w-full h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                              <img src={fileData} alt={label} className="w-full h-full object-contain bg-slate-50" />
                            </div>
                          ) : (
                            <div className="w-full h-16 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200/50 dark:border-slate-850">
                              <FileText className="w-6 h-6 text-slate-400" />
                            </div>
                          )}

                          <a
                            href={linkHref}
                            download={`${getFullName(selectedApp).replace(/\s+/g, '_')}_${key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200/30 dark:border-indigo-900/40 rounded-xl text-[10px] text-indigo-650 dark:text-indigo-400 font-extrabold uppercase decoration-none cursor-pointer"
                          >
                            Open / Download File
                          </a>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center sticky bottom-0 bg-white dark:bg-slate-900 rounded-b-3xl">
              <span className="text-[9px] text-slate-400 font-mono">ID: {selectedApp.id}</span>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => setSelectedApp(null)}
                >
                  Close Profile
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold border-none"
                  onClick={() => handleDelete(selectedApp.id, getFullName(selectedApp))}
                >
                  Delete Profile
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsTab;
