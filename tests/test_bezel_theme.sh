#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: iMac Purple Bezel + Power Button Theme Toggle
# ═══════════════════════════════════════════════════════════════
# Tests: externalized layout, embossed hand icon, power button
# toggle, theme switching, purple bezel colors, external rail,
# CRT chin overlay, slapState exposure.
#
# Usage: ./tests/test_bezel_theme.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Bezel, Layout & Theme Toggle E2E Tests"

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

# ══════════════════════════════════════════════════════════════
# TEST 1: New layout structure
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Layout structure"

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2  # Let React render

check_testid "draft-workspace" "Workspace wrapper present"
check_testid "draft-stage" "Stage container present"
check_testid "draft-frame" "Frame present (no chin)"
check_testid "draft-rail" "External rail present"
check_testid "draft-crt-overlay" "CRT chin overlay present"

# Verify frame has NO chin (chin is in crt-overlay now)
NO_CHIN=$(browser_eval "!!document.querySelector('.draft-frame .draft-chin')")
if [ "$NO_CHIN" = "false" ]; then
  log_pass "Frame has no internal chin"
else
  log_fail "Frame still has internal chin"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: External rail is outside frame
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: External rail positioning"

# Rail should be a sibling of frame inside stage, not inside frame
RAIL_IN_STAGE=$(browser_eval "(function(){ var rail = document.querySelector('[data-testid=\"draft-rail\"]'); var stage = document.querySelector('[data-testid=\"draft-stage\"]'); return rail && stage && rail.parentElement === stage; })()")
if [ "$RAIL_IN_STAGE" = "true" ]; then
  log_pass "Rail is direct child of stage"
else
  log_fail "Rail is NOT in stage"
fi

RAIL_NOT_IN_FRAME=$(browser_eval "(function(){ var rail = document.querySelector('[data-testid=\"draft-rail\"]'); var frame = document.querySelector('[data-testid=\"draft-frame\"]'); return !frame.contains(rail); })()")
if [ "$RAIL_NOT_IN_FRAME" = "true" ]; then
  log_pass "Rail is outside frame"
else
  log_fail "Rail is still inside frame"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: CRT overlay elements
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: CRT overlay elements"

check_testid "chin-hand" "Embossed hand icon present"
check_testid "theme-toggle" "Power button toggle present"

# Hand is in CRT overlay, not in frame
HAND_IN_OVERLAY=$(browser_eval "(function(){ var hand = document.querySelector('[data-testid=\"chin-hand\"]'); var overlay = document.querySelector('[data-testid=\"draft-crt-overlay\"]'); return overlay && overlay.contains(hand); })()")
if [ "$HAND_IN_OVERLAY" = "true" ]; then
  log_pass "Hand is in CRT overlay"
else
  log_fail "Hand is NOT in CRT overlay"
fi

# CRT overlay is fixed position
OVERLAY_POS=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"draft-crt-overlay\"]')).position")
if [ "$OVERLAY_POS" = "fixed" ]; then
  log_pass "CRT overlay is fixed position"
else
  log_fail "CRT overlay position" "Expected fixed, got: $OVERLAY_POS"
fi

# Power button is direct child of overlay (right edge, not inside idle)
PWR_DIRECT=$(browser_eval "(function(){ var btn = document.querySelector('[data-testid=\"theme-toggle\"]'); var overlay = document.querySelector('[data-testid=\"draft-crt-overlay\"]'); return btn && btn.parentElement === overlay; })()")
if [ "$PWR_DIRECT" = "true" ]; then
  log_pass "Power button is direct child of CRT overlay"
else
  log_fail "Power button is NOT direct child of overlay"
fi

PWR_POS=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"theme-toggle\"]')).position")
if [ "$PWR_POS" = "absolute" ]; then
  log_pass "Power button is absolutely positioned (right edge)"
else
  log_fail "Power button position" "Expected absolute, got: $PWR_POS"
fi

# Verify hand is ✋ emoji
HAND_TEXT=$(browser_eval "document.querySelector('[data-testid=\"chin-hand\"]')?.textContent")
if [ "$HAND_TEXT" = "✋" ]; then
  log_pass "Hand emoji is ✋"
else
  log_fail "Hand emoji content" "Expected ✋, got: $HAND_TEXT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Default theme is dark
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Default theme state"

THEME_STATE=$(browser_eval "document.querySelector('[data-testid=\"theme-toggle\"]')?.getAttribute('data-theme-state')")
if [ "$THEME_STATE" = "dark" ]; then
  log_pass "Power button shows dark state"
else
  log_fail "Power button theme state" "Expected dark, got: $THEME_STATE"
fi

SLAP_THEME=$(browser_eval "window.slapState?.contentTheme")
if [ "$SLAP_THEME" = "dark" ]; then
  log_pass "slapState.contentTheme is dark"
else
  log_fail "slapState.contentTheme" "Expected dark, got: $SLAP_THEME"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: Toggle to light mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Toggle to light mode"

click_testid "theme-toggle"
sleep 0.5

THEME_STATE=$(browser_eval "document.querySelector('[data-testid=\"theme-toggle\"]')?.getAttribute('data-theme-state')")
if [ "$THEME_STATE" = "light" ]; then
  log_pass "Power button shows light state after toggle"
