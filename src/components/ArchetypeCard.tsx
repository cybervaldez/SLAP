import React from 'react';
import { navigate } from '../router';
import type { ArchetypeEntry } from '../types';

const styles: Record<string, React.CSSProperties> = {
  card: {
    fontFamily: "'Courier New', 'Courier', monospace",
    border: '3px solid #1A1A2E',
    padding: '1.25rem',
    cursor: 'pointer',
    background: '#FFFEF5',
    transition: 'transform 0.15s, box-shadow 0.15s',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  icon: {
    fontSize: '1.8rem',
    textAlign: 'center',
  },
  name: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#1A1A2E',
    textAlign: 'center',
    letterSpacing: '0.05em',
  },
  desc: {
    fontSize: '0.75rem',
    color: '#4A4A6A',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  accent: {
    height: '3px',
    width: '100%',
    marginTop: 'auto',
  },
};

interface ArchetypeCardProps {
  entry: ArchetypeEntry;
}

export default function ArchetypeCard({ entry }: ArchetypeCardProps) {
  return (
    <div
      style={styles.card}
      data-testid={`archetype-card-${entry.slug}`}
      onClick={() => navigate(`/${entry.slug}`)}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 4px 0 ${entry.accent}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') navigate(`/${entry.slug}`); }}
    >
      <div style={styles.icon}>{entry.icon}</div>
      <div style={styles.name}>{entry.name}</div>
      <div style={styles.desc}>{entry.description}</div>
      <div style={{ ...styles.accent, background: entry.accent }} />
    </div>
  );
}
