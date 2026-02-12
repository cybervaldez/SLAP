import React, { useState } from 'react';
import { heroData } from '../data';

const ACCENT = '#8B5CF6';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    padding: '5rem 1.5rem 4rem',
    maxWidth: '720px',
    margin: '0 auto',
  },
  headline: {
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.15,
    color: '#111827',
    margin: '0 0 1.25rem',
    letterSpacing: '-0.02em',
  },
  subheadline: {
    fontSize: '1.2rem',
    lineHeight: 1.6,
    color: '#6B7280',
    margin: '0 0 2.5rem',
    fontWeight: 400,
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    fontFamily: FONT_FAMILY,
    fontSize: '1rem',
    fontWeight: 600,
    padding: '0.85rem 2rem',
    border: 'none',
    borderRadius: '8px',
    background: ACCENT,
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  secondaryBtn: {
    fontFamily: FONT_FAMILY,
    fontSize: '1rem',
    fontWeight: 600,
    padding: '0.85rem 2rem',
    border: `2px solid ${ACCENT}`,
    borderRadius: '8px',
    background: 'transparent',
    color: ACCENT,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  },
  toast: {
    marginTop: '1.5rem',
    display: 'inline-block',
    background: '#F0FDF4',
    color: '#166534',
    padding: '0.6rem 1.25rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: 500,
    border: '1px solid #BBF7D0',
  },
};

export default function HeroSection() {
  const [showToast, setShowToast] = useState(false);

  const handleDemoClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section style={styles.wrapper} data-testid="hero-section" data-section="hero">
      <h1 style={styles.headline}>{heroData.headline}</h1>
      <p style={styles.subheadline}>{heroData.subheadline}</p>
      <div style={styles.buttons}>
        <button
          style={styles.primaryBtn}
          data-testid="hero-cta-primary"
          onClick={handleDemoClick}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
        >
          {heroData.ctaPrimary}
        </button>
        <button
          style={styles.secondaryBtn}
          data-testid="hero-cta-secondary"
          onClick={() => {
            document.querySelector('[data-section="pricing"]')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = ACCENT;
            btn.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = 'transparent';
            btn.style.color = ACCENT;
          }}
        >
          {heroData.ctaSecondary}
        </button>
      </div>
      {showToast && (
        <div style={styles.toast} data-testid="hero-toast">
          Demo requested!
        </div>
      )}
    </section>
  );
}
