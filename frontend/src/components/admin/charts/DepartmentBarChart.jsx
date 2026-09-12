import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
        <p className="font-semibold text-white mb-1">{label}</p>
        <p className="text-blue-400">
          Alumni: <span className="font-bold text-white">{payload[0]?.value?.toLocaleString?.() ?? payload[0]?.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DepartmentBarChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="p-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Department-wise Alumni</h3>
          <p className="text-xs text-slate-400">Distribution across academic departments</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Department Sync
        </span>
      </div>

      <div className="w-full h-64 mt-2 flex items-center justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-slate-500 text-xs py-8">
            <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
            <span>No department data available</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
              <XAxis 
                dataKey="department" 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

