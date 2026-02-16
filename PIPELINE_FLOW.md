# SLAP! — Pipeline Flow

The complete skill invocation sequence for building a design project from blank canvas to fully reviewed, iterated design with generated expert and persona feedback.

---

## Overview

```
Phase A: SHAPE (Design Direction)
  A1. /team         → Experts as insiders shape design direction
  A2. /kaizen       → Personas as insiders surface user-level priorities
  A3. /ux-planner   → Plan interaction flows + define section map
  A4. /ui-planner   → Visual design with previews + design tokens
  A5. /ui-review    → Slop guard before implementation

Phase B: BUILD (Implementation)
  B1. /create-task   → Implement the design version with data-section attributes

Phase C: REVIEW (Generate Feedback)
  C1. /team          → Generate expert review findings (keyed to sections)
  C2. /kaizen        → Generate persona observations (keyed to sections)
  C3. /create-task   → Wire review data into reviews.ts

Phase D: ITERATE (Next Version)
  D1. /team          → Analyze findings, recommend direction for next version
  D2. Back to A3     → New version shaped by findings
```

---

## Phase A: Shape

### A1. `/team` — Expert Insiders

Summon experts to shape the design direction before building.

```
/team marketing, ux, design "We're building a {project description}.
Who is the target audience? What's the key value prop?
What aesthetic direction fits the brand?"
```

**Output used by:** A3 (ux-planner) for interaction decisions, A4 (ui-planner) for aesthetic direction.

### A2. `/kaizen` — Persona Insiders

Get user-level priorities from diverse personas.

```
/kaizen "We're planning a {project description}.
What would each persona want to see? What are their priorities?"
```

**Output used by:** A3 (ux-planner) for user flow priorities, choosing which personas become "shapedBy" insiders.

### A3. `/ux-planner` — Interaction Flows + Section Map

Plan the user journey and define the section map that flows through the entire pipeline.

```
/ux-planner "Plan the interaction flow for {project/version description}.

Context from experts:
- {Key points from A1}

Context from personas:
- {Key priorities from A2}

Define the page sections (these become data-section attributes)."
```

**Critical output:** The **Section Map** table:

| Section ID | Purpose | Key Interactions |
|------------|---------|-----------------|
| hero | First impression, value prop | Read headline, click CTA |
| features | Feature showcase | Browse cards, hover details |
| pricing | Pricing tiers | Compare tiers, click signup |
| testimonials | Social proof | Read quotes |
| faq | Common questions | Expand/collapse |
| signup | Final conversion | Fill form, submit |

These section IDs become `data-section` attributes and review finding keys.

### A4. `/ui-planner` — Visual Design + Previews

Establish visual identity through the ASCII gallery workflow.

```
/ui-planner "Apply visual design to the {project} interaction flow.

Section map from ux-planner:
{paste section map table}

Expert aesthetic direction:
- {Design expert recommendation from A1}

Generate previews with all sections marked."
```

**Workflow:** Step 1 (aesthetic) → Step 2 (layout) → Step 2.5 (motion) → Step 3 (HTML previews) → Step 4 (iterate) → Step 5 (styleguide).

**Critical output:** Preview HTML files with `data-section` attributes on all regions, design tokens in styleguide.

### A5. `/ui-review` — Slop Guard

Validate the design before implementation.

```
/ui-review {path to preview HTML}
```

**Pass criteria:** No blocking issues (score 0), all sections present, styleguide compliance.

- **PASS** → Proceed to Phase B
- **NEEDS ITERATION** → Fix issues, re-run `/ui-review`

---

## Phase B: Build

### B1. `/create-task` — Implementation

Build the design version with full section discoverability.

```
/create-task "Implement {version label} of {project name}.

Visual Design Spec:
{paste handoff from ui-planner}

Section Map:
{paste section map from ux-planner}

Requirements:
- All sections wrapped with data-section="{id}" AND data-testid="{id}-section"
- Design tokens from styleguide applied
- Motion tokens from ui-planner Step 2.5
- Expose window.slapState for review system
- Version metadata: shapedBy [{persona IDs from A2}]"
```

**Output:** Working design component with all `data-section` attributes, ready for review overlay.

---

## Phase C: Review (Generate Feedback)

### C1. `/team` — Generate Expert Findings

Generate structured review data from each expert.

```
/team marketing "Review the {version} of {project} as a critic.
Read the implementation at {component path}.

Generate your review in this exact format:
{
  score: <0-10>,
  verdict: '<2-3 sentence assessment>',
  shortVerdict: '<One-line for popover>',
  sections: {
    'hero': [
      { text: '<finding title>', light: 'green|yellow|red', comment: '<detail>' },
    ],
    'features': [...],
    'pricing': [...],
    // ... all sections from section map
  }
}"
```

Repeat for each expert: `marketing`, `ux`, `product`, `technical`, `design`.

