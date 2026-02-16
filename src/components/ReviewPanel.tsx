import React, { useEffect } from 'react';
import type { Reviewer } from '../data/reviewers';
import { getAvatarUrl } from '../data/reviewers';
import type { Review, TrafficLight, Finding } from '../data/reviews';

/**
 * Tier 3: Full Review Panel
 * Slides in from right when user clicks "VIEW FULL REVIEW" from the popover.
 * Shows one reviewer's (expert or persona) complete findings.
 */

interface ReviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reviewer: Reviewer | null;
  review: Review | null;
  onFindingHover: (info: { section: string; text?: string; color?: string } | null) => void;
}

// ─── Score helpers ──────────────────────────────────────────

function scoreClass(score: number): string {
  if (score >= 7) return 'high';
  if (score >= 5) return 'mid';
  return 'low';
}

const SCORE_COLORS: Record<string, string> = {
  high: '#6BCB77',
  mid: '#FFD93D',
  low: '#FF6B6B',
};

const LIGHT_COLORS: Record<TrafficLight, string> = {
  green: '#6BCB77',
  yellow: '#FFD93D',
  red: '#FF6B6B',
};

function sectionStatusText(findings: Finding[]): string {
  let r = 0, y = 0;
  for (const f of findings) {
    if (f.light === 'red') r++;
    else if (f.light === 'yellow') y++;
  }
  if (r > 0) return `${r} blocker${r > 1 ? 's' : ''}`;
  if (y > 0) return `${y} warning${y > 1 ? 's' : ''}`;
  return 'all clear';
}

// ─── TrafficLightIcon ───────────────────────────────────────

function TrafficLightIcon({ light, size = 12 }: { light: TrafficLight; size?: number }) {
  const color = LIGHT_COLORS[light];
  const svgStyle: React.CSSProperties = { flexShrink: 0, verticalAlign: 'middle', marginRight: '0.25rem' };
  if (light === 'green') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgStyle}>
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    );
  }
  if (light === 'red') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgStyle}>
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={svgStyle}>
      <path d="M3 12c2-2 5-2 7 0s5 2 7 0" />
    </svg>
  );
}

// ─── Styles ─────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: 380,
    maxWidth: '85vw',
    zIndex: 1000,
    background: '#1A1A2E',
    fontFamily: "'Courier New', monospace",
    borderLeft: '3px solid #FFD000',
    overflowY: 'auto',
    padding: 20,
    transition: 'transform 400ms cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
  closeBtn: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    fontFamily: "'Courier New', monospace",
    fontSize: '0.8rem',
    background: 'none',
    border: 'none',
    color: 'rgba(245, 240, 225, 0.5)',
    cursor: 'pointer',
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 150ms',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '1px solid rgba(245, 240, 225, 0.12)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #FFD000',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  name: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#FFD000',
    letterSpacing: '0.06em',
  },
  role: {
    fontSize: '0.6rem',
    color: 'rgba(245, 240, 225, 0.5)',
  },
  scoreRing: {
    marginLeft: 'auto',
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '3px solid #FFD000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 800,
  },
  verdictBox: {
    fontSize: '0.7rem',
    fontStyle: 'italic' as const,
    color: 'rgba(245, 240, 225, 0.5)',
    lineHeight: 1.7,
    marginBottom: 20,
    padding: 12,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 4,
  },
  sectionLabel: {
    fontSize: '0.55rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    color: '#FFD000',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: '1px solid rgba(245, 240, 225, 0.12)',
  },
  sectionGroup: {
    marginBottom: 16,
    cursor: 'default',
  },
  finding: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
    padding: '8px 0',
    fontSize: '0.65rem',
    lineHeight: 1.6,
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    color: '#F5F0E1',
    transition: 'background 150ms',
  },
  findingComment: {
    fontSize: '0.6rem',
    color: 'rgba(245, 240, 225, 0.5)',
    fontStyle: 'italic' as const,
    marginTop: 4,
  },
  placeholder: {
    color: 'rgba(245, 240, 225, 0.5)',
    fontSize: '0.8rem',
    fontStyle: 'italic' as const,
    lineHeight: 1.5,
    marginTop: '1rem',
  },
};

const PANEL_SECTION_KEYFRAMES = `
@keyframes panelSectionEnter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// ─── Main component ─────────────────────────────────────────

export default function ReviewPanel({
  isOpen,
  onClose,
  reviewer,
  review,
  onFindingHover,
}: ReviewPanelProps) {

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const panelStyle: React.CSSProperties = {
    ...st.panel,
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    boxShadow: isOpen ? '-4px 0 20px rgba(0,0,0,0.3)' : 'none',
  };

  return (
    <>
      <style>{PANEL_SECTION_KEYFRAMES}</style>
      <div style={panelStyle} data-testid="review-panel">
        <button
          style={st.closeBtn}
          onClick={onClose}
          data-testid="review-panel-close"
        >
          &times;
        </button>

        {(!reviewer || !review) && (
          <p style={st.placeholder}>Select an expert or persona to view their review.</p>
        )}

        {reviewer && review && (
          <ReviewContent
            reviewer={reviewer}
            review={review}
            onFindingHover={onFindingHover}
          />
        )}
      </div>
    </>
  );
}

// ─── Unified Review Content ──────────────────────────────────
// Works for both experts and personas since they share the
// Reviewer + Review interface in v2.

function ReviewContent({
  reviewer,
  review,
  onFindingHover,
}: {
  reviewer: Reviewer;
  review: Review;
  onFindingHover: (info: { section: string; text?: string; color?: string } | null) => void;
}) {
  const sc = scoreClass(review.score);
  const accent = reviewer.color;
  const avatarUrl = getAvatarUrl(reviewer);

  return (
    <>
      <div style={st.header}>
        <div style={{ ...st.avatar, borderColor: accent }}>
          <img src={avatarUrl} alt={reviewer.name} style={st.avatarImg} loading="lazy" />
        </div>
        <div>
          <div style={{ ...st.name, color: accent }}>{reviewer.name}</div>
          <div style={st.role}>{reviewer.role}</div>
        </div>
        <div style={{ ...st.scoreRing, borderColor: accent }}>
          <span style={{ color: SCORE_COLORS[sc] }}>{review.score}</span>
        </div>
      </div>

      <div style={st.verdictBox}>
        &ldquo;{review.verdict}&rdquo;
      </div>

      {Object.entries(review.sections).map(([section, items], sIdx) => {
        const statusText = sectionStatusText(items);
        return (
          <div
            key={section}
            style={{
              ...st.sectionGroup,
              opacity: 0,
              animation: `panelSectionEnter 250ms cubic-bezier(0.22, 0.61, 0.36, 1) ${(sIdx + 1) * 60}ms forwards`,
            }}
            onMouseEnter={() => onFindingHover({ section, text: statusText, color: accent })}
            onMouseLeave={() => onFindingHover(null)}
          >
            <div style={st.sectionLabel}>{section.toUpperCase()}</div>
            {items.map((item, fi) => (
              <div
                key={fi}
                data-testid={`panel-finding-${section}-${fi}`}
                style={st.finding}
              >
                <TrafficLightIcon light={item.light} size={14} />
                <div>
                  <div>{item.text}</div>
                  {item.comment && (
                    <div style={st.findingComment}>&ldquo;{item.comment}&rdquo;</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}
