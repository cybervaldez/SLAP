import React from 'react';
import { categories, sortOptions } from '../data';

const ACCENT = '#EC4899';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface FilterSortProps {
  activeCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({
  activeCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        justifyContent: 'space-between',
      }}
    >
      {/* Category filter buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              data-testid={`filter-${cat}`}
              onClick={() => onCategoryChange(cat)}
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '8px 16px',
                border: isActive ? `2px solid ${ACCENT}` : '2px solid #E5E7EB',
                borderRadius: '20px',
                backgroundColor: isActive ? ACCENT : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#4B5563',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                  (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
                  (e.currentTarget as HTMLButtonElement).style.color = '#4B5563';
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sort dropdown */}
      <select
        data-testid="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: '0.85rem',
          fontWeight: 500,
          padding: '8px 32px 8px 12px',
          border: '2px solid #E5E7EB',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          color: '#374151',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' fill='none' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
        }}
      >
        {sortOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSort;
