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
