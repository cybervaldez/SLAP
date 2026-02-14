export const VALID_LENSES = ['editorial', 'brutalist', 'minimal', 'chalkboard', 'neutral'] as const;
export type LensId = typeof VALID_LENSES[number];

export function isValidLens(s: string): s is LensId {
  return (VALID_LENSES as readonly string[]).includes(s);
}

export interface LensColumnDef {
  id: LensId;
  name: string;
  hook: string;
  bg: string;
  text: string;
  accent: string;
  hoverBg: string;
  avatarStyle: string;
  defaultTheme: 'dark' | 'light';
}

export const LENS_COLUMNS: LensColumnDef[] = [
  { id: 'editorial', name: 'Editorial', hook: 'Magazine-grade typography meets data-driven roasting.', bg: '#faf8f4', text: '#1a1a1a', accent: '#e85d75', hoverBg: '#f2ede5', avatarStyle: 'lorelei', defaultTheme: 'light' },
  { id: 'brutalist', name: 'Brutalist', hook: 'Raw structure. No cosmetics. Words hit harder naked.', bg: '#ffffff', text: '#000000', accent: '#ff0000', hoverBg: '#f0f0f0', avatarStyle: 'identicon', defaultTheme: 'light' },
  { id: 'minimal', name: 'Minimal', hook: 'Silence as a design choice. Let the content breathe.', bg: '#fafafa', text: '#1a1a1a', accent: '#888888', hoverBg: '#f0f0f0', avatarStyle: 'rings', defaultTheme: 'light' },
  { id: 'chalkboard', name: 'Chalkboard', hook: 'Handwritten warmth on a dusty green surface.', bg: '#2d4a3e', text: '#e8dcc8', accent: '#ffd93d', hoverBg: '#3a5c4e', avatarStyle: 'notionists', defaultTheme: 'dark' },
  { id: 'neutral', name: 'Neutral', hook: 'Dark, precise, and gold-accented. The control variable.', bg: '#0a0a0a', text: '#fafafa', accent: '#ffd700', hoverBg: '#1a1a1a', avatarStyle: 'avataaars', defaultTheme: 'dark' },
];

export const LENS_VARIATION_MAP: Record<string, string> = {
  editorial: 'maximalist',
  brutalist: 'brutalist',
  minimal: 'neo-minimal',
  chalkboard: 'warm-organic',
  neutral: 'dark-industrial',
};

