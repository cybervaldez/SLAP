import React, { useState, useEffect, useCallback } from 'react';
import type { PersonaEntry } from '../data/personaFindings';
import type {
  LensDef,
  DockMode,
  OverlayView,
  ExpertDef,
  ExpertFinding,
  ReviewBundle,
  TrafficLight,
} from '../types';

interface UIReviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  overlayView: OverlayView;
  dockMode: DockMode | null;
  soloId: string | null;
  onTabSwitch: (tab: 'team' | 'kaizen') => void;
  onSoloSelect: (id: string) => void;
  onSoloClose: () => void;
  variationHook: string;
  expertFindings: { expert: ExpertDef; finding: ExpertFinding }[];
  reviewBundle: ReviewBundle | undefined;
  personaFindings: { lens: LensDef; entry: PersonaEntry }[];
  kaizenBundle: ReviewBundle | undefined;
  onFindingHover?: (sectionKey: string | null) => void;
}

// ─── Persona colors for bubbles and solo view ────────────────

const PERSONA_COLORS: Record<string, { bg: string; text: string }> = {
  marcus: { bg: '#4ECDC4', text: '#1A1A2E' },
  dorothy: { bg: '#6BCB77', text: '#1A1A2E' },
  carlos: { bg: '#FFD93D', text: '#1A1A2E' },
  frank: { bg: '#FF6B6B', text: '#fff' },
  sam: { bg: '#9B59B6', text: '#fff' },
};

// ─── Score derivation from PersonaEntry ──────────────────────

function computePersonaScore(entry: PersonaEntry): number {
  if (entry.observations.length === 0) return 5;
  const total = entry.observations.reduce((sum, obs) => {
    if (obs.verdict === 'good') return sum + 10;
    if (obs.verdict === 'needs-work') return sum + 5;
    return sum + 1; // blocker
  }, 0);
  return Math.round(total / entry.observations.length);
}

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

