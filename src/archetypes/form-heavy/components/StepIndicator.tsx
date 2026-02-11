import React from 'react';

const ACCENT = '#7C3AED';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: FONT_FAMILY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem 0 2rem',
    gap: '0',
  },
  stepWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
  },
  stepCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 600,
    fontFamily: FONT_FAMILY,
    flexShrink: 0,
    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  },
  stepLabel: {
    fontSize: '0.8rem',
    fontWeight: 500,
    fontFamily: FONT_FAMILY,
    marginTop: '0.4rem',
    textAlign: 'center' as const,
    whiteSpace: 'nowrap' as const,
  },
  connector: {
    height: '2px',
    width: '60px',
    flexShrink: 0,
    transition: 'background 0.2s',
  },
  stepColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0',
  },
};

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div style={styles.container} data-testid="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        const circleStyle: React.CSSProperties = {
          ...styles.stepCircle,
          background: isCompleted || isCurrent ? ACCENT : '#FFFFFF',
          color: isCompleted || isCurrent ? '#FFFFFF' : '#9CA3AF',
          border: isCompleted || isCurrent ? `2px solid ${ACCENT}` : '2px solid #D1D5DB',
        };

        const labelStyle: React.CSSProperties = {
          ...styles.stepLabel,
          color: isCurrent ? ACCENT : isCompleted ? '#374151' : '#9CA3AF',
        };

        const connectorStyle: React.CSSProperties = {
          ...styles.connector,
          background: isCompleted ? ACCENT : '#D1D5DB',
        };

        return (
          <div key={stepNum} style={styles.stepWrapper}>
            <div style={styles.stepColumn}>
              <div style={circleStyle} data-testid={`step-${stepNum}`}>
                {isCompleted ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span style={labelStyle}>{stepLabels[i]}</span>
            </div>
            {stepNum < totalSteps && <div style={connectorStyle} />}
          </div>
        );
      })}
    </div>
  );
}
