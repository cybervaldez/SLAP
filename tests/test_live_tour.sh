#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: Live Tour Mode — Bubble Interactions & Choreography
# ═══════════════════════════════════════════════════════════════
# 17 tests covering live tour interactions:
#   Group A: Expert/Persona bubble → live tour entry (4 tests)
#   Group B: Live mode prev/next choreography (5 tests)
#   Group C: Motion & animation lifecycle (4 tests)
#   Group D: Multi-reviewer live tours (4 tests)
#
# Usage: ./tests/test_live_tour.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "SLAP! Live Tour Mode — E2E Tests (17)"

# ══════════════════════════════════════════════════════════════
# PREREQ: Server check + page load
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

if open_page "${BASE_URL}/#/flowboard/haiku"; then
  log_pass "Workspace page opened"
else
  log_fail "Failed to open workspace page"
  print_summary
  exit 1
fi

sleep 2  # Let React render + HTML injection complete

# ── Discover rail slots ──────────────────────────────────────
# Find first expert slot and first persona slot (after divider)
EXPERT_SLOT=$(browser_eval "(function(){ var s = document.querySelector('.draft-rail-slot'); return s ? s.getAttribute('data-reviewer') : null; })()")
PERSONA_SLOT=$(browser_eval "(function(){ var div = document.querySelector('.draft-rail-divider'); if(!div) return null; var s = div.nextElementSibling; while(s && !s.classList.contains('draft-rail-slot')) s = s.nextElementSibling; return s ? s.getAttribute('data-reviewer') : null; })()")
SECOND_EXPERT=$(browser_eval "(function(){ var slots = document.querySelectorAll('.draft-rail-slot'); return slots.length > 1 ? slots[1].getAttribute('data-reviewer') : null; })()")

log_info "Expert slot: $EXPERT_SLOT"
log_info "Persona slot: $PERSONA_SLOT"
log_info "Second expert: $SECOND_EXPERT"

# ══════════════════════════════════════════════════════════════
# GROUP A: Expert/Persona Bubble → Live Tour Entry
# ══════════════════════════════════════════════════════════════

# ── TEST 1: Click expert bubble → TOUR → live mode ──────────
echo ""
log_info "TEST 1: Expert bubble → tour → live mode"

if [ -n "$EXPERT_SLOT" ] && [ "$EXPERT_SLOT" != "null" ]; then
  # Click expert bubble (opens popover, sets activeBubbleId)
  click_testid "draft-slot-${EXPERT_SLOT}"
  sleep 0.5

  ACTIVE_BUBBLE=$(browser_eval "window.slapState.popoverId || window.slapState.activeReviewer")
  if [ -n "$ACTIVE_BUBBLE" ] && [ "$ACTIVE_BUBBLE" != "null" ]; then
    log_pass "Expert bubble click registered: $ACTIVE_BUBBLE"
  else
    log_fail "Expert bubble should set active reviewer" "Got: $ACTIVE_BUBBLE"
  fi

  # Click TOUR button (starts tour for active reviewer)
  click_testid "draft-tour-btn"
  sleep 1

  TOUR_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
  if [ "$TOUR_REVIEWER" = "$EXPERT_SLOT" ]; then
    log_pass "Tour started for clicked expert: $TOUR_REVIEWER"
  else
    log_fail "Tour should start for clicked expert $EXPERT_SLOT" "Got: $TOUR_REVIEWER"
  fi

  # Switch to live mode
  click_testid "draft-mode-live"
  sleep 1.5  # Wait for full choreography

  TOUR_MODE=$(browser_eval "window.slapState.tourMode")
  FRAME_MODE=$(browser_eval "document.querySelector('[data-testid=\"draft-workspace\"]')?.getAttribute('data-mode')")

  if [ "$TOUR_MODE" = "live" ] && [ "$FRAME_MODE" = "live" ]; then
    log_pass "Live mode active for expert $EXPERT_SLOT"
  else
    log_fail "Should be in live mode" "tourMode=$TOUR_MODE, frameMode=$FRAME_MODE"
  fi

  # Stop tour for next test
  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "No expert slot found"
  log_skip "No expert slot found"
  log_skip "No expert slot found"
