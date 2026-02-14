#!/bin/bash
# tests/test_3screen_nav.sh — Verify 3-screen SPA navigation
# Screen 1: LensPicker → Screen 2: GalleryHub → Screen 3: Archetype page
set +e

BASE_URL="${BASE_URL:-http://localhost:5173}"
PASS=0
FAIL=0
TESTS=()

log_pass() { echo "  [PASS] $1"; PASS=$((PASS+1)); TESTS+=("PASS: $1"); }
log_fail() { echo "  [FAIL] $1"; FAIL=$((FAIL+1)); TESTS+=("FAIL: $1"); }

cleanup() {
    agent-browser close 2>/dev/null || true
}
trap cleanup EXIT

echo "============================================"
echo "  3-Screen Navigation E2E Tests"
echo "============================================"
echo ""

# Prereq: server running
if curl -sf "$BASE_URL" > /dev/null 2>&1; then
    log_pass "Server is running"
else
    log_fail "Server not running"
    exit 1
fi

# ============================================================
# SCREEN 1: LensPicker
# ============================================================
echo ""
echo "--- Screen 1: LensPicker ---"

agent-browser open "$BASE_URL" 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "home" ] && log_pass "Root shows home view" || log_fail "Root view is '$VIEW', expected 'home'"

SNAP=$(agent-browser snapshot -c 2>/dev/null)
echo "$SNAP" | grep -qi "SLAP" && log_pass "LensPicker renders SLAP title" || log_fail "LensPicker missing SLAP title"

HAS_LENS=$(agent-browser eval "!!document.querySelector('[data-testid=\"lens-editorial\"]')" 2>/dev/null)
[ "$HAS_LENS" = "true" ] && log_pass "Editorial lens column exists" || log_fail "Editorial lens column missing"

HAS_LENS=$(agent-browser eval "!!document.querySelector('[data-testid=\"lens-brutalist\"]')" 2>/dev/null)
[ "$HAS_LENS" = "true" ] && log_pass "Brutalist lens column exists" || log_fail "Brutalist lens column missing"

# ============================================================
# SCREEN 1 → 2: Click lens → GalleryHub
# ============================================================
echo ""
echo "--- Screen 1 → 2: Lens → Gallery ---"

agent-browser click '[data-testid="lens-minimal"]' 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "gallery" ] && log_pass "Clicked minimal lens → gallery view" || log_fail "View is '$VIEW', expected 'gallery'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "minimal" ] && log_pass "Lens param is 'minimal'" || log_fail "Lens param is '$LENS', expected 'minimal'"

HAS_HUB=$(agent-browser eval "!!document.querySelector('[data-testid=\"gallery-hub\"]')" 2>/dev/null)
[ "$HAS_HUB" = "true" ] && log_pass "GalleryHub renders" || log_fail "GalleryHub missing"

HAS_GRID=$(agent-browser eval "!!document.querySelector('[data-testid=\"archetype-grid\"]')" 2>/dev/null)
[ "$HAS_GRID" = "true" ] && log_pass "Archetype grid renders" || log_fail "Archetype grid missing"

# Check lens is displayed
SNAP=$(agent-browser snapshot -c 2>/dev/null)
echo "$SNAP" | grep -qi "Minimal" && log_pass "Minimal lens label shown" || log_fail "Minimal lens label missing"

# ============================================================
# SCREEN 2 → 3: Click archetype → Archetype page
# ============================================================
echo ""
echo "--- Screen 2 → 3: Archetype Card → Demo ---"

HAS_CARD=$(agent-browser eval "!!document.querySelector('[data-testid=\"archetype-card-landing-page\"]')" 2>/dev/null)
[ "$HAS_CARD" = "true" ] && log_pass "Landing page card exists" || log_fail "Landing page card missing"

agent-browser click '[data-testid="archetype-card-landing-page"]' 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "landing-page" ] && log_pass "Navigated to landing-page demo" || log_fail "View is '$VIEW', expected 'landing-page'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "minimal" ] && log_pass "Lens param preserved as 'minimal'" || log_fail "Lens param is '$LENS', expected 'minimal'"

HAS_SHELL=$(agent-browser eval "!!document.querySelector('[data-testid=\"demo-shell\"]')" 2>/dev/null)
[ "$HAS_SHELL" = "true" ] && log_pass "DemoShell renders" || log_fail "DemoShell missing"

HAS_NAV=$(agent-browser eval "!!document.querySelector('[data-testid=\"retro-nav-bar\"]')" 2>/dev/null)
[ "$HAS_NAV" = "true" ] && log_pass "RetroNavBar renders" || log_fail "RetroNavBar missing"

# ============================================================
# SCREEN 3 → 2: Back to Gallery (retains lens)
# ============================================================
echo ""
echo "--- Screen 3 → 2: Back to Gallery ---"

agent-browser click '[data-testid="back-to-gallery"]' 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "gallery" ] && log_pass "Back button returns to gallery" || log_fail "View is '$VIEW', expected 'gallery'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "minimal" ] && log_pass "Lens preserved after back nav" || log_fail "Lens is '$LENS', expected 'minimal'"

# ============================================================
# SCREEN 2 → 1: Change Lens (back to LensPicker)
# ============================================================
echo ""
echo "--- Screen 2 → 1: Change Lens ---"

agent-browser click '[data-testid="back-to-lenses"]' 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "home" ] && log_pass "Change Lens returns to home" || log_fail "View is '$VIEW', expected 'home'"

# ============================================================
# Direct URL navigation tests
# ============================================================
echo ""
echo "--- Direct URL Navigation ---"

# Direct to gallery with lens
agent-browser open "${BASE_URL}/#gallery?lens=editorial" 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "gallery" ] && log_pass "Direct #gallery?lens=editorial → gallery" || log_fail "View is '$VIEW'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "editorial" ] && log_pass "Lens is 'editorial' from URL" || log_fail "Lens is '$LENS'"

# Direct to archetype with variation + lens
agent-browser open "${BASE_URL}/#text-heavy/slap?lens=chalkboard" 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "text-heavy" ] && log_pass "Direct #text-heavy/slap?lens=chalkboard works" || log_fail "View is '$VIEW'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "chalkboard" ] && log_pass "Lens is 'chalkboard' from URL" || log_fail "Lens is '$LENS'"

VAR=$(agent-browser eval "window.appState?.variation" 2>/dev/null | tr -d '"')
[ "$VAR" = "slap" ] && log_pass "Variation is 'slap' from URL" || log_fail "Variation is '$VAR'"

# Unknown slug falls back to home
agent-browser open "${BASE_URL}/#/nonexistent" 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "home" ] && log_pass "Unknown slug falls back to home" || log_fail "Unknown slug view is '$VIEW'"

# ============================================================
# VariationFooter back link
# ============================================================
echo ""
echo "--- VariationFooter Back Link ---"

agent-browser open "${BASE_URL}/#landing-page/slap?lens=neutral" 2>/dev/null
sleep 2

HAS_FOOTER=$(agent-browser eval "!!document.querySelector('[data-testid=\"variation-footer\"]')" 2>/dev/null)
[ "$HAS_FOOTER" = "true" ] && log_pass "VariationFooter renders" || log_fail "VariationFooter missing"

# ============================================================
# SUMMARY
# ============================================================
echo ""
echo "============================================"
echo "  Results: $PASS passed, $FAIL failed"
echo "============================================"
for t in "${TESTS[@]}"; do
    echo "  $t"
done

[ "$FAIL" -eq 0 ] && exit 0 || exit 1
