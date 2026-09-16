import React from 'react';
import { useAuth } from '../../lib/auth';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  GraduationCap
} from 'lucide-react';

export default function StudentDashboard({ onNavigate }) {
  const { user } = useAuth();

  const activeMentorships = [
    {
      id: 'MENT-01',
      mentorName: 'Sarah Jenkins',
      designation: 'Senior Product Designer',
      company: 'Stripe',
      batch: '2018',
      nextSession: 'Tomorrow, 5:30 PM (IST)',
      topic: 'Design Systems & Career Strategy',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      status: 'Active'
    }
  ];

  const recentReferrals = [
    {
      id: 'REF-01',
      company: 'Google',
      role: 'Associate Software Engineer (L3)',
      referrer: 'Dr. Aris Vance',
      status: 'Under Review',
      appliedDate: 'Sep 14, 2024'
    },
    {
      id: 'REF-02',
      company: 'Microsoft',
      role: 'Fullstack Graduate Trainee',
      referrer: 'Vikram Mehta',
      status: 'Shortlisted',
      appliedDate: 'Sep 10, 2024'
    }
  ];

  const featuredAlumni = [
    {
      id: 'ALM-1',
      name: 'Rohan Joshi',
      company: 'Apple',
      designation: 'Hardware Systems Architect',
      batch: '2019',
      dept: 'Electrical Eng',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      skills: ['SoC Design', 'VLSI', 'Mentorship']
    },
    {
      id: 'ALM-2',
      name: 'Pooja Iyer',
      company: 'Amazon Web Services',
      designation: 'Solutions Architect',
      batch: '2020',
      dept: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      skills: ['Cloud Architecture', 'DevOps', 'Mock Interviews']
    },
    {
      id: 'ALM-3',
      name: 'Karthik Rao',
      company: 'Goldman Sachs',
      designation: 'Quant Analyst',
      batch: '2017',
      dept: 'Information Tech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      skills: ['Financial Modeling', 'Python', 'Referrals']
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-slate-900/90 border border-emerald-800/40 p-6 lg:p-8 overflow-hidden backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Student Portal · Career Acceleration
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hello, {user?.name || 'Alex Rivera'}!
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {user?.department || 'Computer Science'} · Class of {user?.batch || '2025'}. 
              Connect with 5,200+ verified alumni working across top global companies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('find-alumni')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Find Alumni Mentors</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Connected Mentors</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">1 Mentor</div>
          <p className="text-[11px] text-emerald-400 mt-1">1 session scheduled</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Referral Applications</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">2 Active</div>
          <p className="text-[11px] text-blue-400 mt-1">1 shortlisted at Microsoft</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Upcoming Events</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">3 Webinars</div>
          <p className="text-[11px] text-purple-400 mt-1">Alumni tech talks this week</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Unread Messages</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">2 New</div>
          <p className="text-[11px] text-amber-400 mt-1">From Sarah Jenkins</p>
        </div>
      </div>

      {/* Active Mentorship & Referrals split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Mentorship Track */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              My Active Mentorship
            </h3>
            <button 
              onClick={() => onNavigate('mentorship')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              View Hub →
            </button>
          </div>

          {activeMentorships.map(m => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center gap-3.5">
                <img src={m.avatar} alt={m.mentorName} className="w-11 h-11 rounded-xl object-cover border border-slate-600" />
                <div>
                  <h4 className="font-semibold text-white text-sm">{m.mentorName}</h4>
                  <p className="text-xs text-slate-400">{m.designation} at <strong className="text-slate-300">{m.company}</strong></p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <div className="font-medium text-emerald-400 mb-1">Upcoming 1-on-1 Session:</div>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {m.nextSession}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Topic: {m.topic}</div>
              </div>
              <div className="flex gap-2 pt-1">
                <button 
                  onClick={() => onNavigate('chat')}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Open Chat
                </button>
                <button 
                  onClick={() => alert('Launching Google Meet Video Room...')}
                  className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Join Video Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Applied Referrals Status */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Applied Referral Requests
            </h3>
            <button 
              onClick={() => onNavigate('referrals')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
            >
              Browse Board →
            </button>
          </div>

          <div className="space-y-3">
            {recentReferrals.map(ref => (
              <div key={ref.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-xs">{ref.role}</h4>
                  <p className="text-[11px] text-slate-400">{ref.company} · Referred by {ref.referrer}</p>
                  <span className="text-[10px] text-slate-500">Applied {ref.appliedDate}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                  ref.status === 'Shortlisted' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {ref.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Alumni to Connect With */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Recommended Alumni in Your Field</h3>
            <p className="text-xs text-slate-400">Alumni who are actively open for student mentorship</p>
          </div>
          <button 
            onClick={() => onNavigate('find-alumni')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
          >
            See All Alumni (5,240) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredAlumni.map(alm => (
            <div key={alm.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={alm.avatar} alt={alm.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{alm.name}</h4>
                    <p className="text-xs text-emerald-400 font-medium">{alm.company}</p>
                    <p className="text-[11px] text-slate-400">{alm.designation}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {alm.skills.map(sk => (
                    <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('find-alumni')}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 hover:border-emerald-500 cursor-pointer"
              >
                Request Mentorship
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
