#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Roster Page
# ═══════════════════════════════════════════════════════════════
# Tests: route, all 23 reviewers rendered, expert section,
# persona categories, filter by category, card content
# (name, role, bias, avatar, score), click-through, back button,
# slapState exposure.
#
# Usage: ./tests/test_roster.sh [--port 5180]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Roster Page E2E Tests"

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
# TEST 1: Route works
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Roster route"

if open_page "${BASE_URL}/#/roster"; then
  log_pass "Roster page opened"
else
  log_fail "Failed to open roster page"
  print_summary
  exit 1
fi

sleep 2  # Let React render

check_testid "roster-page" "Roster page element present"

# ══════════════════════════════════════════════════════════════
# TEST 2: slapState
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: slapState"

PAGE=$(browser_eval "window.slapState?.page")
if [ "$PAGE" = "roster" ]; then
  log_pass "slapState.page is roster"
else
  log_fail "slapState.page" "Expected roster, got: $PAGE"
fi

TOTAL=$(browser_eval "window.slapState?.totalReviewers")
if [ "$TOTAL" = "23" ]; then
  log_pass "slapState.totalReviewers is 23"
else
  log_fail "totalReviewers" "Expected 23, got: $TOTAL"
fi

EXPERT_COUNT=$(browser_eval "window.slapState?.expertCount")
if [ "$EXPERT_COUNT" = "5" ]; then
  log_pass "slapState.expertCount is 5"
else
  log_fail "expertCount" "Expected 5, got: $EXPERT_COUNT"
fi

PERSONA_COUNT=$(browser_eval "window.slapState?.personaCount")
if [ "$PERSONA_COUNT" = "18" ]; then
  log_pass "slapState.personaCount is 18"
else
  log_fail "personaCount" "Expected 18, got: $PERSONA_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Top bar elements
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Top bar"

check_testid "roster-topbar" "Top bar present"
check_testid "roster-back" "Back button present"

TITLE_TEXT=$(browser_eval "document.querySelector('[data-testid=\"roster-page\"]')?.textContent || ''")
if echo "$TITLE_TEXT" | grep -q "ROSTER"; then
  log_pass "Page title shows ROSTER"
else
  log_fail "ROSTER title missing"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: All 23 reviewer cards
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: All reviewer cards"

CARD_COUNT=$(browser_eval "document.querySelectorAll('[data-testid^=\"roster-card-\"]').length")
if [ "$CARD_COUNT" = "23" ]; then
  log_pass "All 23 reviewer cards rendered"
else
  log_fail "Card count" "Expected 23, got: $CARD_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: Expert section
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Expert section"

check_testid "roster-experts-section" "Expert section present"

# Check each expert card
for eid in marketing ux product technical design; do
  HAS_CARD=$(browser_eval "!!document.querySelector('[data-testid=\"roster-card-${eid}\"]')")
  if [ "$HAS_CARD" = "true" ]; then
    log_pass "Expert card: ${eid}"
  else
    log_fail "Expert card missing: ${eid}"
  fi
done

# ══════════════════════════════════════════════════════════════
# TEST 6: Persona section & categories
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Persona categories"

check_testid "roster-personas-section" "Persona section present"

for cat in accessibility tech-spectrum role-based emotional-state context cultural-taste; do
  HAS_CAT=$(browser_eval "!!document.querySelector('[data-testid=\"roster-category-${cat}\"]')")
  if [ "$HAS_CAT" = "true" ]; then
    log_pass "Category group: ${cat}"
  else
    log_fail "Category missing: ${cat}"
  fi
done

# ══════════════════════════════════════════════════════════════
# TEST 7: Card content (spot check Marketing expert)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Card content"

# Name
MKTG_NAME=$(browser_eval "document.querySelector('[data-testid=\"roster-name-marketing\"]')?.textContent")
if [ "$MKTG_NAME" = "MARKETING" ]; then
  log_pass "Marketing name correct"
else
  log_fail "Marketing name" "Expected MARKETING, got: $MKTG_NAME"
fi

# Role
MKTG_ROLE=$(browser_eval "document.querySelector('[data-testid=\"roster-role-marketing\"]')?.textContent")
if echo "$MKTG_ROLE" | grep -qi "positioning"; then
  log_pass "Marketing role contains 'positioning'"
else
  log_fail "Marketing role" "Got: $MKTG_ROLE"
fi

# Bias
MKTG_BIAS=$(browser_eval "document.querySelector('[data-testid=\"roster-bias-marketing\"]')?.textContent")
if echo "$MKTG_BIAS" | grep -qi "sell"; then
  log_pass "Marketing bias contains 'sell'"
else
  log_fail "Marketing bias" "Got: $MKTG_BIAS"
fi

# Avatar
HAS_AVATAR=$(browser_eval "!!document.querySelector('[data-testid=\"roster-avatar-marketing\"]')")
if [ "$HAS_AVATAR" = "true" ]; then
  log_pass "Marketing avatar present"
else
  log_fail "Marketing avatar missing"
fi

# Score
MKTG_SCORE=$(browser_eval "document.querySelector('[data-testid=\"roster-score-marketing\"]')?.textContent")
if echo "$MKTG_SCORE" | grep -q "[0-9]"; then
  log_pass "Marketing score displayed: $MKTG_SCORE"
