# SLAPstick Concept Reference

The structural invention behind the SLAP! project. This document captures the three-layer performance model, the tonal system, the proud-slop content philosophy, and the data architecture so the concept survives context switches and session boundaries.

---

## The Metaphor

In actual slapstick comedy, the comedian gets hit in the face — but it takes immense skill to make that look natural. The audience laughs at the fall, then respects the craft.

SLAP! does the same thing with AI-generated design:

- **The fall** = AI default output (the "slop")
- **The roast** = expert and persona panels tearing it apart
- **The craft** = styled variations proving design can transform the same content

The comedy is the hook. The skill showcase is the payoff. The tension between them is the whole point.

---

## The Three-Layer Model

Every archetype demo is a three-act performance:

### Layer 1: The Performer (Proud-Slop Content)

The content itself — headlines, article text, product descriptions — is **intentionally bad AI writing** presented with zero self-awareness. It uses every corporate cliche, congratulates itself constantly, and claims excellence while demonstrating none.

This is the "performer on stage." The content stays identical across all 9 variations. Only the visual/structural design changes.

**Key principle:** The content is the constant. Design is the variable. This isolates design's impact from content quality.

### Layer 2: The Audience (Three Panels)

The review overlay system. Three distinct panels evaluate each variation's design treatment of the proud-slop content:

#### 2a: The Panel (Professional Critics)

Five expert reviewers evaluating through professional lenses. These are the "YouTube tech reviewers" — analytical, structured, scoring on craft.

- **Expert panel** (`/team` voices): marketing, ux, product, technical, design
- **Tone:** Professional analysis with personality
- **Output:** Scores (1-10), section-mapped observations, consensus reviews

#### 2b: The Crowd (Real Audience)

Five personas selected per variation from an 18-persona roster. These are the "comment section" — personal, emotional, relatable. Each persona has a functional lens (what they evaluate) AND a cultural identity (how they talk about it, what they gravitate toward).

- **Persona panel** (`/kaizen` voices): 5 selected from 18 based on variation affinity
- **Tone:** Personal reactions, cultural references, subjective preferences
- **Output:** Taglines, categorized observations, verdicts
- **Key difference from Panel:** Personas have cultural tastes that create natural affinities toward certain variations

#### 2c: The Crew (Industry Insiders)

Four industry professionals who represent the people who *make* AI-generated output. They explain WHY slop exists — the pressures, deadlines, and incentives that create it.

- **Crew panel** (production voices): prompt engineer, junior designer, product manager, startup founder
- **Tone:** Defensive, self-aware, pragmatic — they've shipped slop and know why
- **Output:** Industry context, production pressure insights, meta-commentary

The three panels create a complete critical ecosystem:
- **The Panel** says "this is bad because [professional analysis]"
- **The Crowd** says "I don't like this because [personal experience]"
- **The Crew** says "we shipped it anyway because [industry pressure]"

### Layer 3: The Redemption (Styled Variations)

Eight distinct design systems applied to the same content, proving that deliberate aesthetic choices can transform identical words into different experiences:

| Variation | Hook | Design DNA |
|-----------|------|------------|
| **SLAP!** | (baseline) | No design opinion — AI defaults, system fonts, zero customization |
| **Brutalist** | Raw & Honest | 900-weight uppercase, monospace accents, thick borders, stark B/W |
| **Neo-Minimal** | Less is More | Thin fonts (200-300), generous whitespace, 1px borders, restraint |
| **Maximalist** | More is More | Mixed serif/sans, navy/coral/gold palette, decorative editorial density |
| **Dark Industrial** | Built to Spec | Dark backgrounds, monospace throughout, amber accents, terminal labels |
| **Warm Organic** | Grown, Not Made | Earth tones, rounded edges, soft shadows, comfortable spacing |
| **Retro-Futurism** | Tomorrow, Today | Gradients, teal/purple, rounded containers, bouncy interactions |
| **Memphis** | Post-Modern Pop | Bold geometric shapes, primary colors, asymmetric, playful post-modern |
| **Art Deco** | Gilded Geometry | Gold accents, geometric patterns, elegant serifs, symmetrical balance |

This is the "redemption arc." The same bad content, dressed in intentional design, scores 5-8 instead of 2-3. Design didn't save the words — it gave them a stage.

---

## The Tonal Spectrum

Findings follow a deliberate tonal progression:

### SLAP Findings (Layer 2 for the baseline variation)

