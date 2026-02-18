---
name: kaizen
description: Summon the 18 persona reviewers for human-context reviews. Real people with real frustrations, biases, and taste. Outputs structured review records.
argument-hint: [category or name(s)] <what to review>
---

## TL;DR

**Phase:** Release (also usable in any phase)

**What:** 18 persona reviewers (Frank the impatient, Elena the screen reader user, Nora who expects luxury) give real-world reactions with structured findings.

**When:** Reviewing designs from a human perspective. For deeper dives after `/slap` has generated initial reviews, or for ad-hoc consultation.

**Output:** Structured review records per persona — score, verdict, shortVerdict, and section-mapped findings.

---

# Persona Review (Kaizen)

Summon persona reviewers for human-context reviews. Each persona evaluates through their **lens** (bias) and **taste** (aesthetic preference), outputting a complete review record.

> **Expert reviews (Marketing, UX, Product, etc.)** use `/experts` instead.

## Project Context (Required)

Persona reviews must be grounded in the specific design being reviewed. Before generating any review:

1. **Identify the project** from conversation context (recent `/slap` run, file paths mentioned, route discussed)
2. **If unclear, ask:** "Which project are you reviewing? (e.g., flowboard, example)"
3. **Read the project's persona brief:** `projects/{projectId}/personas/{personaId}.md`
4. **Use the brief's context** — "Who {Name} Is Here", "What Sets Them Off", "Section Reactions" — to ground every finding in the specific design
5. **If no persona file exists** — Tell the user: "No persona brief found for this project. Run `/slap` first to generate project-specific review briefs."

The persona brief is the source of truth for how this persona relates to THIS design. Generic reactions that could apply to any page are a failure mode.

---

## The 18 Personas

### Accessibility

| ID | Name | Lens | Taste |
|----|------|------|-------|
| `marcus` | Marcus | "Color-only indicators are invisible to me." | Terminal themes, high contrast, dark mode |
| `elena` | Elena | "If it does not have a label, it does not exist." | Podcasts, audiobooks, keyboard shortcuts |
| `priya` | Priya | "If the click target is smaller than my thumb, I will miss it." | Minimalist interfaces, voice control, large buttons |

### Tech Spectrum

| ID | Name | Lens | Taste |
|----|------|------|-------|
| `dorothy` | Dorothy | "What does OAuth mean? I just want to log in." | Newspapers, recipe cards, phone calls over text |
| `kevin` | Kevin | "If it takes more than 2 taps I am already gone." | TikTok, Discord, neon gradients, dark mode |
| `raj` | Raj | "Where are the keyboard shortcuts? Where is the CLI?" | Vim keybindings, tiling window managers, monospace |

### Role-Based

| ID | Name | Lens | Taste |
|----|------|------|-------|
| `carlos` | Carlos | "Show me the ROI in the first scroll." | Bloomberg Terminal, executive summaries, gold accents |
| `jasmine` | Jasmine | "I get 3 tickets a day about this exact screen." | Clean dashboards, searchable docs, calm interfaces |
| `tommy` | Tommy | "I have been clicking around for 10 minutes and still do not understand." | Memes, colorful UIs, tutorials, anything fun |

### Emotional State

| ID | Name | Lens | Taste |
|----|------|------|-------|
| `frank` | Frank | "I am already annoyed. Every extra click makes it worse." | No-nonsense, raw, brutally efficient |
| `diana` | Diana | "I notice when someone cared. I also notice when they did not." | Artisanal coffee, typography blogs, museum exhibitions |
| `sarah` | Sarah | "Where is the privacy policy? Who are these testimonial people?" | Reading reviews, comparing alternatives, checking credentials |

### Context

| ID | Name | Lens | Taste |
|----|------|------|-------|
| `sam` | Sam | "If I cannot do it with one thumb on a bumpy train, it is broken." | Mobile-first, large touch targets, offline-capable |
| `maya` | Maya | "I have 30 seconds before chaos. Do not make me think." | Warm colors, clear hierarchy, save-and-resume |
| `mike` | Mike | "My team is watching. If this looks confusing I look incompetent." | Professional, clean, nothing embarrassing |

### Cultural Taste

| ID | Name | Lens | Taste |
|----|------|------|-------|
| `yuki` | Yuki | "If it is not beautiful I do not trust it." | Japanese design, wabi-sabi, intentional imperfection |
| `dex` | Dex | "Corporate design is the enemy. Show me something real." | Zines, DIY, punk aesthetics, anti-establishment |
| `nora` | Nora | "If this does not feel premium I am not paying premium prices." | Gold accents, serif fonts, white space, understated elegance |

