---
name: review-guard
description: Validate review overlay integrity — checks section highlights match content, review text references correct sections, score progression is logical, and coverage is complete across all reviewers.
argument-hint: [projectId] [versionId]
allowed-tools: Bash, Read, Glob, Grep
---

# Review Guard

Interactive validation skill that checks the integrity of the SLAP! review system.

## What It Validates

### 1. Section Key Matches
Every `data-section` attribute in the design component must have a corresponding key in every reviewer's `review.sections` object. No orphan sections, no phantom keys.

```
Design component has: data-section="hero", "features", "pricing", "cta"
Review sections must have: hero, features, pricing, cta
```

### 2. Content References
When a finding says "this section mentions 'seamless integration'", the highlighted section should actually contain that text. Cross-references between finding text and DOM content.

**Check pattern:**
- Extract quoted text from finding `text` and `comment` fields
- Verify the referenced `data-section` element contains that text (or close match)
- Flag mismatches as content accuracy errors

### 3. Score Progression
For projects with multiple versions (v1 → v2), verify that:
- Average scores trend in the expected direction (v2 > v1 for improvement stories)
- Individual reviewer scores make sense (harsh critics on v1 should show meaningful improvement on v2)
- No reviewer gives a lower score on v2 for a finding that was explicitly addressed

### 4. Coverage Completeness
- Every expert (5) has reviews for every version
- Every persona (18) has reviews for every version
- Every review has findings for all 4 sections (hero, features, pricing, cta)
- No empty finding arrays

## Usage

```bash
/review-guard                    # Validate all projects
/review-guard example            # Validate specific project
/review-guard example v1         # Validate specific version
```

## Output Format

```
REVIEW GUARD — Example Landing Page
════════════════════════════════════

Section Keys
  [PASS] hero: 23/23 reviewers have findings
  [PASS] features: 23/23 reviewers have findings
  [PASS] pricing: 23/23 reviewers have findings
  [PASS] cta: 23/23 reviewers have findings

Content Accuracy
  [PASS] marketing:hero:0 — "Generic headline" found in hero section
  [WARN] elena:features:1 — "seamless integration" not found in features section
  [PASS] ...

Score Progression (v1 → v2)
  [PASS] Average: 5.8 → 7.3 (+1.5)
  [PASS] marketing: 6 → 8 (+2)
  [WARN] kevin: 7 → 7 (no change — expected improvement)
  [PASS] frank: 2 → 6 (+4)

Coverage
  [PASS] 23/23 reviewers × 2 versions = 46 entries
  [PASS] All reviews have 4 sections each
  [PASS] No empty finding arrays

Summary: 42 PASS, 2 WARN, 0 FAIL
```

## Implementation Notes

This skill uses `agent-browser` to:
1. Open the design page and extract `data-section` content
2. Compare against review data from `src/data/exampleReviews.ts`
3. Cross-reference finding text with actual DOM content

For score and coverage checks, it reads the review data files directly.

## Limitations

- **Read-only** — Reports issues but does not fix them
- **Requires running server** — Uses agent-browser for DOM content checks
- **Content matching is fuzzy** — Short phrases may match coincidentally
