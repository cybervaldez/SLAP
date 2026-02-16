/**
 * Unified reviewer definitions — experts and personas.
 * Each reviewer has a unique accent color and DiceBear avatar.
 */

export interface Reviewer {
  id: string;
  type: 'expert' | 'persona';
  name: string;
  role: string;
  category: string;
  color: string;
  icon: string;
  bias: string;
  taste?: string;
  homeVersion?: string;
  avatarStyle: 'shapes' | 'adventurer';
}

// ─── Experts (5) ───────────────────────────────────────

export const experts: Reviewer[] = [
  {
    id: 'marketing',
    type: 'expert',
    name: 'MARKETING',
    role: 'Positioning · Messaging · CTA',
    category: 'expert',
    color: '#FF6B6B',
    icon: '🎯',
    bias: 'Does this sell? Is the value proposition clear in 5 seconds?',
    avatarStyle: 'shapes',
  },
  {
    id: 'ux',
    type: 'expert',
    name: 'UX',
    role: 'Usability · Accessibility · Flow',
    category: 'expert',
    color: '#4ECDC4',
    icon: '🎨',
    bias: 'Can every user accomplish their goal without friction?',
    avatarStyle: 'shapes',
  },
  {
    id: 'product',
    type: 'expert',
    name: 'PRODUCT',
    role: 'Value Prop · ROI · Positioning',
    category: 'expert',
    color: '#FFD93D',
    icon: '📦',
    bias: 'Does this feature justify its complexity? What is the user actually paying for?',
    avatarStyle: 'shapes',
  },
  {
    id: 'technical',
    type: 'expert',
    name: 'TECHNICAL',
    role: 'Performance · Mobile · Standards',
    category: 'expert',
    color: '#95E1D3',
    icon: '🔧',
    bias: 'Will this work on slow connections, old devices, and screen readers?',
    avatarStyle: 'shapes',
  },
  {
    id: 'design',
    type: 'expert',
    name: 'DESIGN',
    role: 'Visual · Branding · Aesthetics',
    category: 'expert',
    color: '#F38181',
    icon: '✨',
    bias: 'Is every visual choice intentional? Does it feel like a brand or a template?',
    avatarStyle: 'shapes',
  },
];

// ─── Personas (18) — 6 categories × 3 ─────────────────

