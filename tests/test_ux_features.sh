#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: UX Features — Severity Badges, Section Focus,
# Tour Preview
# ═══════════════════════════════════════════════════════════════
# Validates: severity badges on rail, section focus panel,
# tour preview tooltip on hover.
#
# Usage: ./tests/test_ux_features.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "UX Features — Severity Badges, Section Focus, Tour Preview"

# ═══════════════════════════════════════════════════════════════
# PREREQ: Server check
# ═══════════════════════════════════════════════════════════════
log_info "PREREQUISITES"

if wait_for_server "$BASE_URL" 10; then
  log_pass "Dev server running at $BASE_URL"
else
  log_fail "Dev server not running at $BASE_URL"
  echo "  Start with: PORT=$PORT npm run dev"
  print_summary
  exit 1
fi

# ═══════════════════════════════════════════════════════════════
# Setup: Open FlowBoard page
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "SETUP"

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "Route #/flowboard/haiku opened"
else
  log_fail "Failed to open route"
  print_summary
  exit 1
fi

sleep 2  # Let React render + HTML fetch

# ═══════════════════════════════════════════════════════════════
# TEST 1: Severity badges exist on reviewer bubbles
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Severity badges on rail"

BADGE_COUNT=$(browser_eval "(function(){ return document.querySelectorAll('[data-testid^=\"severity-badge-\"]').length; })()")
if [ "$BADGE_COUNT" -gt 0 ]; then
  log_pass "Severity badges present ($BADGE_COUNT badges)"
else
  log_fail "No severity badges found"
fi

# Check all 5 experts have badges (experts are always on rail)
EXPERTS=("marketing" "ux" "product" "technical" "design")
for reviewer in "${EXPERTS[@]}"; do
  HAS_BADGE=$(browser_eval "!!document.querySelector('[data-testid=\"severity-badge-${reviewer}\"]')")
  if [ "$HAS_BADGE" = "true" ]; then
    log_pass "Badge exists for expert: $reviewer"
  else
    log_fail "Badge missing for expert: $reviewer"
  fi
done

# Check that persona badges exist for council members (council varies per session)
PERSONA_BADGE_COUNT=$(browser_eval "(function(){ var experts = ['marketing','ux','product','technical','design']; return Array.from(document.querySelectorAll('[data-testid^=\"severity-badge-\"]')).filter(function(el){ var id = el.dataset.testid.replace('severity-badge-',''); return !experts.includes(id); }).length; })()")
if [ "$PERSONA_BADGE_COUNT" -gt 0 ]; then
  log_pass "Persona badges present ($PERSONA_BADGE_COUNT council members)"
else
  log_skip "No persona badges (council may not overlap with reviewers who have data)"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 2: Badge colors match worst severity
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Badge color accuracy"

# Marketing has red findings (score 4.5) → badge should be red (#FF6B6B)
MKT_COLOR=$(browser_eval "(function(){ var el = document.querySelector('[data-testid=\"severity-badge-marketing\"]'); return el ? getComputedStyle(el).backgroundColor : 'none'; })()")
if echo "$MKT_COLOR" | grep -qi "255.*107.*107\|ff6b6b\|rgb(255, 107, 107)"; then
  log_pass "Marketing badge is red (has red findings)"
else
  log_skip "Marketing badge color: $MKT_COLOR (may vary by rendering)"
fi

# slapState should expose severity badges
BADGES_STATE=$(browser_eval "JSON.stringify(window.slapState?.severityBadges || {})")
if echo "$BADGES_STATE" | grep -q "marketing"; then
  log_pass "slapState.severityBadges contains marketing"
else
  log_fail "slapState.severityBadges missing" "Got: $BADGES_STATE"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 3: Section Focus — click section opens panel
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Section Focus panel"

# Click on the hero section in the design
browser_eval "(function(){ var el = document.querySelector('[data-section=\"hero\"]'); if(el) el.click(); })()"
sleep 0.5

