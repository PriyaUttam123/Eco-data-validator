import React from 'react';
import { 
  LayoutDashboard, 
  FileUp, 
  Database, 
  ShieldCheck, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ingestion', label: 'Ingestion', icon: FileUp },
    { id: 'records', label: 'Records', icon: Database },
    { id: 'audit', label: 'Audit Logs', icon: ShieldCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-[#0F172A] text-slate-300 flex flex-col h-full border-r border-white/5 relative z-50">
      {/* Sidebar Logo */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 rotate-3">
          <Database size={24} className="text-slate-900" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-white leading-none">ECO DATA</h1>
          <p className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] mt-1">VALIDATOR v2.0</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative ${
                isActive 
                  ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} className={`${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight size={14} className="text-slate-900/50" />}
              {item.id === 'ingestion' && !isActive && (
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="p-6">
        <div className="p-4 bg-white/5 rounded-3xl border border-white/5 group cursor-pointer hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center font-bold text-slate-900 border border-white/10">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">John Doe</p>
              <p className="text-[10px] text-slate-500 truncate font-mono tracking-tight">Lead Auditor</p>
            </div>
            <LogOut size={16} className="text-slate-600 hover:text-rose-400 transition-colors" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
