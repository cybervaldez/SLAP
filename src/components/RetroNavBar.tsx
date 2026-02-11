import React from 'react';
import { navigate } from '../router';

const styles: Record<string, React.CSSProperties> = {
  bar: {
    fontFamily: "'Courier New', 'Courier', monospace",
    background: '#1A1A2E',
    color: '#FFFEF5',
    padding: '0.6rem 1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '3px solid #FFD000',
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
  },
  title: {
    fontSize: '0.75rem',
    color: '#FF1493',
    letterSpacing: '0.1em',
    fontWeight: 'bold',
  },
};

interface RetroNavBarProps {
  archetypeName: string;
}

export default function RetroNavBar({ archetypeName }: RetroNavBarProps) {
  return (
    <nav style={styles.bar} data-testid="retro-nav-bar">
      <button
        style={styles.backBtn}
        onClick={() => navigate('/')}
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
        &laquo; Back to Gallery
      </button>
      <span style={styles.title}>&#9733; {archetypeName.toUpperCase()}</span>
    </nav>
  );
}
