import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import PricingTable from '../components/PricingTable';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
import { emailSignup } from '../data';

const ACCENT = '#8B5CF6';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: FONT_FAMILY,
    background: '#FAFAFA',
    minHeight: '100vh',
  },
  signupSection: {
    fontFamily: FONT_FAMILY,
    padding: '4rem 1.5rem 5rem',
    textAlign: 'center',
    maxWidth: '560px',
    margin: '0 auto',
  },
  signupHeading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.5rem',
  },
  signupSubtext: {
    fontSize: '1rem',
    color: '#6B7280',
    marginBottom: '2rem',
    fontWeight: 400,
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  input: {
    fontFamily: FONT_FAMILY,
    flex: '1 1 260px',
    padding: '0.8rem 1rem',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    color: '#111827',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    fontFamily: FONT_FAMILY,
    padding: '0.8rem 1.75rem',
    border: 'none',
    borderRadius: '8px',
    background: ACCENT,
    color: '#FFFFFF',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
  },
  success: {
    marginTop: '1rem',
    color: '#166534',
    background: '#F0FDF4',
    border: '1px solid #BBF7D0',
    display: 'inline-block',
    padding: '0.6rem 1.25rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  divider: {
    height: '1px',
    background: '#E5E7EB',
    border: 'none',
    margin: '0 auto',
    maxWidth: '960px',
  },
};

export default function SlapLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page} data-testid="landing-page-demo">
      <HeroSection />

      <hr style={styles.divider} />

      <PricingTable />

      <hr style={styles.divider} />

      <TestimonialCarousel />

      <hr style={styles.divider} />

      <FAQAccordion />

      <hr style={styles.divider} />

      <section style={styles.signupSection} data-testid="email-section" data-section="signup">
        <h2 style={styles.signupHeading}>Stay in the loop</h2>
        <p style={styles.signupSubtext}>
          Get product updates and early access to new features.
        </p>
        {!submitted ? (
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={emailSignup.placeholder}
              style={styles.input}
              data-testid="email-input"
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = ACCENT;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = '#D1D5DB';
              }}
            />
            <button
              type="submit"
              style={styles.submitBtn}
              data-testid="email-submit"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
            >
              {emailSignup.buttonText}
            </button>
          </form>
        ) : (
          <div style={styles.success} data-testid="email-success">
            {emailSignup.successMessage}
          </div>
        )}
      </section>
    </div>
  );
}
