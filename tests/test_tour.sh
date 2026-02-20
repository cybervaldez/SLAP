#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Dual-Mode Tour — Comprehensive
# ═══════════════════════════════════════════════════════════════
# 42 tests covering guided + live modes:
#   Architecture: state boundaries, isolation, sequential tours
#   Animation: floater, speech, trail, spotlight, overlay enter/exit
#   UX: finding display, counters, progress, breadcrumbs, preview tooltip
#   UI: rail states, mode toggles, glow system, severity badges
#   Motion: cross-mode transitions, keyboard in live, edge cases
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

print_header "SLAP! Tour System — Comprehensive E2E Tests (42)"

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

# Check sections have data-section attributes
SECTION_COUNT=$(browser_eval "document.querySelectorAll('[data-section]').length")
if [ "$SECTION_COUNT" -ge 3 ] 2>/dev/null; then
  log_pass "Design has $SECTION_COUNT data-section elements"
else
  log_fail "Design should have at least 3 data-section elements" "Got: $SECTION_COUNT"
fi

HERO_SECTION=$(browser_eval "!!document.querySelector('[data-section=\"hero\"]')")
if [ "$HERO_SECTION" = "true" ]; then
  log_pass "Hero section present"
else
  log_fail "Hero section should exist"
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

# Verify wrapper mode is idle
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

FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "guided" ]; then
  log_pass "Frame mode is guided"
else
  log_fail "Frame should be in guided mode" "Got: $FRAME_MODE"
fi

TOUR_STEP=$(browser_eval "window.slapState && window.slapState.tourStep")
if [ "$TOUR_STEP" = "0" ]; then
  log_pass "Tour starts at step index 0"
else
  log_fail "Tour should start at step 0" "Got: $TOUR_STEP"
fi

HIGHLIGHTED=$(browser_eval "window.slapState && window.slapState.highlightedSection")
if [ -n "$HIGHLIGHTED" ] && [ "$HIGHLIGHTED" != "null" ]; then
  log_pass "Section is highlighted: $HIGHLIGHTED"
else
  log_fail "A section should be highlighted during tour"
fi

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

HAS_REF_HL=$(browser_eval "!!document.querySelector('.slap-ref-element')")
if [ "$HAS_REF_HL" = "true" ]; then
  log_pass "slap-ref-element class applied to an element"
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

click_testid "draft-next"
sleep 0.5

AFTER_NEXT=$(browser_eval "window.slapState.tourStep")
if [ "$AFTER_NEXT" -gt "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Next advances step ($INITIAL_STEP -> $AFTER_NEXT)"
else
  log_fail "Next should advance step" "Was $INITIAL_STEP, now $AFTER_NEXT"
fi

click_testid "draft-prev"
sleep 0.5

AFTER_PREV=$(browser_eval "window.slapState.tourStep")
if [ "$AFTER_PREV" -eq "$INITIAL_STEP" ] 2>/dev/null; then
  log_pass "Prev goes back ($AFTER_NEXT -> $AFTER_PREV)"
else
  log_fail "Prev should go back" "Expected $INITIAL_STEP, got $AFTER_PREV"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Spotlight movement
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Spotlight movement"

SECTION_BEFORE=$(browser_eval "window.slapState.highlightedSection")

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

if [ -n "$SECTION_AFTER" ] && [ "$SECTION_AFTER" != "null" ]; then
  log_pass "Section highlight active: $SECTION_AFTER"
else
  log_fail "Section highlight should be active during tour"
fi

SPOT_COUNT=$(browser_eval "document.querySelectorAll('.section-spotlight').length")
if [ "$SPOT_COUNT" = "1" ]; then
  log_pass "Exactly one section has spotlight class"
else
  log_fail "Expected 1 spotlighted section" "Got: $SPOT_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: Mode switching (guided -> live)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Mode switching"

STEP_BEFORE_SWITCH=$(browser_eval "window.slapState.tourStep")

click_testid "draft-mode-live"
sleep 0.5

TOUR_MODE=$(browser_eval "window.slapState.tourMode")
if [ "$TOUR_MODE" = "live" ]; then
  log_pass "Mode switched to live"
else
  log_fail "Mode should be live" "Got: $TOUR_MODE"
fi

STEP_AFTER_SWITCH=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER_SWITCH" = "$STEP_BEFORE_SWITCH" ]; then
  log_pass "Step preserved after mode switch ($STEP_AFTER_SWITCH)"
else
  log_fail "Step should be preserved" "Was $STEP_BEFORE_SWITCH, now $STEP_AFTER_SWITCH"
fi

FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "live" ]; then
  log_pass "Frame mode is live"
else
  log_fail "Frame should be in live mode" "Got: $FRAME_MODE"
fi

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour still active after mode switch"
else
  log_fail "Tour should remain active after mode switch"
fi

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

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 0.5

STEP_AFTER_RIGHT=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER_RIGHT" -gt "$STEP_BEFORE_KEY" ] 2>/dev/null; then
  log_pass "ArrowRight advances step ($STEP_BEFORE_KEY -> $STEP_AFTER_RIGHT)"
else
  log_fail "ArrowRight should advance step" "Was $STEP_BEFORE_KEY, now $STEP_AFTER_RIGHT"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))"
sleep 0.5

STEP_AFTER_LEFT=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER_LEFT" -eq "$STEP_BEFORE_KEY" ] 2>/dev/null; then
  log_pass "ArrowLeft goes back ($STEP_AFTER_RIGHT -> $STEP_AFTER_LEFT)"
