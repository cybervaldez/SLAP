#!/bin/bash
# tests/test_homepage_nav.sh — Verify 2-screen SPA navigation
# Screen 1: Homepage (columns → scrollytelling) → Screen 2: Archetype page
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
echo "  2-Screen Homepage Navigation E2E Tests"
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
# SCREEN 1: Homepage — Columns Phase
# ============================================================
echo ""
echo "--- Screen 1: Homepage Columns ---"

agent-browser open "$BASE_URL" 2>/dev/null
sleep 1.5

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "home" ] && log_pass "Root shows home view" || log_fail "Root view is '$VIEW', expected 'home'"

# Check columns exist
HAS_ED=$(agent-browser eval "!!document.querySelector('[data-testid=\"column-editorial\"]')" 2>/dev/null)
[ "$HAS_ED" = "true" ] && log_pass "Editorial column exists" || log_fail "Editorial column missing"

HAS_BR=$(agent-browser eval "!!document.querySelector('[data-testid=\"column-brutalist\"]')" 2>/dev/null)
[ "$HAS_BR" = "true" ] && log_pass "Brutalist column exists" || log_fail "Brutalist column missing"

HAS_CH=$(agent-browser eval "!!document.querySelector('[data-testid=\"column-chalkboard\"]')" 2>/dev/null)
[ "$HAS_CH" = "true" ] && log_pass "Chalkboard column exists" || log_fail "Chalkboard column missing"

# Column renders avatar image
HAS_AVATAR=$(agent-browser eval "!!document.querySelector('[data-testid=\"column-avatar-editorial\"]')" 2>/dev/null)
[ "$HAS_AVATAR" = "true" ] && log_pass "Column renders avatar image" || log_fail "Column avatar missing"

# Column renders SLAP! text
HAS_SLAP=$(agent-browser eval "!!document.querySelector('[data-testid=\"column-slap-editorial\"]')" 2>/dev/null)
[ "$HAS_SLAP" = "true" ] && log_pass "Column renders SLAP! text" || log_fail "Column SLAP! text missing"

# Bottom tagline visible in columns phase
HAS_TAGLINE=$(agent-browser eval "!!document.querySelector('[data-testid=\"columns-tagline\"]')" 2>/dev/null)
[ "$HAS_TAGLINE" = "true" ] && log_pass "Bottom tagline visible in columns phase" || log_fail "Bottom tagline missing"

# ============================================================
# SCREEN 1: Click column → Scrollytelling Page Phase
# ============================================================
echo ""
echo "--- Columns → Scrollytelling ---"

agent-browser click '[data-testid="column-minimal"]' 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "scrollytelling" ] && log_pass "Clicked minimal → scrollytelling view" || log_fail "View is '$VIEW', expected 'scrollytelling'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "minimal" ] && log_pass "Lens is 'minimal'" || log_fail "Lens is '$LENS', expected 'minimal'"

HASH=$(agent-browser eval "window.location.hash" 2>/dev/null | tr -d '"')
[ "$HASH" = "#minimal" ] && log_pass "URL hash is #minimal" || log_fail "URL hash is '$HASH', expected '#minimal'"

# Check scrollytelling sections
HAS_HERO=$(agent-browser eval "!!document.querySelector('[data-testid=\"section-hero\"]')" 2>/dev/null)
[ "$HAS_HERO" = "true" ] && log_pass "Hero section renders" || log_fail "Hero section missing"

HAS_ARCH=$(agent-browser eval "!!document.querySelector('[data-testid=\"section-archetypes\"]')" 2>/dev/null)
[ "$HAS_ARCH" = "true" ] && log_pass "Archetypes section renders" || log_fail "Archetypes section missing"

HAS_PROOF=$(agent-browser eval "!!document.querySelector('[data-testid=\"section-proof\"]')" 2>/dev/null)
[ "$HAS_PROOF" = "true" ] && log_pass "Proof section renders" || log_fail "Proof section missing"

# ============================================================
# SCREEN 1 → 2: Click archetype card → Archetype page
# ============================================================
echo ""
echo "--- Scrollytelling → Archetype Page ---"

HAS_CARD=$(agent-browser eval "!!document.querySelector('[data-testid=\"archetype-card-landing-page\"]')" 2>/dev/null)
[ "$HAS_CARD" = "true" ] && log_pass "Landing page card exists" || log_fail "Landing page card missing"

agent-browser click '[data-testid="archetype-card-landing-page"]' 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "landing-page" ] && log_pass "Navigated to landing-page demo" || log_fail "View is '$VIEW', expected 'landing-page'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "minimal" ] && log_pass "Lens preserved as 'minimal'" || log_fail "Lens is '$LENS', expected 'minimal'"

