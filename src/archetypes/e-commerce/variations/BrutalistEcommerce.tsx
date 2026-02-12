import React, { useReducer, useState, useCallback } from 'react';
import { products } from '../data';
import type { Product } from '../data';

// ── Design Tokens ────────────────────────────────────────────────────

const FONT = "'Arial Black', 'Helvetica Neue', sans-serif";
const MONO = "'Courier New', Courier, monospace";
const BLACK = '#000000';
const WHITE = '#FFFFFF';
const RED = '#FF0000';

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
  | { type: 'SET_CHECKOUT_STEP'; step: 1 | 2 | 3 }
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
    case 'SET_CHECKOUT_STEP':
      return { ...state, checkoutStep: action.step };
    case 'COMPLETE_CHECKOUT':
      return { items: new Map(), isCartOpen: false, checkoutStep: null };
    default:
      return state;
  }
}

const initialState: CartState = { items: new Map(), isCartOpen: false, checkoutStep: null };

// ── Styles ───────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: { fontFamily: FONT, background: WHITE, color: BLACK, minHeight: '100%', position: 'relative', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `3px solid ${BLACK}`, position: 'sticky', top: 0, zIndex: 30, background: WHITE },
  logo: { margin: 0, fontSize: 22, fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontFamily: FONT },
  cartBtn: { position: 'relative', background: 'none', border: `3px solid ${BLACK}`, borderRadius: 0, padding: '8px 14px', cursor: 'pointer', fontFamily: FONT, fontSize: 14, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: BLACK, display: 'flex', alignItems: 'center', gap: 8 },
  cartBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: RED, color: WHITE, fontSize: 11, fontWeight: 700, width: 22, height: 22, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, padding: '24px' },
  card: { border: `3px solid ${BLACK}`, display: 'flex', flexDirection: 'column' as const, background: WHITE },
  cardImage: { width: '100%', height: 160, backgroundColor: BLACK, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WHITE, fontSize: 42, fontWeight: 900, fontFamily: FONT, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1, padding: '0 12px', boxSizing: 'border-box' as const, textAlign: 'center' as const },
  cardBody: { padding: 16, display: 'flex', flexDirection: 'column' as const, flex: 1 },
  cardName: { margin: '0 0 4px 0', fontSize: 14, fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.02em', fontFamily: FONT, color: BLACK },
  cardDesc: { margin: '0 0 8px 0', fontSize: 12, color: '#333', lineHeight: 1.5, fontFamily: FONT, flex: 1 },
  cardPrice: { fontSize: 22, fontWeight: 700, fontFamily: MONO, color: BLACK, marginBottom: 8 },
  addBtn: { width: '100%', padding: '10px 0', background: BLACK, color: WHITE, border: `3px solid ${BLACK}`, borderRadius: 0, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: FONT, transition: 'none' },
  rating: { fontSize: 14, fontWeight: 700, fontFamily: MONO, color: BLACK, marginBottom: 6, letterSpacing: '0.05em' },

  // Cart drawer
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 40 },
  drawer: { position: 'absolute', top: 0, right: 0, bottom: 0, width: 380, maxWidth: '100%', backgroundColor: BLACK, color: WHITE, zIndex: 50, display: 'flex', flexDirection: 'column' as const, fontFamily: FONT, transition: 'transform 0.05s linear' },
  drawerHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: `3px solid ${WHITE}` },
  drawerTitle: { margin: 0, fontSize: 16, fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontFamily: FONT, color: WHITE },
  drawerClose: { background: 'none', border: `3px solid ${WHITE}`, color: WHITE, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '4px 10px', fontFamily: FONT, borderRadius: 0, textTransform: 'uppercase' as const },
  drawerItems: { flex: 1, overflowY: 'auto' as const, padding: 20 },
  drawerEmpty: { textAlign: 'center' as const, color: '#888', fontSize: 14, marginTop: 40, fontFamily: MONO },
  drawerItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid #333` },
  drawerItemName: { fontSize: 13, fontWeight: 700, color: WHITE, marginBottom: 4, fontFamily: FONT, textTransform: 'uppercase' as const },
  drawerItemPrice: { fontSize: 15, fontWeight: 700, color: RED, fontFamily: MONO, marginBottom: 8 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 40, height: 40, border: `3px solid ${WHITE}`, background: 'none', color: WHITE, fontSize: 18, fontWeight: 700, cursor: 'pointer', fontFamily: MONO, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyVal: { fontSize: 14, fontWeight: 700, fontFamily: MONO, color: WHITE, minWidth: 20, textAlign: 'center' as const },
  removeBtn: { background: 'none', border: `3px solid ${RED}`, color: RED, fontSize: 13, cursor: 'pointer', fontFamily: FONT, textTransform: 'uppercase' as const, fontWeight: 700, letterSpacing: '0.05em', padding: '6px 12px', borderRadius: 0 },
  drawerFooter: { padding: 20, borderTop: `3px solid ${WHITE}` },
  drawerTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { fontSize: 14, fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontFamily: FONT, color: WHITE },
  totalValue: { fontSize: 22, fontWeight: 700, fontFamily: MONO, color: RED },
  checkoutBtn: { width: '100%', padding: '14px 0', backgroundColor: RED, color: WHITE, border: `3px solid ${RED}`, borderRadius: 0, fontSize: 13, fontWeight: 700, fontFamily: FONT, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.1em' },

  // Checkout
  checkoutWrap: { maxWidth: 520, margin: '0 auto', padding: 32, fontFamily: FONT },
  stepRow: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 },
  stepCircle: { width: 32, height: 32, border: `3px solid ${BLACK}`, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: MONO },
  stepLabel: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontFamily: FONT },
  stepLine: { width: 40, height: 3, backgroundColor: BLACK, marginLeft: 4, alignSelf: 'center' as const },
  formTitle: { margin: '0 0 20px 0', fontSize: 20, fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.02em', fontFamily: FONT, color: BLACK },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: BLACK, marginBottom: 6, fontFamily: MONO, textTransform: 'uppercase' as const, letterSpacing: '0.1em' },
  input: { width: '100%', padding: '10px 12px', border: `3px solid ${BLACK}`, borderRadius: 0, fontSize: 14, fontFamily: MONO, color: BLACK, outline: 'none', boxSizing: 'border-box' as const, background: WHITE },
  orderBox: { padding: 12, backgroundColor: '#F5F5F5', border: `3px solid ${BLACK}`, fontSize: 13, color: BLACK, fontFamily: MONO },
  navRow: { display: 'flex', justifyContent: 'space-between', marginTop: 24 },
  backBtn: { padding: '10px 24px', backgroundColor: WHITE, color: BLACK, border: `3px solid ${BLACK}`, borderRadius: 0, fontSize: 13, fontWeight: 700, fontFamily: FONT, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  nextBtn: { padding: '10px 24px', backgroundColor: BLACK, color: WHITE, border: `3px solid ${BLACK}`, borderRadius: 0, fontSize: 13, fontWeight: 700, fontFamily: FONT, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  confirmWrap: { textAlign: 'center' as const, padding: '32px 0' },
  confirmIcon: { width: 64, height: 64, border: `3px solid ${BLACK}`, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: 28, fontFamily: MONO, background: BLACK, color: WHITE },
  confirmTitle: { margin: '0 0 8px 0', fontSize: 24, fontWeight: 900, textTransform: 'uppercase' as const, fontFamily: FONT, color: BLACK },
  confirmText: { margin: '0 0 8px 0', fontSize: 14, color: '#333', fontFamily: FONT },
  confirmTotal: { margin: '0 0 24px 0', fontSize: 18, fontWeight: 700, fontFamily: MONO, color: BLACK },
  continueBtn: { padding: '12px 28px', backgroundColor: BLACK, color: WHITE, border: `3px solid ${BLACK}`, borderRadius: 0, fontSize: 13, fontWeight: 700, fontFamily: FONT, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
};

// Brutalist focus style — screaming red inner glow
const focusBoxShadow = `inset 0 0 0 3px ${RED}`;

// ── Component ────────────────────────────────────────────────────────

export default function BrutalistEcommerce() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [shipping, setShipping] = useState({ name: '', address: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '' });

  const cartItems = Array.from(state.items.values());
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const step = state.checkoutStep;
  const stepLabels = ['Shipping', 'Payment', 'Confirmation'];

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = focusBoxShadow;
  }, []);
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = 'none';
  }, []);

  return (
    <div style={s.page} data-testid="e-commerce-demo">
      {/* Header */}
      <header style={s.header}>
        <h1 style={s.logo}>BRUTALIST STORE</h1>
        <button data-testid="cart-toggle" onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={s.cartBtn}>
          CART
          {itemCount > 0 && <span data-testid="cart-count" style={s.cartBadge}>{itemCount}</span>}
        </button>
      </header>

      {/* Main */}
      <main>
        {step !== null ? (
          <div data-section="checkout" style={s.checkoutWrap}>
            {/* Step indicators */}
            <div style={s.stepRow}>
              {stepLabels.map((label, i) => {
                const num = (i + 1) as 1 | 2 | 3;
                const active = num === step;
                const done = num < step;
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ ...s.stepCircle, backgroundColor: active || done ? BLACK : WHITE, color: active || done ? WHITE : BLACK }}>
                      {done ? '\u2713' : num}
                    </div>
                    <span style={{ ...s.stepLabel, fontWeight: active ? 900 : 400, color: active ? BLACK : '#666' }}>{label}</span>
                    {i < stepLabels.length - 1 && <div style={{ ...s.stepLine, backgroundColor: done ? BLACK : '#CCC' }} />}
                  </div>
                );
              })}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div data-testid="checkout-step-1">
                <h3 style={s.formTitle}>Shipping Information</h3>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="brutalist-name" style={s.label}>FIELD_01: NAME</label>
                  <input id="brutalist-name" type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} placeholder="John Doe" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label htmlFor="brutalist-address" style={s.label}>FIELD_02: ADDRESS</label>
                  <input id="brutalist-address" type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="123 Main St, City, State 12345" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div data-testid="checkout-step-2">
                <h3 style={s.formTitle}>Payment Details</h3>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="brutalist-card" style={s.label}>FIELD_03: CARD</label>
                  <input id="brutalist-card" type="text" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label htmlFor="brutalist-expiry" style={s.label}>FIELD_04: EXPIRY</label>
                  <input id="brutalist-expiry" type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={s.orderBox}>ORDER TOTAL: <strong>${cartTotal.toFixed(2)}</strong></div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}>{'\u2713'}</div>
                <h3 style={s.confirmTitle}>Order confirmed</h3>
                <p style={s.confirmText}>Your order is being processed.</p>
                <p style={s.confirmTotal}>Total: ${cartTotal.toFixed(2)}</p>
                <button onClick={() => dispatch({ type: 'COMPLETE_CHECKOUT' })} style={s.continueBtn}>Continue Shopping</button>
              </div>
            )}

            {/* Nav */}
            {step < 3 && (
              <div style={{ ...s.navRow, justifyContent: step > 1 ? 'space-between' : 'flex-end' }}>
                {step > 1 && (
                  <button data-testid="checkout-back" onClick={() => dispatch({ type: 'SET_CHECKOUT_STEP', step: (step - 1) as 1 | 2 | 3 })} style={s.backBtn}>Back</button>
                )}
                <button data-testid="checkout-next" onClick={() => dispatch({ type: 'SET_CHECKOUT_STEP', step: (step + 1) as 1 | 2 | 3 })} style={s.nextBtn}>
                  {step === 2 ? 'Place Order' : 'Next'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Product Grid */
          <div data-section="products" style={s.grid}>
            {products.map((product) => (
              <div key={product.id} data-testid={`product-card-${product.id}`} style={s.card}>
                <div style={s.cardImage}>{product.category}</div>
                <div style={s.cardBody}>
                  <h3 style={s.cardName}>{product.name}</h3>
                  <p style={s.cardDesc}>{product.description}</p>
                  <div style={s.rating} aria-label={`${product.rating} out of 5`}>{product.rating}/5</div>
                  <div style={s.cardPrice}>${product.price.toFixed(2)}</div>
                  <button
                    data-testid={`add-to-cart-${product.id}`}
                    onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
                    style={s.addBtn}
                    onMouseEnter={(e) => { e.currentTarget.style.background = WHITE; e.currentTarget.style.color = BLACK; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = BLACK; e.currentTarget.style.color = WHITE; }}
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
      {state.isCartOpen && <div style={s.backdrop} onClick={() => dispatch({ type: 'TOGGLE_CART' })} />}
      <div data-testid="cart-drawer" data-section="cart" style={{ ...s.drawer, transform: state.isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div style={s.drawerHeader}>
          <h2 style={s.drawerTitle}>{itemCount === 0 ? 'Cart' : `Cart \u2014 ${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}`}</h2>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={s.drawerClose} aria-label="Close cart">X</button>
        </div>
        <div style={s.drawerItems}>
          {cartItems.length === 0 ? (
            <p style={s.drawerEmpty}>CART IS EMPTY</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} data-testid={`cart-item-${item.product.id}`} style={s.drawerItem}>
                <div>
                  <div style={s.drawerItemName}>{item.product.name}</div>
                  <div style={s.drawerItemPrice}>${(item.product.price * item.quantity).toFixed(2)}</div>
                  <div style={s.qtyRow}>
                    <button style={s.qtyBtn} onClick={() => { if (item.quantity > 1) dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity - 1 }); }}>-</button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button style={s.qtyBtn} onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })}>+</button>
                  </div>
                </div>
                <button data-testid={`remove-item-${item.product.id}`} onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.product.id })} style={s.removeBtn}>Remove</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div style={s.drawerFooter}>
            <div style={s.drawerTotal}>
              <span style={s.totalLabel}>Total</span>
              <span data-testid="cart-total" style={s.totalValue}>${cartTotal.toFixed(2)}</span>
            </div>
            <button data-testid="checkout-btn" onClick={() => dispatch({ type: 'START_CHECKOUT' })} style={s.checkoutBtn}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
