# SLAP! — True North

## What Is SLAP!

SLAP! is a **design review platform** where AI-powered experts and user personas evaluate UI designs through structured, versioned iterations. It prevents "AI slop" — the generic, forgettable aesthetic that emerges when design decisions go unchallenged.

**Core loop:**

```
Design → Review → Score → Iterate → Compare
```

Every design gets examined by 5 domain experts and 18 user personas. Each reviewer produces scored findings with traffic-light severity. Feedback gets baked into the next version, creating traceable lineage that proves craft.

---

## The Anti-Slop Promise

SLAP! exists because AI-generated designs converge to the same generic output. Purple gradients, Inter font, rounded-lg everything, blue accent by default. SLAP! breaks this by:

1. **23 pairs of eyes** — 5 experts + 18 personas, each with distinct biases and blind spots
2. **Versioned iterations** — Every design decision is traceable to specific feedback
3. **Score progression** — Aggregate and per-reviewer scores show measurable improvement
4. **Unaddressed debt** — Red findings persist across versions until fixed, preventing "sweep under the rug"

---

## Core Concepts

### Projects

A project is a UI design being reviewed. It could be a landing page, a dashboard, a checkout flow — any web UI pattern. Each project contains one or more **versions**.

### Versions

A version is a specific iteration of a design. Versions have:
- **Label** — "v1", "v2.1", etc.
- **Lineage** — Which version it was derived from
- **Shaped By** — Which personas influenced this version's design (insiders)
- **Reviews** — Expert and persona evaluations

### Reviewers

Two types of reviewers examine every design:

**Experts** (5) — Domain specialists who evaluate against professional standards:

| Expert | Focus | Color |
|--------|-------|-------|
| Marketing | Positioning, Messaging, CTA | `#FF6B6B` |
| UX | Usability, Accessibility, Flow | `#4ECDC4` |
| Product | Value Prop, ROI, Positioning | `#FFD93D` |
| Technical | Performance, Mobile, Standards | `#95E1D3` |
| Design | Visual, Branding, Aesthetics | `#F38181` |

**Personas** (18) — Fictional users representing real-world diversity across 6 categories:

| Category | Personas | What They Catch |
|----------|----------|-----------------|
| Accessibility | Marcus (colorblind), Elena (screen reader), Priya (motor) | Color-only indicators, missing labels, tiny targets |
| Tech Spectrum | Dorothy (68, minimal tech), Kevin (14, impatient), Raj (power user) | Jargon, slow loads, missing shortcuts |
| Role-Based | Carlos (CEO), Jasmine (support), Tommy (intern) | Big picture clarity, FAQ gaps, onboarding |
| Emotional State | Frank (frustrated), Diana (delighted), Sarah (skeptical) | Friction points, trust signals, moments of joy |
| Context | Sam (subway, one thumb), Maya (distracted parent), Mike (screen sharing) | Touch targets, cognitive load, embarrassing states |
| Cultural Taste | Yuki (aesthetic everything), Dex (subculture), Nora (expects luxury) | Visual consistency, brand identity, polish |

### Dual-Role Personas

The same personas serve two functions:

- **Insiders (Shaped By)** — Before a design is built, personas act as co-designers. Their biases and preferences inform design decisions. These personas get a "SHAPED THIS" badge.
- **Critics (Reviewed By)** — After a design is built, personas evaluate it from their unique perspective. This is the standard review flow.

### Reviews

Each review contains:
- **Score** (0-10) — Overall rating from this reviewer
- **Verdict** — Narrative assessment
- **Sections** — Per-section findings grouped by page area (hero, features, pricing, etc.)
- **Findings** — Individual observations with traffic-light severity:
  - **Green** — Passing (good design decision)
  - **Yellow** — Warning (could be improved)
  - **Red** — Critical (needs fixing)

### The 3-Tier Review Interface

Reviews surface through a progressive disclosure system:

```
Tier 1: Bubble Rail          Tier 2: Popover           Tier 3: Review Panel
┌──────────────────┐    ┌──────────────────────┐    ┌────────────────────────┐
│  Always visible   │    │  Quick summary        │    │  Full detailed review   │
│  right-side rail  │───>│  next to bubble       │───>│  slide-in panel         │
│  with avatars     │    │  score + chips        │    │  all findings           │
│  + aggregate      │    │  "VIEW FULL REVIEW"   │    │  section highlights     │
└──────────────────┘    └──────────────────────┘    └────────────────────────┘
```

- **Bubble Rail** — Vertical strip of reviewer avatars. Shows aggregate score. Mode toggle for experts vs personas.
- **Popover** — Appears on bubble click. Shows name, score, short verdict, severity chips per section. Hovering a chip highlights that section on the design.
- **Review Panel** — Full findings panel. Slides in from right. All findings grouped by severity.

### Section Highlighting

When reviewing, specific page sections light up:
- Glow box around the section with traffic-light color
- Annotation badge showing the finding text
- Auto-scroll for off-screen sections
- Uses `[data-section="hero"]` attributes on design components

