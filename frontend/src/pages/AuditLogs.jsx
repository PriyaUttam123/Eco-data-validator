import React from 'react';
import { History, Shield, User, Clock, Search } from 'lucide-react';

const AuditLogsPage = () => {
  // Mock logs for demonstration
  const logs = [
    { id: 1, action: 'RECORD_APPROVED', user: ' Lead Auditor', target: 'SAP_REC_982', time: '2 mins ago', type: 'SUCCESS' },
    { id: 2, action: 'INGEST_STARTED', user: 'System Bot', target: 'Utility_Feb_2024.csv', time: '15 mins ago', type: 'INFO' },
    { id: 3, action: 'RECORD_SUSPICIOUS', user: 'AI Validator', target: 'TRAVEL_EXP_441', time: '1 hour ago', type: 'WARNING' },
    { id: 4, action: 'POLICY_UPDATED', user: 'Admin User', target: 'Emission Factors v2', time: '3 hours ago', type: 'INFO' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-1">Traceability and compliance history for all workspace actions</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by user or action..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500/20 outline-none font-medium"
            />
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">Last 24 Hours</button>
             <button className="px-4 py-2 text-slate-400 hover:text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Download PDF</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Actor</th>
                <th className="px-8 py-5">Activity</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={14} />
                      <span className="text-sm font-medium">{log.time}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800 tracking-tight">{log.action.replace('_', ' ')}</span>
                      <span className="text-xs text-slate-400 font-mono">{log.target}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border ${
                      log.type === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      log.type === 'WARNING' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
