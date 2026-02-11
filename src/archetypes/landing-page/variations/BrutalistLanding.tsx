import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: FONT,
    background: '#FFFFFF',
    color: '#000000',
    minHeight: '100vh',
  },
  /* Hero */
  hero: {
    padding: '4rem 2rem 3rem',
    borderBottom: '4px solid #000000',
  },
  heroHeadline: {
    fontFamily: FONT,
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase' as const,
    margin: '0 0 1.5rem',
    color: '#000000',
    textAlign: 'left' as const,
  },
  heroSub: {
    fontFamily: FONT,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#000000',
    margin: '0 0 2rem',
    maxWidth: '600px',
    textAlign: 'left' as const,
  },
  heroCta: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: '#000000',
    color: '#FFFFFF',
    border: '3px solid #000000',
    borderRadius: 0,
    fontSize: '1rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'none',
  },
  /* Pricing */
  pricingSection: {
    padding: '3rem 2rem',
    borderBottom: '4px solid #000000',
  },
  pricingSectionHeading: {
    fontFamily: FONT,
    fontSize: '2rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    margin: '0 0 2rem',
    color: '#000000',
    textAlign: 'left' as const,
  },
  pricingStack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0',
  },
  pricingBlock: {
    border: '3px solid #000000',
    borderBottom: 'none',
    padding: '2rem',
    background: '#FFFFFF',
  },
  pricingBlockLast: {
    border: '3px solid #000000',
    padding: '2rem',
    background: '#FFFFFF',
  },
  pricingBlockHighlighted: {
    border: '3px solid #000000',
    borderBottom: 'none',
    padding: '2rem',
    background: '#000000',
    color: '#FFFFFF',
  },
  pricingName: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '0.25rem',
  },
  pricingPrice: {
    fontFamily: FONT,
    fontSize: '3rem',
    fontWeight: 900,
    lineHeight: 1,
    margin: '0.25rem 0',
  },
  pricingPeriod: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 400,
    marginBottom: '1rem',
  },
  pricingFeature: {
    fontFamily: FONT,
    fontSize: '0.9rem',
    fontWeight: 400,
    padding: '0.2rem 0',
    lineHeight: 1.5,
  },
  pricingCta: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '0.75rem 2rem',
    background: '#FFFFFF',
    color: '#000000',
    border: '3px solid #000000',
    borderRadius: 0,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'none',
  },
  pricingCtaHighlighted: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '0.75rem 2rem',
    background: '#FF0000',
    color: '#FFFFFF',
    border: '3px solid #FF0000',
    borderRadius: 0,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'none',
  },
  /* Testimonials */
  testimonialSection: {
    padding: '3rem 2rem',
    borderBottom: '4px solid #000000',
  },
  testimonialSectionHeading: {
    fontFamily: FONT,
    fontSize: '2rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    margin: '0 0 2rem',
    color: '#000000',
    textAlign: 'left' as const,
  },
  testimonialItem: {
    borderTop: '4px solid #000000',
    padding: '1.5rem 0',
  },
  testimonialQuote: {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '1.15rem',
    lineHeight: 1.6,
    color: '#000000',
    margin: '0 0 0.75rem',
  },
  testimonialAttribution: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    color: '#000000',
    letterSpacing: '0.05em',
  },
  /* FAQ */
  faqSection: {
    padding: '3rem 2rem',
    borderBottom: '4px solid #000000',
  },
  faqSectionHeading: {
    fontFamily: FONT,
    fontSize: '2rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    margin: '0 0 2rem',
    color: '#000000',
    textAlign: 'left' as const,
  },
  faqItem: {
    borderTop: '3px solid #000000',
    padding: '1.5rem 0',
  },
  faqQuestion: {
    fontFamily: FONT,
    fontSize: '1rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    color: '#000000',
    margin: '0 0 0.5rem',
    letterSpacing: '0.02em',
  },
  faqAnswer: {
    fontFamily: FONT,
    fontSize: '0.95rem',
    fontWeight: 400,
    lineHeight: 1.7,
    color: '#000000',
    margin: 0,
  },
  /* Email Signup */
  signupSection: {
    padding: '3rem 2rem',
    background: '#000000',
    color: '#FFFFFF',
  },
  signupHeading: {
    fontFamily: FONT,
    fontSize: '2rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    margin: '0 0 1.5rem',
    color: '#FFFFFF',
    textAlign: 'left' as const,
  },
  signupForm: {
    display: 'flex',
    gap: '0',
    maxWidth: '600px',
  },
  signupInput: {
    fontFamily: FONT,
    flex: 1,
    padding: '1rem',
    background: '#FFFFFF',
    color: '#000000',
    border: '3px solid #000000',
    borderRight: 'none',
    borderRadius: 0,
    fontSize: '1rem',
    outline: 'none',
  },
  signupButton: {
    fontFamily: FONT,
    padding: '1rem 2rem',
    background: '#FF0000',
    color: '#FFFFFF',
    border: '3px solid #FF0000',
    borderRadius: 0,
    fontSize: '1rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'none',
  },
  successMessage: {
    fontFamily: FONT,
    fontSize: '1.25rem',
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    color: '#FF0000',
    letterSpacing: '0.05em',
  },
};

