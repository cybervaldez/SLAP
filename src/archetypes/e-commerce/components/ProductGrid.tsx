import React from 'react';
import type { Product } from '../data';
import { categoryColors } from '../data';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#EF4444';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#FBBF24', fontSize: 14, letterSpacing: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? '\u2605' : '\u2606'}</span>
      ))}
    </span>
  );
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 24,
        padding: '24px 0',
        fontFamily: FONT_FAMILY,
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          data-testid={`product-card-${product.id}`}
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {/* Colored placeholder image */}
          <div
            style={{
              width: '100%',
              height: 180,
              backgroundColor: categoryColors[product.category] || '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT_FAMILY,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {product.category}
          </div>

          {/* Card body */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3
              style={{
                margin: '0 0 4px 0',
                fontSize: 16,
                fontWeight: 600,
                color: '#111827',
                fontFamily: FONT_FAMILY,
              }}
            >
              {product.name}
            </h3>

            <p
              style={{
                margin: '0 0 8px 0',
                fontSize: 13,
                color: '#6B7280',
                lineHeight: 1.4,
                fontFamily: FONT_FAMILY,
                flex: 1,
              }}
            >
              {product.description}
            </p>

            <StarRating rating={product.rating} />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: FONT_FAMILY,
                }}
              >
                ${product.price.toFixed(2)}
              </span>

              <button
                data-testid={`add-to-cart-${product.id}`}
                onClick={() => onAddToCart(product)}
                style={{
                  backgroundColor: ACCENT,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: FONT_FAMILY,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#DC2626';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT;
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
