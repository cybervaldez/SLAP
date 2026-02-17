/**
 * Project definitions — the designs being reviewed.
 *
 * Each project contains versions (iterations of the design).
 * Version components are lazy-loaded from src/projects/{projectId}/versions/.
 */

import type React from 'react';
import ExampleDesign from '../projects/example/ExampleDesign';

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
  {
    id: 'example',
    name: 'Example Landing Page',
    description: 'A SaaS landing page \u2014 from AI slop to intentional design.',
    icon: '\u{1F680}',
    accent: '#4ECDC4',
    archetype: 'landing-page',
    versions: [
      { id: 'v1', label: 'v1', hook: 'AI Generated' },
      {
        id: 'v2',
        label: 'v2',
        hook: 'After SLAP',
        parentVersionId: 'v1',
        shapedBy: ['elena', 'frank', 'sarah'],
      },
    ],
    component: ExampleDesign,
  },
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
