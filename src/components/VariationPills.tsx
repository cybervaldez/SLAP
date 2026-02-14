import React, { useState, useEffect } from 'react';
import type { VariationDef } from '../types';

interface VariationPillsProps {
  variations: VariationDef[];
  activeVariation: string;
  onVariationChange: (id: string) => void;
  accent: string;
  inline?: boolean;
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
  barInline: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem',
    padding: 0,
    background: 'transparent',
    fontFamily: "'Courier New', monospace",
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function pillStyle(isActive: boolean, accent: string, inline?: boolean): React.CSSProperties {
  return {
    fontFamily: "'Courier New', monospace",
    fontSize: inline ? '0.7rem' : '0.75rem',
    fontWeight: 600,
    padding: inline ? '0.2rem 0.65rem' : '0.3rem 0.85rem',
    borderRadius: '999px',
    border: isActive ? `1px solid ${accent}` : '1px solid rgba(245, 240, 225, 0.4)',
    background: isActive ? accent : 'transparent',
    color: isActive ? '#FFFFFF' : '#F5F0E1',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
    whiteSpace: 'nowrap',
  };
}

export default function VariationPills({
  variations,
  activeVariation,
  onVariationChange,
  accent,
  inline,
}: VariationPillsProps) {
  const [isEntering, setIsEntering] = useState(true);
  const pillCount = variations.length;

  useEffect(() => {
    const totalDuration = 300 + pillCount * 50;
    const timer = setTimeout(() => setIsEntering(false), totalDuration);
    return () => clearTimeout(timer);
  }, [pillCount]);

  return (
    <div style={inline ? styles.barInline : styles.bar} data-testid="variation-pills">
      {isEntering && <style>{pillAnimCSS}</style>}
      {variations.map((v, i) => (
        <button
          key={v.id}
          style={{
            ...pillStyle(v.id === activeVariation, accent, inline),
            ...(isEntering ? {
              opacity: 0,
              transform: 'translateY(-10px)',
              animation: `pillDrop 300ms cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 50}ms forwards`,
            } : {}),
          }}
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

const pillAnimCSS = `
@keyframes pillDrop {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  [data-testid^="variation-pill-"] {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;
