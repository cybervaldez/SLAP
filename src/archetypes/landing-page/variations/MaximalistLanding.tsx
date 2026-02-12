import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

const NAVY = '#1B1F3B';
const CORAL = '#FF6B6B';
const GOLD = '#D4A574';
const CREAM = '#FFF8F0';

const FONT_SERIF = "'Georgia', 'Times New Roman', serif";
const FONT_SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  /* ---- Page ---- */
  page: {
    minHeight: '100vh',
    background: CREAM,
    color: NAVY,
    fontFamily: FONT_SANS,
    position: 'relative',
    overflow: 'hidden',
  },

  /* ---- Hero ---- */
  heroSection: {
    background: NAVY,
    color: CREAM,
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
  heroDecoCircle: {
    position: 'absolute',
    top: '-80px',
    right: '-60px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: `2px solid ${GOLD}33`,
    pointerEvents: 'none',
  },
  heroHeadline: {
    fontFamily: FONT_SERIF,
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: 700,
    lineHeight: 1.0,
    letterSpacing: '-0.02em',
    margin: 0,
    color: CREAM,
  },
  heroSubtitle: {
    fontFamily: FONT_SANS,
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: 1.7,
    color: `${CREAM}cc`,
    maxWidth: '540px',
    marginTop: '2rem',
    marginLeft: '4rem',
  },
  heroRule: {
    width: '120px',
    height: '4px',
    background: GOLD,
    border: 'none',
    margin: '2.5rem 0',
  },
  heroCta: {
    fontFamily: FONT_SANS,
    display: 'inline-block',
    padding: '1.1rem 2.8rem',
    background: CORAL,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.2s ease',
    boxShadow: `6px 6px 0 ${GOLD}`,
  },
  heroCtaSecondary: {
    fontFamily: FONT_SANS,
    display: 'inline-block',
    padding: '1.1rem 2.8rem',
    background: 'transparent',
    color: CREAM,
    border: `2px solid ${CREAM}`,
    borderRadius: '0',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.2s ease, color 0.2s ease',
    marginLeft: '1.5rem',
  },

  /* ---- Pricing ---- */
  pricingSection: {
    padding: '5rem 2rem',
    background: CREAM,
    position: 'relative',
  },
  pricingSectionInner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionHeading: {
    fontFamily: FONT_SERIF,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    color: NAVY,
    marginBottom: '0.5rem',
  },
  sectionSubheading: {
    fontFamily: FONT_SANS,
    fontSize: '1.05rem',
    color: `${NAVY}99`,
    marginBottom: '3rem',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.35fr 1fr',
    gap: '1.5rem',
    alignItems: 'start',
  },
  pricingCard: {
    background: '#FFFFFF',
    border: `1px solid ${NAVY}22`,
    borderRadius: '0',
    padding: '2rem 1.75rem',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    position: 'relative',
  },
  pricingCardFeatured: {
    background: CORAL,
    color: '#FFFFFF',
    border: `4px solid ${NAVY}`,
    borderRadius: '0',
    padding: '3rem 2rem',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    position: 'relative',
    boxShadow: `8px 8px 0 ${NAVY}`,
  },
  pricingName: {
    fontFamily: FONT_SERIF,
    fontSize: '1.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
  },
  pricingNameFeatured: {
    fontFamily: FONT_SANS,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '0.5rem',
    color: '#FFFFFF',
  },
  pricingPrice: {
    fontFamily: FONT_SERIF,
    fontSize: '2.8rem',
    fontWeight: 700,
    lineHeight: 1,
    margin: '0.5rem 0',
    color: NAVY,
  },
  pricingPriceFeatured: {
    fontFamily: FONT_SERIF,
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1,
    margin: '0.5rem 0',
    color: '#FFFFFF',
  },
  pricingPeriod: {
    fontFamily: FONT_SANS,
    fontSize: '0.85rem',
    color: `${NAVY}77`,
    marginBottom: '1.5rem',
  },
  pricingPeriodFeatured: {
    fontFamily: FONT_SANS,
    fontSize: '0.85rem',
    color: '#FFFFFFcc',
    marginBottom: '1.5rem',
  },
  pricingFeature: {
    fontFamily: FONT_SANS,
    fontSize: '0.9rem',
    padding: '0.35rem 0',
    color: `${NAVY}cc`,
    borderBottom: `1px solid ${NAVY}11`,
  },
  pricingFeatureFeatured: {
    fontFamily: FONT_SANS,
    fontSize: '0.9rem',
    padding: '0.35rem 0',
    color: '#FFFFFFdd',
    borderBottom: '1px solid #FFFFFF33',
  },
  pricingCta: {
    fontFamily: FONT_SANS,
    width: '100%',
    padding: '0.85rem',
    background: NAVY,
    color: CREAM,
    border: 'none',
    borderRadius: '0',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'transform 0.2s ease, background 0.2s ease',
  },
  pricingCtaFeatured: {
    fontFamily: FONT_SANS,
    width: '100%',
    padding: '1rem',
    background: '#FFFFFF',
    color: CORAL,
    border: 'none',
    borderRadius: '0',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'transform 0.2s ease, background 0.2s ease',
    boxShadow: `4px 4px 0 ${NAVY}`,
  },

  /* ---- Testimonials ---- */
  testimonialSection: {
    padding: '5rem 2rem',
    background: NAVY,
    position: 'relative',
  },
  testimonialInner: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  testimonialHeading: {
    fontFamily: FONT_SERIF,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    color: CREAM,
    marginBottom: '3rem',
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  testimonialCard: {
    padding: '2.5rem 2rem',
    borderRadius: '0',
    position: 'relative',
    transition: 'transform 0.25s ease',
  },
  testimonialBigQuote: {
    fontFamily: FONT_SERIF,
    fontSize: '5rem',
    lineHeight: 1,
    position: 'absolute',
    top: '0.5rem',
    left: '1.5rem',
    opacity: 0.3,
  },
  testimonialQuote: {
    fontFamily: FONT_SERIF,
    fontSize: '1.15rem',
    fontStyle: 'italic',
    lineHeight: 1.7,
    margin: '0 0 1.5rem',
    position: 'relative',
    zIndex: 1,
    paddingTop: '2rem',
  },
  testimonialAttribution: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative',
    zIndex: 1,
  },
  testimonialAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1rem',
    border: '2px solid',
  },
  testimonialName: {
    fontFamily: FONT_SANS,
    fontSize: '0.9rem',
    fontWeight: 700,
    margin: 0,
  },
  testimonialRole: {
    fontFamily: FONT_SANS,
    fontSize: '0.8rem',
    margin: 0,
    opacity: 0.7,
  },

  /* ---- FAQ ---- */
  faqSection: {
    padding: '5rem 2rem',
    background: CREAM,
    position: 'relative',
  },
  faqInner: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  faqHeading: {
    fontFamily: FONT_SERIF,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    color: NAVY,
    marginBottom: '3rem',
  },
  faqItem: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 1fr',
    gap: '1.5rem',
    padding: '2rem 0',
    borderBottom: `2px solid ${NAVY}22`,
    alignItems: 'start',
  },
  faqNumber: {
    fontFamily: FONT_SERIF,
    fontSize: '2rem',
    fontWeight: 700,
    color: GOLD,
    lineHeight: 1,
  },
  faqQuestion: {
    fontFamily: FONT_SERIF,
    fontSize: '1.1rem',
    fontWeight: 700,
    color: NAVY,
    lineHeight: 1.4,
    margin: 0,
  },
  faqAnswer: {
    fontFamily: FONT_SANS,
    fontSize: '0.95rem',
    color: `${NAVY}bb`,
    lineHeight: 1.7,
    margin: 0,
  },

  /* ---- Email Signup ---- */
  emailSection: {
    background: CORAL,
    padding: '5rem 2rem',
    position: 'relative',
  },
  emailInner: {
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center',
  },
  emailHeading: {
    fontFamily: FONT_SERIF,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '1rem',
    lineHeight: 1.1,
  },
  emailSubtext: {
    fontFamily: FONT_SANS,
    fontSize: '1.05rem',
    color: '#FFFFFFcc',
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
    fontFamily: FONT_SANS,
    padding: '1.1rem 1.25rem',
    background: '#FFFFFF',
    border: `3px solid ${NAVY}`,
    borderRight: 'none',
    borderRadius: '0',
    color: NAVY,
    fontSize: '1rem',
    outline: 'none',
    transition: 'box-shadow 0.2s ease',
  },
  emailButton: {
    fontFamily: FONT_SANS,
    padding: '1.1rem 2rem',
    background: NAVY,
    color: CREAM,
    border: `3px solid ${NAVY}`,
    borderRadius: '0',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.2s ease',
    whiteSpace: 'nowrap',
  },
  emailSuccess: {
    fontFamily: FONT_SERIF,
    fontSize: '1.3rem',
    color: '#FFFFFF',
    fontWeight: 700,
  },
};

