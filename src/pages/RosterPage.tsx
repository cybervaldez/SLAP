import React, { useState, useEffect, useMemo } from 'react';
import { experts, personas, allReviewers, getAvatarUrl, type Reviewer } from '../data/reviewers';
import { getAllReviews } from '../data/reviews';
import { projects } from '../data/projects';
import { navigate } from '../router';

// ─── Colors ──────────────────────────────────────────
const BG = '#0D0D1A';
const SURFACE = '#1A1A2E';
const TEXT = '#F5F0E1';
const TEXT_MUTED = 'rgba(245,240,225,0.5)';
const BORDER = 'rgba(245,240,225,0.12)';
const ACCENT = '#FFD000';
const GREEN = '#6BCB77';
const YELLOW = '#FFD93D';
const RED = '#FF6B6B';
const FONT = "'Courier New', monospace";

// ─── Category labels ─────────────────────────────────
const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'accessibility', label: 'Accessibility', icon: '♿' },
  { id: 'tech-spectrum', label: 'Tech Spectrum', icon: '📡' },
  { id: 'role-based', label: 'Role-Based', icon: '🏢' },
  { id: 'emotional-state', label: 'Emotional State', icon: '💭' },
  { id: 'context', label: 'Context', icon: '🌍' },
  { id: 'cultural-taste', label: 'Cultural Taste', icon: '🎨' },
];

// ─── Score computation ───────────────────────────────
function computeReviewerScores(): Record<string, { avg: number; count: number; best: number }> {
  const scores: Record<string, number[]> = {};
  for (const project of projects) {
    for (const version of project.versions) {
      const reviews = getAllReviews(project.id, version.id);
      for (const { reviewerId, review } of reviews) {
        if (!scores[reviewerId]) scores[reviewerId] = [];
        scores[reviewerId].push(review.score);
      }
    }
  }
  const result: Record<string, { avg: number; count: number; best: number }> = {};
  for (const [id, vals] of Object.entries(scores)) {
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    result[id] = { avg: Math.round(avg * 10) / 10, count: vals.length, best: Math.max(...vals) };
  }
  return result;
}

function scoreColor(score: number): string {
  if (score >= 7) return GREEN;
  if (score >= 5) return YELLOW;
  return RED;
}

// ─── Styles ──────────────────────────────────────────
const st: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: BG,
    color: TEXT,
    fontFamily: FONT,
    padding: '20px 24px 120px',
    overflowX: 'hidden',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    position: 'sticky',
    top: 10,
    zIndex: 50,
    background: BG,
    padding: '8px 0',
  },
  backBtn: {
    fontFamily: FONT,
    fontSize: '0.7rem',
    fontWeight: 700,
    color: ACCENT,
    background: 'none',
    border: `1px solid ${ACCENT}`,
    padding: '6px 14px',
    cursor: 'pointer',
    letterSpacing: '0.06em',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 900,
    letterSpacing: '0.12em',
    color: TEXT,
  },
  subtitle: {
    fontSize: '0.65rem',
    fontWeight: 600,
    color: TEXT_MUTED,
    letterSpacing: '0.06em',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: TEXT_MUTED,
    marginBottom: 16,
    textTransform: 'uppercase' as const,
  },
  expertGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 14,
    marginBottom: 40,
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap' as const,
  },
  categoryGroup: {
    marginBottom: 28,
  },
  categoryLabel: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: TEXT_MUTED,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  personaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 14,
  },
};

