/**
 * Shared tour engine — drives both Guided Review and Live Review modes.
 *
 * Sits atop useReviewState: calls setHighlight() to drive the existing
 * Driver.js spotlight without modifying the core state machine types.
 */

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { getReviewer, getAvatarUrl } from '../data/reviewers';
import { getReview } from '../data/reviews';
import type { Finding } from '../data/reviews';
import type { HighlightInfo } from './useReviewState';

// ─── Types ───────────────────────────────────────────────

export type TourMode = 'guided' | 'live';

export interface TourStep {
  index: number;
  reviewerId: string;
  reviewerName: string;
  reviewerColor: string;
  reviewerAvatar: string;
  reviewerBias: string;
  section: string;
  finding: Finding;
  findingIndex: number;
  totalSteps: number;
}

interface TourState {
  active: boolean;
  mode: TourMode;
  steps: TourStep[];
  currentIndex: number;
  reviewerId: string | null;
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
  setTourMode: (mode: TourMode) => void;
}

// ─── Constants ───────────────────────────────────────────

const SECTION_ORDER = ['hero', 'features', 'pricing', 'cta'];

const INITIAL_STATE: TourState = {
  active: false,
  mode: 'guided',
  steps: [],
  currentIndex: 0,
  reviewerId: null,
};

// ─── Hook ────────────────────────────────────────────────

export function useTourEngine(
  projectId: string | null,
  versionId: string,
  setHighlight: (info: HighlightInfo | null) => void,
): TourEngine {
  const [state, setState] = useState<TourState>(INITIAL_STATE);
  const setHighlightRef = useRef(setHighlight);
  setHighlightRef.current = setHighlight;

  // Build ordered steps from a reviewer's review
  const buildSteps = useCallback((reviewerId: string): TourStep[] => {
    if (!projectId) return [];

    const reviewer = getReviewer(reviewerId);
    const review = getReview(projectId, versionId, reviewerId);
    if (!reviewer || !review) return [];

    const steps: TourStep[] = [];
    const avatar = getAvatarUrl(reviewer);

    for (const section of SECTION_ORDER) {
      const findings = review.sections[section];
      if (!findings) continue;
      for (let fi = 0; fi < findings.length; fi++) {
        steps.push({
          index: steps.length,
          reviewerId: reviewer.id,
          reviewerName: reviewer.name,
          reviewerColor: reviewer.color,
          reviewerAvatar: avatar,
          reviewerBias: reviewer.bias,
          section,
          finding: findings[fi],
          findingIndex: fi,
          totalSteps: 0, // filled below
        });
      }
    }

    // Fill totalSteps
    for (const step of steps) {
      step.totalSteps = steps.length;
    }

    return steps;
  }, [projectId, versionId]);

  // Start tour
  const start = useCallback((reviewerId: string, mode: TourMode = 'guided') => {
    const steps = buildSteps(reviewerId);
    if (steps.length === 0) return;

    setState({
      active: true,
      mode,
      steps,
      currentIndex: 0,
      reviewerId,
    });
  }, [buildSteps]);

  // Stop tour
  const stop = useCallback(() => {
    setState(INITIAL_STATE);
    setHighlightRef.current(null);
  }, []);

  // Navigate
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

  // Change mode without resetting position
  const setTourMode = useCallback((mode: TourMode) => {
    setState(prev => {
      if (!prev.active) return prev;
      return { ...prev, mode };
    });
  }, []);

  // Current step derived
  const currentStep = useMemo(() => {
    if (!state.active || state.steps.length === 0) return null;
    return state.steps[state.currentIndex] ?? null;
  }, [state.active, state.steps, state.currentIndex]);

  // Progress 0-1
  const progress = useMemo(() => {
    if (!state.active || state.steps.length <= 1) return 0;
    return state.currentIndex / (state.steps.length - 1);
  }, [state.active, state.steps.length, state.currentIndex]);

  // Drive highlight on step change
  useEffect(() => {
    if (!state.active || !currentStep) return;

    setHighlightRef.current({
      section: currentStep.section,
      text: currentStep.finding.text,
      color: currentStep.reviewerColor,
      ref: currentStep.finding.ref,
    });
  }, [state.active, currentStep]);

  return {
    state,
    currentStep,
    progress,
    start,
    stop,
    next,
    prev,
    goTo,
    setTourMode,
  };
}
