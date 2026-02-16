import React, { useRef, useEffect, useState } from 'react';
import type { TrafficLight } from '../../data/reviews';
import { getReviewer } from '../../data/reviewers';

interface LivePreviewProps {
  selectedIds: Set<string>;
  findings: Record<string, { text: string; light: TrafficLight }>;
}

const BG_MID = '#222240';
const TEXT_MUTED = 'rgba(245, 240, 225, 0.5)';
const SCORE_GREEN = '#6BCB77';
const SCORE_YELLOW = '#FFD93D';
const SCORE_RED = '#FF6B6B';
const EASE_ENTER = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

const KEYFRAMES = `
@keyframes findingSlideIn {
  from { opacity: 0; max-height: 0; transform: translateY(8px); }
  to { opacity: 1; max-height: 60px; transform: translateY(0); }
}
@keyframes digitRoll {
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
`;

function lightColor(light: TrafficLight): string {
  if (light === 'green') return SCORE_GREEN;
  if (light === 'yellow') return SCORE_YELLOW;
  return SCORE_RED;
}

function scoreColor(n: number): string {
  if (n >= 7) return SCORE_GREEN;
  if (n >= 5) return SCORE_YELLOW;
  return SCORE_RED;
}

function computeScore(selectedIds: Set<string>, findings: Record<string, { text: string; light: TrafficLight }>): number | null {
  let total = 0;
  let count = 0;
  selectedIds.forEach(id => {
    const f = findings[id];
    if (!f) return;
    total += f.light === 'green' ? 8 : f.light === 'yellow' ? 6 : 3;
    count++;
  });
  return count > 0 ? total / count : null;
}

const st: Record<string, React.CSSProperties> = {
  container: {
    marginTop: '1.5rem',
    width: '100%',
    maxWidth: 500,
    background: BG_MID,
    border: '1px solid rgba(245, 240, 225, 0.12)',
    borderRadius: 4,
    padding: '1rem',
    opacity: 0,
    transition: `opacity 400ms ${EASE_ENTER}`,
  },
  active: {
    opacity: 1,
  },
  finding: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    padding: '6px 0',
    fontSize: '0.55rem',
    lineHeight: 1.5,
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    maxHeight: 60,
    overflow: 'hidden',
    transition: `all 250ms ${EASE_ENTER}`,
    animation: `findingSlideIn 250ms ${EASE_ENTER} forwards`,
  },
  findingExiting: {
    opacity: 0,
    maxHeight: 0,
    padding: 0,
    transform: 'translateY(-8px)',
  },
  lightDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: 3,
  },
  nameSpan: {
    fontWeight: 700,
    letterSpacing: '0.04em',
  },
  scoreBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid rgba(245, 240, 225, 0.12)',
  },
  odometerContainer: {
    display: 'flex',
    alignItems: 'baseline',
    overflow: 'hidden',
    height: '1.3rem',
  },
  odometerDigit: {
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: 800,
    lineHeight: '1.3rem',
    transition: `transform 300ms ${EASE_ENTER}, color 300ms`,
  },
  odometerStatic: {
    fontSize: '1rem',
    fontWeight: 800,
    lineHeight: '1.3rem',
  },
  scoreDelta: {
    fontSize: '0.5rem',
    fontWeight: 800,
    padding: '2px 6px',
    borderRadius: 3,
    opacity: 0,
    transition: `opacity 300ms ${EASE_ENTER}`,
    marginLeft: 4,
  },
  scoreDeltaVisible: {
    opacity: 1,
  },
  positive: {
    background: 'rgba(107, 203, 119, 0.15)',
    color: SCORE_GREEN,
  },
  negative: {
    background: 'rgba(255, 107, 107, 0.15)',
    color: SCORE_RED,
  },
  scoreLabel: {
    fontSize: '0.45rem',
    color: TEXT_MUTED,
  },
};

