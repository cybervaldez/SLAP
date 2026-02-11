import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#2563EB';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [focused, setFocused] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: 24,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px 10px 38px',
    fontSize: 15,
    fontFamily: FONT_FAMILY,
    border: `2px solid ${focused ? ACCENT : '#D1D5DB'}`,
    borderRadius: 8,
    outline: 'none',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: focused ? ACCENT : '#9CA3AF',
    pointerEvents: 'none',
    fontSize: 16,
    transition: 'color 0.15s ease',
  };

  return (
    <div style={containerStyle}>
      <span style={iconStyle} aria-hidden="true">
        &#x1F50D;
      </span>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search sections..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={inputStyle}
        aria-label="Search sections"
      />
    </div>
  );
};

export default SearchBar;
