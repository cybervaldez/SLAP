import React from 'react';
import type { Product } from '../data';
import QuantityControl from './QuantityControl';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#EF4444';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 40,
          }}
        />
      )}

      {/* Drawer */}
      <div
        data-testid="cart-drawer"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          maxWidth: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: FONT_FAMILY,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 20px 16px 20px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: '#111827',
              fontFamily: FONT_FAMILY,
            }}
          >
            Shopping Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 22,
              color: '#6B7280',
              cursor: 'pointer',
              padding: '4px 8px',
              lineHeight: 1,
              fontFamily: FONT_FAMILY,
            }}
            aria-label="Close cart"
          >
            {'\u00d7'}
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {items.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                color: '#9CA3AF',
                fontSize: 14,
                marginTop: 40,
                fontFamily: FONT_FAMILY,
              }}
            >
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                data-testid={`cart-item-${item.product.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  paddingBottom: 16,
                  marginBottom: 16,
                  borderBottom: '1px solid #F3F4F6',
                }}
              >
                {/* Item info */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: 4,
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    {item.product.name}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: ACCENT,
                      marginBottom: 8,
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <QuantityControl
                    id={item.product.id}
                    quantity={item.quantity}
                    onIncrement={() => onUpdateQty(item.product.id, item.quantity + 1)}
                    onDecrement={() => {
                      if (item.quantity > 1) {
                        onUpdateQty(item.product.id, item.quantity - 1);
                      }
                    }}
                  />
                </div>

                {/* Remove button */}
                <button
                  data-testid={`remove-item-${item.product.id}`}
                  onClick={() => onRemove(item.product.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    fontSize: 12,
                    cursor: 'pointer',
                    padding: '4px',
                    fontFamily: FONT_FAMILY,
                    textDecoration: 'underline',
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: 20,
              borderTop: '1px solid #E5E7EB',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#374151',
                  fontFamily: FONT_FAMILY,
                }}
              >
                Total
              </span>
              <span
                data-testid="cart-total"
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: FONT_FAMILY,
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              data-testid="checkout-btn"
              onClick={onCheckout}
              style={{
                width: '100%',
                padding: '12px 0',
                backgroundColor: ACCENT,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
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
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
