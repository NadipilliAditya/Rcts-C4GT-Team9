import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CalendarDays, 
  Briefcase, 
  BookOpen,
  CalendarCheck,
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  LogOut,
  MessageSquare,
  DollarSign,
  FileText,
  Settings,
  Search,
  UserCheck,
  X
} from 'lucide-react';
import { useAuth } from '../../lib/auth';

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, isOpen, onClose }) {
  const { user, role, switchRole, logout } = useAuth();

  // Navigation configurations based on role
  const getNavSections = () => {
    if (role === 'alumni') {
      return [
        {
          title: 'Alumni Workspace',
          items: [
            { id: 'alumni-dashboard', label: 'Alumni Overview', icon: LayoutDashboard, badge: 'Active' },
            { id: 'alumni-profile', label: 'Profile & Availability', icon: UserCheck },
            { id: 'mentorship', label: 'Mentorship Hub', icon: BookOpen },
            { id: 'referrals', label: 'Post Job Referrals', icon: Briefcase },
          ]
        },
        {
          title: 'Community & Connect',
          items: [
            { id: 'chat', label: 'Student Messages', icon: MessageSquare, badge: 'Live' },
            { id: 'events', label: 'Events & Tech Talks', icon: CalendarDays },
          ]
        }
      ];
    }

    if (role === 'student') {
      return [
        {
          title: 'Student Portal',
          items: [
            { id: 'student-dashboard', label: 'Student Overview', icon: LayoutDashboard },
            { id: 'find-alumni', label: 'Find Alumni Mentors', icon: Search, badge: '5.2k' },
            { id: 'mentorship', label: 'My Mentorships', icon: BookOpen },
            { id: 'referrals', label: 'Job Referrals Board', icon: Briefcase },
          ]
        },
        {
          title: 'Network & Events',
          items: [
            { id: 'chat', label: 'Alumni Messages', icon: MessageSquare, badge: 'Live' },
            { id: 'events', label: 'Events & Workshops', icon: CalendarDays },
          ]
        }
      ];
    }

    // Default: Admin has full access to the whole website
    return [
      {
        title: 'Platform Administration',
        items: [
          { id: 'dashboard', label: 'Admin Analytics', icon: LayoutDashboard, badge: 'Live' },
          { id: 'alumni', label: 'Manage Alumni', icon: Users },
          { id: 'students', label: 'Manage Students', icon: GraduationCap },
          { id: 'manage-events', label: 'Manage Events', icon: CalendarCheck },
        ]
      },
      {
        title: 'Operations & Programs',
        items: [
          { id: 'mentorship', label: 'Mentorship Hub', icon: BookOpen },
          { id: 'referrals', label: 'Job Referrals', icon: Briefcase },
          { id: 'contributions', label: 'Contributions & Fund', icon: DollarSign },
          { id: 'events', label: 'Events Directory', icon: CalendarDays },
          { id: 'chat', label: 'Live Chat Hub', icon: MessageSquare },
          { id: 'reports', label: 'Analytics & Reports', icon: FileText },
          { id: 'settings', label: 'Platform Settings', icon: Settings },
        ]
      }
    ];
  };

  const navSections = getNavSections();

  const getActiveGradient = () => {
    if (role === 'admin') return 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-500/25';
    if (role === 'alumni') return 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/25';
    return 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/25';
  };

  return (
    <>
      {/* Semi-transparent Backdrop Overlay when Drawer Sidebar is Open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Slide-out Drawer Panel Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 bg-slate-950 text-slate-100 border-r border-white/10 transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'
        }`}
      >
        {/* Brand Header & Close Button */}
        <div className="h-[76px] flex items-center justify-between px-5 border-b border-white/10 shrink-0">
          <div 
            className="flex items-center gap-3 overflow-hidden cursor-pointer" 
            onClick={() => {
              if (role === 'alumni') setActiveTab('alumni-dashboard');
              else if (role === 'student') setActiveTab('student-dashboard');
              else setActiveTab('dashboard');
              if (onClose) onClose();
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white whitespace-nowrap leading-tight">
                Alumni<span className="text-indigo-400">Connect</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 leading-tight">
                {role === 'admin' ? 'Admin Portal' : role === 'alumni' ? 'Alumni Portal' : 'Student Portal'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            title="Close Menu Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Menu */}
        <nav className="flex-1 py-6 px-4 space-y-6 overflow-y-auto custom-scrollbar">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="px-2 mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (onClose) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? `${getActiveGradient()} text-white shadow-lg font-semibold`
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-5 h-5 shrink-0 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                          isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Role Switcher & User Status */}
        <div className="p-4 m-4 bg-slate-900/80 border border-white/10 rounded-2xl space-y-3 relative overflow-hidden group shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-slate-400">Current Role:</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              role === 'admin' 
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                : role === 'alumni'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}>
              {role}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] relative z-10">
            <button
              onClick={() => {
                switchRole('admin');
                setActiveTab('dashboard');
                if (onClose) onClose();
              }}
              className={`py-1.5 rounded-lg font-medium transition-all ${
                role === 'admin' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => {
                switchRole('alumni');
                setActiveTab('alumni-dashboard');
                if (onClose) onClose();
              }}
              className={`py-1.5 rounded-lg font-medium transition-all ${
                role === 'alumni' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Alumni
            </button>
            <button
              onClick={() => {
                switchRole('student');
                setActiveTab('student-dashboard');
                if (onClose) onClose();
              }}
              className={`py-1.5 rounded-lg font-medium transition-all ${
                role === 'student' ? 'bg-emerald-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Student
            </button>
          </div>

          <div className="pt-2 flex items-center gap-3 relative z-10 border-t border-white/10">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-slate-700 shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate leading-tight">{user?.name}</p>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{user?.company || user?.department}</p>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-colors shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
