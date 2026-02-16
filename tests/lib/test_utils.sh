#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# Shared test utilities for SLAP! E2E tests
# ═══════════════════════════════════════════════════════════════
# Source this in every test script:
#   SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
#   source "$SCRIPT_DIR/lib/test_utils.sh"
# ═══════════════════════════════════════════════════════════════

set +e  # Don't exit on error — let all tests run

# ─── State ────────────────────────────────────────────────────
PASS_COUNT=0
FAIL_COUNT=0
SKIP_COUNT=0
TOTAL_COUNT=0
TESTS=()

PORT="${PORT:-5173}"
BASE_URL="http://localhost:$PORT"

# ─── Colors ───────────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ─── Logging ──────────────────────────────────────────────────

log_pass() {
  local label="$1"
  PASS_COUNT=$((PASS_COUNT + 1))
  TOTAL_COUNT=$((TOTAL_COUNT + 1))
  TESTS+=("[PASS] $label")
  echo -e "  ${GREEN}[PASS]${NC} ${label}"
}

log_fail() {
  local label="$1"
  local detail="${2:-}"
  FAIL_COUNT=$((FAIL_COUNT + 1))
  TOTAL_COUNT=$((TOTAL_COUNT + 1))
  TESTS+=("[FAIL] $label")
  echo -e "  ${RED}[FAIL]${NC} ${label}"
  [ -n "$detail" ] && echo -e "    ${RED}→ ${detail}${NC}"
}

log_skip() {
  local label="$1"
  SKIP_COUNT=$((SKIP_COUNT + 1))
  TOTAL_COUNT=$((TOTAL_COUNT + 1))
  TESTS+=("[SKIP] $label")
  echo -e "  ${YELLOW}[SKIP]${NC} ${label}"
}

log_info() {
  echo -e "  ${YELLOW}[INFO]${NC} ${1}"
}

log_test() {
  echo -e "  ${CYAN}[TEST]${NC} ${1}"
}

print_header() {
  echo ""
  echo -e "${BOLD}═══ $1 ═══${NC}"
  echo ""
}

# ─── Assertions (legacy compat) ──────────────────────────────

assert_pass() { log_pass "$1"; }
assert_fail() { log_fail "$1" "$2"; }

assert_contains() {
  local content="$1" needle="$2" label="$3"
  if echo "$content" | grep -q "$needle"; then
    log_pass "$label"
  else
    log_fail "$label" "Expected to find: ${needle}"
  fi
}

assert_not_empty() {
  local content="$1" label="$2"
  if [ -n "$content" ]; then
    log_pass "$label"
  else
    log_fail "$label" "Content was empty"
  fi
}

# ─── Server Helpers ───────────────────────────────────────────

wait_for_server() {
  local url="${1:-$BASE_URL}"
  local max_retries="${2:-10}"
  local attempt=0
  while [ $attempt -lt $max_retries ]; do
    if curl -sf -o /dev/null "$url" 2>/dev/null; then
      return 0
    fi
    sleep 1
    attempt=$((attempt + 1))
  done
  return 1
}

check_server() { wait_for_server "$@"; }

fetch_page() {
  local url="${1:-$BASE_URL}"
  curl -s "$url" 2>/dev/null
}

# ─── API Helpers ──────────────────────────────────────────────

api_call() {
  local method="$1" url="$2" data="${3:-}"
  local result
  if [ -n "$data" ]; then
    result=$(curl -sf -w "\n%{http_code}" -X "$method" "$url" \
      -H "Content-Type: application/json" -d "$data" 2>&1)
  else
    result=$(curl -sf -w "\n%{http_code}" -X "$method" "$url" 2>&1)
  fi
  HTTP_CODE=$(echo "$result" | tail -1)
  BODY=$(echo "$result" | sed '$d')
}

