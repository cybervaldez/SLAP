import React, { useState, useCallback } from 'react';
import { article } from '../data';

/* ── Memphis Design Tokens ───────────────────────────────────────── */

const BG = '#FFFDF5';
const RED = '#FF3366';
const BLUE = '#3344FF';
const YELLOW = '#FFD700';
const TEAL = '#00BFA5';
const BLACK = '#1A1A1A';

const PRIMARY_COLORS = [RED, BLUE, YELLOW, TEAL, RED];

const SECTION_TINTS = [
  '#FFF0F3', // light red
  '#F0F0FF', // light blue
  '#FFFDE0', // light yellow
  '#F0FFFC', // light teal
  '#FFF5F0', // light pink
];

const SECTION_BORDER_COLORS = [RED, BLUE, YELLOW, TEAL, RED];

const TAG_COLORS = [RED, BLUE, TEAL, YELLOW, '#FF3366', '#3344FF', '#00BFA5'];

const GEO_SANS =
  "'Arial Black', 'Futura', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const BODY_SANS =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const SECTION_KEYS = ['opening', 'hierarchy', 'measure', 'ornament', 'ending'];

/* ── Geometric Decoration Data ───────────────────────────────────── */

interface GeoDeco {
  top: number;
  right?: number;
  left?: number;
  width: number;
  height: number;
  borderRadius: string;
  backgroundColor: string;
  opacity: number;
  transform?: string;
}

const SECTION_DECOS: GeoDeco[][] = [
  // Section 0 - red theme
  [
    { top: 8, right: -12, width: 28, height: 28, borderRadius: '50%', backgroundColor: RED, opacity: 0.5 },
    { top: 40, right: 20, width: 16, height: 16, borderRadius: '0', backgroundColor: YELLOW, opacity: 0.6, transform: 'rotate(45deg)' },
    { top: -5, left: 60, width: 20, height: 20, borderRadius: '50%', backgroundColor: BLUE, opacity: 0.35 },
  ],
  // Section 1 - blue theme
  [
    { top: 12, right: -8, width: 24, height: 24, borderRadius: '0', backgroundColor: BLUE, opacity: 0.45, transform: 'rotate(15deg)' },
    { top: -8, right: 50, width: 18, height: 18, borderRadius: '50%', backgroundColor: RED, opacity: 0.5 },
    { top: 35, left: -10, width: 22, height: 22, borderRadius: '50%', backgroundColor: YELLOW, opacity: 0.55 },
  ],
  // Section 2 - yellow theme
  [
    { top: 5, right: -15, width: 30, height: 30, borderRadius: '50%', backgroundColor: YELLOW, opacity: 0.6 },
    { top: 40, right: 30, width: 14, height: 14, borderRadius: '0', backgroundColor: TEAL, opacity: 0.5, transform: 'rotate(30deg)' },
    { top: -6, left: 40, width: 16, height: 16, borderRadius: '50%', backgroundColor: RED, opacity: 0.4 },
  ],
  // Section 3 - teal theme
  [
    { top: 10, right: -10, width: 26, height: 26, borderRadius: '0', backgroundColor: TEAL, opacity: 0.5, transform: 'rotate(20deg)' },
    { top: -5, right: 40, width: 20, height: 20, borderRadius: '50%', backgroundColor: YELLOW, opacity: 0.5 },
    { top: 30, left: -12, width: 18, height: 18, borderRadius: '50%', backgroundColor: BLUE, opacity: 0.45 },
  ],
  // Section 4 - pink/red theme
  [
    { top: 8, right: -14, width: 32, height: 32, borderRadius: '50%', backgroundColor: RED, opacity: 0.45 },
    { top: 35, right: 25, width: 18, height: 18, borderRadius: '0', backgroundColor: BLUE, opacity: 0.5, transform: 'rotate(45deg)' },
    { top: -8, left: 50, width: 22, height: 22, borderRadius: '50%', backgroundColor: TEAL, opacity: 0.4 },
  ],
];

