#!/bin/bash
# tests/test_section_highlight.sh — Verify hover-to-highlight overlay behavior
# Replaces old section marker tests. Covers:
#   - No left-rail markers visible
#   - Hovering findings highlights corresponding section
#   - State exposed via window.appState.hoveredSection
#   - Highlight overlay appears/disappears correctly
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5175}"
PASS=0
FAIL=0

log_pass() { PASS=$((PASS + 1)); echo "  [PASS] $1"; }
log_fail() { FAIL=$((FAIL + 1)); echo "  [FAIL] $1"; }

# Strip surrounding quotes from agent-browser eval output
strip_quotes() {
    sed 's/^"//;s/"$//'
}

# Dispatch hover events that React 18 can detect (mouseover bubbles, mouseenter doesn't)
hover_element() {
    agent-browser eval "
      (() => {
        const el = document.querySelector('$1');
        if (!el) return 'not-found';
        el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
        return 'hovered';
      })()
    " 2>/dev/null | strip_quotes
}

unhover_element() {
    agent-browser eval "
      (() => {
        const el = document.querySelector('$1');
        if (!el) return 'not-found';
        el.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
        return 'unhovered';
      })()
    " 2>/dev/null | strip_quotes
}

cleanup() {
    agent-browser close 2>/dev/null || true
}
trap cleanup EXIT

echo "=== Section Highlight Overlay Tests ==="

# Navigate to landing page demo with expert findings
agent-browser open "${BASE_URL}/#landing-page/brutalist"
sleep 2

# Verify we're on the right page
VIEW=$(agent-browser eval "String(window.appState?.view)" 2>/dev/null | strip_quotes)
if [ "$VIEW" = "landing-page" ]; then
    log_pass "Navigated to landing-page demo"
else
    log_fail "Expected landing-page view, got: $VIEW"
fi

# 1. OBJECTIVE: No old section markers in DOM
MARKERS=$(agent-browser eval "document.querySelectorAll('[data-testid^=\"section-marker-\"]').length" 2>/dev/null | strip_quotes)
if [ "$MARKERS" = "0" ]; then
    log_pass "No old section markers in DOM"
else
    log_fail "Old section markers still present ($MARKERS found)"
fi

# 2. OBJECTIVE: Highlight overlay not visible before opening review
OVERLAY_EXISTS=$(agent-browser eval "String(document.querySelector('[data-testid=\"section-highlight-overlay\"]') !== null)" 2>/dev/null | strip_quotes)
if [ "$OVERLAY_EXISTS" = "false" ]; then
    log_pass "No highlight overlay before review opens"
else
    log_fail "Highlight overlay visible before review opens"
fi

# 3. Open review overlay via dock button
agent-browser click '[data-testid="dock-btn-review"]'
sleep 1

OVERLAY_OPEN=$(agent-browser eval "String(window.appState?.overlayOpen)" 2>/dev/null | strip_quotes)
if [ "$OVERLAY_OPEN" = "true" ]; then
    log_pass "Review overlay opened"
else
    log_fail "Review overlay did not open, overlayOpen=$OVERLAY_OPEN"
fi

# 4. OBJECTIVE: hoveredSection starts null
HOVERED=$(agent-browser eval "String(window.appState?.hoveredSection)" 2>/dev/null | strip_quotes)
if [ "$HOVERED" = "null" ]; then
    log_pass "hoveredSection is null initially"
else
    log_fail "hoveredSection should be null, got: $HOVERED"
fi

# 5. OBJECTIVE: Expand first expert card to reveal findings
FIRST_CARD=$(agent-browser eval "document.querySelector('[data-testid^=\"expert-card-\"]')?.getAttribute('data-testid')" 2>/dev/null | strip_quotes)
if [ -n "$FIRST_CARD" ] && [ "$FIRST_CARD" != "null" ]; then
    agent-browser click "[data-testid=\"${FIRST_CARD}\"]"
    sleep 0.5
fi

# Verify expanded by checking for "VIEW FULL REVIEW" link
HAS_LINK=$(agent-browser eval "String(document.querySelector('[data-testid=\"anti-slop-overlay\"]')?.textContent?.includes('VIEW FULL REVIEW'))" 2>/dev/null | strip_quotes)
if [ "$HAS_LINK" = "true" ]; then
    log_pass "Expert card expanded, findings visible"
else
    log_fail "Expert card did not expand"
fi

# 6. OBJECTIVE: Hover a team view finding triggers hoveredSection
# Team view findings have style borderLeft and onMouseEnter handler
RESULT=$(hover_element '[data-testid="anti-slop-overlay"] div[style*="border-left"]')
sleep 0.5

HOVERED=$(agent-browser eval "String(window.appState?.hoveredSection)" 2>/dev/null | strip_quotes)
if [ -n "$HOVERED" ] && [ "$HOVERED" != "null" ]; then
    log_pass "Hover on team finding sets hoveredSection=$HOVERED"

    # 7. OBJECTIVE: Highlight overlay appears when hovering
    OVERLAY_EXISTS=$(agent-browser eval "String(document.querySelector('[data-testid=\"section-highlight-overlay\"]') !== null)" 2>/dev/null | strip_quotes)
    if [ "$OVERLAY_EXISTS" = "true" ]; then
        log_pass "Highlight overlay visible during hover"
    else
        log_fail "Highlight overlay not visible during hover"
    fi

    # 8. OBJECTIVE: data-highlighted-section attribute matches state
    HIGHLIGHTED=$(agent-browser eval "document.querySelector('[data-testid=\"section-highlight-overlay\"]')?.getAttribute('data-highlighted-section')" 2>/dev/null | strip_quotes)
    if [ "$HIGHLIGHTED" = "$HOVERED" ]; then
        log_pass "Overlay data-highlighted-section matches hoveredSection"
    else
        log_fail "data-highlighted-section=$HIGHLIGHTED != hoveredSection=$HOVERED"
    fi
