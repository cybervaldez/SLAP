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

const SECTION_ORDER = ['hero', 'features', 'pricing', 'cta'];

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
): TourEngine {
  const [state, setState] = useState<TourState>(INITIAL_STATE);
  const sections = sectionOrder || SECTION_ORDER;

  const start = useCallback((reviewerId: string, mode: TourMode = 'guided') => {
    const steps = buildSteps(projectId, versionId, reviewerId, sections);
    if (steps.length === 0) return;
    setState({ active: true, mode, reviewerId, steps, currentIndex: 0 });
  }, [projectId, versionId, sections]);

  const stop = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const next = useCallback(() => {
    setState(prev => {
      if (!prev.active || prev.currentIndex >= prev.steps.length - 1) return prev;
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, []);

  const prev = useCallback(() => {
    setState(prev => {
      if (!prev.active || prev.currentIndex <= 0) return prev;
      return { ...prev, currentIndex: prev.currentIndex - 1 };
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setState(prev => {
      if (!prev.active || index < 0 || index >= prev.steps.length) return prev;
      return { ...prev, currentIndex: index };
    });
  }, []);

  const setMode = useCallback((mode: TourMode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  const currentStep = state.active ? state.steps[state.currentIndex] ?? null : null;
  const progress = state.steps.length > 0 ? (state.currentIndex + 1) / state.steps.length : 0;

  return useMemo(() => ({
    state,
    currentStep,
    progress,
    start,
    stop,
    next,
    prev,
    goTo,
    setMode,
  }), [state, currentStep, progress, start, stop, next, prev, goTo, setMode]);
}

// ─── Helpers ──────────────────────────────────────────────

export { SECTION_ORDER, SECTION_LABELS };
