/**
 * Design Workspace — review overlay + dual-mode tour.
 *
 * Architecture:
 *   useReviewState()  → 3-tier overlay (rail → popover → panel)
 *   useTourEngine()   → guided/live tour (drives setHighlight)
 *   Both share the same SectionHighlight spotlight.
 *
 * Tour is a first-class mode, not a bolt-on. When active it closes
 * all overlays, suppresses the annotation label (chin/speech narrates),
 * and takes over keyboard input.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRoute } from '../hooks/useRoute';
import { useReviewState } from '../hooks/useReviewState';
import { useTourEngine } from '../hooks/useTourEngine';
import { navigate } from '../router';
import { getProject, getVersion } from '../data/projects';
import { getAllReviews, getReview } from '../data/reviews';
import type { Review, TrafficLight } from '../data/reviews';
import { getReviewer, experts, getAvatarUrl } from '../data/reviewers';
import type { Reviewer } from '../data/reviewers';
import type { BubbleData } from '../types';
import type { SectionChip } from '../components/BubblePopover';
import { loadCouncil, autoRollCouncil } from '../utils/council';
import type { SavedFinding } from './workspace/notesTypes';
import { findingKey } from './workspace/notesTypes';

import TopBar from './workspace/TopBar';
import ComingSoonModal from './workspace/ComingSoonModal';
import NotesPill from './workspace/NotesPill';
import BubbleRail from '../components/BubbleRail';
import BubblePopover from '../components/BubblePopover';
import ReviewPanel from '../components/ReviewPanel';
import SectionHighlightOverlay from '../components/SectionHighlight';
import WipeTransition from '../components/WipeTransition';
import TourButton from '../components/TourButton';
import TourChin from '../components/TourChin';
import FloatingBubble from '../components/FloatingBubble';

// ─── Helpers ─────────────────────────────────────────────

function avgScore(pid: string, vid: string) {
  const all = getAllReviews(pid, vid);
  if (!all.length) return 0;
  return Math.round(all.reduce((s, { review: r }) => s + r.score, 0) / all.length * 10) / 10;
}

function worstLight(findings: { light: TrafficLight }[]): TrafficLight {
  if (findings.some(f => f.light === 'red')) return 'red';
  if (findings.some(f => f.light === 'yellow')) return 'yellow';
  return 'green';
}

function toBubble(r: Reviewer, rev?: Review): BubbleData {
  return { id: r.id, label: r.name, score: rev?.score ?? 0, icon: r.icon, accentColor: r.color, avatar: getAvatarUrl(r) };
}

function toChips(rev: Review): SectionChip[] {
  return Object.entries(rev.sections).map(([section, findings]) => {
    const sev = worstLight(findings);
    return { section, severity: sev, tooltipText: findings.find(f => f.light === sev)?.text };
  });
}

// ─── Keyframes ───────────────────────────────────────────

const PULSE_CSS = `@keyframes slapPulseHint { 0%,100% { box-shadow: 0 0 0 0 rgba(255,208,0,0.5); } 50% { box-shadow: 0 0 0 8px rgba(255,208,0,0); } }`;

// ─── Page ────────────────────────────────────────────────

export default function DesignWorkspace() {
  // ── routing ────────────────────────────────────────────
  const { projectId, versionId } = useRoute();
  const project = projectId ? getProject(projectId) : undefined;
  const effectiveVersionId = versionId || project?.versions[0]?.id || 'v1';
  const currentVersion = project ? getVersion(project.id, effectiveVersionId) : undefined;

  // ── state machines ─────────────────────────────────────
  const rs = useReviewState();
  const tour = useTourEngine(projectId, effectiveVersionId, rs.setHighlight);

  // ── council ────────────────────────────────────────────
  const [councilIds] = useState<string[]>(() => loadCouncil() || autoRollCouncil());
  const isUserCouncil = useMemo(() => loadCouncil() !== null, []);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  // ── notes ──────────────────────────────────────────────
  const [savedFindings, setSavedFindings] = useState<SavedFinding[]>([]);
  const [showVersionWarning, setShowVersionWarning] = useState(false);
  const savedKeys = useMemo(() => new Set(savedFindings.map(findingKey)), [savedFindings]);

  const handleSave = useCallback((reviewerId: string, reviewerName: string, section: string, findingIndex: number, text: string, comment: string, light: TrafficLight) => {
    const f: SavedFinding = { reviewerId, reviewerName, section, findingIndex, text, comment, light };
    const k = findingKey(f);
    setSavedFindings(prev => prev.some(x => findingKey(x) === k) ? prev.filter(x => findingKey(x) !== k) : [...prev, f]);
  }, []);

  // ── version scores ─────────────────────────────────────
  const versionScores = useMemo(() => {
    if (!project) return {};
    const out: Record<string, number> = {};
    for (const v of project.versions) out[v.id] = avgScore(project.id, v.id);
    return out;
  }, [project]);

  // ── bubbles ────────────────────────────────────────────
  const expertBubbles = useMemo(() => {
    if (!project) return [];
    return experts.map(e => toBubble(e, getReview(project.id, effectiveVersionId, e.id)));
  }, [project, effectiveVersionId]);

  const personaBubbles = useMemo(() => {
    if (!project) return [];
    const council = new Set(councilIds);
    const seen = new Set<string>();
    const out: BubbleData[] = [];
    for (const { reviewerId } of getAllReviews(project.id, effectiveVersionId)) {
      if (seen.has(reviewerId)) continue;
      const r = getReviewer(reviewerId);
      if (!r || r.type !== 'persona' || !council.has(r.id)) continue;
      seen.add(r.id);
      out.push(toBubble(r, getReview(project.id, effectiveVersionId, r.id)));
    }
    return out;
  }, [project, effectiveVersionId, councilIds]);

  // ── popover / panel data ───────────────────────────────
  const popoverReviewer = rs.popoverId ? getReviewer(rs.popoverId) : null;
  const popoverReview = rs.popoverId && project ? getReview(project.id, effectiveVersionId, rs.popoverId) : null;
  const popoverChips = useMemo(() => popoverReview ? toChips(popoverReview) : [], [popoverReview]);
  const panelReviewer = rs.panelId ? getReviewer(rs.panelId) ?? null : null;
  const panelReview = rs.panelId && project ? getReview(project.id, effectiveVersionId, rs.panelId) ?? null : null;

  // ── hint ───────────────────────────────────────────────
  const [hintDismissed, setHintDismissed] = useState(() => localStorage.getItem('slap-hint-dismissed') === '1');

  // ── shapedBy ───────────────────────────────────────────
  const shapedBySet = useMemo(() => new Set(currentVersion?.shapedBy ?? []), [currentVersion]);

  // ── handlers ───────────────────────────────────────────

  const handleBubbleClick = useCallback((id: string, rect: DOMRect) => {
    if (!hintDismissed) { setHintDismissed(true); localStorage.setItem('slap-hint-dismissed', '1'); }
    rs.toggleBubble(id, rect);
  }, [hintDismissed, rs]);

  const handleVersionChange = useCallback((vid: string) => {
    if (savedFindings.length) { setShowVersionWarning(true); setTimeout(() => setShowVersionWarning(false), 3000); }
    if (projectId) navigate(projectId, vid);
    rs.reset();
    tour.stop();
  }, [projectId, rs, tour, savedFindings.length]);

  // ── tour handlers ──────────────────────────────────────

  const handleTourStart = useCallback(() => {
    const rid = rs.activeBubbleId || expertBubbles[0]?.id;
    if (!rid) return;
    rs.closeAll();
    tour.start(rid);
  }, [rs, expertBubbles, tour]);

  // ── tour: chin data-attr + keyboard ────────────────────

  useEffect(() => {
    if (tour.state.active) document.body.dataset.tourChin = tour.state.mode;
    else delete document.body.dataset.tourChin;
    return () => { delete document.body.dataset.tourChin; };
  }, [tour.state.active, tour.state.mode]);

  useEffect(() => {
    if (!tour.state.active) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); tour.next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); tour.prev(); }
      if (e.key === 'Escape') tour.stop();
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [tour.state.active, tour]);

  // ── slapState (E2E) ───────────────────────────────────

  useEffect(() => {
    (window as any).slapState = {
      project: projectId,
      version: effectiveVersionId,
      reviewMode: rs.mode,
      activeReviewer: rs.activeBubbleId,
      overlayTier: rs.panelId ? 3 : rs.popoverId ? 2 : rs.activeBubbleId ? 1 : 0,
      highlightedSection: rs.highlightInfo?.section || null,
      highlightedRef: rs.highlightInfo?.ref || null,
      sections: ['hero', 'features', 'pricing', 'cta'],
      councilIds,
      savedNotesCount: savedFindings.length,
      tourActive: tour.state.active,
      tourMode: tour.state.mode,
      tourStep: tour.state.currentIndex,
      tourTotalSteps: tour.state.steps.length,
      tourReviewerId: tour.state.reviewerId,
    };
  });

  // ── 404 ────────────────────────────────────────────────

  if (!project) {
    return (
      <div data-testid="project-not-found" style={{ minHeight: '100vh', background: '#0D0D1A', color: '#F5F0E1', fontFamily: "'Courier New', monospace", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Project not found</h1>
        <p style={{ color: 'rgba(245,240,225,0.5)', fontSize: '0.8rem' }}>&quot;{projectId}&quot; does not exist.</p>
        <button onClick={() => navigate()} data-testid="not-found-back" style={{ fontFamily: "'Courier New', monospace", fontSize: '0.7rem', fontWeight: 700, color: '#FFD000', background: 'none', border: '1px solid #FFD000', padding: '8px 16px', cursor: 'pointer' }}>{'\u2190'} Back to home</button>
      </div>
    );
  }

  // ── render ─────────────────────────────────────────────

  const DemoComponent = project.component;
  const currentBubbles = rs.mode === 'review' ? expertBubbles : personaBubbles;
  const firstBubble = currentBubbles[0];

  return (
    <>
      <style>{PULSE_CSS}</style>
      <div data-testid="design-workspace" style={{ minHeight: '100vh', background: '#0D0D1A', color: '#F5F0E1', fontFamily: "'Courier New', monospace" }}>

        {/* ── top bar ──────────────────────────────────── */}
        <TopBar
          project={project}
          activeVersionId={effectiveVersionId}
          versionScores={versionScores}
          onVersionChange={handleVersionChange}
          onBack={() => navigate()}
          tourSlot={
            <TourButton
              visible={rs.activeBubbleId !== null || expertBubbles.length > 0}
              active={tour.state.active}
              mode={tour.state.mode}
              onStart={handleTourStart}
              onStop={tour.stop}
              onModeChange={tour.setTourMode}
            />
          }
        />

        {/* ── canvas ───────────────────────────────────── */}
        <WipeTransition activeVersion={effectiveVersionId} onVersionChange={() => {}} DemoComponent={DemoComponent} />

        {/* ── backdrop ─────────────────────────────────── */}
        {rs.isOverlayActive && (
          <div data-testid="workspace-backdrop" onClick={rs.closeAll} style={{ position: 'fixed', inset: 0, zIndex: 790, background: 'transparent' }} />
        )}

        {/* ── bubble rail ──────────────────────────────── */}
        <BubbleRail
          mode={rs.mode}
          onModeChange={rs.setMode}
          expertBubbles={expertBubbles}
          personaBubbles={personaBubbles}
          activeBubbleId={rs.activeBubbleId}
          onBubbleClick={handleBubbleClick}
          tour={{ active: tour.state.active, mode: tour.state.mode, reviewerId: tour.state.reviewerId }}
        />

        {/* ── council label ────────────────────────────── */}
        {rs.mode === 'kaizen' && <CouncilLabel isUserCouncil={isUserCouncil} onBrowseAll={() => setComingSoonOpen(true)} />}

        {/* ── pulse hint ───────────────────────────────── */}
        {!hintDismissed && firstBubble && !rs.activeBubbleId && !tour.state.active && (
          <div data-testid="pulse-hint" style={{ position: 'fixed', right: 60, top: '50%', transform: 'translateY(-50%)', zIndex: 801, pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#FFD000', letterSpacing: '0.06em', opacity: 0.8, whiteSpace: 'nowrap' }}>Click to review</span>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFD000', animation: 'slapPulseHint 1.5s ease-in-out infinite' }} />
          </div>
        )}

        {/* ── shapedBy badges ──────────────────────────── */}
        {shapedBySet.size > 0 && <ShapedByBadges bubbles={currentBubbles} shapedBySet={shapedBySet} />}

        {/* ── popover (tier 2) ─────────────────────────── */}
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
        />

        {/* ── panel (tier 3) ───────────────────────────── */}
        <ReviewPanel
          isOpen={rs.panelId !== null}
          onClose={rs.closePanel}
          reviewer={panelReviewer}
          review={panelReview}
          onFindingHover={rs.setHighlight}
          onFindingSave={handleSave}
          savedFindingKeys={savedKeys}
        />

        {/* ── spotlight ────────────────────────────────── */}
        <SectionHighlightOverlay isOpen={rs.highlightInfo !== null} highlight={rs.highlightInfo} suppressAnnotation={tour.state.active} />

        {/* ── tour chin ────────────────────────────────── */}
        <TourChin active={tour.state.active} mode={tour.state.mode} currentStep={tour.currentStep} progress={tour.progress} onPrev={tour.prev} onNext={tour.next} onGoTo={tour.goTo} />

        {/* ── floating bubble (live only) ──────────────── */}
        <FloatingBubble active={tour.state.active && tour.state.mode === 'live'} currentStep={tour.currentStep} />

        {/* ── notes ────────────────────────────────────── */}
        <NotesPill findings={savedFindings} projectName={project.name} versionId={effectiveVersionId} onClear={() => setSavedFindings([])} />

        {/* ── version warning ──────────────────────────── */}
        {showVersionWarning && savedFindings.length > 0 && (
          <div data-testid="notes-version-warning" style={{ position: 'fixed', bottom: 48, left: '50%', transform: 'translateX(-50%)', zIndex: 901, background: '#FFD000', color: '#0D0D1A', fontFamily: "'Courier New', monospace", fontSize: '0.5rem', fontWeight: 700, padding: '6px 14px', borderRadius: 4, whiteSpace: 'nowrap' }}>
            Notes from previous version are still saved
          </div>
        )}

        <ComingSoonModal isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
      </div>
    </>
  );
}

