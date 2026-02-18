/**
 * Design canvas — renders the design being reviewed.
 *
 * Two rendering paths:
 *   1. HTML injection: fetch external HTML, scope CSS, inject inline
 *   2. React component: project provides a component
 *
 * Each section has data-section for the review system.
 */

import { useEffect, useRef } from 'react';
import type { ProjectDef } from '../data/projects';

// ─── CSS Scoping ─────────────────────────────────────────

/**
 * Split CSS into top-level rule blocks, handling nested braces
 * (e.g. @media queries contain inner rule blocks).
 */
function splitTopLevelBlocks(css: string): string[] {
  // Strip comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  const blocks: string[] = [];
  let depth = 0;
  let current = '';

  for (const ch of css) {
    current += ch;
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        blocks.push(current.trim());
        current = '';
      }
    }
  }

  return blocks.filter(b => b.length > 0);
}

/** Rewrite a single CSS selector to be scoped under a container. */
function scopeSelector(sel: string, scope: string): string {
  sel = sel.trim();
  if (!sel) return sel;
  if (sel === ':root') return scope;
  if (sel === '*') return `${scope}, ${scope} *`;
  if (/^(html|body)$/i.test(sel)) return scope;
  if (sel.startsWith('[data-theme')) return `${scope}${sel}`;
  return `${scope} ${sel}`;
}

/**
 * Scope all CSS selectors under a container class.
 * Handles :root, *, html, body, [data-theme], element selectors,
 * class selectors, and @media queries.
 */
function scopeDesignCSS(css: string, scope: string): string {
  const blocks = splitTopLevelBlocks(css);

  return blocks.map(block => {
    // @media: recurse into inner rules
    if (block.startsWith('@media')) {
      const firstBrace = block.indexOf('{');
      const query = block.substring(0, firstBrace + 1);
      const inner = block.substring(firstBrace + 1, block.lastIndexOf('}'));
      return `${query}\n${scopeDesignCSS(inner, scope)}\n}`;
    }

    // @keyframes, @font-face, etc. — pass through unchanged
    if (block.startsWith('@')) return block;

    // Regular rule: selector(s) { declarations }
    const braceIdx = block.indexOf('{');
    if (braceIdx === -1) return block;

    const selectorText = block.substring(0, braceIdx).trim();
    const body = block.substring(braceIdx);

    const scoped = selectorText
      .split(',')
      .map(s => scopeSelector(s, scope))
      .join(', ');

    return `${scoped} ${body}`;
  }).join('\n');
}

// ─── HTML Canvas ─────────────────────────────────────────

interface HtmlCanvasProps {
  url: string;
  name: string;
  onReady?: () => void;
}

function HtmlCanvas({ url, name, onReady }: HtmlCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    fetch(url)
      .then(r => r.text())
      .then(html => {
        if (cancelled) return;
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        container.innerHTML = '';

        // Extract and scope all <style> blocks
        const allCSS = Array.from(parsed.querySelectorAll('style'))
          .map(s => s.textContent || '')
          .join('\n');

        if (allCSS) {
          const style = document.createElement('style');
          style.setAttribute('data-design-styles', 'true');
          style.textContent = scopeDesignCSS(allCSS, '.slap-design');
          container.appendChild(style);
        }

        // Strip scripts, standalone header nav, and footer
        parsed.body.querySelectorAll('script').forEach(el => el.remove());
        parsed.body.querySelectorAll('body > header').forEach(el => el.remove());
        parsed.body.querySelectorAll('body > footer').forEach(el => el.remove());

        // Inject body content
        while (parsed.body.firstChild) {
          container.appendChild(document.adoptNode(parsed.body.firstChild));
        }

        onReady?.();
      });

    return () => { cancelled = true; };
  }, [url, onReady]);

  return (
    <div
      ref={containerRef}
      className="slap-design"
      data-testid="design-html"
      aria-label={`${name} design`}
    />
  );
}

// ─── Main Component ──────────────────────────────────────

interface Props {
  version: string;
  project?: ProjectDef;
  onHtmlReady?: () => void;
}

export default function DesignCanvas({ version, project, onHtmlReady }: Props) {
  // HTML injection mode: project provides htmlUrl
  if (project?.htmlUrl) {
    return (
      <HtmlCanvas
        url={project.htmlUrl(version)}
        name={project.name}
        onReady={onHtmlReady}
      />
    );
  }

  // Inline mode: use project component
  const Component = project?.component;
  if (Component) return <Component version={version} />;

  return <div data-testid="no-design">No design found for this project.</div>;
}
