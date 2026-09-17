import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import Header from '../../components/admin/Header';
import { useNotifications } from '../../context/NotificationContext';
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

export default function AlumniDashboard({ onNavigate, onToggleSidebar }) {
  const { user } = useAuth();
  const { requests, acceptMentorshipRequest, declineMentorshipRequest } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'mentees' | 'referrals' | 'views' | 'rating' | null

  const activeMenteesList = [
    {
      id: 'MNT-1',
      name: 'Alex Rivera',
      dept: 'Computer Science',
      batch: '2025',
      topic: 'Frontend Architecture & System Design',
      sessionStatus: 'Session Tomorrow, 5:30 PM (IST)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      progress: 'Completed 2 sessions'
    },
    {
      id: 'MNT-2',
      name: 'Priya Patel',
      dept: 'Information Technology',
      batch: '2026',
      topic: 'Product Design & Figma Portfolio Review',
      sessionStatus: 'Session Scheduled Sep 19',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      progress: 'Completed 1 session'
    },
    {
      id: 'MNT-3',
      name: 'Rahul Sharma',
      dept: 'Computer Science',
      batch: '2025',
      topic: 'Fullstack Web Dev & React Best Practices',
      sessionStatus: 'Active Mentee Track',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      progress: 'Completed 3 sessions'
    },
    {
      id: 'MNT-4',
      name: 'Ananya Sen',
      dept: 'Electronics Eng',
      batch: '2026',
      topic: 'Tech Career Transition & Resume Review',
      sessionStatus: 'Active Mentee Track',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      progress: 'Completed 1 session'
    }
  ];

  const referralsPostedList = [
    {
      id: 'POST-1',
      role: 'Senior Product Designer',
      company: 'Stripe',
      location: 'Remote / San Francisco',
      applicantsCount: 5,
      status: 'Active Listing',
      date: 'Posted 3 days ago'
    },
    {
      id: 'POST-2',
      role: 'Fullstack Software Engineer Trainee',
      company: 'Stripe',
      location: 'Bengaluru / Hybrid',
      applicantsCount: 4,
      status: 'Active Listing',
      date: 'Posted 1 week ago'
    },
    {
      id: 'POST-3',
      role: 'UI/UX Design Intern',
      company: 'Stripe',
      location: 'Remote',
      applicantsCount: 3,
      status: 'Active Listing',
      date: 'Posted 2 weeks ago'
    }
  ];

  const profileViewersList = [
    {
      id: 'VIEW-1',
      name: 'Rohan Joshi',
      title: 'Hardware Systems Architect at Apple',
      type: 'Alumnus Peer',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 'VIEW-2',
      name: 'Alex Rivera',
      title: 'Computer Science Student (Class of 2025)',
      type: 'Student Mentee',
      time: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
    },
    {
      id: 'VIEW-3',
      name: 'Google University Recruiting Team',
      title: 'Tech Talent Acquisition Division',
      type: 'Recruiter',
      time: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    {
      id: 'VIEW-4',
      name: 'Priya Patel',
      title: 'Information Technology Student (Class of 2026)',
      type: 'Student Mentee',
      time: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
    },
    {
      id: 'VIEW-5',
      name: 'Dr. Aris Vance',
      title: 'Staff Software Engineer at Google / Platform Admin',
      type: 'Admin',
      time: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    }
  ];

  const studentFeedbackList = [
    {
      id: 'FB-1',
      student: 'Alex Rivera',
      role: 'Computer Science (2025)',
      rating: 5.0,
      comment: 'Sarah provided incredible guidance on my frontend architecture & Figma design system. Extremely insightful session!',
      date: 'Sep 12, 2024'
    },
    {
      id: 'FB-2',
      student: 'Priya Patel',
      role: 'Information Tech (2026)',
      rating: 5.0,
      comment: 'Super constructive feedback on my UI portfolio. She shared real-world Stripe design practices that helped me stand out.',
      date: 'Sep 05, 2024'
    },
    {
      id: 'FB-3',
      student: 'Rahul Sharma',
      role: 'Computer Science (2025)',
      rating: 4.9,
      comment: 'Very patient and detailed advice on tech career choices. Grateful for her mentorship!',
      date: 'Aug 28, 2024'
    }
  ];

  const handleAction = (id, newStatus) => {
    const req = requests.find(r => r.id === id);
    if (newStatus === 'accepted') {
      acceptMentorshipRequest(id, req?.alumniName || user?.name || 'Alumni Mentor');
      onNavigate('chat');
    } else {
      declineMentorshipRequest(id);
    }
  };

  const filteredRequests = requests.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.studentName.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q) ||
      r.studentDept.toLowerCase().includes(q) ||
      r.note.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 min-w-0 bg-[#f8fafc] pb-12 min-h-screen">
      <Header
        title="Alumni Portal Overview"
        subtitle="Manage student mentorship requests, post job referrals, and view ratings"
        onToggleSidebar={onToggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search student requests, topics, skills..."
      />

      <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner - Modern Indigo Gradient */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white p-6 lg:p-8 overflow-hidden shadow-xl shadow-indigo-600/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Alumnus Mentor & Referrer
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Sarah Jenkins'}!
            </h1>
            <p className="text-sm text-indigo-50 max-w-xl leading-relaxed">
              {user?.designation || 'Senior Product Designer'} at <span className="text-white font-extrabold underline underline-offset-2">{user?.company || 'Stripe'}</span> · Batch of {user?.batch || '2018'}. 
              You currently have <strong className="text-white underline font-black">{requests.filter(r => r.status === 'pending').length} pending student mentorship requests</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('alumni-profile')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-md transition-all cursor-pointer"
            >
              Edit Availability & Skills
            </button>
            <button
              onClick={() => onNavigate('submit-referral')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-800 text-xs font-extrabold shadow-lg shadow-black/10 transition-all cursor-pointer"
            >
              + Post Job Referral
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards - Modern Clean White Cards with Soft Shadows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveModal('mentees')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-blue-700 transition-colors">Active Mentees</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">4 Students</div>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
            <span>2 sessions completed this month</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        <div 
          onClick={() => setActiveModal('referrals')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-700 transition-colors">Referrals Posted</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">3 Active</div>
          <p className="text-[11px] text-indigo-600 mt-1 flex items-center gap-1 font-semibold">
            <span>12 student applications</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        <div 
          onClick={() => setActiveModal('views')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-purple-700 transition-colors">Profile Views</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">188</div>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
            <span>+24% from campus hiring drive</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        <div 
          onClick={() => setActiveModal('rating')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer group hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 group-hover:text-amber-700 transition-colors">Mentorship Rating</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">4.95 / 5.0</div>
          <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1 font-semibold">
            <span>Top 5% alumni mentor badge</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>

      {/* ─── MODAL DIALOG OVERLAYS FOR ALUMNI KPI CARDS (LIGHT THEME) ──────────────── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* 1. ACTIVE MENTEES MODAL */}
            {activeModal === 'mentees' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Active Connected Student Mentees (4)</h2>
                    <p className="text-xs text-slate-500 font-medium">Students currently receiving career guidance & 1-on-1 mentorship</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {activeMenteesList.map(m => (
                    <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-300 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">{m.dept} · Class of {m.batch}</span>
                          </div>
                          <p className="text-xs text-blue-700 font-bold">{m.topic}</p>
                          <span className="text-[11px] text-slate-500 font-medium">{m.sessionStatus}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                          {m.progress}
                        </span>
                        <button 
                          onClick={() => { setActiveModal(null); onNavigate('chat'); }}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer shadow-md shadow-blue-600/20"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. REFERRALS POSTED MODAL */}
            {activeModal === 'referrals' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Your Posted Job Referrals</h2>
                    <p className="text-xs text-slate-500 font-medium">Open referral positions you posted for campus students</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {referralsPostedList.map(ref => (
                    <div key={ref.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-base">{ref.role}</h4>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold">
                            {ref.company}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{ref.date}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Location: <strong className="text-slate-900 font-bold">{ref.location}</strong></span>
                        <span className="text-indigo-700 font-extrabold">{ref.applicantsCount} Student Applicants</span>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                        <button 
                          onClick={() => { setActiveModal(null); onNavigate('referrals'); }}
                          className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-md shadow-indigo-600/20"
                        >
                          View Student Applications
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => { setActiveModal(null); onNavigate('submit-referral'); }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    + Post New Job Referral
                  </button>
                </div>
              </div>
            )}

            {/* 3. PROFILE VIEWS MODAL */}
            {activeModal === 'views' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Profile Views & Visitor Analytics</h2>
                    <p className="text-xs text-slate-500 font-medium">188 total profile views (+24% surge during campus drive)</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-slate-900">188 Profile Views</span>
                    <p className="text-xs text-purple-700 font-bold">Active engagement from students & hiring recruiters</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                    +24% Increase
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Profile Viewers</h4>
                  {profileViewersList.map(v => (
                    <div key={v.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={v.avatar} alt={v.name} className="w-10 h-10 rounded-xl object-cover border border-slate-300" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-slate-900 text-xs">{v.name}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">{v.type}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">{v.title}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold shrink-0">{v.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MENTORSHIP RATING MODAL */}
            {activeModal === 'rating' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Mentorship Rating & Feedback</h2>
                    <p className="text-xs text-slate-500 font-medium">4.95 / 5.0 Rating · Top 5% Alumni Mentor Badge</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-3xl font-black text-slate-900">4.95 <span className="text-sm font-normal text-slate-500">/ 5.0</span></div>
                    <p className="text-xs text-slate-600 font-bold">Based on 28 student feedback reviews</p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                    🏆 Top 5% Alumni Mentor
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Reviews & Testimonials</h4>
                  {studentFeedbackList.map(fb => (
                    <div key={fb.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{fb.student} ({fb.role})</span>
                        <span className="text-xs font-extrabold text-amber-600">★ {fb.rating}</span>
                      </div>
                      <p className="text-xs text-slate-700 italic">"{fb.comment}"</p>
                      <span className="text-[10px] text-slate-400 font-medium block">{fb.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Incoming Student Connection & Mentorship Requests - Modern Light Theme */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-slate-900 text-base">Incoming Student Mentorship Requests</h2>
            <p className="text-xs text-slate-500 font-medium">Review notes from students seeking career guidance or interview prep</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {requests.filter(r => r.status === 'pending').length} Action Required
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {requests.map(req => (
            <div key={req.id} className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img 
                  src={req.avatar} 
                  alt={req.studentName} 
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0" 
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{req.studentName}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {req.studentDept} · Class of {req.studentBatch}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {req.date}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-indigo-600">{req.topic}</div>
                  <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    "{req.note}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                {req.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(req.id, 'accepted')}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept & Message</span>
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'declined')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-red-600 text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${
                      req.status === 'accepted' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {req.status === 'accepted' ? '✓ Mentorship Accepted' : 'Declined'}
                    </span>
                    {req.status === 'accepted' && (
                      <button
                        onClick={() => onNavigate('chat')}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
                      >
                        Chat →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Grid - Modern White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={() => onNavigate('mentorship')}
          className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700">Mentorship Workspace</h4>
          <p className="text-xs text-slate-500 font-medium">View your active mentee tracks, session calendar, and milestone reviews.</p>
        </div>

        <div 
          onClick={() => onNavigate('referrals')}
          className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-700">Manage Referrals</h4>
          <p className="text-xs text-slate-500 font-medium">Post open engineering or design positions at your company to recruit students.</p>
        </div>

        <div 
          onClick={() => onNavigate('chat')}
          className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-purple-700">Student-Alumni Messages</h4>
          <p className="text-xs text-slate-500 font-medium">Directly chat with your connected students, share resources, and set up calls.</p>
        </div>
      </div>
      </main>
    </div>
  );
}
