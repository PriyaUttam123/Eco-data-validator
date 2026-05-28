import React, { useRef } from 'react';
import { Calendar, Plus } from 'lucide-react';

const DashboardHeader = ({ onNewIngestion }) => {
  const dateInputRef = useRef(null);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Real-time ESG data validation and ingestion status.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div 
          onClick={() => dateInputRef.current?.showPicker()}
          className="relative bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-3 cursor-pointer hover:border-emerald-500/50 hover:shadow-md transition-all group"
        >
          <Calendar size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <input 
            ref={dateInputRef}
            type="date" 
            defaultValue="2025-05-19"
            className="text-sm font-bold text-slate-700 outline-none bg-transparent cursor-pointer"
          />
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reports View</span>
        </div>
        
        <button 
          onClick={onNewIngestion}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          New Ingestion
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
