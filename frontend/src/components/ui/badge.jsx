import React from 'react';

export function statusClass(status = '') {
  const s = String(status).toLowerCase();
  switch (s) {
    case 'active':
    case 'accepted':
    case 'hired':
    case 'completed':
    case 'approved':
      return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    case 'pending':
    case 'requested':
    case 'in_progress':
    case 'reviewing':
    case 'interview':
    case 'interviewing':
      return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    case 'rejected':
    case 'cancelled':
    case 'inactive':
    case 'expired':
      return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
    case 'upcoming':
      return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border border-slate-700';
  }
}

export function Badge({ className = '', variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    secondary: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
