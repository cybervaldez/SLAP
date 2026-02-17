import { useEffect, useCallback } from 'react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_KEYFRAMES = `
@keyframes comingSoonEnter {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
`;

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return (
    <>
      <style>{MODAL_KEYFRAMES}</style>
      {/* Backdrop */}
      <div
        data-testid="coming-soon-modal"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            background: '#1A1A2E',
            borderTop: '3px solid #FFD000',
            borderRadius: 4,
            padding: '28px 24px 20px',
            fontFamily: "'Courier New', monospace",
            textAlign: 'center',
            animation: 'comingSoonEnter 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: '#FFD000',
            letterSpacing: '0.15em',
            marginBottom: 12,
          }}>
            COMING SOON
          </div>
          <p style={{
            fontSize: '0.6rem',
            color: 'rgba(245, 240, 225, 0.5)',
            lineHeight: 1.6,
            marginBottom: 20,
          }}>
            Browse and customize your review council. Pick experts and personas that match your project.
          </p>
          <button
            data-testid="coming-soon-dismiss"
            onClick={onClose}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.55rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              background: '#FFD000',
              color: '#0D0D1A',
              border: 'none',
              padding: '8px 24px',
              cursor: 'pointer',
              transition: 'transform 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
          >
            GOT IT
          </button>
        </div>
      </div>
    </>
  );
}
