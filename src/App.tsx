import { useState, useEffect, useCallback } from 'react';
import { useRoute } from './hooks/useRoute';
import { navigate } from './router';
import { archetypes, getArchetype } from './archetypes';
import GalleryHub from './components/GalleryHub';
import DemoShell from './components/DemoShell';
import DockBar from './components/DockBar';
import type { BubbleData } from './components/DockBar';
import UIReviewOverlay from './components/UIReviewOverlay';
import SectionHighlightOverlay from './components/SectionHighlightOverlay';
import { getAllPersonaFindings } from './data/personaFindings';
import { getAllExpertFindings, getReviewBundle } from './data/expertFindings';
import type { DockMode, OverlayView } from './types';

function computePersonaScore(entry: { observations: { verdict: string }[] }): number {
  if (entry.observations.length === 0) return 5;
  const total = entry.observations.reduce((sum, obs) => {
    if (obs.verdict === 'good') return sum + 10;
    if (obs.verdict === 'needs-work') return sum + 5;
    return sum + 1;
  }, 0);
  return Math.round(total / entry.observations.length);
}

const PERSONA_COLORS: Record<string, { bg: string; text: string }> = {
  marcus: { bg: '#4ECDC4', text: '#1A1A2E' },
  dorothy: { bg: '#6BCB77', text: '#1A1A2E' },
  carlos: { bg: '#FFD93D', text: '#1A1A2E' },
  frank: { bg: '#FF6B6B', text: '#fff' },
  sam: { bg: '#9B59B6', text: '#fff' },
};

export default function App() {
  const route = useRoute();
  const archetype = route.slug ? getArchetype(route.slug) : null;
  const view = archetype ? route.slug! : 'gallery';
  const defaultVariation = archetype?.variations?.[0]?.id ?? 'slap';

  // Derive variation from URL, falling back to the first defined variation
  const resolvedVariation = (() => {
    if (!route.variation) return defaultVariation;
    const valid = archetype?.variations?.some(v => v.id === route.variation);
    return valid ? route.variation : defaultVariation;
  })();

  const [activeVariation, setActiveVariation] = useState(resolvedVariation);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [dockMode, setDockMode] = useState<DockMode | null>(null);
  const [overlayView, setOverlayView] = useState<OverlayView>('team');
  const [soloId, setSoloId] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Sync variation from URL (handles back/forward navigation)
  useEffect(() => {
    setActiveVariation(resolvedVariation);
    setIsOverlayOpen(false);
    setDockMode(null);
    setOverlayView('team');
    setSoloId(null);
    setHoveredSection(null);
  }, [route.slug, route.variation, resolvedVariation]);

  useEffect(() => {
    (window as any).appState = {
      view,
      route: route.path,
      initialized: true,
      variation: archetype?.variations ? activeVariation : undefined,
      overlayOpen: isOverlayOpen,
      hoveredSection,
      dockMode,
    };
  }, [view, route.path, activeVariation, archetype, isOverlayOpen, hoveredSection, dockMode]);

  const handleVariationChange = useCallback((id: string) => {
    if (route.slug) {
      navigate(route.slug, id);
    }
  }, [route.slug]);

  const handleOverlayClose = useCallback(() => {
    setIsOverlayOpen(false);
    setSoloId(null);
    setDockMode(null);
    setHoveredSection(null);
  }, []);

  const handleModeChange = useCallback((mode: DockMode) => {
    setDockMode(mode);
    setOverlayView(mode === 'review' ? 'team' : 'kaizen');
    setSoloId(null);
    setIsOverlayOpen(true);
  }, []);

  const handleTabSwitch = useCallback((tab: 'team' | 'kaizen') => {
    setDockMode(tab === 'team' ? 'review' : 'kaizen');
    setOverlayView(tab);
    setSoloId(null);
  }, []);

  const handleBubbleClick = useCallback((id: string) => {
    setOverlayView('solo');
    setSoloId(id);
    setIsOverlayOpen(true);
  }, []);

  const handleSoloSelect = useCallback((id: string) => {
    setOverlayView('solo');
    setSoloId(id);
    setIsOverlayOpen(true);
  }, []);

  const handleSoloClose = useCallback(() => {
    setOverlayView(dockMode === 'kaizen' ? 'kaizen' : 'team');
    setSoloId(null);
  }, [dockMode]);

  if (archetype) {
    const DemoComponent = archetype.component;
    const variationDef = archetype.variations?.find(v => v.id === activeVariation);
    const slug = archetype.slug;

    const allPersonaFindings = archetype.variations
      ? getAllPersonaFindings(slug, activeVariation)
      : [];
    const allExpertFindings = archetype.variations
      ? getAllExpertFindings(slug, activeVariation)
      : [];
    const reviewBundle = archetype.variations
      ? getReviewBundle(slug, activeVariation, 'review')
      : undefined;
    const kaizenBundle = archetype.variations
      ? getReviewBundle(slug, activeVariation, 'kaizen')
      : undefined;

    // Build bubble data for DockBar
    const expertBubbles: BubbleData[] = allExpertFindings.map(({ expert, finding }) => ({
      id: expert.id,
      icon: expert.icon,
      label: expert.name,
      score: finding.score,
    }));

    const personaBubbles: BubbleData[] = allPersonaFindings.map(({ lens, entry }) => {
      const colors = PERSONA_COLORS[lens.id] || { bg: '#4ECDC4', text: '#1A1A2E' };
      return {
        id: lens.id,
        icon: lens.persona.charAt(0).toUpperCase(),
        score: computePersonaScore(entry),
        bg: colors.bg,
        color: colors.text,
      };
    });

    const handleFindingHover = (sectionKey: string | null) => {
      setHoveredSection(sectionKey);
    };

    return (
      <>
        <DemoShell
          archetypeName={archetype.name}
          variations={archetype.variations}
          activeVariation={activeVariation}
          onVariationChange={handleVariationChange}
          accent={archetype.accent}
        >
          <DemoComponent variation={activeVariation} />
        </DemoShell>
        {isOverlayOpen && (
          <div
            data-testid="overlay-backdrop"
            onClick={handleOverlayClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 899,
              background: 'transparent',
            }}
          />
        )}
        <SectionHighlightOverlay
          isOpen={isOverlayOpen}
          hoveredSection={hoveredSection}
        />
        <DockBar
          mode={dockMode}
          expertBubbles={expertBubbles}
          personaBubbles={personaBubbles}
          activeBubbleId={soloId}
          onModeChange={handleModeChange}
          onBubbleClick={handleBubbleClick}
        />
        <UIReviewOverlay
          isOpen={isOverlayOpen}
          onClose={handleOverlayClose}
          overlayView={overlayView}
          dockMode={dockMode}
          soloId={soloId}
          onTabSwitch={handleTabSwitch}
          onSoloSelect={handleSoloSelect}
          onSoloClose={handleSoloClose}
          variationHook={variationDef?.hook ?? activeVariation}
          expertFindings={allExpertFindings}
          reviewBundle={reviewBundle}
          personaFindings={allPersonaFindings}
          kaizenBundle={kaizenBundle}
          onFindingHover={handleFindingHover}
        />
      </>
    );
  }

  return <GalleryHub archetypes={archetypes} />;
}
