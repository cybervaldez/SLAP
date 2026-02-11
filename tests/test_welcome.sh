#!/bin/bash
# tests/test_welcome.sh — Verify gallery hub loads
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5173}"

cleanup() {
    agent-browser close 2>/dev/null || true
}
trap cleanup EXIT

agent-browser open "$BASE_URL"
sleep 1

# Check gallery hub renders
agent-browser snapshot -c | grep -q "Archetype Gallery"

# Verify window state
STATE=$(agent-browser eval "window.appState?.initialized" 2>/dev/null)
[ "$STATE" = "true" ] && echo "  [PASS] App state initialized"

VIEW=$(agent-browser eval "window.appState?.view" 2>/dev/null)
[ "$VIEW" = "gallery" ] && echo "  [PASS] View is gallery"

echo "PASS: Gallery hub loads successfully"