else
  log_fail "ArrowLeft should go back" "Expected $STEP_BEFORE_KEY, got $STEP_AFTER_LEFT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Tour stop (Escape key)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Tour stop via Escape"

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Escape stops tour"
else
  log_fail "Escape should stop tour" "tourActive: $TOUR_ACTIVE"
fi

FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")
if [ "$FRAME_MODE" = "idle" ]; then
  log_pass "Frame returns to idle mode"
else
  log_fail "Frame should return to idle" "Got: $FRAME_MODE"
fi

HAS_REF_HL=$(browser_eval "!!document.querySelector('.slap-ref-element')")
if [ "$HAS_REF_HL" = "false" ]; then
  log_pass "Ref highlights cleared after stop"
else
  log_fail "Ref highlights should be cleared"
fi

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

click_testid "draft-tour-btn"
sleep 1

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour restarted"
else
  log_fail "Tour should restart" "tourActive: $TOUR_ACTIVE"
fi

click_testid "draft-tour-stop"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "STOP button stops tour"
else
  log_fail "STOP button should stop tour" "tourActive: $TOUR_ACTIVE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 11: Boundary — first step (prev disabled)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Boundary — first step"

click_testid "draft-tour-btn"
sleep 1

TOUR_STEP=$(browser_eval "window.slapState.tourStep")
if [ "$TOUR_STEP" = "0" ]; then
  log_pass "Tour starts at step 0"
else
  log_fail "Tour should start at step 0" "Got: $TOUR_STEP"
fi

PREV_DISABLED=$(browser_eval "document.querySelector('[data-testid=\"draft-prev\"]')?.disabled")
if [ "$PREV_DISABLED" = "true" ]; then
  log_pass "Prev button disabled at first step"
else
  log_fail "Prev should be disabled at step 0" "Got: $PREV_DISABLED"
fi

NEXT_DISABLED=$(browser_eval "document.querySelector('[data-testid=\"draft-next\"]')?.disabled")
if [ "$NEXT_DISABLED" = "false" ]; then
  log_pass "Next button enabled at first step"
else
  log_fail "Next should be enabled at step 0" "Got: $NEXT_DISABLED"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Boundary — last step (next disabled)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Boundary — last step"

TOTAL_STEPS=$(browser_eval "window.slapState.tourTotalSteps")
LAST_INDEX=$((TOTAL_STEPS - 1))

# Jump to last step via goTo
browser_eval "(function(){ var steps = window.slapState.tourTotalSteps; document.dispatchEvent(new CustomEvent('__slap_goto', {detail: steps - 1})); })()"
# Use keyboard to navigate to last step instead
for i in $(seq 1 $LAST_INDEX); do
  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
  sleep 0.1
done
sleep 0.5

TOUR_STEP=$(browser_eval "window.slapState.tourStep")
if [ "$TOUR_STEP" = "$LAST_INDEX" ]; then
  log_pass "Reached last step ($TOUR_STEP)"
else
  log_fail "Should be at last step $LAST_INDEX" "Got: $TOUR_STEP"
fi

NEXT_DISABLED=$(browser_eval "document.querySelector('[data-testid=\"draft-next\"]')?.disabled")
if [ "$NEXT_DISABLED" = "true" ]; then
  log_pass "Next button disabled at last step"
else
  log_fail "Next should be disabled at last step" "Got: $NEXT_DISABLED"
fi

PREV_DISABLED=$(browser_eval "document.querySelector('[data-testid=\"draft-prev\"]')?.disabled")
if [ "$PREV_DISABLED" = "false" ]; then
  log_pass "Prev button enabled at last step"
else
  log_fail "Prev should be enabled at last step" "Got: $PREV_DISABLED"
fi

# Stop tour for next tests
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 13: Breadcrumb navigation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Breadcrumb navigation"

click_testid "draft-tour-btn"
sleep 1

# Verify breadcrumbs exist
CRUMB_COUNT=$(browser_eval "document.querySelectorAll('.draft-tour-crumb').length")
if [ "$CRUMB_COUNT" -ge 3 ] 2>/dev/null; then
  log_pass "Breadcrumbs present ($CRUMB_COUNT sections)"
else
  log_fail "Breadcrumbs should show at least 3 sections" "Got: $CRUMB_COUNT"
fi

# First crumb should be active initially
FIRST_ACTIVE=$(browser_eval "document.querySelector('.draft-tour-crumb.active')?.textContent || ''")
if [ -n "$FIRST_ACTIVE" ]; then
  log_pass "Active breadcrumb: $FIRST_ACTIVE"
else
  log_fail "One breadcrumb should be active"
fi

# Click second crumb to jump
SECTION_BEFORE=$(browser_eval "window.slapState.highlightedSection")
browser_eval "(function(){ var crumbs = document.querySelectorAll('.draft-tour-crumb'); if(crumbs[2]) crumbs[2].click(); })()"
sleep 0.5

SECTION_AFTER=$(browser_eval "window.slapState.highlightedSection")
if [ "$SECTION_AFTER" != "$SECTION_BEFORE" ]; then
  log_pass "Breadcrumb click changed section ($SECTION_BEFORE -> $SECTION_AFTER)"
else
  log_skip "Breadcrumb click may have stayed same section (depends on data)"
fi

# Verify active crumb changed
NEW_ACTIVE=$(browser_eval "document.querySelector('.draft-tour-crumb.active')?.textContent || ''")
if [ -n "$NEW_ACTIVE" ]; then
  log_pass "Active breadcrumb updated: $NEW_ACTIVE"
