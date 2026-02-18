#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Dual-Mode Tour + Granular Ref Highlighting
# ═══════════════════════════════════════════════════════════════
# Tests guided review and live review tour modes:
# button visibility, start/stop, navigation, mode switching,
# keyboard nav, spotlight movement, ref highlights, ARIA roles.
#
# Usage: ./tests/test_tour.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Tour System E2E Tests"

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
# TEST 1: Page structure and ARIA roles
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Page structure and ARIA roles"

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2  # Let React render + animations settle

check_testid "draft-frame" "Frame element present"
check_testid "draft-topbar" "TopBar present"
check_testid "draft-viewport" "Viewport present"
check_testid "draft-rail" "Rail present"

# Check ARIA roles on sections
HERO_ROLE=$(browser_eval "document.querySelector('[data-section=\"hero\"]')?.getAttribute('role')")
if [ "$HERO_ROLE" = "region" ]; then
  log_pass "Hero section has role=region"
else
  log_fail "Hero section should have role=region" "Got: $HERO_ROLE"
fi

HERO_LABEL=$(browser_eval "document.querySelector('[data-section=\"hero\"]')?.getAttribute('aria-label')")
if [ "$HERO_LABEL" = "Hero section" ]; then
  log_pass "Hero section has aria-label"
else
  log_fail "Hero should have aria-label='Hero section'" "Got: $HERO_LABEL"
fi

# Check data-ref attributes exist
HAS_HERO_REF=$(browser_eval "!!document.querySelector('[data-ref=\"hero-headline\"]')")
if [ "$HAS_HERO_REF" = "true" ]; then
  log_pass "data-ref='hero-headline' present"
else
  log_fail "data-ref='hero-headline' not found"
fi

HAS_CTA_REF=$(browser_eval "!!document.querySelector('[data-ref=\"cta-button\"]')")
if [ "$HAS_CTA_REF" = "true" ]; then
  log_pass "data-ref='cta-button' present"
else
  log_fail "data-ref='cta-button' not found"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: Tour button visibility and initial state
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Tour button visibility"

check_testid "draft-tour-btn" "Tour button present in top bar"

# Verify tour is not active initially
TOUR_ACTIVE=$(browser_eval "window.slapState && window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Tour not active initially"
else
  log_fail "Tour should not be active initially" "Got: $TOUR_ACTIVE"
fi

# Verify wrapper mode is idle (data-mode is on draft-workspace)
FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "idle" ]; then
  log_pass "Frame starts in idle mode"
else
  log_fail "Frame should start in idle mode" "Got: $FRAME_MODE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Start guided tour
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Start guided tour"

click_testid "draft-tour-btn"
sleep 1

TOUR_ACTIVE=$(browser_eval "window.slapState && window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour is active after clicking button"
else
  log_fail "Tour should be active" "Got: $TOUR_ACTIVE"
fi

TOUR_MODE=$(browser_eval "window.slapState && window.slapState.tourMode")
if [ "$TOUR_MODE" = "guided" ]; then
  log_pass "Tour starts in guided mode"
else
  log_fail "Tour should start in guided mode" "Got: $TOUR_MODE"
fi

# Verify wrapper mode switched to guided (data-mode is on draft-workspace)
FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "guided" ]; then
  log_pass "Frame mode is guided"
else
  log_fail "Frame should be in guided mode" "Got: $FRAME_MODE"
fi

# Verify step counter starts at 0
TOUR_STEP=$(browser_eval "window.slapState && window.slapState.tourStep")
if [ "$TOUR_STEP" = "0" ]; then
  log_pass "Tour starts at step index 0"
else
  log_fail "Tour should start at step 0" "Got: $TOUR_STEP"
fi

# Verify a highlight is active
HIGHLIGHTED=$(browser_eval "window.slapState && window.slapState.highlightedSection")
if [ -n "$HIGHLIGHTED" ] && [ "$HIGHLIGHTED" != "null" ]; then
  log_pass "Section is highlighted: $HIGHLIGHTED"
