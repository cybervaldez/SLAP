import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { LENS_VARIATION_MAP } from '../lensThemes';

const WIPE_DURATION = 800;
const AUTO_WIPE_DELAY = 1000;
const DEFAULT_LENS_VARIATION = 'art-deco';

interface WipeTransitionProps {
  activeVariation: string;
  lensParam: string | null;
  onVariationChange: (id: string) => void;
  onFirstWipeComplete: () => void;
  DemoComponent: React.ComponentType<{ variation: string }>;
  wipeDirection?: 'left' | 'right';
}

export default function WipeTransition({
  activeVariation,
  lensParam,
  onVariationChange,
  onFirstWipeComplete,
  DemoComponent,
  wipeDirection = 'right',
}: WipeTransitionProps) {
  const targetVariation = lensParam
    ? LENS_VARIATION_MAP[lensParam] || DEFAULT_LENS_VARIATION
    : null;

  const shouldAutoWipe = !!lensParam && !!targetVariation;

  const [isWiping, setIsWiping] = useState(false);
  const [wipeKey, setWipeKey] = useState(0);
  const [fromVariation, setFromVariation] = useState<string | null>(null);
  const [wipeTarget, setWipeTarget] = useState<string | null>(null);
  const [displayedVariation, setDisplayedVariation] = useState(
    shouldAutoWipe ? 'slap' : activeVariation
  );

  const prevVariationRef = useRef(activeVariation);
  const wipeTimeoutRef = useRef<number | null>(null);
  const autoWipeTriggeredRef = useRef(!shouldAutoWipe);
  const autoWipeTimerRef = useRef<number | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wipeTimeoutRef.current) clearTimeout(wipeTimeoutRef.current);
      if (autoWipeTimerRef.current) clearTimeout(autoWipeTimerRef.current);
    };
  }, []);

  // Auto-wipe: show SLAP variation briefly, then wipe to styled
  useEffect(() => {
    if (autoWipeTriggeredRef.current || !shouldAutoWipe || !targetVariation) return;

    autoWipeTimerRef.current = window.setTimeout(() => {
      autoWipeTriggeredRef.current = true;

      setFromVariation('slap');
      setWipeTarget(targetVariation);
      setIsWiping(true);

      wipeTimeoutRef.current = window.setTimeout(() => {
        setIsWiping(false);
        setFromVariation(null);
        setWipeTarget(null);
        setDisplayedVariation(targetVariation);
        prevVariationRef.current = targetVariation;
        onVariationChange(targetVariation);
        onFirstWipeComplete();
      }, WIPE_DURATION);
    }, AUTO_WIPE_DELAY);

    return () => {
      if (autoWipeTimerRef.current) clearTimeout(autoWipeTimerRef.current);
    };
  }, [shouldAutoWipe, targetVariation, onVariationChange, onFirstWipeComplete]);

  // Detect variation changes after auto-wipe (pill clicks)
  useEffect(() => {
    if (!autoWipeTriggeredRef.current) return;
    if (prevVariationRef.current === activeVariation) return;

    const from = prevVariationRef.current;
    prevVariationRef.current = activeVariation;

    setFromVariation(from);
    setDisplayedVariation(from);
    setWipeTarget(activeVariation);
    setIsWiping(true);
    setWipeKey(k => k + 1);

    if (wipeTimeoutRef.current) clearTimeout(wipeTimeoutRef.current);
    wipeTimeoutRef.current = window.setTimeout(() => {
      setIsWiping(false);
      setFromVariation(null);
      setWipeTarget(null);
      setDisplayedVariation(activeVariation);
    }, WIPE_DURATION);
  }, [activeVariation]);

  return (
    <>
      <style>{wipeCSS}</style>
      <div style={{ position: 'relative', minHeight: '100vh', willChange: 'clip-path' }}>
        {isWiping && fromVariation && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <DemoComponent variation={fromVariation} />
          </div>
        )}
        <div key={wipeKey} style={isWiping ? {
          position: 'relative', zIndex: 1,
          animation: `${wipeDirection === 'left' ? 'wipeRevealLeft' : 'wipeReveal'} ${WIPE_DURATION}ms ease-in-out forwards`,
        } : {}}>
          <DemoComponent variation={isWiping && wipeTarget ? wipeTarget : displayedVariation} />
        </div>
      </div>
    </>
  );
}

const wipeCSS = `
@keyframes wipeReveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes wipeRevealLeft {
  from { clip-path: inset(0 0 0 100%); }
  to   { clip-path: inset(0 0 0 0); }
}

@media (prefers-reduced-motion: reduce) {
  [style*="wipeReveal"] { animation: none !important; }
}
`;
