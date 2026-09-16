import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Award,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';

export default function AlumniDashboard({ onNavigate }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([
    {
      id: 'REQ-101',
      studentName: 'Alex Rivera',
      studentDept: 'Computer Science',
      studentBatch: '2025',
      topic: 'Frontend Architecture & System Design Mentorship',
      note: 'Hi Sarah! I saw your work at Stripe. I am building fullstack React applications and would love 30 mins of career guidance.',
      date: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      status: 'pending'
    },
    {
      id: 'REQ-102',
      studentName: 'Priya Patel',
      studentDept: 'Information Technology',
      studentBatch: '2026',
      topic: 'Product Design & Portfolio Review',
      note: 'Would love feedback on my Figma design system project for upcoming summer internship applications.',
      date: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      status: 'pending'
    }
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900/80 border border-blue-800/40 p-6 lg:p-8 overflow-hidden backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Alumnus Mentor & Referrer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || 'Sarah Jenkins'}!
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {user?.designation || 'Senior Product Designer'} at <span className="text-blue-400 font-semibold">{user?.company || 'Stripe'}</span> · Batch of {user?.batch || '2018'}. 
              You currently have <strong className="text-white">{requests.filter(r => r.status === 'pending').length} pending student mentorship requests</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('alumni-profile')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              Edit Availability & Skills
            </button>
            <button
              onClick={() => onNavigate('submit-referral')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              + Post Job Referral
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Mentees</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">4 Students</div>
          <p className="text-[11px] text-emerald-400 mt-1">2 sessions completed this month</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Referrals Posted</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">3 Active</div>
          <p className="text-[11px] text-blue-400 mt-1">12 student applications</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Profile Views</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">188</div>
          <p className="text-[11px] text-emerald-400 mt-1">+24% from campus hiring drive</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Mentorship Rating</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">4.95 / 5.0</div>
          <p className="text-[11px] text-amber-400 mt-1">Top 5% alumni mentor badge</p>
        </div>
      </div>

      {/* Incoming Student Connection & Mentorship Requests */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-white text-base">Incoming Student Mentorship Requests</h2>
            <p className="text-xs text-slate-400">Review notes from students seeking career guidance or interview prep</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {requests.filter(r => r.status === 'pending').length} Action Required
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {requests.map(req => (
            <div key={req.id} className="p-5 hover:bg-slate-800/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img 
                  src={req.avatar} 
                  alt={req.studentName} 
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shrink-0" 
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">{req.studentName}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {req.studentDept} · Class of {req.studentBatch}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {req.date}
                    </span>
                  </div>
                  <div className="font-medium text-xs text-blue-400">{req.topic}</div>
                  <p className="text-xs text-slate-300/90 italic bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                    "{req.note}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                {req.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(req.id, 'accepted')}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept & Message</span>
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'declined')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                    req.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {req.status === 'accepted' ? '✓ Mentorship Accepted' : 'Declined'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={() => onNavigate('mentorship')}
          className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-blue-300">Mentorship Workspace</h4>
          <p className="text-xs text-slate-400">View your active mentee tracks, session calendar, and milestone reviews.</p>
        </div>

        <div 
          onClick={() => onNavigate('referrals')}
          className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-indigo-300">Manage Referrals</h4>
          <p className="text-xs text-slate-400">Post open engineering or design positions at your company to recruit students.</p>
        </div>

        <div 
          onClick={() => onNavigate('chat')}
          className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-sm group-hover:text-purple-300">Student-Alumni Messages</h4>
          <p className="text-xs text-slate-400">Directly chat with your connected students, share resources, and set up calls.</p>
        </div>
      </div>
    </div>
  );
}
