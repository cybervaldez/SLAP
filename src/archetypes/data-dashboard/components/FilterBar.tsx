import type { TimeRange } from '../data';
import { timeRanges } from '../data';

const ACCENT = '#059669';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface FilterBarProps {
  activeRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export default function FilterBar({ activeRange, onRangeChange }: FilterBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {timeRanges.map((range) => {
        const isActive = range === activeRange;
        return (
          <button
            key={range}
            data-testid={`filter-${range}`}
            onClick={() => onRangeChange(range)}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.5rem 1.1rem',
              border: isActive ? `2px solid ${ACCENT}` : '2px solid #E5E7EB',
              borderRadius: '8px',
              background: isActive ? ACCENT : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                const btn = e.currentTarget;
                btn.style.borderColor = ACCENT;
                btn.style.color = ACCENT;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const btn = e.currentTarget;
                btn.style.borderColor = '#E5E7EB';
                btn.style.color = '#374151';
              }
            }}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
}
