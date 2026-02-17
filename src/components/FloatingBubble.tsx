/**
 * Floating bubble — live mode visuals.
 *
 * Three sub-elements:
 *  1. SVG trail line (dashed bezier from rail slot → floating bubble)
 *  2. Floating bubble (36px circle, animates to target section)
 *  3. Speech bubble (section + severity + finding text)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { TourStep } from '../hooks/useTourEngine';

interface FloatingBubbleProps {
  active: boolean;
  currentStep: TourStep | null;
}

interface Position {
  x: number;
  y: number;
}

function severityColor(light: string): string {
  if (light === 'red') return '#FF6B6B';
  if (light === 'yellow') return '#FFD93D';
  return '#6BCB77';
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function FloatingBubble({
  active,
  currentStep,
}: FloatingBubbleProps) {
  const [railPos, setRailPos] = useState<Position | null>(null);
  const [targetPos, setTargetPos] = useState<Position | null>(null);
  const [showSpeech, setShowSpeech] = useState(false);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computePositions = useCallback(() => {
    if (!currentStep) return;

    // Rail slot position: find the bubble element in the rail
    const bubbleEl = document.querySelector(
      `[data-testid="bubble-${currentStep.reviewerId}"]`
    );
    if (bubbleEl) {
      const rect = bubbleEl.getBoundingClientRect();
      setRailPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    // Target section position
    const sectionEl = document.querySelector(
      `[data-section="${currentStep.section}"]`
    );
    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect();
      setTargetPos({
        x: rect.left + 40, // Left side, offset from edge
        y: rect.top + rect.height / 2, // Vertically centered
      });
    }
  }, [currentStep]);

  // Compute positions on step change (with delay for scroll)
  useEffect(() => {
    if (!active || !currentStep) {
      setRailPos(null);
      setTargetPos(null);
      setShowSpeech(false);
      return;
    }

    setShowSpeech(false);

    // Initial computation
    const t1 = setTimeout(computePositions, 50);
    // Re-compute after smooth scroll settles
    const t2 = setTimeout(computePositions, 500);

    // Show speech bubble after bubble arrives
    speechTimerRef.current = setTimeout(() => {
      setShowSpeech(true);
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, [active, currentStep, computePositions]);

  // Recompute on window resize
  useEffect(() => {
    if (!active) return;
    const handler = () => computePositions();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [active, computePositions]);

  if (!active || !currentStep || !targetPos) return null;

  const color = currentStep.reviewerColor;
  const bubbleSize = 36;

  // SVG trail path (bezier curve from rail slot → floating bubble)
  const trailPath = railPos && targetPos
    ? (() => {
        const sx = railPos.x;
        const sy = railPos.y;
        const ex = targetPos.x;
        const ey = targetPos.y;
        // Control points: horizontal midpoint with slight vertical offset
        const cx1 = sx - (sx - ex) * 0.4;
        const cy1 = sy;
        const cx2 = ex + (sx - ex) * 0.2;
        const cy2 = ey;
        return `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${ey}`;
      })()
    : null;

  return (
    <>
      {/* 1. SVG trail line */}
      {trailPath && (
        <svg
          data-testid="tour-trail"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 935,
          }}
        >
          <path
            d={trailPath}
            fill="none"
            stroke={hexToRgba(color, 0.3)}
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        </svg>
      )}

      {/* 2. Floating bubble */}
      <div
        data-testid="tour-floating-bubble"
        style={{
          position: 'fixed',
          left: targetPos.x - bubbleSize / 2,
          top: targetPos.y - bubbleSize / 2,
          width: bubbleSize,
          height: bubbleSize,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${color}`,
          boxShadow: `0 0 16px ${hexToRgba(color, 0.4)}`,
          zIndex: 950,
          pointerEvents: 'none',
          transition: 'left 500ms cubic-bezier(0.34, 1.56, 0.64, 1), top 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <img
          src={currentStep.reviewerAvatar}
          alt={currentStep.reviewerName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* 3. Speech bubble */}
      {showSpeech && (
        <div
          data-testid="tour-speech-bubble"
          style={{
            position: 'fixed',
            left: targetPos.x + bubbleSize / 2 + 12,
            top: targetPos.y - 20,
            maxWidth: 220,
            padding: '8px 10px',
            background: 'rgba(26, 26, 46, 0.95)',
            border: `1.5px solid ${hexToRgba(color, 0.5)}`,
            borderRadius: 6,
            fontFamily: "'Courier New', monospace",
            zIndex: 949,
            pointerEvents: 'none',
            opacity: showSpeech ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        >
          {/* Triangle pointer toward bubble */}
          <div
            style={{
              position: 'absolute',
              left: -6,
              top: 16,
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: `6px solid ${hexToRgba(color, 0.5)}`,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
            <span
              style={{
                fontSize: '0.45rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#FFD000',
              }}
            >
              {currentStep.section.toUpperCase()}
            </span>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: severityColor(currentStep.finding.light),
                flexShrink: 0,
              }}
            />
          </div>
          <div
            style={{
              fontSize: '0.44rem',
              color: 'rgba(245, 240, 225, 0.8)',
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as any,
            }}
          >
            {currentStep.finding.text}
          </div>
        </div>
      )}
    </>
  );
}