else
  log_fail "Marketing score missing"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Persona card content (spot check Elena)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Persona card content"

ELENA_NAME=$(browser_eval "document.querySelector('[data-testid=\"roster-name-elena\"]')?.textContent")
if [ "$ELENA_NAME" = "Elena" ]; then
  log_pass "Elena name correct"
else
  log_fail "Elena name" "Expected Elena, got: $ELENA_NAME"
fi

# Taste (persona-only field)
HAS_TASTE=$(browser_eval "!!document.querySelector('[data-testid=\"roster-taste-elena\"]')")
if [ "$HAS_TASTE" = "true" ]; then
  log_pass "Elena has taste field"
else
  log_fail "Elena taste field missing"
fi

ELENA_TASTE=$(browser_eval "document.querySelector('[data-testid=\"roster-taste-elena\"]')?.textContent")
if echo "$ELENA_TASTE" | grep -qi "podcast\|keyboard"; then
  log_pass "Elena taste has persona-specific content"
else
  log_fail "Elena taste content" "Got: $ELENA_TASTE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Filter by category
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Category filter"

check_testid "roster-filters" "Filter row present"
check_testid "roster-filter-all" "ALL filter chip present"
check_testid "roster-filter-accessibility" "Accessibility filter chip present"

# Click accessibility filter
click_testid "roster-filter-accessibility"
sleep 0.5

FILTER_STATE=$(browser_eval "window.slapState?.activeFilter")
if [ "$FILTER_STATE" = "accessibility" ]; then
  log_pass "Filter state is accessibility"
else
  log_fail "Filter state" "Expected accessibility, got: $FILTER_STATE"
fi

# Only accessibility category should be visible
VISIBLE_CATS=$(browser_eval "document.querySelectorAll('[data-testid^=\"roster-category-\"]').length")
if [ "$VISIBLE_CATS" = "1" ]; then
  log_pass "Only 1 category visible when filtered"
else
  log_fail "Filtered categories" "Expected 1, got: $VISIBLE_CATS"
fi

# Accessibility personas should still be visible
for pid in marcus elena priya; do
  HAS_CARD=$(browser_eval "!!document.querySelector('[data-testid=\"roster-card-${pid}\"]')")
  if [ "$HAS_CARD" = "true" ]; then
    log_pass "Persona ${pid} visible in accessibility filter"
  else
    log_fail "Persona ${pid} missing in accessibility filter"
  fi
done

# Non-accessibility persona should be hidden (they're in hidden category groups)
HAS_FRANK=$(browser_eval "!!document.querySelector('[data-testid=\"roster-category-emotional-state\"]')")
if [ "$HAS_FRANK" = "false" ]; then
  log_pass "Emotional state category hidden when filtering"
else
  log_fail "Emotional state category should be hidden"
fi

# Reset filter
click_testid "roster-filter-all"
sleep 0.5

ALL_CATS=$(browser_eval "document.querySelectorAll('[data-testid^=\"roster-category-\"]').length")
if [ "$ALL_CATS" = "6" ]; then
  log_pass "All 6 categories visible after reset"
else
  log_fail "Reset categories" "Expected 6, got: $ALL_CATS"
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Back button navigation
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Back button"

click_testid "roster-back"
sleep 1

# Should be on landing page
CURRENT_URL=$(browser_eval "window.location.hash")
if [ "$CURRENT_URL" = "" ] || [ "$CURRENT_URL" = "#" ]; then
  log_pass "Back button returns to landing page"
else
  log_fail "Back navigation" "Expected empty hash, got: $CURRENT_URL"
fi

# ══════════════════════════════════════════════════════════════
# TEST 11: Card click navigates to workspace
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Card click navigation"

# Navigate back to roster
browser_eval "window.location.hash = '#/roster'"
sleep 2

click_testid "roster-card-marketing"
sleep 1

CURRENT_URL=$(browser_eval "window.location.hash")
if echo "$CURRENT_URL" | grep -q "flowboard"; then
  log_pass "Card click navigates to flowboard workspace"
else
  log_fail "Card navigation" "Expected flowboard in hash, got: $CURRENT_URL"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Expert cards have no taste field
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Expert vs persona fields"

# Navigate back to roster
browser_eval "window.location.hash = '#/roster'"
sleep 2

HAS_EXPERT_TASTE=$(browser_eval "!!document.querySelector('[data-testid=\"roster-taste-marketing\"]')")
if [ "$HAS_EXPERT_TASTE" = "false" ]; then
  log_pass "Expert (marketing) has no taste field"
else
  log_fail "Expert should not have taste field"
fi

HAS_PERSONA_TASTE=$(browser_eval "!!document.querySelector('[data-testid=\"roster-taste-frank\"]')")
if [ "$HAS_PERSONA_TASTE" = "true" ]; then
  log_pass "Persona (frank) has taste field"
else
  log_fail "Frank missing taste field"
fi

# ══════════════════════════════════════════════════════════════
# TEST 13: Score colors
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Score display"

# Check that scores are rendered for all experts
SCORES_COUNT=$(browser_eval "document.querySelectorAll('[data-testid^=\"roster-score-\"]').length")
if [ "$SCORES_COUNT" -ge 5 ]; then
  log_pass "At least 5 score badges rendered: $SCORES_COUNT"
else
  log_fail "Score badges" "Expected >= 5, got: $SCORES_COUNT"
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
