import React, { useEffect, useRef, useCallback } from 'react';
import type { DockMode } from '../types';

export interface BubbleData {
  id: string;
  icon: string;
  label?: string;
  score: number;
  bg?: string;
  color?: string;
}

interface DockBarProps {
  mode: DockMode | null;
  expertBubbles: BubbleData[];
  personaBubbles: BubbleData[];
  activeBubbleId: string | null;
  onModeChange: (mode: DockMode) => void;
  onBubbleClick: (id: string) => void;
}

// Module-level guard for keyframe injection
let stylesInjected = false;

function injectKeyframes() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slap-dock-fade-out {
      from { opacity: 1; }
      to   { opacity: 0; }
    }
    @keyframes slap-dock-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      [data-dock-row] { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

const SKEW = '-6deg';
const COUNTER_SKEW = '6deg';

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 900,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none',
    padding: '0 0.75rem 0.6rem',
    fontFamily: "'Courier New', monospace",
  },
  // Expert chips row
  expertRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    marginBottom: '0.4rem',
    pointerEvents: 'auto',
  },
  // Persona bubbles row
  personaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    marginBottom: '0.4rem',
    pointerEvents: 'auto',
  },
  // Neumorphic expert button (raised state)
  expertBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.5rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    padding: '0.4rem 0.7rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    border: 'none',
    background: '#2A2A4E',
    color: '#C8C0B0',
    borderRadius: 3,
    transform: `skewX(${SKEW})`,
    boxShadow: '3px 3px 6px rgba(0,0,0,0.5), -2px -2px 5px rgba(80,80,120,0.25)',
    transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
    minHeight: 36,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expertBtnActive: {
    background: '#222240',
    color: '#FFD000',
    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(80,80,120,0.15)',
  },
  expertBtnText: {
    transform: `skewX(${COUNTER_SKEW})`,
    display: 'inline-block',
  },
  // Round persona bubble
  personaBubble: {
    position: 'relative' as const,
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '0.7rem',
    fontWeight: 800,
    transition: 'transform 0.15s, border-color 0.15s',
    flexShrink: 0,
    border: '2px solid transparent',
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
  },
  personaBubbleActive: {
    borderColor: '#FFD000',
    boxShadow: '0 2px 10px rgba(255, 208, 0, 0.3)',
  },
  personaBadge: {
    position: 'absolute' as const,
    top: -4,
    right: -4,
    fontSize: '0.45rem',
    background: '#1A1A2E',
    borderRadius: '50%',
    width: 15,
    height: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
  },
  // Pill dock container
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0,
    background: '#1A1A2E',
    borderRadius: 9999,
    border: '1.5px solid rgba(255, 208, 0, 0.25)',
    overflow: 'hidden',
    pointerEvents: 'auto',
    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
  },
  btn: {
    border: 'none',
    padding: '0.5rem 1rem',
    fontFamily: "'Courier New', monospace",
    fontWeight: 700,
    fontSize: '0.65rem',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'background 0.15s, color 0.15s',
    background: 'transparent',
    color: '#9E9EB8',
    borderRadius: 0,
  },
  btnActive: {
    background: '#FFD000',
    color: '#1A1A2E',
  },
  btnInactive: {
    background: 'transparent',
    color: '#9E9EB8',
  },
  pillDivider: {
    width: 1,
    height: 18,
    background: 'rgba(154, 138, 122, 0.25)',
    flexShrink: 0,
  },
};

const BADGE_COLOR: Record<string, string> = {
  high: '#6BCB77',
  mid: '#FFD93D',
  low: '#FF6B6B',
};

function scoreBadgeColor(score: number): string {
  if (score >= 7) return BADGE_COLOR.high;
  if (score >= 5) return BADGE_COLOR.mid;
  return BADGE_COLOR.low;
}

export default function DockBar({
  mode,
  expertBubbles,
  personaBubbles,
  activeBubbleId,
  onModeChange,
  onBubbleClick,
}: DockBarProps) {
  const bubblesRef = useRef<HTMLDivElement>(null);
  const prevModeRef = useRef<DockMode | null>(mode);

  useEffect(() => {
    injectKeyframes();
  }, []);

  const isReview = mode === 'review';
  const isKaizen = mode === 'kaizen';
  const activeBubbles = mode === null ? [] : isReview ? expertBubbles : personaBubbles;
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animate on mode change — subtle opacity fade on the whole row
  useEffect(() => {
    if (prevModeRef.current === mode) return;
    prevModeRef.current = mode;

    if (prefersReduced || !bubblesRef.current) return;
    if (activeBubbles.length === 0) return;

    const row = bubblesRef.current;
    row.style.animation = 'slap-dock-fade-in 150ms ease-out';
    const handler = () => {
      row.style.animation = '';
      row.removeEventListener('animationend', handler);
    };
    row.addEventListener('animationend', handler);
  }, [mode, activeBubbles.length, prefersReduced]);

  const handleModeClick = useCallback((newMode: DockMode) => {
    if (newMode !== mode) {
      onModeChange(newMode);
    }
  }, [mode, onModeChange]);

  return (
    <div style={s.wrapper} data-testid="dock-bar">
      {/* Expert buttons or persona bubbles floating above the pill */}
      {activeBubbles.length > 0 && (
        <div ref={bubblesRef} data-dock-row style={isReview ? s.expertRow : s.personaRow}>
          {isReview
            ? expertBubbles.map((b) => {
                const isActive = b.id === activeBubbleId;
                const btnStyle: React.CSSProperties = {
                  ...s.expertBtn,
                  ...(isActive ? s.expertBtnActive : {}),
                };
                return (
                  <button
                    key={b.id}
                    data-dock-bubble
                    data-testid={`dock-bubble-${b.id}`}
                    style={btnStyle}
                    onClick={() => onBubbleClick(b.id)}
                  >
                    <span style={s.expertBtnText}>
                      {b.label || b.id.toUpperCase()}
                    </span>
                  </button>
                );
              })
            : personaBubbles.map((b) => {
                const isActive = b.id === activeBubbleId;
                const bubbleStyle: React.CSSProperties = {
                  ...s.personaBubble,
                  ...(b.bg ? { background: b.bg } : { background: '#2A2A4E' }),
                  ...(b.color ? { color: b.color } : {}),
                  ...(isActive ? s.personaBubbleActive : {}),
                };
                return (
                  <div
                    key={b.id}
                    data-dock-bubble
                    data-testid={`dock-bubble-${b.id}`}
                    style={bubbleStyle}
                    onClick={() => onBubbleClick(b.id)}
                  >
                    {b.icon}
                    <span style={{ ...s.personaBadge, color: scoreBadgeColor(b.score) }}>
                      {b.score}
                    </span>
                  </div>
                );
              })
          }
        </div>
      )}

      {/* Pill container */}
      <div style={s.pill}>
        <button
          data-testid="dock-btn-review"
          style={{
            ...s.btn,
            ...(isReview ? s.btnActive : s.btnInactive),
          }}
          onClick={() => handleModeClick('review')}
        >
          /ui-review
        </button>
        <div style={s.pillDivider} />
        <button
          data-testid="dock-btn-kaizen"
          style={{
            ...s.btn,
            ...(isKaizen ? s.btnActive : s.btnInactive),
          }}
          onClick={() => handleModeClick('kaizen')}
        >
          /kaizen
        </button>
      </div>
    </div>
  );
}
