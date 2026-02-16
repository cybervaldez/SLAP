import React from 'react';
import { getReviewer, getAvatarUrl } from '../../data/reviewers';
import { CHIN_HEIGHT } from './constants';

interface CouncilBarProps {
  selectedIds: Set<string>;
  onReroll: () => void;
  onKeep: () => void;
}

const BG_DARK = '#1A1A2E';
const BG_MID = '#222240';
const BG_DEEP = '#0D0D1A';
const ACCENT_GOLD = '#FFD000';
const EASE_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const KEYFRAMES = `
@keyframes councilBounceIn {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
`;

const st: Record<string, React.CSSProperties> = {
  bar: {
    position: 'sticky',
    bottom: CHIN_HEIGHT,
    left: 0,
    right: 0,
    background: BG_DARK,
    borderTop: `2px solid ${ACCENT_GOLD}`,
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: 20,
    minHeight: 56,
  },
  label: {
    fontSize: '0.45rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: ACCENT_GOLD,
  },
  avatars: {
    display: 'flex',
    gap: 4,
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `2px solid ${ACCENT_GOLD}`,
    opacity: 0,
    transform: 'scale(0.5)',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  btnBase: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.5rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    padding: '0.4rem 1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
  btnReroll: {
    background: BG_MID,
    color: ACCENT_GOLD,
    border: `1px solid ${ACCENT_GOLD}`,
  },
  btnKeep: {
    background: ACCENT_GOLD,
    color: BG_DEEP,
  },
};

export default function CouncilBar({ selectedIds, onReroll, onKeep }: CouncilBarProps) {
  const avatarEntries: { id: string; url: string; name: string; color: string }[] = [];
  selectedIds.forEach(id => {
    const r = getReviewer(id);
    if (!r) return;
    avatarEntries.push({ id, url: getAvatarUrl(r), name: r.name, color: r.color });
  });

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={st.bar} data-testid="council-bar">
        <span style={st.label}>YOUR COUNCIL</span>
        <div style={st.avatars} data-testid="council-bar-avatars">
          {avatarEntries.map((entry, i) => (
            <div
              key={entry.id}
              style={{
                ...st.avatar,
                borderColor: entry.color,
                animation: `councilBounceIn 400ms ${EASE_BOUNCE} ${i * 60}ms forwards`,
              }}
            >
              <img src={entry.url} alt={entry.name} style={st.avatarImg} loading="lazy" />
            </div>
          ))}
        </div>
        <div style={st.actions}>
          <button
            style={{ ...st.btnBase, ...st.btnReroll }}
            onClick={onReroll}
            data-testid="reroll-btn"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 208, 0, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = BG_MID; }}
          >
            {'\u{1F3B2}'} REROLL
          </button>
          <button
            style={{ ...st.btnBase, ...st.btnKeep }}
            onClick={onKeep}
            data-testid="keep-council"
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
          >
            KEEP &amp; CONTINUE {'\u2192'}
          </button>
        </div>
      </div>
    </>
  );
}
