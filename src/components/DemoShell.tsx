import React, { useEffect } from 'react';
import RetroNavBar from './RetroNavBar';
import type { VariationDef } from '../types';

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#FAFAFA',
  },
  content: {
    flex: 1,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    paddingBottom: 60,
  },
};

interface DemoShellProps {
  archetypeName: string;
  children: React.ReactNode;
  variations?: VariationDef[];
  activeVariation?: string;
  onVariationChange?: (id: string) => void;
  accent?: string;
}

export default function DemoShell({
  archetypeName,
  children,
  variations,
  activeVariation,
  onVariationChange,
  accent,
}: DemoShellProps) {
  const isDark = variations?.find(v => v.id === activeVariation)?.dark ?? false;

  useEffect(() => {
    document.body.dataset.contentTheme = isDark ? 'dark' : 'light';
    return () => {
      delete document.body.dataset.contentTheme;
    };
  }, [isDark]);

  return (
    <div style={styles.shell} data-testid="demo-shell">
      <RetroNavBar
        archetypeName={archetypeName}
        variations={variations}
        activeVariation={activeVariation}
        onVariationChange={onVariationChange}
        accent={accent}
      />
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}
