---
name: e2e
description: Run E2E tests using agent-browser. Starts the dev server, opens pages in a headless browser, verifies layout, interactions, and state. Use when you want to verify the UI works correctly end-to-end.
argument-hint: [test_name|all]
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

## TL;DR

**Phase:** Verification

**What:** Run automated E2E tests against the live dev server using `agent-browser`. Tests verify page structure, element positions, interactions (clicks, keyboard), visual state (opacity, transforms), and JS state (`window.slapState`).

**When:** After implementing or modifying UI. Before commits. After `/create-task`.

**Output:** Pass/fail results for each test case with detailed failure reasons.

---

## Workflow

### 1. Ensure Dev Server is Running

```bash
# Check if server is already running
if ! curl -sf http://localhost:5173 > /dev/null 2>&1; then
  # Start in background
  cd "$PROJECT_ROOT" && npm run dev &
  DEV_PID=$!
  sleep 3
fi
```

If the port is taken, detect the actual port from Vite output or try 5174/5175.

### 2. Determine Which Tests to Run

Parse `$ARGUMENTS`:
- No argument or `all` → run all `tests/test_*.sh` files
- Specific name (e.g., `landing`) → run `tests/test_landing.sh`
- Feature name → find matching test file

### 3. Run Tests

```bash
# Run specific test
./tests/test_landing.sh --port $PORT

# Run all tests
for test_file in tests/test_*.sh; do
  bash "$test_file" --port $PORT
done
```

### 4. Report Results

Summarize pass/fail counts across all test files.

---

## Available Test Helpers (`tests/lib/test_utils.sh`)

All test scripts source the shared library. Key functions:

### Server
| Function | Description |
|----------|-------------|
| `wait_for_server [url] [retries]` | Wait for server with retries |
| `fetch_page [url]` | Fetch HTML via curl |

### Browser (agent-browser)
| Function | Description |
|----------|-------------|
| `open_page [url] [retries]` | Open page with retry |
| `check_snapshot "pattern" "label"` | Snapshot + grep |
| `browser_eval "js"` | Run JS, return result |
| `check_testid "id" "label"` | Verify element exists by data-testid |
| `check_visible "id" "label"` | Verify element is visible in viewport |
| `get_box "id"` | Get bounding rect JSON |
| `check_position "id" "prop" "op" "val" "label"` | Assert position (top/left/bottom/right lt/gt/eq val) |
| `click_testid "id"` | Click element by data-testid |

### Logging
| Function | Description |
|----------|-------------|
| `log_pass "msg"` | Green [PASS] |
| `log_fail "msg" ["detail"]` | Red [FAIL] |
| `log_skip "msg"` | Yellow [SKIP] |
| `log_info "msg"` | Yellow [INFO] |
| `print_header "title"` | Bold section header |
| `print_summary` | Final results table, returns exit code |

### Lifecycle
| Function | Description |
|----------|-------------|
| `setup_cleanup` | Trap EXIT to close browser |

---

## Writing New Tests

### Template

```bash
#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# E2E Test Suite: <Feature Name>
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib/test_utils.sh"

[[ "$1" == "--port" ]] && PORT="$2"
[[ "$1" =~ ^[0-9]+$ ]] && PORT="$1"
BASE_URL="http://localhost:$PORT"

setup_cleanup
print_header "<Feature> E2E Tests"

# ── PREREQ ──
log_info "PREREQUISITES"
if wait_for_server "$BASE_URL"; then
  log_pass "Server running"
else
  log_fail "Server not running"
  print_summary; exit 1
fi

if open_page "$BASE_URL"; then
  log_pass "Page opened"
else
  log_fail "Failed to open page"
  print_summary; exit 1
fi
sleep 2

# ── TEST 1: Element exists ──
echo ""
log_info "TEST 1: <Description>"
check_testid "my-element" "Element present"
check_visible "my-element" "Element visible"

# ── TEST 2: Interaction ──
echo ""
log_info "TEST 2: <Description>"
click_testid "my-button"
sleep 0.5
RESULT=$(browser_eval "document.querySelector('[data-testid=\"output\"]')?.textContent")
[ "$RESULT" = "expected" ] && log_pass "Interaction works" || log_fail "Interaction" "Got: $RESULT"

# ── TEST 3: Position check ──
echo ""
log_info "TEST 3: <Description>"
check_position "my-bar" "bottom" "lte" "$(browser_eval 'window.innerHeight')" "Bar within viewport"

# ── CLEANUP ──
echo ""
log_info "CLEANUP"
agent-browser close 2>/dev/null
log_pass "Browser closed"

print_summary
exit $?
```

