import React, { useReducer, useState } from 'react';
import { products } from '../data';
import type { Product } from '../data';

// ── Design Tokens – Maximalist ("More is More") ─────────────────────

const NAVY = '#1B1F3B';
const CARD_BG = '#252A4A';
const CORAL = '#FF6B6B';
const GOLD = '#D4A574';
const WHITE = '#FFFFFF';
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const SHADOW = '8px 8px 0 rgba(0,0,0,0.3)';

const imagePlaceholderColors: Record<string, string> = {
  Electronics: '#4A6CF7',
  Clothing: '#A855F7',
  Accessories: '#F59E0B',
  Home: '#10B981',
};

const categoryBadgeColors: Record<string, string> = {
  Electronics: '#4A6CF7',
  Clothing: '#A855F7',
  Accessories: '#F59E0B',
  Home: '#10B981',
};

// ── Cart State ──────────────────────────────────────────────────────

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

// ── Styles ──────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  /* Page */
  page: {
    fontFamily: SANS,
    background: NAVY,
    color: WHITE,
    minHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 32px',
    borderBottom: `3px solid ${GOLD}`,
    position: 'sticky',
    top: 0,
    zIndex: 30,
    background: NAVY,
  },
  logo: {
    margin: 0,
    fontSize: 28,
    fontWeight: 900,
    fontFamily: SERIF,
    color: GOLD,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  },
  cartBtn: {
    position: 'relative',
    background: CORAL,
    border: 'none',
    borderRadius: 12,
    padding: '12px 22px',
    cursor: 'pointer',
    fontFamily: SANS,
    fontSize: 15,
    fontWeight: 700,
    color: WHITE,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    boxShadow: '4px 4px 0 rgba(0,0,0,0.25)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  cartBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: GOLD,
    color: NAVY,
    fontSize: 12,
    fontWeight: 800,
    width: 24,
    height: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: SANS,
    boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
  },

  /* Product Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 28,
    padding: '32px 32px 48px 32px',
  },

  /* Product Card */
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: SHADOW,
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardImage: {
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: WHITE,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: SERIF,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
    color: WHITE,
    fontFamily: SANS,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  },
  cardBody: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  },
  cardName: {
    margin: '0 0 6px 0',
    fontSize: 18,
    fontWeight: 800,
    fontFamily: SERIF,
    color: WHITE,
    letterSpacing: '0.01em',
  },
  cardDesc: {
    margin: '0 0 12px 0',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6,
    fontFamily: SANS,
    flex: 1,
  },
  stars: {
    color: GOLD,
    fontSize: 16,
    letterSpacing: 3,
    marginBottom: 8,
    fontFamily: SERIF,
  },
  cardPrice: {
    fontSize: 26,
    fontWeight: 800,
    fontFamily: SERIF,
    color: GOLD,
    marginBottom: 14,
  },
  addBtn: {
    width: '100%',
    padding: '12px 0',
    background: CORAL,
    color: WHITE,
    border: 'none',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '0.06em',
    cursor: 'pointer',
    fontFamily: SANS,
    boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },

  /* Backdrop */
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 40,
  },

  /* Cart Drawer */
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 400,
    maxWidth: '100%',
    backgroundColor: NAVY,
    color: WHITE,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: SANS,
    transition: 'transform 0.25s ease',
    borderLeft: `3px solid ${GOLD}`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '22px 24px',
    borderBottom: `2px solid ${GOLD}`,
  },
  drawerTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    fontFamily: SERIF,
    color: GOLD,
    letterSpacing: '0.02em',
  },
  drawerClose: {
    background: 'none',
    border: `2px solid ${CORAL}`,
    color: CORAL,
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    padding: '6px 12px',
    fontFamily: SANS,
    borderRadius: 8,
    transition: 'background 0.15s ease',
  },
  drawerItems: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 24,
  },
  drawerEmpty: {
    textAlign: 'center' as const,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
    marginTop: 48,
    fontFamily: SERIF,
    fontStyle: 'italic',
  },
  drawerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 18,
    marginBottom: 18,
    borderBottom: `1px solid rgba(212,165,116,0.25)`,
  },
  drawerItemName: {
    fontSize: 15,
    fontWeight: 700,
    color: WHITE,
    marginBottom: 4,
    fontFamily: SERIF,
  },
  drawerItemPrice: {
    fontSize: 17,
    fontWeight: 800,
    color: CORAL,
    fontFamily: SERIF,
    marginBottom: 10,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    border: `2px solid ${GOLD}`,
    background: 'none',
    color: GOLD,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: SANS,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s ease',
  },
  qtyVal: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: SANS,
    color: WHITE,
    minWidth: 22,
    textAlign: 'center' as const,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: CORAL,
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: SANS,
    fontWeight: 700,
    letterSpacing: '0.04em',
    padding: 0,
    textDecoration: 'underline',
  },
  drawerFooter: {
    padding: 24,
    borderTop: `2px solid ${GOLD}`,
  },
  drawerTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 800,
    fontFamily: SERIF,
    color: GOLD,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: 800,
    fontFamily: SERIF,
    color: CORAL,
  },
  checkoutBtn: {
    width: '100%',
    padding: '16px 0',
    backgroundColor: CORAL,
    color: WHITE,
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.08em',
    boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },

  /* Checkout */
  checkoutWrap: {
    maxWidth: 560,
    margin: '0 auto',
    padding: '40px 32px',
    fontFamily: SANS,
  },
  stepRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 40,
  },
  stepCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 800,
    fontFamily: SERIF,
    transition: 'background 0.2s ease',
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: 700,
    fontFamily: SANS,
    letterSpacing: '0.04em',
  },
  stepLine: {
    width: 44,
    height: 3,
    borderRadius: 2,
    marginLeft: 4,
    alignSelf: 'center' as const,
    transition: 'background 0.2s ease',
  },
  formTitle: {
    margin: '0 0 24px 0',
    fontSize: 26,
    fontWeight: 800,
    fontFamily: SERIF,
    color: GOLD,
    letterSpacing: '0.02em',
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 700,
    color: GOLD,
    marginBottom: 8,
    fontFamily: SANS,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: `2px solid rgba(212,165,116,0.3)`,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: SANS,
    color: WHITE,
    outline: 'none',
    boxSizing: 'border-box' as const,
    background: CARD_BG,
    transition: 'border-color 0.2s ease',
  },
  orderBox: {
    padding: 18,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    border: `2px solid ${GOLD}`,
    fontSize: 15,
    color: WHITE,
    fontFamily: SERIF,
    boxShadow: SHADOW,
  },
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  backBtn: {
    padding: '12px 28px',
    backgroundColor: 'transparent',
    color: GOLD,
    border: `2px solid ${GOLD}`,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'background 0.15s ease',
  },
  nextBtn: {
    padding: '12px 28px',
    backgroundColor: CORAL,
    color: WHITE,
    border: 'none',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.04em',
    boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  confirmWrap: {
    textAlign: 'center' as const,
    padding: '40px 0',
  },
  confirmIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
    fontSize: 32,
    fontFamily: SERIF,
    background: CORAL,
    color: WHITE,
    boxShadow: SHADOW,
  },
  confirmTitle: {
    margin: '0 0 10px 0',
    fontSize: 30,
    fontWeight: 800,
    fontFamily: SERIF,
    color: GOLD,
  },
  confirmText: {
    margin: '0 0 10px 0',
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: SANS,
  },
  confirmTotal: {
    margin: '0 0 28px 0',
    fontSize: 22,
    fontWeight: 800,
    fontFamily: SERIF,
    color: CORAL,
  },
  continueBtn: {
    padding: '14px 32px',
    backgroundColor: CORAL,
    color: WHITE,
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.06em',
    boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
};

