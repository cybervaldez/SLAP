import type React from 'react';
import { useState, useEffect, useRef } from 'react';

const WIPE_DURATION = 800;

interface WipeTransitionProps {
  activeVersion: string;
  onVersionChange: (id: string) => void;
  DemoComponent: React.ComponentType<{ version: string }>;
  wipeDirection?: 'left' | 'right';
}

/**
 * Wipe transition between design versions.
 * Shows a clip-path reveal animation when switching versions.
 */
export default function WipeTransition({
  activeVersion,
  onVersionChange,
  DemoComponent,
  wipeDirection = 'right',
}: WipeTransitionProps) {
  const [isWiping, setIsWiping] = useState(false);
  const [wipeKey, setWipeKey] = useState(0);
  const [fromVersion, setFromVersion] = useState<string | null>(null);
  const [wipeTarget, setWipeTarget] = useState<string | null>(null);
  const [displayedVersion, setDisplayedVersion] = useState(activeVersion);

  const prevVersionRef = useRef(activeVersion);
  const wipeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (wipeTimeoutRef.current) clearTimeout(wipeTimeoutRef.current);
    };
  }, []);

  // Detect version changes (pill clicks, navigation)
  useEffect(() => {
    if (prevVersionRef.current === activeVersion) return;

    const from = prevVersionRef.current;
    prevVersionRef.current = activeVersion;

    setFromVersion(from);
    setDisplayedVersion(from);
    setWipeTarget(activeVersion);
    setIsWiping(true);
    setWipeKey(k => k + 1);

    if (wipeTimeoutRef.current) clearTimeout(wipeTimeoutRef.current);
    wipeTimeoutRef.current = window.setTimeout(() => {
      setIsWiping(false);
      setFromVersion(null);
      setWipeTarget(null);
      setDisplayedVersion(activeVersion);
      onVersionChange(activeVersion);
    }, WIPE_DURATION);
  }, [activeVersion, onVersionChange]);

  return (
    <>
      <style>{wipeCSS}</style>
      <div style={{ position: 'relative', minHeight: '100vh', willChange: 'clip-path' }}>
        {isWiping && fromVersion && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <DemoComponent version={fromVersion} />
          </div>
        )}
        <div key={wipeKey} style={isWiping ? {
          position: 'relative', zIndex: 1,
          animation: `${wipeDirection === 'left' ? 'wipeRevealLeft' : 'wipeReveal'} ${WIPE_DURATION}ms ease-in-out forwards`,
        } : {}}>
          <DemoComponent version={isWiping && wipeTarget ? wipeTarget : displayedVersion} />
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
