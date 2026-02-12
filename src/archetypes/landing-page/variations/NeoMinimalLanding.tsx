import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

const ACCENT = '#2563EB';
const BG = '#FAFAFA';
const TEXT = '#18181B';
const MUTED = '#71717A';
const BORDER = '#E5E7EB';
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const highlightedPlan = pricingPlans.find((p) => p.highlighted) ?? pricingPlans[1];

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: BG,
    color: TEXT,
    fontFamily: FONT,
  },

  /* ── Hero ─────────────────────────────────────── */
  heroSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '6rem 1.5rem',
    textAlign: 'center',
  },
  headline: {
    fontFamily: FONT,
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 200,
    lineHeight: 1.15,
    letterSpacing: '0.05em',
    margin: '0 0 1.5rem',
    color: TEXT,
  },
  subtitle: {
    fontFamily: FONT,
    fontSize: '1rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: MUTED,
    margin: '0 0 2.5rem',
    letterSpacing: '0.02em',
  },
  heroCta: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '0.85rem 2.5rem',
    background: ACCENT,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'transform 0.4s ease-in-out',
  },

  /* ── Pricing ──────────────────────────────────── */
  pricingSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '6rem 1.5rem',
    textAlign: 'center',
  },
  sectionHeading: {
    fontFamily: FONT,
    fontSize: '1.5rem',
    fontWeight: 200,
    letterSpacing: '0.05em',
    color: TEXT,
    margin: '0 0 3rem',
  },
  pricingCard: {
    maxWidth: '380px',
    margin: '0 auto',
    padding: '2.5rem 2rem',
    borderTop: `1px solid ${BORDER}`,
    borderBottom: `1px solid ${BORDER}`,
    transition: 'transform 0.4s ease-in-out',
  },
  pricingName: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 300,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: MUTED,
    margin: '0 0 0.75rem',
  },
  pricingPrice: {
    fontFamily: FONT,
    fontSize: '2.5rem',
    fontWeight: 200,
    color: TEXT,
    lineHeight: 1,
    margin: '0 0 0.25rem',
  },
  pricingPeriod: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 300,
    color: MUTED,
    margin: '0 0 2rem',
  },
  pricingFeature: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 300,
    color: MUTED,
    padding: '0.35rem 0',
    letterSpacing: '0.02em',
  },
  pricingCta: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '0.75rem 2rem',
    background: 'transparent',
    color: ACCENT,
    border: `1px solid ${BORDER}`,
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    marginTop: '2rem',
    transition: 'transform 0.4s ease-in-out',
  },

  /* ── Testimonials ─────────────────────────────── */
  testimonialSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '6rem 1.5rem',
    textAlign: 'center',
  },
  testimonialQuote: {
    fontFamily: FONT,
    fontSize: '1.05rem',
    fontWeight: 300,
    fontStyle: 'italic',
    lineHeight: 1.8,
    color: MUTED,
    margin: '0 0 2rem',
    letterSpacing: '0.02em',
  },
  testimonialName: {
    fontFamily: FONT,
    fontSize: '0.8rem',
    fontWeight: 400,
    color: TEXT,
    margin: '0 0 0.15rem',
    letterSpacing: '0.05em',
  },
  testimonialRole: {
    fontFamily: FONT,
    fontSize: '0.75rem',
    fontWeight: 300,
    color: MUTED,
    margin: 0,
    letterSpacing: '0.03em',
  },
  dotNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.6rem',
    marginTop: '2.5rem',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'background 0.4s ease-in-out',
  },

  /* ── FAQ ──────────────────────────────────────── */
  faqSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '6rem 1.5rem',
  },
  faqItem: {
    borderBottom: `1px solid ${BORDER}`,
    padding: '1.25rem 0',
  },
  faqQuestion: {
    fontFamily: FONT,
    fontSize: '0.9rem',
    fontWeight: 300,
    letterSpacing: '0.03em',
    color: TEXT,
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqToggle: {
    color: MUTED,
    fontSize: '1rem',
    fontWeight: 200,
    flexShrink: 0,
    marginLeft: '1rem',
  },
  faqAnswer: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 300,
    color: MUTED,
    lineHeight: 1.8,
    marginTop: '0.75rem',
    letterSpacing: '0.01em',
  },

  /* ── Email Signup ─────────────────────────────── */
  signupSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '6rem 1.5rem',
    textAlign: 'center',
  },
  signupForm: {
    display: 'flex',
    gap: '0.75rem',
    maxWidth: '420px',
    margin: '0 auto',
  },
  signupInput: {
    flex: 1,
    fontFamily: FONT,
    padding: '0.8rem 1rem',
    background: 'transparent',
    border: `1px solid ${BORDER}`,
    borderRadius: '4px',
    color: TEXT,
    fontSize: '0.85rem',
    fontWeight: 300,
    letterSpacing: '0.02em',
    outline: 'none',
    transition: 'border-color 0.4s ease-in-out',
  },
  signupButton: {
    fontFamily: FONT,
    padding: '0.8rem 1.5rem',
    background: ACCENT,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'transform 0.4s ease-in-out',
    whiteSpace: 'nowrap',
  },
  successMessage: {
    fontFamily: FONT,
    fontSize: '0.9rem',
    fontWeight: 300,
    color: ACCENT,
    letterSpacing: '0.05em',
  },
};

