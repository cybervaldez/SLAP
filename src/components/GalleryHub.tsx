import React from 'react';
import ArchetypeCard from './ArchetypeCard';
import type { ArchetypeEntry } from '../types';

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Courier New', 'Courier', monospace",
    background: '#FFFEF5',
    color: '#1A1A2E',
    minHeight: '100vh',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#E6B800',
    fontWeight: 'bold',
  },
  dim: {
    color: '#7A7A9A',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
    maxWidth: '960px',
    margin: '0 auto',
  },
  constellation: {
    whiteSpace: 'pre',
    fontSize: '0.85rem',
    lineHeight: 1.4,
    textAlign: 'center',
    marginBottom: '1rem',
  },
};

interface GalleryHubProps {
  archetypes: ArchetypeEntry[];
}

export default function GalleryHub({ archetypes }: GalleryHubProps) {
  return (
    <div style={styles.page} data-testid="gallery-hub">
      <style>{`
        html, body { margin: 0; padding: 0; background: #FFFEF5; }
        @keyframes retro-pulse {
          0%, 100% { color: #FFD000; }
          25% { color: #FF6600; }
          50% { color: #FF1493; }
          75% { color: #FFD000; }
        }
      `}</style>
      <div style={styles.header}>
        <pre style={styles.constellation}>
          <span style={{ animation: 'retro-pulse 2s infinite', color: '#FFD000' }}>&#9733;</span>
{`
   ARCHETYPE GALLERY
`}
        </pre>
        <div style={styles.title}>SLAP Archetype Gallery</div>
        <div style={styles.subtitle}>
          &#9734; 8 Interactive Demos <span style={styles.dim}>-- click to explore</span>
        </div>
      </div>
      <div style={styles.grid} data-testid="archetype-grid">
        {archetypes.map(entry => (
          <ArchetypeCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