- **Tone:** Comedy roast. Harsh, specific, often funny.
- **Score range:** 2-3 out of 10
- **Purpose:** Expose the proud-slop content's emptiness. The design isn't even trying, so the content's flaws are fully visible.
- **Example:** *"'In today's rapidly evolving digital landscape' — the single most parodied opener in content marketing. It's here, unironically, as the first thing the reader sees."*

### Styled Variation Findings (Layer 2 for variations 2-9)

- **Tone:** Constructive critique with personality. No longer roasting — evaluating.
- **Score range:** 5-8 out of 10
- **Purpose:** Assess what each design system reveals, hides, or transforms about the content. Standalone evaluations — no cross-references to SLAP findings.
- **Example:** *"The serif headline with gold underline rule is the most elegant opening of any variation. The combination of serif type and gold geometric accents creates gravitas that the content hasn't earned — but the design provides freely."*

### Why the Shift Matters

The tonal shift mirrors the design journey itself. When there's no design (SLAP baseline), the content is indefensible — roast it. When there IS design (styled variations), the conversation becomes "what does this design choice do to the reading experience?" That's constructive, evaluative criticism — the kind that makes designers better.

**Critical rule:** Styled variation findings are standalone. They do not reference the SLAP findings, the unstyled version, or the roast tone. Each variation is evaluated on its own merits as if it were the only version that exists.

---

## The Proud-Slop Content

Three archetypes have proud-slop content — intentionally bad AI writing that serves as the "performer" being evaluated:

### Landing Page (`src/archetypes/landing-page/data.ts`)

Corporate SaaS landing page copy. Every buzzword, every vague claim, every "Empower Your Team to Achieve More, Together." The subheadline alone has seven buzzwords. Pricing plans feature "archetypes" as jargon. Testimonials attribute quotes to "Chief Innovation Officer at Synergy Labs."

### Text-Heavy (`src/archetypes/text-heavy/data.ts`)

A 12-minute article titled *"You're Reading This Wrong: A Comprehensive Guide to Content Excellence"* that opens with "In today's rapidly evolving digital landscape." It congratulates its own paragraphs, defines "hierarchy" from the dictionary, invents the term "readability triad," and closes with "The importance of good design cannot be overstated" — the most overstated sentence possible.

**Five sections** (these map to section keys in findings data):
1. **"The First Paragraph Problem"** (`opening`) — Claims to be excellent while demonstrating every AI writing cliche
2. **"The Hierarchy Nobody Notices"** (`hierarchy`) — Over-explains typographic hierarchy without demonstrating it
3. **"Measure Twice, Read Once"** (`measure`) — Discusses readability metrics while being unreadable
4. **"Ornament vs. Crime"** (`ornament`) — Claims "elegant simplicity" while having no design at all
5. **"The Last Line Is a Design Decision"** (`ending`) — Summarizes itself, thanks the reader, ends with a platitude

### E-Commerce (`src/archetypes/e-commerce/data.ts`)

Product listings with descriptions like "Experience audio the way it was meant to be heard" and "A timeless silhouette reimagined for the modern individual." Every product has a proprietary technology name (NoiseShield, AuraWeave) and a five-star self-assessment.

### What Makes It "Proud"

The content isn't random bad writing — it's **confidently, specifically bad.** It brags about qualities it doesn't have. It claims optimization while being unoptimized. It declares itself a masterclass while teaching nothing. This self-awareness gap is what makes the SLAP roast work: the experts aren't attacking strawmen, they're quoting the content's own claims back at it.

---

## The Expert Panel (5 Experts)

These are the critic voices in the review overlay. Each expert evaluates the design through a professional lens. Defined in `src/data/experts.ts`:

| ID | Name | Lens | What They Evaluate |
|----|------|------|-------------------|
| `marketing` | MARKETING | Positioning, Messaging, CTA | Does the design sell the content? Does it create urgency, trust, recall? |
| `ux` | UX | Usability, Accessibility, Flow | Is the design readable? Is the hierarchy scannable? Does it meet WCAG? |
| `product` | PRODUCT | Value Prop, ROI, Positioning | Does the design make the content seem worth reading? What's the ROI of the design investment? |
| `technical` | TECHNICAL | Performance, Mobile, Standards | Is it lightweight? Does it render fast? How does it handle viewport constraints? |
| `design` | DESIGN | Visual, Branding, Aesthetics | Is the visual system cohesive? Does it commit to its aesthetic thesis? |

