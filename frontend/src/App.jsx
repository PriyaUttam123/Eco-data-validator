import React, { useState, useEffect, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import DashboardHeader from './components/DashboardHeader';
import KPICards from './components/KPICards';
import IngestionBreakdown from './components/IngestionBreakdown';
import AuditLogPanel from './components/AuditLogPanel';
import RecordTable from './components/RecordTable';
import RecentIngestions from './components/RecentIngestions';
import IngestionControls from './components/IngestionControls';
import { fetchRecords } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIngestModal, setShowIngestModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetchRecords();
      setRecords(response.data || []);
    } catch (err) {
      console.error("Failed to fetch records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8 pb-20"
            >
              <div className="max-w-[1600px] mx-auto space-y-8">
                {activeTab === 'dashboard' && (
                  <>
                    <DashboardHeader onNewIngestion={() => setShowIngestModal(true)} />
                    <KPICards records={records} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <RecentIngestions records={records} loading={loading} onRefresh={loadData} />
                      </div>
                      <div className="space-y-8">
                        <IngestionBreakdown />
                        <AuditLogPanel />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'records' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Review Queue</h1>
                      <p className="text-slate-500 text-sm mt-1">Manage and validate ingested sustainability data</p>
                    </div>
                    <RecordTable records={records} onAction={loadData} />
                  </div>
                )}

                {['ingestion', 'audit', 'analytics', 'settings'].includes(activeTab) && (
                  <div className="bg-white rounded-[32px] border border-slate-200 border-dashed p-32 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Database size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">{activeTab} View</h3>
                    <p className="text-slate-500 mt-2">Section under construction for the enterprise release.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Ingestion Modal Overlay */}
      {showIngestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-4xl relative">
            <button 
              onClick={() => setShowIngestModal(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white flex items-center gap-2 group transition-colors"
            >
              <span className="text-xs font-bold tracking-widest uppercase">Close Panel</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
            </button>
            <IngestionControls onUploadSuccess={() => { loadData(); setShowIngestModal(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