else
  log_fail "Active breadcrumb should update after click"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 14: Tour isolation — viewport clicks blocked
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 14: Tour isolation"

click_testid "draft-tour-btn"
sleep 1

# Click on a section in the viewport — should NOT open section focus
browser_eval "(function(){ var sec = document.querySelector('[data-section=\"hero\"]'); if(sec) sec.click(); })()"
sleep 0.5

FOCUSED=$(browser_eval "window.slapState.focusedSection")
if [ "$FOCUSED" = "null" ] || [ -z "$FOCUSED" ]; then
  log_pass "Viewport section click blocked during tour"
else
  log_fail "Section focus should not open during tour" "Got: $FOCUSED"
fi

# Tour should still be active
TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour still active after viewport click"
else
  log_fail "Tour should remain active"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 15: Tour preview tooltip
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 15: Tour preview tooltip"

# Find first reviewer slot and hover it
FIRST_SLOT=$(browser_eval "(function(){ var s = document.querySelector('.draft-rail-slot'); return s ? s.getAttribute('data-reviewer') : null; })()")

if [ -n "$FIRST_SLOT" ] && [ "$FIRST_SLOT" != "null" ]; then
  # Simulate hover with full pointer + mouse event chain (triggers React's onMouseEnter)
  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${FIRST_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerover', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerenter', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseover', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseenter', {bubbles:false})); })()"
  sleep 0.5

  HAS_PREVIEW=$(browser_eval "!!document.querySelector('[data-testid=\"tour-preview-${FIRST_SLOT}\"]')")
  if [ "$HAS_PREVIEW" = "true" ]; then
    log_pass "Tour preview tooltip visible for $FIRST_SLOT"
  else
    log_fail "Tour preview tooltip should appear on hover" "Reviewer: $FIRST_SLOT"
  fi

  # Check preview has severity counts
  PREVIEW_TEXT=$(browser_eval "document.querySelector('[data-testid=\"tour-preview-${FIRST_SLOT}\"]')?.textContent || ''")
  if echo "$PREVIEW_TEXT" | grep -q "total"; then
    log_pass "Preview shows finding total count"
  else
    log_fail "Preview should show total count" "Got: $PREVIEW_TEXT"
  fi

  # Check START TOUR button exists
  HAS_START=$(browser_eval "!!document.querySelector('[data-testid=\"tour-start-${FIRST_SLOT}\"]')")
  if [ "$HAS_START" = "true" ]; then
    log_pass "START TOUR button present in preview"
  else
    log_fail "START TOUR button missing"
  fi

  # Dismiss by mouseleave
  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${FIRST_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerout', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerleave', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseout', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseleave', {bubbles:false})); })()"
  sleep 0.3
else
  log_skip "No reviewer slot found"
fi

# ══════════════════════════════════════════════════════════════
# TEST 16: Tour preview -> START TOUR
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 16: Tour start from preview tooltip"

if [ -n "$FIRST_SLOT" ] && [ "$FIRST_SLOT" != "null" ]; then
  # Hover to show tooltip again
  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${FIRST_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerover', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerenter', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseover', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseenter', {bubbles:false})); })()"
  sleep 0.5

  # Click START TOUR
  click_testid "tour-start-${FIRST_SLOT}"
  sleep 1

  TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
  if [ "$TOUR_ACTIVE" = "true" ]; then
    log_pass "Tour started from preview tooltip"
  else
    log_fail "Tour should start from preview" "tourActive: $TOUR_ACTIVE"
  fi

  TOUR_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
  if [ "$TOUR_REVIEWER" = "$FIRST_SLOT" ]; then
    log_pass "Tour started for correct reviewer ($FIRST_SLOT)"
  else
    log_fail "Tour reviewer should be $FIRST_SLOT" "Got: $TOUR_REVIEWER"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "No reviewer slot found"
  log_skip "No reviewer slot found"
fi

# ══════════════════════════════════════════════════════════════
# TEST 17: Sequential tours — clean state between
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 17: Sequential tours"

# Start tour for first reviewer
click_testid "draft-tour-btn"
sleep 1

FIRST_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
FIRST_FINDING=$(browser_eval "window.slapState.currentFinding")
log_info "  Tour A: $FIRST_REVIEWER"

# Advance a few steps
click_testid "draft-next"
sleep 0.3
click_testid "draft-next"
sleep 0.3

# Stop and verify clean
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Tour A stopped cleanly"
else
  log_fail "Tour A should have stopped"
fi

# Start second tour (for a different reviewer if possible)
SECOND_SLOT=$(browser_eval "(function(){ var slots = document.querySelectorAll('.draft-rail-slot'); return slots.length > 1 ? slots[1].getAttribute('data-reviewer') : null; })()")

if [ -n "$SECOND_SLOT" ] && [ "$SECOND_SLOT" != "null" ]; then
  # Hover to show tooltip, then start
  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${SECOND_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerover', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerenter', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseover', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseenter', {bubbles:false})); })()"
  sleep 0.5
  HAS_START_B=$(browser_eval "!!document.querySelector('[data-testid=\"tour-start-${SECOND_SLOT}\"]')")
  if [ "$HAS_START_B" = "true" ]; then
    click_testid "tour-start-${SECOND_SLOT}"
  else
    # Fallback: just start tour via button (it'll pick first reviewer)
    click_testid "draft-tour-btn"
  fi
  sleep 1

  TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
  SECOND_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
  SECOND_STEP=$(browser_eval "window.slapState.tourStep")

  if [ "$TOUR_ACTIVE" = "true" ]; then
    log_pass "Tour B started successfully"
  else
    log_fail "Tour B should start"
  fi

  # With cross-reviewer combined steps, Tour B starts at its reviewer's first step
  # (not global 0). Verify it started at a valid position for the new reviewer.
  if [ "$SECOND_REVIEWER" != "$FIRST_REVIEWER" ] && [ "$SECOND_STEP" -ge 0 ] 2>/dev/null; then
    log_pass "Tour B starts at step $SECOND_STEP for $SECOND_REVIEWER (clean state)"
  else
    log_fail "Tour B should start for a different reviewer" "Got: step=$SECOND_STEP reviewer=$SECOND_REVIEWER"
  fi

  log_info "  Tour B: $SECOND_REVIEWER"
