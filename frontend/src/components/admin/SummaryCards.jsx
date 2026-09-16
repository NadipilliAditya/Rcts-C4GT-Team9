import React from 'react';
import { Users, UserCheck, Award, GitFork, ArrowUpRight, DollarSign, MessageSquare } from 'lucide-react';

export default function SummaryCards({ data = {} }) {
  const cards = [
    {
      title: 'Total Alumni',
      value: data.totalAlumni != null ? data.totalAlumni.toLocaleString() : '0',
      growth: data.totalAlumniGrowth || 0,
      subtitle: data.totalAlumni ? `${data.totalAlumni} registered` : 'Loading...',
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Active Alumni',
      value: data.activeAlumni != null ? data.activeAlumni.toLocaleString() : '0',
      growth: data.activeAlumniGrowth || 0,
      subtitle: data.totalAlumni ? `${Math.round((data.activeAlumni / data.totalAlumni) * 100)}% of total` : '—',
      icon: UserCheck,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Mentors',
      value: data.mentors ? data.mentors.toLocaleString() : '620',
      growth: data.mentorsGrowth || 18.0,
      subtitle: '+18 this month',
      icon: Award,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Student Connections',
      value: data.connections ? data.connections.toLocaleString() : '1,240',
      growth: data.connectionsGrowth || 24.5,
      subtitle: '+32 this month',
      icon: GitFork,
      color: 'bg-pink-50 text-pink-600',
    },
    {
      title: 'Active Conversations',
      value: '380',
      growth: 15.0,
      subtitle: '+15 this week',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Total Contributions',
      value: '₹12.4L',
      growth: 8.7,
      subtitle: '+8.7% this year',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600',
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{card.subtitle}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