### Key Patterns

**Verify element by testid + JS eval (preferred):**
```bash
EXISTS=$(browser_eval "!!document.querySelector('[data-testid=\"foo\"]')")
[ "$EXISTS" = "true" ] && log_pass "Found" || log_fail "Missing"
```

**Verify computed style:**
```bash
OPACITY=$(browser_eval "getComputedStyle(document.querySelector('[data-testid=\"foo\"]')).opacity")
[ "$OPACITY" = "1" ] && log_pass "Visible" || log_fail "Hidden (opacity=$OPACITY)"
```

**Verify bounding box:**
```bash
check_position "footer" "bottom" "lte" "$(browser_eval 'window.innerHeight - 88')" "Footer above chin"
```

**Verify JS state:**
```bash
STATE=$(browser_eval "JSON.stringify(window.slapState)")
echo "$STATE" | grep -q '"project":"landing"' && log_pass "State OK" || log_fail "State wrong"
```

**Click and verify reaction:**
```bash
click_testid "my-btn"
sleep 0.3
TEXT=$(browser_eval "document.querySelector('[data-testid=\"my-btn\"]')?.textContent?.trim()")
[ "$TEXT" = "DONE" ] && log_pass "Button updated" || log_fail "Button text: $TEXT"
```

---

## Discoverability

All testable elements use `data-testid` attributes. To discover available testids:

```bash
# From agent-browser
agent-browser eval "
  Array.from(document.querySelectorAll('[data-testid]'))
    .map(el => el.dataset.testid)
    .join('\\n')
"

# From source code
grep -rn 'data-testid=' src/ --include='*.tsx'
```

All page sections use `data-section` for review overlay targeting:
```bash
agent-browser eval "
  Array.from(document.querySelectorAll('[data-section]'))
    .map(el => el.dataset.section)
    .join('\\n')
"
```

---

## agent-browser Quick Reference

```bash
agent-browser open "http://localhost:5173"   # Navigate to URL
agent-browser snapshot -c                     # Compact accessibility tree
agent-browser snapshot -i                     # Interactive elements with @refs
agent-browser click "[data-testid='btn']"     # Click by CSS selector
agent-browser click @e1                       # Click by snapshot ref
agent-browser type "[data-testid='input']" "text"  # Type text
agent-browser press ArrowRight                # Press keyboard key
agent-browser eval "JS expression"            # Evaluate JavaScript
agent-browser scrollintoview "selector"       # Scroll element into view
agent-browser get text "selector"             # Get element text
agent-browser get url                         # Get current URL
agent-browser is visible "selector"           # Check visibility
agent-browser close                           # Close browser
```

---

## Rules

1. **NO screenshots** — use `snapshot -c | grep` or `eval` for verification
2. **NO manual testing** — everything automated via `agent-browser` + `curl`
3. **ALWAYS `setup_cleanup`** — ensures browser closes even on failure
4. **ALWAYS `set +e`** — let all tests run even if some fail
5. **Use `data-testid`** — never match by class name or text content for element finding
6. **Use shared library** — source `tests/lib/test_utils.sh`
7. **Sleep after interactions** — 0.3-0.5s for clicks, 1-2s for page loads, 2-4s for animations

---

## Limitations

- Requires `agent-browser` CLI installed
- Requires dev server running (or will attempt to start one)
- Cannot test across multiple browser tabs simultaneously
- Network-dependent for DiceBear avatar loading (may timeout)

## See Also

- `/create-task` — Implementation skill that creates tests
- `tests/lib/test_utils.sh` — Shared test library source
- `tests/test_landing.sh` — Landing page test suite (reference implementation)
