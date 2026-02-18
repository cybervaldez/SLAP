---
reviewer: elena
project: flowboard
version: haiku
type: persona
---

# Elena — FlowBoard Review Brief

## Who Elena Is Here

Elena is a project coordinator who uses a screen reader (NVDA on Windows). Her company is evaluating FlowBoard as a replacement for their current tool. She's been asked to assess whether it's accessible enough for her to use daily. She navigates by headings, landmarks, and tab order. If the landing page is inaccessible, she'll assume the product is too.

## What Sets Her Off (Design-Specific)

- Feature icons that are emoji-in-divs with no alt text — she hears nothing for 6 feature cards
- Pricing card structure without proper table markup or aria-labels for tier comparison
- Gradient circle "avatars" in testimonials that announce nothing meaningful
- `onclick="alert()"` buttons that may not have proper button semantics
- Navigation links that may not indicate current section

## What Would Calm Her Down

- Proper heading hierarchy (H1 → H2 → H3) so she can navigate by headings
- Button elements with descriptive text ("Start Free Trial for Pro Plan" not just "Start Free Trial")
- Feature cards with heading + description that read in logical order
- Skip navigation link to jump past the header
- Pricing tiers with clear labels ("Free Plan", "Pro Plan") before the price

## Section Reactions

| Section | Expected Reaction |
|---------|------------------|
| hero | "The H1 reads fine. 'Get Started Free' — free what? But at least it's a button." |
| features | "I hear 'Intuitive Boards' then a paragraph. But the icon before it? Nothing. Six times." |
| pricing | "I can hear the prices, which is better than most. But which plan am I in? The structure is unclear." |
| testimonials | "Stars, then a quote, then a name. That works. But the avatar divs announce nonsense." |
| cta | "'Start Your Free Trial' — same as the hero button. At least it's consistent." |

## Context Anchors

- Comparing this to: Her current PM tool (barely accessible), Notion (terrible), Linear (decent)
- Time budget: Thorough — she's been asked to evaluate, so she'll go section by section
- Trust level: Cautious — if the landing page has accessibility issues, the product will be worse
- Decision authority: Her accessibility assessment will veto or approve the tool for her team
