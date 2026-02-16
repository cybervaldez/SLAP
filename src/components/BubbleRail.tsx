import React from 'react';
import type { BubbleData } from '../types';

interface BubbleRailProps {
  mode: 'review' | 'kaizen';
  onModeChange: (mode: 'review' | 'kaizen') => void;
  expertBubbles: BubbleData[];
  personaBubbles: BubbleData[];
  activeBubbleId: string | null;
  onBubbleClick: (id: string, rect: DOMRect) => void;
}

function scoreColor(score: number) {
  if (score >= 7) return '#6BCB77';
  if (score >= 5) return '#FFD93D';
  return '#FF6B6B';
}

const st: Record<string, React.CSSProperties> = {
  rail: {
    position: 'fixed',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 800,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    pointerEvents: 'auto',
  },
  aggregate: {
    textAlign: 'center' as const,
    marginBottom: 6,
    padding: '6px 4px',
    border: '1px solid rgba(245, 240, 225, 0.12)',
    borderRadius: 4,
    background: 'rgba(34, 34, 64, 0.8)',
    minWidth: 52,
    transition: 'opacity 250ms cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
  aggregateScore: {
    fontSize: '1rem',
    fontWeight: 800,
    lineHeight: 1,
    fontFamily: "'Courier New', monospace",
  },
  aggregateScoreSmall: {
    fontSize: '0.45rem',
    color: 'rgba(245, 240, 225, 0.5)',
    fontWeight: 700,
  },
  aggregateLights: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
    marginTop: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
  },
  modeToggle: {
    display: 'flex',
    gap: 0,
    background: '#222240',
    borderRadius: 9999,
    border: '1px solid rgba(245, 240, 225, 0.12)',
    overflow: 'hidden',
    marginBottom: 6,
  },
  modeBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.45rem',
    fontWeight: 700,
    padding: '4px 8px',
    border: 'none',
    cursor: 'pointer',
    background: 'transparent',
    color: 'rgba(245, 240, 225, 0.5)',
    letterSpacing: '0.06em',
    whiteSpace: 'nowrap' as const,
    transition: 'all 150ms',
  },
  modeBtnActive: {
    background: '#FFD000',
    color: '#1A1A2E',
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative' as const,
    border: '2px solid transparent',
    transition: 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 150ms, box-shadow 150ms',
    flexShrink: 0,
  },
  bubbleImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    background: '#222240',
  },
  bubbleFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 800,
  },
};

const KEYFRAMES = `
@keyframes bubbleEnter {
  from { opacity: 0; transform: translateX(20px) scale(0.5); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
`;

export default function BubbleRail({
  mode,
  onModeChange,
  expertBubbles,
  personaBubbles,
  activeBubbleId,
  onBubbleClick,
}: BubbleRailProps) {
  const bubbles = mode === 'review' ? expertBubbles : personaBubbles;

  // Compute aggregate: average score and severity dot counts
  const avgScore = bubbles.length > 0
    ? Math.round(bubbles.reduce((s, b) => s + b.score, 0) / bubbles.length)
    : 0;
  const severityCounts = { red: 0, yellow: 0, green: 0 };
  for (const b of bubbles) {
    if (b.score < 5) severityCounts.red++;
    else if (b.score < 7) severityCounts.yellow++;
    else severityCounts.green++;
  }
  const aggregateHidden = activeBubbleId !== null;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={st.rail} data-testid="bubble-rail">
        {/* Aggregate Summary */}
        <div
          style={{
            ...st.aggregate,
            opacity: aggregateHidden ? 0 : 1,
            pointerEvents: aggregateHidden ? 'none' as const : 'auto' as const,
          }}
          data-testid="aggregate-summary"
        >
          <div style={{ ...st.aggregateScore, color: scoreColor(avgScore) }}>
            {avgScore}<span style={st.aggregateScoreSmall}>/10</span>
          </div>
          <div style={st.aggregateLights}>
            {severityCounts.red > 0 && (
              <div style={{ ...st.dot, background: '#FF6B6B' }} title={`${severityCounts.red} critical`} />
            )}
            {severityCounts.yellow > 0 && (
              <div style={{ ...st.dot, background: '#FFD93D' }} title={`${severityCounts.yellow} warnings`} />
            )}
            {severityCounts.green > 0 && (
              <div style={{ ...st.dot, background: '#6BCB77' }} title={`${severityCounts.green} passing`} />
            )}
          </div>
        </div>

        {/* Mode toggle */}
        <div style={st.modeToggle}>
          <button
            style={{ ...st.modeBtn, ...(mode === 'review' ? st.modeBtnActive : {}) }}
            onClick={() => onModeChange('review')}
            data-testid="bubble-mode-review"
          >
            REVIEW
          </button>
          <button
            style={{ ...st.modeBtn, ...(mode === 'kaizen' ? st.modeBtnActive : {}) }}
            onClick={() => onModeChange('kaizen')}
            data-testid="bubble-mode-kaizen"
          >
            KAIZEN
          </button>
        </div>

        {/* Bubbles — no score badges */}
        {bubbles.map((b, i) => {
          const isActive = b.id === activeBubbleId;
          const accent = b.accentColor || '#FFD000';
          return (
            <div
              key={b.id}
              data-testid={`bubble-${b.id}`}
              title={b.label || b.id}
              style={{
                ...st.bubble,
                ...(isActive ? {
                  borderColor: accent,
                  boxShadow: `0 0 12px ${accent}4D`,
                  transform: 'scale(1.15)',
                } : {}),
                opacity: 0,
                animation: `bubbleEnter 400ms cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 60}ms forwards`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget;
                  el.style.transform = 'scale(1.08)';
                  el.style.borderColor = accent;
                  el.style.boxShadow = `0 0 8px ${accent}33`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget;
                  el.style.transform = '';
                  el.style.borderColor = 'transparent';
                  el.style.boxShadow = '';
                }
              }}
              onClick={(e) => {
                onBubbleClick(b.id, e.currentTarget.getBoundingClientRect());
              }}
            >
              {b.avatar ? (
                <img src={b.avatar} alt={b.label || b.id} style={st.bubbleImg} loading="lazy" />
              ) : (
                <div style={{
                  ...st.bubbleFallback,
                  background: b.bg || '#222240',
                  color: b.color || '#1A1A2E',
                }}>
                  {b.icon}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
