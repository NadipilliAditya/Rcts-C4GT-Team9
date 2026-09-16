import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { CalendarDays } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
        <p className="font-bold text-white mb-1 border-b border-slate-800 pb-1">{label}</p>
        {payload.map((p, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span style={{ color: p.color }} className="font-medium">{p.name}:</span>
            <span className="font-bold text-white">{p?.value} attendees</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EventAreaChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="p-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-xl backdrop-blur-md flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Event Participation</h3>
          <p className="text-xs text-slate-400">Quarterly breakdown by event categories</p>
        </div>
      </div>

      <div className="w-full h-64 mt-2 flex items-center justify-center">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center text-slate-500 text-xs py-8">
            <CalendarDays className="w-8 h-8 mb-2 opacity-50" />
            <span>No event participation data available</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWebinars" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWorkshops" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorReunions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-slate-300 ml-1">{value}</span>}
              />
              <Area type="monotone" dataKey="webinars" name="Webinars" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWebinars)" />
              <Area type="monotone" dataKey="workshops" name="Workshops" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorWorkshops)" />
              <Area type="monotone" dataKey="reunions" name="Reunions" stroke="#ec4899" fillOpacity={1} fill="url(#colorReunions)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