else
  log_fail "A section should be highlighted during tour"
fi

# Verify slapState has new fields
CURRENT_FINDING=$(browser_eval "window.slapState.currentFinding")
if [ -n "$CURRENT_FINDING" ] && [ "$CURRENT_FINDING" != "null" ]; then
  log_pass "slapState.currentFinding populated"
else
  log_fail "slapState.currentFinding should be set"
fi

CURRENT_REF=$(browser_eval "window.slapState.currentRef")
if [ -n "$CURRENT_REF" ] && [ "$CURRENT_REF" != "null" ]; then
  log_pass "slapState.currentRef populated: $CURRENT_REF"
else
  log_skip "slapState.currentRef may be null (not all findings have refs)"
fi

# Tour chin should show reviewer lens (bias)
HAS_TOUR_LENS=$(browser_eval "!!document.querySelector('[data-testid=\"tour-lens\"]')")
if [ "$HAS_TOUR_LENS" = "true" ]; then
  log_pass "Tour chin shows reviewer lens"
else
  log_fail "Tour chin lens missing"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Ref highlight (element-level)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Ref highlight on elements"

# Check if slap-ref-element class is applied to any element
HAS_REF_HL=$(browser_eval "!!document.querySelector('.slap-ref-element')")
if [ "$HAS_REF_HL" = "true" ]; then
  log_pass "slap-ref-element class applied to an element"
  # Check which element
  REF_TAG=$(browser_eval "document.querySelector('.slap-ref-element')?.tagName")
  REF_ID=$(browser_eval "document.querySelector('.slap-ref-element')?.getAttribute('data-ref')")
  log_info "  Highlighted: <$REF_TAG data-ref=\"$REF_ID\">"
else
  log_skip "No slap-ref-element found (first finding may not have a ref)"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: Step navigation (next/prev)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Step navigation"

INITIAL_STEP=$(browser_eval "window.slapState.tourStep")

# Click next
click_testid "draft-next"
sleep 0.5

AFTER_NEXT=$(browser_eval "window.slapState.tourStep")
if [ "$AFTER_NEXT" -gt "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Next advances step ($INITIAL_STEP → $AFTER_NEXT)"
else
  log_fail "Next should advance step" "Was $INITIAL_STEP, now $AFTER_NEXT"
fi

# Click prev
click_testid "draft-prev"
sleep 0.5

AFTER_PREV=$(browser_eval "window.slapState.tourStep")
if [ "$AFTER_PREV" -eq "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Prev goes back ($AFTER_NEXT → $AFTER_PREV)"
else
  log_fail "Prev should go back" "Expected $INITIAL_STEP, got $AFTER_PREV"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Spotlight movement
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Spotlight movement"

SECTION_BEFORE=$(browser_eval "window.slapState.highlightedSection")

# Advance multiple steps to likely change section
click_testid "draft-next"
sleep 0.3
click_testid "draft-next"
sleep 0.3
click_testid "draft-next"
sleep 0.5

SECTION_AFTER=$(browser_eval "window.slapState.highlightedSection")
STEP_AFTER=$(browser_eval "window.slapState.tourStep")

if [ "$STEP_AFTER" -gt "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Multiple next clicks advanced to step $STEP_AFTER"
else
  log_fail "Steps should have advanced" "Got step: $STEP_AFTER"
fi

# Verify highlight is still active
if [ -n "$SECTION_AFTER" ] && [ "$SECTION_AFTER" != "null" ]; then
  log_pass "Section highlight active: $SECTION_AFTER"
else
  log_fail "Section highlight should be active during tour"
fi

# Verify section-spotlight class is on exactly one section
SPOT_COUNT=$(browser_eval "document.querySelectorAll('.section-spotlight').length")
if [ "$SPOT_COUNT" = "1" ]; then
  log_pass "Exactly one section has spotlight class"
else
  log_fail "Expected 1 spotlighted section" "Got: $SPOT_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: Mode switching (guided → live)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Mode switching"

STEP_BEFORE_SWITCH=$(browser_eval "window.slapState.tourStep")

# Click live mode toggle directly
click_testid "draft-mode-live"
sleep 0.5

TOUR_MODE=$(browser_eval "window.slapState.tourMode")
if [ "$TOUR_MODE" = "live" ]; then
  log_pass "Mode switched to live"
else
  log_fail "Mode should be live" "Got: $TOUR_MODE"
fi

# Step should be preserved
STEP_AFTER_SWITCH=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER_SWITCH" = "$STEP_BEFORE_SWITCH" ]; then
  log_pass "Step preserved after mode switch ($STEP_AFTER_SWITCH)"
else
  log_fail "Step should be preserved" "Was $STEP_BEFORE_SWITCH, now $STEP_AFTER_SWITCH"
fi

# Check wrapper data-mode updated (data-mode is on draft-workspace)
FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "live" ]; then
  log_pass "Frame mode is live"
else
  log_fail "Frame should be in live mode" "Got: $FRAME_MODE"
fi

# Tour should still be active
TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour still active after mode switch"
else
  log_fail "Tour should remain active after mode switch"
fi

# Switch back to guided
click_testid "draft-mode-guided"
sleep 0.5

TOUR_MODE=$(browser_eval "window.slapState.tourMode")
if [ "$TOUR_MODE" = "guided" ]; then
  log_pass "Switched back to guided mode"
else
  log_fail "Should be back in guided mode" "Got: $TOUR_MODE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Keyboard navigation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Keyboard navigation"

STEP_BEFORE_KEY=$(browser_eval "window.slapState.tourStep")

# Simulate ArrowRight keydown
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 0.5

STEP_AFTER_RIGHT=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER_RIGHT" -gt "$STEP_BEFORE_KEY" ] 2>/dev/null; then
  log_pass "ArrowRight advances step ($STEP_BEFORE_KEY → $STEP_AFTER_RIGHT)"
else
  log_fail "ArrowRight should advance step" "Was $STEP_BEFORE_KEY, now $STEP_AFTER_RIGHT"
fi

# Simulate ArrowLeft keydown
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))"
sleep 0.5

