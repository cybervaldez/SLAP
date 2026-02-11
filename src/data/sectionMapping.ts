import type {
  SectionId,
  SectionFindingSummary,
  TrafficLight,
  ExpertDef,
  ExpertFinding,
  ExpertSectionFinding,
} from '../types';
import type { LensDef } from '../types';
import type { PersonaEntry } from './personaFindings';

const EXPERT_KEY_TO_SECTION: Record<string, SectionId> = {
  hero: 'hero',
  features: 'hero',
  pricing: 'pricing',
  testimonials: 'testimonials',
  faq: 'faq',
  signup: 'signup',
};

const ALL_SECTIONS: SectionId[] = ['hero', 'pricing', 'testimonials', 'faq', 'signup'];

function worstSeverity(lights: TrafficLight[]): TrafficLight {
  if (lights.includes('red')) return 'red';
  if (lights.includes('yellow')) return 'yellow';
  return 'green';
}

export function aggregateSectionFindings(
  expertFindings: { expert: ExpertDef; finding: ExpertFinding }[],
  personaFindings: { lens: LensDef; entry: PersonaEntry }[],
): SectionFindingSummary[] {
  return ALL_SECTIONS.map((sectionId) => {
    const expertEntries: SectionFindingSummary['expertFindings'] = [];
    const allLights: TrafficLight[] = [];

    for (const { expert, finding } of expertFindings) {
      const matchedItems: { sectionKey: string; items: ExpertSectionFinding[] }[] = [];

      for (const [key, items] of Object.entries(finding.sections)) {
        const mapped = EXPERT_KEY_TO_SECTION[key];
        if (mapped === sectionId) {
          matchedItems.push({ sectionKey: key, items });
          for (const item of items) {
            allLights.push(item.light);
          }
        }
      }

      if (matchedItems.length > 0) {
        const allItems = matchedItems.flatMap((m) => m.items);
        expertEntries.push({
          expertName: expert.name,
          sectionKey: matchedItems[0].sectionKey,
          items: allItems,
        });
      }
    }

    // Persona findings are category-based, not section-based
    // They appear in all section popups as supplementary notes
    const personaEntries: SectionFindingSummary['personaFindings'] = personaFindings.map(
      ({ lens, entry }) => ({
        personaName: lens.persona,
        items: entry.observations.map((obs) => ({
          text: obs.observation,
          light: (obs.verdict === 'good'
            ? 'green'
            : obs.verdict === 'needs-work'
              ? 'yellow'
              : 'red') as TrafficLight,
          comment: obs.comment,
        })),
      }),
    );

    const totalFindings =
      expertEntries.reduce((sum, e) => sum + e.items.length, 0);

    // Severity is driven by expert findings only
    const severity = allLights.length > 0 ? worstSeverity(allLights) : 'green';

    return {
      sectionId,
      severity,
      expertFindings: expertEntries,
      personaFindings: personaEntries,
      totalFindings,
    };
  });
}
