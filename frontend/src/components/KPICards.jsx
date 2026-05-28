import React from 'react';
import { Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 font-semibold ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend} <span className="text-slate-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
  </div>
);

const KPICards = ({ records = [] }) => {
  const stats = {
    total: records.length.toLocaleString(),
    approved: records.filter(r => r.status === 'APPROVED').length.toLocaleString(),
    suspicious: records.filter(r => r.status === 'SUSPICIOUS').length.toLocaleString(),
    pending: records.filter(r => r.status === 'PENDING').length.toLocaleString(),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard 
        title="Total Records" 
        value={stats.total} 
        icon={Users} 
        color="bg-blue-500" 
        trend="+12%" 
      />
      <KPICard 
        title="Approved" 
        value={stats.approved} 
        icon={CheckCircle} 
        color="bg-emerald-500" 
        trend="+5%" 
      />
      <KPICard 
        title="Suspicious" 
        value={stats.suspicious} 
        icon={AlertTriangle} 
        color="bg-amber-500" 
        trend="-2%" 
      />
      <KPICard 
        title="Pending Review" 
        value={stats.pending} 
        icon={Clock} 
        color="bg-slate-500" 
      />
    </div>
  );
};

export default KPICards;