// ─── Styles ──────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: 360,
    maxWidth: '85vw',
    zIndex: 1000,
    background: '#1A1A2E',
    fontFamily: "'Courier New', monospace",
    borderLeft: '3px solid #FFD000',
    overflowY: 'auto',
    padding: '1rem',
    transition: 'transform 0.3s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  title: {
    color: '#FFD000',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
  },
  closeBtn: {
    background: 'none',
    border: '2px solid #FFD000',
    color: '#FFD000',
    fontFamily: "'Courier New', monospace",
    fontSize: '0.85rem',
    fontWeight: 'bold',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    lineHeight: 1,
    padding: 0,
  },
  hook: {
    color: '#FF1493',
    fontSize: '0.88rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #FFD000',
    margin: '0.5rem 0',
  },
  tabs: {
    display: 'flex',
    gap: 0,
    margin: '0.5rem 0',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(154, 138, 122, 0.3)',
  },
  tab: {
    flex: 1,
    padding: '0.4rem 0',
    textAlign: 'center' as const,
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    color: '#9E9EB8',
    background: 'transparent',
    border: 'none',
    fontFamily: "'Courier New', monospace",
    transition: 'background 0.15s, color 0.15s',
  },
  tabActive: {
    background: 'rgba(255, 208, 0, 0.1)',
    color: '#FFD000',
  },
  tabBorder: {
    borderRight: '1px solid rgba(154, 138, 122, 0.3)',
  },
  consensus: {
    background: 'rgba(255, 208, 0, 0.06)',
    borderRadius: 8,
    padding: '0.65rem',
    margin: '0.6rem 0',
  },
  consensusTitle: {
    color: '#FFD000',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    marginBottom: '0.35rem',
  },
  consensusItem: {
    fontSize: '0.65rem',
    lineHeight: 1.5,
    padding: '0.05rem 0',
  },
  sectionBar: {
    margin: '0.6rem -1rem 0',
    padding: '0.35rem 1rem',
    background: 'rgba(154, 138, 122, 0.1)',
    borderTop: '1px solid rgba(154, 138, 122, 0.3)',
    borderBottom: '1px solid rgba(154, 138, 122, 0.3)',
  },
  sectionLabel: {
    color: '#B0A090',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
  },
  card: {
    padding: '0.55rem 0',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  cardBorder: {
    borderTop: '1px solid rgba(154, 138, 122, 0.1)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  cardIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.05rem',
    flexShrink: 0,
  },
  cardPersonaIcon: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 800,
    flexShrink: 0,
  },
  cardInfo: {
    flex: 1,
    minWidth: 0,
  },
  cardName: {
    color: '#FFD000',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
  },
  cardRole: {
    color: '#9E9EB8',
    fontSize: '0.55rem',
    letterSpacing: '0.03em',
  },
  cardScore: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
    flexShrink: 0,
  },
  scoreNum: {
    fontWeight: 800,
    fontSize: '0.85rem',
  },
  scoreMax: {
    color: '#9E9EB8',
    fontSize: '0.55rem',
  },
  arrow: {
    color: '#9E9EB8',
    fontSize: '0.55rem',
    flexShrink: 0,
    transition: 'transform 0.2s',
  },
  verdict: {
    color: '#F5F0E1',
    fontSize: '0.66rem',
    lineHeight: 1.4,
    marginTop: '0.25rem',
    paddingLeft: '2.6rem',
  },
  detail: {
    padding: '0.35rem 0 0.35rem 2.6rem',
  },
  finding: {
    padding: '0.3rem 0',
    borderLeft: '2px solid rgba(154, 138, 122, 0.2)',
    paddingLeft: '0.5rem',
    marginBottom: '0.25rem',
  },
  findingSection: {
    color: '#9E9EB8',
    fontSize: '0.5rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    marginBottom: '0.05rem',
  },
  findingText: {
    color: '#F5F0E1',
    fontSize: '0.63rem',
    lineHeight: 1.35,
  },
  findingLight: {
    display: 'inline-block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    marginRight: '0.25rem',
    verticalAlign: 'middle',
  },
  actions: {
    marginTop: '0.6rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid rgba(154, 138, 122, 0.3)',
  },
  actionsTitle: {
    color: '#B0A090',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    marginBottom: '0.35rem',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.35rem',
    padding: '0.2rem 0',
  },
  actionPriority: {
    fontSize: '0.5rem',
    fontWeight: 700,
    padding: '0.08rem 0.3rem',
    borderRadius: 3,
    flexShrink: 0,
    marginTop: '0.05rem',
  },
  actionText: {
    color: '#F5F0E1',
    fontSize: '0.63rem',
    lineHeight: 1.35,
  },
  // Solo view
  soloHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.6rem 0',
    marginBottom: '0.3rem',
  },
  soloIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },
  soloName: {
    color: '#FFD000',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
  },
  soloRole: {
    color: '#9E9EB8',
    fontSize: '0.62rem',
    letterSpacing: '0.03em',
  },
  soloScoreRing: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: 'auto',
  },
  soloScoreNum: {
    fontWeight: 800,
    fontSize: '1.1rem',
  },
  soloVerdictBox: {
    background: 'rgba(255, 208, 0, 0.05)',
    borderRadius: 8,
    padding: '0.6rem',
    marginBottom: '0.6rem',
  },
  soloVerdict: {
    color: '#F5F0E1',
    fontSize: '0.72rem',
    lineHeight: 1.45,
    fontStyle: 'italic',
  },
  soloSectionBar: {
    margin: '0.5rem -1rem 0',
    padding: '0.35rem 1rem',
    background: 'rgba(154, 138, 122, 0.1)',
    borderTop: '1px solid rgba(154, 138, 122, 0.3)',
    borderBottom: '1px solid rgba(154, 138, 122, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  soloSectionName: {
    color: '#B0A090',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
  },
  soloSectionScore: {
    color: '#F5F0E1',
    fontSize: '0.65rem',
    fontWeight: 'bold',
  },
  soloFinding: {
    padding: '0.45rem 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  soloFindingBorder: {
    borderTop: '1px solid rgba(154, 138, 122, 0.08)',
  },
  soloFindingLight: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '0.2rem',
  },
  soloFindingText: {
    color: '#F5F0E1',
    fontSize: '0.68rem',
    lineHeight: 1.4,
  },
  soloFindingComment: {
    color: '#B0A090',
    fontSize: '0.62rem',
    fontStyle: 'italic',
    lineHeight: 1.35,
    marginTop: '0.15rem',
  },
  placeholder: {
    color: '#9E9EB8',
    fontSize: '0.8rem',
    fontStyle: 'italic',
    lineHeight: 1.5,
    marginTop: '1rem',
  },
};

