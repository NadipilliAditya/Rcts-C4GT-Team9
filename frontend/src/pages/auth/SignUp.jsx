import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
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
    gradient: 'from-blue-600 to-cyan-600',
    shadow: 'shadow-blue-500/25',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    ring: 'focus:ring-blue-500'
  },
  student: {
    id: 'student',
    title: 'Student',
    icon: BookOpen,
    gradient: 'from-emerald-600 to-teal-600',
    shadow: 'shadow-emerald-500/25',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    ring: 'focus:ring-emerald-500'
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
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* LEFT PANEL: Branding & Visuals (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-slate-950 flex-col justify-between p-12">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-blue-600/20 to-cyan-600/20 blur-[80px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AlumniConnect</span>
          </div>

          <div className="space-y-6 max-w-md mt-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              Start your journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Team 9 Platform</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              Create an account to gain access to exclusive mentorships, career opportunities, and a thriving community of peers and alumni.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">Join 5,000+ members</p>
              <p className="text-slate-500">Already networking today</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative bg-slate-50 overflow-y-auto py-12">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8 absolute top-8 left-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">AlumniConnect</span>
        </div>

        <div className="w-full max-w-xl mx-auto my-auto">
          
          <button
            type="button"
            onClick={onNavigateToSignIn}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Create your account</h2>
            <p className="text-slate-500">Join our network to unlock exclusive opportunities.</p>
          </div>

          {/* Premium Role Selector */}
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mb-8 flex gap-1 relative z-10">
            {Object.values(roleMeta).map((r) => {
              const isActive = role === r.id;
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { setRole(r.id); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  Join as {r.title}
                </button>
              );
            })}
          </div>

          {success && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm animate-in fade-in slide-in-from-top-2">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">Account created successfully! Logging you in...</span>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 transition-colors ${form.name ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={`block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                  placeholder={role === 'alumni' ? 'e.g. PAVANI KADARI' : 'e.g. ALEX RIVERA'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 transition-colors ${form.email ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className={`w-5 h-5 transition-colors ${form.phone ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                  </div>
                  <input
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Roll No</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className={`w-4 h-4 transition-colors ${form.rollNumber ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                  </div>
                  <input
                    name="rollNumber"
                    type="text"
                    required
                    value={form.rollNumber}
                    onChange={handleChange}
                    className={`block w-full pl-9 pr-3 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 uppercase focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm text-sm`}
                    placeholder="22B21..."
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Branch</label>
                <select
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm text-sm`}
                >
                  <option value="AID">AID</option>
                  <option value="CSD">CSD</option>
                  <option value="CAI">CAI</option>
                  <option value="CSM">CSM</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">College</label>
                <select
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  className={`block w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm text-sm`}
                >
                  <option value="KIET">KIET</option>
                  <option value="KIEW">KIEW</option>
                  <option value="KIEK">KIEK</option>
                </select>
              </div>
            </div>

            {/* Alumni Professional Info */}
            {role === 'alumni' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in zoom-in duration-300">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Company (Optional)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building className={`w-5 h-5 transition-colors ${form.company ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                    </div>
                    <input
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                      placeholder="e.g. DATA I2I"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Designation / Role</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Briefcase className={`w-5 h-5 transition-colors ${form.role ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                    </div>
                    <input
                      name="role"
                      type="text"
                      value={form.role}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                      placeholder="e.g. AI Engineer"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors ${form.password ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                    placeholder="Min. 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors ${form.confirm ? currentRole.text : 'text-slate-400 group-focus-within:text-slate-600'}`} />
                  </div>
                  <input
                    name="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={form.confirm}
                    onChange={handleChange}
                    className={`block w-full pl-11 pr-12 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm ${
                      form.confirm && form.confirm !== form.password ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 ' + currentRole.ring
                    }`}
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full flex items-center justify-center gap-2 py-3.5 mt-4 rounded-xl bg-gradient-to-r ${currentRole.gradient} hover:opacity-90 text-white font-semibold text-base shadow-lg ${currentRole.shadow} transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {loading ? 'Creating Account...' : `Register as ${role === 'alumni' ? 'Alumnus' : 'Student'}`}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
