import React, { useState } from 'react';
import { ingestData } from '../services/api';

const IngestionControls = ({ onUploadSuccess }) => {
  const [type, setType] = useState('sap');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const getExpectedExtension = () => {
    if (type === 'travel') return '.json';
    return '.csv';
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    setSuccess('');
    
    if (selectedFile) {
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      const expected = getExpectedExtension().replace('.', '');
      
      if (extension !== expected) {
        setError(`Invalid file type. Expected a ${expected.toUpperCase()} file for this data source.`);
        setFile(null);
        return false;
      } else {
        setFile(selectedFile);
        return true;
      }
    }
    return false;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovering(false);
    const selectedFile = e.dataTransfer.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
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
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-2xl shadow-2xl mb-12 relative overflow-hidden border border-white/5">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          </div>
          Data Ingestion Pipeline
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          Live Processing Ready
        </div>
      </div>

      <form onSubmit={handleUpload} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-slate-400">Step 1: Select Data Source</label>
            <div className="relative group">
              <select 
                value={type} 
                onChange={(e) => {
                  setType(e.target.value);
                  setFile(null);
                  setError('');
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm appearance-none cursor-pointer group-hover:border-slate-500"
              >
                <option value="sap">SAP Procurement (CSV)</option>
                <option value="utility">Utility Electricity (CSV)</option>
                <option value="travel">Concur Travel (JSON)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed italic">
              Configures the AI normalization engine for specific schema translation and anomaly detection rules.
            </p>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-slate-400">Step 2: Upload Source File</label>
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative h-44 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden ${
                isHovering 
                  ? 'border-cyan-400 bg-cyan-400/5 scale-[1.01]' 
                  : file 
                    ? 'border-emerald-500/50 bg-emerald-500/5' 
                    : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-900'
              }`}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input 
                id="file-input"
                type="file" 
                accept={getExpectedExtension()}
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className={`p-4 rounded-full transition-colors ${isHovering ? 'bg-cyan-400/20' : 'bg-slate-800'}`}>
                {file ? (
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ) : (
                  <svg className={`w-8 h-8 transition-colors ${isHovering ? 'text-cyan-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                )}
              </div>
              
              <div className="text-center">
                <p className={`text-sm font-semibold transition-colors ${isHovering ? 'text-cyan-400' : 'text-slate-200'}`}>
                  {file ? file.name : `Drag and drop your ${type.toUpperCase()} ${getExpectedExtension().toUpperCase()} here`}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">or click to browse from your device</p>
              </div>

              {/* Progress bar simulation when file is present */}
              {file && !loading && !error && (
                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-full animate-in fade-in duration-500"></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={loading || !file}
            className={`group relative overflow-hidden px-10 py-4 rounded-xl font-bold text-sm transition-all shadow-xl active:scale-95 flex items-center gap-3 ${
              loading 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-900/20'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-slate-500 border-t-emerald-400 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
            )}
            <span className="relative z-10">
              {loading ? 'Processing Pipeline...' : 'Start Ingestion'}
            </span>
            {!loading && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
          </button>
        </div>
      </form>

      {/* Stylized Error Alert */}
      {error && (
        <div className="mt-8 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl shadow-rose-950/20">
          <div className="p-2 bg-rose-500/20 rounded-xl text-rose-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-rose-400 mb-1">Pipeline Interrupted</h4>
            <p className="text-sm text-rose-400/70 leading-relaxed font-medium">{error}</p>
          </div>
          <button onClick={() => setError('')} className="p-1 text-rose-400/40 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      )}

      {/* Stylized Success Alert */}
      {success && (
        <div className="mt-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl shadow-emerald-950/20">
          <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-emerald-400 mb-1">Pipeline Synchronized</h4>
            <p className="text-sm text-emerald-400/70 leading-relaxed font-medium">{success}</p>
          </div>
          <button onClick={() => setSuccess('')} className="p-1 text-emerald-400/40 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default IngestionControls;
