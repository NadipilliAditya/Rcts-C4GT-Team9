import React, { useState } from 'react';
import Header from '../../components/admin/Header';
import { 
  Settings, 
  ShieldCheck, 
  Bell, 
  Database, 
  Mail, 
  Key, 
  CheckCircle2, 
  Save, 
  RefreshCw,
  Globe,
  Sliders
} from 'lucide-react';

export default function PlatformSettings({ onBack, onToggleSidebar }) {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    academicYear: '2024-2025',
    portalName: 'AlumniConnect Engagement Portal',
    allowStudentDirectMessaging: true,
    requireApprovalForReferrals: true,
    autoVerifyInstitutionalEmails: true,
    emailNotificationDigest: 'daily',
    enableEndowmentDrives: true
  });

  const handleToggle = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 min-w-0 bg-slate-950 pb-12">
      <Header
        title="Platform & Governance Settings"
        subtitle="Configure system rules, communication policies, academic calendars, and role permissions."
        onToggleSidebar={onToggleSidebar}
      />

      <main className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-400" />
              Governance Controls
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Configure system rules, communication policies, and role permissions.
            </p>
          </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Platform configuration updated successfully.
        </div>
      )}

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Academic Calendar & Branding */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Institution & Academic Year
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-300">Active Academic Year</label>
              <input 
                type="text" 
                value={config.academicYear} 
                onChange={(e) => setConfig({ ...config, academicYear: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-300">Portal Display Name</label>
              <input 
                type="text" 
                value={config.portalName} 
                onChange={(e) => setConfig({ ...config, portalName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Access Policies & Governance */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Access Policies & Moderation
          </h3>
          
          <div className="space-y-4 divide-y divide-slate-800/60">
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-xs font-semibold text-white">Direct Student-Alumni Messaging</h4>
                <p className="text-[11px] text-slate-400">Allow students to message alumni without requiring an admin pre-approval</p>
              </div>
              <button 
                onClick={() => handleToggle('allowStudentDirectMessaging')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  config.allowStudentDirectMessaging ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  config.allowStudentDirectMessaging ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-semibold text-white">Moderate Job Referrals</h4>
                <p className="text-[11px] text-slate-400">Require platform admin review before alumni job referrals appear on public board</p>
              </div>
              <button 
                onClick={() => handleToggle('requireApprovalForReferrals')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  config.requireApprovalForReferrals ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  config.requireApprovalForReferrals ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-semibold text-white">Auto-Verify Institutional Email Domains</h4>
                <p className="text-[11px] text-slate-400">Instant activation for sign-ups using approved @alumniconnect.edu domain</p>
              </div>
              <button 
                onClick={() => handleToggle('autoVerifyInstitutionalEmails')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  config.autoVerifyInstitutionalEmails ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  config.autoVerifyInstitutionalEmails ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-semibold text-white">Enable Alumni Endowment & Campaign Drives</h4>
                <p className="text-[11px] text-slate-400">Show donation campaigns and endowment funds on student & alumni dashboards</p>
              </div>
              <button 
                onClick={() => handleToggle('enableEndowmentDrives')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  config.enableEndowmentDrives ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  config.enableEndowmentDrives ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Database Status */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Security & System Health
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block mb-1">JWT Secret Status</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active (256-bit SHA)
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block mb-1">API Backend</span>
              <span className="font-semibold text-white">Express.js (Port 5000)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block mb-1">CORS & Proxy</span>
              <span className="font-semibold text-blue-400">Vite Forwarding OK</span>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
