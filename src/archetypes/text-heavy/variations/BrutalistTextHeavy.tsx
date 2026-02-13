import React, { useState, useCallback } from 'react';
import { article } from '../data';

/* ── Design Tokens ────────────────────────────────────────────────── */

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const RED = '#FF0000';

const SANS = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";

const BORDER_THICK = `4px solid ${BLACK}`;
const BORDER_THIN = `2px solid ${BLACK}`;

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

/* ── Component ────────────────────────────────────────────────────── */

export default function BrutalistTextHeavy() {
  const [activeSection, setActiveSection] = useState<string>(
    article.sections[0]?.id ?? ''
  );

  const handleTOCClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  /* ── Root ── */
  const rootStyle: React.CSSProperties = {
    fontFamily: SANS,
    backgroundColor: WHITE,
    color: BLACK,
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
  };

  /* ── Header ── */
  const headerStyle: React.CSSProperties = {
    borderBottom: BORDER_THICK,
    padding: '3rem 2rem 2rem',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: 0.95,
    margin: '0 0 1rem',
    color: BLACK,
    maxWidth: '60ch',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    fontWeight: 400,
    lineHeight: 1.4,
    margin: '0 0 1.5rem',
    color: BLACK,
    maxWidth: '55ch',
  };

  const metaStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.75rem',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 1.25rem',
    color: BLACK,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    alignItems: 'center',
  };

  const metaSeparatorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1rem',
    height: '2px',
    backgroundColor: BLACK,
    verticalAlign: 'middle',
  };

  const tagsRowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: 0,
  };

  const tagStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.7rem',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    padding: '0.3rem 0.6rem',
    border: BORDER_THIN,
    borderRadius: 0,
    backgroundColor: WHITE,
    color: BLACK,
    lineHeight: 1,
  };

  /* ── Layout ── */
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    maxWidth: 1200,
    margin: '0 auto',
  };

  /* ── Sidebar TOC ── */
  const sidebarStyle: React.CSSProperties = {
    width: 260,
    flexShrink: 0,
    borderRight: BORDER_THICK,
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',
    height: 'fit-content',
    maxHeight: '100vh',
    overflowY: 'auto',
  };

  const tocLabelStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.7rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: '0 0 1.25rem',
    color: BLACK,
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const tocItemStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: MONO,
    fontSize: '0.75rem',
    fontWeight: isActive ? 900 : 400,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    padding: '0.5rem 0 0.5rem 1rem',
    borderLeft: isActive ? `6px solid ${BLACK}` : `6px solid transparent`,
    cursor: 'pointer',
    color: BLACK,
    lineHeight: 1.3,
    transition: 'none',
  });

  /* ── Main Content ── */
  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const sectionWrapperStyle: React.CSSProperties = {
    borderTop: BORDER_THICK,
    padding: '2rem',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: 1.05,
    margin: '0 0 1.5rem',
    color: BLACK,
  };

  const paragraphStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.65,
    margin: '0 0 1.25rem',
    color: BLACK,
    maxWidth: '62ch',
  };

  const pullQuoteStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.9rem',
    fontWeight: 400,
    lineHeight: 1.55,
    margin: '0 0 1.5rem',
    padding: '1rem 0 1rem 1.5rem',
    borderLeft: `6px solid ${BLACK}`,
    color: BLACK,
    maxWidth: '58ch',
  };

  /* ── Endmark ── */
  const endmarkStyle: React.CSSProperties = {
    borderTop: BORDER_THICK,
    padding: '2rem',
    textAlign: 'center',
  };

  const endmarkBlockStyle: React.CSSProperties = {
    display: 'inline-block',
    width: 20,
    height: 20,
    backgroundColor: RED,
    borderRadius: 0,
  };

  /* ── Render ── */
  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      {/* ── Header ── */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>{article.title}</h1>
        {article.subtitle && (
          <p style={subtitleStyle}>{article.subtitle}</p>
        )}
        <div style={metaStyle}>
          <span>{article.author}</span>
          <span style={metaSeparatorStyle} />
          <span>{article.date}</span>
          <span style={metaSeparatorStyle} />
          <span>{article.readingTime}</span>
        </div>
        <div style={tagsRowStyle}>
          {article.tags.map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* ── Body Layout ── */}
      <div style={layoutStyle}>
        {/* ── Sidebar TOC ── */}
        <nav style={sidebarStyle}>
          <div style={tocLabelStyle}>Contents</div>
          <ul style={tocListStyle}>
            {article.sections.map((section) => (
              <li
                key={section.id}
                style={tocItemStyle(activeSection === section.id)}
                onClick={() => handleTOCClick(section.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTOCClick(section.id);
                  }
                }}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Main Content ── */}
        <main style={mainStyle}>
          {article.sections.map((section, idx) => {
            const paragraphs = section.content.split('\n').filter((p) => p.trim());

            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                data-section={SECTION_KEYS[idx]}
                style={sectionWrapperStyle}
              >
                <h2 style={sectionHeadingStyle}>{section.title}</h2>
                {paragraphs.map((text, idx) =>
                  idx === 0 ? (
                    <blockquote key={idx} style={pullQuoteStyle}>
                      {text}
                    </blockquote>
                  ) : (
                    <p key={idx} style={paragraphStyle}>
                      {text}
                    </p>
                  )
                )}
              </div>
            );
          })}

          {/* ── Endmark ── */}
          <div style={endmarkStyle}>
            <span style={endmarkBlockStyle} />
          </div>
        </main>
      </div>
    </div>
  );
}
