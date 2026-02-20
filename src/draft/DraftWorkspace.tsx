/**
 * Draft Workspace — self-contained review page.
 *
 * Architecture:
 *   wrapper[data-mode] > stage(frame + external-rail + floater/trail/speech)
 *                       + tour-overlay (floating text between frame & chin)
 *                       + crt-overlay (hand + power button only)
 *
 * Layout:
 *   - Frame = topbar + viewport only (no internal chin or rail)
 *   - Rail = external, right side of frame (reviewers observe from outside)
 *   - Tour overlay = fixed, centered between frame bottom & chin top
 *   - CRT overlay = fixed over body::before chin (hand + power only)
 *   - Floater/trail/speech = in stage (can cross frame boundary, live mode)
 *
 * State-driven via data-mode on the wrapper:
 *   idle    — browse, CRT chin shows hand + power
 *   guided  — CSS spotlight + floating tour overlay with breadcrumbs
 *   live    — floating bubble choreography + tour overlay with progress track
 *
 * All DOM queries into the design content go through viewportRef.
 * HTML projects inject content inline (no iframe) with scoped CSS.
 */

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useRoute } from '../hooks/useRoute';
import { useReviewState } from '../hooks/useReviewState';
import { navigate } from '../router';
import { getProject, getVersion } from '../data/projects';
import { getAllReviews, getReview } from '../data/reviews';
import type { TrafficLight } from '../data/reviews';
import { experts, personas, getReviewer, getAvatarUrl } from '../data/reviewers';
import type { Reviewer } from '../data/reviewers';
import { loadCouncil, autoRollCouncil } from '../utils/council';
import { useTour, SECTION_ORDER } from './useTour';
import { useRefHighlight } from './useRefHighlight';
import BubblePopover from '../components/BubblePopover';
import type { SectionChip } from '../components/BubblePopover';
import ReviewPanel from '../components/ReviewPanel';
import SectionFocusPanel from '../components/SectionFocusPanel';
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

function worstLight(findings: { light: TrafficLight }[]): TrafficLight {
  if (findings.some(f => f.light === 'red')) return 'red';
  if (findings.some(f => f.light === 'yellow')) return 'yellow';
  return 'green';
}

function toChips(rev: { sections: Record<string, { light: TrafficLight; text: string }[]> }): SectionChip[] {
  return Object.entries(rev.sections).map(([section, findings]) => {
    const sev = worstLight(findings);
    return { section, severity: sev, tooltipText: findings.find(f => f.light === sev)?.text };
  });
}

/** Section label abbreviations for breadcrumbs */
const SECTION_LABEL_MAP: Record<string, string> = {
  hero: 'HERO', features: 'FEAT', pricing: 'PRC',
  cta: 'CTA', testimonials: 'TEST', footer: 'FTR',
};
function sectionLabel(s: string): string {
  return SECTION_LABEL_MAP[s] || s.slice(0, 4).toUpperCase();
}

// ─── Page ─────────────────────────────────────────────────

// ─── Persona categories for Add Panel ──────────────────
const PERSONA_CATEGORIES = [
  { id: 'accessibility', label: 'Access' },
  { id: 'tech-spectrum', label: 'Tech' },
  { id: 'role-based', label: 'Role' },
  { id: 'emotional-state', label: 'Emote' },
  { id: 'context', label: 'Context' },
  { id: 'cultural-taste', label: 'Taste' },
];

