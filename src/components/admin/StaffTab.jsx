import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, Plus, Image as ImageIcon, Users, Briefcase, GraduationCap, Mail, FileText } from 'lucide-react';
import Button from '../common/Button';

const StaffTab = () => {
  const { faculty, addFaculty, deleteFaculty } = useSchoolData();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [qualification, setQualification] = useState('');
  const [type, setType] = useState('primary'); // 'primary' or 'secondary'
  const [category, setCategory] = useState('principal'); // 'school_section' or 'ashramschool'
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
  const [isReadingFile, setIsReadingFile] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size exceeds 2MB limit. Please select a smaller file.', 'error');
        e.target.value = null; // Reset input
        return;
      }
      
      setIsReadingFile(true);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setUrl(reader.result); // Sets the url state to the Base64 data URL
        setIsReadingFile(false);
      };
      
      reader.onerror = () => {
        showToast('Error reading file. Please try again.', 'error');
        setIsReadingFile(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isReadingFile) {
      showToast('Please wait while your portrait photo is being processed.', 'info');
      return;
    }
    
    if (!name.trim()) {
      showToast('Staff name is required.', 'error');
      return;
    }
    if (!role.trim()) {
      showToast('Designation/Role is required.', 'error');
      return;
    }
    if (!url.trim()) {
      showToast('Portrait image file or URL is required.', 'error');
      return;
    }

    try {
      await addFaculty({
        name: name.trim(),
        role: role.trim(),
        qualification: qualification.trim() || 'B.Sc / B.A., B.Ed',
        email: null,
        bio: null,
        type,
        category,
        image: url.trim()
      });

      showToast('New staff member added successfully!', 'success');
      
      // Reset Form
      setName('');
      setRole('');
      setQualification('');
      setType('primary');
      setCategory('principal');
      setUrl('');
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.message || 'Failed to save to database.';
      showToast(`Upload failed: ${errMsg}`, 'error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Upload/Add Form */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl h-fit">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          Add Staff Member
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Full Name</label>
            <input 
              type="text"
              required
              placeholder="e.g. Mr. Chinmay Raut"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Designation & Role</label>
              <input 
                type="text"
                required
                placeholder="e.g. Science Teacher"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Qualification</label>
              <input 
                type="text"
                placeholder="e.g. B.Sc, B.Ed"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Staff Class Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="primary">Primary Staff (Grades 1-7)</option>
                <option value="secondary">Secondary Staff (Grades 8-12)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">School Section</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="principal">Principal</option>
                <option value="school_section">School Section</option>
                <option value="ashramschool">Hostel Section</option>
              </select>
            </div>
          </div>

          {/* Email and Biography fields removed */}

          {/* Portrait source selection */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Portrait Source</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setUploadType('file'); setUrl(''); }}
                className={`py-1.5 text-xs font-bold border rounded-xl transition-all duration-300 cursor-pointer ${
                  uploadType === 'file'
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold'
                    : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800'
                }`}
              >
                Local Image File
              </button>
              <button
                type="button"
                onClick={() => { setUploadType('url'); setUrl(''); }}
                className={`py-1.5 text-xs font-bold border rounded-xl transition-all duration-300 cursor-pointer ${
                  uploadType === 'url'
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-650 dark:text-indigo-400 font-extrabold'
                    : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800'
                }`}
              >
                Web Image URL
              </button>
            </div>
          </div>

          {/* Photo inputs */}
          {uploadType === 'file' ? (
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Select Portrait Image</label>
              <input 
                type="file"
                accept="image/*"
                required={!url}
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Image URL</label>
              <input 
                type="url"
                required={!url}
                placeholder="https://images.unsplash.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          )}

          {/* Preview */}
          {url && (
            <div className="mt-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Portrait Preview</label>
              <div className="w-24 h-24 rounded-full border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner relative group">
                <img src={url} alt="Staff Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            size="sm" 
            className="w-full font-bold"
            disabled={isReadingFile}
          >
            {isReadingFile ? 'Reading Photo file...' : 'Save Staff Member'}
          </Button>
        </form>
      </div>

      {/* Directory list */}
      <div className="lg:col-span-7 space-y-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Active Staff Members ({faculty?.length || 0} Records)
        </h3>

        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          {faculty && faculty.map((member) => (
            <div 
              key={member.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 flex-shrink-0">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                {/* Info */}
                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-black text-slate-800 dark:text-white leading-none">
                      {member.name}
                    </h4>
                    <span className={`px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-full border ${
                      member.type === 'primary' 
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-250 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400' 
                        : 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-250 dark:border-purple-900/40 text-purple-600 dark:text-purple-400'
                    }`}>
                      {member.type} Staff
                    </span>
                    <span className={`px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-full border ${
                      member.category === 'principal' 
                        ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-250 dark:border-purple-900/40 text-purple-650 dark:text-purple-400'
                        : member.category === 'school_section' 
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-255 dark:border-amber-900/40 text-amber-600 dark:text-amber-400' 
                          : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {member.category === 'principal' ? 'Principal' : member.category === 'school_section' ? 'School Sec' : 'Ashramschool'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-indigo-650 dark:text-indigo-400 font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{member.role}</span>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {member.qualification || 'B.Sc / B.A., B.Ed'}
                    </span>
                    {member.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={async () => {
                  if (window.confirm(`Are you sure you want to remove ${member.name}?`)) {
                    try {
                      await deleteFaculty(member.id);
                      showToast('Staff record deleted successfully.', 'info');
                    } catch (err) {
                      console.error(err);
                      const errMsg = err.response?.data?.error || err.message || 'Failed to delete from database.';
                      showToast(`Deletion failed: ${errMsg}`, 'error');
                    }
                  }
                }}
                className="text-xs font-bold text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border-none bg-transparent self-end sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          ))}
          {(!faculty || faculty.length === 0) && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-3xl text-slate-400 text-xs font-semibold">
              No staff records configured in database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffTab;