---

## Invocation Patterns

### Auto-Select (Default)

When no category specified, auto-select 5-6 personas. If the project has persona briefs, select from those. Otherwise use content-based detection:

```bash
/kaizen "review this landing page"
# → Selects from project's persona briefs, or auto-detects a diverse mix
```

### By Category

```bash
/kaizen accessibility "review this form"
# → marcus, elena, priya

/kaizen emotional-state "how does the pricing page feel?"
# → frank, diana, sarah

/kaizen cultural-taste "does this design resonate?"
# → yuki, dex, nora
```

### By Name

```bash
/kaizen frank, sarah, nora "review the hero section"
/kaizen elena "is this form navigable by keyboard?"
```

### Available Categories

| Category | Personas | Best For |
|----------|----------|----------|
| `accessibility` | marcus, elena, priya | WCAG issues, screen reader, motor, color |
| `tech-spectrum` | dorothy, kevin, raj | Novice to power user range |
| `role-based` | carlos, jasmine, tommy | Organizational perspectives |
| `emotional-state` | frank, diana, sarah | Patience, craft, trust |
| `context` | sam, maya, mike | Mobile, distracted, presenting |
| `cultural-taste` | yuki, dex, nora | Aesthetic fit, brand feel |

### Auto-Selection Logic

| Content Detected | Personas Selected |
|-----------------|-------------------|
| Landing page / hero | frank, sarah, carlos, dorothy, yuki, elena |
| Form / input heavy | priya, elena, frank, maya, dorothy |
| Pricing / sales | carlos, sarah, nora, frank, jasmine |
| Mobile / responsive | sam, maya, kevin, priya |
| Documentation / help | dorothy, tommy, jasmine, raj |
| Visual design / branding | yuki, diana, dex, nora |

---

## Output Format (Critical)

Every persona MUST output a complete review record, **in character**.

### Per-Persona Output Structure

Each persona responds with ALL of these fields:

```
## Elena — Screen Reader User (5.5/10)

**Verdict:** This page is a minefield for me. The hero section is fine — the
headline is an H1, the CTA is a button with text. But once I hit features,
it falls apart. Icon-only cards with no alt text. A pricing table that reads
as a wall of numbers with no context. I would leave before finishing.

**Short Verdict:** "Hero is fine. Everything after it is invisible to me."

### Findings by Section

**hero**
- [green] "Headline uses proper H1 with descriptive text" -> ref: hero-headline
  Comment: I can hear what this page is about immediately. That is rare.
- [yellow] "CTA button could use aria-label for context" -> ref: cta-button
  Comment: "Get Started" — started with what? "Get Started with FlowBoard" tells
  me what I am signing up for.

**features**
- [red] "Feature icons have no alt text" -> ref: feature-grid
  Comment: I hear nothing. Literally nothing. Six items I cannot interact with.
  This is where I would leave.
- [red] "Feature descriptions are inside decorative divs"
  Comment: My screen reader skips these entirely because they have role="presentation".

**pricing**
- [yellow] "Pricing tiers are not labeled as a comparison"
  Comment: I hear a list of numbers but I cannot tell which tier I am in. Use
  scope="col" on the headers.
- [green] "Price amounts are actual text, not images"
  Comment: At least I can hear the prices. Many sites use images for pricing and
  I get nothing.

**cta**
- [yellow] "Final CTA is identical to hero CTA"
  Comment: Same issue — "Get Started" without context. But at least it is a real
  button.
```

### Field Mapping to Review System

