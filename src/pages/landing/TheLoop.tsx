import React, { useRef, useEffect, useState, useCallback } from 'react';
import { navigate } from '../../router';

const BG_DEEP = '#0D0D1A';
const BG_DARK = '#1A1A2E';
const BG_MID = '#222240';
const TEXT_MUTED = 'rgba(245, 240, 225, 0.5)';
const ACCENT_GOLD = '#FFD000';
const SCORE_GREEN = '#6BCB77';
const SCORE_YELLOW = '#FFD93D';
const SCORE_RED = '#FF6B6B';
const EASE_ENTER = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const EASE_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const KEYFRAMES = `
@keyframes loopBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes loopFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0ms!important;transition-duration:0ms!important}
}
`;

const st: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    background: BG_DEEP,
    padding: '4rem 2rem 6rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.3em',
    color: TEXT_MUTED,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.55rem',
    color: TEXT_MUTED,
    marginBottom: '3rem',
  },
  // Terminal chrome
  terminal: {
    maxWidth: 620,
    width: '100%',
    background: BG_DARK,
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid rgba(245, 240, 225, 0.08)',
  },
  termBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1rem',
    background: BG_MID,
    borderBottom: '1px solid rgba(245, 240, 225, 0.06)',
  },
  termDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  termLabel: {
    fontSize: '0.5rem',
    color: TEXT_MUTED,
    letterSpacing: '0.08em',
    marginLeft: 'auto',
  },
  termBody: {
    padding: '1.4rem 1.6rem',
    fontSize: '0.6rem',
    lineHeight: 1.9,
  },
  // Line base (hidden until revealed)
  line: {
    opacity: 0,
    transform: 'translateY(4px)',
    transition: `opacity 300ms ${EASE_ENTER}, transform 300ms ${EASE_ENTER}`,
    marginBottom: '0.2rem',
  },
  lineVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  // Divider
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(245, 240, 225, 0.06)',
    margin: '0.8rem 0',
  },
  // Summary box
  summaryBox: {
    background: 'rgba(255, 208, 0, 0.04)',
    border: '1px solid rgba(255, 208, 0, 0.12)',
    borderRadius: 4,
    padding: '0.8rem 1rem',
    marginTop: '0.3rem',
  },
  summaryTitle: {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: ACCENT_GOLD,
    letterSpacing: '0.1em',
    marginBottom: '0.4rem',
  },
  // Score comparison
  scores: {
    display: 'flex',
    gap: '1.2rem',
    alignItems: 'center',
    padding: '0.4rem 0',
  },
  scoreBox: { textAlign: 'center' as const },
  scoreLabel: {
    fontSize: '0.45rem',
    color: TEXT_MUTED,
    letterSpacing: '0.08em',
    fontWeight: 700,
  },
  scoreVal: {
    fontSize: '0.9rem',
    fontWeight: 800,
  },
  scoreArrow: {
    fontSize: '0.7rem',
    color: ACCENT_GOLD,
  },
  // Traffic light dots
  trafficRow: {
    display: 'inline-flex',
    gap: '1rem',
    alignItems: 'center',
  },
  trafficItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  trafficDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
  },
  // Whisper
  whisper: {
    fontSize: '0.55rem',
    color: TEXT_MUTED,
    marginTop: '2.5rem',
    textAlign: 'center' as const,
    lineHeight: 1.8,
    maxWidth: 440,
  },
  // CTA row
  ctaRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  ctaBase: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.55rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
    padding: '0.7rem 1.4rem',
    borderRadius: 3,
    cursor: 'pointer',
    transition: `all 150ms ${EASE_BOUNCE}`,
    border: 'none',
  },
  ctaPrimary: {
    background: ACCENT_GOLD,
    color: BG_DEEP,
  },
  ctaSecondary: {
    background: 'none',
    color: TEXT_MUTED,
    border: '1px solid rgba(245, 240, 225, 0.15)',
  },
};

// ─── Helper: styled spans ──────────────────────────

const Prompt = () => <span style={{ color: ACCENT_GOLD }}>$ </span>;
const Cmd = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#F5F0E1', fontWeight: 700 }}>{children}</span>
);
const Out = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <span style={{ color: color || TEXT_MUTED }}>{children}</span>
);
const Bright = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#F5F0E1', fontWeight: 700 }}>{children}</span>
);
const Gold = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: ACCENT_GOLD }}>{children}</span>
);
const Green = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: SCORE_GREEN }}>{children}</span>
);
const Dim = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'rgba(245, 240, 225, 0.3)' }}>{children}</span>
);
const Check = () => <span style={{ color: SCORE_GREEN }}>[x]</span>;
const Uncheck = () => <span style={{ color: 'rgba(245, 240, 225, 0.2)' }}>[ ]</span>;
const Name = ({ children, dim }: { children: React.ReactNode; dim?: boolean }) => (
  <span style={{ display: 'inline-block', minWidth: '7ch', color: dim ? 'rgba(245, 240, 225, 0.3)' : '#F5F0E1' }}>{children}</span>
);
const Arrow = () => <span style={{ color: ACCENT_GOLD, marginRight: '0.3rem' }}>&rarr;</span>;