### The Section Map Contract

The section map is the bridge between design and review. It flows through the entire pipeline:

```
/ux-planner → identifies sections (hero, features, pricing...)
    ↓
/ui-planner → maps sections to visual regions, outputs Section Map
    ↓
/create-task → implements data-section="" on each region + data-testid="" for e2e
    ↓
/kaizen + /team → generate findings keyed to section IDs
    ↓
/ui-review → validates coverage (every section reviewed, every review has a section)
    ↓
SectionHighlight → targets [data-section] for glow overlay
ReviewPanel → organizes findings by section
```

**Dual-attribute pattern on every section:**
```tsx
<section data-section="hero" data-testid="hero-section">
  <h1 data-testid="hero-headline">...</h1>
</section>
```

- `data-section` = review system (SectionHighlight finds it)
- `data-testid` = e2e testing (automated tests find it)
- Section IDs are flat: `"hero"` not `"page > hero > left"`

### State Exposure

The review system state is exposed for both e2e testing and debugging:

```typescript
window.slapState = {
  project: string,
  version: string,
  reviewMode: 'review' | 'kaizen',
  activeReviewer: string | null,
  overlayTier: 0 | 1 | 2 | 3,      // 0=none, 1=rail, 2=popover, 3=panel
  highlightedSection: string | null,
  sections: string[],                 // All data-section values in DOM
};
```

---

## Pages

### Gallery

The entry point. Shows all projects with:
- Project name and description
- Aggregate score (average across all reviewers)
- Severity breakdown (red/yellow/green dot counts)
- Version count
- Last updated timestamp

### Design Workspace

The main design view where a project version renders:
- **Center stage** — The actual design component
- **Top bar** — Project name, version selector, back button
- **Bubble Rail** — Right side, always visible
- **Popover/Panel** — Overlay system for review details
- **Section Highlights** — Inline on the design
- **Wipe Transition** — Clip-path animation when switching versions

### Roster (Future)

A dedicated page showcasing all 23 reviewers:
- Expert cards with their domain focus
- Persona cards with their background, biases, and preferred aesthetics
- Filter by category
- Click to see their reviews across all projects

### Timeline (Future)

Version history visualization:
- Score progression per reviewer
- Which findings were addressed between versions
- "Shaped By" badges showing insider influence
- Side-by-side version comparison

---

## Data Model

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  versions: Version[];
  currentVersionId: string;
}

interface Version {
  id: string;
  label: string;
  hook: string;                    // Tagline (e.g., "Raw & Honest")
  dark?: boolean;                  // Dark theme variant
  timestamp: number;
  shapedBy: string[];              // Reviewer IDs who influenced design
  component: React.ComponentType;  // The design component
  parentVersionId?: string;        // Lineage tracking
}

interface Reviewer {
  id: string;
  type: 'expert' | 'persona';
  name: string;
  role: string;
  category: string;
  color: string;                   // Unique accent color
  icon: string;                    // Emoji
  bias: string;                    // What they care about most
  taste?: string;                  // Personal flavor (personas only)
  homeVersion?: string;            // Preferred design version (personas only)
  avatarStyle: string;             // DiceBear style (shapes/adventurer)
}

interface Review {
  reviewerId: string;
  score: number;
  verdict: string;
  shortVerdict: string;
  sections: Record<string, Finding[]>;
}

interface Finding {
  text: string;
  light: 'green' | 'yellow' | 'red';
  comment: string;
}

type TrafficLight = 'green' | 'yellow' | 'red';
```

### Data Lookup Pattern

Reviews are keyed by composite ID for O(1) lookup:

```
Key format: '{projectId}:{versionId}:{reviewerId}'
Example: 'landing-page:brutalist:marketing'
```

---

## Technology Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 5 | Build tool + dev server |
| DiceBear | Deterministic avatar generation |
| CSS-in-JS (inline) | Co-located styles, no build step |
| Hash routing | SPA navigation, no server required |

### No External Dependencies

SLAP! uses zero runtime dependencies beyond React. All animation is CSS (clip-path, transforms, opacity). All state is React hooks. All routing is hash-based.

---

## Visual Identity

### The CRT Bezel

The entire UI is framed in a CRT-style bezel — a white border with rounded corners and subtle inner shadow. This frames the design under review as if it's being displayed on an analysis terminal.

### Typography

- **Overlay UI** — `'Courier New', monospace` — The analysis/review layer uses monospace for a "terminal readout" feel
- **Design content** — Varies per project/version — Each design brings its own typography

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| Score Green | `#6BCB77` | Score >= 7, passing findings |
| Score Yellow | `#FFD93D` | Score 5-6, warning findings |
| Score Red | `#FF6B6B` | Score < 5, critical findings |
| Dark Panel | `#1A1A2E` | Review panel background |
| Dark Surface | `#222240` | Popover background |
| Light Text | `#F5F0E1` | Text on dark surfaces |
| Accent Gold | `#FFD000` | Default accent, aggregate, mode toggle active |

