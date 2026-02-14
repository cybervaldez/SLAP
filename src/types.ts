export interface Route {
  path: string;
  slug: string | null;
  variation: string | null;
  lens: string | null;
}

export interface VariationDef {
  id: string;
  hook: string;
  dark?: boolean;
}

export interface ArchetypeDemoProps {
  variation: string;
}

export interface ArchetypeEntry {
  slug: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  component: React.ComponentType<ArchetypeDemoProps>;
  variations?: VariationDef[];
}

export interface LensDef {
  id: string;
  persona: string;
  category: string;
  tagline: string;
  taste: string;
  homeVariation: string;
}

export interface CrewDef {
  id: string;
  name: string;
  role: string;
  taste: string;
  icon: string;
  bg: string;
  ringBorder: string;
}

export interface CrewFinding {
  perspective: string;
  confession: string;
  industryContext: string;
}

export type DockMode = 'review' | 'kaizen' | 'crew';
export type OverlayView = 'team' | 'kaizen' | 'solo';
export type TrafficLight = 'green' | 'yellow' | 'red';

export interface ExpertDef {
  id: string;
  name: string;
  role: string;
  icon: string;
  bg: string;
  ringBorder: string;
}

export interface ExpertSectionFinding {
  text: string;
  light: TrafficLight;
  comment: string;
}

export interface ExpertFinding {
  score: number;
  verdict: string;
  sections: Record<string, ExpertSectionFinding[]>;
}

export interface ConsensusItem { text: string; type: 'agree' | 'disagree'; }
export interface ActionItem { priority: 'high' | 'med' | 'low'; text: string; }
export interface ReviewBundle { consensus: ConsensusItem[]; actions: ActionItem[]; }

export type SectionId = 'hero' | 'pricing' | 'testimonials' | 'faq' | 'signup' | 'products' | 'cart' | 'checkout' | 'opening' | 'hierarchy' | 'measure' | 'ornament' | 'ending';

export interface SectionFindingSummary {
  sectionId: SectionId;
  severity: TrafficLight;
  expertFindings: {
    expertName: string;
    sectionKey: string;
    items: ExpertSectionFinding[];
  }[];
  personaFindings: {
    personaName: string;
    items: { text: string; light: TrafficLight; comment: string }[];
  }[];
  totalFindings: number;
}

export interface AppState {
  view: 'gallery' | string;
  route: string;
  initialized: boolean;
  variation?: string;
  overlayOpen?: boolean;
}
