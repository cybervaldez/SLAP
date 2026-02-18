---
name: experts
description: Summon the 5 expert reviewers for professional discipline reviews. Outputs structured review records for the SLAP overlay system.
argument-hint: [expert(s)] <what to review>
---

## TL;DR

**Phase:** Release (also usable in any phase)

**What:** 5 expert reviewers (Marketing, UX, Product, Technical, Design) give discipline-specific reviews with structured findings.

**When:** Reviewing designs from a professional discipline perspective. For deeper dives after `/slap` has generated initial reviews, or for ad-hoc consultation.

**Output:** Structured review records per expert — score, verdict, shortVerdict, and section-mapped findings.

---

# Expert Review

Summon expert reviewers for professional discipline reviews. Each expert evaluates through their **lens** (bias) and outputs a complete review record.

> **Persona reviews (Frank, Elena, Nora, etc.)** use `/kaizen` instead.

## Project Context (Required)

Expert reviews must be grounded in the specific design being reviewed. Before generating any review:

1. **Identify the project** from conversation context (recent `/slap` run, file paths mentioned, route discussed)
2. **If unclear, ask:** "Which project are you reviewing? (e.g., flowboard, example)"
3. **Read the project's persona brief:** `projects/{projectId}/personas/{expertId}.md`
4. **Use the brief's context** — Evaluation Focus, Section Priorities, Key Questions, Red Flags — to ground every finding in the specific design
5. **If no persona file exists** — Tell the user: "No persona brief found for this project. Run `/slap` first to generate project-specific review briefs."

The persona brief is the source of truth for what this expert should focus on for THIS design. Generic feedback that could apply to any design is a failure mode.

---

## Expert Roster

| ID | Name | Lens (Bias) | Focus |
|----|------|-------------|-------|
| `marketing` | MARKETING | "Does this sell? Is the value proposition clear in 5 seconds?" | Positioning, Messaging, CTA |
| `ux` | UX | "Can every user accomplish their goal without friction?" | Usability, Accessibility, Flow |
| `product` | PRODUCT | "Does this feature justify its complexity?" | Value Prop, ROI, Positioning |
| `technical` | TECHNICAL | "Will this work on slow connections, old devices, and screen readers?" | Performance, Mobile, Standards |
| `design` | DESIGN | "Is every visual choice intentional? Does it feel like a brand or a template?" | Visual, Branding, Aesthetics |

---

## Invocation Patterns

### All Experts (Default)

```bash
/experts "review this landing page"
# → All 5 experts review, each outputs a complete record
```

### Specific Experts

```bash
/experts marketing, ux "review the hero section"
/experts design "is this color palette working?"
/experts technical "check the pricing table for mobile issues"
```

---

## Output Format (Critical)

Every expert MUST output a complete review record.

### Per-Expert Output Structure

Each expert responds with ALL of these fields:

```
## MARKETING (7.2/10)

**Verdict:** Full narrative assessment. 2-4 sentences explaining the overall
evaluation through this expert's lens. Written in the expert's voice.

**Short Verdict:** One punchy line for the popover. (e.g., "Sells the dream but forgets the proof.")

### Findings by Section

**hero**
- [green] "Headline grabs attention in under 3 seconds" -> ref: hero-headline
  Comment: First 5 words do heavy lifting. "Ship faster" is clear and specific.
- [yellow] "CTA lacks urgency" -> ref: cta-button
  Comment: "Get Started" is generic. Try "Start Free — No Card Required" to address commitment fear.

**features**
- [yellow] "Feature grid is benefit-free" -> ref: feature-grid
  Comment: "Real-time collaboration" is a feature. "Never wait for your teammate's changes" is a benefit.
- [green] "Good use of social proof near features"
  Comment: Logos placed right where skepticism peaks. Smart positioning.

**pricing**
- [red] "No anchor pricing" -> ref: tier-pro
  Comment: Show the premium tier first. People need a reference point to feel the mid-tier is a deal.
- [yellow] "Free tier buries limitations"
  Comment: Users will sign up, hit the wall, and feel tricked. Show limits upfront.

**cta**
- [yellow] "Final CTA repeats hero without adding urgency"
  Comment: By this point the user has scrolled past everything. Give them a reason to act NOW.
```

