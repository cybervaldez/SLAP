import React, { useReducer, useState } from 'react';
import { products } from '../data';
import type { Product } from '../data';

// ── Design Tokens — Warm Organic ("Grown, Not Made") ────────────────

const CREAM = '#FDF6EE';
const FOREST = '#2D5016';
const SAGE = '#A7C4A0';
const WARM_BROWN = '#8B6914';
const DARK_BROWN = '#3D2B1F';
const GOLD = '#C49B1D';
const WHITE = '#FFFFFF';
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const categoryColors: Record<string, string> = {
  Props: '#7BA38C',
  Costumes: '#B8A088',
  Gags: '#C4A265',
  Sets: '#8FB87A',
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
  // Page
  page: {
    fontFamily: SANS,
    background: CREAM,
    color: DARK_BROWN,
    minHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    borderBottom: `1px solid ${SAGE}`,
    position: 'sticky',
    top: 0,
    zIndex: 30,
    background: CREAM,
  },
  logo: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    fontFamily: SERIF,
    color: FOREST,
    letterSpacing: '-0.01em',
  },
  cartBtn: {
    position: 'relative',
    background: 'none',
    border: `1.5px solid ${SAGE}`,
    borderRadius: 9999,
    padding: '10px 22px',
    cursor: 'pointer',
    fontFamily: SANS,
    fontSize: 14,
    fontWeight: 600,
    color: FOREST,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'background 0.2s ease, border-color 0.2s ease',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: FOREST,
    color: WHITE,
    fontSize: 11,
    fontWeight: 700,
    width: 22,
    height: 22,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: SANS,
  },

  // Product grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 24,
    padding: '32px 32px 48px 32px',
  },
  card: {
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    background: WHITE,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  },
  cardImage: {
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: SANS,
    color: WHITE,
    letterSpacing: '0.04em',
  },
  cardBody: {
    padding: '18px 20px 20px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  },
  cardName: {
    margin: '0 0 6px 0',
    fontSize: 17,
    fontWeight: 700,
    fontFamily: SERIF,
    color: FOREST,
    lineHeight: 1.3,
  },
  cardDesc: {
    margin: '0 0 12px 0',
    fontSize: 13,
    color: '#6B5B4F',
    lineHeight: 1.6,
    fontFamily: SANS,
    flex: 1,
  },
  stars: {
    color: GOLD,
    fontSize: 15,
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: SERIF,
    color: WARM_BROWN,
    marginBottom: 14,
  },
  addBtn: {
    width: '100%',
    padding: '11px 0',
    background: FOREST,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.03em',
    cursor: 'pointer',
    fontFamily: SANS,
    transition: 'background 0.2s ease',
  },

  // Cart drawer
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(45,30,15,0.3)',
    zIndex: 40,
    transition: 'opacity 0.25s ease',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 400,
    maxWidth: '100%',
    backgroundColor: CREAM,
    color: DARK_BROWN,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: SANS,
    transition: 'transform 0.3s ease',
    boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '22px 24px',
    borderBottom: `1px solid ${SAGE}`,
  },
  drawerTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    fontFamily: SERIF,
    color: FOREST,
  },
  drawerClose: {
    background: 'none',
    border: `1.5px solid ${SAGE}`,
    color: FOREST,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '6px 14px',
    fontFamily: SANS,
    borderRadius: 9999,
    transition: 'background 0.2s ease',
  },
  drawerItems: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 24,
  },
  drawerEmpty: {
    textAlign: 'center' as const,
    color: '#9B8F84',
    fontSize: 14,
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
    borderBottom: `1px solid ${SAGE}40`,
  },
  drawerItemName: {
    fontSize: 15,
    fontWeight: 700,
    color: FOREST,
    marginBottom: 4,
    fontFamily: SERIF,
  },
  drawerItemPrice: {
    fontSize: 16,
    fontWeight: 700,
    color: WARM_BROWN,
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
    border: `1.5px solid ${SAGE}`,
    background: WHITE,
    color: FOREST,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: SANS,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s ease',
  },
  qtyVal: {
    fontSize: 15,
    fontWeight: 600,
    fontFamily: SANS,
    color: DARK_BROWN,
    minWidth: 22,
    textAlign: 'center' as const,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#B85C3A',
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: SANS,
    fontWeight: 500,
    padding: 0,
    marginTop: 4,
  },
  drawerFooter: {
    padding: '20px 24px',
    borderTop: `1px solid ${SAGE}`,
    background: WHITE,
  },
  drawerTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: SERIF,
    color: FOREST,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: SERIF,
    color: WARM_BROWN,
  },
  checkoutBtn: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: FOREST,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'background 0.2s ease',
  },

  // Checkout
  checkoutWrap: {
    maxWidth: 540,
    margin: '0 auto',
    padding: '40px 32px',
    fontFamily: SANS,
  },
  stepRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 36,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: SANS,
    transition: 'background 0.2s ease, color 0.2s ease',
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: 500,
    fontFamily: SANS,
  },
  stepLine: {
    width: 40,
    height: 2,
    borderRadius: 1,
    alignSelf: 'center' as const,
    marginLeft: 4,
    transition: 'background 0.2s ease',
  },
  formTitle: {
    margin: '0 0 24px 0',
    fontSize: 24,
    fontWeight: 700,
    fontFamily: SERIF,
    color: FOREST,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: DARK_BROWN,
    marginBottom: 8,
    fontFamily: SANS,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${SAGE}`,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: SANS,
    color: DARK_BROWN,
    outline: 'none',
    boxSizing: 'border-box' as const,
    background: CREAM,
    transition: 'border-color 0.2s ease',
  },
  orderBox: {
    padding: 16,
    backgroundColor: WHITE,
    border: `1px solid ${SAGE}`,
    borderRadius: 12,
    fontSize: 14,
    color: DARK_BROWN,
    fontFamily: SANS,
  },
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  backBtn: {
    padding: '12px 28px',
    backgroundColor: WHITE,
    color: FOREST,
    border: `1.5px solid ${SAGE}`,
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: SANS,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  nextBtn: {
    padding: '12px 28px',
    backgroundColor: FOREST,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'background 0.2s ease',
  },
  confirmWrap: {
    textAlign: 'center' as const,
    padding: '40px 0',
  },
  confirmIcon: {
    width: 68,
    height: 68,
    borderRadius: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
    fontSize: 30,
    background: FOREST,
    color: WHITE,
  },
  confirmTitle: {
    margin: '0 0 10px 0',
    fontSize: 26,
    fontWeight: 700,
    fontFamily: SERIF,
    color: FOREST,
  },
  confirmText: {
    margin: '0 0 8px 0',
    fontSize: 15,
    color: '#6B5B4F',
    fontFamily: SANS,
    lineHeight: 1.5,
  },
  confirmTotal: {
    margin: '0 0 28px 0',
    fontSize: 20,
    fontWeight: 700,
    fontFamily: SERIF,
    color: WARM_BROWN,
  },
  continueBtn: {
    padding: '14px 32px',
    backgroundColor: FOREST,
    color: WHITE,
    border: 'none',
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: SANS,
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'background 0.2s ease',
  },
};

// ── Component ───────────────────────────────────────────────────────

export default function WarmOrganicEcommerce() {
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
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header style={s.header}>
        <h1 style={s.logo}>The Organic Market</h1>
        <button
          data-testid="cart-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          style={s.cartBtn}
        >
          {'\uD83E\uDED2'} Cart
          {itemCount > 0 && (
            <span data-testid="cart-count" style={s.cartBadge}>{itemCount}</span>
          )}
        </button>
      </header>

      {/* ── Main Content ───────────────────────────────────────────── */}
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
                        backgroundColor: active || done ? FOREST : WHITE,
                        color: active || done ? WHITE : SAGE,
                        border: active || done ? 'none' : `1.5px solid ${SAGE}`,
                      }}
                    >
                      {done ? '\u2713' : num}
                    </div>
                    <span
                      style={{
                        ...s.stepLabel,
                        fontWeight: active ? 700 : 400,
                        color: active ? FOREST : '#9B8F84',
                      }}
                    >
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && (
                      <div
                        style={{
                          ...s.stepLine,
                          backgroundColor: done ? FOREST : SAGE + '60',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step 1: Shipping */}
            {checkoutStep === 1 && (
              <div data-testid="checkout-step-1">
                <h3 style={s.formTitle}>Shipping Information</h3>
                <div style={{ marginBottom: 20 }}>
                  <label style={s.label}>Full Name</label>
                  <input
                    type="text"
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    placeholder="Jane Greenfield"
                    style={s.input}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={s.label}>Shipping Address</label>
                  <input
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    placeholder="123 Meadow Lane, Willowbrook, OR 97201"
                    style={s.input}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
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
                  />
                </div>
                <div style={s.orderBox}>
                  Order Total: <strong style={{ color: WARM_BROWN }}>${cartTotal.toFixed(2)}</strong>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {checkoutStep === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}>{'\u2713'}</div>
                <h3 style={s.confirmTitle}>Order Confirmed</h3>
                <p style={s.confirmText}>
                  Thank you for your purchase! Your order is being lovingly prepared.
                </p>
                <p style={s.confirmTotal}>Total: ${cartTotal.toFixed(2)}</p>
                <button
                  onClick={() => {
                    dispatch({ type: 'COMPLETE_CHECKOUT' });
                    setCheckoutStep(1);
                  }}
                  style={s.continueBtn}
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
          /* ── Product Grid ──────────────────────────────────────── */
          <div data-section="products" style={s.grid}>
            {products.map((product) => (
              <div
                key={product.id}
                data-testid={`product-card-${product.id}`}
                style={s.card}
              >
                <div
                  style={{
                    ...s.cardImage,
                    backgroundColor: categoryColors[product.category] || SAGE,
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
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Cart Drawer ──────────────────────────────────────────── */}
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
          <h2 style={s.drawerTitle}>Your Cart ({cartItems.length})</h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            style={s.drawerClose}
            aria-label="Close cart"
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
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            productId: item.product.id,
                            quantity: item.quantity - 1,
                          });
                      }}
                    >
                      -
                    </button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button
                      style={s.qtyBtn}
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          productId: item.product.id,
                          quantity: item.quantity + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  data-testid={`remove-item-${item.product.id}`}
                  onClick={() =>
                    dispatch({ type: 'REMOVE_ITEM', productId: item.product.id })
                  }
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
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
