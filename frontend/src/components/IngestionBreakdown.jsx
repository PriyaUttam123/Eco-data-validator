import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'SAP Procurement', value: 45, color: '#0ea5e9' },
  { name: 'Utility Data', value: 30, color: '#10b981' },
  { name: 'Corporate Travel', value: 25, color: '#8b5cf6' },
];

const IngestionBreakdown = () => {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Ingestion Source Breakdown</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name.split(' ')[0]}</p>
            <p className="text-lg font-black text-slate-800">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngestionBreakdown;
