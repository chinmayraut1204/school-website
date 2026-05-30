import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSchoolData } from '../../context/SchoolDataContext';
import GlassCard from '../common/GlassCard';
import { BookOpen, Laptop, Milestone, Compass } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    // Extract numerical value
    const end = parseFloat(value);
    if (isNaN(end)) return;

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = start + (end - start) * (step / totalSteps);
      setCount(current);

      if (step >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  // Format decimals vs integers
  const formattedCount = Number.isInteger(parseFloat(value))
    ? Math.round(count)
    : count.toFixed(1);

  return <span ref={ref}>{formattedCount}</span>;
};

const StatsDashboard = () => {
  const { schoolStats } = useSchoolData();

  const metrics = [
    { label: 'Active Students', value: schoolStats.totalStudents, suffix: '+', icon: <BookOpen className="w-5 h-5" />, desc: 'Primary & Secondary learners' },
    { label: 'Educators', value: schoolStats.teachersCount, suffix: '', icon: <Compass className="w-5 h-5" />, desc: 'Certified teaching staff' },
    { label: 'Success Rate', value: schoolStats.passRate, suffix: '%', icon: <Milestone className="w-5 h-5" />, desc: 'Final exams average score' },
    { label: 'Laboratories', value: schoolStats.labsCount, suffix: '', icon: <Laptop className="w-5 h-5" />, desc: 'Computer, Physics & Chemistry' }
  ];

  return (
    <section 
      id="stats" 
      className="py-24 bg-slate-900 text-white transition-colors duration-500 relative overflow-hidden"
    >
      {/* Decorative dark vector blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-[45vw] h-[45vw] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">
            Academic Performance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Real-Time Campus Statistics
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            See the direct impact of your contributions. Empowered by donor funds, our school achieves performance matching top-tier private institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-800/40 border border-slate-700/30 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Visual hover background flare */}
                <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl" />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="p-3 rounded-2xl bg-slate-900/60 text-emerald-400">
                    {metric.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-white">
                    <AnimatedCounter value={metric.value} />
                    {metric.suffix}
                  </span>
                </div>
                <div className="relative z-10 text-left">
                  <h4 className="text-sm font-bold text-slate-200 mb-1">{metric.label}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Dashboard Details */}
          <div className="lg:col-span-6">
            <div className="bg-slate-800/20 border border-slate-700/20 p-8 rounded-3xl backdrop-blur-lg">
              <h3 className="text-xl font-bold text-white mb-6 text-left border-b border-slate-800 pb-4">
                Inclusivity & Tech Ratios
              </h3>

              {/* Stat Progress Bar 1 */}
              <div className="mb-6 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300">Girls' Education Ratio</span>
                  <span className="text-xs font-bold text-emerald-400">{schoolStats.girlsRatio}% Girls Enrollment</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${schoolStats.girlsRatio}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Goal: Maintain or exceed 50% parity through targeted safety scholarships.</p>
              </div>

              {/* Stat Progress Bar 2 */}
              <div className="mb-6 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300">Smart Classroom Integration</span>
                  <span className="text-xs font-bold text-indigo-400">
                    {schoolStats.smartClassrooms} of {schoolStats.classroomsCount} Rooms
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(schoolStats.smartClassrooms / schoolStats.classroomsCount) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Goal: Upgrade 100% of rooms. Donors sponsor digital projectors & tablets.</p>
              </div>

              {/* Stat Progress Bar 3 */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300">Computer Literacy Coverage</span>
                  <span className="text-xs font-bold text-emerald-400">85% Students Covered</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Goal: Bring 100% of high-schoolers onto active weekly coding/typing courses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
