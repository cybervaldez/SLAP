/**
 * CSS box-model wireframe icons representing each archetype layout.
 * Uses --icon-color and --icon-dim CSS custom properties for theming.
 */

const WIREFRAME_MAP: Record<string, () => JSX.Element> = {
  'landing-page': () => (
    <>
      <div className="wf-bar" />
      <div className="wf-main">
        <div className="wf-hero" />
        <div className="wf-btn" />
      </div>
    </>
  ),
  'text-heavy': () => (
    <div className="wf-row" style={{ flex: 1 }}>
      <div className="wf-sidebar">
        <div className="wf-dot" />
        <div className="wf-dot" />
        <div className="wf-dot" />
      </div>
      <div className="wf-lines" style={{ flex: 1 }}>
        <div className="wf-line" />
        <div className="wf-line short" />
        <div className="wf-line" />
        <div className="wf-line short" />
      </div>
    </div>
  ),
  'e-commerce': () => (
    <>
      <div className="wf-bar" />
      <div className="wf-grid-2x2">
        <div className="wf-grid-cell" />
        <div className="wf-grid-cell" />
        <div className="wf-grid-cell" />
        <div className="wf-grid-cell" />
      </div>
    </>
  ),
  'data-dashboard': () => (
    <>
      <div className="wf-row" style={{ height: 10, gap: 1, padding: 1 }}>
        <div className="wf-col" style={{ background: 'var(--icon-dim)' }} />
        <div className="wf-col" style={{ background: 'var(--icon-dim)' }} />
        <div className="wf-col" style={{ background: 'var(--icon-color)' }} />
      </div>
      <div className="wf-row" style={{ flex: 1 }}>
        <div className="wf-col" style={{ padding: 2 }}>
          <div className="wf-line" />
          <div className="wf-line short" />
        </div>
        <div className="wf-col" style={{ padding: 2 }}>
          <div className="wf-grid-cell" style={{ height: '100%', background: 'var(--icon-dim)' }} />
        </div>
      </div>
    </>
  ),
  'form-heavy': () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="wf-input" />
      <div className="wf-input" />
      <div className="wf-input" />
      <div className="wf-btn" style={{ marginTop: 3 }} />
    </div>
  ),
  'task-management': () => (
    <>
      <div className="wf-bar" style={{ height: 4 }} />
      <div className="wf-kanban">
        <div className="wf-kanban-col">
          <div className="wf-kanban-card accent" />
          <div className="wf-kanban-card" />
        </div>
        <div className="wf-kanban-col">
          <div className="wf-kanban-card" />
          <div className="wf-kanban-card accent" />
          <div className="wf-kanban-card" />
        </div>
        <div className="wf-kanban-col">
          <div className="wf-kanban-card" />
        </div>
      </div>
    </>
  ),
  'media-gallery': () => (
    <div className="wf-grid-2x2" style={{ flex: 1 }}>
      <div className="wf-grid-cell" style={{ background: 'var(--icon-color)', opacity: 0.6 }} />
      <div className="wf-grid-cell" />
      <div className="wf-grid-cell" />
      <div className="wf-grid-cell" style={{ background: 'var(--icon-color)', opacity: 0.6 }} />
    </div>
  ),
  'real-time': () => (
    <>
      <div className="wf-bar" style={{ height: 4 }} />
      <div className="wf-bubbles">
        <div className="wf-bubble left" />
        <div className="wf-bubble right" />
        <div className="wf-bubble left" style={{ width: '45%' }} />
        <div className="wf-bubble right" style={{ width: '60%' }} />
      </div>
    </>
  ),
};

interface WireframeIconProps {
  slug: string;
}

export default function WireframeIcon({ slug }: WireframeIconProps) {
  const render = WIREFRAME_MAP[slug];
  if (!render) return null;
  return (
    <div className="icon-wireframe" data-testid={`wireframe-icon-${slug}`}>
      {render()}
    </div>
  );
}

export const WIREFRAME_ICON_CSS = `
/* ═══ WIREFRAME ICONS ═══ */
.icon-wireframe {
  width: 48px; height: 40px; position: relative;
  border: 1.5px solid var(--icon-color); border-radius: 2px;
  display: flex; flex-direction: column; overflow: hidden;
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-wireframe .wf-bar {
  height: 6px; background: var(--icon-color); border-bottom: 1px solid var(--card-bg, var(--bg-card, #fff));
}
.icon-wireframe .wf-row {
  display: flex; flex: 1;
}
.icon-wireframe .wf-col {
  flex: 1; border-right: 1px solid var(--icon-dim);
}
.icon-wireframe .wf-col:last-child { border-right: none; }
.icon-wireframe .wf-block {
  margin: 2px; height: 6px; background: var(--icon-dim); border-radius: 1px;
}
.icon-wireframe .wf-sidebar {
  width: 12px; border-right: 1px solid var(--icon-dim);
  display: flex; flex-direction: column; gap: 2px; padding: 2px;
}
.icon-wireframe .wf-dot {
  width: 100%; height: 2px; background: var(--icon-dim); border-radius: 1px;
}
.icon-wireframe .wf-main { flex: 1; }
.icon-wireframe .wf-hero {
  height: 14px; background: var(--icon-dim); margin: 2px;
}
.icon-wireframe .wf-btn {
  width: 16px; height: 5px; background: var(--icon-color);
  border-radius: 1px; margin: 2px auto;
}
.icon-wireframe .wf-lines {
  display: flex; flex-direction: column; gap: 2px; padding: 2px;
}
.icon-wireframe .wf-line {
  height: 2px; background: var(--icon-dim); border-radius: 1px;
}
.icon-wireframe .wf-line.short { width: 70%; }
.icon-wireframe .wf-grid-2x2 {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
  flex: 1; padding: 2px;
}
.icon-wireframe .wf-grid-cell {
  background: var(--icon-dim); border-radius: 1px;
}
.icon-wireframe .wf-input {
  height: 5px; border: 1px solid var(--icon-dim); margin: 2px 3px;
  border-radius: 1px;
}
.icon-wireframe .wf-kanban {
  display: flex; flex: 1; gap: 1px; padding: 2px;
}
.icon-wireframe .wf-kanban-col {
  flex: 1; display: flex; flex-direction: column; gap: 1px;
}
.icon-wireframe .wf-kanban-card {
  height: 5px; background: var(--icon-dim); border-radius: 1px;
}
.icon-wireframe .wf-kanban-card.accent { background: var(--icon-color); }
.icon-wireframe .wf-bubbles {
  display: flex; flex-direction: column; gap: 3px; padding: 4px;
  flex: 1; justify-content: flex-end;
}
.icon-wireframe .wf-bubble {
  height: 4px; border-radius: 2px; background: var(--icon-dim);
}
.icon-wireframe .wf-bubble.left { width: 65%; align-self: flex-start; }
.icon-wireframe .wf-bubble.right { width: 50%; align-self: flex-end; background: var(--icon-color); }
`;
