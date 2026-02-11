import React from 'react';
import type { VariationDef } from '../types';

interface VariationPillsProps {
  variations: VariationDef[];
  activeVariation: string;
  onVariationChange: (id: string) => void;
  accent: string;
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    background: '#1A1A2E',
    fontFamily: "'Courier New', monospace",
    justifyContent: 'center',
  },
};

function pillStyle(isActive: boolean, accent: string): React.CSSProperties {
  return {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '0.3rem 0.85rem',
    borderRadius: '999px',
    border: isActive ? `1px solid ${accent}` : '1px solid rgba(245, 240, 225, 0.4)',
    background: isActive ? accent : 'transparent',
    color: isActive ? '#FFFFFF' : '#F5F0E1',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
  };
}

export default function VariationPills({
  variations,
  activeVariation,
  onVariationChange,
  accent,
}: VariationPillsProps) {
  return (
    <div style={styles.bar} data-testid="variation-pills">
      {variations.map((v) => (
        <button
          key={v.id}
          style={pillStyle(v.id === activeVariation, accent)}
          onClick={() => onVariationChange(v.id)}
          data-testid={`variation-pill-${v.id}`}
          onMouseEnter={(e) => {
            if (v.id !== activeVariation) {
              e.currentTarget.style.borderColor = accent;
              e.currentTarget.style.color = '#FFFFFF';
            }
          }}
          onMouseLeave={(e) => {
            if (v.id !== activeVariation) {
              e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.4)';
              e.currentTarget.style.color = '#F5F0E1';
            }
          }}
        >
          {v.hook}
        </button>
      ))}
    </div>
  );
}
