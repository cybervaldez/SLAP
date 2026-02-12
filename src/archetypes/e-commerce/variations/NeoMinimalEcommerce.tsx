import React, { useReducer, useState, useCallback } from 'react';
import { products, categoryColors } from '../data';
import type { Product } from '../data';

// ── Design Tokens ────────────────────────────────────────────────────

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const BG = '#FAFAFA';
const TEXT = '#18181B';
const ACCENT = '#2563EB';
const BORDER = '#E5E7EB';
const LIGHT_GRAY = '#D1D5DB';
const MUTED = '#71717A';

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
  page: { fontFamily: FONT, background: BG, color: TEXT, minHeight: '100%', position: 'relative', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px', borderBottom: `1px solid ${BORDER}`, position: 'sticky', top: 0, zIndex: 30, background: BG },
  logo: { margin: 0, fontSize: 24, fontWeight: 200, letterSpacing: '-0.02em', fontFamily: FONT, color: TEXT },
  cartBtn: { position: 'relative', background: 'none', border: 'none', borderRadius: 12, padding: '8px 16px', cursor: 'pointer', fontFamily: FONT, fontSize: 14, fontWeight: 300, color: MUTED, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.01em' },
  cartBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: ACCENT, color: '#FFFFFF', fontSize: 10, fontWeight: 600, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 40, padding: '40px 40px 56px 40px' },
  card: { borderRadius: 0, display: 'flex', flexDirection: 'column' as const, background: 'transparent', borderBottom: `1px solid ${BORDER}`, paddingBottom: 24 },
  cardImage: { width: '100%', height: 180, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 200, fontFamily: FONT, letterSpacing: '0.04em', marginBottom: 20, color: '#FFFFFF' },
  cardBody: { padding: '0 4px', display: 'flex', flexDirection: 'column' as const, flex: 1 },
  cardName: { margin: '0 0 6px 0', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT, color: TEXT },
  cardDesc: { margin: '0 0 12px 0', fontSize: 13, fontWeight: 300, color: MUTED, lineHeight: 1.6, fontFamily: FONT, flex: 1 },
  cardPrice: { fontSize: 18, fontWeight: 600, fontFamily: FONT, color: TEXT, marginBottom: 12, letterSpacing: '-0.04em' },
  addBtn: { width: '100%', padding: '10px 0', background: 'transparent', color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 12, fontSize: 13, fontWeight: 600, letterSpacing: '0.01em', cursor: 'pointer', fontFamily: FONT, transition: 'background 0.2s, color 0.2s' },
  stars: { fontSize: 13, letterSpacing: 3, marginBottom: 8, fontFamily: FONT, display: 'flex', gap: 1 },

  // Cart drawer
  backdrop: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.12)', zIndex: 40 },
  drawer: { position: 'absolute', top: 0, right: 0, bottom: 0, width: 380, maxWidth: '100%', backgroundColor: '#FFFFFF', color: TEXT, zIndex: 50, display: 'flex', flexDirection: 'column' as const, fontFamily: FONT, transition: 'transform 0.3s ease', borderLeft: `1px solid ${BORDER}`, borderTop: `2px solid ${ACCENT}` },
  drawerHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', borderBottom: `1px solid ${BORDER}` },
  drawerTitle: { margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT, color: TEXT },
  drawerClose: { background: 'none', border: 'none', color: MUTED, fontSize: 18, fontWeight: 200, cursor: 'pointer', padding: '4px 8px', fontFamily: FONT, borderRadius: 8 },
  drawerItems: { flex: 1, overflowY: 'auto' as const, padding: '24px 28px' },
  drawerEmpty: { textAlign: 'center' as const, color: LIGHT_GRAY, fontSize: 14, fontWeight: 300, marginTop: 48, fontFamily: FONT },
  drawerItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20, marginBottom: 20, borderBottom: `1px solid ${BORDER}` },
  drawerItemName: { fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 4, fontFamily: FONT },
  drawerItemPrice: { fontSize: 14, fontWeight: 300, color: MUTED, fontFamily: FONT, marginBottom: 10, letterSpacing: '-0.04em' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 10 },
  qtyBtn: { width: 44, height: 44, border: `1px solid ${BORDER}`, background: 'transparent', color: TEXT, fontSize: 14, fontWeight: 300, cursor: 'pointer', fontFamily: FONT, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyVal: { fontSize: 14, fontWeight: 600, fontFamily: FONT, color: TEXT, minWidth: 20, textAlign: 'center' as const },
  removeBtn: { background: 'none', border: 'none', color: MUTED, fontSize: 12, cursor: 'pointer', fontFamily: FONT, fontWeight: 300, letterSpacing: '0.01em', padding: 0 },
  drawerFooter: { padding: '20px 28px', borderTop: `1px solid ${BORDER}` },
  drawerTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalLabel: { fontSize: 14, fontWeight: 300, letterSpacing: '0.01em', fontFamily: FONT, color: MUTED },
  totalValue: { fontSize: 18, fontWeight: 600, fontFamily: FONT, color: TEXT, letterSpacing: '-0.04em' },
  checkoutBtn: { width: '100%', padding: '14px 0', backgroundColor: ACCENT, color: '#FFFFFF', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: 'pointer', letterSpacing: '0.01em' },

  // Checkout
  checkoutWrap: { maxWidth: 480, margin: '0 auto', padding: '48px 32px', fontFamily: FONT },
  stepRow: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48 },
  stepCircle: { width: 32, height: 32, border: `1px solid ${BORDER}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, fontFamily: FONT },
  stepLabel: { fontSize: 13, fontWeight: 300, letterSpacing: '0.01em', fontFamily: FONT },
  stepLine: { width: 40, height: 1, backgroundColor: BORDER, marginLeft: 4, alignSelf: 'center' as const },
  formTitle: { margin: '0 0 28px 0', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', fontFamily: FONT, color: TEXT },
  label: { display: 'block', fontSize: 12, fontWeight: 300, color: MUTED, marginBottom: 8, fontFamily: FONT, letterSpacing: '0.01em' },
  input: { width: '100%', padding: '12px 0', border: 'none', borderBottom: `1px solid ${BORDER}`, borderRadius: 0, fontSize: 15, fontWeight: 300, fontFamily: FONT, color: TEXT, outline: 'none', boxSizing: 'border-box' as const, background: 'transparent' },
  orderBox: { padding: 20, backgroundColor: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 12, fontSize: 14, fontWeight: 300, color: TEXT, fontFamily: FONT },
  navRow: { display: 'flex', justifyContent: 'space-between', marginTop: 36 },
  backBtn: { padding: '10px 24px', backgroundColor: 'transparent', color: MUTED, border: `1px solid ${BORDER}`, borderRadius: 12, fontSize: 14, fontWeight: 300, fontFamily: FONT, cursor: 'pointer', letterSpacing: '0.01em' },
  nextBtn: { padding: '10px 24px', backgroundColor: ACCENT, color: '#FFFFFF', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: 'pointer', letterSpacing: '0.01em' },
  confirmWrap: { textAlign: 'center' as const, padding: '48px 0' },
  confirmIcon: { width: 56, height: 56, border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 24, fontFamily: FONT, background: ACCENT, color: '#FFFFFF' },
  confirmTitle: { margin: '0 0 8px 0', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', fontFamily: FONT, color: TEXT },
  confirmText: { margin: '0 0 8px 0', fontSize: 14, fontWeight: 300, color: MUTED, fontFamily: FONT },
  confirmTotal: { margin: '0 0 32px 0', fontSize: 18, fontWeight: 600, fontFamily: FONT, color: TEXT, letterSpacing: '-0.04em' },
  continueBtn: { padding: '12px 28px', backgroundColor: 'transparent', color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: 'pointer', letterSpacing: '0.01em' },
};

// Neo-minimal focus style — subtle blue ring
const focusBoxShadow = `0 0 0 2px ${ACCENT}`;

// ── SVG Icons (font-independent) ────────────────────────────────────

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = ({ filled, color }: { filled: boolean; color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────

export default function NeoMinimalEcommerce() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [shipping, setShipping] = useState({ name: '', address: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '' });

  const cartItems = Array.from(state.items.values());
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const step = state.checkoutStep;
  const stepLabels = ['Shipping', 'Payment', 'Confirmation'];

  const isStepValid = step === 1
    ? !!(shipping.name.trim() && shipping.address.trim())
    : !!(payment.cardNumber.trim() && payment.expiry.trim());

  const handleFocus = useCallback((e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = focusBoxShadow;
  }, []);
  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = 'none';
  }, []);

  return (
    <div style={s.page} data-testid="e-commerce-demo">
      {/* Header */}
      <header style={s.header}>
        <h1 style={s.logo}>minimal.</h1>
        <button data-testid="cart-toggle" onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={s.cartBtn} onFocus={handleFocus} onBlur={handleBlur}>
          Cart
          {itemCount > 0 && <span data-testid="cart-count" style={s.cartBadge}>{itemCount}</span>}
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
                const active = num === step;
                const done = step !== null && num < step;
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      ...s.stepCircle,
                      backgroundColor: active ? ACCENT : done ? ACCENT : 'transparent',
                      color: active || done ? '#FFFFFF' : MUTED,
                      borderColor: active || done ? ACCENT : BORDER,
                    }}>
                      {done ? <CheckIcon /> : num}
                    </div>
                    <span style={{ ...s.stepLabel, fontWeight: active ? 600 : 300, color: active ? TEXT : MUTED }}>{label}</span>
                    {i < stepLabels.length - 1 && <div style={{ ...s.stepLine, backgroundColor: done ? ACCENT : BORDER }} />}
                  </div>
                );
              })}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div data-testid="checkout-step-1">
                <h3 style={s.formTitle}>Shipping</h3>
                <div style={{ marginBottom: 24 }}>
                  <label style={s.label}>Full Name</label>
                  <input type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} placeholder="John Doe" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={s.label}>Address</label>
                  <input type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="123 Main St, City, State 12345" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div data-testid="checkout-step-2">
                <h3 style={s.formTitle}>Payment</h3>
                <div style={{ marginBottom: 24 }}>
                  <label style={s.label}>Card Number</label>
                  <input type="text" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={s.label}>Expiry</label>
                  <input type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={s.orderBox}>Order total <span style={{ fontWeight: 600, letterSpacing: '-0.04em' }}>${cartTotal.toFixed(2)}</span></div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div data-testid="checkout-step-3" style={s.confirmWrap}>
                <div style={s.confirmIcon}><CheckIcon size={24} /></div>
                <h3 style={s.confirmTitle}>Order confirmed</h3>
                <p style={s.confirmText}>Your order is on its way.</p>
                <p style={s.confirmTotal}>${cartTotal.toFixed(2)}</p>
                <button onClick={() => dispatch({ type: 'COMPLETE_CHECKOUT' })} style={s.continueBtn} onFocus={handleFocus} onBlur={handleBlur}>Continue Shopping</button>
              </div>
            )}

            {/* Nav */}
            {step !== null && step < 3 && (
              <div style={{ ...s.navRow, justifyContent: step > 1 ? 'space-between' : 'flex-end' }}>
                {step > 1 && (
                  <button data-testid="checkout-back" onClick={() => dispatch({ type: 'SET_CHECKOUT_STEP', step: (step - 1) as 1 | 2 | 3 })} style={s.backBtn} onFocus={handleFocus} onBlur={handleBlur}>Back</button>
                )}
                <button
                  data-testid="checkout-next"
                  onClick={() => dispatch({ type: 'SET_CHECKOUT_STEP', step: (step + 1) as 1 | 2 | 3 })}
                  style={{ ...s.nextBtn, ...(isStepValid ? {} : { opacity: 0.4, cursor: 'not-allowed' }) }}
                  disabled={!isStepValid}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  {step === 2 ? 'Place Order' : 'Next'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Product Grid */
          <div data-section="products" style={s.grid}>
            {products.map((product) => {
              const catColor = categoryColors[product.category] || '#999';
              return (
                <div key={product.id} data-testid={`product-card-${product.id}`} style={s.card}>
                  <div style={{ ...s.cardImage, backgroundColor: catColor, opacity: 0.85 }}>{product.category}</div>
                  <div style={s.cardBody}>
                    <h3 style={s.cardName}>{product.name}</h3>
                    <p style={s.cardDesc}>{product.description}</p>
                    <div style={s.stars} aria-label={`${product.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}><StarIcon filled={i < product.rating} color={i < product.rating ? TEXT : LIGHT_GRAY} /></span>
                      ))}
                    </div>
                    <div style={s.cardPrice}>${product.price.toFixed(2)}</div>
                    <button
                      data-testid={`add-to-cart-${product.id}`}
                      onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
                      style={s.addBtn}
                      onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ACCENT; }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {state.isCartOpen && <div style={s.backdrop} onClick={() => dispatch({ type: 'TOGGLE_CART' })} />}
      <div data-testid="cart-drawer" data-section="cart" style={{ ...s.drawer, transform: state.isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div style={s.drawerHeader}>
          <h2 style={s.drawerTitle}>Cart ({cartItems.length})</h2>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={s.drawerClose} aria-label="Close cart" onFocus={handleFocus} onBlur={handleBlur}><CloseIcon /></button>
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
                    <button style={s.qtyBtn} onClick={() => { if (item.quantity > 1) dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity - 1 }); }} onFocus={handleFocus} onBlur={handleBlur}>-</button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button style={s.qtyBtn} onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })} onFocus={handleFocus} onBlur={handleBlur}>+</button>
                  </div>
                </div>
                <button data-testid={`remove-item-${item.product.id}`} onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.product.id })} style={s.removeBtn} onFocus={handleFocus} onBlur={handleBlur}>Remove</button>
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
            <button data-testid="checkout-btn" onClick={() => dispatch({ type: 'START_CHECKOUT' })} style={s.checkoutBtn} onFocus={handleFocus} onBlur={handleBlur}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