STEP_AFTER_LEFT=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER_LEFT" -eq "$STEP_BEFORE_KEY" ] 2>/dev/null; then
  log_pass "ArrowLeft goes back ($STEP_AFTER_RIGHT → $STEP_AFTER_LEFT)"
else
  log_fail "ArrowLeft should go back" "Expected $STEP_BEFORE_KEY, got $STEP_AFTER_LEFT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Tour stop (Escape key)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Tour stop via Escape"

# Simulate Escape keydown
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Escape stops tour"
else
  log_fail "Escape should stop tour" "tourActive: $TOUR_ACTIVE"
fi

# Wrapper should return to idle mode (data-mode is on draft-workspace)
FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "idle" ]; then
  log_pass "Frame returns to idle mode"
else
  log_fail "Frame should return to idle" "Got: $FRAME_MODE"
fi

# Ref highlights should be cleared
HAS_REF_HL=$(browser_eval "!!document.querySelector('.slap-ref-element')")
if [ "$HAS_REF_HL" = "false" ]; then
  log_pass "Ref highlights cleared after stop"
else
  log_fail "Ref highlights should be cleared"
fi

# Section spotlight should be cleared
SPOT_COUNT=$(browser_eval "document.querySelectorAll('.section-spotlight').length")
if [ "$SPOT_COUNT" = "0" ]; then
  log_pass "Section spotlight cleared after stop"
else
  log_fail "Section spotlight should be cleared" "Got: $SPOT_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Tour stop via STOP button
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Tour stop via STOP button"

# Start tour again
click_testid "draft-tour-btn"
sleep 1

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour restarted"
else
  log_fail "Tour should restart" "tourActive: $TOUR_ACTIVE"
fi

# Click STOP button (visible when tour is active)
click_testid "draft-tour-stop"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "STOP button stops tour"
else
  log_fail "STOP button should stop tour" "tourActive: $TOUR_ACTIVE"
fi

# ══════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════
print_summary