export default function DraftWorkspace() {
  const { projectId, versionId } = useRoute();
  const project = projectId ? getProject(projectId) : undefined;
  const effectiveVersionId = versionId || project?.versions[0]?.id || 'v1';

  // Section order: project-specific or default
  const projectSections = project?.sections || SECTION_ORDER;

  // Council state (from homepage or auto-rolled) — must precede useTour for allRailIds
  const [council, setCouncil] = useState<string[]>(() => loadCouncil() ?? autoRollCouncil());
  const [addPanelOpen, setAddPanelOpen] = useState(false);
  const [addPanelCategory, setAddPanelCategory] = useState('accessibility');

  // Compute council personas (filter to actual persona-type reviewers)
  const councilPersonas = council
    .map(id => getReviewer(id))
    .filter((r): r is Reviewer => !!r && r.type === 'persona');

  // Combined rail order: experts then council personas
  const allRailIds = useMemo(
    () => [...experts.map(e => e.id), ...councilPersonas.map(p => p.id)],
    [councilPersonas]
  );

  const tour = useTour(projectId, effectiveVersionId, project?.sections, allRailIds);
  const rs = useReviewState();
  const refHighlight = useRefHighlight();

  // shapedBy for current version
  const currentVersion = project ? getVersion(project.id, effectiveVersionId) : undefined;
  const shapedByIds = currentVersion?.shapedBy || [];

  // ── Severity badges (worst finding per reviewer) ────────
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null);
  const [hoveredSlotRect, setHoveredSlotRect] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  const severityMap = useMemo(() => {
    if (!project) return new Map<string, TrafficLight>();
    const map = new Map<string, TrafficLight>();
    const allRevs = getAllReviews(project.id, effectiveVersionId);
    for (const { reviewerId, review } of allRevs) {
      const allFindings = Object.values(review.sections).flat();
      if (allFindings.length > 0) {
        map.set(reviewerId, worstLight(allFindings));
      }
    }
    return map;
  }, [project, effectiveVersionId]);

  // Tour preview summary for hovered reviewer
  const hoveredSummary = useMemo(() => {
    if (!hoveredSlotId || !project) return null;
    const review = getReview(project.id, effectiveVersionId, hoveredSlotId);
    if (!review) return null;
    let red = 0, yellow = 0, green = 0;
    const secs: string[] = [];
    for (const [section, findings] of Object.entries(review.sections)) {
      secs.push(section);
      for (const f of findings) {
        if (f.light === 'red') red++;
        else if (f.light === 'yellow') yellow++;
        else green++;
      }
    }
    return { red, yellow, green, total: red + yellow + green, sections: secs, score: review.score };
  }, [hoveredSlotId, project, effectiveVersionId]);

  // ── Popover / Panel data (3-tier overlay) ──────────────
  const popoverReviewer = rs.popoverId ? getReviewer(rs.popoverId) : null;
  const popoverReview = rs.popoverId && project ? getReview(project.id, effectiveVersionId, rs.popoverId) : undefined;
  const popoverChips = useMemo(() => popoverReview ? toChips(popoverReview) : [], [popoverReview]);
  const panelReviewer = rs.panelId ? getReviewer(rs.panelId) ?? null : null;
  const panelReview = rs.panelId && project ? getReview(project.id, effectiveVersionId, rs.panelId) ?? null : null;

  // Theme toggle
  const [contentTheme, setContentTheme] = useState<'dark' | 'light'>('dark');

  // ── Content readiness (for async HTML injection) ──────
  const isHtmlProject = !!project?.htmlUrl;
  const [contentReady, setContentReady] = useState(!isHtmlProject);

  // Reset content readiness when project/version changes
  useEffect(() => {
    setContentReady(!isHtmlProject);
  }, [projectId, effectiveVersionId, isHtmlProject]);

  // Callback from DesignCanvas when HTML injection completes
  const handleHtmlReady = useCallback(() => {
    setContentReady(true);

    // Sync current theme to newly injected .slap-design container
    if (contentTheme === 'dark') {
      const el = viewportRef.current?.querySelector('.slap-design');
      el?.setAttribute('data-theme', 'dark');
    }
  }, [contentTheme]);

  const toggleTheme = useCallback(() => {
    setContentTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.body.setAttribute('data-content-theme', 'light');
      } else {
        document.body.removeAttribute('data-content-theme');
      }
      // Sync theme to inline HTML container
      const designEl = viewportRef.current?.querySelector('.slap-design');
      if (designEl) {
        if (next === 'dark') {
          designEl.setAttribute('data-theme', 'dark');
        } else {
          designEl.removeAttribute('data-theme');
        }
      }
      return next;
    });
  }, []);

  // Set content theme on mount, clean up on unmount
  useEffect(() => {
    if (contentTheme === 'light') {
      document.body.setAttribute('data-content-theme', 'light');
    }
    return () => {
      document.body.removeAttribute('data-content-theme');
    };
  }, []);

  // Council management
  const handleAddPersona = useCallback((personaId: string) => {
    setCouncil(prev => {
      if (prev.includes(personaId)) return prev;
      const next = [...prev, personaId];
      localStorage.setItem('slap-default-council', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleRemovePersona = useCallback((personaId: string) => {
    setCouncil(prev => {
      const next = prev.filter(id => id !== personaId);
      localStorage.setItem('slap-default-council', JSON.stringify(next));
      return next;
    });
  }, []);

  // Close add panel on Escape
  useEffect(() => {
    if (!addPanelOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); setAddPanelOpen(false); }
    };
    document.addEventListener('keydown', handler, true);
    return () => document.removeEventListener('keydown', handler, true);
  }, [addPanelOpen]);

  // Refs for DOM position calculations
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const floaterRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hoveredSlotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Previous step ref for tier detection in live choreography
  const prevStepRef = useRef<{ reviewerId: string; section: string } | null>(null);

  // Determine frame mode
  const mode = tour.state.active ? tour.state.mode : 'idle';

  // ── Position helpers (relative to stage) ────────────

  const getRelativeRect = useCallback((el: Element) => {
    if (!stageRef.current) return null;
    const parent = stageRef.current.getBoundingClientRect();
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

  useEffect(() => {
    if (!tour.state.active || !tour.currentStep) return;
    if (mode !== 'guided') return;

    const vp = viewportRef.current;
    if (!vp) return;

    const el = vp.querySelector(`[data-section="${tour.currentStep.section}"]`);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [mode, tour.state.active, tour.currentStep?.index, contentReady]);

  // ── Section glow (unified: tour + overlay) ────────────

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const sections = vp.querySelectorAll('[data-section]');

    // Clear all glows and spotlight
    sections.forEach(s => {
      s.classList.remove('glowing', 'section-spotlight');
      (s as HTMLElement).style.removeProperty('--d-glow-color');
      (s as HTMLElement).style.removeProperty('--d-glow-shadow');
      (s as HTMLElement).style.removeProperty('--d-glow-outer');
      (s as HTMLElement).style.removeProperty('--d-glow-inner');
    });

    // Source 1: Tour step (takes priority)
    if (tour.state.active && tour.currentStep) {
      const step = tour.currentStep;
      const el = vp.querySelector(`[data-section="${step.section}"]`) as HTMLElement | null;
      if (el) {
        el.classList.add('glowing', 'section-spotlight');
        el.style.setProperty('--d-glow-color', step.reviewerColor + '66');
        el.style.setProperty('--d-glow-shadow', step.reviewerColor + '26');
        el.style.setProperty('--d-glow-outer', step.reviewerColor + '14');
        el.style.setProperty('--d-glow-inner', step.reviewerColor + '05');
      }
      return;
    }

    // Source 2: Overlay highlight (popover chip hover / panel finding hover)
    if (rs.highlightInfo) {
      const color = rs.highlightInfo.color || '#FFD000';
      const el = vp.querySelector(`[data-section="${rs.highlightInfo.section}"]`) as HTMLElement | null;
      if (el) {
        el.classList.add('glowing');
        el.style.setProperty('--d-glow-color', color + '66');
        el.style.setProperty('--d-glow-shadow', color + '26');
        el.style.setProperty('--d-glow-outer', color + '14');
        el.style.setProperty('--d-glow-inner', color + '05');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

  }, [tour.state.active, tour.currentStep?.index, rs.highlightInfo, contentReady]);

  // ── Ref highlight (unified: tour + overlay) ──────────

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // Source 1: Tour ref
    if (tour.state.active && tour.currentStep?.finding.ref) {
      refHighlight.apply(tour.currentStep.finding.ref, vp);
      return () => { refHighlight.clear(vp); };
    }

    // Source 2: Overlay ref (panel finding hover)
    if (!tour.state.active && rs.highlightInfo?.ref) {
      refHighlight.apply(rs.highlightInfo.ref, vp);
      return () => { refHighlight.clear(vp); };
    }

    refHighlight.clear(vp);
    return () => { refHighlight.clear(vp); };
  }, [tour.state.active, tour.currentStep?.index, rs.highlightInfo, contentReady]);

  // ── Live mode: floating bubble choreography ───────────
  // Three tiers:
  //   Tier 1 — Same reviewer & section: React updates speech text, no movement
  //   Tier 2 — Same reviewer, new section: slide floater from current position to new dock
  //   Tier 3 — New reviewer (or first step): full rail-to-section fly-in

  useEffect(() => {
    if (mode !== 'live' || !tour.currentStep) {
      if (floaterRef.current) floaterRef.current.classList.remove('active', 'arriving');
      if (speechRef.current) speechRef.current.classList.remove('active');
      if (trailRef.current) trailRef.current.classList.remove('active');
      prevStepRef.current = null;
      return;
    }

    const step = tour.currentStep;
    const floater = floaterRef.current;
    const speech = speechRef.current;
    const trail = trailRef.current;
    if (!floater || !speech || !trail || !stageRef.current) return;

    const vp = viewportRef.current;
    const prev = prevStepRef.current;
    const sameReviewer = prev !== null && prev.reviewerId === step.reviewerId;
    const sameSection = sameReviewer && prev.section === step.section;

    // Update prevStepRef for next render
    prevStepRef.current = { reviewerId: step.reviewerId, section: step.section };

    // Find elements
    const railSlot = stageRef.current.querySelector(`[data-reviewer="${step.reviewerId}"]`);
    const sectionEl = vp?.querySelector(`[data-section="${step.section}"]`);
    if (!railSlot || !sectionEl) return;

    // ── Tier 1: Same section — just update speech text (React handles it) ──
    if (sameSection) {
      // Speech text updates via React re-render; re-show speech in case it was hidden
      const bSize = 36;
      const secRect = getRelativeRect(sectionEl);
      if (secRect) {
        const dockX = secRect.right - 40;
        const dockY = secRect.top + 30;
        const speechW = 220;
        speech.style.left = `${dockX - bSize / 2 - speechW - 14}px`;
        speech.style.top = `${dockY - 30}px`;
        speech.style.maxWidth = `${speechW}px`;
        speech.style.borderColor = step.reviewerColor;
        speech.classList.add('active');
      }
      return;
    }

    // ── Tier 2 & 3 both need scroll + position measurement ──
    let cancelled = false;

    // Instant scroll, then measure after layout settles
    sectionEl.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'center' });

    // Double rAF ensures layout has settled after instant scroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;

        const railRect = getRelativeRect(railSlot);
        const secRect = getRelativeRect(sectionEl);
        if (!railRect || !secRect) return;

        const dockX = secRect.right - 40;
        const dockY = secRect.top + 30;
        const bSize = 36;

        // Set floater style (same for both tiers)
        floater.style.border = `2px solid ${step.reviewerColor}`;
        floater.style.color = step.reviewerColor;
        floater.style.boxShadow = `0 0 12px ${step.reviewerColor}66`;

        if (sameReviewer) {
          // ── Tier 2: Same reviewer, new section — slide from current position ──
          speech.classList.remove('active');

          // Update trail endpoint to new section
          const fromX = railRect.cx;
          const fromY = railRect.cy;
          const dy = dockY - fromY;
          trail.setAttribute('d', `M ${fromX} ${fromY} C ${fromX - 30} ${fromY + dy * 0.3}, ${dockX + 30} ${dockY - dy * 0.3}, ${dockX} ${dockY}`);

          // Animate floater from current position to new dock
          floater.style.transition = `left 500ms cubic-bezier(0.34, 1.56, 0.64, 1), top 500ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease`;
          floater.style.left = `${dockX - bSize / 2}px`;
          floater.style.top = `${dockY - bSize / 2}px`;
          floater.classList.add('arriving');

          // Reveal speech after slide completes
          setTimeout(() => {
            if (cancelled) return;
            floater.classList.remove('arriving');

            const speechW = 220;
            speech.style.left = `${dockX - bSize / 2 - speechW - 14}px`;
            speech.style.top = `${dockY - 30}px`;
            speech.style.maxWidth = `${speechW}px`;
            speech.style.borderColor = step.reviewerColor;
            speech.classList.add('active');
          }, 500);
        } else {
          // ── Tier 3: New reviewer — full rail-to-section fly-in ──
          floater.classList.remove('active', 'arriving');
          speech.classList.remove('active');
          trail.classList.remove('active');

          // Position at rail (no transition)
          floater.style.transition = 'none';
          floater.style.left = `${railRect.cx - bSize / 2}px`;
          floater.style.top = `${railRect.cy - bSize / 2}px`;
          void floater.offsetWidth; // force reflow

          floater.classList.add('active');

          // Draw trail from rail to section
          const fromX = railRect.cx;
          const fromY = railRect.cy;
          const dy = dockY - fromY;
          trail.setAttribute('d', `M ${fromX} ${fromY} C ${fromX - 30} ${fromY + dy * 0.3}, ${dockX + 30} ${dockY - dy * 0.3}, ${dockX} ${dockY}`);
          trail.setAttribute('stroke', step.reviewerColor);
          trail.classList.add('active');

          // Animate to dock
          setTimeout(() => {
            if (cancelled) return;
            floater.style.transition = `left 500ms cubic-bezier(0.34, 1.56, 0.64, 1), top 500ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease`;
            floater.style.left = `${dockX - bSize / 2}px`;
            floater.style.top = `${dockY - bSize / 2}px`;
            floater.classList.add('arriving');

            // Show speech after arrival
            setTimeout(() => {
              if (cancelled) return;
              floater.classList.remove('arriving');

              const speechW = 220;
              speech.style.left = `${dockX - bSize / 2 - speechW - 14}px`;
              speech.style.top = `${dockY - 30}px`;
              speech.style.maxWidth = `${speechW}px`;
              speech.style.borderColor = step.reviewerColor;
              speech.classList.add('active');
            }, 500);
          }, 50);
        }
      });
    });

    return () => { cancelled = true; };
  }, [mode, tour.currentStep?.index, getRelativeRect, contentReady]);

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

  // ── Floating overlay: position centered between frame & chin ──

  const repositionOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    const frame = frameRef.current;
    if (!overlay || !frame) return;
    const frameRect = frame.getBoundingClientRect();
    const chinTop = window.innerHeight - 88; // 88px chin height
    const gap = chinTop - frameRect.bottom;
    const overlayH = overlay.offsetHeight;
    const centerY = frameRect.bottom + (gap - overlayH) / 2;
    overlay.style.top = Math.max(frameRect.bottom + 4, centerY) + 'px';
  }, []);

  useEffect(() => {
    if (!tour.state.active) return;

    repositionOverlay();
    window.addEventListener('resize', repositionOverlay);

    const frame = frameRef.current;
    let ro: ResizeObserver | undefined;
    if (frame) {
      ro = new ResizeObserver(repositionOverlay);
      ro.observe(frame);
    }

    return () => {
      window.removeEventListener('resize', repositionOverlay);
      ro?.disconnect();
    };
  }, [tour.state.active, tour.currentStep?.index, repositionOverlay]);

  // ── Overlay entrance/exit ───────────────────────────────

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (tour.state.active) {
      overlay.classList.remove('exiting');
      overlay.classList.add('visible');
      requestAnimationFrame(repositionOverlay);
    } else {
      if (overlay.classList.contains('visible')) {
        overlay.classList.add('exiting');
        overlay.classList.remove('visible');
        const t = setTimeout(() => overlay.classList.remove('exiting'), 220);
        return () => clearTimeout(t);
      }
    }
  }, [tour.state.active, repositionOverlay]);

  // ── slapState (E2E) ──────────────────────────────────

  useEffect(() => {
    (window as any).slapState = {
      project: projectId,
      version: effectiveVersionId,
      reviewMode: 'review',
      activeReviewer: rs.activeBubbleId || tour.state.reviewerId,
      overlayTier: rs.panelId ? 3 : rs.popoverId ? 2 : tour.state.active ? 1 : 0,
      popoverId: rs.popoverId,
      panelId: rs.panelId,
      highlightedSection: rs.highlightInfo?.section || tour.currentStep?.section || null,
      highlightedRef: rs.highlightInfo?.ref || tour.currentStep?.finding.ref || null,
      sections: projectSections,
      tourActive: tour.state.active,
      tourMode: tour.state.mode,
      tourStep: tour.state.currentIndex,
      tourTotalSteps: tour.state.steps.length,
      tourReviewerId: tour.state.reviewerId,
      currentFinding: tour.currentStep?.finding.text || null,
      currentRef: tour.currentStep?.finding.ref || null,
      reviewerCount: experts.length + councilPersonas.length,
      council: council,
      councilPersonaCount: councilPersonas.length,
      shapedBy: shapedByIds,
      contentTheme,
      isHtmlProject,
      contentReady,
      severityBadges: Object.fromEntries(severityMap),
      focusedSection,
    };
  });

  // ── Handlers ──────────────────────────────────────────

  const handleRailClick = useCallback((reviewerId: string, event: React.MouseEvent) => {
    setAddPanelOpen(false);
    setFocusedSection(null);
    setHoveredSlotId(null);
    if (hoveredSlotTimer.current) clearTimeout(hoveredSlotTimer.current);
    if (tour.state.active) tour.stop();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    rs.toggleBubble(reviewerId, rect);
  }, [tour, rs]);

  const handleTourStart = useCallback(() => {
    const rid = rs.activeBubbleId || tour.state.reviewerId || allRailIds[0];
    if (rid) {
      rs.closeAll();
      tour.start(rid);
    }
  }, [tour, allRailIds, rs]);

  // ── Section click (opens Section Focus panel) ──────────

  const handleViewportClick = useCallback((_e: React.MouseEvent) => {
    return; // Design sections are non-interactive outside tour mode
  }, []);

  // ── Tour preview (hover on rail slot) ──────────────────

  const handleSlotHover = useCallback((reviewerId: string, event: React.MouseEvent) => {
    if (rs.isOverlayActive || tour.state.active || addPanelOpen) return;
    if (hoveredSlotTimer.current) clearTimeout(hoveredSlotTimer.current);
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredSlotId(reviewerId);
    setHoveredSlotRect({ top: rect.top, right: window.innerWidth - rect.left + 8 });
  }, [rs.isOverlayActive, tour.state.active, addPanelOpen]);

  const handleSlotLeave = useCallback(() => {
    hoveredSlotTimer.current = setTimeout(() => setHoveredSlotId(null), 150);
  }, []);

  const handlePreviewEnter = useCallback(() => {
    if (hoveredSlotTimer.current) clearTimeout(hoveredSlotTimer.current);
  }, []);

  const handlePreviewLeave = useCallback(() => {
    setHoveredSlotId(null);
  }, []);

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
  const isFirst = tour.isFirst;
  const isLast = tour.isLast;

  // Progress bar for guided narrator
  const totalBlocks = 14;
  const filledBlocks = Math.round(tour.progress * totalBlocks);

  // Current section index for breadcrumbs
  const currentSectionIdx = step ? projectSections.indexOf(step.section) : -1;

  return (
    <div className="draft-wrapper" data-mode={mode} data-testid="draft-workspace">

      {/* ── Stage (frame + external rail + floaters) ──── */}
      <div className="draft-stage" ref={stageRef} data-testid="draft-stage">

        {/* ── Frame: topbar + viewport only ──────────── */}
        <div className="draft-frame" ref={frameRef} data-testid="draft-frame">

          {/* TopBar */}
          <div className="draft-topbar" data-testid="draft-topbar">
            <div className="draft-topbar-title">{project.icon} {project.name}</div>
            <div className="draft-topbar-versions">
              {project.versions.map(v => {
                const score = avgScore(project.id, v.id);
                const vDef = getVersion(project.id, v.id);
                const shaped = vDef?.shapedBy?.map(id => getReviewer(id)?.name).filter(Boolean);
                const shapedTip = shaped?.length ? `Shaped by ${shaped.join(', ')}` : undefined;
                return (
                  <button
                    key={v.id}
                    className={`draft-version-pill ${v.id === effectiveVersionId ? 'active' : ''}`}
                    data-testid={`draft-version-${v.id}`}
                    title={shapedTip}
                    onClick={() => { tour.stop(); setAddPanelOpen(false); navigate(project.id, v.id); }}
                  >
                    {v.label}
                    {score > 0 && (
                      <span style={{ color: v.id === effectiveVersionId ? undefined : scoreColor(score), fontWeight: 800 }}>
                        {score.toFixed(1)}
                      </span>
                    )}
                    {shaped && shaped.length > 0 && v.id === effectiveVersionId && (
                      <span className="draft-shaped-badge" data-testid="shaped-badge">{'\u2728'}</span>
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

          {/* Main Area (viewport only) */}
          <div className="draft-main" data-testid="draft-main">
            <div className="draft-viewport" ref={viewportRef} data-testid="draft-viewport" onClick={handleViewportClick}>
              <DesignCanvas
                version={effectiveVersionId}
                project={project}
                onHtmlReady={handleHtmlReady}
              />
            </div>
          </div>

        </div>

        {/* ── External Rail (outside frame, right side) ── */}
        <div className="draft-external-rail" data-testid="draft-rail">
          {/* Experts (always visible) */}
          {experts.map(r => {
            const isEmpty = mode === 'live' && step?.reviewerId === r.id;
            const isShaped = shapedByIds.includes(r.id);
            const isActive = rs.activeBubbleId === r.id;
            const sev = severityMap.get(r.id);
            return (
              <div
                key={r.id}
                className={`draft-rail-slot ${isEmpty ? 'empty' : ''} ${isActive ? 'slot-active' : ''}`}
                style={{ '--d-slot-color': r.color } as React.CSSProperties}
                data-reviewer={r.id}
                data-testid={`draft-slot-${r.id}`}
                title={r.name}
                onClick={(e) => handleRailClick(r.id, e)}
                onMouseEnter={(e) => handleSlotHover(r.id, e)}
                onMouseLeave={handleSlotLeave}
              >
                <img src={getAvatarUrl(r)} alt={r.name} loading="lazy" />
                {isShaped && <span className="draft-shaped-dot" data-testid={`shaped-${r.id}`} />}
                {sev && <span className="draft-severity-badge" data-testid={`severity-badge-${r.id}`} style={{ background: severityColor(sev) }} />}
              </div>
            );
          })}

          {/* Divider */}
          {councilPersonas.length > 0 && <div className="draft-rail-divider" />}

          {/* Council Personas */}
          {councilPersonas.map(r => {
            const isEmpty = mode === 'live' && step?.reviewerId === r.id;
            const isShaped = shapedByIds.includes(r.id);
            const isActive = rs.activeBubbleId === r.id;
            const sev = severityMap.get(r.id);
            return (
              <div
                key={r.id}
                className={`draft-rail-slot ${isEmpty ? 'empty' : ''} ${isActive ? 'slot-active' : ''}`}
                style={{ '--d-slot-color': r.color } as React.CSSProperties}
                data-reviewer={r.id}
                data-testid={`draft-slot-${r.id}`}
                title={`${r.name} — ${r.role}`}
                onClick={(e) => handleRailClick(r.id, e)}
                onMouseEnter={(e) => handleSlotHover(r.id, e)}
                onMouseLeave={handleSlotLeave}
              >
                <img src={getAvatarUrl(r)} alt={r.name} loading="lazy" />
                {isShaped && <span className="draft-shaped-dot" data-testid={`shaped-${r.id}`} />}
                {sev && <span className="draft-severity-badge" data-testid={`severity-badge-${r.id}`} style={{ background: severityColor(sev) }} />}
              </div>
            );
          })}

          {/* Add Persona "+" button */}
          <button
            className={`draft-rail-add ${addPanelOpen ? 'active' : ''}`}
            data-testid="draft-add-persona"
            title="Add reviewer"
            onClick={() => setAddPanelOpen(prev => !prev)}
          >+</button>

          <div className="draft-rail-label">Reviewers</div>
        </div>

        {/* ── Add Persona Panel ──────────────────────── */}
        {addPanelOpen && (
          <div className="draft-add-panel" data-testid="draft-add-panel">
            <div className="draft-add-panel-header">
              <span className="draft-add-panel-title">Add Reviewer</span>
              <button className="draft-add-panel-close" onClick={() => setAddPanelOpen(false)}>&times;</button>
            </div>
            <div className="draft-add-panel-tabs">
              {PERSONA_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`draft-add-panel-tab ${addPanelCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setAddPanelCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="draft-add-panel-list">
              {personas
                .filter(p => p.category === addPanelCategory)
                .map(p => {
                  const inCouncil = council.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className={`draft-add-panel-item ${inCouncil ? 'selected' : ''}`}
                      data-testid={`add-persona-${p.id}`}
                      onClick={() => inCouncil ? handleRemovePersona(p.id) : handleAddPersona(p.id)}
                    >
                      <img
                        className="draft-add-panel-avatar"
                        src={getAvatarUrl(p)}
                        alt={p.name}
                        style={{ borderColor: p.color }}
                      />
                      <div className="draft-add-panel-info">
                        <span className="draft-add-panel-name" style={{ color: p.color }}>{p.name}</span>
                        <span className="draft-add-panel-role">{p.role}</span>
                      </div>
                      {inCouncil && <span className="draft-add-panel-check">{'\u2713'}</span>}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ── Trail SVG (spans full stage) ───────────── */}
        <svg className="draft-trail" data-testid="draft-trail">
          <path
            ref={trailRef}
            className="draft-trail-path"
            data-testid="draft-trail-path"
          />
        </svg>

        {/* ── Floating Bubble ────────────────────────── */}
        <div
          ref={floaterRef}
          className="draft-floater"
          data-testid="draft-floater"
        >
          {step && <img src={step.reviewerAvatar} alt={step.reviewerName} />}
        </div>

        {/* ── Speech Bubble ──────────────────────────── */}
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

      {/* ── Backdrop (click-to-close overlay) ──────────── */}
      {(rs.isOverlayActive || focusedSection) && (
        <div
          data-testid="draft-backdrop"
          onClick={() => { rs.closeAll(); setFocusedSection(null); setHoveredSlotId(null); }}
          style={{ position: 'fixed', inset: 0, zIndex: 790, background: 'transparent' }}
        />
      )}

      {/* ── Popover (Tier 2) ──────────────────────────── */}
      <BubblePopover
        visible={rs.popoverId !== null}
        anchorTop={rs.popoverAnchor.top}
        anchorRight={rs.popoverAnchor.right}
        name={popoverReviewer?.name ?? ''}
        role={popoverReviewer?.role ?? ''}
        score={popoverReview?.score ?? 0}
        avatar={popoverReviewer ? getAvatarUrl(popoverReviewer) : undefined}
        shortVerdict={popoverReview?.shortVerdict}
        accentColor={popoverReviewer?.color ?? '#FFD000'}
        chips={popoverChips}
        onChipHover={rs.setHighlight}
        onViewFull={rs.openPanel}
        bias={popoverReviewer?.bias}
        taste={popoverReviewer?.taste}
      />

      {/* ── Panel (Tier 3) ────────────────────────────── */}
      <ReviewPanel
        isOpen={rs.panelId !== null}
        onClose={rs.closePanel}
        reviewer={panelReviewer}
        review={panelReview}
        onFindingHover={rs.setHighlight}
      />

      {/* ── Section Focus Panel ──────────────────────── */}
      <SectionFocusPanel
        isOpen={focusedSection !== null}
        section={focusedSection}
        projectId={project?.id ?? ''}
        versionId={effectiveVersionId}
        onClose={() => setFocusedSection(null)}
        onFindingHover={rs.setHighlight}
      />

      {/* ── Tour Preview Tooltip ─────────────────────── */}
      {hoveredSlotId && hoveredSummary && (
        <div
          className="draft-tour-preview"
          data-testid={`tour-preview-${hoveredSlotId}`}
          style={{
            top: hoveredSlotRect.top,
            right: hoveredSlotRect.right,
          }}
          onMouseEnter={handlePreviewEnter}
          onMouseLeave={handlePreviewLeave}
        >
          <div className="draft-tour-preview-counts">
            {hoveredSummary.red > 0 && (
              <span className="draft-tour-preview-count" style={{ color: '#FF6B6B' }}>
                <span className="draft-severity-dot" style={{ background: '#FF6B6B' }} />
                {hoveredSummary.red}
              </span>
            )}
            {hoveredSummary.yellow > 0 && (
              <span className="draft-tour-preview-count" style={{ color: '#FFD93D' }}>
                <span className="draft-severity-dot" style={{ background: '#FFD93D' }} />
                {hoveredSummary.yellow}
              </span>
            )}
            {hoveredSummary.green > 0 && (
              <span className="draft-tour-preview-count" style={{ color: '#6BCB77' }}>
                <span className="draft-severity-dot" style={{ background: '#6BCB77' }} />
                {hoveredSummary.green}
              </span>
            )}
            <span className="draft-tour-preview-count" style={{ color: 'rgba(245,240,225,0.4)' }}>
              {hoveredSummary.total} total
            </span>
          </div>
          <div className="draft-tour-preview-sections">
            {hoveredSummary.sections.map(s => s.toUpperCase()).join(' \u00B7 ')}
          </div>
          <button
            className="draft-tour-preview-start"
            data-testid={`tour-start-${hoveredSlotId}`}
            onClick={() => {
              setHoveredSlotId(null);
              rs.closeAll();
              setFocusedSection(null);
              tour.start(hoveredSlotId);
            }}
          >
            {'\u25B6'} START TOUR
          </button>
        </div>
      )}

      {/* ── Floating Tour Overlay (between frame & chin) ── */}
      <div className="draft-tour-overlay" ref={overlayRef} data-testid="draft-tour-overlay">

        {/* Meta: avatar + reviewer + section + counter + nav */}
        <div className="draft-tour-meta">
          {step && (
            <>
              <div className="draft-tour-avatar" style={{ borderColor: step.reviewerColor }}>
                <img src={step.reviewerAvatar} alt={step.reviewerName} />
              </div>
              <span className="draft-tour-reviewer" style={{ color: step.reviewerColor }}>{step.reviewerName}</span>
              {step.reviewerBias && (
                <span data-testid="tour-lens" className="draft-tour-lens">{step.reviewerBias}</span>
              )}
              <span className="draft-tour-dash">&mdash;</span>
              <span className="draft-tour-section">{step.sectionLabel}</span>
              <span className="draft-tour-counter">[{step.index + 1}/{step.totalSteps}]</span>
              <button className="draft-tour-nav" onClick={tour.prev} disabled={isFirst} data-testid="draft-prev">&larr;</button>
              <button className="draft-tour-nav" onClick={tour.next} disabled={isLast} data-testid="draft-next">&rarr;</button>
            </>
          )}
        </div>

        {/* Finding: hero text */}
        <div className="draft-tour-finding" data-testid="draft-tour-finding">
          {step && (
            <>
              <span className="draft-severity-dot" style={{ background: severityColor(step.finding.light), color: severityColor(step.finding.light), marginRight: 8, verticalAlign: 'middle', width: 8, height: 8, boxShadow: `0 0 6px ${severityColor(step.finding.light)}` }} />
              &ldquo;{step.finding.text}&rdquo;
            </>
          )}
        </div>

        {/* Guided: progress bar + breadcrumbs */}
        <div className="draft-tour-progress-row">
          <div className="draft-tour-bar">
            <span className="draft-bar-filled">{'\u2588'.repeat(filledBlocks)}</span>
            <span className="draft-bar-empty">{'\u2591'.repeat(totalBlocks - filledBlocks)}</span>
          </div>
          <div className="draft-tour-breadcrumb">
            {projectSections.map((sec, i) => (
              <span key={sec}>
                {i > 0 && <span className="draft-tour-crumb-sep">&gt;</span>}
                <span
                  className={`draft-tour-crumb ${i === currentSectionIdx ? 'active' : ''}`}
                  onClick={() => {
                    const idx = tour.state.steps.findIndex(s => s.section === sec && s.reviewerId === tour.currentStep?.reviewerId);
                    if (idx >= 0) tour.goTo(idx);
                  }}
                >
                  {sectionLabel(sec)}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Live: progress track + step counter */}
        <div className="draft-tour-live-row">
          <div className="draft-tour-track">
            <div className="draft-tour-fill" style={{ width: `${tour.progress * 100}%` }} />
          </div>
          <span className="draft-tour-step">{tour.state.currentIndex + 1}/{tour.state.steps.length}</span>
        </div>

      </div>

      {/* ── CRT Chin Overlay (hand + power only) ── */}
      <div className="draft-crt-overlay" data-testid="draft-crt-overlay">

        {/* Hand icon (centered, dimmed during tour) */}
        <div className="draft-crt-idle">
          <span className="draft-chin-hand" data-testid="chin-hand">{'\u270B'}</span>
        </div>

        {/* Power button — always visible, right edge */}
        <button
          className="draft-power-btn"
          data-testid="theme-toggle"
          data-theme-state={contentTheme}
          onClick={toggleTheme}
          aria-label={`Switch to ${contentTheme === 'dark' ? 'light' : 'dark'} mode`}
        />

      </div>

    </div>
  );
}
