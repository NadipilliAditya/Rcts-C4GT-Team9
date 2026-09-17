import React from 'react';

export default function AlumniConnectLogo({ className = "w-14 h-14", showText = true, textLayout = "horizontal", variant = "auto" }) {
  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-3 ${textLayout === 'vertical' ? 'flex-col text-center' : ''}`}>
      <div className="relative shrink-0 filter drop-shadow-md">
        <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Ring & Solid Crisp Background */}
          <circle cx="100" cy="100" r="94" fill="#FFFFFF"/>
          <circle cx="100" cy="100" r="92" stroke="#1E3A8A" strokeWidth="8"/>
          <circle cx="100" cy="100" r="85" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
          
          {/* Golden Sun */}
          <circle cx="100" cy="70" r="35" fill="url(#sun-gradient-vibrant)"/>

          {/* Campus Main Building */}
          <path d="M 80,98 L 80,58 L 120,58 L 120,98 Z" fill="#1E3A8A"/>
          {/* Steeple / Tower Roof */}
          <path d="M 100,34 L 78,58 L 122,58 Z" fill="#1E3A8A"/>
          
          {/* Clock Face */}
          <circle cx="100" cy="66" r="6" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.5"/>
          <line x1="100" y1="66" x2="100" y2="62" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
          <line x1="100" y1="66" x2="103" y2="66" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>

          {/* Arched Door */}
          <path d="M 92,98 A 8 8 0 0 1 108 98 L 108,98 L 92,98 Z" fill="#FFFFFF"/>

          {/* Side Wings */}
          <path d="M 60,98 L 60,74 L 80,74 L 80,98 Z" fill="#1E3A8A"/>
          <path d="M 120,98 L 120,74 L 140,74 L 140,98 Z" fill="#1E3A8A"/>

          {/* Windows */}
          <rect x="65" y="79" width="4.5" height="7" fill="#FFFFFF" rx="1"/>
          <rect x="72" y="79" width="4.5" height="7" fill="#FFFFFF" rx="1"/>
          <rect x="123.5" y="79" width="4.5" height="7" fill="#FFFFFF" rx="1"/>
          <rect x="130.5" y="79" width="4.5" height="7" fill="#FFFFFF" rx="1"/>

          {/* Trees Left & Right */}
          <path d="M 44,98 C 44,66 60,66 60,98 Z" fill="#10B981"/>
          <path d="M 156,98 C 156,66 140,66 140,98 Z" fill="#10B981"/>

          {/* Ground Base */}
          <path d="M 12,118 C 50,96 150,96 188,118 L 188,188 A 92 92 0 0 1 12,188 Z" fill="#1E3A8A"/>

          {/* Winding Campus Path */}
          <path d="M 92,98 C 84,118 126,138 110,188 L 82,188 C 98,142 66,122 108,98 Z" fill="#10B981"/>

          <defs>
            <linearGradient id="sun-gradient-vibrant" x1="100" y1="35" x2="100" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FCD34D"/>
              <stop offset="0.5" stopColor="#F59E0B"/>
              <stop offset="1" stopColor="#D97706"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className={textLayout === 'vertical' ? 'mt-2' : ''}>
          <div className="font-black tracking-tight leading-none flex items-center justify-center gap-1.5 text-xl sm:text-2xl">
            <span className={isDark ? "text-white" : "text-[#1E3A8A]"}>Alumni</span>
            <span className="text-[#D97706]">Connect</span>
          </div>
          <p className={`text-[11px] sm:text-xs font-semibold tracking-wide mt-1 italic ${isDark ? "text-blue-100/90" : "text-slate-600"}`}>
            Where Memories Meet New Opportunities
          </p>
        </div>
      )}
    </div>
  );
}
