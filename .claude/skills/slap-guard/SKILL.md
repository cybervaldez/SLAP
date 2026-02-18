---
name: slap-guard
description: Validate SLAP project integrity — checks persona file coverage, section/ref parity, review data quality, and generates E2E tests.
argument-hint: [projectId] [versionId]
---

## TL;DR

**What:** Validate that a SLAP project is correctly wired — persona files exist, sections match, refs resolve, scores are sane, and tests cover it.

**When:** After running `/slap` to onboard a design, or after manually editing review data.

**Output:** Validation report (pass/warn/fail per check) + generated E2E test file.

---

# SLAP Guard — Project Validation

Ensures that a SLAP project's persona files, HTML annotations, and review data are all in sync. Catches parity errors before users see broken overlays.

> Run this after `/slap` completes, or anytime you suspect data drift.

---

## Usage

```bash
/slap-guard                        # Validate all projects
/slap-guard flowboard              # Validate specific project
/slap-guard flowboard haiku        # Validate specific version
```

---

## What It Validates

### 1. Persona File Coverage

Every reviewer that has review data for this project must also have a persona brief.

**Check:**
- Read `src/data/{projectId}Reviews.ts` to find all reviewer IDs
- For each reviewer ID, check `projects/{Name}/personas/{reviewerId}.md` exists
- Verify frontmatter fields: `reviewer`, `project`, `version`, `type`

```
Persona Files
  [PASS] marketing.md exists, frontmatter valid
  [PASS] frank.md exists, frontmatter valid
  [FAIL] elena.md missing — review data exists but no persona brief
  [WARN] carlos.md version mismatch — brief says "v1", reviewing "haiku"
```

### 2. Section Parity

Every `data-section` in the HTML must have matching findings in reviews, and vice versa.

**Check:**
- Parse annotated HTML at `public/projects/{Name}/{version}.html`
- Extract all `data-section` attribute values
- For each reviewer's review data, verify their `sections` keys match

```
Section Parity
  HTML sections: hero, features, pricing, testimonials, cta
  [PASS] marketing: hero, features, pricing, testimonials, cta — all match
  [WARN] frank: hero, features, pricing, cta — missing testimonials
  [FAIL] review has section "footer" but HTML has no data-section="footer"
```

### 3. Ref Parity

Every `ref` value in findings should correspond to a `data-ref` in the HTML.

**Check:**
- Parse HTML for all `data-ref` attribute values
- Scan all findings for `ref` fields
- Flag refs that don't match any `data-ref` in the DOM

```
Ref Parity
  HTML refs: hero-headline, hero-cta, features-headline, tier-starter, tier-professional, tier-enterprise, cta-headline, cta-button
  [PASS] marketing:hero:0 ref "hero-headline" exists in HTML
  [FAIL] frank:pricing:1 ref "pricing-toggle" not found in HTML
  [PASS] 24/25 refs valid
```

### 4. Score Sanity

Scores should be realistic and well-distributed.

**Check:**
- All scores between 0-10 with at most one decimal
- Not all the same score (detect lazy generation)
- Distribution makes sense: experts tend toward 5-7, personas vary widely
- For v2+: compare with parent version scores

```
Score Sanity
  [PASS] All scores in valid range (0-10)
  [PASS] Score distribution: min=3.5, max=8.0, avg=5.8, stddev=1.4
  [WARN] 3 reviewers gave exactly 5.0 — may indicate lazy scoring
  [PASS] v2 avg (7.2) > v1 avg (5.8) — improvement trend
```

### 5. Traffic Light Distribution

Reviews should have a mix of green, yellow, and red findings.

**Check:**
- Count findings by severity per reviewer
- Flag reviewers with all-yellow (no conviction)
- Flag reviewers with all-red (unrealistically harsh)
- Flag reviewers with no green (nothing works?)

```
Traffic Light Distribution
  [PASS] Overall: 18 green, 22 yellow, 8 red
  [WARN] marketing: 0 green, 4 yellow, 2 red — nothing positive?
  [PASS] elena: 2 green, 3 yellow, 3 red — good mix
  [PASS] frank: 1 green, 1 yellow, 3 red — consistent with persona
```

### 6. Reviewer Coverage

All confirmed reviewers should have review data.

**Check:**
- Read persona files in `projects/{Name}/personas/` to get confirmed reviewer list
- For each reviewer, verify review data exists in `{projectId}Reviews.ts`
- Flag missing reviews

```
Reviewer Coverage
  Persona briefs: 13 files (5 expert + 8 persona)
  Review entries: 13 entries
  [PASS] All 13 reviewers have review data
  [PASS] No orphan reviews (every review has a persona brief)
```

