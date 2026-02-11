import type { Route } from './types';

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '');
  if (!raw) return { path: '/', slug: null, variation: null };

  const segments = raw.split('/');
  const slug = segments[0] || null;
  const variation = segments[1] || null;

  return {
    path: slug ? `/${raw}` : '/',
    slug,
    variation,
  };
}

export function navigate(path: string, variation?: string): void {
  const clean = path.replace(/^[#/]+/, '');
  const full = variation ? `${clean}/${variation}` : clean;
  window.location.hash = `#${full}`;
}
