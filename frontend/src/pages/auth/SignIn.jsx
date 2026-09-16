import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen,
  Sparkles
} from 'lucide-react';

const roleMeta = {
  admin: {
    id: 'admin',
    title: 'Administrator',
    icon: ShieldCheck,
    gradient: 'from-indigo-600 to-violet-600',
    shadow: 'shadow-indigo-500/25',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
    ring: 'focus:ring-indigo-500'
  },
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

export default function SignIn({ 
  initialRole = 'admin', 
  onNavigateToSignUp, 
  onLoginSuccess 
}) {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(initialRole || 'admin');
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (initialRole && roleMeta[initialRole]) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  const handleRoleChange = (roleKey) => {
    setSelectedRole(roleKey);
    setError('');
    // Clear form when switching roles for security/cleanliness
    setForm({ email: '', password: '' });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  const currentRole = roleMeta[selectedRole];
  const RoleIcon = currentRole.icon;

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* LEFT PANEL: Branding & Visuals (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-slate-950 flex-col justify-between p-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-blue-600/20 to-cyan-600/20 blur-[80px]" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AlumniConnect</span>
          </div>

          <div className="space-y-6 max-w-md mt-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Past, Present & Future</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              Join our exclusive network to find mentors, unlock career opportunities, and stay connected with your alma mater.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
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
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative bg-slate-50">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-12 absolute top-8 left-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">AlumniConnect</span>
        </div>

        <div 
          className={`w-full max-w-md mx-auto transition-transform duration-300 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        >
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Welcome back</h2>
            <p className="text-slate-500">Please enter your details to sign in.</p>
          </div>

          {/* Premium Role Selector */}
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mb-8 flex gap-1 relative z-10">
            {Object.values(roleMeta).map((role) => {
              const isActive = selectedRole === role.id;
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleChange(role.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {role.title}
                </button>
              );
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
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
                  className={`block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className={`text-sm font-semibold ${currentRole.text} hover:underline`}>Forgot password?</a>
              </div>
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
                  className={`block w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentRole.ring} focus:border-transparent transition-all shadow-sm`}
                  placeholder="••••••••"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl bg-gradient-to-r ${currentRole.gradient} hover:opacity-90 text-white font-semibold text-base shadow-lg ${currentRole.shadow} transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          {selectedRole !== 'admin' ? (
            <div className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigateToSignUp(selectedRole)}
                className={`font-bold ${currentRole.text} hover:underline transition-all`}
              >
                Sign up as {selectedRole === 'student' ? 'Student' : 'Alumnus'}
              </button>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Admin access requires manual verification
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