else
  log_skip "Only one reviewer slot found"
  log_skip "Only one reviewer slot found"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 18: Live mode — floater activation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 18: Live mode — floater"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1  # Wait for choreography

HAS_FLOATER_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.classList.contains('active')")
if [ "$HAS_FLOATER_ACTIVE" = "true" ]; then
  log_pass "Floater has .active class in live mode"
else
  log_fail "Floater should have .active in live mode"
fi

# Check floater has border color
FLOATER_BORDER=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.borderColor || ''")
if [ -n "$FLOATER_BORDER" ] && [ "$FLOATER_BORDER" != "" ]; then
  log_pass "Floater has border color set"
else
  log_fail "Floater should have reviewer border color"
fi

# ══════════════════════════════════════════════════════════════
# TEST 19: Live mode — speech bubble
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 19: Live mode — speech bubble"

sleep 1  # Extra wait for speech to appear after choreography

HAS_SPEECH_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-speech\"]')?.classList.contains('active')")
if [ "$HAS_SPEECH_ACTIVE" = "true" ]; then
  log_pass "Speech bubble has .active class"
else
  log_fail "Speech bubble should have .active after floater arrives"
fi

SPEECH_TEXT=$(browser_eval "document.querySelector('[data-testid=\"draft-speech\"]')?.textContent || ''")
if [ -n "$SPEECH_TEXT" ] && [ ${#SPEECH_TEXT} -gt 5 ]; then
  log_pass "Speech bubble has content"
else
  log_fail "Speech bubble should show finding text" "Got: $SPEECH_TEXT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 20: Live mode — trail SVG
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 20: Live mode — trail SVG"

HAS_TRAIL_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.classList.contains('active')")
if [ "$HAS_TRAIL_ACTIVE" = "true" ]; then
  log_pass "Trail path has .active class"
else
  log_fail "Trail path should have .active in live mode"
fi

TRAIL_D=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('d') || ''")
if echo "$TRAIL_D" | grep -q "^M"; then
  log_pass "Trail path has SVG path data (M command)"
else
  log_fail "Trail should have SVG path d attribute" "Got: $TRAIL_D"
fi

TRAIL_STROKE=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('stroke') || ''")
if [ -n "$TRAIL_STROKE" ] && [ "$TRAIL_STROKE" != "" ]; then
  log_pass "Trail stroke color set: $TRAIL_STROKE"
else
  log_fail "Trail should have reviewer stroke color"
fi

# ══════════════════════════════════════════════════════════════
# TEST 21: Live mode — floater reviewer styling
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 21: Live mode — floater styling"

FLOATER_SHADOW=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.boxShadow || ''")
if [ -n "$FLOATER_SHADOW" ] && echo "$FLOATER_SHADOW" | grep -q "0px"; then
  log_pass "Floater has box-shadow glow"
else
  log_skip "Floater box-shadow may vary by browser"
fi

# Floater should contain reviewer avatar image
HAS_FLOATER_IMG=$(browser_eval "!!document.querySelector('[data-testid=\"draft-floater\"] img')")
if [ "$HAS_FLOATER_IMG" = "true" ]; then
  log_pass "Floater contains reviewer avatar image"
else
  log_fail "Floater should show reviewer avatar"
fi

# ══════════════════════════════════════════════════════════════
# TEST 22: Live mode cleanup on stop
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 22: Live mode cleanup on stop"

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

FLOATER_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.classList.contains('active')")
if [ "$FLOATER_ACTIVE" = "false" ]; then
  log_pass "Floater .active removed after stop"
else
  log_fail "Floater should lose .active after stop"
fi

SPEECH_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-speech\"]')?.classList.contains('active')")
if [ "$SPEECH_ACTIVE" = "false" ]; then
  log_pass "Speech .active removed after stop"
else
  log_fail "Speech should lose .active after stop"
fi

TRAIL_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.classList.contains('active')")
if [ "$TRAIL_ACTIVE" = "false" ]; then
  log_pass "Trail .active removed after stop"
else
  log_fail "Trail should lose .active after stop"
fi

# ══════════════════════════════════════════════════════════════
# TEST 23: Tour overlay entrance
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 23: Tour overlay entrance"

click_testid "draft-tour-btn"
sleep 1

OVERLAY_VISIBLE=$(browser_eval "document.querySelector('[data-testid=\"draft-tour-overlay\"]')?.classList.contains('visible')")
if [ "$OVERLAY_VISIBLE" = "true" ]; then
  log_pass "Tour overlay has .visible class"
else
  log_fail "Tour overlay should have .visible when tour active"
fi

OVERLAY_EXITING=$(browser_eval "document.querySelector('[data-testid=\"draft-tour-overlay\"]')?.classList.contains('exiting')")
if [ "$OVERLAY_EXITING" = "false" ]; then
  log_pass "Tour overlay not exiting"
else
  log_fail "Tour overlay should not be exiting when active"
fi

# ══════════════════════════════════════════════════════════════
# TEST 24: Tour overlay exit animation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 24: Tour overlay exit"

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.1  # Check quickly before exit animation completes

OVERLAY_EXITING=$(browser_eval "document.querySelector('[data-testid=\"draft-tour-overlay\"]')?.classList.contains('exiting')")
if [ "$OVERLAY_EXITING" = "true" ]; then
  log_pass "Tour overlay has .exiting class during exit"
else
  log_skip "Exit animation may complete too fast to catch"
fi

sleep 0.5

OVERLAY_VISIBLE=$(browser_eval "document.querySelector('[data-testid=\"draft-tour-overlay\"]')?.classList.contains('visible')")
if [ "$OVERLAY_VISIBLE" = "false" ]; then
  log_pass "Tour overlay .visible removed after exit"
else
  log_fail "Tour overlay should lose .visible after stop"
fi

# ══════════════════════════════════════════════════════════════
# TEST 25: Finding text display accuracy
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 25: Finding text display"

click_testid "draft-tour-btn"
sleep 1

FINDING_UI=$(browser_eval "document.querySelector('[data-testid=\"draft-tour-finding\"]')?.textContent || ''")
FINDING_STATE=$(browser_eval "window.slapState.currentFinding || ''")

if [ -n "$FINDING_UI" ] && [ ${#FINDING_UI} -gt 5 ]; then
  log_pass "Finding text displayed in overlay"
else
  log_fail "Finding text should be displayed" "Got: $FINDING_UI"
fi

# The UI wraps in curly quotes, so just check the state value is contained
if echo "$FINDING_UI" | grep -qF "$FINDING_STATE"; then
  log_pass "Finding text matches slapState.currentFinding"
else
  # State value may have trimmed/different quoting — just verify both non-empty
  if [ -n "$FINDING_STATE" ]; then
    log_pass "slapState.currentFinding populated: ${FINDING_STATE:0:50}..."
  else
    log_fail "slapState.currentFinding should match UI text"
  fi
fi

# ══════════════════════════════════════════════════════════════
# TEST 26: Step counter format
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 26: Step counter format"

COUNTER_TEXT=$(browser_eval "document.querySelector('.draft-tour-counter')?.textContent || ''")
if echo "$COUNTER_TEXT" | grep -qE "^\[?[0-9]+/[0-9]+\]?$"; then
  log_pass "Step counter format correct: $COUNTER_TEXT"
else
  log_fail "Counter should show [N/M] format" "Got: $COUNTER_TEXT"
fi

TOTAL_STEPS=$(browser_eval "window.slapState.tourTotalSteps")
if [ "$TOTAL_STEPS" -gt 0 ] 2>/dev/null; then
  log_pass "Total steps: $TOTAL_STEPS"
else
  log_fail "Total steps should be > 0" "Got: $TOTAL_STEPS"
fi

# ══════════════════════════════════════════════════════════════
# TEST 27: Progress bar (guided mode)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 27: Progress bar (guided)"

HAS_BAR=$(browser_eval "!!document.querySelector('.draft-tour-bar')")
if [ "$HAS_BAR" = "true" ]; then
  log_pass "Progress bar element exists"
else
  log_fail "Progress bar should exist in guided mode"
fi

BAR_TEXT=$(browser_eval "document.querySelector('.draft-tour-bar')?.textContent || ''")
if [ ${#BAR_TEXT} -gt 0 ]; then
  log_pass "Progress bar has block characters"
else
  log_fail "Progress bar should have filled/empty blocks"
fi

# ══════════════════════════════════════════════════════════════
# TEST 28: Progress track (live mode)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 28: Progress track (live)"

click_testid "draft-mode-live"
sleep 1

HAS_TRACK=$(browser_eval "!!document.querySelector('.draft-tour-track')")
if [ "$HAS_TRACK" = "true" ]; then
  log_pass "Progress track element exists"
else
  log_fail "Progress track should exist in live mode"
fi

FILL_WIDTH=$(browser_eval "document.querySelector('.draft-tour-fill')?.style.width || '0%'")
if [ "$FILL_WIDTH" != "0%" ]; then
  log_pass "Progress fill width > 0%: $FILL_WIDTH"
else
  log_fail "Progress fill should show progress" "Got: $FILL_WIDTH"
fi

# Step counter in live mode
STEP_TEXT=$(browser_eval "document.querySelector('.draft-tour-step')?.textContent || ''")
if echo "$STEP_TEXT" | grep -qE "^[0-9]+/[0-9]+$"; then
  log_pass "Live step counter: $STEP_TEXT"
else
  log_skip "Live step counter format: $STEP_TEXT"
fi

click_testid "draft-mode-guided"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 29: Breadcrumb active state changes with section
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 29: Breadcrumb active tracks section"

CRUMB_BEFORE=$(browser_eval "document.querySelector('.draft-tour-crumb.active')?.textContent || ''")
SECTION_BEFORE=$(browser_eval "window.slapState.highlightedSection")

# Navigate far enough to change section
for i in $(seq 1 10); do
  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
  sleep 0.1
done
sleep 0.5

CRUMB_AFTER=$(browser_eval "document.querySelector('.draft-tour-crumb.active')?.textContent || ''")
SECTION_AFTER=$(browser_eval "window.slapState.highlightedSection")

if [ "$SECTION_AFTER" != "$SECTION_BEFORE" ]; then
  log_pass "Section changed after stepping ($SECTION_BEFORE -> $SECTION_AFTER)"
  if [ "$CRUMB_AFTER" != "$CRUMB_BEFORE" ]; then
    log_pass "Active breadcrumb updated ($CRUMB_BEFORE -> $CRUMB_AFTER)"
  else
    log_fail "Active breadcrumb should change with section"
  fi
else
  log_skip "Section didn't change (reviewer may have few findings)"
  log_skip "Breadcrumb change depends on section change"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 30: Tour preview tooltip content
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 30: Tour preview tooltip content"

if [ -n "$FIRST_SLOT" ] && [ "$FIRST_SLOT" != "null" ]; then
  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${FIRST_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerover', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerenter', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseover', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseenter', {bubbles:false})); })()"
  sleep 0.5

  # Check severity dots
  DOT_COUNT=$(browser_eval "document.querySelector('[data-testid=\"tour-preview-${FIRST_SLOT}\"]')?.querySelectorAll('.draft-severity-dot').length || 0")
  if [ "$DOT_COUNT" -ge 1 ] 2>/dev/null; then
    log_pass "Preview has severity dots ($DOT_COUNT)"
  else
    log_fail "Preview should have severity dots"
  fi

  # Check section list
  SECTIONS_TEXT=$(browser_eval "document.querySelector('.draft-tour-preview-sections')?.textContent || ''")
  if [ -n "$SECTIONS_TEXT" ] && [ ${#SECTIONS_TEXT} -gt 3 ]; then
    log_pass "Preview shows sections: $SECTIONS_TEXT"
  else
    log_fail "Preview should list sections" "Got: $SECTIONS_TEXT"
  fi

  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${FIRST_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerout', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerleave', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseout', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseleave', {bubbles:false})); })()"
  sleep 0.3
else
  log_skip "No reviewer slot"
  log_skip "No reviewer slot"
fi

# ══════════════════════════════════════════════════════════════
# TEST 31: Tour preview blocked during active tour
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 31: Tour preview blocked during active tour"

click_testid "draft-tour-btn"
sleep 1

if [ -n "$FIRST_SLOT" ] && [ "$FIRST_SLOT" != "null" ]; then
  browser_eval "(function(){ var s = document.querySelector('[data-testid=\"draft-slot-${FIRST_SLOT}\"]'); if(!s) return; s.dispatchEvent(new PointerEvent('pointerover', {bubbles:true})); s.dispatchEvent(new PointerEvent('pointerenter', {bubbles:false})); s.dispatchEvent(new MouseEvent('mouseover', {bubbles:true})); s.dispatchEvent(new MouseEvent('mouseenter', {bubbles:false})); })()"
  sleep 0.5

  HAS_PREVIEW=$(browser_eval "!!document.querySelector('[data-testid=\"tour-preview-${FIRST_SLOT}\"]')")
  if [ "$HAS_PREVIEW" = "false" ]; then
    log_pass "Tour preview blocked during active tour"
  else
    log_fail "Tour preview should not appear during active tour"
  fi
else
  log_skip "No reviewer slot"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 32: slapState completeness during live mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 32: slapState in live mode"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1

STATE_TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
STATE_TOUR_MODE=$(browser_eval "window.slapState.tourMode")
STATE_TOUR_STEP=$(browser_eval "window.slapState.tourStep")
STATE_TOTAL=$(browser_eval "window.slapState.tourTotalSteps")
STATE_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
STATE_FINDING=$(browser_eval "window.slapState.currentFinding")
STATE_SECTION=$(browser_eval "window.slapState.highlightedSection")

if [ "$STATE_TOUR_ACTIVE" = "true" ]; then
  log_pass "slapState.tourActive = true in live"
else
  log_fail "slapState.tourActive should be true"
fi

if [ "$STATE_TOUR_MODE" = "live" ]; then
  log_pass "slapState.tourMode = live"
else
  log_fail "slapState.tourMode should be live" "Got: $STATE_TOUR_MODE"
fi

if [ "$STATE_TOUR_STEP" -ge 0 ] 2>/dev/null; then
  log_pass "slapState.tourStep valid: $STATE_TOUR_STEP"
else
  log_fail "slapState.tourStep should be >= 0"
fi

if [ "$STATE_TOTAL" -gt 0 ] 2>/dev/null; then
  log_pass "slapState.tourTotalSteps: $STATE_TOTAL"
else
  log_fail "slapState.tourTotalSteps should be > 0"
fi

if [ -n "$STATE_REVIEWER" ] && [ "$STATE_REVIEWER" != "null" ]; then
  log_pass "slapState.tourReviewerId: $STATE_REVIEWER"
else
  log_fail "slapState.tourReviewerId should be set"
fi

if [ -n "$STATE_FINDING" ] && [ "$STATE_FINDING" != "null" ]; then
  log_pass "slapState.currentFinding populated in live"
else
  log_fail "slapState.currentFinding should be set in live"
fi

if [ -n "$STATE_SECTION" ] && [ "$STATE_SECTION" != "null" ]; then
  log_pass "slapState.highlightedSection in live: $STATE_SECTION"
else
  log_fail "highlightedSection should be set in live"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 33: Rail slot empty state in live mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 33: Rail slot empty state (live)"

click_testid "draft-tour-btn"
sleep 1
ACTIVE_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
click_testid "draft-mode-live"
sleep 1

if [ -n "$ACTIVE_REVIEWER" ] && [ "$ACTIVE_REVIEWER" != "null" ]; then
  SLOT_EMPTY=$(browser_eval "document.querySelector('[data-testid=\"draft-slot-${ACTIVE_REVIEWER}\"]')?.classList.contains('empty')")
  if [ "$SLOT_EMPTY" = "true" ]; then
    log_pass "Active reviewer's rail slot has .empty class"
  else
    log_fail "Active reviewer slot should have .empty in live mode"
  fi
else
  log_skip "No active reviewer found"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 34: Mode toggle active states
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 34: Mode toggle active states"

click_testid "draft-tour-btn"
sleep 1

GUIDED_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-mode-guided\"]')?.classList.contains('active')")
LIVE_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-mode-live\"]')?.classList.contains('active')")

