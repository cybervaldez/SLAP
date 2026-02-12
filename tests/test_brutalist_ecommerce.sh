#!/bin/bash
# ============================================================================
# E2E Test: Brutalist E-Commerce UX Polish
# ============================================================================
# Verifies UX improvements to BrutalistEcommerce.tsx
# Usage: BASE_URL=http://localhost:5176 ./tests/test_brutalist_ecommerce.sh
# ============================================================================

set +e

BASE_URL="${BASE_URL:-http://localhost:5176}"
PASS=0
FAIL=0

log_pass() { echo "  [PASS] $1"; PASS=$((PASS + 1)); }
log_fail() { echo "  [FAIL] $1"; FAIL=$((FAIL + 1)); }
log_info() { echo "  [INFO] $1"; }

cleanup() {
    agent-browser close 2>/dev/null || true
}
trap cleanup EXIT

echo "============================================"
echo "  Brutalist E-Commerce UX Polish Tests"
echo "============================================"
echo ""

# ── PREREQ ────────────────────────────────────────────────────────────

log_info "Checking server at $BASE_URL..."
for i in $(seq 1 10); do
    curl -sf "$BASE_URL/" > /dev/null 2>&1 && break
    sleep 1
done
if ! curl -sf "$BASE_URL/" > /dev/null 2>&1; then
    log_fail "Server not running at $BASE_URL"
    echo ""
    echo "RESULTS: 0 passed, 1 failed"
    exit 1
fi
log_pass "Server is running"

# Navigate to brutalist e-commerce
agent-browser open "${BASE_URL}/#/e-commerce/brutalist" 2>/dev/null
sleep 3

# ── TEST 1: Rating format is monospace fraction (not stars) ───────────

echo ""
log_info "TEST 1: Rating format is monospace fraction"

SNAPSHOT=$(agent-browser snapshot -c 2>/dev/null)
echo "$SNAPSHOT" | grep -q "5/5" && log_pass "Rating fraction '5/5' found" || log_fail "Rating fraction '5/5' not found"
echo "$SNAPSHOT" | grep -q "4/5" && log_pass "Rating fraction '4/5' found" || log_fail "Rating fraction '4/5' not found"
echo "$SNAPSHOT" | grep -q "3/5" && log_pass "Rating fraction '3/5' found" || log_fail "Rating fraction '3/5' not found"

# ── TEST 2: Bold category text in image placeholders ──────────────────

echo ""
log_info "TEST 2: Bold category text in image placeholders"

FONT_SIZE=$(agent-browser eval 'document.querySelector("[data-testid=product-card-prod-1] > div").style.fontSize' 2>/dev/null | tr -d '"')
if [ "$FONT_SIZE" = "42px" ]; then
    log_pass "Category text fontSize is 42px"
else
    log_fail "Category text fontSize is '$FONT_SIZE', expected '42px'"
fi

# ── TEST 3: Grid gap ──────────────────────────────────────────────────

echo ""
log_info "TEST 3: Grid gap between cards"

GAP=$(agent-browser eval 'document.querySelector("[data-testid=e-commerce-demo] main > div").style.gap' 2>/dev/null | tr -d '"')
if [ "$GAP" = "3px" ]; then
    log_pass "Grid gap is 3px"
else
    log_fail "Grid gap is '$GAP', expected '3px'"
fi

# ── TEST 4: aria-label on ratings ─────────────────────────────────────

echo ""
log_info "TEST 4: aria-label on rating elements"

ARIA=$(agent-browser eval 'document.querySelector("[data-testid=product-card-prod-1] [aria-label]")?.getAttribute("aria-label") || "none"' 2>/dev/null | tr -d '"')
if [ "$ARIA" = "5 out of 5" ]; then
    log_pass "aria-label is '5 out of 5'"
else
    log_fail "aria-label is '$ARIA', expected '5 out of 5'"
fi

# ── TEST 5: Add to cart and verify cart title ─────────────────────────

echo ""
log_info "TEST 5: Add to cart + cart title shows total quantity"

# Add same item 3 times — click add, close drawer via close button, repeat
agent-browser click '[data-testid="add-to-cart-prod-1"]' 2>/dev/null
sleep 0.5
# Close drawer via its close button (aria-label="Close cart")
agent-browser click '[aria-label="Close cart"]' 2>/dev/null
sleep 0.3
agent-browser click '[data-testid="add-to-cart-prod-1"]' 2>/dev/null
sleep 0.5
agent-browser click '[aria-label="Close cart"]' 2>/dev/null
sleep 0.3
agent-browser click '[data-testid="add-to-cart-prod-1"]' 2>/dev/null
sleep 1

CART_SNAP=$(agent-browser snapshot -c 2>/dev/null)
if echo "$CART_SNAP" | grep -q "3 Items"; then
    log_pass "Cart title shows '3 Items' (total quantity)"
else
    log_fail "Cart title doesn't show total quantity"
fi

# ── TEST 6: Qty buttons size ─────────────────────────────────────────

echo ""
log_info "TEST 6: Quantity buttons are 40x40px"

QTY_W=$(agent-browser eval 'Array.from(document.querySelectorAll("[data-testid=cart-drawer] button")).find(b => b.textContent === "-")?.style.width || "none"' 2>/dev/null | tr -d '"')
QTY_H=$(agent-browser eval 'Array.from(document.querySelectorAll("[data-testid=cart-drawer] button")).find(b => b.textContent === "-")?.style.height || "none"' 2>/dev/null | tr -d '"')

