#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Text-Level Highlighting
# ═══════════════════════════════════════════════════════════════
# Tests text-level highlighting via TreeWalker when hovering
# individual findings that have a `ref` value.
#
# Usage: ./tests/test_text_highlight.sh [--port 5180]
# ═══════════════════════════════════════════════════════════════

set +e  # Don't exit on error - let all tests run

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Text-Level Highlighting E2E Tests"

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
# SETUP: Open workspace and navigate to review panel
# ══════════════════════════════════════════════════════════════
echo ""
log_info "SETUP: Opening workspace"

if open_page "${BASE_URL}/#/example/v1"; then
  log_pass "Workspace page opened (v1)"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2

# Click the marketing expert bubble to open popover
click_testid "bubble-marketing"
sleep 0.5

# Open full review panel
click_testid "popover-view-full"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# TEST 1: Finding with ref has text highlighted on hover
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Text highlight appears on finding hover (ref='Unlock the Power of Seamless Workflow Automation')"

# Hover the first hero finding (marketing:hero:0 has ref)
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el) {
      var event = new MouseEvent('mouseover', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 1

# Check that a <mark data-testid="text-highlight"> appeared
HAS_MARK=$(browser_eval "!!document.querySelector('[data-testid=\"text-highlight\"]')")
if [ "$HAS_MARK" = "true" ]; then
  log_pass "Text highlight mark element appeared"
else
  log_fail "Text highlight mark" "No [data-testid='text-highlight'] found"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: Mark contains correct text
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Highlighted text matches ref"

MARK_TEXT=$(browser_eval "document.querySelector('[data-testid=\"text-highlight\"]')?.textContent || ''")
if echo "$MARK_TEXT" | grep -qi "Unlock the Power"; then
  log_pass "Mark text matches ref: '$MARK_TEXT'"
else
  log_fail "Mark text content" "Got: '$MARK_TEXT'"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Mark has gold underline styling
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Mark has gold underline (border-bottom)"

BORDER_BOTTOM=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"text-highlight\"]');
    if (!el) return 'missing';
    return getComputedStyle(el).borderBottomColor;
  })()
")
# Gold #FFD000 = rgb(255, 208, 0)
if echo "$BORDER_BOTTOM" | grep -q "rgb(255, 208, 0)"; then
  log_pass "Mark has gold border-bottom: $BORDER_BOTTOM"
else
  log_fail "Mark border-bottom color" "Got: $BORDER_BOTTOM"
fi

# ══════════════════════════════════════════════════════════════
# TEST 4: Section highlight overlay also appears
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Section highlight overlay co-exists with text highlight"

HAS_OVERLAY=$(browser_eval "!!document.querySelector('[data-testid=\"section-highlight-overlay\"]')")
if [ "$HAS_OVERLAY" = "true" ]; then
  log_pass "Section highlight overlay visible alongside text highlight"
else
  log_fail "Section highlight overlay" "Not found while text highlight is active"
fi

# ══════════════════════════════════════════════════════════════
# TEST 5: data-highlighted-ref set on overlay
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Overlay has data-highlighted-ref attribute"

OVERLAY_REF=$(browser_eval "document.querySelector('[data-testid=\"section-highlight-overlay\"]')?.getAttribute('data-highlighted-ref') || ''")
if [ -n "$OVERLAY_REF" ]; then
  log_pass "Overlay has data-highlighted-ref: '$OVERLAY_REF'"
else
  log_fail "data-highlighted-ref attribute" "Attribute missing or empty"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: window.slapState.highlightedRef exposed
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: window.slapState.highlightedRef"

SLAP_REF=$(browser_eval "window.slapState?.highlightedRef || ''")
if [ -n "$SLAP_REF" ]; then
  log_pass "slapState.highlightedRef exposed: '$SLAP_REF'"
else
  log_fail "slapState.highlightedRef" "Missing or null"
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: Text highlight removed on mouse leave
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Text highlight cleaned up on mouse leave"

