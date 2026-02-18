# SLAP! Project Reviewers

Source of truth: `src/data/reviewers.ts`

When this doc and the source file diverge, the TypeScript source wins. Update this doc after changing reviewer data.

---

## Experts (5)

Always present in the review rail. Evaluate designs from a professional discipline lens.

| ID | Name | Role | Icon | Color | Bias (Lens) |
|----|------|------|------|-------|-------------|
| `marketing` | MARKETING | Positioning, Messaging, CTA | :dart: | `#FF6B6B` | "Does this sell? Is the value proposition clear in 5 seconds?" |
| `ux` | UX | Usability, Accessibility, Flow | :art: | `#4ECDC4` | "Can every user accomplish their goal without friction?" |
| `product` | PRODUCT | Value Prop, ROI, Positioning | :package: | `#FFD93D` | "Does this feature justify its complexity? What is the user actually paying for?" |
| `technical` | TECHNICAL | Performance, Mobile, Standards | :wrench: | `#95E1D3` | "Will this work on slow connections, old devices, and screen readers?" |
| `design` | DESIGN | Visual, Branding, Aesthetics | :sparkles: | `#F38181` | "Is every visual choice intentional? Does it feel like a brand or a template?" |

### Expert Details

**MARKETING** evaluates whether the page sells. Focuses on value proposition clarity, CTA effectiveness, headline strength, and audience targeting. Thinks in terms of conversion and first-impression impact.

**UX** evaluates whether users can accomplish their goals. Focuses on flow, friction, accessibility, error states, and progressive disclosure. Advocates for the user who can't figure it out.

**PRODUCT** evaluates whether features justify their complexity. Focuses on trade-offs, scope, ROI, and whether the page communicates what the user is actually paying for.

**TECHNICAL** evaluates whether the implementation holds up under stress. Focuses on slow connections, old devices, screen readers, mobile viewports, and web standards compliance.

**DESIGN** evaluates whether visual choices are intentional. Focuses on brand consistency, typography, color usage, hierarchy, spacing, and whether the page feels crafted or templated.

---

## Personas (18)

