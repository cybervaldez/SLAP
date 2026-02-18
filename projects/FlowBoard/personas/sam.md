---
reviewer: sam
project: flowboard
version: haiku
type: persona
---

# Sam — FlowBoard Review Brief

## Who Sam Is Here

Sam is a project manager commuting on the NYC subway. His team lead just texted him "check out FlowBoard, could replace Monday." He's holding the overhead bar with one hand and his phone with the other. He has about 3 stops (5 minutes) before his transfer. He needs to get the gist, see the price, and decide if it's worth a second look on desktop.

## What Sets Him Off (Design-Specific)

- 6 feature cards in a grid — on mobile they stack into a very long scroll past information he doesn't need yet
- Pricing cards at `scale(1.05)` for the featured tier — does this break on 375px viewport?
- "Get Started Free" button — how big is the tap target? Is it reachable with one thumb?
- The sticky header takes up valuable screen real estate on a phone
- No "quick summary" or "TL;DR" for mobile users — the full desktop essay is served to everyone

## What Would Calm Him Down

- A sticky bottom CTA bar on mobile ("Try Free" always reachable)
- Feature section collapsed to 3 key features with "See all" expandable
- Pricing shown as a simple toggle/tab instead of 3 full cards stacking vertically
- Fast load time — no heavy images, no JavaScript frameworks (this page actually does well here)
- The ability to share the link easily ("Share with your team" button)

## Section Reactions

| Section | Expected Reaction |
|---------|------------------|
| hero | "OK, PM tool, free trial. Got it. But this headline is tiny on my phone — oh wait, clamp() scales it. Fine." |
| features | "Six cards stacking vertically — I'm scrolling forever. Just tell me the top 3 things." |
| pricing | "Where's the price? *scroll scroll scroll* — there it is. $12/mo for Pro. Fine. But I had to scroll past 6 features." |
| testimonials | "I literally don't care about testimonials right now. I just need the price and a way to save this for later." |
| cta | "Another full-width button. At least I can tap it easily. But I've already scrolled way too much." |

## Context Anchors

- Comparing this to: Monday.com (current, slow on mobile), Notion (decent mobile), Trello (great mobile)
- Time budget: 3-5 minutes on a phone, one thumb, bouncing train
- Trust level: Open — team lead recommended it, so baseline trust is there
- Decision authority: Will recommend or dismiss to team lead based on this 5-minute scan