export const personas: Reviewer[] = [
  // Accessibility
  {
    id: 'marcus',
    type: 'persona',
    name: 'Marcus',
    role: 'Colorblind Developer',
    category: 'accessibility',
    color: '#4ECDC4',
    icon: '👓',
    bias: 'Color-only indicators are invisible to me.',
    taste: 'Terminal themes, high contrast, prefers dark mode',
    homeVersion: 'dark-industrial',
    avatarStyle: 'adventurer',
  },
  {
    id: 'elena',
    type: 'persona',
    name: 'Elena',
    role: 'Screen Reader User',
    category: 'accessibility',
    color: '#7B68EE',
    icon: '🔊',
    bias: 'If it does not have a label, it does not exist.',
    taste: 'Podcasts, audiobooks, keyboard shortcuts for everything',
    homeVersion: 'warm-organic',
    avatarStyle: 'adventurer',
  },
  {
    id: 'priya',
    type: 'persona',
    name: 'Priya',
    role: 'Limited Motor Control',
    category: 'accessibility',
    color: '#DDA0DD',
    icon: '🖱️',
    bias: 'If the click target is smaller than my thumb, I will miss it.',
    taste: 'Minimalist interfaces, voice control, large buttons',
    homeVersion: 'neo-minimal',
    avatarStyle: 'adventurer',
  },
  // Tech Spectrum
  {
    id: 'dorothy',
    type: 'persona',
    name: 'Dorothy',
    role: 'Just Wants It To Work',
    category: 'tech-spectrum',
    color: '#6BCB77',
    icon: '👵',
    bias: 'What does OAuth mean? I just want to log in.',
    taste: 'Newspapers, recipe cards, phone calls over text',
    homeVersion: 'warm-organic',
    avatarStyle: 'adventurer',
  },
  {
    id: 'kevin',
    type: 'persona',
    name: 'Kevin',
    role: 'Digital Native, Zero Patience',
    category: 'tech-spectrum',
    color: '#FF8C00',
    icon: '⚡',
    bias: 'If it takes more than 2 taps I am already gone.',
    taste: 'TikTok, Discord, neon gradients, dark mode everything',
    homeVersion: 'retro-futurism',
    avatarStyle: 'adventurer',
  },
  {
    id: 'raj',
    type: 'persona',
    name: 'Raj',
    role: 'Power User / Terminal Dweller',
    category: 'tech-spectrum',
    color: '#20B2AA',
    icon: '⌨️',
    bias: 'Where are the keyboard shortcuts? Where is the CLI?',
    taste: 'Vim keybindings, tiling window managers, monospace everything',
    homeVersion: 'dark-industrial',
    avatarStyle: 'adventurer',
  },
  // Role-Based
  {
    id: 'carlos',
    type: 'persona',
    name: 'Carlos',
    role: 'CEO Evaluating',
    category: 'role-based',
    color: '#DAA520',
    icon: '💼',
    bias: 'Show me the ROI in the first scroll. I have a board meeting in 10 minutes.',
    taste: 'Bloomberg Terminal, executive summaries, gold accents',
    homeVersion: 'art-deco',
    avatarStyle: 'adventurer',
  },
  {
    id: 'jasmine',
    type: 'persona',
    name: 'Jasmine',
    role: 'Overworked Support Rep',
    category: 'role-based',
    color: '#87CEEB',
    icon: '🎧',
    bias: 'I get 3 tickets a day about this exact screen.',
    taste: 'Clean dashboards, searchable docs, calm interfaces',
    homeVersion: 'neo-minimal',
    avatarStyle: 'adventurer',
  },
  {
    id: 'tommy',
    type: 'persona',
    name: 'Tommy',
    role: 'Intern Day Three',
    category: 'role-based',
    color: '#FF69B4',
    icon: '🎓',
    bias: 'I have been clicking around for 10 minutes and still do not understand this page.',
    taste: 'Memes, colorful UIs, tutorials, anything fun',
    homeVersion: 'memphis',
    avatarStyle: 'adventurer',
  },
  // Emotional State
  {
    id: 'frank',
    type: 'persona',
    name: 'Frank',
    role: 'Zero Patience',
    category: 'emotional-state',
    color: '#FF6B6B',
    icon: '😤',
    bias: 'I am already annoyed. Every extra click makes it worse.',
    taste: 'No-nonsense, raw, brutally efficient',
    homeVersion: 'brutalist',
    avatarStyle: 'adventurer',
  },
  {
    id: 'diana',
    type: 'persona',
    name: 'Diana',
    role: 'Craft Meets Intention',
    category: 'emotional-state',
    color: '#BA55D3',
    icon: '✨',
    bias: 'I notice when someone cared. I also notice when they did not.',
    taste: 'Artisanal coffee, typography blogs, museum exhibitions',
    homeVersion: 'art-deco',
    avatarStyle: 'adventurer',
  },
  {
    id: 'sarah',
    type: 'persona',
    name: 'Sarah',
    role: 'Trusts Nothing',
    category: 'emotional-state',
    color: '#CD853F',
    icon: '🔍',
    bias: 'Where is the privacy policy? Who are these testimonial people?',
    taste: 'Reading reviews, comparing alternatives, checking credentials',
    homeVersion: 'brutalist',
    avatarStyle: 'adventurer',
  },
  // Context
  {
    id: 'sam',
    type: 'persona',
    name: 'Sam',
    role: 'Crowded Subway, One Thumb',
    category: 'context',
    color: '#9B59B6',
    icon: '📱',
    bias: 'If I cannot do it with one thumb on a bumpy train, it is broken.',
    taste: 'Mobile-first, large touch targets, offline-capable',
    homeVersion: 'retro-futurism',
    avatarStyle: 'adventurer',
  },
  {
    id: 'maya',
    type: 'persona',
    name: 'Maya',
    role: 'Between Kid Meltdowns',
    category: 'context',
    color: '#F0E68C',
    icon: '👶',
    bias: 'I have 30 seconds before chaos. Do not make me think.',
    taste: 'Warm colors, clear hierarchy, save-and-resume',
    homeVersion: 'warm-organic',
    avatarStyle: 'adventurer',
  },
  {
    id: 'mike',
    type: 'persona',
    name: 'Mike',
    role: 'Team Watching Screen',
    category: 'context',
    color: '#708090',
    icon: '🖥️',
    bias: 'My team is watching. If this looks confusing I look incompetent.',
    taste: 'Professional, clean, nothing embarrassing',
    homeVersion: 'neo-minimal',
    avatarStyle: 'adventurer',
  },
  // Cultural Taste
  {
    id: 'yuki',
    type: 'persona',
    name: 'Yuki',
    role: 'Aesthetic Everything',
    category: 'cultural-taste',
    color: '#FFB7C5',
    icon: '🌸',
    bias: 'If it is not beautiful I do not trust it.',
    taste: 'Japanese design, wabi-sabi, intentional imperfection',
    homeVersion: 'warm-organic',
    avatarStyle: 'adventurer',
  },
  {
    id: 'dex',
    type: 'persona',
    name: 'Dex',
    role: 'Subculture Lens',
    category: 'cultural-taste',
    color: '#32CD32',
    icon: '🎸',
    bias: 'Corporate design is the enemy. Show me something real.',
    taste: 'Zines, DIY, punk aesthetics, anti-establishment',
    homeVersion: 'memphis',
    avatarStyle: 'adventurer',
  },
  {
    id: 'nora',
    type: 'persona',
    name: 'Nora',
    role: 'Expects Luxury',
    category: 'cultural-taste',
    color: '#C4A35A',
    icon: '👑',
    bias: 'If this does not feel premium I am not paying premium prices.',
    taste: 'Gold accents, serif fonts, white space, understated elegance',
    homeVersion: 'art-deco',
    avatarStyle: 'adventurer',
  },
];

