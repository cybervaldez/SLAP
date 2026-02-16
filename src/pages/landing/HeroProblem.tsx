import React, { useRef, useCallback } from 'react';

interface HeroProblemProps {
  onSlapped: () => void;
}

const BG_DARK = '#1A1A2E';
const BG_MID = '#222240';
const BG_DEEP = '#0D0D1A';
const TEXT_MUTED = 'rgba(245, 240, 225, 0.5)';
const ACCENT_GOLD = '#FFD000';
const SCORE_RED = '#FF6B6B';
const SCORE_GREEN = '#6BCB77';
const EASE_ENTER = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const EASE_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const KEYFRAMES = `
@keyframes screenShake {
  0%{transform:translateX(0)}
  15%{transform:translateX(-3px)}
  30%{transform:translateX(3px)}
  45%{transform:translateX(-3px)}
  60%{transform:translateX(3px)}
  75%{transform:translateX(-2px)}
  90%{transform:translateX(2px)}
  100%{transform:translateX(0)}
}
@keyframes heroFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes heroFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0ms!important;transition-duration:0ms!important}
}
`;

const st: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    background: BG_DARK,
    padding: '2rem 2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.3em',
    color: TEXT_MUTED,
    marginBottom: '2rem',
    opacity: 0,
    animation: `heroFadeIn 600ms ${EASE_ENTER} 300ms forwards`,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1.5rem',
    opacity: 0,
    animation: `heroFadeIn 600ms ${EASE_ENTER} 600ms forwards`,
    flexWrap: 'wrap' as const,
  },
  handsPair: {
    display: 'flex',
    gap: '3rem',
  },
  hand: {
    fontSize: '3.5rem',
    cursor: 'pointer',
    transition: `transform 150ms ${EASE_BOUNCE}, filter 150ms`,
    userSelect: 'none' as const,
  },
  cardsBottom: {
    display: 'flex',
    gap: '1.2rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    opacity: 0,
    animation: `heroFadeIn 600ms ${EASE_ENTER} 800ms forwards`,
  },
  slopCard: {
    width: 160,
    height: 200,
    borderRadius: 6,
    overflow: 'hidden',
    opacity: 0,
    transform: 'translateY(16px)',
    transition: `all 500ms ${EASE_ENTER}`,
    flexShrink: 0,
  },
  slopCardVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  slopCardInner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  slopDesign: {
    flex: 1,
    background: 'linear-gradient(135deg,#94A3B8,#64748B)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    gap: '0.4rem',
  },
  cardStamp: {
    padding: '0.4rem 0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: BG_MID,
  },
  cardStampLabel: {
    fontSize: '0.5rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
  },
  cardStampSublabel: {
    fontSize: '0.3rem',
    fontWeight: 600,
    color: TEXT_MUTED,
    display: 'block',
    marginTop: 1,
  },
  cardStampScore: {
    fontSize: '0.5rem',
    fontWeight: 800,
  },
  // Flip card
  flipCard: {
    width: 160,
    height: 200,
    borderRadius: 6,
    perspective: 800,
    overflow: 'visible',
    background: 'none',
    flexShrink: 0,
    opacity: 0,
    transform: 'translateY(16px)',
    transition: `opacity 500ms ${EASE_ENTER}, transform 500ms ${EASE_ENTER}`,
  },
  flipCardVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  flipCardInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d' as const,
    transition: `transform 400ms ${EASE_ENTER}`,
  },
  flipCardInnerFlipped: {
    transform: 'rotateY(180deg)',
  },
  flipFace: {
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden' as const,
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  flipCardBack: {
    transform: 'rotateY(180deg)',
  },
  slapDesign: {
    flex: 1,
    background: BG_DEEP,
    border: `2px solid ${ACCENT_GOLD}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    gap: '0.4rem',
  },
  whisper: {
    fontSize: '0.5rem',
    color: TEXT_MUTED,
    opacity: 0,
    transition: `opacity 600ms ${EASE_ENTER}`,
    marginTop: '1.5rem',
  },
  whisperVisible: {
    opacity: 1,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '1.5rem',
    fontSize: '0.5rem',
    color: TEXT_MUTED,
    letterSpacing: '0.1em',
    opacity: 0,
    transition: `opacity 600ms ${EASE_ENTER}`,
    animation: 'heroFloat 2s ease-in-out infinite',
  },
  scrollIndicatorVisible: {
    opacity: 1,
  },
};

// Slop design wireframe shapes
function SlopDesignLanding() {
  return (
    <div style={st.slopDesign}>
      <div style={{ width: '80%', height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: 3 }} />
      <div style={{ width: '55%', height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 3 }} />
      <div style={{ width: '40%', height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
      <div style={{ width: '30%', height: 12, background: 'rgba(255,255,255,0.25)', borderRadius: 999, marginTop: '0.3rem' }} />
    </div>
  );
}

function SlopDesignDashboard() {
  return (
    <div style={st.slopDesign}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', width: '100%' }}>
        <div style={{ height: 24, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
        <div style={{ height: 24, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
        <div style={{ height: 24, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
        <div style={{ height: 24, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
      </div>
      <div style={{ width: '100%', height: 36, background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginTop: '0.2rem' }} />
    </div>
  );
}

function SlopDesignGallery() {
  const cell = { background: 'rgba(255,255,255,0.1)', borderRadius: 2, padding: 3, display: 'flex', flexDirection: 'column' as const, gap: 2 };
  return (
    <div style={st.slopDesign}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.2rem', width: '100%', flex: 1 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={cell}>
            <div style={{ width: '100%', height: 20, background: 'rgba(255,255,255,0.18)', borderRadius: 1 }} />
            <div style={{ width: '75%', height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlapDesignBack() {
  return (
    <div style={st.slapDesign}>
      <div style={{ width: '65%', height: 8, background: ACCENT_GOLD }} />
      <div style={{ width: '55%', height: 2, background: ACCENT_GOLD, opacity: 0.4 }} />
      <div style={{ width: '45%', height: 5, background: TEXT_MUTED }} />
      <div style={{ width: '55%', height: 2, background: ACCENT_GOLD, opacity: 0.4 }} />
      <div style={{ width: '35%', height: 12, background: ACCENT_GOLD }} />
    </div>
  );
}

export default function HeroProblem({ onSlapped }: HeroProblemProps) {
  const hasSlapped = useRef(false);
  const transformCardRef = useRef<HTMLDivElement>(null);
  const whisperRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsVisible = useRef(false);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = React.useState(false);
  const [whisperVisible, setWhisperVisible] = React.useState(false);
  const [scrollVisible, setScrollVisible] = React.useState(false);

  // Check slop cards visibility on scroll
  React.useEffect(() => {
    function checkCards() {
      if (cardsVisible.current) return;
      const refs = [card1Ref, card2Ref, card3Ref];
      refs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 100);
        }
      });
    }
    checkCards();
    window.addEventListener('scroll', checkCards);
    // Also trigger after a short delay for initial load
    const t = setTimeout(checkCards, 100);
    return () => {
      window.removeEventListener('scroll', checkCards);
      clearTimeout(t);
    };
  }, []);

  const doSlap = useCallback(() => {
    if (hasSlapped.current) return;
    hasSlapped.current = true;

    // Screen shake
    document.body.classList.add('shaking');
    setTimeout(() => {
      document.body.classList.remove('shaking');
      // Fire the parent callback for SLAP flash
      onSlapped();
      // After flash, flip card and show whisper
      setTimeout(() => {
        setFlipped(true);
        setWhisperVisible(true);
        setScrollVisible(true);
      }, 200);
    }, 150);
  }, [onSlapped]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section
        id="hero-problem"
        data-section="hero-problem"
        data-testid="hero-problem-section"
        style={st.section}
      >
        <p style={st.title}>Pick a hand.</p>
        <div style={st.center}>
          <div style={st.handsPair}>
            <span
              data-testid="hand-left"
              style={st.hand}
              onClick={doSlap}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15) rotate(-8deg)';
                e.currentTarget.style.filter = `drop-shadow(0 0 20px ${ACCENT_GOLD})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.filter = '';
              }}
            >
              {'\u{1F91A}'}
            </span>
            <span
              data-testid="hand-right"
              style={st.hand}
              onClick={doSlap}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15) rotate(-8deg)';
                e.currentTarget.style.filter = `drop-shadow(0 0 20px ${ACCENT_GOLD})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.filter = '';
              }}
            >
              {'\u270B'}
            </span>
          </div>
        </div>

        <div style={st.cardsBottom}>
          {/* Card 1: Landing */}
          <div ref={card1Ref} style={st.slopCard} data-testid="slop-card-1">
            <div style={st.slopCardInner}>
              <SlopDesignLanding />
              <div style={st.cardStamp}>
                <div>
                  <span style={{ ...st.cardStampLabel, color: SCORE_RED }}>SLOP</span>
                  <span style={st.cardStampSublabel}>Landing</span>
                </div>
                <span style={{ ...st.cardStampScore, color: SCORE_RED }}>3/10</span>
              </div>
            </div>
          </div>

          {/* Card 2: Dashboard */}
          <div ref={card2Ref} style={st.slopCard} data-testid="slop-card-2">
            <div style={st.slopCardInner}>
              <SlopDesignDashboard />
              <div style={st.cardStamp}>
                <div>
                  <span style={{ ...st.cardStampLabel, color: SCORE_RED }}>SLOP</span>
                  <span style={st.cardStampSublabel}>Dashboard</span>
                </div>
                <span style={{ ...st.cardStampScore, color: SCORE_RED }}>3/10</span>
              </div>
            </div>
          </div>

          {/* Card 3: Gallery — flip card */}
          <div
            ref={card3Ref}
            style={st.flipCard}
            data-testid="slop-card-transform"
          >
            <div
              ref={transformCardRef}
              style={{
                ...st.flipCardInner,
                ...(flipped ? st.flipCardInnerFlipped : {}),
              }}
            >
              {/* Front */}
              <div style={st.flipFace}>
                <SlopDesignGallery />
                <div style={st.cardStamp}>
                  <div>
                    <span style={{ ...st.cardStampLabel, color: SCORE_RED }}>SLOP</span>
                    <span style={st.cardStampSublabel}>Gallery</span>
                  </div>
                  <span style={{ ...st.cardStampScore, color: SCORE_RED }}>3/10</span>
                </div>
              </div>
              {/* Back */}
              <div style={{ ...st.flipFace, ...st.flipCardBack }}>
                <SlapDesignBack />
                <div style={st.cardStamp}>
                  <div>
                    <span style={{ ...st.cardStampLabel, color: ACCENT_GOLD }}>SLAP!</span>
                    <span style={{ ...st.cardStampSublabel, color: ACCENT_GOLD }}>Reviewed</span>
                  </div>
                  <span style={{ ...st.cardStampScore, color: SCORE_GREEN }}>8/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          ref={whisperRef}
          style={{ ...st.whisper, ...(whisperVisible ? st.whisperVisible : {}) }}
        >
          AI designs look the same. This fixes that.
        </p>
        <div
          ref={scrollRef}
          style={{ ...st.scrollIndicator, ...(scrollVisible ? st.scrollIndicatorVisible : {}) }}
        >
          {'\u2193'} SCROLL
        </div>
      </section>
    </>
  );
}
