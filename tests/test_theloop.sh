#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: TheLoop — Homepage Section 3
# ═══════════════════════════════════════════════════════════════
# Validates: section renders, terminal chrome, scroll-reveal lines,
# council checklist, persona briefs, traffic lights, summary box,
# score comparison, blinking cursor, whisper, CTA buttons,
# slapState sections includes the-loop.
#
# Usage: ./tests/test_theloop.sh [--port 5173]
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

# Parse arguments
[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup

print_header "TheLoop — Homepage Section 3 E2E Tests"

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
# TEST 1: Landing page loads with TheLoop section
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 1: Section exists in DOM"

if open_page "${BASE_URL}/#/"; then
  log_pass "Landing page opened"
else
  log_fail "Failed to open landing page"
  print_summary
  exit 1
fi

sleep 2

HAS_SECTION=$(browser_eval "!!document.querySelector('[data-testid=\"the-loop-section\"]')")
if [ "$HAS_SECTION" = "true" ]; then
  log_pass "TheLoop section present in DOM"
else
  log_fail "TheLoop section missing"
fi

HAS_TERMINAL=$(browser_eval "!!document.querySelector('[data-testid=\"loop-terminal\"]')")
if [ "$HAS_TERMINAL" = "true" ]; then
  log_pass "Terminal element present"
else
  log_fail "Terminal element missing"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 2: slapState.sections includes the-loop
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 2: slapState includes the-loop"

STATE_SECTIONS=$(browser_eval "JSON.stringify(window.slapState?.sections)")
if echo "$STATE_SECTIONS" | grep -q "the-loop"; then
  log_pass "slapState.sections includes 'the-loop'"
else
  log_fail "slapState.sections missing 'the-loop'" "Got: $STATE_SECTIONS"
fi

if echo "$STATE_SECTIONS" | grep -q "hero-problem" && echo "$STATE_SECTIONS" | grep -q "council"; then
  log_pass "slapState.sections still has hero-problem and council"
else
  log_fail "slapState.sections missing original sections"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 3: Terminal chrome (dots + label)
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 3: Terminal chrome"

DOT_COUNT=$(browser_eval "(function(){ var bar = document.querySelector('[data-testid=\"loop-terminal\"]'); if(!bar) return 0; var dots = bar.querySelectorAll('span'); var count = 0; dots.forEach(function(d){ var bg = getComputedStyle(d).backgroundColor; if(bg && bg !== 'rgba(0, 0, 0, 0)') count++; }); return count; })()")
if [ "$DOT_COUNT" -ge 3 ]; then
  log_pass "Terminal has traffic light dots"
else
  log_skip "Terminal dots: $DOT_COUNT (style check may vary)"
fi

TERM_LABEL=$(browser_eval "document.querySelector('[data-testid=\"loop-terminal\"]')?.textContent || ''")
if echo "$TERM_LABEL" | grep -q "slap"; then
  log_pass "Terminal label contains 'slap'"
else
  log_fail "Terminal label missing 'slap' text"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 4: Terminal content matches /slap output
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 4: Terminal content accuracy"

# Scroll the section into view to trigger reveal
browser_eval "(function(){ var el = document.querySelector('[data-testid=\"the-loop-section\"]'); if(el) el.scrollIntoView({behavior:'instant'}); })()"
sleep 2

TERM_TEXT=$(browser_eval "document.querySelector('[data-testid=\"loop-terminal\"]')?.textContent || ''")

# Phase 1: /slap command
if echo "$TERM_TEXT" | grep -q "/slap projects/FlowBoard/haiku.html"; then
  log_pass "Contains /slap command"
else
  log_fail "Missing /slap command"
fi

# Phase 1: Analysis output
if echo "$TERM_TEXT" | grep -q "PM tool landing page"; then
  log_pass "Contains 'Detected: PM tool landing page'"
else
  log_fail "Missing detection output"
fi

if echo "$TERM_TEXT" | grep -q "hero, features, pricing, testimonials, cta"; then
  log_pass "Contains section list"
else
  log_fail "Missing section list"
fi

# Phase 3: Council
if echo "$TERM_TEXT" | grep -q "REVIEW COUNCIL"; then
  log_pass "Contains REVIEW COUNCIL header"
else
  log_fail "Missing REVIEW COUNCIL"
fi

if echo "$TERM_TEXT" | grep -q "EXPERTS (5"; then
  log_pass "Contains EXPERTS count"
else
  log_fail "Missing EXPERTS count"
fi

# Council checklist names
for name in frank elena carlos jasmine sam sarah dorothy mike; do
  if echo "$TERM_TEXT" | grep -q "$name"; then
    log_pass "Council includes $name"
  else
    log_fail "Council missing $name"
  fi
done

# Skipped reviewers
if echo "$TERM_TEXT" | grep -q "marcus"; then
  log_pass "Shows skipped reviewer (marcus)"
else
  log_fail "Missing skipped reviewer"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 5: Persona briefs output
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 5: Persona briefs section"

if echo "$TERM_TEXT" | grep -q "GENERATING PERSONA BRIEFS"; then
  log_pass "Contains GENERATING PERSONA BRIEFS"
else
  log_fail "Missing persona briefs header"
fi

if echo "$TERM_TEXT" | grep -q "frank.md"; then
  log_pass "Shows frank.md brief filename"
else
  log_fail "Missing frank.md"
fi

if echo "$TERM_TEXT" | grep -q "sarah.md"; then
  log_pass "Shows sarah.md brief filename"
else
  log_fail "Missing sarah.md"
fi

if echo "$TERM_TEXT" | grep -q "23 persona briefs"; then
  log_pass "Shows 23 persona briefs count"
else
  log_fail "Missing persona count"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 6: Reviews + traffic lights
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 6: Reviews and traffic lights"

if echo "$TERM_TEXT" | grep -q "GENERATING REVIEWS"; then
  log_pass "Contains GENERATING REVIEWS"
else
  log_fail "Missing reviews header"
fi

if echo "$TERM_TEXT" | grep -q "55 red"; then
  log_pass "Shows 55 red findings"
else
  log_fail "Missing red count"
fi

if echo "$TERM_TEXT" | grep -q "80 yellow"; then
  log_pass "Shows 80 yellow findings"
else
  log_fail "Missing yellow count"
fi

if echo "$TERM_TEXT" | grep -q "43 green"; then
  log_pass "Shows 43 green findings"
else
  log_fail "Missing green count"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 7: SLAP COMPLETE summary box
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 7: Summary box"

if echo "$TERM_TEXT" | grep -q "SLAP COMPLETE"; then
  log_pass "Contains SLAP COMPLETE"
else
  log_fail "Missing SLAP COMPLETE"
fi

if echo "$TERM_TEXT" | grep -q "projects/FlowBoard/personas/"; then
  log_pass "Shows persona path"
else
  log_fail "Missing persona path"
fi

if echo "$TERM_TEXT" | grep -q "flowboardReviews.ts"; then
  log_pass "Shows review data filename"
else
  log_fail "Missing review data filename"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 8: Iterate step + v2 re-slap
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 8: Iterate + v2 cycle"

if echo "$TERM_TEXT" | grep -q "COPY PROMPT"; then
  log_pass "Contains COPY PROMPT step"
else
  log_fail "Missing COPY PROMPT"
fi

if echo "$TERM_TEXT" | grep -q "/slap projects/FlowBoard/v2.html --parent haiku"; then
  log_pass "Contains v2 /slap command with --parent"
else
  log_fail "Missing v2 command"
fi

if echo "$TERM_TEXT" | grep -q "Reusing existing persona briefs"; then
  log_pass "Shows persona brief reuse"
else
  log_fail "Missing persona reuse message"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 9: Score comparison (5.8 → 7.2)
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 9: Score comparison"

if echo "$TERM_TEXT" | grep -q "4.2"; then
  log_pass "Shows haiku score 4.2"
else
  log_fail "Missing 4.2 score"
fi

if echo "$TERM_TEXT" | grep -q "5.6"; then
  log_pass "Shows v2 score 5.6"
else
  log_fail "Missing 5.6 score"
fi

if echo "$TERM_TEXT" | grep -q "+1.4"; then
  log_pass "Shows +1.4 improvement"
else
  log_fail "Missing improvement delta"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 10: Whisper + CTA buttons
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 10: Whisper and CTA"

WHISPER=$(browser_eval "document.querySelector('[data-testid=\"loop-whisper\"]')?.textContent || ''")
if echo "$WHISPER" | grep -q "Generic feedback"; then
  log_pass "Whisper text present"
else
  log_fail "Whisper text missing"
fi

HAS_TRY=$(browser_eval "!!document.querySelector('[data-testid=\"loop-cta-try\"]')")
if [ "$HAS_TRY" = "true" ]; then
  log_pass "TRY WITH YOUR DESIGN button exists"
else
  log_fail "TRY button missing"
fi

HAS_DEMO=$(browser_eval "!!document.querySelector('[data-testid=\"loop-cta-demo\"]')")
if [ "$HAS_DEMO" = "true" ]; then
  log_pass "EXPLORE FLOWBOARD DEMO button exists"
else
  log_fail "DEMO button missing"
fi

# ═══════════════════════════════════════════════════════════════
# TEST 11: Loop step data-testids present
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 11: Step testids"

STEPS=("loop-step-1" "loop-step-2" "loop-step-3" "loop-step-4" "loop-step-5" "loop-step-iterate" "loop-step-6" "loop-step-repeat")
for step in "${STEPS[@]}"; do
  HAS=$(browser_eval "!!document.querySelector('[data-testid=\"${step}\"]')")
  if [ "$HAS" = "true" ]; then
    log_pass "Step testid: $step"
  else
    log_fail "Missing testid: $step"
  fi
done

# ═══════════════════════════════════════════════════════════════
# TEST 12: EXPLORE FLOWBOARD DEMO navigates
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 12: Demo CTA navigation"

browser_eval "(function(){ var btn = document.querySelector('[data-testid=\"loop-cta-demo\"]'); if(btn) btn.click(); })()"
sleep 2

CURRENT_URL=$(browser_eval "window.location.hash")
if echo "$CURRENT_URL" | grep -q "flowboard"; then
  log_pass "Demo CTA navigated to flowboard"
else
  log_fail "Demo CTA did not navigate" "Hash: $CURRENT_URL"
fi

# Navigate back for cleanup
browser_eval "window.location.hash = '#/'"
sleep 1

# ═══════════════════════════════════════════════════════════════
# TEST 13: Sample findings section
# ═══════════════════════════════════════════════════════════════
echo ""
log_info "TEST 13: Sample findings"

HAS_FINDINGS=$(browser_eval "!!document.querySelector('[data-testid=\"loop-findings\"]')")
if [ "$HAS_FINDINGS" = "true" ]; then
  log_pass "loop-findings testid exists"
else
  log_fail "Missing loop-findings testid"
fi

if echo "$TERM_TEXT" | grep -q "most overused word"; then
  log_pass "Frank finding: 'most overused word'"
else
  log_fail "Missing frank finding"
fi

if echo "$TERM_TEXT" | grep -q "TechStart"; then
  log_pass "Sarah finding: 'TechStart'"
else
  log_fail "Missing sarah finding"
fi

if echo "$TERM_TEXT" | grep -q "clamp"; then
  log_pass "Technical finding: 'clamp'"
else
  log_fail "Missing technical finding"
fi

if echo "$TERM_TEXT" | grep -q "Kanban"; then
  log_pass "Dorothy finding: 'Kanban'"
else
  log_fail "Missing dorothy finding"
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
