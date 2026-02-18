import React, { useState, useEffect, useCallback } from 'react';
import HeroProblem from './landing/HeroProblem';
import CouncilCarousel from './landing/CouncilCarousel';
import TheLoop from './landing/TheLoop';
import { CHIN_HEIGHT } from './landing/constants';

const BG_DEEP = '#0D0D1A';
const ACCENT_GOLD = '#FFD000';

export { CHIN_HEIGHT };

const KEYFRAMES = `
body.shaking {
  animation: screenShake 150ms linear;
}
`;

const st: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: BG_DEEP,
    color: '#F5F0E1',
    fontFamily: "'Courier New', monospace",
    overflowX: 'hidden' as const,
  },
  slapFlash: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: ACCENT_GOLD,
    zIndex: 9999,
    opacity: 0,
    pointerEvents: 'none' as const,
    transition: 'opacity 80ms linear',
  },
  slapFlashActive: {
    opacity: 1,
  },
  slapFlashText: {
    fontSize: '6rem',
    fontWeight: 900,
    letterSpacing: '0.2em',
    color: BG_DEEP,
  },
  chinLabel: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: CHIN_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100000,
    pointerEvents: 'none' as const,
  },
  chinText: {
    fontSize: '0.55rem',
    fontWeight: 800,
    letterSpacing: '0.15em',
    fontFamily: "'Courier New', monospace",
    color: 'rgba(0, 0, 0, 0.18)',
    userSelect: 'none' as const,
    pointerEvents: 'auto' as const,
    cursor: 'default',
    transition: 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    padding: '0.5rem 1rem',
    borderRadius: 4,
  },
};

export default function LandingPage() {
  const [flashActive, setFlashActive] = useState(false);
  const [chinHovered, setChinHovered] = useState(false);

  // Expose slapState on window
  useEffect(() => {
    (window as any).slapState = {
      project: 'landing',
      version: 'v1',
      reviewMode: 'landing',
      activeReviewer: null,
      overlayTier: 0,
      highlightedSection: null,
      sections: ['hero-problem', 'council', 'the-loop'],
    };
  }, []);

  const handleSlapped = useCallback(() => {
    setFlashActive(true);
    setTimeout(() => {
      setFlashActive(false);
    }, 200);
  }, []);

  const handleChinSlap = useCallback(() => {
    document.body.classList.add('shaking');
    setTimeout(() => {
      document.body.classList.remove('shaking');
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 200);
    }, 150);
  }, []);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={st.page} data-testid="landing-page">
        <HeroProblem onSlapped={handleSlapped} />

        {/* SLAP flash overlay */}
        <div
          style={{ ...st.slapFlash, ...(flashActive ? st.slapFlashActive : {}) }}
          data-testid="slap-flash"
        >
          <h1 style={st.slapFlashText}>SLAP!</h1>
        </div>

        <CouncilCarousel />

        <TheLoop />
      </div>

      {/* Interactive label on the chin bezel */}
      <div style={st.chinLabel}>
        <span
          style={{
            ...st.chinText,
            cursor: chinHovered ? 'pointer' : 'default',
            ...(chinHovered ? { transform: 'scale(1.1)' } : {}),
          }}
          onMouseEnter={() => setChinHovered(true)}
          onMouseLeave={() => setChinHovered(false)}
          onClick={handleChinSlap}
          data-testid="chin-slap"
        >
          {chinHovered
            ? <span style={{ filter: 'grayscale(1) brightness(0.25)', fontSize: '1.2rem', lineHeight: 1 }}>{'\u270B'}</span>
            : 'SLAP!'
          }
        </span>
      </div>
    </>
  );
}
