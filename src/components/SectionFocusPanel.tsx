import React, { useEffect, useMemo } from 'react';
import { getAllReviews } from '../data/reviews';
import type { TrafficLight, Finding } from '../data/reviews';
import { getReviewer, getAvatarUrl } from '../data/reviewers';
import type { Reviewer } from '../data/reviewers';

/**
 * Section Focus Panel — shows all reviewers' findings for a single section.
 * Opens when user clicks a [data-section] in the design canvas.
 * Findings are sorted by severity (reds first).
 */

interface SectionFocusPanelProps {
  isOpen: boolean;
  section: string | null;
  projectId: string;
  versionId: string;
  onClose: () => void;
  onFindingHover: (info: { section: string; text?: string; color?: string; ref?: string } | null) => void;
}

const LIGHT_COLORS: Record<TrafficLight, string> = {
  green: '#6BCB77',
  yellow: '#FFD93D',
  red: '#FF6B6B',
};

const SEVERITY_ORDER: Record<TrafficLight, number> = { red: 0, yellow: 1, green: 2 };

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

interface SectionFinding {
  reviewer: Reviewer;
  finding: Finding;
  findingIndex: number;
}

function gatherSectionFindings(projectId: string, versionId: string, section: string): SectionFinding[] {
  const allRevs = getAllReviews(projectId, versionId);
  const results: SectionFinding[] = [];

  for (const { reviewerId, review } of allRevs) {
    const sectionFindings = review.sections[section];
    if (!sectionFindings) continue;
    const reviewer = getReviewer(reviewerId);
    if (!reviewer) continue;

    sectionFindings.forEach((finding, idx) => {
      results.push({ reviewer, finding, findingIndex: idx });
    });
  }

  results.sort((a, b) => SEVERITY_ORDER[a.finding.light] - SEVERITY_ORDER[b.finding.light]);
  return results;
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
  sectionTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#FFD000',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    marginBottom: 6,
  },
  summary: {
    fontSize: '0.55rem',
    color: 'rgba(245, 240, 225, 0.5)',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid rgba(245, 240, 225, 0.12)',
  },
  findingRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
    padding: '10px 0',
    fontSize: '0.65rem',
    lineHeight: 1.6,
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    color: '#F5F0E1',
    transition: 'background 150ms',
  },
  reviewerChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: '0.45rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    padding: '2px 6px',
    borderRadius: 3,
    background: 'rgba(255,255,255,0.04)',
    marginBottom: 4,
  },
  reviewerAvatar: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  findingComment: {
    fontSize: '0.6rem',
    color: 'rgba(245, 240, 225, 0.5)',
    fontStyle: 'italic' as const,
    marginTop: 4,
  },
};

const PANEL_KEYFRAMES = `
@keyframes sectionFindingEnter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.slap-section-finding:hover { background: rgba(255, 255, 255, 0.02); }
`;

// ─── Main component ─────────────────────────────────────────

export default function SectionFocusPanel({
  isOpen,
  section,
  projectId,
  versionId,
  onClose,
  onFindingHover,
}: SectionFocusPanelProps) {

  const findings = useMemo(() => {
    if (!section) return [];
    return gatherSectionFindings(projectId, versionId, section);
  }, [projectId, versionId, section]);

  const counts = useMemo(() => {
    let red = 0, yellow = 0, green = 0;
    for (const { finding } of findings) {
      if (finding.light === 'red') red++;
      else if (finding.light === 'yellow') yellow++;
      else green++;
    }
    return { red, yellow, green, total: findings.length };
  }, [findings]);

  const reviewerCount = useMemo(() => {
    return new Set(findings.map(f => f.reviewer.id)).size;
  }, [findings]);

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
      <style>{PANEL_KEYFRAMES}</style>
      <div style={panelStyle} data-testid="section-focus-panel">
        <button style={st.closeBtn} onClick={onClose} data-testid="section-focus-close">&times;</button>

        {section && (
          <>
            <div style={st.sectionTitle} data-testid="section-focus-title">{section}</div>
            <div style={st.summary} data-testid="section-focus-summary">
              {reviewerCount} reviewers &middot; {counts.total} findings
              {counts.red > 0 && <span style={{ color: '#FF6B6B' }}> &middot; {counts.red} red</span>}
              {counts.yellow > 0 && <span style={{ color: '#FFD93D' }}> &middot; {counts.yellow} yellow</span>}
              {counts.green > 0 && <span style={{ color: '#6BCB77' }}> &middot; {counts.green} green</span>}
            </div>

            {findings.map((item, i) => (
              <div
                key={`${item.reviewer.id}-${item.findingIndex}`}
                className="slap-section-finding"
                data-testid={`section-finding-${item.reviewer.id}-${item.findingIndex}`}
                style={{
                  ...st.findingRow,
                  opacity: 0,
                  animation: `sectionFindingEnter 250ms cubic-bezier(0.22, 0.61, 0.36, 1) ${(i + 1) * 40}ms forwards`,
                }}
                onMouseEnter={() => onFindingHover({
                  section,
                  text: item.finding.text,
                  color: item.reviewer.color,
                  ref: item.finding.ref,
                })}
                onMouseLeave={() => onFindingHover(null)}
              >
                <TrafficLightIcon light={item.finding.light} size={14} />
                <div style={{ flex: 1 }}>
                  <div style={st.reviewerChip}>
                    <img src={getAvatarUrl(item.reviewer)} alt={item.reviewer.name} style={st.reviewerAvatar} />
                    <span style={{ color: item.reviewer.color }}>{item.reviewer.name}</span>
                  </div>
                  <div>{item.finding.text}</div>
                  {item.finding.comment && (
                    <div style={st.findingComment}>&ldquo;{item.finding.comment}&rdquo;</div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
