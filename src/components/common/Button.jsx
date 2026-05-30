import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, glass, ghost
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  glow = false,
  icon
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base tracking-wide',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg hover:shadow-indigo-500/20 focus:ring-indigo-500 border border-transparent',
    secondary: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg hover:shadow-emerald-500/20 focus:ring-emerald-500 border border-transparent',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-slate-500',
    glass: 'bg-white/20 dark:bg-slate-900/30 backdrop-blur-md border border-white/20 dark:border-slate-800 hover:bg-white/30 dark:hover:bg-slate-800/40 text-slate-900 dark:text-white shadow-md focus:ring-indigo-500',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:ring-slate-500',
  };

  const glowStyles = glow 
    ? 'relative after:absolute after:inset-0 after:rounded-full after:bg-inherit after:blur-md after:opacity-40 hover:after:scale-105 after:transition-all after:z-[-1]' 
    : '';

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${glowStyles}
        ${className}
      `}
    >
      {icon && <span className="mr-2 inline-flex">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
