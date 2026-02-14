import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRoute } from './hooks/useRoute';
import { navigate } from './router';
import { getArchetype } from './archetypes';
import Homepage from './components/Homepage';
import DemoShell from './components/DemoShell';
import WipeTransition from './components/WipeTransition';
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

  // 2-screen routing:
  // Screen 1: Homepage (columns or scrollytelling) — lens only, no slug
  // Screen 2: Archetype page — lens + slug
  const archetype = route.lens && route.slug ? getArchetype(route.slug) : null;
  const activeLens = route.lens;
  const view = archetype ? route.slug! : activeLens ? 'scrollytelling' : 'home';
  const defaultVariation = archetype?.variations?.[0]?.id ?? 'slap';

  const resolvedVariation = (() => {
    if (!route.variation) return defaultVariation;
    const valid = archetype?.variations?.some(v => v.id === route.variation);
    return valid ? route.variation : defaultVariation;
  })();

  const [activeVariation, setActiveVariation] = useState(resolvedVariation);
  const [showTopBar, setShowTopBar] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [dockMode, setDockMode] = useState<DockMode | null>(null);
  const [overlayView, setOverlayView] = useState<OverlayView>('team');
  const [soloId, setSoloId] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Reset UI state when navigating to a different archetype
  useEffect(() => {
    setShowTopBar(false);
    setIsOverlayOpen(false);
    setDockMode(null);
    setOverlayView('team');
    setSoloId(null);
    setHoveredSection(null);
  }, [route.slug]);

  // Sync variation from URL (handles back/forward navigation + pill clicks)
  useEffect(() => {
    setActiveVariation(resolvedVariation);
  }, [resolvedVariation]);

  useEffect(() => {
    // Only set appState when on archetype page; Homepage sets its own
    if (archetype) {
      (window as any).appState = {
        view,
        route: route.path,
        initialized: true,
        variation: archetype.variations ? activeVariation : undefined,
        overlayOpen: isOverlayOpen,
        hoveredSection,
        dockMode,
        lens: activeLens,
      };
    }
  }, [view, route.path, activeVariation, archetype, isOverlayOpen, hoveredSection, dockMode, activeLens]);

  const handleVariationChange = useCallback((id: string) => {
    if (route.slug && route.lens) {
      if (window.scrollY > 200) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate(route.lens!, route.slug!, id), 800);
      } else {
        navigate(route.lens, route.slug, id);
      }
    }
  }, [route.slug, route.lens]);

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

  const handleFirstWipeComplete = useCallback(() => {
    setShowTopBar(true);
  }, []);

  const handleArchetypeSelect = useCallback((slug: string, _rect: DOMRect) => {
    if (!activeLens) return;
    navigate(activeLens, slug, 'slap');
  }, [activeLens]);

  // ── Render ─────────────────────────────────────────────────
  let content: JSX.Element;

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

    content = (
      <>
        <DemoShell
          archetypeName={archetype.name}
          variations={showTopBar ? archetype.variations : undefined}
          activeVariation={showTopBar ? activeVariation : undefined}
          onVariationChange={showTopBar ? handleVariationChange : undefined}
          accent={showTopBar ? archetype.accent : undefined}
          backLens={activeLens}
        >
          <WipeTransition
            activeVariation={activeVariation}
            lensParam={activeLens}
            onVariationChange={handleVariationChange}
            onFirstWipeComplete={handleFirstWipeComplete}
            DemoComponent={DemoComponent}
            wipeDirection="right"
          />
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
          onModeChange={handleModeChange}
          dark={variationDef?.dark}
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
          variationId={activeVariation}
          expertFindings={allExpertFindings}
          reviewBundle={reviewBundle}
          personaFindings={allPersonaFindings}
          kaizenBundle={kaizenBundle}
          onFindingHover={handleFindingHover}
          expertBubbles={expertBubbles}
          personaBubbles={personaBubbles}
          activeBubbleId={soloId}
          onBubbleClick={handleBubbleClick}
        />
      </>
    );
  } else {
    content = (
      <>
        <Homepage lens={activeLens} onArchetypeSelect={handleArchetypeSelect} />
        <div style={HOMEPAGE_CHIN} data-testid="homepage-chin" />
      </>
    );
  }

  return <>{content}</>;
}

const HOMEPAGE_CHIN: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 900,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#FFFFFF',
  borderLeft: '8px solid #FFFFFF',
  borderRight: '8px solid #FFFFFF',
  borderBottom: '8px solid #FFFFFF',
  borderRadius: '0 0 10px 10px',
  boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, 0.06), 0 -1px 0 rgba(0, 0, 0, 0.04)',
  pointerEvents: 'none',
};
