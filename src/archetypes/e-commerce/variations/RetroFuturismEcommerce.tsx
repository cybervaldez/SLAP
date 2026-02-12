import React, { useReducer, useState } from 'react';
import { products } from '../data';
import type { Product } from '../data';

// ── Design Tokens ── Retro Futurism ("Tomorrow, Today") ─────────────

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const BG = '#0F0B1A';
const SURFACE = '#1A1528';
const BORDER = '#2D2640';
const TEXT = '#C4B5FD';
const WHITE = '#FFFFFF';
const PURPLE = '#8B5CF6';
const GRADIENT = 'linear-gradient(135deg, #14B8A6, #8B5CF6, #EC4899)';
const GLOW = '0 0 20px rgba(139, 92, 246, 0.2)';
const GLOW_INTENSE = '0 0 30px rgba(139, 92, 246, 0.4)';

const categoryPlaceholderColors: Record<string, string> = {
  Electronics: '#1A3A4A',
  Clothing: '#2A1A3A',
  Accessories: '#3A2A1A',
  Home: '#1A3A2A',
};

// ── Cart State ───────────────────────────────────────────────────────

interface CartItem { product: Product; quantity: number; }
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
      if (existing) next.set(action.product.id, { ...existing, quantity: existing.quantity + 1 });
      else next.set(action.product.id, { product: action.product, quantity: 1 });
      return { ...state, items: next, isCartOpen: true };
    }
    case 'UPDATE_QUANTITY': {
      const next = new Map(state.items);
      const existing = next.get(action.productId);
      if (existing && action.quantity > 0) next.set(action.productId, { ...existing, quantity: action.quantity });
      return { ...state, items: next };
    }
    case 'REMOVE_ITEM': {
      const next = new Map(state.items);
      next.delete(action.productId);
      return { ...state, items: next };
    }
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'START_CHECKOUT':
      return { ...state, isCartOpen: false, checkoutStep: 1 };
    case 'COMPLETE_CHECKOUT':
      return { items: new Map(), isCartOpen: false, checkoutStep: null };
    default:
      return state;
  }
}

const initialState: CartState = { items: new Map(), isCartOpen: false, checkoutStep: null };

