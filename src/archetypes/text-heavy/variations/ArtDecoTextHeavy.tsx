import React, { useState } from 'react';
import { article } from '../data';

const SERIF = "Georgia, 'Playfair Display', 'Times New Roman', serif";

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

export default function ArtDecoTextHeavy() {
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

  /* ◆═══════════════════════════════════════◆
     COLORS — Luxurious Art-Deco palette
     ◆═══════════════════════════════════════◆ */
  const C = {
    ivory: '#FFFEF8',
    deepGreen: '#1B3A2D',
    gold: '#C7943E',
    goldLight: '#E8C874',
    body: '#2C2C2C',
    cream: '#F5F0E8',
    borderSubtle: '#D4C5A9',
    goldGradient: 'linear-gradient(135deg, #C7943E, #E8C874)',
    goldFade: 'linear-gradient(90deg, transparent, #C7943E, transparent)',
    goldFadeThin: 'linear-gradient(90deg, transparent, #D4C5A9, transparent)',
  };

  /* ◆═══════════════════════════════════════◆
     STYLES
     ◆═══════════════════════════════════════◆ */

  /* ── Root ── */
  const rootStyle: React.CSSProperties = {
    fontFamily: SERIF,
    backgroundColor: C.ivory,
    color: C.body,
    minHeight: '100vh',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  /* ── Outer container ── */
  const outerStyle: React.CSSProperties = {
    maxWidth: 720,
    margin: '0 auto',
    padding: '4rem 1.5rem 6rem',
  };

  /* ── Header frame: double gold lines ── */
  const headerFrameStyle: React.CSSProperties = {
    border: `2px solid ${C.gold}`,
    padding: '6px',
    marginBottom: '3rem',
  };

  const headerInnerFrameStyle: React.CSSProperties = {
    border: `1px solid ${C.gold}`,
    padding: '2.5rem 2rem 2rem',
    textAlign: 'center',
  };

  /* ── Geometric corner accents (top corners of inner frame) ── */
  const cornerAccentTopLeft: React.CSSProperties = {
    position: 'absolute',
    top: -1,
    left: -1,
    width: 20,
    height: 20,
    borderTop: `3px solid ${C.gold}`,
    borderLeft: `3px solid ${C.gold}`,
  };

  const cornerAccentTopRight: React.CSSProperties = {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 20,
    height: 20,
    borderTop: `3px solid ${C.gold}`,
    borderRight: `3px solid ${C.gold}`,
  };

  const cornerAccentBottomLeft: React.CSSProperties = {
    position: 'absolute',
    bottom: -1,
    left: -1,
    width: 20,
    height: 20,
    borderBottom: `3px solid ${C.gold}`,
    borderLeft: `3px solid ${C.gold}`,
  };

  const cornerAccentBottomRight: React.CSSProperties = {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 20,
    height: 20,
    borderBottom: `3px solid ${C.gold}`,
    borderRight: `3px solid ${C.gold}`,
  };

  /* ── Title ── */
  const titleStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.05em',
    color: C.deepGreen,
    margin: '0 0 0.75rem',
    textAlign: 'center',
  };

  /* ── Gold underline rule beneath title ── */
  const titleUnderlineStyle: React.CSSProperties = {
    width: 120,
    height: 2,
    background: C.goldGradient,
    margin: '0 auto 1.25rem',
    border: 'none',
  };

  /* ── Subtitle ── */
  const subtitleStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: C.deepGreen,
    opacity: 0.8,
    margin: '0 0 1.5rem',
    textAlign: 'center',
  };

  /* ── Meta line: small-caps, gold dot separators ── */
  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    fontSize: 14,
    fontWeight: 400,
    fontVariant: 'small-caps',
    letterSpacing: '0.08em',
    color: C.deepGreen,
    margin: '0 0 1.5rem',
    flexWrap: 'wrap',
  };

  const metaDotStyle: React.CSSProperties = {
    color: C.gold,
    fontSize: 18,
    lineHeight: 1,
  };

  /* ── Tags: small-caps, gold text, gold underline ── */
  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    margin: 0,
  };

  const tagStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: SERIF,
    fontVariant: 'small-caps',
    letterSpacing: '0.1em',
    color: C.gold,
    background: 'none',
    padding: '2px 0',
    borderBottom: `1px solid ${C.gold}`,
  };

  /* ◆ TOC ◆ */
  const tocContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '2rem 1.5rem',
    background: C.cream,
    border: `1px solid ${C.borderSubtle}`,
  };

  const tocLabelStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 13,
    fontWeight: 700,
    fontVariant: 'small-caps',
    letterSpacing: '0.2em',
    color: C.deepGreen,
    margin: '0 0 0.25rem',
  };

  /* Decorative line under "Contents" label */
  const tocLabelUnderlineStyle: React.CSSProperties = {
    width: 60,
    height: 1,
    background: C.gold,
    margin: '0 auto 1.25rem',
    border: 'none',
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };

  const tocItemStyle = (isActive: boolean, isHovered: boolean): React.CSSProperties => ({
    fontFamily: SERIF,
    fontSize: 15,
    fontWeight: isActive ? 600 : 400,
    fontVariant: 'small-caps',
    letterSpacing: '0.06em',
    color: isActive ? C.gold : isHovered ? C.deepGreen : C.body,
    cursor: 'pointer',
    padding: '6px 16px',
    background: 'none',
    border: 'none',
    borderLeft: isActive ? `3px solid ${C.gold}` : '3px solid transparent',
    transition: 'all 0.25s ease',
    textAlign: 'center' as const,
    display: 'inline-block',
  });

  /* ◆ Geometric section divider ◆ */
  const sectionDividerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
    margin: '2.5rem 0',
  };

  const dividerLineStyle: React.CSSProperties = {
    flex: 1,
    height: 1,
    background: C.goldFade,
    border: 'none',
  };

  const dividerDiamondStyle: React.CSSProperties = {
    fontSize: 14,
    color: C.gold,
    padding: '0 16px',
    lineHeight: 1,
    flexShrink: 0,
  };

  /* ◆ Section ◆ */
  const sectionStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
  };

  /* ── Section heading: centered, gold underline ── */
  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '0.04em',
    color: C.deepGreen,
    margin: '0 0 0.5rem',
    textAlign: 'center',
  };

  const sectionHeadingUnderlineStyle: React.CSSProperties = {
    width: 80,
    height: 2,
    background: C.goldGradient,
    margin: '0 auto 1.75rem',
    border: 'none',
  };

  /* ── Body paragraph ── */
  const paragraphStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.75,
    color: C.body,
    margin: '0 0 1.5rem',
    textAlign: 'left',
  };

  /* ◆ Endmark ◆ */
  const endmarkContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '3rem 0 1rem',
  };

  const endmarkRuleStyle: React.CSSProperties = {
    width: 160,
    height: 1,
    background: C.goldFade,
    margin: '0 auto',
    border: 'none',
  };

  const endmarkSymbolStyle: React.CSSProperties = {
    fontSize: 20,
    color: C.gold,
    letterSpacing: '0.3em',
    margin: '1rem 0',
    display: 'block',
  };

  /* ◆═══════════════════════════════════════◆
     RENDER
     ◆═══════════════════════════════════════◆ */

  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      <div style={outerStyle}>

        {/* ── Header with double gold rule frame ── */}
        <header style={headerFrameStyle}>
          <div style={{ ...headerInnerFrameStyle, position: 'relative' }}>
            {/* Geometric corner accents */}
            <div style={cornerAccentTopLeft} />
            <div style={cornerAccentTopRight} />
            <div style={cornerAccentBottomLeft} />
            <div style={cornerAccentBottomRight} />

            <h1 style={titleStyle}>{article.title}</h1>
            <div style={titleUnderlineStyle} />

            {article.subtitle && (
              <p style={subtitleStyle}>{article.subtitle}</p>
            )}

            <div style={metaStyle}>
              <span>{article.author}</span>
              <span style={metaDotStyle}>&#x25C6;</span>
              <span>{article.date}</span>
              <span style={metaDotStyle}>&#x25C6;</span>
              <span>{article.readingTime}</span>
            </div>

            <div style={tagsContainerStyle}>
              {article.tags.map((tag) => (
                <span key={tag} style={tagStyle}>{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* ── Formal Table of Contents ── */}
        <nav style={tocContainerStyle}>
          <p style={tocLabelStyle}>Contents</p>
          <div style={tocLabelUnderlineStyle} />
          <ul style={tocListStyle}>
            {article.sections.map((section) => (
              <li key={section.id} style={{ textAlign: 'center' }}>
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
                {/* Geometric gold divider between sections */}
                {idx > 0 && (
                  <div style={sectionDividerStyle}>
                    <div style={dividerLineStyle} />
                    <span style={dividerDiamondStyle}>&#x25C6;</span>
                    <div style={dividerLineStyle} />
                  </div>
                )}

                <section
                  id={`section-${section.id}`}
                  data-section={SECTION_KEYS[idx]}
                  style={sectionStyle}
                >
                  <h2 style={sectionHeadingStyle}>{section.title}</h2>
                  <div style={sectionHeadingUnderlineStyle} />

                  {paragraphs.map((text, pIdx) => (
                    <p key={pIdx} style={paragraphStyle}>{text}</p>
                  ))}
                </section>
              </React.Fragment>
            );
          })}
        </main>

        {/* ── Art-Deco Endmark: geometric finial ── */}
        <div style={endmarkContainerStyle}>
          <div style={endmarkRuleStyle} />
          <span style={endmarkSymbolStyle}>&#x25C6;&#x2726;&#x25C6;</span>
          <div style={endmarkRuleStyle} />
        </div>

      </div>
    </div>
  );
}