if [ "$QTY_W" = "40px" ] && [ "$QTY_H" = "40px" ]; then
    log_pass "Qty buttons are 40x40px"
else
    log_fail "Qty button size is ${QTY_W}x${QTY_H}, expected 40px x 40px"
fi

# ── TEST 7: Remove button has border ──────────────────────────────────

echo ""
log_info "TEST 7: Remove button has visible 3px border"

REM_BORDER=$(agent-browser eval 'document.querySelector("[data-testid=remove-item-prod-1]")?.style.border || "none"' 2>/dev/null | tr -d '"')
if echo "$REM_BORDER" | grep -q "3px"; then
    log_pass "Remove button has 3px border"
else
    log_fail "Remove button border is '$REM_BORDER', expected 3px solid"
fi

# ── TEST 8: Checkout — label-input association ────────────────────────

echo ""
log_info "TEST 8: Checkout label-input association"

agent-browser click '[data-testid="checkout-btn"]' 2>/dev/null
sleep 1

ASSOC=$(agent-browser eval '(document.querySelector("label[for=brutalist-name]") && document.getElementById("brutalist-name")) ? "yes" : "no"' 2>/dev/null | tr -d '"')
if [ "$ASSOC" = "yes" ]; then
    log_pass "Name label associated with input (htmlFor/id)"
else
    log_fail "Name label not associated"
fi

ASSOC2=$(agent-browser eval '(document.querySelector("label[for=brutalist-address]") && document.getElementById("brutalist-address")) ? "yes" : "no"' 2>/dev/null | tr -d '"')
if [ "$ASSOC2" = "yes" ]; then
    log_pass "Address label associated with input (htmlFor/id)"
else
    log_fail "Address label not associated"
fi

# ── TEST 9: Focus indicator (red inner glow) ─────────────────────────

echo ""
log_info "TEST 9: Focus indicator on inputs"

agent-browser eval 'document.getElementById("brutalist-name").focus()' 2>/dev/null
sleep 0.5

SHADOW=$(agent-browser eval 'document.getElementById("brutalist-name")?.style.boxShadow || "none"' 2>/dev/null | tr -d '"')
if echo "$SHADOW" | grep -qi "red\|ff0000\|255, 0, 0"; then
    log_pass "Focus shows red inner boxShadow"
elif echo "$SHADOW" | grep -qi "inset\|3px"; then
    log_pass "Focus shows inner boxShadow"
else
    log_fail "Focus boxShadow is '$SHADOW', expected red inner glow"
fi

# ── TEST 10: Payment step labels ──────────────────────────────────────

echo ""
log_info "TEST 10: Step 2 (Payment) label-input association"

agent-browser click '[data-testid="checkout-next"]' 2>/dev/null
sleep 0.5

ASSOC3=$(agent-browser eval '(document.querySelector("label[for=brutalist-card]") && document.getElementById("brutalist-card")) ? "yes" : "no"' 2>/dev/null | tr -d '"')
if [ "$ASSOC3" = "yes" ]; then
    log_pass "Card label associated with input"
else
    log_fail "Card label not associated"
fi

ASSOC4=$(agent-browser eval '(document.querySelector("label[for=brutalist-expiry]") && document.getElementById("brutalist-expiry")) ? "yes" : "no"' 2>/dev/null | tr -d '"')
if [ "$ASSOC4" = "yes" ]; then
    log_pass "Expiry label associated with input"
else
    log_fail "Expiry label not associated"
fi

# ── TEST 11: Full checkout flow ───────────────────────────────────────

echo ""
log_info "TEST 11: Full checkout flow (consolidated state)"

# Step 2 → Step 3 (Place Order)
agent-browser click '[data-testid="checkout-next"]' 2>/dev/null
sleep 0.5

STEP3=$(agent-browser eval 'document.querySelector("[data-testid=checkout-step-3]") ? "yes" : "no"' 2>/dev/null | tr -d '"')
if [ "$STEP3" = "yes" ]; then
    log_pass "Step 3 (confirmation) renders"
else
    log_fail "Step 3 not found"
fi

# Complete checkout → back to products
SNAP3=$(agent-browser snapshot -c 2>/dev/null)
if echo "$SNAP3" | grep -q "Continue Shopping"; then
    log_pass "Continue Shopping button visible"
else
    log_fail "Continue Shopping button not found"
fi

# Find and click the Continue Shopping button
agent-browser eval 'document.querySelector("[data-testid=checkout-step-3] button").click()' 2>/dev/null
sleep 1

PRODS=$(agent-browser eval 'document.querySelector("[data-testid=product-card-prod-1]") ? "yes" : "no"' 2>/dev/null | tr -d '"')
if [ "$PRODS" = "yes" ]; then
    log_pass "Back to product grid after checkout"
else
    log_fail "Product grid not shown after checkout"
fi

# ── SUMMARY ───────────────────────────────────────────────────────────

echo ""
echo "============================================"
echo "  RESULTS: $PASS passed, $FAIL failed"
echo "============================================"

if [ "$FAIL" -gt 0 ]; then
    exit 1
else
    exit 0
fi
