import React, { useState, useRef, useEffect } from 'react';
import { faqItems } from '../data';

const ACCENT = '#8B5CF6';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  section: {
    fontFamily: FONT_FAMILY,
    maxWidth: '720px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  item: {
    borderBottom: '1px solid #E5E7EB',
  },
  button: {
    fontFamily: FONT_FAMILY,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1.05rem',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1.4,
  },
  icon: {
    fontSize: '1.25rem',
    color: ACCENT,
    flexShrink: 0,
    marginLeft: '1rem',
    transition: 'transform 0.3s ease',
  },
  answerWrapper: {
    overflow: 'hidden',
    transition: 'max-height 0.35s ease',
  },
  answer: {
    padding: '0 0 1.25rem',
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#6B7280',
    margin: 0,
  },
};

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    const measured = contentRefs.current.map((ref) => ref?.scrollHeight ?? 0);
    setHeights(measured);
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section style={styles.section} data-testid="faq-section" data-section="faq">
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      <div>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} style={styles.item}>
              <button
                style={styles.button}
                data-testid={`faq-item-${index}-toggle`}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    ...styles.icon,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                style={{
                  ...styles.answerWrapper,
                  maxHeight: isOpen ? `${heights[index] || 200}px` : '0px',
                }}
              >
                <p style={styles.answer}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
