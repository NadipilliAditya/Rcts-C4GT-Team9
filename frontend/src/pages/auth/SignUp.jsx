import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import AlumniConnectLogo from '../../components/common/AlumniConnectLogo';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle, 
  UserPlus,
  GraduationCap,
  BookOpen,
  Briefcase,
  Building,
  Phone,
  Hash,
  Sparkles
} from 'lucide-react';

const roleMeta = {
  alumni: {
    id: 'alumni',
    title: 'Alumni',
    icon: GraduationCap,
    accentText: 'text-[#0284C7]',
    ring: 'focus:ring-[#0284C7]',
    btnGradient: 'from-[#0284C7] to-[#0EA5E9]',
    shadow: 'shadow-sky-500/25'
  },
  student: {
    id: 'student',
    title: 'Student',
    icon: BookOpen,
    accentText: 'text-[#059669]',
    ring: 'focus:ring-[#059669]',
    btnGradient: 'from-[#059669] to-[#10B981]',
    shadow: 'shadow-emerald-500/25'
  }
};

export default function SignUp({ initialRole = 'alumni', onNavigateToSignIn, onSignUpSuccess }) {
  const { register } = useAuth();
  const [role, setRole] = useState(initialRole === 'admin' ? 'alumni' : initialRole);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    rollNumber: '',
    branch: 'AID',
    college: 'KIET',
    company: '',
    role: '',
    password: '', 
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Full name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'A valid email is required.';
    if (!form.rollNumber.trim()) return 'Roll number is required.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError('');
    try {
      await register(form.name.trim(), form.email.trim(), form.password, {
        role,
        phone: form.phone.trim(),
        rollNumber: form.rollNumber.trim().toUpperCase(),
        branch: form.branch,
        college: form.college,
        company: form.company.trim(),
        designation: form.role.trim() || (role === 'student' ? 'Student' : 'Software Engineer')
      });
      setSuccess(true);
      setTimeout(() => {
        if (onSignUpSuccess) onSignUpSuccess();
      }, 800);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentRole = roleMeta[role];

  return (
    <div className="min-h-screen w-full bg-[#EBF3FA] font-sans relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* ─── MAIN CARD CONTAINER (Matching Image 2 Layout) ─── */}
      <div className="relative z-20 w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[560px] lg:min-h-[640px] my-auto">
        
        {/* ─── LEFT BLUE CURVED BANNER (Matching Image 2 Left Side) ─── */}
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-[#0F4C81] via-[#1B5999] to-[#163172] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden rounded-b-[40px] lg:rounded-b-none lg:rounded-r-[240px] min-h-[320px] lg:min-h-full">
          
          {/* 3D Sphere 1: Bottom Left */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#1572CF] via-[#2A8BF2] to-[#60A5FA] shadow-2xl pointer-events-none opacity-95" />
          
          {/* 3D Sphere 2: Mid Right Curve */}
          <div className="absolute top-1/2 right-4 lg:-right-12 -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#1D6FD8] via-[#3B82F6] to-[#93C5FD] shadow-2xl pointer-events-none z-10" />

          {/* TOP SECTION: WELCOME + AlumniConnect */}
          <div className="relative z-20 space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-none">
                WELCOME
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="p-2 rounded-2xl bg-white shadow-md border border-white/40 shrink-0">
                  <AlumniConnectLogo className="w-9 h-9" showText={false} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight leading-none">AlumniConnect</h2>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mt-0.5">Official Registration</span>
                </div>
              </div>
            </div>

            {/* QUOTE SECTION (Under AlumniConnect) */}
            <div className="pt-6 sm:pt-10 space-y-3">
              <blockquote className="space-y-2">
                <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
                  "Where <span className="text-amber-300 underline underline-offset-4 decoration-amber-400/50">Memories</span> Meet <span className="text-sky-200">New Opportunities</span>"
                </p>
                <p className="text-xs text-blue-100/80 font-medium leading-relaxed max-w-xs">
                  Join as a student or alumnus to access 1-on-1 mentorship, placement referrals, and tech workshops.
                </p>
              </blockquote>
            </div>
          </div>

          <div className="relative z-20 pt-6 border-t border-white/15 text-[11px] text-blue-200 font-bold flex items-center justify-between">
            <span>KIET · KIEW · KIEK</span>
          </div>
        </div>

        {/* ─── RIGHT FORM SECTION ─── */}
        <div className="w-full lg:w-7/12 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10 max-h-[88vh] overflow-y-auto">
          
          {/* 3D Sphere 3: Bottom Right */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tl from-[#2563EB] via-[#3B82F6] to-[#60A5FA] shadow-2xl pointer-events-none z-0" />

          <div className="space-y-4 max-w-xl mx-auto w-full relative z-10">
            
            <div className="flex items-center justify-between">
              <button
                onClick={onNavigateToSignIn}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0F4C81] hover:underline transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>
              <span className="text-xs font-semibold text-slate-400">Step 1 of 1</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">CREATE ACCOUNT</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Join as a verified student or alumnus member.</p>
            </div>

            {/* Role Header Badge (Single active role display) */}
            <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 flex">
              {role === 'student' ? (
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#059669] text-white shadow-md">
                  <BookOpen className="w-4 h-4" />
                  <span>Student Account</span>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-[#0284C7] text-white shadow-md">
                  <GraduationCap className="w-4 h-4" />
                  <span>Alumni Account</span>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Registration successful! Redirecting to dashboard…</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                      placeholder="e.g. Pavani Kadari"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                      placeholder="e.g. name@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Roll Number *</label>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="rollNumber"
                      type="text"
                      required
                      value={form.rollNumber}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                      placeholder="e.g. 21B91A0501"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">College Campus</label>
                  <select
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                  >
                    <option value="KIET">KIET Main Campus</option>
                    <option value="KIEW">KIET Women's College (KIEW)</option>
                    <option value="KIEK">KIEK Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Department / Branch</label>
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                  >
                    <option value="AID">AI & Data Science (AID)</option>
                    <option value="CSM">CSE - AI & Machine Learning (CSM)</option>
                    <option value="CAI">CSE - Artificial Intelligence (CAI)</option>
                    <option value="CYBER">Cyber Security (CYBER)</option>
                    <option value="CSD">Computer Science & Design (CSD)</option>
                  </select>
                </div>
              </div>

              {role === 'alumni' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Current Company</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                        placeholder="e.g. Google, TCS, IIITH"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Designation / Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        name="role"
                        type="text"
                        value={form.role}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                        placeholder="e.g. AI Engineer"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                      placeholder="Min. 6 chars"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      required
                      value={form.confirm}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 ${currentRole.ring}`}
                      placeholder="Repeat password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r ${currentRole.btnGradient} hover:opacity-95 text-white font-extrabold text-sm sm:text-base shadow-lg ${currentRole.shadow} transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 uppercase tracking-wider`}
              >
                {loading ? (
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 text-amber-300" />
                    <span>Create {role === 'student' ? 'Student' : 'Alumni'} Account</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs sm:text-sm text-slate-500 font-medium pt-1">
              Already registered?{' '}
              <button
                onClick={onNavigateToSignIn}
                className="font-extrabold text-[#0F4C81] hover:underline cursor-pointer"
              >
                Sign in to your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
