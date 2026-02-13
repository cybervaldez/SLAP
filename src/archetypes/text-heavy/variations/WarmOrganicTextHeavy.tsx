import React, { useState } from 'react';
import { article } from '../data';

/* ── Warm-Organic Font Stacks ── */
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/* ── Earth-Tone Palette ── */
const CREAM = '#FDF6EE';
const DARK_BROWN = '#3D2B1F';
const FOREST_GREEN = '#2D5016';
const WARM_BROWN = '#5C3D2E';
const SAGE = '#7BA05B';
const LIGHT_GREEN = '#F0F5EB';
const GOLD_BROWN = '#8B6914';
const TAN_BORDER = '#D4C5A9';
const SHADOW = '0 4px 20px rgba(45,80,22,0.08)';

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

export default function WarmOrganicTextHeavy() {
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

  /* ════════════════════════════════════════════════════
     Styles
     ════════════════════════════════════════════════════ */

  /* ── Root ── */
  const rootStyle: React.CSSProperties = {
    fontFamily: SANS,
    backgroundColor: CREAM,
    color: DARK_BROWN,
    minHeight: '100vh',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  /* ── Page wrapper ── */
  const wrapperStyle: React.CSSProperties = {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '3rem 1.5rem 6rem',
  };

  /* ── Header ── */
  const headerStyle: React.CSSProperties = {
    maxWidth: 760,
    margin: '0 auto 2.5rem',
    textAlign: 'center' as const,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 600,
    lineHeight: 1.25,
    color: WARM_BROWN,
    margin: '0 0 0.75rem',
    letterSpacing: '0.01em',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: '1.1rem',
    fontWeight: 400,
    lineHeight: 1.6,
    color: GOLD_BROWN,
    margin: '0 0 1rem',
  };

  /* Sage-green underline accent beneath the header text */
  const sageUnderlineStyle: React.CSSProperties = {
    width: 80,
    height: 3,
    borderRadius: 2,
    backgroundColor: SAGE,
    margin: '0.75rem auto 1.5rem',
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 14,
    fontSize: 14,
    fontWeight: 400,
    color: WARM_BROWN,
    letterSpacing: '0.02em',
    margin: '0 0 1.5rem',
  };

  const metaDotStyle: React.CSSProperties = {
    color: TAN_BORDER,
    fontSize: 10,
  };

  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    margin: '0 0 0.5rem',
  };

  const tagStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.03em',
    color: FOREST_GREEN,
    backgroundColor: LIGHT_GREEN,
    padding: '4px 14px',
    borderRadius: 999,
    border: `1px solid ${SAGE}44`,
  };

  /* ── Header divider ── */
  const headerDividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: `1px solid ${TAN_BORDER}`,
    maxWidth: 760,
    margin: '0 auto 2.5rem',
  };

  /* ── Two-column layout ── */
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'flex-start',
  };

  /* ── Sidebar TOC ── */
  const tocSidebarStyle: React.CSSProperties = {
    flexShrink: 0,
    width: 240,
    position: 'sticky' as const,
    top: '2rem',
  };

  const tocContainerStyle: React.CSSProperties = {
    backgroundColor: CREAM,
    border: `1px solid ${TAN_BORDER}`,
    borderRadius: 16,
    padding: '1.5rem 1.25rem',
    boxShadow: SHADOW,
  };

  const tocLabelStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: WARM_BROWN,
    margin: '0 0 1rem',
    paddingBottom: '0.75rem',
    borderBottom: `1px solid ${TAN_BORDER}`,
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  };

  const tocItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    fontFamily: SANS,
    fontSize: 13.5,
    fontWeight: isActive ? 600 : 400,
    color: isActive ? FOREST_GREEN : DARK_BROWN,
    cursor: 'pointer',
    padding: '6px 10px 6px 14px',
    background: isActive ? LIGHT_GREEN : 'transparent',
    border: 'none',
    borderLeft: `3px solid ${isActive ? SAGE : 'transparent'}`,
    borderRadius: '0 8px 8px 0',
    transition: 'all 0.25s ease',
    lineHeight: 1.45,
  });

  /* ── Main content column ── */
  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  /* ── Section card ── */
  const sectionCardStyle = (idx: number): React.CSSProperties => ({
    backgroundColor: idx % 2 === 0 ? LIGHT_GREEN : CREAM,
    border: `1px solid ${TAN_BORDER}`,
    borderRadius: 14,
    padding: '2.25rem 2.5rem',
    boxShadow: SHADOW,
    marginBottom: '2rem',
  });

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
    fontWeight: 600,
    lineHeight: 1.35,
    color: FOREST_GREEN,
    margin: '0 0 1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: `1px solid ${TAN_BORDER}88`,
  };

  /* ── Body paragraph ── */
  const paragraphStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: 16.5,
    fontWeight: 400,
    lineHeight: 1.8,
    color: DARK_BROWN,
    margin: '0 0 1.5rem',
    letterSpacing: '0.01em',
  };

  /* ── Organic endmark ── */
  const endmarkContainerStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    margin: '1rem 0 0',
    padding: '2rem 0 1rem',
  };

  const endmarkRuleStyle: React.CSSProperties = {
    width: 60,
    height: 2,
    backgroundColor: SAGE,
    borderRadius: 1,
    margin: '0 auto 1rem',
    opacity: 0.6,
  };

  const endmarkSymbolStyle: React.CSSProperties = {
    fontSize: 22,
    color: SAGE,
    opacity: 0.7,
    lineHeight: 1,
  };

  /* ════════════════════════════════════════════════════
     Render
     ════════════════════════════════════════════════════ */

  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      <div style={wrapperStyle}>

        {/* ── Header ── */}
        <header style={headerStyle}>
          <h1 style={titleStyle}>{article.title}</h1>

          {article.subtitle && (
            <p style={subtitleStyle}>{article.subtitle}</p>
          )}

          <div style={sageUnderlineStyle} />

          <div style={metaStyle}>
            <span>{article.author}</span>
            <span style={metaDotStyle}>{'\u2022'}</span>
            <span>{article.date}</span>
            <span style={metaDotStyle}>{'\u2022'}</span>
            <span>{article.readingTime}</span>
          </div>

          <div style={tagsContainerStyle}>
            {article.tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </header>

        <hr style={headerDividerStyle} />

        {/* ── Two-column: TOC sidebar + Content ── */}
        <div style={layoutStyle}>

          {/* ── Sidebar TOC ── */}
          <aside style={tocSidebarStyle}>
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
          </aside>

          {/* ── Main content ── */}
          <main style={mainStyle}>
            {article.sections.map((section, idx) => {
              const paragraphs = section.content
                .split('\n')
                .filter((p) => p.trim().length > 0);

              return (
                <section
                  key={section.id}
                  id={`section-${section.id}`}
                  data-section={SECTION_KEYS[idx]}
                  style={sectionCardStyle(idx)}
                >
                  <h2 style={sectionHeadingStyle}>{section.title}</h2>

                  {paragraphs.map((text, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        ...paragraphStyle,
                        ...(pIdx === paragraphs.length - 1
                          ? { marginBottom: 0 }
                          : {}),
                      }}
                    >
                      {text}
                    </p>
                  ))}
                </section>
              );
            })}

            {/* ── Organic endmark ── */}
            <div style={endmarkContainerStyle}>
              <div style={endmarkRuleStyle} />
              <div style={endmarkSymbolStyle}>{'\u2766'}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
