import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Lock, Eye, EyeOff, Home, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import api from '../utils/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Route fallback redirect path
  const redirectPath = location.state?.from?.pathname || '/admin';

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      showToast('Please enter both administrative credentials.', 'error');
      return;
    }

    setLoading(true);

    try {
      // Connect to REST auth endpoint
      const response = await api.post('/auth/login', { username, password });
      const { token, fallback } = response.data;

      sessionStorage.setItem('token', token);
      localStorage.removeItem('token');

      showToast(
        fallback 
          ? 'Logged in successfully (Database Offline - local fallback mode)' 
          : 'Administrative authentication successful!', 
        'success'
      );
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.warn('Network auth failed, running client-side simulation fallback check...');
      
      // Client-side authentication fallback if database/server is completely offline
      if (username === 'chinmay raut' && password === 'chinmay@1204') {
        const dummyToken = `dummy-jwt-${Date.now()}`;
        sessionStorage.setItem('token', dummyToken);
        localStorage.removeItem('token');
        showToast('Logged in successfully (Offline Sandbox Mode)', 'success');
        navigate(redirectPath, { replace: true });
      } else {
        const errMsg = error.response?.data?.error || 'Invalid username or password credentials.';
        showToast(errMsg, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-hidden flex items-center justify-center px-4">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 dark:bg-emerald-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Floating Home Trigger */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 p-3 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all shadow-md z-15 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Card container */}
      <div className="max-w-[420px] w-full relative z-10">
        <GlassCard hoverEffect={false} className="p-8 border-slate-200/60 dark:border-slate-805/40">
          <div className="text-center space-y-2 mb-8">
            <img 
              src="/logo.jpg" 
              alt="Shri Gagangiri Trust Logo" 
              className="w-16 h-16 rounded-2xl object-contain bg-white border border-slate-200 dark:border-slate-800 p-1 shadow-md mx-auto mb-2"
            />
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Admin Credentials Desk</h2>
            <p className="text-xs text-slate-500">Access administrative records database</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            {/* Username Input */}
            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-2">
                Administrative Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. chinmay raut"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">
                  Password
                </label>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="e.g. chinmay@1204"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-850 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>



            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-white font-extrabold flex justify-center items-center shadow-lg"
              glow
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                  Authenticate Account
                </span>
              )}
            </Button>
          </form>
        </GlassCard>
      </div>

      {/* Theme Toggle Utility floating at bottom-left */}
      <ThemeSwitcher />
    </div>
  );
};

export default LoginPage;
