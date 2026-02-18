import React, { useState } from 'react';
import type { TrafficLight } from '../data/reviews';

export interface SectionChip {
  section: string;
  severity: TrafficLight;
  tooltipText?: string;
}

interface BubblePopoverProps {
  visible: boolean;
  anchorTop: number;
  anchorRight: number;
  name: string;
  role: string;
  score: number;
  avatar?: string;
  bias?: string;
  taste?: string;
  shortVerdict?: string;
  accentColor: string;
  chips: SectionChip[];
  onChipHover: (info: { section: string; text?: string; color?: string } | null) => void;
  onViewFull: () => void;
}

const CHIP_STYLES: Record<TrafficLight, { bg: string; color: string }> = {
  green: { bg: 'rgba(107,203,119,0.15)', color: '#6BCB77' },
  yellow: { bg: 'rgba(255,217,61,0.15)', color: '#FFD93D' },
  red: { bg: 'rgba(255,107,107,0.15)', color: '#FF6B6B' },
};

const CHIP_ICONS: Record<TrafficLight, string> = {
  green: '\u2713',
  yellow: '~',
  red: '\u2717',
};

const st: Record<string, React.CSSProperties> = {
  popover: {
    position: 'fixed',
    zIndex: 960,
    width: 280,
    background: '#222240',
    border: '1px solid rgba(245, 240, 225, 0.12)',
    borderRadius: 6,
    padding: 14,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    fontFamily: "'Courier New', monospace",
    transition: 'opacity 250ms cubic-bezier(0.22, 0.61, 0.36, 1), transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 800,
    background: '#2A2A4E',
  },
  name: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
  },
  role: {
    fontSize: '0.55rem',
    color: 'rgba(245, 240, 225, 0.5)',
    letterSpacing: '0.04em',
  },
  scoreWrap: {
    marginLeft: 'auto',
    textAlign: 'center' as const,
  },
  score: {
    fontSize: '1.2rem',
    fontWeight: 800,
  },
  scoreSmall: {
    fontSize: '0.55rem',
    color: 'rgba(245, 240, 225, 0.5)',
  },
  scoreBar: {
    width: 40,
    height: 3,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    marginTop: 3,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 250ms cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
  verdict: {
    fontSize: '0.65rem',
    fontWeight: 700,
    color: '#F5F0E1',
    lineHeight: 1.5,
    marginBottom: 10,
    padding: '6px 8px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 3,
  },
  chips: {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap' as const,
    marginBottom: 10,
  },
  chip: {
    fontSize: '0.5rem',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 3,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    position: 'relative' as const,
    transition: 'transform 150ms, box-shadow 150ms',
  },
  chipTooltip: {
    position: 'absolute' as const,
    bottom: 'calc(100% + 6px)',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.45rem',
    fontWeight: 600,
    textTransform: 'none' as const,
    letterSpacing: '0.02em',
    padding: '3px 8px',
    borderRadius: 3,
    background: '#222240',
    color: '#F5F0E1',
    border: '1px solid rgba(245, 240, 225, 0.12)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    pointerEvents: 'none' as const,
    maxWidth: 200,
    whiteSpace: 'normal' as const,
    textAlign: 'center' as const,
    zIndex: 1,
    transition: 'opacity 150ms',
  },
  viewFull: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.55rem',
    fontWeight: 700,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.06em',
    padding: '4px 0',
    transition: 'all 150ms',
  },
};

export default function BubblePopover({
  visible,
  anchorTop,
  anchorRight,
  name,
  role,
  score,
  avatar,
  bias,
  taste,
  shortVerdict,
  accentColor,
  chips,
  onChipHover,
  onViewFull,
}: BubblePopoverProps) {
  const sc = score >= 7 ? '#6BCB77' : score >= 5 ? '#FFD93D' : '#FF6B6B';
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  return (
    <div
      data-testid="bubble-popover"
      style={{
        ...st.popover,
        borderLeft: `3px solid ${accentColor}`,
        top: anchorTop,
        right: anchorRight,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0) scale(1)' : 'translateX(12px) scale(0.95)',
        pointerEvents: visible ? 'auto' as const : 'none' as const,
      }}
    >
      <div style={st.header}>
        <div style={{ ...st.avatar, border: `2px solid ${accentColor}` }}>
          {avatar ? (
            <img src={avatar} alt={name} style={st.avatarImg} loading="lazy" />
          ) : (
            <div style={{ ...st.avatarFallback, color: accentColor }}>{name.charAt(0)}</div>
          )}
        </div>
        <div>
          <div style={{ ...st.name, color: accentColor }}>{name}</div>
          <div style={st.role}>{role}</div>
        </div>
        <div style={st.scoreWrap}>
          <div style={{ ...st.score, color: sc }}>
            {score}<span style={st.scoreSmall}>/10</span>
          </div>
          <div style={st.scoreBar}>
            <div style={{
              ...st.scoreBarFill,
              width: `${score * 10}%`,
              background: sc,
            }} />
          </div>
        </div>
      </div>

      {bias && (
        <div
          data-testid="popover-lens"
          style={{
            fontSize: '0.5rem',
            fontWeight: 600,
            color: 'rgba(245, 240, 225, 0.6)',
            lineHeight: 1.4,
            marginBottom: 6,
            fontStyle: 'italic',
          }}
        >
          <span style={{ fontWeight: 700, fontStyle: 'normal', color: 'rgba(245, 240, 225, 0.4)', letterSpacing: '0.06em' }}>LENS: </span>
          &ldquo;{bias}&rdquo;
        </div>
      )}

      {shortVerdict && (
        <div style={{ ...st.verdict, borderLeft: `2px solid ${accentColor}` }}>
          {shortVerdict}
        </div>
      )}

      {taste && (
        <div
          data-testid="popover-taste"
          style={{
            fontSize: '0.45rem',
            color: 'rgba(245, 240, 225, 0.4)',
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
          {taste}
        </div>
      )}

      <div style={st.chips}>
        {chips.map((chip) => {
          const chipStyle = CHIP_STYLES[chip.severity];
          const isHovered = hoveredChip === chip.section;
          return (
            <span
              key={chip.section}
              style={{
                ...st.chip,
                background: chipStyle.bg,
                color: chipStyle.color,
                ...(chip.severity === 'red' ? { fontWeight: 800 } : {}),
              }}
              onMouseEnter={() => {
                setHoveredChip(chip.section);
                onChipHover({ section: chip.section, text: chip.tooltipText, color: accentColor });
              }}
              onMouseLeave={() => {
                setHoveredChip(null);
                onChipHover(null);
              }}
            >
              {chip.section} {CHIP_ICONS[chip.severity]}
              {chip.tooltipText && (
                <span style={{
                  ...st.chipTooltip,
                  opacity: isHovered ? 1 : 0,
                }}>
                  {chip.tooltipText}
                </span>
              )}
            </span>
          );
        })}
      </div>

      <button
        style={{ ...st.viewFull, color: accentColor }}
        onClick={onViewFull}
        data-testid="popover-view-full"
      >
        VIEW FULL REVIEW &rarr;
      </button>
    </div>
  );
}
