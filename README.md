# SLAP!

> Anti-slop design study & toolkit — because AI-generated UIs shouldn't all look the same.

## What Is This

An interactive gallery of 8 UI archetypes — each one built, reviewed, and stress-tested using the [Cybervaldez Playbook](https://github.com/cybervaldez/cybervaldez-playbook)'s AI-assisted design pipeline. The study: documenting what makes AI output look generic. The toolkit: catching it automatically.

## The Problem

- **AI generates UIs that converge on the same patterns.** Purple gradients, Inter font, `rounded-full`, `transition: all 0.3s ease` — you've seen it a thousand times.
- **Developers can't always articulate _why_ something looks AI-made.** They know it when they see it, but there's no shared vocabulary for the problem.
- **No structured process to catch "slop" before shipping.** Code linters exist. Design linters don't.

## The Pipeline

Three tools from the Cybervaldez Playbook, used in sequence:

```
/ui-planner  →  pick aesthetic + layout, generate HTML previews
      ↓
/ui-review   →  catch slop patterns, enforce styleguide compliance
      ↓
/kaizen      →  17 fictional personas roast your UI from every angle
```

## Archetypes

| Archetype | Description |
|-----------|-------------|
| `text-heavy` | Blog, docs, knowledge base |
| `data-dashboard` | Analytics, admin panel |
| `form-heavy` | SaaS settings, onboarding |
| `media-gallery` | Portfolio, e-commerce catalog |
| `task-management` | Project mgmt, todo, CRM |
| `real-time` | Chat, feeds, collaboration |
| `e-commerce` | Online stores, marketplaces |
| `landing-page` | Marketing, waitlists |

## Quick Start

```bash
npm run dev
```

## Part of the Cybervaldez Playbook

Built on the [Cybervaldez Playbook](https://github.com/cybervaldez/cybervaldez-playbook) — a skill system for AI-assisted development.

## Tech Stack

React 18 + TypeScript, Vite 5, Bash + agent-browser E2E
