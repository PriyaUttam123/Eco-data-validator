import React from 'react';
import RecordTable from '../components/RecordTable';
import { Database, Filter, Download } from 'lucide-react';

const RecordsPage = ({ records, onAction }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Audit & Review Queue</h1>
          <p className="text-slate-500 text-sm mt-1">Detailed analysis and verification of sustainability records</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} />
            EXPORT DATA
          </button>
        </div>
      </div>

      <RecordTable records={records} onAction={onAction} />
    </div>
  );
};

export default RecordsPage;
