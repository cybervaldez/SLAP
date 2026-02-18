#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Council Continuity, Persona Rail & shapedBy
# ═══════════════════════════════════════════════════════════════
# Tests: council persistence from homepage, persona bubbles in
# rail, "+" add persona button/panel, shapedBy gold dots on V2,
# tour works with persona reviewers.
#
# Usage: ./tests/test_council.sh [--port 5180]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Council, Persona Rail & shapedBy E2E Tests"

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
# TEST 1: Auto-rolled council when no localStorage
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Auto-rolled council (no localStorage)"

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2  # Let React render

# Council should be auto-rolled (5-6 reviewers)
COUNCIL_COUNT=$(browser_eval "window.slapState?.council?.length || 0")
if [ "$COUNCIL_COUNT" -ge 4 ] && [ "$COUNCIL_COUNT" -le 8 ]; then
  log_pass "Auto-rolled council has ${COUNCIL_COUNT} members"
else
  log_fail "Council count" "Expected 4-8, got: $COUNCIL_COUNT"
fi

# Persona count should be > 0
PERSONA_COUNT=$(browser_eval "window.slapState?.councilPersonaCount || 0")
if [ "$PERSONA_COUNT" -ge 2 ]; then
  log_pass "Council has ${PERSONA_COUNT} personas in rail"
else
  log_fail "Persona count" "Expected >= 2, got: $PERSONA_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: Council from localStorage
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Council from localStorage"

# Set a specific council in localStorage and force full reload
browser_eval "localStorage.setItem('slap-default-council', JSON.stringify(['marketing','ux','elena','frank','sarah']))"
sleep 0.3

# Force full page reload to re-initialize React state
browser_eval "location.reload()"
sleep 3

# Check specific personas appear in rail
HAS_ELENA=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-elena\"]')")
if [ "$HAS_ELENA" = "true" ]; then
  log_pass "Elena (persona) appears in rail"
else
  log_fail "Elena not found in rail"
fi

HAS_FRANK=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-frank\"]')")
if [ "$HAS_FRANK" = "true" ]; then
  log_pass "Frank (persona) appears in rail"
else
  log_fail "Frank not found in rail"
fi

HAS_SARAH=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-sarah\"]')")
if [ "$HAS_SARAH" = "true" ]; then
  log_pass "Sarah (persona) appears in rail"
else
  log_fail "Sarah not found in rail"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Experts always present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Experts always present in rail"

for eid in marketing ux product technical design; do
  HAS_EXPERT=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-${eid}\"]')")
  if [ "$HAS_EXPERT" = "true" ]; then
    log_pass "Expert ${eid} present in rail"
  else
    log_fail "Expert ${eid} missing from rail"
  fi
done

# ══════════════════════════════════════════════════════════════
# TEST 4: Rail divider between experts and personas
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Rail divider"

HAS_DIVIDER=$(browser_eval "!!document.querySelector('.draft-rail-divider')")
if [ "$HAS_DIVIDER" = "true" ]; then
  log_pass "Rail divider present between experts and personas"
else
  log_fail "Rail divider missing"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: "+" Add Persona button
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Add Persona button"

check_testid "draft-add-persona" "Add persona (+) button present"

# Panel should NOT be open yet
NO_PANEL=$(browser_eval "!document.querySelector('[data-testid=\"draft-add-panel\"]')")
if [ "$NO_PANEL" = "true" ]; then
  log_pass "Add panel hidden by default"
else
  log_fail "Add panel should be hidden by default"
fi

# Click "+" to open panel
click_testid "draft-add-persona"
sleep 0.5

HAS_PANEL=$(browser_eval "!!document.querySelector('[data-testid=\"draft-add-panel\"]')")
if [ "$HAS_PANEL" = "true" ]; then
  log_pass "Add panel opens on click"
else
  log_fail "Add panel did not open"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Add persona to council
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Add persona to council"

# Marcus should NOT be in rail yet
HAS_MARCUS_BEFORE=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-marcus\"]')")
if [ "$HAS_MARCUS_BEFORE" = "false" ]; then
  log_pass "Marcus not in rail before adding"
else
  log_skip "Marcus already in rail (may be in council)"
fi

# Switch to Accessibility tab and click Marcus
browser_eval "document.querySelector('.draft-add-panel-tab')?.click()"
sleep 0.3

click_testid "add-persona-marcus"
sleep 0.5

# Marcus should now be in rail
HAS_MARCUS_AFTER=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-marcus\"]')")
if [ "$HAS_MARCUS_AFTER" = "true" ]; then
  log_pass "Marcus appears in rail after adding"
else
  log_fail "Marcus not in rail after adding"
fi

