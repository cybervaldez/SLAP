import React from 'react';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface QuantityControlProps {
  id: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  id,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  const buttonStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #D1D5DB',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    color: '#374151',
    fontSize: 16,
    fontWeight: 600,
    fontFamily: FONT_FAMILY,
    cursor: 'pointer',
    lineHeight: 1,
    padding: 0,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <button
        data-testid={`qty-minus-${id}`}
        onClick={onDecrement}
        style={buttonStyle}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span
        data-testid={`qty-display-${id}`}
        style={{
          minWidth: 24,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 600,
          color: '#111827',
          fontFamily: FONT_FAMILY,
        }}
      >
        {quantity}
      </span>
      <button
        data-testid={`qty-plus-${id}`}
        onClick={onIncrement}
        style={buttonStyle}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
