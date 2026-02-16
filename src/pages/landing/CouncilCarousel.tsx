import React, { useState, useEffect, useRef, useCallback } from 'react';
import { allReviewers, experts, personas } from '../../data/reviewers';
import type { Reviewer } from '../../data/reviewers';
import { demoFindings } from './demoFindings';
import CarouselCard from './CarouselCard';
import LivePreview from './LivePreview';
import CouncilBar from './CouncilBar';
import { navigate } from '../../router';

const BG_DEEP = '#0D0D1A';
const BG_MID = '#222240';
const TEXT_MUTED = 'rgba(245, 240, 225, 0.5)';
const ACCENT_GOLD = '#FFD000';
const EASE_ENTER = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const EASE_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const CATEGORIES = [
  'All',
  'Experts',
  'Accessibility',
  'Tech Spectrum',
  'Role-Based',
  'Emotional',
  'Context',
  'Cultural Taste',
];

// Map filter tab labels to actual reviewer category values
const CATEGORY_MAP: Record<string, string | null> = {
  'All': null,
  'Experts': 'expert',
  'Accessibility': 'accessibility',
  'Tech Spectrum': 'tech-spectrum',
  'Role-Based': 'role-based',
  'Emotional': 'emotional-state',
  'Context': 'context',
  'Cultural Taste': 'cultural-taste',
};

