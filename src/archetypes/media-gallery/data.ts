export type MediaCategory = 'Nature' | 'Architecture' | 'People' | 'Abstract';

export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  width: number;
  height: number;
  color: string;
  date: string;
  likes: number;
}

export const categories = ['All', 'Nature', 'Architecture', 'People', 'Abstract'] as const;

export const sortOptions = ['Newest', 'Oldest', 'Most Liked', 'Title A-Z'] as const;

export const mediaItems: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Mountain Sunrise',
    category: 'Nature',
    width: 1200,
    height: 800,
    color: '#2D9C5A',
    date: '2025-12-15',
    likes: 142,
  },
  {
    id: 'media-2',
    title: 'Glass Tower',
    category: 'Architecture',
    width: 800,
    height: 1200,
    color: '#3B82F6',
    date: '2025-11-28',
    likes: 98,
  },
  {
    id: 'media-3',
    title: 'Street Portrait',
    category: 'People',
    width: 1000,
    height: 1000,
    color: '#F59E0B',
    date: '2026-01-05',
    likes: 231,
  },
  {
    id: 'media-4',
    title: 'Color Fragments',
    category: 'Abstract',
    width: 1400,
    height: 900,
    color: '#EC4899',
    date: '2026-01-20',
    likes: 175,
  },
  {
    id: 'media-5',
    title: 'Ocean Waves',
    category: 'Nature',
    width: 1600,
    height: 900,
    color: '#0EA5E9',
    date: '2025-10-12',
    likes: 310,
  },
  {
    id: 'media-6',
    title: 'Concrete Curves',
    category: 'Architecture',
    width: 900,
    height: 1200,
    color: '#6B7280',
    date: '2025-09-18',
    likes: 64,
  },
  {
    id: 'media-7',
    title: 'Laughing Child',
    category: 'People',
    width: 1100,
    height: 800,
    color: '#F97316',
    date: '2026-02-01',
    likes: 412,
  },
  {
    id: 'media-8',
    title: 'Geometric Neon',
    category: 'Abstract',
    width: 1000,
    height: 1000,
    color: '#8B5CF6',
    date: '2025-08-22',
    likes: 89,
  },
  {
    id: 'media-9',
    title: 'Autumn Forest',
    category: 'Nature',
    width: 1400,
    height: 800,
    color: '#D97706',
    date: '2025-11-03',
    likes: 256,
  },
  {
    id: 'media-10',
    title: 'Spiral Staircase',
    category: 'Architecture',
    width: 800,
    height: 1100,
    color: '#475569',
    date: '2026-01-14',
    likes: 187,
  },
  {
    id: 'media-11',
    title: 'Market Vendor',
    category: 'People',
    width: 1200,
    height: 900,
    color: '#DC2626',
    date: '2025-12-29',
    likes: 134,
  },
  {
    id: 'media-12',
    title: 'Ink Bloom',
    category: 'Abstract',
    width: 1000,
    height: 1200,
    color: '#1E293B',
    date: '2026-02-08',
    likes: 203,
  },
];
