#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Inline HTML Viewport System
# ═══════════════════════════════════════════════════════════════
# Tests: FlowBoard route loads, HTML injected inline, scoped CSS,
# glow/highlight on injected content, tour walks through sections,
# theme sync, navigation between React and HTML projects.
#
# Usage: ./tests/test_iframe.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Inline HTML Viewport E2E Tests"

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
# TEST 1: FlowBoard route loads
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: FlowBoard route loads"

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "FlowBoard page opened"
else
  log_fail "Failed to open FlowBoard page"
  print_summary
  exit 1
fi

sleep 3  # Let React render + HTML fetch/inject

# Check workspace rendered
check_testid "draft-workspace" "Workspace element present"

# Check project info
PROJ=$(browser_eval "window.slapState?.project")
if [ "$PROJ" = "flowboard" ]; then
  log_pass "slapState.project is flowboard"
else
  log_fail "slapState.project" "Expected flowboard, got: $PROJ"
fi

VER=$(browser_eval "window.slapState?.version")
if [ "$VER" = "haiku" ]; then
  log_pass "slapState.version is haiku"
else
  log_fail "slapState.version" "Expected haiku, got: $VER"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: Inline HTML container present and content loaded
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Inline HTML container and content"

HAS_CONTAINER=$(browser_eval "!!document.querySelector('[data-testid=\"design-html\"]')")
if [ "$HAS_CONTAINER" = "true" ]; then
  log_pass "HTML container present (data-testid=design-html)"
else
  log_fail "HTML container not found"
fi

IS_HTML=$(browser_eval "window.slapState?.isHtmlProject")
if [ "$IS_HTML" = "true" ]; then
  log_pass "slapState.isHtmlProject is true"
else
  log_fail "slapState.isHtmlProject" "Expected true, got: $IS_HTML"
fi

CONTENT_READY=$(browser_eval "window.slapState?.contentReady")
if [ "$CONTENT_READY" = "true" ]; then
  log_pass "slapState.contentReady is true"
else
  log_fail "slapState.contentReady" "Expected true, got: $CONTENT_READY"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Injected content has data-section attributes
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Injected content has data-section attributes"

SECTION_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"design-html\"] [data-section]').length")
if [ "$SECTION_COUNT" -ge 5 ]; then
  log_pass "Injected content has $SECTION_COUNT data-section elements"
else
  log_fail "Section count" "Expected >=5, got: $SECTION_COUNT"
fi

# Check specific sections exist in the host document
for SEC in hero features pricing testimonials cta; do
  HAS_SEC=$(browser_eval "!!document.querySelector('[data-section=\"$SEC\"]')")
  if [ "$HAS_SEC" = "true" ]; then
    log_pass "Host document has data-section='$SEC'"
  else
    log_fail "Missing data-section='$SEC'"
  fi
done

# Check slapState.sections matches project config
SECTIONS=$(browser_eval "JSON.stringify(window.slapState?.sections)")
if echo "$SECTIONS" | grep -q "testimonials"; then
  log_pass "slapState.sections includes 'testimonials'"
else
  log_fail "slapState.sections missing 'testimonials'" "Got: $SECTIONS"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Scoped CSS injected (no leak to SLAP UI)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Scoped CSS for injected HTML"

# Check that design styles are present and scoped
HAS_SCOPED_CSS=$(browser_eval "!!document.querySelector('[data-design-styles]')")
if [ "$HAS_SCOPED_CSS" = "true" ]; then
  log_pass "Design styles injected with data-design-styles attribute"
else
  log_fail "Design styles not found"
fi

