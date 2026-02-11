import { useState, useEffect, useCallback } from 'react';

interface SectionHighlightOverlayProps {
  isOpen: boolean;
  hoveredSection: string | null;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function SectionHighlightOverlay({
  isOpen,
  hoveredSection,
}: SectionHighlightOverlayProps) {
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback(() => {
    if (!hoveredSection) {
      setRect(null);
      return;
    }
    const el = document.querySelector(`[data-section="${hoveredSection}"]`);
    if (!el) {
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [hoveredSection]);

  useEffect(() => {
    if (!isOpen || !hoveredSection) {
      setRect(null);
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

  if (!isOpen || !hoveredSection || !rect) return null;

  return (
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
        boxShadow: '0 0 0 3px #FFD000, 0 0 16px 0 rgba(255,208,0,0.4), 0 0 0 9999px rgba(0,0,0,0.6)',
        transition: 'opacity 0.2s ease',
      }}
    />
  );
}
