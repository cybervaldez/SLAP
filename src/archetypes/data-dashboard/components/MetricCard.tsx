import React from 'react';
import type { MetricSummary } from '../data';

const ACCENT = '#059669';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  card: {
    fontFamily: FONT_FAMILY,
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '1.5rem',
    flex: '1 1 0',
    minWidth: '180px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#6B7280',
    margin: '0 0 0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  },
  value: {
    fontSize: '1.85rem',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 0.5rem',
    lineHeight: 1.2,
  },
  changeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
};

interface MetricCardProps {
  metric: MetricSummary;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.trend === 'up';
  const changeColor = isPositive ? ACCENT : '#DC2626';
  const arrow = isPositive ? '\u2191' : '\u2193';

  return (
    <div style={styles.card} data-testid={`metric-card-${metric.id}`}>
      <p style={styles.label}>{metric.label}</p>
      <p style={styles.value}>{metric.value}</p>
      <div style={{ ...styles.changeRow, color: changeColor }}>
        <span>{arrow}</span>
        <span>{Math.abs(metric.change)}%</span>
      </div>
    </div>
  );
}