# Verify CSS is scoped under .slap-design
CSS_SCOPED=$(browser_eval "
  (function() {
    var style = document.querySelector('[data-design-styles]');
    if (!style) return false;
    var text = style.textContent || '';
    return text.indexOf('.slap-design') !== -1;
  })()
")
if [ "$CSS_SCOPED" = "true" ]; then
  log_pass "CSS selectors scoped under .slap-design"
else
  log_fail "CSS not scoped under .slap-design"
fi

# Verify SLAP topbar is NOT affected by design CSS (font-family should be Courier)
TOPBAR_FONT=$(browser_eval "
  (function() {
    var tb = document.querySelector('[data-testid=\"draft-topbar\"]');
    if (!tb) return 'unknown';
    return getComputedStyle(tb).fontFamily;
  })()
")
if echo "$TOPBAR_FONT" | grep -qi "courier"; then
  log_pass "SLAP topbar font not overridden by design CSS"
else
  log_fail "SLAP topbar font may be leaked" "Got: $TOPBAR_FONT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: Click reviewer → popover opens with FlowBoard data
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Reviewer click → popover with FlowBoard review"

# Click the marketing reviewer
click_testid "draft-slot-marketing"
sleep 1.5

TIER=$(browser_eval "window.slapState?.overlayTier")
if [ "$TIER" = "2" ]; then
  log_pass "Popover opened (overlayTier=2)"
else
  log_fail "Popover overlayTier" "Expected 2, got: $TIER"
fi

# Check popover content
POPOVER_TEXT=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"bubble-popover\"]');
    return el ? el.textContent : 'none';
  })()
")
if echo "$POPOVER_TEXT" | grep -q "4.5"; then
  log_pass "Popover shows FlowBoard marketing score (4.5)"
else
  log_fail "Popover score" "Expected 4.5 in popover text, got: ${POPOVER_TEXT:0:80}"
fi

if echo "$POPOVER_TEXT" | grep -q "MARKETING"; then
  log_pass "Popover shows MARKETING reviewer name"
else
  log_fail "Popover name" "Expected MARKETING in text"
fi

# Close popover
browser_eval "document.querySelector('[data-testid=\"draft-backdrop\"]')?.click()" >/dev/null
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 6: Section glow (skip — needs React events)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Section glow via chip hover"
log_skip "Chip hover glow requires React synthetic events (tested via tour in TEST 8)"

# ══════════════════════════════════════════════════════════════
# TEST 7: Theme toggle syncs to .slap-design container
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Theme sync to inline design container"

