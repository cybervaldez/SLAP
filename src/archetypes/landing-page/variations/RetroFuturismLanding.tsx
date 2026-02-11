import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

const BG = '#0F0B1A';
const SURFACE = '#1A1528';
const TEXT = '#E8E0F0';
const MUTED = '#9B8FB8';
const TEAL = '#14B8A6';
const PURPLE = '#8B5CF6';
const PINK = '#EC4899';
const GRADIENT = `linear-gradient(135deg, ${TEAL}, ${PURPLE}, ${PINK})`;
const GLOW = '0 0 30px rgba(139,92,246,0.3)';
const GLOW_INTENSE = '0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(139,92,246,0.2)';
const BOUNCE = '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: BG,
    color: TEXT,
    fontFamily: FONT,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(20,184,166,0.06) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(236,72,153,0.05) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  /* ── Hero ─────────────────────────────────────── */
  heroSection: {
    position: 'relative',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '8rem 2rem 6rem',
    textAlign: 'center',
    zIndex: 1,
  },
  heroOrb: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: GRADIENT,
    filter: 'blur(120px)',
    opacity: 0.15,
    top: '-100px',
    right: '-150px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  heroHeadline: {
    fontFamily: FONT,
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    margin: '0 0 1.5rem',
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontFamily: FONT,
    fontSize: '1.15rem',
    fontWeight: 400,
    lineHeight: 1.7,
    color: MUTED,
    margin: '0 0 2.5rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heroCta: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: GRADIENT,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    boxShadow: GLOW,
    transition: `transform ${BOUNCE}, box-shadow ${BOUNCE}`,
  },

  /* ── Pricing ──────────────────────────────────── */
  pricingSection: {
    position: 'relative',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '6rem 2rem',
    textAlign: 'center',
    zIndex: 1,
  },
  sectionHeading: {
    fontFamily: FONT,
    fontSize: '2.2rem',
    fontWeight: 700,
    color: TEXT,
    margin: '0 0 3rem',
  },
  pricingGrid: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  pricingCardOuter: {
    borderRadius: '24px',
    padding: '2px',
    background: `linear-gradient(135deg, ${TEAL}40, ${PURPLE}40, ${PINK}40)`,
    flex: '1 1 280px',
    maxWidth: '320px',
    transition: `transform ${BOUNCE}, box-shadow ${BOUNCE}`,
    boxShadow: '0 0 20px rgba(139,92,246,0.1)',
  },
  pricingCardOuterFeatured: {
    borderRadius: '24px',
    padding: '2px',
    background: GRADIENT,
    flex: '1 1 280px',
    maxWidth: '320px',
    transition: `transform ${BOUNCE}, box-shadow ${BOUNCE}`,
    boxShadow: GLOW,
  },
  pricingCardInner: {
    borderRadius: '22px',
    background: SURFACE,
    padding: '2.5rem 2rem',
    height: '100%',
    boxSizing: 'border-box',
  },
  pricingCardInnerFeatured: {
    borderRadius: '22px',
    background: `linear-gradient(160deg, ${SURFACE}, rgba(139,92,246,0.15))`,
    padding: '2.5rem 2rem',
    height: '100%',
    boxSizing: 'border-box',
  },
  pricingName: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: MUTED,
    margin: '0 0 0.75rem',
  },
  pricingPrice: {
    fontFamily: FONT,
    fontSize: '3rem',
    fontWeight: 800,
    color: TEXT,
    lineHeight: 1,
    margin: '0 0 0.25rem',
  },
  pricingPeriod: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 400,
    color: MUTED,
    margin: '0 0 1.5rem',
  },
  pricingFeature: {
    fontFamily: FONT,
    fontSize: '0.9rem',
    fontWeight: 400,
    color: MUTED,
    padding: '0.35rem 0',
    textAlign: 'left',
  },
  pricingCta: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '0.75rem 2rem',
    background: 'transparent',
    color: PURPLE,
    border: `1px solid ${PURPLE}60`,
    borderRadius: '9999px',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: `transform ${BOUNCE}, box-shadow ${BOUNCE}, background ${BOUNCE}`,
  },
  pricingCtaFeatured: {
    fontFamily: FONT,
    display: 'inline-block',
    padding: '0.75rem 2rem',
    background: GRADIENT,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    marginTop: '1.5rem',
    boxShadow: GLOW,
    transition: `transform ${BOUNCE}, box-shadow ${BOUNCE}`,
  },

  /* ── Testimonials ─────────────────────────────── */
  testimonialSection: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '6rem 2rem',
    textAlign: 'center',
    zIndex: 1,
  },
  testimonialCard: {
    borderRadius: '20px',
    background: SURFACE,
    padding: '2.5rem 2rem',
    boxShadow: '0 0 25px rgba(139,92,246,0.15)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  testimonialAvatarRing: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: GRADIENT,
    padding: '3px',
    margin: '0 auto 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialAvatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: SURFACE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FONT,
    fontSize: '1.2rem',
    fontWeight: 700,
    color: PURPLE,
  },
  testimonialQuote: {
    fontFamily: FONT,
    fontSize: '1.1rem',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.7,
    color: TEXT,
    margin: '0 0 1.5rem',
  },
  testimonialName: {
    fontFamily: FONT,
    fontSize: '0.9rem',
    fontWeight: 600,
    color: TEXT,
    margin: '0 0 0.25rem',
  },
  testimonialRole: {
    fontFamily: FONT,
    fontSize: '0.8rem',
    fontWeight: 400,
    color: MUTED,
    margin: 0,
  },
  dotNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '2rem',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: `background ${BOUNCE}, box-shadow ${BOUNCE}, transform ${BOUNCE}`,
  },
  dotActive: {
    background: GRADIENT,
    boxShadow: '0 0 12px rgba(139,92,246,0.5)',
  },
  dotInactive: {
    background: `${PURPLE}30`,
  },

  /* ── FAQ ──────────────────────────────────────── */
  faqSection: {
    position: 'relative',
    maxWidth: '700px',
    margin: '0 auto',
    padding: '6rem 2rem',
    zIndex: 1,
  },
  faqItem: {
    marginBottom: '1rem',
  },
  faqQuestion: {
    fontFamily: FONT,
    fontSize: '0.95rem',
    fontWeight: 600,
    color: TEXT,
    background: SURFACE,
    border: 'none',
    borderRadius: '9999px',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: `box-shadow ${BOUNCE}`,
    boxShadow: '0 0 15px rgba(139,92,246,0.05)',
  },
  faqQuestionOpen: {
    fontFamily: FONT,
    fontSize: '0.95rem',
    fontWeight: 600,
    color: TEXT,
    background: SURFACE,
    border: 'none',
    borderRadius: '9999px',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: `box-shadow ${BOUNCE}`,
    boxShadow: GLOW,
  },
  faqToggle: {
    fontFamily: FONT,
    fontSize: '0.85rem',
    fontWeight: 700,
    flexShrink: 0,
    marginLeft: '1rem',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: GRADIENT,
    color: '#FFFFFF',
    lineHeight: 1,
  },
  faqAnswer: {
    fontFamily: FONT,
    fontSize: '0.9rem',
    fontWeight: 400,
    color: MUTED,
    lineHeight: 1.7,
    padding: '1rem 1.5rem 0.5rem',
  },

  /* ── Email Signup ─────────────────────────────── */
  signupSection: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '6rem 2rem',
    textAlign: 'center',
    zIndex: 1,
  },
  signupHeading: {
    fontFamily: FONT,
    fontSize: '2.2rem',
    fontWeight: 700,
    color: TEXT,
    margin: '0 0 1rem',
  },
  signupSubtext: {
    fontFamily: FONT,
    fontSize: '1rem',
    fontWeight: 400,
    color: MUTED,
    margin: '0 0 2.5rem',
  },
  signupForm: {
    display: 'flex',
    gap: '0.75rem',
    maxWidth: '480px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  signupInputOuter: {
    flex: '1 1 260px',
    borderRadius: '9999px',
    padding: '2px',
    background: `linear-gradient(135deg, ${TEAL}50, ${PURPLE}50, ${PINK}50)`,
  },
  signupInput: {
    fontFamily: FONT,
    width: '100%',
    padding: '0.9rem 1.5rem',
    background: SURFACE,
    border: 'none',
    borderRadius: '9999px',
    color: TEXT,
    fontSize: '0.95rem',
    fontWeight: 400,
    outline: 'none',
    boxSizing: 'border-box',
  },
  signupButton: {
    fontFamily: FONT,
    padding: '0.9rem 2rem',
    background: GRADIENT,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '0.95rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    boxShadow: GLOW,
    transition: `transform ${BOUNCE}, box-shadow ${BOUNCE}`,
    whiteSpace: 'nowrap',
  },
  successMessage: {
    fontFamily: FONT,
    fontSize: '1.1rem',
    fontWeight: 600,
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
};

