---
reviewer: ux
project: flowboard
version: haiku
type: expert
---

# UX — FlowBoard Review Brief

## Design Context

FlowBoard is a PM tool landing page following the standard hero → features → pricing → testimonials → CTA formula. Target users are team leads evaluating tools — likely comparing 3-4 options simultaneously. The page must convert on first visit; PM tool shoppers rarely return. The design uses a system font stack, CSS variables for theming, and a responsive grid layout.

## Evaluation Focus

- Is the information hierarchy clear enough to scan in under 60 seconds?
- Does the pricing section enable quick comparison across tiers?
- Are interaction patterns consistent (hover states, button styles, card behaviors)?
- Can a user complete the primary flow (understand value → compare pricing → start trial) without friction?
- Does the 6-card feature grid create cognitive overload?

## Section Priorities

| Section | Priority | Why |
|---------|----------|-----|
| hero | High | First impression — must establish value proposition and primary CTA |
| pricing | Critical | Decision point — tiers must be instantly scannable and comparable |
| features | High | 6 cards is a lot to process — needs grouping or hierarchy |
| testimonials | Medium | Social proof supports decision but doesn't drive it |
| cta | Low | Redundant if hero CTA is effective |

## Key Questions

1. Can a user understand what FlowBoard does and find the CTA in under 5 seconds?
2. Is the 6-feature grid scannable, or do users give up after card 3?
3. Does the pricing comparison work without scrolling horizontally on mobile?
4. Are hover states consistent between feature cards and pricing cards?
5. Does the page flow guide the user toward a decision or just present information?

## Red Flags to Watch

- Feature grid with too many equal-weight items (6 cards, no hierarchy)
- Pricing cards with inconsistent interaction patterns (featured card scales on desktop, doesn't on mobile)
- No visual differentiation between primary and secondary CTAs in context
- Testimonial section that doesn't connect back to features or pricing claims
- No progressive disclosure — everything dumped on one scroll
