import React, { useReducer, useState, useCallback } from 'react';
import { products } from '../data';
import type { Product } from '../data';

// ── Design Tokens ────────────────────────────────────────────────────

const BG = '#FAF7F0';
const TEXT = '#1C1917';
const TEXT_SEC = '#78716C';
const GOLD = '#B8860B';
const GOLD_LIGHT = '#D4A017';
const NAVY = '#1B2838';
const CREAM = '#FAF7F0';
const FONT_DISPLAY = "'Georgia', 'Palatino', 'Times New Roman', serif";
const FONT_BODY = "'Optima', 'Candara', 'Segoe UI', sans-serif";
const FONT_MONO = "'Courier New', monospace";

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

// ── Diamond ornament helper ─────────────────────────────────────────

const Diamond = ({ size = 8, color = GOLD }: { size?: number; color?: string }) => (
  <span style={{ display: 'inline-block', width: size, height: size, backgroundColor: color, transform: 'rotate(45deg)', margin: '0 6px', flexShrink: 0 }} />
);

// ── Styles ───────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: { fontFamily: FONT_BODY, background: BG, color: TEXT, minHeight: '100%', position: 'relative', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: `2px solid ${GOLD}`, position: 'sticky', top: 0, zIndex: 30, background: BG },
  logo: { margin: 0, fontSize: 22, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', fontFamily: FONT_DISPLAY, color: TEXT },
  cartBtn: { position: 'relative', background: 'none', border: `2px solid ${GOLD}`, borderRadius: 0, padding: '8px 18px', cursor: 'pointer', fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: TEXT, display: 'flex', alignItems: 'center', gap: 8 },
  cartBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: GOLD, color: CREAM, fontSize: 11, fontWeight: 700, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, padding: '32px 28px' },
  card: { border: `2px solid ${GOLD}`, padding: 3, background: BG, display: 'flex', flexDirection: 'column' as const },
  cardInner: { border: `1px solid ${GOLD}`, display: 'flex', flexDirection: 'column' as const, flex: 1 },
  cardImage: { width: '100%', height: 160, backgroundColor: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD_LIGHT, fontSize: 20, fontWeight: 700, fontFamily: FONT_DISPLAY, letterSpacing: '0.08em', textTransform: 'uppercase' as const, lineHeight: 1, padding: '0 16px', boxSizing: 'border-box' as const, textAlign: 'center' as const },
  cardBody: { padding: 16, display: 'flex', flexDirection: 'column' as const, flex: 1 },
  cardName: { margin: '0 0 4px 0', fontSize: 15, fontWeight: 700, fontFamily: FONT_DISPLAY, color: TEXT, letterSpacing: '0.02em' },
  cardDesc: { margin: '0 0 8px 0', fontSize: 13, color: TEXT_SEC, lineHeight: 1.6, fontFamily: FONT_BODY, flex: 1 },
  cardPrice: { fontSize: 20, fontWeight: 700, fontFamily: FONT_MONO, color: GOLD, marginBottom: 8 },
  addBtn: { width: '100%', padding: '10px 0', background: 'none', color: GOLD, border: `2px solid ${GOLD}`, borderRadius: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: FONT_BODY, transition: 'background 0.2s, color 0.2s' },
  rating: { fontSize: 13, fontWeight: 600, fontFamily: FONT_MONO, color: GOLD, marginBottom: 6, letterSpacing: '0.05em' },

  // Cart drawer
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(27,40,56,0.55)', zIndex: 40 },
  drawer: { position: 'absolute', top: 0, right: 0, bottom: 0, width: 380, maxWidth: '100%', backgroundColor: NAVY, color: CREAM, zIndex: 50, display: 'flex', flexDirection: 'column' as const, fontFamily: FONT_BODY, transition: 'transform 0.25s ease' },
  drawerHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: `1px solid ${GOLD}` },
  drawerTitle: { margin: 0, fontSize: 16, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontFamily: FONT_DISPLAY, color: CREAM },
  drawerClose: { background: 'none', border: `2px solid ${GOLD}`, color: GOLD, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '4px 12px', fontFamily: FONT_BODY, borderRadius: 0, textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
  drawerItems: { flex: 1, overflowY: 'auto' as const, padding: 20 },
  drawerEmpty: { textAlign: 'center' as const, color: TEXT_SEC, fontSize: 14, marginTop: 40, fontFamily: FONT_DISPLAY, fontStyle: 'italic' as const },
  drawerItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid rgba(184,134,11,0.3)` },
  drawerItemName: { fontSize: 13, fontWeight: 700, color: CREAM, marginBottom: 4, fontFamily: FONT_DISPLAY },
  drawerItemPrice: { fontSize: 15, fontWeight: 700, color: GOLD_LIGHT, fontFamily: FONT_MONO, marginBottom: 8 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 32, height: 32, border: `1px solid ${GOLD}`, background: 'none', color: GOLD, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: FONT_MONO, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyVal: { fontSize: 14, fontWeight: 700, fontFamily: FONT_MONO, color: CREAM, minWidth: 20, textAlign: 'center' as const },
  removeBtn: { background: 'none', border: `1px solid ${TEXT_SEC}`, color: TEXT_SEC, fontSize: 12, cursor: 'pointer', fontFamily: FONT_BODY, textTransform: 'uppercase' as const, fontWeight: 600, letterSpacing: '0.08em', padding: '5px 10px', borderRadius: 0 },
  drawerFooter: { padding: 20, borderTop: `1px solid ${GOLD}` },
  drawerTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { fontSize: 14, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontFamily: FONT_DISPLAY, color: CREAM },
  totalValue: { fontSize: 22, fontWeight: 700, fontFamily: FONT_MONO, color: GOLD_LIGHT },
  checkoutBtn: { width: '100%', padding: '14px 0', backgroundColor: GOLD, color: NAVY, border: `2px solid ${GOLD}`, borderRadius: 0, fontSize: 13, fontWeight: 700, fontFamily: FONT_BODY, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },

  // Checkout
  checkoutWrap: { maxWidth: 520, margin: '0 auto', padding: 32, fontFamily: FONT_BODY },
  stepRow: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 },
  stepDiamond: { width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: FONT_MONO, transform: 'rotate(45deg)', border: `2px solid ${GOLD}` },
  stepDiamondText: { transform: 'rotate(-45deg)', display: 'block' },
  stepLabel: { fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontFamily: FONT_BODY },
  stepLine: { width: 40, height: 1, backgroundColor: GOLD, marginLeft: 4, alignSelf: 'center' as const },
  formTitle: { margin: '0 0 20px 0', fontSize: 20, fontWeight: 700, fontFamily: FONT_DISPLAY, color: TEXT, letterSpacing: '0.04em' },
  label: { display: 'block', fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, fontFamily: FONT_BODY, textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
  input: { width: '100%', padding: '10px 12px', border: `1px solid ${GOLD}`, borderRadius: 0, fontSize: 14, fontFamily: FONT_BODY, color: TEXT, outline: 'none', boxSizing: 'border-box' as const, background: CREAM },
  orderBox: { padding: 14, backgroundColor: CREAM, border: `2px solid ${GOLD}`, fontSize: 14, color: TEXT, fontFamily: FONT_DISPLAY, letterSpacing: '0.02em' },
  navRow: { display: 'flex', justifyContent: 'space-between', marginTop: 24 },
  backBtn: { padding: '10px 24px', backgroundColor: 'transparent', color: TEXT, border: `2px solid ${GOLD}`, borderRadius: 0, fontSize: 13, fontWeight: 600, fontFamily: FONT_BODY, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
  nextBtn: { padding: '10px 24px', backgroundColor: GOLD, color: CREAM, border: `2px solid ${GOLD}`, borderRadius: 0, fontSize: 13, fontWeight: 600, fontFamily: FONT_BODY, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
  confirmWrap: { textAlign: 'center' as const, padding: '32px 0' },
  confirmIcon: { width: 56, height: 56, border: `2px solid ${GOLD}`, transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 24, fontFamily: FONT_MONO, background: GOLD, color: CREAM },
  confirmTitle: { margin: '0 0 8px 0', fontSize: 22, fontWeight: 700, fontFamily: FONT_DISPLAY, color: TEXT, letterSpacing: '0.04em' },
  confirmText: { margin: '0 0 8px 0', fontSize: 14, color: TEXT_SEC, fontFamily: FONT_BODY },
  confirmTotal: { margin: '0 0 24px 0', fontSize: 18, fontWeight: 700, fontFamily: FONT_MONO, color: GOLD },
  continueBtn: { padding: '12px 28px', backgroundColor: GOLD, color: CREAM, border: `2px solid ${GOLD}`, borderRadius: 0, fontSize: 13, fontWeight: 600, fontFamily: FONT_BODY, cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
};

// Art Deco focus style — warm gold inner glow
const focusBoxShadow = `inset 0 0 0 2px ${GOLD_LIGHT}`;

// ── Component ────────────────────────────────────────────────────────

export default function ArtDecoEcommerce() {
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
        <h1 style={s.logo}><Diamond size={6} /> ART DECO STORE <Diamond size={6} /></h1>
        <button data-testid="cart-toggle" onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={s.cartBtn}>
          CART
          {itemCount > 0 && <span data-testid="cart-count" style={s.cartBadge}>{itemCount}</span>}
        </button>
      </header>

      {/* Main */}
      <main>
        {step !== null ? (
          <div data-section="checkout" style={s.checkoutWrap}>
            {/* Step indicators — gold diamonds */}
            <div style={s.stepRow}>
              {stepLabels.map((label, i) => {
                const num = (i + 1) as 1 | 2 | 3;
                const active = num === step;
                const done = num < step;
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ ...s.stepDiamond, backgroundColor: active || done ? GOLD : 'transparent', color: active || done ? CREAM : TEXT }}>
                      <span style={s.stepDiamondText}>{done ? '\u2713' : num}</span>
                    </div>
                    <span style={{ ...s.stepLabel, fontWeight: active ? 700 : 400, color: active ? TEXT : TEXT_SEC }}>{label}</span>
                    {i < stepLabels.length - 1 && <div style={{ ...s.stepLine, backgroundColor: done ? GOLD : '#D6D3D1' }} />}
                  </div>
                );
              })}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div data-testid="checkout-step-1">
                <h3 style={s.formTitle}>Shipping Information</h3>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="artdeco-name" style={s.label}>Full Name</label>
                  <input id="artdeco-name" type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} placeholder="John Doe" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label htmlFor="artdeco-address" style={s.label}>Address</label>
                  <input id="artdeco-address" type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="123 Main St, City, State 12345" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div data-testid="checkout-step-2">
                <h3 style={s.formTitle}>Payment Details</h3>
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="artdeco-card" style={s.label}>Card Number</label>
                  <input id="artdeco-card" type="text" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label htmlFor="artdeco-expiry" style={s.label}>Expiry Date</label>
                  <input id="artdeco-expiry" type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={s.orderBox}>Order Total: <strong>${cartTotal.toFixed(2)}</strong></div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}><span style={{ transform: 'rotate(-45deg)' }}>{'\u2713'}</span></div>
                <h3 style={s.confirmTitle}>Order Confirmed</h3>
                <p style={s.confirmText}>Your order is being prepared with care.</p>
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
                <div style={s.cardInner}>
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
                      onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = CREAM; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = GOLD; }}
                    >
                      Add to Cart
                    </button>
                  </div>
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
            <p style={s.drawerEmpty}>Your cart is empty</p>
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