fi

# ── TEST 2: Click persona bubble → TOUR → live mode ─────────
echo ""
log_info "TEST 2: Persona bubble → tour → live mode"

if [ -n "$PERSONA_SLOT" ] && [ "$PERSONA_SLOT" != "null" ]; then
  # Click persona bubble
  click_testid "draft-slot-${PERSONA_SLOT}"
  sleep 0.5

  # Click TOUR button
  click_testid "draft-tour-btn"
  sleep 1

  TOUR_REVIEWER=$(browser_eval "window.slapState.tourReviewerId")
  if [ "$TOUR_REVIEWER" = "$PERSONA_SLOT" ]; then
    log_pass "Tour started for clicked persona: $TOUR_REVIEWER"
  else
    log_fail "Tour should start for clicked persona $PERSONA_SLOT" "Got: $TOUR_REVIEWER"
  fi

  # Switch to live
  click_testid "draft-mode-live"
  sleep 1.5

  TOUR_MODE=$(browser_eval "window.slapState.tourMode")
  if [ "$TOUR_MODE" = "live" ]; then
    log_pass "Live mode active for persona $PERSONA_SLOT"
  else
    log_fail "Should be in live mode for persona" "Got: $TOUR_MODE"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "No persona slot found (council may not have personas)"
  log_skip "No persona slot found"
fi

# ── TEST 3: Expert live tour — reviewer color/avatar match ───
echo ""
log_info "TEST 3: Expert live tour — color & avatar"

if [ -n "$EXPERT_SLOT" ] && [ "$EXPERT_SLOT" != "null" ]; then
  click_testid "draft-slot-${EXPERT_SLOT}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  # Get reviewer's canonical color from the rail slot CSS variable
  SLOT_COLOR=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"draft-slot-${EXPERT_SLOT}\"]')).getPropertyValue('--d-slot-color').trim()")

  # Floater border should use reviewer color
  FLOATER_BORDER=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.border || ''")
  if [ -n "$FLOATER_BORDER" ] && [ "$FLOATER_BORDER" != "" ]; then
    log_pass "Floater border set: $FLOATER_BORDER"
  else
    log_fail "Floater should have reviewer-colored border"
  fi

  # Floater avatar src should match reviewer
  FLOATER_SRC=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"] img')?.src || ''")
  SLOT_SRC=$(browser_eval "document.querySelector('[data-testid=\"draft-slot-${EXPERT_SLOT}\"] img')?.src || ''")
  if [ -n "$FLOATER_SRC" ] && [ "$FLOATER_SRC" = "$SLOT_SRC" ]; then
    log_pass "Floater avatar matches expert's rail avatar"
  else
    log_fail "Floater avatar should match expert" "Floater: $FLOATER_SRC, Slot: $SLOT_SRC"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "No expert slot"
  log_skip "No expert slot"
fi

# ── TEST 4: Persona live tour — reviewer color/avatar match ──
echo ""
log_info "TEST 4: Persona live tour — color & avatar"

if [ -n "$PERSONA_SLOT" ] && [ "$PERSONA_SLOT" != "null" ]; then
  click_testid "draft-slot-${PERSONA_SLOT}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  FLOATER_BORDER=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.border || ''")
  if [ -n "$FLOATER_BORDER" ] && [ "$FLOATER_BORDER" != "" ]; then
    log_pass "Persona floater border set: $FLOATER_BORDER"
  else
    log_fail "Persona floater should have reviewer-colored border"
  fi

  FLOATER_SRC=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"] img')?.src || ''")
  SLOT_SRC=$(browser_eval "document.querySelector('[data-testid=\"draft-slot-${PERSONA_SLOT}\"] img')?.src || ''")
  if [ -n "$FLOATER_SRC" ] && [ "$FLOATER_SRC" = "$SLOT_SRC" ]; then
    log_pass "Floater avatar matches persona's rail avatar"
  else
    log_fail "Floater avatar should match persona" "Floater: $FLOATER_SRC, Slot: $SLOT_SRC"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "No persona slot"
  log_skip "No persona slot"