// ─── Council Label (local) ───────────────────────────────

function CouncilLabel({ isUserCouncil, onBrowseAll }: { isUserCouncil: boolean; onBrowseAll: () => void }) {
  const [top, setTop] = useState(0);
  useEffect(() => {
    const update = () => { const el = document.querySelector('[data-testid="bubble-mode-personas"]'); if (el) setTop(el.getBoundingClientRect().bottom + 8); };
    update();
    const id = setInterval(update, 500);
    return () => clearInterval(id);
  }, []);
  if (!top) return null;
  return (
    <div data-testid="council-label" style={{ position: 'fixed', right: 6, top, zIndex: 801, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, pointerEvents: 'auto' }}>
      <span style={{ fontSize: '0.3rem', fontWeight: 800, letterSpacing: '0.12em', color: isUserCouncil ? '#FFD000' : 'rgba(245,240,225,0.4)', whiteSpace: 'nowrap' }}>{isUserCouncil ? 'YOUR COUNCIL' : 'SUGGESTED'}</span>
      <button
        data-testid="browse-all-btn" onClick={onBrowseAll}
        style={{ fontFamily: "'Courier New', monospace", fontSize: '0.28rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(245,240,225,0.35)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap', transition: 'color 150ms' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#FFD000'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,225,0.35)'; }}
      >BROWSE ALL {'\u2192'}</button>
    </div>
  );
}

// ─── ShapedBy Badges (local) ─────────────────────────────

function ShapedByBadges({ bubbles, shapedBySet }: { bubbles: BubbleData[]; shapedBySet: Set<string> }) {
  const [pos, setPos] = useState<Record<string, { top: number; right: number }>>({});
  useEffect(() => {
    const update = () => {
      const p: Record<string, { top: number; right: number }> = {};
      for (const b of bubbles) {
        if (!shapedBySet.has(b.id)) continue;
        const el = document.querySelector(`[data-testid="bubble-${b.id}"]`);
        if (el) { const r = el.getBoundingClientRect(); p[b.id] = { top: r.top - 2, right: window.innerWidth - r.right - 2 }; }
      }
      setPos(p);
    };
    update();
    const id = setInterval(update, 500);
    return () => clearInterval(id);
  }, [bubbles, shapedBySet]);
  return (<>{Object.entries(pos).map(([id, p]) => (
    <div key={id} data-testid={`shaped-badge-${id}`} title="SHAPED" style={{ position: 'fixed', top: p.top, right: p.right, zIndex: 802, width: 10, height: 10, borderRadius: '50%', background: '#FFD000', border: '2px solid #0D0D1A', pointerEvents: 'none' }} />
  ))}</>);
}
