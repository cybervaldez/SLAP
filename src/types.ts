/**
 * Shared types for SLAP! v2 overlay components.
 *
 * Core data types live in their respective data files:
 *   - Reviewer        → data/reviewers.ts
 *   - Review, Finding → data/reviews.ts
 *   - ProjectDef      → data/projects.ts
 */

// Re-export from data layer for convenience
export type { TrafficLight, Finding, Review } from './data/reviews';
export type { Reviewer } from './data/reviewers';
export type { ProjectDef, VersionDef } from './data/projects';

// ─── Route ────────────────────────────────────────────

export interface Route {
  projectId: string | null;
  versionId: string | null;
}

// ─── Bubble Rail Data ─────────────────────────────────

export interface BubbleData {
  id: string;
  label: string;
  score: number;
  icon: string;
  accentColor: string;
  avatar?: string;
  bg?: string;
  color?: string;
}