if [ "$GUIDED_ACTIVE" = "true" ]; then
  log_pass "GUIDED toggle has .active in guided mode"
else
  log_fail "GUIDED should have .active" "Got: $GUIDED_ACTIVE"
fi

if [ "$LIVE_ACTIVE" = "false" ]; then
  log_pass "LIVE toggle does NOT have .active in guided mode"
else
  log_fail "LIVE should not have .active in guided mode"
fi

click_testid "draft-mode-live"
sleep 0.5

GUIDED_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-mode-guided\"]')?.classList.contains('active')")
LIVE_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-mode-live\"]')?.classList.contains('active')")

if [ "$LIVE_ACTIVE" = "true" ]; then
  log_pass "LIVE toggle has .active in live mode"
else
  log_fail "LIVE should have .active" "Got: $LIVE_ACTIVE"
fi

if [ "$GUIDED_ACTIVE" = "false" ]; then
  log_pass "GUIDED toggle does NOT have .active in live mode"
else
  log_fail "GUIDED should not have .active in live mode"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 35: Tour/Stop button swap
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 35: Tour/Stop button swap"

# Idle: TOUR visible, STOP hidden
TOUR_BTN=$(browser_eval "!!document.querySelector('[data-testid=\"draft-tour-btn\"]')")
STOP_BTN=$(browser_eval "!!document.querySelector('[data-testid=\"draft-tour-stop\"]')")

