import React, { useState } from 'react';
import { ingestData } from '../services/api';
import { 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  FileCheck, 
  Activity, 
  Database,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const QualityIndicator = ({ label, value, subtext, color }) => (
  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center text-center">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xl font-black ${color}`}>{value}</p>
    <p className="text-[9px] text-slate-400 font-bold mt-1">{subtext}</p>
  </div>
);

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
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.1)] border border-slate-200 relative overflow-hidden">
      {/* Premium accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-emerald-500 shadow-xl shadow-slate-900/20">
              <Upload size={28} />
            </div>
            Data Intake Pipeline
          </h2>
          <p className="text-slate-500 font-medium mt-2">Secure gateway for multi-source ESG data ingestion.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
            <ShieldCheck size={14} />
            SECURE PROTOCOL ACTIVE
          </div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mr-2">Version 2.0.4-Stable</span>
        </div>
      </div>

      <form onSubmit={handleUpload} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400">1. Data Category</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'sap', label: 'SAP Procurement', ext: 'CSV', color: 'indigo' },
                  { id: 'utility', label: 'Utility Electricity', ext: 'CSV', color: 'emerald' },
                  { id: 'travel', label: 'Concur Travel', ext: 'JSON', color: 'purple' },
                ].map((item) => (
                  <label key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    type === item.id 
                      ? `border-emerald-500 bg-emerald-50/50 shadow-sm` 
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="type" 
                      value={item.id} 
                      checked={type === item.id}
                      onChange={(e) => setType(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${
                      type === item.id ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {item.ext}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    {type === item.id && <CheckCircle2 size={18} className="ml-auto text-emerald-500" />}
                  </label>
                ))}
              </div>
            </div>

            {file && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="block text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400">3. Data Quality Preview</label>
                <div className="grid grid-cols-3 gap-3">
                  <QualityIndicator label="Completeness" value="98%" subtext="No Nulls" color="text-emerald-600" />
                  <QualityIndicator label="Validation" value="Active" subtext="In Progress" color="text-blue-600" />
                  <QualityIndicator label="Efficiency" value="1.2s" subtext="Batch Latency" color="text-purple-600" />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs font-black uppercase tracking-[0.2em] mb-4 text-slate-400">2. Source Environment</label>
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative h-[340px] rounded-[40px] border-2 border-dashed transition-all duration-700 flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden ${
                isHovering 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-2xl shadow-emerald-500/10' 
                  : file 
                    ? 'border-emerald-500 bg-emerald-50/20 shadow-inner' 
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/30'
              }`}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input id="file-input" type="file" accept={getExpectedExtension()} onChange={handleFileChange} className="hidden" />
              
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                isHovering 
                  ? 'bg-emerald-500 text-white shadow-2xl scale-110' 
                  : file 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'bg-white text-slate-400 shadow-sm border border-slate-100'
              }`}>
                {file ? <FileCheck size={36} /> : <Database size={32} />}
              </div>
              
              <div className="text-center px-8">
                <p className="text-lg font-black text-slate-800 tracking-tight leading-tight">
                  {file ? file.name : `Drop ${type.toUpperCase()} Source File`}
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-2 max-w-[240px] mx-auto">
                  Drag and drop your local datasets or click to browse secure file systems.
                </p>
                {file && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-500">READY FOR SYNC</span>
                  </div>
                )}
              </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={loading || !file}
            className={`w-full md:w-auto px-16 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group shadow-2xl active:scale-95 ${
              loading || !file
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20'
            }`}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <Activity size={18} className="animate-spin text-white" />
              ) : (
                <>
                  <Database size={18} className="group-hover:translate-y-[-2px] transition-transform" />
                  {loading ? 'Validating...' : 'Start Ingestion'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </div>

      </form>

      {/* Styled Notifications */}
      <div className="fixed bottom-12 right-12 flex flex-col gap-4 z-[200]">
        {error && (
          <div className="p-6 bg-white border-l-4 border-rose-500 rounded-2xl shadow-2xl flex items-start gap-4 min-w-[360px] animate-in slide-in-from-right duration-500">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-500"><X size={20} /></div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Intake Interrupted</h4>
              <p className="text-xs text-rose-600 font-bold mt-1">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-slate-300 hover:text-slate-500"><X size={16} /></button>
          </div>
        )}

        {success && (
          <div className="p-6 bg-white border-l-4 border-emerald-500 rounded-2xl shadow-2xl flex items-start gap-4 min-w-[360px] animate-in slide-in-from-right duration-500">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500"><CheckCircle2 size={20} /></div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Pipeline Synced</h4>
              <p className="text-xs text-emerald-600 font-bold mt-1">{success}</p>
            </div>
            <button onClick={() => setSuccess('')} className="text-slate-300 hover:text-slate-500"><X size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngestionControls;
