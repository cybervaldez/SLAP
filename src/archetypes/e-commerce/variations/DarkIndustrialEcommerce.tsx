import React, { useReducer, useState } from 'react';
import { products } from '../data';
import type { Product } from '../data';

// ── Design Tokens — Dark Industrial ("Built to Spec") ───────────────

const MONO = "'Courier New', Courier, monospace";
const BG = '#0A0A0F';
const CARD_BG = '#12121A';
const AMBER = '#D4A574';
const BORDER = '#1E293B';
const TEXT_BODY = '#94A3B8';
const TEXT_HEADING = '#E2E8F0';

const categoryColors: Record<string, string> = {
  Electronics: '#1E3A5F',
  Clothing: '#2D1B4E',
  Accessories: '#3D2E0A',
  Home: '#0F3D2E',
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
  page: {
    fontFamily: MONO,
    background: BG,
    color: TEXT_BODY,
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
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    fontFamily: MONO,
    color: AMBER,
  },
  cartBtn: {
    position: 'relative',
    background: 'transparent',
    border: `1px solid ${AMBER}`,
    borderRadius: 0,
    padding: '8px 16px',
    cursor: 'pointer',
    fontFamily: MONO,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: AMBER,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: AMBER,
    color: BG,
    fontSize: 10,
    fontWeight: 700,
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: MONO,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16,
    padding: '24px',
  },
  card: {
    border: `1px solid ${BORDER}`,
    display: 'flex',
    flexDirection: 'column' as const,
    background: CARD_BG,
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: MONO,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: TEXT_BODY,
  },
  cardBody: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    borderTop: `1px solid ${BORDER}`,
  },
  cardName: {
    margin: '0 0 6px 0',
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    fontFamily: MONO,
    color: TEXT_HEADING,
  },
  cardDesc: {
    margin: '0 0 10px 0',
    fontSize: 11,
    color: TEXT_BODY,
    lineHeight: 1.6,
    fontFamily: MONO,
    flex: 1,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: MONO,
    color: AMBER,
    marginBottom: 10,
  },
  stars: {
    color: AMBER,
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: MONO,
  },
  addBtn: {
    width: '100%',
    padding: '10px 0',
    background: 'transparent',
    color: AMBER,
    border: `1px solid ${AMBER}`,
    borderRadius: 0,
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    fontFamily: MONO,
    transition: 'background 0.2s ease, color 0.2s ease',
  },

  // Cart drawer
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    color: TEXT_BODY,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: MONO,
    borderLeft: `1px solid ${BORDER}`,
    transition: 'transform 0.2s ease',
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
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    fontFamily: MONO,
    color: TEXT_HEADING,
  },
  drawerClose: {
    background: 'transparent',
    border: `1px solid ${BORDER}`,
    color: TEXT_BODY,
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    padding: '4px 10px',
    fontFamily: MONO,
    borderRadius: 0,
    textTransform: 'uppercase' as const,
  },
  drawerItems: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 20,
  },
  drawerEmpty: {
    textAlign: 'center' as const,
    color: TEXT_BODY,
    fontSize: 12,
    marginTop: 40,
    fontFamily: MONO,
    letterSpacing: '0.1em',
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
    fontSize: 12,
    fontWeight: 700,
    color: TEXT_HEADING,
    marginBottom: 4,
    fontFamily: MONO,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  drawerItemPrice: {
    fontSize: 14,
    fontWeight: 700,
    color: AMBER,
    fontFamily: MONO,
    marginBottom: 8,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    border: `1px solid ${AMBER}`,
    background: 'transparent',
    color: AMBER,
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: MONO,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyVal: {
    fontSize: 13,
    fontWeight: 700,
    fontFamily: MONO,
    color: TEXT_HEADING,
    minWidth: 20,
    textAlign: 'center' as const,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    fontSize: 10,
    cursor: 'pointer',
    fontFamily: MONO,
    textTransform: 'uppercase' as const,
    fontWeight: 700,
    letterSpacing: '0.05em',
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
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    fontFamily: MONO,
    color: TEXT_BODY,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: MONO,
    color: AMBER,
  },
  checkoutBtn: {
    width: '100%',
    padding: '12px 0',
    backgroundColor: AMBER,
    color: BG,
    border: `1px solid ${AMBER}`,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: MONO,
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },

  // Checkout
  checkoutWrap: {
    maxWidth: 520,
    margin: '0 auto',
    padding: 32,
    fontFamily: MONO,
  },
  stepRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  stepCircle: {
    width: 30,
    height: 30,
    border: `1px solid ${BORDER}`,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    fontFamily: MONO,
    background: CARD_BG,
    color: TEXT_BODY,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    fontFamily: MONO,
  },
  stepLine: {
    width: 36,
    height: 1,
    backgroundColor: BORDER,
    marginLeft: 4,
    alignSelf: 'center' as const,
  },
  formTitle: {
    margin: '0 0 20px 0',
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    fontFamily: MONO,
    color: TEXT_HEADING,
  },
  label: {
    display: 'block',
    fontSize: 10,
    fontWeight: 700,
    color: TEXT_BODY,
    marginBottom: 6,
    fontFamily: MONO,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${BORDER}`,
    borderRadius: 0,
    fontSize: 13,
    fontFamily: MONO,
    color: TEXT_HEADING,
    outline: 'none',
    boxSizing: 'border-box' as const,
    background: CARD_BG,
  },
  orderBox: {
    padding: 14,
    backgroundColor: CARD_BG,
    border: `1px solid ${BORDER}`,
    fontSize: 12,
    color: TEXT_BODY,
    fontFamily: MONO,
    letterSpacing: '0.05em',
  },
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backBtn: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: TEXT_BODY,
    border: `1px solid ${BORDER}`,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: MONO,
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  nextBtn: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: AMBER,
    border: `1px solid ${AMBER}`,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: MONO,
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  confirmWrap: {
    textAlign: 'center' as const,
    padding: '32px 0',
  },
  confirmIcon: {
    width: 56,
    height: 56,
    border: `1px solid ${AMBER}`,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    fontSize: 24,
    fontFamily: MONO,
    background: 'transparent',
    color: AMBER,
  },
  confirmTitle: {
    margin: '0 0 8px 0',
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    fontFamily: MONO,
    color: TEXT_HEADING,
    letterSpacing: '0.1em',
  },
  confirmText: {
    margin: '0 0 8px 0',
    fontSize: 12,
    color: TEXT_BODY,
    fontFamily: MONO,
  },
  confirmTotal: {
    margin: '0 0 24px 0',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: MONO,
    color: AMBER,
  },
  continueBtn: {
    padding: '12px 28px',
    backgroundColor: 'transparent',
    color: AMBER,
    border: `1px solid ${AMBER}`,
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: MONO,
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },
};

// ── Component ───────────────────────────────────────────────────────

export default function DarkIndustrialEcommerce() {
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
        <h1 style={s.logo}>INDUSTRIAL SUPPLY</h1>
        <button
          data-testid="cart-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          style={s.cartBtn}
        >
          CART
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
                        backgroundColor: active || done ? AMBER : CARD_BG,
                        color: active || done ? BG : TEXT_BODY,
                        borderColor: active || done ? AMBER : BORDER,
                      }}
                    >
                      {done ? '\u2713' : num}
                    </div>
                    <span
                      style={{
                        ...s.stepLabel,
                        fontWeight: active ? 700 : 400,
                        color: active ? AMBER : TEXT_BODY,
                      }}
                    >
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && (
                      <div
                        style={{
                          ...s.stepLine,
                          backgroundColor: done ? AMBER : BORDER,
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
                <h3 style={s.formTitle}>// Shipping Information</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Full Name</label>
                  <input
                    type="text"
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    placeholder="John Doe"
                    style={s.input}
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
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {checkoutStep === 2 && (
              <div data-testid="checkout-step-2">
                <h3 style={s.formTitle}>// Payment Details</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Card Number</label>
                  <input
                    type="text"
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    style={s.input}
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
                  />
                </div>
                <div style={s.orderBox}>
                  ORDER TOTAL: <span style={{ color: AMBER, fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {checkoutStep === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}>{'\u2713'}</div>
                <h3 style={s.confirmTitle}>Order Confirmed</h3>
                <p style={s.confirmText}>Your order is being processed.</p>
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
          /* Product Grid */
          <div data-section="products" style={s.grid}>
            {products.map((product) => (
              <div
                key={product.id}
                data-testid={`product-card-${product.id}`}
                style={s.card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${AMBER}22, 0 0 40px ${AMBER}11`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = AMBER;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
                }}
              >
                <div
                  style={{
                    ...s.cardImage,
                    backgroundColor: categoryColors[product.category] || CARD_BG,
                  }}
                >
                  [{product.category}]
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
                      e.currentTarget.style.background = AMBER;
                      e.currentTarget.style.color = BG;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = AMBER;
                    }}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer Backdrop */}
      {state.isCartOpen && (
        <div style={s.backdrop} onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      )}

      {/* Cart Drawer */}
      <div
        data-testid="cart-drawer"
        data-section="cart"
        style={{
          ...s.drawer,
          transform: state.isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div style={s.drawerHeader}>
          <h2 style={s.drawerTitle}>// Cart ({cartItems.length})</h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            style={s.drawerClose}
            aria-label="Close cart"
          >
            X
          </button>
        </div>
        <div style={s.drawerItems}>
          {cartItems.length === 0 ? (
            <p style={s.drawerEmpty}>// CART IS EMPTY</p>
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
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
