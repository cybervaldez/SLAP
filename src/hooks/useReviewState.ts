/**
 * Review overlay state management — replaces 7+ individual useStates.
 *
 * Manages the 3-tier review system:
 *   Tier 1: Bubble Rail (always visible)
 *   Tier 2: Popover (on bubble click)
 *   Tier 3: Review Panel (on "VIEW FULL REVIEW")
 */

import { useState, useCallback, useMemo } from 'react';

export interface HighlightInfo {
  section: string;
  text?: string;
  color?: string;
}

interface ReviewState {
  mode: 'review' | 'kaizen';
  popoverId: string | null;
  panelId: string | null;
  bubbleRect: DOMRect | null;
  highlightInfo: HighlightInfo | null;
}

const INITIAL_STATE: ReviewState = {
  mode: 'review',
  popoverId: null,
  panelId: null,
  bubbleRect: null,
  highlightInfo: null,
};

export function useReviewState() {
  const [state, setState] = useState<ReviewState>(INITIAL_STATE);

  const isOverlayActive = state.popoverId !== null || state.panelId !== null;
  const activeBubbleId = state.panelId || state.popoverId;

  const setMode = useCallback((mode: 'review' | 'kaizen') => {
    setState({
      ...INITIAL_STATE,
      mode,
    });
  }, []);

  const toggleBubble = useCallback((id: string, rect: DOMRect) => {
    setState(prev => {
      if (id === prev.popoverId) {
        // Toggle off
        return { ...prev, popoverId: null, bubbleRect: null, highlightInfo: null };
      }
      // Open new bubble
      return { ...prev, popoverId: id, panelId: null, bubbleRect: rect, highlightInfo: null };
    });
  }, []);

  const openPanel = useCallback(() => {
    setState(prev => ({
      ...prev,
      panelId: prev.popoverId,
      popoverId: null,
      bubbleRect: null,
    }));
  }, []);

  const closePanel = useCallback(() => {
    setState(prev => ({
      ...prev,
      panelId: null,
      highlightInfo: null,
    }));
  }, []);

  const closeAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      popoverId: null,
      panelId: null,
      bubbleRect: null,
      highlightInfo: null,
    }));
  }, []);

  const setHighlight = useCallback((info: HighlightInfo | null) => {
    setState(prev => ({ ...prev, highlightInfo: info }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const popoverAnchor = useMemo(() => ({
    top: state.bubbleRect?.top ?? 0,
    right: state.bubbleRect
      ? (typeof window !== 'undefined' ? window.innerWidth - state.bubbleRect.left + 8 : 0)
      : 0,
  }), [state.bubbleRect]);

  return {
    // State
    mode: state.mode,
    popoverId: state.popoverId,
    panelId: state.panelId,
    highlightInfo: state.highlightInfo,
    isOverlayActive,
    activeBubbleId,
    popoverAnchor,

    // Actions
    setMode,
    toggleBubble,
    openPanel,
    closePanel,
    closeAll,
    setHighlight,
    reset,
  };
}