else
  log_fail "Power button after toggle" "Expected light, got: $THEME_STATE"
fi

BODY_THEME=$(browser_eval "document.body.getAttribute('data-content-theme')")
if [ "$BODY_THEME" = "light" ]; then
  log_pass "Body has data-content-theme=light"
else
  log_fail "Body data-content-theme" "Expected light, got: $BODY_THEME"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Purple bezel colors
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Purple bezel colors (light mode)"

sleep 1  # Wait for 800ms bezel transition

BEZEL_COLOR=$(browser_eval "getComputedStyle(document.body, '::after').borderColor")
if echo "$BEZEL_COLOR" | grep -qi "68.*56.*98\|443862"; then
  log_pass "Bezel ::after has purple border color"
else
  if echo "$BEZEL_COLOR" | grep -q "rgb(68, 56, 98)"; then
    log_pass "Bezel ::after has purple border (rgb match)"
  else
    log_fail "Bezel ::after color" "Expected #443862 / rgb(68, 56, 98), got: $BEZEL_COLOR"
  fi
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: Toggle back to dark mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Toggle back to dark mode"

click_testid "theme-toggle"
sleep 0.5

THEME_STATE=$(browser_eval "document.querySelector('[data-testid=\"theme-toggle\"]')?.getAttribute('data-theme-state')")
if [ "$THEME_STATE" = "dark" ]; then
  log_pass "Power button back to dark state"
else
  log_fail "Power button" "Expected dark, got: $THEME_STATE"
fi

BODY_ATTR=$(browser_eval "document.body.hasAttribute('data-content-theme')")
if [ "$BODY_ATTR" = "false" ]; then
  log_pass "Body data-content-theme removed in dark mode"
else
  log_fail "Body attribute" "Expected no data-content-theme in dark mode"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Accessibility
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Accessibility"

ARIA=$(browser_eval "document.querySelector('[data-testid=\"theme-toggle\"]')?.getAttribute('aria-label')")
if echo "$ARIA" | grep -qi "switch.*light"; then
  log_pass "Power button has aria-label"
else
  log_fail "Power button aria-label" "Got: $ARIA"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Draft frame border is purple
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Draft frame border color"

FRAME_BORDER=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"draft-frame\"]')).borderColor")
if echo "$FRAME_BORDER" | grep -q "rgb(68, 56, 98)"; then
  log_pass "Draft frame border is purple #443862"
else
  if echo "$FRAME_BORDER" | grep -qi "68.*56.*98"; then
    log_pass "Draft frame border is purple (pattern match)"
  else
    log_fail "Draft frame border" "Expected rgb(68, 56, 98), got: $FRAME_BORDER"
  fi
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Hand icon embossed filter
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Hand icon embossed filter"

HAND_FILTER=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"chin-hand\"]')).filter")
if echo "$HAND_FILTER" | grep -q "grayscale"; then
  log_pass "Hand has grayscale filter"
else
  log_fail "Hand filter" "Expected grayscale, got: $HAND_FILTER"
fi

if echo "$HAND_FILTER" | grep -q "brightness"; then
  log_pass "Hand has brightness filter"
else
  log_fail "Hand filter" "Expected brightness, got: $HAND_FILTER"
fi

# ══════════════════════════════════════════════════════════════
# TEST 11: data-mode on wrapper
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: data-mode attribute"

WRAPPER_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$WRAPPER_MODE" = "idle" ]; then
  log_pass "Wrapper data-mode is idle"
else
  log_fail "Wrapper data-mode" "Expected idle, got: $WRAPPER_MODE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Floating tour overlay (replaces frosted glass chin)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Floating tour overlay"

# Verify tour overlay exists
check_testid "draft-tour-overlay" "Tour overlay element present"

# Verify overlay is hidden in idle mode
OVERLAY_OPACITY=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"draft-tour-overlay\"]')).opacity")
if [ "$OVERLAY_OPACITY" = "0" ]; then
  log_pass "Tour overlay hidden in idle mode"
else
  log_fail "Tour overlay should be hidden in idle" "Got opacity: $OVERLAY_OPACITY"
fi

# Verify CRT chin no longer has guided/live panels
NO_GUIDED=$(browser_eval "!document.querySelector('[data-testid=\"draft-chin-guided\"]')")
if [ "$NO_GUIDED" = "true" ]; then
  log_pass "No frosted glass guided panel in chin"
else
  log_fail "Guided panel should be removed from chin"
fi

NO_LIVE=$(browser_eval "!document.querySelector('[data-testid=\"draft-chin-live\"]')")
if [ "$NO_LIVE" = "true" ]; then
  log_pass "No frosted glass live panel in chin"
else
  log_fail "Live panel should be removed from chin"
fi

# Hand icon should still be visible in idle
HAND_OPACITY=$(browser_eval "(function(){ var h = document.querySelector('[data-testid=\"chin-hand\"]'); if (!h) return 'missing'; var idle = h.closest('.draft-crt-idle'); return idle ? getComputedStyle(idle).opacity : 'no-idle'; })()")
if [ "$HAND_OPACITY" = "1" ]; then
  log_pass "Hand icon visible in idle mode"
else
  log_fail "Hand icon idle opacity" "Expected 1, got: $HAND_OPACITY"
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