# localStorage should be updated
LS_HAS_MARCUS=$(browser_eval "JSON.parse(localStorage.getItem('slap-default-council') || '[]').includes('marcus')")
if [ "$LS_HAS_MARCUS" = "true" ]; then
  log_pass "localStorage council includes marcus"
else
  log_fail "localStorage not updated with marcus"
fi

# Close panel
click_testid "draft-add-persona"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 7: Popover works with persona reviewer
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Popover with persona reviewer"

# Click Elena's bubble — opens popover (not tour)
click_testid "draft-slot-elena"
sleep 1

TIER=$(browser_eval "window.slapState?.overlayTier")
if [ "$TIER" = "2" ]; then
  log_pass "Popover opened for Elena"
else
  log_fail "Popover not opened for Elena" "overlayTier: $TIER"
fi

POPOVER_ID=$(browser_eval "window.slapState?.popoverId")
if [ "$POPOVER_ID" = "elena" ]; then
  log_pass "popoverId is elena"
else
  log_fail "popoverId" "Expected elena, got: $POPOVER_ID"
fi

# Popover should show Elena's name
POPOVER_TEXT=$(browser_eval "document.querySelector('[data-testid=\"bubble-popover\"]')?.textContent || ''")
if echo "$POPOVER_TEXT" | grep -qi "elena"; then
  log_pass "Popover shows Elena's name"
else
  log_fail "Elena's name not in popover"
fi

# VIEW FULL should be available
HAS_VIEW_FULL=$(browser_eval "!!document.querySelector('[data-testid=\"popover-view-full\"]')")
if [ "$HAS_VIEW_FULL" = "true" ]; then
  log_pass "VIEW FULL REVIEW available for persona"
else
  log_fail "VIEW FULL REVIEW missing for persona"
fi

# Persona popover should show lens (bias)
HAS_LENS=$(browser_eval "!!document.querySelector('[data-testid=\"popover-lens\"]')")
if [ "$HAS_LENS" = "true" ]; then
  log_pass "Persona popover has lens context"
else
  log_fail "Persona popover lens missing"
fi

LENS_TEXT=$(browser_eval "document.querySelector('[data-testid=\"popover-lens\"]')?.textContent || ''")
if echo "$LENS_TEXT" | grep -qi "label"; then
  log_pass "Elena lens mentions label"
else
  log_fail "Elena lens content" "Got: $LENS_TEXT"
fi

# Persona popover should show taste
HAS_TASTE=$(browser_eval "!!document.querySelector('[data-testid=\"popover-taste\"]')")
if [ "$HAS_TASTE" = "true" ]; then
  log_pass "Persona popover has taste field"
else
  log_fail "Persona popover taste missing"
fi

TASTE_TEXT=$(browser_eval "document.querySelector('[data-testid=\"popover-taste\"]')?.textContent || ''")
if echo "$TASTE_TEXT" | grep -qi "podcast\|keyboard"; then
  log_pass "Elena taste has persona-specific content"
else
  log_fail "Elena taste content" "Got: $TASTE_TEXT"
fi

# Close popover for clean state
click_testid "draft-slot-elena"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 8: No shapedBy dots on haiku (first version)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: No shapedBy dots on first version"

# Should have no gold dots on first version
NO_DOTS=$(browser_eval "document.querySelectorAll('.draft-shaped-dot').length")
if [ "$NO_DOTS" = "0" ]; then
  log_pass "No shapedBy dots on first version"
else
  log_fail "First version has shapedBy dots" "Count: $NO_DOTS"
fi

# No sparkle badge
NO_BADGE=$(browser_eval "!document.querySelector('[data-testid=\"shaped-badge\"]')")
if [ "$NO_BADGE" = "true" ]; then
  log_pass "No sparkle badge on first version"
else
  log_fail "First version has sparkle badge"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Total reviewer count in slapState
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Reviewer count in slapState"

# Ensure clean state — close any overlays
browser_eval "(function(){ var b = document.querySelector('[data-testid=\"draft-backdrop\"]'); if(b) b.click(); })()" >/dev/null 2>&1
sleep 0.5

TOTAL_REVIEWERS=$(browser_eval "window.slapState?.reviewerCount || 0")
# Should be 5 experts + council personas (at least 3 from localStorage + marcus we added)
if [ "$TOTAL_REVIEWERS" -ge 8 ]; then
  log_pass "Total reviewers in rail: ${TOTAL_REVIEWERS}"
else
  log_fail "Reviewer count" "Expected >= 8, got: $TOTAL_REVIEWERS"
fi

# ══════════════════════════════════════════════════════════════
# CLEANUP
# ══════════════════════════════════════════════════════════════
echo ""
log_info "CLEANUP"

# Reset localStorage for clean state
browser_eval "localStorage.removeItem('slap-default-council')"
agent-browser close 2>/dev/null
log_pass "Browser closed and localStorage cleaned"

# ══════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════
print_summary
exit $?