export default function LivePreview({ selectedIds, findings }: LivePreviewProps) {
  const previousScoreRef = useRef<number | null>(null);
  const activeFindingsRef = useRef<Set<string>>(new Set());
  const [renderKey, setRenderKey] = useState(0);
  const [deltaInfo, setDeltaInfo] = useState<{ value: number; visible: boolean } | null>(null);
  const deltaTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [prevDigits, setPrevDigits] = useState('');

  const isActive = selectedIds.size >= 3;
  const score = isActive ? computeScore(selectedIds, findings) : null;
  const scoreText = score !== null ? `${score.toFixed(1)}/10` : '\u2014';
  const scoreCol = score !== null ? scoreColor(score) : SCORE_YELLOW;

  // Track active findings for animation
  useEffect(() => {
    if (!isActive) {
      activeFindingsRef.current.clear();
      previousScoreRef.current = null;
      setDeltaInfo(null);
      return;
    }

    const newScore = computeScore(selectedIds, findings);
    const oldScore = previousScoreRef.current;

    if (oldScore !== null && newScore !== null) {
      const delta = newScore - oldScore;
      if (Math.abs(delta) >= 0.05) {
        setDeltaInfo({ value: delta, visible: true });
        clearTimeout(deltaTimeoutRef.current);
        deltaTimeoutRef.current = setTimeout(() => {
          setDeltaInfo(prev => prev ? { ...prev, visible: false } : null);
        }, 1500);
      }
    }

    previousScoreRef.current = newScore;
    activeFindingsRef.current = new Set(selectedIds);
    setPrevDigits(scoreText);
    setRenderKey(k => k + 1);
  }, [selectedIds, isActive]);

  // Build ordered list of selected reviewers with findings
  const activeFindings: { id: string; name: string; color: string; text: string; light: TrafficLight }[] = [];
  if (isActive) {
    selectedIds.forEach(id => {
      const r = getReviewer(id);
      const f = findings[id];
      if (r && f) {
        activeFindings.push({ id, name: r.name, color: r.color, text: f.text, light: f.light });
      }
    });
  }

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={{ ...st.container, ...(isActive ? st.active : {}) }}
        data-testid="live-preview"
      >
        <div>
          {activeFindings.map((f, i) => (
            <div
              key={f.id}
              style={{
                ...st.finding,
                ...(i === activeFindings.length - 1 ? { borderBottom: 'none' } : {}),
              }}
              data-finding-id={f.id}
            >
              <div style={{ ...st.lightDot, background: lightColor(f.light) }} />
              <div>
                <span style={{ ...st.nameSpan, color: f.color }}>{f.name}:</span> {f.text}
              </div>
            </div>
          ))}
        </div>
        <div style={st.scoreBar}>
          <div style={st.odometerContainer}>
            {score !== null ? (
              scoreText.split('').map((ch, i) => {
                const isDigit = ch >= '0' && ch <= '9';
                const changed = prevDigits[i] !== ch;
                return (
                  <span
                    key={`${i}-${ch}-${renderKey}`}
                    style={{
                      ...(isDigit ? st.odometerDigit : st.odometerStatic),
                      color: scoreCol,
                      ...(isDigit && changed ? { animation: `digitRoll 300ms ${EASE_ENTER}` } : {}),
                    }}
                  >
                    {ch}
                  </span>
                );
              })
            ) : (
              <span style={{ ...st.odometerStatic, color: SCORE_YELLOW }}>{'\u2014'}</span>
            )}
          </div>
          {deltaInfo && (
            <span
              style={{
                ...st.scoreDelta,
                ...(deltaInfo.visible ? st.scoreDeltaVisible : {}),
                ...(deltaInfo.value > 0 ? st.positive : st.negative),
              }}
            >
              {deltaInfo.value > 0 ? '+' : ''}{deltaInfo.value.toFixed(1)}
            </span>
          )}
          <span style={st.scoreLabel}>COUNCIL SCORE</span>
        </div>
      </div>
    </>
  );
}