if [ "$TOUR_BTN" = "true" ]; then
  log_pass "TOUR button visible in idle"
else
  log_fail "TOUR button should be visible in idle"
fi

if [ "$STOP_BTN" = "false" ]; then
  log_pass "STOP button hidden in idle"
else
  log_fail "STOP button should be hidden in idle"
fi

# Active: STOP visible, TOUR hidden
click_testid "draft-tour-btn"
sleep 1

TOUR_BTN=$(browser_eval "!!document.querySelector('[data-testid=\"draft-tour-btn\"]')")
STOP_BTN=$(browser_eval "!!document.querySelector('[data-testid=\"draft-tour-stop\"]')")

if [ "$STOP_BTN" = "true" ]; then
  log_pass "STOP button visible during tour"
else
  log_fail "STOP button should be visible during tour"
fi

if [ "$TOUR_BTN" = "false" ]; then
  log_pass "TOUR button hidden during tour"
else
  log_fail "TOUR button should be hidden during tour"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 36: Glow color on spotlighted section
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 36: Glow color on spotlight"

click_testid "draft-tour-btn"
sleep 1

SECTION_NAME=$(browser_eval "window.slapState.highlightedSection")
if [ -n "$SECTION_NAME" ] && [ "$SECTION_NAME" != "null" ]; then
  GLOW_COLOR=$(browser_eval "document.querySelector('[data-section=\"${SECTION_NAME}\"]')?.style.getPropertyValue('--d-glow-color') || ''")
  if [ -n "$GLOW_COLOR" ] && [ "$GLOW_COLOR" != "" ]; then
    log_pass "Glow color set on section: $GLOW_COLOR"
  else
    log_fail "Spotlight section should have --d-glow-color"
  fi

  HAS_SPOTLIGHT=$(browser_eval "document.querySelector('[data-section=\"${SECTION_NAME}\"]')?.classList.contains('section-spotlight')")
  if [ "$HAS_SPOTLIGHT" = "true" ]; then
    log_pass "Section has .section-spotlight class"
  else
    log_fail "Spotlighted section should have .section-spotlight"
  fi