Grouped into 6 categories of 3. Personas have `taste` (aesthetic preferences) and `homeVersion` (the design version they'd feel most at home with). Personas are assigned to a review council and bring human context that experts miss.

### Accessibility (3)

| ID | Name | Role | Icon | Color | Bias (Lens) | Taste | Home Version |
|----|------|------|------|-------|-------------|-------|-------------|
| `marcus` | Marcus | Colorblind Developer | :eyeglasses: | `#4ECDC4` | "Color-only indicators are invisible to me." | Terminal themes, high contrast, prefers dark mode | dark-industrial |
| `elena` | Elena | Screen Reader User | :loud_sound: | `#7B68EE` | "If it does not have a label, it does not exist." | Podcasts, audiobooks, keyboard shortcuts for everything | warm-organic |
| `priya` | Priya | Limited Motor Control | :computer_mouse: | `#DDA0DD` | "If the click target is smaller than my thumb, I will miss it." | Minimalist interfaces, voice control, large buttons | neo-minimal |

**When to summon:** Any question about inclusive design, WCAG compliance, screen reader compatibility, color contrast, touch targets, keyboard navigation, or motor/visual/cognitive accessibility.

### Tech Spectrum (3)

| ID | Name | Role | Icon | Color | Bias (Lens) | Taste | Home Version |
|----|------|------|------|-------|-------------|-------|-------------|
| `dorothy` | Dorothy | Just Wants It To Work | :older_woman: | `#6BCB77` | "What does OAuth mean? I just want to log in." | Newspapers, recipe cards, phone calls over text | warm-organic |
| `kevin` | Kevin | Digital Native, Zero Patience | :zap: | `#FF8C00` | "If it takes more than 2 taps I am already gone." | TikTok, Discord, neon gradients, dark mode everything | retro-futurism |
| `raj` | Raj | Power User / Terminal Dweller | :keyboard: | `#20B2AA` | "Where are the keyboard shortcuts? Where is the CLI?" | Vim keybindings, tiling window managers, monospace everything | dark-industrial |

**When to summon:** Questions about onboarding complexity, feature discoverability, power-user shortcuts, or whether the interface works for both novices and experts.

### Role-Based (3)

| ID | Name | Role | Icon | Color | Bias (Lens) | Taste | Home Version |
|----|------|------|------|-------|-------------|-------|-------------|
| `carlos` | Carlos | CEO Evaluating | :briefcase: | `#DAA520` | "Show me the ROI in the first scroll. I have a board meeting in 10 minutes." | Bloomberg Terminal, executive summaries, gold accents | art-deco |
| `jasmine` | Jasmine | Overworked Support Rep | :headphones: | `#87CEEB` | "I get 3 tickets a day about this exact screen." | Clean dashboards, searchable docs, calm interfaces | neo-minimal |
| `tommy` | Tommy | Intern Day Three | :mortar_board: | `#FF69B4` | "I have been clicking around for 10 minutes and still do not understand this page." | Memes, colorful UIs, tutorials, anything fun | memphis |

**When to summon:** Questions about clarity for different organizational roles, executive communication, support burden, or onboarding for new team members.

### Emotional State (3)

| ID | Name | Role | Icon | Color | Bias (Lens) | Taste | Home Version |
|----|------|------|------|-------|-------------|-------|-------------|
| `frank` | Frank | Zero Patience | :angry: | `#FF6B6B` | "I am already annoyed. Every extra click makes it worse." | No-nonsense, raw, brutally efficient | brutalist |
| `diana` | Diana | Craft Meets Intention | :sparkles: | `#BA55D3` | "I notice when someone cared. I also notice when they did not." | Artisanal coffee, typography blogs, museum exhibitions | art-deco |
| `sarah` | Sarah | Trusts Nothing | :mag: | `#CD853F` | "Where is the privacy policy? Who are these testimonial people?" | Reading reviews, comparing alternatives, checking credentials | brutalist |

**When to summon:** Questions about trust signals, friction tolerance, polish/craft perception, or how the page feels to someone who's frustrated, skeptical, or design-sensitive.

### Context (3)

| ID | Name | Role | Icon | Color | Bias (Lens) | Taste | Home Version |
|----|------|------|------|-------|-------------|-------|-------------|
| `sam` | Sam | Crowded Subway, One Thumb | :iphone: | `#9B59B6` | "If I cannot do it with one thumb on a bumpy train, it is broken." | Mobile-first, large touch targets, offline-capable | retro-futurism |
| `maya` | Maya | Between Kid Meltdowns | :baby: | `#F0E68C` | "I have 30 seconds before chaos. Do not make me think." | Warm colors, clear hierarchy, save-and-resume | warm-organic |
| `mike` | Mike | Team Watching Screen | :desktop_computer: | `#708090` | "My team is watching. If this looks confusing I look incompetent." | Professional, clean, nothing embarrassing | neo-minimal |

**When to summon:** Questions about mobile usability, distracted-user flows, time-pressured interactions, or how the page performs in real-world contexts (not ideal lab conditions).

### Cultural Taste (3)

| ID | Name | Role | Icon | Color | Bias (Lens) | Taste | Home Version |
|----|------|------|------|-------|-------------|-------|-------------|
| `yuki` | Yuki | Aesthetic Everything | :cherry_blossom: | `#FFB7C5` | "If it is not beautiful I do not trust it." | Japanese design, wabi-sabi, intentional imperfection | warm-organic |
| `dex` | Dex | Subculture Lens | :guitar: | `#32CD32` | "Corporate design is the enemy. Show me something real." | Zines, DIY, punk aesthetics, anti-establishment | memphis |
| `nora` | Nora | Expects Luxury | :crown: | `#C4A35A` | "If this does not feel premium I am not paying premium prices." | Gold accents, serif fonts, white space, understated elegance | art-deco |

**When to summon:** Questions about aesthetic direction, brand personality, cultural fit, or whether the design resonates with specific taste profiles.

---

## Version-Persona Affinity

Each design version has 5 personas who feel "at home" with that aesthetic. These are auto-assigned when reviewing that version.

| Version | Personas |
|---------|----------|
| slap | marcus, dorothy, carlos, frank, sam |
| brutalist | frank, sarah, dex, dorothy, marcus |
| neo-minimal | priya, jasmine, mike, marcus, kevin |
| maximalist | yuki, frank, diana, sam, priya |
| dark-industrial | marcus, raj, dorothy, jasmine, sam |
| warm-organic | dorothy, maya, frank, raj, elena |
| retro-futurism | kevin, sam, sarah, carlos, tommy |
| memphis | tommy, dex, carlos, nora, mike |
| art-deco | carlos, diana, nora, tommy, dex |

---

## How Persona Data Surfaces in the UI

| UI Element | Data Field | Where |
|------------|-----------|-------|
| Bubble rail avatar | `color`, `avatarStyle`, `id` | DiceBear SVG with color background |
| Popover header | `name`, `role`, `score` | Tier 2 overlay |
| Popover LENS | `bias` | Italic quote below header |
| Popover taste | `taste` | Below verdict (personas only) |
| Review panel LENS | `bias` | Before verdict in Tier 3 |
| Tour chin lens | `bias` | Below reviewer name during guided tour |
| shapedBy dots | `id` | Gold dots on V2 for personas who shaped it |
| Roster card | All fields | Full card with name, role, bias, taste, score |

---

## Summoning Personas in /team

When consulting the `/team` skill, you can summon SLAP reviewers by name or category:

```
/team elena, frank "review this hero section"
/team accessibility "is this form usable?"
/team emotional-state "how does the pricing page feel?"
```

Personas speak in character. Their `bias` is their core assumption — every observation they make is filtered through this lens. Their `taste` influences which aesthetic directions they prefer or reject.
