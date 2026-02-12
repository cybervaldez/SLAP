import { useReducer, useCallback } from 'react';
import { products } from '../data';
import type { Product } from '../data';
import ProductGrid from '../components/ProductGrid';
import CartDrawer from '../components/CartDrawer';
import type { CartItem } from '../components/CartDrawer';
import CheckoutFlow from '../components/CheckoutFlow';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#EF4444';

// ── State & Actions ──────────────────────────────────────────────────

interface CartState {
  items: Map<string, CartItem>;
  isCartOpen: boolean;
  checkoutStep: null | 1 | 2 | 3;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'TOGGLE_CART' }
  | { type: 'START_CHECKOUT' }
  | { type: 'COMPLETE_CHECKOUT' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const next = new Map(state.items);
      const existing = next.get(action.product.id);
      if (existing) {
        next.set(action.product.id, { ...existing, quantity: existing.quantity + 1 });
      } else {
        next.set(action.product.id, { product: action.product, quantity: 1 });
      }
      return { ...state, items: next, isCartOpen: true };
    }
    case 'UPDATE_QUANTITY': {
      const next = new Map(state.items);
      const existing = next.get(action.productId);
      if (existing && action.quantity > 0) {
        next.set(action.productId, { ...existing, quantity: action.quantity });
      }
      return { ...state, items: next };
    }
    case 'REMOVE_ITEM': {
      const next = new Map(state.items);
      next.delete(action.productId);
      return { ...state, items: next };
    }
    case 'TOGGLE_CART': {
      return { ...state, isCartOpen: !state.isCartOpen };
    }
    case 'START_CHECKOUT': {
      return { ...state, isCartOpen: false, checkoutStep: 1 };
    }
    case 'COMPLETE_CHECKOUT': {
      return {
        items: new Map(),
        isCartOpen: false,
        checkoutStep: null,
      };
    }
    default:
      return state;
  }
}

const initialState: CartState = {
  items: new Map(),
  isCartOpen: false,
  checkoutStep: null,
};

// ── Component ────────────────────────────────────────────────────────

export default function SlapEcommerce() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartItems = Array.from(state.items.values());
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleAddToCart = useCallback(
    (product: Product) => dispatch({ type: 'ADD_TO_CART', product }),
    [],
  );

  const handleUpdateQty = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    [],
  );

  const handleRemove = useCallback(
    (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId }),
    [],
  );

  const handleCheckout = useCallback(
    () => dispatch({ type: 'START_CHECKOUT' }),
    [],
  );

  const handleComplete = useCallback(
    () => dispatch({ type: 'COMPLETE_CHECKOUT' }),
    [],
  );

  const handleToggleCart = useCallback(
    () => dispatch({ type: 'TOGGLE_CART' }),
    [],
  );

  return (
    <div
      data-testid="e-commerce-demo"
      style={{
        position: 'relative',
        minHeight: '100%',
        backgroundColor: '#F9FAFB',
        fontFamily: FONT_FAMILY,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 800,
            color: '#111827',
            fontFamily: FONT_FAMILY,
          }}
        >
          <span style={{ color: ACCENT }}>SLAP</span> Store
        </h1>

        <button
          data-testid="cart-toggle"
          onClick={handleToggleCart}
          style={{
            position: 'relative',
            background: 'none',
            border: '1px solid #E5E7EB',
            borderRadius: 8,
            padding: '8px 12px',
            cursor: 'pointer',
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Cart icon (unicode shopping cart) */}
          <span role="img" aria-label="cart">
            &#128722;
          </span>
          {itemCount > 0 && (
            <span
              data-testid="cart-count"
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                backgroundColor: ACCENT,
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 700,
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT_FAMILY,
              }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </header>

      {/* Main content */}
      <main style={{ padding: '0 24px 32px 24px' }}>
        {state.checkoutStep !== null ? (
          <div data-section="checkout"><CheckoutFlow cartTotal={cartTotal} onComplete={handleComplete} /></div>
        ) : (
          <div data-section="products"><ProductGrid products={products} onAddToCart={handleAddToCart} /></div>
        )}
      </main>

      {/* Cart drawer */}
      <div data-section="cart">
        <CartDrawer
          isOpen={state.isCartOpen}
          items={cartItems}
          onClose={handleToggleCart}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
