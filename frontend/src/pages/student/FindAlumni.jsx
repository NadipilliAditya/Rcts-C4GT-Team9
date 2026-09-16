import React, { useState } from 'react';
import { realAlumniList } from '../../data/realAlumniData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  X, 
  Briefcase,
  Star,
  MessageSquare,
  DollarSign
} from 'lucide-react';

export default function FindAlumni({ onNavigateToChat }) {
  const [alumni] = useState(realAlumniList);
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [mentorshipOnly, setMentorshipOnly] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [requestModal, setRequestModal] = useState(null); // 'mentorship' | 'referral'
  const [requestNote, setRequestNote] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const filtered = alumni.filter(alm => {
    const matchesSearch = 
      alm.name.toLowerCase().includes(search.toLowerCase()) ||
      alm.company.toLowerCase().includes(search.toLowerCase()) ||
      alm.role.toLowerCase().includes(search.toLowerCase()) ||
      alm.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      alm.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));

    const matchesBranch = selectedBranch === 'all' || alm.branch === selectedBranch;
    const matchesCollege = selectedCollege === 'all' || alm.college === selectedCollege;
    const matchesMentorship = !mentorshipOnly || alm.availableForMentorship;

    return matchesSearch && matchesBranch && matchesCollege && matchesMentorship;
  });

  const handleSendRequest = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setRequestModal(null);
      setSelectedAlumni(null);
      setRequestNote('');
      alert(`Connection & Mentorship Request sent successfully to ${selectedAlumni?.name}!`);
    }, 1000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Find & Connect with Alumni Mentors
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Explore alumni across KIET, KIEW, and KIEK working at IIIT-H, TCS, Alphanome.ai, Piramal, and leading tech companies.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, company (e.g. IIITH, TCS, Piramal), branch, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="all">All Branches (AID, CSD, CAI, CSM)</option>
              <option value="AID">AID (AI & Data Science)</option>
              <option value="CSD">CSD (Computer Science & Data)</option>
              <option value="CAI">CAI (CS & Artificial Intelligence)</option>
              <option value="CSM">CSM (CS & Machine Learning)</option>
            </select>

            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="all">All Colleges</option>
              <option value="KIET">KIET</option>
              <option value="KIEW">KIEW</option>
              <option value="KIEK">KIEK</option>
            </select>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
            <input 
              type="checkbox"
              checked={mentorshipOnly}
              onChange={(e) => setMentorshipOnly(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Open for Mentorship</span>
          </label>

          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{filtered.length}</strong> verified alumni
          </span>
        </div>
      </div>

      {/* Alumni Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(alm => (
          <div 
            key={alm.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4 shadow-xs"
          >
            {/* Top header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={alm.avatar} 
                      alt={alm.name} 
                      className="w-12 h-12 rounded-full object-cover border border-slate-200" 
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {alm.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-600">{alm.role}</p>
                    <p className="text-xs text-slate-600 font-medium">{alm.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{alm.rating}</span>
                </div>
              </div>

              {/* Badges & Meta */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {alm.branch}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {alm.college}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono">
                  {alm.ctc}
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {alm.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {alm.skills.slice(0, 3).map(sk => (
                  <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedAlumni(alm);
                  setRequestModal('mentorship');
                }}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mentorship</span>
              </button>

              <button
                onClick={() => {
                  setSelectedAlumni(alm);
                  setRequestModal('referral');
                }}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                <span>Ask Referral</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for request */}
      {requestModal && selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                  Request {requestModal === 'mentorship' ? '1-on-1 Guidance' : 'Internal Job Referral'}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedAlumni.name}</h3>
                <p className="text-xs text-slate-500">{selectedAlumni.role} at {selectedAlumni.company}</p>
              </div>
              <button 
                onClick={() => { setRequestModal(null); setSelectedAlumni(null); }}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sentSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-center space-y-1 font-bold text-xs">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                <p>Request Dispatched to {selectedAlumni.name}!</p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Message / Query Note
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder={`Hi ${selectedAlumni.name}, I am a student interested in your work at ${selectedAlumni.company}. Would love 20 minutes to discuss placement guidance...`}
                    value={requestNote}
                    onChange={(e) => setRequestNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm"
                >
                  Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
