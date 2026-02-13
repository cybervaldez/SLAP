import type { LensDef } from '../types';

export const lenses: LensDef[] = [
  // ─── ACCESSIBILITY (3) ──────────────────────────────────────

  {
    id: 'marcus',
    persona: 'Marcus',
    category: 'Accessibility',
    tagline: 'What I see as a colorblind developer',
    taste: 'Manga reader, indie gamer, mechanical keyboard collector',
    homeVariation: 'dark-industrial',
  },
  {
    id: 'elena',
    persona: 'Elena',
    category: 'Accessibility',
    tagline: 'What I hear through my screen reader',
    taste: 'Audiobook marathoner, pottery class regular, true crime podcast fan',
    homeVariation: 'warm-organic',
  },
  {
    id: 'priya',
    persona: 'Priya',
    category: 'Accessibility',
    tagline: 'What I can reach with limited motor control',
    taste: 'Crossword puzzle devotee, bird watcher, cozy mystery novels',
    homeVariation: 'neo-minimal',
  },

  // ─── TECH SPECTRUM (3) ──────────────────────────────────────

  {
    id: 'dorothy',
    persona: 'Dorothy',
    category: 'Tech Spectrum',
    tagline: 'What I see as someone who just wants it to work',
    taste: 'Romance novels, Hallmark movies, church newsletter editor, quilting circle',
    homeVariation: 'warm-organic',
  },
  {
    id: 'kevin',
    persona: 'Kevin',
    category: 'Tech Spectrum',
    tagline: 'What I see as a digital native with zero patience',
    taste: 'TikTok creator, anime fan, synthwave playlists, speedrun viewer',
    homeVariation: 'retro-futurism',
  },
  {
    id: 'raj',
    persona: 'Raj',
    category: 'Tech Spectrum',
    tagline: 'What I see as a power user who lives in the terminal',
    taste: 'Open source contributor, sci-fi audiobooks, home automation nerd, D&D dungeon master',
    homeVariation: 'dark-industrial',
  },

  // ─── ROLE-BASED (3) ────────────────────────────────────────

  {
    id: 'carlos',
    persona: 'Carlos',
    category: 'Role-Based',
    tagline: 'What I see as a CEO evaluating this',
    taste: 'Business biographies, jazz vinyl collector, single malt whiskey, CNBC',
    homeVariation: 'art-deco',
  },
  {
    id: 'jasmine',
    persona: 'Jasmine',
    category: 'Role-Based',
    tagline: 'What I see after answering 50 support tickets today',
    taste: 'K-drama binger, bullet journal obsessive, plant parent, matcha snob',
    homeVariation: 'neo-minimal',
  },
  {
    id: 'tommy',
    persona: 'Tommy',
    category: 'Role-Based',
    tagline: 'What I see as an intern on day three',
    taste: 'Sneaker collector, hip-hop producer, streetwear forums, basketball highlights',
    homeVariation: 'memphis',
  },

  // ─── EMOTIONAL STATE (3) ───────────────────────────────────

  {
    id: 'frank',
    persona: 'Frank',
    category: 'Emotional State',
    tagline: 'What I see when I have zero patience left',
    taste: 'Fantasy football obsessed, action movies, 5-ingredient meals, ESPN live scores',
    homeVariation: 'brutalist',
  },
  {
    id: 'diana',
    persona: 'Diana',
    category: 'Emotional State',
    tagline: 'What delights me when craft meets intention',
    taste: 'Wes Anderson completionist, Japanese stationery collector, thrift store regular, sourdough parent',
    homeVariation: 'art-deco',
  },
  {
    id: 'sarah',
    persona: 'Sarah',
    category: 'Emotional State',
    tagline: 'What I see when I trust nothing at face value',
    taste: 'Spreadsheet enthusiast, comparison shopping queen, Consumer Reports subscriber, debate team alumni',
    homeVariation: 'brutalist',
  },

  // ─── CONTEXT (3) ───────────────────────────────────────────

  {
    id: 'sam',
    persona: 'Sam',
    category: 'Context',
    tagline: 'What I see on a crowded subway with one thumb',
    taste: 'True crime podcasts, comic book reader, mobile gacha games, ramen hunter',
    homeVariation: 'retro-futurism',
  },
  {
    id: 'maya',
    persona: 'Maya',
    category: 'Context',
    tagline: 'What I see between kid meltdowns and dinner prep',
    taste: 'DIY YouTube rabbit holes, IKEA hacker, meal prep Sunday, mom group admin',
    homeVariation: 'warm-organic',
  },
  {
    id: 'mike',
    persona: 'Mike',
    category: 'Context',
    tagline: 'What I see when my whole team is watching my screen',
    taste: 'Architecture photography, minimalist lifestyle, pour-over coffee, cycling routes',
    homeVariation: 'neo-minimal',
  },

  // ─── CULTURAL TASTE (3) ────────────────────────────────────

  {
    id: 'yuki',
    persona: 'Yuki',
    category: 'Cultural Taste',
    tagline: 'What I see when aesthetic is everything',
    taste: 'BookTok enthusiast, Studio Ghibli completionist, cottagecore aesthetic, tea ceremony learner',
    homeVariation: 'warm-organic',
  },
  {
    id: 'dex',
    persona: 'Dex',
    category: 'Cultural Taste',
    tagline: 'What I see through a subculture lens',
    taste: 'Vinyl DJ, graffiti-to-gallery art fan, zine maker, skate culture archivist',
    homeVariation: 'memphis',
  },
  {
    id: 'nora',
    persona: 'Nora',
    category: 'Cultural Taste',
    tagline: 'What I see when I expect luxury',
    taste: 'Opera season ticket holder, interior design client, first-edition book collector, wine region traveler',
    homeVariation: 'art-deco',
  },
];

const lensMap = new Map(lenses.map(l => [l.id, l]));

export function getLens(id: string): LensDef | undefined {
  return lensMap.get(id);
}

/** Get the 5 recommended personas for a variation based on the affinity matrix */
export function getVariationPersonas(variationId: string): LensDef[] {
  const matrix: Record<string, string[]> = {
    'slap': ['marcus', 'dorothy', 'carlos', 'frank', 'sam'],
    'brutalist': ['frank', 'sarah', 'dex', 'dorothy', 'marcus'],
    'neo-minimal': ['priya', 'jasmine', 'mike', 'marcus', 'kevin'],
    'maximalist': ['yuki', 'frank', 'diana', 'sam', 'priya'],
    'dark-industrial': ['marcus', 'raj', 'dorothy', 'jasmine', 'sam'],
    'warm-organic': ['dorothy', 'maya', 'frank', 'raj', 'elena'],
    'retro-futurism': ['kevin', 'sam', 'sarah', 'carlos', 'tommy'],
    'memphis': ['tommy', 'dex', 'carlos', 'nora', 'mike'],
    'art-deco': ['carlos', 'diana', 'nora', 'tommy', 'dex'],
  };
  const ids = matrix[variationId] ?? matrix['slap'];
  return ids.map(id => lensMap.get(id)).filter((l): l is LensDef => l !== undefined);
}
