import React from 'react';
import type { Section } from '../data';

interface TOCProps {
  sections: Section[];
  activeId: string | null;
  onSelect: (sectionId: string) => void;
}

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#2563EB';

const TOC: React.FC<TOCProps> = ({ sections, activeId, onSelect }) => {
  const navStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#6B7280',
    marginBottom: 12,
    padding: '0 12px',
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const getItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'block',
    padding: '8px 12px',
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    color: isActive ? ACCENT : '#374151',
    fontWeight: isActive ? 600 : 400,
    backgroundColor: isActive ? '#EFF6FF' : 'transparent',
    borderLeft: `3px solid ${isActive ? ACCENT : 'transparent'}`,
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    textAlign: 'left' as const,
    width: '100%',
    boxSizing: 'border-box' as const,
    lineHeight: 1.4,
  });

  return (
    <nav style={navStyle} aria-label="Table of Contents">
      <div style={headingStyle}>Contents</div>
      <ul style={listStyle}>
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                data-testid={`toc-item-${section.id}`}
                style={getItemStyle(isActive)}
                onClick={() => onSelect(section.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                {section.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TOC;
