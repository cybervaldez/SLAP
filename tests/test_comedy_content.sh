#!/bin/bash
# ============================================================================
# E2E Test Suite: Comedy Content Verification
# ============================================================================
# Verifies that all 3 archetypes render comedy-themed proud-slop content
# after the genre rewrite (generic → slapstick comedy).
#
# Usage: ./tests/test_comedy_content.sh [PORT]
# ============================================================================

set +e  # Don't exit on error - let all tests run

PORT="${1:-5179}"
BASE_URL="http://localhost:$PORT"
PASS=0
FAIL=0
TESTS=()

log_pass() { echo "  [PASS] $1"; PASS=$((PASS + 1)); TESTS+=("[PASS] $1"); }
log_fail() { echo "  [FAIL] $1"; FAIL=$((FAIL + 1)); TESTS+=("[FAIL] $1"); }
log_info() { echo "  [INFO] $1"; }

cleanup() { agent-browser close 2>/dev/null || true; }
trap cleanup EXIT

echo "============================================"
echo "  Comedy Content Verification"
echo "============================================"
echo ""

# ── PREREQ ───────────────────────────────────────────────────────────

log_info "Checking server at $BASE_URL"
for i in $(seq 1 10); do
    curl -sf "$BASE_URL/" > /dev/null 2>&1 && break
    sleep 1
done

if ! curl -sf "$BASE_URL/" > /dev/null 2>&1; then
    echo "  [FAIL] Server not running at $BASE_URL"
    exit 1
fi
log_pass "Server is running"

# ── TEST 1: E-Commerce renders comedy merch ──────────────────────────

echo ""
log_info "TEST 1: E-Commerce — Comedy Merch Store"

# First open may need retry if browser process is stale
for attempt in 1 2 3; do
    agent-browser open "$BASE_URL/#/e-commerce" 2>&1 && break
    sleep 1
    agent-browser close 2>/dev/null
    sleep 1
done
sleep 3
SNAP=$(agent-browser snapshot -c 2>/dev/null)

echo "$SNAP" | grep -q "Professional-Grade Banana Peel" && \
    log_pass "Banana Peel product renders" || \
    log_fail "Banana Peel product missing"

echo "$SNAP" | grep -q "Heritage Squirting Flower Lapel" && \
    log_pass "Squirting Flower product renders" || \
    log_fail "Squirting Flower product missing"

echo "$SNAP" | grep -q "Artisan Whoopee Cushion" && \
    log_pass "Whoopee Cushion product renders" || \
    log_fail "Whoopee Cushion product missing"

echo "$SNAP" | grep -q "SlipShield" && \
    log_pass "Proud-slop trademark (SlipShield) renders" || \
    log_fail "SlipShield trademark missing"

# Verify new category names
echo "$SNAP" | grep -q "Props" && \
    log_pass "Category 'Props' renders" || \
    log_fail "Category 'Props' missing"

echo "$SNAP" | grep -q "Costumes" && \
    log_pass "Category 'Costumes' renders" || \
    log_fail "Category 'Costumes' missing"

echo "$SNAP" | grep -q "Gags" && \
    log_pass "Category 'Gags' renders" || \
    log_fail "Category 'Gags' missing"

echo "$SNAP" | grep -q "Sets" && \
    log_pass "Category 'Sets' renders" || \
    log_fail "Category 'Sets' missing"

# Verify old content is gone
echo "$SNAP" | grep -q "Premium Wireless Headphones" && \
    log_fail "OLD content 'Wireless Headphones' still present" || \
    log_pass "Old generic content is gone"

# ── TEST 2: Landing Page renders SLAPSTICK ACADEMY ───────────────────

echo ""
log_info "TEST 2: Landing Page — SLAPSTICK ACADEMY"

agent-browser open "$BASE_URL/#/landing-page" 2>/dev/null
sleep 2
SNAP=$(agent-browser snapshot -c 2>/dev/null)

echo "$SNAP" | grep -q "Perfectly Timed Fall" && \
    log_pass "Hero headline renders" || \
    log_fail "Hero headline missing"

echo "$SNAP" | grep -q "pratfall technique" && \
    log_pass "Comedy subheadline renders" || \
    log_fail "Comedy subheadline missing"

echo "$SNAP" | grep -q "Start Your Training" && \
    log_pass "CTA 'Start Your Training' renders" || \
    log_fail "CTA missing"

# Pricing tiers
echo "$SNAP" | grep -q "Opener" && \
    log_pass "Pricing tier 'Opener' renders" || \
    log_fail "Pricing tier 'Opener' missing"