// ─── Card component ──────────────────────────────────
function ReviewerCard({ reviewer, scoreData, onClick }: {
  reviewer: Reviewer;
  scoreData?: { avg: number; count: number; best: number };
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isExpert = reviewer.type === 'expert';
  const avatarSize = isExpert ? 56 : 44;

  return (
    <div
      data-testid={`roster-card-${reviewer.id}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: SURFACE,
        border: `1px solid ${hovered ? reviewer.color + '66' : BORDER}`,
        borderLeft: `3px solid ${reviewer.color}`,
        padding: isExpert ? '16px 14px' : '12px 12px',
        cursor: 'pointer',
        transition: 'border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 4px 20px ${reviewer.color}22` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Header: avatar + name + icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src={getAvatarUrl(reviewer)}
          alt={reviewer.name}
          data-testid={`roster-avatar-${reviewer.id}`}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '50%',
            border: `2px solid ${reviewer.color}`,
            background: SURFACE,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: isExpert ? '0.75rem' : '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: reviewer.color,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span>{reviewer.icon}</span>
            <span data-testid={`roster-name-${reviewer.id}`}>{reviewer.name}</span>
          </div>
          <div style={{
            fontSize: '0.55rem',
            fontWeight: 600,
            color: TEXT_MUTED,
            letterSpacing: '0.04em',
            marginTop: 2,
          }}
          data-testid={`roster-role-${reviewer.id}`}
          >
            {reviewer.role}
          </div>
        </div>
        {/* Score badge */}
        {scoreData && (
          <div style={{
            textAlign: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              color: scoreColor(scoreData.avg),
            }}
            data-testid={`roster-score-${reviewer.id}`}
            >
              {scoreData.avg.toFixed(1)}
            </div>
            <div style={{
              fontSize: '0.45rem',
              color: TEXT_MUTED,
              letterSpacing: '0.04em',
            }}>
              AVG
            </div>
          </div>
        )}
      </div>

      {/* Bias */}
      <div
        data-testid={`roster-bias-${reviewer.id}`}
        style={{
          fontSize: '0.55rem',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'rgba(245,240,225,0.7)',
          lineHeight: 1.4,
          borderTop: `1px solid ${BORDER}`,
          paddingTop: 6,
        }}
      >
        &ldquo;{reviewer.bias}&rdquo;
      </div>

      {/* Taste (personas only) */}
      {reviewer.taste && (
        <div style={{
          fontSize: '0.5rem',
          color: TEXT_MUTED,
          lineHeight: 1.3,
        }}
        data-testid={`roster-taste-${reviewer.id}`}
        >
          {reviewer.taste}
        </div>
      )}

      {/* Type badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 'auto',
      }}>
        <span style={{
          fontSize: '0.45rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          padding: '2px 6px',
          background: isExpert ? reviewer.color + '22' : 'rgba(245,240,225,0.06)',
          color: isExpert ? reviewer.color : TEXT_MUTED,
          border: `1px solid ${isExpert ? reviewer.color + '44' : BORDER}`,
          textTransform: 'uppercase',
        }}>
          {isExpert ? 'EXPERT' : reviewer.category.replace('-', ' ')}
        </span>
        {scoreData && scoreData.count > 1 && (
          <span style={{
            fontSize: '0.45rem',
            color: TEXT_MUTED,
          }}>
            {scoreData.count} reviews
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Filter chip ─────────────────────────────────────
function FilterChip({ label, icon, active, onClick, testId }: {
  label: string;
  icon?: string;
  active: boolean;
  onClick: () => void;
  testId: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: FONT,
        fontSize: '0.55rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        padding: '5px 12px',
        background: active ? ACCENT + '22' : 'transparent',
        color: active ? ACCENT : TEXT_MUTED,
        border: `1px solid ${active ? ACCENT + '66' : BORDER}`,
        cursor: 'pointer',
        transition: 'all 150ms ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
      {label}
    </button>
  );
}

// ─── Main component ──────────────────────────────────
export default function RosterPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const scores = useMemo(() => computeReviewerScores(), []);

  // Expose slapState
  useEffect(() => {
    (window as any).slapState = {
      page: 'roster',
      totalReviewers: allReviewers.length,
      expertCount: experts.length,
      personaCount: personas.length,
      activeFilter,
    };
  }, [activeFilter]);

  // Filtered personas
  const filteredCategories = useMemo(() => {
    if (activeFilter === 'all') return CATEGORIES;
    return CATEGORIES.filter(c => c.id === activeFilter);
  }, [activeFilter]);

  const handleCardClick = (_reviewerId: string) => {
    navigate('flowboard', 'haiku');
  };

  return (
    <div style={st.page} data-testid="roster-page">
      {/* Top bar */}
      <div style={st.topBar} data-testid="roster-topbar">
        <button
          onClick={() => navigate()}
          data-testid="roster-back"
          style={st.backBtn}
        >
          {'\u2190'} HOME
        </button>
        <div>
          <div style={st.title}>ROSTER</div>
          <div style={st.subtitle}>
            {experts.length} experts + {personas.length} personas = {allReviewers.length} reviewers
          </div>
        </div>
      </div>

      {/* Expert section */}
      <div data-testid="roster-experts-section">
        <div style={st.sectionTitle}>
          {'\u2605'} DOMAIN EXPERTS ({experts.length})
        </div>
        <div style={st.expertGrid}>
          {experts.map(e => (
            <ReviewerCard
              key={e.id}
              reviewer={e}
              scoreData={scores[e.id]}
              onClick={() => handleCardClick(e.id)}
            />
          ))}
        </div>
      </div>

      {/* Persona section */}
      <div data-testid="roster-personas-section">
        <div style={st.sectionTitle}>
          {'\u263A'} USER PERSONAS ({personas.length})
        </div>

        {/* Filter chips */}
        <div style={st.filterRow} data-testid="roster-filters">
          <FilterChip
            label="ALL"
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
            testId="roster-filter-all"
          />
          {CATEGORIES.map(c => (
            <FilterChip
              key={c.id}
              label={c.label.toUpperCase()}
              icon={c.icon}
              active={activeFilter === c.id}
              onClick={() => setActiveFilter(c.id)}
              testId={`roster-filter-${c.id}`}
            />
          ))}
        </div>

        {/* Category groups */}
        {filteredCategories.map(cat => {
          const catPersonas = personas.filter(p => p.category === cat.id);
          return (
            <div key={cat.id} style={st.categoryGroup} data-testid={`roster-category-${cat.id}`}>
              <div style={st.categoryLabel}>
                <span>{cat.icon}</span>
                <span>{cat.label.toUpperCase()}</span>
              </div>
              <div style={st.personaGrid}>
                {catPersonas.map(p => (
                  <ReviewerCard
                    key={p.id}
                    reviewer={p}
                    scoreData={scores[p.id]}
                    onClick={() => handleCardClick(p.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
