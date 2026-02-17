/**
 * Draft Workspace — self-contained review page.
 *
 * Architecture mirrors the preview HTMLs:
 *   bezel-frame > topbar + main-area(viewport + rail + floater + speech + trail) + chin
 *
 * State-driven via data-mode on the frame:
 *   idle    — browse, chin shows "SLAP!"
 *   guided  — CSS dim-siblings spotlight + narrator chin
 *   live    — floating bubble parade + progress chin
 */

import { useEffect, useRef, useCallback } from 'react';
import { useRoute } from '../hooks/useRoute';
import { navigate } from '../router';
import { getProject } from '../data/projects';
import { getAllReviews } from '../data/reviews';
import { experts, getAvatarUrl } from '../data/reviewers';
import { useTour, SECTION_ORDER, SECTION_LABELS } from './useTour';
import DesignCanvas from './DesignCanvas';
import './draft.css';

// ─── Helpers ──────────────────────────────────────────────

function avgScore(pid: string, vid: string) {
  const all = getAllReviews(pid, vid);
  if (!all.length) return 0;
  return Math.round(all.reduce((s, { review: r }) => s + r.score, 0) / all.length * 10) / 10;
}

function severityColor(light: string): string {
  if (light === 'red') return '#FF6B6B';
  if (light === 'yellow') return '#FFD93D';
  return '#6BCB77';
}

function scoreColor(s: number): string {
  return s >= 7 ? '#6BCB77' : s >= 5 ? '#FFD93D' : '#FF6B6B';
}

// ─── Page ─────────────────────────────────────────────────

