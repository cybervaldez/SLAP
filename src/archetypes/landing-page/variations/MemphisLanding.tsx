import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

/* ── Memphis / Neo-Pop Design Tokens ── */
const BG = '#FFF8E7';
const BG_ALT = '#FFE4CC';
const TEXT = '#1A1A2E';
const TEXT_SEC = '#6B6B80';
const PINK = '#FF6B9D';
const BLUE = '#4ECDC4';
const YELLOW = '#FFE66D';
const CORAL = '#FF6B6B';

const FONT_DISPLAY = "'Impact', 'Arial Black', sans-serif";
const FONT_BODY = "'Trebuchet MS', 'Lucida Grande', sans-serif";
const FONT_MONO = "'Courier New', monospace";

/* Shadow colors cycle for cards */
const SHADOW_CYCLE = [PINK, BLUE, YELLOW];

const styles: Record<string, React.CSSProperties> = {
  /* ---- Page ---- */
  page: {
    minHeight: '100vh',
    background: BG,
    color: TEXT,
    fontFamily: FONT_BODY,
    position: 'relative',
    overflow: 'hidden',
  },

  /* ---- Hero ---- */
  heroSection: {
    background: TEXT,
    color: BG,
    padding: '6rem 2rem 5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  heroInner: {
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-block',
    fontFamily: FONT_BODY,
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    background: PINK,
    color: '#FFFFFF',
    padding: '0.4rem 1.2rem',
    borderRadius: 0,
    transform: 'rotate(-2deg)',
    marginBottom: '1.5rem',
  },
  heroHeadline: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(3.5rem, 10vw, 5.5rem)',
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase' as const,
    margin: 0,
    color: BG,
  },
  heroLine2: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(3.5rem, 10vw, 5.5rem)',
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase' as const,
    color: 'transparent',
    WebkitTextStroke: `2px ${BG}`,
  },
  heroLine3: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(3.5rem, 10vw, 5.5rem)',
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase' as const,
    display: 'inline-block',
  },
  heroLine3Highlight: {
    background: PINK,
    color: '#FFFFFF',
    padding: '0.1em 0.3em',
    display: 'inline',
  },
  heroSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: '1.15rem',
    fontWeight: 400,
    lineHeight: 1.7,
    color: `${BG}cc`,
    maxWidth: '540px',
    marginTop: '2rem',
  },
  heroCta: {
    fontFamily: FONT_BODY,
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: PINK,
    color: '#FFFFFF',
    border: `3px solid ${PINK}`,
    borderRadius: 0,
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxShadow: `4px 4px 0 ${YELLOW}`,
  },
  heroCtaSecondary: {
    fontFamily: FONT_BODY,
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: 'transparent',
    color: BG,
    border: `3px solid ${BG}`,
    borderRadius: 0,
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    marginLeft: '1rem',
    boxShadow: `4px 4px 0 ${BLUE}`,
  },
  /* Decorative shapes (hidden on mobile via JS) */
  decoCircle: {
    position: 'absolute' as const,
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: `4px solid ${YELLOW}`,
    pointerEvents: 'none' as const,
    top: '60px',
    right: '80px',
    opacity: 0.5,
  },
  decoTriangle: {
    position: 'absolute' as const,
    width: 0,
    height: 0,
    borderLeft: '40px solid transparent',
    borderRight: '40px solid transparent',
    borderBottom: `70px solid ${BLUE}55`,
    pointerEvents: 'none' as const,
    bottom: '60px',
    right: '200px',
    transform: 'rotate(15deg)',
  },
  decoSquare: {
    position: 'absolute' as const,
    width: '60px',
    height: '60px',
    background: `${CORAL}44`,
    border: `3px solid ${CORAL}`,
    pointerEvents: 'none' as const,
    top: '180px',
    left: '60px',
    transform: 'rotate(25deg)',
  },

  /* ---- Pricing ---- */
  pricingSection: {
    padding: '5rem 2rem',
    background: BG,
    position: 'relative',
  },
  pricingInner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionHeading: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 900,
    color: TEXT,
    textTransform: 'uppercase' as const,
    marginBottom: '0.5rem',
  },
  sectionSubheading: {
    fontFamily: FONT_BODY,
    fontSize: '1.05rem',
    color: TEXT_SEC,
    marginBottom: '3rem',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    alignItems: 'start',
  },
  pricingCard: {
    background: '#FFFFFF',
    border: `3px solid ${TEXT}`,
    borderRadius: 0,
    padding: '2rem 1.75rem',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    position: 'relative' as const,
  },
  pricingCardFeatured: {
    background: TEXT,
    color: '#FFFFFF',
    border: `3px solid ${TEXT}`,
    borderRadius: 0,
    padding: '2.5rem 2rem',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    position: 'relative' as const,
    boxShadow: `6px 6px 0 ${PINK}`,
  },
  pricingName: {
    fontFamily: FONT_DISPLAY,
    fontSize: '1.1rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
    color: TEXT,
  },
  pricingNameFeatured: {
    fontFamily: FONT_BODY,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    marginBottom: '0.5rem',
    color: PINK,
  },
  pricingPrice: {
    fontFamily: FONT_DISPLAY,
    fontSize: '3rem',
    fontWeight: 900,
    lineHeight: 1,
    margin: '0.5rem 0',
    color: TEXT,
  },
  pricingPriceFeatured: {
    fontFamily: FONT_DISPLAY,
    fontSize: '3.5rem',
    fontWeight: 900,
    lineHeight: 1,
    margin: '0.5rem 0',
    color: '#FFFFFF',
  },
  pricingPeriod: {
    fontFamily: FONT_BODY,
    fontSize: '0.85rem',
    color: TEXT_SEC,
    marginBottom: '1.5rem',
  },
  pricingPeriodFeatured: {
    fontFamily: FONT_BODY,
    fontSize: '0.85rem',
    color: '#FFFFFFaa',
    marginBottom: '1.5rem',
  },
  pricingFeature: {
    fontFamily: FONT_BODY,
    fontSize: '0.9rem',
    padding: '0.4rem 0',
    color: `${TEXT}cc`,
    borderBottom: `1px dashed ${TEXT}22`,
  },
  pricingFeatureFeatured: {
    fontFamily: FONT_BODY,
    fontSize: '0.9rem',
    padding: '0.4rem 0',
    color: '#FFFFFFdd',
    borderBottom: '1px dashed #FFFFFF33',
  },
  pricingCta: {
    fontFamily: FONT_BODY,
    width: '100%',
    padding: '0.9rem',
    background: TEXT,
    color: BG,
    border: `3px solid ${TEXT}`,
    borderRadius: 0,
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  pricingCtaFeatured: {
    fontFamily: FONT_BODY,
    width: '100%',
    padding: '1rem',
    background: PINK,
    color: '#FFFFFF',
    border: `3px solid ${PINK}`,
    borderRadius: 0,
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxShadow: `4px 4px 0 ${YELLOW}`,
  },

  /* ---- Testimonials ---- */
  testimonialSection: {
    padding: '5rem 2rem',
    background: BG_ALT,
    position: 'relative',
  },
  testimonialInner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  testimonialHeading: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 900,
    color: TEXT,
    textTransform: 'uppercase' as const,
    marginBottom: '3rem',
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  testimonialCard: {
    background: '#FFFFFF',
    border: `3px solid ${TEXT}`,
    borderRadius: 0,
    padding: '2rem 1.75rem',
    position: 'relative' as const,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  testimonialQuote: {
    fontFamily: FONT_BODY,
    fontSize: '1.05rem',
    fontStyle: 'italic',
    lineHeight: 1.7,
    color: TEXT,
    margin: '0 0 1.5rem',
  },
  testimonialBigQuote: {
    fontFamily: FONT_DISPLAY,
    fontSize: '4rem',
    lineHeight: 1,
    position: 'absolute' as const,
    top: '0.5rem',
    right: '1.25rem',
    opacity: 0.15,
    color: TEXT,
    pointerEvents: 'none' as const,
  },
  testimonialAttribution: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  testimonialAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1rem',
    fontFamily: FONT_DISPLAY,
    border: `3px solid ${TEXT}`,
  },
  testimonialName: {
    fontFamily: FONT_BODY,
    fontSize: '0.9rem',
    fontWeight: 700,
    margin: 0,
    color: TEXT,
  },
  testimonialRole: {
    fontFamily: FONT_BODY,
    fontSize: '0.8rem',
    margin: 0,
    color: TEXT_SEC,
  },

  /* ---- FAQ ---- */
  faqSection: {
    padding: '5rem 2rem',
    background: BG,
    position: 'relative',
  },
  faqInner: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqHeading: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 900,
    color: TEXT,
    textTransform: 'uppercase' as const,
    marginBottom: '3rem',
  },
  faqItem: {
    borderBottom: `2px dashed ${TEXT}33`,
    padding: '0',
  },
  faqToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 0',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
  },
  faqNumber: {
    fontFamily: FONT_MONO,
    fontSize: '0.85rem',
    fontWeight: 700,
    color: TEXT_SEC,
    minWidth: '32px',
  },
  faqQuestion: {
    fontFamily: FONT_BODY,
    fontSize: '1.05rem',
    fontWeight: 700,
    color: TEXT,
    flex: 1,
    margin: 0,
    lineHeight: 1.4,
  },
  faqIndicator: {
    fontFamily: FONT_DISPLAY,
    fontSize: '1.4rem',
    fontWeight: 900,
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: YELLOW,
    color: TEXT,
    border: `3px solid ${TEXT}`,
    borderRadius: 0,
    flexShrink: 0,
    transition: 'transform 0.2s ease',
  },
  faqAnswer: {
    fontFamily: FONT_BODY,
    fontSize: '0.95rem',
    color: TEXT_SEC,
    lineHeight: 1.7,
    margin: 0,
    padding: '0 0 1.25rem 2.75rem',
  },

  /* ---- Email Signup ---- */
  emailSection: {
    background: BLUE,
    padding: '5rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  emailInner: {
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center' as const,
    position: 'relative' as const,
    zIndex: 1,
  },
  emailHeading: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 900,
    color: TEXT,
    textTransform: 'uppercase' as const,
    marginBottom: '1rem',
    lineHeight: 1.1,
  },
  emailSubtext: {
    fontFamily: FONT_BODY,
    fontSize: '1.05rem',
    color: `${TEXT}cc`,
    marginBottom: '2.5rem',
  },
  emailForm: {
    display: 'flex',
    gap: '0',
    maxWidth: '520px',
    margin: '0 auto',
  },
  emailInput: {
    flex: 1,
    fontFamily: FONT_BODY,
    padding: '1.1rem 1.25rem',
    background: '#FFFFFF',
    border: `3px solid ${TEXT}`,
    borderRight: 'none',
    borderRadius: 0,
    color: TEXT,
    fontSize: '1rem',
    outline: 'none',
    transition: 'box-shadow 0.2s ease',
  },
  emailButton: {
    fontFamily: FONT_BODY,
    padding: '1.1rem 2rem',
    background: PINK,
    color: '#FFFFFF',
    border: `3px solid ${TEXT}`,
    borderRadius: 0,
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    whiteSpace: 'nowrap' as const,
    boxShadow: `4px 4px 0 ${TEXT}`,
  },
  emailSuccess: {
    fontFamily: FONT_DISPLAY,
    fontSize: '1.4rem',
    color: TEXT,
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  },

  /* Decorative shapes for signup section */
  decoSignupCircle: {
    position: 'absolute' as const,
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: `4px solid ${TEXT}33`,
    pointerEvents: 'none' as const,
    bottom: '-40px',
    left: '-60px',
  },
  decoSignupSquare: {
    position: 'absolute' as const,
    width: '80px',
    height: '80px',
    background: `${YELLOW}55`,
    border: `3px solid ${TEXT}33`,
    pointerEvents: 'none' as const,
    top: '30px',
    right: '40px',
    transform: 'rotate(-15deg)',
  },
};

