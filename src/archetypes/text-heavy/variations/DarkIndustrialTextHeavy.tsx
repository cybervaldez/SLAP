import React, { useState, useCallback } from 'react';
import { article } from '../data';

/* ── Design Tokens ────────────────────────────────────────────────── */

const BG_ROOT = '#0A0A0A';
const BG_CODE = '#111111';
const TEXT_PRIMARY = '#E0E0E0';
const TEXT_SECONDARY = '#888888';
const GOLD = '#FFB800';
const BORDER_COLOR = '#333333';

const MONO =
  "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";

const BORDER = `1px solid ${BORDER_COLOR}`;
const BORDER_GOLD = `1px solid ${GOLD}`;

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

/* ── Helpers ──────────────────────────────────────────────────────── */

/** Format section index as two-digit terminal label: [01], [02], ... */
function sectionLabel(index: number): string {
  return `[${String(index + 1).padStart(2, '0')}]`;
}

/** Underscore-joined uppercase section title for TOC labels. */
function terminalTitle(title: string): string {
  return title.toUpperCase().replace(/\s+/g, '_');
}

/* ── Component ────────────────────────────────────────────────────── */

export default function DarkIndustrialTextHeavy() {
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
    fontFamily: MONO,
    backgroundColor: BG_ROOT,
    color: TEXT_PRIMARY,
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
  };

  /* ── Header ── */
  const headerStyle: React.CSSProperties = {
    borderBottom: BORDER,
    padding: '3rem 2rem 2rem',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    lineHeight: 1.15,
    margin: 0,
    color: TEXT_PRIMARY,
    maxWidth: '60ch',
  };

  const titleUnderlineStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    maxWidth: '60ch',
    height: 2,
    backgroundColor: GOLD,
    margin: '0.75rem 0 1.25rem',
    border: 'none',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.85rem',
    fontWeight: 400,
    lineHeight: 1.5,
    margin: '0 0 1.5rem',
    color: TEXT_SECONDARY,
    maxWidth: '55ch',
  };

  const metaStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
    margin: '0 0 1.25rem',
    color: GOLD,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem',
    alignItems: 'center',
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
    border: BORDER_GOLD,
    borderRadius: 0,
    backgroundColor: BG_ROOT,
    color: GOLD,
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
    width: 280,
    flexShrink: 0,
    borderRight: BORDER,
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',
    height: 'fit-content',
    maxHeight: '100vh',
    overflowY: 'auto',
    backgroundColor: BG_CODE,
  };

  const tocLabelStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    margin: '0 0 1.25rem',
    color: TEXT_SECONDARY,
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const tocItemStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: MONO,
    fontSize: '0.72rem',
    fontWeight: isActive ? 700 : 400,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    padding: '0.55rem 0 0.55rem 0.75rem',
    cursor: 'pointer',
    color: isActive ? GOLD : TEXT_SECONDARY,
    lineHeight: 1.35,
    transition: 'none',
    borderLeft: isActive ? `2px solid ${GOLD}` : '2px solid transparent',
  });

  const tocPrefixStyle = (isActive: boolean): React.CSSProperties => ({
    color: isActive ? GOLD : TEXT_SECONDARY,
    marginRight: '0.5rem',
    userSelect: 'none',
  });

  /* ── Main Content ── */
  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const sectionWrapperStyle: React.CSSProperties = {
    borderTop: `1px solid ${GOLD}`,
    padding: '2rem',
  };

  const sectionContentStyle: React.CSSProperties = {
    backgroundColor: BG_CODE,
    borderRadius: 0,
    padding: '1.5rem',
    border: BORDER,
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    lineHeight: 1.2,
    margin: '0 0 1.25rem',
    color: TEXT_PRIMARY,
  };

  const sectionNumberStyle: React.CSSProperties = {
    color: GOLD,
    marginRight: '0.6rem',
  };

  const paragraphStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.7,
    margin: '0 0 1.15rem',
    color: TEXT_PRIMARY,
    maxWidth: '62ch',
  };

  /* ── Endmark ── */
  const endmarkStyle: React.CSSProperties = {
    borderTop: `1px solid ${GOLD}`,
    padding: '2rem',
    textAlign: 'center',
  };

  const endmarkTextStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: GOLD,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const cursorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '0.55em',
    height: '1.1em',
    backgroundColor: GOLD,
    animation: 'di-blink 1s step-end infinite',
    verticalAlign: 'text-bottom',
  };

  /* ── Render ── */
  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      {/* keyframe for cursor blink */}
      <style>{`@keyframes di-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      {/* ── Header ── */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>{article.title}</h1>
        <div style={titleUnderlineStyle} />
        {article.subtitle && (
          <p style={subtitleStyle}>{article.subtitle}</p>
        )}
        <div style={metaStyle}>
          <span>&gt; {article.author}</span>
          <span style={{ margin: '0 0.25rem' }}>//</span>
          <span>{article.date}</span>
          <span style={{ margin: '0 0.25rem' }}>//</span>
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
          <div style={tocLabelStyle}>// TABLE_OF_CONTENTS</div>
          <ul style={tocListStyle}>
            {article.sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <li
                  key={section.id}
                  style={tocItemStyle(isActive)}
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
                  <span style={tocPrefixStyle(isActive)}>
                    {isActive ? '>' : '\u00A0'}
                  </span>
                  {sectionLabel(idx)}{' '}
                  {terminalTitle(section.title).length > 28
                    ? terminalTitle(section.title).slice(0, 28) + '...'
                    : terminalTitle(section.title)}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Main Content ── */}
        <main style={mainStyle}>
          {article.sections.map((section, sIdx) => {
            const paragraphs = section.content
              .split('\n')
              .filter((p) => p.trim());

            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                data-section={SECTION_KEYS[sIdx]}
                style={sectionWrapperStyle}
              >
                <h2 style={sectionHeadingStyle}>
                  <span style={sectionNumberStyle}>
                    {sectionLabel(sIdx)}
                  </span>
                  {section.title.toUpperCase()}
                </h2>
                <div style={sectionContentStyle}>
                  {paragraphs.map((text, pIdx) => (
                    <p key={pIdx} style={paragraphStyle}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ── Endmark ── */}
          <div style={endmarkStyle}>
            <span style={endmarkTextStyle}>
              // EOF <span style={cursorStyle} />
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