else
    log_fail "Hover did not set hoveredSection (got: $HOVERED)"
fi

# 9. OBJECTIVE: Mouse leave clears hoveredSection
RESULT=$(unhover_element '[data-testid="anti-slop-overlay"] div[style*="border-left"]')
sleep 0.5

HOVERED=$(agent-browser eval "String(window.appState?.hoveredSection)" 2>/dev/null | strip_quotes)
if [ "$HOVERED" = "null" ]; then
    log_pass "Mouse leave clears hoveredSection"
else
    log_fail "hoveredSection not cleared on mouse leave: $HOVERED"
fi

# 10. OBJECTIVE: Highlight overlay disappears after mouse leave
OVERLAY_EXISTS=$(agent-browser eval "String(document.querySelector('[data-testid=\"section-highlight-overlay\"]') !== null)" 2>/dev/null | strip_quotes)
if [ "$OVERLAY_EXISTS" = "false" ]; then
    log_pass "Highlight overlay removed after mouse leave"
else
    log_fail "Highlight overlay still present after mouse leave"
fi

# 11. OBJECTIVE: Solo view hover works — click first expert bubble
FIRST_BUBBLE=$(agent-browser eval "document.querySelector('[data-testid^=\"dock-bubble-\"]')?.getAttribute('data-testid')" 2>/dev/null | strip_quotes)
if [ -n "$FIRST_BUBBLE" ] && [ "$FIRST_BUBBLE" != "null" ]; then
    agent-browser click "[data-testid=\"${FIRST_BUBBLE}\"]"
    sleep 1
fi

# Check solo-finding testids exist via eval (snapshot -c doesn't show data-testid attributes)
SOLO_COUNT=$(agent-browser eval "document.querySelectorAll('[data-testid^=\"solo-finding-\"]').length" 2>/dev/null | strip_quotes)
if [ -n "$SOLO_COUNT" ] && [ "$SOLO_COUNT" != "0" ]; then
    log_pass "Solo view rendered with $SOLO_COUNT solo-finding elements"

    # 12. Hover solo finding
    RESULT=$(hover_element '[data-testid^="solo-finding-"]')
    sleep 0.5

    HOVERED=$(agent-browser eval "String(window.appState?.hoveredSection)" 2>/dev/null | strip_quotes)
    if [ -n "$HOVERED" ] && [ "$HOVERED" != "null" ]; then
        log_pass "Solo finding hover sets hoveredSection=$HOVERED"
    else
        log_fail "Solo finding hover did not set hoveredSection"
    fi

    # Clear
    RESULT=$(unhover_element '[data-testid^="solo-finding-"]')
    sleep 0.5
else
    log_fail "Solo view did not render solo-finding elements (count=$SOLO_COUNT)"
fi

# 13. OBJECTIVE: Kaizen view has no section-mapped findings
# Close solo, switch to kaizen
agent-browser click '[data-testid="anti-slop-close"]' 2>/dev/null || true
sleep 0.5
agent-browser click '[data-testid="dock-btn-kaizen"]'
sleep 1

KAIZEN_SOLO=$(agent-browser eval "document.querySelectorAll('[data-testid^=\"solo-finding-\"]').length" 2>/dev/null | strip_quotes)
if [ "$KAIZEN_SOLO" = "0" ]; then
    log_pass "Kaizen view has no section-mapped findings"
else
    log_fail "Kaizen view has $KAIZEN_SOLO solo-finding elements (expected 0)"
fi

# 14. OBJECTIVE: Close overlay clears highlight
agent-browser click '[data-testid="anti-slop-close"]'
sleep 0.5

OVERLAY_OPEN=$(agent-browser eval "String(window.appState?.overlayOpen)" 2>/dev/null | strip_quotes)
OVERLAY_EXISTS=$(agent-browser eval "String(document.querySelector('[data-testid=\"section-highlight-overlay\"]') !== null)" 2>/dev/null | strip_quotes)
if [ "$OVERLAY_OPEN" = "false" ] && [ "$OVERLAY_EXISTS" = "false" ]; then
    log_pass "Close overlay removes highlight"
else
    log_fail "After close: overlayOpen=$OVERLAY_OPEN, overlay_exists=$OVERLAY_EXISTS"
fi

# 15. OBJECTIVE: No JS errors throughout
JS_ERRORS=$(agent-browser errors 2>/dev/null || echo "")
if [ -z "$JS_ERRORS" ] || echo "$JS_ERRORS" | grep -q "^\[\]$"; then
    log_pass "No JavaScript errors"
else
    log_fail "JS errors: $JS_ERRORS"
fi

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
if [ "$FAIL" -gt 0 ]; then
    exit 1
fi
echo "PASS: Section highlight overlay works correctly"
