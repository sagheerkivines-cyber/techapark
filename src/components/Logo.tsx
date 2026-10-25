import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'full' | 'icon';
}

export const TechLogoIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const dimension = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  }[size];

  return (
    <div
      className={`relative rounded-xl bg-gradient-to-br from-[#0c2f27] via-[#081f1a] to-[#04100e] border border-[#5fdee7]/40 shadow-[0_0_15px_rgba(95,222,231,0.25)] flex items-center justify-center p-1 overflow-hidden transition-all duration-300 group-hover:border-[#5fdee7] group-hover:shadow-[0_0_22px_rgba(95,222,231,0.45)] group-hover:scale-105 ${dimension} ${className}`}
    >
      {/* Subtle background circuit lines */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5fdee7_1px,transparent_1px)] [background-size:6px_6px]" />

      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="logoNeon" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5fdee7" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Tech Crest */}
        <polygon
          points="32,6 54,18 54,46 32,58 10,46 10,18"
          fill="#061512"
          fillOpacity="0.8"
          stroke="#5fdee7"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeOpacity="0.7"
        />

        {/* Inner Tech Monogram (T + P) with Quantum Center */}
        <g filter="url(#logoGlow)">
          {/* T-Bar with cyber wings */}
          <path d="M19 22 L45 22" stroke="url(#logoNeon)" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M19 22 L22 17" stroke="#5fdee7" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M45 22 L42 27" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />

          {/* Vertical Stem of T & P */}
          <path d="M32 22 L32 46" stroke="url(#logoNeon)" strokeWidth="3.6" strokeLinecap="round" />

          {/* P-Loop returning to Stem */}
          <path
            d="M32 25 C41 25 44 28.5 44 33.5 C44 38.5 40 40 32 40"
            fill="none"
            stroke="url(#logoNeon)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Quantum Node */}
          <circle cx="32" cy="32" r="2.5" fill="#5fdee7" />
          <circle cx="32" cy="32" r="1" fill="#ffffff" />

          {/* Satellite Data Beacons */}
          <circle cx="44" cy="33.5" r="1.8" fill="#10b981" />
          <circle cx="32" cy="46" r="2" fill="#5fdee7" />
        </g>
      </svg>
    </div>
  );
};

export const TechLogoFull: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  variant = 'full',
  className = ''
}) => {
  if (variant === 'icon') {
    return <TechLogoIcon size={size} className={className} />;
  }

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <TechLogoIcon size={size} />
      <div className="flex flex-col">
        <div className={`font-display font-extrabold tracking-tight leading-none ${textClasses} flex items-center`}>
          <span className="text-white group-hover:text-slate-100 transition-colors">Tech</span>
          <span className="text-[#10b981] mx-[0.5px] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">A</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5fdee7] to-[#38bdf8] group-hover:from-[#7bf1f9] group-hover:to-[#5fdee7] transition-all drop-shadow-[0_0_10px_rgba(95,222,231,0.3)]">
            Park
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#5fdee7]/70 uppercase mt-1">
            Engineering Journal
          </span>
        )}
      </div>
    </div>
  );
};
