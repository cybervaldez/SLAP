/**
 * Ref highlight utility — resolves finding refs to DOM elements/text ranges.
 *
 * Resolution strategy (hybrid):
 *   1. Try [data-ref="${ref}"] selector → element-level highlight
 *   2. Fall back to TreeWalker text search → text-level highlight (CSS Highlight API)
 *   3. If neither found, no-op
 *
 * Highlight tiers:
 *   Element: adds .slap-ref-element class (dashed outline + badge)
 *   Text:    CSS.highlights.set('slap-ref', Highlight) (wavy underline + tint)
 *
 * Accepts an HTMLElement container — all queries scoped to that container.
 */

import { useCallback, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────

interface RefTarget {
  type: 'element' | 'text';
  element: Element;
  range?: Range;
}

export interface RefHighlighter {
  apply: (ref: string, container: HTMLElement) => RefTarget | null;
  clear: (container: HTMLElement) => void;
}

// ─── Resolver ─────────────────────────────────────────────

function resolveRef(ref: string, container: HTMLElement): RefTarget | null {
  // Strategy 1: data-ref attribute (exact match)
  const byAttr = container.querySelector(`[data-ref="${CSS.escape(ref)}"]`);
  if (byAttr) {
    return { type: 'element', element: byAttr };
  }

  // Strategy 2: TreeWalker text search
  const range = findTextRange(ref, container);
  if (range) {
    const el = range.startContainer.parentElement;
    if (el) {
      return { type: 'text', element: el, range };
    }
  }

  return null;
}

function findTextRange(needle: string, root: HTMLElement): Range | null {
  const lower = needle.toLowerCase();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const text = node.textContent || '';
    const idx = text.toLowerCase().indexOf(lower);
    if (idx === -1) continue;

    const range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + needle.length);
    return range;
  }

  return null;
}

// ─── Highlighter ──────────────────────────────────────────

const REF_ELEMENT_CLASS = 'slap-ref-element';
const HIGHLIGHT_NAME = 'slap-ref';

function applyHighlight(target: RefTarget): void {
  if (target.type === 'element') {
    target.element.classList.add(REF_ELEMENT_CLASS);
    target.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else if (target.type === 'text' && target.range) {
    // CSS Custom Highlight API
    if ('Highlight' in window && (window as any).CSS?.highlights) {
      const hl = new (window as any).Highlight(target.range);
      (window as any).CSS.highlights.set(HIGHLIGHT_NAME, hl);
    }
    target.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function clearHighlights(container: HTMLElement): void {
  // Clear element highlights
  container.querySelectorAll(`.${REF_ELEMENT_CLASS}`).forEach(el => {
    el.classList.remove(REF_ELEMENT_CLASS);
  });

  // Clear CSS Highlight API
  if ((window as any).CSS?.highlights) {
    (window as any).CSS.highlights.delete(HIGHLIGHT_NAME);
  }
}

// ─── Hook ─────────────────────────────────────────────────

export function useRefHighlight(): RefHighlighter {
  const lastTargetRef = useRef<RefTarget | null>(null);

  const apply = useCallback((ref: string, container: HTMLElement): RefTarget | null => {
    // Clear previous
    clearHighlights(container);
    lastTargetRef.current = null;

    if (!ref) return null;

    const target = resolveRef(ref, container);
    if (!target) return null;

    applyHighlight(target);
    lastTargetRef.current = target;
    return target;
  }, []);

  const clear = useCallback((container: HTMLElement): void => {
    clearHighlights(container);
    lastTargetRef.current = null;
  }, []);

  return { apply, clear };
}

// ─── Exports ──────────────────────────────────────────────

export { REF_ELEMENT_CLASS, HIGHLIGHT_NAME };