// ── Component ───────────────────────────────────────────────────────

export default function MaximalistEcommerce() {
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
      {/* ── Header ──────────────────────────────────────────────── */}
      <header style={s.header}>
        <h1 style={s.logo}>Maximalist Emporium</h1>
        <button
          data-testid="cart-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          style={s.cartBtn}
        >
          <span role="img" aria-label="cart">&#128722;</span> Cart
          {itemCount > 0 && (
            <span data-testid="cart-count" style={s.cartBadge}>{itemCount}</span>
          )}
        </button>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <main>
        {state.checkoutStep !== null ? (
          <div data-section="checkout" style={s.checkoutWrap}>
            {/* Step indicators */}
            <div style={s.stepRow}>
              {stepLabels.map((label, i) => {
                const num = (i + 1) as 1 | 2 | 3;
                const active = num === checkoutStep;
                const done = num < checkoutStep;
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        ...s.stepCircle,
                        backgroundColor: active ? CORAL : done ? GOLD : CARD_BG,
                        color: active || done ? WHITE : 'rgba(255,255,255,0.4)',
                        border: active ? `2px solid ${CORAL}` : done ? `2px solid ${GOLD}` : `2px solid rgba(255,255,255,0.2)`,
                      }}
                    >
                      {done ? '\u2713' : num}
                    </div>
                    <span
                      style={{
                        ...s.stepLabel,
                        fontWeight: active ? 800 : 400,
                        color: active ? GOLD : done ? GOLD : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && (
                      <div
                        style={{
                          ...s.stepLine,
                          backgroundColor: done ? GOLD : 'rgba(255,255,255,0.15)',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step 1 – Shipping */}
            {checkoutStep === 1 && (
              <div data-testid="checkout-step-1">
                <h3 style={s.formTitle}>Shipping Information</h3>
                <div style={{ marginBottom: 20 }}>
                  <label style={s.label}>Full Name</label>
                  <input
                    type="text"
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    placeholder="John Doe"
                    style={s.input}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CORAL; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'; }}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={s.label}>Shipping Address</label>
                  <input
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    placeholder="123 Main St, City, State 12345"
                    style={s.input}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CORAL; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'; }}
                  />
                </div>
              </div>
            )}

            {/* Step 2 – Payment */}
            {checkoutStep === 2 && (
              <div data-testid="checkout-step-2">
                <h3 style={s.formTitle}>Payment Details</h3>
                <div style={{ marginBottom: 20 }}>
                  <label style={s.label}>Card Number</label>
                  <input
                    type="text"
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    style={s.input}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CORAL; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'; }}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={s.label}>Expiry Date</label>
                  <input
                    type="text"
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    placeholder="MM/YY"
                    style={s.input}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CORAL; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'; }}
                  />
                </div>
                <div style={s.orderBox}>
                  Order Total: <strong style={{ color: CORAL }}>${cartTotal.toFixed(2)}</strong>
                </div>
              </div>
            )}

            {/* Step 3 – Confirmation */}
            {checkoutStep === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}>{'\u2713'}</div>
                <h3 style={s.confirmTitle}>Order Confirmed!</h3>
                <p style={s.confirmText}>Your order is being processed and will ship soon.</p>
                <p style={s.confirmTotal}>Total: ${cartTotal.toFixed(2)}</p>
                <button
                  onClick={() => { dispatch({ type: 'COMPLETE_CHECKOUT' }); setCheckoutStep(1); }}
                  style={s.continueBtn}
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {/* Checkout Navigation */}
            {checkoutStep < 3 && (
              <div style={{ ...s.navRow, justifyContent: checkoutStep > 1 ? 'space-between' : 'flex-end' }}>
                {checkoutStep > 1 && (
                  <button
                    data-testid="checkout-back"
                    onClick={() => setCheckoutStep(checkoutStep - 1)}
                    style={s.backBtn}
                  >
                    Back
                  </button>
                )}
                <button
                  data-testid="checkout-next"
                  onClick={() => setCheckoutStep(checkoutStep + 1)}
                  style={s.nextBtn}
                >
                  {checkoutStep === 2 ? 'Place Order' : 'Next'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── Product Grid ───────────────────────────────────────── */
          <div data-section="products" style={s.grid}>
            {products.map((product) => (
              <div
                key={product.id}
                data-testid={`product-card-${product.id}`}
                style={s.card}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    ...s.cardImage,
                    backgroundColor: imagePlaceholderColors[product.category] || CARD_BG,
                  }}
                >
                  {product.category}
                  {/* Category badge */}
                  <span
                    style={{
                      ...s.badge,
                      backgroundColor: categoryBadgeColors[product.category] || CARD_BG,
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                    }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Card body */}
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
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.2)';
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

      {/* ── Cart Drawer Backdrop ─────────────────────────────────── */}
      {state.isCartOpen && (
        <div style={s.backdrop} onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      )}

      {/* ── Cart Drawer ─────────────────────────────────────────── */}
      <div
        data-testid="cart-drawer"
        data-section="cart"
        style={{
          ...s.drawer,
          transform: state.isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div style={s.drawerHeader}>
          <h2 style={s.drawerTitle}>Your Cart ({cartItems.length})</h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            style={s.drawerClose}
            aria-label="Close cart"
          >
            &#10005;
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
                    >
                      &minus;
                    </button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button
                      style={s.qtyBtn}
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })
                      }
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
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