echo "$SNAP" | grep -q "Headliner" && \
    log_pass "Pricing tier 'Headliner' renders" || \
    log_fail "Pricing tier 'Headliner' missing"

echo "$SNAP" | grep -q "Legendary" && \
    log_pass "Pricing tier 'Legendary' renders" || \
    log_fail "Pricing tier 'Legendary' missing"

# Comedy features
echo "$SNAP" | grep -q "pratfall onboarding" && \
    log_pass "Comedy feature 'pratfall onboarding' renders" || \
    log_fail "Comedy feature missing"

# Testimonials
echo "$SNAP" | grep -q "Chief Comedy Officer" && \
    log_pass "Comedy testimonial renders" || \
    log_fail "Comedy testimonial missing"

echo "$SNAP" | grep -q "Synergy Laughs" && \
    log_pass "Comedy company name renders" || \
    log_fail "Comedy company name missing"

# Verify hero heading is comedy content (findings overlay may quote old content)
HERO=$(agent-browser eval "document.querySelector('h1')?.textContent" 2>/dev/null)
echo "$HERO" | grep -q "Perfectly Timed Fall" && \
    log_pass "Hero heading is comedy content" || \
    log_fail "Hero heading is NOT comedy content: $HERO"

# ── TEST 3: Text-Heavy renders comedy manifesto ──────────────────────

echo ""
log_info "TEST 3: Text-Heavy — Comedy Manifesto"

agent-browser open "$BASE_URL/#/text-heavy" 2>/dev/null
sleep 2
SNAP=$(agent-browser snapshot -c 2>/dev/null)

echo "$SNAP" | grep -q "Laughing Wrong" && \
    log_pass "Title 'You're Laughing Wrong' renders" || \
    log_fail "Comedy title missing"

echo "$SNAP" | grep -q "Comedy Excellence" && \
    log_pass "Subtitle 'Comedy Excellence' renders" || \
    log_fail "Comedy subtitle missing"

echo "$SNAP" | grep -q "First Punchline Problem" && \
    log_pass "Section 1 'First Punchline Problem' renders" || \
    log_fail "Section 1 missing"

echo "$SNAP" | grep -q "Setup Nobody Notices" && \
    log_pass "Section 2 'Setup Nobody Notices' renders" || \
    log_fail "Section 2 missing"

echo "$SNAP" | grep -q "Time It Twice" && \
    log_pass "Section 3 'Time It Twice' renders" || \
    log_fail "Section 3 missing"

echo "$SNAP" | grep -q "Slapstick vs. Subtlety" && \
    log_pass "Section 4 'Slapstick vs. Subtlety' renders" || \
    log_fail "Section 4 missing"

echo "$SNAP" | grep -q "Last Laugh" && \
    log_pass "Section 5 'The Last Laugh' renders" || \
    log_fail "Section 5 missing"

echo "$SNAP" | grep -q "comedic landscape" && \
    log_pass "Proud-slop opener 'comedic landscape' renders" || \
    log_fail "Proud-slop opener missing"

echo "$SNAP" | grep -q "Comedy Strategy" && \
    log_pass "Comedy tag renders" || \
    log_fail "Comedy tag missing"

# Verify old content is gone
echo "$SNAP" | grep -q "Reading This Wrong" && \
    log_fail "OLD content 'Reading This Wrong' still present" || \
    log_pass "Old generic content is gone"

# ── TEST 4: Styled variation inherits comedy content ─────────────────

echo ""
log_info "TEST 4: Styled Variation Inherits Comedy Content"

agent-browser open "$BASE_URL/#/landing-page/brutalist" 2>/dev/null
sleep 2
SNAP=$(agent-browser snapshot -c 2>/dev/null)

echo "$SNAP" | grep -q "Perfectly Timed Fall" && \
    log_pass "Brutalist landing has comedy hero" || \
    log_fail "Brutalist landing missing comedy hero"

echo "$SNAP" | grep -q "Opener" && \
    log_pass "Brutalist landing has comedy pricing" || \
    log_fail "Brutalist landing missing comedy pricing"

# ── SUMMARY ──────────────────────────────────────────────────────────

echo ""
echo "============================================"
echo "  RESULTS: $PASS passed, $FAIL failed"
echo "============================================"
for t in "${TESTS[@]}"; do echo "  $t"; done
echo ""

[ "$FAIL" -eq 0 ] && exit 0 || exit 1
