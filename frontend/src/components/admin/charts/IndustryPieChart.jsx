import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const defaultData = [
  { industry: 'Technology', count: 920, percentage: 42 },
  { industry: 'Research', count: 350, percentage: 22 },
  { industry: 'Healthcare', count: 280, percentage: 18 },
  { industry: 'Education', count: 210, percentage: 18 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
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
  const chartData = (Array.isArray(data) && data.length > 0) ? data : defaultData;

  return (
    <div className="p-5 bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-xl backdrop-blur-md flex flex-col h-full text-white">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-white">Alumni by Industry</h3>
          <p className="text-xs text-slate-400">Sector employment distribution</p>
        </div>
      </div>

      <div className="w-full h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
              nameKey="industry"
            >
              {chartData.map((entry, index) => (
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
      </div>
    </div>
  );
}
