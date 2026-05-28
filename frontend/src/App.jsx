import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import IngestionControls from './components/IngestionControls';
import { fetchRecords } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Dashboard from './pages/Dashboard';
import Ingestion from './pages/Ingestion';
import Records from './pages/Records';
import AuditLogs from './pages/AuditLogs';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setTab={setActiveTab} 
        onLogout={() => setIsAuthenticated(false)} 
      />

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
              <div className="max-w-[1600px] mx-auto">
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    records={records} 
                    loading={loading} 
                    onRefresh={loadData} 
                    onNewIngestion={() => setShowIngestModal(true)} 
                  />
                )}
                
                {activeTab === 'ingestion' && (
                  <Ingestion onUploadSuccess={loadData} />
                )}

                {activeTab === 'records' && (
                  <Records records={records} onAction={loadData} />
                )}

                {activeTab === 'audit' && (
                  <AuditLogs />
                )}

                {activeTab === 'analytics' && (
                  <Analytics />
                )}

                {activeTab === 'settings' && (
                  <Settings />
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
