import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  glowColor = 'rgba(99, 102, 241, 0.15)', // Indigo default
  animate = true,
  delay = 0
}) => {
  const cardContent = (
    <div 
      className={`
        backdrop-blur-xl
        bg-white/70 dark:bg-slate-900/60
        border border-slate-200/50 dark:border-slate-800/50
        rounded-3xl shadow-xl hover:shadow-2xl
        transition-shadow duration-500 overflow-hidden
        relative group ${className}
      `}
      style={{
        '--glow-color': glowColor
      }}
    >
      {/* Dynamic glowing background element on hover */}
      {hoverEffect && (
        <div 
          className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-10 transition duration-500 blur-sm pointer-events-none"
        />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );

  if (!animate) return cardContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={hoverEffect ? { y: -6, scale: 1.01 } : undefined}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
};

export default GlassCard;
