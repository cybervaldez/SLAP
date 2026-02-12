import React, { useState } from 'react';
import { heroData, testimonials, pricingPlans, faqItems, emailSignup } from '../data';

/* ── Art Deco Design Tokens ── */
const BG = '#FAF7F0';
const BG_ALT = '#F0EBE0';
const TEXT = '#1C1917';
const TEXT_SEC = '#78716C';
const GOLD = '#B8860B';
const GOLD_LIGHT = '#D4A017';
const NAVY = '#1B2838';
const CREAM = '#FAF7F0';
const FONT_DISPLAY = "'Georgia', 'Palatino', 'Times New Roman', serif";
const FONT_BODY = "'Optima', 'Candara', 'Segoe UI', sans-serif";
const FONT_MONO = "'Courier New', monospace";

const btnBase: React.CSSProperties = {
  fontFamily: FONT_BODY, borderRadius: '0', fontWeight: 700,
  letterSpacing: '0.08em', textTransform: 'uppercase',
  cursor: 'pointer', transition: 'background 0.25s ease, color 0.25s ease',
};

/* ── Styles ── */
const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', background: BG, color: TEXT,
    fontFamily: FONT_BODY, position: 'relative', overflow: 'hidden',
  },

  /* Hero */
  heroSection: {
    background: NAVY, color: CREAM,
    padding: '6rem 2rem 5rem', position: 'relative', overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: [
      `linear-gradient(135deg, ${GOLD}0A 25%, transparent 25%)`,
      `linear-gradient(-135deg, ${GOLD}0A 25%, transparent 25%)`,
      `linear-gradient(135deg, transparent 75%, ${GOLD}0A 75%)`,
      `linear-gradient(-135deg, transparent 75%, ${GOLD}0A 75%)`,
    ].join(', '),
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 0 30px, 30px -30px, 30px 0',
  },
  heroInner: {
    maxWidth: '900px', margin: '0 auto',
    position: 'relative', zIndex: 1, textAlign: 'center',
  },
  heroOverline: {
    fontFamily: FONT_MONO, fontSize: '0.85rem', letterSpacing: '0.2em',
    textTransform: 'uppercase', color: GOLD_LIGHT, marginBottom: '1.5rem', display: 'block',
  },
  heroHeadline: {
    fontFamily: FONT_DISPLAY, fontSize: 'clamp(3rem, 8vw, 4.5rem)',
    fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0, color: CREAM,
  },
  heroAccent: { color: GOLD_LIGHT, fontWeight: 700 },
  heroSubtitle: {
    fontFamily: FONT_BODY, fontSize: '1.15rem', fontWeight: 400,
    lineHeight: 1.7, color: `${CREAM}bb`, maxWidth: '560px', margin: '1.5rem auto 0',
  },
  heroCta: {
    ...btnBase, display: 'inline-block', padding: '1rem 2.5rem',
    background: GOLD, color: NAVY, border: `2px solid ${GOLD}`, fontSize: '0.95rem',
  },
  heroCtaSec: {
    ...btnBase, display: 'inline-block', padding: '1rem 2.5rem',
    background: 'transparent', color: GOLD_LIGHT, border: `2px solid ${GOLD}`,
    fontSize: '0.95rem', marginLeft: '1.25rem',
  },

  /* Ornament */
  ornament: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '0.75rem', margin: '2rem 0',
  },
  ornLine: {
    display: 'inline-block', width: '80px', height: '1px',
    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
  },
  ornDiamond: {
    display: 'inline-block', width: '8px', height: '8px',
    background: GOLD, transform: 'rotate(45deg)',
  },
  ornDot: {
    display: 'inline-block', width: '4px', height: '4px',
    borderRadius: '50%', background: GOLD,
  },

  /* Pricing */
  pricingSection: { padding: '5rem 2rem', background: BG, position: 'relative' },
  pricingInner: { maxWidth: '1100px', margin: '0 auto', textAlign: 'center' },
  secHead: {
    fontFamily: FONT_DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400, color: TEXT, marginBottom: '0.5rem', letterSpacing: '0.02em',
  },
  secSub: { fontFamily: FONT_BODY, fontSize: '1.05rem', color: TEXT_SEC, marginBottom: '3rem' },
  pricingGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1.35fr 1fr',
    gap: '2rem', alignItems: 'start',
  },
  stepOuter: { border: `2px solid ${GOLD}`, padding: '3px', borderRadius: '0' },
  stepOuterF: { border: `2px solid ${GOLD_LIGHT}`, padding: '3px', borderRadius: '0' },
  stepInner: {
    border: `1px solid ${GOLD}`, padding: '2rem 1.75rem', borderRadius: '0',
    background: '#FFFFFF', transition: 'box-shadow 0.25s ease',
  },
  stepInnerF: {
    border: `1px solid ${GOLD_LIGHT}`, padding: '2.5rem 2rem', borderRadius: '0',
    background: NAVY, color: CREAM, transition: 'box-shadow 0.25s ease',
  },
  pName: {
    fontFamily: FONT_DISPLAY, fontSize: '1rem', fontWeight: 400,
    textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', color: TEXT,
  },
  pNameF: {
    fontFamily: FONT_DISPLAY, fontSize: '1rem', fontWeight: 400,
    textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', color: GOLD_LIGHT,
  },
  pPrice: {
    fontFamily: FONT_DISPLAY, fontSize: '2.8rem', fontWeight: 400,
    lineHeight: 1, margin: '0.5rem 0', color: TEXT,
  },
  pPriceF: {
    fontFamily: FONT_DISPLAY, fontSize: '3.2rem', fontWeight: 400,
    lineHeight: 1, margin: '0.5rem 0', color: CREAM,
  },
  pPeriod: { fontFamily: FONT_BODY, fontSize: '0.85rem', color: TEXT_SEC, marginBottom: '1.5rem' },
  pPeriodF: { fontFamily: FONT_BODY, fontSize: '0.85rem', color: `${CREAM}99`, marginBottom: '1.5rem' },
  pFeat: {
    fontFamily: FONT_BODY, fontSize: '0.9rem', padding: '0.4rem 0',
    color: TEXT_SEC, display: 'flex', alignItems: 'center', gap: '0.6rem',
  },
  pFeatF: {
    fontFamily: FONT_BODY, fontSize: '0.9rem', padding: '0.4rem 0',
    color: `${CREAM}cc`, display: 'flex', alignItems: 'center', gap: '0.6rem',
  },
  dia: {
    display: 'inline-block', width: '5px', height: '5px',
    background: GOLD, transform: 'rotate(45deg)', flexShrink: 0,
  },
  diaF: {
    display: 'inline-block', width: '5px', height: '5px',
    background: GOLD_LIGHT, transform: 'rotate(45deg)', flexShrink: 0,
  },
  pCta: {
    ...btnBase, width: '100%', padding: '0.85rem', background: 'transparent',
    color: GOLD, border: `2px solid ${GOLD}`, fontSize: '0.9rem', marginTop: '1.5rem',
  },
  pCtaF: {
    ...btnBase, width: '100%', padding: '1rem', background: GOLD,
    color: NAVY, border: `2px solid ${GOLD}`, fontSize: '0.95rem', marginTop: '1.5rem',
  },

  /* Testimonials */
  testSection: { padding: '5rem 2rem', background: BG_ALT, position: 'relative' },
  testInner: { maxWidth: '1000px', margin: '0 auto', textAlign: 'center' },
  testHead: {
    fontFamily: FONT_DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 400, color: TEXT, marginBottom: '3rem', letterSpacing: '0.02em',
  },
  testGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '2rem', textAlign: 'left',
  },
  testQuote: {
    fontFamily: FONT_DISPLAY, fontSize: '1.1rem', fontStyle: 'italic',
    lineHeight: 1.7, margin: '0 0 1.5rem', color: TEXT,
  },
  testAttrib: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  testAvatar: {
    width: '40px', height: '40px', borderRadius: '0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: '1rem',
    background: NAVY, color: GOLD_LIGHT, border: `1px solid ${GOLD}`,
  },
  testName: {
    fontFamily: FONT_BODY, fontSize: '0.9rem', fontWeight: 700, margin: 0, color: TEXT,
  },
  testRole: { fontFamily: FONT_BODY, fontSize: '0.8rem', margin: 0, color: TEXT_SEC },

  /* FAQ */
  faqSection: { padding: '5rem 2rem', background: BG, position: 'relative' },
  faqInner: { maxWidth: '1000px', margin: '0 auto' },
  faqHead: {
    fontFamily: FONT_DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400,
    color: TEXT, marginBottom: '3rem', textAlign: 'center', letterSpacing: '0.02em',
  },
  faqItem: {
    display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '1.5rem',
    padding: '2rem 0', borderBottom: `1px solid ${GOLD}44`, alignItems: 'start',
  },
  faqNum: {
    fontFamily: FONT_DISPLAY, fontSize: '1.8rem', fontWeight: 400,
    color: GOLD, lineHeight: 1, letterSpacing: '0.02em',
  },
  faqQ: {
    fontFamily: FONT_DISPLAY, fontSize: '1.05rem', fontWeight: 700,
    color: TEXT, lineHeight: 1.4, margin: 0,
  },
  faqA: {
    fontFamily: FONT_BODY, fontSize: '0.95rem', color: TEXT_SEC, lineHeight: 1.7, margin: 0,
  },

  /* Email Signup */
  emailSection: { background: NAVY, padding: '5rem 2rem', position: 'relative' },
  emailInner: { maxWidth: '700px', margin: '0 auto', textAlign: 'center' },
  emailHead: {
    fontFamily: FONT_DISPLAY, fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400,
    color: CREAM, marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '0.02em',
  },
  emailSub: { fontFamily: FONT_BODY, fontSize: '1.05rem', color: `${CREAM}99`, marginBottom: '2.5rem' },
  emailForm: { display: 'flex', gap: '0', maxWidth: '520px', margin: '0 auto' },
  emailInput: {
    flex: 1, fontFamily: FONT_BODY, padding: '1rem 1.25rem',
    background: 'transparent', border: `2px solid ${GOLD}`, borderRight: 'none',
    borderRadius: '0', color: CREAM, fontSize: '1rem', outline: 'none',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  },
  emailBtn: {
    ...btnBase, padding: '1rem 2rem', background: GOLD, color: NAVY,
    border: `2px solid ${GOLD}`, fontSize: '0.95rem', whiteSpace: 'nowrap',
  },
  emailOk: {
    fontFamily: FONT_DISPLAY, fontSize: '1.3rem', color: GOLD_LIGHT,
    fontWeight: 400, fontStyle: 'italic',
  },
};

