import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

const FOREST_GREEN = '#2D5016';
const WARM_BROWN = '#8B6914';
const CREAM = '#FDF6EE';
const SAGE = '#A7C4A0';

const FONT_SERIF = "'Georgia', 'Times New Roman', serif";
const FONT_SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const HOVER_TRANSITION = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
const SOFT_SHADOW = '0 4px 20px rgba(45,80,22,0.08)';

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: CREAM,
    color: '#2E2E2E',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: FONT_SANS,
  },

  /* Hero */
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  },
  organicBlob: {
    position: 'absolute',
    top: '-10%',
    right: '-8%',
    width: '60vw',
    height: '60vw',
    maxWidth: '650px',
    maxHeight: '650px',
    borderRadius: '50%',
    background: `radial-gradient(circle at 40% 40%, ${SAGE}55, ${FOREST_GREEN}15, transparent 70%)`,
    opacity: 0.6,
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    maxWidth: '800px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    textAlign: 'center',
    alignItems: 'center',
  },
  heroHeadline: {
    fontFamily: FONT_SERIF,
    fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    margin: 0,
    color: FOREST_GREEN,
  },
  heroSubtitle: {
    fontFamily: FONT_SANS,
    fontSize: '1.15rem',
    fontWeight: 400,
    lineHeight: 1.75,
    color: WARM_BROWN,
    maxWidth: '560px',
    margin: 0,
  },
  heroCta: {
    fontFamily: FONT_SANS,
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: FOREST_GREEN,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: HOVER_TRANSITION,
  },

  /* Shared section */
  section: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '5rem 2rem',
  },
  sectionHeading: {
    fontFamily: FONT_SERIF,
    fontSize: '2.2rem',
    fontWeight: 700,
    color: FOREST_GREEN,
    textAlign: 'center',
    marginBottom: '2.5rem',
    letterSpacing: '-0.01em',
  },

  /* Pricing */
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  pricingCard: {
    borderRadius: '16px',
    padding: '2rem',
    transition: HOVER_TRANSITION,
    boxShadow: SOFT_SHADOW,
  },
  pricingName: {
    fontFamily: FONT_SERIF,
    fontSize: '1.2rem',
    fontWeight: 700,
    color: FOREST_GREEN,
    marginBottom: '0.5rem',
  },
  pricingPrice: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: FOREST_GREEN,
    fontFamily: FONT_SANS,
    lineHeight: 1,
    margin: '0.25rem 0',
  },
  pricingPeriod: {
    fontSize: '0.85rem',
    color: WARM_BROWN,
    fontFamily: FONT_SANS,
    marginBottom: '1.5rem',
  },
  pricingFeature: {
    fontFamily: FONT_SANS,
    fontSize: '0.9rem',
    color: '#4A4A4A',
    padding: '0.35rem 0',
    lineHeight: 1.5,
  },
  pricingCta: {
    fontFamily: FONT_SANS,
    width: '100%',
    padding: '0.85rem',
    background: FOREST_GREEN,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: HOVER_TRANSITION,
  },

  /* Testimonials */
  testimonialCard: {
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '620px',
    margin: '0 auto',
    textAlign: 'center',
    boxShadow: SOFT_SHADOW,
  },
  testimonialQuote: {
    fontFamily: FONT_SERIF,
    fontSize: '1.15rem',
    fontStyle: 'italic',
    color: '#3A3A3A',
    lineHeight: 1.75,
    margin: '0 0 1.5rem',
  },
  testimonialAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    color: '#FFFFFF',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  testimonialName: {
    fontFamily: FONT_SANS,
    fontSize: '0.95rem',
    fontWeight: 600,
    color: FOREST_GREEN,
    margin: 0,
  },
  testimonialRole: {
    fontFamily: FONT_SANS,
    fontSize: '0.8rem',
    color: WARM_BROWN,
    margin: 0,
  },
  dotNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'background 0.3s ease',
  },

  /* FAQ */
  faqItem: {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    marginBottom: '0.75rem',
    boxShadow: SOFT_SHADOW,
  },
  faqQuestion: {
    fontFamily: FONT_SERIF,
    fontSize: '1.05rem',
    fontWeight: 600,
    color: FOREST_GREEN,
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 1.5,
  },
  faqToggle: {
    color: FOREST_GREEN,
    fontSize: '1.4rem',
    fontWeight: 700,
    flexShrink: 0,
    marginLeft: '1rem',
    lineHeight: 1,
  },
  faqAnswer: {
    fontFamily: FONT_SANS,
    fontSize: '0.95rem',
    color: WARM_BROWN,
    lineHeight: 1.7,
    marginTop: '0.75rem',
  },

  /* Email signup */
  signupHeading: {
    fontFamily: FONT_SERIF,
    fontSize: '1.8rem',
    fontWeight: 700,
    color: FOREST_GREEN,
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  signupForm: {
    display: 'flex',
    gap: '0.75rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  signupInput: {
    flex: 1,
    fontFamily: FONT_SANS,
    padding: '0.9rem 1.25rem',
    background: '#FFFFFF',
    border: `2px solid ${SAGE}`,
    borderRadius: '9999px',
    color: '#2E2E2E',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  signupButton: {
    fontFamily: FONT_SANS,
    padding: '0.9rem 1.75rem',
    background: FOREST_GREEN,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: HOVER_TRANSITION,
    whiteSpace: 'nowrap',
  },
  successMessage: {
    fontFamily: FONT_SANS,
    fontSize: '1.05rem',
    color: FOREST_GREEN,
    textAlign: 'center',
    fontWeight: 600,
  },
};

const avatarColors = [WARM_BROWN, FOREST_GREEN, '#6B8E23', '#8B6914'];

const testimonialBgColors = [
  `${SAGE}30`,
  `${CREAM}`,
  `${SAGE}20`,
  `${CREAM}`,
];

export default function WarmOrganicLanding() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = testimonials[activeTestimonial];

  const handleHoverIn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'scale(1.02)';
  };
  const handleHoverOut = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page} data-testid="warm-organic-landing">
      {/* Hero */}
      <div style={styles.heroSection} data-section="hero">
        <div style={styles.organicBlob} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeadline}>{heroData.headline}</h1>
          <p style={styles.heroSubtitle}>{heroData.subheadline}</p>
          <button
            style={styles.heroCta}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            {heroData.ctaPrimary}
          </button>
        </div>
      </div>

      {/* Pricing */}
      <div style={styles.section} data-section="pricing">
        <h2 style={styles.sectionHeading}>Simple, honest pricing</h2>
        <div style={styles.pricingGrid}>
          {pricingPlans.map((plan) => {
            const cardBg = plan.highlighted ? `${SAGE}35` : '#FFFFFF';
            return (
              <div
                key={plan.name}
                style={{
                  ...styles.pricingCard,
                  background: cardBg,
                  border: plan.highlighted
                    ? `2px solid ${SAGE}`
                    : '2px solid transparent',
                }}
                onMouseEnter={handleHoverIn}
                onMouseLeave={handleHoverOut}
              >
                <div style={styles.pricingName}>{plan.name}</div>
                <div style={styles.pricingPrice}>
                  {plan.price}
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: WARM_BROWN,
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
                <div style={styles.pricingPeriod}>per month</div>
                {plan.features.map((f) => (
                  <div key={f} style={styles.pricingFeature}>
                    🌿 {f}
                  </div>
                ))}
                <button
                  style={{
                    ...styles.pricingCta,
                    background: plan.highlighted ? FOREST_GREEN : WARM_BROWN,
                  }}
                  onMouseEnter={handleHoverIn}
                  onMouseLeave={handleHoverOut}
                >
                  {plan.highlighted ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div style={styles.section} data-section="testimonials">
        <h2 style={styles.sectionHeading}>Voices from our community</h2>
        <div
          style={{
            ...styles.testimonialCard,
            background:
              testimonialBgColors[activeTestimonial % testimonialBgColors.length],
          }}
        >
          <p style={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
          <div
            style={{
              ...styles.testimonialAvatar,
              background:
                avatarColors[activeTestimonial % avatarColors.length],
            }}
          >
            {t.avatarInitial}
          </div>
          <p style={styles.testimonialName}>{t.name}</p>
          <p style={styles.testimonialRole}>
            {t.role}, {t.company}
          </p>
        </div>
        <div style={styles.dotNav}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              style={{
                ...styles.dot,
                background: i === activeTestimonial ? FOREST_GREEN : SAGE,
              }}
              onClick={() => setActiveTestimonial(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={styles.section} data-section="faq">
        <h2 style={styles.sectionHeading}>Frequently asked questions</h2>
        {faqItems.map((item, i) => (
          <div key={i} style={styles.faqItem}>
            <button
              style={styles.faqQuestion}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              {item.question}
              <span style={styles.faqToggle}>
                {openFaq === i ? '\u2212' : '+'}
              </span>
            </button>
            {openFaq === i && (
              <div style={styles.faqAnswer}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Email Signup */}
      <div style={styles.section} data-section="signup">
        <h2 style={styles.signupHeading}>Join our garden</h2>
        {submitted ? (
          <p style={styles.successMessage}>{emailSignup.successMessage}</p>
        ) : (
          <form style={styles.signupForm} onSubmit={handleEmailSubmit}>
            <input
              style={styles.signupInput}
              type="email"
              placeholder={emailSignup.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = FOREST_GREEN;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${SAGE}66`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = SAGE;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              style={styles.signupButton}
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
            >
              {emailSignup.buttonText}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