// ── Styles ───────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: FONT,
    background: BG,
    color: TEXT,
    minHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: `1px solid ${BORDER}`,
    position: 'sticky',
    top: 0,
    zIndex: 30,
    background: BG,
  },
  logo: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: '0.08em',
    fontFamily: FONT,
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  cartBtn: {
    position: 'relative',
    background: 'none',
    border: `1px solid ${BORDER}`,
    borderRadius: 9999,
    padding: '8px 18px',
    cursor: 'pointer',
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 600,
    color: TEXT,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    background: GRADIENT,
    color: WHITE,
    fontSize: 11,
    fontWeight: 700,
    width: 22,
    height: 22,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 20,
    padding: '24px',
  },
  card: {
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    background: SURFACE,
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: FONT,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  cardBody: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  },
  cardName: {
    margin: '0 0 6px 0',
    fontSize: 15,
    fontWeight: 700,
    fontFamily: FONT,
    color: WHITE,
  },
  cardDesc: {
    margin: '0 0 10px 0',
    fontSize: 13,
    color: TEXT,
    lineHeight: 1.5,
    fontFamily: FONT,
    flex: 1,
  },
  stars: {
    color: PURPLE,
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: FONT,
    marginBottom: 12,
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  addBtn: {
    width: '100%',
    padding: '10px 0',
    background: GRADIENT,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    fontFamily: FONT,
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
    boxShadow: '0 0 12px rgba(139, 92, 246, 0.15)',
  },

  // Cart drawer
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 40,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 380,
    maxWidth: '100%',
    backgroundColor: BG,
    color: TEXT,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: FONT,
    transition: 'transform 0.3s ease',
    borderLeft: `1px solid ${BORDER}`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderBottom: `1px solid ${BORDER}`,
  },
  drawerTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    fontFamily: FONT,
    color: WHITE,
  },
  drawerClose: {
    background: 'none',
    border: `1px solid ${BORDER}`,
    color: TEXT,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '6px 12px',
    fontFamily: FONT,
    borderRadius: 9999,
    transition: 'border-color 0.2s ease',
  },
  drawerItems: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 20,
  },
  drawerEmpty: {
    textAlign: 'center' as const,
    color: TEXT,
    fontSize: 14,
    marginTop: 40,
    opacity: 0.6,
  },
  drawerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottom: `1px solid ${BORDER}`,
  },
  drawerItemName: {
    fontSize: 14,
    fontWeight: 700,
    color: WHITE,
    marginBottom: 4,
    fontFamily: FONT,
  },
  drawerItemPrice: {
    fontSize: 15,
    fontWeight: 700,
    fontFamily: FONT,
    marginBottom: 8,
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    border: `1px solid ${PURPLE}`,
    background: 'none',
    color: WHITE,
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: FONT,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
  },
  qtyVal: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: FONT,
    color: WHITE,
    minWidth: 20,
    textAlign: 'center' as const,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#EC4899',
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: FONT,
    fontWeight: 600,
    padding: 0,
  },
  drawerFooter: {
    padding: 20,
    borderTop: `1px solid ${BORDER}`,
  },
  drawerTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: FONT,
    color: WHITE,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: FONT,
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  checkoutBtn: {
    width: '100%',
    padding: '14px 0',
    background: GRADIENT,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: FONT,
    cursor: 'pointer',
    letterSpacing: '0.04em',
    boxShadow: '0 0 16px rgba(139, 92, 246, 0.25)',
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
  },

  // Checkout
  checkoutWrap: {
    maxWidth: 520,
    margin: '0 auto',
    padding: 32,
    fontFamily: FONT,
  },
  stepRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  stepCircle: {
    width: 32,
    height: 32,
    border: `1px solid ${BORDER}`,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    fontFamily: FONT,
    transition: 'all 0.3s ease',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: FONT,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: BORDER,
    marginLeft: 4,
    alignSelf: 'center' as const,
    borderRadius: 9999,
  },
  formTitle: {
    margin: '0 0 20px 0',
    fontSize: 22,
    fontWeight: 700,
    fontFamily: FONT,
    color: WHITE,
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: TEXT,
    marginBottom: 6,
    fontFamily: FONT,
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: FONT,
    color: WHITE,
    outline: 'none',
    boxSizing: 'border-box' as const,
    background: SURFACE,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  orderBox: {
    padding: 16,
    backgroundColor: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    fontSize: 14,
    color: TEXT,
    fontFamily: FONT,
  },
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backBtn: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: TEXT,
    border: `1px solid ${BORDER}`,
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: FONT,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
  },
  nextBtn: {
    padding: '10px 24px',
    background: GRADIENT,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 700,
    fontFamily: FONT,
    cursor: 'pointer',
    boxShadow: '0 0 12px rgba(139, 92, 246, 0.2)',
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
  },
  confirmWrap: {
    textAlign: 'center' as const,
    padding: '32px 0',
  },
  confirmIcon: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    fontSize: 28,
    fontFamily: FONT,
    background: GRADIENT,
    color: WHITE,
    boxShadow: GLOW_INTENSE,
  },
  confirmTitle: {
    margin: '0 0 8px 0',
    fontSize: 24,
    fontWeight: 700,
    fontFamily: FONT,
    color: WHITE,
  },
  confirmText: {
    margin: '0 0 8px 0',
    fontSize: 14,
    color: TEXT,
    fontFamily: FONT,
  },
  confirmTotal: {
    margin: '0 0 24px 0',
    fontSize: 20,
    fontWeight: 700,
    fontFamily: FONT,
    background: GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  continueBtn: {
    padding: '12px 28px',
    background: GRADIENT,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: FONT,
    cursor: 'pointer',
    boxShadow: '0 0 16px rgba(139, 92, 246, 0.25)',
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
  },
};

// ── Component ────────────────────────────────────────────────────────

