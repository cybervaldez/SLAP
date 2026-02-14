import { useState, useEffect, useRef, useCallback } from 'react';
import { navigate } from '../router';
import { archetypes } from '../archetypes';
import { LENS_COLUMNS, type LensId } from '../lensThemes';
import WireframeIcon, { WIREFRAME_ICON_CSS } from './WireframeIcon';

type Phase = 'columns' | 'expanding' | 'page';

interface HomepageProps {
  lens: string | null;
  onArchetypeSelect?: (slug: string, rect: DOMRect) => void;
}

export default function Homepage({ lens, onArchetypeSelect }: HomepageProps) {
  const [phase, setPhase] = useState<Phase>(lens ? 'page' : 'columns');
  const [activeLens, setActiveLens] = useState<LensId | null>((lens as LensId) || null);

  const isAnimatingRef = useRef(false);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Sync lens from URL ────────────────────────────────
  useEffect(() => {
    if (lens && lens !== activeLens && !isAnimatingRef.current) {
      setActiveLens(lens as LensId);
      setPhase('page');
    } else if (!lens && phase !== 'expanding' && !isAnimatingRef.current) {
      setActiveLens(null);
      setPhase('columns');
    }
  }, [lens]);

  // ── Apply data-style / data-theme to <html> ──────────
  useEffect(() => {
    if (activeLens) {
      const col = LENS_COLUMNS.find(c => c.id === activeLens);
      document.documentElement.dataset.style = activeLens;
      document.documentElement.dataset.theme = col?.defaultTheme ?? 'dark';
    }
    return () => {
      delete document.documentElement.dataset.style;
      delete document.documentElement.dataset.theme;
    };
  }, [activeLens]);

  // ── appState for testing ──────────────────────────────
  useEffect(() => {
    (window as any).appState = {
      view: activeLens && phase === 'page' ? 'archetypes' : 'home',
      route: window.location.hash,
      initialized: true,
      lens: activeLens,
      phase,
    };
  }, [activeLens, phase]);

  // ── Column click: unified expand animation ────────────
  const handleColumnClick = useCallback((index: number) => {
    if (isAnimatingRef.current || phase !== 'columns') return;
    isAnimatingRef.current = true;

    const col = LENS_COLUMNS[index];
    setActiveLens(col.id);
    setPhase('expanding');

    containerRef.current?.classList.add('anim-active');
    columnRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.add('expand-active');
      el.classList.add(i === index ? 'expand-selected' : 'expand-hidden');
    });

    setTimeout(() => {
      setPhase('page');
      window.scrollTo(0, 0);
      navigate(col.id);

      // Clean up animation classes
      columnRefs.current.forEach(el => {
        if (!el) return;
        el.className = el.className
          .replace(/\bexpand[\w-]*/g, '')
          .replace(/\s+/g, ' ').trim();
      });
      containerRef.current?.classList.remove('anim-active');
      isAnimatingRef.current = false;
    }, 650);
  }, [phase]);

  const handleArchetypeClick = useCallback((slug: string, cardEl: HTMLElement) => {
    if (!activeLens) return;
    if (onArchetypeSelect) {
      onArchetypeSelect(slug, cardEl.getBoundingClientRect());
    } else {
      navigate(activeLens, slug, 'slap');
    }
  }, [activeLens, onArchetypeSelect]);

  const hasVariations = (slug: string) => {
    const a = archetypes.find(e => e.slug === slug);
    return !!(a?.variations && a.variations.length > 0);
  };

  return (
    <div className="hp-root" data-hp-phase={phase} data-testid="homepage">
      <style>{HOMEPAGE_CSS}{WIREFRAME_ICON_CSS}</style>

      {/* ── Columns Phase ─────────────────────────────── */}
      <div className="hp-columns">
        <div className="hp-columns-container" ref={containerRef}>
          {LENS_COLUMNS.map((col, i) => (
            <div
              key={col.id}
              className={`hp-column hp-column--${col.id}`}
              ref={(el) => { columnRefs.current[i] = el; }}
              data-testid={`column-${col.id}`}
              data-column={col.id}
              onClick={() => handleColumnClick(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleColumnClick(i); } }}
            >
              <div className="hp-col-inner">
                <span className="hp-col-name">{col.name}</span>
                <img
                  className="hp-col-avatar"
                  src={`https://api.dicebear.com/9.x/${col.avatarStyle}/svg?seed=gallery-preview`}
                  alt={`${col.name} avatar`}
                  data-testid={`column-avatar-${col.id}`}
                />
                <span className="hp-col-slap" data-testid={`column-slap-${col.id}`}>SLAP!</span>
                <span className="hp-col-subtitle">Every AI page looks the same.</span>
                <div className="hp-col-hover-content">
                  <span className="hp-col-hook">{col.hook}</span>
                  <span className="hp-col-enter">Enter &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hp-columns-tagline" data-testid="columns-tagline">
          Same words. Five lenses. Pick one.
        </div>
      </div>

      {/* ── Page Phase — One-pager archetype picker ────── */}
      <div className="hp-page">
        <div className="hp-picker" data-testid="archetype-picker">
          <div className="hp-picker__grid">
            {archetypes.map((entry) => {
              const active = hasVariations(entry.slug);
              return (
                <div
                  key={entry.slug}
                  className={`hp-archetype-card ${active ? '' : 'hp-archetype-card--disabled'}`}
                  data-testid={`archetype-card-${entry.slug}`}
                  onClick={(e) => active && handleArchetypeClick(entry.slug, e.currentTarget)}
                  role={active ? 'button' : undefined}
                  tabIndex={active ? 0 : undefined}
                  onKeyDown={(e) => { if (e.key === 'Enter' && active) handleArchetypeClick(entry.slug, e.currentTarget as HTMLElement); }}
                >
                  <div className="hp-archetype-card__primary">
                    <WireframeIcon slug={entry.slug} />
                    <span className="hp-archetype-card__name">{entry.name}</span>
                  </div>
                  <div className="hp-archetype-card__reveal">
                    <span className="hp-archetype-card__desc">{entry.description}</span>
                    <span className="hp-archetype-card__cta">{active ? 'Explore \u2192' : 'Coming soon'}</span>
                  </div>
                  <span className="hp-archetype-card__accent" />
                </div>
              );
            })}
          </div>
          <p className="hp-picker__tagline" data-testid="picker-tagline">
            Pick a hand.
          </p>
          <div className="hp-audience" data-testid="audience-figures">
            <div className="hp-audience__fig" style={{ animationDelay: '0s' }} />
            <div className="hp-audience__fig" style={{ animationDelay: '0.4s' }} />
            <div className="hp-audience__fig hp-audience__fig--tall" style={{ animationDelay: '0.8s' }} />
            <div className="hp-audience__fig" style={{ animationDelay: '0.2s' }} />
            <div className="hp-audience__fig hp-audience__fig--short" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CSS
// ══════════════════════════════════════════════════════════════

const HOMEPAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&family=Patrick+Hand&family=Nunito:wght@400;600;700&display=swap');

/* ── Reset ─────────────────────────────────────────── */
html, body { margin: 0; padding: 0; }

/* ── Custom Properties per Lens ────────────────────── */
[data-style="neutral"] {
  --font-heading: 'Inter', system-ui, sans-serif; --font-body: 'Inter', system-ui, sans-serif;
  --font-weight-heading: 700; --font-weight-body: 400; --font-style-heading: normal;
  --letter-spacing-heading: -0.02em; --text-transform-heading: none; --line-height-body: 1.7;
  --bg: #0a0a0a; --bg-alt: #111111; --bg-card: #141414;
  --text: #fafafa; --text-dim: rgba(250,250,250,0.55); --text-body: rgba(250,250,250,0.8);
  --accent: #ffd700; --accent2: #e6c200; --accent-text: #0a0a0a;
  --border-width: 1px; --border-style: solid; --border-color: rgba(255,255,255,0.1);
  --border-radius: 4px; --border-radius-card: 6px;
  --card-shadow: 0 2px 16px rgba(0,0,0,0.4);
  --label-font: 'Inter', system-ui, sans-serif; --label-transform: uppercase;
  --label-spacing: 0.1em; --label-size: 11px; --label-weight: 600; --label-color: var(--accent);
  --icon-color: #ffd700; --icon-dim: rgba(255,215,0,0.3);
}
[data-style="neutral"][data-theme="light"] {
  --bg: #fafafa; --bg-alt: #f0f0f0; --bg-card: #ffffff;
  --text: #0a0a0a; --text-dim: rgba(10,10,10,0.5); --text-body: #333333;
  --accent: #b8960a; --accent2: #8a7008; --accent-text: #ffffff;
  --border-color: rgba(0,0,0,0.1); --card-shadow: 0 1px 6px rgba(0,0,0,0.06);
}
[data-style="editorial"] {
  --font-heading: 'Playfair Display', Georgia, serif; --font-body: 'Inter', system-ui, sans-serif;
  --font-weight-heading: 900; --font-weight-body: 400; --font-style-heading: italic;
  --letter-spacing-heading: -0.02em; --text-transform-heading: none; --line-height-body: 1.8;
  --bg: #faf8f4; --bg-alt: #f2ede5; --bg-card: #ffffff;
  --text: #1a1a1a; --text-dim: rgba(26,26,26,0.45); --text-body: #3a352e;
  --accent: #e85d75; --accent2: #c8a960; --accent-text: #ffffff;
  --border-width: 1px; --border-style: solid; --border-color: rgba(26,26,26,0.15);
  --border-radius: 0px; --border-radius-card: 0px;
  --card-shadow: 0 1px 3px rgba(0,0,0,0.06);
  --label-font: 'Inter', system-ui, sans-serif; --label-transform: uppercase;
  --label-spacing: 0.15em; --label-size: 10px; --label-weight: 600; --label-color: var(--accent);
  --icon-color: #e85d75; --icon-dim: rgba(232,93,117,0.3);
}
[data-style="editorial"][data-theme="dark"] {
  --bg: #1a1612; --bg-alt: #231e18; --bg-card: #1e1914;
  --text: #f5f0e8; --text-dim: rgba(245,240,232,0.5); --text-body: rgba(245,240,232,0.8);
  --border-color: rgba(245,240,232,0.12);
}
[data-style="brutalist"] {
  --font-heading: system-ui, -apple-system, sans-serif; --font-body: system-ui, -apple-system, sans-serif;
  --font-weight-heading: 900; --font-weight-body: 400; --font-style-heading: normal;
  --letter-spacing-heading: -0.03em; --text-transform-heading: uppercase; --line-height-body: 1.6;
  --bg: #ffffff; --bg-alt: #f0f0f0; --bg-card: #ffffff;
  --text: #000000; --text-dim: rgba(0,0,0,0.5); --text-body: #1a1a1a;
  --accent: #ff0000; --accent2: #ff0000; --accent-text: #ffffff;
  --border-width: 3px; --border-style: solid; --border-color: #000000;
  --border-radius: 0px; --border-radius-card: 0px;
  --card-shadow: none;
  --label-font: system-ui, sans-serif; --label-transform: uppercase;
  --label-spacing: 0.2em; --label-size: 12px; --label-weight: 900; --label-color: var(--accent);
  --icon-color: #ff0000; --icon-dim: rgba(255,0,0,0.3);
}
[data-style="brutalist"][data-theme="dark"] {
  --bg: #000000; --bg-alt: #0a0a0a; --bg-card: #0a0a0a;
  --text: #ffffff; --text-dim: rgba(255,255,255,0.5); --text-body: #e0e0e0;
  --border-color: #ffffff;
}
[data-style="minimal"] {
  --font-heading: 'Inter', system-ui, sans-serif; --font-body: 'Inter', system-ui, sans-serif;
  --font-weight-heading: 300; --font-weight-body: 300; --font-style-heading: normal;
  --letter-spacing-heading: -0.01em; --text-transform-heading: none; --line-height-body: 1.9;
  --bg: #fafafa; --bg-alt: #f5f5f5; --bg-card: #ffffff;
  --text: #1a1a1a; --text-dim: #888888; --text-body: #444444;
  --accent: #888888; --accent2: #aaaaaa; --accent-text: #ffffff;
  --border-width: 1px; --border-style: solid; --border-color: #dddddd;
  --border-radius: 0px; --border-radius-card: 0px;
  --card-shadow: none;
  --label-font: 'Inter', system-ui, sans-serif; --label-transform: uppercase;
  --label-spacing: 0.2em; --label-size: 9px; --label-weight: 500; --label-color: var(--accent);
  --icon-color: #888888; --icon-dim: rgba(136,136,136,0.3);
}
[data-style="minimal"][data-theme="dark"] {
  --bg: #111111; --bg-alt: #1a1a1a; --bg-card: #161616;
  --text: #e0e0e0; --text-dim: #666666; --text-body: #aaaaaa;
  --accent: #666666; --accent2: #555555; --border-color: #2a2a2a;
}
[data-style="chalkboard"] {
  --font-heading: 'Patrick Hand', cursive; --font-body: 'Nunito', system-ui, sans-serif;
  --font-weight-heading: 400; --font-weight-body: 400; --font-style-heading: normal;
  --letter-spacing-heading: 0.01em; --text-transform-heading: none; --line-height-body: 1.75;
  --bg: #2d4a3e; --bg-alt: #243d33; --bg-card: rgba(255,255,255,0.05);
  --text: #e8dcc8; --text-dim: rgba(232,220,200,0.5); --text-body: rgba(232,220,200,0.85);
  --accent: #ffd93d; --accent2: #ff6b9d; --accent-text: #2d4a3e;
  --border-width: 2px; --border-style: dashed; --border-color: rgba(232,220,200,0.25);
  --border-radius: 4px; --border-radius-card: 6px;
  --card-shadow: none;
  --label-font: 'Patrick Hand', cursive; --label-transform: none;
  --label-spacing: 0.05em; --label-size: 14px; --label-weight: 400; --label-color: var(--accent2);
  --icon-color: #ffd93d; --icon-dim: rgba(255,217,61,0.3);
}
[data-style="chalkboard"][data-theme="light"] {
  --bg: #f5f0e8; --bg-alt: #ebe5d6; --bg-card: rgba(0,0,0,0.03);
  --text: #2d4a3e; --text-dim: rgba(45,74,62,0.5); --text-body: rgba(45,74,62,0.8);
  --accent: #c9a520; --accent2: #d4506a; --border-color: rgba(45,74,62,0.2);
}

/* ── Root Layout ───────────────────────────────────── */
.hp-root { min-height: 100vh; background: #0a0a0a; }

/* ── Columns Phase ─────────────────────────────────── */
.hp-columns {
  position: fixed; inset: 0; z-index: 100;
  display: flex; flex-direction: column;
  background: #0a0a0a; color: #f5f0e1;
  transition: opacity 300ms ease;
}
[data-hp-phase="page"] .hp-columns {
  opacity: 0; pointer-events: none;
}
.hp-columns-container {
  flex: 1; display: flex; min-height: 0;
  perspective: 1200px; transform-style: preserve-3d;
}
.hp-column {
  flex: 1 1 20%; min-width: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 40px 16px;
  cursor: pointer; position: relative; overflow: hidden;
  transition: flex-basis 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 400ms ease;
  transform-origin: center center;
  backface-visibility: hidden;
}

/* Hover: expand hovered column (disabled during animation) */
.hp-columns-container:not(.anim-active):hover .hp-column {
  flex-basis: 15%; opacity: 0.7;
}
.hp-columns-container:not(.anim-active):hover .hp-column:hover {
  flex-basis: 40%; opacity: 1;
}

/* Hover-reveal hook + enter */
.hp-col-hover-content {
  opacity: 0; max-height: 0; overflow: hidden;
  transition: opacity 300ms ease 100ms, max-height 300ms ease;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.hp-columns-container:not(.anim-active):hover .hp-column:hover .hp-col-hover-content {
  opacity: 1; max-height: 120px;
}

/* Column inner content */
.hp-col-inner {
  display: flex; flex-direction: column; align-items: center;
  gap: 16px; max-width: 280px; width: 100%;
}
.hp-col-name {
  font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
  text-transform: uppercase; white-space: nowrap;
}
.hp-col-avatar {
  width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
}
.hp-col-slap {
  font-size: clamp(2rem, 3.5vw, 3.5rem); line-height: 1; white-space: nowrap;
}
.hp-col-subtitle {
  font-size: 0.8rem; opacity: 0.65; max-width: 200px; line-height: 1.4;
}
.hp-col-hook {
  font-size: 0.85rem; line-height: 1.5; max-width: 220px; opacity: 0.8;
}
.hp-col-enter {
  font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; opacity: 0.9;
}

/* Bottom tagline */
.hp-columns-tagline {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  z-index: 200; font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 400; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(255, 255, 255, 0.5);
  white-space: nowrap; pointer-events: none;
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
  transition: opacity 400ms ease;
}
[data-hp-phase="page"] .hp-columns-tagline,
[data-hp-phase="expanding"] .hp-columns-tagline { opacity: 0; }

/* ── Column-Specific Decoratives ──────────────────── */

/* Editorial */
.hp-column--editorial { background: #faf8f4; color: #1a1a1a; border-right: 1px solid rgba(26, 26, 26, 0.1); }
.hp-column--editorial::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #e85d75;
}
.hp-column--editorial .hp-col-name { font-family: 'Inter', sans-serif; color: #e85d75; }
.hp-column--editorial .hp-col-slap { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; font-style: italic; color: #1a1a1a; }
.hp-column--editorial .hp-col-subtitle { font-family: 'Inter', sans-serif; font-weight: 400; color: #3a352e; }
.hp-column--editorial .hp-col-hook { font-family: 'Inter', sans-serif; color: #3a352e; }
.hp-column--editorial .hp-col-enter { color: #e85d75; }
.hp-column--editorial .hp-col-avatar { border: 1px solid rgba(26, 26, 26, 0.12); }

/* Brutalist */
.hp-column--brutalist { background: #ffffff; color: #000000; border-right: 3px solid #000000; }
.hp-column--brutalist .hp-col-name { font-family: system-ui, -apple-system, sans-serif; font-weight: 900; color: #ff0000; letter-spacing: 0.2em; }
.hp-column--brutalist .hp-col-slap { font-family: system-ui, -apple-system, sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: -0.03em; color: #000000; }
.hp-column--brutalist .hp-col-subtitle { font-family: system-ui, sans-serif; font-weight: 400; color: #1a1a1a; }
.hp-column--brutalist .hp-col-hook { font-family: system-ui, sans-serif; color: #1a1a1a; }
.hp-column--brutalist .hp-col-enter { color: #ff0000; text-transform: uppercase; letter-spacing: 0.15em; }
.hp-column--brutalist .hp-col-avatar { border-radius: 0; border: 3px solid #000000; }

/* Minimal */
.hp-column--minimal { background: #fafafa; color: #1a1a1a; border-right: 1px solid #e0e0e0; }
.hp-column--minimal .hp-col-name { font-family: 'Inter', sans-serif; font-weight: 300; color: #888888; letter-spacing: 0.25em; }
.hp-column--minimal .hp-col-slap { font-family: 'Inter', sans-serif; font-weight: 300; color: #1a1a1a; letter-spacing: -0.01em; }
.hp-column--minimal .hp-col-subtitle { font-family: 'Inter', sans-serif; font-weight: 300; color: #888888; }
.hp-column--minimal .hp-col-hook { font-family: 'Inter', sans-serif; font-weight: 300; color: #888; }
.hp-column--minimal .hp-col-enter { color: #1a1a1a; font-weight: 400; }
.hp-column--minimal .hp-col-avatar { border-radius: 0; border: 1px solid #ddd; }

/* Chalkboard */
.hp-column--chalkboard { background: #2d4a3e; color: #e8dcc8; border-right: 2px dashed rgba(232, 220, 200, 0.25); }
.hp-column--chalkboard::after {
  content: ''; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px; opacity: 0.15; pointer-events: none; mix-blend-mode: overlay;
}
.hp-column--chalkboard .hp-col-name { font-family: 'Patrick Hand', cursive; color: #ffd93d; font-weight: 400; letter-spacing: 0.08em; font-size: 13px; }
.hp-column--chalkboard .hp-col-slap { font-family: 'Patrick Hand', cursive; font-weight: 400; color: #e8dcc8; }
.hp-column--chalkboard .hp-col-subtitle { font-family: 'Nunito', sans-serif; color: rgba(232, 220, 200, 0.6); }
.hp-column--chalkboard .hp-col-hook { font-family: 'Nunito', sans-serif; color: rgba(232, 220, 200, 0.7); }
.hp-column--chalkboard .hp-col-enter { font-family: 'Patrick Hand', cursive; color: #ffd93d; }
.hp-column--chalkboard .hp-col-avatar { border: 2px dashed rgba(232, 220, 200, 0.3); }

/* Neutral */
.hp-column--neutral { background: #0a0a0a; color: #fafafa; }
.hp-column--neutral .hp-col-name { font-family: 'Inter', sans-serif; color: #ffd700; font-weight: 600; }
.hp-column--neutral .hp-col-slap { font-family: 'Inter', sans-serif; font-weight: 700; color: #fafafa; letter-spacing: -0.02em; }
.hp-column--neutral .hp-col-subtitle { font-family: 'Inter', sans-serif; color: rgba(250, 250, 250, 0.55); }
.hp-column--neutral .hp-col-hook { font-family: 'Inter', sans-serif; color: rgba(250, 250, 250, 0.7); }
.hp-column--neutral .hp-col-enter { color: #ffd700; }
.hp-column--neutral .hp-col-avatar { border: 1px solid rgba(255, 215, 0, 0.25); }

/* ── Page Phase (Archetype Picker) ────────────────── */
.hp-page {
  background: var(--bg, #0a0a0a); color: var(--text, #fafafa);
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}
[data-hp-phase="columns"] .hp-page,
[data-hp-phase="expanding"] .hp-page { display: none; }

/* ── Picker Layout ────────────────────────────────── */
.hp-picker {
  display: flex; flex-direction: column; align-items: center;
  padding: 40px 24px; width: 100%; max-width: 960px;
}
.hp-picker__grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; width: 100%;
}
.hp-picker__tagline {
  margin: 32px 0 0;
  font-family: var(--label-font, 'Inter', sans-serif);
  font-size: var(--label-size, 11px);
  font-weight: var(--label-weight, 500);
  letter-spacing: var(--label-spacing, 0.12em);
  text-transform: var(--label-transform, uppercase);
  color: var(--text-dim, rgba(255,255,255,0.5));
}

/* ── Archetype Cards (Flip-Peek) ──────────────────── */
.hp-archetype-card {
  background: var(--bg-card);
  border: var(--border-width) var(--border-style) var(--border-color);
  border-radius: var(--border-radius-card); box-shadow: var(--card-shadow);
  padding: 28px 20px; display: flex; flex-direction: column; align-items: center;
  text-align: center; cursor: pointer; position: relative; overflow: hidden;
  height: 220px; justify-content: center; color: var(--text);
  transition: transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 400ms ease, border-color 300ms ease;
  transform-style: preserve-3d; perspective: 600px;
}
.hp-archetype-card:hover {
  transform: perspective(600px) rotateX(-8deg) translateY(-6px);
  box-shadow: 0 24px 48px rgba(0,0,0,0.2); border-color: var(--accent);
}
.hp-archetype-card__primary {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}
.hp-archetype-card:hover .hp-archetype-card__primary { transform: translateY(-16px); }
.hp-archetype-card:hover .icon-wireframe { transform: scale(1.15); }
.hp-archetype-card__name {
  font-family: var(--font-heading); font-weight: var(--font-weight-heading);
  font-style: var(--font-style-heading, normal);
  font-size: 1.05rem; color: var(--text);
}
.hp-archetype-card__reveal {
  position: absolute; bottom: 24px; left: 0; right: 0;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  opacity: 0; transform: translateY(10px);
  transition: opacity 350ms ease 100ms, transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms;
  z-index: 1; padding: 0 16px;
}
.hp-archetype-card:hover .hp-archetype-card__reveal { opacity: 1; transform: translateY(0); }
.hp-archetype-card__desc {
  font-family: var(--font-body); font-weight: var(--font-weight-body, 400);
  font-size: 0.72rem; color: var(--text-dim); line-height: 1.4;
  max-width: 190px;
}
.hp-archetype-card__cta {
  font-family: 'Courier New', monospace;
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--accent);
}
.hp-archetype-card__accent {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: var(--accent); transform: scaleX(0);
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: left;
}
.hp-archetype-card:hover .hp-archetype-card__accent { transform: scaleX(1); }
.hp-archetype-card--disabled {
  pointer-events: none; opacity: 0.45; cursor: default;
}
.hp-archetype-card--disabled .hp-archetype-card__cta { color: var(--text-dim); }

/* ── Card Lens Decoratives ────────────────────────── */
[data-style="editorial"] .hp-archetype-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
  background: var(--accent); opacity: 0; transition: opacity 0.3s;
}
[data-style="editorial"] .hp-archetype-card:hover::before { opacity: 1; }
[data-style="brutalist"] .hp-archetype-card { border-width: 3px; border-color: var(--border-color); }
[data-style="brutalist"] .hp-archetype-card__name { text-transform: uppercase; letter-spacing: -0.02em; }
[data-style="chalkboard"] .hp-archetype-card::after {
  content: ''; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px; opacity: 0.08; pointer-events: none;
  mix-blend-mode: overlay; border-radius: var(--border-radius-card);
}
[data-style="chalkboard"] .hp-archetype-card { border-style: dashed; }
[data-style="minimal"] .hp-archetype-card { border-color: transparent; }
[data-style="minimal"] .hp-archetype-card:hover { border-color: var(--border-color); }
[data-style="minimal"] .hp-archetype-card__name { letter-spacing: 0.04em; }

/* ── Card Click Compression ───────────────────────── */
.hp-archetype-card:active:not(.hp-archetype-card--disabled) {
  transform: perspective(600px) scale(0.95) !important;
  transition: transform 50ms ease !important;
}

/* ── Audience Silhouettes ────────────────────────── */
@keyframes audienceIdle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
.hp-audience {
  display: flex; gap: 16px; justify-content: center;
  margin-top: 20px; pointer-events: none; opacity: 0.25;
}
.hp-audience__fig {
  width: 8px; height: 18px; position: relative;
  animation: audienceIdle 3s ease-in-out infinite;
}
.hp-audience__fig--tall { height: 22px; }
.hp-audience__fig--short { height: 15px; }
.hp-audience__fig::before {
  content: ''; position: absolute; top: 0; left: 50%;
  transform: translateX(-50%);
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--text-dim, rgba(255,255,255,0.5));
}
.hp-audience__fig::after {
  content: ''; position: absolute; top: 8px; left: 50%;
  transform: translateX(-50%);
  width: 4px; height: calc(100% - 8px); border-radius: 1px;
  background: var(--text-dim, rgba(255,255,255,0.5));
}

/* ══ EXPAND ANIMATION ═════════════════════════════════ */
.anim-active .hp-column.expand-active {
  transition: flex-basis 600ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 400ms ease !important;
}
.hp-column.expand-selected { flex-basis: 100% !important; opacity: 1 !important; }
.hp-column.expand-hidden { flex-basis: 0% !important; opacity: 0 !important; padding: 0 !important; overflow: hidden; }

/* ── Mobile ────────────────────────────────────────── */
@media (max-width: 768px) {
  .hp-columns-container { flex-direction: column; height: auto; min-height: 100vh; }
  .hp-column { flex: 1 1 20vh; min-height: 20vh; padding: 24px 16px; }
  .hp-columns-container:not(.anim-active):hover .hp-column { flex-basis: 15vh; opacity: 0.7; }
  .hp-columns-container:not(.anim-active):hover .hp-column:hover { flex-basis: 40vh; opacity: 1; }

  .hp-col-slap { font-size: clamp(1.6rem, 6vw, 2.2rem); }
  .hp-col-avatar { width: 48px; height: 48px; }
  .hp-col-inner { flex-direction: row; gap: 16px; max-width: 100%; justify-content: center; flex-wrap: wrap; }
  .hp-col-subtitle { display: none; }
  .hp-columns-tagline { bottom: 12px; font-size: 10px; letter-spacing: 0.08em; }

  .hp-picker__grid { grid-template-columns: repeat(2, 1fr); }
  .hp-archetype-card { height: auto; min-height: 180px; }
}

/* ── Reduced Motion ────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hp-column { transition: none !important; }
}
`;
