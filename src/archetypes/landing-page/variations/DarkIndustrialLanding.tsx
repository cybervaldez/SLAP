import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

const ACCENT = '#D4A574';
const BG = '#0A0A0F';
const CARD_BG = '#12121A';
const BORDER = '#1E293B';
const FONT_MONO = "'Courier New', monospace";

const styles: Record<string, React.CSSProperties> = {
  /* Page */
  page: {
    minHeight: '100vh',
    background: BG,
    color: '#E2E8F0',
    fontFamily: FONT_MONO,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  /* Hero */
  heroSection: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: '6rem 2rem 4rem',
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
  },
  heroLabel: {
    fontFamily: FONT_MONO,
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: ACCENT,
    margin: 0,
  },
  heroHeadline: {
    fontFamily: FONT_MONO,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    color: '#F8FAFC',
    margin: 0,
  },
  heroUnderline: {
    width: '80px',
    height: '2px',
    background: ACCENT,
    border: 'none',
    margin: 0,
  },
  heroSub: {
    fontFamily: FONT_MONO,
    fontSize: '0.9rem',
    fontWeight: 400,
    lineHeight: 1.7,
    color: '#94A3B8',
    maxWidth: '560px',
    margin: 0,
  },
  heroCtas: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  heroPrimary: {
    fontFamily: FONT_MONO,
    display: 'inline-block',
    padding: '0.85rem 2rem',
    background: ACCENT,
    color: '#0A0A0F',
    border: `1px solid ${ACCENT}`,
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.15s ease, color 0.15s ease',
  },
  heroSecondary: {
    fontFamily: FONT_MONO,
    display: 'inline-block',
    padding: '0.85rem 2rem',
    background: 'transparent',
    color: '#94A3B8',
    border: `1px solid ${BORDER}`,
    fontSize: '0.85rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, color 0.15s ease',
  },

  /* Shared section */
  section: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    padding: '4rem 2rem',
  },
  sectionLabel: {
    fontFamily: FONT_MONO,
    fontSize: '0.7rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: ACCENT,
    marginBottom: '0.75rem',
  },
  sectionHeading: {
    fontFamily: FONT_MONO,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#F8FAFC',
    marginBottom: '2.5rem',
    letterSpacing: '-0.01em',
  },
  divider: {
    width: '100%',
    height: '1px',
    background: BORDER,
    border: 'none',
    margin: 0,
  },

  /* Pricing */
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1px',
    background: BORDER,
  },
  pricingCard: {
    background: CARD_BG,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: `1px solid ${BORDER}`,
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  pricingCardHighlighted: {
    background: CARD_BG,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: `1px solid ${ACCENT}`,
    boxShadow: `0 0 20px rgba(212,165,116,0.08)`,
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  pricingName: {
    fontFamily: FONT_MONO,
    fontSize: '0.7rem',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#94A3B8',
    margin: 0,
  },
  pricingPrice: {
    fontFamily: FONT_MONO,
    fontSize: '2.25rem',
    fontWeight: 700,
    color: '#F8FAFC',
    lineHeight: 1,
    margin: '0.5rem 0 0.25rem',
  },
  pricingPeriod: {
    fontFamily: FONT_MONO,
    fontSize: '0.75rem',
    color: '#64748B',
    marginBottom: '1.25rem',
  },
  pricingFeature: {
    fontFamily: FONT_MONO,
    fontSize: '0.8rem',
    color: '#94A3B8',
    padding: '0.25rem 0',
    borderBottom: `1px solid ${BORDER}`,
  },
  pricingCta: {
    fontFamily: FONT_MONO,
    width: '100%',
    padding: '0.75rem',
    background: 'transparent',
    color: ACCENT,
    border: `1px solid ${ACCENT}`,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '1.25rem',
    transition: 'background 0.15s ease, color 0.15s ease',
  },

  /* Testimonials */
  testimonialList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  testimonialCard: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    padding: '1.5rem 2rem',
    transition: 'border-color 0.15s ease',
  },
  testimonialQuote: {
    fontFamily: FONT_MONO,
    fontSize: '0.9rem',
    color: '#CBD5E1',
    lineHeight: 1.7,
    margin: '0 0 1rem',
  },
  testimonialMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  testimonialInitial: {
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: `1px solid ${ACCENT}`,
    color: ACCENT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FONT_MONO,
    fontWeight: 700,
    fontSize: '0.8rem',
    flexShrink: 0,
  },
  testimonialName: {
    fontFamily: FONT_MONO,
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#F8FAFC',
    margin: 0,
  },
  testimonialRole: {
    fontFamily: FONT_MONO,
    fontSize: '0.7rem',
    color: '#64748B',
    margin: 0,
  },

  /* FAQ */
  faqList: {
    display: 'flex',
    flexDirection: 'column',
  },
  faqItem: {
    borderBottom: `1px solid ${BORDER}`,
    padding: '1.25rem 0',
  },
  faqQuestion: {
    fontFamily: FONT_MONO,
    fontSize: '0.9rem',
    fontWeight: 400,
    color: '#F8FAFC',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    transition: 'color 0.15s ease',
  },
  faqToggle: {
    fontFamily: FONT_MONO,
    color: ACCENT,
    fontSize: '0.85rem',
    fontWeight: 400,
    flexShrink: 0,
    letterSpacing: 0,
  },
  faqAnswer: {
    fontFamily: FONT_MONO,
    fontSize: '0.8rem',
    color: '#94A3B8',
    lineHeight: 1.7,
    marginTop: '1rem',
    paddingLeft: '1.5rem',
    borderLeft: `2px solid ${BORDER}`,
  },

  /* Email signup */
  signupWrapper: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    padding: '4rem 2rem 6rem',
  },
  signupForm: {
    display: 'flex',
    gap: '0',
    maxWidth: '560px',
  },
  signupInput: {
    flex: 1,
    fontFamily: FONT_MONO,
    padding: '0.85rem 1rem',
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRight: 'none',
    color: '#F8FAFC',
    fontSize: '0.85rem',
    outline: 'none',
    letterSpacing: '0.02em',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  signupButton: {
    fontFamily: FONT_MONO,
    padding: '0.85rem 1.5rem',
    background: ACCENT,
    color: '#0A0A0F',
    border: `1px solid ${ACCENT}`,
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.15s ease, color 0.15s ease',
    whiteSpace: 'nowrap',
  },
  signupSuccess: {
    fontFamily: FONT_MONO,
    fontSize: '0.85rem',
    color: ACCENT,
    letterSpacing: '0.05em',
  },
};