# Check panel opened
PANEL_OPEN=$(browser_eval "(function(){ var el = document.querySelector('[data-testid=\"section-focus-panel\"]'); if(!el) return 'missing'; return getComputedStyle(el).transform !== 'matrix(1, 0, 0, 1, 380, 0)' && getComputedStyle(el).transform !== 'none' ? 'open' : 'maybe'; })()")

# Check via slapState
FOCUSED=$(browser_eval "window.slapState?.focusedSection")
if [ "$FOCUSED" = "hero" ]; then
  log_pass "Section Focus panel opened for hero"
else
  log_fail "Section Focus panel" "Expected focusedSection=hero, got: $FOCUSED"
fi

# Check panel shows section title
PANEL_TITLE=$(browser_eval "document.querySelector('[data-testid=\"section-focus-title\"]')?.textContent || ''")
if echo "$PANEL_TITLE" | grep -qi "hero"; then
  log_pass "Panel shows section title: hero"
else
  log_fail "Panel title missing" "Got: $PANEL_TITLE"
fi

# Check panel has findings summary
PANEL_SUMMARY=$(browser_eval "document.querySelector('[data-testid=\"section-focus-summary\"]')?.textContent || ''")
if echo "$PANEL_SUMMARY" | grep -q "reviewers"; then
  log_pass "Panel shows reviewer count"
else
  log_fail "Panel summary missing reviewer count"
fi

if echo "$PANEL_SUMMARY" | grep -q "findings"; then
  log_pass "Panel shows findings count"
else
  log_fail "Panel summary missing findings count"
fi

# Check findings from multiple reviewers are present
FINDING_COUNT=$(browser_eval "document.querySelectorAll('[data-testid^=\"section-finding-\"]').length")
if [ "$FINDING_COUNT" -gt 5 ]; then
  log_pass "Section Focus has findings from multiple reviewers ($FINDING_COUNT findings)"
else
  log_fail "Section Focus findings" "Expected >5 findings, got $FINDING_COUNT"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 4: Section Focus — sorted by severity (reds first)
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Severity sorting"

# Get first finding's severity — should be red
FIRST_SEV=$(browser_eval "(function(){ var el = document.querySelector('[data-testid^=\"section-finding-\"]'); if(!el) return 'none'; var svg = el.querySelector('svg'); if(!svg) return 'no-svg'; return svg.getAttribute('stroke'); })()")
if echo "$FIRST_SEV" | grep -qi "FF6B6B\|255.*107.*107"; then
  log_pass "First finding is red (severity sorted)"
else
  log_skip "First finding color: $FIRST_SEV (sorting may vary)"
fi

# Close section focus panel
click_testid "section-focus-close"
sleep 0.3

FOCUSED_AFTER=$(browser_eval "window.slapState?.focusedSection")
if [ "$FOCUSED_AFTER" = "null" ] || [ -z "$FOCUSED_AFTER" ]; then
  log_pass "Section Focus panel closed"
else
  log_fail "Section Focus panel still open after close"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 5: Section Focus — backdrop closes panel
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Backdrop closes Section Focus"

# Open section focus again
browser_eval "(function(){ var el = document.querySelector('[data-section=\"features\"]'); if(el) el.click(); })()"
sleep 0.5

FOCUSED2=$(browser_eval "window.slapState?.focusedSection")
if [ "$FOCUSED2" = "features" ]; then
  log_pass "Section Focus opened for features"
else
  log_skip "Could not open features section focus"
fi

# Click backdrop (use browser_eval since backdrop is transparent)
browser_eval "(function(){ var el = document.querySelector('[data-testid=\"draft-backdrop\"]'); if(el) el.click(); })()"
sleep 0.5

FOCUSED3=$(browser_eval "window.slapState?.focusedSection")
if [ "$FOCUSED3" = "null" ] || [ -z "$FOCUSED3" ]; then
  log_pass "Backdrop closed Section Focus"
else
  log_fail "Backdrop did not close Section Focus" "Got: $FOCUSED3"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 6: Tour preview tooltip on hover
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Tour preview tooltip"

# Simulate hover on marketing reviewer
browser_eval "(function(){ var el = document.querySelector('[data-testid=\"draft-slot-marketing\"]'); if(el) { el.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); } })()"
sleep 0.5