export default function RetroFuturismLanding() {
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
    <div style={styles.page} data-testid="retro-futurism-landing">
      {/* Gradient overlay */}
      <div style={styles.gradientOverlay} />

      {/* ── Hero ──────────────────────────────────── */}
      <section style={styles.heroSection} data-section="hero">
        <div style={styles.heroOrb} />
        <h1 style={styles.heroHeadline}>{heroData.headline}</h1>
        <p style={styles.heroSub}>{heroData.subheadline}</p>
        <button
          style={styles.heroCta}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = GLOW_INTENSE;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = GLOW;
          }}
        >
          {heroData.ctaPrimary}
        </button>
      </section>

      {/* ── Pricing ───────────────────────────────── */}
      <section style={styles.pricingSection} data-section="pricing">
        <h2 style={styles.sectionHeading}>Pricing</h2>
        <div style={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              style={
                plan.highlighted
                  ? styles.pricingCardOuterFeatured
                  : styles.pricingCardOuter
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = plan.highlighted
                  ? GLOW_INTENSE
                  : GLOW;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = plan.highlighted
                  ? GLOW
                  : '0 0 20px rgba(139,92,246,0.1)';
              }}
            >
              <div
                style={
                  plan.highlighted
                    ? styles.pricingCardInnerFeatured
                    : styles.pricingCardInner
                }
              >
                <div style={styles.pricingName}>{plan.name}</div>
                <div style={styles.pricingPrice}>
                  {plan.price}
                  <span style={{ fontSize: '1rem', fontWeight: 400, color: MUTED }}>
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
                  style={
                    plan.highlighted
                      ? styles.pricingCtaFeatured
                      : styles.pricingCta
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    if (plan.highlighted) {
                      e.currentTarget.style.boxShadow = GLOW_INTENSE;
                    } else {
                      e.currentTarget.style.background = `${PURPLE}20`;
                      e.currentTarget.style.boxShadow = `0 0 20px rgba(139,92,246,0.2)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (plan.highlighted) {
                      e.currentTarget.style.boxShadow = GLOW;
                    } else {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {plan.highlighted ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section style={styles.testimonialSection} data-section="testimonials">
        <h2 style={styles.sectionHeading}>Testimonials</h2>
        <div style={styles.testimonialCard}>
          <div style={styles.testimonialAvatarRing}>
            <div style={styles.testimonialAvatarInner}>
              {t.avatarInitial}
            </div>
          </div>
          <p style={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
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
                ...(i === activeTestimonial ? styles.dotActive : styles.dotInactive),
              }}
              onClick={() => setActiveTestimonial(i)}
              aria-label={`Testimonial ${i + 1}`}
              onMouseEnter={(e) => {
                if (i !== activeTestimonial) {
                  e.currentTarget.style.transform = 'scale(1.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section style={styles.faqSection} data-section="faq">
        <h2 style={{ ...styles.sectionHeading, textAlign: 'center' }}>FAQ</h2>
        {faqItems.map((item, i) => (
          <div key={i} style={styles.faqItem}>
            <button
              style={openFaq === i ? styles.faqQuestionOpen : styles.faqQuestion}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              onMouseEnter={(e) => {
                if (openFaq !== i) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (openFaq !== i) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(139,92,246,0.05)';
                }
              }}
            >
              <span>{item.question}</span>
              <span style={styles.faqToggle}>
                {openFaq === i ? '\u2212' : '+'}
              </span>
            </button>
            {openFaq === i && (
              <div style={styles.faqAnswer}>{item.answer}</div>
            )}
          </div>
        ))}
      </section>

      {/* ── Email Signup ──────────────────────────── */}
      <section style={styles.signupSection} data-section="signup">
        <h2 style={styles.signupHeading}>Beam me up</h2>
        <p style={styles.signupSubtext}>Join the future. Get early access delivered straight to your inbox.</p>
        {submitted ? (
          <p style={styles.successMessage}>{emailSignup.successMessage}</p>
        ) : (
          <form style={styles.signupForm} onSubmit={handleEmailSubmit}>
            <div style={styles.signupInputOuter}>
              <input
                style={styles.signupInput}
                type="email"
                placeholder={emailSignup.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              style={styles.signupButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = GLOW_INTENSE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = GLOW;
              }}
            >
              {emailSignup.buttonText}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
