# SLAP!

> Anti-slop design study & toolkit — because AI-generated UIs shouldn't all look the same.

**8 archetypes. 7 landing page variations. Zero purple gradients.**

<!-- TODO: Add screenshot of the gallery hub here -->

## What Is This

Every AI tool generates the same landing page. Same purple gradient, same Inter font, same `rounded-full` buttons with `transition: all 0.3s ease`. You know it when you see it. We call it slop.

SLAP! is an interactive gallery of 8 UI archetypes — each one built, reviewed, and stress-tested using the [Cybervaldez Playbook](https://github.com/cybervaldez/cybervaldez-playbook)'s AI-assisted design pipeline. The study documents what makes AI output look generic. The toolkit catches it before you ship.

## Quick Start

```bash
npm run dev
```

Open `http://localhost:5173` and browse the archetype gallery.

## The Problem

- **AI generates UIs that converge on the same patterns.** You've seen the same hero section a thousand times. So has everyone else.
- **Developers can't articulate _why_ something looks AI-made.** They know it when they see it, but there's no shared vocabulary for the problem.
- **No structured process to catch slop before shipping.** Code linters exist. Design linters don't.

## The Pipeline

Three phases, borrowed from production workflows:

| Phase | What Happens | Skills |
|-------|-------------|--------|
| **Development** | Plan UX flows, establish visual identity, research tech | `/ux-planner` `/ui-planner` `/research` |
| **Production** | Build features, audit code, verify observability | `/create-task` `/coding-guard` `/cli-first` |
| **Release** | Review design, test E2E, gather audience feedback | `/ui-review` `/ux-review` `/e2e` `/kaizen` `/team` |

The core loop for anti-slop work:

```
/ui-planner  →  pick aesthetic + layout, generate HTML previews
      ↓
/ui-review   →  catch slop patterns, enforce styleguide compliance
      ↓
/kaizen      →  17 fictional personas roast your UI from every angle
```

## Genre Independence

SLAP! uses slapstick comedy as its demo genre — proud-slop content, roast-style reviews, redemption through design. But the pipeline, archetypes, and review panels are genre-agnostic. Genre here means **content domain**: entertainment themes (horror, sci-fi, romance) or real business verticals (SaaS, fintech, healthcare, developer tools). Swap the genre and the content changes across all archetypes while the structure stays the same. The comedy is the demo, not the dependency.

## Archetypes

| Archetype | What it covers |
|-----------|---------------|
| **Landing Page** | Hero sections, pricing, testimonials & CTAs — **7 style variations:** SLAP!, Raw & Honest (Brutalist), Less is More (Neo-Minimal), More is More (Maximalist), Built to Spec (Dark Industrial), Grown Not Made (Warm Organic), Tomorrow Today (Retro Futurism) |
| **Text Heavy** | Long-form content with TOC, search & collapsible sections |
| **E-Commerce** | Product grid, cart drawer & checkout flow |
| **Data Dashboard** | Metrics, charts, filters & sortable data tables |
| **Form Heavy** | Multi-step forms with validation & conditional fields |
| **Task Management** | Kanban board with drag-and-drop & task modals |
| **Media Gallery** | Grid/list views, lightbox, filters & lazy loading |
| **Real-Time** | Chat interface with simulated messages & channels |

The landing page archetype is the most developed — 7 variations that prove the same content can look radically different when you make deliberate aesthetic choices instead of accepting defaults.

## Part of the Cybervaldez Playbook

Built on the [Cybervaldez Playbook](https://github.com/cybervaldez/cybervaldez-playbook) — a skill system for AI-assisted development.

## Tech Stack

React 18 + TypeScript, Vite 5, Bash + agent-browser E2E
