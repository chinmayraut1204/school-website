import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, Plus, Image as ImageIcon, X, ZoomIn, FileText } from 'lucide-react';
import Button from '../common/Button';

const CampusLifeTab = () => {
  const { campusLife, addCampusLifeItem, deleteCampusLifeItem } = useSchoolData();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [activeImage, setActiveImage] = useState(null); // Holds the item selected for Lightbox preview

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isReadingFile) {
      showToast('Please wait while your image is being processed.', 'info');
      return;
    }
    
    if (!title.trim()) {
      showToast('Card title is required.', 'error');
      return;
    }
    if (!url.trim()) {
      showToast('Image file or URL is required.', 'error');
      return;
    }

    addCampusLifeItem({
      title: title.trim(),
      description: description.trim(),
      url: url.trim()
    });

    showToast('New Sponsor card added successfully!', 'success');
    setTitle('');
    setDescription('');
    setUrl('');
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Upload Box Form */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl h-fit">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-indigo-500" />
          Add Sponsor Card
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Slide Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Science Exhibition 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Short Description</label>
            <textarea 
              rows="3"
              placeholder="e.g. Students demonstrating robotics projects to guests."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Toggle local file vs web image URL */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Upload Source</label>
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

          {/* Input field based on toggle */}
          {uploadType === 'file' ? (
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Select Image File</label>
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
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Image Asset URL</label>
              <input 
                type="url"
                required={!url}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          )}

          {/* Image Thumbnail Preview */}
          {url && (
            <div className="mt-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Thumbnail Preview</label>
              <div className="w-full h-36 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner relative group">
                <img src={url} alt="Upload Preview" className="w-full h-full object-cover" />
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
            {isReadingFile ? 'Reading Image file...' : 'Save Sponsor Slide'}
          </Button>
        </form>
      </div>

      {/* Directory listing */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Active Sponsors ({campusLife.length} Items)
        </h3>

        {campusLife.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-3xl text-slate-400 text-xs font-semibold">
            No sponsors configured. Seed defaults will display.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campusLife.map(item => (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                <div className="flex items-start gap-3 p-4 text-left">
                  {/* Visual Thumbnail */}
                  <div 
                    onClick={() => setActiveImage(item)}
                    className="w-16 h-16 overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-950 cursor-zoom-in relative rounded-xl border border-slate-200/50 dark:border-slate-850"
                    title="Click to view image"
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-850 dark:text-slate-100 line-clamp-1" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {item.description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-850 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Delete slide card "${item.title}"?`)) {
                        deleteCampusLifeItem(item.id);
                        showToast('Slide card removed successfully.', 'info');
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all rounded-lg flex items-center gap-1.5 text-[10px] font-bold"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Slide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Lightbox Overlay */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none cursor-zoom-out animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image & Caption Box */}
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center gap-4 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeImage.url} 
              alt={activeImage.title} 
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="text-center text-white max-w-xl">
              <h3 className="text-sm sm:text-base font-bold mt-1">
                {activeImage.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusLifeTab;