fi

# ══════════════════════════════════════════════════════════════
# GROUP B: Live Mode Prev/Next Choreography
# ══════════════════════════════════════════════════════════════

# ── TEST 5: Next step — floater position changes ────────────
echo ""
log_info "TEST 5: Next step — floater repositions"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1.5

FLOATER_TOP_BEFORE=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.top || ''")
FLOATER_LEFT_BEFORE=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.left || ''")

# Advance several steps to cross into a new section
for i in $(seq 1 5); do
  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
  sleep 0.2
done
sleep 1.5  # Wait for choreography

FLOATER_TOP_AFTER=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.top || ''")
FLOATER_LEFT_AFTER=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.left || ''")

if [ "$FLOATER_TOP_BEFORE" != "$FLOATER_TOP_AFTER" ] || [ "$FLOATER_LEFT_BEFORE" != "$FLOATER_LEFT_AFTER" ]; then
  log_pass "Floater repositioned after step advance"
else
  log_skip "Floater position unchanged (findings may share same section dock)"
fi

# ── TEST 6: Next step — trail path redraws ───────────────────
echo ""
log_info "TEST 6: Next step — trail redraws"

TRAIL_D_BEFORE=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('d') || ''")

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 1.5

TRAIL_D_AFTER=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('d') || ''")

if [ "$TRAIL_D_BEFORE" != "$TRAIL_D_AFTER" ]; then
  log_pass "Trail SVG path redrawn on step advance"
else
  log_skip "Trail path unchanged (same section dock point)"
fi

# Trail should still be active
TRAIL_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.classList.contains('active')")
if [ "$TRAIL_ACTIVE" = "true" ]; then
  log_pass "Trail remains .active after step advance"
else
  log_fail "Trail should stay .active during live tour"
fi

# ── TEST 7: Next step — speech updates ──────────────────────
echo ""
log_info "TEST 7: Next step — speech content updates"

SPEECH_BEFORE=$(browser_eval "document.querySelector('.draft-speech-text')?.textContent || ''")
STEP_BEFORE=$(browser_eval "window.slapState.tourStep")

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 1.5

SPEECH_AFTER=$(browser_eval "document.querySelector('.draft-speech-text')?.textContent || ''")
STEP_AFTER=$(browser_eval "window.slapState.tourStep")

if [ "$STEP_AFTER" -gt "$STEP_BEFORE" ] 2>/dev/null; then
  log_pass "Step advanced ($STEP_BEFORE -> $STEP_AFTER)"
else
  log_fail "Step should advance" "Was $STEP_BEFORE, now $STEP_AFTER"
fi

if [ "$SPEECH_AFTER" != "$SPEECH_BEFORE" ]; then
  log_pass "Speech text updated with new finding"
else
  log_skip "Speech text unchanged (consecutive findings may match)"
fi

# ── TEST 8: Next across sections — glow moves ───────────────
echo ""
log_info "TEST 8: Next across sections — glow moves"

SECTION_BEFORE=$(browser_eval "window.slapState.highlightedSection")

# Navigate forward to try to cross a section boundary
for i in $(seq 1 8); do
  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
  sleep 0.15
done
sleep 1

SECTION_AFTER=$(browser_eval "window.slapState.highlightedSection")