HASH=$(agent-browser eval "window.location.hash" 2>/dev/null | tr -d '"')
echo "$HASH" | grep -q "^#minimal/landing-page" && log_pass "URL has #minimal/landing-page" || log_fail "URL hash is '$HASH'"

HAS_SHELL=$(agent-browser eval "!!document.querySelector('[data-testid=\"demo-shell\"]')" 2>/dev/null)
[ "$HAS_SHELL" = "true" ] && log_pass "DemoShell renders" || log_fail "DemoShell missing"

HAS_NAV=$(agent-browser eval "!!document.querySelector('[data-testid=\"retro-nav-bar\"]')" 2>/dev/null)
[ "$HAS_NAV" = "true" ] && log_pass "RetroNavBar renders" || log_fail "RetroNavBar missing"

# Archetype page: no three-act overlay present
NO_ACT1=$(agent-browser eval "!document.querySelector('[data-testid=\"three-act-act1\"]')" 2>/dev/null)
[ "$NO_ACT1" = "true" ] && log_pass "No three-act overlay present" || log_fail "Three-act overlay still present"

# Archetype page: scroll hint visible on SLAP variation
HAS_HINT=$(agent-browser eval "!!document.querySelector('[data-testid=\"scroll-hint\"]')" 2>/dev/null)
[ "$HAS_HINT" = "true" ] && log_pass "Scroll hint visible on SLAP variation" || log_fail "Scroll hint missing"

# ============================================================
# SCREEN 2 → 1: Back to Scrollytelling (retains lens)
# ============================================================
echo ""
echo "--- Back to Scrollytelling ---"

agent-browser click '[data-testid="back-to-gallery"]' 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "scrollytelling" ] && log_pass "Back button returns to scrollytelling" || log_fail "View is '$VIEW', expected 'scrollytelling'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "minimal" ] && log_pass "Lens preserved after back nav" || log_fail "Lens is '$LENS', expected 'minimal'"

HASH=$(agent-browser eval "window.location.hash" 2>/dev/null | tr -d '"')
[ "$HASH" = "#minimal" ] && log_pass "URL hash restored to #minimal" || log_fail "URL hash is '$HASH'"

# ============================================================
# Back to Columns
# ============================================================
echo ""
echo "--- Back to Columns ---"

agent-browser click '[data-testid="back-to-columns-float"]' 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "home" ] && log_pass "Back to columns returns to home" || log_fail "View is '$VIEW', expected 'home'"

HASH=$(agent-browser eval "window.location.hash" 2>/dev/null | tr -d '"')
([ "$HASH" = "#" ] || [ "$HASH" = "" ]) && log_pass "URL hash cleared" || log_fail "URL hash is '$HASH'"

# ============================================================
# Direct URL navigation tests
# ============================================================
echo ""
echo "--- Direct URL Navigation ---"

# Direct to scrollytelling with lens
agent-browser open "${BASE_URL}/#editorial" 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "scrollytelling" ] && log_pass "Direct #editorial → scrollytelling" || log_fail "View is '$VIEW', expected 'scrollytelling'"

LENS=$(agent-browser eval "window.appState?.lens" 2>/dev/null | tr -d '"')
[ "$LENS" = "editorial" ] && log_pass "Lens is 'editorial' from URL" || log_fail "Lens is '$LENS'"

# Direct to archetype with variation + lens
agent-browser open "${BASE_URL}/#chalkboard/text-heavy/slap" 2>/dev/null
sleep 2

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null | tr -d '"')
[ "$VIEW" = "text-heavy" ] && log_pass "Direct #chalkboard/text-heavy/slap works" || log_fail "View is '$VIEW'"

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
# VariationFooter renders on archetype page
# ============================================================
echo ""
echo "--- VariationFooter & VariationBar ---"

agent-browser open "${BASE_URL}/#neutral/landing-page/slap" 2>/dev/null
sleep 2

HAS_FOOTER=$(agent-browser eval "!!document.querySelector('[data-testid=\"variation-footer\"]')" 2>/dev/null)
[ "$HAS_FOOTER" = "true" ] && log_pass "VariationFooter renders" || log_fail "VariationFooter missing"

# Test footer back link
HAS_BACK=$(agent-browser eval "!!document.querySelector('[data-testid=\"footer-back-gallery\"]')" 2>/dev/null)
[ "$HAS_BACK" = "true" ] && log_pass "Footer back link exists" || log_fail "Footer back link missing"

# Variation bar should not be visible yet (before first wipe)
NO_BAR=$(agent-browser eval "!document.querySelector('[data-testid=\"variation-bar\"]')" 2>/dev/null)
[ "$NO_BAR" = "true" ] && log_pass "Variation bar hidden before first wipe" || log_fail "Variation bar visible too early"

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
