# Skill Index

Quick reference for all playbook skills. Use this to find the right skill for your task.

## At a Glance

| Skill | Phase | One-Liner | When to Use |
|-------|-------|-----------|-------------|
| `/ux-planner` | Development | Conversational UX advisor with options and tradeoffs | Planning new features |
| `/ui-planner` | Development | Visual design with ASCII galleries and previews | Establishing visual identity |
| `/research` | Development | Technology research and classification | Before using new tech |
| `/create-task` | Production | Implementation with built-in E2E tests | Building features |
| `/coding-guard` | Production | Anti-pattern scanner (fallbacks, silent failures) | After implementation |
| `/cli-first` | Production | Observability auditor (testIDs, state exposure) | After implementation |
| `/ui-review` | Release | AI slop detector and styleguide compliance | After `/ui-planner`, before implementation |
| `/ux-review` | Release | Visual + behavioral UX verification via screenshots and navigation | After implementation |
| `/e2e-guard` | Release | Auto-generate missing E2E tests | After implementation |
| `/e2e` | Release | Full test orchestration with screenshots and click-through verification | Final verification |
| `/e2e-investigate` | Release | Root cause analysis for test failures | After `/e2e` fails 3+ times |
| `/team` | Any | Expert personas for strategic advice | Strategic decisions |
| `/kaizen` | Any | User personas for real-world feedback | User perspective |

---

## By Pipeline Phase

### Development (Plan & Design)
- `/ux-planner` - Define interaction flows before building
- `/ui-planner` - Establish visual identity and design tokens
- `/research` - Make skills tech-aware

### Production (Build & Audit)
- `/create-task` - The main implementation skill with tests
- `/coding-guard` - Code quality and anti-patterns
- `/cli-first` - Observability for AI verification

### Release (Review & Feedback)
- `/ui-review` - AI slop detection and styleguide compliance
- `/ux-review` - User experience verification
- `/e2e-guard` - Auto-generate missing E2E tests
- `/e2e` - Full E2E test suite
- `/e2e-investigate` - Debug test failures
- `/team` - Expert panel advice (Marketing, UX, Product, Technical)
- `/kaizen` - Audience feedback (accessibility, usability)

---

## Pipeline Flow

```
/ux-planner → /ui-planner → /ui-review → /create-task
                                              │
                    ┌───────────────┬─────────┼─────────┬───────────────┐
                    │               │         │         │               │
                    v               v         v         v               │
              /coding-guard   /cli-first  /ux-review  /e2e-guard        │
                    │               │         │         │               │
                    └───────────────┴─────────┴─────────┘               │
                                    │                                   │
                                    v                                   │
                                  /e2e ─────────fail───────> /e2e-investigate
                                    │                               │
                                  pass                              │
                                    │                               │
                                    v                               v
                                  DONE <───────────────────── /create-task (fix)
```

---

## Quick Decision Guide

| I want to... | Use | **If it fails...** |
|--------------|-----|-------------------|
| Plan a new feature | `/ux-planner` | Check `/research` for new tech |
| Design how it looks | `/ui-planner` → `/ui-review` | Re-run `/ui-planner` if no previews |
| Build it | `/create-task` | Start server first |
| Check my code | `/coding-guard` + `/cli-first` | `git add .` if no commits |
| Verify it works | `/ux-review` + `/e2e-guard` → `/e2e` | Start server, check test files |
| Fix failing tests | `/e2e-investigate` → `/create-task` | Run `/e2e` first for artifacts |
| Use a new library | `/research` first | Check internet connection |
| Get strategic advice | `/team` | N/A |
| Get user feedback | `/kaizen` | N/A |

---

## Skill Files Location

After kickstart, skills are in `.claude/skills/`:

```
.claude/skills/
├── SKILL_INDEX.md          # This file
├── TECH_CONTEXT.md         # Domain classification
├── PROJECT_CONTEXT.md      # Content archetype taxonomy
├── SLAPSTICK_CONCEPT.md    # Three-layer model, tonal system, data architecture
├── research/SKILL.md       # /research
├── ux-planner/SKILL.md     # /ux-planner
├── ui-planner/SKILL.md     # /ui-planner
├── ui-review/SKILL.md      # /ui-review
├── create-task/SKILL.md    # /create-task
├── coding-guard/SKILL.md   # /coding-guard
├── cli-first/SKILL.md      # /cli-first
├── ux-review/SKILL.md      # /ux-review (browser)
├── e2e-guard/SKILL.md      # /e2e-guard
├── e2e/SKILL.md            # /e2e
├── e2e-investigate/SKILL.md # /e2e-investigate
├── team/SKILL.md           # /team
├── kaizen/SKILL.md         # /kaizen
└── agent-browser/SKILL.md  # /agent-browser (utility)
```

**Note:** `agent-browser` is a utility reference (Vercel Labs tool), not a playbook-authored skill. It's included in the 14 skill count as it powers browser automation across all E2E skills.
