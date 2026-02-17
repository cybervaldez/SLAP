#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Workspace Features (Council, Notes, Modal)
# ═══════════════════════════════════════════════════════════════
# Tests council persistence, notes/clipboard, and coming soon modal.
#
# Usage: ./tests/test_workspace_features.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

set +e  # Don't exit on error - let all tests run

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Workspace Features E2E Tests"

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
# TEST 1: Council persistence — persona bubbles filtered
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Council persistence — persona filtering"

if open_page "${BASE_URL}/#/example/v1"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2

# Switch to PERSONAS mode
click_testid "bubble-mode-personas"
sleep 0.5

# Count persona bubbles — should be fewer than 18 (filtered by council)
PERSONA_COUNT=$(browser_eval "
  (function() {
    var ids = ['marcus','elena','priya','dorothy','kevin','raj','carlos','jasmine','tommy','frank','diana','sarah','sam','maya','mike','yuki','dex','nora'];
    var count = 0;
    for (var id of ids) {
      if (document.querySelector('[data-testid=\"bubble-' + id + '\"]')) count++;
    }
    return count;
  })()
")
if [ "$PERSONA_COUNT" -gt 0 ] && [ "$PERSONA_COUNT" -lt 18 ] 2>/dev/null; then
  log_pass "Persona bubbles filtered by council ($PERSONA_COUNT shown, not all 18)"
elif [ "$PERSONA_COUNT" = "18" ] 2>/dev/null; then
  log_fail "Council filtering" "All 18 personas shown (no filtering)"
else
  log_fail "Council filtering" "Persona count: $PERSONA_COUNT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 2: Council label appears in PERSONAS mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: Council label"

HAS_LABEL=$(browser_eval "!!document.querySelector('[data-testid=\"council-label\"]')")
if [ "$HAS_LABEL" = "true" ]; then
  log_pass "Council label visible in PERSONAS mode"
else
  log_fail "Council label" "Label not found"
fi

# Check label text (YOUR COUNCIL or SUGGESTED)
LABEL_TEXT=$(browser_eval "document.querySelector('[data-testid=\"council-label\"]')?.textContent || ''")
if echo "$LABEL_TEXT" | grep -qi "council\|suggested"; then
  log_pass "Council label has correct text: $LABEL_TEXT"
else
  log_fail "Council label text" "Got: $LABEL_TEXT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 3: Council label hides in EXPERTS mode
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Council label hidden in EXPERTS mode"

click_testid "bubble-mode-experts"
sleep 0.3

HAS_LABEL_EXPERTS=$(browser_eval "!!document.querySelector('[data-testid=\"council-label\"]')")
if [ "$HAS_LABEL_EXPERTS" = "false" ]; then
  log_pass "Council label hidden in EXPERTS mode"
else
  log_fail "Council label in EXPERTS mode" "Label still visible"
fi

# Switch back to personas for remaining tests
click_testid "bubble-mode-personas"
sleep 0.3

# ══════════════════════════════════════════════════════════════
# TEST 4: BROWSE ALL button opens Coming Soon modal
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Coming Soon modal"

check_testid "browse-all-btn" "BROWSE ALL button present"

click_testid "browse-all-btn"
sleep 0.5

HAS_MODAL=$(browser_eval "!!document.querySelector('[data-testid=\"coming-soon-modal\"]')")
if [ "$HAS_MODAL" = "true" ]; then
  log_pass "Coming Soon modal opens"
else
  log_fail "Coming Soon modal" "Modal not found"
fi

# Check modal content
MODAL_TEXT=$(browser_eval "document.querySelector('[data-testid=\"coming-soon-modal\"]')?.textContent || ''")
if echo "$MODAL_TEXT" | grep -qi "coming soon"; then
  log_pass "Modal shows 'COMING SOON' text"
else
  log_fail "Modal content" "Got: $MODAL_TEXT"
fi

check_testid "coming-soon-dismiss" "GOT IT button present"

# ══════════════════════════════════════════════════════════════
# TEST 5: Modal dismiss via GOT IT button
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Modal dismiss via button"

click_testid "coming-soon-dismiss"
sleep 0.3

HAS_MODAL_AFTER=$(browser_eval "!!document.querySelector('[data-testid=\"coming-soon-modal\"]')")
if [ "$HAS_MODAL_AFTER" = "false" ]; then
  log_pass "Modal dismissed via GOT IT button"
else
  log_fail "Modal dismiss" "Modal still present"
fi

# ══════════════════════════════════════════════════════════════
# TEST 6: Modal dismiss via Escape
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Modal dismiss via Escape"

click_testid "browse-all-btn"
sleep 0.3

agent-browser press Escape 2>/dev/null
sleep 0.3

HAS_MODAL_ESC=$(browser_eval "!!document.querySelector('[data-testid=\"coming-soon-modal\"]')")
if [ "$HAS_MODAL_ESC" = "false" ]; then
  log_pass "Modal dismissed via Escape"
else
  log_fail "Modal escape dismiss" "Modal still present"
fi

# ══════════════════════════════════════════════════════════════
# TEST 7: Notes — save button on findings
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Finding save buttons"

# Switch to experts and open a review panel
click_testid "bubble-mode-experts"
sleep 0.3
click_testid "bubble-marketing"
sleep 0.5
click_testid "popover-view-full"
sleep 0.5

# Check save button exists on first hero finding
HAS_SAVE_BTN=$(browser_eval "!!document.querySelector('[data-testid=\"finding-save-btn-hero-0\"]')")
if [ "$HAS_SAVE_BTN" = "true" ]; then
  log_pass "Save button present on finding row"
else
  log_fail "Save button" "finding-save-btn-hero-0 not found"
fi

# ══════════════════════════════════════════════════════════════
# TEST 8: Notes — click save button adds note
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Save finding to notes"

click_testid "finding-save-btn-hero-0"
sleep 0.3

# NotesPill should appear
HAS_PILL=$(browser_eval "!!document.querySelector('[data-testid=\"notes-pill\"]')")
if [ "$HAS_PILL" = "true" ]; then
  log_pass "NotesPill appears after saving a finding"
else
  log_fail "NotesPill" "Pill not found after save"
fi

# Check pill shows count
PILL_TEXT=$(browser_eval "document.querySelector('[data-testid=\"notes-pill\"]')?.textContent || ''")
if echo "$PILL_TEXT" | grep -qi "1 note"; then
  log_pass "NotesPill shows '1 note'"
else
  log_fail "NotesPill count" "Got: $PILL_TEXT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 9: Notes — saved finding has gold border
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Saved finding visual indicator"

BORDER_LEFT=$(browser_eval "
  (function() {
    var el = document.querySelector('[data-testid=\"panel-finding-hero-0\"]');
    if (!el) return 'missing';
    return getComputedStyle(el).borderLeftColor;
  })()
")
# Gold #FFD000 = rgb(255, 208, 0)
if echo "$BORDER_LEFT" | grep -q "rgb(255, 208, 0)"; then
  log_pass "Saved finding has gold left border"
else
  log_fail "Saved finding border" "borderLeftColor: $BORDER_LEFT"
fi

# ══════════════════════════════════════════════════════════════
# TEST 10: Notes — save multiple findings
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Save multiple findings"

click_testid "finding-save-btn-features-0"
sleep 0.3

PILL_TEXT2=$(browser_eval "document.querySelector('[data-testid=\"notes-pill\"]')?.textContent || ''")
if echo "$PILL_TEXT2" | grep -qi "2 note"; then
  log_pass "NotesPill shows '2 notes' after second save"
else
  log_fail "NotesPill multi-count" "Got: $PILL_TEXT2"
fi

# ══════════════════════════════════════════════════════════════
# TEST 11: Notes — unsave (toggle off)
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Unsave a finding"

click_testid "finding-save-btn-hero-0"
sleep 0.3

PILL_TEXT3=$(browser_eval "document.querySelector('[data-testid=\"notes-pill\"]')?.textContent || ''")
if echo "$PILL_TEXT3" | grep -qi "1 note"; then
  log_pass "Unsave removes finding, count drops to 1"
else
  log_fail "Unsave finding" "Got: $PILL_TEXT3"
fi

# ══════════════════════════════════════════════════════════════
# TEST 12: Notes — COPY button present
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: COPY button"

check_testid "notes-copy" "COPY button present in NotesPill"

# ══════════════════════════════════════════════════════════════
# TEST 13: Notes — clear button removes all notes
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Clear notes"

check_testid "notes-clear" "Clear button present"

click_testid "notes-clear"
sleep 0.3

HAS_PILL_AFTER_CLEAR=$(browser_eval "!!document.querySelector('[data-testid=\"notes-pill\"]')")
if [ "$HAS_PILL_AFTER_CLEAR" = "false" ]; then
  log_pass "NotesPill hidden after clearing all notes"
else
  log_fail "Clear notes" "Pill still visible after clear"
fi

# ══════════════════════════════════════════════════════════════
# TEST 14: Notes — COPY writes to clipboard
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 14: Copy to clipboard"

# Re-save a finding
click_testid "finding-save-btn-hero-0"
sleep 0.3

# Click copy
click_testid "notes-copy"
sleep 0.3

# Check "Copied!" flash
PILL_COPIED=$(browser_eval "document.querySelector('[data-testid=\"notes-pill\"]')?.textContent || ''")
if echo "$PILL_COPIED" | grep -qi "copied"; then
  log_pass "NotesPill shows 'Copied!' flash"
else
  log_fail "Copy flash" "Got: $PILL_COPIED"
fi

# Wait for flash to clear
sleep 2

# ══════════════════════════════════════════════════════════════
# TEST 15: slapState includes council and notes info
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 15: slapState council + notes"

SLAP_STATE=$(browser_eval "JSON.stringify(window.slapState)")

if echo "$SLAP_STATE" | grep -q '"councilIds"'; then
  log_pass "slapState.councilIds exposed"
else
  log_fail "slapState.councilIds" "Missing from slapState"
fi

if echo "$SLAP_STATE" | grep -q '"savedNotesCount"'; then
  log_pass "slapState.savedNotesCount exposed"
else
  log_fail "slapState.savedNotesCount" "Missing from slapState"
fi

# ══════════════════════════════════════════════════════════════
# TEST 16: Council from homepage carries over
# ══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 16: Council from homepage"

# Set a known council in localStorage
browser_eval "localStorage.setItem('slap-default-council', JSON.stringify(['marcus','elena','frank']))"
sleep 0.3

# Force full page reload to re-read localStorage on mount
browser_eval "window.location.reload()"
sleep 3

click_testid "bubble-mode-personas"
sleep 0.5

# Should see exactly the council members who have reviews
COUNCIL_MARCUS=$(browser_eval "!!document.querySelector('[data-testid=\"bubble-marcus\"]')")
COUNCIL_ELENA=$(browser_eval "!!document.querySelector('[data-testid=\"bubble-elena\"]')")
COUNCIL_FRANK=$(browser_eval "!!document.querySelector('[data-testid=\"bubble-frank\"]')")

COUNCIL_COUNT=0
[ "$COUNCIL_MARCUS" = "true" ] && COUNCIL_COUNT=$((COUNCIL_COUNT + 1))
[ "$COUNCIL_ELENA" = "true" ] && COUNCIL_COUNT=$((COUNCIL_COUNT + 1))
[ "$COUNCIL_FRANK" = "true" ] && COUNCIL_COUNT=$((COUNCIL_COUNT + 1))

if [ "$COUNCIL_COUNT" = "3" ]; then
  log_pass "Council from homepage carries over (marcus, elena, frank)"
elif [ "$COUNCIL_COUNT" -gt 0 ] 2>/dev/null; then
  log_pass "Partial council carry-over ($COUNCIL_COUNT/3 members)"
else
  log_fail "Council carry-over" "None of the set council members found"
fi

# Check label says YOUR COUNCIL (since we set it)
LABEL_TEXT2=$(browser_eval "document.querySelector('[data-testid=\"council-label\"]')?.textContent || ''")
if echo "$LABEL_TEXT2" | grep -qi "your council"; then
  log_pass "Label says 'YOUR COUNCIL' for saved council"
else
  log_fail "YOUR COUNCIL label" "Got: $LABEL_TEXT2"
fi

# Clean up localStorage
browser_eval "localStorage.removeItem('slap-default-council')"

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