export default function NeoMinimalLanding() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = testimonials[activeTestimonial];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page} data-testid="neo-minimal-landing">
      {/* ── Hero ──────────────────────────────────── */}
      <div style={styles.heroSection} data-section="hero">
        <h1 style={styles.headline}>{heroData.headline}</h1>
        <p style={styles.subtitle}>{heroData.subheadline}</p>
        <button
          style={styles.heroCta}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.01)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {heroData.ctaPrimary}
        </button>
      </div>

      {/* ── Pricing ───────────────────────────────── */}
      <div style={styles.pricingSection} data-section="pricing">
        <h2 style={styles.sectionHeading}>Pricing</h2>
        <div
          style={styles.pricingCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.01)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={styles.pricingName}>{highlightedPlan.name}</div>
          <div style={styles.pricingPrice}>
            {highlightedPlan.price}
            <span style={{ fontSize: '1rem', fontWeight: 300, color: MUTED }}>
              {highlightedPlan.period}
            </span>
          </div>
          <div style={styles.pricingPeriod}>Everything you need</div>
          {highlightedPlan.features.map((f) => (
            <div key={f} style={styles.pricingFeature}>
              {f}
            </div>
          ))}
          <button
            style={styles.pricingCta}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* ── Testimonials ──────────────────────────── */}
      <div style={styles.testimonialSection} data-section="testimonials">
        <h2 style={styles.sectionHeading}>Testimonials</h2>
        <p style={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
        <p style={styles.testimonialName}>{t.name}</p>
        <p style={styles.testimonialRole}>
          {t.role}, {t.company}
        </p>
        <div style={styles.dotNav}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              style={{
                ...styles.dot,
                background: i === activeTestimonial ? ACCENT : BORDER,
              }}
              onClick={() => setActiveTestimonial(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────── */}
      <div style={styles.faqSection} data-section="faq">
        <h2 style={{ ...styles.sectionHeading, textAlign: 'center' }}>FAQ</h2>
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

      {/* ── Email Signup ──────────────────────────── */}
      <div style={styles.signupSection} data-section="signup">
        <h2 style={styles.sectionHeading}>Stay Updated</h2>
        {submitted ? (
          <p style={styles.successMessage} role="status" aria-live="polite">{emailSignup.successMessage}</p>
        ) : (
          <form style={styles.signupForm} onSubmit={handleEmailSubmit}>
            <input
              style={styles.signupInput}
              type="email"
              placeholder={emailSignup.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = BORDER;
              }}
            />
            <button
              type="submit"
              style={styles.signupButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {emailSignup.buttonText}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
