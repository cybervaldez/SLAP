/**
 * Tour chin overlay — narrates findings (guided) or shows progress (live).
 *
 * Positioned in the iMac chin area, above the bezel pseudo-element (z:99998).
 */

import React, { useState, useEffect } from 'react';
import type { TourMode, TourStep } from '../hooks/useTourEngine';

interface TourChinProps {
  active: boolean;
  mode: TourMode;
  currentStep: TourStep | null;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

const SECTION_ORDER = ['hero', 'features', 'pricing', 'cta'];

function severityColor(light: string): string {
  if (light === 'red') return '#FF6B6B';
  if (light === 'yellow') return '#FFD93D';
  return '#6BCB77';
}

const st: Record<string, React.CSSProperties> = {
  chin: {
    position: 'fixed',
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 99997,
    fontFamily: "'Courier New', monospace",
    pointerEvents: 'auto',
    transition: 'opacity 200ms ease',
  },
  guidedTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'cover' as const,
  },
  reviewerName: {
    fontSize: '0.5rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    flexShrink: 0,
  },
  findingText: {
    fontSize: '0.48rem',
    fontStyle: 'italic',
    color: 'rgba(245, 240, 225, 0.75)',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as any,
    lineHeight: 1.3,
    flex: 1,
    minWidth: 0,
  },
  stepCounter: {
    fontSize: '0.45rem',
    fontWeight: 700,
    color: 'rgba(245, 240, 225, 0.5)',
    flexShrink: 0,
    letterSpacing: '0.04em',
  },
  navBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.55rem',
    fontWeight: 800,
    width: 24,
    height: 24,
    border: '1px solid rgba(245, 240, 225, 0.2)',
    borderRadius: 4,
    background: 'transparent',
    color: 'rgba(245, 240, 225, 0.6)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 120ms',
    flexShrink: 0,
  },
  guidedBottom: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  breadcrumb: {
    fontSize: '0.38rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'color 120ms',
    padding: '2px 4px',
  },
  progressTrack: {
    flex: 1,
    height: 4,
    background: 'rgba(245, 240, 225, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#FFD000',
    borderRadius: 2,
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  liveRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  liveProgressTrack: {
    width: 160,
    height: 4,
    background: 'rgba(245, 240, 225, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    flexShrink: 0,
  },
};

const CHIN_FADE_CSS = `
@keyframes chinFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default function TourChin({
  active,
  mode,
  currentStep,
  progress,
  onPrev,
  onNext,
  onGoTo,
}: TourChinProps) {
  // Cross-fade state for step changes
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey(k => k + 1);
  }, [currentStep?.index]);

  if (!active || !currentStep) return null;

  const isFirst = currentStep.index === 0;
  const isLast = currentStep.index === currentStep.totalSteps - 1;
  const currentSection = currentStep.section;

  // Determine which sections come before/at/after current
  const currentSectionIdx = SECTION_ORDER.indexOf(currentSection);

  if (mode === 'guided') {
    return (
      <>
        <style>{CHIN_FADE_CSS}</style>
        <div
          data-testid="tour-chin"
          data-tour-mode="guided"
          style={st.chin}
          key={fadeKey}
        >
          {/* Top row: avatar + name + finding + counter + nav */}
          <div style={st.guidedTop}>
            <img
              src={currentStep.reviewerAvatar}
              alt={currentStep.reviewerName}
              style={{
                ...st.avatar,
                border: `2px solid ${currentStep.reviewerColor}`,
              }}
            />
            <div style={{ flexShrink: 0 }}>
              <span style={{ ...st.reviewerName, color: currentStep.reviewerColor }}>
                {currentStep.reviewerName}
              </span>
              {currentStep.reviewerBias && (
                <div
                  data-testid="tour-lens"
                  style={{
                    fontSize: '0.35rem',
                    color: 'rgba(245, 240, 225, 0.4)',
                    fontStyle: 'italic',
                    lineHeight: 1.2,
                    maxWidth: 120,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentStep.reviewerBias}
                </div>
              )}
            </div>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: severityColor(currentStep.finding.light),
                flexShrink: 0,
              }}
            />
            <span style={st.findingText}>
              {currentStep.finding.text}
            </span>
            <span style={st.stepCounter}>
              [{currentStep.index + 1}/{currentStep.totalSteps}]
            </span>
            <button
              data-testid="tour-prev"
              style={{
                ...st.navBtn,
                opacity: isFirst ? 0.3 : 1,
                cursor: isFirst ? 'default' : 'pointer',
              }}
              onClick={onPrev}
              disabled={isFirst}
            >
              {'\u2190'}
            </button>
            <button
              data-testid="tour-next"
              style={{
                ...st.navBtn,
                opacity: isLast ? 0.3 : 1,
                cursor: isLast ? 'default' : 'pointer',
              }}
              onClick={onNext}
              disabled={isLast}
            >
              {'\u2192'}
            </button>
          </div>

          {/* Bottom row: breadcrumbs + progress bar */}
          <div style={st.guidedBottom}>
            {SECTION_ORDER.map((section, si) => {
              let color: string;
              if (si < currentSectionIdx) color = '#6BCB77'; // past = green
              else if (si === currentSectionIdx) color = '#FFD000'; // current = gold
              else color = 'rgba(245, 240, 225, 0.3)'; // future = muted

              return (
                <span
                  key={section}
                  style={{ ...st.breadcrumb, color }}
                  onClick={() => {
                    // Navigate to first step of that section — find by walking
                    // This is a heuristic: jump proportionally
                    const targetIdx = Math.round(
                      (si / (SECTION_ORDER.length - 1)) * (currentStep.totalSteps - 1)
                    );
                    onGoTo(targetIdx);
                  }}
                >
                  {section.toUpperCase()}
                </span>
              );
            })}
            <div style={st.progressTrack}>
              <div
                style={{
                  ...st.progressFill,
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  // Live mode — single row with progress + counter + nav
  return (
    <>
      <style>{CHIN_FADE_CSS}</style>
      <div
        data-testid="tour-chin"
        data-tour-mode="live"
        style={st.chin}
      >
        <div style={st.liveRow}>
          <div style={st.liveProgressTrack}>
            <div
              style={{
                ...st.progressFill,
                width: `${progress * 100}%`,
              }}
            />
          </div>
          <span style={st.stepCounter}>
            Step {currentStep.index + 1}/{currentStep.totalSteps}
          </span>
          <div style={{ flex: 1 }} />
          <button
            data-testid="tour-prev"
            style={{
              ...st.navBtn,
              opacity: isFirst ? 0.3 : 1,
              cursor: isFirst ? 'default' : 'pointer',
            }}
            onClick={onPrev}
            disabled={isFirst}
          >
            {'\u2190'}
          </button>
          <button
            data-testid="tour-next"
            style={{
              ...st.navBtn,
              opacity: isLast ? 0.3 : 1,
              cursor: isLast ? 'default' : 'pointer',
            }}
            onClick={onNext}
            disabled={isLast}
          >
            {'\u2192'}
          </button>
        </div>
      </div>
    </>
  );
}
