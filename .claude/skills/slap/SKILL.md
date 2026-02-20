---
name: slap
description: Onboard an HTML design into the SLAP review overlay. Analyzes design, builds a tailored reviewer council, generates per-project persona files, and produces TypeScript review data.
argument-hint: <path-to-html> [--project name] [--version id] [--parent versionId]
---

## TL;DR

**What:** Onboard an HTML design into SLAP — analyze it, build a tailored reviewer council, generate persona briefs, produce review data.

**When:** You have an HTML file and want the full SLAP review overlay experience.

**Output:** Persona files (`projects/{Name}/personas/*.md`), annotated HTML, TypeScript review data, project registration.

---

# SLAP — Design Onboarding Skill

Takes an HTML design and produces everything needed for the SLAP review overlay: per-project persona files, annotated HTML, TypeScript review data, and project registration.

## Philosophy

- **Per-project personas** — Every reviewer gets a brief tailored to THIS design's industry, audience, and competitive landscape
- **User confirms the council** — Not all 23 reviewers every time. The user picks who reviews.
- **One command, full pipeline** — From raw HTML to working overlay in a single invocation
- **Editable briefs** — Persona files are markdown that users can tweak before running `/experts` or `/kaizen`

---

## Invocation

```bash
/slap projects/FlowBoard/haiku.html
/slap projects/FlowBoard/haiku.html --project FlowBoard --version haiku
/slap projects/FlowBoard/v2.html --version v2 --parent haiku
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<path>` | Yes | Path to the HTML file |
| `--project` | No | Project name (auto-detected from path if omitted) |
| `--version` | No | Version ID (auto-detected from filename if omitted) |
| `--parent` | No | Parent version ID for lineage tracking (v2+ only) |

---

## Workflow (5 Phases)

### Phase 1: Analyze Design

Read the HTML file and extract structural information.

**Steps:**

1. **Read the HTML** — Parse the full file
2. **Identify sections** — Find existing `data-section` attributes, or detect section boundaries (by `<section>`, `<div class="hero">`, heading patterns, etc.)
3. **Detect industry signals** — Keywords, competitor names, product type, audience clues
4. **Identify key elements** — Headlines, CTAs, pricing, testimonials, forms
5. **Build section map** — List all sections with their purposes

**Output to user:**

```
Analyzed: projects/FlowBoard/haiku.html

Detected: PM tool landing page
Sections: hero, features, pricing, testimonials, cta
Elements: 5 headlines, 3 CTAs, 3 pricing tiers, 4 testimonials
Industry: Project management / SaaS
Audience signals: "teams", "collaborate", "projects"
```

### Phase 2: Annotate HTML

Add SLAP attributes if not already present.

**Steps:**

1. **Add `data-section`** — To each top-level section that doesn't already have one
2. **Add `data-ref`** — To key interactive/reviewable elements:
   - `{section}-headline` for main heading per section
   - `{section}-cta` for CTAs
   - `tier-{name}` for pricing tiers
   - `feature-{name}` for feature cards
