/**
 * Review data — findings from experts and personas.
 *
 * Keyed by composite ID: '{projectId}:{versionId}:{reviewerId}'
 * Each review contains a score, verdict, and per-section findings.
 */

export type TrafficLight = 'green' | 'yellow' | 'red';

export interface Finding {
  text: string;
  light: TrafficLight;
  comment: string;
  ref?: string;
}

export interface Review {
  score: number;
  verdict: string;
  shortVerdict: string;
  sections: Record<string, Finding[]>;
}

// ─── Review Data ──────────────────────────────────────

import { flowboardReviews } from './flowboardReviews';

const reviews: Record<string, Review> = {
  ...flowboardReviews,
};

// ─── Consensus & Actions ──────────────────────────────

export interface ConsensusItem {
  type: 'agree' | 'disagree';
  text: string;
}

export interface ActionItem {
  priority: 'high' | 'med' | 'low';
  text: string;
}

export interface ReviewBundle {
  consensus: ConsensusItem[];
  actions: ActionItem[];
}

const reviewBundles: Record<string, ReviewBundle> = {
  // Key format: 'landing-page:slap:review' or 'landing-page:slap:kaizen'
};

// ─── Lookup ───────────────────────────────────────────

export function getReview(projectId: string, versionId: string, reviewerId: string): Review | undefined {
  return reviews[`${projectId}:${versionId}:${reviewerId}`];
}

export function getAllReviews(projectId: string, versionId: string): { reviewerId: string; review: Review }[] {
  const prefix = `${projectId}:${versionId}:`;
  return Object.entries(reviews)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, review]) => ({
      reviewerId: key.slice(prefix.length),
      review,
    }));
}

export function getReviewBundle(projectId: string, versionId: string, mode: 'review' | 'kaizen'): ReviewBundle | undefined {
  return reviewBundles[`${projectId}:${versionId}:${mode}`];
}
