import { useState, useCallback } from 'react';
import type { SavedFinding } from './notesTypes';

interface NotesPillProps {
  findings: SavedFinding[];
  projectName: string;
  versionId: string;
  onClear: () => void;
}

const PILL_KEYFRAMES = `
@keyframes notesPillEnter {
  from { opacity: 0; transform: translateX(-50%) translateY(8px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
`;

function lightToLabel(light: string): string {
  if (light === 'red') return 'FIX';
  if (light === 'yellow') return 'IMPROVE';
  return 'KEEP';
}

function formatNotesForCopy(findings: SavedFinding[], projectName: string, versionId: string): string {
  const lines: string[] = [];
  lines.push('I received the following design review feedback. Help me address each finding:');
  lines.push('');
  lines.push(`## Design Review Notes \u2014 ${projectName} (${versionId})`);
  lines.push('');

  // Group by section
  const bySection: Record<string, SavedFinding[]> = {};
  for (const f of findings) {
    if (!bySection[f.section]) bySection[f.section] = [];
    bySection[f.section].push(f);
  }

  for (const [section, items] of Object.entries(bySection)) {
    lines.push(`### ${section.toUpperCase()} (${items.length} finding${items.length > 1 ? 's' : ''})`);
    for (const item of items) {
      const label = lightToLabel(item.light);
      lines.push(`- **[${label}]** ${item.text}`);
      lines.push(`  Reviewer: ${item.reviewerName} | "${item.comment}"`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export default function NotesPill({
  findings,
  projectName,
  versionId,
  onClear,
}: NotesPillProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = formatNotesForCopy(findings, projectName, versionId);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [findings, projectName, versionId]);

  if (findings.length === 0) return null;

  return (
    <>
      <style>{PILL_KEYFRAMES}</style>
      <div
        data-testid="notes-pill"
        style={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '6px 14px',
          background: copied ? '#FFD000' : '#222240',
          border: '1px solid rgba(245, 240, 225, 0.12)',
          borderRadius: 4,
          fontFamily: "'Courier New', monospace",
          fontSize: '0.5rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          animation: 'notesPillEnter 250ms cubic-bezier(0.22, 0.61, 0.36, 1)',
          transition: 'background 200ms',
        }}
      >
        {/* Count */}
        <span style={{ color: copied ? '#0D0D1A' : '#FFD000' }}>
          {copied ? 'Copied!' : `${findings.length} note${findings.length > 1 ? 's' : ''}`}
        </span>

        {!copied && (
          <>
            {/* Copy button */}
            <button
              data-testid="notes-copy"
              onClick={handleCopy}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.5rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#F5F0E1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFD000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#F5F0E1'; }}
            >
              COPY
            </button>

            {/* Clear button */}
            <button
              data-testid="notes-clear"
              onClick={onClear}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.55rem',
                fontWeight: 700,
                color: 'rgba(245, 240, 225, 0.3)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B6B'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245, 240, 225, 0.3)'; }}
            >
              {'\u00D7'}
            </button>
          </>
        )}
      </div>
    </>
  );
}
