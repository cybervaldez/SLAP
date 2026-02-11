import React from 'react';

const ACCENT = '#EC4899';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const baseButtonStyle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: '0.85rem',
  fontWeight: 600,
  padding: '8px 14px',
  border: '1px solid #E5E7EB',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  lineHeight: 1,
};

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  const getStyle = (view: ViewMode): React.CSSProperties => ({
    ...baseButtonStyle,
    backgroundColor: currentView === view ? ACCENT : '#FFFFFF',
    color: currentView === view ? '#FFFFFF' : '#6B7280',
    borderColor: currentView === view ? ACCENT : '#E5E7EB',
    borderRadius: view === 'grid' ? '8px 0 0 8px' : '0 8px 8px 0',
    borderLeft: view === 'list' ? 'none' : '1px solid ' + (currentView === view ? ACCENT : '#E5E7EB'),
  });

  return (
    <div style={{ display: 'inline-flex' }}>
      <button
        data-testid="view-grid"
        style={getStyle('grid')}
        onClick={() => onViewChange('grid')}
        aria-label="Grid view"
      >
        {/* Grid icon: 4 squares */}
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{'\u25A0\u25A0'}</span>
        <span style={{ fontSize: '1rem', lineHeight: 1, display: 'block', marginTop: -2 }}>{'\u25A0\u25A0'}</span>
      </button>
      <button
        data-testid="view-list"
        style={getStyle('list')}
        onClick={() => onViewChange('list')}
        aria-label="List view"
      >
        {/* List icon: 3 horizontal lines */}
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{'\u2630'}</span>
      </button>
    </div>
  );
};

export default ViewToggle;
