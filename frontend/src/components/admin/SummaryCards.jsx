import React from 'react';
import { Users, UserCheck, Award, GitFork, ArrowUpRight } from 'lucide-react';

export default function SummaryCards({ data = {} }) {
  const cards = [
    {
      title: 'Total Alumni',
      value: data.totalAlumni ? data.totalAlumni.toLocaleString() : '0',
      growth: data.totalAlumniGrowth || 12.5,
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/10'
    },
    {
      title: 'Active Alumni',
      value: data.activeAlumni ? data.activeAlumni.toLocaleString() : '0',
      growth: data.activeAlumniGrowth || 8.3,
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/10'
    },
    {
      title: 'Mentors',
      value: data.mentors ? data.mentors.toLocaleString() : '0',
      growth: data.mentorsGrowth || 15.2,
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-500/10'
    },
    {
      title: 'Connections',
      value: data.connections ? data.connections.toLocaleString() : '0',
      growth: data.connectionsGrowth || 18.7,
      icon: GitFork,
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-xl ${card.shadow} backdrop-blur-md flex flex-col justify-between hover:border-slate-600 transition-all duration-200 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{card.growth}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
