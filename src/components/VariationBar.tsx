import type React from 'react';
import { getAllExpertFindings } from '../data/expertFindings';
import type { VariationDef } from '../types';

interface VariationBarProps {
  slug: string;
  variations: VariationDef[];
  activeVariation: string;
  onVariationChange: (id: string) => void;
  accent: string;
}

function computeAverageScore(slug: string, variationId: string): number {
  const findings = getAllExpertFindings(slug, variationId);
  if (findings.length === 0) return 0;
  const total = findings.reduce((sum, { finding }) => sum + finding.score, 0);
  return Math.round((total / findings.length) * 10) / 10;
}

function scoreColor(score: number): string {
  if (score >= 6.5) return '#4ECDC4';
  if (score >= 5) return '#FFD93D';
  return '#FF6B6B';
}

export default function VariationBar({
  slug,
  variations,
  activeVariation,
  onVariationChange,
  accent,
}: VariationBarProps) {
  const handlePillClick = (id: string) => {
    if (window.scrollY > 200) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Wait for scroll to settle (500ms) + pause at top (300ms)
      setTimeout(() => onVariationChange(id), 800);
    } else {
      onVariationChange(id);
    }
  };

  return (
    <>
    <style>{`@keyframes varBarFadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    <div style={styles.wrapper} data-testid="variation-bar">
      <div style={styles.pillStrip}>
        {variations.map(v => {
          const score = computeAverageScore(slug, v.id);
          const isActive = v.id === activeVariation;
          return (
            <button
              key={v.id}
              style={{
                ...styles.pill,
                borderColor: isActive ? accent : 'rgba(245, 240, 225, 0.25)',
                background: isActive ? accent : 'transparent',
                color: isActive ? '#FFFFFF' : '#F5F0E1',
              }}
              onClick={() => handlePillClick(v.id)}
              data-testid={`bar-pill-${v.id}`}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.25)';
                  e.currentTarget.style.color = '#F5F0E1';
                }
              }}
            >
              <span>{v.hook}</span>
              {score > 0 && (
                <span style={{ ...styles.pillScore, color: scoreColor(score) }}>
                  {score}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: '#1A1A2E',
    padding: '8px 16px',
    fontFamily: "'Courier New', monospace",
    borderBottom: '1px solid rgba(245, 240, 225, 0.1)',
    animation: 'varBarFadeIn 500ms ease forwards',
  },
  pillStrip: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem',
    justifyContent: 'center',
  },
  pill: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.65rem',
    fontWeight: 600,
    padding: '0.25rem 0.55rem',
    borderRadius: '999px',
    border: '1px solid rgba(245, 240, 225, 0.25)',
    background: 'transparent',
    color: '#F5F0E1',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  pillScore: {
    fontSize: '0.55rem',
    fontWeight: 'bold',
  },
};
