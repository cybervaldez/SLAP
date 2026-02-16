/**
 * Project definitions — the designs being reviewed.
 *
 * Each project contains versions (iterations of the design).
 * Version components are lazy-loaded from src/projects/{projectId}/versions/.
 */

import type React from 'react';

export interface VersionDef {
  id: string;
  label: string;
  hook: string;               // Tagline (e.g., "Raw & Honest")
  dark?: boolean;
  shapedBy?: string[];         // Reviewer IDs who influenced this version
  parentVersionId?: string;    // Lineage tracking
}

export interface ProjectDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  archetype: string;           // Content archetype for review section mapping
  versions: VersionDef[];
  component: React.ComponentType<{ version: string }>;
}

// ─── Registry ─────────────────────────────────────────

export const projects: ProjectDef[] = [
  // Projects will be registered here as they are built.
  // Example:
  // {
  //   id: 'landing-page',
  //   name: 'Landing Page',
  //   description: 'A conversion-focused landing page with hero, features, pricing, and social proof.',
  //   icon: '🚀',
  //   accent: '#4ECDC4',
  //   archetype: 'landing-page',
  //   versions: [
  //     { id: 'slap', label: 'v1', hook: 'SLAP!' },
  //     { id: 'brutalist', label: 'v2', hook: 'Raw & Honest', shapedBy: ['frank', 'dex'], parentVersionId: 'slap' },
  //     { id: 'neo-minimal', label: 'v3', hook: 'Less is More', shapedBy: ['priya', 'jasmine'], parentVersionId: 'slap' },
  //   ],
  //   component: LandingPageProject,
  // },
];

// ─── Lookup ───────────────────────────────────────────

const projectMap = new Map(projects.map(p => [p.id, p]));

export function getProject(id: string): ProjectDef | undefined {
  return projectMap.get(id);
}

export function getVersion(projectId: string, versionId: string): VersionDef | undefined {
  const project = projectMap.get(projectId);
  return project?.versions.find(v => v.id === versionId);
}
