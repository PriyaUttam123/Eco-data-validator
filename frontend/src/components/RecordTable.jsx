import React, { useState } from 'react';
import { reviewRecord } from '../services/api';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  ArrowRight,
  Database,
  ShieldAlert,
  Info
} from 'lucide-react';

const RecordTable = ({ records = [], onAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleReview = async (id, status) => {
    try {
      await reviewRecord(id, status);
      if (onAction) onAction();
    } catch (err) {
      alert(`Error updating record: ${err.message}`);
    }
  };

  const getRiskScore = (record) => {
    const quantity = parseFloat(record.raw_quantity);
    
    // HIGH Risk: Negative quantity or missing unit
    if (quantity < 0 || !record.unit || record.unit.trim() === '') {
      return { label: 'HIGH', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    }
    
    // MEDIUM Risk: Abnormal value (Suspicious status or outlier > 50k)
    if (record.status === 'SUSPICIOUS' || quantity > 50000) {
      return { label: 'MEDIUM', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    }
    
    // LOW Risk: Normal parameters
    return { label: 'LOW', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = JSON.stringify(r.raw_payload).toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (records.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-24 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <Database size={40} className="text-slate-200" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">No records uploaded yet</h3>
        <p className="text-slate-500 max-w-sm mt-2 font-medium">
          Upload a CSV or JSON file in the ingestion panel to begin your ESG data validation workflow.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by source or category..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400 ml-2" />
          <select 
            className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">Approved Only</option>
            <option value="PENDING">Pending Only</option>
            <option value="SUSPICIOUS">Suspicious Only</option>
            <option value="REJECTED">Rejected Only</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5">Source & Category</th>
                <th className="px-8 py-5">Value Normalization</th>
                <th className="px-8 py-5">Status Badge</th>
                <th className="px-8 py-5 text-center">Risk Score</th>
                <th className="px-8 py-5 text-right">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => {
                const risk = getRiskScore(record);
                return (
                  <tr key={record.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{record.category.replace('_', ' ')}</span>
                        <code className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                          {JSON.stringify(record.raw_payload)}
                        </code>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-400 line-through decoration-slate-300">{record.raw_quantity} {record.unit}</span>
                          <span className="text-sm font-black text-emerald-600">
                            {parseFloat(record.raw_quantity).toLocaleString()} <span className="text-[10px] uppercase">{record.unit}</span>
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-slate-300" />
                        <div className="px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                          <span className="text-[10px] font-black text-emerald-700 tracking-widest uppercase">Verified</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-tight border ${
                        record.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        record.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                        record.status === 'SUSPICIOUS' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {record.status === 'APPROVED' && <CheckCircle2 size={12} />}
                        {record.status === 'REJECTED' && <XCircle size={12} />}
                        {record.status === 'SUSPICIOUS' && <AlertCircle size={12} />}
                        {record.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest border ${risk.color}`}>
                        {risk.label}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {!record.is_locked ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleReview(record.id, 'APPROVED')}
                            className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl border border-emerald-100 transition-all group/btn"
                            title="Approve"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleReview(record.id, 'REJECTED')}
                            className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-100 transition-all group/btn"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end items-center gap-2 text-slate-400">
                          <span className="text-[10px] font-bold uppercase tracking-widest">Locked</span>
                          <ShieldAlert size={16} />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
