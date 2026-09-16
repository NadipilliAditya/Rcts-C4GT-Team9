import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = "Loading analytics data...", size = "md" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-48 bg-slate-800/40 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <Loader2 className={`${sizeClasses[size]} text-blue-500 animate-spin mb-3`} />
      <span className="text-sm font-medium text-slate-400">{message}</span>
    </div>
  );
}
