import React from 'react';
import type { Reviewer } from '../../data/reviewers';
import { getAvatarUrl } from '../../data/reviewers';
import type { TrafficLight } from '../../data/reviews';

interface CarouselCardProps {
  reviewer: Reviewer;
  finding: { text: string; light: TrafficLight } | undefined;
  isSelected: boolean;
  isExpert: boolean;
  onToggle: (id: string) => void;
  enterDirection: 'left' | 'right' | 'up' | 'down' | null;
  isPulsing: boolean;
}

const BG_DARK = '#1A1A2E';
const BG_MID = '#222240';
const TEXT_LIGHT = '#F5F0E1';
const TEXT_MUTED = 'rgba(245, 240, 225, 0.5)';
const ACCENT_GOLD = '#FFD000';
const SCORE_RED = '#FF6B6B';
const EASE_ENTER = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const EASE_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const KEYFRAMES = `
@keyframes fbGoldPulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 208, 0, 0.4); }
  100% { box-shadow: 0 0 0 20px rgba(255, 208, 0, 0); }
}
`;

const CATEGORY_DISPLAY: Record<string, string> = {
  'expert': 'Expert',
  'accessibility': 'Accessibility',
  'tech-spectrum': 'Tech Spectrum',
  'role-based': 'Role-Based',
  'emotional-state': 'Emotional',
  'context': 'Context',
  'cultural-taste': 'Cultural Taste',
};

const st: Record<string, React.CSSProperties> = {
  card: {
    width: '100%',
    minHeight: 280,
    background: BG_DARK,
    border: '2px solid rgba(245, 240, 225, 0.08)',
    borderRadius: 10,
    padding: '1.5rem 1.25rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    opacity: 1,
    transform: 'rotateY(0deg)',
    transformStyle: 'preserve-3d' as const,
    backfaceVisibility: 'hidden' as const,
    transition: `opacity 400ms ${EASE_ENTER}, transform 400ms ${EASE_ENTER}, border-color 150ms, box-shadow 150ms`,
  },
  cardSelected: {
    borderColor: ACCENT_GOLD,
    boxShadow: '0 0 24px rgba(255, 208, 0, 0.15), inset 0 0 12px rgba(255, 208, 0, 0.05)',
  },
  cardExpert: {
    borderColor: 'rgba(255, 208, 0, 0.2)',
    background: `linear-gradient(180deg, ${BG_DARK} 0%, rgba(255, 208, 0, 0.03) 100%)`,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid rgba(245, 240, 225, 0.1)',
    transition: 'border-color 150ms, box-shadow 150ms',
    flexShrink: 0,
  },
  avatarSelected: {
    borderColor: ACCENT_GOLD,
    boxShadow: '0 0 20px rgba(255, 208, 0, 0.3)',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  name: {
    fontSize: '0.8rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
    textAlign: 'center' as const,
  },
  meta: {
    fontSize: '0.55rem',
    color: TEXT_MUTED,
    textAlign: 'center' as const,
    letterSpacing: '0.08em',
  },
  bias: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    color: ACCENT_GOLD,
    textAlign: 'center' as const,
    lineHeight: 1.5,
    margin: '0.4rem 0',
    maxWidth: 400,
    fontWeight: 700,
  },
  finding: {
    fontSize: '0.6rem',
    color: TEXT_LIGHT,
    textAlign: 'center' as const,
    lineHeight: 1.5,
    maxWidth: 400,
    opacity: 0.85,
    background: BG_MID,
    padding: '0.5rem 0.75rem',
    borderRadius: 4,
  },
  badge: {
    fontSize: '0.45rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    padding: '4px 14px',
    borderRadius: 999,
    marginTop: '0.3rem',
  },
  badgeExpert: {
    background: 'rgba(255, 208, 0, 0.12)',
    color: ACCENT_GOLD,
  },
  badgePersona: {
    background: BG_MID,
    color: TEXT_MUTED,
  },
  btnBase: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.48rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    padding: '0.45rem 1.4rem',
    border: `2px solid ${ACCENT_GOLD}`,
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: '0.3rem',
    transition: `all 150ms ${EASE_BOUNCE}`,
  },
  btnAdd: {
    background: ACCENT_GOLD,
    color: '#0D0D1A',
  },
  btnRemove: {
    background: BG_MID,
    color: TEXT_MUTED,
    borderColor: 'rgba(245, 240, 225, 0.15)',
  },
};

export default function CarouselCard({
  reviewer,
  finding,
  isSelected,
  isExpert,
  onToggle,
  enterDirection,
  isPulsing,
}: CarouselCardProps) {
  const categoryLabel = CATEGORY_DISPLAY[reviewer.category] || reviewer.category;

  const cardStyle: React.CSSProperties = {
    ...st.card,
    ...(isExpert && !isSelected ? st.cardExpert : {}),
    ...(isSelected ? st.cardSelected : {}),
    ...(isPulsing ? { animation: 'fbGoldPulse 500ms ease-out' } : {}),
    ...(enterDirection === 'left' ? { opacity: 0, transform: 'rotateY(90deg)' } : {}),
    ...(enterDirection === 'right' ? { opacity: 0, transform: 'rotateY(-90deg)' } : {}),
    ...(enterDirection === 'up' ? { opacity: 0, transform: 'rotateX(-90deg)' } : {}),
    ...(enterDirection === 'down' ? { opacity: 0, transform: 'rotateX(90deg)' } : {}),
  };

  const avatarStyle: React.CSSProperties = {
    ...st.avatar,
    ...(isSelected ? st.avatarSelected : { borderColor: reviewer.color }),
  };

  const btnStyle: React.CSSProperties = {
    ...st.btnBase,
    ...(isSelected ? st.btnRemove : st.btnAdd),
  };

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={cardStyle}
        data-testid={`carousel-card-${reviewer.id}`}
        data-id={reviewer.id}
      >
        <div style={avatarStyle}>
          <img
            src={getAvatarUrl(reviewer)}
            alt={reviewer.name}
            loading="lazy"
            style={st.avatarImg}
          />
        </div>
        <div style={{ ...st.name, color: reviewer.color }}>{reviewer.name}</div>
        <div style={st.meta}>{reviewer.role} &middot; {categoryLabel}</div>
        <div style={st.bias}>&ldquo;{reviewer.bias}&rdquo;</div>
        {finding && <div style={st.finding}>{finding.text}</div>}
        <div style={{ ...st.badge, ...(isExpert ? st.badgeExpert : st.badgePersona) }}>
          {isExpert ? 'EXPERT' : categoryLabel.toUpperCase()}
        </div>
        <button
          style={btnStyle}
          data-testid={`toggle-${reviewer.id}`}
          onClick={() => onToggle(reviewer.id)}
          onMouseEnter={(e) => {
            if (isSelected) {
              e.currentTarget.style.borderColor = SCORE_RED;
              e.currentTarget.style.color = SCORE_RED;
            } else {
              e.currentTarget.style.filter = 'brightness(1.15)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (isSelected) {
              e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.15)';
              e.currentTarget.style.color = TEXT_MUTED;
            } else {
              e.currentTarget.style.filter = '';
              e.currentTarget.style.transform = '';
            }
          }}
        >
          {isSelected ? 'REMOVE' : 'ADD TO COUNCIL'}
        </button>
      </div>
    </>
  );
}
