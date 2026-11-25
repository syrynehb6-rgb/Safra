import React from 'react';

interface SafraLogoProps {
  size?: number;
  showText?: boolean;
}

export const SafraLogo: React.FC<SafraLogoProps> = ({ size = 44, showText = true }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="safraProBg" x1="4" y1="2" x2="60" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="52%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="safraGold" x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* Rounded App Icon Base */}
        <rect width="64" height="64" rx="18" fill="url(#safraProBg)" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="16.5" stroke="white" strokeOpacity="0.16" strokeWidth="1.5" />

        {/* Subtle Globe Latitude & Longitude */}
        <circle cx="32" cy="33" r="18" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />
        <ellipse cx="32" cy="33" rx="9" ry="18" stroke="white" strokeOpacity="0.18" strokeWidth="1.3" />
        <path d="M14.5 33H49.5" stroke="white" strokeOpacity="0.18" strokeWidth="1.3" />

        {/* Rotating Golden Orbital Ring (Global Connection & Trust) */}
        <g className="logo-orbit">
          <circle
            cx="32"
            cy="33"
            r="22.5"
            stroke="url(#safraGold)"
            strokeWidth="1.8"
            strokeDasharray="10 6"
            strokeLinecap="round"
          />
          <circle cx="32" cy="10.5" r="2.6" fill="#fde68a" />
        </g>

        {/* Location Pin + Compass Core */}
        <path
          d="M32 18C25.9 18 21 22.9 21 29C21 37.2 32 48.5 32 48.5C32 48.5 43 37.2 43 29C43 22.9 38.1 18 32 18Z"
          fill="white"
          fillOpacity="0.14"
          stroke="white"
          strokeWidth="1.8"
        />

        {/* Sleek Ascending Jet / Compass Needle */}
        <g className="logo-plane">
          <path
            d="M42.5 18.5L28.5 28.2L22.2 26.2L19.5 28.6L26.2 32.4L24.2 39.2L27.2 40.5L31.4 34.4L38.6 38.2L40.8 35.4L34.8 30.2L42.5 18.5Z"
            fill="url(#safraGold)"
          />
        </g>
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.38rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SAFRA
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
            GLOBAL TRAVEL ECOSYSTEM
          </span>
        </div>
      )}
    </div>
  );
};
