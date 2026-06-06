import React, { useState } from 'react';
import { useSchoolData } from '../../context/SchoolDataContext';
import { useToast } from '../../context/ToastContext';
import { Trash2, Plus, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import Button from '../common/Button';

const categories = ['Classrooms', 'Labs', 'Sports', 'Events'];

const GalleryTab = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useSchoolData();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Classrooms');
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [activeImage, setActiveImage] = useState(null); // Holds the image selected for Lightbox
  const [selectedFilterCat, setSelectedFilterCat] = useState('All');

  const filteredGallery = selectedFilterCat === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedFilterCat);

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
      showToast('Please wait while your image is being processed.', 'info');
      return;
    }
    
    if (!title.trim()) {
      showToast('Image title is required.', 'error');
      return;
    }
    if (!url.trim()) {
      showToast('Image file or URL is required.', 'error');
      return;
    }

    try {
      await addGalleryItem({
        title: title.trim(),
        category,
        url: url.trim()
      });

      showToast('New campus image added to public gallery!', 'success');
      setTitle('');
      setUrl('');
      setCategory('Classrooms');
      
      // Reset file input
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
      {/* Upload Box Form */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl h-fit">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-indigo-500" />
          Add Image to Gallery
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Image Descriptive Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Science Fair Presentation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-805 dark:text-slate-205 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Category Tag</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-805 dark:text-slate-205 focus:outline-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Toggle local file vs web image URL */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Upload Source</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setUploadType('file'); setUrl(''); }}
                className={`py-1.5 text-xs font-bold border rounded-xl transition-all duration-300 ${
                  uploadType === 'file'
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-650 dark:text-indigo-400 font-extrabold'
                    : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800'
                }`}
              >
                Local Image File
              </button>
              <button
                type="button"
                onClick={() => { setUploadType('url'); setUrl(''); }}
                className={`py-1.5 text-xs font-bold border rounded-xl transition-all duration-300 ${
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-805 dark:text-slate-205 focus:outline-none"
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
            {isReadingFile ? 'Reading Image file...' : 'Record Campus Media'}
          </Button>
        </form>
      </div>

      {/* Media Directory listing */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Active Gallery Library ({filteredGallery.length} Images)
          </h3>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilterCat(cat)}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all duration-300 ${
                  selectedFilterCat === cat
                    ? 'bg-indigo-650 dark:bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredGallery.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-3xl text-slate-400 text-xs font-semibold">
            No images found in "{selectedFilterCat}" category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGallery.map(item => (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {/* Visual Thumbnail with zoom-in cursor click to open */}
                  <div 
                    onClick={() => setActiveImage(item)}
                    className="w-16 h-16 overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-950 cursor-zoom-in relative group/thumb"
                    title="Click to view image"
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="text-left pr-4">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-150 line-clamp-1" title={item.title}>
                      {item.title}
                    </h4>
                    <span className="text-[9px] uppercase font-bold text-indigo-500 block mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (confirm(`Delete image "${item.title}" from public gallery?`)) {
                      try {
                        await deleteGalleryItem(item.id);
                        showToast('Media image removed.', 'info');
                      } catch (err) {
                        console.error(err);
                        const errMsg = err.response?.data?.error || err.message || 'Failed to delete from database.';
                        showToast(`Deletion failed: ${errMsg}`, 'error');
                      }
                    }
                  }}
                  className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors mr-2 rounded-xl flex-shrink-0"
                  title="Remove Media"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
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
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80'; // fallback if image fails
                showToast('Image URL is corrupted or invalid. Displaying fallback.', 'error');
              }}
            />
            <div className="text-center text-white max-w-xl">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                {activeImage.category}
              </span>
              <h3 className="text-sm sm:text-base font-bold mt-1">
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
