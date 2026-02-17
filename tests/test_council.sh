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

if open_page "${BASE_URL}/#/example/v1"; then
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

# Close popover for clean state
click_testid "draft-slot-elena"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 8: shapedBy dots on V2
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: shapedBy gold dots on V2"

# Switch to V2
click_testid "draft-version-v2"
sleep 1

# Elena, Frank, Sarah should have gold dots
for sid in elena frank sarah; do
  HAS_DOT=$(browser_eval "!!document.querySelector('[data-testid=\"shaped-${sid}\"]')")
  if [ "$HAS_DOT" = "true" ]; then
    log_pass "shapedBy dot on ${sid}"
  else
    log_fail "shapedBy dot missing on ${sid}"
  fi
done

# Non-shapedBy reviewer should NOT have gold dot
HAS_MARCUS_DOT=$(browser_eval "!!document.querySelector('[data-testid=\"shaped-marcus\"]')")
if [ "$HAS_MARCUS_DOT" = "false" ]; then
  log_pass "No shapedBy dot on marcus (correct)"
else
  log_fail "marcus incorrectly has shapedBy dot"
fi

# shapedBy badge on V2 pill
HAS_BADGE=$(browser_eval "!!document.querySelector('[data-testid=\"shaped-badge\"]')")
if [ "$HAS_BADGE" = "true" ]; then
  log_pass "shapedBy sparkle badge on V2 pill"
else
  log_fail "shapedBy badge missing on V2 pill"
fi

# V2 pill title contains shapedBy names
PILL_TITLE=$(browser_eval "document.querySelector('[data-testid=\"draft-version-v2\"]')?.getAttribute('title') || ''")
if echo "$PILL_TITLE" | grep -q "Elena"; then
  log_pass "V2 pill title mentions Elena"
else
  log_fail "V2 pill title" "Expected Elena in title, got: $PILL_TITLE"
fi

# slapState.shapedBy
SHAPED_JSON=$(browser_eval "JSON.stringify(window.slapState?.shapedBy || [])")
if echo "$SHAPED_JSON" | grep -q "elena"; then
  log_pass "slapState.shapedBy includes elena"
else
  log_fail "slapState.shapedBy" "Got: $SHAPED_JSON"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: No shapedBy dots on V1
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: No shapedBy dots on V1"

click_testid "draft-version-v1"
sleep 1

# Should have no gold dots on V1
NO_DOTS=$(browser_eval "document.querySelectorAll('.draft-shaped-dot').length")
if [ "$NO_DOTS" = "0" ]; then
  log_pass "No shapedBy dots on V1"
else
  log_fail "V1 has shapedBy dots" "Count: $NO_DOTS"
fi

# No sparkle badge
NO_BADGE=$(browser_eval "!document.querySelector('[data-testid=\"shaped-badge\"]')")
if [ "$NO_BADGE" = "true" ]; then
  log_pass "No sparkle badge on V1"
else
  log_fail "V1 has sparkle badge"
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Popover with persona on V2
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Popover with Frank on V2"

# Ensure frank is in rail before trying popover
HAS_FRANK_NOW=$(browser_eval "!!document.querySelector('[data-testid=\"draft-slot-frank\"]')")
if [ "$HAS_FRANK_NOW" = "false" ]; then
  log_skip "Frank not in rail — skipping V2 popover test"
else

click_testid "draft-version-v2"
sleep 1

click_testid "draft-slot-frank"
sleep 1

TIER=$(browser_eval "window.slapState?.overlayTier")
POPOVER_ID=$(browser_eval "window.slapState?.popoverId")
if [ "$TIER" = "2" ] && [ "$POPOVER_ID" = "frank" ]; then
  log_pass "Popover opened for Frank on V2"
else
  log_fail "Popover state" "tier=$TIER, popoverId=$POPOVER_ID"
fi

# Frank should have score in popover
POPOVER_TEXT=$(browser_eval "document.querySelector('[data-testid=\"bubble-popover\"]')?.textContent || ''")
if echo "$POPOVER_TEXT" | grep -q "/10"; then
  log_pass "Frank's popover shows score on V2"
else
  log_fail "Frank's popover missing score"
fi

# Close popover
click_testid "draft-slot-frank"
sleep 0.3

fi  # end HAS_FRANK_NOW guard

# ══════════════════════════════════════════════════════════════
# TEST 11: Total reviewer count in slapState
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Reviewer count in slapState"

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
