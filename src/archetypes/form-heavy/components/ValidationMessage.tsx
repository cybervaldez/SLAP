import React from 'react';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface ValidationMessageProps {
  fieldName: string;
  message: string;
}

const style: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: '0.8rem',
  color: '#DC2626',
  marginTop: '0.25rem',
  fontWeight: 500,
};

export default function ValidationMessage({ fieldName, message }: ValidationMessageProps) {
  if (!message) return null;

  return (
    <div style={style} data-testid={`error-${fieldName}`}>
      {message}
    </div>
  );
}
