import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useSchoolData } from '../../context/SchoolDataContext';
import { Heart, Target, Users, HelpCircle, Award } from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const AnalyticsTab = () => {
  const { donations, donationGoal, totalRaised, totalDonationsCount } = useSchoolData();

  // 1. Calculate Category Distributions dynamically
  const categoriesMap = donations.reduce((acc, curr) => {
    const cat = curr.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const pieData = Object.keys(categoriesMap).map(key => ({
    name: key,
    value: categoriesMap[key]
  }));

  // 2. Calculate Monthly Trends (mock past months, calculate May dynamically)
  const mayDonationsSum = donations
    .filter(d => d.date && d.date.includes('-05-'))
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const trendData = [
    { month: 'Jan', amount: 8000 },
    { month: 'Feb', amount: 15000 },
    { month: 'Mar', amount: 12000 },
    { month: 'Apr', amount: 20000 },
    { month: 'May', amount: Math.max(mayDonationsSum, 10000) }, // Include dynamic context values
  ];

  // 3. Overall Stats Calculations
  const averageDonation = totalDonationsCount > 0 ? Math.round(totalRaised / totalDonationsCount) : 0;
  const progressPercent = Math.min(Math.round((totalRaised / donationGoal) * 100), 100);

  const statCards = [
    { label: 'Total Raised', value: `₹${totalRaised.toLocaleString()}`, sub: `${progressPercent}% of Goal`, icon: <Award className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-500/10' },
    { label: 'Goal Target', value: `₹${donationGoal.toLocaleString()}`, sub: 'For Digital Lab expansion', icon: <Target className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-500/10' },
    { label: 'Contributor Count', value: totalDonationsCount, sub: 'Unique transactions', icon: <Users className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-500/10' },
    { label: 'Avg Donation', value: `₹${averageDonation.toLocaleString()}`, sub: 'Per transaction', icon: <Heart className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-500/10' }
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-all duration-300"
          >
            <div className={`p-4 rounded-2xl ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{card.label}</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{card.value}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider">
            Monthly Donation Activity (2026)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)"/>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Funding Categorization
          </h3>
          <div className="h-56 w-full relative flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-500 text-xs flex flex-col items-center gap-2">
                <HelpCircle className="w-8 h-8 text-slate-600" />
                No categorizations found
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-[10px] font-bold text-slate-500 mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
            {pieData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
