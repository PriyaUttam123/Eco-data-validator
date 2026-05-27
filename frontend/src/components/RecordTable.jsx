import React from 'react';
import { reviewRecord } from '../services/api';

const RecordTable = ({ records, onAction }) => {
  const handleReview = async (id, status) => {
    try {
      await reviewRecord(id, status);
      if (onAction) onAction();
    } catch (err) {
      alert(`Error updating record: ${err.message}`);
    }
  };

  return (
    <div className="glass rounded-xl overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900 text-slate-400 text-sm uppercase tracking-wider">
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Raw Data</th>
            <th className="px-6 py-4 font-semibold text-right">Normalized Quantity</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {records.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">
                No records found matching current filters.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr 
                key={record.id} 
                className={`transition-colors hover:bg-slate-900/50 ${record.status === 'SUSPICIOUS' ? 'bg-red-900/10' : ''}`}
              >
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                    record.category === 'SCOPE_1' ? 'bg-blue-900/40 text-blue-400' :
                    record.category === 'SCOPE_2' ? 'bg-purple-900/40 text-purple-400' :
                    'bg-orange-900/40 text-orange-400'
                  }`}>
                    {record.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="group relative">
                    <pre className="text-xs text-slate-400 truncate max-w-[200px]">
                      {JSON.stringify(record.raw_payload)}
                    </pre>
                    <div className="hidden group-hover:block absolute z-50 bg-slate-800 border border-slate-700 p-2 rounded shadow-xl text-xs -bottom-10 left-0 w-64 overflow-auto max-h-40">
                      {JSON.stringify(record.raw_payload, null, 2)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-mono text-emerald-400">
                  {record.raw_quantity} <span className="text-slate-500 text-[10px]">{record.unit}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative group inline-block">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === 'APPROVED' ? 'bg-emerald-900/40 text-emerald-400' :
                      record.status === 'REJECTED' ? 'bg-red-900/40 text-red-400' :
                      record.status === 'SUSPICIOUS' ? 'bg-rose-600 text-white animate-pulse' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {record.status}
                    </span>
                    {record.anomaly_reason && (
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white text-[10px] p-2 rounded-lg shadow-xl -top-10 left-1/2 -translate-x-1/2 w-48 z-10 text-center pointer-events-none">
                        ⚠️ {record.anomaly_reason}
                        <div className="absolute border-8 border-transparent border-t-red-600 -bottom-4 left-1/2 -translate-x-1/2"></div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {!record.is_locked ? (
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleReview(record.id, 'APPROVED')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white rounded-lg border border-emerald-500/20 transition-all font-medium text-xs group"
                      >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReview(record.id, 'REJECTED')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg border border-rose-500/20 transition-all font-medium text-xs group"
                      >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Audit Record Locked</span>
                      <span className="text-[9px] opacity-70 italic">Finalized</span>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
