import React from 'react';

const InsightsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Ingestion by Source */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-slate-800">Ingestion by Source</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
            This Week
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Mock Doughnut Chart */}
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#E2E8F0" strokeWidth="4"></circle>
              {/* SAP Procurement (43.9%) */}
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#6366F1" strokeWidth="4" strokeDasharray="44 56" strokeDashoffset="0"></circle>
              {/* Utility Data (32.1%) */}
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10B981" strokeWidth="4" strokeDasharray="32 68" strokeDashoffset="-44"></circle>
              {/* Corporate Travel (23.9%) */}
              <circle cx="18" cy="18" r="16" fill="transparent" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="24 76" strokeDashoffset="-76"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">12,842</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            {[
              { label: 'SAP Procurement', value: '5,642', percent: '43.9%', color: 'bg-indigo-500' },
              { label: 'Utility Data', value: '4,128', percent: '32.1%', color: 'bg-emerald-500' },
              { label: 'Corporate Travel', value: '3,072', percent: '23.9%', color: 'bg-violet-500' }
            ].map((source) => (
              <div key={source.label} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-md ${source.color}`}></div>
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{source.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">{source.value}</span>
                  <span className="text-xs text-slate-400 ml-1.5 font-medium">({source.percent})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Records by Status */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-slate-800">Records by Status</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
            This Week
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* Mock Line Chart */}
        <div className="relative h-48 w-full mt-4">
          <div className="absolute inset-0 flex flex-col justify-between py-2 overflow-hidden">
            {[6, 4, 2, 0].map(v => (
              <div key={v} className="flex items-center gap-4 w-full h-0">
                <span className="text-[10px] font-bold text-slate-300 w-4">{v}K</span>
                <div className="flex-1 border-t border-slate-100/80"></div>
              </div>
            ))}
          </div>
          
          <div className="absolute inset-0 pl-8 overflow-hidden h-full flex items-end">
            <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d">
              {/* Approved Line */}
              <path d="M0,60 L50,40 L100,45 L150,30 L200,35 L250,45 L300,40 L350,50 L400,45" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in slide-in-from-left duration-1000"></path>
              {/* Suspicious Line */}
              <path d="M0,80 L50,70 L100,85 L150,80 L200,75 L250,85 L300,80 L350,90 L400,80" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in slide-in-from-left duration-1000 delay-200"></path>
              {/* Unreviewed Line */}
              <path d="M0,90 L50,85 L100,95 L150,90 L200,92 L250,91 L300,95 L350,93 L400,90" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in slide-in-from-left duration-1000 delay-500"></path>

              {/* Data points */}
              {[150, 200, 250].map((x, i) => (
                <circle key={i} cx={x} cy={30 + (i*5)} r="3" fill="#10B981" stroke="white" strokeWidth="1.5"></circle>
              ))}
            </svg>
          </div>

          <div className="absolute -bottom-6 left-8 right-0 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {['May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 pb-2">
          {[
            { label: 'Approved', color: 'bg-emerald-500' },
            { label: 'Suspicious', color: 'bg-amber-500' },
            { label: 'Unreviewed', color: 'bg-indigo-500' }
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${l.color}`}></div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
