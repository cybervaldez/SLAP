import React, { useState, useCallback } from 'react';
import { article } from '../data';

/* ── Design Tokens ────────────────────────────────────────────────── */

const NAVY = '#1B2A4A';
const CORAL = '#E8634A';
const GOLD = '#C7943E';
const CREAM = '#FFF8F0';
const CREAM_TINT = '#FFF4E8';
const NAVY_TINT = '#F0F2F6';
const BODY_TEXT = '#2D2D2D';

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

/* ── Helpers ──────────────────────────────────────────────────────── */

/** Extract the first sentence from a block of text for use as a pull quote. */
function extractPullQuote(content: string): string {
  const firstParagraph = content.split('\n').find((p) => p.trim()) ?? '';
  const match = firstParagraph.match(/^(.+?[.!?])\s/);
  return match ? match[1] : firstParagraph.slice(0, 120) + '\u2026';
}

/* ── Component ────────────────────────────────────────────────────── */

export default function MaximalistTextHeavy() {
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
    backgroundColor: CREAM,
    color: BODY_TEXT,
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
  };

  /* ── Header ── */
  const headerStyle: React.CSSProperties = {
    backgroundColor: CREAM,
    padding: '3.5rem 2.5rem 2rem',
    maxWidth: 1200,
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    margin: '0 0 0.75rem',
    color: NAVY,
    maxWidth: '20ch',
    letterSpacing: '-0.01em',
  };

  const coralRuleStyle: React.CSSProperties = {
    width: 80,
    height: 4,
    backgroundColor: CORAL,
    border: 'none',
    margin: '1rem 0 1.25rem',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.45,
    margin: '0 0 1.5rem',
    color: NAVY,
    opacity: 0.75,
    maxWidth: '50ch',
  };

  const metaStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    margin: '0 0 1.25rem',
    color: GOLD,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center',
  };

  const metaDotStyle: React.CSSProperties = {
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: GOLD,
  };

  const tagsRowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: 0,
  };

  const tagStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    padding: '0.35rem 0.7rem',
    border: `1.5px solid ${NAVY}`,
    borderRadius: 2,
    backgroundColor: CREAM_TINT,
    color: CORAL,
    lineHeight: 1,
  };

  /* ── Layout ── */
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    maxWidth: 1200,
    margin: '0 auto',
    gap: 0,
  };

  /* ── Sidebar TOC ── */
  const sidebarStyle: React.CSSProperties = {
    width: 260,
    flexShrink: 0,
    backgroundColor: NAVY,
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',
    height: 'fit-content',
    maxHeight: '100vh',
    overflowY: 'auto',
    borderRight: `3px solid ${GOLD}`,
  };

  const tocLabelStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    margin: '0 0 1.5rem',
    color: GOLD,
    borderBottom: `1px solid ${GOLD}`,
    paddingBottom: '0.75rem',
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const tocItemStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: SANS,
    fontSize: '0.8rem',
    fontWeight: isActive ? 700 : 400,
    padding: '0.6rem 0 0.6rem 1rem',
    borderLeft: isActive ? `4px solid ${CORAL}` : '4px solid transparent',
    cursor: 'pointer',
    color: isActive ? CREAM : 'rgba(255, 248, 240, 0.6)',
    lineHeight: 1.35,
    transition: 'color 0.15s ease, border-color 0.15s ease',
  });

  /* ── Main Content ── */
  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const sectionWrapperStyle = (index: number): React.CSSProperties => ({
    padding: '2.5rem 2.5rem 2rem',
    backgroundColor: index % 2 === 0 ? CREAM : NAVY_TINT,
    borderTop: `2px solid ${GOLD}`,
  });

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    margin: '0 0 1.75rem',
    color: NAVY,
    letterSpacing: '-0.01em',
  };

  const paragraphStyle: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: '1.05rem',
    fontWeight: 400,
    lineHeight: 1.7,
    margin: '0 0 1.25rem',
    color: BODY_TEXT,
    maxWidth: '62ch',
  };

  const pullQuoteStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: '1.25rem',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.5,
    margin: '1.75rem 0 2rem',
    padding: '1.25rem 1.5rem',
    borderLeft: `4px solid ${CORAL}`,
    backgroundColor: CREAM_TINT,
    color: NAVY,
    maxWidth: '58ch',
    borderRadius: '0 4px 4px 0',
  };

  /* ── Drop Cap ── */
  const dropCapStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: '3.5em',
    fontWeight: 700,
    float: 'left',
    lineHeight: 0.8,
    marginRight: '0.08em',
    marginTop: '0.05em',
    color: NAVY,
  };

  /* ── Endmark ── */
  const endmarkStyle: React.CSSProperties = {
    borderTop: `2px solid ${GOLD}`,
    padding: '2.5rem 2.5rem',
    textAlign: 'center',
    backgroundColor: CREAM,
  };

  const goldRuleEndStyle: React.CSSProperties = {
    width: 120,
    height: 2,
    backgroundColor: GOLD,
    border: 'none',
    margin: '0 auto 1rem',
  };

  const coralFlourishStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: '1.75rem',
    color: CORAL,
    fontWeight: 700,
    letterSpacing: '0.3em',
    margin: 0,
  };

  /* ── Render ── */
  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      {/* ── Header ── */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>{article.title}</h1>
        <hr style={coralRuleStyle} />
        {article.subtitle && (
          <p style={subtitleStyle}>{article.subtitle}</p>
        )}
        <div style={metaStyle}>
          <span>{article.author}</span>
          <span style={metaDotStyle} />
          <span>{article.date}</span>
          <span style={metaDotStyle} />
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
          {article.sections.map((section, sectionIdx) => {
            const paragraphs = section.content.split('\n').filter((p) => p.trim());
            const pullQuote = extractPullQuote(section.content);

            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                data-section={SECTION_KEYS[sectionIdx]}
                style={sectionWrapperStyle(sectionIdx)}
              >
                <h2 style={sectionHeadingStyle}>{section.title}</h2>

                {/* Pull Quote */}
                <blockquote style={pullQuoteStyle}>
                  {pullQuote}
                </blockquote>

                {/* Body Paragraphs with Drop Cap on First */}
                {paragraphs.map((text, idx) => {
                  if (idx === 0) {
                    const firstChar = text.charAt(0);
                    const rest = text.slice(1);
                    return (
                      <p key={idx} style={paragraphStyle}>
                        <span style={dropCapStyle}>{firstChar}</span>
                        {rest}
                      </p>
                    );
                  }
                  return (
                    <p key={idx} style={paragraphStyle}>
                      {text}
                    </p>
                  );
                })}
              </div>
            );
          })}

          {/* ── Endmark ── */}
          <div style={endmarkStyle}>
            <hr style={goldRuleEndStyle} />
            <div style={coralFlourishStyle}>{'\u2766 \u2766 \u2766'}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
