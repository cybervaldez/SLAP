# Skill Index — SLAP!

Quick reference for all playbook skills.

## At a Glance

| Skill | Phase | One-Liner | When to Use |
|-------|-------|-----------|-------------|
| `/ux-planner` | Development | Conversational UX advisor with options and tradeoffs | Planning new features |
| `/ui-planner` | Development | Visual design with ASCII galleries and previews | Establishing visual identity |
| `/create-task` | Production | Implementation with built-in E2E tests | Building features |
| `/ui-review` | Release | AI slop detector and styleguide compliance | After `/ui-planner`, before implementation |
| `/team` | Any | Expert personas for strategic advice | Strategic decisions |
| `/kaizen` | Any | User personas for real-world feedback | User perspective |
| `/e2e` | Verification | Browser E2E tests via agent-browser | After building, before commits |

---

## Pipeline Flow

```
/ux-planner → /ui-planner → /ui-review → /create-task
                                              │
                                              v
                                           /kaizen + /team (review)
                                              │
                                              v
                                     iterate → /ux-planner (loop)
```

### Design Iteration Flow

1. `/kaizen` + `/team` — Personas and experts as **insiders** shape design direction
2. `/ux-planner` + `/ui-planner` — Plan interaction and visual design
3. `/create-task` — Implement the design version
4. `/kaizen` + `/team` — Personas and experts as **critics** review the result
5. Iterate — Feedback creates next version, flow returns to step 1

---

## Quick Decision Guide

| I want to... | Use |
|--------------|-----|
| Plan a new feature | `/ux-planner` |
| Design how it looks | `/ui-planner` → `/ui-review` |
| Build it | `/create-task` |
| Get strategic advice | `/team` |
| Get user feedback | `/kaizen` |

---

## Key Documents

| Document | Purpose |
|----------|---------|
| `TRUE_NORTH.md` | Project vision, data model, architecture |
| `STYLEGUIDE.md` | Visual identity, design tokens, motion |
| `PIPELINE_FLOW.md` | Complete skill invocation sequence with prompt templates |
| `TECH_CONTEXT.md` | Technology detection patterns |
| `PROJECT_CONTEXT.md` | Content archetype taxonomy |
