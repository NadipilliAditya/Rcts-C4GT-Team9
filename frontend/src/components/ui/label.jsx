import React from 'react';

export function Label({ className = '', children, ...props }) {
  return (
    <label
      className={`text-xs font-semibold text-slate-300 tracking-wide select-none ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;
