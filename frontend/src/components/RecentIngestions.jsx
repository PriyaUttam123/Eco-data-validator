import React from 'react';
import { Download, Eye, MoreVertical, RefreshCw, FileText, ArrowRight } from 'lucide-react';

const RecentIngestions = ({ records, loading, onRefresh }) => {
  const handleDownload = (fileName) => {
    alert(`Initiating secure download for: ${fileName}`);
    // Real implementation would fetch a signed URL or blob
  };

  const mockIngestions = [
    { file: 'SAP_FI_MM_20250519.csv', source: 'SAP Procurement', user: 'Sustainability Analyst', date: 'May 19, 2025 10:30 AM', records: '2,342', status: 'Completed' },
    { file: 'Utility_Electricity_May.csv', source: 'Utility Data', user: 'Sustainability Analyst', date: 'May 19, 2025 09:15 AM', records: '1,128', status: 'Completed' },
    { file: 'Travel_Report_May.csv', source: 'Corporate Travel', user: 'Sustainability Analyst', date: 'May 18, 2025 04:45 PM', records: '892', status: 'Completed' },
    { file: 'SAP_FI_MM_20250518.csv', source: 'SAP Procurement', user: 'Sustainability Analyst', date: 'May 18, 2025 11:20 AM', records: '2,156', status: 'Failed' },
  ];

  const getSourceStyle = (source) => {
    switch (source) {
      case 'SAP Procurement': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Utility Data': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Corporate Travel': return 'bg-violet-50 text-violet-600 border-violet-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-8 pb-4 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Ingestions</h3>
          <p className="text-xs text-slate-500 font-medium">Tracking the most recent data source uploads.</p>
        </div>
        <button 
          onClick={onRefresh} 
          className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all active:rotate-180"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="overflow-x-auto px-4 pb-4 flex-1">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Records</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {(records.length > 0 ? records.slice(0, 4).map(r => ({
              file: `Ingestion_#${r.id}.csv`,
              source: r.category === 'SCOPE_1' ? 'SAP Procurement' : r.category === 'SCOPE_2' ? 'Utility Data' : 'Corporate Travel',
              records: r.raw_quantity,
              status: 'Completed'
            })) : mockIngestions).map((ingest, i) => (
              <tr key={i} className="group hover:bg-slate-50 transition-all duration-300">
                <td className="px-6 py-5 bg-white border-y border-l border-slate-100 first:rounded-l-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-white group-hover:shadow-inner transition-all">
                      <FileText size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors truncate max-w-[150px]">{ingest.file}</span>
                  </div>
                </td>
                <td className="px-6 py-5 bg-white border-y border-slate-100">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest border uppercase ${getSourceStyle(ingest.source)}`}>
                    {ingest.source.split(' ')[0]}
                  </span>
                </td>
                <td className="px-6 py-5 bg-white border-y border-slate-100">
                  <span className="text-sm font-bold text-slate-900">{ingest.records}</span>
                </td>
                <td className="px-6 py-5 bg-white border-y border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${ingest.status === 'Completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`}></div>
                    <span className={`text-[11px] font-black tracking-widest uppercase ${ingest.status === 'Completed' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {ingest.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 bg-white border-y border-r border-slate-100 last:rounded-r-2xl">
                  <div className="flex items-center justify-center gap-3 text-slate-400">
                    <button title="View Detail" className="p-2 hover:bg-slate-100 rounded-lg hover:text-slate-600 transition-all"><Eye size={16} /></button>
                    <button 
                      title="Download Source" 
                      onClick={() => handleDownload(ingest.file)}
                      className="p-2 hover:bg-emerald-50 rounded-lg hover:text-emerald-600 transition-all"
                    >
                      <Download size={16} />
                    </button>
                    <button title="Options" className="p-2 hover:bg-slate-100 rounded-lg hover:text-slate-600 transition-all"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
        <button className="w-full py-2.5 text-[11px] font-black tracking-[0.2em] text-slate-400 hover:text-emerald-600 uppercase flex items-center justify-center gap-2 group transition-all">
          View Detailed Ingestion Inventory
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default RecentIngestions;