# Get current theme on .slap-design
INITIAL_THEME=$(browser_eval "
  document.querySelector('.slap-design')?.getAttribute('data-theme') || 'none'
")
log_info "Initial design theme: $INITIAL_THEME"

# Toggle theme
browser_eval "document.querySelector('[data-testid=\"theme-toggle\"]')?.click()" >/dev/null
sleep 0.5

AFTER_THEME=$(browser_eval "
  document.querySelector('.slap-design')?.getAttribute('data-theme') || 'none'
")

if [ "$INITIAL_THEME" != "$AFTER_THEME" ]; then
  log_pass "Theme toggled on .slap-design ($INITIAL_THEME → $AFTER_THEME)"
else
  log_fail "Theme did not change" "Before: $INITIAL_THEME, after: $AFTER_THEME"
fi

# Toggle back
browser_eval "document.querySelector('[data-testid=\"theme-toggle\"]')?.click()" >/dev/null
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 8: Tour starts and walks through sections
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Tour on inline HTML project"

# Click marketing reviewer via JS
browser_eval "document.querySelector('[data-testid=\"draft-slot-marketing\"]')?.click()" >/dev/null
sleep 1

# Start tour via JS click
browser_eval "document.querySelector('[data-testid=\"draft-tour-btn\"]')?.click()" >/dev/null
sleep 1.5

TOUR_ACTIVE=$(browser_eval "window.slapState?.tourActive")
if [ "$TOUR_ACTIVE" = "true" ]; then
  log_pass "Tour started"
else
  log_fail "Tour did not start" "tourActive: $TOUR_ACTIVE"
fi

# Check finding is shown
FINDING=$(browser_eval "window.slapState?.currentFinding")
if [ -n "$FINDING" ] && [ "$FINDING" != "null" ]; then
  log_pass "Tour finding displayed: ${FINDING:0:50}..."
else
  log_fail "No finding displayed" "currentFinding: $FINDING"
fi

# Check section spotlight (glowing class on host document section)
HAS_GLOW=$(browser_eval "!!document.querySelector('[data-section].glowing')")
if [ "$HAS_GLOW" = "true" ]; then
  log_pass "Section glow active in host document during tour"
else
  log_fail "No glowing section found during tour"
fi

# Navigate to next step
browser_eval "document.querySelector('[data-testid=\"draft-next\"]')?.click()" >/dev/null
sleep 0.5

STEP=$(browser_eval "window.slapState?.tourStep")
if [ "$STEP" = "1" ]; then
  log_pass "Tour advanced to step 1"
else
  log_fail "Tour step" "Expected 1, got: $STEP"
fi

# Check breadcrumbs include testimonials
SNAP=$(agent-browser snapshot -c 2>/dev/null)
if echo "$SNAP" | grep -qi "TEST"; then
  log_pass "Breadcrumbs show TEST (testimonials label)"
else
  log_fail "Breadcrumbs missing TEST label"
fi

# Check total steps
TOTAL=$(browser_eval "window.slapState?.tourTotalSteps")
if [ "$TOTAL" -ge 5 ]; then
  log_pass "Tour has $TOTAL steps (across FlowBoard sections)"
else
  log_fail "Tour step count" "Expected >=5, got: $TOTAL"
fi

# Stop tour
browser_eval "document.querySelector('[data-testid=\"draft-tour-stop\"]')?.click()" >/dev/null
sleep 0.5

TOUR_ACTIVE=$(browser_eval "window.slapState?.tourActive")
if [ "$TOUR_ACTIVE" = "false" ]; then
  log_pass "Tour stopped"
else
  log_fail "Tour still active after stop"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Panel opens with FlowBoard review
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Panel with FlowBoard review data"

# Open reviewer popover via JS
browser_eval "document.querySelector('[data-testid=\"draft-slot-ux\"]')?.click()" >/dev/null
sleep 1

# Click VIEW FULL
browser_eval "document.querySelector('[data-testid=\"popover-view-full\"]')?.click()" >/dev/null
sleep 1

PANEL_ID=$(browser_eval "window.slapState?.panelId")
if [ "$PANEL_ID" = "ux" ]; then
  log_pass "Panel opened for UX reviewer"
else
  log_fail "Panel ID" "Expected ux, got: $PANEL_ID"
fi

# Close panel
browser_eval "document.querySelector('[data-testid=\"panel-close\"]')?.click()" >/dev/null
sleep 0.5
browser_eval "document.querySelector('[data-testid=\"draft-backdrop\"]')?.click()" >/dev/null
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 10: Topbar shows FlowBoard info
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: FlowBoard topbar"

SNAP=$(agent-browser snapshot -c 2>/dev/null)
if echo "$SNAP" | grep -q "FlowBoard"; then
  log_pass "Topbar shows FlowBoard name"
else
  log_fail "FlowBoard not in topbar"
fi

if echo "$SNAP" | grep -q "haiku"; then
  log_pass "Version pill shows haiku"
else
  log_fail "haiku version not shown"
fi

# ══════════════════════════════════════════════════════════════
# TEST 11: Data-ref attributes in injected content
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Data-ref attributes in injected content"

REF_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"design-html\"] [data-ref]').length")
if [ "$REF_COUNT" -ge 10 ]; then
  log_pass "Injected content has $REF_COUNT data-ref elements"
else
  log_fail "data-ref count" "Expected >=10, got: $REF_COUNT"
fi

# Check a specific ref
HAS_HERO_HL=$(browser_eval "!!document.querySelector('[data-ref=\"hero-headline\"]')")
if [ "$HAS_HERO_HL" = "true" ]; then
  log_pass "hero-headline ref exists in host document"
else
  log_fail "hero-headline ref missing"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Scripts stripped from injected content
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Security — scripts stripped from injected HTML"

SCRIPT_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"design-html\"] script').length")
if [ "$SCRIPT_COUNT" = "0" ]; then
  log_pass "No script tags in injected content"
else
  log_fail "Scripts found in injected content" "Count: $SCRIPT_COUNT"
fi

# Header/footer stripped
HEADER_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"design-html\"] > header').length")
if [ "$HEADER_COUNT" = "0" ]; then
  log_pass "Standalone header stripped from injected content"
else
  log_fail "Header not stripped" "Count: $HEADER_COUNT"
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
