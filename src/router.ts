/**
 * Hash router for SLAP! v2
 *
 * URL pattern: #/{projectId}/{versionId}
 * Examples:
 *   #/landing-page/brutalist
 *   #/landing-page
 *   (empty) → gallery
 */

import type { Route } from './types';

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '');
  if (!raw) return { projectId: null, versionId: null };

  const segments = raw.split('/').filter(Boolean);
  return {
    projectId: segments[0] || null,
    versionId: segments[1] || null,
  };
}

export function navigate(projectId?: string, versionId?: string): void {
  if (!projectId) {
    window.location.hash = '';
  } else if (!versionId) {
    window.location.hash = `#/${projectId}`;
  } else {
    window.location.hash = `#/${projectId}/${versionId}`;
  }
}