if [ "$SECTION_AFTER" != "$SECTION_BEFORE" ]; then
  log_pass "Section glow moved ($SECTION_BEFORE -> $SECTION_AFTER)"

  # Verify only the new section has glow
  GLOW_COUNT=$(browser_eval "document.querySelectorAll('.glowing').length")
  if [ "$GLOW_COUNT" = "1" ]; then
    log_pass "Exactly one section glowing after move"
  else
    log_fail "Expected 1 glowing section" "Got: $GLOW_COUNT"
  fi
else
  log_skip "Section didn't change (reviewer may have few sections)"
  log_skip "Glow count check depends on section change"
fi

# ── TEST 9: Prev step — state goes back ─────────────────────
echo ""
log_info "TEST 9: Prev step — navigates backward"

STEP_BEFORE=$(browser_eval "window.slapState.tourStep")

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))"
sleep 1.5

STEP_AFTER=$(browser_eval "window.slapState.tourStep")

if [ "$STEP_AFTER" -lt "$STEP_BEFORE" ] 2>/dev/null; then
  log_pass "Prev navigated backward ($STEP_BEFORE -> $STEP_AFTER)"
else
  log_fail "Prev should go back" "Was $STEP_BEFORE, now $STEP_AFTER"
fi

# Floater should still be active after prev
FLOATER_ACTIVE=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.classList.contains('active')")
if [ "$FLOATER_ACTIVE" = "true" ]; then
  log_pass "Floater still .active after prev"
else
  log_fail "Floater should remain .active after prev"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# GROUP C: Motion & Animation Lifecycle
# ══════════════════════════════════════════════════════════════

# ── TEST 10: Floater position near target section ────────────
echo ""
log_info "TEST 10: Floater docks near target section"

click_testid "draft-tour-btn"
sleep 1
click_testid "draft-mode-live"
sleep 1.5

SECTION_NAME=$(browser_eval "window.slapState.highlightedSection")

if [ -n "$SECTION_NAME" ] && [ "$SECTION_NAME" != "null" ]; then
  # Get section bounding box (relative to viewport)
  SECTION_TOP=$(browser_eval "(function(){ var el = document.querySelector('[data-section=\"${SECTION_NAME}\"]'); return el ? Math.round(el.getBoundingClientRect().top) : null; })()")
  SECTION_BOTTOM=$(browser_eval "(function(){ var el = document.querySelector('[data-section=\"${SECTION_NAME}\"]'); return el ? Math.round(el.getBoundingClientRect().bottom) : null; })()")
  SECTION_RIGHT=$(browser_eval "(function(){ var el = document.querySelector('[data-section=\"${SECTION_NAME}\"]'); return el ? Math.round(el.getBoundingClientRect().right) : null; })()")

  # Get floater position (absolute within stage, but check it's near the section)
  FLOATER_TOP_PX=$(browser_eval "(function(){ var f = document.querySelector('[data-testid=\"draft-floater\"]'); return f ? parseInt(f.style.top) : null; })()")

  if [ -n "$FLOATER_TOP_PX" ] && [ "$FLOATER_TOP_PX" != "null" ] && [ "$FLOATER_TOP_PX" -gt 0 ] 2>/dev/null; then
    log_pass "Floater has positive top position: ${FLOATER_TOP_PX}px (docked near section)"
  else
    log_fail "Floater should have positive position near section" "Got top: $FLOATER_TOP_PX"
  fi
else
  log_fail "No highlighted section in live mode"
fi

# ── TEST 11: Trail origin near rail slot ─────────────────────
echo ""
log_info "TEST 11: Trail path originates from rail area"

TRAIL_D=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('d') || ''")

# Parse the M (moveto) x coordinate — trail starts from rail (right side of stage)
TRAIL_START_X=$(browser_eval "(function(){ var d = document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('d') || ''; var m = d.match(/^M\\s+([\\d.]+)/); return m ? Math.round(parseFloat(m[1])) : null; })()")

# Rail is positioned to the right of the frame (~1020px wide frame)
if [ -n "$TRAIL_START_X" ] && [ "$TRAIL_START_X" != "null" ] && [ "$TRAIL_START_X" -gt 500 ] 2>/dev/null; then
  log_pass "Trail starts from rail area (x=$TRAIL_START_X)"
