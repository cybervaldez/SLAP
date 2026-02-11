import React from 'react';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#2563EB';

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  content,
  isOpen,
  onToggle,
}) => {
  const sectionStyle: React.CSSProperties = {
    marginBottom: 16,
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  };

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '16px 20px',
    fontSize: 18,
    fontWeight: 600,
    fontFamily: FONT_FAMILY,
    color: '#111827',
    backgroundColor: isOpen ? '#F9FAFB' : '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'background-color 0.15s ease',
    lineHeight: 1.4,
  };

  const chevronStyle: React.CSSProperties = {
    display: 'inline-block',
    width: 20,
    height: 20,
    color: ACCENT,
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    flexShrink: 0,
    marginLeft: 12,
    fontSize: 14,
  };

  const contentStyle: React.CSSProperties = {
    padding: '0 20px 20px',
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    lineHeight: 1.75,
    color: '#374151',
  };

  const paragraphs = content.split('\n');

  return (
    <div style={sectionStyle}>
      <button
        data-testid={`section-${id}-toggle`}
        style={toggleStyle}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span style={chevronStyle} aria-hidden="true">
          &#9654;
        </span>
      </button>
      {isOpen && (
        <div data-testid={`section-${id}-content`} style={contentStyle}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} style={{ margin: index === 0 ? '0 0 12px' : '12px 0' }}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
