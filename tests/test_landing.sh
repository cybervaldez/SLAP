#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Landing Page
# ═══════════════════════════════════════════════════════════════
# Tests the full landing page: hero, carousel, council bar,
# live preview, bezel/chin, positions, and interactions.
#
# Usage: ./tests/test_landing.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Landing Page E2E Tests"

# ══════════════════════════════════════════════════════════════
# PREREQ: Server check
# ══════════════════════════════════════════════════════════════
log_info "PREREQUISITES"

if wait_for_server "$BASE_URL" 10; then
  log_pass "Dev server running at $BASE_URL"
else
  log_fail "Dev server not running at $BASE_URL"
  echo "  Start with: PORT=$PORT npm run dev"
  print_summary
  exit 1
fi

# Open the page in agent-browser
if open_page "$BASE_URL"; then
  log_pass "Page opened in browser"
else
  log_fail "Failed to open page in browser"
  print_summary
  exit 1
fi

sleep 2  # Let React hydrate + animations settle

# ══════════════════════════════════════════════════════════════
# TEST 1: Page structure
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Page structure"

check_testid "landing-page" "Landing page root element"
check_testid "hero-problem-section" "Hero section present"
check_testid "council-section" "Council section present"
check_testid "slap-flash" "SLAP flash overlay present"

# ══════════════════════════════════════════════════════════════
# TEST 2: Hero section elements
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Hero section elements"

check_testid "hand-left" "Left hand emoji present"
check_testid "hand-right" "Right hand emoji present"
check_testid "slop-card-1" "Slop card 1 (Landing)"
check_testid "slop-card-2" "Slop card 2 (Dashboard)"
check_testid "slop-card-transform" "Slop card 3 (flip card)"

# Hero is visible at load
check_visible "hero-problem-section" "Hero section is visible on load"

# ══════════════════════════════════════════════════════════════
# TEST 3: SLAP interaction (hand click)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: SLAP interaction"

# Click left hand
click_testid "hand-left"
sleep 0.5

