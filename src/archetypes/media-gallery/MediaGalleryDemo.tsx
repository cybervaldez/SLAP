import { useState, useMemo, useCallback } from 'react';
import type { ArchetypeDemoProps } from '../../types';
import { mediaItems } from './data';
import type { MediaItem } from './data';
import ViewToggle from './components/ViewToggle';
import FilterSort from './components/FilterSort';
import GalleryGrid from './components/GalleryGrid';
import Lightbox from './components/Lightbox';

const ACCENT = '#EC4899';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const INITIAL_VISIBLE = 6;

type ViewMode = 'grid' | 'list';

function sortItems(items: MediaItem[], sortBy: string): MediaItem[] {
  const sorted = [...items];
  switch (sortBy) {
    case 'Newest':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'Oldest':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case 'Most Liked':
      return sorted.sort((a, b) => b.likes - a.likes);
    case 'Title A-Z':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export default function MediaGalleryDemo(_props: ArchetypeDemoProps) {
  const [view, setView] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredItems = useMemo(() => {
    const filtered =
      activeCategory === 'All'
        ? mediaItems
        : mediaItems.filter((item) => item.category === activeCategory);
    return sortItems(filtered, sortBy);
  }, [activeCategory, sortBy]);

  const selectedItem = useMemo(
    () => (selectedItemId ? filteredItems.find((i) => i.id === selectedItemId) ?? null : null),
    [selectedItemId, filteredItems]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const handleSelect = useCallback((item: MediaItem) => {
    setSelectedItemId(item.id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (!selectedItemId) return;
    const idx = filteredItems.findIndex((i) => i.id === selectedItemId);
    if (idx > 0) {
      setSelectedItemId(filteredItems[idx - 1].id);
    } else {
      // wrap to end
      setSelectedItemId(filteredItems[filteredItems.length - 1].id);
    }
  }, [selectedItemId, filteredItems]);

  const handleNext = useCallback(() => {
    if (!selectedItemId) return;
    const idx = filteredItems.findIndex((i) => i.id === selectedItemId);
    if (idx < filteredItems.length - 1) {
      setSelectedItemId(filteredItems[idx + 1].id);
    } else {
      // wrap to beginning
      setSelectedItemId(filteredItems[0].id);
    }
  }, [selectedItemId, filteredItems]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(filteredItems.length);
  }, [filteredItems.length]);

  const hasMore = visibleCount < filteredItems.length;

  return (
    <div
      data-testid="media-gallery-demo"
      style={{
        fontFamily: FONT_FAMILY,
        maxWidth: 1100,
        margin: '0 auto',
        padding: '2rem 1.5rem 3rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Media Gallery
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#6B7280',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Browse, filter, and explore the collection
        </p>
      </div>

      {/* Controls row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: '1.5rem',
        }}
      >
        <FilterSort
          activeCategory={activeCategory}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        <ViewToggle currentView={view} onViewChange={setView} />
      </div>

      {/* Item count */}
      <div
        style={{
          fontSize: '0.85rem',
          color: '#9CA3AF',
          marginBottom: '1rem',
          fontWeight: 500,
        }}
      >
        Showing {Math.min(visibleCount, filteredItems.length)} of {filteredItems.length} items
      </div>

      {/* Gallery */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            color: '#9CA3AF',
            fontSize: '1rem',
          }}
        >
          No items found in this category.
        </div>
      ) : (
        <>
          <GalleryGrid
            items={filteredItems}
            view={view}
            onSelect={handleSelect}
            visibleCount={visibleCount}
          />

          {/* Load More */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                data-testid="load-more"
                onClick={handleLoadMore}
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '12px 32px',
                  border: `2px solid ${ACCENT}`,
                  borderRadius: 8,
                  backgroundColor: 'transparent',
                  color: ACCENT,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = ACCENT;
                  btn.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = 'transparent';
                  btn.style.color = ACCENT;
                }}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
