import React from 'react';

export function Alert({ className = '', variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-slate-800 border-slate-700 text-slate-200',
    destructive: 'bg-rose-950/60 border-rose-800/80 text-rose-200',
    error: 'bg-rose-950/60 border-rose-800/80 text-rose-200',
    success: 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200',
    warning: 'bg-amber-950/60 border-amber-800/80 text-amber-200',
    info: 'bg-blue-950/60 border-blue-800/80 text-blue-200',
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <div
      role="alert"
      className={`relative w-full rounded-xl border p-4 text-sm shadow-md ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ className = '', children, ...props }) {
  return (
    <h5 className={`mb-1 font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h5>
  );
}

export function AlertDescription({ className = '', children, ...props }) {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Alert;