export default function BrutalistLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page} data-testid="brutalist-landing">
      {/* Hero */}
      <section style={styles.hero} data-section="hero">
        <h1 style={styles.heroHeadline}>{heroData.headline}</h1>
        <p style={styles.heroSub}>{heroData.subheadline}</p>
        <button
          style={styles.heroCta}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#000000';
            e.currentTarget.style.color = '#FFFFFF';
          }}
        >
          {heroData.ctaPrimary}
        </button>
      </section>

      {/* Pricing */}
      <section style={styles.pricingSection} data-section="pricing">
        <h2 style={styles.pricingSectionHeading}>Pricing</h2>
        <div style={styles.pricingStack}>
          {pricingPlans.map((plan, i) => {
            const isLast = i === pricingPlans.length - 1;
            const blockStyle = plan.highlighted
              ? styles.pricingBlockHighlighted
              : isLast
                ? styles.pricingBlockLast
                : styles.pricingBlock;

            return (
              <div key={plan.name} style={blockStyle}>
                <div style={styles.pricingName}>{plan.name}</div>
                <div style={styles.pricingPrice}>
                  {plan.price}
                  <span style={{ fontSize: '1rem', fontWeight: 400 }}>
                    {plan.period}
                  </span>
                </div>
                <div style={styles.pricingPeriod}>per month</div>
                {plan.features.map((f) => (
                  <div key={f} style={styles.pricingFeature}>
                    &mdash; {f}
                  </div>
                ))}
                <button
                  style={
                    plan.highlighted
                      ? styles.pricingCtaHighlighted
                      : styles.pricingCta
                  }
                  onMouseEnter={(e) => {
                    if (plan.highlighted) {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.color = '#FF0000';
                    } else {
                      e.currentTarget.style.background = '#000000';
                      e.currentTarget.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.highlighted) {
                      e.currentTarget.style.background = '#FF0000';
                      e.currentTarget.style.color = '#FFFFFF';
                    } else {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.color = '#000000';
                    }
                  }}
                >
                  {plan.highlighted ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonialSection} data-section="testimonials">
        <h2 style={styles.testimonialSectionHeading}>Testimonials</h2>
        {testimonials.map((t) => (
          <div key={t.name} style={styles.testimonialItem}>
            <p style={styles.testimonialQuote}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={styles.testimonialAttribution}>
              {t.name} / {t.role} / {t.company}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={styles.faqSection} data-section="faq">
        <h2 style={styles.faqSectionHeading}>FAQ</h2>
        {faqItems.map((item, i) => (
          <div key={i} style={styles.faqItem}>
            <div style={styles.faqQuestion}>{item.question}</div>
            <p style={styles.faqAnswer}>{item.answer}</p>
          </div>
        ))}
      </section>

      {/* Email Signup */}
      <section style={styles.signupSection} data-section="signup">
        <h2 style={styles.signupHeading}>Get Early Access</h2>
        {!submitted ? (
          <form style={styles.signupForm} onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={emailSignup.placeholder}
              style={styles.signupInput}
            />
            <button
              type="submit"
              style={styles.signupButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#FF0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FF0000';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              {emailSignup.buttonText}
            </button>
          </form>
        ) : (
          <div style={styles.successMessage}>
            {emailSignup.successMessage}
          </div>
        )}
      </section>
    </div>
  );
}
