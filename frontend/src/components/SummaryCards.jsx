import React from 'react';

const SummaryCards = ({ records }) => {
  const stats = [
    { label: 'Total Records', value: '12,842', change: '+ 18.2%', up: true, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'blue' },
    { label: 'Approved', value: '9,532', change: '+ 15.7%', up: true, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'emerald' },
    { label: 'Suspicious', value: '1,214', change: '+ 8.6%', up: true, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'amber' },
    { label: 'Unreviewed', value: '2,096', change: '- 5.4%', up: false, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'indigo' },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'emerald': return 'bg-emerald-50 text-emerald-600';
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'indigo': return 'bg-indigo-50 text-indigo-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${getColorClasses(stat.color)}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className={`text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'} flex items-center`}>
              {stat.up ? '↑' : '↓'} {stat.change}
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">vs last 7 days</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
