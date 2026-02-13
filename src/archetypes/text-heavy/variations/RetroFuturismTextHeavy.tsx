import React, { useState } from 'react';
import { article } from '../data';

const FONT = "'Futura', 'Century Gothic', system-ui, -apple-system, sans-serif";

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

export default function RetroFuturismTextHeavy() {
  const [activeSection, setActiveSection] = useState<string>(
    article.sections[0]?.id ?? ''
  );
  const [hoveredTOC, setHoveredTOC] = useState<string | null>(null);

  const handleTOCClick = (sectionId: string) => {
    setActiveSection(sectionId);
    requestAnimationFrame(() => {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  /* ══════════════════════════════════════════
     COLORS — 70s/80s sci-fi teal-purple palette
     ══════════════════════════════════════════ */
  const C = {
    deepSpace: '#0D1B2A',
    cardBg: '#1A1A2E',
    teal: '#00D4AA',
    purple: '#8B5CF6',
    pink: '#E040FB',
    text: '#E8E8F0',
    textDim: '#8B8BA0',
    textMuted: '#5C5C78',
    gradientTealPurple: 'linear-gradient(135deg, #00D4AA, #8B5CF6)',
    gradientTealPink: 'linear-gradient(135deg, #00D4AA, #E040FB)',
    gradientPurplePink: 'linear-gradient(135deg, #8B5CF6, #E040FB)',
  };

  /* ══════════════════════════════════════════
     STYLES
     ══════════════════════════════════════════ */

  /* ── Root ── */
  const rootStyle: React.CSSProperties = {
    fontFamily: FONT,
    backgroundColor: C.deepSpace,
    color: C.text,
    minHeight: '100vh',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  /* ── Outer container ── */
  const outerStyle: React.CSSProperties = {
    maxWidth: 760,
    margin: '0 auto',
    padding: '4rem 1.5rem 6rem',
  };

  /* ── Title: gradient text ── */
  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    margin: '0 0 1rem',
    background: C.gradientTealPurple,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  /* ── Subtitle: glowing teal ── */
  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    fontWeight: 400,
    lineHeight: 1.6,
    color: C.teal,
    margin: '0 0 1.5rem',
    textShadow: `0 0 20px ${C.teal}44, 0 0 40px ${C.teal}22`,
  };

  /* ── Meta line: neon-teal glow ── */
  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: C.teal,
    margin: '0 0 1.5rem',
    flexWrap: 'wrap',
    textShadow: `0 0 8px ${C.teal}66`,
  };

  const metaSepStyle: React.CSSProperties = {
    color: C.purple,
    opacity: 0.6,
  };

  /* ── Tags: gradient pill shapes ── */
  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    margin: '0 0 2.5rem',
  };

  const tagStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    background: C.gradientTealPurple,
    padding: '5px 14px',
    borderRadius: 999,
  };

  /* ── Gradient divider ── */
  const gradientDividerStyle: React.CSSProperties = {
    border: 'none',
    height: 2,
    background: C.gradientTealPurple,
    margin: '0 0 2.5rem',
    borderRadius: 1,
    boxShadow: `0 0 8px ${C.teal}44, 0 0 16px ${C.purple}22`,
  };

  /* ── TOC container ── */
  const tocContainerStyle: React.CSSProperties = {
    background: `${C.cardBg}CC`,
    borderRadius: 20,
    padding: '1.5rem 2rem',
    margin: '0 0 2.5rem',
    border: `1px solid ${C.purple}33`,
    boxShadow: `0 0 20px ${C.purple}11, inset 0 1px 0 ${C.teal}11`,
  };

  const tocLabelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    margin: '0 0 1rem',
    background: C.gradientTealPurple,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  };

  const tocItemStyle = (isActive: boolean, isHovered: boolean): React.CSSProperties => ({
    fontSize: 14,
    fontWeight: isActive ? 600 : 400,
    letterSpacing: '0.02em',
    color: isActive ? '#FFFFFF' : isHovered ? C.teal : C.textDim,
    cursor: 'pointer',
    padding: '8px 16px',
    background: isActive ? C.gradientTealPurple : 'transparent',
    border: 'none',
    borderRadius: 12,
    transition: 'all 0.3s ease',
    textAlign: 'left' as const,
    fontFamily: FONT,
    textShadow: isActive ? `0 0 10px ${C.teal}66` : 'none',
    boxShadow: isActive ? `0 0 12px ${C.teal}33` : 'none',
  });

  /* ── Section card ── */
  const sectionCardStyle: React.CSSProperties = {
    background: C.cardBg,
    borderRadius: 20,
    padding: '2rem',
    marginBottom: '1.5rem',
    border: `1px solid ${C.teal}18`,
    boxShadow: `0 0 24px ${C.teal}0A, 0 4px 32px ${C.deepSpace}88`,
  };

  /* ── Section heading: gradient text ── */
  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '0.01em',
    margin: '0 0 1.5rem',
    background: C.gradientTealPurple,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  /* ── Body paragraph ── */
  const paragraphStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.7,
    color: C.text,
    margin: '0 0 1.4rem',
  };

  /* ── Section inner divider ── */
  const sectionInnerDividerStyle: React.CSSProperties = {
    border: 'none',
    height: 1,
    background: `linear-gradient(90deg, ${C.teal}00, ${C.teal}33, ${C.purple}33, ${C.purple}00)`,
    margin: '2rem 0',
  };

  /* ── Endmark ── */
  const endmarkContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '3rem 0 1rem',
  };

  const endmarkBarStyle: React.CSSProperties = {
    width: 120,
    height: 3,
    background: C.gradientTealPurple,
    margin: '0 auto 1.5rem',
    borderRadius: 2,
    boxShadow: `0 0 16px ${C.teal}44, 0 0 32px ${C.purple}22`,
  };

  const endmarkTextStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    background: C.gradientTealPink,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: 'none',
  };

  const endmarkStarStyle: React.CSSProperties = {
    fontSize: 24,
    display: 'block',
    marginBottom: '0.75rem',
    background: C.gradientPurplePink,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  /* ══════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════ */

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
            <span style={metaSepStyle}>//</span>
            <span>{article.date}</span>
            <span style={metaSepStyle}>//</span>
            <span>{article.readingTime}</span>
          </div>

          <div style={tagsContainerStyle}>
            {article.tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </header>

        <hr style={gradientDividerStyle} />

        {/* ── Table of Contents ── */}
        <nav style={tocContainerStyle}>
          <p style={tocLabelStyle}>Navigation Index</p>
          <ul style={tocListStyle}>
            {article.sections.map((section) => (
              <li key={section.id}>
                <button
                  style={tocItemStyle(
                    activeSection === section.id,
                    hoveredTOC === section.id
                  )}
                  onClick={() => handleTOCClick(section.id)}
                  onMouseEnter={() => setHoveredTOC(section.id)}
                  onMouseLeave={() => setHoveredTOC(null)}
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
              <React.Fragment key={section.id}>
                {idx > 0 && (
                  <div style={sectionInnerDividerStyle} />
                )}
                <section
                  id={`section-${section.id}`}
                  data-section={SECTION_KEYS[idx]}
                  style={sectionCardStyle}
                >
                  <h2 style={sectionHeadingStyle}>{section.title}</h2>

                  {paragraphs.map((text, pIdx) => (
                    <p key={pIdx} style={paragraphStyle}>{text}</p>
                  ))}
                </section>
              </React.Fragment>
            );
          })}
        </main>

        {/* ── Retro-Futuristic Endmark ── */}
        <div style={endmarkContainerStyle}>
          <span style={endmarkStarStyle}>&#x2726;</span>
          <div style={endmarkBarStyle} />
          <p style={endmarkTextStyle}>Transmission Complete</p>
        </div>

      </div>
    </div>
  );
}
