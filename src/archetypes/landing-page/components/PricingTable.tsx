import React from 'react';
import { pricingPlans } from '../data';
import type { PricingPlan } from '../data';

const ACCENT = '#8B5CF6';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  section: {
    fontFamily: FONT_FAMILY,
    padding: '4rem 1.5rem',
    maxWidth: '960px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
    alignItems: 'start',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '1.5rem 0 2rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 0',
    fontSize: '0.9rem',
    color: '#374151',
  },
  checkmark: {
    color: ACCENT,
    fontWeight: 700,
    fontSize: '1rem',
    flexShrink: 0,
  },
  badge: {
    display: 'inline-block',
    background: ACCENT,
    color: '#FFFFFF',
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    marginBottom: '0.75rem',
  },
};

function getCardStyle(highlighted: boolean): React.CSSProperties {
  return {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: highlighted ? `2px solid ${ACCENT}` : '1px solid #E5E7EB',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: highlighted
      ? `0 8px 30px rgba(139, 92, 246, 0.15)`
      : '0 1px 3px rgba(0,0,0,0.06)',
    position: 'relative',
    transform: highlighted ? 'scale(1.03)' : 'none',
  };
}

function getButtonStyle(highlighted: boolean): React.CSSProperties {
  return {
    fontFamily: FONT_FAMILY,
    width: '100%',
    padding: '0.8rem',
    border: highlighted ? 'none' : `2px solid ${ACCENT}`,
    borderRadius: '8px',
    background: highlighted ? ACCENT : 'transparent',
    color: highlighted ? '#FFFFFF' : ACCENT,
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 'auto',
    transition: 'opacity 0.2s',
  };
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <div style={getCardStyle(plan.highlighted)} data-testid={`pricing-card-${index}`}>
      {plan.highlighted && <span style={styles.badge}>Popular</span>}
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#111827',
          margin: plan.highlighted ? '0 0 0.5rem' : '0 0 0.5rem',
        }}
      >
        {plan.name}
      </h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827' }}>
          {plan.price}
        </span>
        <span style={{ fontSize: '1rem', color: '#9CA3AF', fontWeight: 400 }}>
          {plan.period}
        </span>
      </div>
      <ul style={styles.featureList}>
        {plan.features.map((feature, fi) => (
          <li key={fi} style={styles.featureItem}>
            <span style={styles.checkmark} aria-hidden="true">&#10003;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        style={getButtonStyle(plan.highlighted)}
        data-testid={`pricing-cta-${index}`}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '1';
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default function PricingTable() {
  return (
    <section style={styles.section} data-testid="pricing-section" data-section="pricing">
      <h2 style={styles.heading}>Simple, transparent pricing</h2>
      <p style={styles.subtitle}>No hidden fees. Cancel anytime.</p>
      <div style={styles.grid}>
        {pricingPlans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}
