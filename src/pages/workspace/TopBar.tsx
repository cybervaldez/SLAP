/**
 * Workspace top bar — project identity, tour control, version pills.
 */

import React from 'react';
import type { ProjectDef } from '../../data/projects';

interface TopBarProps {
  project: ProjectDef;
  activeVersionId: string;
  versionScores: Record<string, number>;
  onVersionChange: (id: string) => void;
  onBack: () => void;
  tourSlot?: React.ReactNode;
}

function scoreColor(s: number) {
  return s >= 7 ? '#6BCB77' : s >= 5 ? '#FFD93D' : '#FF6B6B';
}

export default function TopBar({ project, activeVersionId, versionScores, onVersionChange, onBack, tourSlot }: TopBarProps) {
  return (
    <div
      data-testid="workspace-topbar"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 16px',
        background: 'rgba(13,13,26,0.95)',
        borderBottom: '1px solid rgba(245,240,225,0.08)',
        fontFamily: "'Courier New', monospace",
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Back */}
      <button
        data-testid="topbar-back"
        onClick={onBack}
        style={{
          fontFamily: "'Courier New', monospace", fontSize: '0.85rem', fontWeight: 700,
          color: 'rgba(245,240,225,0.5)', background: 'none',
          border: '1px solid rgba(245,240,225,0.12)', borderRadius: 4,
          padding: '4px 8px', cursor: 'pointer', transition: 'all 150ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#FFD000'; e.currentTarget.style.borderColor = '#FFD000'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,225,0.5)'; e.currentTarget.style.borderColor = 'rgba(245,240,225,0.12)'; }}
      >
        {'\u2190'}
      </button>

      {/* Project name */}
      <div data-testid="topbar-project-name" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#F5F0E1', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>{project.icon}</span>
        <span>{project.name}</span>
      </div>

      {/* Tour control — lives between name and pills */}
      {tourSlot}

      {/* Version pills */}
      <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
        {project.versions.map(v => {
          const active = v.id === activeVersionId;
          const score = versionScores[v.id];
          const scoreStr = score !== undefined ? ` ${score.toFixed(1)}` : '';
          return (
            <button
              key={v.id}
              data-testid={`topbar-version-${v.id}`}
              onClick={() => onVersionChange(v.id)}
              style={{
                fontFamily: "'Courier New', monospace", fontSize: '0.55rem', fontWeight: 700,
                letterSpacing: '0.04em', padding: '4px 10px', border: 'none', cursor: 'pointer',
                transition: 'all 150ms', display: 'flex', alignItems: 'center', gap: 6,
                background: active ? project.accent : 'rgba(34,34,64,0.8)',
                color: active ? '#0D0D1A' : 'rgba(245,240,225,0.5)',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(34,34,64,1)'; e.currentTarget.style.color = '#F5F0E1'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'rgba(34,34,64,0.8)'; e.currentTarget.style.color = 'rgba(245,240,225,0.5)'; } }}
            >
              {v.label}
              {scoreStr && <span style={{ color: active ? '#0D0D1A' : scoreColor(score), fontWeight: 800 }}>{scoreStr}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