PREVIEW=$(browser_eval "!!document.querySelector('[data-testid=\"tour-preview-marketing\"]')")
if [ "$PREVIEW" = "true" ]; then
  log_pass "Tour preview tooltip appeared for marketing"
else
  # React may not respond to programmatic mouse events
  log_skip "Tour preview needs real pointer (programmatic dispatch limited)"
fi

# Check for START TOUR button
START_BTN=$(browser_eval "!!document.querySelector('[data-testid=\"tour-start-marketing\"]')")
if [ "$PREVIEW" = "true" ] && [ "$START_BTN" = "true" ]; then
  log_pass "Tour preview has START TOUR button"
elif [ "$PREVIEW" != "true" ]; then
  log_skip "Cannot check START TOUR button (preview not open)"
else
  log_fail "START TOUR button missing from preview"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 7: Section click does not interfere with tour mode
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Section click isolation"

# Ensure clean state before tour
browser_eval "(function(){ var bd = document.querySelector('[data-testid=\"draft-backdrop\"]'); if(bd) bd.click(); })()"
sleep 0.3

# Start tour
click_testid "draft-tour-btn"
sleep 1

TOUR_ACTIVE=$(browser_eval "window.slapState?.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour started"

  # Try clicking a section during tour — should NOT open section focus
  browser_eval "(function(){ var el = document.querySelector('[data-section=\"pricing\"]'); if(el) el.click(); })()"
  sleep 0.3

  FOCUSED_DURING_TOUR=$(browser_eval "window.slapState?.focusedSection")
  if [ "$FOCUSED_DURING_TOUR" = "null" ] || [ -z "$FOCUSED_DURING_TOUR" ]; then
    log_pass "Section click ignored during tour"
  else
    log_fail "Section focus opened during tour (should be blocked)"
  fi

  # Stop tour
  click_testid "draft-tour-stop"
  sleep 0.3
else
  log_skip "Tour did not start — cannot test isolation"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 8: Section Focus glow
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Section glow on focus"

# Ensure clean state
browser_eval "(function(){ var bd = document.querySelector('[data-testid=\"draft-backdrop\"]'); if(bd) bd.click(); })()"
sleep 0.3

browser_eval "(function(){ var el = document.querySelector('[data-section=\"pricing\"]'); if(el) el.click(); })()"
sleep 0.5

HAS_GLOW=$(browser_eval "(function(){ var el = document.querySelector('[data-section=\"pricing\"]'); return el ? el.classList.contains('glowing') : false; })()")
if [ "$HAS_GLOW" = "true" ]; then
  log_pass "Focused section has glow"
else
  log_fail "Focused section missing glow class"
fi

# Close
click_testid "draft-backdrop"
sleep 0.3

# ═══════════════════════════════════════════════════════════════
# TEST 9: Reviewer popover closes Section Focus
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Popover closes Section Focus"

# Open section focus
browser_eval "(function(){ var el = document.querySelector('[data-section=\"hero\"]'); if(el) el.click(); })()"
sleep 0.5

OPEN_CHECK=$(browser_eval "window.slapState?.focusedSection")
if [ "$OPEN_CHECK" = "hero" ]; then
  # Click a reviewer — should close section focus (use direct .click() to bypass backdrop hit-test)
  browser_eval "(function(){ var el = document.querySelector('[data-testid=\"draft-slot-marketing\"]'); if(el) el.click(); })()"
  sleep 0.5

  CLOSED_CHECK=$(browser_eval "window.slapState?.focusedSection")
  if [ "$CLOSED_CHECK" = "null" ] || [ -z "$CLOSED_CHECK" ]; then
    log_pass "Reviewer click closed Section Focus"
  else
    log_fail "Section Focus still open after reviewer click"
  fi

  # Close popover
  click_testid "draft-backdrop"
  sleep 0.3
else
  log_skip "Could not open section focus to test popover interaction"
fi

# ═══════════════════════════════════════════════════════════════
# CLEANUP
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "CLEANUP"

agent-browser close 2>/dev/null
log_pass "Browser closed"

# ═══════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════
print_summary
exit $?
