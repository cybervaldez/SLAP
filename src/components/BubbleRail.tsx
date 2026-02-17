/**
 * Bubble rail — reviewer avatars on the right edge.
 *
 * Three visual states:
 *   normal  — full 40px bubbles, clickable
 *   guided  — shrunk to 24px, active reviewer highlighted, others dimmed
 *   live    — active reviewer slot becomes dashed ghost, others dimmed
 */

import type { BubbleData } from '../types';
import type { TourMode } from '../hooks/useTourEngine';

interface BubbleRailProps {
  mode: 'review' | 'kaizen';
  onModeChange: (mode: 'review' | 'kaizen') => void;
  expertBubbles: BubbleData[];
  personaBubbles: BubbleData[];
  activeBubbleId: string | null;
  onBubbleClick: (id: string, rect: DOMRect) => void;
  tour: { active: boolean; mode: TourMode; reviewerId: string | null };
}

function scoreColor(s: number) { return s >= 7 ? '#6BCB77' : s >= 5 ? '#FFD93D' : '#FF6B6B'; }
function hexRgb(h: string) { return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`; }

const ENTER_KF = `@keyframes bubbleEnter { from { opacity:0; transform:translateX(20px) scale(0.5); } to { opacity:1; transform:translateX(0) scale(1); } }`;

export default function BubbleRail({ mode, onModeChange, expertBubbles, personaBubbles, activeBubbleId, onBubbleClick, tour }: BubbleRailProps) {
  const bubbles = mode === 'review' ? expertBubbles : personaBubbles;
  const avg = bubbles.length ? Math.round(bubbles.reduce((s,b) => s+b.score, 0) / bubbles.length) : 0;
  const counts = { red: 0, yellow: 0, green: 0 };
  for (const b of bubbles) { if (b.score < 5) counts.red++; else if (b.score < 7) counts.yellow++; else counts.green++; }
  const aggHidden = activeBubbleId !== null;

  return (
    <>
      <style>{ENTER_KF}</style>
      <div
        data-testid="bubble-rail"
        style={{
          position: 'fixed', right: 12, top: '50%', transform: 'translateY(-50%)',
          zIndex: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          pointerEvents: 'auto',
        }}
      >
        {/* Aggregate */}
        <div
          data-testid="aggregate-summary"
          style={{
            textAlign: 'center', marginBottom: 6, padding: '6px 4px',
            border: '1px solid rgba(245,240,225,0.12)', borderRadius: 4,
            background: 'rgba(34,34,64,0.8)', minWidth: 52,
            opacity: aggHidden ? 0 : 1, pointerEvents: aggHidden ? 'none' : 'auto',
            transition: 'opacity 250ms cubic-bezier(0.22,0.61,0.36,1)',
          }}
        >
          <div style={{ fontSize: '1rem', fontWeight: 800, lineHeight: 1, fontFamily: "'Courier New', monospace", color: scoreColor(avg) }}>
            {avg}<span style={{ fontSize: '0.45rem', color: 'rgba(245,240,225,0.5)', fontWeight: 700 }}>/10</span>
          </div>
          <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 3 }}>
            {counts.red > 0 && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF6B6B' }} title={`${counts.red} critical`} />}
            {counts.yellow > 0 && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD93D' }} title={`${counts.yellow} warnings`} />}
            {counts.green > 0 && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#6BCB77' }} title={`${counts.green} passing`} />}
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 0, background: '#222240', borderRadius: 9999, border: '1px solid rgba(245,240,225,0.12)', overflow: 'hidden', marginBottom: 6 }}>
          {(['review', 'kaizen'] as const).map(m => (
            <button
              key={m}
              data-testid={m === 'review' ? 'bubble-mode-experts' : 'bubble-mode-personas'}
              onClick={() => onModeChange(m)}
              style={{
                fontFamily: "'Courier New', monospace", fontSize: '0.45rem', fontWeight: 700,
                padding: '4px 8px', border: 'none', cursor: 'pointer',
                letterSpacing: '0.06em', whiteSpace: 'nowrap', transition: 'all 150ms',
                background: mode === m ? '#FFD000' : 'transparent',
                color: mode === m ? '#1A1A2E' : 'rgba(245,240,225,0.5)',
              }}
            >
              {m === 'review' ? 'EXPERTS' : 'PERSONAS'}
            </button>
          ))}
        </div>

        {/* Bubbles */}
        {bubbles.map((b, i) => {
          const isActive = b.id === activeBubbleId;
          const accent = b.accentColor || '#FFD000';
          const isTourTarget = tour.active && b.id === tour.reviewerId;

          // Derive size + opacity from tour state
          let size = 40;
          let opacity = 1;
          let borderStyle = '2px solid transparent';
          let showContent = true;

          if (tour.active) {
            if (tour.mode === 'guided') {
              size = 24;
              opacity = isTourTarget ? 1 : 0.6;
            } else {
              // live
              if (isTourTarget) {
                borderStyle = `2px dashed rgba(${hexRgb(accent)},0.3)`;
                showContent = false; // ghost slot
              } else {
                opacity = 0.6;
              }
            }
          } else if (isActive) {
            borderStyle = `2px solid ${accent}`;
          }

          return (
            <div
              key={b.id}
              data-testid={`bubble-${b.id}`}
              title={b.label || b.id}
              style={{
                width: size, height: size, borderRadius: '50%', overflow: 'hidden',
                cursor: tour.active ? 'default' : 'pointer',
                position: 'relative', border: borderStyle, flexShrink: 0,
                transition: 'all 200ms cubic-bezier(0.34,1.56,0.64,1)',
                animation: `bubbleEnter 400ms cubic-bezier(0.22,0.61,0.36,1) ${i*60}ms forwards`,
                ...(isActive && !tour.active ? { boxShadow: `0 0 12px ${accent}4D`, transform: 'scale(1.15)' } : {}),
                ...(tour.active ? { opacity } : {}),
              }}
              onMouseEnter={e => { if (!isActive && !tour.active) { const el = e.currentTarget; el.style.transform = 'scale(1.08)'; el.style.borderColor = accent; el.style.boxShadow = `0 0 8px ${accent}33`; } }}
              onMouseLeave={e => { if (!isActive && !tour.active) { const el = e.currentTarget; el.style.transform = ''; el.style.borderColor = 'transparent'; el.style.boxShadow = ''; } }}
              onClick={e => { if (!tour.active) onBubbleClick(b.id, e.currentTarget.getBoundingClientRect()); }}
            >
              {!showContent ? (
                <div style={{ width: '100%', height: '100%' }} />
              ) : b.avatar ? (
                <img src={b.avatar} alt={b.label || b.id} style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#222240' }} loading="lazy" />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800, background: b.bg || '#222240', color: b.color || '#1A1A2E' }}>
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