### Expert Finding Structure

Each expert finding (in `src/data/expertFindings.ts`) contains:
- `score` (1-10)
- `verdict` (summary sentence)
- `sections` — a Record mapping section keys to arrays of `{ text, light, comment }` observations

Light values: `green` (working well), `yellow` (needs attention), `red` (critical issue).

---

## The Persona Roster (18 Personas)

The full `/kaizen` roster. Five personas are selected per variation based on variation affinity (see Variation Affinity Matrix below). Each persona has a functional lens (what they evaluate) AND a cultural identity (how they talk about it, what they gravitate toward). Defined in `src/data/lenses.ts`:

### Accessibility (3)

| ID | Name | Age | Functional Lens | Cultural Identity | Home Variation |
|----|------|-----|----------------|-------------------|---------------|
| `marcus` | Marcus | 34 | Colorblind developer | Manga reader, indie gamer, mechanical keyboard collector | Dark Industrial |
| `elena` | Elena | 28 | Screen reader user | Audiobook marathoner, pottery class regular, true crime podcast fan | Warm Organic |
| `priya` | Priya | 31 | Motor disability (CP) | Crossword puzzle devotee, bird watcher, cozy mystery novels | Neo-Minimal |

### Tech Spectrum (3)

| ID | Name | Age | Functional Lens | Cultural Identity | Home Variation |
|----|------|-----|----------------|-------------------|---------------|
| `dorothy` | Dorothy | 68 | Non-technical novice | Romance novels, Hallmark movies, church newsletter editor, quilting circle | Warm Organic |
| `kevin` | Kevin | 14 | Digital native, impatient | TikTok creator, anime fan, synthwave playlists, speedrun viewer | Retro-Futurism |
| `raj` | Raj | 45 | Power user, vim enthusiast | Open source contributor, sci-fi audiobooks, home automation nerd, D&D dungeon master | Dark Industrial |

### Role-Based (3)

| ID | Name | Age | Functional Lens | Cultural Identity | Home Variation |
|----|------|-----|----------------|-------------------|---------------|
| `carlos` | Carlos | 52 | CEO evaluator | Business biographies, jazz vinyl collector, single malt whiskey, CNBC | Art Deco |
| `jasmine` | Jasmine | 29 | Customer support (50+ tickets/day) | K-drama binger, bullet journal obsessive, plant parent, matcha snob | Neo-Minimal |
| `tommy` | Tommy | 22 | Intern, first week | Sneaker collector, hip-hop producer, streetwear forums, basketball highlights | Memphis |

### Emotional State (3)

| ID | Name | Age | Functional Lens | Cultural Identity | Home Variation |
|----|------|-----|----------------|-------------------|---------------|
| `frank` | Frank | 41 | Frustrated, zero patience | Fantasy football obsessed, action movies, 5-ingredient meals, ESPN live scores | Brutalist |
| `diana` | Diana | 36 | Delighted by craft | Wes Anderson completionist, Japanese stationery collector, thrift store regular, sourdough parent | Art Deco |
| `sarah` | Sarah | 33 | Skeptical evaluator | Spreadsheet enthusiast, comparison shopping queen, Consumer Reports subscriber, debate team alumni | Brutalist |

### Context (3)

| ID | Name | Age | Functional Lens | Cultural Identity | Home Variation |
|----|------|-----|----------------|-------------------|---------------|
| `sam` | Sam | 27 | Mobile commuter | True crime podcasts, comic book reader, mobile gacha games, ramen hunter | Retro-Futurism |
| `maya` | Maya | 38 | Multitasking parent | DIY YouTube rabbit holes, IKEA hacker, meal prep Sunday, mom group admin | Warm Organic |
| `mike` | Mike | 44 | Screen-sharing professional | Architecture photography, minimalist lifestyle, pour-over coffee, cycling routes | Neo-Minimal |

### Cultural Taste (3)

| ID | Name | Age | Functional Lens | Cultural Identity | Home Variation |
|----|------|-----|----------------|-------------------|---------------|
| `yuki` | Yuki | 25 | Aesthetic-first evaluator | BookTok enthusiast, Studio Ghibli completionist, cottagecore aesthetic, tea ceremony learner | Warm Organic |
| `dex` | Dex | 30 | Subculture evaluator | Vinyl DJ, graffiti-to-gallery art fan, zine maker, skate culture archivist | Memphis |
| `nora` | Nora | 55 | Luxury evaluator | Opera season ticket holder, interior design client, first-edition book collector, wine region traveler | Art Deco |