const KEYFRAMES = `
@keyframes diceTumble {
  0% { transform: rotate(0) scale(1); }
  25% { transform: rotate(90deg) scale(1.3); }
  50% { transform: rotate(180deg) scale(0.8); }
  75% { transform: rotate(270deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes tabEnter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const st: Record<string, React.CSSProperties> = {
  section: {
    background: BG_DEEP,
    minHeight: '100vh',
    padding: '3rem 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  title: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: TEXT_MUTED,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.45rem',
    color: TEXT_MUTED,
    marginBottom: '1.5rem',
  },
  diceBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    marginBottom: '1.5rem',
    transition: `all 150ms ${EASE_BOUNCE}`,
    lineHeight: 1,
  },
  diceIcon: {
    display: 'inline-block',
    fontSize: '3rem',
    transition: 'filter 150ms',
    opacity: 0.5,
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.4rem',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    width: '100%',
    maxWidth: 600,
  },
  tab: {
    fontFamily: "'Courier New', monospace",
    fontSize: '0.42rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: TEXT_MUTED,
    background: 'none',
    border: 'none',
    padding: '0.35rem 0.7rem',
    cursor: 'pointer',
    position: 'relative' as const,
    transition: `color 150ms ${EASE_ENTER}`,
    opacity: 0,
    transform: 'translateY(8px)',
  },
  tabEntered: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: `opacity 300ms ${EASE_ENTER}, transform 300ms ${EASE_ENTER}, color 150ms`,
  },
  tabActive: {
    color: ACCENT_GOLD,
  },
  tabUnderline: {
    content: '',
    position: 'absolute' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%) scaleX(0)',
    width: '80%',
    height: 2,
    background: ACCENT_GOLD,
    transition: `transform 150ms ${EASE_ENTER}`,
  },
  tabUnderlineActive: {
    transform: 'translateX(-50%) scaleX(1)',
  },
  stageWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 560,
    marginBottom: '0.75rem',
  },
  arrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: '1.2rem',
    fontWeight: 700,
    color: TEXT_MUTED,
    background: BG_MID,
    border: '1px solid rgba(245, 240, 225, 0.1)',
    borderRadius: '50%',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: `all 150ms ${EASE_BOUNCE}`,
    userSelect: 'none' as const,
  },
  stage: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: 500,
    minHeight: 280,
    margin: '0 0.75rem',
    perspective: 800,
    overflow: 'visible',
  },
  counter: {
    fontSize: '0.45rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: TEXT_MUTED,
    marginBottom: '0.5rem',
  },
  dotStrip: {
    display: 'flex',
    gap: 4,
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    maxWidth: 500,
    marginBottom: '1rem',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: BG_MID,
    border: '1px solid rgba(245, 240, 225, 0.1)',
    transition: `all 150ms ${EASE_ENTER}`,
    cursor: 'pointer',
  },
  dotCurrent: {
    background: TEXT_MUTED,
    borderColor: TEXT_MUTED,
    transform: 'scale(1.3)',
  },
  dotInCouncil: {
    background: ACCENT_GOLD,
    borderColor: ACCENT_GOLD,
    boxShadow: '0 0 6px rgba(255, 208, 0, 0.3)',
  },
};

export default function CouncilCarousel() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentFilter, setCurrentFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [enterDirection, setEnterDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);
  const [diceRolling, setDiceRolling] = useState(false);
  const [tabsEntered, setTabsEntered] = useState(false);
  const [pulsingId, setPulsingId] = useState<string | null>(null);
  const [hasRolled, setHasRolled] = useState(false);
  const hasAutoRolled = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get filtered list
  const getFilteredReviewers = useCallback((): Reviewer[] => {
    const catKey = CATEGORY_MAP[currentFilter];
    if (catKey === null) return allReviewers;
    return allReviewers.filter(r => r.category === catKey);
  }, [currentFilter]);

  const filtered = getFilteredReviewers();
  const clampedIndex = filtered.length > 0 ? Math.min(currentIndex, filtered.length - 1) : 0;
  const currentReviewer = filtered[clampedIndex] || null;

  // Navigate carousel
  const navigateCarousel = useCallback((dir: number) => {
    if (isTransitioning) return;
    const list = getFilteredReviewers();
    if (list.length === 0) return;

    setIsTransitioning(true);
    const slideDir = dir > 0 ? 'right' : 'left';
    setEnterDirection(slideDir);

    let newIndex = clampedIndex + dir;
    if (newIndex < 0) newIndex = list.length - 1;
    if (newIndex >= list.length) newIndex = 0;

    // Small delay for exit animation, then enter
    setTimeout(() => {
      setCurrentIndex(newIndex);
      // Allow enter animation to start, then clear direction
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnterDirection(null);
          setIsTransitioning(false);
        });
      });
    }, 50);
  }, [isTransitioning, getFilteredReviewers, clampedIndex]);

  // Jump to specific dot
  const jumpToIndex = useCallback((i: number) => {
    if (isTransitioning) return;
    const dir = i > clampedIndex ? 'right' : 'left';
    setIsTransitioning(true);
    setEnterDirection(dir as 'left' | 'right');
    setTimeout(() => {
      setCurrentIndex(i);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnterDirection(null);
          setIsTransitioning(false);
        });
      });
    }, 50);
  }, [isTransitioning, clampedIndex]);

  // Toggle reviewer selection
  const toggleReviewer = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setPulsingId(id);
        setTimeout(() => setPulsingId(null), 500);
      }
      return next;
    });
  }, []);

  // Roll dice
  const rollDice = useCallback(() => {
    setDiceRolling(true);

    const shuffledExperts = [...experts].sort(() => Math.random() - 0.5);
    const expertCount = Math.random() > 0.5 ? 3 : 2;
    const pickedExperts = shuffledExperts.slice(0, expertCount);

    const categories = ['accessibility', 'tech-spectrum', 'role-based', 'emotional-state', 'context', 'cultural-taste'];
    const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
    const personaCount = expertCount === 2 ? 4 : 3;
    const pickedPersonas: Reviewer[] = [];
    for (let j = 0; j < personaCount && j < shuffledCats.length; j++) {
      const catPersonas = personas.filter(p => p.category === shuffledCats[j]);
      if (catPersonas.length > 0) {
        pickedPersonas.push(catPersonas[Math.floor(Math.random() * catPersonas.length)]);
      }
    }

    const newSelected = new Set<string>();
    pickedExperts.forEach(e => newSelected.add(e.id));
    pickedPersonas.forEach(p => newSelected.add(p.id));

    // Wait for the dice tumble animation to finish, then reveal results
    setTimeout(() => {
      setDiceRolling(false);
      setSelectedIds(newSelected);

      // Reset filter & navigate to a selected reviewer
      setCurrentFilter('All');
      const allList = allReviewers;
      const firstSelectedIdx = allList.findIndex(r => newSelected.has(r.id));
      setCurrentIndex(firstSelectedIdx >= 0 ? firstSelectedIdx : 0);
      setEnterDirection(Math.random() > 0.5 ? 'up' : 'down');
      setHasRolled(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnterDirection(null);
        });
      });
    }, 600);
  }, []);

  // Keep & continue
  const handleKeep = useCallback(() => {
    if (selectedIds.size > 0) {
      localStorage.setItem('slap-default-council', JSON.stringify(Array.from(selectedIds)));
    }
    navigate('gallery');
  }, [selectedIds]);

  // Tab filter change
  const handleTabChange = useCallback((cat: string) => {
    setCurrentFilter(cat);
    setCurrentIndex(0);
    setEnterDirection('right');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setEnterDirection(null);
      });
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateCarousel(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateCarousel(1);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [navigateCarousel]);

  // Auto-roll on first scroll into viewport
  useEffect(() => {
    function checkEntry() {
      if (hasAutoRolled.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        hasAutoRolled.current = true;
        // Stagger tab entrance
        setTabsEntered(true);
        // After tabs appear, roll dice
        setTimeout(() => {
          rollDice();
        }, CATEGORIES.length * 60 + 200);
      }
    }
    checkEntry();
    window.addEventListener('scroll', checkEntry);
    return () => window.removeEventListener('scroll', checkEntry);
  }, [rollDice]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section
        ref={sectionRef}
        id="council"
        data-section="council"
        data-testid="council-section"
        style={st.section}
      >
        <p style={st.title}>Pick your hands.</p>
        <p style={st.subtitle}>Browse your reviewers. One at a time.</p>

        {/* Dice button */}
        <button
          style={st.diceBtn}
          data-testid="dice-roll"
          onClick={rollDice}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.12)';
            const icon = e.currentTarget.querySelector('span');
            if (icon) {
              (icon as HTMLElement).style.filter = 'drop-shadow(0 0 12px rgba(255,208,0,0.5))';
              (icon as HTMLElement).style.opacity = '1';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            const icon = e.currentTarget.querySelector('span');
            if (icon) {
              (icon as HTMLElement).style.filter = '';
              (icon as HTMLElement).style.opacity = '0.5';
            }
          }}
        >
          <span
            style={{
              ...st.diceIcon,
              ...(diceRolling ? { animation: `diceTumble 600ms ${EASE_BOUNCE}` } : {}),
            }}
          >
            {'\u{1F3B2}'}
          </span>
        </button>

        {/* Category filter tabs */}
        <div style={st.tabs} data-testid="filter-tabs">
          {CATEGORIES.map((cat, i) => {
            const isActive = cat === currentFilter;
            return (
              <button
                key={cat}
                style={{
                  ...st.tab,
                  ...(tabsEntered ? {
                    ...st.tabEntered,
                    transitionDelay: `${i * 60}ms`,
                    animation: `tabEnter 300ms ${EASE_ENTER} ${i * 60}ms forwards`,
                  } : {}),
                  ...(isActive ? st.tabActive : {}),
                }}
                onClick={() => handleTabChange(cat)}
                data-testid={`tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat.toUpperCase()}
                <span
                  style={{
                    ...st.tabUnderline,
                    ...(isActive ? st.tabUnderlineActive : {}),
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Carousel stage with arrows */}
        <div style={st.stageWrapper}>
          <button
            style={st.arrow}
            data-testid="arrow-left"
            onClick={() => navigateCarousel(-1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT_GOLD;
              e.currentTarget.style.borderColor = ACCENT_GOLD;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = TEXT_MUTED;
              e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.1)';
              e.currentTarget.style.transform = '';
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          >
            {'\u25C4'}
          </button>

          <div style={st.stage} data-testid="carousel-stage">
            {!hasRolled ? (
              <div style={{ color: TEXT_MUTED, fontSize: '0.5rem', textAlign: 'center', padding: '3rem', letterSpacing: '0.1em' }}>
                {diceRolling ? 'Rolling...' : 'Roll the dice to assemble your council.'}
              </div>
            ) : currentReviewer ? (
              <CarouselCard
                key={currentReviewer.id}
                reviewer={currentReviewer}
                finding={demoFindings[currentReviewer.id]}
                isSelected={selectedIds.has(currentReviewer.id)}
                isExpert={currentReviewer.type === 'expert'}
                onToggle={toggleReviewer}
                enterDirection={enterDirection}
                isPulsing={pulsingId === currentReviewer.id}
              />
            ) : (
              <div style={{ color: TEXT_MUTED, fontSize: '0.5rem', textAlign: 'center', padding: '3rem' }}>
                No reviewers in this category.
              </div>
            )}
          </div>

          <button
            style={st.arrow}
            data-testid="arrow-right"
            onClick={() => navigateCarousel(1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT_GOLD;
              e.currentTarget.style.borderColor = ACCENT_GOLD;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = TEXT_MUTED;
              e.currentTarget.style.borderColor = 'rgba(245, 240, 225, 0.1)';
              e.currentTarget.style.transform = '';
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          >
            {'\u25BA'}
          </button>
        </div>

        {/* Counter */}
        <div style={st.counter} data-testid="carousel-counter">
          {hasRolled && filtered.length > 0 ? `${clampedIndex + 1} / ${filtered.length}` : ''}
        </div>

        {/* Dot strip */}
        <div style={st.dotStrip} data-testid="dot-strip">
          {hasRolled && filtered.map((r, i) => {
            const isCurrent = i === clampedIndex;
            const inCouncil = selectedIds.has(r.id);
            return (
              <div
                key={r.id}
                style={{
                  ...st.dot,
                  ...(isCurrent ? st.dotCurrent : {}),
                  ...(inCouncil ? st.dotInCouncil : {}),
                }}
                title={r.name}
                onClick={() => jumpToIndex(i)}
                data-testid={`dot-${r.id}`}
              />
            );
          })}
        </div>

        {/* Live Preview */}
        <LivePreview selectedIds={selectedIds} findings={demoFindings} />

        {/* Council Bar */}
        <CouncilBar
          selectedIds={selectedIds}
          onReroll={rollDice}
          onKeep={handleKeep}
        />
      </section>
    </>
  );
}
