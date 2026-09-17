import React, { useState } from 'react';
import Header from '../../components/admin/Header';
import { useAuth } from '../../lib/auth';
import { 
  User, 
  Building, 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Plus, 
  X,
  Mail
} from 'lucide-react';

export default function AlumniProfileView({ onBack, onToggleSidebar }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Sarah Jenkins',
    email: user?.email || 'alumni@alumniconnect.edu',
    company: user?.company || 'Stripe',
    designation: user?.designation || 'Senior Product Designer',
    department: user?.department || 'Computer Science',
    batch: user?.batch || '2018',
    location: user?.location || 'San Francisco, CA',
    about: user?.about || 'Senior Product Designer at Stripe with 6+ years of experience in fintech, design systems, and product strategy. Passionate about helping students break into tech.',
    skills: ['Product Design', 'UI/UX', 'Design Systems', 'Figma', 'User Research', 'Mentorship'],
    openForMentorship: true,
    openForReferrals: true,
    openForMockInterviews: true,
    openForGuestLectures: false,
    linkedin: 'https://linkedin.com/in/example',
    github: 'https://github.com/example'
  });

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
      setSaved(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 min-w-0 bg-[#f8fafc] pb-12 min-h-screen">
      <Header
        title="Alumni Profile & Availability Settings"
        subtitle="Keep your professional profile up to date so students can find and connect with you"
        onBack={onBack}
        onToggleSidebar={onToggleSidebar}
      />

      <main className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Manage Your Alumni Mentor Profile
            </h2>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Your profile and availability preferences have been updated!
        </div>
      )}

      {/* Main card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 text-center flex flex-col items-center">
          <div className="relative">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'} 
              alt={profile.name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-blue-500/40 shadow-xl"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900" title="Active on platform" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">{profile.name}</h2>
            <p className="text-xs text-blue-400 font-semibold">{profile.designation}</p>
            <p className="text-xs text-slate-400 mt-0.5">{profile.company}</p>
          </div>

          <div className="w-full pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300 text-left">
            <div className="flex items-center gap-2 text-slate-400">
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span>{profile.department} (Batch '{profile.batch})</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-slate-500" />
              <span className="truncate">{profile.email}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Details & Availability */}
        <div className="md:col-span-2 space-y-6">
          {/* Availability Toggles */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Student Engagement Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">1-on-1 Mentorship</span>
                  <span className="text-[10px] text-slate-400">Receive mentorship requests</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={profile.openForMentorship} 
                  onChange={(e) => setProfile({ ...profile, openForMentorship: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Job Referrals</span>
                  <span className="text-[10px] text-slate-400">Accept resume referrals</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={profile.openForReferrals} 
                  onChange={(e) => setProfile({ ...profile, openForReferrals: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Mock Interviews</span>
                  <span className="text-[10px] text-slate-400">Help students prep</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={profile.openForMockInterviews} 
                  onChange={(e) => setProfile({ ...profile, openForMockInterviews: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-white block">Guest Lectures</span>
                  <span className="text-[10px] text-slate-400">Campus tech talks & panels</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={profile.openForGuestLectures} 
                  onChange={(e) => setProfile({ ...profile, openForGuestLectures: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Bio & Skills */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm">About & Bio</h3>
            <textarea 
              rows={3}
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-slate-300">Expertise & Skills Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-blue-300 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Add skill (e.g. Distributed Systems)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
