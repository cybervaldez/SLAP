/**
 * Tour button — renders in TopBar between project name and version pills.
 * Shows "TOUR" when inactive, "STOP" + mode dropdown when active.
 */

import React, { useState, useRef, useEffect } from 'react';
import type { TourMode } from '../hooks/useTourEngine';

interface TourButtonProps {
  visible: boolean;
  active: boolean;
  mode: TourMode;
  onStart: () => void;
  onStop: () => void;
  onModeChange: (mode: TourMode) => void;
}

const st: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  btn: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.5rem',
    fontWeight: 800,
    letterSpacing: '0.08em',
    padding: '4px 10px',
    border: '1.5px solid #FFD000',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'all 150ms',
    whiteSpace: 'nowrap' as const,
  },
  btnInactive: {
    background: 'transparent',
    color: '#FFD000',
  },
  btnActive: {
    background: '#FFD000',
    color: '#0D0D1A',
  },
  modeBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.45rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    padding: '4px 8px',
    border: '1px solid rgba(245, 240, 225, 0.15)',
    borderRadius: 4,
    cursor: 'pointer',
    background: 'transparent',
    color: 'rgba(245, 240, 225, 0.6)',
    transition: 'all 150ms',
    whiteSpace: 'nowrap' as const,
  },
  dropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 4px)',
    left: 0,
    background: '#222240',
    border: '1px solid rgba(245, 240, 225, 0.12)',
    borderRadius: 4,
    padding: 4,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
    zIndex: 100,
    minWidth: 90,
  },
  dropdownItem: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.45rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    padding: '5px 8px',
    border: 'none',
    borderRadius: 3,
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'all 120ms',
    whiteSpace: 'nowrap' as const,
  },
};

export default function TourButton({
  visible,
  active,
  mode,
  onStart,
  onStop,
  onModeChange,
}: TourButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  if (!visible) return null;

  if (!active) {
    return (
      <button
        data-testid="tour-button"
        style={{ ...st.btn, ...st.btnInactive }}
        onClick={onStart}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 208, 0, 0.12)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        TOUR
      </button>
    );
  }

  return (
    <div ref={wrapperRef} style={st.wrapper}>
      <button
        data-testid="tour-button"
        style={{ ...st.btn, ...st.btnActive }}
        onClick={onStop}
      >
        STOP
      </button>
      <button
        data-testid="tour-mode-dropdown"
        style={st.modeBtn}
        onClick={() => setDropdownOpen(prev => !prev)}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#FFD000';
          e.currentTarget.style.color = '#FFD000';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.15)';
          e.currentTarget.style.color = 'rgba(245, 240, 225, 0.6)';
        }}
      >
        {mode === 'guided' ? 'GUIDED' : 'LIVE'} ▾
      </button>
      {dropdownOpen && (
        <div style={st.dropdown}>
          {(['guided', 'live'] as TourMode[]).map(m => {
            const isActive = m === mode;
            return (
              <button
                key={m}
                style={{
                  ...st.dropdownItem,
                  background: isActive ? 'rgba(255, 208, 0, 0.15)' : 'transparent',
                  color: isActive ? '#FFD000' : 'rgba(245, 240, 225, 0.6)',
                }}
                onClick={() => {
                  onModeChange(m);
                  setDropdownOpen(false);
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(245, 240, 225, 0.06)';
                    e.currentTarget.style.color = '#F5F0E1';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(245, 240, 225, 0.6)';
                  }
                }}
              >
                {m === 'guided' ? 'Guided' : 'Live'}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