const PRIORITY_STYLES: Record<string, React.CSSProperties> = {
  high: { background: 'rgba(255, 107, 107, 0.15)', color: '#FF6B6B' },
  med: { background: 'rgba(255, 217, 61, 0.15)', color: '#FFD93D' },
  low: { background: 'rgba(107, 203, 119, 0.15)', color: '#6BCB77' },
};

const PRIORITY_LABELS: Record<string, string> = {
  high: 'P0',
  med: 'P1',
  low: 'P2',
};

// ─── Persona observation → section-based findings (for solo view) ──

interface PersonaSoloSection {
  name: string;
  findings: { text: string; light: TrafficLight; comment: string }[];
}

function personaToSections(entry: PersonaEntry): PersonaSoloSection[] {
  const grouped: Record<string, { text: string; light: TrafficLight; comment: string }[]> = {};
  for (const obs of entry.observations) {
    const cat = obs.category.toLowerCase();
    if (!grouped[cat]) grouped[cat] = [];
    const light: TrafficLight = obs.verdict === 'good' ? 'green' : obs.verdict === 'needs-work' ? 'yellow' : 'red';
    grouped[cat].push({ text: obs.observation, light, comment: obs.comment });
  }
  return Object.entries(grouped).map(([name, findings]) => ({ name: name.toUpperCase(), findings }));
}

// ─── Sub-components ──────────────────────────────────────────

function ConsensusBox({ bundle, title }: { bundle: ReviewBundle; title: string }) {
  return (
    <div style={s.consensus}>
      <div style={s.consensusTitle}>{title}</div>
      {bundle.consensus.map((item, i) => (
        <div
          key={i}
          style={{
            ...s.consensusItem,
            color: item.type === 'agree' ? '#6BCB77' : '#FF6B6B',
          }}
        >
          {item.type === 'agree' ? '\u2713 ' : '\u2717 '}{item.text}
        </div>
      ))}
    </div>
  );
}

function ActionsBox({ bundle }: { bundle: ReviewBundle }) {
  return (
    <div style={s.actions}>
      <div style={s.actionsTitle}>PRIORITIZED ACTIONS</div>
      {bundle.actions.map((action, i) => (
        <div key={i} style={s.actionItem}>
          <span style={{ ...s.actionPriority, ...PRIORITY_STYLES[action.priority] }}>
            {PRIORITY_LABELS[action.priority]}
          </span>
          <span style={s.actionText}>{action.text}</span>
        </div>
      ))}
    </div>
  );
}

function SectionStatusText(findings: { light: TrafficLight }[]): string {
  let r = 0, y = 0;
  for (const f of findings) {
    if (f.light === 'red') r++;
    else if (f.light === 'yellow') y++;
  }
  if (r > 0) return `${r} blocker${r > 1 ? 's' : ''}`;
  if (y > 0) return `${y} warning${y > 1 ? 's' : ''}`;
  return 'all clear';
}

// ─── Main component ─────────────────────────────────────────

