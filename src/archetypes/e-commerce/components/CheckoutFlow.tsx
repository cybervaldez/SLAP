import React, { useState } from 'react';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#EF4444';

interface CheckoutFlowProps {
  cartTotal: number;
  onComplete: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #D1D5DB',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: FONT_FAMILY,
  color: '#111827',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
  fontFamily: FONT_FAMILY,
};

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ cartTotal, onComplete }) => {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ name: '', address: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '' });

  const stepLabels = ['Shipping', 'Payment', 'Confirmation'];

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: 32,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Step indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 32,
        }}
      >
        {stepLabels.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === step;
          const isCompleted = stepNum < step;
          return (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: FONT_FAMILY,
                  backgroundColor: isActive || isCompleted ? ACCENT : '#E5E7EB',
                  color: isActive || isCompleted ? '#FFFFFF' : '#6B7280',
                }}
              >
                {isCompleted ? '\u2713' : stepNum}
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#111827' : '#6B7280',
                  fontFamily: FONT_FAMILY,
                }}
              >
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <div
                  style={{
                    width: 40,
                    height: 2,
                    backgroundColor: isCompleted ? ACCENT : '#E5E7EB',
                    marginLeft: 4,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Shipping */}
      {step === 1 && (
        <div data-testid="checkout-step-1">
          <h3
            style={{
              margin: '0 0 20px 0',
              fontSize: 20,
              fontWeight: 700,
              color: '#111827',
              fontFamily: FONT_FAMILY,
            }}
          >
            Shipping Information
          </h3>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={shipping.name}
              onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
              placeholder="John Doe"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Shipping Address</label>
            <input
              type="text"
              value={shipping.address}
              onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              placeholder="123 Main St, City, State 12345"
              style={inputStyle}
            />
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div data-testid="checkout-step-2">
          <h3
            style={{
              margin: '0 0 20px 0',
              fontSize: 20,
              fontWeight: 700,
              color: '#111827',
              fontFamily: FONT_FAMILY,
            }}
          >
            Payment Details
          </h3>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Card Number</label>
            <input
              type="text"
              value={payment.cardNumber}
              onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
              placeholder="4242 4242 4242 4242"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Expiry Date</label>
            <input
              type="text"
              value={payment.expiry}
              onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
              placeholder="MM/YY"
              style={inputStyle}
            />
          </div>
          <div
            style={{
              padding: 12,
              backgroundColor: '#FEF2F2',
              borderRadius: 8,
              fontSize: 13,
              color: '#991B1B',
              fontFamily: FONT_FAMILY,
            }}
          >
            Order Total: <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div
          data-testid="checkout-step-3"
          style={{ textAlign: 'center', padding: '32px 0' }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#DEF7EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: 28,
            }}
          >
            \u2713
          </div>
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: 24,
              fontWeight: 700,
              color: '#111827',
              fontFamily: FONT_FAMILY,
            }}
          >
            Order confirmed!
          </h3>
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: 14,
              color: '#6B7280',
              fontFamily: FONT_FAMILY,
            }}
          >
            Thank you for your purchase. Your order is being processed.
          </p>
          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: 16,
              fontWeight: 600,
              color: '#111827',
              fontFamily: FONT_FAMILY,
            }}
          >
            Total charged: ${cartTotal.toFixed(2)}
          </p>
          <button
            onClick={onComplete}
            style={{
              padding: '10px 24px',
              backgroundColor: ACCENT,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT_FAMILY,
              cursor: 'pointer',
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Navigation buttons */}
      {step < 3 && (
        <div
          style={{
            display: 'flex',
            justifyContent: step > 1 ? 'space-between' : 'flex-end',
            marginTop: 24,
          }}
        >
          {step > 1 && (
            <button
              data-testid="checkout-back"
              onClick={() => setStep(step - 1)}
              style={{
                padding: '10px 24px',
                backgroundColor: '#FFFFFF',
                color: '#374151',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: FONT_FAMILY,
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          )}
          <button
            data-testid="checkout-next"
            onClick={() => setStep(step + 1)}
            style={{
              padding: '10px 24px',
              backgroundColor: ACCENT,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT_FAMILY,
              cursor: 'pointer',
            }}
          >
            {step === 2 ? 'Place Order' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutFlow;