**Rules:**
- Section keys MUST match `data-section` values from the design
- Each expert evaluates ALL sections, not just their domain
- `shortVerdict` appears in popover (Tier 2); `verdict` appears in panel (Tier 3)
- Finding `text` appears in severity chips; `comment` appears in expanded view
- Traffic lights: green (passing), yellow (warning), red (critical)

### C2. `/kaizen` — Generate Persona Observations

Generate persona feedback keyed to sections.

```
/kaizen "Review the {version} of {project} as critics.
Read the implementation at {component path}.

For each persona, generate observations in this format:
{
  score: <0-10>,
  verdict: '<In-character 2-3 sentence reaction>',
  shortVerdict: '<One-line in character>',
  sections: {
    'hero': [
      { text: '<observation>', light: 'green|yellow|red', comment: '<in-character detail>' },
    ],
    // ... all relevant sections
  }
}"
```

**Rules:**
- Stay in character — Dorothy doesn't use UX jargon, Kevin is impatient
- Not every persona reviews every section — surface what they'd actually notice
- Mix sentiment — include bright spots (green) alongside issues
- Reference specific elements from the actual design

### C3. `/create-task` — Wire Review Data

Add the generated review data to the project.

```
/create-task "Wire review data for {project}:{version}.

Add these reviews to src/data/reviews.ts:

Expert reviews:
{paste C1 output for each expert}

Persona reviews:
{paste C2 output for each persona}

Key format: '{projectId}:{versionId}:{reviewerId}'
Example: 'landing-page:brutalist:marketing'

Ensure all section keys match data-section values in the component."
```

---

## Phase D: Iterate

### D1. `/team` — Analyze & Recommend

Analyze the review findings to determine direction for the next version.

```
/team product, ux, design "Analyze the review results for {project}:{version}.

Aggregate score: {average}
Red findings: {count}
Yellow findings: {count}
Green findings: {count}

Top red findings:
- {finding 1}
- {finding 2}
- {finding 3}

Which findings should shape the next version?
Which personas should be 'shapedBy' insiders for v{next}?"
```

### D2. Back to A3

Start the next iteration with findings as input:

```
/ux-planner "Plan v{next} of {project}.

Version lineage: v{current} → v{next}
parentVersionId: '{current version id}'

Findings to address:
- {Red finding 1} — from {reviewer}
- {Red finding 2} — from {reviewer}
- {Yellow finding 3} — from {reviewer}

Shaped by: [{persona IDs recommended by D1}]

What interaction changes address these findings?"
```

Then continue through A4 → A5 → B1 → C1-C3 → D1 for each iteration.

---

## Timing Estimates

| Phase | First Cycle | Subsequent |
|-------|-------------|------------|
| A: Shape | ~25 min | ~15 min |
| B: Build | ~20 min | ~15 min |
| C: Review | ~15 min | ~10 min |
| D: Iterate | ~5 min | ~5 min |
| **Total** | **~65 min** | **~45 min** |

---

## Section Map Contract

The section map is the single most important data structure in the pipeline. It flows through every phase:

```
A3: /ux-planner → identifies sections (hero, features, pricing...)
    ↓
A4: /ui-planner → maps sections to visual regions, outputs Section Map
    ↓
B1: /create-task → implements data-section="" on each region
    ↓
C1+C2: /team + /kaizen → generate findings keyed to section IDs
    ↓
A5: /ui-review → validates coverage (every section reviewed, every review has a section)
    ↓
SectionHighlight → targets [data-section] for glow overlay
ReviewPanel → organizes findings by section
```

**Dual-attribute pattern on every section:**
```tsx
<section data-section="hero" data-testid="hero-section">
  <h1 data-testid="hero-headline">...</h1>
</section>
```

- `data-section` = review system (SectionHighlight finds it)
- `data-testid` = e2e testing (automated tests find it)
- Section IDs are flat: `"hero"` not `"page > hero > left"`

---

## State Exposure

The review system state is exposed on `window.slapState` for both testing and debugging:

```typescript
window.slapState = {
  project: string,
  version: string,
  reviewMode: 'review' | 'kaizen',
  activeReviewer: string | null,
  overlayTier: 0 | 1 | 2 | 3,
  highlightedSection: string | null,
  sections: string[],
};
```

---

## Quick Reference: What Each Skill Produces

| Skill | Input | Output | Key Data |
|-------|-------|--------|----------|
| `/team` (insider) | Project brief | Design direction | Aesthetic, audience, value prop |
| `/kaizen` (insider) | Project brief | User priorities | Persona preferences, shapedBy list |
| `/ux-planner` | Expert+persona context | Interaction flow | **Section Map**, UX requirements |
| `/ui-planner` | Section map, aesthetic | HTML previews | Design tokens, styleguide |
| `/ui-review` | Preview HTML | Pass/fail audit | Slop issues, compliance |
| `/create-task` | Design spec | Working component | `data-section` attrs, `window.slapState` |
| `/team` (critic) | Component code | Expert findings | `{ score, verdict, sections: { [id]: Finding[] } }` |
| `/kaizen` (critic) | Component code | Persona observations | `{ score, verdict, sections: { [id]: Finding[] } }` |
