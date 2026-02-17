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

if open_page "${BASE_URL}/#/example/v1"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2  # Let React render + animations settle

check_testid "design-workspace" "Workspace root element"
check_testid "workspace-topbar" "TopBar present"
check_testid "bubble-rail" "BubbleRail present"
check_testid "example-design" "ExampleDesign component rendered"

# ══════════════════════════════════════════════════════════════
# TEST 2: All 4 data-section elements present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Design sections"

SECTION_COUNT=$(browser_eval "document.querySelectorAll('[data-section]').length")
if [ "$SECTION_COUNT" = "4" ]; then
  log_pass "4 data-section elements present"
else
  log_fail "Section count" "Expected 4, got $SECTION_COUNT"
fi

check_testid "section-hero" "Hero section present"
check_testid "section-features" "Features section present"
check_testid "section-pricing" "Pricing section present"
check_testid "section-cta" "CTA section present"

# ══════════════════════════════════════════════════════════════
# TEST 3: BubbleRail with expert bubbles
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: BubbleRail experts"

BUBBLE_COUNT=$(browser_eval "document.querySelectorAll('[data-testid^=\"bubble-\"]').length")
# 5 expert bubbles + mode toggle buttons etc.
EXPERT_BUBBLES=$(browser_eval "
  (function() {
    var ids = ['marketing','ux','product','technical','design'];
    var count = 0;
    for (var id of ids) {
      if (document.querySelector('[data-testid=\"bubble-' + id + '\"]')) count++;
    }
    return count;
  })()
")
if [ "$EXPERT_BUBBLES" = "5" ]; then
  log_pass "5 expert bubbles rendered in EXPERTS mode"
else
  log_fail "Expert bubble count" "Expected 5, got $EXPERT_BUBBLES"
fi

check_testid "bubble-mode-experts" "EXPERTS mode button present"
check_testid "bubble-mode-personas" "PERSONAS mode button present"

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
# TEST 5: Bubble click → popover opens
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Bubble click → popover"

click_testid "bubble-marketing"
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
# TEST 10: Mode toggle EXPERTS → PERSONAS
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Mode toggle"

click_testid "bubble-mode-personas"
sleep 0.5

# Persona bubbles should appear
PERSONA_BUBBLES=$(browser_eval "
  (function() {
    var ids = ['marcus','elena','priya','dorothy','kevin','raj','carlos','jasmine','tommy','frank','diana','sarah','sam','maya','mike','yuki','dex','nora'];
    var count = 0;
    for (var id of ids) {
      if (document.querySelector('[data-testid=\"bubble-' + id + '\"]')) count++;
    }
    return count;
  })()
")
if [ "$PERSONA_BUBBLES" -gt 0 ] 2>/dev/null; then
  log_pass "Persona bubbles appear after toggle ($PERSONA_BUBBLES personas)"
else
  log_fail "Persona toggle" "No persona bubbles found"
fi

# Switch back to experts
click_testid "bubble-mode-experts"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 11: Version switching via TopBar pill
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Version switching"

check_testid "topbar-version-v1" "v1 pill present"
check_testid "topbar-version-v2" "v2 pill present"

click_testid "topbar-version-v2"
sleep 1  # Let wipe transition complete

# Check design switched to v2 (dark theme)
V2_BG=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"example-design\"]');
    if (!el) return 'missing';
    return getComputedStyle(el).backgroundColor;
  })()
")
# v2 has dark background (#0D0D1A = rgb(13, 13, 26))
if echo "$V2_BG" | grep -q "rgb(13, 13, 26)"; then
  log_pass "Version switched to v2 (dark background)"
else
  log_fail "Version switch" "Background: $V2_BG (expected dark)"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Score visible on version pills
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Version pill scores"

V1_PILL_TEXT=$(browser_eval "document.querySelector('[data-testid=\"topbar-version-v1\"]')?.textContent?.trim()")
V2_PILL_TEXT=$(browser_eval "document.querySelector('[data-testid=\"topbar-version-v2\"]')?.textContent?.trim()")

if echo "$V1_PILL_TEXT" | grep -qE '[0-9]+\.[0-9]'; then
  log_pass "v1 pill shows score: $V1_PILL_TEXT"
else
  log_fail "v1 pill score" "Got: $V1_PILL_TEXT"
fi

if echo "$V2_PILL_TEXT" | grep -qE '[0-9]+\.[0-9]'; then
  log_pass "v2 pill shows score: $V2_PILL_TEXT"
else
  log_fail "v2 pill score" "Got: $V2_PILL_TEXT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 13: Back button returns to landing
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Back button"

click_testid "topbar-back"
sleep 1

LANDING_PRESENT=$(browser_eval "!!document.querySelector('[data-testid=\"landing-page\"]')")
if [ "$LANDING_PRESENT" = "true" ]; then
  log_pass "Back button returns to landing page"
else
  log_fail "Back button" "Landing page not found after back"
fi

