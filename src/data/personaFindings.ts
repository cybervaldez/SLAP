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
  // ═══════════════════════════════════════════════════════════════
  // LANDING PAGE
  // ═══════════════════════════════════════════════════════════════

  // ─── SLAP (baseline) ───────────────────────────────────────

  'landing-page:slap:marcus': {
    tagline: 'System-font gray on white — my WCAG checker yawned and crashed',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gray placeholder links and muted text offer almost no visual hierarchy through color alone',
        verdict: 'needs-work',
        comment: 'There is zero color differentiation between body text, links, and headings. For someone with deuteranomaly this is a flat gray wall — like a game HUD with every element set to the same opacity.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'System-font stack at default browser sizes creates no typographic hierarchy whatsoever',
        verdict: 'blocker',
        comment: 'The headline and body text are essentially the same visual weight. It is like reading a manga page where every panel is the same size — you have no idea where the story starts.',
      },
      {
        category: 'LAYOUT',
        observation: 'No spacing system — padding and margins feel browser-default with no intentional rhythm',
        verdict: 'needs-work',
        comment: 'Sections bleed into each other with no clear separation. My eyes keep scanning past the pricing table because nothing tells me to stop there.',
      },
    ],
  },

  'landing-page:slap:dorothy': {
    tagline: 'This looks like the internet forgot to get dressed this morning',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'The "Start Your Training" button looks identical to plain text — no background color, no border emphasis',
        verdict: 'blocker',
        comment: 'I honestly could not tell what to click. My church newsletter has clearer buttons than this, and we print those on a home inkjet.',
      },
      {
        category: 'LAYOUT',
        observation: 'Hero section has no visual separation from the pricing section below it',
        verdict: 'needs-work',
        comment: 'Everything just runs together like one long column. Even my quilting patterns have more structure than this — at least a quilt block has borders.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'The subheadline with seven buzzwords reads as a wall of jargon with no visual relief',
        verdict: 'needs-work',
        comment: '"Leverages cutting-edge technology to seamlessly streamline" — I do not know what any of this means, and the design does nothing to help me figure it out.',
      },
    ],
  },

  'landing-page:slap:carlos': {
    tagline: 'If this is your pitch deck, your Series A is dead on arrival',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'No visual hierarchy makes it impossible to identify the value proposition in under 3 seconds',
        verdict: 'blocker',
        comment: 'I give a landing page three seconds before I decide if the company is serious. This page spent those three seconds showing me unstyled HTML. That is a boardroom death sentence.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing cards have no visual differentiation between tiers — the "Headliner" plan looks identical to "Opener"',
        verdict: 'needs-work',
        comment: 'Your pricing page should tell me which plan you want me to buy. This page treats a $9 plan and a $99 plan like they are the same thing. No upsell architecture at all.',
      },
      {
        category: 'DECORATION',
        observation: 'Zero brand identity — no logo treatment, no color palette, no visual personality',
        verdict: 'needs-work',
        comment: 'I collect jazz vinyl for the album art. Even a 1956 Blue Note pressing has more visual identity than this entire landing page.',
      },
    ],
  },

  'landing-page:slap:frank': {
    tagline: 'I found the price in 8 seconds and that is 7 seconds too many',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'CTA button "Start Your Training" has no visual weight — blends into surrounding text',
        verdict: 'blocker',
        comment: 'I spent actual seconds hunting for the button. SECONDS. The ESPN scoreboard updates live stats faster than this page communicates where to click.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Testimonial section uses the same font size as everything else — no visual emphasis on social proof',
        verdict: 'needs-work',
        comment: '"Chief Comedy Officer at Synergy Laughs" — that title is doing enough heavy lifting without the design making it visually identical to the FAQ answers.',
      },
      {
        category: 'LAYOUT',
        observation: 'FAQ section stacks questions without any accordion or collapsible behavior — just a text dump',
        verdict: 'needs-work',
        comment: 'Five questions, five full answers, all visible at once. I did not ask all five questions. Let me pick. This is like watching all the sports highlights simultaneously.',
      },
    ],
  },

  'landing-page:slap:sam': {
    tagline: 'On mobile this is just a scroll of sadness with no landmarks',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'No sticky header or navigation — once you scroll past the hero, there is no way back',
        verdict: 'needs-work',
        comment: 'I am on the subway with one thumb. If I scroll past pricing there is no way to get back without scrolling the entire page. My gacha games have better navigation than this.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Email signup field at the bottom has no visual distinction from the surrounding content',
        verdict: 'blocker',
        comment: '"Unlock Your Punchline" as a submit button — on mobile it looks like a paragraph heading, not an action. I scrolled right past it twice.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'The seven-buzzword subheadline wraps to six lines on a phone screen and reads like a ransom note',
        verdict: 'needs-work',
        comment: 'That subheadline is a paragraph pretending to be a tagline. On a 375px screen it eats the entire viewport. Even comic book splash pages know when to stop.',
      },
    ],
  },

  // ─── BRUTALIST ─────────────────────────────────────────────

  'landing-page:brutalist:frank': {
    tagline: 'Three seconds to the price. This is the ESPN scoreboard of landing pages.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Single-column structure with bold section dividers makes scanning effortless',
        verdict: 'good',
        comment: 'Headline, price, button. Done. No decorative detours, no animated distractions. I found what I needed faster than checking a fantasy football score.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Thick-bordered rectangular buttons are unmistakably clickable — zero guessing',
        verdict: 'good',
        comment: 'When a button looks like a button, my blood pressure stays where it should. These heavy rectangles say "press me" with the urgency of a fourth-quarter timeout.',
      },
      {
        category: 'COLOR',
        observation: 'Pure black on white with red accents limits the palette to maximum contrast',
        verdict: 'needs-work',
        comment: 'The red CTA pops, but red-on-white on a bright screen starts to burn after a few seconds. Give me a dark mode toggle and this is my homepage.',
      },
    ],
  },

  'landing-page:brutalist:sarah': {
    tagline: 'Nowhere to hide. Every flaw in the copy is visible under this spotlight.',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: '900-weight uppercase headlines strip away any tonal nuance — the words must carry themselves',
        verdict: 'good',
        comment: 'No gradient or glassmorphism to distract from the content. "Master the Art of the Perfectly Timed Fall" in heavy black uppercase is like reading a headline under oath. I respect the brutal honesty.',
      },
      {
        category: 'DECORATION',
        observation: 'Zero decorative elements — the page commits fully to its brutalist thesis',
        verdict: 'good',
        comment: 'Nothing here is trying to charm me. As a Consumer Reports subscriber, I appreciate a product page that presents itself for evaluation rather than seduction.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing tier cards lack visual hierarchy to indicate the recommended plan',
        verdict: 'needs-work',
        comment: 'All three plans look identical in weight and framing. When I compare options, I expect the page to at least hint at which one it recommends. This is a comparison chart with no "Best Value" badge.',
      },
    ],
  },

  'landing-page:brutalist:dex': {
    tagline: 'Punk rock in web form. No polish, no compromise, no please-like-us energy.',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace accents on testimonials and labels inject raw authenticity into corporate content',
        verdict: 'good',
        comment: 'The monospace treatment turns "Chief Comedy Officer at Synergy Laughs" into something that almost reads like irony. The font is doing what the content refuses to do — be honest. It is like a gig poster for a corporate band.',
      },
      {
        category: 'LAYOUT',
        observation: 'Thick borders create a grid-like compartmentalization of every section',
        verdict: 'good',
        comment: 'Each section is its own contained artifact, like pages in a zine stapled together. The borders are functional and aesthetic at the same time. This grid has more intentionality than most gallery walls.',
      },
      {
        category: 'COLOR',
        observation: 'Black-and-white-only palette with red accents gives no tonal warmth',
        verdict: 'needs-work',
        comment: 'The monochrome commitment is punk but the red accents feel like a safety concession. Either go fully black and white or introduce color with conviction. Half-measures are not rebellious, they are indecisive.',
      },
    ],
  },

  'landing-page:brutalist:dorothy': {
    tagline: 'I thought the page did not load properly.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Flat, unshaded sections with zero border-radius resemble a broken CSS stylesheet',
        verdict: 'needs-work',
        comment: 'I genuinely thought something went wrong. Everything is flat, sharp, and harsh. My church newsletter has rounded corners on the prayer request box and it makes it feel welcoming. This feels like a warning.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'ALL CAPS headings at 900-weight feel aggressive and unwelcoming',
        verdict: 'needs-work',
        comment: 'The shouting capitals make me feel like I am in trouble. In my romance novels, chapter titles are gentle invitations. These headings are demands.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Red CTA buttons on stark white look like error alerts rather than invitations',
        verdict: 'needs-work',
        comment: 'Bright red buttons remind me of the "overdue" notices from my utility company. I hesitated before clicking because red means danger in every context I know.',
      },
    ],
  },

  'landing-page:brutalist:marcus': {
    tagline: 'WCAG AAA contrast out of the box, but red CTAs are a gamble for my eyes',
    observations: [
      {
        category: 'COLOR',
        observation: 'Red #FF0000 CTA buttons rely on color alone to communicate action',
        verdict: 'needs-work',
        comment: 'The stark red pops for most viewers, but with deuteranomaly I need an icon or border-weight change to distinguish the CTA from surrounding elements. Color alone is not a signal — it is a suggestion.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Black 900-weight on white background passes WCAG AAA at every text size',
        verdict: 'good',
        comment: 'This is the clearest text rendering in any variation. The heavy black on pure white is effortless — like reading a well-inked manga page where the panel borders never bleed.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Thick 3-4px borders create structural cues that work independently of color',
        verdict: 'good',
        comment: 'I can parse every section boundary through shape alone. The thick borders are the mechanical keyboard of design elements — tactile, definitive, satisfying.',
      },
    ],
  },

  // ─── NEO-MINIMAL ───────────────────────────────────────────

  'landing-page:neo-minimal:priya': {
    tagline: 'Every click target is generous, every section breathes. This was designed for my hands.',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Buttons have generous padding and ample spacing from adjacent interactive elements',
        verdict: 'good',
        comment: 'I can navigate this page with minimal motor precision. The spacing between "Start Your Training" and surrounding links means I will never accidentally trigger the wrong action. It is like a well-set crossword grid — every square has its own territory.',
      },
      {
        category: 'LAYOUT',
        observation: 'Generous whitespace between sections creates clear zones with no overlapping hit areas',
        verdict: 'good',
        comment: 'The breathing room between pricing cards means each card is its own island. For someone with cerebral palsy, that gap is not aesthetic minimalism — it is independent navigation. I can bird-watch a whole morning because nature gives things space. This page does the same.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin font weights (200-300) may reduce readability at smaller sizes on lower-resolution screens',
        verdict: 'needs-work',
        comment: 'The delicate type is beautiful but the thinnest weights disappear on my older monitor. A cozy mystery novel uses clear serif type for a reason — sustained reading needs weight, even in minimal contexts.',
      },
    ],
  },

  'landing-page:neo-minimal:jasmine': {
    tagline: 'The bullet journal spread of web design. Clean, calm, everything in its place.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Clean section headers with minimal decoration make the page scannable in seconds',
        verdict: 'good',
        comment: 'After answering 50+ tickets today, my brain needs visual rest. This page delivers it. Every element has a clear purpose and nothing fights for attention. It is the matcha latte of web layouts — clean, deliberate, calming.',
      },
      {
        category: 'DECORATION',
        observation: 'Single-accent-color system with 1px borders creates restraint without emptiness',
        verdict: 'good',
        comment: 'The design trusts itself enough to use one color and thin rules. My bullet journal uses exactly this philosophy — a single pen color with intentional spacing. The result is clarity, not poverty.',
      },
      {
        category: 'COMPONENTS',
        observation: 'FAQ section uses subtle expand/collapse with minimal animation — functional but emotionally flat',
        verdict: 'needs-work',
        comment: 'The FAQ interaction is clean but I would not call it delightful. When our support portal feels this neutral, customers complete tasks but never feel cared for. A tiny ease-in transition would add warmth without adding noise.',
      },
    ],
  },

  'landing-page:neo-minimal:mike': {
    tagline: 'The only variation I would not apologize for during a client screen share.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Single-column layout with strict alignment grid projects professional confidence',
        verdict: 'good',
        comment: 'I share my screen daily. This is the only variation where the design says "we are confident in our content" rather than "we are hiding behind decoration." In architecture photography, the best shots show honest materials. This page is honest materials.',
      },
      {
        category: 'COLOR',
        observation: 'Near-white backgrounds with single blue accent are safe but lack visual personality',
        verdict: 'needs-work',
        comment: 'The restraint is admirable but it tips into anonymity. Even my pour-over coffee setup has more character than this color palette. Minimal does not have to mean forgettable.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin-weight headings at large sizes create elegant hierarchy with breathing room',
        verdict: 'good',
        comment: 'The typographic scale is precise. Each heading level steps down with intention. It is the cycling route of design — every gradient carefully planned, no wasted effort.',
      },
    ],
  },

  'landing-page:neo-minimal:marcus': {
    tagline: 'Accessible? Absolutely. Information-dense? Not even close.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Blue accent on near-white background is safe for all color vision deficiency types',
        verdict: 'good',
        comment: 'The single-accent system means I never have to decode color-coded information. Blue on white is the safest palette for deuteranomaly. No complaints on accessibility.',
      },
      {
        category: 'LAYOUT',
        observation: 'Massive whitespace means one headline, three bullets, and a football field of nothing',
        verdict: 'needs-work',
        comment: 'The information density is embarrassing. A manga page fits six to eight panels telling different parts of the story. This page has one column of text surrounded by emptiness. The restraint is not elegant — it is wasteful.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing cards are well-spaced but contain minimal comparative information',
        verdict: 'needs-work',
        comment: 'Three plans, three prices, and feature lists that read like marketing copy. My mechanical keyboard forums pack more comparison data into a single post than these three cards combined.',
      },
    ],
  },

  'landing-page:neo-minimal:kevin': {
    tagline: 'I scrolled the whole thing in 3 seconds because there is nothing to stop on.',
    observations: [
      {
        category: 'MOTION',
        observation: 'Zero animation, zero scroll-triggered events, zero visual feedback on interaction',
        verdict: 'needs-work',
        comment: 'Nothing moves. Nothing reacts. Nothing surprises. This is the loading screen of websites — technically present, zero reason to stay. My attention went to the next tab immediately.',
      },
      {
        category: 'COLOR',
        observation: 'Near-monochrome palette with a single muted accent produces no visual energy',
        verdict: 'needs-work',
        comment: 'My synthwave playlists have more color on a single album cover than this entire page. One blue accent on a sea of white is not restraint, it is a design that forgot to finish loading.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Testimonial cards have clean typography but no visual differentiation from the surrounding sections',
        verdict: 'needs-work',
        comment: 'The testimonials look like regular paragraphs. In anime, character dialogue gets speech bubbles, color tints, dramatic angles. Here, the "Chief Comedy Officer at Synergy Laughs" quote looks the same as the FAQ answers. Give social proof some main-character energy.',
      },
    ],
  },

  // ─── MAXIMALIST ────────────────────────────────────────────

  'landing-page:maximalist:yuki': {
    tagline: 'Every scroll reveals another detail. This is mood board material.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Layered textures with decorative borders and mixed typefaces create editorial richness',
        verdict: 'good',
        comment: 'The serif headlines against sans-serif body, the coral accents on navy — this is the web design equivalent of a Ghibli background: dense with intention, rewarding careful looking. I would screenshot every section for my BookTok inspiration folder.',
      },
      {
        category: 'COLOR',
        observation: 'Navy, coral, and gold palette creates a warm, high-contrast editorial atmosphere',
        verdict: 'good',
        comment: 'The color layering feels like opening a well-designed picture book. Each accent serves the mood. The tea ceremony taught me that every color in a room should have a reason — these do.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Mixed serif and sans-serif pairing across hero and body creates tonal friction',
        verdict: 'needs-work',
        comment: 'The type mixing is mostly gorgeous, but the serif hero headline fighting with the sans-serif subheadline creates a moment of visual tension that pulls me out of the mood. Even cottagecore aesthetics commit to a single vibe.',
      },
    ],
  },

  'landing-page:maximalist:frank': {
    tagline: 'Beautiful chaos but I just need to find the button.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Dense editorial composition with decorative frames means the CTA competes with ornament',
        verdict: 'needs-work',
        comment: 'I count three different type styles in the hero section alone. Pick one. I did not come here for a visual experience, I came here to find the price and leave. The ESPN ticker gives me live scores in a single row. This page gives me a design exhibition.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing cards are visually rich but the call-to-action buttons are subordinate to the decorative borders',
        verdict: 'needs-work',
        comment: 'The "Start Your Training" button is wearing a tuxedo at a barbecue — too dressed up to do its job quickly. Make the button louder than the frame around it.',
      },
      {
        category: 'MOTION',
        observation: 'Parallax scroll effects and hover transitions add 200ms of friction to every interaction',
        verdict: 'needs-work',
        comment: 'Every animation is a speed bump between me and the data. My 5-ingredient meals take 15 minutes. This page takes 15 seconds just to show me the hero. Unacceptable ratio.',
      },
    ],
  },

  'landing-page:maximalist:diana': {
    tagline: 'Obsessively detailed, delightfully layered. Someone CARED about this page.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Decorative borders, pull-quote styling, and ornamental dividers show deliberate craft at every level',
        verdict: 'good',
        comment: 'The ornamental details around the testimonial section alone tell me a designer made actual decisions here. This is the Wes Anderson of landing pages — obsessively symmetric, perfectly considered, delightful in its excess.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headings with editorial spacing create a magazine-quality reading rhythm',
        verdict: 'good',
        comment: 'The typographic hierarchy feels like flipping through a design annual. Each weight change is intentional. My Japanese stationery collection is organized by nib width — I appreciate when someone uses the right weight for the right moment.',
      },
      {
        category: 'COLOR',
        observation: 'Navy-coral-gold palette is harmonious but the three-color system limits wayfinding cues',
        verdict: 'needs-work',
        comment: 'When everything is richly colored, color stops being a navigational signal. At a thrift store, I spot the vintage Pyrex by its unique color. On this page, every section is equally gorgeous, which means nothing stands out for wayfinding.',
      },
    ],
  },

  'landing-page:maximalist:sam': {
    tagline: 'Desktop luxury is mobile hostility.',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Editorial font loading requires four decorative web fonts that throttle on mobile data',
        verdict: 'blocker',
        comment: 'I am on the subway with one bar of signal and this page just tried to load four custom typefaces. The serif headline rendered as fallback Times New Roman for three seconds before the web font popped in. On mobile, font loading strategy IS the design.',
      },
      {
        category: 'LAYOUT',
        observation: 'Multi-column editorial layout collapses into a single cramped column on mobile viewports',
        verdict: 'needs-work',
        comment: 'The editorial density that works on a 27-inch monitor becomes a vertical scroll marathon on my phone. The coral accents bleed into navy at small sizes. Like reading a comic book that was shrunk to trading-card size — all the detail, none of the readability.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Decorative hover states on pricing cards have no touch equivalent on mobile',
        verdict: 'needs-work',
        comment: 'The hover interactions are invisible on touch devices. Those beautiful card transitions that desktop users see? I get a static card and a tap. My gacha games give mobile-first animations. This gives me desktop leftovers.',
      },
    ],
  },

  'landing-page:maximalist:priya': {
    tagline: 'The density that delights others is a motor precision minefield for me.',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Dense layout places interactive elements within 8px of decorative borders',
        verdict: 'blocker',
        comment: 'The ornamental borders sit dangerously close to clickable elements. My motor control cannot distinguish between a decorative frame and a button at those margins. What others see as editorial richness, I experience as an obstacle course.',
      },
      {
        category: 'LAYOUT',
        observation: 'Multi-layered compositions create overlapping interactive zones on pricing cards',
        verdict: 'needs-work',
        comment: 'The layered design means hover states and click targets overlap. In bird watching, you learn to isolate a single bird in dense foliage. This page asks me to isolate a single button in dense decoration — same skill, much less patience.',
      },
      {
        category: 'DECORATION',
        observation: 'Ornamental elements near form inputs increase accidental activation risk',
        verdict: 'needs-work',
        comment: 'The email signup field has decorative flourishes within tapping distance. Each flourish is another potential misclick. A well-designed crossword has clear boundaries between squares. This form has ambiguous boundaries between art and function.',
      },
    ],
  },

  // ─── DARK INDUSTRIAL ───────────────────────────────────────

  'landing-page:dark-industrial:marcus': {
    tagline: 'THIS is a proper interface. Amber on navy, monospace labels, information density respected.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Amber (#FFB800 range) on dark navy (#1A1A2E range) provides excellent luminance contrast for all CVD types',
        verdict: 'good',
        comment: 'The amber accent on dark background passes every color vision deficiency simulation I can run. But accessibility is just the baseline — the real win is that this looks like a proper dev console. It is the game settings menu of landing pages.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace type throughout creates technical authority and consistent character widths for scanning',
        verdict: 'good',
        comment: 'Every character occupies the same width, every label aligns to a grid. This is how my mechanical keyboard forums present comparison data. Information density finally respected in a landing page.',
      },
      {
        category: 'LAYOUT',
        observation: 'Terminal-style section labels (SYS.HERO, SYS.PRICING) add structural cues but increase cognitive load for non-technical users',
        verdict: 'needs-work',
        comment: 'I love the terminal labels — they make my developer brain feel at home. But I know from indie game UI design that affordances need to work for all players, not just the power users who read the patch notes.',
      },
    ],
  },

  'landing-page:dark-industrial:raj': {
    tagline: 'The first variation that respects how I actually use computers.',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Full monospace type stack with structured label hierarchy mirrors terminal and config-file conventions',
        verdict: 'good',
        comment: 'I have spent 20 years in terminals. This design acknowledges that expertise. The monospace labels, the dark background, the structured layout — it feels like a config file I could edit. As a dungeon master, I appreciate interfaces that reward mastery.',
      },
      {
        category: 'COLOR',
        observation: 'Dark background with amber accents reduces eye strain for extended viewing sessions',
        verdict: 'good',
        comment: 'My home automation dashboard runs on a dark theme for a reason — when you stare at screens for hours, dark backgrounds are not aesthetic, they are ergonomic. This page gets that.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing comparison requires horizontal scanning across identically styled monospace blocks',
        verdict: 'needs-work',
        comment: 'The pricing cards are well-structured but lack the quick-diff capability I expect. In vim I can split-diff two files instantly. These pricing tiers need visual diff markers — highlight what changes between Opener and Headliner, do not make me hunt.',
      },
    ],
  },

  'landing-page:dark-industrial:dorothy': {
    tagline: 'This looks like the inside of a submarine. I do not have a security clearance.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark background with light text inverts the reading convention most non-technical users expect',
        verdict: 'needs-work',
        comment: 'I grew up reading black text on white paper. My church newsletter, my romance novels, my greeting cards — all black on white. This dark page feels like something went wrong with the display. I increased my screen brightness and it still felt dim.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Terminal-style labels like "SYS.NAVIGATION" are meaningless to non-technical users',
        verdict: 'blocker',
        comment: 'I do not know what "SYS.NAVIGATION" means and I do not want to learn. Websites should welcome you like a neighbor at the door, not make you decode their filing system.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace body text is harder to read at length than proportional fonts',
        verdict: 'needs-work',
        comment: 'Every letter is the same width and my eyes cannot find a comfortable rhythm. It is like reading a telegram instead of a letter. In Hallmark movies, the love letters are always handwritten for a reason — warmth lives in the curves.',
      },
    ],
  },

  'landing-page:dark-industrial:jasmine': {
    tagline: 'If a customer sent me this screenshot, I would escalate it as a rendering bug.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Terminal-grid aesthetic creates an interface designed for builders, not for users',
        verdict: 'needs-work',
        comment: 'I answer 50+ support tickets a day. If our customer portal looked like this, tickets would triple. The terminal aesthetic is cool if you know what terminals are. Our customers do not. This is a K-drama that only airs on a hacker forum.',
      },
      {
        category: 'COMPONENTS',
        observation: 'CTA buttons styled as terminal commands lose their invitational quality',
        verdict: 'needs-work',
        comment: 'A button should say "welcome, click me." These buttons say "execute command." In my bullet journal, action items get friendly checkboxes, not command prompts. The dark industrial frame turns an invitation into an instruction.',
      },
      {
        category: 'COLOR',
        observation: 'Amber accent is functional but emotionally cold — no warmth in the palette',
        verdict: 'needs-work',
        comment: 'Amber on dark navy is readable but joyless. My matcha has more warmth in its green foam than this entire color system. Technical precision without emotional warmth creates efficiency without loyalty.',
      },
    ],
  },

  'landing-page:dark-industrial:sam': {
    tagline: 'Dark theme saves my battery but monospace murders my mobile readability.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark background on OLED screens uses less battery — a genuine mobile advantage',
        verdict: 'good',
        comment: 'On my subway commute with 12% battery, the dark theme is a lifesaver. Every other light-background variation drains power while this one sips it. Practical wins matter when your charger is at home.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace type at mobile text sizes creates uneven word spacing that slows reading',
        verdict: 'needs-work',
        comment: 'Monospace looks authoritative on desktop but on a phone screen the fixed-width characters create awkward gaps in body text. Reading the FAQ answers feels like decoding a text file. Even true crime podcast transcripts use proportional fonts.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Terminal labels consume valuable mobile viewport space with non-informational decoration',
        verdict: 'needs-work',
        comment: 'SYS.HERO takes up a full line of screen real estate to tell me nothing I need to know. On a 375px viewport, every pixel matters. My comic book reader app hides chrome to maximize content. This page shows chrome and minimizes content.',
      },
    ],
  },

  // ─── WARM ORGANIC ──────────────────────────────────────────

  'landing-page:warm-organic:dorothy': {
    tagline: 'Oh, this is lovely! It feels like walking into a friend\'s kitchen.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Earth tone palette with sage, cream, and warm brown creates a welcoming, non-threatening atmosphere',
        verdict: 'good',
        comment: 'The soft colors remind me of the wallpaper in my reading nook. Nothing feels sharp or scary. I actually read all the way down to the FAQ because the page made me feel comfortable — like a good romance novel that keeps you turning pages.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded buttons with soft shadows feel inviting rather than demanding',
        verdict: 'good',
        comment: 'The "Start Your Training" button looks like a gentle suggestion rather than a command. That makes me actually want to click it. In my quilting circle, we say the best patterns are the ones that invite your eye, not grab it.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Heading hierarchy uses warm weights that feel personal rather than corporate',
        verdict: 'good',
        comment: 'The headings feel like they were written by a person, not a machine. Even "Master the Art of the Perfectly Timed Fall" sounds slightly less corporate when it is set in a friendly serif with comfortable weight. The church newsletter effect — familiar type builds trust.',
      },
    ],
  },

  'landing-page:warm-organic:maya': {
    tagline: 'After a day of screaming children, this page feels like a warm bath.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Generous spacing and comfortable padding create a browsing pace that respects the reader',
        verdict: 'good',
        comment: 'Nothing demands my attention aggressively. I can engage at my own pace. This is the IKEA showroom of landing pages — calm, organized, and I can picture myself living here. After kid bedtime chaos, this breathing room is medicinal.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded corners on all containers create visual softness but reduce visual hierarchy between section types',
        verdict: 'needs-work',
        comment: 'When everything is equally soft and round, the pricing section does not feel more important than the FAQ. My meal prep Sunday works because I organize containers by size. These sections are all the same visual "container" — pretty but undifferentiated.',
      },
      {
        category: 'COLOR',
        observation: 'Earth tones create warmth but the muted palette limits CTA visibility',
        verdict: 'needs-work',
        comment: 'The warm browns and sages are beautiful but the call-to-action blends into the earthy surroundings. In my DIY projects, I learned that even in a neutral room you need one accent wall. This page needs one bold element to anchor the eye.',
      },
    ],
  },

  'landing-page:warm-organic:frank': {
    tagline: 'Soothing pace? I do not need soothing, I need the price.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Generous spacing means three full scrolls to reach pricing information',
        verdict: 'needs-work',
        comment: 'The comfortable margins translate to wasted travel time. I have to scroll past three screens of breathing room before I see what this costs. ESPN puts the score at the top. This page puts the price at the bottom. Wrong priority order.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Soft rounded buttons look like suggestions rather than definitive actions',
        verdict: 'needs-work',
        comment: 'The CTA button has the urgency of a decorative pillow. "Start Your Training" in a rounded sage button is asking nicely when it should be telling me directly. Make it a rectangle. Make it bold. Stop whispering.',
      },
      {
        category: 'DECORATION',
        observation: 'Organic textures and soft shadows add visual weight without functional benefit',
        verdict: 'needs-work',
        comment: 'Every soft shadow and texture gradient is milliseconds of rendering and pixels of distraction that do not help me find information. My 5-ingredient meals work because every ingredient earns its place. These decorative textures are the parsley garnish — pretty, pointless.',
      },
    ],
  },

  'landing-page:warm-organic:raj': {
    tagline: 'The bard of the design party — charming, pleasant, and useless in combat.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Single-column layout with massive margins wastes 40% of viewport on empty space',
        verdict: 'needs-work',
        comment: 'I have a 32-inch monitor and I am reading a column narrower than a vim split. The "comfortable" spacing is comfortable like a waiting room is comfortable — it is managing my time, not respecting it. Give me a sidebar or a table of contents.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded, friendly typefaces sacrifice information density for emotional warmth',
        verdict: 'needs-work',
        comment: 'The soft type is pleasant but it communicates at half the density of monospace. As a D&D dungeon master who reads 300-page rulebooks, I value type that delivers content efficiently. This type delivers vibes.',
      },
      {
        category: 'COMPONENTS',
        observation: 'FAQ section uses smooth accordion transitions that feel deliberate and well-structured',
        verdict: 'good',
        comment: 'The FAQ interaction is actually well-built under the hood. The accordion state management is clean and the transitions are not blocking. As an open source contributor, I appreciate functional code hidden behind friendly surfaces — even if the surface is too friendly for my taste.',
      },
    ],
  },

  'landing-page:warm-organic:elena': {
    tagline: 'Correct heading hierarchy, proper ARIA labels — the invisible architecture is solid.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Section landmarks and heading nesting follow proper semantic structure for screen reader navigation',
        verdict: 'good',
        comment: 'I can jump between hero, pricing, testimonials, and FAQ sections confidently. The heading hierarchy is correct — h1 for the main headline, h2 for sections, h3 for cards. Like a well-organized audiobook with clear chapter markers.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Form inputs have associated labels and the email signup field announces its purpose clearly',
        verdict: 'good',
        comment: 'The email signup field has a proper label association and the submit button announces as "Unlock Your Punchline, button." Every interactive element identifies itself. In pottery class, you learn that what your hands feel matters more than what eyes see — same principle for screen readers.',
      },
      {
        category: 'DECORATION',
        observation: 'Testimonial cards lack distinct ARIA roles — screen reader announces them as generic containers',
        verdict: 'needs-work',
        comment: 'The testimonials are visually distinct but semantically anonymous. My screen reader says "group" instead of "testimonial from Sarah M." A true crime podcast always identifies who is speaking. These quotes do not.',
      },
    ],
  },

  // ─── RETRO-FUTURISM ───────────────────────────────────────

  'landing-page:retro-futurism:kevin': {
    tagline: 'FINALLY something that moves! The gradient transitions make scrolling actually fun.',
    observations: [
      {
        category: 'MOTION',
        observation: 'Scroll-triggered gradient transitions and bouncy hover interactions create constant visual feedback',
        verdict: 'good',
        comment: 'THIS is what the internet should look like. The teal-to-purple gradient shifts as I scroll, the buttons bounce on hover, and every interaction has a payoff. It is like a speedrun with frame-perfect visual cues — satisfying every time.',
      },
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient palette with neon accents creates high-energy visual atmosphere',
        verdict: 'good',
        comment: 'The palette pops on every screen size. My synthwave playlists have exactly this color energy. The neon accents on section headings make even "Master the Art of the Perfectly Timed Fall" feel like an album drop instead of corporate copy.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded containers with subtle glow effects give pricing cards a futuristic app-like feel',
        verdict: 'good',
        comment: 'The pricing cards look like upgrade tiers in a game — which is exactly how pricing should work. The "Headliner" plan glows brighter than "Opener" and that tells me everything I need to know. Visual hierarchy through vibes. Anime does this with power levels and it works here too.',
      },
    ],
  },

  'landing-page:retro-futurism:sam': {
    tagline: 'Designed phone-first and it shows. Rounded corners, generous touch targets, pops on small screens.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Card-based layout with rounded containers adapts cleanly to mobile viewports',
        verdict: 'good',
        comment: 'Nothing breaks at 375px. The rounded containers stack gracefully, the touch targets are generous, and the teal-purple palette is vibrant even on a subway-lit phone screen. This feels like it was designed for where I actually live — on the train, one thumb, one bar of signal.',
      },
      {
        category: 'COMPONENTS',
        observation: 'CTA buttons have generous padding and high-contrast gradient backgrounds for thumb-friendly tapping',
        verdict: 'good',
        comment: 'The "Start Your Training" button is large enough to hit with a bouncing subway thumb and bright enough to find instantly. My gacha games have trained me to spot shiny buttons — this one glows like a rare pull.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy animations add personality but consume render cycles on mid-range mobile devices',
        verdict: 'needs-work',
        comment: 'The hover animations are beautiful but my mid-range phone stutters on the gradient transitions during scroll. Mobile delight needs to degrade gracefully. Even my ramen review app throttles animations on older devices.',
      },
    ],
  },

  'landing-page:retro-futurism:sarah': {
    tagline: 'The gradients are doing heavy lifting for content that has nothing to say.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient transitions distract from empty content claims',
        verdict: 'needs-work',
        comment: 'Strip away the gradients and you are left with the same empty buzzwords, now with a retro coat of paint. I do not trust websites that try this hard to look fun. As a Consumer Reports subscriber, I want data, not a light show.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy hover interactions add 200ms of animation delay to every click',
        verdict: 'needs-work',
        comment: 'Every bounce animation is friction with a smile. When I am comparison shopping between three SaaS tools, I want instant responses, not playful delays. My spreadsheets respond in zero milliseconds. This page responds in however long the animation takes.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing cards use gradient glow to imply value hierarchy instead of clear data comparison',
        verdict: 'needs-work',
        comment: 'The "Headliner" plan glows brighter, which tells me the company wants me to buy it — not why I should. A proper comparison table with feature checkmarks would respect my intelligence. Glowing cards respect my dopamine receptors. I prefer the former.',
      },
    ],
  },

  'landing-page:retro-futurism:carlos': {
    tagline: 'Gradients and rounded corners signal early-stage startup, not established enterprise.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient palette reads as playful and unserious for B2B positioning',
        verdict: 'needs-work',
        comment: 'I see this palette and I think "they will pivot in six months." The design is energetic but unserious. When I evaluate companies, the website tells me if they are building for today or building to last. Gradients say "today." I invest in "to last."',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded, glowing pricing cards undermine the seriousness of a $99/month enterprise tier',
        verdict: 'needs-work',
        comment: 'You cannot charge enterprise prices with a consumer aesthetic. The "Enterprise" plan glowing in neon purple looks like a gaming subscription, not a business tool. Jazz clubs charge premium prices in dimly lit rooms with leather seats — not under blacklights.',
      },
      {
        category: 'LAYOUT',
        observation: 'Bouncy card layout with generous rounded padding creates approachability at the cost of authority',
        verdict: 'needs-work',
        comment: 'The layout says "fun startup" not "serious platform." Approachability and authority are not mutually exclusive, but this variation chose approachability and abandoned authority entirely. I would not show this to a board. I would show it to a college campus.',
      },
    ],
  },

  'landing-page:retro-futurism:tommy': {
    tagline: 'The gradient energy is hard. This feels like Spotify Wrapped meets a streetwear drop.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-purple gradient with neon accents creates high-energy visual branding',
        verdict: 'good',
        comment: 'The palette is giving Spotify Wrapped meets a Jordan release page. It has personality without being chaotic. I would send this link to my group chat and nobody would clown me. That is the test.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy hover interactions and scroll-triggered gradients create a sense of discovery',
        verdict: 'good',
        comment: 'The page rewards scrolling. Every section reveals a new gradient shift, every button bounces back. It is like producing a beat — each element drops in at the right time. The timing is fire.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded sans-serif type with generous weight variations creates friendly but potentially juvenile hierarchy',
        verdict: 'needs-work',
        comment: 'The type is approachable but it tips toward "kids app" at the thinner weights. On sneaker forums, the brands that earn respect use bold type with authority. The headline weight is perfect — the body text needs to bulk up.',
      },
    ],
  },

  // ─── MEMPHIS ───────────────────────────────────────────────

  'landing-page:memphis:tommy': {
    tagline: 'NOW we are talking. Bold shapes, unapologetic color — someone has an opinion.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric shapes and asymmetric patterns inject visual personality at every section boundary',
        verdict: 'good',
        comment: 'This is what design looks like when someone has an actual opinion. The bold shapes feel like a Supreme drop, not a corporate brochure. Every section has its own visual energy. I would screenshot this and post it, no cap.',
      },
      {
        category: 'COLOR',
        observation: 'Primary color palette with bold saturation creates immediate visual impact',
        verdict: 'good',
        comment: 'Red, blue, yellow — unapologetic and in your face. This is the color confidence of a limited-edition sneaker colorway. The saturated palette says "we are not afraid to be different" and in a sea of gray SaaS pages, that is a statement.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric layouts can disorient users looking for conventional navigation patterns',
        verdict: 'needs-work',
        comment: 'The asymmetry is bold but the pricing section breaks from the expected left-to-right flow. On streetwear forums, even the most creative drops have a clear "Add to Cart" position. This page makes me hunt for the action in the visual chaos.',
      },
    ],
  },

  'landing-page:memphis:dex': {
    tagline: 'Zine culture on the web. Asymmetric, irreverent, anti-corporate.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric shapes reference Memphis Group design language — deliberate post-modern citation',
        verdict: 'good',
        comment: 'This is Keith Haring meets web design. The bold shapes and primary colors are not random — they are citing a specific design movement with actual intellectual history. The only variation that has creative courage and knows where that courage comes from.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric section layouts break corporate grid conventions intentionally',
        verdict: 'good',
        comment: 'Each section sits at a different visual angle. In a zine, asymmetry is a philosophical position — it says "we reject your grid and substitute our own." This page has the raw energy of a skate culture archive: functional, opinionated, alive.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Bold display type competes with geometric shapes for visual attention',
        verdict: 'needs-work',
        comment: 'When the shapes and the type are both screaming, nobody wins. In a good gig poster, the band name and the artwork have a hierarchy. Here, the geometric decorations and the headlines are fighting at equal volume. Turn one down.',
      },
    ],
  },

  'landing-page:memphis:carlos': {
    tagline: 'This looks like a kindergarten art project. I cannot show this to investors.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric shapes and primary colors signal playfulness that undermines business credibility',
        verdict: 'needs-work',
        comment: 'Would you put your money in a company with this website? The asymmetric shapes compete with the content, and the primary palette suggests "fun startup" not "serious investment." I watch CNBC — credible companies project restraint, not confetti.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric layouts make pricing comparison physically disorienting',
        verdict: 'needs-work',
        comment: 'The three pricing tiers are at different visual positions and angles. Comparing $9 vs $29 vs $99 should not require my eyes to zigzag across the page. A jazz setlist reads top to bottom. This reads like a scattered deck of cards.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Display type at oversized weights trivializes corporate messaging',
        verdict: 'needs-work',
        comment: '"Master the Art of the Perfectly Timed Fall" in oversized bold primary-colored type reads like a motivational poster in a break room, not a value proposition. The words are already thin — the typography makes them thinner.',
      },
    ],
  },

  'landing-page:memphis:nora': {
    tagline: 'Primary colors cheapen everything they touch. This is a Happy Meal, not a product.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Fully saturated primary palette reads as mass-market and juvenile for premium positioning',
        verdict: 'needs-work',
        comment: 'I would never purchase a $99/month enterprise plan from a page that looks like a children\'s toy catalog. Red, blue, and yellow at full saturation are the colors of impulse, not investment. At the opera, the program uses two colors at most. Restraint is luxury.',
      },
      {
        category: 'DECORATION',
        observation: 'Geometric shapes near testimonials trivialize the social proof section',
        verdict: 'needs-work',
        comment: 'A testimonial from the "Chief Comedy Officer at Synergy Laughs" surrounded by floating triangles and circles loses whatever credibility it had. Social proof requires visual gravity. These shapes create visual levity. The combination is absurd.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing cards framed with bold asymmetric borders obscure the content hierarchy within each card',
        verdict: 'needs-work',
        comment: 'The geometric frames around each pricing tier are louder than the feature lists inside them. When I evaluate wine, the label should not overpower the tasting notes. Here, the frame overpowers the content at every level.',
      },
    ],
  },

  'landing-page:memphis:mike': {
    tagline: 'I was screen-sharing and my client said "that is... fun." In architecture, fun is a death sentence.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Asymmetric composition disrupts the predictable grid that professional screen-sharing requires',
        verdict: 'needs-work',
        comment: 'I share screens for a living. If I tabbed to this during a client presentation, the conversation would derail into discussing the decoration rather than the content. In architecture, "fun" buildings win awards but "functional" buildings win clients.',
      },
      {
        category: 'DECORATION',
        observation: 'Floating geometric shapes create visual noise that competes with informational content',
        verdict: 'needs-work',
        comment: 'The shapes are doing what all decoration does — competing for the attention that should belong to the content. In architecture photography, the best shots remove everything that is not the building. This page adds everything that is not the content.',
      },
      {
        category: 'COLOR',
        observation: 'Primary color palette with no neutral grounding feels unanchored and impermanent',
        verdict: 'needs-work',
        comment: 'Every element is saturated. There is no visual rest. My minimalist apartment has white walls so the few objects I own can be appreciated individually. This page has colored walls AND colored furniture AND colored carpet. Everything competes, nothing breathes.',
      },
    ],
  },

  // ─── ART DECO ──────────────────────────────────────────────

  'landing-page:art-deco:carlos': {
    tagline: 'The only variation I would put in front of a board of directors.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Gold geometric patterns and symmetrical borders project institutional authority',
        verdict: 'good',
        comment: 'When I see Art Deco design, I think "this company has been around long enough to afford taste." The gold accents and geometric precision say "established enterprise" in a visual language investors understand. This is the boardroom presentation of landing pages.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Elegant serif headings with gold underline rules create gravitas the content has not earned',
        verdict: 'good',
        comment: '"Master the Art of the Perfectly Timed Fall" in an elegant serif with a gold rule beneath it almost sounds like a mission statement worth funding. The design is doing the content\'s job — projecting authority on its behalf. Like a good single malt, the vessel elevates the experience.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Pricing cards with geometric borders and monospace prices project precision and transparency',
        verdict: 'good',
        comment: 'Monospace prices feel precise. Gold borders feel premium. The symmetrical pricing layout tells me this company organizes its finances the way it organizes its page — deliberately. That is the kind of signal that earns a second meeting.',
      },
    ],
  },

  'landing-page:art-deco:diana': {
    tagline: 'The geometric patterns! The symmetry! Every element placed with obsessive precision.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric patterns and gold accents show a level of intentional craft rare in landing pages',
        verdict: 'good',
        comment: 'This is the Wes Anderson tracking shot of web design. Every element is placed with obsessive precision. The geometric dividers between sections are not just decorative — they create a visual rhythm that rewards attention to detail. I want to frame this entire page.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headline with editorial spacing creates a magazine-cover reading experience',
        verdict: 'good',
        comment: 'The serif type at large sizes has actual character — ligatures, proper kerning, weight transitions that show someone chose this font instead of accepting a default. My Japanese stationery collection is organized by pen quality. This typography is the Pilot Vanishing Point of type choices — precise, intentional, delightful.',
      },
      {
        category: 'LAYOUT',
        observation: 'Perfect bilateral symmetry in every section creates elegance but limits visual dynamism',
        verdict: 'needs-work',
        comment: 'The symmetry is gorgeous but relentless. Every section is a mirror of itself. In thrift stores, the best displays combine structured shelving with one unexpected object. This page needs one intentional asymmetry — a pullquote off-center, a testimonial breaking the grid — to feel alive instead of embalmed.',
      },
    ],
  },

  'landing-page:art-deco:nora': {
    tagline: 'Finally, a design that communicates "we take ourselves seriously" without saying it.',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold on dark palette creates a luxury signaling system that elevates every content element',
        verdict: 'good',
        comment: 'Visual richness signals investment. A company that decorates this carefully is a company that will care about its product. The gold and dark palette is the visual language of opera houses, first-edition bindings, and wine cellars. It communicates taste before the first word is read.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headings with precise kerning and elegant weight transitions demonstrate typographic investment',
        verdict: 'good',
        comment: 'The serif type has the character of a well-set book — each heading a chapter title, each section a new movement. In my first-edition collection, the typography is half the value. This page treats type with that same reverence.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Testimonial section framed in geometric gold borders elevates generic quotes to feel curated',
        verdict: 'needs-work',
        comment: 'The gold framing around testimonials makes them look prestigious, but "Chief Comedy Officer at Synergy Laughs" is not a reference I would check. The design creates an expectation of quality the content does not meet. At wine tastings, a beautiful label with mediocre wine is the worst betrayal.',
      },
    ],
  },

  'landing-page:art-deco:tommy': {
    tagline: 'This looks like my grandpa\'s law firm website. Gold and serifs? In 2025?',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif-dominant typography reads as traditional and authoritative to older demographics, dated to younger ones',
        verdict: 'needs-work',
        comment: 'Serifs? SERIFS? Nobody on my timeline uses serifs unless it is ironic. This typography says "established firm" and I hear "no one under 40 designed this." On sneaker forums, even heritage brands use modern sans-serif for their drops.',
      },
      {
        category: 'COLOR',
        observation: 'Gold accent palette reads as "fancy hotel lobby" rather than "product I would use"',
        verdict: 'needs-work',
        comment: 'Gold is giving lobby of a hotel I cannot afford and would not want to stay in anyway. The color says "luxury" but the product is a $9/month SaaS tool. The mismatch between the gold wrapper and the content inside it is worse than a gold chain on a paper plate.',
      },
      {
        category: 'MOTION',
        observation: 'Zero animation, zero scroll interaction, zero visual feedback on hover',
        verdict: 'needs-work',
        comment: 'Nothing moves. Nothing bounces. Nothing feels alive. I scrolled through the whole page in four seconds because nothing caught my attention. Even basketball highlights have transition effects between clips. This page is a still photograph pretending to be a website.',
      },
    ],
  },

  'landing-page:art-deco:dex': {
    tagline: 'Polished, corporate, pre-approved. This is what design looks like when nobody is allowed to have a bad idea.',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric patterns and gold accents are technically skilled but aesthetically safe',
        verdict: 'needs-work',
        comment: 'Art Deco is the graphic design equivalent of a suit and tie. Every edge is filed smooth, every color is safe, every pattern is historically approved. This is design by committee where the committee has excellent taste but zero courage. A zine would not survive in this environment.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Elegant serif type with gold rules creates authority but suppresses any visual subversion',
        verdict: 'needs-work',
        comment: 'The typography is competent in the way that makes you trust a bank and distrust a person. There is no voice here, only polish. In vinyl collecting, the most valuable records have imperfect pressings — the flaws prove authenticity. This type has no flaws and no authenticity.',
      },
      {
        category: 'LAYOUT',
        observation: 'Perfect symmetrical grid with geometric precision creates a controlled, curated reading experience',
        verdict: 'needs-work',
        comment: 'The symmetry is impressive and suffocating. Every section obeys the grid like it is afraid to break a rule. In skate culture, the best spots are the ones the architects never intended for skating. This page has no unintended spaces — and therefore no discoveries.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // E-COMMERCE
  // ═══════════════════════════════════════════════════════════════

  // ─── SLAP (baseline) ───────────────────────────────────────

  'e-commerce:slap:marcus': {
    tagline: 'System-font product cards with zero visual hierarchy — this is a loot table with no stats',
    observations: [
      {
        category: 'COLOR',
        observation: 'Category color badges rely entirely on hue to differentiate Props from Costumes',
        verdict: 'blocker',
        comment: 'Blue for Props, purple for Costumes — those are the same color to me. Without an icon or text label on the badge, I literally cannot tell which category a product belongs to. My mechanical keyboard forums use shape-coded category icons for exactly this reason.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Product names, prices, and descriptions are all set in the same system font at similar sizes',
        verdict: 'needs-work',
        comment: 'The price of the banana peel is the same visual weight as the word "Premium" in the name. In any manga panel, the most important information gets the biggest treatment. Here everything screams at the same volume, which means nothing screams at all.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards have no hover state, no focus ring, and no visual feedback on interaction',
        verdict: 'needs-work',
        comment: 'I clicked "Add to Cart" and nothing happened visually — no animation, no color change, no confirmation. In indie games, even the most minimal UI gives you a click response. This feels like a dead button.',
      },
    ],
  },

  'e-commerce:slap:dorothy': {
    tagline: 'I cannot tell if this store is real or if the internet is broken again',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Products are listed in a plain vertical stack with no visual grouping or category separation',
        verdict: 'blocker',
        comment: 'I wanted to find the whoopee cushion and I had to scroll through banana peels and trousers first. At the church craft fair, similar items are grouped on the same table. This is like dumping everything in one pile and saying "good luck."',
      },
      {
        category: 'COMPONENTS',
        observation: 'The checkout form uses generic unstyled input fields with tiny placeholder text',
        verdict: 'needs-work',
        comment: 'The form fields are small gray boxes with light gray text inside. I had to squint to read "Enter your email." My church newsletter signup has bigger, friendlier fields than this supposed premium store.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Product descriptions use the same size and weight as every other text on the page',
        verdict: 'needs-work',
        comment: '"SlipShield technology" and "Add to Cart" look identical. If I cannot tell what is a feature and what is a button, I am going to close this tab and go to a store that makes sense.',
      },
    ],
  },

  'e-commerce:slap:carlos': {
    tagline: 'If this showed up in a pitch deck I would fire the design team before slide two',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'No hero image, no brand banner, no visual storytelling — products start immediately',
        verdict: 'blocker',
        comment: 'There is zero brand positioning above the fold. A $129.99 joy buzzer deserves more than a bulleted list. This layout communicates "we had no budget" louder than any product description could overcome. I have seen CNBC stock tickers with more visual investment.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Star ratings are rendered as plain text characters rather than styled components',
        verdict: 'needs-work',
        comment: 'Five plain-text stars next to a self-awarded 5/5 rating. No review count, no verification badge. This is a company grading its own homework and presenting it on a napkin.',
      },
      {
        category: 'COLOR',
        observation: 'The entire page uses browser-default link blue as the only accent color',
        verdict: 'needs-work',
        comment: 'Default blue links on a white page — this looks like a prototype someone forgot to style. Every business biography I have read talks about first impressions. This first impression says "we did not try."',
      },
    ],
  },

  'e-commerce:slap:frank': {
    tagline: 'I wanted to buy a banana peel and instead I got a wall of buzzwords',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Product cards display 40+ word descriptions before showing the price',
        verdict: 'blocker',
        comment: 'I have to read an entire essay about "proprietary SlipShield technology" before I find out the banana peel costs $12.99. On ESPN, the score is the first thing you see — the largest number on the screen. Here the price is buried under marketing copy like they are embarrassed by it.',
      },
      {
        category: 'LAYOUT',
        observation: 'No filtering or sorting — all eight products displayed in a single unsorted list',
        verdict: 'needs-work',
        comment: 'I want Props only. I cannot filter. I cannot sort by price. I have to visually scan every single card. My fantasy football app lets me filter 500 players by 12 criteria. This store with 8 products offers zero.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'The "Add to Cart" button text is the same size as the product description body copy',
        verdict: 'needs-work',
        comment: 'The most important action on the page — actually buying something — has the same visual weight as the word "meticulous." Make the button bigger than the adjectives.',
      },
    ],
  },

  'e-commerce:slap:sam': {
    tagline: 'Tried to buy a jacket on the subway — gave up before the page finished rendering',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product cards do not reflow for mobile — horizontal overflow causes sideways scrolling',
        verdict: 'blocker',
        comment: 'On my phone the product grid breaks into horizontal scroll territory. I am swiping sideways to read a product description. That is not shopping, that is a puzzle game — and not the fun gacha kind.',
      },
      {
        category: 'COMPONENTS',
        observation: 'The cart counter is a small text number in the header with no visual emphasis',
        verdict: 'needs-work',
        comment: 'I added two items and could not tell if anything happened. The cart count changed from 0 to 2 in 12px text. My gacha games show a glowing badge with particle effects when you pull a new character. This store cannot even bold a number.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Product descriptions run to full paragraph length on mobile without truncation',
        verdict: 'needs-work',
        comment: 'A 40-word description about "unprecedented crystal-clear pratfall trajectory" fills my entire phone screen for one product. I am reading a novel, not shopping. On the subway I need name, price, and a button — not a TED talk about banana peels.',
      },
    ],
  },

  // ─── BRUTALIST ─────────────────────────────────────────────

  'e-commerce:brutalist:frank': {
    tagline: 'Monospace prices and zero decoration — this is how commerce should work',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Prices displayed in large monospace type, visually dominant on every card',
        verdict: 'good',
        comment: 'The price is the biggest element on the card. $12.99 in bold monospace — I can comparison-shop across all eight products in under five seconds. This is the ESPN scoreboard of e-commerce: the number you care about, front and center.',
      },
      {
        category: 'LAYOUT',
        observation: 'Rigid grid with identical card sizes creates a scannable, predictable pattern',
        verdict: 'good',
        comment: 'Every card is the same height, same width, same structure. My eyes know exactly where to look. No card is trying to be special. It is a uniform grid and I can process it faster than any other variation.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add to Cart buttons are stark rectangles with no rounded corners or hover effects',
        verdict: 'needs-work',
        comment: 'The buttons work and they are clear, but a simple border-change on hover would confirm I am about to click. Even a 5-ingredient recipe tells you which step you are on.',
      },
    ],
  },

  'e-commerce:brutalist:sarah': {
    tagline: 'No lifestyle photography, no emotional manipulation — just the facts on a grid',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Product cards strip away lifestyle imagery and present only name, price, and description',
        verdict: 'good',
        comment: 'There is nothing here trying to emotionally manipulate me into buying. No aspirational photo of someone slipping on the banana peel. Just specs and price, laid bare. As a Consumer Reports subscriber, I appreciate a store that lets me evaluate the product instead of the marketing.',
      },
      {
        category: 'LAYOUT',
        observation: 'Checkout form uses labeled monospace input fields in a single-column layout',
        verdict: 'good',
        comment: 'The checkout form is a spreadsheet person\'s dream. Single column, clear labels, monospace inputs. Every field is exactly where I expect it. No surprise upsells, no "you might also like" distractions. Just complete the transaction.',
      },
      {
        category: 'COLOR',
        observation: 'The stark black-and-white palette removes all emotional color associations from products',
        verdict: 'needs-work',
        comment: 'The honesty is refreshing but the lack of any category differentiation means Props and Sets products look identical structurally. Even my comparison spreadsheets use color-coded tabs. Some visual grouping would help without undermining the brutalist thesis.',
      },
    ],
  },

  'e-commerce:brutalist:dex': {
    tagline: 'This is a record shop catalog in web form — minimal, functional, no aspirational nonsense',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product grid resembles a catalog layout with stark borders separating each item',
        verdict: 'good',
        comment: 'This looks like the inventory list at my local record shop — thick dividers, monospace text, zero pretension. The products speak for themselves without lifestyle photography telling you how to feel. That is authentic commerce.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Product names in uppercase monospace create a utilitarian, anti-marketing tone',
        verdict: 'good',
        comment: 'HERITAGE SQUIRTING FLOWER LAPEL in monospace feels like a warehouse tag, not a comedy supply catalog. The design strips away the self-congratulatory copy by making everything look like inventory. Punk rock does the same thing — remove the polish, reveal the substance.',
      },
      {
        category: 'DECORATION',
        observation: 'No decorative elements anywhere — not even a logo treatment or brand mark',
        verdict: 'needs-work',
        comment: 'I respect the anti-decoration stance, but even the best zines have a masthead. A single brand mark would anchor the page without compromising the brutalist integrity. Right now it looks less like a deliberate choice and more like nobody finished the header.',
      },
    ],
  },

  'e-commerce:brutalist:dorothy': {
    tagline: 'I thought the store was having technical difficulties',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'All product names are uppercase monospace, giving the page a technical terminal appearance',
        verdict: 'needs-work',
        comment: 'Why is everything shouting at me? The product names look like error codes, not things I might want to buy. When I shop for a whoopee cushion, I do not want it presented like a system alert. My recipe websites use friendly handwritten fonts and I trust them more.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Checkout form fields use stark borders and monospace labels like FIELD_01',
        verdict: 'blocker',
        comment: 'The checkout asked me to fill in FIELD_01 and FIELD_02. I genuinely thought the website was broken. I was about to call my son-in-law to fix this. A store should make you feel welcome, not make you feel like you need an engineering degree.',
      },
      {
        category: 'COLOR',
        observation: 'Entire shopping experience is black and white with no warmth or color accents',
        verdict: 'needs-work',
        comment: 'Shopping should feel a little bit exciting. This feels like reading a police report. Even the Hallmark store catalog uses a pop of red to say "look here, this is lovely." This page says nothing is lovely.',
      },
    ],
  },

  'e-commerce:brutalist:marcus': {
    tagline: 'Perfect contrast but the information density of an empty inventory screen',
    observations: [
      {
        category: 'COLOR',
        observation: 'Pure black on white provides maximum luminance contrast with no color-dependent information',
        verdict: 'good',
        comment: 'The best color accessibility of any variation. Nothing relies on hue to communicate meaning. Every product card is readable, every label is clear. My colorblind developer brain has zero complaints about the palette.',
      },
      {
        category: 'LAYOUT',
        observation: 'Product cards use the same rigid template with large amounts of whitespace within each card',
        verdict: 'needs-work',
        comment: 'Each card has name, description, price — and about 40% blank space. In manga, that wasted panel space would hold a reaction shot or environmental detail. Here it holds nothing. The stark grid is honest but it is not efficient.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart component is a simple list with monospace item names and a total',
        verdict: 'good',
        comment: 'The cart reads like a game inventory — item, quantity, price. Clear, structured, no emotional noise. I can verify my order without parsing through marketing copy. This is the functional minimum and it works.',
      },
    ],
  },

  // ─── NEO-MINIMAL ───────────────────────────────────────────

  'e-commerce:neo-minimal:priya': {
    tagline: 'Finally — product cards I can interact with without fear of misclicking',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Add to Cart buttons have generous padding and clear spacing from adjacent interactive elements',
        verdict: 'good',
        comment: 'The space between each button and the next interactive element is wider than my typical motor variance. I can shop independently without accidentally adding the wrong product to my cart. For someone with cerebral palsy, this gap is not whitespace — it is autonomy. Like a well-spaced crossword grid, every target has breathing room.',
      },
      {
        category: 'LAYOUT',
        observation: 'Single-column product layout on mobile with clear vertical separation between cards',
        verdict: 'good',
        comment: 'Each product card is its own distinct zone. Nothing bleeds into its neighbor. I can scroll and tap with confidence because the layout respects imprecise input. It is the bird-watching field guide of e-commerce — clear sections, no visual crowding.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin-weight product names at 200-300 weight create an elegant but low-contrast title',
        verdict: 'needs-work',
        comment: 'The lightweight type is beautiful but "Essential Oversized Checkered Trousers" at 200 weight almost disappears on my screen at arm\'s length. I need the product name to be the anchor of the card, not a whisper. A slight weight increase to 400 would preserve the minimal aesthetic without sacrificing readability.',
      },
    ],
  },

  'e-commerce:neo-minimal:jasmine': {
    tagline: 'If our customer portal looked like this, my ticket count would drop by half',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Clean product grid with generous whitespace and clear visual hierarchy',
        verdict: 'good',
        comment: 'After fifty support tickets about confusing product pages, this layout is a relief. Every element has one job and does it without competing for attention. It is the bullet journal spread of e-commerce — headers, content, action, done. My matcha-fueled brain can breathe here.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Checkout flow uses a single-step form with minimal required fields and clear validation',
        verdict: 'good',
        comment: 'I can picture the support tickets this checkout will NOT generate. Clear labels, inline validation, one step. No hidden fees appearing at the last moment. No "where do I enter my coupon code" confusion. This is the checkout I dream about when I am answering my 47th ticket of the day.',
      },
      {
        category: 'COLOR',
        observation: 'Single blue accent color used for all interactive elements creates monotone interaction language',
        verdict: 'needs-work',
        comment: 'Every clickable thing is the same shade of blue — the Add to Cart button, the filter links, the cart icon. Consistency is good, but when everything is emphasized equally, nothing is emphasized. Like a bullet journal with only one color of pen — functional but it loses the visual priority system.',
      },
    ],
  },

  'e-commerce:neo-minimal:mike': {
    tagline: 'The only product page I would share on a client call without flinching',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product presentation uses generous negative space that gives each item a gallery-wall treatment',
        verdict: 'good',
        comment: 'Each product sits in its own visual field, like a photograph on a white gallery wall. The spacing says "we are confident in what we are showing." When I screen-share this in a meeting, the client sees restraint and intention — not desperation. This is the architectural photography approach to product display.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Product names and prices use a clean sans-serif with distinct size hierarchy',
        verdict: 'good',
        comment: 'Name larger, description smaller, price distinct. The typographic hierarchy works the way a well-organized cycling route map works — your eyes know where to go first, second, third. No decision fatigue. On screen-share, my team can follow along without me pointing.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards lack any differentiating visual treatment between categories',
        verdict: 'needs-work',
        comment: 'Props and Sets products are visually identical except for the category label text. The minimal approach treats all products as equals, which is democratic but unhelpful when a client asks "show me just the gags." A subtle category indicator — even a thin colored line — would add wayfinding without breaking the minimal language.',
      },
    ],
  },

  'e-commerce:neo-minimal:marcus': {
    tagline: 'Accessible and clean — but where is all the information?',
    observations: [
      {
        category: 'COLOR',
        observation: 'Blue accent on near-white background is safe for all forms of color vision deficiency',
        verdict: 'good',
        comment: 'The single-accent color system means I never have to guess what is interactive. Blue means clickable, everything else is content. Simple, safe, and my colorblind developer eyes appreciate the clarity.',
      },
      {
        category: 'LAYOUT',
        observation: 'Generous whitespace consumes over 50% of the viewport on desktop product grid',
        verdict: 'needs-work',
        comment: 'I am looking at eight products but only three are visible at a time because of the whitespace padding. In a manga volume, this would be like having three panels per page when the story needs six. All this negative space could hold comparison data, specs, or filters. Restraint is fine — emptiness is wasteful.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards display description text but no expandable spec details',
        verdict: 'needs-work',
        comment: 'The card shows me "SlipShield technology" but not frequency response, battery life, or driver size. The minimal card is a facade — it hides information behind aesthetics. On mechanical keyboard forums, every listing leads with specs. Here, the specs do not exist.',
      },
    ],
  },

  'e-commerce:neo-minimal:kevin': {
    tagline: 'Clean but boring — this is the loading screen of online shopping',
    observations: [
      {
        category: 'MOTION',
        observation: 'No hover animations, no transitions, no interactive feedback beyond cursor change',
        verdict: 'needs-work',
        comment: 'I hovered over every product card hoping for something — a zoom, a flip, a glow, anything. Nothing. Not even a shadow shift. This is the most static shopping experience I have ever seen. Shopping apps on my phone have more personality in their loading spinners.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards are visually identical rectangles with no distinguishing visual features',
        verdict: 'needs-work',
        comment: 'Every card looks like a placeholder thumbnail waiting for a designer to come back from lunch. Where is the quick-view? Where is the image gallery? My anime figure shopping sites have 360-degree spin previews. This has a name and a paragraph.',
      },
      {
        category: 'COLOR',
        observation: 'The monochrome palette with single blue accent creates a sterile shopping environment',
        verdict: 'needs-work',
        comment: 'This store has the color range of a math textbook. Shopping should feel like discovery, not homework. The synthwave playlist aesthetic I love has more color in a single album cover than this entire product catalog.',
      },
    ],
  },

  // ─── MAXIMALIST ────────────────────────────────────────────

  'e-commerce:maximalist:yuki': {
    tagline: 'Every product card is a page from a design magazine — I want to screenshot them all',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Product cards use editorial-style layouts with mixed typefaces and decorative borders',
        verdict: 'good',
        comment: 'Each card feels like a page from a curated design magazine. The serif product names against sans-serif descriptions, the coral accents on navy card borders — this is BookTok mood board material. The Artisan Whoopee Cushion card alone is screenshot-worthy. This store makes shopping feel like curating a collection.',
      },
      {
        category: 'DECORATION',
        observation: 'Rich decorative framing around product images with layered textures and pull-quote styling',
        verdict: 'good',
        comment: 'The decorative density reminds me of a Ghibli background — every scroll reveals another considered detail. The ornamental borders around the foam brick collection make three foam bricks feel like a discovered treasure. This is what design does when it cares about the experience of looking.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dense editorial grid places products at varying sizes, breaking the uniform card pattern',
        verdict: 'needs-work',
        comment: 'The varying card sizes create visual interest but I lost the Heritage Squirting Flower Lapel in the layout because it was tucked into a smaller slot. When I am browsing I want to be surprised by design, not surprised by missing products. Even a cottagecore aesthetic shop needs findability.',
      },
    ],
  },

  'e-commerce:maximalist:frank': {
    tagline: 'Beautiful but I have been scrolling for 30 seconds and still have not found a price',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Prices are set in a decorative serif at a smaller size than the product description text',
        verdict: 'blocker',
        comment: 'The price is SMALLER than the marketing copy. I am reading three lines of "unprecedented crystal-clear pratfall trajectory" before I find $12.99 tucked into a decorative corner. On ESPN the score is always the biggest number on screen. Here the price is hiding behind adjectives like it is embarrassed.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add to Cart buttons have ornamental styling that reduces their visual distinctness as actions',
        verdict: 'needs-work',
        comment: 'The button looks like another decorative element. I had to hover over three different things before I found the one that actually adds to cart. A button should look like a button, not like a serif banner. Just let me buy the thing.',
      },
      {
        category: 'LAYOUT',
        observation: 'Product cards use variable heights based on description length, creating an uneven grid',
        verdict: 'needs-work',
        comment: 'Every card is a different size so my eyes cannot predict where the next price will be. Comparison shopping takes five times longer than it should because I am hunting through editorial layouts instead of scanning a grid. This is a magazine, not a store.',
      },
    ],
  },

  'e-commerce:maximalist:diana': {
    tagline: 'Each product gets its own theatrical presentation — this is retail as ceremony',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Decorative borders and typographic ornaments frame each product with editorial intention',
        verdict: 'good',
        comment: 'The ornamental framing around the breakaway chair card is the design equivalent of a Wes Anderson tracking shot — every element placed with obsessive precision. The decorative pull-quote treatment on the product descriptions transforms marketing copy into editorial content. I want to frame these cards.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Mixed serif headlines and sans-serif body text create a sophisticated magazine rhythm',
        verdict: 'good',
        comment: 'The serif product names give each item a name-tag formality, like a label on a piece of Japanese stationery. The sans-serif descriptions provide the practical detail. The interplay between the two typefaces creates a reading rhythm that makes even "proprietary SlipShield technology" feel considered.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart summary uses the same editorial styling, making order review feel like reading a receipt from a boutique',
        verdict: 'needs-work',
        comment: 'The stylized cart is beautiful to look at but I had to read it twice to find my total. Craft should serve clarity, not compete with it. Even my most treasured thrift-store receipts are legible at a glance. The cart needs to let function lead while craft follows.',
      },
    ],
  },

  'e-commerce:maximalist:sam': {
    tagline: 'This page loaded four web fonts and a parallax effect on one bar of signal',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'The editorial grid with variable-height cards does not reflow cleanly on mobile viewports',
        verdict: 'blocker',
        comment: 'On my phone the editorial layout collapses into a single column where each product card is the height of my entire screen. I am scrolling through a fashion magazine one page at a time when I just want to add a banana peel to my cart before my subway stop. Desktop luxury is mobile hostility.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Multiple decorative web fonts increase page weight and render time on slow connections',
        verdict: 'needs-work',
        comment: 'I counted three different typefaces loading before the product names appeared. On a subway connection, that is three seconds of staring at a blank layout. My gacha games preload assets during splash screens. This store makes me wait for fonts before I can see what it sells.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Hover-dependent product interactions have no touch equivalent on mobile',
        verdict: 'needs-work',
        comment: 'The hover effects that reveal additional product details do not translate to touch. On my phone I can see the card front but cannot access the back. I am getting half the shopping experience because I am using the device 70% of shoppers use. That is a comic book with missing pages.',
      },
    ],
  },

  'e-commerce:maximalist:priya': {
    tagline: 'The decorative density is a motor precision minefield',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Decorative borders and ornamental elements overlap with interactive card regions',
        verdict: 'blocker',
        comment: 'The ornamental corner accents on each product card sit right next to the Add to Cart button. My assistive input triggers the decoration instead of the action. The visual richness that makes this beautiful also makes it physically treacherous for someone with limited motor control. Like a crossword with squares too small to write in.',
      },
      {
        category: 'LAYOUT',
        observation: 'Variable card sizes mean interactive elements appear at inconsistent positions across the grid',
        verdict: 'needs-work',
        comment: 'The Add to Cart button is in a different position on every card because the cards are different heights. I cannot build muscle memory for where to click. Each product requires me to re-aim, which means each product costs me more physical effort. Consistency is not boring — it is accessible.',
      },
      {
        category: 'MOTION',
        observation: 'Hover transitions and animated decorative elements create moving click targets',
        verdict: 'needs-work',
        comment: 'The decorative elements shift on hover, which means my target is moving while I am trying to reach it. For someone who needs extra time to aim, a moving button is like a bird that flies away when I raise my binoculars — I need it to stay still.',
      },
    ],
  },

  // ─── DARK INDUSTRIAL ──────────────────────────────────────

  'e-commerce:dark-industrial:marcus': {
    tagline: 'This is a proper spec sheet — finally, a store that treats products like equipment',
    observations: [
      {
        category: 'COLOR',
        observation: 'Amber accent on dark navy provides strong luminance contrast independent of hue perception',
        verdict: 'good',
        comment: 'The amber-on-navy palette is one of the safest color combinations for my color vision. Every interactive element glows against the dark background like a terminal cursor. I can identify buttons, links, and active states without relying on color names. This is the accessibility sweet spot that also happens to look like a game settings menu.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards display specifications in a structured key-value format with monospace typography',
        verdict: 'good',
        comment: 'Each product reads like a stat sheet: name, category, price, description — structured like data, not prose. This is exactly how I browse mechanical keyboard listings: give me the specs, give me the price, let me decide. The product card IS the spec sheet. No emotional manipulation, just information.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace body text reduces reading speed compared to proportional typefaces for product descriptions',
        verdict: 'needs-work',
        comment: 'Monospace is perfect for prices and labels but the 40-word product descriptions slow down in monospace. The letter-spacing that makes $12.99 scannable makes "unprecedented crystal-clear pratfall trajectory" a slog. Even game stat screens use proportional text for flavor descriptions.',
      },
    ],
  },

  'e-commerce:dark-industrial:raj': {
    tagline: 'This store respects that I know how to read a spec sheet — finally',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product grid uses a dense, structured layout with clear terminal-style section labels',
        verdict: 'good',
        comment: 'The structured sections with monospace labels feel like a well-organized config file. Products, Cart, Checkout — each is a clearly bounded module I can navigate like I navigate vim splits. The information architecture respects expertise instead of hiding it behind consumer-friendly rounded corners.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart component uses a table-like structure with aligned columns for item, quantity, and price',
        verdict: 'good',
        comment: 'The cart is a properly formatted data table, not a stack of pretty cards. Columns align, totals are computed visibly, line items are editable. This is a shopping cart built by someone who has managed a D&D inventory — every item has a row, every row has stats, and the total is always visible.',
      },
      {
        category: 'COLOR',
        observation: 'Dark background with limited amber accents requires high screen brightness in daylight',
        verdict: 'needs-work',
        comment: 'The dark theme is perfect at 11 PM in my home office but usable at noon only if I crank my brightness. My home automation dashboard has an auto-theme that switches at sunset. A commerce site should consider that shopping happens at all hours, not just in dark rooms.',
      },
    ],
  },

  'e-commerce:dark-industrial:dorothy': {
    tagline: 'Shopping in the dark — why is the internet reinventing the light switch?',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark background with gray and amber text creates a low-brightness reading environment',
        verdict: 'blocker',
        comment: 'I had to increase my screen brightness to maximum just to read the product descriptions. My eyes are 68 years old and they need contrast, not mood lighting. The church newsletter is black text on white paper and it has worked perfectly for three decades. Why is this store making me squint?',
      },
      {
        category: 'COMPONENTS',
        observation: 'Technical terminal-style labels replace friendly descriptive headings throughout the interface',
        verdict: 'needs-work',
        comment: 'The section header says SYS.PRODUCTS instead of "Our Products." I do not know what SYS means and I do not want to learn. A store should greet me, not give me a security clearance test. This feels like the inside of a submarine, not a place to buy foam bricks.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace type throughout creates a cold, technical reading experience for product descriptions',
        verdict: 'needs-work',
        comment: '"A timeless silhouette reimagined for the modern individual" rendered in monospace looks like an error log, not a fashion description. The words are trying to be warm and the typeface is refusing to cooperate. It is like reading a romance novel in a coding font.',
      },
    ],
  },

  'e-commerce:dark-industrial:jasmine': {
    tagline: 'If a customer sent me a screenshot of this store I would escalate it as a rendering bug',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Checkout form uses terminal-styled inputs with monospace placeholder text and amber borders',
        verdict: 'needs-work',
        comment: 'I process fifty support tickets a day and I know exactly what customers would say about this checkout: "Is this form broken?" The terminal styling that developers find charming is a confusion engine for regular shoppers. My K-drama streaming apps have friendlier form fields than this.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dense information layout prioritizes data display over guided shopping flow',
        verdict: 'needs-work',
        comment: 'The layout dumps all product information at once instead of guiding the customer through a journey. There is no progressive disclosure, no "start here" signal. As someone who writes help documentation, I know that users need a path, not a data wall. My bullet journal has clearer flow than this store.',
      },
      {
        category: 'COLOR',
        observation: 'Amber-on-dark palette creates a consistent but emotionally cold shopping environment',
        verdict: 'needs-work',
        comment: 'Shopping for foam bricks in a color scheme that feels like a military radar screen is a tonal mismatch. The Curated Foam Brick Collection promises "dramatic impact" and "versatility" while being displayed in the visual language of a command center. The design and the product are telling opposite stories.',
      },
    ],
  },

  'e-commerce:dark-industrial:sam': {
    tagline: 'The dark theme drains battery on OLED but the dense layout saves scrolling',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark navy background (not pure black) does not trigger OLED pixel-off power savings',
        verdict: 'needs-work',
        comment: 'Pure black backgrounds save battery on OLED phones because the pixels turn off. This dark navy keeps every pixel lit while looking dark. I am getting the readability cost of a dark theme without the battery benefit. My gacha games use true black for their dark modes because mobile battery life matters.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dense product grid displays more items per viewport than any other variation',
        verdict: 'good',
        comment: 'I can see six products on my phone screen at once without scrolling. The compact cards prioritize scannable information over decorative spacing. On the subway, less scrolling means more shopping in fewer stops. This is the comic book panel density approach — maximum content per page.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Small monospace text in product descriptions is difficult to read on mobile screens in bright environments',
        verdict: 'needs-work',
        comment: 'The monospace product descriptions at this size require me to hold my phone closer than comfortable on a bright subway car. The amber text that looks sharp on a desktop monitor washes out in sunlight. I can read my true crime podcast show notes at arm length — I should be able to read a product price too.',
      },
    ],
  },

  // ─── WARM ORGANIC ─────────────────────────────────────────

  'e-commerce:warm-organic:dorothy': {
    tagline: 'Shopping here feels like visiting the Sunday farmers market — everything looks trustworthy',
    observations: [
      {
        category: 'COLOR',
        observation: 'Earth-tone palette with sage, cream, and terracotta creates a warm, inviting shopping environment',
        verdict: 'good',
        comment: 'The soft colors make me want to stay and browse. Every product looks handmade and cared for, even the banana peels. It reminds me of the farmers market on Sunday — warm, friendly, and I trust the person selling to me. The cream backgrounds and sage accents feel like my quilting circle\'s favorite color palette.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded product cards with soft shadows create a gentle, approachable card design',
        verdict: 'good',
        comment: 'The rounded corners and soft shadows make every product card feel like a gift. The whoopee cushion card looks like it belongs in a Hallmark catalog — inviting and warm. Nothing is sharp, nothing is scary, nothing makes me think I need to ask for help.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Friendly rounded typeface used for product names and navigation labels',
        verdict: 'good',
        comment: 'The font feels like a handwritten sign at a craft fair. "Artisan Whoopee Cushion" actually looks artisan in this typeface. The product names match the promise of the products for the first time. I would read every description because the type invites me to.',
      },
    ],
  },

  'e-commerce:warm-organic:maya': {
    tagline: 'This store feels like a curated home goods shop — I trust it with my credit card',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Spacious product grid with comfortable padding and clear visual breathing room',
        verdict: 'good',
        comment: 'After a day of screaming toddlers and burnt dinner, this page feels like a warm bath. Nothing demands my attention aggressively. I can browse at my own pace without visual noise competing for my exhausted brain. This is the IKEA showroom of online stores — calm, organized, and I can picture these products in my home.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards include a subtle "handmade" visual treatment with natural texture overlays',
        verdict: 'good',
        comment: 'The natural textures make the foam bricks look like something from my DIY YouTube rabbit hole — artisanal, intentional, worth the money. The design is doing the selling here. Even the banana peels feel like a thoughtful gift instead of mass-market comedy props.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add to Cart button is a soft, rounded pill shape with gentle color that reads as a suggestion',
        verdict: 'needs-work',
        comment: 'The button is so gentle it almost disappears into the card. I am pro-calm design, but the call-to-action should still feel like an action. My IKEA cart button is calm AND confident. This one is whispering when it should be speaking at normal volume.',
      },
    ],
  },

  'e-commerce:warm-organic:frank': {
    tagline: 'Stop trying to make me relax and just show me what things cost',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Rounded pill-shaped Add to Cart buttons use soft colors that blend with the card background',
        verdict: 'needs-work',
        comment: 'The Add to Cart button looks like a polite suggestion, not a command. Make it a rectangle. Make it bold. On ESPN, the "Watch Live" button hits you in the face. This button is asking permission to exist. I want to buy a banana peel, not practice mindfulness.',
      },
      {
        category: 'LAYOUT',
        observation: 'Generous vertical spacing between product cards requires extensive scrolling',
        verdict: 'needs-work',
        comment: 'The "comfortable spacing" between products means I have to scroll through a yoga retreat to find the breakaway chair. Three products per viewport when the page has eight. That is five extra scroll actions between me and a purchase. Comfort is the enemy of efficiency.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Prices are displayed in the same soft, rounded typeface as product descriptions',
        verdict: 'needs-work',
        comment: '$12.99 should not look cozy. A price is data, not a hug. Give me the number in a weight and size that says "this is the important part." Right now the price has the same energy as a greeting card. My fantasy football app makes point totals unmissable — prices should be too.',
      },
    ],
  },

  'e-commerce:warm-organic:raj': {
    tagline: 'The design is the bard of the party — charming and absolutely useless for data',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Product grid uses a loose organic arrangement rather than a strict structured grid',
        verdict: 'needs-work',
        comment: 'The soft grid layout wastes 35% of my viewport on padded nothingness. I have a 32-inch monitor and I can see three products at a time. My home automation dashboard displays twelve device status cards in the same space. This layout prioritizes vibes over information density.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart component uses a visual stack of rounded cards rather than a data table format',
        verdict: 'needs-work',
        comment: 'The cart is a stack of pretty cards instead of a table. I cannot compare line items at a glance because each one is a separate visual unit with its own padding orbit. As a D&D dungeon master, I track sixteen character inventories in a single table. This cart cannot even align three prices in a column.',
      },
      {
        category: 'DECORATION',
        observation: 'Subtle natural texture overlays and organic shapes add visual warmth without functional purpose',
        verdict: 'needs-work',
        comment: 'The organic textures are consuming rendering resources to create an "artisanal feel" for mass-produced comedy props. It is the web design equivalent of a farmhouse-style label on factory bread. My sci-fi audiobooks have more honest world-building than this store\'s manufactured authenticity.',
      },
    ],
  },

  'e-commerce:warm-organic:elena': {
    tagline: 'The semantic structure is as thoughtful as the visual warmth — this is care at every layer',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Product cards use proper heading hierarchy and ARIA labels for all interactive elements',
        verdict: 'good',
        comment: 'Every product card has a properly nested heading, a descriptive ARIA label on the Add to Cart button, and alt text that describes the product, not just "product image." The heading hierarchy flows correctly from page title to product names. It is like a well-structured audiobook — the chapters guide me where I need to go.',
      },
      {
        category: 'LAYOUT',
        observation: 'Checkout form uses properly associated labels and logical tab order',
        verdict: 'good',
        comment: 'The form labels are programmatically associated with their inputs and the tab order follows a logical top-to-bottom flow. I can complete the entire checkout with my screen reader without guessing which field I am in. Like navigating a pottery class step-by-step — each instruction builds on the last.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Cart updates announce changes via ARIA live regions but the announcement is generic',
        verdict: 'needs-work',
        comment: 'When I add a product, my screen reader says "cart updated" but does not say WHAT was added or the new total. I need "Professional-Grade Banana Peel added — cart total $12.99." Generic announcements are like a true crime podcast that says "something happened" without telling you what. Give me the details.',
      },
    ],
  },

  // ─── RETRO-FUTURISM ───────────────────────────────────────

  'e-commerce:retro-futurism:kevin': {
    tagline: 'HOVER ANIMATIONS! This is what online shopping should feel like!',
    observations: [
      {
        category: 'MOTION',
        observation: 'Product cards feature bouncy hover animations with scale-up and glow effects',
        verdict: 'good',
        comment: 'Every card responds when I hover over it — scale, glow, shadow shift. THAT is the bare minimum of life and finally someone delivered. The interaction feels like browsing a character select screen. Each product feels alive instead of being a dead rectangle. I would refresh this page for fun.',
      },
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient palette with neon accent highlights on product names and prices',
        verdict: 'good',
        comment: 'The gradient cards and neon price highlights make every product feel like a new drop. The teal-purple palette is synthwave-adjacent and I am absolutely here for it. This store has more personality in one product card than most stores have in their entire site.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded container cards with gradient backgrounds make price comparison less scannable',
        verdict: 'needs-work',
        comment: 'The gradient backgrounds behind each price make the numbers harder to scan quickly across cards. When I am speedrunning a purchase, I need the prices to pop off the page, not blend into a color wave. The vibes are immaculate but the data readability takes a hit.',
      },
    ],
  },

  'e-commerce:retro-futurism:sam': {
    tagline: 'Designed phone-first and it shows — this is how mobile shopping should work',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Card-based layout with rounded corners and generous touch targets optimized for mobile',
        verdict: 'good',
        comment: 'The rounded cards swipe naturally, the buttons are thumb-sized, and the teal-purple palette pops even on a cracked phone screen on the subway. This is the gacha game aesthetic applied to commerce and it works. Each product card feels like a pull — satisfying, immediate, and I want to see the next one.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add to Cart interactions include a satisfying micro-animation with color feedback',
        verdict: 'good',
        comment: 'The button pulses and changes color when I tap it. That fraction of a second of feedback tells me "yes, it worked" without me needing to scroll up and check the cart count. My comic book reader app does the same thing when I bookmark a page — immediate, tactile confirmation.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy page transitions add latency when navigating between product list, cart, and checkout',
        verdict: 'needs-work',
        comment: 'The transition animations between sections add about 300ms of perceived delay. On the subway between stops, that is three extra seconds across ten page interactions. Fun on Wi-Fi at home, frustrating on cellular in a tunnel. My ramen review app loads instantly — shopping should too.',
      },
    ],
  },

  'e-commerce:retro-futurism:sarah': {
    tagline: 'The gradients are doing a lot of heavy lifting for products with nothing special to say',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gradient card backgrounds create visual excitement that elevates unremarkable products',
        verdict: 'needs-work',
        comment: 'The teal-to-purple gradient behind the Essential Oversized Checkered Trousers makes a $24.99 pair of trousers look like a limited-edition collectible. That is not design — that is emotional manipulation. Strip away the gradients and you are left with the same vague product descriptions. I do not trust websites that try this hard to make ordinary things look exciting.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy hover animations on product cards add 200ms delay to every comparison interaction',
        verdict: 'needs-work',
        comment: 'When I am comparison shopping I need data, not a light show. Every bounce animation is 200ms I did not consent to. Across eight products that is 1.6 seconds of mandatory fun I cannot skip. My spreadsheet does not animate when I switch cells and that is a feature, not a limitation.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Price display uses decorative styling with gradient text that reduces scannable legibility',
        verdict: 'needs-work',
        comment: 'The gradient text on prices makes $129.99 harder to read at a glance than plain black on white. This is a debate team argument: style over substance. The price is the most important data point on a product card and it should be the easiest to read, not the prettiest.',
      },
    ],
  },

  'e-commerce:retro-futurism:carlos': {
    tagline: 'Gradients and bouncy buttons signal early-stage startup, not established brand',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient palette projects a playful, youthful brand identity',
        verdict: 'needs-work',
        comment: 'I see this palette and I think "Series A startup that will pivot in six months." The gradient says "we are fun" but products priced at $199.99 need to say "we are reliable." On CNBC, the companies that last longest have the most boring color schemes. Energy without authority is just noise.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards use rounded containers with playful interactions rather than structured layouts',
        verdict: 'needs-work',
        comment: 'The bouncy card interactions undermine the $129.99 Precision-Engineered Joy Buzzer. A product claiming "military-grade vibration motors" should not be presented in a container that jiggles when I touch it. The design and the product promise are in different boardrooms.',
      },
      {
        category: 'LAYOUT',
        observation: 'Bold gradient hero section pushes product grid below the fold on desktop viewports',
        verdict: 'needs-work',
        comment: 'The hero gradient burns the most valuable real estate on entertainment instead of commerce. I came to buy, not to be impressed by a color transition. In every business biography I have read, the lesson is the same — lead with the value proposition. This leads with the paint job.',
      },
    ],
  },

  'e-commerce:retro-futurism:tommy': {
    tagline: 'The gradient energy is hard — this store has main character energy',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-purple gradient palette with neon accents creates high visual energy across the store',
        verdict: 'good',
        comment: 'The color palette goes hard. The teal-to-purple feels like Spotify Wrapped meets a streetwear drop site. Every product looks like it belongs in a lookbook. I would send this link to my group chat and nobody would clown on me for it. This store has drip.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards feature playful hover states with scale and glow effects',
        verdict: 'good',
        comment: 'The hover states make browsing feel like scrolling through sneaker drops — each card reacts to you, makes you feel like you discovered it. The Heritage Squirting Flower Lapel card glows when I hover and I suddenly want a squirting flower lapel I did not know I needed. That is the design doing its job.',
      },
      {
        category: 'LAYOUT',
        observation: 'Bold visual energy throughout can overwhelm the checkout flow where focus is needed',
        verdict: 'needs-work',
        comment: 'The gradient energy is perfect for browsing but at checkout I need focus, not vibes. The payment form has the same teal-purple party happening behind it and I almost missed a form field. Even the hardest sneaker drops have a clean checkout page. Calm down for the last step.',
      },
    ],
  },

  // ─── MEMPHIS ───────────────────────────────────────────────

  'e-commerce:memphis:tommy': {
    tagline: 'This store has personality — every product card looks like a collector item',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric shapes frame each product card with asymmetric, post-modern styling',
        verdict: 'good',
        comment: 'The geometric frames around each product card make everything feel like a limited drop. The Heritage Squirting Flower Lapel surrounded by bold triangles and circles looks like it belongs on a streetwear forum, not a generic store. This is the Supreme of web layouts — every product feels curated and collectible.',
      },
      {
        category: 'COLOR',
        observation: 'Primary color palette with red, blue, and yellow creates bold, unapologetic brand energy',
        verdict: 'good',
        comment: 'The bold primaries hit different. Red, blue, yellow — no safe pastels, no corporate navy. This store has the same energy as a hip-hop album cover that does not care if everyone likes it. I would screenshot this and post it. The colors say "we have an opinion" and I respect that.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric product grid creates visual interest but makes price comparison difficult',
        verdict: 'needs-work',
        comment: 'The asymmetric layout is fire for vibes but when I am trying to figure out if I can afford the joy buzzer AND the squirting flower, I need the prices aligned somewhere predictable. Even sneaker drop sites line up the prices for comparison. Let me vibe AND budget.',
      },
    ],
  },

  'e-commerce:memphis:dex': {
    tagline: 'Memphis design is zine culture on the web — this store has actual creative courage',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric shapes and asymmetric frames break the conventional product card template',
        verdict: 'good',
        comment: 'Every product card is a composition, not a template. The floating triangles and offset borders feel like a zine layout translated to e-commerce. This is the only store variation that has creative courage — it looks like someone with an opinion designed it rather than someone with a Figma template.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric grid creates a gallery-like browsing experience rather than a utilitarian catalog',
        verdict: 'good',
        comment: 'The layout breaks the grid on purpose, like a gallery exhibition where each wall gets its own arrangement. Browsing feels like discovery instead of scanning. This is the skate magazine approach to product display — show me something unexpected and I will remember it.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Bold geometric buttons with primary colors compete visually with the product content',
        verdict: 'needs-work',
        comment: 'The red circle "Add to Cart" button is as visually loud as the product image it sits next to. Both are fighting for my eye. Even the best gig posters have a clear hierarchy — the band name is bigger than the venue. Here the action button and the product share the stage equally.',
      },
    ],
  },

  'e-commerce:memphis:carlos': {
    tagline: 'I cannot show this to investors — it looks like a kindergarten art project selling banana peels',
    observations: [
      {
        category: 'COLOR',
        observation: 'Primary color palette with bold red, blue, and yellow creates a playful, unserious brand impression',
        verdict: 'needs-work',
        comment: 'This color palette says "children\'s toy catalog," not "premium comedy props and gags." The Precision-Engineered Joy Buzzer at $129.99 is framed in primary-color geometric shapes that undermine every word of its "military-grade" product description. On CNBC, companies with this aesthetic get the "interesting startup" nod, never the "investment-grade" nod.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric product arrangement creates visual chaos that undermines organized shopping',
        verdict: 'needs-work',
        comment: 'Products are placed at random sizes and positions like a mood board instead of a store. I cannot scan this the way I scan a Bloomberg Terminal — top to bottom, left to right, predictable data positions. When I evaluate a company\'s website, I evaluate its organizational thinking. This layout says "we value vibes over structure."',
      },
      {
        category: 'DECORATION',
        observation: 'Floating geometric shapes overlap product cards and create visual noise between items',
        verdict: 'needs-work',
        comment: 'A floating yellow circle partially covers the price of the breakaway chair. Decorative elements should never obscure transaction data. This is the jazz equivalent of the drummer playing so loud you cannot hear the melody. Enthusiasm without discipline.',
      },
    ],
  },

  'e-commerce:memphis:nora': {
    tagline: 'I would never purchase premium anything from a store that looks like a children\'s party supply catalog',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric decorative elements frame products with playful, post-modern styling',
        verdict: 'needs-work',
        comment: 'The geometric shapes cheapen everything they touch. The Artisan Breakaway Chair — a product that claims "traditional craftsmanship meets modern innovation" — is framed by red triangles and blue circles like a prize at a school carnival. Luxury requires restraint. This is indiscriminate enthusiasm.',
      },
      {
        category: 'COLOR',
        observation: 'Primary color palette removes all possibility of sophistication or premium positioning',
        verdict: 'needs-work',
        comment: 'At the opera, the program is printed in black and gold because the venue understands that restraint communicates quality. This store uses every crayon in the box. The Precision-Engineered Joy Buzzer deserve better framing than a color palette borrowed from a Mondrian children\'s book.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards use irregular shapes and playful borders that fragment the shopping experience',
        verdict: 'needs-work',
        comment: 'Each product card has a different geometric personality. I cannot build a mental model of the catalog because no two cards present information in the same structure. Browsing a first-edition bookshop, every shelf follows the same logic. Here, every shelf is a different shape. Novelty is not navigation.',
      },
    ],
  },

  'e-commerce:memphis:mike': {
    tagline: 'I was sharing my screen and my client asked if the store was a design student\'s portfolio',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Asymmetric product grid with geometric interruptions creates an unprofessional presentation',
        verdict: 'needs-work',
        comment: 'I screen-share product pages with clients regularly. This layout would prompt a "that is... creative" response — which in architecture means "I hate it but I am too polite to say so." The asymmetric grid does not communicate the reliability that commercial clients expect. Form should follow function; here, form follows fun.',
      },
      {
        category: 'DECORATION',
        observation: 'Geometric shapes create visual noise that competes with product information',
        verdict: 'needs-work',
        comment: 'A yellow triangle overlapping a product card is not decoration — it is obstruction. In architectural photography, we remove distractions from the frame to let the building speak. These geometric elements are the design equivalent of a tourist walking through my shot. They are having fun; I am not.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Bold sans-serif product names compete with equally bold geometric design elements',
        verdict: 'needs-work',
        comment: 'When everything is bold, nothing is. The product names fight for attention against the geometric shapes, the primary colors, and the asymmetric layout. In minimalist architecture, a single bold element commands the room. Here, every element is shouting and the room is a headache. The pour-over coffee of typography — simple, clear, intentional — is nowhere to be found.',
      },
    ],
  },

  // ─── ART DECO ──────────────────────────────────────────────

  'e-commerce:art-deco:carlos': {
    tagline: 'Gold borders and serif product names — this is how you charge premium and nobody questions it',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Product cards use gold-accented borders with geometric corner details and serif product names',
        verdict: 'good',
        comment: 'Every product card feels like it belongs in a luxury catalog. The gold borders and serif names transform $12.99 banana peels into an investment piece. This is the Bloomberg Terminal of e-commerce — it communicates earned authority through visual precision. I would present this to a board of directors without a single qualifier.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace prices with gold accents create precise, authoritative price displays',
        verdict: 'good',
        comment: 'The monospace prices feel exact, considered, non-negotiable. $129.99 in monospace with a gold underline rule is a statement of value, not a number to be questioned. In every jazz vinyl shop I visit, the prices are printed with the same deliberation. This store understands that how you display a price IS your brand.',
      },
      {
        category: 'LAYOUT',
        observation: 'Symmetrical product grid with geometric patterns creates a formal, gallery-like shopping experience',
        verdict: 'good',
        comment: 'The symmetrical layout says "we curated this carefully." Every product has equal real estate, equal attention, equal importance. Like a well-organized whiskey collection — each bottle has its place, and the arrangement IS the statement. This store treats commerce as ceremony and I find that deeply credible.',
      },
    ],
  },

  'e-commerce:art-deco:diana': {
    tagline: 'Each product card is a tiny masterpiece of deliberate craft',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric Art Deco patterns frame product cards with gold-accented corner motifs',
        verdict: 'good',
        comment: 'The geometric corner motifs on each card are obsessively precise — every line at the same angle, every gold accent at the same weight. This is the Wes Anderson of e-commerce: perfectly symmetrical, deliberately crafted, delightful in its consistency. I want to frame the joy buzzer card and hang it in my kitchen.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Elegant serif product names create a name-tag formality that elevates even basic items',
        verdict: 'good',
        comment: 'The serif type transforms "Essential Oversized Checkered Trousers" from a commodity into a named thing — like a label on a piece of Japanese stationery. The typographic hierarchy gives every product gravitas it may not deserve but that the design provides generously. This is craft in service of presentation.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Add to Cart buttons use a restrained gold-on-dark treatment that integrates with the Art Deco system',
        verdict: 'needs-work',
        comment: 'The gold-on-dark button is beautiful but its visual weight is identical to the decorative borders around it. I stared at the card for three seconds before distinguishing the interactive element from the ornamental one. Craft should clarify, not camouflage. Even in a thrift store, the price tag is always distinct from the decoration.',
      },
    ],
  },

  'e-commerce:art-deco:nora': {
    tagline: 'Gold borders and geometric precision — this is how luxury presents itself online',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold, cream, and dark navy palette creates a premium, trust-building visual environment',
        verdict: 'good',
        comment: 'The color palette is the visual equivalent of a well-appointed department store. Gold communicates investment, navy communicates stability, cream communicates taste. Every product inherits an authority that the descriptions alone could never establish. This is how the opera house communicates before the performance begins — through the venue itself.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards present items with gallery-level care, each framed like an exhibited piece',
        verdict: 'good',
        comment: 'Each product gets its own theatrical moment. The Artisan Whoopee Cushion in its gold-bordered frame looks like a gallery piece with a placard. The design says "we curated this" even though the products are commercially available. That is the power of visual authority — it makes the ordinary feel considered, like a first-edition binding around an ordinary novel.',
      },
      {
        category: 'LAYOUT',
        observation: 'Symmetrical grid prioritizes visual harmony over flexible product arrangement',
        verdict: 'needs-work',
        comment: 'The rigid symmetry means every product gets equal visual weight regardless of price or importance. The $19.99 foam bricks receive the same gallery treatment as the $199.99 timing metronome. In a curated wine shop, the grand cru is displayed differently from the table wine. Luxury is about hierarchy, not uniformity.',
      },
    ],
  },

  'e-commerce:art-deco:tommy': {
    tagline: 'Gold and serifs — this store looks like it was designed for my grandpa\'s investment club',
    observations: [
      {
        category: 'COLOR',
        observation: 'Gold accent palette with dark navy creates a formal, traditional brand impression',
        verdict: 'needs-work',
        comment: 'Gold and navy in 2025? This color scheme is giving "hotel lobby" not "store I would actually shop at." The Professional-Grade Banana Peel at $12.99 is framed like it costs $799 — and not in a good way. Nobody on my timeline would share a product link that looks like a jeweler\'s display case.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif product names create a traditional, formal reading experience',
        verdict: 'needs-work',
        comment: 'The serif type makes "Heritage Squirting Flower Lapel" sound like something from a museum gift shop, not something I would bring to a show. Serifs are for books and law firms. My sneaker drop sites use bold sans-serif because they know their audience is under 30. This store does not know — or does not care — who is shopping.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards feature geometric Art Deco ornaments that add formality to casual products',
        verdict: 'needs-work',
        comment: 'The geometric gold corners on a $24.99 trousers card are pretending. It is like wearing a tuxedo to a pickup basketball game. The product is casual, the design is formal, and the mismatch makes both feel wrong. At least the hip-hop aesthetic knows what it is and commits to it.',
      },
    ],
  },

  'e-commerce:art-deco:dex': {
    tagline: 'Polished, corporate, pre-approved — this is what design looks like when nobody is allowed to have a bad idea',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric Art Deco patterns provide a polished, safe decorative system with no surprises',
        verdict: 'needs-work',
        comment: 'Every edge is filed smooth, every pattern is symmetrical, every accent is gold. This is the graphic design equivalent of a suit and tie — technically impeccable and completely devoid of personality. My zine layouts have more creative risk in a single page than this entire store. Art Deco is decoration by committee.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Product cards follow an identical rigid template with no variation in presentation',
        verdict: 'needs-work',
        comment: 'Every product card is exactly the same: gold border, serif name, centered description, price badge. The whoopee cushion gets the same treatment as the banana peels, which gets the same treatment as the joy buzzers. There is no curatorial voice here, just a template applied uniformly. At a gallery opening, the layout changes with each artist. Here, the frame never changes.',
      },
      {
        category: 'COLOR',
        observation: 'Gold-and-navy palette is premium but entirely predictable for luxury positioning',
        verdict: 'needs-work',
        comment: 'Gold on dark navy is the safest "luxury" color choice in design history. It is the default palette of every hotel website, every jewelry brand, every corporate annual report. There is zero subculture influence, zero risk, zero discovery. The vinyl records in my collection have more adventurous packaging than this entire color system.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TEXT-HEAVY
  // ═══════════════════════════════════════════════════════════════

  // ─── SLAP (baseline) ───────────────────────────────────────

  'text-heavy:slap:marcus': {
    tagline: 'Twelve minutes of system-font nothing with zero visual anchors',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Default system font at browser-default size with no typographic scale between headings and body',
        verdict: 'blocker',
        comment:
          'Every heading and every paragraph look like they belong to the same level. There is no visual weight system at all — just one font doing everything. In manga, even speech bubbles have tonal variation. This page has a single voice at a single volume for 12 minutes straight.',
      },
      {
        category: 'COLOR',
        observation: 'Pure black text on pure white background with no accent color or visual differentiation anywhere',
        verdict: 'needs-work',
        comment:
          'The contrast ratio is technically fine for my color vision, but the absence of any secondary color means there are zero visual landmarks in a 12-minute scroll. No highlighted terms, no colored section breaks, no pull quotes. It is like a game with no minimap — I have no idea where I am.',
      },
      {
        category: 'LAYOUT',
        observation: 'Single column stretching to full viewport width with no max-width constraint',
        verdict: 'blocker',
        comment:
          'On my 27-inch monitor the lines run about 160 characters wide. My eyes lose their place on every single line return. A manga page manages six panels in this space. This page cannot even manage one readable column.',
      },
    ],
  },

  'text-heavy:slap:dorothy': {
    tagline: 'I got lost by the third paragraph and never found my way back',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'No visible difference between section headings and body text weight or size',
        verdict: 'blocker',
        comment:
          'I kept scrolling and could not tell when one topic ended and the next began. My church newsletter uses bold headings and a little extra space — it is not complicated. This article has nothing to tell me where I am.',
      },
      {
        category: 'LAYOUT',
        observation: 'No paragraph indentation, no pull quotes, no visual resting points in a 12-minute article',
        verdict: 'needs-work',
        comment:
          'When I read a romance novel, there are chapter breaks and scene dividers that let me take a breath. This page is a single unbroken wall of text that exhausted me before I reached the second section. I gave up.',
      },
      {
        category: 'COMPONENTS',
        observation: 'No table of contents, no progress indicator, no way to know how far through the article you are',
        verdict: 'needs-work',
        comment:
          'I had no idea the article was 12 minutes long until I had already been scrolling for what felt like an hour. A simple "you are here" would have helped. Even my quilting patterns have step numbers.',
      },
    ],
  },

  'text-heavy:slap:carlos': {
    tagline: 'If this landed in my inbox I would assume the CSS failed to load',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'No visual hierarchy signals authority or editorial investment',
        verdict: 'blocker',
        comment:
          'This reads like a Google Doc with the toolbar hidden. No brand, no masthead, no typographic confidence. If someone sent me this as a "thought leadership piece" I would question whether the company has a design team at all. A jazz album with no cover art still has better packaging.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'System font with no serif or display typeface to establish editorial tone',
        verdict: 'needs-work',
        comment:
          'The article calls itself a "comprehensive guide" but the typography says "draft document." In the business biographies I read, the typeface alone tells you whether you are reading Harvard Business Review or a student blog. This font says neither.',
      },
      {
        category: 'COLOR',
        observation: 'Monochrome black-on-white with no branding color or accent',
        verdict: 'needs-work',
        comment:
          'There is not a single visual element that says "we invested in this." CNBC uses color headers to separate market sectors. Bloomberg has its signature green. This article has nothing — no brand, no identity, no investment signal.',
      },
    ],
  },

  'text-heavy:slap:frank': {
    tagline: 'I wanted to scan the headings and there were no headings to scan',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Heading levels are barely distinguishable from body text in size or weight',
        verdict: 'blocker',
        comment:
          'I read articles like I check ESPN scores — headers first, details only if something matters. But the headers here are almost the same size as the body text. I had to actually read the paragraphs to figure out what each section was about, which is twelve minutes of my life I will never get back.',
      },
      {
        category: 'LAYOUT',
        observation: 'No scannable structure — no bullet points, no pull quotes, no bold key phrases',
        verdict: 'needs-work',
        comment:
          'The fantasy football sites I use bold the player names and color-code the matchup ratings. I can scan a full waiver wire in 30 seconds. This 12-minute article has zero scannable entry points. It expects me to read every word like some kind of book.',
      },
      {
        category: 'COMPONENTS',
        observation: 'No "jump to section" links or sticky navigation for a long-form article',
        verdict: 'needs-work',
        comment:
          'ESPN puts anchor links at the top of every long article. Five sections, five links — done. This article makes me scroll through all five sections linearly like it is 2004 and I have nothing better to do.',
      },
    ],
  },

  'text-heavy:slap:sam': {
    tagline: 'Tried to read this on the subway and my thumb fell asleep scrolling',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'No responsive adjustments for mobile — text runs edge to edge with minimal padding',
        verdict: 'blocker',
        comment:
          'On my phone the text has maybe 8 pixels of padding on each side. Every line is crammed to the edges. When I read comics on my phone the panels reflow into a vertical strip with proper margins. This article just shrinks the same desktop wall of text onto a 6-inch screen.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Font size does not adjust for mobile viewport, making body text uncomfortably small',
        verdict: 'needs-work',
        comment:
          'I had to pinch-zoom twice to get the body text to a readable size, and then the lines ran off-screen. My gacha games auto-scale text to viewport. A 12-minute article cannot even manage font-size: clamp().',
      },
      {
        category: 'COMPONENTS',
        observation: 'No collapsible sections or progressive disclosure for a long article on mobile',
        verdict: 'needs-work',
        comment:
          'On mobile this is an infinite scroll of undifferentiated paragraphs. True crime podcast apps break episodes into chapters with timestamps. This article dumps 12 minutes of text with zero structure and expects me to scroll through it between subway stops.',
      },
    ],
  },

  // ─── BRUTALIST ─────────────────────────────────────────────

  'text-heavy:brutalist:frank': {
    tagline: 'The headings scream so I do not have to read the paragraphs',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: '900-weight uppercase headings create extreme contrast against normal-weight body text',
        verdict: 'good',
        comment:
          'The heading hierarchy is so aggressive I can scan all five sections in about four seconds. Each header hits like a scoreboard update — immediate, unmissable, no ambiguity. This is the ESPN ticker approach to article design and I am here for it.',
      },
      {
        category: 'LAYOUT',
        observation: 'Thick horizontal rules between sections create hard content boundaries',
        verdict: 'good',
        comment:
          'Every section break is a visible wall. I know exactly when one topic ends and the next begins without reading a single transition sentence. For a 12-minute article this saves me actual minutes of scrolling through filler.',
      },
      {
        category: 'COLOR',
        observation: 'Pure black-on-white with no accent colors creates a stark reading experience over long duration',
        verdict: 'needs-work',
        comment:
          'For scanning it is perfect, but if I actually had to read the body paragraphs the relentless black-on-white at 12 minutes would give me eye strain. Even a sports ticker alternates row colors. One accent color for key terms would break the monotony.',
      },
    ],
  },

  'text-heavy:brutalist:sarah': {
    tagline: 'Brutalist strips the polish so you can see the content has nothing underneath',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace accents on section labels expose the article structure as a skeleton',
        verdict: 'good',
        comment:
          'The monospace labels make this feel like an outline rather than a finished article — and that honesty is the point. When I do comparison shopping I strip out the marketing copy to find the specs. Brutalist does that automatically. The "timing triad" claim is hilariously exposed when the typography itself is doing all the readability work.',
      },
      {
        category: 'LAYOUT',
        observation: 'Single-column layout with generous section padding makes the thin content volume obvious',
        verdict: 'needs-work',
        comment:
          'The generous spacing between sections reveals how little actual content exists in each one. Section four — "Ornament vs. Crime" — is three paragraphs wrapped in as much visual real estate as section two. The design is honest, which means it exposes that the article is padded. As a Consumer Reports reader, I appreciate transparency even when it is unflattering.',
      },
      {
        category: 'DECORATION',
        observation: 'Zero decorative elements means the words have to stand entirely on their own',
        verdict: 'good',
        comment:
          'No pull quotes, no highlighted text, no editorial ornamentation. The content promised "elegant simplicity" in section four and Brutalist calls that bluff by actually delivering it — except the content is not elegant, it is empty. The debate team in me appreciates a framework that lets the argument stand or fall on its own merits.',
      },
    ],
  },

  'text-heavy:brutalist:dex': {
    tagline: 'The rawness is a mirror — and the reflection is brutal',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Heavy uppercase headings and monospace accents give the article a zine-like editorial voice',
        verdict: 'good',
        comment:
          'The typographic aggression makes this feel like an opinion piece in a protest zine rather than a corporate thought-leadership blog. The headings are shouting, which is honest — because the content under them is shouting too, just with buzzwords instead of conviction. I have typeset zines with more substance in a single column inch.',
      },
      {
        category: 'LAYOUT',
        observation: 'Thick borders frame each section like they are specimens under glass',
        verdict: 'good',
        comment:
          'The containment is ruthless. Each section sits inside its border like an artifact in a gallery case, inviting you to examine it closely — and the closer you look the less there is to see. The article claims to be a masterclass and Brutalist framing puts it on a pedestal where that claim cannot hide.',
      },
      {
        category: 'COLOR',
        observation: 'Stark black-and-white palette with no warmth or softening for a 12-minute reading session',
        verdict: 'needs-work',
        comment:
          'I love the rawness for short-form, but twelve minutes of unbroken high-contrast monochrome is physically punishing. Even a xeroxed zine uses gray tones and halftone textures to break the monotony. A single secondary tone — even a dark gray — would let the eye rest between sections without compromising the honesty.',
      },
    ],
  },

  'text-heavy:brutalist:dorothy': {
    tagline: 'Reading for twelve minutes in ALL CAPS headings is like being shouted at',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: '900-weight uppercase headings at large sizes dominate the page aggressively',
        verdict: 'blocker',
        comment:
          'Every time I scrolled to a new section it felt like someone raised their voice. In my romance novels the chapter titles are gentle invitations — "Chapter Seven: The Garden Party." These headings are barking orders at me. I wanted to close the tab by section three.',
      },
      {
        category: 'LAYOUT',
        observation: 'Thick black borders and hard section breaks create a rigid, institutional feel',
        verdict: 'needs-work',
        comment:
          'The page looks like a government form, not something I would choose to read for twelve minutes. Where is the warmth? Where is the softness? My church newsletter has more visual personality, and our budget is a donated inkjet printer.',
      },
      {
        category: 'COLOR',
        observation: 'No color at all — pure black-on-white for the entire article',
        verdict: 'needs-work',
        comment:
          'Not a single gentle color anywhere on the page. It is exhausting to look at for more than a minute. Even a Hallmark card uses a little blue or rose to make the words feel friendly. This makes me feel like I am reading a legal contract.',
      },
    ],
  },

  'text-heavy:brutalist:marcus': {
    tagline: 'Maximum contrast, maximum honesty, minimum information density',
    observations: [
      {
        category: 'COLOR',
        observation: 'Pure black-on-white passes WCAG AAA at every text size with no color-dependent meaning',
        verdict: 'good',
        comment:
          'Accessibility-wise this is bulletproof — the highest contrast I have seen in any variation and zero reliance on color for meaning. For my color vision this is the safest possible palette. It is the equivalent of a game running at max clarity settings.',
      },
      {
        category: 'LAYOUT',
        observation: 'Single column with thick borders wastes significant screen real estate on a wide monitor',
        verdict: 'needs-work',
        comment:
          'On my 27-inch monitor the thick borders eat into the content area and the body text still sits in a single narrow column. A manga page would use that border space for secondary content or visual storytelling. Here the borders are decorative walls around a room with not enough furniture.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace accents slow down reading speed in body text compared to proportional faces',
        verdict: 'needs-work',
        comment:
          'I read monospace in my IDE all day, but for long-form prose the fixed character width noticeably slows my reading pace. By section three I was fatigue-scanning instead of reading. Monospace works for code documentation — for a 12-minute article it is the wrong tool, like mapping keyboard shortcuts to a game that only needs a mouse.',
      },
    ],
  },

  // ─── NEO-MINIMAL ───────────────────────────────────────────

  'text-heavy:neo-minimal:priya': {
    tagline: 'The generous spacing is not just beautiful — it is physically necessary',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Generous whitespace between sections and wide margins create comfortable reading zones',
        verdict: 'good',
        comment:
          'The spacing between interactive elements means I can scroll and tap without triggering anything accidentally. For someone with cerebral palsy, that margin is not an aesthetic choice — it is the difference between reading independently and needing to zoom in to isolate every link. It is like a well-set crossword grid: every answer has its own space, nothing bleeds.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin font weights (200-300) reduce visual noise but can challenge readability at small sizes',
        verdict: 'needs-work',
        comment:
          'The light type weight is calming and reduces visual clutter, which helps me focus. But at smaller viewport sizes the strokes get dangerously thin — I lose letterforms the way I lose small birds against a pale sky. Body text needs at least 400 weight to stay legible across conditions.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Clean section transitions with 1px rules provide structure without clutter',
        verdict: 'good',
        comment:
          'The thin dividers tell me where sections begin without adding visual obstacles. It is minimal structure that does maximum work — like the thin lines in a crossword that separate clues from answers. Enough to orient, not enough to overwhelm.',
      },
    ],
  },

  'text-heavy:neo-minimal:jasmine': {
    tagline: 'After fifty tickets my brain needs this exact level of visual calm',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Ample whitespace and single-column layout reduces cognitive load for sustained reading',
        verdict: 'good',
        comment:
          'After reading 50+ support tickets in a day, my eyes are begging for something that does not assault them. This layout is the bullet journal spread of article design — clean headers, minimal decoration, everything in its place. I finished all five sections without my eyes glazing over, which is a first for this article.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Restrained type scale with clear heading differentiation through weight and spacing',
        verdict: 'good',
        comment:
          'The headings are distinguished by spacing and a subtle weight shift rather than shouting. It is the K-drama approach — the emotional beats land because the quiet moments earned them. Each section transition feels intentional rather than aggressive.',
      },
      {
        category: 'DECORATION',
        observation: 'No decorative elements, no pull quotes, no visual embellishment anywhere',
        verdict: 'needs-work',
        comment:
          'The restraint is calming but the article is 12 minutes long and there is literally nothing to break the monotony. Even my most minimal bullet journal spread has a washi tape accent or a colored header. One pull quote per section — or even a single accent line — would give my eyes a resting point without cluttering the calm.',
      },
    ],
  },

  'text-heavy:neo-minimal:mike': {
    tagline: 'The only article variation I could screen-share without an apology',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Clean single-column layout with constrained max-width projects confident editorial design',
        verdict: 'good',
        comment:
          'If I were sharing this article on a client call, the minimal frame would let the content speak without the design becoming a talking point. In architecture we call this "honest materials" — the design is not trying to compensate for anything. The restrained column width respects the reading experience the way a well-proportioned building respects its site.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin font weights create an elegant hierarchy but may fatigue readers in long-form',
        verdict: 'needs-work',
        comment:
          'The 200-weight type is beautiful in headings and opening paragraphs, but by section three the thin strokes start to tire my eyes. Pour-over coffee is about precision, not weakness — the type needs enough body to sustain a 12-minute pour. Bump the body weight to 400 and keep the light headings as contrast.',
      },
      {
        category: 'COLOR',
        observation: 'Single blue accent on near-white background creates a professional, understated palette',
        verdict: 'good',
        comment:
          'The monochromatic restraint with a single accent is the web design equivalent of a well-composed black-and-white photograph with one color element. It says "we chose this" rather than "we chose everything." For screen-sharing, the muted palette means no element competes with whatever I am discussing.',
      },
    ],
  },

  'text-heavy:neo-minimal:marcus': {
    tagline: 'Elegant emptiness — accessible and absolutely wasting my viewport',
    observations: [
      {
        category: 'COLOR',
        observation: 'Blue accent on near-white background is safe for all common color vision deficiencies',
        verdict: 'good',
        comment:
          'The single blue accent against the white field is completely safe for my color vision — no ambiguity, no red-green confusion. Technically this is one of the most accessible color approaches in any variation.',
      },
      {
        category: 'LAYOUT',
        observation: 'Extreme whitespace with narrow content column wastes over 60 percent of viewport on margins',
        verdict: 'needs-work',
        comment:
          'My 27-inch monitor is displaying a column narrower than a vim split surrounded by acres of nothing. In manga, a blank panel is a dramatic choice. Here it is just emptiness with nothing to say. The restraint is not elegant — it is avoidant. Give me a sidebar, a table of contents, anything to justify this screen real estate.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin font weights reduce readability for extended reading sessions',
        verdict: 'needs-work',
        comment:
          'The light type weight looks refined in short bursts but by section four the thin strokes were making me squint. Reading 12 minutes of 200-weight text is like playing an indie game with a beautiful art style and 15fps — the aesthetic is right but the performance is not there.',
      },
    ],
  },

  'text-heavy:neo-minimal:kevin': {
    tagline: 'Beautiful. Boring. I left after thirty seconds.',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Generous whitespace and sparse layout create no visual hooks to retain short-attention readers',
        verdict: 'needs-work',
        comment:
          'I scrolled through the entire article in three seconds because there was nothing — nothing — to stop on. No animation, no color pop, no visual surprise. It is the loading screen of articles: technically present, zero reason to stay. My attention tab-switched before I hit section two.',
      },
      {
        category: 'MOTION',
        observation: 'No scroll animations, no transitions, no dynamic elements whatsoever',
        verdict: 'needs-work',
        comment:
          'Where is the life? A speedrun has more visual events in one second than this article has in 12 minutes. Even a subtle parallax on the section headers or a fade-in on scroll would give my brain something to track. Static pages are for printers.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Thin, restrained type gives the article a whisper-quiet presence that fails to command attention',
        verdict: 'needs-work',
        comment:
          'The type is so light it feels like it is apologizing for existing. On my phone screen, the thin strokes practically disappear. My synthwave playlists have more visual weight in their cover art thumbnails than this entire 12-minute article has in its headings.',
      },
    ],
  },

  // ─── MAXIMALIST ────────────────────────────────────────────

  'text-heavy:maximalist:yuki': {
    tagline: 'Finally — an article that treats reading as an experience worth decorating',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Mixed serif headlines and sans-serif body with pull quotes create editorial richness',
        verdict: 'good',
        comment:
          'The serif headings against the sans-serif body create the kind of typographic layering I see in beautiful BookTok flat-lays — the contrast tells you someone cared about the composition. The pull quotes are decorative moments that reward close reading the way Ghibli backgrounds reward pausing the film.',
      },
      {
        category: 'DECORATION',
        observation: 'Decorative borders, editorial spacing, and ornamental section dividers create a magazine-like atmosphere',
        verdict: 'good',
        comment:
          'Every scroll reveals another considered detail. The section dividers, the pull quote borders, the typographic ornaments — this is what reading feels like when someone treats the experience as art. I would screenshot every section for my mood board. This is cottagecore editorial energy.',
      },
      {
        category: 'COLOR',
        observation: 'Navy, coral, and gold palette creates visual density that can overwhelm in long-form reading',
        verdict: 'needs-work',
        comment:
          'The richness that delights me in the first three sections starts to exhaust me by section five. It is like a Studio Ghibli feast scene — beautiful and abundant, but eventually your senses need a rest. A quieter palette zone mid-article would let the reader breathe before the final decorative crescendo.',
      },
    ],
  },

  'text-heavy:maximalist:frank': {
    tagline: 'I came here to read an article, not attend an art opening',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Decorative borders, ornamental dividers, and pull quotes add visual layers between reader and content',
        verdict: 'needs-work',
        comment:
          'There are at least three decorative elements per section competing with the actual text. I count a pull quote, a decorative border, and an ornamental rule before I even reach the body paragraphs. ESPN gives me scores with zero decoration. This gives me decoration with zero scores.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Three different typeface families in a single article view create visual complexity',
        verdict: 'needs-work',
        comment:
          'Serif headings, sans-serif body, and a third display face in the pull quotes. My eyes have to recalibrate for each typeface, which adds processing time to every section. A 5-ingredient meal does not need five different cooking techniques. Pick two fonts and commit.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dense editorial layout with multiple content layers makes scanning nearly impossible',
        verdict: 'blocker',
        comment:
          'I cannot scan the headings and skip the filler because the decorative density makes every part of the page look equally important. In a 12-minute article, the ability to scan is not a luxury — it is survival. This design makes me read everything at the same pace, which is the pace of "I am closing this tab."',
      },
    ],
  },

  'text-heavy:maximalist:diana': {
    tagline: 'Every ornamental detail is a craft decision and I want to examine each one',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Pull quotes with decorative borders and editorial ornaments create moments of typographic delight',
        verdict: 'good',
        comment:
          'The pull quote borders have the obsessive precision of a Wes Anderson set — each one placed with intention, each one rewarding inspection. The ornamental dividers between sections are tiny craft moments that make me want to slow down and appreciate the composition, like finding a hand-stitched detail in a thrift store find.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headlines with careful tracking create an old-world editorial gravitas',
        verdict: 'good',
        comment:
          'The serif headings have the personality of Japanese stationery typography — precision that reveals craftsmanship. The tracking is deliberate, the weight is considered, and the contrast with the sans-serif body is a design conversation between two voices. This is what typographic intention looks like.',
      },
      {
        category: 'COLOR',
        observation: 'Navy-coral-gold palette creates warmth but risks overwhelming the reader past the midpoint',
        verdict: 'needs-work',
        comment:
          'The palette is rich and considered — like a sourdough starter, the complexity develops over time. But by section four, the accumulated visual density makes my eyes reach for a simpler passage. Even Wes Anderson uses moments of visual silence between his maximalist compositions. The article needs a breath.',
      },
    ],
  },

  'text-heavy:maximalist:sam': {
    tagline: 'Gorgeous on desktop, completely hostile on my phone',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Dense editorial layout with decorative margins and pull quotes collapses on mobile viewports',
        verdict: 'blocker',
        comment:
          'The multi-column pull quotes and wide decorative margins are designed for desktop screens. On my phone the elements stack vertically and the article becomes a 20-minute scroll of alternating text and orphaned decorative borders. I read comics on my phone and they reflow intelligently. This just breaks.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Multiple typeface families load slowly and render inconsistently on mobile browsers',
        verdict: 'needs-work',
        comment:
          'Three web fonts on a subway connection means the article renders in system fallbacks for the first five seconds and then reflowes when the custom faces load. It is like a gacha game that loads the UI before the character skins — jarring and distracting. On mobile, one font family is the maximum budget.',
      },
      {
        category: 'COLOR',
        observation: 'Rich navy-coral palette pops on high-DPI screens but loses contrast in bright outdoor light',
        verdict: 'needs-work',
        comment:
          'The coral accents on navy looked beautiful on my monitor but in direct subway-exit sunlight the contrast drops and the text becomes hard to read. My ramen-hunting apps use high-contrast colors that survive outdoor light. An editorial palette needs to be legible where people actually read, not just where designers design.',
      },
    ],
  },

  'text-heavy:maximalist:priya': {
    tagline: 'The decorative density turns every scroll into a motor-precision obstacle course',
    observations: [
      {
        category: 'COMPONENTS',
        observation: 'Decorative elements and pull quotes placed near interactive links create accidental-tap zones',
        verdict: 'blocker',
        comment:
          'The ornamental borders sit close to inline links, and the pull quotes create secondary tap targets near primary navigation. For my motor control, every decorative element near a link is a potential misclick. It is like a crossword where the squares are too small and the pencil is too thick — precision is punished rather than supported.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dense editorial layout with tight element spacing reduces the safe zone between actions',
        verdict: 'needs-work',
        comment:
          'The editorial density that makes this beautiful also makes it physically difficult to navigate. The spacing between decorative elements and interactive elements is below what I need for confident tapping. In bird watching, I use binoculars to bring things closer — here I need the opposite, more space to push things apart.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Mixed typeface families with varied sizes create inconsistent reading positions across sections',
        verdict: 'needs-work',
        comment:
          'Each section has a slightly different typographic rhythm — headings at different sizes, body text at different leading values. My eyes and my assistive input have to recalibrate for each section. A consistent reading position is not a luxury for me, it is a functional requirement. Like a crossword, the grid should be predictable so the challenge is the content, not the container.',
      },
    ],
  },

  // ─── DARK INDUSTRIAL ───────────────────────────────────────

  'text-heavy:dark-industrial:marcus': {
    tagline: 'This is home — dark background, monospace labels, proper information architecture',
    observations: [
      {
        category: 'COLOR',
        observation: 'Amber accents on dark navy provide strong contrast without relying on red-green differentiation',
        verdict: 'good',
        comment:
          'The amber-on-navy palette passes every color vision deficiency simulation I have tested. The accent color creates visual landmarks in the long-form content without any red-green ambiguity. This is like a game settings menu designed by someone who actually tested it on different display profiles — functionally inclusive by default.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace throughout with terminal-style section labels creates a documentation-like reading experience',
        verdict: 'good',
        comment:
          'The monospace type and structured labels make this article feel like technical documentation, which is exactly my preferred reading format. The section headers with their terminal-style labels are like chapter titles in a dev wiki. I have spent 15 years reading monospace. For me, this is native.',
      },
      {
        category: 'LAYOUT',
        observation: 'Dark background reduces eye strain for extended reading but narrows the usable text column',
        verdict: 'needs-work',
        comment:
          'The dark theme is comfortable for long sessions — I code in dark mode for 10 hours a day. But the content column feels constrained by the terminal-frame aesthetic. I want more information density, not less. A mechanical keyboard forum thread packs more content per screen than this article manages. The aesthetic is right but the information architecture is under-utilizing the space.',
      },
    ],
  },

  'text-heavy:dark-industrial:raj': {
    tagline: 'I could configure this — and that is the highest compliment I give',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Structured section layout with clear break points maps well to a configurable reading experience',
        verdict: 'good',
        comment:
          'The terminal-inspired structure with labeled sections and hard breaks feels like a config file I could parse. Each section has a predictable header pattern, a content block, and a clean termination. As a dungeon master who reads 300-page rulebooks, a predictable structure is the difference between a reference I use and a book that sits on the shelf.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace body text at extended length reduces reading speed compared to proportional faces',
        verdict: 'needs-work',
        comment:
          'I love monospace in my terminal — I have spent two decades reading it. But even I notice the reading speed drop in body paragraphs longer than a config block. Monospace is optimized for scanning structured data, not for flowing prose. This article should use proportional body text with monospace reserved for labels and headers. Even a D&D rulebook uses proportional body text — the stat blocks are monospace, the lore is not.',
      },
      {
        category: 'COLOR',
        observation: 'Dark background with amber accents reduces eye strain for extended evening reading sessions',
        verdict: 'good',
        comment:
          'At 11pm after a day of coding, this is the only variation I could read without reaching for my blue-light glasses. The dark background with warm amber accents is the color equivalent of my home automation "night mode" — functional, comfortable, and designed for the human who is actually going to use it at 2am.',
      },
    ],
  },

  'text-heavy:dark-industrial:dorothy': {
    tagline: 'I feel like I need a security clearance to read an article',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark navy background with amber text reverses the expected reading paradigm for non-technical users',
        verdict: 'blocker',
        comment:
          'Everything is backwards. Dark background, light text — that is not how reading is supposed to work. My church newsletter is black ink on white paper and it has worked since Gutenberg. I increased my screen brightness to maximum and still felt like I was reading in a cave. This design is for people who find submarines cozy.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace typeface throughout makes every paragraph feel like computer code',
        verdict: 'needs-work',
        comment:
          'I do not read computer code. I read romance novels and church newsletters, both of which use normal fonts that look like normal writing. This monospace makes every sentence feel like a technical instruction. I should not need an engineering degree to read an article about readability.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Terminal-style section labels like "SYS.SECTION" alienate non-technical readers',
        verdict: 'needs-work',
        comment:
          'The section labels look like error messages. I do not know what the technical labels mean and I should not have to. When I edit the church newsletter I write "Section 3: Community Events." This page writes something that looks like a submarine control panel and expects me to decode it.',
      },
    ],
  },

  'text-heavy:dark-industrial:jasmine': {
    tagline: 'If a customer sent me a screenshot of this I would file a bug report',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark theme with amber text creates an intimidating aesthetic that discourages casual reading',
        verdict: 'needs-work',
        comment:
          'This is an interface designed for the people who built it, not the people who read it. In customer support I see this pattern constantly — developers ship what they like and users submit tickets about it. The dark-on-amber palette is beautiful in a code editor and hostile in an article. After answering 50 tickets about "why does the page look weird," I have no patience for designs that prioritize developer aesthetics over reader comfort.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace body text significantly slows reading speed for non-technical readers',
        verdict: 'needs-work',
        comment:
          'The monospace font adds maybe 30 percent more reading time to every paragraph. For users scanning an article between tasks — which is all of my support team — that is the difference between reading it and bookmarking it forever. My bullet journal uses a clean sans-serif because speed of comprehension matters when you are processing information all day.',
      },
      {
        category: 'LAYOUT',
        observation: 'Terminal-frame aesthetic with structural labels projects a technical authority the content has not earned',
        verdict: 'needs-work',
        comment:
          'The design wraps corporate buzzwords in a developer-tools aesthetic, creating a false impression of technical depth. It is like plating instant ramen in a matcha ceremony bowl — the presentation promises something the content cannot deliver. The terminal frame is a costume, not an identity.',
      },
    ],
  },

  'text-heavy:dark-industrial:sam': {
    tagline: 'Dark mode on the subway is actually comfortable — if I could read monospace at this size',
    observations: [
      {
        category: 'COLOR',
        observation: 'Dark background reduces screen glare in variable-lighting mobile environments',
        verdict: 'good',
        comment:
          'On the subway, the dark background means my screen is not a flashlight bothering the person next to me. The amber text is readable in both tunnel darkness and station lighting. This is the first variation that is actually optimized for how I read — in transit, in variable light, on a phone.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Monospace body text at mobile font sizes becomes difficult to read without zooming',
        verdict: 'needs-work',
        comment:
          'Monospace characters are wider than proportional ones, so fewer words fit per line on my phone. Paragraphs that are three lines on desktop become seven lines on mobile, and the monospace makes every line feel like code I need to parse rather than prose I can flow through. My comic reader app uses proportional text in speech bubbles for exactly this reason.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Terminal-style labels and structured headers create useful navigation anchors on mobile',
        verdict: 'good',
        comment:
          'The bold section labels stand out when I am thumb-scrolling at speed, which makes it easy to find my place if I lose it between stops. True crime podcasts have timestamp markers for exactly this reason — when you pause and come back, you need a landmark. The terminal headers serve that purpose.',
      },
    ],
  },

  // ─── WARM ORGANIC ──────────────────────────────────────────

  'text-heavy:warm-organic:dorothy': {
    tagline: 'This is the first variation where I finished the entire article',
    observations: [
      {
        category: 'COLOR',
        observation: 'Earth-tone palette with warm background creates a comfortable, inviting reading environment',
        verdict: 'good',
        comment:
          'The soft cream background and warm brown text feel like reading a book in my favorite armchair. Nothing is harsh, nothing is cold. Even the section headings feel like gentle invitations rather than announcements. This is the first time in any variation where I actually wanted to keep reading. It feels like a friend wrote this, even though the content is nonsense.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded, friendly typeface with comfortable size and leading supports relaxed long-form reading',
        verdict: 'good',
        comment:
          'The font looks like what I see in my romance novels — proportional, warm, with generous spacing between lines. I do not know the technical terms but I know that my eyes did not get tired even by section five. That has never happened with this article before.',
      },
      {
        category: 'LAYOUT',
        observation: 'Soft shadows and rounded containers create the sense of distinct, manageable content sections',
        verdict: 'good',
        comment:
          'Each section feels like a chapter in a cozy book rather than a block on a spreadsheet. The rounded edges and soft shadows make the page feel safe and organized, like a well-laid-out quilting pattern where every piece has its place. I would read this at bedtime without it keeping me awake from visual stress.',
      },
    ],
  },

  'text-heavy:warm-organic:maya': {
    tagline: 'After the kids are in bed this is the only article I would not rage-close',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Generous spacing and rounded containers create a visually forgiving layout for fatigued readers',
        verdict: 'good',
        comment:
          'At 9pm after a full day of parenting, this page does not punish my tired eyes. The rounded containers and breathing room between sections let me engage at my own pace. It is the IKEA showroom approach — organized, calm, and I can picture myself staying here for a while. No element is aggressively demanding my attention.',
      },
      {
        category: 'COLOR',
        observation: 'Earth tones reduce screen fatigue compared to high-contrast or high-saturation palettes',
        verdict: 'good',
        comment:
          'The warm palette is physically easier to look at after a day of screen time with the kids — YouTube, tablets, school apps, all in bright primary colors. This is the meal-prep equivalent of design: nourishing without being overwhelming. My eyes can actually rest on this page.',
      },
      {
        category: 'DECORATION',
        observation: 'Soft shadows and organic textures mask the article\'s structural weaknesses gently',
        verdict: 'needs-work',
        comment:
          'The warm design almost makes me forget that the article itself is saying nothing. The comfortable visual wrapping is doing a lot of work to make weak content feel substantial — like putting a beautiful IKEA frame around a stock photo print. The design is great, but it is also hiding the fact that the content does not deserve this much kindness.',
      },
    ],
  },

  'text-heavy:warm-organic:frank': {
    tagline: 'I do not need to be soothed — I need to find the point',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Generous padding and spacing between sections increases total scroll distance significantly',
        verdict: 'needs-work',
        comment:
          'The comfortable spacing that others find relaxing adds about 40 percent more scrolling to a 12-minute article. I am not here to relax — I am here to extract information. The ESPN app puts box scores in a tight grid because sports fans want data, not ambiance. This design is optimized for lounging when I need it optimized for scanning.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded, friendly typeface softens the content but reduces scanning efficiency',
        verdict: 'needs-work',
        comment:
          'The soft font is pleasant but it rounds off the visual edges that make headings scannable. Brutalist gave me bold markers I could lock onto in milliseconds. This gives me gentle suggestions. When I am reading an article between checking fantasy football scores, I need the headings to hit, not whisper.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Rounded, soft-shadowed call-to-action elements feel like suggestions rather than clear directions',
        verdict: 'needs-work',
        comment:
          'The "read next" and section links have rounded corners and pastel styling that make them look optional. A button should tell me what to do, not politely suggest it. Make the interactive elements look interactive — firm edges, clear contrast, no ambiguity. A 5-ingredient recipe does not use "consider adding" — it says "add."',
      },
    ],
  },

  'text-heavy:warm-organic:raj': {
    tagline: 'The design bard of the party — charming, pleasant, and useless in combat',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Single-column layout with generous margins wastes viewport on a wide monitor',
        verdict: 'needs-work',
        comment:
          'On my 32-inch monitor this is a narrow column of warm nothingness surrounded by warm empty margins. The design is the bard of the party — everyone likes having them around, but when you need to get something done they are strumming in the corner. Give me a sidebar with a table of contents, or at least use the margin space for annotations.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded typeface and comfortable leading prioritize comfort over information density',
        verdict: 'needs-work',
        comment:
          'The generous leading means fewer lines per screen, which means more scrolling, which means more time spent on content that is not saying anything. My D&D rulebooks use tight leading for rules text and generous leading for narrative — the design should adapt to content density, not apply one comfortable setting to everything. Warm Organic treats all content like narrative and ignores that some of it needs to be scanned.',
      },
      {
        category: 'COLOR',
        observation: 'Earth-tone palette hides the content\'s emptiness behind visual comfort',
        verdict: 'needs-work',
        comment:
          'The warm colors make me less angry at the content, which is actually a problem. Design should not anesthetize the reader. At least Dark Industrial had the honesty to present the content in a frame that demanded substance. This variation wraps empty calories in comfort food plating and hopes you will not notice. As a DM, I notice when the flavor text is doing all the work.',
      },
    ],
  },

  'text-heavy:warm-organic:elena': {
    tagline: 'The semantic structure is clean and the heading hierarchy is correct',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Well-defined section landmarks with proper ARIA labels support confident screen-reader navigation',
        verdict: 'good',
        comment:
          'I can jump between all five sections using my screen reader\'s landmark navigation. Each section has a proper heading level, a clear content boundary, and descriptive ARIA labels. The warm visual design does not affect my experience directly, but the care in the visual layer seems to have carried over to the semantic layer — which is where I live.',
      },
      {
        category: 'COMPONENTS',
        observation: 'Heading hierarchy follows correct nesting order with no skipped levels',
        verdict: 'good',
        comment:
          'H1 for the article title, H2 for each section, no jumps from H2 to H4. This is how heading structure should work — like audiobook chapters with properly nested sub-chapters. My screen reader announces each level and I always know where I am in the content hierarchy. It is like a well-structured podcast with chapter markers.',
      },
      {
        category: 'DECORATION',
        observation: 'Decorative soft shadows and rounded containers are invisible to screen readers and do not interfere',
        verdict: 'good',
        comment:
          'None of the decorative visual elements announce through my screen reader, which means the design team properly used aria-hidden or CSS-only decoration. The warm visual atmosphere that sighted users enjoy does not create noise in my experience. That is accessibility done right — the visual and semantic layers are independent. Like pottery, the glaze does not change the structural integrity of the bowl.',
      },
    ],
  },

  // ─── RETRO-FUTURISM ────────────────────────────────────────

  'text-heavy:retro-futurism:kevin': {
    tagline: 'Finally, a 12-minute article that actually makes me want to scroll',
    observations: [
      {
        category: 'MOTION',
        observation: 'Gradient transitions and scroll-triggered animations create visual momentum through the article',
        verdict: 'good',
        comment:
          'The gradient backgrounds shift as I scroll and the section headers animate in with a bounce. For the first time in any variation, scrolling through this article feels like DOING something rather than just moving text upward. It is the speedrun approach to reading — visual feedback makes the journey feel active.',
      },
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient palette pops on mobile screens and creates visual energy',
        verdict: 'good',
        comment:
          'The gradient palette is giving synthwave playlist cover energy. Each section has a slightly different color temperature that makes the transitions feel like level changes in a game. I actually registered when sections changed — which is more than I can say for any neutral-palette variation.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded, bouncy typeface with playful weight contrasts undermines the article\'s attempt at authority',
        verdict: 'needs-work',
        comment:
          'The bubbly headings are fun but the article is trying to be a "comprehensive guide to content excellence." The tonal mismatch is hilarious — it is like an anime character delivering a serious monologue in a chibi art style. I do not mind because I was never taking the article seriously anyway, but if the content mattered, the type would sabotage it.',
      },
    ],
  },

  'text-heavy:retro-futurism:sam': {
    tagline: 'Designed phone-first and it shows — in the best way',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Rounded containers and generous padding create comfortable mobile reading zones',
        verdict: 'good',
        comment:
          'The card-based section layout with rounded corners works perfectly on my phone. Each section is a self-contained reading chunk that fits the viewport, like panels in a comic strip. I can read a section, pocket my phone for a subway stop, and pick up at the next card. This is how mobile-first long-form should work.',
      },
      {
        category: 'COLOR',
        observation: 'Teal-purple gradient palette maintains readability in variable subway lighting conditions',
        verdict: 'good',
        comment:
          'The saturated gradient colors hold their contrast in both tunnel darkness and station fluorescent light. Unlike the warm-organic earth tones that wash out in bright light, these pop at any brightness. It is the gacha game UI philosophy — designed for the bus, the bed, and the bathroom, not just the desk.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy scroll animations add delight but cost performance on older mobile devices',
        verdict: 'needs-work',
        comment:
          'The bounce animations on section transitions are satisfying on my current phone but would demolish the battery and frame rate on my last phone. Mobile-first means designing for the phone people actually have, not the phone they wish they had. A reduced-motion media query would solve this without killing the vibe.',
      },
    ],
  },

  'text-heavy:retro-futurism:sarah': {
    tagline: 'The gradients are doing all the work because the content has nothing to offer',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient backgrounds add visual interest that distracts from content evaluation',
        verdict: 'needs-work',
        comment:
          'The gradient palette is emotionally manipulative. It makes the article feel more interesting than it is by keeping my eyes engaged with color transitions instead of content substance. When I comparison-shop, I strip away the marketing to find the specs. This design makes stripping away the marketing physically difficult — the marketing IS the visual experience.',
      },
      {
        category: 'LAYOUT',
        observation: 'Rounded containers create a friendly, approachable frame that softens critical evaluation',
        verdict: 'needs-work',
        comment:
          'The rounded corners and card-based layout make every section feel like a friendly suggestion rather than a claim to evaluate. As a debate team alumna, I know that framing affects judgment. This frame is saying "relax, do not think too hard" — which is exactly what content this weak needs you to do. I do not trust websites that try this hard to put me at ease.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Playful type contrasts undermine the article\'s claim to be an authoritative guide',
        verdict: 'needs-work',
        comment:
          'The article positions itself as a "comprehensive guide" and a "masterclass." The bouncy, rounded typography says otherwise. It is like reading a Consumer Reports review typeset in Comic Sans — the content might be solid but the presentation destroys credibility before I finish the first heading. Tone and typography need to agree.',
      },
    ],
  },

  'text-heavy:retro-futurism:carlos': {
    tagline: 'Reading a strategy article in a bounce house is exactly as productive as it sounds',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-to-purple gradient palette signals "startup energy" rather than established authority',
        verdict: 'needs-work',
        comment:
          'I see this gradient palette and I think "Series A pitch deck from a company that will pivot twice before their next board meeting." For a 12-minute thought-leadership article, the design needs to project the confidence of someone who has been thinking about this for years, not the enthusiasm of someone who discovered it last week. CNBC does not use gradient backgrounds for a reason.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded, playful typeface contradicts the article\'s positioning as expert commentary',
        verdict: 'needs-work',
        comment:
          'The font choices undermine the article at a fundamental positioning level. If this showed up in my inbox from a consulting firm, I would question their seriousness. Business biographies use serifs because authority requires typographic weight. This font has the weight of a suggestion, not a recommendation.',
      },
      {
        category: 'LAYOUT',
        observation: 'Rounded containers with gradient fills make each section feel disposable rather than substantial',
        verdict: 'needs-work',
        comment:
          'Each section floats in its colorful container like a slide in a presentation rather than a chapter in a serious document. The content is already thin — the container design makes it feel even more ephemeral. A jazz album has liner notes typeset with gravitas because the music deserves permanence. This design treats its content as temporary.',
      },
    ],
  },

  'text-heavy:retro-futurism:tommy': {
    tagline: 'The gradient energy goes hard even if the article does not',
    observations: [
      {
        category: 'COLOR',
        observation: 'Teal-purple gradient palette creates strong visual identity and shareability',
        verdict: 'good',
        comment:
          'The color palette is giving Spotify Wrapped meets streetwear lookbook. Every section has screenshot potential. I would share a screenshot of this article layout in my group chat even though I would never share the article itself. The design has more personality than the content, which is either a compliment to the design or an indictment of the content.',
      },
      {
        category: 'MOTION',
        observation: 'Bouncy section transitions and scroll-triggered animations create engagement hooks throughout',
        verdict: 'good',
        comment:
          'The animation on section transitions is the only reason I scrolled past section two. Each bounce is a micro-reward, like getting a notification that keeps me scrolling. Hip-hop producers call this "ear candy" — little sonic moments that keep you listening. This is eye candy that keeps me reading. Or at least scrolling.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Rounded, playful headings create energy but reduce readability for sustained long-form content',
        verdict: 'needs-work',
        comment:
          'The headings are fire for the first three sections but by section four I am starting to feel the sugar crash. The playful weight is great for hooks — like a basketball highlight reel — but 12 minutes of it is like watching an entire game at highlight speed. The energy is exhausting when it never takes a breath.',
      },
    ],
  },

  // ─── MEMPHIS ───────────────────────────────────────────────

  'text-heavy:memphis:tommy': {
    tagline: 'This article has more personality in its shapes than in its paragraphs',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric shapes and asymmetric decorative elements create visual personality in every section',
        verdict: 'good',
        comment:
          'The floating shapes and bold patterns give every section main-character energy. This is what design looks like when someone actually has an opinion. The geometric interruptions feel like a Supreme drop catalog — bold, unapologetic, designed to stand out. I would screenshot this layout and post it to my group chat.',
      },
      {
        category: 'COLOR',
        observation: 'Primary color palette with bold contrasts creates immediate visual impact',
        verdict: 'good',
        comment:
          'The red, blue, and yellow accents pop against each other like sneaker colorways. Every section has a distinct color energy that makes scrolling feel like browsing a curated collection. The palette has the confidence of a streetwear brand that knows exactly who it is for — and who it is not for.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric layout breaks reading rhythm for a 12-minute article',
        verdict: 'needs-work',
        comment:
          'The asymmetry is sick for the first few sections but by section four my eyes are fighting the layout instead of flowing with it. Basketball highlights are 10 minutes because longer than that is exhausting at full intensity. A 12-minute article needs moments where the layout straightens out and lets me read normally before the next visual burst.',
      },
    ],
  },

  'text-heavy:memphis:dex': {
    tagline: 'Zine energy on the web — the shapes break the corporate monotony on purpose',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Geometric shapes interrupt body text flow like deliberate editorial disruptions',
        verdict: 'good',
        comment:
          'The floating shapes breaking into the text columns are a conscious zine technique — disruption as editorial voice. The shapes force the reader out of autopilot, which is exactly what you want when the content is 12 minutes of corporate nothing. It is punk typesetting: the layout has more to say than the words.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric composition with off-grid elements creates anti-corporate reading rhythm',
        verdict: 'good',
        comment:
          'The off-grid elements and asymmetric text blocks reject the standard single-column reading convention. In zine culture, this is how you signal that the content is not just another blog post — it is a statement. The layout itself is the editorial voice. A gig poster does not apologize for being asymmetric and neither does this.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Bold display type with irregular sizing creates visual hierarchy through contrast',
        verdict: 'needs-work',
        comment:
          'The display headings are bold and commanding, but the body text competes with the geometric shapes for attention. In a printed zine I would solve this by giving the body text more contrast against the background — darker ink, bigger size, or a clear exclusion zone around the shapes. The shapes are winning the attention war, which means the text is losing legibility after section three.',
      },
    ],
  },

  'text-heavy:memphis:carlos': {
    tagline: 'An article about content excellence decorated like a kindergarten art project',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric shapes and primary-color decorative elements clash with the article\'s authoritative tone',
        verdict: 'blocker',
        comment:
          'The article claims to be a "masterclass in content design" while floating red circles and yellow triangles orbit the headings. The tonal mismatch is catastrophic — it is like delivering a quarterly earnings report while wearing a clown nose. I cannot take the content seriously because the design is actively undermining it. I would never present this to a board.',
      },
      {
        category: 'COLOR',
        observation: 'Primary-color palette signals playfulness that contradicts the article\'s business positioning',
        verdict: 'needs-work',
        comment:
          'Red, yellow, and blue in bold blocks says "children\'s educational app," not "thought leadership." CNBC uses navy and white. Bloomberg uses black and green. Serious content requires a serious palette. This palette tells investors "we do not take ourselves seriously" — which, given the content, might be the most honest thing about the page.',
      },
      {
        category: 'LAYOUT',
        observation: 'Asymmetric layout breaks the linear reading flow that long-form authoritative content requires',
        verdict: 'needs-work',
        comment:
          'I read business biographies linearly — introduction, argument, evidence, conclusion. This layout scatters those elements around floating shapes and off-grid text blocks. The asymmetry makes the article feel like a collage when it needs to feel like a thesis. Jazz has structure within improvisation. This is improvisation without structure.',
      },
    ],
  },

  'text-heavy:memphis:nora': {
    tagline: 'This design cheapens everything it touches — including twelve minutes of my time',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Bold geometric shapes and primary colors create a juvenile aesthetic for long-form content',
        verdict: 'blocker',
        comment:
          'I would not read a 12-minute article presented like a toy catalog. The geometric shapes around the headings make every section feel disposable — like promotional material rather than something worth my sustained attention. Reading is an investment of time, and this design signals that the content is not worth the investment. I buy first-edition books partly because the physical design says "this matters." This design says "this is temporary."',
      },
      {
        category: 'COLOR',
        observation: 'Primary-color accents without tonal sophistication reduce the perceived quality of the content',
        verdict: 'needs-work',
        comment:
          'The bold primaries have no nuance — no gradation, no secondary palette, no tonal depth. It is the color equivalent of table wine: technically wine, but without complexity. The opera programs I collect use gold and cream and subtle ink variations. This uses red, yellow, and blue with the subtlety of a traffic light.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Display typeface with bold irregular sizing prioritizes visual impact over reading comfort',
        verdict: 'needs-work',
        comment:
          'The headings have visual impact but the body text suffers from competition with the decorative elements. In a first-edition book, the typography exists to serve the reading experience — every detail supports sustained engagement. Here the typography exists to serve the aesthetic, and the reading experience is an afterthought.',
      },
    ],
  },

  'text-heavy:memphis:mike': {
    tagline: 'Form follows fun and function is standing in the parking lot',
    observations: [
      {
        category: 'LAYOUT',
        observation: 'Asymmetric layout with floating geometric elements creates visual noise for sustained reading',
        verdict: 'needs-work',
        comment:
          'I share screens in client meetings for a living. This layout would derail any presentation — the first question would be about the floating shapes, not the content. In architecture, we say "form follows function." Here, form follows fun and function did not get an invitation. The asymmetry is visually interesting for about 30 seconds and disorienting for the remaining 11.5 minutes.',
      },
      {
        category: 'DECORATION',
        observation: 'Geometric decorative elements compete with body text for the reader\'s limited attention',
        verdict: 'needs-work',
        comment:
          'Every geometric shape near a paragraph is a distraction tax on reading comprehension. In architecture photography, I compose to lead the eye toward the subject. This composition leads the eye toward the decoration and away from the content. The shapes are more compelling than the words, which says more about the words than the shapes.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Bold display type with playful sizing creates a casual tone unsuitable for professional reading',
        verdict: 'needs-work',
        comment:
          'The playful type would be fun on a poster but for a 12-minute professional article it is the wrong register. I keep pour-over coffee notes in a minimal sans-serif because the content is the point. Memphis type makes the font the point. In a serious reading context, the typeface should be invisible — a window, not a frame.',
      },
    ],
  },

  // ─── ART DECO ──────────────────────────────────────────────

  'text-heavy:art-deco:carlos': {
    tagline: 'If this were a prospectus I would invest — the design projects earned authority',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headings with careful tracking and gold underline rules create editorial gravitas',
        verdict: 'good',
        comment:
          'The serif headings have the authority of a Wall Street Journal masthead. Every heading feels like the title of a chapter that deserves to exist. The gold underline rules are the typographic equivalent of a firm handshake — they project confidence. If this arrived as a prospectus on my desk, I would read it. The design has earned attention the content has not.',
      },
      {
        category: 'DECORATION',
        observation: 'Geometric patterns and gold accents create a premium frame for long-form content',
        verdict: 'good',
        comment:
          'The geometric border patterns and gold accent elements project the kind of institutional weight that makes content feel permanent. Like the liner notes on a jazz vinyl pressing — the physical design says "this was made to last." The content has not earned this treatment, but the design provides it freely, and the reader benefits.',
      },
      {
        category: 'LAYOUT',
        observation: 'Symmetrical layout with balanced margins creates a centered, deliberate reading experience',
        verdict: 'good',
        comment:
          'The bilateral symmetry gives every section the formal balance of a boardroom presentation. My eyes know exactly where to go — center column, top to bottom, no distractions. For a 12-minute article, this predictability is a feature. CNBC anchors use a teleprompter in the center of the screen for the same reason: centered content projects authority.',
      },
    ],
  },

  'text-heavy:art-deco:diana': {
    tagline: 'Every geometric pattern is a love letter to intentional design',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Gold geometric patterns and ornamental section dividers create typographic moments of delight',
        verdict: 'good',
        comment:
          'The geometric dividers between sections are tiny masterpieces of decorative restraint — just enough ornamentation to reward close looking, never enough to overwhelm. It is the Wes Anderson approach: every detail is placed with obsessive precision, and the precision IS the delight. I want to frame each section divider individually, the way I frame Japanese stationery samples.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Elegant serif headings with considered tracking create a reading experience that feels crafted',
        verdict: 'good',
        comment:
          'The serif headings have personality — not the personality of loudness but of careful consideration. The letter-spacing is deliberate, the weight progression from H1 to H2 is calibrated, and the serif choice has character without being decorative. This is typography as craft, the way sourdough is baking as craft — the result of patience and intention.',
      },
      {
        category: 'COLOR',
        observation: 'Gold accents on dark background risk fatigue in a 12-minute reading session',
        verdict: 'needs-work',
        comment:
          'The gold-on-dark palette is stunning for the first few sections but the accumulated warmth of the gold starts to flatten by section four. Even a Wes Anderson film modulates its palette across acts. The gold is doing all the accent work — a secondary cool tone in the later sections would provide the visual palette cleanser the reading experience needs.',
      },
    ],
  },

  'text-heavy:art-deco:nora': {
    tagline: 'Finally — a variation that treats typography as the art it is',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif typeface with geometric characteristics and gold accent treatments elevates the reading experience',
        verdict: 'good',
        comment:
          'The serifs have character. The gold accents provide visual punctuation that guides the eye through the article like program notes guide the ear through an opera. Reading this article in Art Deco framing is like reading mediocre prose in a first-edition binding — the vessel elevates the content beyond what it deserves. That is the power and the responsibility of good design.',
      },
      {
        category: 'DECORATION',
        observation: 'Geometric border patterns and symmetrical ornaments create a sense of considered permanence',
        verdict: 'good',
        comment:
          'The decorative patterns feel architectural — like the geometric friezes on an Art Deco building that have outlasted generations. This is design that says "we built this to last," which elevates even temporary content into something that feels worth preserving. My first-edition book collection exists because physical design can make ordinary words feel extraordinary.',
      },
      {
        category: 'LAYOUT',
        observation: 'Formal symmetrical layout creates predictable reading patterns that support sustained engagement',
        verdict: 'good',
        comment:
          'The centered, symmetrical composition means I always know where the next line begins. For a 12-minute article, this predictability is a luxury — like knowing your opera seat has a clear sightline. The formal layout allows me to settle into the reading experience rather than constantly reorienting, which is how you keep a reader for twelve minutes.',
      },
    ],
  },

  'text-heavy:art-deco:tommy': {
    tagline: 'Serifs and gold in 2025 — OK grandpa, but the hierarchy actually works',
    observations: [
      {
        category: 'TYPOGRAPHY',
        observation: 'Serif headings with gold accents create a traditional editorial hierarchy that reads clearly',
        verdict: 'needs-work',
        comment:
          'I will never love serifs — they feel like my grandpa\'s law firm stationery. But I have to admit the heading hierarchy is the clearest of any variation. Each section title is immediately distinguishable from the body text. For a 12-minute article that is a grudging win. Nobody on my timeline would share this, but they would actually be able to read it.',
      },
      {
        category: 'DECORATION',
        observation: 'Gold geometric ornaments feel like a luxury hotel lobby rather than a website',
        verdict: 'needs-work',
        comment:
          'The gold patterns are giving "fancy hotel elevator" energy, not "something a 22-year-old would voluntarily read." Every ornamental divider widens the generational gap between me and this design. It is like wearing a three-piece suit to a sneaker drop — technically impressive, completely wrong for the audience.',
      },
      {
        category: 'COLOR',
        observation: 'Gold and dark palette creates sophistication that feels exclusionary to younger audiences',
        verdict: 'needs-work',
        comment:
          'The gold-on-dark color scheme says "members only" and I do not feel like a member. Hip-hop album art uses gold too, but paired with bold contrasts and modern type. This gold is paired with serifs and symmetry, which makes it feel inherited rather than earned. The design is speaking a visual language I understand but do not speak.',
      },
    ],
  },

  'text-heavy:art-deco:dex': {
    tagline: 'Putting gold leaf on proud slop is the definition of lipstick on a pig',
    observations: [
      {
        category: 'DECORATION',
        observation: 'Gold ornamental elements and geometric patterns create a luxurious frame around empty content',
        verdict: 'needs-work',
        comment:
          'The more elegant the frame, the more obvious the emptiness inside. Every gold accent is a spotlight on the fact that the article is 12 minutes of corporate nothing dressed up as thought leadership. In the graffiti-to-gallery pipeline, the frame matters — but only if the art earns it. This frame is a $10,000 gilded display case around a gas station print.',
      },
      {
        category: 'TYPOGRAPHY',
        observation: 'Elegant serif typography polishes the surface without addressing the structural emptiness',
        verdict: 'needs-work',
        comment:
          'The serifs are technically beautiful. The tracking is considered. The hierarchy is clear. And every bit of that craft is in service of content that says nothing. It is the design equivalent of a gallery-framed derivative painting — impeccable presentation, zero originality. At least Brutalist was honest about what it was framing. Art Deco puts on a tuxedo and pretends.',
      },
      {
        category: 'LAYOUT',
        observation: 'Symmetrical, formal layout with centered composition embodies design conformity',
        verdict: 'needs-work',
        comment:
          'Every element is centered, balanced, and safe. No edge, no opinion, no risk. This is what design looks like when a committee approves every decision. A zine has rough edges because rough edges mean someone actually made something. This layout was not made — it was approved. The symmetry is a coffin for creativity.',
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