### 7. Content Accuracy (Optional — Requires Server)

If a dev server is running, verify that finding text references actual content.

**Check:**
- Open the design page with agent-browser
- For each finding with a `ref`, locate the `data-ref` element
- Verify the finding text relates to the actual element content
- Flag obvious mismatches

```
Content Accuracy (requires running server)
  [PASS] marketing:hero:0 — "Generic headline" matches hero-headline content
  [WARN] elena:features:1 — ref "feature-grid" found but content doesn't mention "seamless"
  [SKIP] Server not running — skipping content accuracy checks
```

---

## E2E Test Generation

After validation, generate a test file at `tests/test_{projectId}.sh`.

### Generated Test Cases

| # | Test | What It Verifies |
|---|------|-----------------|
| 1 | Route loads | `#{projectId}/{versionId}` renders without error |
| 2 | HTML content renders | `data-testid="design-html"` present, `contentReady` true |
| 3 | Sections present | All `data-section` values from HTML are in the DOM |
| 4 | CSS scoping | Design styles don't leak into SLAP UI |
| 5 | Reviewer bubbles | All reviewers with data appear on bubble rail |
| 6 | Popover works | Click reviewer bubble -> popover shows score + verdict |
| 7 | Section glow | Hover finding chip -> corresponding section gets `.glowing` class |
| 8 | Theme toggle | Toggle theme -> `data-theme` syncs to injected content |
| 9 | Tour starts | Start tour -> guided mode activates, first section spotlighted |
| 10 | Tour walks sections | Step through all sections in order |
| 11 | Ref highlights | Finding with ref -> `data-ref` element gets highlight class |
| 12 | slapState correct | `window.slapState` has right project, version, sections |
| 13 | Navigation | Switch to another project and back -> everything still works |

### Test File Template

The generated test follows the standard `/create-task` test template:
- Sources `tests/lib/test_utils.sh`
- Uses `agent-browser` for all UI verification
- Uses `set +e` for non-fatal failures
- Uses `print_summary` for results
- Standard `log_pass`/`log_fail`/`log_skip` output

---

## Output Format

```
SLAP GUARD — FlowBoard (haiku)
═══════════════════════════════════

1. Persona Files
  [PASS] 13/13 persona briefs found
  [PASS] All frontmatter valid

2. Section Parity
  [PASS] 5 HTML sections, all covered by all reviewers

3. Ref Parity
  [PASS] 24/25 refs valid
  [WARN] frank:pricing:1 ref "pricing-toggle" not in HTML

4. Score Sanity
  [PASS] Range: 3.5 — 8.0, avg 5.8
  [PASS] Distribution looks realistic

5. Traffic Light Distribution
  [PASS] 18 green, 22 yellow, 8 red
  [WARN] marketing has 0 green findings

6. Reviewer Coverage
  [PASS] 13/13 reviewers have review data

7. Content Accuracy
  [SKIP] Server not running

═══════════════════════════════════
Summary: 11 PASS, 2 WARN, 0 FAIL

E2E test generated: tests/test_flowboard.sh
Run: chmod +x tests/test_flowboard.sh && ./tests/test_flowboard.sh
```

---

## Suggested Fixes

When issues are found, provide actionable fixes:

| Issue | Suggested Fix |
|-------|--------------|
| Missing persona brief | Run `/slap` to regenerate, or create `projects/{Name}/personas/{id}.md` manually |
| Section not in reviews | Add findings for the missing section in `{projectId}Reviews.ts` |
| Orphan section in reviews | Remove the section key, or add `data-section` to the HTML |
| Ref not in HTML | Remove the `ref` field from the finding, or add `data-ref` to the HTML element |
| All-same scores | Re-run `/slap` or manually adjust scores to reflect actual quality differences |
| No green findings | Add at least 1 positive finding per reviewer — everything has bright spots |
| Version mismatch in brief | Update the `version` field in the persona file frontmatter |

---

## Limitations

- **Read-only by default** — Reports issues but does not auto-fix them
- **Content accuracy requires server** — Skips DOM content checks if no dev server is running
- **Does not validate voice quality** — Cannot judge if a review "sounds like Frank" (that's human judgment)
- **Parity only** — Validates structure, not whether reviews are insightful or accurate

---

## See Also

- `/slap` — Generates the persona files and review data that this skill validates
- `/review-guard` — Older validation skill focused on the example project (predecessor)
- `/experts` — Ad-hoc expert consultation
- `/kaizen` — Ad-hoc persona consultation
- `/create-task` — For fixing issues found by this guard