export default function RetroFuturismEcommerce() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shipping, setShipping] = useState({ name: '', address: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '' });

  const cartItems = Array.from(state.items.values());
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const stepLabels = ['Shipping', 'Payment', 'Confirmation'];

  return (
    <div style={s.page} data-testid="e-commerce-demo">
      {/* Header */}
      <header style={s.header}>
        <h1 style={s.logo}>NEON MARKET</h1>
        <button
          data-testid="cart-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          style={s.cartBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = PURPLE;
            e.currentTarget.style.boxShadow = GLOW;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = BORDER;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Cart
          {itemCount > 0 && (
            <span data-testid="cart-count" style={s.cartBadge}>{itemCount}</span>
          )}
        </button>
      </header>

      {/* Main */}
      <main>
        {state.checkoutStep !== null ? (
          <div data-section="checkout" style={s.checkoutWrap}>
            {/* Step indicators */}
            <div style={s.stepRow}>
              {stepLabels.map((label, i) => {
                const num = i + 1;
                const active = num === checkoutStep;
                const done = num < checkoutStep;
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        ...s.stepCircle,
                        ...(active || done
                          ? { background: GRADIENT, border: 'none', color: WHITE, boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)' }
                          : { backgroundColor: SURFACE, color: TEXT }),
                      }}
                    >
                      {done ? '\u2713' : num}
                    </div>
                    <span
                      style={{
                        ...s.stepLabel,
                        fontWeight: active ? 700 : 400,
                        color: active ? WHITE : TEXT,
                      }}
                    >
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && (
                      <div
                        style={{
                          ...s.stepLine,
                          ...(done
                            ? { background: GRADIENT }
                            : { backgroundColor: BORDER }),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step 1 - Shipping */}
            {checkoutStep === 1 && (
              <div data-testid="checkout-step-1">
                <h3 style={s.formTitle}>Shipping Information</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Full Name</label>
                  <input
                    type="text"
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    placeholder="John Doe"
                    style={s.input}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PURPLE;
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={s.label}>Shipping Address</label>
                  <input
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    placeholder="123 Main St, City, State 12345"
                    style={s.input}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PURPLE;
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 2 - Payment */}
            {checkoutStep === 2 && (
              <div data-testid="checkout-step-2">
                <h3 style={s.formTitle}>Payment Details</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Card Number</label>
                  <input
                    type="text"
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    style={s.input}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PURPLE;
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={s.label}>Expiry Date</label>
                  <input
                    type="text"
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    placeholder="MM/YY"
                    style={s.input}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PURPLE;
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={s.orderBox}>
                  ORDER TOTAL: <strong style={{
                    background: GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>${cartTotal.toFixed(2)}</strong>
                </div>
              </div>
            )}

            {/* Step 3 - Confirmation */}
            {checkoutStep === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}>{'\u2713'}</div>
                <h3 style={s.confirmTitle}>Order Confirmed</h3>
                <p style={s.confirmText}>Your order is being processed.</p>
                <p style={s.confirmTotal}>Total: ${cartTotal.toFixed(2)}</p>
                <button
                  onClick={() => { dispatch({ type: 'COMPLETE_CHECKOUT' }); setCheckoutStep(1); }}
                  style={s.continueBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = GLOW_INTENSE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(139, 92, 246, 0.25)';
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {/* Navigation */}
            {checkoutStep < 3 && (
              <div style={{ ...s.navRow, justifyContent: checkoutStep > 1 ? 'space-between' : 'flex-end' }}>
                {checkoutStep > 1 && (
                  <button
                    data-testid="checkout-back"
                    onClick={() => setCheckoutStep(checkoutStep - 1)}
                    style={s.backBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = PURPLE;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  data-testid="checkout-next"
                  onClick={() => setCheckoutStep(checkoutStep + 1)}
                  style={s.nextBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = GLOW_INTENSE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.2)';
                  }}
                >
                  {checkoutStep === 2 ? 'Place Order' : 'Next'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Product Grid */
          <div data-section="products" style={s.grid}>
            {products.map((product) => (
              <div
                key={product.id}
                data-testid={`product-card-${product.id}`}
                style={s.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = GLOW;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    ...s.cardImage,
                    backgroundColor: categoryPlaceholderColors[product.category] || SURFACE,
                  }}
                >
                  {product.category}
                </div>
                <div style={s.cardBody}>
                  <h3 style={s.cardName}>{product.name}</h3>
                  <p style={s.cardDesc}>{product.description}</p>
                  <div style={s.stars}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < product.rating ? '\u2605' : '\u2606'}</span>
                    ))}
                  </div>
                  <div style={s.cardPrice}>${product.price.toFixed(2)}</div>
                  <button
                    data-testid={`add-to-cart-${product.id}`}
                    onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
                    style={s.addBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = GLOW_INTENSE;
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.15)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {state.isCartOpen && (
        <div style={s.backdrop} onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      )}
      <div
        data-testid="cart-drawer"
        data-section="cart"
        style={{
          ...s.drawer,
          transform: state.isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div style={s.drawerHeader}>
          <h2 style={s.drawerTitle}>Cart ({cartItems.length})</h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            style={s.drawerClose}
            aria-label="Close cart"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = PURPLE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER;
            }}
          >
            {'\u2715'}
          </button>
        </div>
        <div style={s.drawerItems}>
          {cartItems.length === 0 ? (
            <p style={s.drawerEmpty}>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                data-testid={`cart-item-${item.product.id}`}
                style={s.drawerItem}
              >
                <div>
                  <div style={s.drawerItemName}>{item.product.name}</div>
                  <div style={s.drawerItemPrice}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <div style={s.qtyRow}>
                    <button
                      style={s.qtyBtn}
                      onClick={() => {
                        if (item.quantity > 1)
                          dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity - 1 });
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${PURPLE}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      -
                    </button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button
                      style={s.qtyBtn}
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${PURPLE}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  data-testid={`remove-item-${item.product.id}`}
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.product.id })}
                  style={s.removeBtn}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div style={s.drawerFooter}>
            <div style={s.drawerTotal}>
              <span style={s.totalLabel}>Total</span>
              <span data-testid="cart-total" style={s.totalValue}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              data-testid="checkout-btn"
              onClick={() => dispatch({ type: 'START_CHECKOUT' })}
              style={s.checkoutBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = GLOW_INTENSE;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 16px rgba(139, 92, 246, 0.25)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