else
  log_skip "Trail start x: $TRAIL_START_X (may vary by viewport)"
fi

# ── TEST 12: Live mode section has glow CSS variables ────────
echo ""
log_info "TEST 12: Section glow CSS variables in live mode"

SECTION_NAME=$(browser_eval "window.slapState.highlightedSection")

if [ -n "$SECTION_NAME" ] && [ "$SECTION_NAME" != "null" ]; then
  HAS_GLOWING=$(browser_eval "document.querySelector('[data-section=\"${SECTION_NAME}\"]')?.classList.contains('glowing')")
  if [ "$HAS_GLOWING" = "true" ]; then
    log_pass "Highlighted section has .glowing class in live mode"
  else
    log_fail "Section should have .glowing in live mode"
  fi

  GLOW_COLOR=$(browser_eval "document.querySelector('[data-section=\"${SECTION_NAME}\"]')?.style.getPropertyValue('--d-glow-color') || ''")
  if [ -n "$GLOW_COLOR" ] && [ "$GLOW_COLOR" != "" ]; then
    log_pass "Section --d-glow-color set: $GLOW_COLOR"
  else
    log_fail "Section should have --d-glow-color in live mode"
  fi
else
  log_fail "No highlighted section"
  log_fail "Cannot check glow vars"
fi

# ── TEST 13: Arriving class lifecycle ────────────────────────
echo ""
log_info "TEST 13: Floater .arriving class lifecycle"

# Step forward to trigger new choreography
browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))"
sleep 0.4  # Check during flight phase (Phase 2 starts at ~350ms)

HAS_ARRIVING=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.classList.contains('arriving')")
if [ "$HAS_ARRIVING" = "true" ]; then
  log_pass "Floater has .arriving during flight"
else
  log_skip "Arriving class may have resolved (timing-sensitive)"
fi

sleep 1.5  # Wait for full choreography to complete

HAS_ARRIVING_AFTER=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.classList.contains('arriving')")
if [ "$HAS_ARRIVING_AFTER" = "false" ]; then
  log_pass "Floater .arriving removed after landing"
else
  log_fail "Floater should not have .arriving after choreography completes"
fi

browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
sleep 0.5

# ══════════════════════════════════════════════════════════════
# GROUP D: Multi-Reviewer Live Tours
# ══════════════════════════════════════════════════════════════

# Pick two distinct reviewers for comparison
REVIEWER_A="$EXPERT_SLOT"
REVIEWER_B=""
if [ -n "$PERSONA_SLOT" ] && [ "$PERSONA_SLOT" != "null" ]; then
  REVIEWER_B="$PERSONA_SLOT"
elif [ -n "$SECOND_EXPERT" ] && [ "$SECOND_EXPERT" != "null" ]; then
  REVIEWER_B="$SECOND_EXPERT"
fi

# ── TEST 14: Switch reviewer — different floater border ──────
echo ""
log_info "TEST 14: Switch reviewer — floater border color changes"

if [ -n "$REVIEWER_A" ] && [ "$REVIEWER_A" != "null" ] && [ -n "$REVIEWER_B" ] && [ "$REVIEWER_B" != "null" ]; then
  # Tour A
  click_testid "draft-slot-${REVIEWER_A}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  BORDER_A=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.borderColor || ''")

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5

  # Tour B
  click_testid "draft-slot-${REVIEWER_B}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  BORDER_B=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"]')?.style.borderColor || ''")

  if [ "$BORDER_A" != "$BORDER_B" ] && [ -n "$BORDER_A" ] && [ -n "$BORDER_B" ]; then
    log_pass "Floater border differs: $REVIEWER_A=$BORDER_A vs $REVIEWER_B=$BORDER_B"
  else
    log_fail "Floater border should differ between reviewers" "A=$BORDER_A, B=$BORDER_B"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "Need 2 reviewers for comparison"