// ─── Helpers ──────────────────────────────────────────

export const allReviewers: Reviewer[] = [...experts, ...personas];

const reviewerMap = new Map(allReviewers.map(r => [r.id, r]));

export function getReviewer(id: string): Reviewer | undefined {
  return reviewerMap.get(id);
}

export function getExpert(id: string): Reviewer | undefined {
  const r = reviewerMap.get(id);
  return r?.type === 'expert' ? r : undefined;
}

export function getPersona(id: string): Reviewer | undefined {
  const r = reviewerMap.get(id);
  return r?.type === 'persona' ? r : undefined;
}

export function getReviewersByCategory(category: string): Reviewer[] {
  return allReviewers.filter(r => r.category === category);
}

export function getAvatarUrl(reviewer: Reviewer): string {
  const bgHex = reviewer.color.replace('#', '');
  const seed = reviewer.type === 'expert' ? `${reviewer.id}-expert` : reviewer.id;
  return `https://api.dicebear.com/9.x/${reviewer.avatarStyle}/svg?seed=${seed}&backgroundColor=${bgHex}`;
}

// ─── Version-Persona Affinity ─────────────────────────

const AFFINITY: Record<string, string[]> = {
  'slap':            ['marcus', 'dorothy', 'carlos', 'frank', 'sam'],
  'brutalist':       ['frank', 'sarah', 'dex', 'dorothy', 'marcus'],
  'neo-minimal':     ['priya', 'jasmine', 'mike', 'marcus', 'kevin'],
  'maximalist':      ['yuki', 'frank', 'diana', 'sam', 'priya'],
  'dark-industrial': ['marcus', 'raj', 'dorothy', 'jasmine', 'sam'],
  'warm-organic':    ['dorothy', 'maya', 'frank', 'raj', 'elena'],
  'retro-futurism':  ['kevin', 'sam', 'sarah', 'carlos', 'tommy'],
  'memphis':         ['tommy', 'dex', 'carlos', 'nora', 'mike'],
  'art-deco':        ['carlos', 'diana', 'nora', 'tommy', 'dex'],
};

export function getVersionPersonas(versionId: string): Reviewer[] {
  const ids = AFFINITY[versionId] || [];
  return ids.map(id => reviewerMap.get(id)).filter(Boolean) as Reviewer[];
}
