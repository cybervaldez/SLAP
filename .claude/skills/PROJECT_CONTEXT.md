# Project Context — SLAP!

SLAP! is a **design review platform**. The project itself is classified as a `media-gallery` + `data-dashboard` hybrid — it displays design projects (gallery) and presents review data (scores, findings, comparisons).

---

## Project Classification

| Aspect | Value |
|--------|-------|
| Primary archetype | `media-gallery` (projects as visual items) |
| Secondary archetype | `data-dashboard` (review scores, findings, progression) |
| Content model | Design projects with versioned reviews |
| User model | Designer iterating on UI designs with AI feedback |

---

## Design Project Archetypes

The designs **being reviewed** inside SLAP! follow this taxonomy. Each design project maps to an archetype that informs its section structure and review criteria.

| Archetype | Sections Reviewed | Natural Aesthetics |
|-----------|-------------------|-------------------|
| `landing-page` | hero, features, pricing, testimonials, faq, signup | Any — this is the variation |
| `text-heavy` | header, body, sidebar, toc, footer | Neo-Minimal, Editorial, Warm Organic |
| `e-commerce` | hero, products, cart, checkout, reviews | Warm Organic, Art Deco |
| `data-dashboard` | header, metrics, charts, filters, table | Dark Industrial, Neo-Minimal |
| `form-heavy` | header, fields, validation, progress, submit | Neo-Minimal, Soft Pastel |
| `task-management` | header, lanes, cards, filters, detail | Neo-Minimal, Dark Industrial |
| `media-gallery` | header, grid, lightbox, filters, detail | Editorial, Retro-Futurism |
| `real-time` | header, messages, input, presence, thread | Neo-Minimal, Soft Pastel |

---

## Per-Skill Mapping

### kaizen

| Archetype | Priority Personas | Why |
|-----------|------------------|-----|
| `landing-page` | Derek (sales), Skeptical Sarah, Rushed Ryan | Persuasion, trust, attention span |
| `text-heavy` | Grandma Dorothy, Rushed Ryan, Elena (screen reader) | Readability, scannability, accessibility |
| `data-dashboard` | Marcus (colorblind), Raj (power user), Frustrated Frank | Data legibility, efficiency, loading tolerance |
| `e-commerce` | Skeptical Sarah, Carlos (CEO), Grandma Dorothy | Trust, decision-making, usability |

### ui-planner

Use design project archetype to annotate aesthetic and layout galleries.

### ux-planner

Use design project archetype to prioritize clarifying questions.

### create-task

Use SLAP! project archetype (`media-gallery` + `data-dashboard`) for scaffold hints:
- Gallery: project cards, filtering, aggregate scores
- Workspace: review overlays, version switching, section highlighting
- Data: reviewer definitions, finding structures, score computation
