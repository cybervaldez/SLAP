#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Design Workspace
# ═══════════════════════════════════════════════════════════════
# Tests the workspace page: overlay wiring, version switching,
# review panel, section highlights, routing, and state exposure.
#
# Usage: ./tests/test_workspace.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Design Workspace E2E Tests"

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
# TEST 1: Workspace structure
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Workspace structure"

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 3  # Let React render + HTML fetch/inject

check_testid "draft-workspace" "Workspace root element"
check_testid "draft-topbar" "TopBar present"
check_testid "draft-rail" "Rail present"
check_testid "design-html" "HTML canvas rendered"

# ══════════════════════════════════════════════════════════════
# TEST 2: All 5 data-section elements present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Design sections"

SECTION_COUNT=$(browser_eval "document.querySelectorAll('[data-section]').length")
if [ "$SECTION_COUNT" -ge 5 ]; then
  log_pass "$SECTION_COUNT data-section elements present"
else
  log_fail "Section count" "Expected >=5, got $SECTION_COUNT"
fi

for SEC in hero features pricing testimonials cta; do
  HAS_SEC=$(browser_eval "!!document.querySelector('[data-section=\"$SEC\"]')")
  if [ "$HAS_SEC" = "true" ]; then
    log_pass "$SEC section present"
  else
    log_fail "$SEC section missing"
  fi
done

# ══════════════════════════════════════════════════════════════
# TEST 3: Rail with expert slots
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Rail experts"

EXPERT_SLOTS=$(browser_eval "
  (function() {
    var ids = ['marketing','ux','product','technical','design'];
    var count = 0;
    for (var id of ids) {
      if (document.querySelector('[data-testid=\"draft-slot-' + id + '\"]')) count++;
    }
    return count;
  })()
")
if [ "$EXPERT_SLOTS" = "5" ]; then
  log_pass "5 expert slots rendered in rail"
else
  log_fail "Expert slot count" "Expected 5, got $EXPERT_SLOTS"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Aggregate score computed
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Aggregate score"

AGG_SCORE=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"aggregate-summary\"]');
    if (!el) return '0';
    var text = el.textContent.trim();
    var match = text.match(/(\\d+)/);
    return match ? match[1] : '0';
  })()
")
if [ "$AGG_SCORE" != "0" ]; then
  log_pass "Aggregate score computed: $AGG_SCORE"
else
  log_fail "Aggregate score" "Score is 0 or not found"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: Slot click → popover opens
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Slot click → popover"

click_testid "draft-slot-marketing"
sleep 0.5

POPOVER_VIS=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"bubble-popover\"]');
    if (!el) return 'missing';
    return getComputedStyle(el).opacity === '1' ? 'visible' : 'hidden';
  })()
")
if [ "$POPOVER_VIS" = "visible" ]; then
  log_pass "Popover opens on bubble click"
else
  log_fail "Popover visibility" "Got: $POPOVER_VIS"
fi

# Check popover has reviewer name and score
POPOVER_CONTENT=$(browser_eval "document.querySelector('[data-testid=\"bubble-popover\"]')?.textContent || ''")
if echo "$POPOVER_CONTENT" | grep -qi "marketing"; then
  log_pass "Popover shows reviewer name (MARKETING)"
else
  log_fail "Popover reviewer name" "MARKETING not found in popover"
fi

if echo "$POPOVER_CONTENT" | grep -q "/10"; then
  log_pass "Popover shows score"
else
  log_fail "Popover score" "Score not found in popover"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Section chips present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Section chips in popover"

CHIP_TEXT=$(browser_eval "
  (function() {
    var chips = document.querySelector('[data-testid=\"bubble-popover\"]')?.querySelectorAll('span') || [];
    var texts = [];
    for (var c of chips) {
      var t = c.textContent.trim().toLowerCase();
      if (['hero','features','pricing','cta'].some(s => t.includes(s))) texts.push(t);
    }
    return texts.join(',');
  })()
")
if echo "$CHIP_TEXT" | grep -q "hero"; then
  log_pass "Hero chip present in popover"
else
  log_fail "Hero chip" "Not found. Chips: $CHIP_TEXT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: VIEW FULL REVIEW → panel opens
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Panel opens"

click_testid "popover-view-full"
sleep 0.5

PANEL_OPEN=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"review-panel\"]');
    if (!el) return 'missing';
    var t = getComputedStyle(el).transform;
    return t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)' ? 'open' : 'closed';
  })()
")
if [ "$PANEL_OPEN" = "open" ]; then
  log_pass "Review panel opened via VIEW FULL REVIEW"
else
  log_fail "Review panel" "Panel state: $PANEL_OPEN"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Panel has findings
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Panel findings"

FINDING_COUNT=$(browser_eval "document.querySelectorAll('[data-testid^=\"panel-finding-\"]').length")
if [ "$FINDING_COUNT" -gt 0 ] 2>/dev/null; then
  log_pass "Panel has $FINDING_COUNT findings"
else
  log_fail "Panel findings" "Expected findings, got: $FINDING_COUNT"
fi

