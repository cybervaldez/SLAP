---
reviewer: technical
project: flowboard
version: haiku
type: expert
---

# TECHNICAL — FlowBoard Review Brief

## Design Context

FlowBoard's landing page is a single-file HTML document with inline CSS (no external dependencies). Uses CSS variables for light/dark theming, `clamp()` for responsive typography, CSS Grid with `auto-fit`/`minmax` for layouts, and `scroll-behavior: smooth` for navigation. JavaScript is minimal: theme toggle with localStorage persistence and smooth scroll polyfill. No framework, no build step, no external assets.

## Evaluation Focus

- Does the responsive layout hold up on mobile viewports (320px-768px)?
- Are the CSS Grid `auto-fit` patterns robust or do they break at edge widths?
- Is the inline JavaScript pattern appropriate (onclick handlers, global functions)?
- Does the pricing card `scale(1.05)` create overflow issues on smaller screens?
- Is the dark theme implementation complete (no hardcoded colors leaking)?

## Section Priorities

| Section | Priority | Why |
|---------|----------|-----|
| pricing | Critical | Grid with 3 cards + scale transform is the most fragile layout |
| features | High | 6-card grid with minmax(280px, 1fr) may cause awkward wrapping |
| hero | Medium | Simple layout, unlikely to break |
| testimonials | Medium | Grid similar to features, same potential issues |
| cta | Low | Simple centered layout, minimal risk |

## Key Questions

1. Does `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` work at 600px (2-col) and 320px (1-col)?
2. Does `.pricing-card.featured { transform: scale(1.05) }` overflow its container on mobile?
3. Are all color values using CSS variables, or do some hardcode light-theme colors?
4. Does the sticky header (`position: sticky; z-index: 1000`) interfere with scroll targets?
5. Is the `onclick="alert()"` pattern acceptable for a landing page, or does it signal prototype quality?

## Red Flags to Watch

- Inline `onclick` handlers instead of event listeners (amateur pattern for production)
- `localStorage` theme without fallback for private browsing / disabled storage
- No `loading="lazy"` on images (not currently an issue — no images — but would be with real avatars)
- Missing `aria-label` on icon-only elements (feature icons are emoji in divs)
- CSS `:before` pseudo-element for checkmarks may not be announced by screen readers
