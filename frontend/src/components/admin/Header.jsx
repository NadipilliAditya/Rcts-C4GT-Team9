import React from 'react';
import { Bell, Search, RefreshCw, User, ShieldCheck } from 'lucide-react';

export default function Header({ title, subtitle, onRefresh, isRefreshing }) {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-20 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh analytics data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            <span>Refresh</span>
          </button>
        )}

        <div className="h-6 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs">
            A
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-white">Senior Admin</span>
            <span className="text-[10px] text-slate-400">Team 4 Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
