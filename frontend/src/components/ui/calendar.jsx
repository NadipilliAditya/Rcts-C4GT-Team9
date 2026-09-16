import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export function formatYYYYMMDD(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  required = false,
  className = '',
  ...props
}) {
  const min = minDate ? (typeof minDate === 'string' ? minDate : formatYYYYMMDD(minDate)) : undefined;
  const max = maxDate ? (typeof maxDate === 'string' ? maxDate : formatYYYYMMDD(maxDate)) : undefined;

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="date"
        value={value || ''}
        min={min}
        max={max}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="flex h-10 w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors cursor-pointer"
        {...props}
      />
      <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
    </div>
  );
}

export default DatePicker;