export default function UIReviewOverlay({
  isOpen,
  onClose,
  overlayView,
  dockMode,
  soloId,
  onTabSwitch,
  onSoloSelect,
  onSoloClose,
  variationHook,
  expertFindings,
  reviewBundle,
  personaFindings,
  kaizenBundle,
  onFindingHover,
}: UIReviewOverlayProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Reset expanded on view change
  useEffect(() => {
    setExpandedCards(new Set());
  }, [overlayView, dockMode]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (overlayView === 'solo') {
          onSoloClose();
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, overlayView, onClose, onSoloClose]);

  const toggleCard = useCallback((id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const panelStyle: React.CSSProperties = {
    ...s.panel,
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    boxShadow: isOpen ? '-4px 0 20px rgba(0,0,0,0.3)' : 'none',
  };

  const overlayTitle = overlayView === 'solo'
    ? (soloId ? soloId.toUpperCase() + ' REVIEW' : 'REVIEW')
    : (overlayView === 'team' ? 'UI REVIEW' : 'KAIZEN');

  const hasContent = expertFindings.length > 0 || personaFindings.length > 0;

  return (
    <div style={panelStyle} data-testid="anti-slop-overlay">
      {/* Header */}
      <div style={s.header}>
        <span style={s.title}>{overlayTitle}</span>
        <button
          style={s.closeBtn}
          onClick={overlayView === 'solo' ? onSoloClose : onClose}
          data-testid="anti-slop-close"
        >
          &times;
        </button>
      </div>
      <div style={s.hook}>{variationHook}</div>
      <hr style={s.divider} />

      {/* Tab switcher — hidden in solo view */}
      {overlayView !== 'solo' && (
        <div style={s.tabs}>
          <button
            data-testid="overlay-tab-review"
            style={{
              ...s.tab,
              ...s.tabBorder,
              ...(overlayView === 'team' ? s.tabActive : {}),
            }}
            onClick={() => onTabSwitch('team')}
          >
            UI REVIEW
          </button>
          <button
            data-testid="overlay-tab-kaizen"
            style={{
              ...s.tab,
              ...(overlayView === 'kaizen' ? s.tabActive : {}),
            }}
            onClick={() => onTabSwitch('kaizen')}
          >
            KAIZEN
          </button>
        </div>
      )}

      {/* No data placeholder */}
      {!hasContent && overlayView !== 'solo' && (
        <p style={s.placeholder}>
          Select a themed variation to see the review.
        </p>
      )}

      {/* ═══ VIEW 1: Team Summary ═══ */}
      {overlayView === 'team' && hasContent && (
        <TeamSummaryView
          expertFindings={expertFindings}
          reviewBundle={reviewBundle}
          expandedCards={expandedCards}
          onToggle={toggleCard}
          onSoloSelect={onSoloSelect}
          onFindingHover={onFindingHover}
        />
      )}

      {/* ═══ VIEW 2: Kaizen Dashboard ═══ */}
      {overlayView === 'kaizen' && hasContent && (
        <KaizenDashboardView
          personaFindings={personaFindings}
          kaizenBundle={kaizenBundle}
          expandedCards={expandedCards}
          onToggle={toggleCard}
          onSoloSelect={onSoloSelect}
        />
      )}

      {/* ═══ VIEW 3: Solo View ═══ */}
      {overlayView === 'solo' && soloId && (
        <SoloView
          soloId={soloId}
          dockMode={dockMode}
          expertFindings={expertFindings}
          personaFindings={personaFindings}
          onFindingHover={onFindingHover}
        />
      )}
    </div>
  );
}

// ─── TeamSummaryView ─────────────────────────────────────────

function TeamSummaryView({
  expertFindings: ef,
  reviewBundle,
  expandedCards,
  onToggle,
  onSoloSelect,
  onFindingHover,
}: {
  expertFindings: { expert: ExpertDef; finding: ExpertFinding }[];
  reviewBundle: ReviewBundle | undefined;
  expandedCards: Set<string>;
  onToggle: (id: string) => void;
  onSoloSelect: (id: string) => void;
  onFindingHover?: (sectionKey: string | null) => void;
}) {
  return (
    <>
      {reviewBundle && <ConsensusBox bundle={reviewBundle} title="TEAM CONSENSUS" />}

      <div style={s.sectionBar}>
        <div style={s.sectionLabel}>EXPERT PANEL</div>
      </div>

      {ef.map(({ expert, finding }, idx) => {
        const isExpanded = expandedCards.has(expert.id);
        const sc = scoreClass(finding.score);
        return (
          <React.Fragment key={expert.id}>
            <div
              style={{
                ...s.card,
                ...(idx > 0 ? s.cardBorder : {}),
              }}
              data-testid={`expert-card-${expert.id}`}
              onClick={() => onToggle(expert.id)}
            >
              <div style={s.cardTop}>
                <div style={{ ...s.cardIcon, background: expert.bg }}>{expert.icon}</div>
                <div style={s.cardInfo}>
                  <div style={s.cardName}>{expert.name}</div>
                  <div style={s.cardRole}>{expert.role}</div>
                </div>
                <div style={s.cardScore}>
                  <span style={{ ...s.scoreNum, color: SCORE_COLORS[sc] }}>{finding.score}</span>
                  <span style={s.scoreMax}>/10</span>
                </div>
                <span style={{
                  ...s.arrow,
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                }}>&#9656;</span>
              </div>
              <div style={s.verdict}>&ldquo;{finding.verdict}&rdquo;</div>
            </div>

            {isExpanded && (
              <div style={s.detail}>
                {Object.entries(finding.sections).map(([section, items]) =>
                  items.map((item, fi) => (
                    <div
                      key={`${section}-${fi}`}
                      style={s.finding}
                      onMouseEnter={() => onFindingHover?.(section === 'features' ? 'hero' : section)}
                      onMouseLeave={() => onFindingHover?.(null)}
                    >
                      <div style={s.findingSection}>{section}</div>
                      <div style={s.findingText}>
                        <span style={{ ...s.findingLight, background: LIGHT_COLORS[item.light] }} />
                        {item.text}
                      </div>
                    </div>
                  ))
                )}
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFD000',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.55rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0',
                    letterSpacing: '0.06em',
                  }}
                  onClick={(e) => { e.stopPropagation(); onSoloSelect(expert.id); }}
                >
                  VIEW FULL REVIEW &rarr;
                </button>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {reviewBundle && <ActionsBox bundle={reviewBundle} />}
    </>
  );
}

// ─── KaizenDashboardView ─────────────────────────────────────

function KaizenDashboardView({
  personaFindings: pf,
  kaizenBundle,
  expandedCards,
  onToggle,
  onSoloSelect,
}: {
  personaFindings: { lens: LensDef; entry: PersonaEntry }[];
  kaizenBundle: ReviewBundle | undefined;
  expandedCards: Set<string>;
  onToggle: (id: string) => void;
  onSoloSelect: (id: string) => void;
}) {
  return (
    <>
      {kaizenBundle && <ConsensusBox bundle={kaizenBundle} title="PERSONA CONSENSUS" />}

      <div style={s.sectionBar}>
        <div style={s.sectionLabel}>PERSONA PANEL</div>
      </div>

      {pf.map(({ lens, entry }, idx) => {
        const isExpanded = expandedCards.has(lens.id);
        const score = computePersonaScore(entry);
        const sc = scoreClass(score);
        const colors = PERSONA_COLORS[lens.id] || { bg: '#4ECDC4', text: '#1A1A2E' };

        return (
          <React.Fragment key={lens.id}>
            <div
              style={{
                ...s.card,
                ...(idx > 0 ? s.cardBorder : {}),
              }}
              onClick={() => onToggle(lens.id)}
            >
              <div style={s.cardTop}>
                <div style={{
                  ...s.cardPersonaIcon,
                  background: colors.bg,
                  color: colors.text,
                }}>
                  {lens.persona.charAt(0).toUpperCase()}
                </div>
                <div style={s.cardInfo}>
                  <div style={s.cardName}>{lens.persona.toUpperCase()}</div>
                  <div style={s.cardRole}>{lens.category}</div>
                </div>
                <div style={s.cardScore}>
                  <span style={{ ...s.scoreNum, color: SCORE_COLORS[sc] }}>{score}</span>
                  <span style={s.scoreMax}>/10</span>
                </div>
                <span style={{
                  ...s.arrow,
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                }}>&#9656;</span>
              </div>
              <div style={s.verdict}>&ldquo;{entry.tagline}&rdquo;</div>
            </div>

            {isExpanded && (
              <div style={s.detail}>
                {entry.observations.map((obs, oIdx) => {
                  const light: TrafficLight = obs.verdict === 'good' ? 'green' : obs.verdict === 'needs-work' ? 'yellow' : 'red';
                  return (
                    <div
                      key={oIdx}
                      style={s.finding}
                      data-testid={`persona-${lens.id}-note-${oIdx}`}
                    >
                      <div style={s.findingSection}>{obs.category}</div>
                      <div style={s.findingText}>
                        <span style={{ ...s.findingLight, background: LIGHT_COLORS[light] }} />
                        {obs.observation}
                      </div>
                    </div>
                  );
                })}
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFD000',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.55rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0',
                    letterSpacing: '0.06em',
                  }}
                  onClick={(e) => { e.stopPropagation(); onSoloSelect(lens.id); }}
                >
                  VIEW FULL REVIEW &rarr;
                </button>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {kaizenBundle && <ActionsBox bundle={kaizenBundle} />}
    </>
  );
}

// ─── SoloView ────────────────────────────────────────────────

function SoloView({
  soloId,
  dockMode,
  expertFindings: ef,
  personaFindings: pf,
  onFindingHover,
}: {
  soloId: string;
  dockMode: DockMode | null;
  expertFindings: { expert: ExpertDef; finding: ExpertFinding }[];
  personaFindings: { lens: LensDef; entry: PersonaEntry }[];
  onFindingHover?: (sectionKey: string | null) => void;
}) {
  if (dockMode !== 'kaizen') {
    // Expert solo
    const match = ef.find(({ expert }) => expert.id === soloId);
    if (!match) return <p style={s.placeholder}>Expert not found.</p>;
    const { expert, finding } = match;
    const sc = scoreClass(finding.score);

    return (
      <>
        <div style={s.soloHeader}>
          <div style={{ ...s.soloIcon, background: expert.bg }}>{expert.icon}</div>
          <div>
            <div style={s.soloName}>{expert.name}</div>
            <div style={s.soloRole}>{expert.role}</div>
          </div>
          <div style={{
            ...s.soloScoreRing,
            border: `3px solid ${expert.ringBorder}`,
          }}>
            <span style={{ ...s.soloScoreNum, color: SCORE_COLORS[sc] }}>{finding.score}</span>
          </div>
        </div>

        <div style={s.soloVerdictBox}>
          <div style={s.soloVerdict}>&ldquo;{finding.verdict}&rdquo;</div>
        </div>

        {Object.entries(finding.sections).map(([section, items]) => {
          const statusText = SectionStatusText(items);
          return (
            <React.Fragment key={section}>
              <div style={s.soloSectionBar}>
                <span style={s.soloSectionName}>{section.toUpperCase()}</span>
                <span style={s.soloSectionScore}>{statusText}</span>
              </div>
              {items.map((item, fi) => (
                <div
                  key={fi}
                  data-testid={`solo-finding-${section}-${fi}`}
                  style={{
                    ...s.soloFinding,
                    ...(fi > 0 ? s.soloFindingBorder : {}),
                  }}
                  onMouseEnter={() => onFindingHover?.(section === 'features' ? 'hero' : section)}
                  onMouseLeave={() => onFindingHover?.(null)}
                >
                  <div style={{ ...s.soloFindingLight, background: LIGHT_COLORS[item.light] }} />
                  <div>
                    <div style={s.soloFindingText}>{item.text}</div>
                    {item.comment && (
                      <div style={s.soloFindingComment}>&ldquo;{item.comment}&rdquo;</div>
                    )}
                  </div>
                </div>
              ))}
            </React.Fragment>
          );
        })}

      </>
    );
  }

  // Persona solo
  const match = pf.find(({ lens }) => lens.id === soloId);
  if (!match) return <p style={s.placeholder}>Persona not found.</p>;
  const { lens, entry } = match;
  const score = computePersonaScore(entry);
  const sc = scoreClass(score);
  const colors = PERSONA_COLORS[lens.id] || { bg: '#4ECDC4', text: '#1A1A2E' };
  const sections = personaToSections(entry);

  return (
    <>
      <div style={s.soloHeader}>
        <div style={{
          ...s.soloIcon,
          background: colors.bg,
          color: colors.text,
          borderRadius: '50%',
          fontWeight: 800,
          fontSize: '1.2rem',
        }}>
          {lens.persona.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={s.soloName}>{lens.persona.toUpperCase()}</div>
          <div style={s.soloRole}>{lens.category}</div>
        </div>
        <div style={{
          ...s.soloScoreRing,
          border: `3px solid ${colors.bg}`,
        }}>
          <span style={{ ...s.soloScoreNum, color: SCORE_COLORS[sc] }}>{score}</span>
        </div>
      </div>

      <div style={s.soloVerdictBox}>
        <div style={s.soloVerdict}>&ldquo;{entry.tagline}&rdquo;</div>
      </div>

      {sections.map((section) => {
        const statusText = SectionStatusText(section.findings);
        return (
          <React.Fragment key={section.name}>
            <div style={s.soloSectionBar}>
              <span style={s.soloSectionName}>{section.name}</span>
              <span style={s.soloSectionScore}>{statusText}</span>
            </div>
            {section.findings.map((item, fi) => (
              <div key={fi} style={{
                ...s.soloFinding,
                ...(fi > 0 ? s.soloFindingBorder : {}),
              }}>
                <div style={{ ...s.soloFindingLight, background: LIGHT_COLORS[item.light] }} />
                <div>
                  <div style={s.soloFindingText}>{item.text}</div>
                  {item.comment && (
                    <div style={s.soloFindingComment}>&ldquo;{item.comment}&rdquo;</div>
                  )}
                </div>
              </div>
            ))}
          </React.Fragment>
        );
      })}

    </>
  );
}