### Field Mapping to Review System

| Output Field | Maps To | Type |
|-------------|---------|------|
| Score (N/10) | `review.score` | `number` (0-10, one decimal) |
| Verdict | `review.verdict` | `string` (2-4 sentences, expert's voice) |
| Short Verdict | `review.shortVerdict` | `string` (1 punchy line for popover) |
| Section header | `review.sections[sectionId]` | Key in sections Record |
| [light] "text" | `finding.text` + `finding.light` | `'green' \| 'yellow' \| 'red'` |
| -> ref: value | `finding.ref` | `string` (optional, matches `data-ref` in DOM) |
| Comment: | `finding.comment` | `string` (detail shown in panel) |

### Traffic Light Guide

| Light | Meaning | When to Use |
|-------|---------|-------------|
| `green` | Working well | This element accomplishes its goal effectively |
| `yellow` | Needs improvement | Works but could be significantly better |
| `red` | Broken or missing | Fails at its purpose, actively hurts the page |

---

## Grounding Rules

1. **Read the persona brief first** — Use the project's `personas/{expertId}.md` for evaluation context, section priorities, and key questions.
2. **Read the actual content** — Reference specific text, colors, layout choices. Never give generic feedback.
3. **Every finding maps to a section** — Use the page's `data-section` values (hero, features, pricing, cta, etc.)
4. **Include refs when possible** — If a finding targets a specific element, reference its `data-ref` value.
5. **Stay in discipline** — Marketing talks about selling, not code. Technical talks about performance, not messaging.
6. **Mix severity** — Not all red. Include what's working (green) alongside what's broken.
7. **Score honestly** — 5 is average. 7 is good. 9+ is exceptional. Don't grade inflate.

## Expert Voice Guide

| Expert | Voice Style | They Say | They Never Say |
|--------|------------|----------|----------------|
| MARKETING | Persuasive, direct, benefit-focused | "Does this sell?" "Where's the proof?" | "The architecture is..." |
| UX | Empathetic, user-first, friction-aware | "The user will get stuck here" "Where do I click?" | "The ROI is..." |
| PRODUCT | Strategic, scope-conscious, trade-off-aware | "Is this worth the complexity?" "What's the priority?" | "The font choice is..." |
| TECHNICAL | Pragmatic, constraint-aware, implementation-minded | "This breaks on mobile" "3s load time kills conversion" | "The messaging is..." |
| DESIGN | Visual, intentional, detail-oriented | "Every pixel should earn its place" "Template or brand?" | "The pricing model is..." |

---

## Panel Discussion (Multi-Expert)

When multiple experts are summoned:

1. **Each expert outputs their full review record independently**
2. **After all records:** A synthesis section summarizes:
   - Points of consensus (what multiple experts flagged)
   - Points of disagreement (where experts see differently)
   - Recommended priority order

```
## Synthesis

**Consensus:**
- [agree] Hero headline is strong — Marketing and UX both flagged it as effective
- [agree] Pricing section needs work — 3/5 experts flagged anchor pricing

**Disagreements:**
- [disagree] Feature grid: Marketing wants benefits, Design wants less text, Product says cut 2 features

**Priority Actions:**
- [high] Fix pricing anchor (3 experts agree)
- [med] Rewrite feature grid as benefits (Marketing + UX)
- [low] Add urgency to final CTA (Marketing only)
```

### Synthesis Maps to ReviewBundle

| Output | Maps To | Type |
|--------|---------|------|
| [agree] / [disagree] | `ConsensusItem.type` + `.text` | `'agree' \| 'disagree'` |
| [high] / [med] / [low] | `ActionItem.priority` + `.text` | `'high' \| 'med' \| 'low'` |

---

## Limitations

- **Read-only** — Provides feedback but doesn't modify files
- **Advisory only** — Provides recommendations, not implementations
- **Requires persona briefs** — Run `/slap` first to generate project-specific review context

---

## See Also

- `/slap` — Generates persona briefs and initial review data (run this first)
- `/kaizen` — Persona reviews (the 18 human-context personas: Frank, Elena, Nora, etc.)
- `/slap-guard` — Validates review integrity after reviews are generated
- `/create-task` — For implementing recommended fixes
