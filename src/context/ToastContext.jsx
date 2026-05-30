import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastCard 
              key={toast.id} 
              toast={toast} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastCard = ({ toast, onClose }) => {
  const { message, type } = toast;

  const config = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800/60',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      text: 'text-emerald-800 dark:text-emerald-200'
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800/60',
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      text: 'text-rose-800 dark:text-rose-200'
    },
    info: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800/60',
      icon: <Info className="w-5 h-5 text-indigo-500" />,
      text: 'text-indigo-800 dark:text-indigo-200'
    }
  };

  const style = config[type] || config.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
      layout
      className={`
        pointer-events-auto
        flex items-start gap-3 p-4 rounded-2xl border shadow-xl
        backdrop-blur-md ${style.bg}
      `}
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className={`flex-grow text-sm font-medium leading-relaxed ${style.text}`}>
        {message}
      </div>
      <button 
        onClick={onClose}
        className="flex-shrink-0 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full p-1 transition-colors"
      >
        <X className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
      </button>
    </motion.div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
