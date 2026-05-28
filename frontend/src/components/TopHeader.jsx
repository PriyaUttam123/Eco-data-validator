import React from 'react';
import { Search, Bell, Moon, Sun, HelpCircle, ChevronDown } from 'lucide-react';

const TopHeader = () => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search resources, records, or help..."
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none font-medium"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl mr-4">
          <button className="p-2 bg-white text-slate-800 rounded-xl shadow-sm"><Sun size={16} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600"><Moon size={16} /></button>
        </div>

        <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-600 relative group">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>

        <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-600">
          <HelpCircle size={20} />
        </button>

        <div className="w-px h-6 bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">Lead Auditor</p>
            <p className="text-[10px] font-bold text-slate-400">Environment Dept.</p>
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