# Check flash fired (card should be flipped now)
FLIPPED=$(browser_eval "
  (function() {
    var inner = document.querySelector('[data-testid=\"slop-card-transform\"]');
    if (!inner) return 'missing';
    var flipInner = inner.querySelector('div');
    if (!flipInner) return 'no-inner';
    var t = getComputedStyle(flipInner).transform;
    return t !== 'none' ? 'flipped' : 'not-flipped';
  })()
")
if [ "$FLIPPED" = "flipped" ]; then
  log_pass "Card 3 flipped after slap"
else
  log_fail "Card 3 flip state" "Got: $FLIPPED"
fi

# Whisper text should be visible
WHISPER_VIS=$(browser_eval "
  (function() {
    var ps = document.querySelectorAll('p');
    for (var p of ps) {
      if (p.textContent.includes('AI designs look the same')) {
        return getComputedStyle(p).opacity > 0 ? 'visible' : 'hidden';
      }
    }
    return 'missing';
  })()
")
if [ "$WHISPER_VIS" = "visible" ]; then
  log_pass "Whisper text visible after slap"
else
  log_fail "Whisper text visibility" "Got: $WHISPER_VIS"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Council section — scroll into view
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Council section"

agent-browser scrollintoview "[data-testid='council-section']" 2>/dev/null
sleep 2  # Wait for auto-roll + tab entrance animations

check_testid "filter-tabs" "Filter tabs present"
check_testid "dice-roll" "Dice roll button present"
check_testid "arrow-left" "Left arrow present"
check_testid "arrow-right" "Right arrow present"
check_testid "carousel-stage" "Carousel stage present"
check_testid "carousel-counter" "Counter present"
check_testid "dot-strip" "Dot strip present"

# ══════════════════════════════════════════════════════════════
# TEST 5: Filter tabs (8 categories)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Filter tabs"

TAB_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"filter-tabs\"] button').length")
if [ "$TAB_COUNT" = "8" ]; then
  log_pass "8 filter tabs rendered"
else
  log_fail "Filter tab count" "Expected 8, got $TAB_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Carousel navigation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Carousel navigation"

# Get initial counter
COUNTER_BEFORE=$(browser_eval "document.querySelector('[data-testid=\"carousel-counter\"]')?.textContent?.trim()")

# Click right arrow
click_testid "arrow-right"
sleep 0.5

COUNTER_AFTER=$(browser_eval "document.querySelector('[data-testid=\"carousel-counter\"]')?.textContent?.trim()")

if [ "$COUNTER_BEFORE" != "$COUNTER_AFTER" ]; then
  log_pass "Arrow click changes counter (${COUNTER_BEFORE} → ${COUNTER_AFTER})"
else
  log_fail "Arrow navigation" "Counter unchanged: ${COUNTER_BEFORE}"
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: Add to council
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Add to council"

# Find the toggle button on current card
TOGGLE_BTN=$(browser_eval "
  (function() {
    var btns = document.querySelectorAll('[data-testid^=\"toggle-\"]');
    return btns.length > 0 ? btns[0].dataset.testid : 'none';
  })()
")

if [ "$TOGGLE_BTN" != "none" ]; then
  agent-browser scrollintoview "[data-testid='${TOGGLE_BTN}']" 2>/dev/null
  sleep 0.3
  BTN_BEFORE=$(browser_eval "document.querySelector('[data-testid=\"${TOGGLE_BTN}\"]')?.textContent?.trim()")
  click_testid "$TOGGLE_BTN"
  sleep 0.5
  BTN_AFTER=$(browser_eval "document.querySelector('[data-testid=\"${TOGGLE_BTN}\"]')?.textContent?.trim()")
  if [ "$BTN_BEFORE" != "$BTN_AFTER" ]; then
    log_pass "Toggle button switches after click (${BTN_BEFORE} → ${BTN_AFTER})"
  else
    log_fail "Toggle button text" "Text unchanged after click: $BTN_AFTER"
  fi
else
  log_skip "No toggle button found on current card"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Council bar
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Council bar"

check_testid "council-bar" "Council bar present"
check_testid "reroll-btn" "Reroll button present"
check_testid "keep-council" "Keep & Continue button present"
check_testid "council-bar-avatars" "Avatar container present"

# ══════════════════════════════════════════════════════════════
# TEST 9: Dice roll populates council
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Dice roll"

click_testid "dice-roll"
sleep 1

AVATAR_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"council-bar-avatars\"] > div').length")
if [ "$AVATAR_COUNT" -ge 5 ] 2>/dev/null; then
  log_pass "Dice roll selected ${AVATAR_COUNT} reviewers"
else
  log_fail "Dice roll reviewer count" "Expected 5+, got: $AVATAR_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Live preview (3+ selected)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Live preview"

check_testid "live-preview" "Live preview container present"

PREVIEW_OPACITY=$(browser_eval "
  getComputedStyle(document.querySelector('[data-testid=\"live-preview\"]')).opacity
")
if [ "$PREVIEW_OPACITY" = "1" ]; then
  log_pass "Live preview visible (opacity=1) with 5+ selected"
else
  log_fail "Live preview visibility" "Opacity: $PREVIEW_OPACITY"
fi

# ══════════════════════════════════════════════════════════════
# TEST 11: Council bar position (above chin)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Layout positions"

# Scroll to bottom of council section so sticky bar is visible
agent-browser scrollintoview "[data-testid='council-bar']" 2>/dev/null
sleep 1

VH=$(browser_eval "window.innerHeight")
CHIN_HEIGHT=88

# Council bar bottom should be at or above the chin
check_position "council-bar" "bottom" "lte" "$VH" "Council bar bottom within viewport"

BAR_BOTTOM=$(browser_eval "
  Math.round(document.querySelector('[data-testid=\"council-bar\"]')?.getBoundingClientRect()?.bottom ?? 0)
")
EXPECTED_MAX=$((VH - CHIN_HEIGHT + 5))  # 5px tolerance
if [ "$BAR_BOTTOM" -le "$EXPECTED_MAX" ] 2>/dev/null; then
  log_pass "Council bar sits above chin (bottom=${BAR_BOTTOM}, chin starts at ${EXPECTED_MAX})"
else
  log_fail "Council bar vs chin" "Bar bottom=${BAR_BOTTOM}, should be <= ${EXPECTED_MAX}"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Chin interaction
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Chin interaction"

check_testid "chin-slap" "Chin SLAP label present"

CHIN_TEXT=$(browser_eval "document.querySelector('[data-testid=\"chin-slap\"]')?.textContent?.trim()")
if [ -n "$CHIN_TEXT" ]; then
  log_pass "Chin label has text: ${CHIN_TEXT}"
else
  log_fail "Chin label text" "Empty or missing"
fi

# ══════════════════════════════════════════════════════════════
# TEST 13: Carousel card not clipped
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Card rendering"

# Navigate back to carousel view
agent-browser scrollintoview "[data-testid='carousel-stage']" 2>/dev/null
sleep 0.5

CARD_BOX=$(browser_eval "
  (function() {
    var cards = document.querySelectorAll('[data-testid^=\"carousel-card-\"]');
    if (cards.length === 0) return JSON.stringify(null);
    var card = cards[0];
    var r = card.getBoundingClientRect();
    var stage = card.parentElement.getBoundingClientRect();
    return JSON.stringify({
      cardRight: Math.round(r.right),
      stageRight: Math.round(stage.right),
      cardWidth: Math.round(r.width),
      stageWidth: Math.round(stage.width),
      overflow: r.right > stage.right + 2
    });
  })()
")

if echo "$CARD_BOX" | grep -q '"overflow":false'; then
  log_pass "Card fits within stage (no right-side clipping)"
else
  log_fail "Card clipping" "Card extends beyond stage: $CARD_BOX"
fi

# ══════════════════════════════════════════════════════════════
# TEST 14: window.slapState
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 14: State exposure"

SLAP_STATE=$(browser_eval "JSON.stringify(window.slapState)")

if echo "$SLAP_STATE" | grep -q '"project":"landing"'; then
  log_pass "slapState.project = landing"
else
  log_fail "slapState.project" "Got: $SLAP_STATE"
fi

if echo "$SLAP_STATE" | grep -q '"sections"'; then
  log_pass "slapState.sections exposed"
else
  log_fail "slapState.sections" "Missing from slapState"
fi

# ══════════════════════════════════════════════════════════════
# TEST 15: Keyboard navigation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 15: Keyboard navigation"

agent-browser scrollintoview "[data-testid='carousel-stage']" 2>/dev/null
sleep 0.3

COUNTER_BEFORE=$(browser_eval "document.querySelector('[data-testid=\"carousel-counter\"]')?.textContent?.trim()")

agent-browser press ArrowRight 2>/dev/null
sleep 0.5

COUNTER_AFTER=$(browser_eval "document.querySelector('[data-testid=\"carousel-counter\"]')?.textContent?.trim()")

if [ "$COUNTER_BEFORE" != "$COUNTER_AFTER" ]; then
  log_pass "ArrowRight changes carousel (${COUNTER_BEFORE} → ${COUNTER_AFTER})"
else
  log_fail "Keyboard navigation" "Counter unchanged after ArrowRight"
fi

# ══════════════════════════════════════════════════════════════
# CLEANUP
# ══════════════════════════════════════════════════════════════
echo ""
log_info "CLEANUP"
agent-browser close 2>/dev/null
log_pass "Browser closed"

# ══════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════
print_summary
exit $?