/* ── Memphis Endmark Shapes ──────────────────────────────────────── */

interface EndmarkShape {
  width: number;
  height: number;
  borderRadius: string;
  backgroundColor: string;
  transform?: string;
}

const ENDMARK_SHAPES: EndmarkShape[] = [
  { width: 14, height: 14, borderRadius: '50%', backgroundColor: RED },
  { width: 12, height: 12, borderRadius: '0', backgroundColor: BLUE, transform: 'rotate(45deg)' },
  { width: 16, height: 16, borderRadius: '50%', backgroundColor: YELLOW },
  { width: 10, height: 10, borderRadius: '0', backgroundColor: TEAL, transform: 'rotate(20deg)' },
  { width: 18, height: 18, borderRadius: '50%', backgroundColor: RED },
  { width: 11, height: 11, borderRadius: '0', backgroundColor: YELLOW, transform: 'rotate(35deg)' },
  { width: 13, height: 13, borderRadius: '50%', backgroundColor: BLUE },
  { width: 15, height: 15, borderRadius: '0', backgroundColor: TEAL, transform: 'rotate(45deg)' },
  { width: 12, height: 12, borderRadius: '50%', backgroundColor: YELLOW },
  { width: 14, height: 14, borderRadius: '0', backgroundColor: RED, transform: 'rotate(15deg)' },
  { width: 10, height: 10, borderRadius: '50%', backgroundColor: BLUE },
  { width: 16, height: 16, borderRadius: '0', backgroundColor: YELLOW, transform: 'rotate(60deg)' },
  { width: 13, height: 13, borderRadius: '50%', backgroundColor: TEAL },
];

/* ── Component ───────────────────────────────────────────────────── */

