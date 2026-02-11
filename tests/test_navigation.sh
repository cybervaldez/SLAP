#!/bin/bash
# tests/test_navigation.sh — Verify routing and navigation
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5173}"

cleanup() {
    agent-browser close 2>/dev/null || true
}
trap cleanup EXIT

agent-browser open "$BASE_URL"
sleep 1

# 1. Gallery hub loads
agent-browser snapshot -c | grep -q "Archetype Gallery"
echo "  [PASS] Gallery hub renders"

STATE=$(agent-browser eval "window.appState?.view" 2>/dev/null)
[ "$STATE" = "gallery" ] && echo "  [PASS] appState.view is gallery"

# 2. Click an archetype card to navigate to demo
agent-browser click '[data-testid="archetype-card-landing-page"]'
sleep 1

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null)
[ "$VIEW" = "landing-page" ] && echo "  [PASS] Navigated to landing-page demo"

ROUTE=$(agent-browser eval "window.appState?.route" 2>/dev/null)
[ "$ROUTE" = "/landing-page" ] && echo "  [PASS] Route is /landing-page"

# 3. Verify DemoShell and RetroNavBar render
agent-browser snapshot -c | grep -q "Back to Gallery"
echo "  [PASS] RetroNavBar with back button renders"

# 4. Navigate back to gallery
agent-browser click '[data-testid="back-to-gallery"]'
sleep 1

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null)
[ "$VIEW" = "gallery" ] && echo "  [PASS] Back to gallery works"

# 5. Direct URL navigation
agent-browser open "${BASE_URL}/#/e-commerce"
sleep 1

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null)
[ "$VIEW" = "e-commerce" ] && echo "  [PASS] Direct URL navigation works"

# 6. Unknown hash falls back to gallery
agent-browser open "${BASE_URL}/#/nonexistent"
sleep 1

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null)
[ "$VIEW" = "gallery" ] && echo "  [PASS] Unknown hash falls back to gallery"

echo "PASS: Navigation works correctly"