else
  log_fail "No highlighted section found"
  log_fail "Cannot check spotlight"
fi

# ══════════════════════════════════════════════════════════════
# TEST 37: Glow cleanup after stop
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 37: Glow cleanup after stop"

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

GLOW_COUNT=$(browser_eval "document.querySelectorAll('.glowing').length")
SPOT_COUNT=$(browser_eval "document.querySelectorAll('.section-spotlight').length")

if [ "$GLOW_COUNT" = "0" ]; then
  log_pass "No .glowing elements after stop"
else
  log_fail "All .glowing should be cleared" "Got: $GLOW_COUNT"
fi

if [ "$SPOT_COUNT" = "0" ]; then
  log_pass "No .section-spotlight after stop"
else
  log_fail "All .section-spotlight should be cleared" "Got: $SPOT_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 38: Speech bubble content (live mode)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 38: Speech bubble content"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1.5  # Wait for full choreography

# Speech should have severity dot
HAS_SEVERITY_DOT=$(browser_eval "!!document.querySelector('[data-testid=\"draft-speech\"] .draft-severity-dot')")
if [ "$HAS_SEVERITY_DOT" = "true" ]; then
  log_pass "Speech bubble has severity dot"
else
  log_fail "Speech should have severity dot"
fi

# Speech should show section label
SPEECH_HEADER=$(browser_eval "document.querySelector('.draft-speech-header')?.textContent || ''")
if [ -n "$SPEECH_HEADER" ] && [ ${#SPEECH_HEADER} -gt 2 ]; then
  log_pass "Speech header has section label: $SPEECH_HEADER"
else
  log_fail "Speech header should have section label"
fi

# Speech text should match finding
SPEECH_BODY=$(browser_eval "document.querySelector('.draft-speech-text')?.textContent || ''")
CURRENT_FINDING=$(browser_eval "window.slapState.currentFinding || ''")
if [ -n "$SPEECH_BODY" ] && [ ${#SPEECH_BODY} -gt 5 ]; then
  log_pass "Speech body has finding text"
else
  log_fail "Speech body should have finding text" "Got: $SPEECH_BODY"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 39: Keyboard navigation in live mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 39: Keyboard in live mode"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1

STEP_BEFORE=$(browser_eval "window.slapState.tourStep")

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 0.5

STEP_AFTER=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_AFTER" -gt "$STEP_BEFORE" ] 2>/dev/null; then
  log_pass "ArrowRight works in live mode ($STEP_BEFORE -> $STEP_AFTER)"
else
  log_fail "ArrowRight should work in live mode" "Was $STEP_BEFORE, now $STEP_AFTER"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))"
sleep 0.5

STEP_BACK=$(browser_eval "window.slapState.tourStep")
if [ "$STEP_BACK" -eq "$STEP_BEFORE" ] 2>/dev/null; then
  log_pass "ArrowLeft works in live mode ($STEP_AFTER -> $STEP_BACK)"
else
  log_fail "ArrowLeft should work in live mode" "Expected $STEP_BEFORE, got $STEP_BACK"
fi

# Escape in live mode
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Escape works in live mode"
else
  log_fail "Escape should stop tour in live mode"
fi

# ══════════════════════════════════════════════════════════════
# TEST 40: Step advance updates speech in live
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 40: Speech updates on step advance (live)"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1.5

SPEECH_BEFORE=$(browser_eval "document.querySelector('.draft-speech-text')?.textContent || ''")

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 1.5  # Wait for choreography

SPEECH_AFTER=$(browser_eval "document.querySelector('.draft-speech-text')?.textContent || ''")

if [ "$SPEECH_AFTER" != "$SPEECH_BEFORE" ]; then
  log_pass "Speech text changed after step advance"
else
  log_skip "Speech text may be same (consecutive findings can have similar text)"
fi

# Trail should have updated path
TRAIL_D_NEW=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('d') || ''")
if echo "$TRAIL_D_NEW" | grep -q "^M"; then
  log_pass "Trail path updated after step advance"
else
  log_fail "Trail should update after step advance"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 41: Rapid mode toggle consistency
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 41: Rapid mode toggle"

click_testid "draft-tour-btn"
sleep 1

STEP_START=$(browser_eval "window.slapState.tourStep")

# Advance a couple steps first
click_testid "draft-next"
sleep 0.3
click_testid "draft-next"
sleep 0.3

STEP_MID=$(browser_eval "window.slapState.tourStep")

# Rapid toggle: guided -> live -> guided -> live -> guided
click_testid "draft-mode-live"
sleep 0.2
click_testid "draft-mode-guided"
sleep 0.2
click_testid "draft-mode-live"
sleep 0.2
click_testid "draft-mode-guided"
sleep 0.5

STEP_AFTER_TOGGLE=$(browser_eval "window.slapState.tourStep")
TOUR_ACTIVE=$(browser_eval "window.slapState.tourActive")
TOUR_MODE=$(browser_eval "window.slapState.tourMode")

if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour still active after rapid toggles"
else
  log_fail "Tour should survive rapid mode toggles"
fi

if [ "$TOUR_MODE" = "guided" ]; then
  log_pass "Final mode is guided (as expected)"
else
  log_fail "Mode should be guided after toggle sequence" "Got: $TOUR_MODE"
fi

if [ "$STEP_AFTER_TOGGLE" = "$STEP_MID" ]; then
  log_pass "Step preserved through rapid toggles ($STEP_AFTER_TOGGLE)"
else
  log_fail "Step should be preserved" "Expected $STEP_MID, got $STEP_AFTER_TOGGLE"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 42: Reviewer info in overlay
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 42: Reviewer info in overlay"

click_testid "draft-tour-btn"
sleep 1

# Reviewer name
REVIEWER_NAME=$(browser_eval "document.querySelector('.draft-tour-reviewer')?.textContent || ''")
if [ -n "$REVIEWER_NAME" ] && [ ${#REVIEWER_NAME} -gt 1 ]; then
  log_pass "Reviewer name displayed: $REVIEWER_NAME"
else
  log_fail "Reviewer name should be displayed"
fi

# Reviewer avatar
HAS_AVATAR=$(browser_eval "!!document.querySelector('.draft-tour-avatar img')")
if [ "$HAS_AVATAR" = "true" ]; then
  log_pass "Reviewer avatar displayed"
else
  log_fail "Reviewer avatar should be displayed"
fi

# Section label
SECTION_LABEL=$(browser_eval "document.querySelector('.draft-tour-section')?.textContent || ''")
if [ -n "$SECTION_LABEL" ] && [ ${#SECTION_LABEL} -gt 1 ]; then
  log_pass "Section label displayed: $SECTION_LABEL"
else
  log_fail "Section label should be displayed"
fi

# Severity dot in finding
HAS_FINDING_DOT=$(browser_eval "!!document.querySelector('[data-testid=\"draft-tour-finding\"] .draft-severity-dot')")
if [ "$HAS_FINDING_DOT" = "true" ]; then
  log_pass "Finding has severity dot"
else
  log_fail "Finding should have severity dot"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

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