/* ── Ornament Divider ── */
function Ornament({ color = GOLD, style = {} }: { color?: string; style?: React.CSSProperties }) {
  const grad: React.CSSProperties = {
    ...S.ornLine, background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
  };
  return (
    <div style={{ ...S.ornament, ...style }}>
      <span style={{ ...S.ornDot, background: color }} />
      <span style={grad} />
      <span style={{ ...S.ornDiamond, background: color }} />
      <span style={grad} />
      <span style={{ ...S.ornDot, background: color }} />
    </div>
  );
}

/* ── Stepped Border Card ── */
function StepCard({ feat = false, children, innerSt = {}, outerSt = {} }: {
  feat?: boolean; children: React.ReactNode;
  innerSt?: React.CSSProperties; outerSt?: React.CSSProperties;
}) {
  return (
    <div style={{ ...(feat ? S.stepOuterF : S.stepOuter), ...outerSt }}>
      <div style={{ ...(feat ? S.stepInnerF : S.stepInner), ...innerSt }}>
        {children}
      </div>
    </div>
  );
}

/* ── Gold-accent headline (last word) ── */
function accentHeadline(text: string) {
  const w = text.split(' ');
  const last = w.pop();
  return <>{w.join(' ')} <strong style={S.heroAccent}>{last}</strong></>;
}

