import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import Header from '../../components/admin/Header';
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

export default function StudentDashboard({ onNavigate, onToggleSidebar }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'mentors' | 'referrals' | 'events' | 'messages' | null

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
      status: 'Active',
      bio: 'Ex-Google UX designer with 6+ years experience in design systems, fullstack product architecture, and tech career coaching.'
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
    },
    {
      id: 'REF-03',
      company: 'Stripe',
      role: 'Product Design Intern',
      referrer: 'Sarah Jenkins',
      status: 'Interview Scheduled',
      appliedDate: 'Sep 01, 2024'
    }
  ];

  const upcomingEventsList = [
    {
      id: 'EVT-01',
      title: 'AI & LLM Systems Architecture in 2025',
      speaker: 'Dr. Aris Vance',
      speakerRole: 'Staff Software Engineer at Google',
      date: 'Tomorrow, Sep 18 · 5:00 PM (IST)',
      type: 'Webinar',
      attendees: 142
    },
    {
      id: 'EVT-02',
      title: 'Cracking Product Design Interviews at Top Tech',
      speaker: 'Sarah Jenkins',
      speakerRole: 'Senior Product Designer at Stripe',
      date: 'Friday, Sep 20 · 6:30 PM (IST)',
      type: 'Workshop',
      attendees: 98
    },
    {
      id: 'EVT-03',
      title: 'Cloud Solutions & Distributed Infrastructure',
      speaker: 'Pooja Iyer',
      speakerRole: 'Solutions Architect at AWS',
      date: 'Sunday, Sep 22 · 4:00 PM (IST)',
      type: 'Tech Talk',
      attendees: 210
    }
  ];

  const unreadMessagesList = [
    {
      id: 'MSG-01',
      sender: 'Sarah Jenkins',
      role: 'Senior Product Designer at Stripe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      text: 'Hi Alex! Looking forward to our design system session tomorrow at 5:30 PM. Please have your Figma link ready!',
      time: '10 mins ago'
    },
    {
      id: 'MSG-02',
      sender: 'Vikram Mehta',
      role: 'Software Development Manager at Microsoft',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      text: 'Hey Alex! Great news, Microsoft HR shortlisted your referral application for Fullstack Graduate Trainee. Keep an eye on your email.',
      time: '2 hours ago'
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

  const filteredAlumni = featuredAlumni.filter(alm => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      alm.name.toLowerCase().includes(q) ||
      alm.company.toLowerCase().includes(q) ||
      alm.designation.toLowerCase().includes(q) ||
      alm.skills.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex-1 min-w-0 bg-[#f8fafc] pb-12 min-h-screen">
      <Header
        title="Student Portal Overview"
        subtitle="Connect with 5,200+ verified alumni mentors, request referrals, and book guidance sessions"
        onToggleSidebar={onToggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search mentors, companies, skills, roles..."
      />

      <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">

      {/* Welcome Banner - Modern Emerald Gradient */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 lg:p-8 overflow-hidden shadow-xl shadow-emerald-600/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Student Portal · Career Acceleration
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {user?.name || 'Alex Rivera'}!
            </h1>
            <p className="text-sm text-emerald-50 max-w-xl leading-relaxed">
              {user?.department || 'Computer Science'} · Class of {user?.batch || '2025'}. 
              Connect with 5,200+ verified alumni working across top global companies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('find-alumni')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-extrabold shadow-lg shadow-black/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>Find Alumni Mentors</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards - Modern Clean White Cards with Soft Shadows (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div 
          onClick={() => setActiveModal('mentors')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-emerald-700 transition-colors">Connected Mentors</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">1 Mentor</div>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
            <span>1 active session scheduled</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        <div 
          onClick={() => setActiveModal('referrals')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-blue-700 transition-colors">Referral Applications</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">2 Active</div>
          <p className="text-[11px] text-blue-600 mt-1 flex items-center gap-1 font-semibold">
            <span>1 shortlisted at Microsoft</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        <div 
          onClick={() => setActiveModal('events')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-purple-700 transition-colors">Upcoming Events</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">3 Webinars</div>
          <p className="text-[11px] text-purple-600 mt-1 flex items-center gap-1 font-semibold">
            <span>Alumni tech talks this week</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>

      {/* ─── MODAL DIALOG OVERLAYS FOR KPI CARDS (LIGHT THEME) ─────────────────── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* 1. CONNECTED MENTORS MODAL */}
            {activeModal === 'mentors' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Your Connected Active Mentor</h2>
                    <p className="text-xs text-slate-500 font-medium">1 active 1-on-1 mentorship track in progress</p>
                  </div>
                </div>

                {activeMentorships.map(m => (
                  <div key={m.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
                    <div className="flex items-start gap-4">
                      <img src={m.avatar} alt={m.mentorName} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-sm" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-slate-900">{m.mentorName}</h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                            Active Connected Mentor
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 font-semibold">{m.designation} at <strong className="text-slate-900">{m.company}</strong></p>
                        <p className="text-xs text-slate-500 font-medium">Alumnus Batch of {m.batch} · Verified Mentor</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed shadow-xs">
                      {m.bio}
                    </p>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Scheduled 1-on-1 Session</div>
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>{m.nextSession}</span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium">Topic: <span className="font-bold text-slate-900">{m.topic}</span></div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button 
                        onClick={() => { setActiveModal(null); onNavigate('chat'); }}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Open Direct Chat</span>
                      </button>
                      <button 
                        onClick={() => alert('Opening Google Meet Video Room...')}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Join Video Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. REFERRAL APPLICATIONS MODAL */}
            {activeModal === 'referrals' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Applied Referral Requests</h2>
                    <p className="text-xs text-slate-500 font-medium">Track your job & internship referral applications with alumni</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {recentReferrals.map(ref => (
                    <div key={ref.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{ref.role}</h4>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">{ref.company}</span>
                        </div>
                        <p className="text-xs text-slate-500">Referred by <strong className="text-slate-800">{ref.referrer}</strong> · Applied on {ref.appliedDate}</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                        ref.status === 'Shortlisted'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : ref.status === 'Interview Scheduled'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {ref.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => { setActiveModal(null); onNavigate('referrals'); }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    Explore Referral Board →
                  </button>
                </div>
              </div>
            )}

            {/* 3. UPCOMING EVENTS MODAL */}
            {activeModal === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Upcoming Alumni Webinars & Events</h2>
                    <p className="text-xs text-slate-500 font-medium">Join interactive technical workshops and career guidance sessions</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {upcomingEventsList.map(evt => (
                    <div key={evt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                          {evt.type}
                        </span>
                        <span className="text-xs text-slate-500 font-bold">{evt.attendees} Registered</span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-base">{evt.title}</h4>
                      <p className="text-xs text-slate-600">Speaker: <strong className="text-purple-700">{evt.speaker}</strong> ({evt.speakerRole})</p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          {evt.date}
                        </span>
                        <button 
                          onClick={() => alert(`Registered for ${evt.title}! Calendar invite sent.`)}
                          className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer shadow-md shadow-purple-600/20"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. UNREAD MESSAGES MODAL */}
            {activeModal === 'messages' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Unread Mentor Messages</h2>
                    <p className="text-xs text-slate-500 font-medium">Direct communications from your connected alumni mentors</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {unreadMessagesList.map(msg => (
                    <div key={msg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                      <img src={msg.avatar} alt={msg.sender} className="w-12 h-12 rounded-xl object-cover border border-slate-300 shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-sm">{msg.sender}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{msg.role}</p>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                          "{msg.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => { setActiveModal(null); onNavigate('chat'); }}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-amber-600/20"
                  >
                    Open Full Chat Window →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Active Mentorship & Referrals split - Modern Clean Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Mentorship Track */}
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <BookOpen className="w-4.5 h-4.5 text-emerald-600" />
              My Active Mentorship
            </h3>
            <button 
              onClick={() => onNavigate('mentorship')}
              className="text-xs text-emerald-600 hover:text-emerald-800 font-bold cursor-pointer"
            >
              View Hub →
            </button>
          </div>

          {activeMentorships.map(m => (
            <div key={m.id} className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3.5">
                <img src={m.avatar} alt={m.mentorName} className="w-11 h-11 rounded-xl object-cover border border-slate-300" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{m.mentorName}</h4>
                  <p className="text-xs text-slate-500">{m.designation} at <strong className="text-slate-800">{m.company}</strong></p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-slate-800">
                <div className="font-bold text-emerald-800 mb-1">Upcoming 1-on-1 Session:</div>
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  {m.nextSession}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">Topic: {m.topic}</div>
              </div>
              <div className="flex gap-2 pt-1">
                <button 
                  onClick={() => onNavigate('chat')}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Open Chat
                </button>
                <button 
                  onClick={() => alert('Launching Google Meet Video Room...')}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
                >
                  Join Video Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Applied Referrals Status */}
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Briefcase className="w-4.5 h-4.5 text-blue-600" />
              Applied Referral Requests
            </h3>
            <button 
              onClick={() => onNavigate('referrals')}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              Browse Board →
            </button>
          </div>

          <div className="space-y-3">
            {recentReferrals.map(ref => (
              <div key={ref.id} className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{ref.role}</h4>
                  <p className="text-[11px] text-slate-500">{ref.company} · Referred by {ref.referrer}</p>
                  <span className="text-[10px] text-slate-400 font-medium">Applied {ref.appliedDate}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  ref.status === 'Shortlisted' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  {ref.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Alumni to Connect With - Clean White Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Recommended Alumni in Your Field</h3>
            <p className="text-xs text-slate-500 font-medium">Alumni who are actively open for student mentorship</p>
          </div>
          <button 
            onClick={() => onNavigate('find-alumni')}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-bold cursor-pointer"
          >
            See All Alumni (5,240) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredAlumni.map(alm => (
            <div key={alm.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={alm.avatar} alt={alm.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{alm.name}</h4>
                    <p className="text-xs text-emerald-700 font-bold">{alm.company}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{alm.designation}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {alm.skills.map(sk => (
                    <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('find-alumni')}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Request Mentorship
              </button>
            </div>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}
