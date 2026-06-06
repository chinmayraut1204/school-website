import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Globe } from 'lucide-react';
import { useSchoolData } from '../../context/SchoolDataContext';
import GlassCard from '../common/GlassCard';

const Faculty = () => {
  const { faculty } = useSchoolData();

  return (
    <section 
      id="faculty" 
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">
            Our Educators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Meet Our Exceptional Faculty
          </h2>
          <div className="h-1 w-20 bg-[#1b1a55] dark:bg-indigo-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Our teachers are dedicated mentors bringing progressive educational methods, technological inclusion, and emotional development to every child.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, index) => (
            <GlassCard 
              key={member.id} 
              delay={index * 0.1}
              glowColor="rgba(99, 102, 241, 0.15)"
              className="group hover:border-indigo-500/20 text-left flex flex-col h-full"
            >
              {/* Profile Image container */}
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-between">
                  <span className="text-xs font-semibold text-emerald-400">View Bio</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Social icons row */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a 
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a 
                    href="#faculty"
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    title="LinkedIn"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a 
                    href="#faculty"
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    title="Research Portal"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;
