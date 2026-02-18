---
reviewer: design
project: flowboard
version: haiku
type: expert
---

# DESIGN — FlowBoard Review Brief

## Design Context

FlowBoard uses a standard SaaS landing page template aesthetic: purple primary (#5B4DE8), system font stack, white/slate backgrounds, rounded cards, gradient icons. The dark theme swaps to navy (#0F172A). Typography uses `clamp()` for responsive sizing. The visual identity is generic — nothing says "FlowBoard" specifically. Gradient circle avatars replace real photos in testimonials.

## Evaluation Focus

- Does the visual design communicate "brand" or "template"?
- Is the color system intentional? Purple primary with no secondary accent beyond #FF6B6B (unused in main content)
- Are the gradient circle testimonial avatars a trust liability?
- Does the feature icon grid (emoji in gradient squares) feel polished or placeholder?
- Is there a visual rhythm to the page, or does each section feel disconnected?

## Section Priorities

| Section | Priority | Why |
|---------|----------|-----|
| hero | High | First visual impression — sets brand expectations |
| features | Critical | 6 emoji-in-gradient-box icons are the most template-looking element |
| testimonials | High | Gradient circle avatars actively signal "these aren't real people" |
| pricing | Medium | Clean layout but the `scale(1.05)` featured card is a cliche |
| cta | Medium | Full-width gradient is the boldest visual moment on the page |

## Key Questions

1. If you removed the logo, could you tell this is FlowBoard and not any other SaaS?
2. Do the emoji icons in gradient boxes feel intentional or like placeholder art?
3. Does the color palette (purple + white + slate) have enough contrast and personality?
4. Is there a visual system connecting sections, or does each section feel like a separate template block?
5. Does the dark theme feel designed or auto-generated (just inverting colors)?

## Red Flags to Watch

- Emoji icons as primary visual identity (reads as mockup, not shipped product)
- Gradient circle avatars instead of real photos (trust signal failure)
- No illustration, photography, or custom visual asset anywhere on the page
- The only moment of visual confidence is the CTA gradient — everything else is safe and generic
- No micro-interactions beyond basic hover translateY (every SaaS template does this)
