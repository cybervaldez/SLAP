import type { ArchetypeEntry } from '../types';

import LandingPageDemo from './landing-page/LandingPageDemo';
import TextHeavyDemo from './text-heavy/TextHeavyDemo';
import ECommerceDemo from './e-commerce/ECommerceDemo';
import DataDashboardDemo from './data-dashboard/DataDashboardDemo';
import FormHeavyDemo from './form-heavy/FormHeavyDemo';
import TaskManagementDemo from './task-management/TaskManagementDemo';
import MediaGalleryDemo from './media-gallery/MediaGalleryDemo';
import RealTimeDemo from './real-time/RealTimeDemo';

export const archetypes: ArchetypeEntry[] = [
  {
    slug: 'landing-page',
    name: 'Landing Page',
    description: 'Hero sections, pricing tables, testimonials & CTAs',
    icon: '\u{1F680}',
    accent: '#8B5CF6',
    component: LandingPageDemo,
    variations: [
      { id: 'slap', hook: 'SLAP!' },
      { id: 'brutalist', hook: 'Raw & Honest' },
      { id: 'neo-minimal', hook: 'Less is More' },
      { id: 'maximalist', hook: 'More is More' },
      { id: 'dark-industrial', hook: 'Built to Spec' },
      { id: 'warm-organic', hook: 'Grown, Not Made' },
      { id: 'retro-futurism', hook: 'Tomorrow, Today' },
    ],
  },
  {
    slug: 'text-heavy',
    name: 'Text Heavy',
    description: 'Long-form content with TOC, search & collapsible sections',
    icon: '\u{1F4D6}',
    accent: '#2563EB',
    component: TextHeavyDemo,
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce',
    description: 'Product grid, cart drawer & checkout flow',
    icon: '\u{1F6D2}',
    accent: '#EF4444',
    component: ECommerceDemo,
  },
  {
    slug: 'data-dashboard',
    name: 'Data Dashboard',
    description: 'Metrics, charts, filters & sortable data tables',
    icon: '\u{1F4CA}',
    accent: '#059669',
    component: DataDashboardDemo,
  },
  {
    slug: 'form-heavy',
    name: 'Form Heavy',
    description: 'Multi-step forms with validation & conditional fields',
    icon: '\u{1F4DD}',
    accent: '#7C3AED',
    component: FormHeavyDemo,
  },
  {
    slug: 'task-management',
    name: 'Task Management',
    description: 'Kanban board with drag-and-drop & task modals',
    icon: '\u{1F4CB}',
    accent: '#F59E0B',
    component: TaskManagementDemo,
  },
  {
    slug: 'media-gallery',
    name: 'Media Gallery',
    description: 'Grid/list views, lightbox, filters & lazy loading',
    icon: '\u{1F5BC}\uFE0F',
    accent: '#EC4899',
    component: MediaGalleryDemo,
  },
  {
    slug: 'real-time',
    name: 'Real-Time',
    description: 'Chat interface with simulated messages & channels',
    icon: '\u{1F4AC}',
    accent: '#06B6D4',
    component: RealTimeDemo,
  },
];

const archetypeMap = new Map(archetypes.map(a => [a.slug, a]));

export function getArchetype(slug: string): ArchetypeEntry | undefined {
  return archetypeMap.get(slug);
}
