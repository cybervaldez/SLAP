import { experts, personas } from '../data/reviewers';

/**
 * Load council from localStorage.
 * Returns array of reviewer IDs, or null if none saved.
 */
export function loadCouncil(): string[] | null {
  const raw = localStorage.getItem('slap-default-council');
  if (!raw) return null;
  try {
    const ids = JSON.parse(raw);
    if (Array.isArray(ids) && ids.length > 0) return ids;
    return null;
  } catch {
    return null;
  }
}

/**
 * Generate a random council using the same algorithm as
 * the landing page dice roll.
 * Returns array of reviewer IDs (5-6 total).
 */
export function autoRollCouncil(): string[] {
  const shuffledExperts = [...experts].sort(() => Math.random() - 0.5);
  const expertCount = Math.random() > 0.5 ? 3 : 2;
  const pickedExperts = shuffledExperts.slice(0, expertCount);

  const categories = [
    'accessibility', 'tech-spectrum', 'role-based',
    'emotional-state', 'context', 'cultural-taste',
  ];
  const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
  const personaCount = expertCount === 2 ? 4 : 3;
  const pickedPersonaIds: string[] = [];

  for (let j = 0; j < personaCount && j < shuffledCats.length; j++) {
    const catPersonas = personas.filter(p => p.category === shuffledCats[j]);
    if (catPersonas.length > 0) {
      pickedPersonaIds.push(
        catPersonas[Math.floor(Math.random() * catPersonas.length)].id
      );
    }
  }

  return [
    ...pickedExperts.map(e => e.id),
    ...pickedPersonaIds,
  ];
}
