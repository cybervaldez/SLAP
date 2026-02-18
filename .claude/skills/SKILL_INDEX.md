# Skill Index — SLAP!

Quick reference for all playbook skills.

## At a Glance

| Skill | Phase | One-Liner | When to Use |
|-------|-------|-----------|-------------|
| `/slap` | Onboarding | Onboard HTML design with tailored reviewer council | You have HTML and want the full SLAP overlay |
| `/slap-guard` | Validation | Validate persona/section/review parity + generate E2E tests | After `/slap`, or after editing review data |
| `/experts` | Review | Ad-hoc expert consultation grounded in project personas | Deeper dive on specific expert feedback |
| `/kaizen` | Review | Ad-hoc persona consultation grounded in project personas | Deeper dive on specific persona feedback |
| `/team` | Any | Expert personas for strategic advice | Strategic decisions (not project-bound) |
| `/ux-planner` | Development | Conversational UX advisor with options and tradeoffs | Planning new features |
| `/ui-planner` | Development | Visual design with ASCII galleries and previews | Establishing visual identity |
| `/create-task` | Production | Implementation with built-in E2E tests | Building features |
| `/ui-review` | Release | AI slop detector and styleguide compliance | After `/ui-planner`, before implementation |
| `/review-guard` | Validation | Review overlay integrity checks (legacy) | Checking example project reviews |
| `/e2e` | Verification | Browser E2E tests via agent-browser | After building, before commits |

---

## The SLAP Loop (Primary Workflow)

```
1. Generate HTML design
        |
        v
2. /slap mydesign.html
   |-- Analyzes design, recommends reviewer council
   |-- User confirms which reviewers to include
   |-- Generates per-project persona briefs (projects/{Name}/personas/*.md)
   |-- Generates TypeScript review data
   '-- "Run /slap-guard to validate"
        |
        v
3. /slap-guard
   |-- Validates persona/section/ref parity
   '-- Generates E2E test file
        |
        v
4. Review in SLAP UI
   |-- /experts or /kaizen for deeper dives (reads project personas)
   |-- Select feedback -> Copy prompt
   '-- Paste into Claude -> improved HTML
        |
        v
5. /slap improved.html --version v2 --parent v1
   '-- Reuses persona briefs, generates new reviews -> back to step 3
```

---

## Design Pipeline (Full Build Flow)

```
/team (insider)  ->  /ux-planner  ->  /ui-planner  ->  /ui-review  ->  /create-task
                                                                            |
                                                                            v
                                                                         /slap
                                                                            |
                                                                            v
                                                                       /slap-guard
                                                                            |
                                                                  /experts + /kaizen (deeper dives)
                                                                            |
                                                                         iterate
```

---

## Skill Layers

### Conversation Layer (human reads in chat)
| Skill | What it does |
|-------|-------------|
| `/experts` | 5 discipline-expert reviews as markdown. Reads project persona briefs for context. |
| `/kaizen` | 18 persona reviews as markdown. Reads project persona briefs for context. |
| `/team` | Strategic advice from expert personas. Not project-bound, no persona files. |

### Automation Layer (writes code files)
| Skill | What it does |
|-------|-------------|
| `/slap` | Reads HTML, generates persona briefs + TypeScript review data. One command, full pipeline. |

### Validation Layer (checks + tests)
| Skill | What it does |
|-------|-------------|
| `/slap-guard` | Validates persona/section/ref parity. Generates E2E tests. |
| `/review-guard` | Legacy review integrity checks (example project). |

---

## Quick Decision Guide

| I want to... | Use |
|--------------|-----|
| Onboard a new HTML design into SLAP | `/slap` |
| Validate my SLAP project is wired correctly | `/slap-guard` |
| Get deeper expert feedback on a specific section | `/experts` |
| Get deeper persona feedback on a specific section | `/kaizen` |
| Get strategic advice (not project-specific) | `/team` |
| Plan a new feature | `/ux-planner` |
| Design how it looks | `/ui-planner` -> `/ui-review` |
| Build it | `/create-task` |

---

## Key Documents

| Document | Purpose |
|----------|---------|
| `TRUE_NORTH.md` | Project vision, data model, architecture |
| `STYLEGUIDE.md` | Visual identity, design tokens, motion |
| `PIPELINE_FLOW.md` | Complete skill invocation sequence |
| `TECH_CONTEXT.md` | Technology detection patterns |
| `PROJECT_CONTEXT.md` | Content archetype taxonomy |
