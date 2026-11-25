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
          <linearGradient id="safraLogoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="55%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="safraRing" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <rect width="64" height="64" rx="18" fill="url(#safraLogoBg)" />

        {/* Rotating orbital compass ring */}
        <g className="logo-orbit">
          <circle
            cx="32"
            cy="32"
            r="21"
            stroke="url(#safraRing)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <circle cx="32" cy="11" r="2.6" fill="#fde68a" />
        </g>

        {/* Floating airplane */}
        <g className="logo-plane">
          <path
            d="M46.5 17.5L28 30L19.5 26.8L15.5 30.2L24.2 35.4L21 44.5L25.2 46.2L31.4 38.2L41.2 43.8L44.2 39.8L36.2 32.8L46.5 17.5Z"
            fill="#ffffff"
          />
        </g>
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.35rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SAFRA
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>
            WORLD TRAVEL & TRUST
          </span>
        </div>
      )}
    </div>
  );
};