/* ══════════════════════════════════════════════════════════ */
export default function ArtDecoLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={S.page} data-testid="art-deco-landing">

      {/* ===== Hero ===== */}
      <section style={S.heroSection} data-section="hero">
        <div style={S.heroOverlay} />
        <div style={S.heroInner}>
          <span style={S.heroOverline}>Crafted with Precision</span>
          <h1 style={S.heroHeadline}>{accentHeadline(heroData.headline)}</h1>
          <Ornament color={GOLD_LIGHT} style={{ margin: '2rem auto' }} />
          <p style={S.heroSubtitle}>{heroData.subheadline}</p>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              style={S.heroCta}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.color = NAVY;
              }}
            >
              {heroData.ctaPrimary}
            </button>
            <button
              style={S.heroCtaSec}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.color = NAVY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = GOLD_LIGHT;
              }}
            >
              {heroData.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section style={S.pricingSection} data-section="pricing">
        <div style={S.pricingInner}>
          <h2 style={S.secHead}>Select Your Plan</h2>
          <p style={S.secSub}>Transparent pricing. No hidden fees. Cancel anytime.</p>
          <Ornament style={{ marginBottom: '3rem' }} />

          <div style={S.pricingGrid}>
            {pricingPlans.map((plan) => {
              const f = plan.highlighted;
              const ck = `pricing-${plan.name}`;
              const hov = hoveredCard === ck;
              return (
                <StepCard
                  key={plan.name}
                  feat={f}
                  outerSt={{
                    transition: 'transform 0.25s ease',
                    transform: hov ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                  innerSt={{ boxShadow: hov ? `0 8px 24px ${NAVY}22` : 'none' }}
                >
                  <div
                    onMouseEnter={() => setHoveredCard(ck)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ cursor: 'default' }}
                  >
                    <div style={f ? S.pNameF : S.pName}>{plan.name}</div>
                    <div style={f ? S.pPriceF : S.pPrice}>
                      {plan.price}
                      <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>
                        {plan.period}
                      </span>
                    </div>
                    <div style={f ? S.pPeriodF : S.pPeriod}>billed monthly</div>
                    {plan.features.map((feat) => (
                      <div key={feat} style={f ? S.pFeatF : S.pFeat}>
                        <span style={f ? S.diaF : S.dia} />
                        {feat}
                      </div>
                    ))}
                    <button
                      style={f ? S.pCtaF : S.pCta}
                      onMouseEnter={(e) => {
                        if (f) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = GOLD_LIGHT;
                        } else {
                          e.currentTarget.style.background = GOLD;
                          e.currentTarget.style.color = NAVY;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (f) {
                          e.currentTarget.style.background = GOLD;
                          e.currentTarget.style.color = NAVY;
                        } else {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = GOLD;
                        }
                      }}
                    >
                      {f ? 'Get Started Now' : 'Choose Plan'}
                    </button>
                  </div>
                </StepCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section style={S.testSection} data-section="testimonials">
        <div style={S.testInner}>
          <h2 style={S.testHead}>Distinguished Endorsements</h2>
          <Ornament style={{ marginBottom: '3rem' }} />

          <div style={S.testGrid}>
            {testimonials.map((t, i) => {
              const ck = `testimonial-${i}`;
              const hov = hoveredCard === ck;
              return (
                <StepCard
                  key={i}
                  outerSt={{
                    transition: 'transform 0.25s ease',
                    transform: hov ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                  innerSt={{
                    boxShadow: hov ? `0 6px 20px ${NAVY}18` : 'none',
                    padding: '2rem 1.75rem',
                  }}
                >
                  <div
                    onMouseEnter={() => setHoveredCard(ck)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{
                      fontFamily: FONT_DISPLAY, fontSize: '3.5rem', lineHeight: 1,
                      color: GOLD, opacity: 0.5, marginBottom: '-0.5rem', userSelect: 'none',
                    }}>
                      &ldquo;
                    </div>
                    <p style={S.testQuote}>{t.quote}</p>
                    <div style={{ width: 40, height: 1, background: GOLD, marginBottom: '1rem' }} />
                    <div style={S.testAttrib}>
                      <div style={S.testAvatar}>{t.avatarInitial}</div>
                      <div>
                        <p style={S.testName}>{t.name}</p>
                        <p style={S.testRole}>{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </StepCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={S.faqSection} data-section="faq">
        <div style={S.faqInner}>
          <h2 style={S.faqHead}>Frequently Asked Questions</h2>
          <Ornament style={{ marginBottom: '2rem' }} />

          {faqItems.map((item, i) => (
            <div
              key={i}
              style={{
                ...S.faqItem,
                borderBottom: i === faqItems.length - 1
                  ? `2px solid ${GOLD}`
                  : `1px solid ${GOLD}44`,
              }}
            >
              <span style={S.faqNum}>{String(i + 1).padStart(2, '0')}</span>
              <p style={S.faqQ}>{item.question}</p>
              <p style={S.faqA}>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Email Signup ===== */}
      <section style={S.emailSection} data-section="signup">
        <div style={S.emailInner}>
          <Ornament color={GOLD_LIGHT} style={{ marginBottom: '2rem' }} />
          <h2 style={S.emailHead}>Join the Inner Circle</h2>
          <p style={S.emailSub}>
            Be the first to know about new features and exclusive updates.
          </p>

          {submitted ? (
            <p style={S.emailOk} role="status" aria-live="polite">
              {emailSignup.successMessage}
            </p>
          ) : (
            <form style={S.emailForm} onSubmit={handleSubmit}>
              <input
                style={S.emailInput}
                type="email"
                placeholder={emailSignup.placeholder}
                required
                aria-label="Email address"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = GOLD_LIGHT;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${GOLD}44`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                style={S.emailBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = NAVY;
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
