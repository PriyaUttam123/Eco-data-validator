import React from 'react';
import { User, Bell, Shield, Globe, CreditCard, ChevronRight } from 'lucide-react';

const SettingsItem = ({ icon: Icon, title, description, color }) => (
  <div className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-3xl hover:border-emerald-500/20 hover:bg-slate-50 transition-all cursor-pointer group shadow-sm">
    <div className="flex items-center gap-6">
      <div className={`w-12 h-12 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{title}</h4>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{description}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
  </div>
);

const SettingsPage = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Preferences</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your professional credentials and workspace security</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <SettingsItem 
          icon={User} 
          title="Profile Information" 
          description="Update your photo, professional title, and department."
          color="blue"
        />
        <SettingsItem 
          icon={Shield} 
          title="Security & 2FA" 
          description="Keep your audit data safe with multi-factor authentication."
          color="emerald"
        />
        <SettingsItem 
          icon={Bell} 
          title="Notification Triggers" 
          description="Control when you get alerted about suspicious data spikes."
          color="amber"
        />
        <SettingsItem 
          icon={Globe} 
          title="Workspace Context" 
          description="Set your regional standards (GRI, TCFD, CSRD)."
          color="indigo"
        />
        <SettingsItem 
          icon={CreditCard} 
          title="Subscription & Usage" 
          description="View your enterprise plan and data volume limits."
          color="purple"
        />
      </div>

      <div className="pt-8 flex justify-end">
        <button className="px-10 py-3.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95">
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
