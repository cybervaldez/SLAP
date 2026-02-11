import React, { useEffect, useRef } from 'react';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface TypingIndicatorProps {
  name: string;
  isVisible: boolean;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '6px 20px 2px',
    fontSize: 13,
    color: '#94A3B8',
    fontFamily: FONT_FAMILY,
    fontStyle: 'italic',
    height: 28,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: '#94A3B8',
    marginLeft: 1,
  },
};

const keyframesInjected = { current: false };

function injectKeyframes() {
  if (keyframesInjected.current) return;
  keyframesInjected.current = true;

  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes slap-rt-typing-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-4px); opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ name, isVisible }) => {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!injectedRef.current) {
      injectKeyframes();
      injectedRef.current = true;
    }
  }, []);

  if (!isVisible) {
    return <div style={{ ...styles.container, visibility: 'hidden' }} />;
  }

  return (
    <div style={styles.container} data-testid="typing-indicator">
      <span>{name} is typing</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            ...styles.dot,
            animation: 'slap-rt-typing-bounce 1.2s infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