3. **Strip scripts** — Remove `<script>` tags (host controls behavior)
4. **Strip standalone nav/footer** — Remove `<body> > header` and `<body> > footer` (host controls chrome)
5. **Copy to public/** — Place at `public/projects/{Name}/{version}.html`

**Important:** Preserve the original file untouched. The annotated copy goes to `public/`.

### Phase 3: Build Review Council (User Confirmation)

Recommend a reviewer panel tailored to this design.

**Steps:**

1. **Always include all 5 experts** — Marketing, UX, Product, Technical, Design
2. **Recommend personas** based on design type:

| Design Signal | Recommend | Why |
|---------------|-----------|-----|
| Landing page / marketing | frank, sarah, carlos, dorothy | Trust, patience, ROI, comprehension |
| Accessibility indicators | elena, marcus, priya | Screen reader, color, motor |
| Mobile-heavy | sam, maya, kevin | One-thumb, distracted, impatient |
| Enterprise / B2B | carlos, mike, jasmine | Executive, presenting, support |
| Consumer / B2C | kevin, dorothy, tommy | Gen-Z, non-tech, confused |
| Luxury / premium | nora, yuki, diana | Premium feel, aesthetics, craft |
| Developer tool | raj, kevin, marcus | Power user, speed, accessibility |
| E-commerce | frank, sarah, sam, maya | Friction, trust, mobile, distracted |

3. **Present to user for confirmation:**

```
REVIEW COUNCIL for FlowBoard (haiku)
═══════════════════════════════════════

EXPERTS (5 — always included):
  Marketing, UX, Product, Technical, Design

PERSONAS — recommended 8 of 18:
  [x] frank     Zero Patience — PM tool fatigue
  [x] elena     Screen Reader — board navigation
  [x] carlos    CEO Evaluating — ROI first scroll
  [x] jasmine   Support Rep — will get tickets
  [x] sam       One Thumb — on-the-go PM
  [x] sarah     Trusts Nothing — "why not spreadsheet?"
  [x] dorothy   Minimal Tech — "what is sprint?"
  [x] mike      Screen Sharing — presenting to team

  Skipped:
  [ ] marcus    (no color-critical UI detected)
  [ ] kevin     (not target demographic)
  [ ] raj       (no CLI/power-user features)
  [ ] priya     (standard touch targets)
  [ ] tommy     (not relevant audience)
  [ ] diana     (craft secondary to function here)
  [ ] maya      (not primary context)
  [ ] yuki      (taste secondary to function)
  [ ] dex       (not counter-culture product)
  [ ] nora      (not premium positioning)

Adjust the panel? Add/remove names, or confirm to proceed.
```

4. **Wait for user confirmation** — Do NOT proceed without it

### Phase 4: Generate Persona Files

Create per-project persona briefs in `projects/{Name}/personas/`.

**Steps:**

1. **Create directory** — `projects/{Name}/personas/`
2. **For each confirmed expert**, generate a brief following the Expert Brief Format (below)
3. **For each confirmed persona**, generate a brief following the Kaizen Brief Format (below)
4. **Ground every brief in the actual HTML** — Reference specific headlines, copy, pricing, design choices

**How to generate good briefs:**

Think like a team of consultants (UX, UI, motion/animation, branding, marketing, content) analyzing this design:
- What industry is this? Who are the competitors?
- Who is the target audience? What's their pain point?
- What is this design trying to achieve? Where might it fail?
- For each reviewer, what would they specifically notice about THIS design?

---

#### Expert Brief Format

File: `projects/{Name}/personas/{expertId}.md`

```markdown
---
reviewer: {expertId}
project: {projectId}
version: {versionId}
type: expert
---

# {EXPERT NAME} — {Project Name} Review Brief

## Design Context

{2-4 sentences: What is this product? Target audience? Competitors? Price positioning?}

## Evaluation Focus

- {Specific thing to evaluate for THIS design}
- {Another specific evaluation point}
- {3-6 total bullets, grounded in the actual HTML content}

## Section Priorities

| Section | Priority | Why |
|---------|----------|-----|
| {section} | Critical/High/Medium/Low | {1-sentence reason specific to this design} |
{repeat for each section}

## Key Questions

1. {Question this expert would ask about THIS design}
2. {Another question}
{3-5 questions total}

## Red Flags to Watch

- {Design-type-specific red flag}
- {Another red flag}
{3-5 red flags}
```

---

#### Kaizen Brief Format

File: `projects/{Name}/personas/{personaId}.md`

```markdown
---
reviewer: {personaId}
project: {projectId}
version: {versionId}
type: persona
---

# {Persona Name} — {Project Name} Review Brief

## Who {Name} Is Here

{2-4 sentences placing this persona in the context of THIS design.
Not generic traits — specific to what they're looking at.
Example: "Frank is a team lead forced to adopt 3 PM tools in 2 years.
He's currently on Monday.com and hates it. His boss sent him this link."}

## What Sets Them Off (Design-Specific)

- {Specific trigger for THIS design}
- {Another trigger}
{3-5 triggers grounded in the actual content}

## What Would Calm Them Down

- {Specific positive signal for THIS design}
- {Another positive signal}
{3-5 calming signals}

## Section Reactions

| Section | Expected Reaction |
|---------|------------------|
| {section} | "{In-character gut reaction to THIS section's content}" |
{repeat for each section}

## Context Anchors

- Comparing this to: {What they'd compare it against}
- Time budget: {How long they'd spend}
- Trust level: {Where they start on the trust spectrum}
- Decision authority: {Can they buy/decide alone?}
```

---

### Phase 5: Generate Review Data

Generate TypeScript review data for every confirmed reviewer.

**Steps:**

1. **For each reviewer**, generate a `Review` object:
   - Read their persona brief (just created in Phase 4)
   - Read their voice guide from `/experts` or `/kaizen` SKILL.md
   - Embody their perspective to evaluate the actual HTML content
2. **Write TypeScript file** — `src/data/{projectId}Reviews.ts`
3. **Wire into reviews.ts** — Add import and spread

#### Review Generation Rules

**For experts:**
- Stay in discipline — Marketing talks selling, not code
- Reference the brief's Evaluation Focus and Key Questions
- Score through the expert's professional lens
- Mix severity — include what's working (green)
- Score honestly — 5 is average, 7 is good, 9+ is exceptional

**For personas:**
- Stay in character — Dorothy doesn't use UX jargon, Frank doesn't politely suggest
- Reference the brief's "What Sets Them Off" and "Section Reactions"
- Score through the persona's experiential lens
- Not every persona reviews every section — surface what they'd actually notice
- Use the persona's vocabulary and tone from the voice guide

#### Output TypeScript Format

```typescript
import type { Review } from './reviews';

export const {projectId}Reviews: Record<string, Review> = {
  '{projectId}:{versionId}:{reviewerId}': {
    score: 6.5,
    verdict: '2-4 sentences in the reviewer voice, assessing the design through their lens.',
    shortVerdict: 'One punchy line for the popover.',
    sections: {
      hero: [
        {
          text: 'Finding title — what was observed',
          light: 'yellow',
          comment: 'Detailed explanation in the reviewer voice.',
          ref: 'hero-headline',  // optional, matches data-ref in DOM
        },
      ],
      features: [
        // ... findings for this section
      ],
      // ... all sections the reviewer would evaluate
    },
  },
  // ... next reviewer
};
```

### Phase 6: Register Project

Update `src/data/projects.ts` if this is a new project.

**For new projects:**
```typescript
{
  id: '{projectId}',
  name: '{Project Name}',
  description: '{1-line description}',
  icon: '{emoji}',
  accent: '{hex color}',
  archetype: '{landing-page|dashboard|checkout|docs|...}',
  versions: [
    { id: '{versionId}', label: '{label}', hook: '{tagline}' },
  ],
  sections: ['{section1}', '{section2}', ...],
  htmlUrl: (v) => `/projects/{Name}/${v}.html`,
}
```

**For new versions on existing projects:**
```typescript
// Add to existing project's versions array:
{
  id: '{versionId}',
  label: '{label}',
  hook: '{tagline}',
  parentVersionId: '{parentId}',
  shapedBy: ['{reviewerId1}', '{reviewerId2}', ...],
}
```

### Phase 7: Handoff

After completing all phases:

1. **Show summary:**
```
SLAP COMPLETE — FlowBoard (haiku)
═══════════════════════════════════

Persona briefs: 23 files (5 expert + 18 persona)
  → projects/FlowBoard/personas/

Annotated HTML: public/projects/FlowBoard/haiku.html
  → 5 sections, 12 data-ref elements

Review data: src/data/flowboardReviews.ts
  → 23 reviewers, avg score 4.2
  → 55 red, 80 yellow, 43 green findings

Project registered: src/data/projects.ts
Review data wired: src/data/reviews.ts

Next: Run /slap-guard to validate parity and generate E2E tests.
```

2. **Refer to `/slap-guard`** — Always recommend running validation

---

## Version Lineage (v2+)

When onboarding an improved version:

```bash
/slap projects/FlowBoard/v2.html --version v2 --parent haiku
```

**What changes:**
- **Reuse persona files** — Context doesn't change between versions (same product, same audience). Skip Phase 4 unless user requests regeneration.
- **Generate NEW review data** — Scores should change as design improves
- **Add version with lineage** — `parentVersionId` and `shapedBy` on the version definition

**What to ask:**
```
FlowBoard already has persona briefs from the haiku version.
Reuse existing briefs for v2? [Y/n]

If the design's audience or positioning changed significantly,
say "regenerate" and I'll create fresh briefs.
```

---

## Output Files Summary

| File | Phase | Content |
|------|-------|---------|
| `projects/{Name}/personas/*.md` | 4 | Per-reviewer briefs (source of truth) |
| `public/projects/{Name}/{version}.html` | 2 | Annotated HTML served by Vite |
| `src/data/{projectId}Reviews.ts` | 5 | TypeScript review data |
| `src/data/projects.ts` | 6 | Updated project registry |
| `src/data/reviews.ts` | 5 | Updated import + spread |

---

## Relationship to Other Skills

| Skill | Relationship |
|-------|-------------|
| `/experts` | Reads persona briefs generated by `/slap`. Standalone conversation tool. |
| `/kaizen` | Reads persona briefs generated by `/slap`. Standalone conversation tool. |
| `/slap-guard` | Validates what `/slap` produced. Run after `/slap`. |
| `/team` | `/slap` embodies `/team` expertise internally when generating briefs. Not called as sub-skill. |
| `/create-task` | May be used to implement UI changes suggested by reviews. Separate workflow. |

---

## Limitations

- **Modifies files** — Creates persona files, TypeScript data, updates project registry
- **Requires HTML** — Cannot onboard a Figma file or screenshot (HTML only)
- **User confirmation required** — Will not proceed past Phase 3 without council confirmation
- **One version at a time** — Run separately for each version
- **Persona briefs are starting points** — Users should review and edit them before running `/experts` or `/kaizen` for deeper dives

---

## See Also

- `/slap-guard` — Run after `/slap` to validate parity and generate E2E tests
- `/experts` — Ad-hoc expert consultation (reads project persona briefs)
- `/kaizen` — Ad-hoc persona consultation (reads project persona briefs)
- `/team` — Strategic advice (not project-bound, no persona files)
- `TRUE_NORTH.md` — Project vision and data model
- `PIPELINE_FLOW.md` — Full pipeline flow documentation