### Persona Voice Ratio
- 70% functional lens observations (accessibility, usability, etc.)
- 30% cultural reference color (comparisons, preferences, personal reactions)

### Persona Finding Structure

Each persona finding (in `src/data/personaFindings.ts`) contains:
- `tagline` (punchy one-liner in their voice)
- `observations` — array of `{ category, observation, verdict, comment }`

Categories: `TYPOGRAPHY`, `COLOR`, `LAYOUT`, `COMPONENTS`, `MOTION`, `DECORATION`
Verdicts: `good`, `needs-work`, `blocker`

---

## The Crew Panel (4 Insiders)

The production team voices. These personas represent the people who *make* AI-generated design — they understand why slop ships and can explain the industry pressures behind it. Defined in `src/data/crew.ts` (planned):

| ID | Name | Role | Cultural Identity | Voice |
|----|------|------|-------------------|-------|
| `prompter` | Alex | AI Prompt Engineer | Prompt engineering community, AI art debates, "the model is the artist" philosophy | Defensive but self-aware. Optimized for "professional tone" and got slop. |
| `junior` | Kai | Junior Designer | Design Twitter, Dribbble daily inspiration, tutorial follower, template user | Sheepish, learning. Accepted every default because the deadline was yesterday. |
| `pm` | Jordan | Product Manager | Metrics dashboards, OKR frameworks, "ship fast" culture, A/B test everything | Pragmatic, metric-focused. Conversion was identical so why invest in design? |
| `founder` | Riley | Startup Founder | Indie hacker forums, "built this in a weekend" threads, bootstrap culture | Scrappy, proud of shipping. Design is a luxury when you're pre-revenue. |

### Crew Finding Structure (Planned)

Each crew finding provides meta-commentary on WHY the design looks the way it does:
- `perspective` — their professional justification for the design choices
- `confession` — what they know is wrong but shipped anyway
- `industry_context` — the broader pressure that creates this pattern

### Why The Crew Matters

The experts say "this is bad." The crowd says "I don't like this." The crew says "here's why it shipped anyway." This creates empathy for the problem — slop isn't born from laziness, it's born from constraints. Understanding the constraints is what makes the redemption (Layer 3) meaningful.

---

## Variation Affinity Matrix

Each persona's cultural identity creates natural affinities toward certain variations. This matrix guides which 5 personas to select for each variation — always including both fans AND critics for productive tension:

| Variation | Natural Fans | Natural Critics | Recommended 5 |
|-----------|-------------|----------------|---------------|
| **SLAP** (baseline) | Nobody | Everyone | Marcus, Dorothy, Carlos, Frank, Sam |
| **Brutalist** | Frank, Sarah, Dex, Raj | Dorothy, Maya, Yuki | Frank, Sarah, Dex, Dorothy, Marcus |
| **Neo-Minimal** | Priya, Jasmine, Mike, Nora | Marcus, Raj, Kevin | Priya, Jasmine, Mike, Marcus, Kevin |
| **Maximalist** | Yuki, Nora, Diana | Frank, Priya, Sam | Yuki, Frank, Diana, Sam, Priya |
| **Dark Industrial** | Marcus, Raj, Kevin | Dorothy, Jasmine, Yuki | Marcus, Raj, Dorothy, Jasmine, Sam |
| **Warm Organic** | Dorothy, Maya, Yuki, Elena | Frank, Raj, Dex | Dorothy, Maya, Frank, Raj, Elena |
| **Retro-Futurism** | Kevin, Sam, Tommy | Sarah, Carlos, Nora | Kevin, Sam, Sarah, Carlos, Tommy |
| **Memphis** | Tommy, Dex, Kevin | Carlos, Nora, Mike | Tommy, Dex, Carlos, Nora, Mike |
| **Art Deco** | Carlos, Diana, Nora | Tommy, Dex, Kevin | Carlos, Diana, Nora, Tommy, Dex |

### Selection Principle

Each variation's recommended 5 includes 2-3 fans and 2-3 critics. The tension between affinity and aversion is what makes the persona panel interesting — a unanimous thumbs-up teaches nothing. The most insightful findings come from:
- A fan explaining WHY this variation speaks to them
- A critic explaining WHY it alienates them
- The gap between those two perspectives

### The Rotten Tomatoes Parallel