/* Testimonial card color schemes */
const testimonialSchemes = [
  { bg: `${CREAM}`, text: NAVY, quoteMark: CORAL, avatarBg: CORAL, avatarText: '#FFFFFF', avatarBorder: NAVY },
  { bg: `${NAVY}22`, text: CREAM, quoteMark: GOLD, avatarBg: GOLD, avatarText: NAVY, avatarBorder: GOLD },
  { bg: GOLD, text: NAVY, quoteMark: NAVY, avatarBg: NAVY, avatarText: CREAM, avatarBorder: CREAM },
  { bg: CORAL, text: '#FFFFFF', quoteMark: '#FFFFFF', avatarBg: '#FFFFFF', avatarText: CORAL, avatarBorder: NAVY },
];

export default function MaximalistLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={styles.page} data-testid="maximalist-landing">
      {/* ===== Hero ===== */}
      <section style={styles.heroSection} data-section="hero">
        <div style={styles.heroDecoCircle} />
        <div style={styles.heroInner}>
          <h1 style={styles.heroHeadline}>{heroData.headline}</h1>
          <hr style={styles.heroRule} />
          <p style={styles.heroSubtitle}>{heroData.subheadline}</p>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0' }}>
            <button
              style={styles.heroCta}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0.5deg) scale(1.04)';
                e.currentTarget.style.background = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0) scale(1)';
                e.currentTarget.style.background = CORAL;
              }}
            >
              {heroData.ctaPrimary}
            </button>
            <button
              style={styles.heroCtaSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0.5deg) scale(1.04)';
                e.currentTarget.style.background = CREAM;
                e.currentTarget.style.color = NAVY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0) scale(1)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = CREAM;
              }}
            >
              {heroData.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section style={styles.pricingSection} data-section="pricing">
        <div style={styles.pricingSectionInner}>
          <h2 style={styles.sectionHeading}>Pricing</h2>
          <p style={styles.sectionSubheading}>Choose the plan that works for your team.</p>
          <div style={styles.pricingGrid}>
            {pricingPlans.map((plan) => {
              const isFeatured = plan.highlighted;
              const cardKey = `pricing-${plan.name}`;
              const isHovered = hoveredCard === cardKey;

              return (
                <div
                  key={plan.name}
                  style={{
                    ...(isFeatured ? styles.pricingCardFeatured : styles.pricingCard),
                    transform: isHovered ? 'rotate(0.5deg) scale(1.03)' : 'rotate(0) scale(1)',
                    boxShadow: isFeatured
                      ? isHovered
                        ? `12px 12px 0 ${NAVY}`
                        : `8px 8px 0 ${NAVY}`
                      : isHovered
                        ? `6px 6px 0 ${GOLD}`
                        : 'none',
                  }}
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={isFeatured ? styles.pricingNameFeatured : styles.pricingName}>
                    {plan.name}
                  </div>
                  <div style={isFeatured ? styles.pricingPriceFeatured : styles.pricingPrice}>
                    {plan.price}
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        opacity: 0.7,
                      }}
                    >
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
                      {f}
                    </div>
                  ))}
                  <button
                    style={isFeatured ? styles.pricingCtaFeatured : styles.pricingCta}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotate(0.5deg) scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotate(0) scale(1)';
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
              const scheme = testimonialSchemes[i % testimonialSchemes.length];
              const cardKey = `testimonial-${i}`;
              const isHovered = hoveredCard === cardKey;

              return (
                <div
                  key={i}
                  style={{
                    ...styles.testimonialCard,
                    background: scheme.bg,
                    color: scheme.text,
                    border: `2px solid ${scheme.text}33`,
                    transform: isHovered ? 'rotate(0.5deg) scale(1.02)' : 'rotate(0) scale(1)',
                    boxShadow: isHovered
                      ? `8px 8px 0 ${GOLD}88`
                      : `4px 4px 0 ${scheme.text}22`,
                  }}
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span
                    style={{
                      ...styles.testimonialBigQuote,
                      color: scheme.quoteMark,
                    }}
                  >
                    &ldquo;
                  </span>
                  <p style={{ ...styles.testimonialQuote, color: scheme.text }}>
                    {t.quote}
                  </p>
                  <div style={styles.testimonialAttribution}>
                    <div
                      style={{
                        ...styles.testimonialAvatar,
                        background: scheme.avatarBg,
                        color: scheme.avatarText,
                        borderColor: scheme.avatarBorder,
                      }}
                    >
                      {t.avatarInitial}
                    </div>
                    <div>
                      <p style={{ ...styles.testimonialName, color: scheme.text }}>
                        {t.name}
                      </p>
                      <p style={{ ...styles.testimonialRole, color: scheme.text }}>
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
          {faqItems.map((item, i) => (
            <div
              key={i}
              style={{
                ...styles.faqItem,
                borderBottom:
                  i === faqItems.length - 1
                    ? `4px solid ${GOLD}`
                    : `2px solid ${NAVY}22`,
              }}
            >
              <span style={styles.faqNumber}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={styles.faqQuestion}>{item.question}</p>
              <p style={styles.faqAnswer}>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Email Signup ===== */}
      <section style={styles.emailSection} data-section="signup">
        <div style={styles.emailInner}>
          <h2 style={styles.emailHeading}>Stay Ahead of the Curve</h2>
          <p style={styles.emailSubtext}>
            Join thousands of teams already building better products.
          </p>
          {submitted ? (
            <p style={styles.emailSuccess} role="status" aria-live="polite">{emailSignup.successMessage}</p>
          ) : (
            <form style={styles.emailForm} onSubmit={handleSubmit}>
              <input
                style={styles.emailInput}
                type="email"
                placeholder={emailSignup.placeholder}
                required
                aria-label="Email address"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${GOLD}88`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                style={styles.emailButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0.5deg) scale(1.04)';
                  e.currentTarget.style.background = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0) scale(1)';
                  e.currentTarget.style.background = NAVY;
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