export default function DraftWorkspace() {
  const { projectId, versionId } = useRoute();
  const project = projectId ? getProject(projectId) : undefined;
  const effectiveVersionId = versionId || project?.versions[0]?.id || 'v1';

  const tour = useTour(projectId, effectiveVersionId);

  // Refs for DOM position calculations
  const mainRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const floaterRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  // Determine frame mode
  const mode = tour.state.active ? tour.state.mode : 'idle';

  // ── Position helpers (relative to main area) ──────────

  const getRelativeRect = useCallback((el: Element) => {
    if (!mainRef.current) return null;
    const parent = mainRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      top: r.top - parent.top,
      left: r.left - parent.left,
      right: r.right - parent.left,
      bottom: r.bottom - parent.top,
      width: r.width,
      height: r.height,
      cx: r.left - parent.left + r.width / 2,
      cy: r.top - parent.top + r.height / 2,
    };
  }, []);

  // ── Guided mode: scroll active section into view ──────
  //
  // CSS handles the spotlight (dim siblings + brighten active).
  // All we need is to scroll the active section into the viewport.

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !tour.state.active || !tour.currentStep) return;
    if (mode !== 'guided') return;

    const el = viewport.querySelector(`[data-section="${tour.currentStep.section}"]`);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [mode, tour.state.active, tour.currentStep?.index]);

  // ── Section glow ──────────────────────────────────────

  useEffect(() => {
    if (!viewportRef.current) return;
    const sections = viewportRef.current.querySelectorAll('[data-section]');

    // Clear all glows and spotlight
    sections.forEach(s => {
      s.classList.remove('glowing', 'section-spotlight');
      (s as HTMLElement).style.removeProperty('--d-glow-color');
      (s as HTMLElement).style.removeProperty('--d-glow-shadow');
      (s as HTMLElement).style.removeProperty('--d-glow-outer');
      (s as HTMLElement).style.removeProperty('--d-glow-inner');
    });

    if (!tour.state.active || !tour.currentStep) return;

    const step = tour.currentStep;
    const el = viewportRef.current.querySelector(`[data-section="${step.section}"]`) as HTMLElement | null;
    if (!el) return;

    el.classList.add('glowing', 'section-spotlight');
    el.style.setProperty('--d-glow-color', step.reviewerColor + '66');
    el.style.setProperty('--d-glow-shadow', step.reviewerColor + '26');
    el.style.setProperty('--d-glow-outer', step.reviewerColor + '14');
    el.style.setProperty('--d-glow-inner', step.reviewerColor + '05');
  }, [tour.state.active, tour.currentStep?.index]);

  // ── Live mode: floating bubble choreography ───────────

  useEffect(() => {
    if (mode !== 'live' || !tour.currentStep) {
      // Hide floater and speech
      if (floaterRef.current) floaterRef.current.classList.remove('active', 'arriving');
      if (speechRef.current) speechRef.current.classList.remove('active');
      if (trailRef.current) trailRef.current.classList.remove('active');
      return;
    }

    const step = tour.currentStep;
    const floater = floaterRef.current;
    const speech = speechRef.current;
    const trail = trailRef.current;
    if (!floater || !speech || !trail || !mainRef.current) return;

    // Find rail slot and target section
    const railSlot = mainRef.current.querySelector(`[data-reviewer="${step.reviewerId}"]`);
    const sectionEl = viewportRef.current?.querySelector(`[data-section="${step.section}"]`);
    if (!railSlot || !sectionEl) return;

    // Scroll section into view
    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Phase 1: Hide previous, position at rail
    floater.classList.remove('active', 'arriving');
    speech.classList.remove('active');
    trail.classList.remove('active');

    const choreograph = () => {
      const railRect = getRelativeRect(railSlot);
      const secRect = getRelativeRect(sectionEl);
      if (!railRect || !secRect) return;

      // Dock point: top-right of section, inset
      const dockX = secRect.right - 40;
      const dockY = secRect.top + 30;
      const bSize = 36;

      // Set floater style
      floater.style.border = `2px solid ${step.reviewerColor}`;
      floater.style.color = step.reviewerColor;
      floater.style.boxShadow = `0 0 12px ${step.reviewerColor}66`;

      // Position at rail first (no transition)
      floater.style.transition = 'none';
      floater.style.left = `${railRect.cx - bSize / 2}px`;
      floater.style.top = `${railRect.cy - bSize / 2}px`;
      void floater.offsetWidth; // force reflow

      floater.classList.add('active');

      // Draw trail
      const fromX = railRect.cx;
      const fromY = railRect.cy;
      const dy = dockY - fromY;
      trail.setAttribute('d', `M ${fromX} ${fromY} C ${fromX - 30} ${fromY + dy * 0.3}, ${dockX + 30} ${dockY - dy * 0.3}, ${dockX} ${dockY}`);
      trail.setAttribute('stroke', step.reviewerColor);
      trail.classList.add('active');

      // Phase 2: Animate to dock position
      setTimeout(() => {
        floater.style.transition = `left 500ms cubic-bezier(0.34, 1.56, 0.64, 1), top 500ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease`;
        floater.style.left = `${dockX - bSize / 2}px`;
        floater.style.top = `${dockY - bSize / 2}px`;
        floater.classList.add('arriving');

        // Phase 3: Show speech bubble after arrival
        setTimeout(() => {
          floater.classList.remove('arriving');

          // Position speech to the left of floater
          const speechW = 220;
          speech.style.left = `${dockX - bSize / 2 - speechW - 14}px`;
          speech.style.top = `${dockY - 30}px`;
          speech.style.maxWidth = `${speechW}px`;
          speech.style.borderColor = step.reviewerColor;
          speech.classList.add('active');
        }, 500);
      }, 50);
    };

    // Delay to let scroll settle
    const timer = setTimeout(choreograph, 300);
    return () => clearTimeout(timer);
  }, [mode, tour.currentStep?.index, getRelativeRect]);

  // ── Keyboard navigation ───────────────────────────────

  useEffect(() => {
    if (!tour.state.active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); tour.next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); tour.prev(); }
      if (e.key === 'Escape') tour.stop();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [tour.state.active, tour]);

  // ── slapState (E2E) ──────────────────────────────────

  useEffect(() => {
    (window as any).slapState = {
      project: projectId,
      version: effectiveVersionId,
      reviewMode: 'review',
      activeReviewer: tour.state.reviewerId,
      overlayTier: tour.state.active ? 1 : 0,
      highlightedSection: tour.currentStep?.section || null,
      sections: SECTION_ORDER,
      tourActive: tour.state.active,
      tourMode: tour.state.mode,
      tourStep: tour.state.currentIndex,
      tourTotalSteps: tour.state.steps.length,
      tourReviewerId: tour.state.reviewerId,
    };
  });

  // ── Handlers ──────────────────────────────────────────

  const handleRailClick = useCallback((reviewerId: string) => {
    if (tour.state.active) {
      // Jump to first step for this reviewer if it matches, or restart
      if (reviewerId === tour.state.reviewerId) return;
      tour.stop();
      tour.start(reviewerId, tour.state.mode);
    } else {
      tour.start(reviewerId);
    }
  }, [tour]);

  const handleTourStart = useCallback(() => {
    const rid = tour.state.reviewerId || experts[0]?.id;
    if (rid) tour.start(rid);
  }, [tour]);

  // ── 404 ───────────────────────────────────────────────

  if (!project) {
    return (
      <div className="draft-wrapper" data-testid="project-not-found">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Project not found</h1>
          <p style={{ color: 'rgba(245,240,225,0.5)', fontSize: '0.8rem', marginBottom: '1rem' }}>&quot;{projectId}&quot; does not exist.</p>
          <button onClick={() => navigate()} style={{ fontFamily: "'Courier New', monospace", fontSize: '0.7rem', fontWeight: 700, color: '#FFD000', background: 'none', border: '1px solid #FFD000', padding: '8px 16px', cursor: 'pointer' }}>{'\u2190'} Back</button>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────

  const step = tour.currentStep;
  const isFirst = tour.state.currentIndex === 0;
  const isLast = tour.state.currentIndex === tour.state.steps.length - 1;

  // Progress bar for guided chin
  const totalBlocks = 14;
  const filledBlocks = Math.round(tour.progress * totalBlocks);

  // Current section index for breadcrumbs
  const currentSectionIdx = step ? SECTION_ORDER.indexOf(step.section) : -1;

  return (
    <div className="draft-wrapper" data-testid="draft-workspace">
      <div className="draft-frame" data-mode={mode} data-testid="draft-frame">

        {/* ── TopBar ──────────────────────────────────── */}
        <div className="draft-topbar" data-testid="draft-topbar">
          <button className="draft-topbar-back" onClick={() => navigate()} data-testid="draft-back">&larr;</button>
          <div className="draft-topbar-title">{project.icon} {project.name}</div>
          <div className="draft-topbar-versions">
            {project.versions.map(v => {
              const score = avgScore(project.id, v.id);
              return (
                <button
                  key={v.id}
                  className={`draft-version-pill ${v.id === effectiveVersionId ? 'active' : ''}`}
                  data-testid={`draft-version-${v.id}`}
                  onClick={() => { tour.stop(); navigate(project.id, v.id); }}
                >
                  {v.label}
                  {score > 0 && (
                    <span style={{ color: v.id === effectiveVersionId ? undefined : scoreColor(score), fontWeight: 800 }}>
                      {score.toFixed(1)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="draft-topbar-spacer" />

          {tour.state.active ? (
            <>
              <button
                className={`draft-mode-toggle ${tour.state.mode === 'guided' ? 'active' : ''}`}
                onClick={() => tour.setMode('guided')}
                data-testid="draft-mode-guided"
              >GUIDED</button>
              <button
                className={`draft-mode-toggle ${tour.state.mode === 'live' ? 'active' : ''}`}
                onClick={() => tour.setMode('live')}
                data-testid="draft-mode-live"
              >LIVE</button>
              <button className="draft-tour-stop" onClick={tour.stop} data-testid="draft-tour-stop">{'\u25A0'} STOP</button>
            </>
          ) : (
            <button className="draft-tour-btn" onClick={handleTourStart} data-testid="draft-tour-btn">{'\u25B6'} TOUR</button>
          )}
        </div>

        {/* ── Main Area ───────────────────────────────── */}
        <div className="draft-main" ref={mainRef} data-testid="draft-main">

          {/* Viewport */}
          <div className="draft-viewport" ref={viewportRef} data-testid="draft-viewport">
            <DesignCanvas version={effectiveVersionId} />
          </div>

          {/* Rail */}
          <div className="draft-rail" data-testid="draft-rail">
            {experts.map(r => {
              const isEmpty = mode === 'live' && step?.reviewerId === r.id;
              return (
                <div
                  key={r.id}
                  className={`draft-rail-slot ${isEmpty ? 'empty' : ''}`}
                  style={{ '--d-slot-color': r.color } as React.CSSProperties}
                  data-reviewer={r.id}
                  data-testid={`draft-slot-${r.id}`}
                  title={r.name}
                  onClick={() => handleRailClick(r.id)}
                >
                  <img src={getAvatarUrl(r)} alt={r.name} loading="lazy" />
                </div>
              );
            })}
            <div className="draft-rail-label">Reviewers</div>
          </div>

          {/* Trail SVG (live mode) */}
          <svg className="draft-trail" data-testid="draft-trail">
            <path
              ref={trailRef}
              className="draft-trail-path"
              data-testid="draft-trail-path"
            />
          </svg>

          {/* Floating Bubble (live mode) */}
          <div
            ref={floaterRef}
            className="draft-floater"
            data-testid="draft-floater"
          >
            {step && <img src={step.reviewerAvatar} alt={step.reviewerName} />}
          </div>

          {/* Speech Bubble (live mode) */}
          <div ref={speechRef} className="draft-speech" data-testid="draft-speech">
            {step && (
              <>
                <div className="draft-speech-header">
                  <span className="draft-severity-dot" style={{ background: severityColor(step.finding.light) }} />
                  <span style={{ color: step.reviewerColor }}>{step.sectionLabel}</span>
                </div>
                <div className="draft-speech-text">{step.finding.text}</div>
              </>
            )}
          </div>
        </div>

        {/* ── Chin ────────────────────────────────────── */}
        <div className="draft-chin" data-testid="draft-chin">

          {/* Idle */}
          <div className="draft-chin-idle">
            <span className="draft-chin-brand">SLAP!</span>
          </div>

          {/* Guided narrator */}
          <div className="draft-chin-guided" data-testid="draft-chin-guided">
            {step && (
              <>
                <div className="draft-chin-row1">
                  <div className="draft-chin-avatar" style={{ borderColor: step.reviewerColor }}>
                    <img src={step.reviewerAvatar} alt={step.reviewerName} />
                  </div>
                  <span className="draft-chin-reviewer" style={{ color: step.reviewerColor }}>{step.reviewerName}</span>
                  <span className="draft-chin-dash">&mdash;</span>
                  <span className="draft-chin-section">{step.sectionLabel}</span>
                  <span className="draft-chin-counter">[{step.index + 1}/{step.totalSteps}]</span>
                  <button className="draft-chin-nav" onClick={tour.prev} disabled={isFirst} data-testid="draft-prev">&larr;</button>
                  <button className="draft-chin-nav" onClick={tour.next} disabled={isLast} data-testid="draft-next">&rarr;</button>
                </div>
                <div className="draft-chin-row2">
                  <div className="draft-chin-finding">
                    <span className="draft-severity-dot" style={{ background: severityColor(step.finding.light), marginRight: 6, verticalAlign: 'middle' }} />
                    &ldquo;{step.finding.text}&rdquo;
                  </div>
                </div>
                <div className="draft-chin-row3">
                  <div className="draft-progress-bar">
                    <span className="draft-bar-filled">{'\u2588'.repeat(filledBlocks)}</span>
                    <span className="draft-bar-empty">{'\u2591'.repeat(totalBlocks - filledBlocks)}</span>
                  </div>
                  <div className="draft-breadcrumb">
                    {SECTION_ORDER.map((sec, i) => (
                      <span key={sec}>
                        {i > 0 && <span className="draft-crumb-sep">&gt;</span>}
                        <span
                          className={`draft-crumb ${i === currentSectionIdx ? 'active' : ''}`}
                          onClick={() => {
                            // Jump to first step in this section
                            const idx = tour.state.steps.findIndex(s => s.section === sec);
                            if (idx >= 0) tour.goTo(idx);
                          }}
                        >
                          {SECTION_LABELS[sec] || sec.toUpperCase()}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Live progress */}
          <div className="draft-chin-live" data-testid="draft-chin-live">
            <div className="draft-progress-track">
              <div className="draft-progress-fill" style={{ width: `${tour.progress * 100}%` }} />
            </div>
            <div className="draft-step-indicator">
              Step {tour.state.currentIndex + 1}/{tour.state.steps.length}
            </div>
            <div className="draft-chin-spacer" />
            <button className="draft-chin-btn" onClick={tour.prev} disabled={isFirst} data-testid="draft-live-prev">&larr; Prev</button>
            <button className="draft-chin-btn" onClick={tour.next} disabled={isLast} data-testid="draft-live-next">Next &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
