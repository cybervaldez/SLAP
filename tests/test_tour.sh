#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Dual-Mode Tour System
# ═══════════════════════════════════════════════════════════════
# Tests guided review and live review tour modes:
# button visibility, start/stop, navigation, mode switching,
# keyboard nav, spotlight movement, and state restoration.
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
# TEST 1: Tour button visibility
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Tour button visibility"

if open_page "${BASE_URL}/#/example/v1"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2  # Let React render + animations settle

check_testid "tour-button" "Tour button present in top bar"

# Verify tour is not active initially
TOUR_ACTIVE=$(browser_eval "window.slapState && window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Tour not active initially"
else
  log_fail "Tour should not be active initially" "Got: $TOUR_ACTIVE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: Start guided tour
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Start guided tour"

click_testid "tour-button"
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

# Verify chin is rendered
check_testid "tour-chin" "Tour chin rendered"

# Verify chin data attribute
CHIN_MODE=$(browser_eval "document.body.dataset.tourChin")
if [ "$CHIN_MODE" = "guided" ]; then
  log_pass "Body has data-tour-chin=guided"
else
  log_fail "Body should have data-tour-chin=guided" "Got: $CHIN_MODE"
fi

# Verify step counter starts at 1
TOUR_STEP=$(browser_eval "window.slapState && window.slapState.tourStep")
if [ "$TOUR_STEP" = "0" ]; then
  log_pass "Tour starts at step index 0"
else
  log_fail "Tour should start at step 0" "Got: $TOUR_STEP"
fi

# Verify a highlight is active (from the first step)
HIGHLIGHTED=$(browser_eval "window.slapState && window.slapState.highlightedSection")
if [ -n "$HIGHLIGHTED" ] && [ "$HIGHLIGHTED" != "null" ]; then
  log_pass "Section is highlighted: $HIGHLIGHTED"
else
  log_fail "A section should be highlighted during tour"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Step navigation (next/prev)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Step navigation"

INITIAL_STEP=$(browser_eval "window.slapState.tourStep")

# Click next
click_testid "tour-next"
sleep 0.5

AFTER_NEXT=$(browser_eval "window.slapState.tourStep")
if [ "$AFTER_NEXT" -gt "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Next advances step ($INITIAL_STEP → $AFTER_NEXT)"
else
  log_fail "Next should advance step" "Was $INITIAL_STEP, now $AFTER_NEXT"
fi

# Click prev
click_testid "tour-prev"
sleep 0.5

AFTER_PREV=$(browser_eval "window.slapState.tourStep")
if [ "$AFTER_PREV" -eq "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Prev goes back ($AFTER_NEXT → $AFTER_PREV)"
else
  log_fail "Prev should go back" "Expected $INITIAL_STEP, got $AFTER_PREV"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Spotlight movement
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Spotlight movement"

SECTION_BEFORE=$(browser_eval "window.slapState.highlightedSection")

# Advance multiple steps to likely change section
click_testid "tour-next"
sleep 0.3
click_testid "tour-next"
sleep 0.3
click_testid "tour-next"
sleep 0.5

SECTION_AFTER=$(browser_eval "window.slapState.highlightedSection")
STEP_AFTER=$(browser_eval "window.slapState.tourStep")

if [ "$STEP_AFTER" -gt "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Multiple next clicks advanced to step $STEP_AFTER"
else
  log_fail "Steps should have advanced" "Got step: $STEP_AFTER"
fi

# Section may or may not have changed depending on findings per section
# Just verify highlight is still active
if [ -n "$SECTION_AFTER" ] && [ "$SECTION_AFTER" != "null" ]; then
  log_pass "Section highlight active: $SECTION_AFTER"
else
  log_fail "Section highlight should be active during tour"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: Mode switching (guided → live)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Mode switching"

STEP_BEFORE_SWITCH=$(browser_eval "window.slapState.tourStep")

# Open mode dropdown and switch to live
click_testid "tour-mode-dropdown"
sleep 0.3

# Click "Live" in dropdown — evaluate JS to find and click it
browser_eval "
  (function() {
    var btns = document.querySelectorAll('[data-testid=\"tour-mode-dropdown\"] ~ div button');
    if (!btns.length) {
      // Try finding buttons inside the dropdown wrapper
      var wrapper = document.querySelector('[data-testid=\"tour-mode-dropdown\"]').parentElement;
      btns = wrapper.querySelectorAll('div button');
    }
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].textContent.trim() === 'Live') {
        btns[i].click();
        return 'clicked';
      }
    }
    return 'not_found';
  })()
"
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

# Check chin data attribute updated
CHIN_MODE=$(browser_eval "document.body.dataset.tourChin")
if [ "$CHIN_MODE" = "live" ]; then
  log_pass "Body has data-tour-chin=live"
else
  log_fail "Body should have data-tour-chin=live" "Got: $CHIN_MODE"
fi

# Tour should still be active
TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour still active after mode switch"
else
  log_fail "Tour should remain active after mode switch"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Keyboard navigation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Keyboard navigation"

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
# TEST 7: Tour stop (Escape key)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Tour stop restores normal interaction"

# Simulate Escape keydown
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Escape stops tour"
else
  log_fail "Escape should stop tour" "tourActive: $TOUR_ACTIVE"
fi

# Chin data attribute should be removed
CHIN_ATTR=$(browser_eval "document.body.dataset.tourChin || 'undefined'")
if [ "$CHIN_ATTR" = "undefined" ]; then
  log_pass "data-tour-chin removed from body"
else
  log_fail "data-tour-chin should be removed" "Got: $CHIN_ATTR"
fi

# Tour chin should not be rendered
CHIN_EXISTS=$(browser_eval "!!document.querySelector('[data-testid=\"tour-chin\"]')")
if [ "$CHIN_EXISTS" = "false" ]; then
  log_pass "Tour chin removed from DOM"
else
  log_fail "Tour chin should be removed when tour stops"
fi

# Bubble rail should be interactive again (bubbles clickable)
check_testid "bubble-rail" "Bubble rail still present"

# ══════════════════════════════════════════════════════════════
# TEST 8: Tour stop via button
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Tour stop via STOP button"

# Start tour again
click_testid "tour-button"
sleep 1

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour restarted"
else
  log_fail "Tour should restart" "tourActive: $TOUR_ACTIVE"
fi

# Click STOP button
click_testid "tour-button"
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
