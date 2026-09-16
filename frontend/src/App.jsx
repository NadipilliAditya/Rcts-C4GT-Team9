import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';

// Navigation & Layout
import Sidebar from './components/admin/Sidebar';

// Admin Views
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAlumni from './pages/admin/ManageAlumni';
import ManageStudents from './pages/admin/ManageStudents';
import ManageEvents from './pages/admin/ManageEvents';
import Contributions from './pages/admin/Contributions';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';
import PlatformSettings from './pages/admin/PlatformSettings';

// Alumni Views
import AlumniDashboard from './pages/alumni/AlumniDashboard';
import AlumniProfileView from './pages/alumni/AlumniProfileView';

// Student Views
import StudentDashboard from './pages/student/StudentDashboard';
import FindAlumni from './pages/student/FindAlumni';

// Shared Community & Operations Views
import EventsList from './pages/events/EventsList';
import EventDetail from './pages/events/EventDetail';
import MyMentorships from './pages/mentorship/MyMentorships';
import MyReferrals from './pages/referrals/MyReferrals';
import SubmitReferral from './pages/referrals/SubmitReferral';
import ChatPlatform from './pages/chat/ChatPlatform';

// Auth Pages (Image 1 Sign In & Sign Up)
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// ─── Main Authenticated Layout ───────────────────────────────────────────────
function MainLayout() {
  const { role } = useAuth();
  
  const getDefaultTab = (r) => {
    if (r === 'alumni') return 'alumni-dashboard';
    if (r === 'student') return 'student-dashboard';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(() => getDefaultTab(role));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setActiveTab(getDefaultTab(role));
  }, [role]);

  const renderContent = () => {
    switch (activeTab) {
      // Admin Views (Full platform management)
      case 'dashboard':        return <AdminDashboard />;
      case 'alumni':           return <ManageAlumni />;
      case 'students':         return <ManageStudents />;
      case 'manage-events':    return <ManageEvents />;
      case 'contributions':    return <Contributions />;
      case 'reports':          return <ReportsAnalytics />;
      case 'settings':         return <PlatformSettings />;

      // Alumni Views
      case 'alumni-dashboard': return <AlumniDashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'alumni-profile':   return <AlumniProfileView />;

      // Student Views
      case 'student-dashboard': return <StudentDashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'find-alumni':      return <FindAlumni onNavigateToChat={() => setActiveTab('chat')} />;

      // Shared Operations Views
      case 'events':           return <EventsList onNavigate={(tab) => setActiveTab(tab)} />;
      case 'mentorship':       return <MyMentorships />;
      case 'referrals':        return <MyReferrals onNavigate={(tab) => setActiveTab(tab)} />;
      case 'submit-referral':  return <SubmitReferral onBack={() => setActiveTab('referrals')} />;
      case 'chat':             return <ChatPlatform />;

      default:                 return role === 'alumni' ? <AlumniDashboard onNavigate={setActiveTab} /> : role === 'student' ? <StudentDashboard onNavigate={setActiveTab} /> : <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        {renderContent()}
      </div>
    </div>
  );
}

// ─── Direct Landing Authentication Gate (Displays Image 1 on open) ────────────
function AuthGate() {
  const { isAuthenticated, isLoading } = useAuth();
  const [authView, setAuthView] = useState('signin'); // Directly defaults to Sign In (Image 1)
  const [targetRole, setTargetRole] = useState('admin');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
            <svg className="w-7 h-7 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm font-medium">Loading AlumniConnect…</p>
        </div>
      </div>
    );
  }

  // If unauthenticated: directly show Sign In (Image 1)
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <SignUp
          initialRole={targetRole}
          onNavigateToSignIn={() => setAuthView('signin')}
          onSignUpSuccess={() => { /* flips to authenticated */ }}
        />
      );
    }

    return (
      <SignIn
        initialRole={targetRole}
        onNavigateToSignUp={(role) => {
          setTargetRole(role || 'student');
          setAuthView('signup');
        }}
        onLoginSuccess={() => { /* flips to authenticated */ }}
      />
    );
  }

  // Once authenticated: load Dashboard
  return <MainLayout />;
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AuthGate />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