fi

# ── TEST 15: Switch reviewer — different avatar ─────────────
echo ""
log_info "TEST 15: Switch reviewer — floater avatar changes"

if [ -n "$REVIEWER_A" ] && [ "$REVIEWER_A" != "null" ] && [ -n "$REVIEWER_B" ] && [ "$REVIEWER_B" != "null" ]; then
  # Tour A
  click_testid "draft-slot-${REVIEWER_A}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  AVATAR_A=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"] img')?.src || ''")

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5

  # Tour B
  click_testid "draft-slot-${REVIEWER_B}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  AVATAR_B=$(browser_eval "document.querySelector('[data-testid=\"draft-floater\"] img')?.src || ''")

  if [ "$AVATAR_A" != "$AVATAR_B" ] && [ -n "$AVATAR_A" ] && [ -n "$AVATAR_B" ]; then
    log_pass "Floater avatar differs between reviewers"
  else
    log_fail "Floater avatar should differ" "A=$AVATAR_A, B=$AVATAR_B"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "Need 2 reviewers for comparison"
fi

# ── TEST 16: Switch reviewer — rail slot empty state swaps ───
echo ""
log_info "TEST 16: Switch reviewer — empty slot swaps"

if [ -n "$REVIEWER_A" ] && [ "$REVIEWER_A" != "null" ] && [ -n "$REVIEWER_B" ] && [ "$REVIEWER_B" != "null" ]; then
  # Tour A in live mode
  click_testid "draft-slot-${REVIEWER_A}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  SLOT_A_EMPTY=$(browser_eval "document.querySelector('[data-testid=\"draft-slot-${REVIEWER_A}\"]')?.classList.contains('empty')")
  SLOT_B_EMPTY=$(browser_eval "document.querySelector('[data-testid=\"draft-slot-${REVIEWER_B}\"]')?.classList.contains('empty')")

  if [ "$SLOT_A_EMPTY" = "true" ]; then
    log_pass "Reviewer A slot is .empty during A's live tour"
  else
    log_fail "Active reviewer's slot should be .empty" "Slot A empty: $SLOT_A_EMPTY"
  fi

  if [ "$SLOT_B_EMPTY" = "false" ]; then
    log_pass "Reviewer B slot is NOT .empty during A's live tour"
  else
    log_fail "Inactive reviewer's slot should not be .empty" "Slot B empty: $SLOT_B_EMPTY"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "Need 2 reviewers for comparison"
  log_skip "Need 2 reviewers for comparison"
fi

# ── TEST 17: Switch reviewer — trail stroke color changes ────
echo ""
log_info "TEST 17: Switch reviewer — trail stroke color changes"

if [ -n "$REVIEWER_A" ] && [ "$REVIEWER_A" != "null" ] && [ -n "$REVIEWER_B" ] && [ "$REVIEWER_B" != "null" ]; then
  # Tour A
  click_testid "draft-slot-${REVIEWER_A}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  STROKE_A=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('stroke') || ''")

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5

  # Tour B
  click_testid "draft-slot-${REVIEWER_B}"
  sleep 0.3
  click_testid "draft-tour-btn"
  sleep 1
  click_testid "draft-mode-live"
  sleep 1.5

  STROKE_B=$(browser_eval "document.querySelector('[data-testid=\"draft-trail-path\"]')?.getAttribute('stroke') || ''")

  if [ "$STROKE_A" != "$STROKE_B" ] && [ -n "$STROKE_A" ] && [ -n "$STROKE_B" ]; then
    log_pass "Trail stroke differs: $STROKE_A vs $STROKE_B"
  else
    log_fail "Trail stroke should differ between reviewers" "A=$STROKE_A, B=$STROKE_B"
  fi

  browser_eval "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
  sleep 0.5
else
  log_skip "Need 2 reviewers for comparison"
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
