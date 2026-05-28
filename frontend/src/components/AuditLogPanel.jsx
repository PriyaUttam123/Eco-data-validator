import React from 'react';
import { User, ShieldCheck, FileUp, Database } from 'lucide-react';

const AuditLogItem = ({ user, action, time, icon: Icon, color }) => (
  <div className="flex gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl group">
    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-opacity-10 transition-transform group-hover:scale-110`}>
      <Icon size={18} className={color.replace('bg-', 'text-')} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <p className="text-sm font-semibold text-slate-800 tracking-tight">
          <span className="text-emerald-600 font-bold">{user}</span> {action}
        </p>
        <span className="text-[10px] font-medium text-slate-400 font-mono">{time}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">Enterprise Workflow • System Verified</p>
    </div>
  </div>
);

const AuditLogPanel = () => {
  const logs = [
    { user: 'John Miller', action: 'approved SAP procurement upload', time: '2m ago', icon: ShieldCheck, color: 'bg-emerald-500' },
    { user: 'Sarah Chen', action: 'rejected utility record #4231', time: '15m ago', icon: ShieldCheck, color: 'bg-rose-500' },
    { user: 'System', action: 'normalized 2,342 travel records', time: '1h ago', icon: Database, color: 'bg-blue-500' },
    { user: 'Sustainability Analyst', action: 'uploaded travel_may.csv', time: '2h ago', icon: FileUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Audit Log History</h3>
        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">View All</button>
      </div>
      <div className="flex-1 py-2 overflow-y-auto">
        {logs.map((log, index) => (
          <AuditLogItem key={index} {...log} />
        ))}
      </div>
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider justify-center">
          <ShieldCheck size={12} className="text-emerald-500" />
          End-to-End Auditability Enabled
        </div>
      </div>
    </div>
  );
};

export default AuditLogPanel;
