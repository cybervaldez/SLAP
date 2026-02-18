/**
 * Design canvas — renders the design being reviewed.
 *
 * Three rendering paths:
 *   1. HTML injection: fetch external HTML, scope CSS, inject inline
 *   2. React component: project provides a component
 *   3. Fallback: legacy hardcoded V1/V2 canvases
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

  // Fallback: legacy hardcoded V1/V2 canvases
  if (version === 'v2') return <V2Canvas />;
  return <V1Canvas />;
}

/** V1 — AI-generated "slop" (the version that gets roasted) */
function V1Canvas() {
  return (
    <>
      {/* HERO */}
      <div className="draft-section" data-section="hero" data-testid="hero-section" role="region" aria-label="Hero section">
        <div className="draft-section-label">Hero</div>
        <h2 data-ref="hero-headline">Unlock the Power of Seamless Integration</h2>
        <p>
          Boost productivity by 10x with our AI-powered platform. Connect your
          tools, automate your workflows, and focus on what matters most.
        </p>
        <button className="draft-cta-btn" data-ref="hero-cta">Get Started Today</button>
      </div>

      {/* FEATURES */}
      <div className="draft-section" data-section="features" data-testid="features-section" role="region" aria-label="Features section">
        <div className="draft-section-label">Features</div>
        <h2 data-ref="features-headline">Everything you need to scale</h2>
        <div className="draft-feature-grid">
          <div className="draft-feature-card" data-ref="feature-automation">
            <h4>Smart Automation</h4>
            <p>Set up workflows in minutes. Our AI handles the rest, learning from your patterns.</p>
          </div>
          <div className="draft-feature-card" data-ref="feature-sync">
            <h4>Real-time Sync</h4>
            <p>Changes propagate instantly across all connected tools and team members.</p>
          </div>
          <div className="draft-feature-card" data-ref="feature-analytics">
            <h4>Advanced Analytics</h4>
            <p>Track performance metrics with customizable dashboards and reports.</p>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="draft-section" data-section="pricing" data-testid="pricing-section" role="region" aria-label="Pricing section">
        <div className="draft-section-label">Pricing</div>
        <h2 data-ref="pricing-headline">Simple, transparent pricing</h2>
        <div className="draft-pricing-tiers">
          <div className="draft-tier" data-ref="tier-starter">
            <h4>Starter</h4>
            <div className="draft-tier-price">$29</div>
            <p>For individuals and small teams</p>
          </div>
          <div className="draft-tier featured" data-ref="tier-pro">
            <h4>Professional</h4>
            <div className="draft-tier-price">$79</div>
            <p>For growing businesses</p>
          </div>
          <div className="draft-tier" data-ref="tier-enterprise">
            <h4>Enterprise</h4>
            <div className="draft-tier-price">$149</div>
            <p>For large organizations</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="draft-section" data-section="cta" data-testid="cta-section" role="region" aria-label="Call to action section">
        <div className="draft-section-label">Call to Action</div>
        <h2 data-ref="cta-headline">Ready to Transform Your Workflow?</h2>
        <p>
          Join 10,000+ teams already using our platform. Start your free trial
          today &mdash; no credit card required.
        </p>
        <button className="draft-cta-outline" data-ref="cta-button">Get Started &rarr;</button>
      </div>
    </>
  );
}

/** V2 — After SLAP review (intentional design) */
function V2Canvas() {
  return (
    <>
      <div className="draft-section" data-section="hero" data-testid="hero-section" role="region" aria-label="Hero section">
        <div className="draft-section-label">Hero</div>
        <h2 data-ref="hero-headline">Ship your first feature in 4 minutes</h2>
        <p>
          Not &quot;get started.&quot; Not &quot;unlock the power of.&quot;
          Paste your repo URL and watch it deploy. That&apos;s it.
        </p>
        <button className="draft-cta-btn" data-ref="hero-cta">Deploy now &mdash; free</button>
      </div>

      <div className="draft-section" data-section="features" data-testid="features-section" role="region" aria-label="Features section">
        <div className="draft-section-label">Features</div>
        <h2 data-ref="features-headline">What you get (no buzzwords)</h2>
        <div className="draft-feature-grid">
          <div className="draft-feature-card" data-ref="feature-deploy">
            <h4>Git Push = Deploy</h4>
            <p>Push to main, see it live in 12 seconds. No CI config, no YAML.</p>
          </div>
          <div className="draft-feature-card" data-ref="feature-preview">
            <h4>Preview per PR</h4>
            <p>Every pull request gets a unique URL. Share it with your team.</p>
          </div>
          <div className="draft-feature-card" data-ref="feature-logs">
            <h4>Logs that help</h4>
            <p>Structured logs with context. No more grepping through walls of text.</p>
          </div>
        </div>
      </div>

      <div className="draft-section" data-section="pricing" data-testid="pricing-section" role="region" aria-label="Pricing section">
        <div className="draft-section-label">Pricing</div>
        <h2 data-ref="pricing-headline">Pay for what you ship</h2>
        <div className="draft-pricing-tiers">
          <div className="draft-tier" data-ref="tier-hobby">
            <h4>Hobby</h4>
            <div className="draft-tier-price">$0</div>
            <p>3 projects, 100 deploys/mo</p>
          </div>
          <div className="draft-tier featured" data-ref="tier-team">
            <h4>Team</h4>
            <div className="draft-tier-price">$29</div>
            <p>Unlimited projects + team</p>
          </div>
          <div className="draft-tier" data-ref="tier-scale">
            <h4>Scale</h4>
            <div className="draft-tier-price">$99</div>
            <p>SLA, SSO, priority support</p>
          </div>
        </div>
      </div>

      <div className="draft-section" data-section="cta" data-testid="cta-section" role="region" aria-label="Call to action section">
        <div className="draft-section-label">Call to Action</div>
        <h2 data-ref="cta-headline">Your competitors shipped while you read this</h2>
        <p>
          2,400 teams deployed last week. No credit card. No sales call.
          Just paste your repo.
        </p>
        <button className="draft-cta-outline" data-ref="cta-button">Deploy in 4 minutes &rarr;</button>
      </div>
    </>
  );
}
