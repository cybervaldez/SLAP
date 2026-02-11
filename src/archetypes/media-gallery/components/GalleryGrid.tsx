import React from 'react';
import type { MediaItem } from '../data';

const ACCENT = '#EC4899';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type ViewMode = 'grid' | 'list';

interface GalleryGridProps {
  items: MediaItem[];
  view: ViewMode;
  onSelect: (item: MediaItem) => void;
  visibleCount: number;
}

function HeartIcon() {
  return (
    <span style={{ color: ACCENT, fontSize: '0.8rem', marginRight: 4 }}>{'\u2665'}</span>
  );
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, view, onSelect, visibleCount }) => {
  const visibleItems = items.slice(0, visibleCount);

  if (view === 'grid') {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
          fontFamily: FONT_FAMILY,
        }}
      >
        {visibleItems.map((item) => (
          <div
            key={item.id}
            data-testid={`gallery-item-${item.id}`}
            onClick={() => onSelect(item)}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              backgroundColor: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-4px)';
              el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
            }}
          >
            {/* Colored placeholder */}
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: item.color,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                position: 'relative',
              }}
            >
              {/* Gradient overlay for title readability */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '12px 14px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {item.title}
              </span>
            </div>

            {/* Meta row */}
            <div
              style={{
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#6B7280',
              }}
            >
              <span
                style={{
                  backgroundColor: '#F3F4F6',
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              >
                {item.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                <HeartIcon />
                {item.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List view
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: FONT_FAMILY }}>
      {visibleItems.map((item) => (
        <div
          key={item.id}
          data-testid={`gallery-item-${item.id}`}
          onClick={() => onSelect(item)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 12,
            borderRadius: 10,
            border: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            el.style.borderColor = ACCENT;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = 'none';
            el.style.borderColor = '#E5E7EB';
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              width: 80,
              height: 60,
              minWidth: 80,
              backgroundColor: item.color,
              borderRadius: 8,
            }}
          />

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#111827',
                marginBottom: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
              {item.category} &middot; {item.width} x {item.height}
            </div>
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: '0.8rem',
              color: '#9CA3AF',
              whiteSpace: 'nowrap',
            }}
          >
            {item.date}
          </div>

          {/* Likes */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#6B7280',
              whiteSpace: 'nowrap',
            }}
          >
            <HeartIcon />
            {item.likes}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