check_testid "panel-finding-hero-0" "First hero finding present"

# ══════════════════════════════════════════════════════════════
# TEST 9: Panel close via Escape
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Panel close (Escape)"

agent-browser press Escape 2>/dev/null
sleep 0.5

PANEL_AFTER_ESC=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"review-panel\"]');
    if (!el) return 'missing';
    var t = getComputedStyle(el).transform;
    return t.includes('380') || t.includes('translateX') ? 'closed' : 'open';
  })()
")
# Panel should be closed (translated off screen)
if [ "$PANEL_AFTER_ESC" = "closed" ] || [ "$PANEL_AFTER_ESC" = "missing" ]; then
  log_pass "Panel closed via Escape"
else
  # Check if transform is not identity (panel slid out)
  TRANSFORM=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"review-panel\"]')).transform")
  if [ "$TRANSFORM" != "none" ] && [ "$TRANSFORM" != "matrix(1, 0, 0, 1, 0, 0)" ]; then
    log_pass "Panel closed via Escape (transform: $TRANSFORM)"
  else
    log_fail "Panel close" "Panel still appears open: $PANEL_AFTER_ESC, transform: $TRANSFORM"
  fi
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Add persona button present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Add persona button"

check_testid "draft-add-persona" "Add persona (+) button present"

# ══════════════════════════════════════════════════════════════
# TEST 11: Version pill present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Version pill"

check_testid "draft-version-haiku" "haiku version pill present"

# ══════════════════════════════════════════════════════════════
# TEST 12: Back button returns to landing
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Back button"

click_testid "draft-back"
sleep 1

LANDING_PRESENT=$(browser_eval "!!document.querySelector('[data-testid=\"landing-page\"]')")
if [ "$LANDING_PRESENT" = "true" ]; then
  log_pass "Back button returns to landing page"
else
  log_fail "Back button" "Landing page not found after back"
fi

# ══════════════════════════════════════════════════════════════
# TEST 13: window.slapState correct
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: window.slapState"

# Navigate back to workspace
open_page "${BASE_URL}/#/flowboard/haiku"
sleep 3

SLAP_STATE=$(browser_eval "JSON.stringify(window.slapState)")

if echo "$SLAP_STATE" | grep -q '"project":"flowboard"'; then
  log_pass "slapState.project = flowboard"
else
  log_fail "slapState.project" "Got: $SLAP_STATE"
fi

if echo "$SLAP_STATE" | grep -q '"version":"haiku"'; then
  log_pass "slapState.version = haiku"
else
  log_fail "slapState.version" "Got: $SLAP_STATE"
fi

if echo "$SLAP_STATE" | grep -q '"sections"'; then
  log_pass "slapState.sections exposed"
else
  log_fail "slapState.sections" "Missing from slapState"
fi

# ══════════════════════════════════════════════════════════════
# TEST 14: Landing → KEEP & CONTINUE → workspace
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 14: Landing → workspace flow"

open_page "${BASE_URL}"
sleep 2

# Scroll to council and roll dice
agent-browser scrollintoview "[data-testid='council-section']" 2>/dev/null
sleep 2

click_testid "dice-roll"
sleep 1

# Click KEEP & CONTINUE
click_testid "keep-council"
sleep 1

WORKSPACE_PRESENT=$(browser_eval "!!document.querySelector('[data-testid=\"draft-workspace\"]')")
if [ "$WORKSPACE_PRESENT" = "true" ]; then
  log_pass "KEEP & CONTINUE navigates to workspace"
else
  log_fail "Landing to workspace flow" "Workspace not found after KEEP"
fi

# ══════════════════════════════════════════════════════════════
# TEST 15: Default version fallback (#/flowboard → haiku)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 15: Default version fallback"

open_page "${BASE_URL}/#/flowboard"
sleep 3

DEFAULT_STATE=$(browser_eval "JSON.stringify(window.slapState)")
if echo "$DEFAULT_STATE" | grep -q '"version":"haiku"'; then
  log_pass "#/flowboard defaults to haiku"
else
  log_fail "Default version" "Got: $DEFAULT_STATE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 16: Invalid project fallback
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 16: Invalid project"

open_page "${BASE_URL}/#/nonexistent"
sleep 1

check_testid "project-not-found" "Project not found message"

# ══════════════════════════════════════════════════════════════
# TEST 17: Backdrop click dismisses overlays
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 17: Backdrop dismiss"

open_page "${BASE_URL}/#/flowboard/haiku"
sleep 3

click_testid "draft-slot-marketing"
sleep 0.5

TIER=$(browser_eval "window.slapState?.overlayTier")
if [ "$TIER" = "2" ]; then
  log_pass "Popover open before backdrop click"
else
  log_fail "Popover pre-check" "overlayTier: $TIER"
fi

click_testid "draft-backdrop"
sleep 0.5

TIER=$(browser_eval "window.slapState?.overlayTier")
if [ "$TIER" = "0" ]; then
  log_pass "Backdrop click dismisses popover"
else
  log_fail "Backdrop dismiss" "overlayTier after: $TIER"
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
