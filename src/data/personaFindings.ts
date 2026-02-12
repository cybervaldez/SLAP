import type { LensDef } from '../types';
import { lenses } from './lenses';

export interface PersonaObservation {
  category: 'TYPOGRAPHY' | 'COLOR' | 'LAYOUT' | 'COMPONENTS' | 'MOTION' | 'DECORATION';
  observation: string;
  verdict: 'good' | 'needs-work' | 'blocker';
  comment: string;
}

export interface PersonaEntry {
  tagline: string;
  observations: PersonaObservation[];
}

const personaFindings: Record<string, PersonaEntry> = {
  // ─── BRUTALIST ───────────────────────────────────────────────

  'landing-page:brutalist:marcus': {
    tagline: 'High contrast saves this, but red CTAs are a gamble',
    observations: [
      {
        category: 'COLOR',
        observation: 'Red #FF0000 CTAs on white rely solely on color to convey action',
        verdict: 'needs-work',
        comment: 'The stark red buttons pop for most people, but I need a shape or icon cue too — red alone does not say "click me" to my eyes.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Black text on white background at 900 weight passes WCAG AAA easily',
        verdict: 'good',
        comment: 'This is the clearest text I have seen in any variation — the heavy black on pure white is effortless to read.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Thick 3-4px borders create strong visual boundaries without relying on color',
        verdict: 'good',
        comment: 'The heavy borders give me structural cues that do not depend on color — I appreciate that.',
      },
    ],
  },

  'landing-page:brutalist:dorothy': {
    tagline: 'Looks broken on purpose and that confuses me',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Zero border-radius and thick borders make the page feel like an error state',
        verdict: 'needs-work',
        comment: 'My first instinct was that something went wrong with the styling — I almost hit the back button.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Red #FF0000 CTA buttons are visible but feel aggressive rather than inviting',
        verdict: 'needs-work',
        comment: 'The bright red buttons look like warning signs to me — I hesitated before clicking.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Uppercase 900-weight headlines are clear but feel like shouting',
        verdict: 'needs-work',
        comment: 'I can read everything fine, but the ALL CAPS heavy text feels like the page is yelling at me.',
      },
    ],
  },

  'landing-page:brutalist:carlos': {
    tagline: 'Decisive and bold, but where is the brand warmth?',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: '900-weight uppercase headlines project absolute authority and confidence',
        verdict: 'good',
        comment: 'The typographic hierarchy is razor-sharp — this signals a brand that knows exactly what it stands for.',
      },
      {
        category: 'LAYOUT',
        observation: 'Stark white background with zero decoration strips away any brand personality',
        verdict: 'needs-work',
        comment: 'The brutalist purity is impressive, but our brand needs at least one warm element to connect with buyers.',
      },
      {
        category: 'DECORATION',
        observation: 'Monospace testimonials with thick borders look like code blocks, not social proof',
        verdict: 'needs-work',
        comment: 'Testimonials should feel human and relatable — monospace makes them feel like terminal output.',
      },
    ],
  },

  'landing-page:brutalist:frank': {
    tagline: 'Efficient to scan, harsh to use',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Zero border-radius buttons with thick borders are easy to identify as interactive',
        verdict: 'good',
        comment: 'At least I can immediately tell what is clickable — the thick-bordered rectangles are unambiguous.',
      },
      {
        category: 'LAYOUT',
        observation: 'No shadows or depth cues make it hard to tell card boundaries apart',
        verdict: 'needs-work',
        comment: 'Everything sits flat on the same plane — when I scan quickly I lose track of where sections begin and end.',
      },
    ],
  },

  'landing-page:brutalist:sam': {
    tagline: 'Heavy type dominates small screens',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: '900-weight uppercase headlines consume excessive horizontal space on mobile',
        verdict: 'needs-work',
        comment: 'The massive bold uppercase text wraps awkwardly on my phone — each headline takes up half the screen.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Thick 3-4px borders eat into already tight mobile padding',
        verdict: 'needs-work',
        comment: 'Those thick borders add up on a small screen — content feels boxed in with less room to breathe.',
      },
      {
        category: 'COLOR',
        observation: 'White background with no dark-mode option is harsh outdoors in bright light',
        verdict: 'needs-work',
        comment: 'Pure white background on my phone in daylight is actually blinding — I had to shade my screen.',
      },
    ],
  },

  // ─── E-COMMERCE: BRUTALIST ──────────────────────────────────

  'e-commerce:brutalist:marcus': {
    tagline: 'High contrast excellent, RED needs shape cues',
    observations: [
      {
        category: 'COLOR',
        observation: 'BLACK/WHITE palette provides maximum luminance contrast — best possible for color vision deficiencies',
        verdict: 'good',
        comment: 'Pure black on pure white is the gold standard for my eyes — I can read every product name and price effortlessly.',
      },
      {
        category: 'COMPONENTS',
        observation: 'RED #FF0000 "Add to Cart" buttons rely solely on color to signal action',
        verdict: 'needs-work',
        comment: 'The red buttons pop for most people, but I need an arrow icon or underline — red alone does not say "add to cart" to me.',
      },
      {
        category: 'LAYOUT',
        observation: 'Thick 3px borders create strong structural boundaries without color dependency',
        verdict: 'good',
        comment: 'The heavy borders define every card and section boundary through shape, not color — I appreciate that.',
      },
    ],
  },

  'e-commerce:brutalist:dorothy': {
    tagline: 'ALL CAPS feels like the page is shouting at me',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'ALL CAPS product names, buttons, labels, and headers create uppercase fatigue across the entire page',
        verdict: 'needs-work',
        comment: 'Everything is screaming at me in capital letters — after a few products I feel exhausted and want to leave.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: '12px product descriptions in regular weight are too small to read comfortably',
        verdict: 'needs-work',
        comment: 'The tiny descriptions disappear next to the huge bold names — I have to squint to read what the product actually is.',
      },
      {
        category: 'COMPONENTS',
        observation: 'FIELD_01/FIELD_02 checkout labels look like error codes, not form guidance',
        verdict: 'needs-work',
        comment: 'When I got to checkout and saw FIELD_01 I thought something was broken — I almost abandoned my cart.',
      },
    ],
  },

  'e-commerce:brutalist:carlos': {
    tagline: 'Monospace prices are a thesis statement — confident brand',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Courier monospace pricing against Arial Black headings creates intentional typographic tension',
        verdict: 'good',
        comment: 'The font pairing is a deliberate brand choice — monospace prices say "we are precise and transparent."',
      },
      {
        category: 'COMPONENTS',
        observation: 'Inverted BLACK cart drawer with RED price highlights feels like VIP backstage access',
        verdict: 'good',
        comment: 'The polarity flip when the cart opens is dramatic — it makes shopping here feel exclusive and intentional.',
      },
      {
        category: 'LAYOUT',
        observation: 'No product filtering, sorting, or search — discovery relies entirely on grid scanning',
        verdict: 'needs-work',
        comment: 'As the catalog grows, customers will need tools to find what they want — pure grid browsing does not scale.',
      },
    ],
  },

  'e-commerce:brutalist:frank': {
    tagline: 'Grid gap prevents mushing — spacing is consistent',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Consistent 3px gap between grid cards prevents visual collision and maintains scanability',
        verdict: 'good',
        comment: 'At least the spacing is consistent — every card has equal breathing room and nothing mushes together.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'ALL CAPS on every element — names, buttons, labels, headers — is visually exhausting',
        verdict: 'needs-work',
        comment: 'I cannot distinguish importance when everything screams at the same volume — uppercase should mark hierarchy, not everything.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart quantity +/- buttons with thick borders are unambiguously interactive',
        verdict: 'good',
        comment: 'The thick-bordered square buttons are impossible to mistake for decoration — I know exactly what to click.',
      },
    ],
  },

  'e-commerce:brutalist:sam': {
    tagline: 'Fixed grid breaks completely on my phone',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'repeat(3, 1fr) grid has no responsive breakpoint — columns collapse to ~120px on 375px viewport',
        verdict: 'blocker',
        comment: 'Three columns on my phone screen makes each product card about an inch wide — I cannot read anything or tap the buttons.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Arial Black 900 weight wraps aggressively on narrow mobile columns',
        verdict: 'needs-work',
        comment: 'The huge bold product names wrap to 3-4 lines in the tiny columns — each card is mostly just the name.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer at 380px maxWidth works well on mobile — full-width takeover',
        verdict: 'good',
        comment: 'The cart drawer fills my phone screen completely — the inverted palette works great on mobile.',
      },
    ],
  },

  // ─── E-COMMERCE: NEO-MINIMAL ──────────────────────────────

  'e-commerce:neo-minimal:marcus': {
    tagline: 'Blue accent on near-white is the safest palette for my eyes',
    observations: [
      {
        category: 'COLOR',
        observation: 'Blue #2563EB accent on #FAFAFA background provides reliable luminance contrast for most color deficiencies',
        verdict: 'good',
        comment: 'Blue is one of the safest accent colors for me \u2014 I can clearly distinguish every button and focus ring from the background.',
      },
      {
        category: 'COMPONENTS',
        observation: 'SVG star ratings with aria-labels announce rating values to screen readers',
        verdict: 'good',
        comment: 'The SVG stars render consistently and the aria-label tells me the exact rating without relying on color fill alone.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Disabled checkout button uses opacity 0.4 as the only disabled cue',
        verdict: 'needs-work',
        comment: 'The dimmed button looks the same as a normal button to me \u2014 add a text change or icon to signal disabled state.',
      },
    ],
  },

  'e-commerce:neo-minimal:dorothy': {
    tagline: 'Quiet and clean, but I had to guess where to click',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Cart badge with item count makes cart status immediately clear',
        verdict: 'good',
        comment: 'The little blue circle with a number tells me exactly how many items I have \u2014 I never lost track.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Weight 300 body text is readable but feels faint compared to bold headings',
        verdict: 'needs-work',
        comment: 'The product descriptions feel like they are whispering next to the bold product names \u2014 I had to squint slightly.',
      },
      {
        category: 'COMPONENTS',
        observation: '"Add to Cart" outlined buttons do not look clickable until I hover over them',
        verdict: 'needs-work',
        comment: 'The thin blue outline buttons look more like labels than buttons \u2014 I was not sure I could click them at first.',
      },
    ],
  },

  'e-commerce:neo-minimal:carlos': {
    tagline: 'Compressed prices signal precision \u2014 smart brand choice',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Tight -0.04em letter-spacing on prices creates a "precision engineering" brand voice',
        verdict: 'good',
        comment: 'The compressed price numbers feel deliberate and premium \u2014 like a high-end watch catalog. This IS the brand.',
      },
      {
        category: 'LAYOUT',
        observation: '2px blue accent bar on cart drawer signals a quality-conscious design team',
        verdict: 'good',
        comment: 'That thin blue line shows attention to detail \u2014 it tells customers this brand sweats the small stuff.',
      },
      {
        category: 'LAYOUT',
        observation: 'No product filtering, search, or category navigation limits catalog scalability',
        verdict: 'needs-work',
        comment: 'Six products is fine for a demo, but real catalogs need discovery tools \u2014 this will not scale.',
      },
    ],
  },

  'e-commerce:neo-minimal:frank': {
    tagline: 'Focus rings saved me \u2014 I can tab through everything',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Blue focus ring on every interactive element makes keyboard navigation reliable',
        verdict: 'good',
        comment: 'I tabbed through the entire page and always knew exactly where I was \u2014 the blue ring is subtle but impossible to miss.',
      },
      {
        category: 'COMPONENTS',
        observation: '44px quantity buttons are easy to hit without frustration',
        verdict: 'good',
        comment: 'The plus and minus buttons are big enough that I hit them on the first try every time \u2014 no rage clicks.',
      },
      {
        category: 'LAYOUT',
        observation: 'Checkout form with placeholder-only labels loses context once I start typing',
        verdict: 'needs-work',
        comment: 'I typed my name and then could not remember if the second field was city or zip \u2014 the placeholder vanished and took the label with it.',
      },
    ],
  },

  'e-commerce:neo-minimal:sam': {
    tagline: 'Auto-fill grid fits my phone perfectly',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'auto-fill grid with minmax(260px, 1fr) adapts to mobile without breaking',
        verdict: 'good',
        comment: 'The product grid went to single column on my phone automatically \u2014 every card is full width and readable.',
      },
      {
        category: 'COMPONENTS',
        observation: '44px quantity buttons exceed 44px WCAG touch target minimum',
        verdict: 'good',
        comment: 'The cart buttons are big enough for my thumb \u2014 no accidental taps on the wrong button.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Weight 300 text on system font renders acceptably on mobile but thinner than desktop',
        verdict: 'needs-work',
        comment: 'The light text looks elegant on my laptop but on my phone screen it gets a bit wispy \u2014 passable but borderline.',
      },
    ],
  },

  // ─── NEO-MINIMAL ─────────────────────────────────────────────

  'landing-page:neo-minimal:marcus': {
    tagline: 'Blue accent on light gray keeps contrast honest',
    observations: [
      {
        category: 'COLOR',
        observation: 'Blue #2563EB accent on light gray background provides reliable contrast for most color deficiencies',
        verdict: 'good',
        comment: 'Blue is one of the safest colors for me — I can clearly distinguish the accent from the gray background.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Dot navigation relies on fill color alone to indicate active state',
        verdict: 'needs-work',
        comment: 'The dots all look the same to me — I need the active dot to be larger or a different shape, not just filled.',
      },
    ],
  },

  'landing-page:neo-minimal:dorothy': {
    tagline: 'Clean but almost too quiet',
    observations: [
      {
        category: 'COMPONENTS',
        observation: '+/- FAQ toggles are immediately understandable as expand/collapse controls',
        verdict: 'good',
        comment: 'I know exactly what plus and minus mean — these toggles are the clearest interactive elements on the page.',
      },
      {
        category: 'LAYOUT',
        observation: 'Generous whitespace on light gray pushes main CTA well below the fold',
        verdict: 'needs-work',
        comment: 'I scrolled for a while before I found the main action — all that empty space made me think the page was short.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Weight 200-300 text is elegant but feels faint on light gray background',
        verdict: 'needs-work',
        comment: 'The thin text is pretty but I have to lean in to read it — it feels like it is fading away.',
      },
    ],
  },

  'landing-page:neo-minimal:carlos': {
    tagline: 'Professional restraint, but needs a signature',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Light-weight sans-serif type system conveys calm modern professionalism',
        verdict: 'good',
        comment: 'The typography signals a brand that values elegance and restraint — exactly right for premium positioning.',
      },
      {
        category: 'COLOR',
        observation: 'Single blue accent on gray is clean but lacks any distinctive brand fingerprint',
        verdict: 'needs-work',
        comment: 'This looks like every other minimalist SaaS page — we need something that makes people remember us.',
      },
      {
        category: 'LAYOUT',
        observation: 'Disciplined whitespace communicates confidence and premium quality',
        verdict: 'good',
        comment: 'The generous spacing says we do not need to cram in messaging — that projects confidence.',
      },
    ],
  },

  'landing-page:neo-minimal:frank': {
    tagline: 'Minimal means fewer things to trip over',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'scale(1.01) hover effect is so subtle it provides almost no interactive feedback',
        verdict: 'needs-work',
        comment: 'I genuinely cannot tell if buttons respond to my hover — the 1% scale change is invisible to me.',
      },
      {
        category: 'LAYOUT',
        observation: 'Clean single-column flow makes the reading path obvious and linear',
        verdict: 'good',
        comment: 'At least I know exactly where to go next — the layout guides me straight down without confusion.',
      },
    ],
  },

  'landing-page:neo-minimal:sam': {
    tagline: 'Minimalism translates well to small screens',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Light gray background with clean spacing adapts naturally to mobile viewports',
        verdict: 'good',
        comment: 'The minimal layout fits my phone perfectly — nothing breaks or overflows.',
      },
      {
        category: 'COMPONENTS',
        observation: '4px radius buttons with subtle hover need larger tap targets on touch',
        verdict: 'needs-work',
        comment: 'The buttons look nice but they are a bit slim for my thumb — could use more vertical padding.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Weight 200 text becomes difficult to read on lower-resolution mobile screens',
        verdict: 'needs-work',
        comment: 'The ultra-thin font that looks elegant on desktop turns into a faint whisper on my phone.',
      },
    ],
  },

  // ─── MAXIMALIST ──────────────────────────────────────────────

  'landing-page:maximalist:marcus': {
    tagline: 'Rich palette, risky for color differentiation',
    observations: [
      {
        category: 'COLOR',
        observation: 'Navy #1B1F3B with coral #FF6B6B and gold #D4A574 creates multiple color-dependent distinctions',
        verdict: 'needs-work',
        comment: 'The coral and gold are close enough in warmth that they blur together for me — I need shape cues to tell sections apart.',
      },
      {
        category: 'DECORATION',
        observation: 'Decorative circles use color fills as their only distinguishing feature',
        verdict: 'needs-work',
        comment: 'The floating circles are decorative, but if they carry meaning I cannot tell which is which by color alone.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Georgia serif headlines on navy provide strong contrast and large target size',
        verdict: 'good',
        comment: 'The large serif text on the dark navy background is actually quite readable for me — good luminance contrast.',
      },
    ],
  },

  'landing-page:maximalist:dorothy': {
    tagline: 'So much to look at, so little I understand',
    observations: [
      {
        category: 'LAYOUT',
        observation: '3-column grid with decorative circles and large shadows creates visual density',
        verdict: 'needs-work',
        comment: 'There are things everywhere — columns, circles, shadows — I do not know where to focus first.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rotation hover effects on cards are unexpected and disorienting on first encounter',
        verdict: 'needs-work',
        comment: 'I moved my mouse over a card and it tilted — I thought I broke something.',
      },
    ],
  },

  'landing-page:maximalist:carlos': {
    tagline: 'Bold personality, but brand voice gets noisy',
    observations: [
      {
        category: 'COLOR',
        observation: 'Navy, coral, and gold three-color palette is distinctive and memorable',
        verdict: 'good',
        comment: 'The color combination is bold and unique — people will remember this palette.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Georgia serif headlines mixed with sans body creates editorial richness',
        verdict: 'good',
        comment: 'The serif/sans mix gives us a sophisticated voice — like a high-end magazine layout.',
      },
      {
        category: 'DECORATION',
        observation: 'Large shadows and decorative circles may dilute the core brand message',
        verdict: 'needs-work',
        comment: 'The visual richness is impressive but I worry the decorative elements compete with our actual messaging.',
      },
    ],
  },

  'landing-page:maximalist:frank': {
    tagline: 'Beautiful chaos, but I just need to find the button',
    observations: [
      {
        category: 'MOTION',
        observation: 'Rotation hover effects on cards cause layout shifts that break scanning flow',
        verdict: 'needs-work',
        comment: 'Every time I hover on a card it rotates and I lose my place — I just want to click, not watch an animation.',
      },
      {
        category: 'LAYOUT',
        observation: '3-column grid with large shadows makes identifying the primary action slow',
        verdict: 'needs-work',
        comment: 'Everything has equal visual weight with those big shadows — nothing says "this is the main thing."',
      },
      {
        category: 'COMPONENTS',
        observation: 'Multiple styled elements compete for click priority on every viewport',
        verdict: 'needs-work',
        comment: 'Coral buttons, gold accents, circle decorations — I am clicking everywhere trying to figure out what is actionable.',
      },
    ],
  },

  'landing-page:maximalist:sam': {
    tagline: '3-column grid fights small screens',
    observations: [
      {
        category: 'LAYOUT',
        observation: '3-column grid must collapse to single column on mobile, creating excessive page length',
        verdict: 'needs-work',
        comment: 'The three columns stack into a massive scroll on my phone — I thumb-scrolled for what felt like forever.',
      },
      {
        category: 'DECORATION',
        observation: 'Large shadows and decorative circles add rendering weight on mobile GPU',
        verdict: 'needs-work',
        comment: 'My phone gets noticeably sluggish scrolling through all these shadow effects and floating circles.',
      },
      {
        category: 'MOTION',
        observation: 'Rotation hover effects do not translate to touch — tap-and-hold triggers them awkwardly',
        verdict: 'needs-work',
        comment: 'The rotation that is fun with a mouse does nothing useful on touch — it just makes cards wobble when I long-press.',
      },
    ],
  },

  // ─── DARK-INDUSTRIAL ─────────────────────────────────────────

  'landing-page:dark-industrial:marcus': {
    tagline: 'Gold on black is safe, but charcoal cards vanish',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold #D4A574 accent on near-black #0A0A0F provides adequate contrast for most color deficiencies',
        verdict: 'good',
        comment: 'Gold on near-black is one of the safer dark-mode combos for my eyes — the luminance difference is clear.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Charcoal cards on near-black background create minimal boundary contrast',
        verdict: 'needs-work',
        comment: 'The cards barely separate from the background — I cannot tell where one section ends and the next begins.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace text in light color on dark background can cause halation for low-vision users',
        verdict: 'needs-work',
        comment: 'The light monospace text bleeds and glows slightly on the dark background, making long reads tiring.',
      },
    ],
  },

  'landing-page:dark-industrial:dorothy': {
    tagline: 'Feels like I opened a developer tool by accident',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Terminal-style > prefixes and monospace text feel like command-line output, not a website',
        verdict: 'needs-work',
        comment: 'The > symbols and typewriter font make me feel like I accidentally opened the wrong program.',
      },
      {
        category: 'COMPONENTS',
        observation: '[+] toggle markers are unusual but guessable as expand/collapse once you try one',
        verdict: 'needs-work',
        comment: 'I did not know what [+] meant at first, but after clicking one I understood — a label would help.',
      },
    ],
  },

  'landing-page:dark-industrial:carlos': {
    tagline: 'Strong tech credibility, narrow audience appeal',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold accent on near-black projects premium technical authority',
        verdict: 'good',
        comment: 'The dark-and-gold palette says "serious infrastructure tool" — perfect for developer audiences.',
      },
      {
        category: 'LAYOUT',
        observation: 'Charcoal card grid with terminal styling feels like a dashboard for engineers',
        verdict: 'good',
        comment: 'Technical buyers will love this — it signals that we build tools for people who build tools.',
      },
      {
        category: 'DECORATION',
        observation: 'Terminal aesthetic may actively repel non-technical decision makers',
        verdict: 'needs-work',
        comment: 'Our marketing VP took one look and said "this is not for our enterprise clients."',
      },
    ],
  },

  'landing-page:dark-industrial:frank': {
    tagline: 'Dark interfaces swallow interactive cues',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Gold glow hovers provide clear feedback but only on mouse — no focus-visible equivalent',
        verdict: 'needs-work',
        comment: 'The gold glow on hover is actually nice feedback, but I cannot see anything similar when tabbing with keyboard.',
      },
      {
        category: 'LAYOUT',
        observation: 'Near-black background with charcoal cards makes section boundaries ambiguous',
        verdict: 'needs-work',
        comment: 'Everything blends into one dark mass — I keep scrolling past sections because I cannot see the edges.',
      },
      {
        category: 'COLOR',
        observation: 'Gold accent used sparingly means most interactive elements lack clear affordance',
        verdict: 'needs-work',
        comment: 'Only a few things are gold-highlighted — the rest of the interactive elements hide in the darkness.',
      },
    ],
  },

  'landing-page:dark-industrial:sam': {
    tagline: 'Dark mode and daylight do not mix',
    observations: [
      {
        category: 'COLOR',
        observation: 'Near-black #0A0A0F background washes out completely in direct sunlight',
        verdict: 'blocker',
        comment: 'I tried reading this outside and my screen was just a mirror — the dark background is invisible in daylight.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Gold glow hover effects are GPU-intensive on mobile devices',
        verdict: 'needs-work',
        comment: 'The glow animations make my mid-range phone stutter — smooth on desktop, choppy on mobile.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace font wastes horizontal space on narrow mobile viewports',
        verdict: 'needs-work',
        comment: 'Every monospace character is the same width, so text wraps way more often on my phone.',
      },
    ],
  },

  // ─── WARM-ORGANIC ────────────────────────────────────────────

  'landing-page:warm-organic:marcus': {
    tagline: 'Earth tones are naturally safe for color vision',
    observations: [
      {
        category: 'COLOR',
        observation: 'Forest green and warm brown on cream #FDF6EE rely on luminance, not hue — safe for most deficiencies',
        verdict: 'good',
        comment: 'These earth tones work with my color vision because the lightness differences carry the meaning, not the hues.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Emoji features could be hard to distinguish for users with certain visual impairments',
        verdict: 'needs-work',
        comment: 'The emoji icons are small and decorative — if they carry meaning, I need text labels alongside them.',
      },
    ],
  },

  'landing-page:warm-organic:dorothy': {
    tagline: 'Friendly and inviting — I trust this page',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headlines with generous line height feel warm and easy to read',
        verdict: 'good',
        comment: 'The text feels like a friendly letter — the serif font and spacing make me want to keep reading.',
      },
      {
        category: 'COMPONENTS',
        observation: '16px rounded buttons on cream background are clearly clickable and inviting',
        verdict: 'good',
        comment: 'The soft rounded buttons look like real buttons I want to press — very obvious and comfortable.',
      },
      {
        category: 'DECORATION',
        observation: 'Blob gradients are pretty but make the page structure harder to scan quickly',
        verdict: 'needs-work',
        comment: 'The blobby background shapes are nice decoration but they make it harder for me to find specific sections.',
      },
    ],
  },

  'landing-page:warm-organic:carlos': {
    tagline: 'Trustworthy warmth, but is it serious enough?',
    observations: [
      {
        category: 'COLOR',
        observation: 'Cream, forest green, and warm brown create an approachable, trust-building palette',
        verdict: 'good',
        comment: 'The warm palette immediately builds trust — this feels like a brand that cares about people.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headlines project editorial authority alongside the warm visual language',
        verdict: 'good',
        comment: 'Serif headings add just enough gravitas to balance the warmth — smart typographic choice.',
      },
      {
        category: 'DECORATION',
        observation: 'Emoji features and bouncy easing risk feeling too playful for enterprise buyers',
        verdict: 'needs-work',
        comment: 'The bouncing animations and emoji are charming, but our enterprise clients might see them as unserious.',
      },
    ],
  },

  'landing-page:warm-organic:frank': {
    tagline: 'Soothing pace, but I need to get things done',
    observations: [
      {
        category: 'MOTION',
        observation: 'Bouncy easing on interactions feels natural but delays task completion',
        verdict: 'needs-work',
        comment: 'The bouncy animations are cute the first time, but by the fifth click I just want things to happen instantly.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Forest green CTAs on cream background have adequate contrast and clear affordance',
        verdict: 'good',
        comment: 'The green buttons on cream are easy to spot and obviously clickable — that part works well.',
      },
    ],
  },

  'landing-page:warm-organic:sam': {
    tagline: 'Organic shapes play nice with touch screens',
    observations: [
      {
        category: 'COMPONENTS',
        observation: '16px radius buttons provide generous touch targets above 44px minimum',
        verdict: 'good',
        comment: 'The big rounded buttons are perfect for tapping — easy to hit every time on my phone.',
      },
      {
        category: 'DECORATION',
        observation: 'Blob gradients add rendering overhead on lower-powered mobile GPUs',
        verdict: 'needs-work',
        comment: 'The blob gradient backgrounds make my older phone stutter during scrolling.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy easing animations feel smooth on flagship phones but janky on budget devices',
        verdict: 'needs-work',
        comment: 'The bounce effects are buttery on a new iPhone but choppy on my budget Android.',
      },
    ],
  },

  // ─── RETRO-FUTURISM ─────────────────────────────────────────

  'landing-page:retro-futurism:marcus': {
    tagline: 'Neon gradients are a minefield for color vision',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal, purple, and pink neon on dark #0F0B1A create hue-dependent distinctions that fail for deuteranopia',
        verdict: 'blocker',
        comment: 'The teal and pink look nearly identical to me against the dark background — I cannot distinguish navigation items.',
      },
      {
        category: 'DECORATION',
        observation: 'Glow shadows blur letterforms and reduce text sharpness',
        verdict: 'needs-work',
        comment: 'The neon glow around text makes every letter fuzzy — like reading through frosted glass.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Gradient borders use color progression as the only interactive indicator',
        verdict: 'needs-work',
        comment: 'The gradient border shift on hover is invisible to me — I need a size or shape change too.',
      },
    ],
  },

  'landing-page:retro-futurism:dorothy': {
    tagline: 'Stunning to look at, confusing to use',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Gradient text-clip effects make headlines eye-catching but unfamiliar as interactive patterns',
        verdict: 'needs-work',
        comment: 'The rainbow text is beautiful but I am not sure if it is a heading, a link, or just decoration.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Gradient text on dark background can be hard to read in smaller sizes',
        verdict: 'needs-work',
        comment: 'The colorful text is gorgeous in big headlines but blurry and confusing in smaller print.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Glow hover effects are visually exciting but do not follow standard interaction patterns',
        verdict: 'needs-work',
        comment: 'Things glow when I hover, which is cool, but I am never sure if that means clickable or just decorative.',
      },
    ],
  },

  'landing-page:retro-futurism:carlos': {
    tagline: 'Unforgettable presence, polarizing audience fit',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Max saturation neon palette creates an instantly recognizable brand experience',
        verdict: 'good',
        comment: 'Nobody forgets this page — the neon vaporwave identity is unique in our competitive space.',
      },
      {
        category: 'COLOR',
        observation: 'Teal/purple/pink neon palette may alienate conservative enterprise decision makers',
        verdict: 'needs-work',
        comment: 'This is perfect for a creative audience, but our enterprise pipeline might see it as unserious.',
      },
    ],
  },

  'landing-page:retro-futurism:frank': {
    tagline: 'All spectacle, maximum friction',
    observations: [
      {
        category: 'MOTION',
        observation: 'Max saturation combined with glow animations creates visual fatigue within seconds',
        verdict: 'blocker',
        comment: 'My eyes are exhausted after ten seconds — the constant neon glow and motion makes me want to close the tab.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Gradient borders make button boundaries ambiguous — where does decoration end and action begin?',
        verdict: 'needs-work',
        comment: 'I cannot tell where the button edge is because the glow bleeds outward — I keep misclicking.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dark #0F0B1A background with neon elements creates strong visual hierarchy through contrast',
        verdict: 'good',
        comment: 'At least the glowing elements stand out clearly against the dark background — I know what to look at.',
      },
    ],
  },

  'landing-page:retro-futurism:sam': {
    tagline: 'Neon dreams drain real batteries',
    observations: [
      {
        category: 'DECORATION',
        observation: 'CSS glow shadows and gradient effects are GPU-intensive and drain mobile battery quickly',
        verdict: 'blocker',
        comment: 'My phone gets warm within a minute and the battery visibly drops — this page is an energy hog.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dark background with high-saturation neon is difficult to read in outdoor sunlight',
        verdict: 'needs-work',
        comment: 'Between the dark background washing out and the neon being too thin, this page vanishes in daylight.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Gradient border buttons have adequate size but glow obscures precise tap boundaries',
        verdict: 'needs-work',
        comment: 'The glow around buttons makes it unclear where exactly the tap target ends on touchscreen.',
      },
    ],
  },

  // ─── SLAP ─────────────────────────────────────────────────────

  'landing-page:slap:marcus': {
    tagline: 'Purple on light gray is the blandest safe choice',
    observations: [
      {
        category: 'COLOR',
        observation: 'Purple #8B5CF6 accent has decent contrast but zero thought for color-deficient users',
        verdict: 'needs-work',
        comment: 'The purple passes contrast checks on paper, but it was not chosen with accessibility in mind — it is just the AI default. No secondary cue exists for any color-dependent element.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Buttons rely on purple fill as the only affordance — no shape, icon, or underline cue',
        verdict: 'needs-work',
        comment: 'If I cannot perceive the purple, the CTA buttons look like plain rectangles with text. Add an arrow icon or underline to signal action.',
      },
      {
        category: 'COLOR',
        observation: 'Success and error states use default green/red with no non-color indicator',
        verdict: 'needs-work',
        comment: 'Form validation uses green for success and red for error with no icon or text change. I cannot distinguish them reliably.',
      },
    ],
  },

  'landing-page:slap:dorothy': {
    tagline: 'It works, but I have already forgotten what it looked like',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Layout is clear and scannable — standard single-column flow guides the eye',
        verdict: 'good',
        comment: 'I can follow the page from top to bottom without confusion. The sections are in the order I expected.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Nothing on the page guides my attention — no visual anchor, no emphasis, no hierarchy beyond size',
        verdict: 'needs-work',
        comment: 'I read the whole page but nothing stuck. There is no moment where the design says "look here" — everything has the same visual weight.',
      },
      {
        category: 'COLOR',
        observation: 'Success state after signup uses Tailwind default green — feels like a system message, not a celebration',
        verdict: 'needs-work',
        comment: 'After I signed up, the green checkmark felt like a browser confirmation, not a welcome moment. I expected something branded.',
      },
    ],
  },

  'landing-page:slap:carlos': {
    tagline: 'This is what AI generates when you do not give it a brief',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'System font stack conveys zero brand personality — it is the absence of a typographic choice',
        verdict: 'needs-work',
        comment: 'System fonts are fast but they communicate nothing. Every OS renders this differently — there is no consistent brand voice across platforms.',
      },
      {
        category: 'COLOR',
        observation: 'Purple #8B5CF6 with no supporting palette is not a color system — it is a placeholder',
        verdict: 'needs-work',
        comment: 'One purple accent on a white page is not a brand. It is what happens when AI picks a color and nobody refines it.',
      },
      {
        category: 'DECORATION',
        observation: '8px border-radius on every element makes the page indistinguishable from 10,000 other AI-generated sites',
        verdict: 'needs-work',
        comment: 'The uniform radius is the design equivalent of beige paint — safe, forgettable, and intentionally inoffensive. Our brand deserves a point of view.',
      },
    ],
  },

  'landing-page:slap:frank': {
    tagline: 'Functional focus states but nothing intentional',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Focus ring is just a border-color change to the purple accent — functional but not designed',
        verdict: 'needs-work',
        comment: 'I can see where focus is, but the ring is just the accent color on the border. No offset, no custom width, no animation — the minimum viable effort.',
      },
      {
        category: 'LAYOUT',
        observation: 'Tab order follows DOM order correctly — no skip links but no traps either',
        verdict: 'needs-work',
        comment: 'I can tab through everything in order, which is good. But there are no skip links and no ARIA landmarks to help me jump to sections.',
      },
      {
        category: 'COMPONENTS',
        observation: 'No ARIA landmarks on major page sections — screen readers get no structural shortcuts',
        verdict: 'needs-work',
        comment: 'The page has no nav, main, or complementary landmarks. Screen reader users must traverse every element linearly.',
      },
    ],
  },

  'landing-page:slap:sam': {
    tagline: 'Loads fast because there is nothing here',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'System fonts mean zero font loading latency — fastest text rendering possible',
        verdict: 'good',
        comment: 'No web fonts to download. Text appears instantly on my phone. That part is genuinely good.',
      },
      {
        category: 'LAYOUT',
        observation: 'No visual richness on small screens — the page feels empty rather than minimal',
        verdict: 'needs-work',
        comment: 'On my phone the page is just text blocks with a purple button. There is nothing to look at — it feels like a document, not a product.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Form inputs have tight padding and small touch targets on mobile',
        verdict: 'needs-work',
        comment: 'The email input and submit button are cramped on my phone. I have to be precise to tap the right spot.',
      },
    ],
  },

  // ─── E-COMMERCE: SLAP ──────────────────────────────────────────

  'e-commerce:slap:marcus': {
    tagline: 'Red buttons with no shape cue — seen this a thousand times',
    observations: [
      {
        category: 'COLOR',
        observation: 'Red #EF4444 CTA buttons rely on color alone to signal "add to cart" action',
        verdict: 'needs-work',
        comment: 'The red buttons are visible to most people but to me they look like plain rectangles. Add a cart icon or arrow to convey action without depending on color.',
      },
      {
        category: 'COLOR',
        observation: 'Product category blocks use color-only differentiation between categories',
        verdict: 'needs-work',
        comment: 'The colored placeholder blocks all look like similar gray rectangles to me. If category matters, add a text label or icon overlay.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Checkout step indicator uses color fill to show progress — no secondary cue',
        verdict: 'needs-work',
        comment: 'The active step is filled and the inactive ones are empty circles. Add a checkmark or number to make progress readable without color.',
      },
    ],
  },

  'e-commerce:slap:dorothy': {
    tagline: 'Looks like a homework assignment, not a real store',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Colored placeholder blocks instead of product images look broken, not designed',
        verdict: 'needs-work',
        comment: 'My first thought was that the images failed to load. The colored rectangles do not look intentional — they look like errors.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Product names are small and descriptions are minimal — hard to know what I am buying',
        verdict: 'needs-work',
        comment: 'I cannot tell much about the products from a short name and one sentence. I need more detail to feel confident purchasing.',
      },
      {
        category: 'LAYOUT',
        observation: 'No browse guidance — no categories, no "start here," no featured products',
        verdict: 'needs-work',
        comment: 'I landed on the page and just saw a grid of colored blocks. Nobody told me where to start or what is popular.',
      },
    ],
  },

  'e-commerce:slap:carlos': {
    tagline: 'No brand, no story, no reason to shop here',
    observations: [
      {
        category: 'COLOR',
        observation: 'Generic red #EF4444 accent says "template store" — zero brand identity in the shopping experience',
        verdict: 'needs-work',
        comment: 'The red accent could belong to any e-commerce template. There is no visual merchandising, no brand story, nothing that says why this store exists.',
      },
      {
        category: 'LAYOUT',
        observation: 'No visual merchandising — products are in a flat grid with no hierarchy or curation',
        verdict: 'needs-work',
        comment: 'Real stores create visual stories — featured items, editorial layouts, curated collections. This is just a database dump into cards.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer has no brand treatment — white panel with plain text and a red button',
        verdict: 'needs-work',
        comment: 'The cart is where purchase intent peaks. This cart feels like a spreadsheet. Add brand presence where it matters most.',
      },
    ],
  },

  'e-commerce:slap:frank': {
    tagline: 'Keyboard checkout works but needs labels and landmarks',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'No persistent labels on form inputs — placeholders vanish when typing begins',
        verdict: 'needs-work',
        comment: 'I tabbed into the first checkout field and started typing, then forgot what the field was for. The placeholder disappeared and took the context with it.',
      },
      {
        category: 'LAYOUT',
        observation: 'No ARIA landmarks on products, cart, or checkout regions',
        verdict: 'needs-work',
        comment: 'I cannot jump from the product grid to checkout with a screen reader shortcut. Everything is a flat sequence of elements.',
      },
      {
        category: 'COMPONENTS',
        observation: 'No skip-to-checkout link for users who know what they want',
        verdict: 'needs-work',
        comment: 'If I already added items to my cart, I have to tab through the entire product grid to reach the checkout button. A skip link would save me.',
      },
    ],
  },

  'e-commerce:slap:sam': {
    tagline: 'Passable on mobile but the grid jumps around',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'minmax(240px, 1fr) grid reflows unpredictably between 1 and 2 columns on mid-size phones',
        verdict: 'needs-work',
        comment: 'On my phone the grid keeps switching between one and two columns as I rotate or resize. The layout shift is disorienting.',
      },
      {
        category: 'COMPONENTS',
        observation: '"Add to Cart" button is small and close to other tap targets',
        verdict: 'needs-work',
        comment: 'The add-to-cart button is too small for my thumb. I keep accidentally tapping the product name instead of the button.',
      },
      {
        category: 'LAYOUT',
        observation: 'Cart drawer at max-width works well as a mobile takeover',
        verdict: 'good',
        comment: 'The cart drawer fills my phone screen when open. That part works — full-width on mobile is the right choice.',
      },
    ],
  },

  // ─── MEMPHIS / NEO-POP ──────────────────────────────────────────

  'landing-page:memphis:marcus': {
    tagline: 'Three accent colors might save me — or drown me',
    observations: [
      {
        category: 'COLOR',
        observation: 'Three-color accent system (#FF6B9D, #4ECDC4, #FFE66D) creates high variety but all have good contrast on cream background',
        verdict: 'good',
        comment: 'The pink, teal, and yellow are all distinguishable even with my color vision. The variety actually helps — I can tell card types apart by more than just hue.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Offset shadows use solid color — provides non-color boundary cue',
        verdict: 'good',
        comment: 'The thick offset shadows give every card and button a physical edge. Even without color, the shadow shape tells me where things are.',
      },
      {
        category: 'COLOR',
        observation: 'CTA buttons rely on background color fill but also have thick borders and offset shadows',
        verdict: 'good',
        comment: 'These buttons have three affordances: color fill, thick border, and offset shadow. Even if I miss the color, the shape screams "click me."',
      },
    ],
  },

  'landing-page:memphis:dorothy': {
    tagline: 'I will never forget this website — for better or worse',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Bold layout with clear sections and large text makes navigation intuitive',
        verdict: 'good',
        comment: 'Everything is big and obvious. I know exactly where to look and what to click. This is much clearer than those subtle gray-on-white sites.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Impact font headlines are loud but scannable — clear hierarchy from heading to body',
        verdict: 'good',
        comment: 'The big bold headlines tell me what each section is about instantly. I do not have to squint or guess.',
      },
      {
        category: 'DECORATION',
        observation: 'Geometric shapes and bright colors are visually stimulating — might feel busy to some',
        verdict: 'needs-work',
        comment: 'I like that it is colorful and lively, but after scrolling for a while my eyes get a bit tired. Could the colors calm down further into the page?',
      },
    ],
  },

  'landing-page:memphis:carlos': {
    tagline: 'Finally, a page with actual design opinions',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Memphis identity is consistent across every element — shadows, colors, borders all speak the same language',
        verdict: 'good',
        comment: 'This is what brand consistency looks like. Every card, button, and section feels like part of the same family. You could not swap these components into another site.',
      },
      {
        category: 'COLOR',
        observation: 'Three-color system with cream background creates instant recognition — no other variation looks like this',
        verdict: 'good',
        comment: 'Pink, teal, and yellow on cream — I can identify this brand from a thumbnail. That is the test of real design.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Impact for headlines + Trebuchet MS for body is a deliberate contrast — not a default pairing',
        verdict: 'good',
        comment: 'Someone chose these fonts on purpose. Impact screams "look at me" and Trebuchet says "now read this." Intentional hierarchy.',
      },
    ],
  },

  'landing-page:memphis:frank': {
    tagline: 'Bold visual style, but keyboard experience needs attention',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Focus states use accent color borders — visible against cream background',
        verdict: 'good',
        comment: 'When I tab through, the focus rings are thick and colorful. I can actually see where I am on this page — much better than a thin blue outline.',
      },
      {
        category: 'LAYOUT',
        observation: 'Tab order follows visual layout — hero, features, pricing, FAQ, signup',
        verdict: 'good',
        comment: 'Tab order matches what I see on screen. No surprises, no jumping around. Logical and predictable.',
      },
      {
        category: 'COMPONENTS',
        observation: 'FAQ accordion needs ARIA expanded/collapsed states for screen readers',
        verdict: 'needs-work',
        comment: 'The accordion works with keyboard but I cannot tell if a section is open or closed without looking. Add aria-expanded.',
      },
    ],
  },

  'landing-page:memphis:sam': {
    tagline: 'System fonts load instantly — the page feels snappy on mobile',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Impact and Trebuchet MS are system fonts — zero web font loading on mobile',
        verdict: 'good',
        comment: 'This page loads instantly on my phone. No flash of unstyled text, no layout shift from fonts loading. Snappy.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Offset shadows add visual depth without extra images or heavy CSS',
        verdict: 'good',
        comment: 'The shadows are pure CSS — no images to download. The page looks rich but loads light.',
      },
      {
        category: 'LAYOUT',
        observation: 'Bold elements are large enough for thumb targets on mobile',
        verdict: 'good',
        comment: 'The Memphis style actually helps on mobile — everything is big and bold, easy to tap. No tiny targets.',
      },
    ],
  },

  'e-commerce:memphis:marcus': {
    tagline: 'Product cards use shape and shadow, not just color — good for me',
    observations: [
      {
        category: 'COLOR',
        observation: 'Product category colors are supplemented by card shape and shadow treatment',
        verdict: 'good',
        comment: 'Even though categories use different colors, each card also has thick borders and offset shadows. I can browse by shape and position, not just color.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add-to-cart buttons have thick borders + color fill + offset shadow — triple affordance',
        verdict: 'good',
        comment: 'These buttons are impossible to miss. Border, fill, and shadow all say "interactive." Best button accessibility of any e-commerce variation.',
      },
      {
        category: 'LAYOUT',
        observation: 'Cart item rows use clear separator borders, not just spacing',
        verdict: 'good',
        comment: 'Cart items are separated by thick borders, not just whitespace. I can distinguish each item clearly.',
      },
    ],
  },

  'e-commerce:memphis:dorothy': {
    tagline: 'This store feels like a toy shop — bright, fun, and easy to use',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product grid is clear with big cards and obvious add-to-cart buttons',
        verdict: 'good',
        comment: 'I can see every product clearly. The buttons are big and obvious. I know exactly what to click to add something to my cart.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer is straightforward — items, quantities, total, checkout button',
        verdict: 'good',
        comment: 'The cart shows me exactly what I have, how much it costs, and how to pay. Simple and clear.',
      },
      {
        category: 'DECORATION',
        observation: 'Colorful product placeholders look intentional with Memphis styling, not broken',
        verdict: 'good',
        comment: 'Usually colored boxes instead of product photos look like errors. But here they look like they belong — like the store is supposed to be colorful and fun.',
      },
    ],
  },

  'e-commerce:memphis:carlos': {
    tagline: 'This store has a personality — customers will remember shopping here',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Memphis identity persists from product browsing through cart to checkout',
        verdict: 'good',
        comment: 'The brand experience never drops. From first product to final checkout, this feels like one cohesive brand. That is rare in e-commerce.',
      },
      {
        category: 'COLOR',
        observation: 'Three-color accent cycling on product cards creates visual merchandising effect',
        verdict: 'good',
        comment: 'The cycling colors make the grid feel curated, like a visual merchandiser arranged the display. Products feel presented, not just listed.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Checkout maintains Memphis personality without becoming distracting',
        verdict: 'good',
        comment: 'Bold borders and accents continue through checkout, but form fields stay clean and readable. Good balance of brand and function.',
      },
    ],
  },

  'e-commerce:memphis:frank': {
    tagline: 'Cart and checkout keyboard flow works — product grid needs tab refinement',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Product cards have keyboard-accessible add-to-cart buttons',
        verdict: 'good',
        comment: 'I can tab to each product\'s add-to-cart button and hit Enter. The bold focus states are clearly visible.',
      },
      {
        category: 'LAYOUT',
        observation: 'Cart drawer traps focus appropriately when open',
        verdict: 'good',
        comment: 'When the cart opens, Tab stays inside the drawer. I am not accidentally tabbing to products behind it.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Checkout form inputs need visible labels, not just placeholders',
        verdict: 'needs-work',
        comment: 'Once I start typing, the placeholder disappears and I cannot remember what field I am in. Add persistent labels above inputs.',
      },
    ],
  },

  'e-commerce:memphis:sam': {
    tagline: 'Fast, bold, and thumb-friendly on mobile',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'System fonts mean zero font-loading delay on mobile networks',
        verdict: 'good',
        comment: 'The store loads instantly on my phone. Impact and Trebuchet MS are already there. No flash of invisible text.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Bold buttons and thick borders create large, easy tap targets',
        verdict: 'good',
        comment: 'Everything is big enough to tap with my thumb. The Memphis style actually improves mobile usability — nothing is tiny.',
      },
      {
        category: 'LAYOUT',
        observation: 'Product grid reflows cleanly to single column on narrow screens',
        verdict: 'good',
        comment: 'On my phone the products stack nicely into one column. No awkward in-between states.',
      },
    ],
  },

  // ─── ART DECO ───────────────────────────────────────────────────

  'landing-page:art-deco:marcus': {
    tagline: 'Gold on cream is elegant but needs careful contrast management',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold #B8860B on cream #FAF7F0 has a contrast ratio of approximately 3.5:1 — below WCAG AA for body text',
        verdict: 'needs-work',
        comment: 'The gold text looks beautiful but it is hard for me to read against cream at small sizes. Use gold for accents and headings, not body text.',
      },
      {
        category: 'COLOR',
        observation: 'Navy #1B2838 on cream provides excellent contrast for primary text',
        verdict: 'good',
        comment: 'The dark navy text on cream is effortless to read. Use this for anything important.',
      },
      {
        category: 'DECORATION',
        observation: 'Diamond ornaments use gold against cream — low contrast but decorative, not informational',
        verdict: 'good',
        comment: 'The diamond dividers are decorative only — I do not need to read them. Low contrast is acceptable here because they carry no information.',
      },
    ],
  },

  'landing-page:art-deco:dorothy': {
    tagline: 'This feels fancy and trustworthy — like a real business, not a startup',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headlines (Georgia) feel authoritative and easy to read at large sizes',
        verdict: 'good',
        comment: 'The fancy lettering in the headlines makes this look like a proper business. I trust it more than those modern blocky letters.',
      },
      {
        category: 'LAYOUT',
        observation: 'Generous spacing and clear sections make the page easy to follow',
        verdict: 'good',
        comment: 'Everything has room to breathe. I am not overwhelmed — each section is clearly separated by those pretty diamond shapes.',
      },
      {
        category: 'DECORATION',
        observation: 'Gold borders and ornaments add elegance without clutter',
        verdict: 'good',
        comment: 'The gold decorations make the page feel special without making it confusing. They add beauty without getting in the way.',
      },
    ],
  },

  'landing-page:art-deco:carlos': {
    tagline: 'Luxury positioning through design — this is how you charge premium prices',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold-navy-cream palette communicates premium positioning instantly',
        verdict: 'good',
        comment: 'This palette is historically associated with luxury: gold for value, navy for authority, cream for refinement. The brand positioning is built into the colors.',
      },
      {
        category: 'DECORATION',
        observation: 'Stepped double-borders and diamond ornaments reference Art Deco history intentionally',
        verdict: 'good',
        comment: 'These are not random decorations — they reference the Chrysler Building, 1920s typography, and jazz-age luxury. The design has cultural depth.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Georgia for headlines + Optima for body is a rare, intentional pairing',
        verdict: 'good',
        comment: 'Georgia is classical authority. Optima is humanist elegance. Together they say "established but refined." No AI would pair these fonts.',
      },
    ],
  },

  'landing-page:art-deco:frank': {
    tagline: 'Elegant visual design, but gold focus states need more contrast',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Gold focus outlines on cream background may not meet WCAG 2.1 focus-visible contrast (3:1)',
        verdict: 'needs-work',
        comment: 'When I tab through, the gold focus ring is pretty but faint against cream. I need a darker gold or a supplementary outline for focus visibility.',
      },
      {
        category: 'LAYOUT',
        observation: 'Tab order follows the natural reading flow — logical and predictable',
        verdict: 'good',
        comment: 'Tab progresses through hero, features, pricing, FAQ, signup in order. No surprises.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Interactive elements have both visual and structural affordances',
        verdict: 'good',
        comment: 'Buttons have borders, fill, and hover states. I can identify them by structure, not just color. The Art Deco borders help with boundary perception.',
      },
    ],
  },

  'landing-page:art-deco:sam': {
    tagline: 'System-adjacent fonts and CSS-only decorations keep it light on mobile',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Georgia and Optima are widely available — minimal or zero font loading on most devices',
        verdict: 'good',
        comment: 'Georgia is on every device. Optima is on Apple devices and fallback Candara/Segoe UI covers Windows. Fast rendering everywhere.',
      },
      {
        category: 'DECORATION',
        observation: 'Diamond ornaments use CSS transform rotate(45deg) — zero image overhead',
        verdict: 'good',
        comment: 'All the fancy decorations are pure CSS. No images to download, no SVGs to parse. The luxury look costs nothing in bandwidth.',
      },
      {
        category: 'LAYOUT',
        observation: 'Stepped borders and gold treatments scale well to narrow viewports',
        verdict: 'good',
        comment: 'On my phone the gold borders and decorations shrink proportionally. Nothing breaks or overflows. The luxury feel survives small screens.',
      },
    ],
  },

  'e-commerce:art-deco:marcus': {
    tagline: 'Gold borders create clear product boundaries — but watch gold-on-cream text',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold product card borders provide clear visual boundaries against cream background',
        verdict: 'good',
        comment: 'The gold borders frame each product clearly. I can distinguish cards by the structural boundary, not just spacing.',
      },
      {
        category: 'COLOR',
        observation: 'Price text in gold on cream may have insufficient contrast for readability',
        verdict: 'needs-work',
        comment: 'If prices are displayed in gold text on cream cards, I might struggle to read them. Prices should use the navy color for maximum contrast.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add-to-cart buttons use gold fill with dark text — good contrast and non-color affordance',
        verdict: 'good',
        comment: 'The buttons have gold fill, visible border, and dark text. Multiple cues tell me these are interactive.',
      },
    ],
  },

  'e-commerce:art-deco:dorothy': {
    tagline: 'Shopping here feels like visiting a nice boutique — everything looks valuable',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product grid with generous spacing and gold frames makes browsing feel curated',
        verdict: 'good',
        comment: 'Each product has its own little golden frame. It feels like a nice shop window, not a cluttered catalogue.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart is clean and organized with clear totals and checkout button',
        verdict: 'good',
        comment: 'The cart tells me what I have and how much it costs. The checkout button is obvious. Simple and elegant.',
      },
      {
        category: 'DECORATION',
        observation: 'Gold accents in cart and checkout make even mundane actions feel special',
        verdict: 'good',
        comment: 'Even checking out feels fancy. The gold touches make me feel like I am buying something valuable, even if it is just regular products.',
      },
    ],
  },

  'e-commerce:art-deco:carlos': {
    tagline: 'This store design alone justifies premium pricing',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Art Deco identity persists from product grid through cart to confirmation',
        verdict: 'good',
        comment: 'The brand experience never breaks. Gold borders, serif type, and geometric ornaments follow the customer from browsing to buying. This is premium brand execution.',
      },
      {
        category: 'COLOR',
        observation: 'Gold-navy-cream palette positions every product as premium regardless of actual price',
        verdict: 'good',
        comment: 'A $20 product in this store looks like a $200 product. The visual context does the price anchoring that marketers dream about.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif product names add perceived value and craftsmanship to listings',
        verdict: 'good',
        comment: 'Products displayed in serif type feel handcrafted. The same product in sans-serif would feel mass-produced.',
      },
    ],
  },

  'e-commerce:art-deco:frank': {
    tagline: 'Keyboard checkout works — gold focus rings need darkening',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Checkout form inputs are keyboard accessible with logical tab order',
        verdict: 'good',
        comment: 'I can tab through the checkout form logically: name, email, address, payment. Standard order, no surprises.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Gold focus rings on form inputs need higher contrast against cream backgrounds',
        verdict: 'needs-work',
        comment: 'The gold focus outlines are elegant but faint. When I tab to an input, I need to squint to see which field is focused. Use a darker gold or add a secondary outline.',
      },
      {
        category: 'LAYOUT',
        observation: 'Cart drawer focus management keeps keyboard users inside the drawer',
        verdict: 'good',
        comment: 'When the cart opens, my focus stays in the drawer. I am not accidentally navigating to products behind it.',
      },
    ],
  },

  'e-commerce:art-deco:sam': {
    tagline: 'Luxury feel with lightweight performance — CSS does all the heavy lifting',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Georgia is universal — zero font loading. Optima has good fallbacks (Candara, Segoe UI)',
        verdict: 'good',
        comment: 'The store loads fast on my phone. No font-loading delay, no layout shift. The "luxury" fonts are actually system fonts in disguise.',
      },
      {
        category: 'DECORATION',
        observation: 'All ornamental elements (borders, diamonds, stepped shadows) are CSS-only',
        verdict: 'good',
        comment: 'The entire Art Deco aesthetic is built from CSS borders and transforms. Zero images for decoration. The luxury look costs nothing in bandwidth.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards and cart drawer render crisply on high-DPI mobile screens',
        verdict: 'good',
        comment: 'Gold borders and text are vector CSS — they look sharp on my phone\'s retina screen. No blurry images or pixelated decorations.',
      },
    ],
  },

  // ─── E-COMMERCE: MAXIMALIST ──────────────────────────────────

  'e-commerce:maximalist:marcus': {
    tagline: 'Gold-on-navy is safe, but coral buttons need shape cues',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold #D4A574 on navy #1B1F3B provides strong luminance contrast that works for most color deficiencies',
        verdict: 'good',
        comment: 'The gold-on-navy combination is clearly visible to me — high luminance difference means I can read every price and heading.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Coral #FF6B6B "Add to Cart" buttons rely on hue to distinguish from gold accents',
        verdict: 'needs-work',
        comment: 'Coral and gold can look similar to me depending on the shade — add an arrow icon or underline to the CTA so I know it is clickable.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Category color badges (purple, amber, blue, green) provide only color-based grouping',
        verdict: 'needs-work',
        comment: 'The category badges are invisible to me as groups — I need text labels or icons alongside the color to tell categories apart.',
      },
    ],
  },

  'e-commerce:maximalist:dorothy': {
    tagline: 'Rich and inviting, but everything fights for my attention',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Gold serif prices at 26px are the most beautiful price tags I have seen in any variation',
        verdict: 'good',
        comment: 'The Georgia gold prices on dark navy feel like brass plaques — I actually enjoy looking at the prices, which is rare in shopping.',
      },
      {
        category: 'LAYOUT',
        observation: 'Every card has an 8px offset shadow, rounded corners, colored badges, and bold typography all competing simultaneously',
        verdict: 'needs-work',
        comment: 'I cannot decide where to look first — the shadows, the badges, the bold names, and the gold prices all shout at the same volume.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer with gold border and serif titles feels like opening a treasure chest',
        verdict: 'good',
        comment: 'The gold border-left accent and serif "Your Cart" title make the cart feel premium — I felt excited to see what was inside.',
      },
    ],
  },

  'e-commerce:maximalist:carlos': {
    tagline: 'Premium positioning without premium product information',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Georgia serif with 800 weight for prices and names creates strong aspirational brand identity',
        verdict: 'good',
        comment: 'The serif typography and gold color scream "curated luxury" — this brand could justify higher prices with the right product detail.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dense grid with heavy shadows creates a "more is more" browsing experience that matches the brand name',
        verdict: 'good',
        comment: 'The maximalist approach is consistent with the brand promise — customers who come here expect abundance.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards have beautiful styling but only one sentence of description — the packaging outshines the product',
        verdict: 'needs-work',
        comment: 'The premium visual treatment sets expectations that the sparse product info cannot fulfill — add features or materials.',
      },
    ],
  },

  'e-commerce:maximalist:frank': {
    tagline: 'Gorgeous but overwhelming — I need a visual rest area',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Consistent 28px grid gap and 16px card border-radius create predictable structure within the visual abundance',
        verdict: 'good',
        comment: 'At least the spacing and card shapes are consistent — I can predict where each card begins and ends despite the visual richness.',
      },
      {
        category: 'DECORATION',
        observation: '8px offset box-shadows on every element create visual fatigue after scanning more than four cards',
        verdict: 'needs-work',
        comment: 'The heavy shadows look great on two or three cards but become tiring when repeated across the entire grid — my eyes want a rest.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Star ratings in gold serif on dark background are decorative but hard to count quickly',
        verdict: 'needs-work',
        comment: 'I have to squint and count individual stars — add a "4.5" number label next to the stars for people like me who scan numerically.',
      },
    ],
  },

  'e-commerce:maximalist:sam': {
    tagline: 'Auto-fill grid handles my phone well — shadows are GPU-heavy though',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'auto-fill grid with minmax(280px, 1fr) collapses to single column on mobile — readable and functional',
        verdict: 'good',
        comment: 'Unlike the brutalist variation, this grid actually works on my phone — each card gets full width and is easy to scroll through.',
      },
      {
        category: 'MOTION',
        observation: 'Offset box-shadow hover effects with transform create smooth but GPU-intensive animations',
        verdict: 'needs-work',
        comment: 'The shadow-shift on hover looks great on my new phone but might stutter on older devices — that is a lot of shadow calculation per card.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer at 400px maxWidth fills the mobile screen with a premium feel',
        verdict: 'good',
        comment: 'The cart takes over my entire phone screen with the gold border and serif text — it feels like a high-end mobile shopping app.',
      },
    ],
  },

  // ─── E-COMMERCE: DARK INDUSTRIAL ─────────────────────────────

  'e-commerce:dark-industrial:marcus': {
    tagline: 'Single amber accent is the safest possible approach for my eyes',
    observations: [
      {
        category: 'COLOR',
        observation: 'Single amber #D4A574 accent against near-black provides clear, reliable contrast with only one hue to track',
        verdict: 'good',
        comment: 'With only one accent color, I never have to distinguish between hues — amber means "important" and everything else is background. Perfect for me.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Ghost outlined buttons use border only — no fill color to distinguish interactive from non-interactive elements',
        verdict: 'needs-work',
        comment: 'The outlined buttons blend into the grid borders — I cannot tell which rectangles are buttons and which are just card edges.',
      },
      {
        category: 'LAYOUT',
        observation: 'Amber-fill hover state on ghost buttons provides clear interaction confirmation',
        verdict: 'good',
        comment: 'When I do find and hover the buttons, the amber fill appears instantly — the feedback is unmistakable.',
      },
    ],
  },

  'e-commerce:dark-industrial:dorothy': {
    tagline: 'I feel like I am ordering from a military supply catalog',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'All-monospace Courier New for everything — names, prices, descriptions, buttons — creates zero typographic warmth',
        verdict: 'needs-work',
        comment: 'Every piece of text looks the same to me — like reading a computer terminal. I cannot feel any personality or story in the products.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Code-comment style "// Shipping Information" headers are a clever brand detail',
        verdict: 'good',
        comment: 'I have a developer friend who would love this — the double-slash headers are a genuine personality moment in an otherwise austere experience.',
      },
      {
        category: 'COLOR',
        observation: 'Near-black background (#0A0A0F) with subtle amber accents creates a serious, focused mood',
        verdict: 'needs-work',
        comment: 'The dark screen makes me feel like I am working, not shopping — there is no warmth or invitation to browse.',
      },
    ],
  },

  'e-commerce:dark-industrial:carlos': {
    tagline: 'Perfect for B2B industrial tools, wrong for consumer retail',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace pricing with amber color creates a spec-sheet identity that signals technical authority',
        verdict: 'good',
        comment: 'If I were buying server hardware or industrial equipment, this is exactly the vibe I would trust — precise, no-nonsense, specification-first.',
      },
      {
        category: 'LAYOUT',
        observation: 'Bracketed [Category] labels echo terminal output and function as passive navigation',
        verdict: 'good',
        comment: 'The bracket syntax is both decoration and function — it groups products without a formal filter UI, which feels efficient.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Ghost buttons and thin borders create an overall "disabled" impression for non-technical shoppers',
        verdict: 'needs-work',
        comment: 'My non-developer friends would think this page is broken or under construction — the ghost aesthetic is too niche for mainstream.',
      },
    ],
  },

  'e-commerce:dark-industrial:frank': {
    tagline: 'Zero border-radius means zero confusion about boundaries',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Every element is a perfect rectangle — cards, buttons, inputs, step indicators — zero ambiguity about boundaries',
        verdict: 'good',
        comment: 'I can tell exactly where every element begins and ends — the square edges create crisp, unambiguous boundaries throughout.',
      },
      {
        category: 'COMPONENTS',
        observation: '26px square quantity buttons are too small for comfortable finger tapping',
        verdict: 'needs-work',
        comment: 'The tiny square buttons require precision tapping that I cannot reliably do — make them at least 36px.',
      },
      {
        category: 'COLOR',
        observation: '#12121A card background on #0A0A0F page background is nearly indistinguishable',
        verdict: 'needs-work',
        comment: 'I genuinely cannot see the difference between the card surface and the page background — they merge into one dark plane.',
      },
    ],
  },

  'e-commerce:dark-industrial:sam': {
    tagline: 'Lightest variation I have tested — loads instantly on cellular',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'System monospace font, zero images, minimal CSS — the page loads in under 200ms on 3G simulation',
        verdict: 'good',
        comment: 'This is the fastest e-commerce page I have tested on my phone — zero font loading, zero image requests, instant paint.',
      },
      {
        category: 'LAYOUT',
        observation: 'auto-fill grid with minmax(260px, 1fr) collapses cleanly to single column on mobile',
        verdict: 'good',
        comment: 'The grid works perfectly on my phone — each card gets full width with adequate spacing between them.',
      },
      {
        category: 'COLOR',
        observation: 'Near-black palette with subtle surface distinction requires high screen brightness on mobile',
        verdict: 'needs-work',
        comment: 'I have to crank my phone brightness to maximum to see the card boundaries — drains battery and hurts my eyes outdoors.',
      },
    ],
  },

  // ─── E-COMMERCE: WARM ORGANIC ────────────────────────────────

  'e-commerce:warm-organic:marcus': {
    tagline: 'Forest-on-cream is safe, sage borders are invisible to me',
    observations: [
      {
        category: 'COLOR',
        observation: 'Forest green #2D5016 on cream #FDF6EE background provides good luminance contrast for headings and buttons',
        verdict: 'good',
        comment: 'The dark green on light cream is easy for me to read — green is one of the colors I can distinguish most reliably.',
      },
      {
        category: 'COLOR',
        observation: 'Sage green #A7C4A0 borders on cream background have very low contrast — nearly invisible as boundaries',
        verdict: 'needs-work',
        comment: 'I cannot see the input field borders or card separators at all — the sage green dissolves into the cream background for my eyes.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Forest-green pill buttons with white text have strong fill-based affordance',
        verdict: 'good',
        comment: 'The solid green buttons are impossible to miss — the fill color is my primary cue that something is clickable.',
      },
    ],
  },

  'e-commerce:warm-organic:dorothy': {
    tagline: 'Like shopping at a Sunday farmers market — I want to stay',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif product names in forest green evoke handwritten price tags at a craft market',
        verdict: 'good',
        comment: 'The Georgia font in dark green makes me feel like each product was hand-selected — I trust this store before I even read the descriptions.',
      },
      {
        category: 'COLOR',
        observation: 'Cream #FDF6EE background with white #FFFFFF card surfaces creates a warm, sunlit layering effect',
        verdict: 'good',
        comment: 'The subtle cream-to-white shift feels like natural light falling on linen — the warmth makes me want to keep browsing.',
      },
      {
        category: 'COMPONENTS',
        observation: '"Your order is being lovingly prepared" confirmation message made me smile',
        verdict: 'good',
        comment: 'This one sentence captured the entire brand personality — I felt genuinely cared for after placing my order.',
      },
    ],
  },

  'e-commerce:warm-organic:carlos': {
    tagline: 'Beautiful brand promise — now deliver the substance',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headings with warm-brown prices create an artisanal market identity that justifies premium pricing',
        verdict: 'good',
        comment: 'This is the most trustworthy-looking e-commerce variation — the typography alone makes me willing to pay 20% more.',
      },
      {
        category: 'LAYOUT',
        observation: 'Products lack origin stories, sustainability certifications, or material information',
        verdict: 'needs-work',
        comment: 'The organic aesthetic promises values that the product cards do not deliver — where is the "made in Vermont" or "100% recycled" label?',
      },
      {
        category: 'COMPONENTS',
        observation: 'Warm placeholder names ("Jane Greenfield", "Meadow Lane") are a charming brand-building detail',
        verdict: 'good',
        comment: 'Even the form hints tell a story — this level of detail shows a brand team that cares about every touchpoint.',
      },
    ],
  },

  'e-commerce:warm-organic:frank': {
    tagline: 'Gentle and inviting, but sage borders disappear on me',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Consistent pill-shape language (buttons, badges, quantity controls) creates predictable interaction areas',
        verdict: 'good',
        comment: 'Everything that is interactive is rounded into a pill — I learned the pattern quickly and could predict what was clickable.',
      },
      {
        category: 'COLOR',
        observation: 'Sage-green #A7C4A0 borders on cream and white surfaces are too subtle for reliable boundary detection',
        verdict: 'needs-work',
        comment: 'I struggle to see where input fields begin and end — the borders are so gentle they almost disappear. I need darker edges.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Circular quantity buttons at 30px with pill borders are comfortable and predictable',
        verdict: 'good',
        comment: 'The round buttons match the rest of the pill-shaped interface — I know exactly what to tap and the size is adequate.',
      },
    ],
  },

  'e-commerce:warm-organic:sam': {
    tagline: 'Clean responsive grid, fast system fonts, gentle on bandwidth',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'auto-fill grid collapses to single column on mobile with soft card shadows that still look premium',
        verdict: 'good',
        comment: 'The cards stack beautifully on my phone and the subtle shadows give each product breathing room without visual weight.',
      },
      {
        category: 'LAYOUT',
        observation: 'System font stack (Georgia + system sans-serif) means zero web font loading on any device',
        verdict: 'good',
        comment: 'The page renders instantly on my phone — no flash of invisible text, no layout shifts. Just cream and green from the first paint.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer with box-shadow slides smoothly on mobile with full-width takeover',
        verdict: 'good',
        comment: 'The cream drawer fills my screen with a gentle shadow edge — it feels like pulling open a curtain at a natural goods store.',
      },
    ],
  },

  // ─── E-COMMERCE: RETRO FUTURISM ──────────────────────────────

  'e-commerce:retro-futurism:marcus': {
    tagline: 'Gradient text is beautiful but impossible for me to read',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gradient-text prices (teal → purple → pink) create inconsistent contrast across the text span',
        verdict: 'needs-work',
        comment: 'The price starts in teal (visible to me) and shifts through purple to pink (all the same to me) — I can only read half of each price.',
      },
      {
        category: 'COLOR',
        observation: 'Gradient CTA buttons maintain higher contrast than gradient text because the fill is behind white text',
        verdict: 'good',
        comment: 'The buttons work because white text sits on top of the gradient — I can read "Add to Cart" even if I cannot see all the gradient colors.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Purple glow on card hover provides clear interaction feedback through luminance, not hue',
        verdict: 'good',
        comment: 'The glow effect works for me because it is a brightness change, not a color change — I can see "something lit up" on hover.',
      },
    ],
  },

  'e-commerce:retro-futurism:dorothy': {
    tagline: 'Shopping in a neon dreamworld — I never want to leave',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-to-purple-to-pink gradient applied to logo, prices, and buttons creates an immersive brand universe',
        verdict: 'good',
        comment: 'I feel like I am browsing a store on a space station — every color choice transports me somewhere magical and exciting.',
      },
      {
        category: 'MOTION',
        observation: 'Purple glow on card hover mimics a neon sign flickering to life — delightful micro-interaction',
        verdict: 'good',
        comment: 'Hovering over products feels like walking past neon shop windows at night — each card lights up and invites me in.',
      },
      {
        category: 'COLOR',
        observation: 'Lavender #C4B5FD body text on deep purple-black feels ethereal but starts to tire my eyes after extended browsing',
        verdict: 'needs-work',
        comment: 'The dreamy purple palette is beautiful for short visits but I noticed eye strain after browsing for more than five minutes.',
      },
    ],
  },

  'e-commerce:retro-futurism:carlos': {
    tagline: 'The most memorable brand identity — but does it convert?',
    observations: [
      {
        category: 'COLOR',
        observation: '"NEON MARKET" gradient logo is the strongest brand mark across all e-commerce variations',
        verdict: 'good',
        comment: 'If someone described this store to a friend, they would say "the one with the glowing rainbow text" — instant brand recall.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Gradient-text prices are eye-catching but slower to read than solid-color prices',
        verdict: 'needs-work',
        comment: 'I noticed I had to look twice at each price — the gradient makes individual digits blend together, slowing purchase decisions.',
      },
      {
        category: 'LAYOUT',
        observation: 'The dark sci-fi aesthetic appeals to a specific demographic — may alienate mainstream shoppers',
        verdict: 'needs-work',
        comment: 'This store is perfect for tech enthusiasts and gamers, but my mother would close the tab immediately — know your audience.',
      },
    ],
  },

  'e-commerce:retro-futurism:frank': {
    tagline: 'Glow effects are nice feedback, but lavender text tires my eyes',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Purple glow on interactive elements provides consistent and visible hover/focus feedback',
        verdict: 'good',
        comment: 'Every button and card glows when I interact with it — the feedback system is reliable and I always know what is selected.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Lavender #C4B5FD on #0F0B1A background is legible but creates eye fatigue in extended reading sessions',
        verdict: 'needs-work',
        comment: 'After reading several product descriptions, my eyes feel tired — the cool purple-on-dark palette lacks the warmth that relaxes reading.',
      },
      {
        category: 'COMPONENTS',
        observation: '28px pill-shaped quantity buttons with glow feedback are adequately sized and clearly interactive',
        verdict: 'good',
        comment: 'The buttons glow when I hover and are large enough for me to tap — the pill shape tells me these are interactive controls.',
      },
    ],
  },

  'e-commerce:retro-futurism:sam': {
    tagline: 'CSS-only neon effects are lightweight — glow animations add GPU cost',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Entire neon aesthetic built from CSS gradients and box-shadows — zero image assets for decoration',
        verdict: 'good',
        comment: 'No decoration images to download — the futuristic look is all CSS. Page weight is surprisingly small for how dramatic it looks.',
      },
      {
        category: 'MOTION',
        observation: 'Multiple simultaneous box-shadow glow animations when scrolling through grid can cause frame drops on mid-range phones',
        verdict: 'needs-work',
        comment: 'When several cards are glowing at once (scroll momentum), my mid-range phone drops to about 30fps — the GPU cannot keep up.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart drawer animation is smooth and the gradient badge renders crisply on mobile screens',
        verdict: 'good',
        comment: 'The cart drawer is snappy and the gradient counter badge looks sharp on my phone screen — high-DPI rendering works well for gradients.',
      },
    ],
  },
};

export function getPersonaFindings(
  slug: string,
  themeId: string,
  lensId: string,
): PersonaEntry | undefined {
  return personaFindings[`${slug}:${themeId}:${lensId}`];
}

export function getAllPersonaFindings(
  slug: string,
  themeId: string,
): { lens: LensDef; entry: PersonaEntry }[] {
  return lenses
    .map((lens) => {
      const entry = personaFindings[`${slug}:${themeId}:${lens.id}`];
      return entry ? { lens, entry } : null;
    })
    .filter((item): item is { lens: LensDef; entry: PersonaEntry } => item !== null);
}
