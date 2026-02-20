/**
 * Tour engine — builds steps from review data, manages navigation.
 *
 * Supports two presentation modes:
 *   guided — SVG spotlight + narrator chin
 *   live   — floating bubble parade + progress chin
 *
 * Both share the same step data and navigation logic.
 *
 * Section order is configurable per project via the sectionOrder param.
 */

import { useState, useCallback, useMemo } from 'react';
import { getReview } from '../data/reviews';
import { getReviewer, getAvatarUrl } from '../data/reviewers';
import type { Finding } from '../data/reviews';

// ─── Types ────────────────────────────────────────────────

export type TourMode = 'guided' | 'live';

const SECTION_ORDER = ['hero', 'features', 'pricing', 'testimonials', 'cta'];

/** Well-known section label abbreviations */
const KNOWN_LABELS: Record<string, string> = {
  hero: 'HERO',
  features: 'FEAT',
  pricing: 'PRC',
  cta: 'CTA',
  testimonials: 'TEST',
  footer: 'FTR',
};

function buildLabels(sections: string[]): Record<string, string> {
  return Object.fromEntries(
    sections.map(s => [s, KNOWN_LABELS[s] || s.slice(0, 4).toUpperCase()])
  );
}

const SECTION_LABELS: Record<string, string> = buildLabels(SECTION_ORDER);

export interface TourStep {
  index: number;
  totalSteps: number;
  reviewerId: string;
  reviewerName: string;
  reviewerColor: string;
  reviewerAvatar: string;
  reviewerBias: string;
  section: string;
  sectionLabel: string;
  sectionCrumb: string;
  finding: Finding;
}

export interface TourState {
  active: boolean;
  mode: TourMode;
  reviewerId: string | null;
  steps: TourStep[];
  currentIndex: number;
}

export interface TourEngine {
  state: TourState;
  currentStep: TourStep | null;
  progress: number;
  isFirst: boolean;
  isLast: boolean;
  start: (reviewerId: string, mode?: TourMode) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  setMode: (mode: TourMode) => void;
}

// ─── Step Builder ─────────────────────────────────────────

function buildSteps(
  projectId: string | null,
  versionId: string,
  reviewerId: string,
  sectionOrder: string[],
): TourStep[] {
  if (!projectId) return [];
  const review = getReview(projectId, versionId, reviewerId);
  const reviewer = getReviewer(reviewerId);
  if (!review || !reviewer) return [];

  const labels = buildLabels(sectionOrder);
  const steps: TourStep[] = [];

  for (const section of sectionOrder) {
    const findings = review.sections[section];
    if (!findings) continue;
    for (const finding of findings) {
      steps.push({
        index: steps.length,
        totalSteps: 0, // filled below
        reviewerId: reviewer.id,
        reviewerName: reviewer.name,
        reviewerColor: reviewer.color,
        reviewerAvatar: getAvatarUrl(reviewer),
        reviewerBias: reviewer.bias,
        section,
        sectionLabel: section.toUpperCase(),
        sectionCrumb: labels[section] || section.toUpperCase(),
        finding,
      });
    }
  }
  for (const step of steps) step.totalSteps = steps.length;
  return steps;
}

/** Concatenate steps for every reviewer in rail order into a single flat array. */
function buildAllSteps(
  projectId: string | null,
  versionId: string,
  reviewerIds: string[],
  sectionOrder: string[],
): TourStep[] {
  const all: TourStep[] = [];
  for (const rid of reviewerIds) {
    const steps = buildSteps(projectId, versionId, rid, sectionOrder);
    for (const step of steps) {
      all.push({ ...step, index: all.length, totalSteps: 0 });
    }
  }
  for (const step of all) step.totalSteps = all.length;
  return all;
}

// ─── Hook ─────────────────────────────────────────────────

const INITIAL_STATE: TourState = {
  active: false,
  mode: 'guided',
  reviewerId: null,
  steps: [],
  currentIndex: 0,
};

export function useTour(
  projectId: string | null,
  versionId: string,
  sectionOrder?: string[],
  allReviewerIds?: string[],
): TourEngine {
  const [state, setState] = useState<TourState>(INITIAL_STATE);
  const sections = sectionOrder || SECTION_ORDER;
  const reviewerIds = allReviewerIds || [];

  const start = useCallback((reviewerId: string, mode: TourMode = 'guided') => {
    const steps = reviewerIds.length > 0
      ? buildAllSteps(projectId, versionId, reviewerIds, sections)
      : buildSteps(projectId, versionId, reviewerId, sections);
    if (steps.length === 0) return;
    // Find the first step belonging to the requested reviewer
    const startIndex = reviewerIds.length > 0
      ? Math.max(0, steps.findIndex(s => s.reviewerId === reviewerId))
      : 0;
    setState({ active: true, mode, reviewerId, steps, currentIndex: startIndex });
  }, [projectId, versionId, sections, reviewerIds]);

  const stop = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const next = useCallback(() => {
    setState(prev => {
      if (!prev.active || prev.currentIndex >= prev.steps.length - 1) return prev;
      const nextIndex = prev.currentIndex + 1;
      const nextStep = prev.steps[nextIndex];
      return { ...prev, currentIndex: nextIndex, reviewerId: nextStep?.reviewerId ?? prev.reviewerId };
    });
  }, []);

  const prev = useCallback(() => {
    setState(prev => {
      if (!prev.active || prev.currentIndex <= 0) return prev;
      const nextIndex = prev.currentIndex - 1;
      const nextStep = prev.steps[nextIndex];
      return { ...prev, currentIndex: nextIndex, reviewerId: nextStep?.reviewerId ?? prev.reviewerId };
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setState(prev => {
      if (!prev.active || index < 0 || index >= prev.steps.length) return prev;
      const targetStep = prev.steps[index];
      return { ...prev, currentIndex: index, reviewerId: targetStep?.reviewerId ?? prev.reviewerId };
    });
  }, []);

  const setMode = useCallback((mode: TourMode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  const currentStep = state.active ? state.steps[state.currentIndex] ?? null : null;
  const progress = state.steps.length > 0 ? (state.currentIndex + 1) / state.steps.length : 0;
  const isFirst = state.currentIndex === 0;
  const isLast = state.steps.length > 0 && state.currentIndex === state.steps.length - 1;

  return useMemo(() => ({
    state,
    currentStep,
    progress,
    isFirst,
    isLast,
    start,
    stop,
    next,
    prev,
    goTo,
    setMode,
  }), [state, currentStep, progress, isFirst, isLast, start, stop, next, prev, goTo, setMode]);
}

// ─── Helpers ──────────────────────────────────────────────

export { SECTION_ORDER, SECTION_LABELS };
