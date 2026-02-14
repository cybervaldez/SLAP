import type React from 'react';
import { navigate } from '../router';
import VariationPills from './VariationPills';
import type { VariationDef } from '../types';

const styles: Record<string, React.CSSProperties> = {
  bar: {
    fontFamily: "'Courier New', 'Courier', monospace",
    background: '#1A1A2E',
    color: '#FFFEF5',
    padding: '0.6rem 1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    background: 'none',
    border: '2px solid #FFD000',
    color: '#FFD000',
    fontFamily: "'Courier New', 'Courier', monospace",
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '0.35rem 0.75rem',
    cursor: 'pointer',
    letterSpacing: '0.05em',
    flexShrink: 0,
    textDecoration: 'none',
    display: 'inline-block',
  },
  title: {
    fontSize: '0.75rem',
    color: '#FF1493',
    letterSpacing: '0.1em',
    fontWeight: 'bold',
    flexShrink: 0,
  },
};

interface RetroNavBarProps {
  archetypeName: string;
  variations?: VariationDef[];
  activeVariation?: string;
  onVariationChange?: (id: string) => void;
  accent?: string;
  backLens?: string | null;
}

export default function RetroNavBar({
  archetypeName,
  variations,
  activeVariation,
  onVariationChange,
  accent,
  backLens,
}: RetroNavBarProps) {
  const handleBack = () => {
    if (backLens) {
      sessionStorage.setItem('scrollToArchetypes', 'true');
      navigate(backLens);
    } else {
      navigate();
    }
  };

  return (
    <nav style={styles.bar} data-testid="retro-nav-bar">
      <button
        style={styles.backBtn}
        onClick={handleBack}
        data-testid="back-to-gallery"
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.background = '#FFD000';
          (e.target as HTMLButtonElement).style.color = '#1A1A2E';
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.background = 'none';
          (e.target as HTMLButtonElement).style.color = '#FFD000';
        }}
      >
        &laquo; Gallery
      </button>
      {variations && activeVariation && onVariationChange && accent && (
        <VariationPills
          variations={variations}
          activeVariation={activeVariation}
          onVariationChange={onVariationChange}
          accent={accent}
          inline
        />
      )}
      <span style={styles.title}>&#9733; {archetypeName.toUpperCase()}</span>
    </nav>
  );
}
