import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Award } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold text-white mb-1">{payload[0]?.payload?.domain}</p>
        <p className="text-purple-400">
          Mentorship Requests: <span className="font-bold text-white">{payload[0]?.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MentorshipDomainBarChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="p-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Most Common Mentorship Domains</h3>
          <p className="text-xs text-slate-400">High-demand student guidance topics</p>
        </div>
      </div>

      <div className="w-full h-64 mt-2 flex items-center justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-slate-500 text-xs py-8">
            <Award className="w-8 h-8 mb-2 opacity-50" />
            <span>No mentorship domain data available</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 20, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                type="category"
                dataKey="domain"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 6, 6, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#a855f7' : '#8b5cf6'} opacity={1 - index * 0.1} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