/* Testimonial shadow color cycling: blue, pink, blue, pink */
const testimonialShadowColors = [BLUE, PINK, BLUE, PINK];
/* Testimonial tilt angles for playful layout */
const testimonialTilts = [-1.5, 1, -0.5, 1.5];

export default function MemphisLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Responsive check for hiding decorative shapes on narrow viewports */
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={styles.page} data-testid="memphis-landing">
      {/* ===== Hero ===== */}
      <section style={styles.heroSection} data-section="hero">
        {/* Decorative geometric shapes */}
        {!isMobile && (
          <>
            <div style={styles.decoCircle} aria-hidden="true" />
            <div style={styles.decoTriangle} aria-hidden="true" />
            <div style={styles.decoSquare} aria-hidden="true" />
          </>
        )}

        <div style={styles.heroInner}>
          {/* Overline badge */}
          <div style={styles.heroBadge}>New Release</div>

          {/* 3-line headline treatment */}
          <h1 style={{ margin: 0 }}>
            <span style={styles.heroHeadline}>
              {heroData.headline.split(' ').slice(0, 2).join(' ')}
            </span>
            <br />
            <span style={styles.heroLine2}>
              {heroData.headline.split(' ').slice(2, 4).join(' ')}
            </span>
            <br />
            <span style={styles.heroLine3}>
              <span style={styles.heroLine3Highlight}>
                {heroData.headline.split(' ').slice(4).join(' ')}
              </span>
            </span>
          </h1>

          <p style={styles.heroSubtitle}>{heroData.subheadline}</p>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
            <button
              style={styles.heroCta}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = `6px 6px 0 ${YELLOW}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `4px 4px 0 ${YELLOW}`;
              }}
            >
              {heroData.ctaPrimary}
            </button>
            <button
              style={styles.heroCtaSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = `6px 6px 0 ${BLUE}`;
                e.currentTarget.style.background = BG;
                e.currentTarget.style.color = TEXT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `4px 4px 0 ${BLUE}`;
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = BG;
              }}
            >
              {heroData.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section style={styles.pricingSection} data-section="pricing">
        <div style={styles.pricingInner}>
          <h2 style={styles.sectionHeading}>Pricing</h2>
          <p style={styles.sectionSubheading}>Choose the plan that works for your team.</p>
          <div style={styles.pricingGrid}>
            {pricingPlans.map((plan, i) => {
              const isFeatured = plan.highlighted;
              const cardKey = `pricing-${plan.name}`;
              const isHovered = hoveredCard === cardKey;
              const shadowColor = SHADOW_CYCLE[i % SHADOW_CYCLE.length];

              return (
                <div
                  key={plan.name}
                  style={{
                    ...(isFeatured ? styles.pricingCardFeatured : styles.pricingCard),
                    transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
                    boxShadow: isFeatured
                      ? isHovered
                        ? `8px 8px 0 ${PINK}`
                        : `6px 6px 0 ${PINK}`
                      : isHovered
                        ? `6px 6px 0 ${shadowColor}`
                        : `4px 4px 0 ${shadowColor}`,
                  }}
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={isFeatured ? styles.pricingNameFeatured : styles.pricingName}>
                    {plan.name}
                  </div>
                  <div style={isFeatured ? styles.pricingPriceFeatured : styles.pricingPrice}>
                    {plan.price}
                    <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.7 }}>
                      {plan.period}
                    </span>
                  </div>
                  <div style={isFeatured ? styles.pricingPeriodFeatured : styles.pricingPeriod}>
                    billed monthly
                  </div>
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={isFeatured ? styles.pricingFeatureFeatured : styles.pricingFeature}
                    >
                      <span style={{ marginRight: '0.5rem' }}>{'\u2605'}</span>
                      {f}
                    </div>
                  ))}
                  <button
                    style={isFeatured ? styles.pricingCtaFeatured : styles.pricingCta}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      if (isFeatured) {
                        e.currentTarget.style.boxShadow = `6px 6px 0 ${YELLOW}`;
                      } else {
                        e.currentTarget.style.boxShadow = `4px 4px 0 ${shadowColor}`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      if (isFeatured) {
                        e.currentTarget.style.boxShadow = `4px 4px 0 ${YELLOW}`;
                      } else {
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isFeatured ? 'Get Started Now' : 'Choose Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section style={styles.testimonialSection} data-section="testimonials">
        <div style={styles.testimonialInner}>
          <h2 style={styles.testimonialHeading}>What People Are Saying</h2>
          <div style={styles.testimonialGrid}>
            {testimonials.map((t, i) => {
              const shadowColor = testimonialShadowColors[i % testimonialShadowColors.length];
              const tilt = testimonialTilts[i % testimonialTilts.length];
              const cardKey = `testimonial-${i}`;
              const isHovered = hoveredCard === cardKey;
              const avatarColors = [PINK, BLUE, YELLOW, CORAL];
              const avatarBg = avatarColors[i % avatarColors.length];

              return (
                <div
                  key={i}
                  style={{
                    ...styles.testimonialCard,
                    transform: isHovered
                      ? `rotate(0deg) translate(-2px, -2px)`
                      : `rotate(${tilt}deg)`,
                    boxShadow: isHovered
                      ? `8px 8px 0 ${shadowColor}`
                      : `4px 4px 0 ${shadowColor}`,
                  }}
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span style={styles.testimonialBigQuote} aria-hidden="true">
                    &ldquo;
                  </span>
                  <p style={styles.testimonialQuote}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={styles.testimonialAttribution}>
                    <div
                      style={{
                        ...styles.testimonialAvatar,
                        background: avatarBg,
                        color: '#FFFFFF',
                      }}
                    >
                      {t.avatarInitial}
                    </div>
                    <div>
                      <p style={styles.testimonialName}>{t.name}</p>
                      <p style={styles.testimonialRole}>
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={styles.faqSection} data-section="faq">
        <div style={styles.faqInner}>
          <h2 style={styles.faqHeading}>Frequently Asked Questions</h2>
          {faqItems.map((item, i) => {
            const isOpen = openFaq === i;
            const isLastItem = i === faqItems.length - 1;

            return (
              <div
                key={i}
                style={{
                  ...styles.faqItem,
                  borderBottom: isLastItem
                    ? `3px solid ${TEXT}`
                    : `2px dashed ${TEXT}33`,
                }}
              >
                <button
                  style={styles.faqToggle}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span style={styles.faqNumber}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={styles.faqQuestion}>{item.question}</span>
                  <span
                    style={{
                      ...styles.faqIndicator,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    id={`faq-answer-${i}`}
                    style={styles.faqAnswer}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Email Signup ===== */}
      <section style={styles.emailSection} data-section="signup">
        {/* Decorative shapes */}
        {!isMobile && (
          <>
            <div style={styles.decoSignupCircle} aria-hidden="true" />
            <div style={styles.decoSignupSquare} aria-hidden="true" />
          </>
        )}

        <div style={styles.emailInner}>
          <h2 style={styles.emailHeading}>Stay Ahead of the Curve</h2>
          <p style={styles.emailSubtext}>
            Join thousands of teams already building better products.
          </p>
          {submitted ? (
            <p style={styles.emailSuccess} role="status" aria-live="polite">
              {emailSignup.successMessage}
            </p>
          ) : (
            <form style={styles.emailForm} onSubmit={handleSubmit}>
              <input
                style={styles.emailInput}
                type="email"
                placeholder={emailSignup.placeholder}
                required
                aria-label="Email address"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${YELLOW}88`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                style={styles.emailButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = `6px 6px 0 ${TEXT}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = `4px 4px 0 ${TEXT}`;
                }}
              >
                {emailSignup.buttonText}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
