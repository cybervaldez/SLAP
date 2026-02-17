/**
 * Section highlight overlay — Driver.js spotlight + text underline + annotation.
 *
 * When `suppressAnnotation` is true (tour active), the annotation label is
 * hidden because the chin (guided) or speech bubble (live) narrates instead.
 */

import { useState, useEffect, useRef } from 'react';
import { driver, type Config as DriverConfig } from 'driver.js';
import 'driver.js/dist/driver.css';

export interface HighlightInfo {
  section: string;
  text?: string;
  color?: string;
  ref?: string;
}

interface Props {
  isOpen: boolean;
  highlight: HighlightInfo | null;
  suppressAnnotation?: boolean;
}

// ─── Text-level highlight via TreeWalker ─────────────────

function highlightTextInSection(root: Element, needle: string): (() => void) | null {
  if (!needle) return null;
  const lower = needle.toLowerCase();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const text = node.textContent || '';
    const idx = text.toLowerCase().indexOf(lower);
    if (idx === -1) continue;
    const parent = node.parentNode;
    if (!parent || (parent instanceof HTMLElement && parent.tagName === 'MARK')) continue;

    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + needle.length);
    const after = text.slice(idx + needle.length);

    const mark = document.createElement('mark');
    mark.setAttribute('data-testid', 'text-highlight');
    mark.setAttribute('data-slap-highlight', 'true');
    Object.assign(mark.style, { background: 'transparent', borderBottom: '2px solid #FFD000', color: 'inherit', padding: '0 1px', transition: 'border-color 150ms ease' });
    mark.textContent = match;

    const frag = document.createDocumentFragment();
    if (before) frag.appendChild(document.createTextNode(before));
    frag.appendChild(mark);
    if (after) frag.appendChild(document.createTextNode(after));
    parent.replaceChild(frag, node);

    return () => {
      if (!mark.parentNode) return;
      const restored = document.createTextNode(text);
      const mp = mark.parentNode;
      const toRemove: Node[] = [];
      let sib = mark.previousSibling;
      while (sib && sib.nodeType === Node.TEXT_NODE) { if (sib.textContent === before) { toRemove.push(sib); break; } sib = sib.previousSibling; }
      toRemove.push(mark);
      sib = mark.nextSibling;
      while (sib && sib.nodeType === Node.TEXT_NODE) { if (sib.textContent === after) { toRemove.push(sib); break; } sib = sib.nextSibling; }
      if (toRemove.length) { mp.replaceChild(restored, toRemove[0]); for (let i = 1; i < toRemove.length; i++) if (toRemove[i].parentNode === mp) mp.removeChild(toRemove[i]); }
    };
  }
  return null;
}

// ─── Driver.js ───────────────────────────────────────────

const DRIVER_CSS = `.driver-overlay { z-index: 940 !important; } .driver-popover { display: none !important; }`;

function createDriver(): ReturnType<typeof driver> {
  const cfg: DriverConfig = {
    overlayColor: 'black', overlayOpacity: 0.6, smoothScroll: true,
    stagePadding: 4, stageRadius: 4, animate: false, allowClose: false,
    onHighlighted: () => {
      const el = document.querySelector('.driver-active-element') as HTMLElement | null;
      if (el) { el.style.setProperty('z-index', '941', 'important'); el.style.setProperty('pointer-events', 'none', 'important'); }
    },
  };
  return driver(cfg);
}

// ─── Component ───────────────────────────────────────────

export default function SectionHighlightOverlay({ isOpen, highlight, suppressAnnotation = false }: Props) {
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const textCleanup = useRef<(() => void) | null>(null);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);

  const section = highlight?.section ?? null;
  const text = highlight?.text ?? null;
  const color = highlight?.color ?? '#FFD000';
  const ref = highlight?.ref ?? null;

  // Spotlight
  useEffect(() => {
    driverRef.current?.destroy(); driverRef.current = null;
    if (!isOpen || !section) return;
    const sel = `[data-section="${section}"]`;
    if (!document.querySelector(sel)) return;
    const d = createDriver(); driverRef.current = d;
    d.highlight({ element: sel });
    return () => { driverRef.current?.destroy(); driverRef.current = null; };
  }, [isOpen, section]);

  // Text underline
  useEffect(() => {
    textCleanup.current?.(); textCleanup.current = null;
    if (!isOpen || !section || !ref) return;
    const el = document.querySelector(`[data-section="${section}"]`);
    if (el) textCleanup.current = highlightTextInSection(el, ref);
    return () => { textCleanup.current?.(); textCleanup.current = null; };
  }, [isOpen, section, ref]);

  // Annotation position
  useEffect(() => {
    setRect(null);
    if (!isOpen || !section) return;
    const read = () => { const el = document.querySelector(`[data-section="${section}"]`); if (el) { const r = el.getBoundingClientRect(); setRect({ top: r.top, left: r.left, width: r.width }); } };
    const t1 = setTimeout(read, 50);
    const t2 = setTimeout(read, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isOpen, section]);

  // Cleanup on unmount
  useEffect(() => () => { textCleanup.current?.(); driverRef.current?.destroy(); }, []);

  if (!isOpen || !section) return null;

  return (
    <>
      <style>{DRIVER_CSS}</style>
      <div data-testid="section-highlight-overlay" data-highlighted-section={section} data-highlighted-ref={ref || undefined} style={{ display: 'none' }} />

      {!suppressAnnotation && text && rect && (
        <div
          data-testid="section-annotation"
          style={{
            position: 'fixed', top: Math.max(8, rect.top - 32), left: rect.left + 8,
            zIndex: 100001, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.25rem 0.6rem',
            background: 'rgba(26,26,46,0.95)', border: `1.5px solid ${color}`, borderRadius: 4,
            fontFamily: "'Courier New', monospace", fontSize: '0.55rem', fontWeight: 700,
            letterSpacing: '0.04em', color: '#F5F0E1',
            maxWidth: Math.min(rect.width - 16, 400),
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            transition: 'top 0.15s ease, opacity 0.2s ease',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{ color, marginRight: '0.3rem' }}>{section.toUpperCase()}</span>
          <span style={{ opacity: 0.85 }}>{text}</span>
        </div>
      )}
    </>
  );
}