export default function MemphisTextHeavy() {
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
    fontFamily: BODY_SANS,
    backgroundColor: BG,
    color: BLACK,
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
    overflow: 'hidden',
  };

  /* ── Header ── */
  const headerStyle: React.CSSProperties = {
    position: 'relative',
    padding: '3rem 2.5rem 2rem',
    maxWidth: 1100,
    margin: '0 auto',
    borderBottom: `4px solid ${BLUE}`,
  };

  /* Header geometric decorations */
  const headerDecoCircle: React.CSSProperties = {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: YELLOW,
    opacity: 0.55,
  };

  const headerDecoSquare: React.CSSProperties = {
    position: 'absolute',
    top: 80,
    right: 60,
    width: 30,
    height: 30,
    borderRadius: '0',
    backgroundColor: RED,
    opacity: 0.5,
    transform: 'rotate(25deg)',
  };

  const headerDecoSmallCircle: React.CSSProperties = {
    position: 'absolute',
    top: 50,
    left: 15,
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: TEAL,
    opacity: 0.45,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: GEO_SANS,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 900,
    lineHeight: 1.05,
    margin: '0 0 0.5rem',
    color: BLACK,
    maxWidth: '18ch',
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
  };

  const titleAccentBarStyle: React.CSSProperties = {
    width: 100,
    height: 6,
    backgroundColor: RED,
    border: 'none',
    margin: '0.75rem 0 1rem',
    borderRadius: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: GEO_SANS,
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    fontWeight: 700,
    lineHeight: 1.4,
    margin: '0 0 1.25rem',
    color: BLUE,
    maxWidth: '50ch',
    letterSpacing: '0.02em',
  };

  const metaStyle: React.CSSProperties = {
    fontFamily: GEO_SANS,
    fontSize: '0.85rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    margin: '0 0 1.25rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'center',
  };

  const tagsRowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: 0,
  };

  /* ── Layout (sidebar + main) ── */
  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    maxWidth: 1100,
    margin: '0 auto',
    gap: 0,
  };

  /* ── Sidebar TOC ── */
  const sidebarStyle: React.CSSProperties = {
    width: 240,
    flexShrink: 0,
    padding: '2rem 1.25rem',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',
    height: 'fit-content',
    maxHeight: '100vh',
    overflowY: 'auto',
    borderRight: `4px solid ${YELLOW}`,
    backgroundColor: BG,
  };

  const tocLabelStyle: React.CSSProperties = {
    fontFamily: GEO_SANS,
    fontSize: '0.8rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    margin: '0 0 1.25rem',
    color: BLACK,
    borderBottom: `3px solid ${RED}`,
    paddingBottom: '0.6rem',
  };

  const tocListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  /* ── Main Content ── */
  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const paragraphStyle: React.CSSProperties = {
    fontFamily: BODY_SANS,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.7,
    margin: '0 0 1.2rem',
    color: BLACK,
    maxWidth: '62ch',
  };

  /* ── Render ── */
  return (
    <div data-testid="text-heavy-demo" style={rootStyle}>
      {/* ── Header ── */}
      <header style={headerStyle}>
        {/* Header geometric decorations */}
        <div style={headerDecoCircle} />
        <div style={headerDecoSquare} />
        <div style={headerDecoSmallCircle} />

        <h1 style={titleStyle}>{article.title}</h1>
        <hr style={titleAccentBarStyle} />

        {article.subtitle && (
          <p style={subtitleStyle}>{article.subtitle}</p>
        )}

        {/* Meta line - each piece a different color */}
        <div style={metaStyle}>
          <span style={{ color: RED }}>{article.author}</span>
          <span style={{ color: YELLOW, fontSize: '1.2rem' }}>{'\u25CF'}</span>
          <span style={{ color: BLUE }}>{article.date}</span>
          <span style={{ color: TEAL, fontSize: '1.2rem' }}>{'\u25A0'}</span>
          <span style={{ color: RED }}>{article.readingTime}</span>
        </div>

        {/* Tags - rainbow pills */}
        <div style={tagsRowStyle}>
          {article.tags.map((tag, i) => {
            const color = TAG_COLORS[i % TAG_COLORS.length];
            return (
              <span
                key={tag}
                style={{
                  fontFamily: GEO_SANS,
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 20,
                  backgroundColor: color,
                  color: color === YELLOW ? BLACK : '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </header>

      {/* ── Body Layout ── */}
      <div style={layoutStyle}>
        {/* ── Sidebar TOC ── */}
        <nav style={sidebarStyle}>
          <div style={tocLabelStyle}>Contents</div>
          <ul style={tocListStyle}>
            {article.sections.map((section, i) => {
              const isActive = activeSection === section.id;
              const tocColor = PRIMARY_COLORS[i % PRIMARY_COLORS.length];

              const tocItemStyle: React.CSSProperties = {
                fontFamily: GEO_SANS,
                fontSize: '0.78rem',
                fontWeight: isActive ? 900 : 700,
                padding: '0.55rem 0 0.55rem 0.9rem',
                borderLeft: isActive
                  ? `5px solid ${tocColor}`
                  : '5px solid transparent',
                cursor: 'pointer',
                color: isActive ? tocColor : BLACK,
                lineHeight: 1.3,
                transition: 'color 0.15s ease, border-color 0.15s ease',
                backgroundColor: isActive ? `${tocColor}10` : 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              };

              return (
                <li
                  key={section.id}
                  style={tocItemStyle}
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
                  {/* Color indicator dot */}
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: i % 2 === 0 ? '50%' : '0',
                      backgroundColor: tocColor,
                      marginRight: '0.5rem',
                      transform: i % 2 !== 0 ? 'rotate(45deg)' : 'none',
                      verticalAlign: 'middle',
                    }}
                  />
                  {section.title}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Main Content ── */}
        <main style={mainStyle}>
          {article.sections.map((section, sectionIdx) => {
            const paragraphs = section.content.split('\n').filter((p) => p.trim());
            const tint = SECTION_TINTS[sectionIdx % SECTION_TINTS.length];
            const borderColor = SECTION_BORDER_COLORS[sectionIdx % SECTION_BORDER_COLORS.length];
            const headingColor = PRIMARY_COLORS[sectionIdx % PRIMARY_COLORS.length];
            const decos = SECTION_DECOS[sectionIdx % SECTION_DECOS.length];

            const sectionStyle: React.CSSProperties = {
              position: 'relative',
              padding: '2.5rem 2.5rem 2rem',
              backgroundColor: tint,
              borderTop: `4px solid ${borderColor}`,
            };

            const headingStyle: React.CSSProperties = {
              fontFamily: GEO_SANS,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              margin: '0 0 1.5rem',
              color: headingColor,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              position: 'relative',
              display: 'inline-block',
            };

            /* Heading underline - bold colored bar */
            const headingBarStyle: React.CSSProperties = {
              display: 'block',
              width: '60%',
              height: 4,
              backgroundColor: borderColor,
              marginTop: '0.4rem',
              borderRadius: 0,
            };

            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                data-section={SECTION_KEYS[sectionIdx]}
                style={sectionStyle}
              >
                {/* Geometric decorations near header */}
                {decos.map((deco, di) => (
                  <div
                    key={di}
                    style={{
                      position: 'absolute',
                      top: deco.top,
                      right: deco.right,
                      left: deco.left,
                      width: deco.width,
                      height: deco.height,
                      borderRadius: deco.borderRadius,
                      backgroundColor: deco.backgroundColor,
                      opacity: deco.opacity,
                      transform: deco.transform,
                      pointerEvents: 'none',
                    }}
                  />
                ))}

                {/* Section number badge */}
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: GEO_SANS,
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    color: borderColor === YELLOW ? BLACK : '#FFFFFF',
                    backgroundColor: borderColor,
                    padding: '0.2rem 0.6rem',
                    borderRadius: sectionIdx % 2 === 0 ? 20 : 2,
                    marginBottom: '0.6rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Section {sectionIdx + 1}
                </div>

                <h2 style={headingStyle}>
                  {section.title}
                  <span style={headingBarStyle} />
                </h2>

                {/* Body Paragraphs */}
                {paragraphs.map((text, idx) => (
                  <p key={idx} style={paragraphStyle}>
                    {text}
                  </p>
                ))}

                {/* Section-end geometric accent */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: headingColor,
                      opacity: 0.7,
                    }}
                  />
                  <div
                    style={{
                      width: 40,
                      height: 3,
                      backgroundColor: borderColor,
                      opacity: 0.5,
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '0',
                      backgroundColor: PRIMARY_COLORS[(sectionIdx + 2) % PRIMARY_COLORS.length],
                      opacity: 0.6,
                      transform: 'rotate(45deg)',
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* ── Memphis Endmark: explosion of geometric shapes ── */}
          <div
            style={{
              borderTop: `4px solid ${BLUE}`,
              padding: '2.5rem 2.5rem',
              textAlign: 'center',
              backgroundColor: BG,
            }}
          >
            {/* Title */}
            <div
              style={{
                fontFamily: GEO_SANS,
                fontSize: '0.7rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: BLACK,
                marginBottom: '1.25rem',
                opacity: 0.6,
              }}
            >
              End of Article
            </div>

            {/* Burst of shapes */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap',
              }}
            >
              {ENDMARK_SHAPES.map((shape, i) => (
                <div
                  key={i}
                  style={{
                    width: shape.width,
                    height: shape.height,
                    borderRadius: shape.borderRadius,
                    backgroundColor: shape.backgroundColor,
                    transform: shape.transform,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>

            {/* Bold sign-off */}
            <div
              style={{
                fontFamily: GEO_SANS,
                fontSize: '1.5rem',
                fontWeight: 900,
                color: RED,
                marginTop: '1.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              SLAP!
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