export default function DarkIndustrialLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page} data-testid="dark-industrial-landing">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={styles.heroSection} data-section="hero">
        <div style={styles.heroContent}>
          <p style={styles.heroLabel}>PLATFORM</p>
          <h1 style={styles.heroHeadline}>{heroData.headline}</h1>
          <hr style={styles.heroUnderline} />
          <p style={styles.heroSub}>{heroData.subheadline}</p>
          <div style={styles.heroCtas}>
            <button
              style={styles.heroPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.color = '#0A0A0F';
              }}
            >
              {heroData.ctaPrimary}
            </button>
            <button
              style={styles.heroSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = '#94A3B8';
              }}
            >
              {heroData.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ── Pricing ──────────────────────────────────────────── */}
      <div style={styles.section} data-section="pricing">
        <div style={styles.sectionLabel}>PRICING</div>
        <h2 style={styles.sectionHeading}>Select a plan</h2>
        <div style={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              style={
                plan.highlighted
                  ? styles.pricingCardHighlighted
                  : styles.pricingCard
              }
              onMouseEnter={(e) => {
                if (!plan.highlighted) {
                  e.currentTarget.style.borderColor = ACCENT;
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.highlighted) {
                  e.currentTarget.style.borderColor = BORDER;
                }
              }}
            >
              <div style={styles.pricingName}>{plan.name}</div>
              <div style={styles.pricingPrice}>
                {plan.price}
                <span style={{ fontSize: '0.85rem', fontWeight: 400, color: '#64748B' }}>
                  {plan.period}
                </span>
              </div>
              <div style={styles.pricingPeriod}>billed monthly</div>
              {plan.features.map((f) => (
                <div key={f} style={styles.pricingFeature}>
                  {f}
                </div>
              ))}
              <button
                style={styles.pricingCta}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = ACCENT;
                  e.currentTarget.style.color = '#0A0A0F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = ACCENT;
                }}
              >
                {plan.highlighted ? 'GET STARTED' : 'SELECT'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ── Testimonials ─────────────────────────────────────── */}
      <div style={styles.section} data-section="testimonials">
        <div style={styles.sectionLabel}>TESTIMONIALS</div>
        <h2 style={styles.sectionHeading}>Field reports</h2>
        <div style={styles.testimonialList}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={styles.testimonialCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
              }}
            >
              <p style={styles.testimonialQuote}>{'> '}{t.quote}</p>
              <div style={styles.testimonialMeta}>
                <div style={styles.testimonialInitial}>{t.avatarInitial}</div>
                <div>
                  <p style={styles.testimonialName}>{t.name}</p>
                  <p style={styles.testimonialRole}>
                    {t.role} // {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <div style={styles.section} data-section="faq">
        <div style={styles.sectionLabel}>FAQ</div>
        <h2 style={styles.sectionHeading}>Technical queries</h2>
        <div style={styles.faqList}>
          {faqItems.map((item, i) => (
            <div key={i} style={styles.faqItem}>
              <button
                style={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{item.question}</span>
                <span style={styles.faqToggle}>
                  {openFaq === i ? '[-]' : '[+]'}
                </span>
              </button>
              {openFaq === i && (
                <div style={styles.faqAnswer}>{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* ── Email Signup ──────────────────────────────────────── */}
      <div style={styles.signupWrapper} data-section="signup">
        <div style={styles.sectionLabel}>SUBSCRIBE</div>
        <h2 style={styles.sectionHeading}>Get notified</h2>
        {submitted ? (
          <p style={styles.signupSuccess} role="status" aria-live="polite">{emailSignup.successMessage}</p>
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
                e.currentTarget.style.boxShadow = `0 0 12px rgba(212,165,116,0.15)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              style={styles.signupButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.color = '#0A0A0F';
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
