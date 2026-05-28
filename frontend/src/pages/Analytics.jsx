import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Activity, Target, PieChart as PieChartIcon } from 'lucide-react';

const AnalyticsPage = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 900 },
    { name: 'Jun', value: 1100 },
  ];

  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Environmental Intel</h1>
        <p className="text-slate-500 text-sm mt-1">Predictive analytics and historical emission trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Growth', value: '+14.2%', icon: <TrendingUp size={20} />, color: 'emerald' },
          { label: 'Accuracy', value: '99.8%', icon: <Target size={20} />, color: 'blue' },
          { label: 'Uptime', value: '100%', icon: <Activity size={20} />, color: 'indigo' },
          { label: 'Efficiency', value: '0.8s', icon: <PieChartIcon size={20} />, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tight">Emission Trends (MTCO2e)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'black', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tight">Data Quality Score</h3>
          <div className="flex flex-col items-center justify-center h-full">
             <div className="w-56 h-56 relative flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-900">92</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Optimal</p>
                </div>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="112" cy="112" r="100" fill="none" stroke="#f1f5f9" strokeWidth="16" />
                  <circle cx="112" cy="112" r="100" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="628" strokeDashoffset="50" strokeLinecap="round" />
                </svg>
             </div>
             <p className="text-sm text-slate-500 mt-12 text-center max-w-xs font-medium">Your data quality has improved by <span className="text-emerald-600 font-black">8.4%</span> since last quarter.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
