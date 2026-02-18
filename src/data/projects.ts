/**
 * Project definitions — the designs being reviewed.
 *
 * Each project contains versions (iterations of the design).
 * Projects render either as inline React components (component)
 * or external HTML via iframe (htmlUrl).
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
  component?: React.ComponentType<{ version: string }>;  // Inline React rendering
  htmlUrl?: (version: string) => string;                  // Iframe rendering (URL per version)
  sections?: string[];                                     // Section order (defaults to SECTION_ORDER)
}

// ─── Registry ─────────────────────────────────────────

export const projects: ProjectDef[] = [
  {
    id: 'flowboard',
    name: 'FlowBoard',
    description: 'AI-generated PM tool landing page \u2014 Claude Haiku draft.',
    icon: '\u{1F4CB}',
    accent: '#7C3AED',
    archetype: 'landing-page',
    versions: [
      { id: 'haiku', label: 'haiku', hook: 'Claude Haiku Draft' },
    ],
    sections: ['hero', 'features', 'pricing', 'testimonials', 'cta'],
    htmlUrl: (v) => `/projects/FlowBoard/${v}.html`,
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
