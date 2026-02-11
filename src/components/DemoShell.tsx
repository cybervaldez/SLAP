import React from 'react';
import RetroNavBar from './RetroNavBar';
import VariationPills from './VariationPills';
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
  return (
    <div style={styles.shell} data-testid="demo-shell">
      <RetroNavBar archetypeName={archetypeName} />
      {variations && activeVariation && onVariationChange && accent && (
        <VariationPills
          variations={variations}
          activeVariation={activeVariation}
          onVariationChange={onVariationChange}
          accent={accent}
        />
      )}
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}
