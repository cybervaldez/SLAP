import React from 'react';
import type { Section } from '../data';
import CollapsibleSection from './CollapsibleSection';

const SECTION_DATA_MAP: Record<string, string> = {
  'the-first-punchline-problem': 'opening',
  'the-setup-nobody-notices': 'hierarchy',
  'time-it-twice-land-it-once': 'measure',
  'slapstick-vs-subtlety': 'ornament',
  'the-last-laugh-is-a-design-decision': 'ending',
};

interface ArticleBodyProps {
  sections: Section[];
  openSections: Set<string>;
  onToggle: (id: string) => void;
  searchQuery: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <mark
          key={i}
          style={{
            backgroundColor: '#DBEAFE',
            color: '#1E40AF',
            padding: '1px 2px',
            borderRadius: 2,
          }}
        >
          {part}
        </mark>
      );
    }
    return part;
  });
}

function highlightContent(content: string, query: string): React.ReactNode {
  if (!query.trim()) return null;

  const paragraphs = content.split('\n');
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} style={{ margin: index === 0 ? '0 0 12px' : '12px 0' }}>
          {highlightText(paragraph, query)}
        </p>
      ))}
    </>
  );
}

const ArticleBody: React.FC<ArticleBodyProps> = ({
  sections,
  openSections,
  onToggle,
  searchQuery,
}) => {
  const containerStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  if (searchQuery.trim()) {
    return (
      <div style={containerStyle}>
        {sections.map((section) => {
          const isOpen = openSections.has(section.id);
          return (
            <div key={section.id} id={`section-${section.id}`} data-section={SECTION_DATA_MAP[section.id]}>
              <div style={{ marginBottom: 16, border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button
                  data-testid={`section-${section.id}-toggle`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    color: '#111827',
                    backgroundColor: isOpen ? '#F9FAFB' : '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background-color 0.15s ease',
                    lineHeight: 1.4,
                  }}
                  onClick={() => onToggle(section.id)}
                  aria-expanded={isOpen}
                >
                  <span>{highlightText(section.title, searchQuery)}</span>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      color: '#2563EB',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                      marginLeft: 12,
                      fontSize: 14,
                    }}
                    aria-hidden="true"
                  >
                    &#9654;
                  </span>
                </button>
                {isOpen && (
                  <div
                    data-testid={`section-${section.id}-content`}
                    style={{
                      padding: '0 20px 20px',
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: '#374151',
                    }}
                  >
                    {highlightContent(section.content, searchQuery)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {sections.map((section) => (
        <div key={section.id} id={`section-${section.id}`} data-section={SECTION_DATA_MAP[section.id]}>
          <CollapsibleSection
            id={section.id}
            title={section.title}
            content={section.content}
            isOpen={openSections.has(section.id)}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleBody;
