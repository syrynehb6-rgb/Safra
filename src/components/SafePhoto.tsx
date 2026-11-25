import React, { useState } from 'react';

interface SafePhotoProps {
  src: string;
  alt: string;
  fallbackEmoji?: string;
  priority?: boolean;
  height?: number;
}

export const SafePhoto: React.FC<SafePhotoProps> = ({
  src,
  alt,
  fallbackEmoji = '🌍',
  priority = false,
  height = 170,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          width: '100%',
          height: `${height}px`,
          borderRadius: '14px',
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--primary) 24%, var(--surface-2)), color-mix(in srgb, #f59e0b 20%, var(--surface-2)))',
          display: 'grid',
          placeItems: 'center',
          fontSize: '2.6rem',
          border: '1px solid var(--border)',
        }}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={600}
      height={height}
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? undefined : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      style={{
        width: '100%',
        height: `${height}px`,
        objectFit: 'cover',
        borderRadius: '14px',
        display: 'block',
        background: 'var(--surface-2)',
      }}
    />
  );
};
