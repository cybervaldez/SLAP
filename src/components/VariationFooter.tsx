import type React from 'react';
import { navigate } from '../router';
import { getAllExpertFindings } from '../data/expertFindings';
import type { VariationDef } from '../types';

interface VariationFooterProps {
  slug: string;
  variations: VariationDef[];
  activeVariation: string;
  onVariationChange: (id: string) => void;
  accent: string;
  backLens?: string | null;
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

export default function VariationFooter({
  slug,
  variations,
  activeVariation,
  onVariationChange,
  accent,
  backLens,
}: VariationFooterProps) {
  const activeDef = variations.find(v => v.id === activeVariation);
  const remaining = variations.length - 1;

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
    <div style={styles.wrapper} data-testid="variation-footer">
      <div style={styles.narrative}>
        That was <strong>{activeDef?.hook || activeVariation}</strong>.
        There {remaining === 1 ? 'is' : 'are'} {remaining} more.
      </div>
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
              data-testid={`footer-pill-${v.id}`}
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
              <span style={styles.pillHook}>{v.hook}</span>
              {score > 0 && (
                <span style={{ ...styles.pillScore, color: scoreColor(score) }}>
                  {score}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (backLens) {
            sessionStorage.setItem('scrollToArchetypes', 'true');
            navigate(backLens);
          } else {
            navigate();
          }
        }}
        style={styles.backLink}
        data-testid="footer-back-gallery"
      >
        &larr; Back to Gallery
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    background: '#1A1A2E',
    padding: '24px 16px 32px',
    textAlign: 'center',
    fontFamily: "'Courier New', monospace",
    borderTop: '1px solid rgba(245, 240, 225, 0.1)',
  },
  narrative: {
    color: '#B0B0CC',
    fontSize: '0.85rem',
    marginBottom: 16,
    lineHeight: 1.5,
  },
  pillStrip: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pill: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.7rem',
    fontWeight: 600,
    padding: '0.3rem 0.65rem',
    borderRadius: '999px',
    border: '1px solid rgba(245, 240, 225, 0.25)',
    background: 'transparent',
    color: '#F5F0E1',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  pillHook: {},
  pillScore: {
    fontSize: '0.6rem',
    fontWeight: 'bold',
  },
  backLink: {
    color: '#FFD000',
    fontSize: '0.75rem',
    textDecoration: 'none',
    fontFamily: "'Courier New', monospace",
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  },
};
