import React, { useState } from 'react';
import { article } from '../data';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

export default function NeoMinimalTextHeavy() {
  const [activeSection, setActiveSection] = useState<string>(
    article.sections[0]?.id ?? ''
  );

  const handleTOCClick = (sectionId: string) => {
    setActiveSection(sectionId);
    requestAnimationFrame(() => {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  /* ── Root ── */
  const rootStyle: React.CSSProperties = {
    fontFamily: FONT,
    backgroundColor: '#FAFAFA',
    color: '#111',
    minHeight: '100vh',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  /* ── Outer container: generous horizontal padding ── */
  const outerStyle: React.CSSProperties = {
    maxWidth: 600,
    margin: '0 auto',
    padding: '5rem 1.5rem 8rem',
  };

  /* ── Title ── */
  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 200,
    letterSpacing: '0.03em',
    lineHeight: 1.3,
    margin: '0 0 1.25rem',
    color: '#111',
  };

  /* ── Subtitle ── */
  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.05rem',
    fontWeight: 300,
    letterSpacing: '0.02em',
    lineHeight: 1.6,
    color: '#888',
    margin: '0 0 2rem',
  };

  /* ── Meta line ── */
  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 13,
    fontWeight: 300,
    letterSpacing: '0.04em',
    color: '#999',
    margin: '0 0 1.5rem',
    flexWrap: 'wrap',
  };

  const metaSepStyle: React.CSSProperties = {
    color: '#CCC',
  };

  /* ── Tags ── */
  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    margin: '0 0 3rem',
  };

  const tagStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#BBB',
    textTransform: 'uppercase',
  };

  /* ── Header divider ── */
  const headerDividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid #E0E0E0',
    margin: '0 0 3rem',
  };

  /* ── TOC ── */
  const tocContainerStyle: React.CSSProperties = {
    margin: '0 0 4rem',
  };

  const tocLabelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 300,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#BBB',
    margin: '0 0 1rem',
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  };

  const tocItemStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: 14,
    fontWeight: isActive ? 400 : 300,
    letterSpacing: '0.02em',
    color: isActive ? '#111' : '#999',
    cursor: 'pointer',
    padding: '4px 0 4px 12px',
    background: 'none',
    border: 'none',
    borderLeft: `1px solid ${isActive ? '#111' : 'transparent'}`,
    transition: 'color 0.3s ease, border-color 0.3s ease',
    textAlign: 'left' as const,
    fontFamily: FONT,
  });

  /* ── Section divider ── */
  const sectionDividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '1px solid #E8E8E8',
    margin: '3.5rem 0 3rem',
  };

  /* ── Section heading ── */
  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
    fontWeight: 200,
    letterSpacing: '0.03em',
    lineHeight: 1.4,
    color: '#111',
    margin: '0 0 2rem',
  };

  /* ── Body paragraph ── */
  const paragraphStyle: React.CSSProperties = {
    fontSize: 16.5,
    fontWeight: 300,
    letterSpacing: '0.015em',
    lineHeight: 1.85,
    color: '#222',
    margin: '0 0 1.6rem',
  };

  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      <div style={outerStyle}>

        {/* ── Header ── */}
        <header>
          <h1 style={titleStyle}>{article.title}</h1>

          {article.subtitle && (
            <p style={subtitleStyle}>{article.subtitle}</p>
          )}

          <div style={metaStyle}>
            <span>{article.author}</span>
            <span style={metaSepStyle}>/</span>
            <span>{article.date}</span>
            <span style={metaSepStyle}>/</span>
            <span>{article.readingTime}</span>
          </div>

          <div style={tagsContainerStyle}>
            {article.tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </header>

        <hr style={headerDividerStyle} />

        {/* ── Table of Contents ── */}
        <nav style={tocContainerStyle}>
          <p style={tocLabelStyle}>Contents</p>
          <ul style={tocListStyle}>
            {article.sections.map((section) => (
              <li key={section.id}>
                <button
                  style={tocItemStyle(activeSection === section.id)}
                  onClick={() => handleTOCClick(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Article Sections ── */}
        <main>
          {article.sections.map((section, idx) => {
            const paragraphs = section.content
              .split('\n')
              .filter((p) => p.trim().length > 0);

            return (
              <section key={section.id} id={`section-${section.id}`} data-section={SECTION_KEYS[idx]}>
                {idx > 0 && <hr style={sectionDividerStyle} />}

                <h2 style={sectionHeadingStyle}>{section.title}</h2>

                {paragraphs.map((text, pIdx) => (
                  <p key={pIdx} style={paragraphStyle}>{text}</p>
                ))}
              </section>
            );
          })}
        </main>

        {/* The quiet ending is intentional. Generous bottom whitespace is the ending. */}
      </div>
    </div>
  );
}
