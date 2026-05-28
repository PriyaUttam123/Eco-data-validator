import React from 'react';
import IngestionControls from '../components/IngestionControls';
import { CloudUpload, History, Zap, ShieldCheck } from 'lucide-react';

const IngestionPage = ({ onUploadSuccess }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Data Intake Center</h1>
          <p className="text-slate-500 text-sm mt-1">Configure and monitor your automated data pipelines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <IngestionControls onUploadSuccess={onUploadSuccess} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              Quick Tips
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <p className="text-xs text-slate-600 font-medium">Use CSV for SAP and Utility data to ensure mapping accuracy.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <p className="text-xs text-slate-600 font-medium">Concur Travel maps best with JSON exports.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
             <ShieldCheck size={80} className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform duration-700" />
             <h4 className="text-sm font-black uppercase tracking-widest mb-2 relative z-10">Security Note</h4>
             <p className="text-xs text-slate-300 leading-relaxed relative z-10">
               All files undergo strict TLS 1.3 encryption and malware scanning before processing.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon import fix
import { CheckCircle2 } from 'lucide-react';

export default IngestionPage;
