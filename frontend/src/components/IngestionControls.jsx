import React, { useState } from 'react';
import { ingestData } from '../services/api';

const IngestionControls = ({ onUploadSuccess }) => {
  const [type, setType] = useState('sap');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getExpectedExtension = () => {
    if (type === 'travel') return '.json';
    return '.csv';
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setSuccess('');
    
    if (selectedFile) {
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      const expected = getExpectedExtension().replace('.', '');
      
      if (extension !== expected) {
        setError(`Invalid file type. Expected a ${expected.toUpperCase()} file for this data source.`);
        setFile(null);
        e.target.value = ''; // Reset input
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await ingestData(type, 1, file);
      setSuccess(response.data.message);
      setFile(null); // Clear file after success
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-xl shadow-2xl mb-8 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
      
      <h2 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        Data Ingestion
      </h2>

      <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Data Source</label>
          <select 
            value={type} 
            onChange={(e) => {
              setType(e.target.value);
              setFile(null); // Clear file if source type changes
              setError('');
            }}
            className="w-full bg-slate-900 border border-slate-700/50 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm"
          >
            <option value="sap">SAP Procurement (CSV)</option>
            <option value="utility">Utility Electricity (CSV)</option>
            <option value="travel">Concur Travel (JSON)</option>
          </select>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
            Select {getExpectedExtension().toUpperCase().replace('.', '')} File
          </label>
          <div className="relative">
            <input 
              type="file" 
              accept={getExpectedExtension()}
              onChange={handleFileChange}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer border border-dashed border-slate-700 rounded-lg p-1 bg-slate-900/30"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !file}
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-8 rounded-lg transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          )}
          {loading ? 'Processing...' : 'Ingest Data'}
        </button>
      </form>

      {/* Stylized Error Alert */}
      {error && (
        <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-1.5 bg-rose-500/20 rounded-lg text-rose-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-rose-400">Ingestion Error</h4>
            <p className="text-xs text-rose-400/80 mt-0.5">{error}</p>
          </div>
          <button onClick={() => setError('')} className="text-rose-400/50 hover:text-rose-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      )}

      {/* Stylized Success Alert */}
      {success && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-emerald-400">Upload Complete</h4>
            <p className="text-xs text-emerald-400/80 mt-0.5">{success}</p>
          </div>
          <button onClick={() => setSuccess('')} className="text-emerald-400/50 hover:text-emerald-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default IngestionControls;