# Mouse leave from the finding row
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el) {
      var event = new MouseEvent('mouseout', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.3

HAS_MARK_AFTER=$(browser_eval "!!document.querySelector('[data-testid=\"text-highlight\"]')")
if [ "$HAS_MARK_AFTER" = "false" ]; then
  log_pass "Text highlight removed on mouse leave"
else
  log_fail "Text highlight cleanup" "Mark element still present after mouse leave"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Finding without ref does NOT create text highlight
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Finding without ref skips text highlight"

# marketing:pricing:0 ("No anchor pricing visible") has no ref
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-pricing-0\"]');
    if (el) {
      var event = new MouseEvent('mouseover', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.5

HAS_MARK_NO_REF=$(browser_eval "!!document.querySelector('[data-testid=\"text-highlight\"]')")
if [ "$HAS_MARK_NO_REF" = "false" ]; then
  log_pass "No text highlight for finding without ref"
else
  log_fail "Text highlight without ref" "Mark appeared for a finding with no ref"
fi

# Mouse leave to clean up
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-pricing-0\"]');
    if (el) {
      var event = new MouseEvent('mouseout', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 9: Feature section text highlight (different section)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Text highlight in features section"

# marketing:features:0 has ref='Seamless Integration'
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-features-0\"]');
    if (el) {
      var event = new MouseEvent('mouseover', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.5

FEATURE_MARK=$(browser_eval "document.querySelector('[data-testid=\"text-highlight\"]')?.textContent || ''")
if echo "$FEATURE_MARK" | grep -qi "Seamless Integration"; then
  log_pass "Feature section text highlight: '$FEATURE_MARK'"
else
  log_fail "Feature text highlight" "Got: '$FEATURE_MARK'"
fi

# Clean up
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-features-0\"]');
    if (el) {
      var event = new MouseEvent('mouseout', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 10: CTA section text highlight
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: CTA section text highlight"

# marketing:cta:0 has ref='Get Started Today'
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-cta-0\"]');
    if (el) {
      var event = new MouseEvent('mouseover', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.5

CTA_MARK=$(browser_eval "document.querySelector('[data-testid=\"text-highlight\"]')?.textContent || ''")
if echo "$CTA_MARK" | grep -qi "Get Started Today"; then
  log_pass "CTA section text highlight: '$CTA_MARK'"
else
  log_fail "CTA text highlight" "Got: '$CTA_MARK'"
fi

# Clean up
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-cta-0\"]');
    if (el) {
      var event = new MouseEvent('mouseout', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 11: Switch to V2 and test text highlight
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Text highlight on V2 design"

# Close current panel
agent-browser press Escape 2>/dev/null
sleep 0.3

# Switch to V2
click_testid "topbar-version-v2"
sleep 2

# Open marketing review for V2
click_testid "bubble-marketing"
sleep 0.5
click_testid "popover-view-full"
sleep 0.5

# V2 marketing:hero:0 has ref='Ship your first feature in 4 minutes.'
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el) {
      var event = new MouseEvent('mouseover', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.5

V2_MARK=$(browser_eval "document.querySelector('[data-testid=\"text-highlight\"]')?.textContent || ''")
if echo "$V2_MARK" | grep -qi "Ship your first feature"; then
  log_pass "V2 text highlight: '$V2_MARK'"
else
  log_fail "V2 text highlight" "Got: '$V2_MARK'"
fi

# Clean up hover
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el) {
      var event = new MouseEvent('mouseout', {bubbles: true, cancelable: true});
      el.dispatchEvent(event);
    }
  })()
"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 12: Multiple rapid hovers clean up properly
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Rapid hover switches — no stale marks"

# Hover hero:0 (has ref)
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el) el.dispatchEvent(new MouseEvent('mouseover', {bubbles: true, cancelable: true}));
  })()
"
sleep 0.2

# Quickly hover hero:1 (has ref='2,400+ teams')
browser_eval "
  (function() {
    var el0 = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el0) el0.dispatchEvent(new MouseEvent('mouseout', {bubbles: true, cancelable: true}));
    var el1 = document.querySelector('[data-testid=\"panel-finding-hero-1\"]');
    if (el1) el1.dispatchEvent(new MouseEvent('mouseover', {bubbles: true, cancelable: true}));
  })()
"
sleep 0.5

# Should only have ONE mark element (from hero:1), not two
MARK_COUNT=$(browser_eval "document.querySelectorAll('[data-testid=\"text-highlight\"]').length")
if [ "$MARK_COUNT" = "1" ]; then
  log_pass "Only one text highlight active after rapid switch"
elif [ "$MARK_COUNT" = "0" ]; then
  log_fail "Rapid hover marks" "No marks found (expected 1)"
else
  log_fail "Rapid hover marks" "Found $MARK_COUNT marks (expected 1)"
fi

# Clean up
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-1\"]');
    if (el) el.dispatchEvent(new MouseEvent('mouseout', {bubbles: true, cancelable: true}));
  })()
"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 13: Panel close cleans up text highlights
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Panel close cleans up text highlights"

# Hover a finding with ref to create a mark
browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (el) el.dispatchEvent(new MouseEvent('mouseover', {bubbles: true, cancelable: true}));
  })()
"
sleep 0.3

# Close the panel
agent-browser press Escape 2>/dev/null
sleep 0.5

HAS_MARK_AFTER_CLOSE=$(browser_eval "!!document.querySelector('[data-testid=\"text-highlight\"]')")
if [ "$HAS_MARK_AFTER_CLOSE" = "false" ]; then
  log_pass "Text highlight cleaned up after panel close"
else
  log_fail "Panel close cleanup" "Mark still present after closing panel"
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