Each reviewer has a unique accent color used for:
- Bubble border on hover/active
- Popover left border
- Avatar ring
- Name text in popover
- Score bar fill
- "VIEW FULL REVIEW" button
- Section highlight glow

### Motion Design

| Pattern | Duration | Easing |
|---------|----------|--------|
| Wipe transition | 800ms | `clip-path: inset()` |
| Panel slide | 400ms | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Popover enter | 250ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Popover exit | 100ms | Fast out |
| Bubble enter | 400ms | Staggered 60ms per bubble |
| Section enter | 250ms | Staggered 60ms per section |
| Chip hover | 150ms | `transform + box-shadow` |
| Homepage columns | 600ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### Z-Index Hierarchy

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Content | 0 | Design under review |
| CRT Bezel | 100 | DockBar/chin |
| Backdrop | 790 | Dim overlay |
| Bubble Rail | 800 | Reviewer bubbles |
| Section Highlight | 940-941 | Glow + annotation |
| Popover | 960 | Quick verdict |
| Review Panel | 1000 | Full findings |

---

## Pipeline Integration

SLAP! is built using its own skill pipeline:

```
/ux-planner → /ui-planner → /ui-review → /create-task
                                              │
                    ┌───────────────┬─────────┼──────────┐
                    v               v         v          v
              /coding-guard   /cli-first  /ux-review  /e2e-guard
                    │               │         │          │
                    └───────────────┴─────────┴──────────┘
                                    │
                                    v
                                  /e2e
```

**Design iteration flow:**

1. `/kaizen` + `/team` — Personas and experts as **insiders** shape the design direction
2. `/ux-planner` + `/ui-planner` — Plan the interaction and visual design
3. `/create-task` — Implement the design
4. `/kaizen` + `/team` — Personas and experts as **critics** review the result
5. Iterate — Feedback informs the next version, flow returns to step 1

Each iteration produces a new version with traceable lineage.

---

## Project Structure

```
SLAP/
├── .claude/
│   └── skills/              # Adapted skill pipeline
│       ├── SKILL_INDEX.md
│       ├── PROJECT_CONTEXT.md
│       ├── TECH_CONTEXT.md
│       ├── ux-planner/
│       ├── ui-planner/
│       ├── ui-review/
│       ├── create-task/
│       ├── kaizen/
│       └── team/
├── src/
│   ├── App.tsx              # Root component + state orchestration
│   ├── main.tsx             # React entry point
│   ├── router.ts            # Hash-based routing
│   ├── types.ts             # Shared TypeScript interfaces
│   ├── components/
│   │   ├── Gallery.tsx      # Project gallery (entry point)
│   │   ├── DesignWorkspace.tsx  # Main design view
│   │   ├── DemoShell.tsx    # Design wrapper (nav + content)
│   │   ├── DockBar.tsx      # CRT chin bezel
│   │   ├── WipeTransition.tsx   # Version switch animation
│   │   ├── BubbleRail.tsx   # Tier 1: reviewer bubbles
│   │   ├── BubblePopover.tsx    # Tier 2: quick verdict
│   │   ├── ReviewPanel.tsx  # Tier 3: full findings
│   │   └── SectionHighlight.tsx # Inline section glow
│   ├── data/
│   │   ├── reviewers.ts     # Unified experts + personas
│   │   ├── projects.ts      # Project definitions
│   │   └── reviews.ts       # Review data (findings)
│   ├── hooks/
│   │   ├── useRoute.ts      # Hash routing hook
│   │   └── useReviewState.ts    # Review overlay state machine
│   ├── projects/            # Design components per project
│   │   └── landing-page/
│   │       ├── components/
│   │       └── versions/
│   ├── previews/            # HTML preview files
│   └── styles/
│       └── design-tokens.css
├── tests/
│   └── lib/
│       └── test_utils.sh
├── index.html               # Entry point with CRT bezel
├── package.json
├── vite.config.ts
├── tsconfig.json
├── TRUE_NORTH.md            # This file
└── STYLEGUIDE.md            # Visual identity documentation
```

---

## Routing

Hash-based SPA routing:

```
#                           → Gallery (home)
#/{projectId}               → Latest version of project
#/{projectId}/{versionId}   → Specific version
```

Reviewer selection is UI state, not URL state. The URL identifies what you're looking at; the overlay system handles who's reviewing it.

---

## What Success Looks Like

1. **A designer uses SLAP! to iterate on a landing page.** They start with a generic design. After 3 iterations guided by expert and persona feedback, the design has a distinctive aesthetic, passes accessibility checks, and addresses all critical findings. The version timeline proves the journey.

2. **A team evaluates two design approaches.** Version A was shaped by minimalist personas (Priya, Mike). Version B was shaped by maximalist personas (Yuki, Diana). Both get reviewed. The aggregate scores and finding breakdowns inform which direction to pursue.

3. **A portfolio piece.** The iteration timeline becomes proof of craft. Not just "here's my design" but "here's how 23 reviewers challenged it and how I responded."