Like Rotten Tomatoes' dual score system (Critics vs. Audience), SLAP's dual panel creates moments where experts and personas disagree. An expert might score Brutalist highly for "strong visual hierarchy" while Dorothy says "the page looks broken." Both are valid. The disagreement IS the insight.

---

## The Section System

Expert findings map observations to specific content sections. Each archetype has its own section keys:

### Landing Page Sections
`hero`, `features`, `pricing`, `testimonials`, `faq`, `signup`

### Text-Heavy Sections
`opening`, `hierarchy`, `measure`, `ornament`, `ending`

### E-Commerce Sections
`products`, `cart`, `checkout`

Section keys are mapped to `SectionId` in `src/data/sectionMapping.ts`. The overlay UI uses these to highlight specific areas of the page when showing expert observations.

---

## Review Bundles

Each variation also has two review bundles (in `expertFindings.ts` alongside expert findings):

### Expert Review (`review`)
Synthesizes expert panel consensus. Contains:
- `consensus` — array of `{ text, type: 'agree' | 'disagree' }` items
- `actions` — array of `{ priority: 'high' | 'med' | 'low', text }` items

### Persona Review (`kaizen`)
Synthesizes persona panel consensus. Same structure as expert review but from the persona perspective.

---

## Archetype Coverage Matrix

| Archetype | Demo | Data | Variations | Expert Findings | Persona Findings | Review Bundles | Status |
|-----------|------|------|-----------|----------------|-----------------|---------------|--------|
| **landing-page** | done | done | 9/9 | 9/9 | 9/9 | 9/9 | COMPLETE |
| **text-heavy** | done | done | 9/9 | 9/9 | 9/9 | 9/9 | COMPLETE |
| **e-commerce** | done | done | 9/9 | 9/9 | 9/9 | 9/9 | COMPLETE |
| data-dashboard | done | done | 0/9 | 0/9 | 0/9 | 0/9 | DEMO ONLY |
| form-heavy | done | done | 0/9 | 0/9 | 0/9 | 0/9 | DEMO ONLY |
| task-management | done | done | 0/9 | 0/9 | 0/9 | 0/9 | DEMO ONLY |
| media-gallery | done | done | 0/9 | 0/9 | 0/9 | 0/9 | DEMO ONLY |
| real-time | done | done | 0/9 | 0/9 | 0/9 | 0/9 | DEMO ONLY |

**3 complete archetypes** cover the 3 most common web content patterns: marketing/conversion (landing-page), content/editorial (text-heavy), transactional (e-commerce). The remaining 5 have working demos and data but no styled variations or findings.

---

## The Core Design Tension

**Design cannot save bad content, but it can expose or elevate it.**

This is the recurring thesis across all findings:

- **Brutalist** exposes slop harshly — the honest framing reveals the content's emptiness
- **Neo-minimal** makes emptiness elegant — beautiful restraint around nothing
- **Maximalist** creates contrast — rich design makes thin content more obvious
- **Dark-industrial** projects false authority — technical precision around vague claims
- **Warm-organic** hides flaws gently — comfortable design makes slop almost tolerable
- **Retro-futurism** distracts from emptiness — fun aesthetics cover for missing substance
- **Memphis** creates tonal mismatch — playful design vs. serious content
- **Art-deco** raises expectations — luxurious framing makes mediocre content feel like a broken promise

Each variation has a different relationship to the proud-slop content. That relationship IS the finding.

---

## Genre Independence

SLAP! uses slapstick comedy as its demo genre. The proud-slop content, the roast tone, the "performer on stage" metaphor — all comedy. But the underlying structure is genre-agnostic. Genre means **content domain** — not just entertainment themes (horror, sci-fi) but also real business verticals (SaaS, fintech, healthcare, developer tools):

| Layer | Genre-Dependent | Genre-Independent |
|-------|----------------|-------------------|
| **Content** | Proud-slop comedy (the current demo genre) | Content data files (`data.ts`) — swap these to change genre |
| **Design** | None — aesthetics are genre-neutral | 9 variations, design tokens, styleguide |
| **Review panels** | Tone calibration (roast vs. analytical vs. atmospheric) | Panel structure, persona roster, affinity matrix, scoring system |
| **Pipeline** | None | All skills, phases, quality gates |

### How Genre Swapping Works

To switch from comedy to another genre:

1. **Replace content** in `src/archetypes/{archetype}/data.ts` — new headlines, articles, products matching the new genre
2. **Recalibrate tone** in findings data — comedy's "roast" becomes a SaaS genre's "conversion audit" or healthcare's "compliance review"
3. **Keep everything else** — the 9 variations, the three review panels, the pipeline, the archetypes all work unchanged

The same Brutalist variation that "exposes slop harshly" in comedy would "strip away marketing fluff" in SaaS or "confront sentimentality" in romance. The design-to-content relationship changes meaning without changing structure.

### Genre Examples

| Genre (Content Domain) | E-Commerce Products | Landing Page Copy | Expert Tone |
|------------------------|--------------------|--------------------|-------------|
| Comedy (current demo) | SlipShield socks, NovaBurst headphones | Proud-slop buzzwords | Roast / mockery |
| SaaS | Subscription tiers, API plans | B2B value propositions | Conversion audit |
| Healthcare | Patient portal features, wellness plans | Trust-first messaging | Compliance review |
| Developer Tools | CLI packages, SDK documentation | Technical positioning | Architecture critique |
| Luxury / Fashion | Curated collections, limited editions | Aspirational lifestyle | Brand authority analysis |

### Why This Matters

Genre independence means SLAP! is a reusable framework, not a one-off comedy project. The comedy gets people in the door. The structure — a pipeline with expert reviewers who have varying lenses and biases — is what they take with them.

---

## Data Architecture

All findings data lives in `src/data/`:

```
src/data/
├── experts.ts          # ExpertDef[] — 5 expert definitions
├── lenses.ts           # LensDef[] — 18 persona definitions (5 selected per variation)
├── crew.ts             # CrewDef[] — 4 industry insider definitions (planned)
├── expertFindings.ts   # Expert findings + review bundles
├── personaFindings.ts  # Persona findings
├── crewFindings.ts     # Crew meta-commentary (planned)
└── sectionMapping.ts   # Section key mapping + aggregation logic
```

LensDef now includes:
- `id`, `persona`, `category`, `tagline` (existing)
- `taste` — cultural identity one-liner (new)
- `homeVariation` — variation they naturally prefer (new)

### Key Format

All findings use a three-part composite key: `{archetype}:{variation}:{reviewer}`

Examples:
- `text-heavy:slap:marketing` — Marketing expert reviewing the SLAP baseline of text-heavy
- `landing-page:brutalist:dorothy` — Dorothy persona reviewing the brutalist landing page
- `e-commerce:art-deco:review` — Expert review bundle for art-deco e-commerce

### Lookup Functions

```typescript
getExpertFinding(slug, variationId, expertId)    // Single expert finding
getAllExpertFindings(slug, variationId)            // All 5 experts for a variation
getReviewBundle(slug, variationId, mode)          // 'review' or 'kaizen' bundle
getPersonaFindings(slug, themeId, lensId)          // Single persona finding
getAllPersonaFindings(slug, themeId)               // All 5 personas for a variation
```

---

## Entry Counts

### Current (Implemented)

Per archetype with full coverage (landing-page, text-heavy, e-commerce):

| Category | Per Variation | Per Archetype (x9) | Total (x3) |
|----------|--------------|--------------------|---------------------------------|
| Expert findings | 5 | 45 | 135 |
| Persona findings | 5 | 45 | 135 |
| Review bundles | 2 | 18 | 54 |
| **Total** | **12** | **108** | **324** |

### Planned (After Expansion)

| Category | Per Variation | Per Archetype (x9) | Total (x3) |
|----------|--------------|--------------------|---------------------------------|
| Expert findings | 5 | 45 | 135 |
| Persona findings | 5 (from 18 roster) | 45 | 135 |
| Crew findings | 4 | 36 | 108 |
| Review bundles | 3 (review + kaizen + crew) | 27 | 81 |
| **Total** | **17** | **153** | **459** |

Note: Persona findings count stays at 5 per variation (selected from 18-persona roster based on variation affinity). The roster expansion adds depth of character, not volume of entries.

---

## See Also

- `PROJECT_CONTEXT.md` — Content archetype taxonomy and per-skill mapping
- `TECH_CONTEXT.md` — Domain classification and technology context
- `DIRECTORS_NOTES.md` — Author's narrative for the landing page
- `team/references/expert-personas.md` — Full expert voice definitions
- `kaizen/references/persona-roster.md` — Full persona roster with cultural identities
- `ui-review/references/slop-research.md` — Slop pattern detection methodology
- `README.md` — Public-facing project description
