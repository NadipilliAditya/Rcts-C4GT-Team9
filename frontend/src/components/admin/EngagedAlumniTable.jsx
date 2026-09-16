import React from 'react';
import { Award, Star, MessageSquare, Calendar, Building, ChevronRight } from 'lucide-react';

export default function EngagedAlumniTable({ alumni = [] }) {
  return (
    <div className="p-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Most Engaged Alumni Leaderboard
          </h3>
          <p className="text-xs text-slate-400">Ranked by mentorship contributions, event attendance & platform activity</p>
        </div>
        <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Top Contributors
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-700/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">Rank</th>
              <th className="py-3 px-3">Alumnus Profile</th>
              <th className="py-3 px-3">Department & Batch</th>
              <th className="py-3 px-3">Company & Role</th>
              <th className="py-3 px-3 text-center">Mentorships</th>
              <th className="py-3 px-3 text-center">Events</th>
              <th className="py-3 px-3 text-right">Engagement Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {alumni.map((item, idx) => (
              <tr key={item.id || idx} className="hover:bg-slate-700/30 transition-colors group">
                {/* Rank */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs bg-slate-900 border border-slate-700 text-slate-300 group-hover:border-blue-500 group-hover:text-blue-400 transition-colors">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </div>
                </td>

                {/* Profile */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-600 shadow-sm"
                    />
                    <div>
                      <span className="font-semibold text-white group-hover:text-blue-400 transition-colors block">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400">{item.id}</span>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="py-3.5 px-3">
                  <div className="text-slate-300 font-medium text-xs">{item.department}</div>
                  <div className="text-[11px] text-slate-500">Class of {item.batch}</div>
                </td>

                {/* Company & Role */}
                <td className="py-3.5 px-3">
                  <div className="text-slate-200 font-medium text-xs">{item.company}</div>
                  <div className="text-[11px] text-slate-400">{item.role}</div>
                </td>

                {/* Mentorships */}
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 font-semibold text-xs border border-purple-500/20">
                    <MessageSquare className="w-3 h-3 text-purple-400" />
                    {item.mentorshipsCompleted}
                  </span>
                </td>

                {/* Events */}
                <td className="py-3.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 font-semibold text-xs border border-blue-500/20">
                    <Calendar className="w-3 h-3 text-blue-400" />
                    {item.eventsAttended}
                  </span>
                </td>

                {/* Engagement Score */}
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 bg-slate-900 rounded-full h-2 overflow-hidden hidden sm:block">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${item.engagementScore}%` }}
                      ></div>
                    </div>
                    <span className="font-extrabold text-white text-sm">
                      {item.engagementScore}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