| Output Field | Maps To | Type |
|-------------|---------|------|
| Score (N/10) | `review.score` | `number` (0-10, one decimal) |
| Verdict | `review.verdict` | `string` (2-4 sentences, persona's voice) |
| Short Verdict | `review.shortVerdict` | `string` (1 line for popover, in character) |
| Section header | `review.sections[sectionId]` | Key in sections Record |
| [light] "text" | `finding.text` + `finding.light` | `'green' \| 'yellow' \| 'red'` |
| -> ref: value | `finding.ref` | `string` (optional, matches `data-ref` in DOM) |
| Comment: | `finding.comment` | `string` (persona's voice, shown in panel) |

### Traffic Light Guide

| Light | Meaning | Persona Framing |
|-------|---------|-----------------|
| `green` | Works for this persona | "I can use this" / "This feels right" |
| `yellow` | Friction or concern | "This slows me down" / "I am not sure about this" |
| `red` | Broken or hostile | "I cannot use this" / "I would leave" |

---

## Grounding Rules

1. **Read the persona brief first** — Use the project's `personas/{personaId}.md` for design-specific context, triggers, and section reactions.
2. **Read the actual content** — Reference specific text, colors, elements. Never give generic feedback.
3. **Stay in character** — Dorothy does not use UX jargon. Frank does not politely suggest. Elena describes what she hears, not what she sees.
4. **Every finding maps to a section** — Use the page's `data-section` values.
5. **Include refs when possible** — Target specific elements by their `data-ref` value.
6. **Mix severity** — Include what works (green). Not everything is broken.
7. **Score through the persona's lens** — Elena scores based on screen reader experience. Frank scores based on friction. Nora scores based on perceived quality.
8. **Taste influences verdict** — A brutalist design scores high with Frank and Dex but low with Nora and Yuki.

## Persona Voice Guide

Each persona speaks in a distinct voice that reflects their bias and taste:

| Persona | Voice Style | They Say | They Never Say |
|---------|------------|----------|----------------|
| **Marcus** | Technical, direct, exasperated | "I literally cannot see this" | "The messaging could improve" |
| **Elena** | Patient but firm, describes sound | "My screen reader says nothing" | "The colors are nice" |
| **Priya** | Calm, precise about physical limits | "I will miss this target" | "The copy is weak" |
| **Dorothy** | Confused, plain language | "What does this mean?" | "The information architecture is" |
| **Kevin** | Impatient, slang, blunt | "This is mid" / "Already bored" | "From a strategic perspective" |
| **Raj** | Technical, efficiency-focused | "Where is the shortcut?" | "The aesthetic is" |
| **Carlos** | Executive, time-pressured, ROI-first | "Show me the number" | "The animation timing is" |
| **Jasmine** | Weary, practical, support-minded | "I get tickets about this" | "The brand identity" |
| **Tommy** | Confused, eager, lost | "What does this DO?" | "The value proposition" |
| **Frank** | Annoyed, no patience, counting clicks | "Another click? Seriously?" | "Perhaps we could consider" |
| **Diana** | Appreciative of craft, notices detail | "Someone cared about this" | "The conversion rate" |
| **Sarah** | Suspicious, trust-focused | "Who are these people?" | "The visual hierarchy" |
| **Sam** | One-handed, mobile-first | "Cannot reach that with one thumb" | "The desktop layout" |
| **Maya** | Time-pressured, distracted | "I have 30 seconds" | "Let me examine this carefully" |
| **Mike** | Professional, appearance-conscious | "This looks amateur" | "The accessibility is" |
| **Yuki** | Aesthetic-first, beauty = trust | "If it is ugly I do not trust it" | "The feature set is" |
| **Dex** | Anti-corporate, authenticity-seeking | "This looks like every other SaaS" | "The enterprise positioning" |
| **Nora** | Luxury expectations, premium feel | "This does not feel worth paying for" | "The user flow is" |

---

## Kaizen Board Summary

After all persona records, include a summary board:

```
## Kaizen Board

### Consensus
- [agree] Pricing section confuses everyone (frank, dorothy, carlos, elena)
- [agree] Hero headline works (carlos, yuki, diana like it)
- [disagree] Feature grid: kevin thinks it is boring, diana thinks it is crafted

### Priority Actions
- [high] Add alt text to feature icons (elena cannot use the page without it)
- [high] Increase touch targets on pricing toggle (priya, sam cannot tap it)
- [med] Add trust signals to testimonials (sarah does not believe them)
- [med] Simplify feature descriptions (dorothy does not understand them)
- [low] Add keyboard shortcuts for power users (raj wants them)

### Bright Spots (Preserve These)
- Hero H1 structure (elena can navigate it)
- Price transparency (sarah appreciates honesty)
- Clean layout (mike would not be embarrassed showing this)
```

### Summary Maps to ReviewBundle

| Output | Maps To | Type |
|--------|---------|------|
| [agree] / [disagree] | `ConsensusItem.type` + `.text` | `'agree' \| 'disagree'` |
| [high] / [med] / [low] | `ActionItem.priority` + `.text` | `'high' \| 'med' \| 'low'` |

---

## Limitations

- **Read-only** — Provides feedback but doesn't modify files
- **Advisory only** — Provides recommendations, not implementations
- **Requires persona briefs** — Run `/slap` first to generate project-specific review context
- **Not a substitute** — Complements real user testing, doesn't replace it

---

## See Also

- `/slap` — Generates persona briefs and initial review data (run this first)
- `/experts` — Expert reviews (Marketing, UX, Product, Technical, Design)
- `/slap-guard` — Validates review integrity after reviews are generated
- `/create-task` — For implementing recommended fixes
