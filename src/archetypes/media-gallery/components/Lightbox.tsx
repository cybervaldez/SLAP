import React, { useEffect, useCallback } from 'react';
import type { MediaItem } from '../data';

const ACCENT = '#EC4899';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface LightboxProps {
  item: MediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const navButtonStyle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.25)',
  color: '#FFFFFF',
  width: 48,
  height: 48,
  borderRadius: '50%',
  fontSize: '1.4rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s ease',
  lineHeight: 1,
};

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      data-testid="lightbox"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Close button */}
      <button
        data-testid="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#FFFFFF',
          width: 44,
          height: 44,
          borderRadius: '50%',
          fontSize: '1.3rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_FAMILY,
          transition: 'background 0.15s ease',
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)';
        }}
        aria-label="Close lightbox"
      >
        {'\u2715'}
      </button>

      {/* Previous button */}
      <button
        data-testid="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        style={{ ...navButtonStyle, left: 24 }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)';
        }}
        aria-label="Previous image"
      >
        {'\u2039'}
      </button>

      {/* Next button */}
      <button
        data-testid="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        style={{ ...navButtonStyle, right: 24 }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)';
        }}
        aria-label="Next image"
      >
        {'\u203A'}
      </button>

      {/* Image placeholder */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '70vw',
          maxWidth: 800,
          aspectRatio: `${item.width} / ${item.height}`,
          maxHeight: '65vh',
          backgroundColor: item.color,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '1.1rem',
          fontWeight: 600,
          textShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        {item.width} x {item.height}
      </div>

      {/* Info bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: 20,
          textAlign: 'center',
          color: '#FFFFFF',
        }}
      >
        <h2
          style={{
            margin: '0 0 6px',
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '3px 12px',
              borderRadius: 12,
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {item.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: ACCENT }}>{'\u2665'}</span>
            {item.likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
