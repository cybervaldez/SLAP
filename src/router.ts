import type { Route } from './types';
import { isValidLens } from './lensThemes';

export function parseHash(hash: string): Route {
  const stripped = hash.replace(/^#\/?/, '');
  if (!stripped) return { path: '/', slug: null, variation: null, lens: null };

  const segments = stripped.split('/');
  const first = segments[0];

  if (isValidLens(first)) {
    return {
      path: `/${stripped}`,
      lens: first,
      slug: segments[1] || null,
      variation: segments[2] || null,
    };
  }

  // Unknown first segment — go home
  return { path: '/', slug: null, variation: null, lens: null };
}

export function navigate(lens?: string | null, archetype?: string, variation?: string): void {
  if (!lens) {
    window.location.hash = '#';
    return;
  }
  let path = lens;
  if (archetype) path += `/${archetype}`;
  if (variation) path += `/${variation}`;
  window.location.hash = `#${path}`;
}
