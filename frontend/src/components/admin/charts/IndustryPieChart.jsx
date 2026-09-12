import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold text-white mb-0.5">{data?.name}</p>
        <p className="text-slate-300">
          Alumni Count: <span className="font-semibold text-blue-400">{data?.value}</span> ({data?.payload?.percentage ?? 0}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function IndustryPieChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="p-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-white">Alumni by Industry</h3>
          <p className="text-xs text-slate-400">Sector employment distribution</p>
        </div>
      </div>

      <div className="w-full h-64 flex items-center justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-slate-500 text-xs py-8">
            <PieIcon className="w-8 h-8 mb-2 opacity-50" />
            <span>No industry data available</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="count"
                nameKey="industry"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#1e293b" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-slate-300 ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

