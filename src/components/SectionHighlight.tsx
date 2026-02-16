import { useState, useEffect, useCallback, useRef } from 'react';

export interface HighlightInfo {
  section: string;
  text?: string;
  color?: string;
}

interface SectionHighlightOverlayProps {
  isOpen: boolean;
  highlight: HighlightInfo | null;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function SectionHighlightOverlay({
  isOpen,
  highlight,
}: SectionHighlightOverlayProps) {
  const [rect, setRect] = useState<Rect | null>(null);
  const [isOffScreen, setIsOffScreen] = useState<'above' | 'below' | null>(null);
  const hasScrolledRef = useRef(false);

  const hoveredSection = highlight?.section ?? null;
  const annotationText = highlight?.text ?? null;
  const highlightColor = highlight?.color ?? '#FFD000';

  const measure = useCallback(() => {
    if (!hoveredSection) {
      setRect(null);
      setIsOffScreen(null);
      return;
    }
    const el = document.querySelector(`[data-section="${hoveredSection}"]`);
    if (!el) {
      setRect(null);
      setIsOffScreen(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Check if section is off-screen
    if (r.bottom < 0) {
      setIsOffScreen('above');
      setRect(null);
    } else if (r.top > vh) {
      setIsOffScreen('below');
      setRect(null);
    } else {
      setIsOffScreen(null);
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
  }, [hoveredSection]);

  // Auto-scroll to off-screen section (once per hover, not continuous)
  useEffect(() => {
    if (!isOpen || !hoveredSection) {
      hasScrolledRef.current = false;
      return;
    }

    if (isOffScreen && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      const el = document.querySelector(`[data-section="${hoveredSection}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isOpen, hoveredSection, isOffScreen]);

  // Reset scroll flag when section changes
  useEffect(() => {
    hasScrolledRef.current = false;
  }, [hoveredSection]);

  useEffect(() => {
    if (!isOpen || !hoveredSection) {
      setRect(null);
      setIsOffScreen(null);
      return;
    }

    measure();

    let rafId: number;
    const tick = () => {
      measure();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isOpen, hoveredSection, measure]);

  if (!isOpen || !hoveredSection) return null;

  // Off-screen indicator
  if (isOffScreen) {
    const isAbove = isOffScreen === 'above';
    return (
      <div
        data-testid="section-offscreen-indicator"
        style={{
          position: 'fixed',
          [isAbove ? 'top' : 'bottom']: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 940,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.8rem',
          background: 'rgba(26, 26, 46, 0.9)',
          border: `2px solid ${highlightColor}`,
          borderRadius: 6,
          fontFamily: "'Courier New', monospace",
          fontSize: '0.6rem',
          fontWeight: 700,
          color: highlightColor,
          letterSpacing: '0.06em',
          animation: 'pulse-glow 1.5s ease-in-out infinite',
        }}
      >
        <span style={{ fontSize: '0.7rem' }}>{isAbove ? '\u2191' : '\u2193'}</span>
        {hoveredSection.toUpperCase()} SECTION {isAbove ? 'ABOVE' : 'BELOW'}
      </div>
    );
  }

  if (!rect) return null;

  const colorRgba = hexToRgba(highlightColor, 0.4);

  return (
    <>
      {/* Highlight box */}
      <div
        data-testid="section-highlight-overlay"
        data-highlighted-section={hoveredSection}
        style={{
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          pointerEvents: 'none',
          zIndex: 940,
          borderRadius: 4,
          boxShadow: `0 0 0 3px ${highlightColor}, 0 0 16px 0 ${colorRgba}, 0 0 0 9999px rgba(0,0,0,0.6)`,
          transition: 'top 0.15s ease, height 0.15s ease, box-shadow 0.2s ease',
        }}
      />
      {/* Annotation label */}
      {annotationText && (
        <div
          data-testid="section-annotation"
          style={{
            position: 'fixed',
            top: Math.max(8, rect.top - 32),
            left: rect.left + 8,
            zIndex: 941,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.6rem',
            background: 'rgba(26, 26, 46, 0.95)',
            border: `1.5px solid ${highlightColor}`,
            borderRadius: 4,
            fontFamily: "'Courier New', monospace",
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#F5F0E1',
            maxWidth: Math.min(rect.width - 16, 400),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'top 0.15s ease, opacity 0.2s ease',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: highlightColor,
              flexShrink: 0,
            }}
          />
          <span style={{ color: highlightColor, marginRight: '0.3rem' }}>
            {hoveredSection.toUpperCase()}
          </span>
          <span style={{ opacity: 0.85 }}>{annotationText}</span>
        </div>
      )}
    </>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(255,208,0,${alpha})`;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
