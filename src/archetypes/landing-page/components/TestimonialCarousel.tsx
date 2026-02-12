import React, { useState } from 'react';
import { testimonials } from '../data';

const ACCENT = '#8B5CF6';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  section: {
    fontFamily: FONT_FAMILY,
    padding: '4rem 1.5rem',
    maxWidth: '680px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '2.5rem',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '2.5rem 2rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: '1px solid #F3F4F6',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: ACCENT,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '1.25rem',
    flexShrink: 0,
  },
  quote: {
    fontSize: '1.05rem',
    lineHeight: 1.7,
    color: '#374151',
    fontStyle: 'italic',
    margin: '0 0 1.25rem',
    maxWidth: '520px',
  },
  name: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  role: {
    fontSize: '0.85rem',
    color: '#9CA3AF',
    margin: '0.15rem 0 0',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.75rem',
  },
  navButton: {
    fontFamily: FONT_FAMILY,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `1px solid #E5E7EB`,
    background: '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    color: '#374151',
    transition: 'border-color 0.2s, color 0.2s',
  },
  dots: {
    display: 'flex',
    gap: '0.5rem',
  },
};

function getDotStyle(isActive: boolean): React.CSSProperties {
  return {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    background: isActive ? ACCENT : '#D1D5DB',
    cursor: 'pointer',
    padding: '12px',
    transition: 'background 0.2s',
    backgroundClip: 'content-box',
  };
}

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section style={styles.section} data-testid="testimonial-section" data-section="testimonials">
      <h2 style={styles.heading}>What our customers say</h2>
      <div style={styles.card} data-testid="testimonial-card">
        <div style={styles.avatar}>{current.avatarInitial}</div>
        <p style={styles.quote}>"{current.quote}"</p>
        <p style={styles.name}>{current.name}</p>
        <p style={styles.role}>
          {current.role}, {current.company}
        </p>
      </div>
      <div style={styles.controls}>
        <button
          style={styles.navButton}
          data-testid="testimonial-prev"
          onClick={prev}
          aria-label="Previous testimonial"
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = ACCENT;
            btn.style.color = ACCENT;
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = '#E5E7EB';
            btn.style.color = '#374151';
          }}
        >
          &#8592;
        </button>
        <div style={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              style={getDotStyle(index === activeIndex)}
              data-testid={`testimonial-dot-${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <button
          style={styles.navButton}
          data-testid="testimonial-next"
          onClick={next}
          aria-label="Next testimonial"
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = ACCENT;
            btn.style.color = ACCENT;
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = '#E5E7EB';
            btn.style.color = '#374151';
          }}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
