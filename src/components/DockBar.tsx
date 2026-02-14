import React, { useCallback } from 'react';
import type { DockMode } from '../types';

export interface BubbleData {
  id: string;
  icon: string;
  label?: string;
  score: number;
  bg?: string;
  color?: string;
}

interface DockBarProps {
  mode: DockMode | null;
  onModeChange: (mode: DockMode) => void;
  dark?: boolean;
}

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 900,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none',
    fontFamily: "'Courier New', monospace",
  },
  // Pill dock container
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0,
    background: '#FFFFFF',
    borderRadius: 9999,
    border: '1.5px solid rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
    pointerEvents: 'auto',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  btn: {
    border: 'none',
    padding: '0.45rem 1rem',
    fontFamily: "'Courier New', monospace",
    fontWeight: 700,
    fontSize: '0.65rem',
    letterSpacing: '0.04em',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'background 0.15s, color 0.15s',
    background: 'transparent',
    color: '#666',
    borderRadius: 0,
  },
  btnActive: {
    background: '#FFD000',
    color: '#1A1A2E',
  },
  btnInactive: {
    background: 'transparent',
    color: '#666',
  },
  pillDivider: {
    width: 1,
    height: 18,
    background: 'rgba(0, 0, 0, 0.12)',
    flexShrink: 0,
  },
};

function chinStyle(dark?: boolean): React.CSSProperties {
  const bezelColor = dark ? '#FFFFFF' : '#1A1A2E';
  return {
    width: '100%',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: bezelColor,
    borderLeft: `8px solid ${bezelColor}`,
    borderRight: `8px solid ${bezelColor}`,
    borderBottom: `8px solid ${bezelColor}`,
    borderRadius: '0 0 10px 10px',
    boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, 0.06), 0 -1px 0 rgba(0, 0, 0, 0.04)',
    transition: 'background 800ms ease-in-out, border-color 800ms ease-in-out, box-shadow 800ms ease-in-out',
    pointerEvents: 'auto',
    flexShrink: 0,
  };
}

export default function DockBar({
  mode,
  onModeChange,
  dark,
}: DockBarProps) {
  const isReview = mode === 'review';
  const isKaizen = mode === 'kaizen';

  const handleModeClick = useCallback((newMode: DockMode) => {
    if (newMode !== mode) {
      onModeChange(newMode);
    }
  }, [mode, onModeChange]);

  return (
    <div style={s.wrapper} data-testid="dock-bar">
      {/* Chin bar — extends the bezel at the bottom */}
      <div style={chinStyle(dark)} data-testid="dock-chin">
        <div style={s.pill}>
          <button
            data-testid="dock-btn-review"
            style={{
              ...s.btn,
              ...(isReview ? s.btnActive : s.btnInactive),
            }}
            onClick={() => handleModeClick('review')}
          >
            /ui-review
          </button>
          <div style={s.pillDivider} />
          <button
            data-testid="dock-btn-kaizen"
            style={{
              ...s.btn,
              ...(isKaizen ? s.btnActive : s.btnInactive),
            }}
            onClick={() => handleModeClick('kaizen')}
          >
            /kaizen
          </button>
        </div>
      </div>
    </div>
  );
}