function TrafficDot({ color }: { color: string }) {
  return <span style={{ ...st.trafficDot, background: color }} />;
}

// ─── Cursor ────────────────────────────────────────

function BlinkCursor() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.5em',
        height: '1.1em',
        background: ACCENT_GOLD,
        verticalAlign: 'middle',
        animation: 'loopBlink 1s step-end infinite',
        marginLeft: '0.2rem',
      }}
    />
  );
}

// ─── Main Component ────────────────────────────────

export default function TheLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasRevealed = useRef(false);
  const [revealed, setRevealed] = useState(false);

  // Collect refs via callback
  const setLineRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    lineRefs.current[i] = el;
  }, []);

  // Scroll-reveal: when terminal enters viewport, stagger-reveal all lines
  useEffect(() => {
    function check() {
      if (hasRevealed.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        hasRevealed.current = true;
        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 90);
        });
        // Reveal whisper + CTA after lines finish
        const lineCount = lineRefs.current.filter(Boolean).length;
        setTimeout(() => setRevealed(true), lineCount * 90 + 200);
      }
    }
    check();
    window.addEventListener('scroll', check);
    const t = setTimeout(check, 300);
    return () => {
      window.removeEventListener('scroll', check);
      clearTimeout(t);
    };
  }, []);

  // Line index counter
  let li = 0;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section
        ref={sectionRef}
        id="the-loop"
        data-section="the-loop"
        data-testid="the-loop-section"
        style={st.section}
      >
        <p style={st.title} data-testid="loop-title">THE LOOP</p>
        <p style={st.subtitle}>From new design to proven improvement. Every cycle.</p>

        <div style={st.terminal} data-testid="loop-terminal">
          {/* Terminal chrome */}
          <div style={st.termBar}>
            <span style={{ ...st.termDot, background: '#FF5F57' }} />
            <span style={{ ...st.termDot, background: '#FFBD2E' }} />
            <span style={{ ...st.termDot, background: '#28CA42' }} />
            <span style={st.termLabel}>slap &mdash; session</span>
          </div>

          <div style={st.termBody}>

            {/* ═══ Phase 1: Analyze ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-1">
              <Prompt /><Cmd>/slap projects/FlowBoard/haiku.html</Cmd>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Analyzing design...</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Gold>Detected: PM tool landing page</Gold>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Sections: hero, features, pricing, testimonials, cta</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Elements: 5 headlines, 3 CTAs, 3 pricing tiers</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Industry: Project management / SaaS</Out>
            </div>

            <hr ref={setLineRef(li++) as any} style={{ ...st.line, ...st.divider }} />

            {/* ═══ Phase 3: Council ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-2">
              <Bright>REVIEW COUNCIL for FlowBoard (haiku)</Bright>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out color="rgba(245, 240, 225, 0.15)">&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;&boxh;</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>EXPERTS (5 &mdash; always included):</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>&nbsp;&nbsp;Marketing, UX, Product, Technical, Design</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>PERSONAS &mdash; recommended 8 of 18:</Out>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Check /> <Name>frank</Name> <Out>Zero Patience &mdash; PM tool fatigue</Out>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Check /> <Name>elena</Name> <Out>Screen Reader &mdash; board navigation</Out>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Check /> <Name>carlos</Name> <Out>CEO Evaluating &mdash; ROI first scroll</Out>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Check /> <Name>jasmine</Name> <Out>Support Rep &mdash; will get tickets</Out>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Check /> <Name>sam</Name> <Out>One Thumb &mdash; on-the-go PM</Out>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Uncheck /> <Name dim>marcus</Name> <Dim>(no color-critical UI detected)</Dim>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Uncheck /> <Name dim>kevin</Name> <Dim>(not target demographic)</Dim>
            </div>
            <div ref={setLineRef(li++)} style={{ ...st.line, paddingLeft: '1rem' }}>
              <Dim>... 3 more skipped</Dim>
            </div>

            <hr ref={setLineRef(li++) as any} style={{ ...st.line, ...st.divider }} />

            {/* ═══ Phase 4: Persona briefs ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-3">
              <Bright>GENERATING PERSONA BRIEFS</Bright>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Green>{'\u2713'}</Green> <Out>frank.md &mdash; Team lead, burned by 3 PM tools. Has 4 minutes.</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Green>{'\u2713'}</Green> <Out>elena.md &mdash; Screen reader. Board navigation matters.</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Green>{'\u2713'}</Green> <Out>carlos.md &mdash; CEO. ROI in the first scroll or he's gone.</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Green>{'\u2713'}</Green> <Out>marketing.md &mdash; Differentiation from Asana in 5 seconds?</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Dim>... 9 more briefs generated</Dim>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>13 persona briefs </Out><Gold>&rarr;</Gold><Out> projects/FlowBoard/personas/</Out>
            </div>

            <hr ref={setLineRef(li++) as any} style={{ ...st.line, ...st.divider }} />

            {/* ═══ Phase 5: Reviews ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-4">
              <Bright>GENERATING REVIEWS</Bright>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>13 reviewers evaluating 5 sections...</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Findings: </Out>
              <span style={st.trafficRow}>
                <span style={st.trafficItem}><TrafficDot color={SCORE_RED} /> 8 red</span>
                <span style={st.trafficItem}><TrafficDot color={SCORE_YELLOW} /> 22 yellow</span>
                <span style={st.trafficItem}><TrafficDot color={SCORE_GREEN} /> 18 green</span>
              </span>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Every finding references your actual content. Not a template.</Out>
            </div>

            <hr ref={setLineRef(li++) as any} style={{ ...st.line, ...st.divider }} />

            {/* ═══ Phase 7: Summary ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-5">
              <div style={st.summaryBox}>
                <div style={st.summaryTitle}>SLAP COMPLETE &mdash; FlowBoard (haiku)</div>
                <div><Out>Persona briefs: 13 files (5 expert + 8 persona)</Out></div>
                <div><Arrow /><Out>projects/FlowBoard/personas/</Out></div>
                <div>&nbsp;</div>
                <div><Out>Annotated HTML: public/projects/FlowBoard/haiku.html</Out></div>
                <div><Arrow /><Out>5 sections, 12 data-ref elements</Out></div>
                <div>&nbsp;</div>
                <div><Out>Review data: src/data/flowboardReviews.ts</Out></div>
                <div><Arrow /><Out>13 reviewers, avg score </Out><Gold>5.8</Gold></div>
              </div>
            </div>

            <hr ref={setLineRef(li++) as any} style={{ ...st.line, ...st.divider }} />

            {/* ═══ Iterate step ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-iterate">
              <Gold>SELECT FEEDBACK &rarr; COPY PROMPT &rarr; PASTE INTO CLAUDE</Gold>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Improved HTML generated as v2...</Out>
            </div>

            <hr ref={setLineRef(li++) as any} style={{ ...st.line, ...st.divider }} />

            {/* ═══ v2: re-slap ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-6">
              <Prompt /><Cmd>/slap projects/FlowBoard/v2.html --parent haiku</Cmd>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Out>Reusing existing persona briefs...</Out>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>
              <Bright>V2 SCORES:</Bright>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>

            <div ref={setLineRef(li++)} style={st.line}>
              <div style={st.scores}>
                <div style={st.scoreBox}>
                  <div style={st.scoreLabel}>HAIKU</div>
                  <div style={{ ...st.scoreVal, color: SCORE_YELLOW }}>5.8</div>
                </div>
                <div style={st.scoreArrow}>&rarr;</div>
                <div style={st.scoreBox}>
                  <div style={st.scoreLabel}>V2</div>
                  <div style={{ ...st.scoreVal, color: SCORE_GREEN }}>7.2</div>
                </div>
              </div>
            </div>

            <div ref={setLineRef(li++)} style={st.line}>
              <Green>+1.4 avg improvement across 13 reviewers</Green>
            </div>
            <div ref={setLineRef(li++)} style={st.line}>&nbsp;</div>

            {/* ═══ Loop back: blinking cursor ═══ */}
            <div ref={setLineRef(li++)} style={st.line} data-testid="loop-step-repeat">
              <Prompt /><BlinkCursor />
            </div>

          </div>
        </div>

        {/* Whisper */}
        <p
          style={{
            ...st.whisper,
            opacity: revealed ? 1 : 0,
            transition: `opacity 600ms ${EASE_ENTER}`,
          }}
          data-testid="loop-whisper"
        >
          Generic feedback produces generic designs.<br />
          Grounded feedback produces craft.
        </p>

        {/* CTA row */}
        <div
          style={{
            ...st.ctaRow,
            opacity: revealed ? 1 : 0,
            transition: `opacity 600ms ${EASE_ENTER}`,
          }}
          data-testid="loop-cta-row"
        >
          <button
            style={{ ...st.ctaBase, ...st.ctaPrimary }}
            data-testid="loop-cta-try"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 208, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            TRY WITH YOUR DESIGN
          </button>
          <button
            style={{ ...st.ctaBase, ...st.ctaSecondary }}
            data-testid="loop-cta-demo"
            onClick={() => navigate('flowboard', 'haiku')}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F5F0E1';
              e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = TEXT_MUTED;
              e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.15)';
            }}
          >
            EXPLORE FLOWBOARD DEMO
          </button>
        </div>
      </section>
    </>
  );
}