# ══════════════════════════════════════════════════════════════
# TEST 14: window.slapState correct
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 14: window.slapState"

# Navigate back to workspace
open_page "${BASE_URL}/#/example/v1"
sleep 2

SLAP_STATE=$(browser_eval "JSON.stringify(window.slapState)")

if echo "$SLAP_STATE" | grep -q '"project":"example"'; then
  log_pass "slapState.project = example"
else
  log_fail "slapState.project" "Got: $SLAP_STATE"
fi

if echo "$SLAP_STATE" | grep -q '"version":"v1"'; then
  log_pass "slapState.version = v1"
else
  log_fail "slapState.version" "Got: $SLAP_STATE"
fi

if echo "$SLAP_STATE" | grep -q '"sections"'; then
  log_pass "slapState.sections exposed"
else
  log_fail "slapState.sections" "Missing from slapState"
fi

# ══════════════════════════════════════════════════════════════
# TEST 15: Landing → KEEP & CONTINUE → workspace
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 15: Landing → workspace flow"

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

WORKSPACE_PRESENT=$(browser_eval "!!document.querySelector('[data-testid=\"design-workspace\"]')")
if [ "$WORKSPACE_PRESENT" = "true" ]; then
  log_pass "KEEP & CONTINUE navigates to workspace"
else
  log_fail "Landing to workspace flow" "Workspace not found after KEEP"
fi

# ══════════════════════════════════════════════════════════════
# TEST 16: Direct URL navigation (#/example/v2)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 16: Direct URL to v2"

open_page "${BASE_URL}/#/example/v2"
sleep 2

V2_DIRECT_BG=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"example-design\"]');
    if (!el) return 'missing';
    return getComputedStyle(el).backgroundColor;
  })()
")
if echo "$V2_DIRECT_BG" | grep -q "rgb(13, 13, 26)"; then
  log_pass "Direct URL #/example/v2 loads v2 design"
else
  log_fail "Direct v2 URL" "Background: $V2_DIRECT_BG"
fi

# ══════════════════════════════════════════════════════════════
# TEST 17: Default version fallback (#/example → v1)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 17: Default version fallback"

open_page "${BASE_URL}/#/example"
sleep 2

DEFAULT_STATE=$(browser_eval "JSON.stringify(window.slapState)")
if echo "$DEFAULT_STATE" | grep -q '"version":"v1"'; then
  log_pass "#/example defaults to v1"
else
  log_fail "Default version" "Got: $DEFAULT_STATE"
fi

# ══════════════════════════════════════════════════════════════
# TEST 18: Invalid project fallback
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 18: Invalid project"

open_page "${BASE_URL}/#/nonexistent"
sleep 1

check_testid "project-not-found" "Project not found message"

# ══════════════════════════════════════════════════════════════
# TEST 19: Backdrop click dismisses overlays
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 19: Backdrop dismiss"

open_page "${BASE_URL}/#/example/v1"
sleep 2

click_testid "bubble-marketing"
sleep 0.5

# Verify popover opened
POPOVER_BEFORE=$(browser_eval "
  getComputedStyle(document.querySelector('[data-testid=\"bubble-popover\"]')).opacity
")
if [ "$POPOVER_BEFORE" = "1" ]; then
  log_pass "Popover open before backdrop click"
else
  log_fail "Popover pre-check" "Opacity: $POPOVER_BEFORE"
fi

click_testid "workspace-backdrop"
sleep 0.5

POPOVER_AFTER=$(browser_eval "
  getComputedStyle(document.querySelector('[data-testid=\"bubble-popover\"]')).opacity
")
if [ "$POPOVER_AFTER" = "0" ]; then
  log_pass "Backdrop click dismisses popover"
else
  log_fail "Backdrop dismiss" "Popover opacity after: $POPOVER_AFTER"
fi

# ══════════════════════════════════════════════════════════════
# TEST 20: Section highlight on chip hover
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 20: Section highlight"

click_testid "bubble-marketing"
sleep 0.5

# Hover a chip via JS (can't truly hover with agent-browser easily)
HIGHLIGHT_RESULT=$(browser_eval "
  (function() {
    var chips = document.querySelector('[data-testid=\"bubble-popover\"]')?.querySelectorAll('span') || [];
    for (var c of chips) {
      var t = c.textContent.trim().toLowerCase();
      if (t.includes('hero')) {
        c.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));
        return 'hovered';
      }
    }
    return 'no-chip';
  })()
")
sleep 1

if [ "$HIGHLIGHT_RESULT" = "hovered" ]; then
  HIGHLIGHT_EXISTS=$(browser_eval "!!document.querySelector('[data-testid=\"section-highlight-overlay\"]')")
  if [ "$HIGHLIGHT_EXISTS" = "true" ]; then
    log_pass "Section highlight overlay appears on chip hover"
  else
    log_fail "Section highlight" "No highlight overlay or indicator found"
  fi
else
  log_fail "Chip hover" "Could not find hero chip to hover"
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
