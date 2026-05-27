import React, { useState, useEffect } from 'react';
import IngestionControls from './components/IngestionControls';
import RecordTable from './components/RecordTable';
import { fetchRecords } from './services/api';

function App() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetchRecords(filter);
      setRecords(response.data);
    } catch (err) {
      console.error("Failed to fetch records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Eco Data Validator
          </h1>
          <p className="text-slate-400 mt-2">Sustainability Analyst Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex glass rounded-lg overflow-hidden">
            {['', 'UNREVIEWED', 'SUSPICIOUS', 'APPROVED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-bold transition-all ${
                  filter === f ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                {f || 'ALL'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <IngestionControls onUploadSuccess={loadData} />
        
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-slate-300">Staging Area</h3>
          <button 
            onClick={loadData}
            className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <RecordTable records={records} onAction={loadData} />
        )}
      </main>
    </div>
  );
}

export default App;