json_get() {
  local json="$1" path="$2" default="${3:-}"
  local val
  val=$(echo "$json" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    keys = '$path'.strip('.').split('.')
    for k in keys:
        d = d[k]
    print(d)
except:
    print('$default')
" 2>/dev/null)
  echo "${val:-$default}"
}

# ─── Browser Helpers (agent-browser) ─────────────────────────

open_page() {
  local url="${1:-$BASE_URL}"
  local max_retries="${2:-3}"
  local attempt=0
  while [ $attempt -lt $max_retries ]; do
    if agent-browser open "$url" 2>/dev/null; then
      sleep 1  # Let page render
      return 0
    fi
    sleep 1
    attempt=$((attempt + 1))
  done
  return 1
}

check_snapshot() {
  local pattern="$1"
  local label="$2"
  local snap
  snap=$(agent-browser snapshot -c 2>/dev/null)
  if echo "$snap" | grep -qi "$pattern"; then
    log_pass "$label"
  else
    log_fail "$label" "Pattern not in snapshot: ${pattern}"
  fi
}

# Evaluate JS and return result (strips surrounding quotes and unescapes)
browser_eval() {
  local raw
  raw=$(agent-browser eval "$1" 2>/dev/null)
  # Strip surrounding double quotes that agent-browser adds to string results
  raw="${raw#\"}"
  raw="${raw%\"}"
  # Unescape JSON-style escaped quotes
  raw="${raw//\\\"/\"}"
  echo "$raw"
}

# Check element exists by data-testid
check_testid() {
  local testid="$1"
  local label="$2"
  local exists
  exists=$(browser_eval "!!document.querySelector('[data-testid=\"${testid}\"]')")
  if [ "$exists" = "true" ]; then
    log_pass "$label"
  else
    log_fail "$label" "data-testid=\"${testid}\" not found"
  fi
}

# Check element is visible (in viewport and has dimensions)
check_visible() {
  local testid="$1"
  local label="$2"
  local visible
  visible=$(browser_eval "
    (function() {
      var el = document.querySelector('[data-testid=\"${testid}\"]');
      if (!el) return 'missing';
      var r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return 'zero-size';
      if (r.bottom < 0 || r.top > window.innerHeight) return 'offscreen';
      return 'visible';
    })()
  ")
  if [ "$visible" = "visible" ]; then
    log_pass "$label"
  else
    log_fail "$label" "Element [data-testid=\"${testid}\"] is ${visible}"
  fi
}

# Get bounding box of element by data-testid
get_box() {
  local testid="$1"
  browser_eval "
    (function() {
      var el = document.querySelector('[data-testid=\"${testid}\"]');
      if (!el) return JSON.stringify(null);
      var r = el.getBoundingClientRect();
      return JSON.stringify({top:Math.round(r.top),left:Math.round(r.left),right:Math.round(r.right),bottom:Math.round(r.bottom),width:Math.round(r.width),height:Math.round(r.height)});
    })()
  "
}

# Check element position (e.g., bottom bar sits above chin)
check_position() {
  local testid="$1"
  local prop="$2"    # top, left, right, bottom, width, height
  local op="$3"      # lt, gt, eq, lte, gte
  local expected="$4"
  local label="$5"
  local val
  val=$(browser_eval "
    (function() {
      var el = document.querySelector('[data-testid=\"${testid}\"]');
      if (!el) return 'null';
      var r = el.getBoundingClientRect();
      return Math.round(r.${prop});
    })()
  ")

  if [ "$val" = "null" ]; then
    log_fail "$label" "Element not found"
    return
  fi

  local pass=false
  case "$op" in
    lt)  [ "$val" -lt "$expected" ] && pass=true ;;
    gt)  [ "$val" -gt "$expected" ] && pass=true ;;
    eq)  [ "$val" -eq "$expected" ] && pass=true ;;
    lte) [ "$val" -le "$expected" ] && pass=true ;;
    gte) [ "$val" -ge "$expected" ] && pass=true ;;
  esac

  if $pass; then
    log_pass "$label (${prop}=${val})"
  else
    log_fail "$label" "Expected ${prop} ${op} ${expected}, got ${val}"
  fi
}

# Click element by data-testid
click_testid() {
  local testid="$1"
  agent-browser click "[data-testid=\"${testid}\"]" 2>/dev/null
}

# ─── Cleanup ─────────────────────────────────────────────────

setup_cleanup() {
  trap 'agent-browser close 2>/dev/null' EXIT
}

# ─── Summary ─────────────────────────────────────────────────

print_summary() {
  echo ""
  echo "═══════════════════════════════════════"
  echo -e "${BOLD}TEST RESULTS${NC}"
  echo "───────────────────────────────────────"
  for t in "${TESTS[@]}"; do
    if [[ "$t" == "[PASS]"* ]]; then
      echo -e "  ${GREEN}${t}${NC}"
    elif [[ "$t" == "[FAIL]"* ]]; then
      echo -e "  ${RED}${t}${NC}"
    else
      echo -e "  ${YELLOW}${t}${NC}"
    fi
  done
  echo "───────────────────────────────────────"
  echo -e "  ${GREEN}Passed: ${PASS_COUNT}${NC}  ${RED}Failed: ${FAIL_COUNT}${NC}  ${YELLOW}Skipped: ${SKIP_COUNT}${NC}  Total: ${TOTAL_COUNT}"
  echo "═══════════════════════════════════════"

  if [ "$FAIL_COUNT" -eq 0 ]; then
    return 0
  else
    return 1
  fi
}
