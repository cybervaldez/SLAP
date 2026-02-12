import type { ExpertDef, ExpertFinding, ReviewBundle } from '../types';
import { experts } from './experts';

const expertFindings: Record<string, ExpertFinding> = {
  // ─── BRUTALIST ───────────────────────────────────────────────

  'landing-page:brutalist:marketing': {
    score: 6,
    verdict: 'Strong hook, weak follow-through. Hero sells the vision, but features and pricing don\'t close the deal. Add testimonials, a demo CTA, and fix the misleading "Start Free" button.',
    sections: {
      hero: [
        { text: "'Stop Shipping AI Slop' is memorable and differentiated", light: 'green', comment: 'This tagline works. Keep it front and center.' },
      ],
      features: [
        { text: 'No social proof \u2014 add "trusted by X teams" or logos', light: 'red', comment: 'Visitors bounce without trust signals.' },
        { text: 'Feature descriptions are benefits, not proof', light: 'yellow', comment: 'Add a customer quote or metric per card.' },
      ],
      pricing: [
        { text: '"Start Free" CTA implies a free tier that doesn\'t exist', light: 'yellow', comment: 'Change to "Start Trial" or add a free tier.' },
      ],
      testimonials: [
        { text: 'Single testimonial with no name or role attribution weakens credibility', light: 'yellow', comment: 'Add name, company, and headshot for each quote.' },
      ],
      faq: [
        { text: 'FAQ answers address features but not pricing objections', light: 'yellow', comment: 'Add "Why is there no free tier?" and "What happens after trial?"' },
      ],
      signup: [
        { text: '"Get Started" is generic with no value proposition in the CTA', light: 'yellow', comment: 'Try "Start Your Free Review" for specificity.' },
      ],
    },
  },

  'landing-page:brutalist:ux': {
    score: 8,
    verdict: 'Clean hierarchy and good contrast ratios. Two usability issues: jargon in pricing confuses novice users, and the featured plan\'s color-only indicator fails accessibility checks.',
    sections: {
      hero: [
        { text: 'Clear visual hierarchy \u2014 headline, subhead, CTAs in correct order', light: 'green', comment: 'Passes WCAG AA. Scannable in under 3 seconds.' },
      ],
      features: [
        { text: 'Card layout is scannable and well-spaced', light: 'green', comment: 'Good reading flow left-to-right.' },
      ],
      pricing: [
        { text: '"Archetypes" is jargon that confuses non-technical users', light: 'yellow', comment: 'Replace with "page templates" or "layouts".' },
        { text: 'Featured plan differentiated by border color only', light: 'yellow', comment: 'Add a "Popular" badge for non-color cue.' },
      ],
      testimonials: [
        { text: 'Testimonial carousel lacks navigation dots or swipe affordance', light: 'yellow', comment: 'Add visible pagination or arrow controls.' },
      ],
      faq: [
        { text: 'Accordion toggles are clear but lack expand-all option', light: 'yellow', comment: 'Power users want to scan all answers at once.' },
      ],
      signup: [
        { text: 'Email input label disappears on focus, breaking context', light: 'yellow', comment: 'Use a persistent floating label pattern.' },
      ],
    },
  },

  'landing-page:brutalist:product': {
    score: 5,
    verdict: 'The "what" is clear but the "why buy" is completely absent. No metrics, no case studies, no comparison to alternatives. Decision-makers will bounce.',
    sections: {
      hero: [
        { text: 'Value proposition is clear \u2014 problem + solution in one sentence', light: 'green', comment: 'Good messaging. Hero does its job.' },
      ],
      features: [
        { text: 'No ROI data \u2014 hours saved, bugs caught, time-to-ship improvements', light: 'red', comment: 'Add at least one concrete metric per feature.' },
        { text: 'No competitive differentiation section', light: 'red', comment: 'Why SLAP over manual review or competitors?' },
      ],
      pricing: [
        { text: 'Three tiers are clear, standard, and easy to evaluate', light: 'green', comment: 'Transparent pricing is good.' },
      ],
      testimonials: [
        { text: 'No case study or measurable outcome in testimonials', light: 'red', comment: 'Add "saved X hours" or "caught Y bugs" to each quote.' },
      ],
      faq: [
        { text: 'FAQ does not address "Why SLAP over manual review?"', light: 'yellow', comment: 'Add competitive differentiation question.' },
      ],
      signup: [
        { text: 'No free tier or trial length mentioned near signup CTA', light: 'red', comment: 'State the offer clearly: "14-day free trial, no credit card."' },
      ],
    },
  },

  'landing-page:brutalist:technical': {
    score: 7,
    verdict: 'Lightweight, fast on mobile, no heavy JS or animation blocking content. Only issue is pricing card vertical spacing on narrow viewports.',
    sections: {
      hero: [
        { text: 'Lightweight render \u2014 no blocking resources', light: 'green', comment: 'Fast on 4G. Good.' },
      ],
      features: [
        { text: 'CSS Grid stacks correctly on all breakpoints tested', light: 'green', comment: 'Responsive behavior is solid.' },
      ],
      pricing: [
        { text: 'Cards cramped at 375px width \u2014 needs vertical margin', light: 'yellow', comment: 'Add 0.75rem gap between stacked cards on mobile.' },
      ],
      testimonials: [
        { text: 'Testimonial carousel animation is smooth with no jank', light: 'green', comment: 'CSS transitions handle slide changes well.' },
      ],
      faq: [
        { text: 'Accordion expand/collapse lacks animation, feels abrupt', light: 'yellow', comment: 'Add max-height transition for smooth open/close.' },
      ],
      signup: [
        { text: 'Form input lacks visible focus ring for keyboard users', light: 'yellow', comment: 'Add :focus-visible outline for accessibility.' },
      ],
    },
  },

  'landing-page:brutalist:design': {
    score: 6,
    verdict: 'Dark hero is bold and distinctive \u2014 strong brand identity. But the features section is a wall of text selling a visual tool with zero visuals. Add screenshots or a before/after.',
    sections: {
      hero: [
        { text: 'Strong visual identity \u2014 dark gradient + gold accent is distinctive', light: 'green', comment: "This doesn't look like generic SaaS. Good." },
      ],
      features: [
        { text: 'Text-only feature cards lack visual interest', light: 'yellow', comment: 'Add icons or illustrations per card.' },
        { text: 'No product screenshots or visual demos anywhere on page', light: 'red', comment: "You're selling a visual review tool with zero visuals." },
      ],
      pricing: [
        { text: 'Cards are visually balanced but generic', light: 'yellow', comment: 'Differentiate the featured card more boldly.' },
      ],
      testimonials: [
        { text: 'Quote typography is plain with no visual distinction from body text', light: 'yellow', comment: 'Use italic or a larger size to set quotes apart.' },
      ],
      faq: [
        { text: 'FAQ section has no visual rhythm or dividers between items', light: 'yellow', comment: 'Add subtle separators or alternating backgrounds.' },
      ],
      signup: [
        { text: 'Signup button matches pricing CTAs with no visual escalation', light: 'yellow', comment: 'Make the final CTA bolder as the page climax.' },
      ],
    },
  },

  // ─── E-COMMERCE: BRUTALIST ──────────────────────────────────

  'e-commerce:brutalist:marketing': {
    score: 7,
    verdict: 'Monospace prices are a thesis statement — the font IS the brand. But no trust signals near payment, no urgency triggers, and no social proof anywhere in the funnel.',
    sections: {
      products: [
        { text: 'Monospace pricing turns every price tag into a design statement', light: 'green', comment: 'The courier-style prices feel intentional and premium — this IS the brand voice.' },
        { text: 'No "bestseller" or "popular" badges to guide purchase decisions', light: 'yellow', comment: 'Social proof triggers drive conversion — add trust signals to top products.' },
      ],
      cart: [
        { text: 'Inverted BLACK cart drawer creates a VIP shopping experience', light: 'green', comment: 'The dark drawer feels exclusive — like backstage access.' },
        { text: 'No cross-sell or "customers also bought" suggestions in cart', light: 'yellow', comment: 'Cart is a missed upsell opportunity — add related product recommendations.' },
      ],
      checkout: [
        { text: 'No trust badges, security icons, or guarantee near payment fields', light: 'red', comment: 'Visitors abandon checkout without trust signals — add SSL badge and money-back guarantee.' },
        { text: 'Terminal-style FIELD_01 labels feel engineered but not reassuring', light: 'yellow', comment: 'Checkout needs warmth — replace with human labels like "Your Name" near payment.' },
      ],
    },
  },

  'e-commerce:brutalist:ux': {
    score: 7,
    verdict: 'Clean font weight hierarchy with strong focus indicators. The red inset box-shadow on focus is brutalist AND accessible — a rare win. But 12px descriptions are too small for comfortable reading.',
    sections: {
      products: [
        { text: 'Font weight hierarchy (900 name → 700 price → 400 desc) creates clear scanning order', light: 'green', comment: 'Users can scan the grid quickly — name, price, action in correct visual order.' },
        { text: '12px product descriptions are below comfortable reading size', light: 'yellow', comment: 'Bump to 14px minimum for body text — 12px forces squinting on desktop.' },
      ],
      cart: [
        { text: 'Red inset box-shadow focus indicator is brutalist AND accessible', light: 'green', comment: 'The screaming red focus ring is impossible to miss — great for keyboard users.' },
        { text: 'Quantity +/- buttons at 40px meet touch target minimums', light: 'green', comment: 'Adequate tap size for mobile interaction.' },
      ],
      checkout: [
        { text: 'Step indicator with number → checkmark progression is clear', light: 'green', comment: 'Users always know where they are in the flow.' },
        { text: 'FIELD_01/FIELD_02 labels are unfamiliar — use human-readable labels', light: 'yellow', comment: 'Terminal labels are on-brand but confuse users filling out payment forms.' },
      ],
    },
  },

  'e-commerce:brutalist:product': {
    score: 6,
    verdict: 'Transparent pricing with zero hidden costs — the monospace treatment signals honesty. But no filtering, no sorting, and sparse descriptions mean decision-making is harder than it needs to be.',
    sections: {
      products: [
        { text: 'Transparent pricing with no hidden fees or "contact us" gatekeeping', light: 'green', comment: 'Honest pricing builds trust — customers see exactly what they pay.' },
        { text: 'No filtering or sorting options for product discovery', light: 'red', comment: 'With more than 6 products, users cannot find what they want — add category filters.' },
        { text: 'Product descriptions are sparse — one sentence per item', light: 'yellow', comment: 'Add material, dimensions, or key feature bullet points for informed decisions.' },
      ],
      cart: [
        { text: 'Cart shows per-item subtotals — good for price transparency', light: 'green', comment: 'No math required — each line item shows quantity × price.' },
      ],
      checkout: [
        { text: 'Three-step checkout is standard and familiar', light: 'green', comment: 'Shipping → Payment → Confirmation is the expected flow.' },
        { text: 'No order summary visible during payment step', light: 'yellow', comment: 'Users want to verify their cart before entering card details.' },
      ],
    },
  },

  'e-commerce:brutalist:technical': {
    score: 8,
    verdict: 'Lightweight and fast — no images, no heavy assets, no framework bloat. The cart drawer uses transform-only animation for GPU efficiency. Only issue: fixed 3-column grid breaks on mobile.',
    sections: {
      products: [
        { text: 'Zero product images — CSS placeholder divs are instant-render', light: 'green', comment: 'No image loading latency — the grid paints in one frame.' },
        { text: 'Fixed repeat(3, 1fr) grid has no responsive breakpoint', light: 'red', comment: 'At 375px viewport, each column is ~120px — product cards are unusable on mobile.' },
      ],
      cart: [
        { text: 'Cart drawer uses translateX transform — GPU-composited animation', light: 'green', comment: 'No layout thrash on open/close — smooth 60fps.' },
        { text: 'Map-based cart state avoids O(n) lookups for quantity updates', light: 'green', comment: 'Good data structure choice for cart operations.' },
      ],
      checkout: [
        { text: 'useReducer state machine prevents impossible checkout states', light: 'green', comment: 'Clean state management — no stale data between steps.' },
        { text: 'No form validation — any input accepted including empty strings', light: 'yellow', comment: 'Add client-side validation before payment step.' },
      ],
    },
  },

  'e-commerce:brutalist:design': {
    score: 8,
    verdict: 'The most committed brutalist variation — every element follows the thesis. The inverted BLACK cart drawer is the strongest design moment. Terminal-style FIELD labels extend the voice into checkout.',
    sections: {
      products: [
        { text: 'BLACK placeholder blocks where images would be — anti-decoration as decoration', light: 'green', comment: 'The absence of product images IS the design statement — bold commitment.' },
        { text: 'Courier monospace prices against Arial Black names create typographic tension', light: 'green', comment: 'The font contrast is intentional and powerful — system fonts as design choice.' },
      ],
      cart: [
        { text: 'Inverted BLACK/WHITE cart drawer is the strongest design moment', light: 'green', comment: 'The polarity flip when opening cart is dramatic and memorable.' },
        { text: 'RED price highlights in cart create urgency within the monochrome palette', light: 'green', comment: 'The only color in the drawer — draws the eye exactly where it should.' },
      ],
      checkout: [
        { text: 'FIELD_01/FIELD_02 terminal labels extend brutalist voice into forms', light: 'green', comment: 'Most e-commerce checkouts abandon their design language at forms — this one commits.' },
        { text: 'Square step indicators with zero border-radius maintain thesis throughout', light: 'green', comment: 'Consistency from grid to cart to checkout — nothing softens.' },
      ],
    },
  },

  // ─── E-COMMERCE: NEO-MINIMAL ───────────────────────────────

  'e-commerce:neo-minimal:marketing': {
    score: 6,
    verdict: 'Clean and trustworthy, but the restraint bleeds into the sales funnel. No urgency, no scarcity, no social proof anywhere. The minimal aesthetic builds credibility but forgets to close.',
    sections: {
      products: [
        { text: 'Clean product grid with generous whitespace signals premium quality', light: 'green', comment: 'The breathing room around each product says "curated, not crowded" \u2014 good for perceived value.' },
        { text: 'No bestseller badges, ratings context, or social proof near products', light: 'yellow', comment: 'Shoppers need decision shortcuts \u2014 add "Popular" or "X sold this week" to guide choices.' },
      ],
      cart: [
        { text: '2px blue accent bar on drawer creates a subtle context shift signal', light: 'green', comment: 'The accent bar says "you are now in a different mode" without shouting \u2014 elegant cue.' },
        { text: 'No upsell or "frequently bought together" suggestions in cart', light: 'yellow', comment: 'Cart is a missed revenue opportunity \u2014 add one relevant suggestion per cart visit.' },
      ],
      checkout: [
        { text: 'Disabled Next button when fields empty prevents premature advancement', light: 'green', comment: 'Form validation reduces checkout errors \u2014 users cannot skip required fields.' },
        { text: 'No trust signals, security badges, or money-back guarantee near payment', light: 'red', comment: 'Minimal design needs explicit trust \u2014 add "Secure checkout" or a lock icon near card fields.' },
      ],
    },
  },

  'e-commerce:neo-minimal:ux': {
    score: 8,
    verdict: 'Strong post-fix accessibility story. Blue focus rings on every interactive element, 44px touch targets, and form validation create a solid usability foundation. Weight 300 body text is readable without sacrificing elegance.',
    sections: {
      products: [
        { text: 'SVG star ratings with aria-labels provide screen reader accessibility', light: 'green', comment: 'Stars announce "4 out of 5" to assistive tech \u2014 proper semantic rating.' },
        { text: 'Font weight 300 body text balances readability with the minimal aesthetic', light: 'green', comment: 'Bumped from 200 to 300 \u2014 readable on all screens without losing the light feel.' },
      ],
      cart: [
        { text: 'Blue focus ring (0 0 0 2px) on all buttons and inputs aids keyboard navigation', light: 'green', comment: 'Every interactive element is discoverable by tabbing \u2014 rare for minimal designs.' },
        { text: '44px quantity buttons meet WCAG touch target minimums', light: 'green', comment: 'Sized up from 28px \u2014 comfortable for thumb interaction on mobile.' },
      ],
      checkout: [
        { text: 'Step indicator with checkmark SVG progression is clear and accessible', light: 'green', comment: 'Users always know where they are \u2014 no font dependency for check/close icons.' },
        { text: 'Form inputs lack persistent labels \u2014 placeholder text disappears on focus', light: 'yellow', comment: 'Once the user starts typing, they lose context of which field they are in.' },
      ],
    },
  },

  'e-commerce:neo-minimal:product': {
    score: 5,
    verdict: 'Transparent pricing with compressed letter-spacing creates a "precision numbers" identity. But no filtering, no sorting, and one-sentence descriptions leave shoppers guessing.',
    sections: {
      products: [
        { text: 'Compressed price typography (-0.04em) creates a distinctive "precision numbers" brand', light: 'green', comment: 'The tight letter-spacing on prices is a design choice that doubles as brand identity.' },
        { text: 'No filtering or sorting \u2014 discovery relies entirely on grid scanning', light: 'red', comment: 'With more than 6 products, users cannot find what they want \u2014 add category tabs.' },
        { text: 'Product descriptions are one sentence \u2014 insufficient for informed decisions', light: 'yellow', comment: 'Add material, dimensions, or a key feature bullet point per product.' },
      ],
      cart: [
        { text: 'Per-item subtotals with compressed pricing maintain brand consistency in cart', light: 'green', comment: 'Price typography carries from grid into cart \u2014 coherent experience.' },
      ],
      checkout: [
        { text: 'Three-step checkout (Shipping \u2192 Payment \u2192 Confirmation) is standard and familiar', light: 'green', comment: 'Users know exactly what to expect \u2014 no surprises in the flow.' },
        { text: 'Order summary in Step 2 is a single line \u2014 no itemized breakdown', light: 'yellow', comment: 'Show what the customer is paying for, not just the total.' },
      ],
    },
  },

  'e-commerce:neo-minimal:technical': {
    score: 9,
    verdict: 'Lightest e-commerce variation. Zero images, SVG icons instead of font-dependent glyphs, useReducer state machine, and GPU-composited cart drawer. The only concern is inline style object allocation on every render.',
    sections: {
      products: [
        { text: 'SVG icons eliminate font rendering inconsistency across platforms', light: 'green', comment: 'Stars, checks, and close buttons render identically on every OS \u2014 no glyph fallback issues.' },
        { text: 'auto-fill grid adapts to viewport without media queries', light: 'green', comment: 'minmax(260px, 1fr) handles responsive layout in a single CSS rule.' },
      ],
      cart: [
        { text: 'Cart drawer uses translateX transform \u2014 GPU-composited, zero layout thrash', light: 'green', comment: 'Smooth 60fps open/close animation with no forced reflows.' },
        { text: 'Map-based cart state provides O(1) lookup for quantity updates', light: 'green', comment: 'Good data structure choice \u2014 scales well with cart size.' },
      ],
      checkout: [
        { text: 'checkoutStep in useReducer prevents impossible state combinations', light: 'green', comment: 'Clean state machine \u2014 cart open + checkout active cannot conflict.' },
        { text: 'Inline style objects recreated on every render \u2014 minor GC pressure', light: 'yellow', comment: 'Consider memoizing dynamic styles or extracting to static objects.' },
      ],
    },
  },

  'e-commerce:neo-minimal:design': {
    score: 7,
    verdict: 'The compressed price typography and 2px accent bar are genuine brand signatures that elevate this beyond generic minimalism. Weight 200 logo against 300 body creates intentional typographic hierarchy.',
    sections: {
      products: [
        { text: 'Compressed -0.04em letter-spacing on prices creates a "precision numbers" signature', light: 'green', comment: 'The tight pricing feels engineered and intentional \u2014 not template default.' },
        { text: 'Category color bands as image placeholders are clean but lack visual personality', light: 'yellow', comment: 'The colored rectangles work structurally but could carry more brand voice.' },
      ],
      cart: [
        { text: '2px blue accent bar on drawer top signals context shift elegantly', light: 'green', comment: 'A single 2px line does the work of a full color inversion \u2014 maximum impact, minimum decoration.' },
        { text: 'White drawer on near-white page creates a subtle floating panel effect', light: 'green', comment: 'The border-left and accent bar provide just enough boundary without heavy contrast.' },
      ],
      checkout: [
        { text: 'Circular step indicators with blue fill progression match the accent system', light: 'green', comment: 'Step dots echo the single-accent palette \u2014 cohesive from grid to checkout.' },
        { text: 'Confirmation check icon in blue circle is a calm, satisfying endpoint', light: 'green', comment: 'No fireworks, no confetti \u2014 just a quiet confirmation that matches the brand temperament.' },
      ],
    },
  },

  // ─── NEO-MINIMAL ─────────────────────────────────────────────

  'landing-page:neo-minimal:marketing': {
    score: 5,
    verdict: 'Clean but forgettable. The restrained palette and thin type don\'t create urgency or memorability. Hero copy needs stronger emotional hook.',
    sections: {
      hero: [
        { text: 'Headline lacks emotional punch \u2014 too restrained for a call-to-action', light: 'yellow', comment: 'Minimalism in copy is not the same as minimalism in design.' },
      ],
      features: [
        { text: 'No urgency signals \u2014 no scarcity, social proof, or FOMO triggers', light: 'red', comment: 'At least one trust signal needed above the fold.' },
      ],
      pricing: [
        { text: 'Pricing CTA buttons are subtle \u2014 nearly invisible', light: 'yellow', comment: 'Make the primary CTA more prominent.' },
      ],
      testimonials: [
        { text: 'Testimonials are understated to the point of being ignorable', light: 'yellow', comment: 'Social proof needs prominence, not minimalism.' },
      ],
      faq: [
        { text: 'FAQ section blends into page with no visual anchor', light: 'yellow', comment: 'Add a heading or icon to draw attention.' },
      ],
      signup: [
        { text: 'Signup CTA disappears into the minimalist layout', light: 'red', comment: 'Final CTA must be the most visible element on the page.' },
      ],
    },
  },

  'landing-page:neo-minimal:ux': {
    score: 7,
    verdict: 'Good reading flow and clean hierarchy. But weight 200-300 text risks readability issues, and the scale(1.01) hover effect provides almost no feedback.',
    sections: {
      hero: [
        { text: 'Clean visual hierarchy with generous whitespace', light: 'green', comment: 'Scannable and calm.' },
      ],
      features: [
        { text: '+/- FAQ toggles are clearly interactive', light: 'green', comment: 'Good affordance pattern.' },
      ],
      pricing: [
        { text: 'scale(1.01) hover is effectively invisible as feedback', light: 'yellow', comment: 'Users need to know they can click.' },
        { text: 'Weight 200 text may fail WCAG on gray backgrounds', light: 'yellow', comment: 'Increase to 400 minimum for body text.' },
      ],
      testimonials: [
        { text: 'Dot navigation for testimonial carousel provides minimal feedback', light: 'yellow', comment: 'Add active state size change or label for current slide.' },
      ],
      faq: [
        { text: '+/\u2013 toggle affordance is clear and accessible', light: 'green', comment: 'Users understand expand/collapse immediately.' },
      ],
      signup: [
        { text: 'Signup form has no visible submit button focus state', light: 'yellow', comment: 'Add :focus-visible ring matching brand accent.' },
      ],
    },
  },

  'landing-page:neo-minimal:product': {
    score: 4,
    verdict: 'Professional but empty. No ROI data, no differentiation, no urgency. The minimalist aesthetic extends to the value proposition \u2014 and that\'s a problem.',
    sections: {
      hero: [
        { text: 'Value prop is present but lacks specificity', light: 'yellow', comment: 'What exactly does the user get? Be concrete.' },
      ],
      features: [
        { text: 'Feature descriptions are generic \u2014 could describe any SaaS tool', light: 'red', comment: 'Each feature needs a concrete outcome.' },
      ],
      pricing: [
        { text: 'Three tiers are clear but feature lists lack differentiation', light: 'yellow', comment: 'Make the upgrade path compelling.' },
      ],
      testimonials: [
        { text: 'Testimonials lack measurable outcomes or company context', light: 'red', comment: 'Generic praise does not drive conversion.' },
      ],
      faq: [
        { text: 'FAQ does not address onboarding or setup complexity', light: 'yellow', comment: 'Add "How long does setup take?" question.' },
      ],
      signup: [
        { text: 'No mention of what happens after signup', light: 'yellow', comment: 'Set expectations: "You\'ll get access in under 2 minutes."' },
      ],
    },
  },

  'landing-page:neo-minimal:technical': {
    score: 8,
    verdict: 'Excellent performance profile. Minimal CSS, no heavy assets, clean DOM. Only concern is thin fonts on low-DPI screens.',
    sections: {
      hero: [
        { text: 'Minimal CSS and no render-blocking resources', light: 'green', comment: 'Fastest variation to load.' },
      ],
      features: [
        { text: 'Clean DOM structure with semantic HTML', light: 'green', comment: 'Good for SEO and screen readers.' },
      ],
      pricing: [
        { text: 'Font weight 200 renders poorly on Windows low-DPI displays', light: 'yellow', comment: 'Bump to 300 minimum for cross-platform readability.' },
      ],
      testimonials: [
        { text: 'Carousel transitions are lightweight and GPU-friendly', light: 'green', comment: 'Transform-only animations are efficient.' },
      ],
      faq: [
        { text: 'Accordion state managed cleanly with no layout thrash', light: 'green', comment: 'No forced reflows on toggle.' },
      ],
      signup: [
        { text: 'Form input type="email" enables correct mobile keyboard', light: 'green', comment: 'Correct input type for email capture.' },
      ],
    },
  },

  'landing-page:neo-minimal:design': {
    score: 5,
    verdict: 'Restrained and professional, but indistinguishable from a thousand other minimalist SaaS pages. Needs a signature element.',
    sections: {
      hero: [
        { text: 'Clean but generic \u2014 nothing memorable about the layout', light: 'yellow', comment: 'Minimalism needs one strong signature element.' },
      ],
      features: [
        { text: 'Card styling is pleasant but forgettable', light: 'yellow', comment: 'Add one distinctive visual element per card.' },
      ],
      pricing: [
        { text: 'Consistent spacing and alignment is professional', light: 'green', comment: 'The grid is well-executed.' },
      ],
      testimonials: [
        { text: 'Testimonial cards are clean but lack personality', light: 'yellow', comment: 'Minimalism here makes quotes feel template-generated.' },
      ],
      faq: [
        { text: 'FAQ typography matches page but needs a visual anchor', light: 'yellow', comment: 'Add an icon or color accent to the section header.' },
      ],
      signup: [
        { text: 'Signup section is cohesive but visually flat', light: 'yellow', comment: 'Add a subtle background shift to distinguish the final CTA area.' },
      ],
    },
  },

  // ─── MAXIMALIST ──────────────────────────────────────────────

  'landing-page:maximalist:marketing': {
    score: 7,
    verdict: 'Bold and attention-grabbing. The rich palette creates instant memorability. But the visual density competes with the message \u2014 simplify the hero CTA area.',
    sections: {
      hero: [
        { text: 'Serif headlines grab attention and convey authority', light: 'green', comment: 'Georgia creates a distinctive brand voice.' },
      ],
      features: [
        { text: 'Feature cards with shadows create visual interest', light: 'green', comment: 'More engaging than flat cards.' },
        { text: 'Decorative elements compete with CTA visibility', light: 'yellow', comment: 'Reduce visual noise around primary actions.' },
      ],
      pricing: [
        { text: 'Coral CTA buttons pop against navy background', light: 'green', comment: 'Strong contrast drives action.' },
      ],
      testimonials: [
        { text: 'Rich card styling makes testimonials feel premium', light: 'green', comment: 'Shadow and color treatment elevates social proof.' },
        { text: 'No company logos alongside quotes reduces credibility', light: 'yellow', comment: 'Add logos for enterprise trust signals.' },
      ],
      faq: [
        { text: 'FAQ section lacks urgency or conversion tie-in', light: 'yellow', comment: 'End FAQ with a CTA like "Still have questions? Talk to us."' },
      ],
      signup: [
        { text: 'Coral CTA button at signup matches hero energy', light: 'green', comment: 'Consistent brand voice drives final conversion.' },
      ],
    },
  },

  'landing-page:maximalist:ux': {
    score: 5,
    verdict: 'Visually rich but usability suffers. Rotation hovers disorient users, decorative circles create false affordances, and the 3-column density overwhelms on first visit.',
    sections: {
      hero: [
        { text: 'Serif + sans-serif hierarchy creates clear reading order', light: 'green', comment: 'Typography hierarchy works well.' },
      ],
      features: [
        { text: 'Rotation hover effects cause layout shifts', light: 'red', comment: 'Cards move and overlap \u2014 disorienting for scanning.' },
        { text: 'Decorative circles look clickable but aren\'t', light: 'yellow', comment: 'False affordances frustrate users.' },
      ],
      pricing: [
        { text: 'Three columns compress to single stack cleanly', light: 'green', comment: 'Responsive behavior is handled well.' },
      ],
      testimonials: [
        { text: 'Testimonial cards with rotation hover are disorienting to read', light: 'red', comment: 'Remove hover transforms on content the user is trying to read.' },
      ],
      faq: [
        { text: 'Decorative circles near FAQ toggles create false click targets', light: 'yellow', comment: 'Remove decorative elements from interactive zones.' },
      ],
      signup: [
        { text: 'Signup form input has adequate touch target size', light: 'green', comment: 'Above 44px minimum on mobile.' },
      ],
    },
  },

  'landing-page:maximalist:product': {
    score: 6,
    verdict: 'The bold visual identity creates memorability, which helps positioning. But the message gets lost in the visual richness \u2014 features need clearer value statements.',
    sections: {
      hero: [
        { text: 'Distinctive palette differentiates from competitors instantly', light: 'green', comment: 'Nobody will confuse this with another product.' },
      ],
      features: [
        { text: 'Visual richness overshadows feature value statements', light: 'yellow', comment: 'Reduce decoration, amplify messaging.' },
      ],
      pricing: [
        { text: 'No ROI or comparison data to support pricing tiers', light: 'red', comment: 'Justify the price with concrete outcomes.' },
      ],
      testimonials: [
        { text: 'Testimonials lack decision-maker quotes or enterprise context', light: 'yellow', comment: 'Add VP/Director-level quotes for B2B conversion.' },
      ],
      faq: [
        { text: 'FAQ covers features but not security or compliance concerns', light: 'yellow', comment: 'Enterprise buyers need SOC2/GDPR answers.' },
      ],
      signup: [
        { text: 'No free trial or money-back guarantee near signup', light: 'red', comment: 'Risk reversal is critical for conversion at this price point.' },
      ],
    },
  },

  'landing-page:maximalist:technical': {
    score: 5,
    verdict: 'Heavy CSS with large shadows and rotation transforms. GPU-intensive on mobile, especially with the 3-column grid. Performance budget is stretched.',
    sections: {
      hero: [
        { text: 'Hero loads quickly despite visual complexity', light: 'green', comment: 'Above-the-fold performance is acceptable.' },
      ],
      features: [
        { text: 'Rotation transforms cause repaints on every hover', light: 'yellow', comment: 'Use will-change or transform3d for GPU acceleration.' },
        { text: 'Large box-shadows add significant rendering cost', light: 'yellow', comment: 'Consider reducing shadow spread on mobile.' },
      ],
      pricing: [
        { text: '3-column grid at 375px causes horizontal scroll', light: 'red', comment: 'Force single-column below 480px.' },
      ],
      testimonials: [
        { text: 'Testimonial card shadows add significant paint cost on scroll', light: 'yellow', comment: 'Simplify shadows or use will-change on visible cards only.' },
      ],
      faq: [
        { text: 'Accordion animation with rotation transforms is GPU-heavy', light: 'yellow', comment: 'Use height/opacity transition instead of transform.' },
      ],
      signup: [
        { text: 'Form submission triggers full page repaint due to decorative elements', light: 'yellow', comment: 'Isolate signup area in its own compositing layer.' },
      ],
    },
  },

  'landing-page:maximalist:design': {
    score: 8,
    verdict: 'Visually stunning and unmistakably branded. The navy/coral/gold palette is bold and memorable. The editorial serif adds sophistication. Just tone down the decorative elements slightly.',
    sections: {
      hero: [
        { text: 'Three-color palette is bold, distinctive, and memorable', light: 'green', comment: 'Best brand identity across all variations.' },
      ],
      features: [
        { text: 'Georgia serif headlines add editorial authority', light: 'green', comment: 'Smart typographic choice for differentiation.' },
        { text: 'Decorative circles risk feeling arbitrary', light: 'yellow', comment: 'Give them meaning or remove them.' },
      ],
      pricing: [
        { text: 'Coral CTAs on navy create excellent contrast', light: 'green', comment: 'Button visibility is strong.' },
      ],
      testimonials: [
        { text: 'Testimonial cards with shadow depth create visual hierarchy', light: 'green', comment: 'Elevated cards signal importance of social proof.' },
      ],
      faq: [
        { text: 'FAQ section icon usage is inconsistent with rest of page', light: 'yellow', comment: 'Align toggle icons with the serif/decorative visual language.' },
      ],
      signup: [
        { text: 'Navy background with coral button is a strong visual climax', light: 'green', comment: 'Page ends on a high-contrast, decisive note.' },
      ],
    },
  },

  // ─── DARK-INDUSTRIAL ─────────────────────────────────────────

  'landing-page:dark-industrial:marketing': {
    score: 4,
    verdict: 'Strong tech credibility but zero warmth. The terminal aesthetic appeals to developers but repels non-technical buyers. Needs a human element.',
    sections: {
      hero: [
        { text: 'Gold accent creates premium feel', light: 'green', comment: 'Premium positioning through color alone.' },
      ],
      features: [
        { text: 'Terminal-style presentation alienates non-technical audiences', light: 'red', comment: 'Marketing to humans, not machines.' },
        { text: 'No emotional hook in feature descriptions', light: 'yellow', comment: 'Features describe function, not benefit.' },
      ],
      pricing: [
        { text: '[+] toggles are clever but unfamiliar to most users', light: 'yellow', comment: 'Standard expand/collapse would convert better.' },
      ],
      testimonials: [
        { text: 'Terminal-style testimonials feel like system logs, not human voices', light: 'red', comment: 'Humanize quotes with photos and names to build trust.' },
      ],
      faq: [
        { text: '[+] toggle pattern is consistent but niche', light: 'yellow', comment: 'Most users expect chevron or arrow affordance.' },
      ],
      signup: [
        { text: 'Gold-accented CTA creates premium conversion moment', light: 'green', comment: 'The gold treatment elevates the final action.' },
      ],
    },
  },

  'landing-page:dark-industrial:ux': {
    score: 6,
    verdict: 'Functional but niche. The terminal metaphor is internally consistent, which aids learnability within its target audience. But it excludes everyone else.',
    sections: {
      hero: [
        { text: 'Gold on near-black passes WCAG AA for large text', light: 'green', comment: 'Contrast is adequate for headlines.' },
      ],
      features: [
        { text: 'Monospace text reduces reading speed for body content', light: 'yellow', comment: 'Use proportional font for paragraphs.' },
      ],
      pricing: [
        { text: 'Charcoal cards on near-black have insufficient boundary contrast', light: 'red', comment: 'Card edges need stronger visual definition.' },
      ],
      testimonials: [
        { text: 'Quote text in monospace reduces readability for longer testimonials', light: 'yellow', comment: 'Use proportional font for quoted speech.' },
      ],
      faq: [
        { text: 'FAQ answers in monospace are hard to scan quickly', light: 'yellow', comment: 'Proportional font improves reading speed for body content.' },
      ],
      signup: [
        { text: 'Email input on dark background has insufficient contrast for placeholder text', light: 'yellow', comment: 'Lighten placeholder color to meet WCAG AA.' },
      ],
    },
  },

  'landing-page:dark-industrial:product': {
    score: 5,
    verdict: 'Niche positioning is clear but the addressable market shrinks significantly. Works for developer tools, fails for broader SaaS positioning.',
    sections: {
      hero: [
        { text: 'Clear positioning for developer audience', light: 'green', comment: 'Knows its audience well.' },
      ],
      features: [
        { text: 'No ROI data \u2014 even developers need business justification', light: 'red', comment: 'Add deployment time savings or bug reduction metrics.' },
      ],
      pricing: [
        { text: 'Pricing structure is clear despite dark styling', light: 'green', comment: 'Transparent and easy to compare.' },
      ],
      testimonials: [
        { text: 'No measurable outcomes in testimonials for developer audience', light: 'red', comment: 'Developers want "reduced review time by 40%" not vague praise.' },
      ],
      faq: [
        { text: 'FAQ does not address integration or API access questions', light: 'yellow', comment: 'Add "Does it integrate with CI/CD?" for developer audience.' },
      ],
      signup: [
        { text: 'No GitHub/SSO login option despite developer-focused positioning', light: 'yellow', comment: 'Developer tools should offer OAuth signup.' },
      ],
    },
  },

  'landing-page:dark-industrial:technical': {
    score: 7,
    verdict: 'Lean and performant. Monospace and minimal decoration means small CSS payload. Gold glow hovers are the only GPU concern.',
    sections: {
      hero: [
        { text: 'Minimal CSS payload \u2014 fast load times', light: 'green', comment: 'Lightest variation after neo-minimal.' },
      ],
      features: [
        { text: 'Gold glow box-shadows are GPU-intensive on mobile', light: 'yellow', comment: 'Consider reducing glow spread on mobile.' },
      ],
      pricing: [
        { text: 'Charcoal cards render efficiently', light: 'green', comment: 'No complex gradients or transforms.' },
      ],
      testimonials: [
        { text: 'Testimonial section renders efficiently with no heavy assets', light: 'green', comment: 'Text-only quotes are lightweight.' },
      ],
      faq: [
        { text: 'Accordion toggle has no animation cost', light: 'green', comment: 'Instant show/hide is efficient but abrupt.' },
      ],
      signup: [
        { text: 'Gold glow on signup button hover adds minor GPU cost', light: 'yellow', comment: 'Consider removing glow on mobile to save battery.' },
      ],
    },
  },

  'landing-page:dark-industrial:design': {
    score: 7,
    verdict: 'Committed and distinctive. The terminal aesthetic is a bold design choice that creates instant brand recognition. Consistency is its greatest strength.',
    sections: {
      hero: [
        { text: 'Gold-on-black creates a premium, authoritative tone', light: 'green', comment: 'Distinctive brand identity.' },
      ],
      features: [
        { text: 'Terminal-style > prefixes are a unique brand signature', light: 'green', comment: 'Instantly recognizable design language.' },
      ],
      pricing: [
        { text: 'Monospace pricing feels engineered but cold', light: 'yellow', comment: 'Add one warm element to balance the austerity.' },
      ],
      testimonials: [
        { text: 'Terminal-style quote formatting is a bold brand signature', light: 'green', comment: 'Consistent with the overall design language.' },
        { text: 'No avatar or photo makes testimonials feel impersonal', light: 'yellow', comment: 'Even a monochrome avatar would add warmth.' },
      ],
      faq: [
        { text: '[+] toggle icons are a distinctive design choice', light: 'green', comment: 'Reinforces the terminal metaphor consistently.' },
      ],
      signup: [
        { text: 'Gold border on input field is elegant and on-brand', light: 'green', comment: 'The premium accent elevates a simple form.' },
      ],
    },
  },

  // ─── WARM-ORGANIC ────────────────────────────────────────────

  'landing-page:warm-organic:marketing': {
    score: 7,
    verdict: 'Highly approachable and trust-building. The warm palette and serif headlines create emotional connection. But too much warmth can undermine urgency.',
    sections: {
      hero: [
        { text: 'Earth tone palette builds immediate trust', light: 'green', comment: 'Warm colors signal safety and reliability.' },
      ],
      features: [
        { text: 'Emoji in features adds personality but may seem unprofessional', light: 'yellow', comment: 'Test with enterprise audience before committing.' },
      ],
      pricing: [
        { text: 'Forest green CTAs on cream have strong contrast and warmth', light: 'green', comment: 'Inviting without being aggressive.' },
      ],
      testimonials: [
        { text: 'Warm tone in testimonials builds authentic trust', light: 'green', comment: 'Quotes feel genuine, not corporate.' },
        { text: 'No company logos alongside testimonials weakens B2B credibility', light: 'yellow', comment: 'Add logos for enterprise trust signals.' },
      ],
      faq: [
        { text: 'FAQ answers are conversational and match brand voice', light: 'green', comment: 'Tone consistency strengthens the brand.' },
      ],
      signup: [
        { text: 'Signup CTA feels inviting but lacks urgency', light: 'yellow', comment: 'Add "Join 500+ teams" or a time-limited offer.' },
      ],
    },
  },

  'landing-page:warm-organic:ux': {
    score: 7,
    verdict: 'Excellent readability and approachability. Serif headlines with generous line height create comfortable reading. Bouncy easing may frustrate power users.',
    sections: {
      hero: [
        { text: 'Serif headlines with generous spacing are highly readable', light: 'green', comment: 'Best reading experience across variations.' },
      ],
      features: [
        { text: '16px radius buttons provide excellent touch targets', light: 'green', comment: 'Above 44px minimum tap target.' },
      ],
      pricing: [
        { text: 'Bouncy easing delays perceived responsiveness', light: 'yellow', comment: 'Consider faster easing for repeated interactions.' },
        { text: 'Blob gradients create visual noise over content', light: 'yellow', comment: 'Reduce opacity or confine to background areas.' },
      ],
      testimonials: [
        { text: 'Testimonial carousel swipe gesture works well on mobile', light: 'green', comment: 'Touch interaction is smooth and intuitive.' },
      ],
      faq: [
        { text: 'Accordion expand animation uses bouncy easing, feels playful', light: 'yellow', comment: 'Consider linear easing for faster task completion.' },
      ],
      signup: [
        { text: 'Rounded input fields match brand personality', light: 'green', comment: 'Consistent border-radius with rest of page.' },
      ],
    },
  },

  'landing-page:warm-organic:product': {
    score: 6,
    verdict: 'Warm positioning creates trust, which is a competitive advantage. But the organic aesthetic may signal "lifestyle brand" rather than "professional tool."',
    sections: {
      hero: [
        { text: 'Trust-building palette gives competitive advantage', light: 'green', comment: 'Warmth differentiates from cold SaaS competitors.' },
      ],
      features: [
        { text: 'Feature messaging matches the warm brand voice', light: 'green', comment: 'Consistent tone throughout.' },
        { text: 'No concrete metrics or outcomes listed', light: 'yellow', comment: 'Add specific numbers to back up the warm messaging.' },
      ],
      pricing: [
        { text: 'Pricing feels approachable but lacks urgency', light: 'yellow', comment: 'Add a limited-time offer or social proof.' },
      ],
      testimonials: [
        { text: 'Testimonials reinforce trust but lack conversion tie-in', light: 'yellow', comment: 'Add a CTA after testimonials: "See why teams love SLAP."' },
      ],
      faq: [
        { text: 'FAQ answers are warm but do not address pricing objections', light: 'yellow', comment: 'Add "Is there a free tier?" and "Can I cancel anytime?"' },
      ],
      signup: [
        { text: 'Signup section needs a trust badge or guarantee', light: 'yellow', comment: 'Add "No credit card required" or "Cancel anytime."' },
      ],
    },
  },

  'landing-page:warm-organic:technical': {
    score: 6,
    verdict: 'Blob gradients and bouncy easing add rendering weight. Touch targets are excellent. Battery drain from continuous animations is a concern on mobile.',
    sections: {
      hero: [
        { text: 'Hero renders cleanly with minimal blocking', light: 'green', comment: 'Acceptable load performance.' },
      ],
      features: [
        { text: 'Blob gradients add GPU rendering overhead', light: 'yellow', comment: 'Use will-change sparingly for blobs.' },
      ],
      pricing: [
        { text: 'Bouncy easing triggers constant repaints on interaction', light: 'yellow', comment: 'Use transform-only animations where possible.' },
      ],
      testimonials: [
        { text: 'Blob gradient behind testimonials adds GPU overhead', light: 'yellow', comment: 'Use a static gradient or reduce blur radius.' },
      ],
      faq: [
        { text: 'Bouncy accordion animation triggers layout recalculation', light: 'yellow', comment: 'Use max-height transition instead of height auto.' },
      ],
      signup: [
        { text: 'Form validation runs on every keystroke, not on blur', light: 'yellow', comment: 'Debounce validation or trigger on blur for better performance.' },
      ],
    },
  },

  'landing-page:warm-organic:design': {
    score: 7,
    verdict: 'Distinctive and human. The organic palette with serif typography creates a unique identity that stands apart from typical SaaS design. Charming and memorable.',
    sections: {
      hero: [
        { text: 'Cream + earth tones create a unique, memorable identity', light: 'green', comment: 'Most human-feeling variation.' },
      ],
      features: [
        { text: 'Serif + emoji combination is distinctive but polarizing', light: 'yellow', comment: 'Works for creative audience, risky for enterprise.' },
      ],
      pricing: [
        { text: '16px radius creates soft, inviting card shapes', light: 'green', comment: 'Consistent with brand personality.' },
      ],
      testimonials: [
        { text: 'Serif quote typography with soft card styling feels authentic', light: 'green', comment: 'Warmest testimonial treatment across all variations.' },
      ],
      faq: [
        { text: 'Rounded accordion panels match organic design language', light: 'green', comment: 'Consistent border-radius throughout the page.' },
      ],
      signup: [
        { text: 'Forest green signup button on cream is warm and inviting', light: 'green', comment: 'The CTA feels like a friendly invitation, not a demand.' },
      ],
    },
  },

  // ─── RETRO-FUTURISM ─────────────────────────────────────────

  'landing-page:retro-futurism:marketing': {
    score: 6,
    verdict: 'Impossible to forget but difficult to convert. The neon aesthetic creates instant brand recall. But visual spectacle overshadows the sales message.',
    sections: {
      hero: [
        { text: 'Instantly memorable visual identity', light: 'green', comment: 'No one forgets a neon vaporwave page.' },
      ],
      features: [
        { text: 'Glow effects compete with feature messaging', light: 'yellow', comment: 'Reduce visual noise around key copy.' },
        { text: 'No social proof or trust signals', light: 'red', comment: 'Bold visuals need trust anchors to convert.' },
      ],
      pricing: [
        { text: 'Gradient CTAs are eye-catching but hard to read', light: 'yellow', comment: 'Use solid color for button text.' },
      ],
      testimonials: [
        { text: 'Neon-styled testimonials are visually striking but hard to read', light: 'yellow', comment: 'Reduce glow on quote text for readability.' },
        { text: 'No trust signals like company logos or roles', light: 'red', comment: 'Bold visuals need concrete credibility anchors.' },
      ],
      faq: [
        { text: 'FAQ section maintains neon theme but loses scannability', light: 'yellow', comment: 'Use higher contrast for answer text.' },
      ],
      signup: [
        { text: 'Gradient CTA button is eye-catching as final conversion point', light: 'green', comment: 'The neon CTA creates a strong visual climax.' },
      ],
    },
  },

  'landing-page:retro-futurism:ux': {
    score: 4,
    verdict: 'Accessibility nightmare. Neon-on-dark fails for color deficiencies, glow effects blur text, and gradient borders obscure interactive boundaries.',
    sections: {
      hero: [
        { text: 'Dark background with neon creates strong visual hierarchy', light: 'green', comment: 'Clear what to look at first.' },
      ],
      features: [
        { text: 'Glow shadows blur letterforms at small sizes', light: 'red', comment: 'Remove glow from body text \u2014 headlines only.' },
      ],
      pricing: [
        { text: 'Teal/purple/pink are indistinguishable for deuteranopia', light: 'red', comment: 'Add shape/size cues alongside color.' },
        { text: 'Gradient borders obscure button boundaries', light: 'yellow', comment: 'Solid borders are clearer for interaction.' },
      ],
      testimonials: [
        { text: 'Neon glow on testimonial text blurs letterforms', light: 'red', comment: 'Remove text-shadow from testimonial body text.' },
      ],
      faq: [
        { text: 'Gradient borders on FAQ toggles obscure click target boundaries', light: 'yellow', comment: 'Use solid borders for interactive elements.' },
      ],
      signup: [
        { text: 'Neon gradient input field has poor contrast for typed text', light: 'yellow', comment: 'Use solid background with clear text contrast.' },
      ],
    },
  },

  'landing-page:retro-futurism:product': {
    score: 4,
    verdict: 'Memorable but polarizing. The aesthetic narrows the addressable market significantly. Works for creative/gaming audiences, fails for enterprise.',
    sections: {
      hero: [
        { text: 'Unique positioning through bold visual identity', light: 'green', comment: 'Differentiates from every competitor.' },
      ],
      features: [
        { text: 'No ROI data \u2014 spectacle replaces substance', light: 'red', comment: 'Visual impact alone doesn\'t justify purchase.' },
      ],
      pricing: [
        { text: 'Pricing is readable despite heavy visual treatment', light: 'yellow', comment: 'Numbers survive the neon \u2014 barely.' },
      ],
      testimonials: [
        { text: 'Testimonials are stylistically bold but lack substance', light: 'red', comment: 'Visual spectacle cannot replace concrete outcomes.' },
      ],
      faq: [
        { text: 'FAQ does not address accessibility or platform compatibility', light: 'yellow', comment: 'Add questions about browser support and screen reader compatibility.' },
      ],
      signup: [
        { text: 'No trust signals or guarantee near signup form', light: 'red', comment: 'The bold aesthetic needs grounding with "No credit card required."' },
      ],
    },
  },

  'landing-page:retro-futurism:technical': {
    score: 4,
    verdict: 'Heavy on GPU resources. Glow shadows, gradient effects, and max saturation drain mobile batteries. Performance budget is exceeded.',
    sections: {
      hero: [
        { text: 'CSS gradient text-clip is lightweight', light: 'green', comment: 'The text effect itself is efficient.' },
      ],
      features: [
        { text: 'Multiple box-shadow glows cause significant repaint cost', light: 'red', comment: 'Remove or reduce glow on mobile.' },
      ],
      pricing: [
        { text: 'Gradient borders add rendering complexity on every card', light: 'yellow', comment: 'Consider solid borders on mobile.' },
        { text: 'Battery drain from continuous glow animations', light: 'red', comment: 'Auto-reduce effects after 5 seconds.' },
      ],
      testimonials: [
        { text: 'Glow effects on testimonial cards add significant paint cost', light: 'yellow', comment: 'Reduce glow to border-only on mobile.' },
      ],
      faq: [
        { text: 'Gradient border animation on FAQ items runs continuously', light: 'red', comment: 'Only animate on hover or interaction, not at rest.' },
      ],
      signup: [
        { text: 'Neon input glow adds GPU overhead on every focus/blur', light: 'yellow', comment: 'Use a simpler border transition for form focus.' },
      ],
    },
  },

  'landing-page:retro-futurism:design': {
    score: 8,
    verdict: 'The most distinctive visual identity in the set. Max saturation neon on dark creates an unforgettable experience. A bold design choice that rewards commitment.',
    sections: {
      hero: [
        { text: 'Neon gradient palette is instantly iconic', light: 'green', comment: 'Most distinctive variation by far.' },
      ],
      features: [
        { text: 'Gradient text-clip effects demonstrate craft and ambition', light: 'green', comment: 'Pushes CSS to its creative limits.' },
      ],
      pricing: [
        { text: 'Max saturation may cause visual fatigue', light: 'yellow', comment: 'Consider slight desaturation for body areas.' },
      ],
      testimonials: [
        { text: 'Gradient text-clip on testimonial names is a bold signature', light: 'green', comment: 'Consistent neon treatment ties quotes into the brand.' },
      ],
      faq: [
        { text: 'FAQ toggle icons use gradient fill matching the page palette', light: 'green', comment: 'Cohesive visual language throughout.' },
      ],
      signup: [
        { text: 'Neon gradient CTA button is the strongest visual endpoint', light: 'green', comment: 'Page ends with maximum visual impact.' },
        { text: 'Input field glow competes with button for attention', light: 'yellow', comment: 'Dim input glow so the CTA button dominates.' },
      ],
    },
  },

  // ─── SLAP ─────────────────────────────────────────────────────

  'landing-page:slap:marketing': {
    score: 4,
    verdict: 'Generic copy with zero competitive positioning. Every headline, subhead, and CTA could belong to any SaaS product. No differentiation, no urgency, no reason to choose this over the next tab.',
    sections: {
      hero: [
        { text: 'Headline is functional but interchangeable with any SaaS landing page', light: 'yellow', comment: 'Nothing in the hero copy tells me what makes this product different from competitors.' },
      ],
      features: [
        { text: 'Feature descriptions list capabilities without benefits or proof', light: 'red', comment: 'No metrics, no case studies, no social proof — just claims without evidence.' },
        { text: 'No competitive positioning — "why us" is completely absent', light: 'red', comment: 'A visitor comparing three tabs cannot distinguish this from the others.' },
      ],
      pricing: [
        { text: 'CTAs say "Get Started" — the most generic conversion copy possible', light: 'yellow', comment: 'Every SaaS page says "Get Started." Replace with a value-specific action.' },
      ],
      testimonials: [
        { text: 'Testimonial quotes are vague praise with no measurable outcomes', light: 'yellow', comment: 'Generic "love this tool" quotes do not drive purchase decisions.' },
      ],
      faq: [
        { text: 'FAQ answers describe features but create no urgency to act', light: 'yellow', comment: 'Add "Why now?" and "What are you missing?" angles to FAQ answers.' },
      ],
      signup: [
        { text: 'Signup CTA repeats hero messaging with no escalation or new reason to convert', light: 'yellow', comment: 'The page ends exactly where it started — no emotional arc, no final push.' },
      ],
    },
  },

  'landing-page:slap:ux': {
    score: 5,
    verdict: 'Technically functional but soulless. Every hover state, focus ring, and transition is a framework default. It works — the way a hospital corridor works — nothing wrong, nothing memorable.',
    sections: {
      hero: [
        { text: 'Layout is scannable — headline, subhead, CTA in correct order', light: 'green', comment: 'Basic visual hierarchy works. Users know where to look.' },
      ],
      features: [
        { text: 'Card hover is a predictable opacity or shadow change — no interaction personality', light: 'yellow', comment: 'The hover effect is the CSS equivalent of a shrug — present but meaningless.' },
      ],
      pricing: [
        { text: 'Focus states use default border-color swap to the accent — functional but generic', light: 'yellow', comment: 'Focus ring is just the accent color border — no custom ring, no offset, no animation.' },
      ],
      testimonials: [
        { text: 'Carousel transitions use standard 0.3s ease — no personality in the motion', light: 'yellow', comment: 'The slide transition is what every tutorial teaches — it works but adds nothing.' },
      ],
      faq: [
        { text: 'Accordion expand/collapse works but feels mechanical', light: 'yellow', comment: 'No easing personality, no height animation — just instant show/hide.' },
      ],
      signup: [
        { text: 'Form validation states use Tailwind defaults — green success, red error', light: 'yellow', comment: 'Success and error colors are straight from the utility framework defaults.' },
      ],
    },
  },

  'landing-page:slap:product': {
    score: 3,
    verdict: 'A template with placeholders where the value proposition should be. Zero proof, zero metrics, zero urgency. No decision-maker would approve a purchase based on this page.',
    sections: {
      hero: [
        { text: 'Value proposition states the category but not the differentiation', light: 'yellow', comment: 'Saying "we do X" is not a value prop — "we do X better because Y" is.' },
      ],
      features: [
        { text: 'No ROI data — zero hours saved, bugs caught, or time-to-ship metrics', light: 'red', comment: 'Features without proof are just promises — add one concrete metric per card.' },
        { text: 'No competitive differentiation — nothing explains why this over alternatives', light: 'red', comment: 'Decision-makers compare options. Give them a reason to pick this one.' },
      ],
      pricing: [
        { text: 'Three tiers are standard but feature lists are thin and uninspiring', light: 'yellow', comment: 'Pricing tiers need clear upgrade incentives, not just quantity bumps.' },
      ],
      testimonials: [
        { text: 'No case study, no named company, no measurable outcome in any quote', light: 'red', comment: 'Anonymous praise is worthless for B2B conversion. Name names or drop it.' },
      ],
      faq: [
        { text: 'FAQ does not address objections — only restates feature descriptions', light: 'yellow', comment: 'Add "Why not just use X?" and "What does onboarding look like?" questions.' },
      ],
      signup: [
        { text: 'No trial length, no guarantee, no risk reversal near the final CTA', light: 'red', comment: 'The signup asks for commitment with zero reassurance — high abandonment risk.' },
      ],
    },
  },

  'landing-page:slap:technical': {
    score: 6,
    verdict: 'System fonts load fast and there is nothing heavy to render — but that is accidental minimalism, not intentional performance work. No lazy loading, no preconnects, no above-the-fold optimization.',
    sections: {
      hero: [
        { text: 'System font stack means zero font loading latency — fast first paint', light: 'green', comment: 'No web fonts to download. First contentful paint is quick by default.' },
      ],
      features: [
        { text: 'Shared Tailwind utility classes keep CSS payload small', light: 'green', comment: 'No custom CSS to speak of — the framework does the heavy lifting.' },
      ],
      pricing: [
        { text: 'Default 0.2s ease transitions add no measurable rendering cost', light: 'green', comment: 'The transitions are lightweight — but only because they do almost nothing.' },
      ],
      testimonials: [
        { text: 'Carousel uses basic CSS transitions — no animation library overhead', light: 'green', comment: 'Simple slide transition has minimal GPU cost.' },
      ],
      faq: [
        { text: 'Accordion toggle has no animation — instant show/hide is efficient but abrupt', light: 'yellow', comment: 'Acceptable performance but poor perceived quality. Add a height transition.' },
      ],
      signup: [
        { text: 'No form validation library — just basic HTML5 constraints', light: 'yellow', comment: 'Works for email capture but shows no investment in the user experience.' },
      ],
    },
  },

  'landing-page:slap:design': {
    score: 2,
    verdict: 'The AI slop poster child. Purple #8B5CF6 accent, system font stack, 8px border-radius everywhere, 0.2s ease transitions on everything. This is the exact output of prompting "make me a SaaS landing page."',
    sections: {
      hero: [
        { text: 'Purple #8B5CF6 accent is the default AI-generated color — zero brand intention', light: 'red', comment: 'This purple is the most common accent in AI-generated websites. It says nothing about the brand.' },
        { text: 'System font stack with no typographic hierarchy beyond weight changes', light: 'red', comment: 'No font selection was made. The system just rendered whatever the OS provides.' },
      ],
      features: [
        { text: '8px border-radius on every card, button, and input — uniform and meaningless', light: 'red', comment: 'The same radius everywhere means no visual hierarchy. Nothing is rounded for a reason.' },
      ],
      pricing: [
        { text: '0.2s ease on every hover state — the CSS transition equivalent of a template', light: 'yellow', comment: 'Every interaction has the same timing and easing. No motion design was considered.' },
      ],
      testimonials: [
        { text: 'Card styling is the default shadow-sm with no brand personality', light: 'yellow', comment: 'The testimonial cards look identical to every Tailwind component example.' },
      ],
      faq: [
        { text: 'FAQ section has no visual signature — could be copy-pasted from any site', light: 'yellow', comment: 'Accordion styling is framework default with zero customization.' },
      ],
      signup: [
        { text: 'Purple CTA button with white text and 8px radius — the AI slop signature', light: 'red', comment: 'This button exists on ten thousand AI-generated landing pages. Zero distinctiveness.' },
      ],
    },
  },

  // ─── E-COMMERCE: SLAP ──────────────────────────────────────────

  'e-commerce:slap:marketing': {
    score: 4,
    verdict: 'No brand story in the shopping experience. Red #EF4444 accent is the e-commerce default. No cross-sell, no urgency triggers, no social proof. The store sells products but tells no story.',
    sections: {
      products: [
        { text: 'Red accent is the default e-commerce color — indistinguishable from any template store', light: 'yellow', comment: 'Red #EF4444 says "generic store." Choose a color that tells customers who you are.' },
        { text: 'No bestseller badges, no "popular" labels, no social proof on products', light: 'red', comment: 'Shoppers need decision shortcuts. Add trust signals to guide purchase choices.' },
      ],
      cart: [
        { text: 'No cross-sell or "frequently bought together" suggestions in cart', light: 'yellow', comment: 'Cart is a missed upsell opportunity — show one relevant recommendation per visit.' },
      ],
      checkout: [
        { text: 'No urgency triggers — no limited stock, no countdown, no scarcity signals', light: 'yellow', comment: 'Checkout has zero conversion pressure beyond the items in cart.' },
        { text: 'No trust badges, security icons, or guarantee near payment fields', light: 'red', comment: 'Visitors abandon checkout without trust signals — add SSL badge and guarantee.' },
      ],
    },
  },

  'e-commerce:slap:ux': {
    score: 5,
    verdict: 'Functional cart and checkout flow but completely cookie-cutter. Standard patterns work but add nothing — no delight, no efficiency gains, no memorable interaction anywhere in the funnel.',
    sections: {
      products: [
        { text: 'Product grid is scannable with clear name, price, and CTA hierarchy', light: 'green', comment: 'Basic product card layout works. Users can browse without confusion.' },
        { text: 'Hover states are a generic opacity change — no interaction personality', light: 'yellow', comment: 'The hover feedback is so subtle it barely registers as intentional.' },
      ],
      cart: [
        { text: 'Cart drawer slides in with standard transition — functional but forgettable', light: 'yellow', comment: 'The drawer works but the animation has zero character. Default ease-in-out.' },
        { text: 'Quantity controls are adequately sized for touch targets', light: 'green', comment: 'Button sizes meet minimum tap target requirements.' },
      ],
      checkout: [
        { text: 'Step indicator shows progress but uses minimal visual feedback', light: 'yellow', comment: 'Users know where they are but the step transitions feel mechanical.' },
        { text: 'Form inputs lack persistent labels — placeholder text disappears on focus', light: 'yellow', comment: 'Once typing begins, users lose context of which field they are filling.' },
      ],
    },
  },

  'e-commerce:slap:product': {
    score: 3,
    verdict: 'Generic product presentation with colored blocks as placeholder images, tiny product names, and no filtering. This is a wireframe that shipped, not a designed store.',
    sections: {
      products: [
        { text: 'Colored blocks as product images look like placeholders, not intentional design', light: 'red', comment: 'Customers see broken images, not products. This communicates "unfinished."' },
        { text: 'No filtering, sorting, or category navigation — only grid scanning', light: 'red', comment: 'Eight products max with no discovery tools. This will not scale.' },
        { text: 'Product names are small and descriptions are sparse — one sentence each', light: 'yellow', comment: 'Shoppers cannot make informed decisions with a name and a sentence.' },
      ],
      cart: [
        { text: 'Cart shows per-item subtotals — adequate for price transparency', light: 'green', comment: 'Line items with quantity × price is the expected minimum.' },
      ],
      checkout: [
        { text: 'Three-step checkout is standard and familiar', light: 'green', comment: 'Shipping → Payment → Confirmation is the expected flow.' },
        { text: 'No order summary visible during payment step', light: 'yellow', comment: 'Users want to verify what they are paying for before entering card details.' },
      ],
    },
  },

  'e-commerce:slap:technical': {
    score: 6,
    verdict: 'Acceptable baseline performance. System fonts are fast and shared components keep bundle size small. But there is no lazy loading, no image optimization (because there are no images), and no intentional performance work.',
    sections: {
      products: [
        { text: 'System font stack eliminates font loading — instant text rendering', light: 'green', comment: 'Zero web font requests. Text paints immediately.' },
        { text: 'auto-fill grid with minmax(240px, 1fr) handles responsive layout in one rule', light: 'green', comment: 'Single CSS rule adapts to all viewports without media queries.' },
      ],
      cart: [
        { text: 'Cart drawer uses translateX — GPU-composited, no layout thrash', light: 'green', comment: 'Transform-only animation is smooth on all devices.' },
        { text: 'Shared component state between cart and checkout prevents data inconsistency', light: 'green', comment: 'useReducer keeps cart and checkout state synchronized.' },
      ],
      checkout: [
        { text: 'No form validation beyond HTML5 required attributes', light: 'yellow', comment: 'Basic constraints work but provide poor error feedback to users.' },
        { text: 'No lazy loading or code splitting — entire store loads upfront', light: 'yellow', comment: 'Acceptable for a demo but would not scale to a real product catalog.' },
      ],
    },
  },

  'e-commerce:slap:design': {
    score: 2,
    verdict: 'Template store with zero identity. Red #EF4444 accent, 12px border-radius cards, minmax(240px) grid, colored placeholder blocks. This is the AI e-commerce starter pack — every choice is a default.',
    sections: {
      products: [
        { text: 'Red #EF4444 is the most common e-commerce accent — signals "template store"', light: 'red', comment: 'This red is on every default Shopify theme. It says nothing about this brand.' },
        { text: '12px border-radius cards with shadow-sm — the Tailwind component default', light: 'red', comment: 'Every card looks like a Tailwind UI example. No design decision was made here.' },
      ],
      cart: [
        { text: 'White drawer with no brand treatment — could belong to any store', light: 'yellow', comment: 'The cart drawer is a blank container. No color, no personality, no brand moment.' },
        { text: 'Red price highlights are the only visual accent — no supporting palette', light: 'yellow', comment: 'One red accent does not make a color system. The cart feels undesigned.' },
      ],
      checkout: [
        { text: 'Step indicators are gray circles with no brand personality', light: 'yellow', comment: 'The checkout progress feels like a wireframe — functional but unfinished.' },
        { text: 'Confirmation state uses default green checkmark — no celebration, no brand moment', light: 'yellow', comment: 'Order confirmation should feel rewarding. This feels like a form submission.' },
      ],
    },
  },

  // ─── MEMPHIS / NEO-POP ──────────────────────────────────────────

  'landing-page:memphis:marketing': {
    score: 7,
    verdict: 'Memphis grabs attention instantly — the bold colors and playful geometry make the page impossible to scroll past. CTAs pop with high contrast. Risk: the playful tone may undercut trust for B2B buyers.',
    sections: {
      hero: [
        { text: 'Impact headlines and multi-color accents create instant visual stop', light: 'green', comment: 'Scroll-stopping hero — visitors will remember this page.' },
        { text: 'Playful tone may clash with enterprise buyer expectations', light: 'yellow', comment: 'Consider a "serious mode" toggle or toned-down enterprise variant.' },
      ],
      features: [
        { text: 'Offset shadow cards with cycling colors are distinctive and scannable', light: 'green', comment: 'Each card feels unique while maintaining a system.' },
      ],
      pricing: [
        { text: 'Bold pricing cards with thick borders make tiers easy to compare', light: 'green', comment: 'The featured tier jumps out with its accent treatment.' },
      ],
      testimonials: [
        { text: 'Geometric quote decorations make testimonials feel branded, not generic', light: 'green', comment: 'Quote styling reinforces the Memphis identity.' },
      ],
      faq: [
        { text: 'FAQ accordion with colored accents stays on-brand throughout', light: 'green', comment: 'Consistent personality even in utility sections.' },
      ],
      signup: [
        { text: 'CTA button with offset shadow and bold color is the strongest on any variation', light: 'green', comment: 'This CTA is unmissable. Great conversion potential.' },
      ],
    },
  },

  'landing-page:memphis:ux': {
    score: 7,
    verdict: 'High visual energy creates engagement but risks cognitive overload. The cycling color system needs careful management — too many competing focal points can confuse the scan path.',
    sections: {
      hero: [
        { text: 'Clear headline hierarchy despite bold styling — Impact font creates natural weight contrast', light: 'green', comment: 'Visual hierarchy works despite the maximalist approach.' },
      ],
      features: [
        { text: 'Color cycling on cards creates visual variety but may fight for attention', light: 'yellow', comment: 'Consider limiting to 2 accent colors per viewport to reduce cognitive load.' },
      ],
      pricing: [
        { text: 'Thick borders and bold shadows create clear card boundaries', light: 'green', comment: 'Good containment — each tier feels like its own zone.' },
      ],
      testimonials: [
        { text: 'Geometric decorations enhance rather than obscure the quote text', light: 'green', comment: 'Decoration serves the content, not competing with it.' },
      ],
      faq: [
        { text: 'Accordion interactions are standard and predictable despite bold styling', light: 'green', comment: 'Familiar interaction pattern in unfamiliar clothing — good balance.' },
      ],
      signup: [
        { text: 'Form inputs are generous in size with clear focus states', light: 'green', comment: 'Usable despite the visual exuberance.' },
      ],
    },
  },

  'landing-page:memphis:product': {
    score: 6,
    verdict: 'Memphis creates strong brand differentiation — this page would stand out in any competitive lineup. However, the playful aesthetic limits the addressable market to creative/consumer brands.',
    sections: {
      hero: [
        { text: 'Instant differentiation from every other SaaS landing page', light: 'green', comment: 'This variation wins the "you\'ll remember it" test.' },
      ],
      features: [
        { text: 'Feature communication is clear despite bold presentation', light: 'green', comment: 'The styling enhances rather than obscures product value.' },
      ],
      pricing: [
        { text: 'Pricing is scannable — tiers, features, and CTAs are all visible without scrolling', light: 'green', comment: 'Good information density without feeling crowded.' },
        { text: 'Playful pricing may not signal premium value for higher tiers', light: 'yellow', comment: 'Enterprise buyers may perceive this as unserious.' },
      ],
      testimonials: [
        { text: 'Testimonial section adds social proof without breaking the visual flow', light: 'green', comment: 'Good integration of proof with personality.' },
      ],
      faq: [
        { text: 'FAQ addresses expected questions with clear, conversational answers', light: 'green', comment: 'Content tone matches the visual personality.' },
      ],
      signup: [
        { text: 'Newsletter/signup CTA is strong — high visual weight on the action button', light: 'green', comment: 'Final conversion point has appropriate emphasis.' },
      ],
    },
  },

  'landing-page:memphis:technical': {
    score: 7,
    verdict: 'Clean implementation using CSS custom properties and inline styles. The offset shadow system is elegant. Impact font is a system font, so zero web font loading penalty.',
    sections: {
      hero: [
        { text: 'Impact + Trebuchet MS are system fonts — zero loading penalty', light: 'green', comment: 'Smart font choice: distinctive without the performance cost.' },
      ],
      features: [
        { text: 'Shadow cycling uses a clean array pattern — easy to extend', light: 'green', comment: 'SHADOW_CYCLE pattern is maintainable and systematic.' },
      ],
      pricing: [
        { text: 'Inline styles with CSS custom properties allow easy theming', light: 'green', comment: 'Design tokens are well-organized at the top of the file.' },
      ],
      testimonials: [
        { text: 'Geometric decorations use CSS borders, not SVG — lightweight', light: 'green', comment: 'Pure CSS decorations keep bundle size small.' },
      ],
      faq: [
        { text: 'Accordion state is simple useState — no over-engineering', light: 'green', comment: 'Appropriate complexity for the interaction.' },
      ],
      signup: [
        { text: 'Form handling follows existing project patterns', light: 'green', comment: 'Consistent with other variations.' },
      ],
    },
  },

  'landing-page:memphis:design': {
    score: 9,
    verdict: 'A masterclass in post-modern design revival. Every element has intentional personality — the offset shadows, cycling color accents, Impact headlines, and geometric decorations create a cohesive system that\'s impossible to confuse with AI slop.',
    sections: {
      hero: [
        { text: 'Multi-color accent system (#FF6B9D, #4ECDC4, #FFE66D) creates vibrant, intentional palette', light: 'green', comment: 'Three-color cycling is distinctly Memphis — no other variation has this energy.' },
        { text: 'Offset shadows (5px 5px solid) are the signature element — consistent and bold', light: 'green', comment: 'This shadow treatment alone makes every component feel designed, not defaulted.' },
      ],
      features: [
        { text: 'Cycling shadow colors per card create rhythm without chaos', light: 'green', comment: 'Systematic variety — each card is unique but part of a family.' },
      ],
      pricing: [
        { text: 'Thick borders + offset shadows create a "paper cutout" aesthetic that\'s pure Memphis', light: 'green', comment: 'The layered, physical feel contrasts perfectly with flat digital trends.' },
      ],
      testimonials: [
        { text: 'Geometric quote marks and colored accents make testimonials feel crafted', light: 'green', comment: 'Even utility content has personality.' },
      ],
      faq: [
        { text: 'Accordion borders and hover states maintain the Memphis system', light: 'green', comment: 'Consistent design language through the entire page.' },
      ],
      signup: [
        { text: 'CTA section brings full Memphis energy — bold background, offset button, geometric shapes', light: 'green', comment: 'The page ends with maximum impact. Strong closer.' },
      ],
    },
  },

  'e-commerce:memphis:marketing': {
    score: 7,
    verdict: 'Memphis creates a shopping experience that feels like browsing a pop art gallery. Products feel premium through personality rather than minimalism. The playful aesthetic works perfectly for lifestyle/creative brands.',
    sections: {
      products: [
        { text: 'Product cards with offset shadows and cycling colors make browsing feel like discovery', light: 'green', comment: 'Each product feels special — great for brands that want personality.' },
        { text: 'Bold product names in Impact font create memorable product identity', light: 'green', comment: 'Product typography has character, not just information.' },
      ],
      cart: [
        { text: 'Cart drawer continues the Memphis personality — branded shopping experience', light: 'green', comment: 'The cart feels like part of the brand, not a generic container.' },
      ],
      checkout: [
        { text: 'Checkout maintains visual personality while staying functional', light: 'green', comment: 'Playful but not distracting during payment flow.' },
      ],
    },
  },

  'e-commerce:memphis:ux': {
    score: 7,
    verdict: 'Product grid is scannable and cards have clear affordances. Cart interactions are responsive with good feedback. The bold visual style could overwhelm during checkout but the implementation stays restrained where it matters.',
    sections: {
      products: [
        { text: 'Product cards have clear add-to-cart affordances with strong button styling', light: 'green', comment: 'Bold buttons are easy to spot and hit.' },
      ],
      cart: [
        { text: 'Cart drawer has clear item listing with visible quantity controls', light: 'green', comment: 'Shopping cart is functional despite playful styling.' },
      ],
      checkout: [
        { text: 'Step indicators use Memphis styling but remain clearly navigable', light: 'green', comment: 'Progress is visible and stages are distinct.' },
        { text: 'Form inputs maintain generous sizing despite decorative borders', light: 'green', comment: 'Usability preserved in the most critical flow.' },
      ],
    },
  },

  'e-commerce:memphis:product': {
    score: 6,
    verdict: 'The Memphis store creates instant brand differentiation — no one will confuse this with a template store. Product presentation is strong for creative/lifestyle categories. Less suitable for technical products.',
    sections: {
      products: [
        { text: 'Product grid makes browsing feel curated rather than catalogued', light: 'green', comment: 'The visual treatment elevates simple product listings.' },
      ],
      cart: [
        { text: 'Cart maintains brand experience through the purchase flow', light: 'green', comment: 'Consistent brand voice even in transactional moments.' },
      ],
      checkout: [
        { text: 'Checkout personality may distract from purchase completion for cautious buyers', light: 'yellow', comment: 'Consider a slightly more restrained checkout for higher AOV.' },
      ],
    },
  },

  'e-commerce:memphis:technical': {
    score: 7,
    verdict: 'Clean useReducer cart state, system fonts (zero loading), CSS-only decorations. The shadow cycling system is efficient and maintainable.',
    sections: {
      products: [
        { text: 'Product grid uses CSS grid with clean responsive breakpoints', light: 'green', comment: 'Grid reflows properly without jumps.' },
      ],
      cart: [
        { text: 'Cart state management follows project useReducer pattern', light: 'green', comment: 'Consistent with other e-commerce variations.' },
      ],
      checkout: [
        { text: 'Three-step checkout flow uses simple useState progression', light: 'green', comment: 'Appropriate complexity for the checkout interaction.' },
      ],
    },
  },

  'e-commerce:memphis:design': {
    score: 9,
    verdict: 'The Memphis e-commerce variation transforms shopping into an experience. Offset shadows on product cards, cycling accent colors, Impact typography, and geometric decorations create a store with unmistakable identity.',
    sections: {
      products: [
        { text: 'Product cards with offset shadows and bold borders feel like collectible art pieces', light: 'green', comment: 'Each product card has character — the opposite of template product grids.' },
        { text: 'Category color coding uses the Memphis palette consistently', light: 'green', comment: 'Color serves navigation while reinforcing the aesthetic.' },
      ],
      cart: [
        { text: 'Cart drawer uses Memphis borders and accents — brand consistency through to purchase', light: 'green', comment: 'The drawer feels designed, not bolted on.' },
      ],
      checkout: [
        { text: 'Checkout step indicators use geometric shapes and bold colors from the Memphis system', light: 'green', comment: 'Even progress dots feel intentionally designed.' },
      ],
    },
  },

  // ─── ART DECO ───────────────────────────────────────────────────

  'landing-page:art-deco:marketing': {
    score: 7,
    verdict: 'Art Deco communicates luxury and craftsmanship immediately. The gold-and-navy palette signals premium positioning. Strong for high-end B2B/SaaS, less effective for mass-market or startup-vibes.',
    sections: {
      hero: [
        { text: 'Gold accents on navy create instant premium perception', light: 'green', comment: 'This palette screams "premium" before anyone reads a word.' },
        { text: 'Serif headlines communicate authority and established expertise', light: 'green', comment: 'Georgia + Palatino feel curated, not defaulted.' },
      ],
      features: [
        { text: 'Diamond ornaments between sections create visual breathing room with brand personality', light: 'green', comment: 'Decorative elements serve as section dividers and brand reinforcement.' },
      ],
      pricing: [
        { text: 'Stepped double-borders on pricing cards signal craftsmanship in the design itself', light: 'green', comment: 'The pricing section looks like it was designed, not generated.' },
      ],
      testimonials: [
        { text: 'Gold quote marks and elegant borders make testimonials feel prestigious', light: 'green', comment: 'Social proof inherits the luxury positioning.' },
      ],
      faq: [
        { text: 'FAQ section maintains the refined tone — answers feel authoritative', light: 'green', comment: 'Even utility content has gravitas.' },
      ],
      signup: [
        { text: 'CTA with gold accent on navy is distinctive and action-oriented', light: 'green', comment: 'The signup section closes with appropriate weight.' },
      ],
    },
  },

  'landing-page:art-deco:ux': {
    score: 8,
    verdict: 'Excellent visual hierarchy through type weight and gold accent placement. The geometric ornaments guide the eye without creating noise. Cream background with dark text ensures readability throughout.',
    sections: {
      hero: [
        { text: 'Clear headline hierarchy — serif display font creates natural weight progression', light: 'green', comment: 'Heading-to-body transition is smooth and scannable.' },
      ],
      features: [
        { text: 'Card layout with consistent gold borders creates predictable scan path', light: 'green', comment: 'Users know where to look — the gold guides the eye.' },
      ],
      pricing: [
        { text: 'Tier differentiation uses size, border weight, and gold treatment — not just color', light: 'green', comment: 'Multiple affordances for plan comparison. Accessible approach.' },
      ],
      testimonials: [
        { text: 'Quote layout is generous with whitespace — easy to read and absorb', light: 'green', comment: 'Content breathes. Good reading rhythm.' },
      ],
      faq: [
        { text: 'Accordion interactions are smooth and predictable', light: 'green', comment: 'Standard UX pattern with premium visual treatment.' },
      ],
      signup: [
        { text: 'Form fields have clear labels and generous touch targets', light: 'green', comment: 'Usability maintained despite ornamental styling.' },
      ],
    },
  },

  'landing-page:art-deco:product': {
    score: 7,
    verdict: 'Art Deco positions the product as premium and established. The visual design does the trust-building that copy alone can\'t achieve. Strong for products targeting design-savvy or enterprise audiences.',
    sections: {
      hero: [
        { text: 'Premium aesthetic creates immediate credibility for the product', light: 'green', comment: 'Visitors perceive quality before reading features.' },
      ],
      features: [
        { text: 'Feature cards feel crafted — each one communicates care in presentation', light: 'green', comment: 'The design quality implies product quality.' },
      ],
      pricing: [
        { text: 'Premium visual treatment justifies higher price points', light: 'green', comment: 'Luxury aesthetic reduces price sensitivity.' },
      ],
      testimonials: [
        { text: 'Testimonials inherit premium positioning — social proof feels weighty', light: 'green', comment: 'Good synergy between design and content.' },
      ],
      faq: [
        { text: 'FAQ section maintains trust through consistent quality', light: 'green', comment: 'No quality drop-off in later sections.' },
      ],
      signup: [
        { text: 'Signup section communicates exclusivity rather than desperation', light: 'green', comment: 'The CTA feels like an invitation, not a hard sell.' },
      ],
    },
  },

  'landing-page:art-deco:technical': {
    score: 7,
    verdict: 'Clean implementation with system-adjacent fonts (Georgia, Optima). Diamond ornaments use pure CSS transforms — no SVG or image dependencies. Stepped borders are CSS-only.',
    sections: {
      hero: [
        { text: 'Georgia and Optima are widely available system fonts — minimal loading penalty', light: 'green', comment: 'Premium typography feel without web font cost.' },
      ],
      features: [
        { text: 'Diamond ornaments use CSS transform: rotate(45deg) — pure CSS, zero dependencies', light: 'green', comment: 'Decorative elements add zero bundle size.' },
      ],
      pricing: [
        { text: 'Stepped double-borders use nested box-shadow + border — clever CSS technique', light: 'green', comment: 'Visually rich effect from simple CSS properties.' },
      ],
      testimonials: [
        { text: 'Quote styling uses CSS pseudo-elements for decorative marks', light: 'green', comment: 'No extra DOM elements for decoration.' },
      ],
      faq: [
        { text: 'Accordion state management is minimal and efficient', light: 'green', comment: 'Simple useState — no over-engineering.' },
      ],
      signup: [
        { text: 'Form follows standard controlled input patterns', light: 'green', comment: 'Consistent with project conventions.' },
      ],
    },
  },

  'landing-page:art-deco:design': {
    score: 9,
    verdict: 'A stunning revival of Art Deco principles — geometric symmetry, gold/navy palette, stepped borders, and diamond ornaments create a cohesive luxury experience. Every element feels intentionally crafted.',
    sections: {
      hero: [
        { text: 'Gold #B8860B on cream #FAF7F0 is a masterful palette — warm, luxurious, and readable', light: 'green', comment: 'This color combination is distinctive and historically grounded.' },
        { text: 'Stepped double-border framing creates a jewel-box effect for the hero', light: 'green', comment: 'The hero feels precious and framed — like an exhibition piece.' },
      ],
      features: [
        { text: 'Diamond ornaments between sections are the signature element — consistent and elegant', light: 'green', comment: 'These ornaments make every section transition feel designed.' },
      ],
      pricing: [
        { text: 'Gold border treatment on the featured tier creates luxury hierarchy', light: 'green', comment: 'The featured plan feels like the premium choice through visual weight alone.' },
      ],
      testimonials: [
        { text: 'Large gold quotation marks and elegant serif typography make quotes feel prestigious', light: 'green', comment: 'Even social proof section has full design treatment.' },
      ],
      faq: [
        { text: 'Accordion items with gold accent on expand maintain the Art Deco system', light: 'green', comment: 'Consistent visual language through to utility sections.' },
      ],
      signup: [
        { text: 'Navy CTA section with gold accents creates a strong, elegant closing statement', light: 'green', comment: 'The page ends with appropriate grandeur.' },
      ],
    },
  },

  'e-commerce:art-deco:marketing': {
    score: 7,
    verdict: 'Art Deco transforms a product catalog into a curated boutique experience. Gold accents and geometric borders signal premium products. Strong for luxury goods, jewelry, fashion, and design-focused brands.',
    sections: {
      products: [
        { text: 'Product cards with gold borders and cream backgrounds feel like display cases', light: 'green', comment: 'Products are presented, not just listed.' },
        { text: 'Category navigation with gold accents creates boutique department feel', light: 'green', comment: 'Browsing feels curated rather than catalogued.' },
      ],
      cart: [
        { text: 'Cart drawer maintains luxury experience — gold accents and serif typography', light: 'green', comment: 'The purchasing experience matches the browsing experience.' },
      ],
      checkout: [
        { text: 'Checkout preserves premium feel through payment flow', light: 'green', comment: 'No quality drop-off during transaction. Builds purchase confidence.' },
      ],
    },
  },

  'e-commerce:art-deco:ux': {
    score: 8,
    verdict: 'Excellent product card hierarchy with clear price and CTA placement. Gold borders create visual boundaries without heaviness. The serif typography adds authority while remaining readable at product-listing sizes.',
    sections: {
      products: [
        { text: 'Product grid has clear visual boundaries and consistent card structure', light: 'green', comment: 'Easy to scan and compare products.' },
      ],
      cart: [
        { text: 'Cart items have clear pricing and quantity controls with good touch targets', light: 'green', comment: 'Cart is functional and elegant simultaneously.' },
      ],
      checkout: [
        { text: 'Step indicators use geometric progression with gold highlighting', light: 'green', comment: 'Progress is clear and the interface feels premium.' },
        { text: 'Form inputs with gold focus borders provide clear interaction feedback', light: 'green', comment: 'Focus states are visible and on-brand.' },
      ],
    },
  },

  'e-commerce:art-deco:product': {
    score: 7,
    verdict: 'Art Deco positions every product as a premium offering. The visual treatment alone increases perceived value. Best suited for products where craftsmanship and quality are selling points.',
    sections: {
      products: [
        { text: 'Products inherit luxury positioning from the design system', light: 'green', comment: 'Visual context elevates product perception.' },
      ],
      cart: [
        { text: 'Cart experience maintains premium feel — no jarring transitions', light: 'green', comment: 'Consistent quality through the funnel.' },
      ],
      checkout: [
        { text: 'Premium checkout experience reduces purchase anxiety for high-value items', light: 'green', comment: 'Design quality builds trust during payment.' },
      ],
    },
  },

  'e-commerce:art-deco:technical': {
    score: 7,
    verdict: 'System fonts (Georgia, Optima), CSS-only decorations, standard useReducer cart pattern. No performance overhead from the luxury aesthetic — all visual richness comes from CSS.',
    sections: {
      products: [
        { text: 'Product grid uses CSS grid with clean breakpoints', light: 'green', comment: 'Responsive behavior is smooth.' },
      ],
      cart: [
        { text: 'Cart state follows project useReducer conventions', light: 'green', comment: 'Consistent implementation across variations.' },
      ],
      checkout: [
        { text: 'Checkout flow uses simple useState step management', light: 'green', comment: 'No unnecessary complexity.' },
      ],
    },
  },

  'e-commerce:art-deco:design': {
    score: 9,
    verdict: 'The Art Deco e-commerce variation is a boutique experience. Gold borders frame each product like a display case, stepped borders add depth, and the navy-cream-gold palette creates unmistakable luxury identity.',
    sections: {
      products: [
        { text: 'Gold borders and cream card backgrounds make each product feel like a curated exhibit', light: 'green', comment: 'Product presentation has gallery-level care.' },
        { text: 'Diamond ornaments in section headers tie the catalog to the brand identity', light: 'green', comment: 'Consistent design language from browsing through purchase.' },
      ],
      cart: [
        { text: 'Cart drawer with gold accents and serif item names maintains boutique experience', light: 'green', comment: 'Even the cart feels designed, not defaulted.' },
      ],
      checkout: [
        { text: 'Checkout steps with geometric Art Deco indicators are unique to this variation', light: 'green', comment: 'No other e-commerce variation has this level of checkout design.' },
      ],
    },
  },

  // ─── E-COMMERCE: MAXIMALIST ──────────────────────────────────

  'e-commerce:maximalist:marketing': {
    score: 7,
    verdict: 'The bold serif typography and coral CTAs create real emotional urgency. Gold price tags on navy feel premium and aspirational. But no social proof, no urgency triggers, and the visual noise may overwhelm deliberate shoppers.',
    sections: {
      products: [
        { text: 'Gold serif price tags on navy background signal premium positioning', light: 'green', comment: 'The $XX.XX in Georgia gold on dark navy reads as luxury — customers expect and accept higher prices.' },
        { text: 'Category color badges add discovery cues to the dense grid', light: 'green', comment: 'Purple for Clothing, amber for Accessories — visual filtering without needing a dropdown.' },
        { text: 'No bestseller badges, stock counts, or "trending" labels to guide decisions', light: 'yellow', comment: 'In a visually rich grid, shoppers need shortcuts — add one trust signal per row.' },
      ],
      cart: [
        { text: 'Coral "Cart" button with offset shadow creates a playful, tactile CTA', light: 'green', comment: 'The raised shadow makes the button feel pressable — good micro-interaction cue.' },
        { text: 'No cross-sell suggestions or "complete the look" prompts in drawer', light: 'yellow', comment: 'Maximalist aesthetic is perfect for curated bundles — missed upsell opportunity.' },
      ],
      checkout: [
        { text: 'Coral-to-gold step progression creates a rewarding visual journey', light: 'green', comment: 'Users feel accomplishment as steps turn gold — the checkout becomes a reward path.' },
        { text: 'No trust badges, security icons, or guarantee messaging near payment fields', light: 'red', comment: 'The decorative richness needs explicit trust anchors — add SSL badge and return policy at payment step.' },
      ],
    },
  },


  'e-commerce:maximalist:ux': {
    score: 6,
    verdict: 'Strong font weight hierarchy from 900 headings to 400 descriptions creates a clear scanning ladder. But the 8px offset shadows and dense grid compete for attention, and the serif body text reduces scan speed in product descriptions.',
    sections: {
      products: [
        { text: 'Font weight cascade (900 → 800 → 700 → 400) creates clear information hierarchy', light: 'green', comment: 'Users scan name first, then price, then description — the weight ladder works.' },
        { text: '8px offset box-shadows on every card create visual heaviness that slows scanning', light: 'yellow', comment: 'When every element casts a heavy shadow, nothing stands out — reduce shadow on secondary elements.' },
        { text: 'Star ratings in gold serif are decorative but lack numeric label for quick scanning', light: 'yellow', comment: 'Add "4.5" next to stars for users who scan numbers faster than counting glyphs.' },
      ],
      cart: [
        { text: 'Gold-bordered quantity buttons at 30px meet minimum touch targets', light: 'green', comment: 'Adequate size for thumb interaction, and the gold border makes them clearly interactive.' },
        { text: 'Gold border-left accent on drawer establishes clear context boundary', light: 'green', comment: 'The 3px gold line signals "you are in a different mode" — good spatial cue.' },
      ],
      checkout: [
        { text: 'Coral focus state on inputs provides clear active field indication', light: 'green', comment: 'The border color change from muted gold to bright coral on focus is unmissable.' },
        { text: 'Serif body text in checkout forms slows reading speed for address entry', light: 'yellow', comment: 'Serif works for display typography but hinders form-filling speed — use sans-serif for inputs.' },
      ],
    },
  },

  'e-commerce:maximalist:product': {
    score: 5,
    verdict: 'Rich visual presentation creates aspirational product positioning, but the dense grid with no filtering and single-sentence descriptions forces customers to browse blind. The premium aesthetic sets expectations the product detail cannot fulfill.',
    sections: {
      products: [
        { text: 'Category color badges provide passive filtering through visual grouping', light: 'green', comment: 'Users can scan for "purple = Clothing" without explicit filters — works at small catalog scale.' },
        { text: 'No filtering, sorting, or search — discovery relies on visual scanning of dense grid', light: 'red', comment: 'The maximalist aesthetic adds visual noise that makes grid scanning harder, not easier — filters are essential.' },
        { text: 'One-sentence product descriptions cannot justify the premium price positioning', light: 'yellow', comment: 'Gold prices imply premium goods — add material, origin, or feature details to support the price point.' },
      ],
      cart: [
        { text: 'Per-item subtotals in coral serif maintain the aspirational cart experience', light: 'green', comment: 'Cart line items feel like a restaurant bill at a fine dining establishment.' },
      ],
      checkout: [
        { text: 'Three-step checkout with clear step labels is standard and predictable', light: 'green', comment: 'Shipping → Payment → Confirmation — no surprises, which is what customers want at payment time.' },
        { text: 'Order summary box in payment step shows only total, not itemized breakdown', light: 'yellow', comment: 'Customers want to verify what they are paying for before entering card details.' },
      ],
    },
  },

  'e-commerce:maximalist:technical': {
    score: 7,
    verdict: 'Solid useReducer state machine and GPU-composited drawer animation. The auto-fill grid handles responsive layout well. But heavy offset shadows on every element and serif font loading add unnecessary rendering weight.',
    sections: {
      products: [
        { text: 'auto-fill grid with minmax(280px, 1fr) adapts to viewport without media queries', light: 'green', comment: 'Responsive layout handled by a single CSS grid rule — no breakpoint maintenance needed.' },
        { text: 'Georgia serif requires system font fallback chain — consistent cross-platform rendering', light: 'green', comment: 'Georgia is a reliable system serif — no web font loading delay or FOIT issues.' },
      ],
      cart: [
        { text: 'Cart drawer uses translateX transform for GPU-composited animation', light: 'green', comment: 'Smooth 60fps open/close with no layout thrash.' },
        { text: 'Map-based cart state provides O(1) lookups for add/update/remove operations', light: 'green', comment: 'Good data structure choice — scales well as cart grows.' },
      ],
      checkout: [
        { text: 'useReducer prevents impossible state combinations (cart open + checkout active)', light: 'green', comment: 'Clean state machine — no stale data or conflicting UI states.' },
        { text: '8px offset box-shadows on confirmation icon and buttons add repainting cost', light: 'yellow', comment: 'Offset shadows are non-composited — consider reducing shadow complexity or using will-change.' },
      ],
    },
  },

  'e-commerce:maximalist:design': {
    score: 8,
    verdict: 'The most opinionated e-commerce variation — every element is layered, shadowed, and intentional. The navy-coral-gold triad is a complete brand system. The offset shadows are the signature gesture that prevents this from feeling like generic "dark theme."',
    sections: {
      products: [
        { text: '8px offset shadows on every card create a stacked-paper depth effect', light: 'green', comment: 'The consistent shadow direction gives the grid a physical, tactile quality — like cards on a table.' },
        { text: 'Gold serif prices against navy card backgrounds are the strongest typographic moment', light: 'green', comment: 'The Georgia gold price tags feel like brass plaques — premium without being pretentious.' },
      ],
      cart: [
        { text: 'Gold 3px border-left on drawer extends the jewelry-box aesthetic into the cart', light: 'green', comment: 'The gold border says "this is where the treasure goes" — on-brand and functional.' },
        { text: 'Coral price highlights in cart create urgency within the warm palette', light: 'green', comment: 'Coral draws the eye to cost — the only "hot" color in the warm-neutral drawer.' },
      ],
      checkout: [
        { text: 'Step circles with coral active → gold completed progression feel rewarding', light: 'green', comment: 'The color shift from urgent coral to settled gold mirrors emotional journey through checkout.' },
        { text: 'Card background #252A4A in checkout creates consistent dark surface system', light: 'green', comment: 'The slightly lighter navy for input containers maintains depth hierarchy throughout checkout.' },
      ],
    },
  },

  // ─── E-COMMERCE: DARK INDUSTRIAL ─────────────────────────────

  'e-commerce:dark-industrial:marketing': {
    score: 5,
    verdict: 'The monospace-everything approach screams "we built this in a terminal" — which attracts engineers but alienates mainstream shoppers. Ghost buttons with no fill look like disabled elements. No urgency, no warmth, no closing mechanism.',
    sections: {
      products: [
        { text: 'Amber monospace prices on near-black background create a data-terminal aesthetic', light: 'green', comment: 'For the target audience (tech, industrial tools), the spec-sheet vibe builds credibility.' },
        { text: 'Ghost outlined "Add to Cart" buttons look inactive until hovered', light: 'yellow', comment: 'Transparent buttons with thin borders are ambiguous — mainstream shoppers may not recognize them as CTAs.' },
        { text: 'No social proof, ratings context, or popularity signals anywhere on the grid', light: 'red', comment: 'Even industrial B2B buyers want peer validation — add "most ordered" or unit count badges.' },
      ],
      cart: [
        { text: '"// Cart" title with code-comment syntax is on-brand for developer audience', light: 'green', comment: 'The double-slash is a wink to the target demographic — they will get it.' },
        { text: 'Amber-on-black cart feels utilitarian — no emotional trigger to complete purchase', light: 'yellow', comment: 'The cart reads like an inventory manifest, not a shopping experience — add a motivational nudge.' },
      ],
      checkout: [
        { text: '"// Shipping Information" comment-style headers extend the code metaphor into forms', light: 'green', comment: 'Consistent voice throughout — the target audience will appreciate the commitment.' },
        { text: 'No trust signals, security messaging, or return policy near payment', light: 'red', comment: 'Even technical users need reassurance at payment — add a lock icon or "256-bit encrypted" label.' },
      ],
    },
  },

  'e-commerce:dark-industrial:ux': {
    score: 6,
    verdict: 'The all-monospace typographic system creates uniform scanning rhythm but eliminates hierarchy. Everything is the same visual weight. Amber hover fills on ghost buttons provide clear feedback, but the near-black UI requires high screen brightness.',
    sections: {
      products: [
        { text: 'All-monospace typography creates uniform rhythm but flattens visual hierarchy', light: 'yellow', comment: 'When name, price, and description are all Courier, users cannot prioritize what to read first.' },
        { text: 'Amber fill-on-hover for ghost buttons provides clear interactive feedback', light: 'green', comment: 'The color inversion on hover is a strong affordance — users know the button is clickable.' },
      ],
      cart: [
        { text: 'Square 26px quantity buttons are below 44px WCAG touch target recommendation', light: 'yellow', comment: 'At 26px, thumb interaction on mobile is error-prone — bump to 36px minimum.' },
        { text: 'Amber glow box-shadow on card hover provides subtle depth feedback', light: 'green', comment: 'The warm glow effect creates a "selected" feeling without layout shift.' },
      ],
      checkout: [
        { text: 'Square step indicators with zero border-radius maintain the industrial grid system', light: 'green', comment: 'Consistent with the zero-radius thesis — users learn the visual language quickly.' },
        { text: 'Input fields on near-black #12121A background with #1E293B borders have low boundary contrast', light: 'yellow', comment: 'The border-to-background contrast ratio is below 2:1 — users may not see field boundaries clearly.' },
      ],
    },
  },

  'e-commerce:dark-industrial:product': {
    score: 5,
    verdict: 'The spec-sheet layout is efficient for comparison shopping but hostile to discovery. No categories, no filters, no sorting — the catalog is a flat list. Product descriptions are adequate but lack specifications that the industrial audience expects.',
    sections: {
      products: [
        { text: 'Bracketed category labels [Electronics] echo terminal output and aid scanning', light: 'green', comment: 'The bracket syntax groups products visually without needing a formal filter UI.' },
        { text: 'No filtering, sorting, or search in a catalog that looks like it should have all three', light: 'red', comment: 'The industrial spec-sheet aesthetic sets expectations for advanced tooling — deliver it.' },
        { text: 'Product descriptions lack technical specifications that the audience expects', light: 'yellow', comment: 'Industrial shoppers want dimensions, materials, and compatibility — one sentence is insufficient.' },
      ],
      cart: [
        { text: 'Per-item pricing in monospace creates easy column-scanning for price comparison', light: 'green', comment: 'Fixed-width digits naturally align — the cart reads like a spreadsheet, which works here.' },
      ],
      checkout: [
        { text: 'Three-step flow with code-comment headers is clear and predictable', light: 'green', comment: 'Standard checkout wrapped in on-brand voice — no unnecessary friction.' },
        { text: 'ORDER TOTAL in all-caps monospace feels cold at the moment of payment', light: 'yellow', comment: 'Consider adding an order itemization — users want to verify before committing.' },
      ],
    },
  },

  'e-commerce:dark-industrial:technical': {
    score: 9,
    verdict: 'The leanest e-commerce variation by far. Zero images, zero web fonts, zero border-radius, minimal transitions. The monospace system font loads instantly. Only concern: the near-black palette demands sRGB accuracy across displays.',
    sections: {
      products: [
        { text: 'System monospace font (Courier New) eliminates all web font loading latency', light: 'green', comment: 'Zero FOIT, zero layout shift from font swap — text renders in the first paint.' },
        { text: 'auto-fill grid with minmax(260px, 1fr) handles responsive layout without breakpoints', light: 'green', comment: 'Single CSS rule covers all viewport sizes — no media query maintenance.' },
      ],
      cart: [
        { text: 'translateX drawer animation is GPU-composited — no layout thrash', light: 'green', comment: 'Smooth 60fps cart open/close animation.' },
        { text: 'Map-based cart state provides O(1) operations for all cart actions', light: 'green', comment: 'Efficient data structure — no array scanning for updates or removals.' },
      ],
      checkout: [
        { text: 'useReducer state machine prevents impossible cart/checkout state combinations', light: 'green', comment: 'Clean state management with no race conditions between drawer and checkout.' },
        { text: 'Near-black background colors (#0A0A0F, #12121A) may render identically on low-quality displays', light: 'yellow', comment: 'The surface/background distinction is only 8 lightness units — test on TN panels.' },
      ],
    },
  },

  'e-commerce:dark-industrial:design': {
    score: 8,
    verdict: 'The most disciplined variation — zero border-radius, one accent color, one font family. The amber-on-black palette with square edges creates an authentic control-panel aesthetic. The code-comment section headers are a genuine design innovation.',
    sections: {
      products: [
        { text: 'Zero border-radius on all elements creates a consistent industrial grid system', light: 'green', comment: 'Not a single rounded corner anywhere — the commitment is total and creates a distinct identity.' },
        { text: 'Single amber accent (#D4A574) against near-black creates a focused color story', light: 'green', comment: 'One warm color in a cold dark world — every amber element is automatically significant.' },
      ],
      cart: [
        { text: 'Monospace uppercase cart titles echo equipment manifests and packing lists', light: 'green', comment: 'The drawer reads like a warehouse inventory system — perfectly on-brand.' },
        { text: '"// Cart" code-comment syntax bridges design language with developer culture', light: 'green', comment: 'The double-slash is both decoration and communication — it says "we are one of you."' },
      ],
      checkout: [
        { text: '"// Shipping Information" continues the code-comment voice into checkout forms', light: 'green', comment: 'Most e-commerce sites abandon their design voice at forms — this one commits through to payment.' },
        { text: 'Square step indicators with amber fill maintain the zero-radius thesis throughout', light: 'green', comment: 'Even progress indicators refuse to soften — the grid system is absolute.' },
      ],
    },
  },

  // ─── E-COMMERCE: WARM ORGANIC ────────────────────────────────

  'e-commerce:warm-organic:marketing': {
    score: 7,
    verdict: 'The earthy palette and serif headings create an authentic artisanal brand voice. Cream background with forest-green CTAs feels trustworthy and sustainable. But the gentle aesthetic lacks urgency — no scarcity, no countdown, no FOMO.',
    sections: {
      products: [
        { text: 'Forest-green pill buttons on cream background create a natural, trustworthy CTA', light: 'green', comment: 'Green says "safe, natural, go" — the color-meaning alignment is perfect for organic/artisanal brands.' },
        { text: 'Serif product names in forest green evoke farmers-market handwritten signs', light: 'green', comment: 'Georgia in dark green feels handcrafted — customers associate this with authenticity and care.' },
        { text: 'No "organic certified" badges, origin stories, or sustainability messaging', light: 'yellow', comment: 'The visual language promises organic values but the product cards do not deliver the proof.' },
      ],
      cart: [
        { text: 'Cream-on-white cart with sage accents feels calming and unhurried', light: 'green', comment: 'The gentle cart experience matches a brand that says "take your time, choose well."' },
        { text: 'No complementary product suggestions or "pairs well with" recommendations', light: 'yellow', comment: 'Organic shoppers love curated bundles — add "from the same collection" suggestions.' },
      ],
      checkout: [
        { text: '"Your order is being lovingly prepared" confirmation copy is perfectly on-brand', light: 'green', comment: 'The warm language at confirmation reinforces the artisanal positioning — this is how this brand should talk.' },
        { text: 'No trust badges or secure checkout messaging — the gentle aesthetic needs explicit safety', light: 'yellow', comment: 'Organic buyers care about trust — add "ethically processed" or "secure checkout" near payment.' },
      ],
    },
  },

  'e-commerce:warm-organic:ux': {
    score: 7,
    verdict: 'Pill-shaped buttons with generous padding create comfortable touch targets. The sage-green accent system is consistent and calming. But the forest-on-cream color scheme risks insufficient contrast for body text, and serif descriptions slow reading.',
    sections: {
      products: [
        { text: 'Pill-shaped buttons (border-radius: 9999px) with 11px padding are comfortable touch targets', light: 'green', comment: 'The rounded buttons feel inviting and are adequately sized for thumb interaction.' },
        { text: 'Soft box-shadow (2px 12px rgba) provides subtle depth without visual weight', light: 'green', comment: 'The gentle shadow lifts cards just enough to create a browsable grid without heaviness.' },
      ],
      cart: [
        { text: 'Circular 30px quantity buttons exceed WCAG minimum touch target of 24px', light: 'green', comment: 'Well-sized for mobile interaction, and the round shape matches the pill-button system.' },
        { text: 'Remove link in #B85C3A terracotta provides gentle but visible destructive action cue', light: 'green', comment: 'The warm red is softer than pure red — destructive but not alarming, matching the organic tone.' },
      ],
      checkout: [
        { text: 'Circular step indicators with forest-green fill match the button system', light: 'green', comment: 'Consistent use of pill/circle shapes throughout — users learn the interaction language.' },
        { text: 'Sage-green input borders on cream background may have low contrast for some users', light: 'yellow', comment: 'The border color #A7C4A0 on #FDF6EE is gentle but test against WCAG 1.4.11 non-text contrast.' },
      ],
    },
  },

  'e-commerce:warm-organic:product': {
    score: 6,
    verdict: 'The artisanal positioning creates perceived value, but the product cards lack the origin stories and material details that organic shoppers actively seek. The warm aesthetic builds trust — now fill it with substance.',
    sections: {
      products: [
        { text: 'Serif headings in forest green create premium artisanal product positioning', light: 'green', comment: 'The typography signals handmade quality — customers expect (and will pay for) craftsmanship.' },
        { text: 'No product origin, materials, or sustainability information on cards', light: 'yellow', comment: 'Organic shoppers want to know where products come from — add "Made in..." or "100% recycled" labels.' },
        { text: 'No filtering or sorting — relying on visual browsing alone', light: 'red', comment: 'Even a small curated catalog needs category tabs — "Kitchen," "Garden," "Wellness."' },
      ],
      cart: [
        { text: 'Warm-brown serif prices maintain the artisanal feel through to cart', light: 'green', comment: 'Price typography does not break character — the handcrafted voice continues in the drawer.' },
      ],
      checkout: [
        { text: 'Three-step checkout with warm placeholders ("Jane Greenfield", "Meadow Lane") is inviting', light: 'green', comment: 'Even the placeholder text is on-brand — small details that build trust.' },
        { text: 'Order summary shows total only — no itemized breakdown at payment step', light: 'yellow', comment: 'Organic shoppers are deliberate purchasers — show them exactly what they are buying.' },
      ],
    },
  },

  'e-commerce:warm-organic:technical': {
    score: 8,
    verdict: 'Clean system font stack, lightweight CSS shadows, and well-structured state management. The cream-based palette renders consistently across displays. Only concerns: sage-green borders may fall below non-text contrast ratios on some monitors.',
    sections: {
      products: [
        { text: 'System font stack plus Georgia serif loads instantly — no web font FOIT', light: 'green', comment: 'Both fonts are system-installed — zero font loading latency on all platforms.' },
        { text: 'auto-fill grid with minmax(260px, 1fr) handles responsive layout automatically', light: 'green', comment: 'No media query breakpoints needed — CSS grid handles the work.' },
      ],
      cart: [
        { text: 'translateX drawer animation with box-shadow is GPU-composited and smooth', light: 'green', comment: '60fps open/close with the shadow adding depth without layout thrash.' },
        { text: 'Map-based cart state with useReducer prevents impossible state combinations', light: 'green', comment: 'Clean state machine — cart drawer and checkout cannot conflict.' },
      ],
      checkout: [
        { text: 'Cream and white backgrounds render identically across sRGB displays', light: 'green', comment: 'The warm palette has enough lightness difference to distinguish surfaces on all monitors.' },
        { text: 'Sage-green borders (#A7C4A0) on cream may fail WCAG 1.4.11 non-text contrast', light: 'yellow', comment: 'The border contrast ratio is approximately 1.8:1 — test with accessibility tools.' },
      ],
    },
  },

  'e-commerce:warm-organic:design': {
    score: 8,
    verdict: 'The most emotionally coherent e-commerce variation. Every element — from the pill-shaped buttons to the sage borders to the warm-brown prices — tells the same story: natural, handcrafted, trustworthy. The "lovingly prepared" confirmation copy is the cherry on top.',
    sections: {
      products: [
        { text: 'Forest-green headings on cream create a farmers-market chalkboard aesthetic', light: 'green', comment: 'The color pairing evokes produce stands and handwritten price signs — authentic and warm.' },
        { text: 'Category placeholder colors (sage, clay, amber, moss) extend the natural palette', light: 'green', comment: 'Even the image placeholders speak the same earthy language — nothing feels synthetic.' },
      ],
      cart: [
        { text: 'White footer on cream drawer creates a subtle "checkout counter" zone', light: 'green', comment: 'The surface shift at the bottom signals "this is where you pay" — like approaching the register.' },
        { text: 'Sage-green borders throughout maintain gentle boundaries without harsh lines', light: 'green', comment: 'The muted green borders are visible but not aggressive — boundaries without barriers.' },
      ],
      checkout: [
        { text: '"Lovingly prepared" confirmation copy extends the brand voice into post-purchase', light: 'green', comment: 'This one phrase does more brand work than the entire visual system — perfect organic voice.' },
        { text: 'Warm placeholder names ("Jane Greenfield", "Meadow Lane") are a delightful detail', light: 'green', comment: 'Even the form hints are on-brand — this level of commitment separates craft from template.' },
      ],
    },
  },

  // ─── E-COMMERCE: RETRO FUTURISM ──────────────────────────────

  'e-commerce:retro-futurism:marketing': {
    score: 6,
    verdict: 'The gradient CTAs and neon glow effects create visual excitement and brand memorability. The "NEON MARKET" name is perfect. But the dark sci-fi aesthetic may alienate mainstream shoppers, and the glow effects compete with product information.',
    sections: {
      products: [
        { text: 'Gradient text prices (teal → purple → pink) are instantly memorable and unique', light: 'green', comment: 'No other e-commerce site has rainbow-gradient pricing — this is a signature move.' },
        { text: 'Glow box-shadow on card hover creates an immersive sci-fi browsing experience', light: 'green', comment: 'The purple glow makes hovering feel like activating a hologram — delightful.' },
        { text: 'No social proof, ratings explanation, or trust signals alongside the visual spectacle', light: 'yellow', comment: 'The visual wow factor needs substance underneath — add "popular" or purchase count.' },
      ],
      cart: [
        { text: 'Gradient badge counter on cart button is eye-catching and functional', light: 'green', comment: 'The teal-to-pink gradient badge draws attention to the cart count without a jarring color.' },
        { text: 'Dark drawer with gradient prices feels like a sci-fi inventory screen', light: 'green', comment: 'The cart experience extends the brand fantasy — shopping in a neon-lit future.' },
      ],
      checkout: [
        { text: 'Gradient step indicators with glow effect make checkout feel like a mission sequence', light: 'green', comment: 'Step progression feels like "activating" stages — gamification through aesthetics.' },
        { text: 'No trust signals near payment — the futuristic aesthetic needs explicit security cues', light: 'red', comment: 'Cool aesthetics do not replace trust — add "Encrypted" or shield icon at payment step.' },
      ],
    },
  },

  'e-commerce:retro-futurism:ux': {
    score: 6,
    verdict: 'The glow effects and gradient buttons provide strong visual feedback on interaction. But the deep purple-black background with lavender text creates a narrow contrast range, and the gradient-text prices sacrifice readability for style.',
    sections: {
      products: [
        { text: 'Scale(1.02) + glow intensification on button hover provides clear interactive feedback', light: 'green', comment: 'Two simultaneous feedback cues (size + glow) make interaction unmistakable.' },
        { text: 'Gradient-text prices using WebkitBackgroundClip sacrifice readability for visual impact', light: 'yellow', comment: 'The teal-to-pink gradient makes individual digits harder to read — especially at smaller sizes.' },
      ],
      cart: [
        { text: 'Purple-bordered 28px quantity buttons with hover glow provide clear feedback', light: 'green', comment: 'The glow on hover is a consistent interaction language throughout the variation.' },
        { text: 'Pink #EC4899 "Remove" text provides clear destructive action signaling', light: 'green', comment: 'Hot pink for removal is softer than red but still signals "caution" — on-brand danger.' },
      ],
      checkout: [
        { text: 'Purple focus glow on input fields creates a focused-field effect', light: 'green', comment: 'The glow ring on active inputs matches the card hover glow — consistent interaction language.' },
        { text: 'Lavender #C4B5FD body text on #0F0B1A background may stress eyes in extended sessions', light: 'yellow', comment: 'The cool-on-dark palette is atmospheric but tiring — test with extended form-filling scenarios.' },
      ],
    },
  },

  'e-commerce:retro-futurism:product': {
    score: 5,
    verdict: 'The neon-market fantasy is compelling but product information is thin. Gradient prices are memorable but hard to read quickly. The aesthetic promise exceeds the functional delivery — shoppers are wowed but under-informed.',
    sections: {
      products: [
        { text: '"NEON MARKET" branding with gradient logo creates instant brand identity', light: 'green', comment: 'The name and visual treatment are perfectly matched — this brand sticks in memory.' },
        { text: 'No filtering, sorting, or category navigation in the grid', light: 'red', comment: 'The dark grid makes scanning harder — compensate with explicit discovery tools.' },
        { text: 'One-sentence descriptions on a dark background with lavender text are hard to parse', light: 'yellow', comment: 'Dark backgrounds demand more generous line spacing and higher contrast for body text.' },
      ],
      cart: [
        { text: 'Gradient-text subtotals in cart maintain the visual fantasy through purchase', light: 'green', comment: 'The neon prices carry from grid into cart — the experience does not break character.' },
      ],
      checkout: [
        { text: 'Gradient "Place Order" button with glow creates a satisfying final CTA', light: 'green', comment: 'The glowing button at the end of checkout feels like pressing a launch button — rewarding.' },
        { text: 'No itemized order breakdown visible during payment step', light: 'yellow', comment: 'Show what the customer is buying — a single total line is not enough for confident purchase.' },
      ],
    },
  },

  'e-commerce:retro-futurism:technical': {
    score: 7,
    verdict: 'Gradient effects are CSS-only with no image assets. Box-shadow glow effects are GPU-composited when used with transform. But the WebkitBackgroundClip gradient text has cross-browser concerns, and multiple box-shadow animations add compositing cost.',
    sections: {
      products: [
        { text: 'CSS gradients for all decorative elements — zero image assets required', light: 'green', comment: 'The entire neon aesthetic is built from CSS gradients and box-shadows — lightweight.' },
        { text: 'auto-fill grid with minmax(260px, 1fr) handles responsive layout', light: 'green', comment: 'Standard responsive grid — works across all viewport sizes.' },
      ],
      cart: [
        { text: 'translateX drawer with border-left is GPU-composited and smooth', light: 'green', comment: '60fps cart animation with no forced reflows.' },
        { text: 'Multiple simultaneous box-shadow glow animations increase compositing layer count', light: 'yellow', comment: 'When several cards glow simultaneously, the GPU has more compositing work — test on lower-end devices.' },
      ],
      checkout: [
        { text: 'useReducer state machine is clean and prevents impossible state combinations', light: 'green', comment: 'Same solid cart state management as other variations.' },
        { text: 'WebkitBackgroundClip: text for gradient prices is not supported in all browsers', light: 'yellow', comment: 'Firefox requires -moz-background-clip, and the standard background-clip: text has partial support — add fallback color.' },
      ],
    },
  },

  'e-commerce:retro-futurism:design': {
    score: 9,
    verdict: 'The most visually distinctive e-commerce variation and the hardest to replicate. The teal-purple-pink gradient system is used for everything — logo, prices, buttons, badges, step indicators — creating an immersive brand universe. The glow effects are the signature gesture.',
    sections: {
      products: [
        { text: 'Three-color gradient (teal → purple → pink) applied consistently creates a brand universe', light: 'green', comment: 'Every CTA, every price, every badge uses the same gradient — total visual coherence in a single rule.' },
        { text: 'Purple glow on card hover mimics neon signage activation — delightful interaction', light: 'green', comment: 'The glow effect is the signature micro-interaction — it makes browsing feel like walking through a neon market.' },
      ],
      cart: [
        { text: 'Gradient-text prices in cart maintain the immersive neon fantasy', light: 'green', comment: 'The visual language does not break when entering the cart — consistent world-building.' },
        { text: 'Deep purple-black drawer with subtle border creates a void-like depth effect', light: 'green', comment: 'The cart feels like it exists in a different dimension — the border prevents it from merging with the void.' },
      ],
      checkout: [
        { text: 'Gradient step circles with glow on active step create a mission-sequence aesthetic', light: 'green', comment: 'Checkout feels like powering up a spacecraft — each completed step activates the next.' },
        { text: 'Confirmation icon with intense glow is the strongest endpoint in any variation', light: 'green', comment: 'The final checkmark radiates purple light — order completion feels like an achievement unlocked.' },
      ],
    },
  },
};

// ─── REVIEW BUNDLES (consensus + prioritized actions) ──────────

const reviewBundles: Record<string, ReviewBundle> = {
  // Expert review bundles (per variation)
  'landing-page:brutalist:review': {
    consensus: [
      { text: 'Hero messaging is clear and compelling', type: 'agree' },
      { text: 'Mobile performance is solid', type: 'agree' },
      { text: 'Features section lacks proof / social evidence', type: 'disagree' },
      { text: 'No ROI data for decision makers', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add ROI metrics or case study to features' },
      { priority: 'high', text: 'Add product screenshot or interactive demo' },
      { priority: 'med', text: 'Add social proof to hero section' },
      { priority: 'med', text: 'Replace "archetypes" with "page templates"' },
      { priority: 'low', text: 'Add "Popular" badge to featured pricing card' },
    ],
  },

  'landing-page:neo-minimal:review': {
    consensus: [
      { text: 'Clean reading flow and hierarchy', type: 'agree' },
      { text: 'Fastest loading variation', type: 'agree' },
      { text: 'Too subtle \u2014 interactive elements nearly invisible', type: 'disagree' },
      { text: 'No distinctive brand signature', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Increase hover/interaction feedback strength' },
      { priority: 'high', text: 'Add one signature visual element for brand recall' },
      { priority: 'med', text: 'Bump font weight to 300 minimum for body text' },
      { priority: 'med', text: 'Add concrete metrics to feature descriptions' },
      { priority: 'low', text: 'Increase CTA button prominence' },
    ],
  },

  'landing-page:maximalist:review': {
    consensus: [
      { text: 'Most memorable and distinctive palette', type: 'agree' },
      { text: 'Strong typographic identity with serif/sans mix', type: 'agree' },
      { text: 'Rotation hovers cause usability issues', type: 'disagree' },
      { text: 'Visual density competes with messaging', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Remove or reduce rotation hover effects' },
      { priority: 'high', text: 'Simplify decorative elements near CTAs' },
      { priority: 'med', text: 'Add ROI metrics to justify pricing' },
      { priority: 'med', text: 'Reduce shadow spread on mobile viewports' },
      { priority: 'low', text: 'Give decorative circles semantic meaning' },
    ],
  },

  'landing-page:dark-industrial:review': {
    consensus: [
      { text: 'Strong tech credibility and premium feel', type: 'agree' },
      { text: 'Internally consistent design language', type: 'agree' },
      { text: 'Alienates non-technical audiences', type: 'disagree' },
      { text: 'Charcoal-on-black card boundaries are invisible', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Increase card boundary contrast against background' },
      { priority: 'high', text: 'Add one human/warm element to balance austerity' },
      { priority: 'med', text: 'Use proportional font for body content' },
      { priority: 'med', text: 'Add ROI metrics for developer audience' },
      { priority: 'low', text: 'Reduce gold glow intensity on mobile' },
    ],
  },

  'landing-page:warm-organic:review': {
    consensus: [
      { text: 'Most approachable and trust-building variation', type: 'agree' },
      { text: 'Excellent touch targets and readability', type: 'agree' },
      { text: 'May seem too playful for enterprise audiences', type: 'disagree' },
      { text: 'Blob gradients add unnecessary rendering cost', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add concrete metrics to back up warm messaging' },
      { priority: 'med', text: 'Test emoji usage with enterprise audience' },
      { priority: 'med', text: 'Reduce blob gradient complexity on mobile' },
      { priority: 'med', text: 'Speed up bouncy easing for repeated interactions' },
      { priority: 'low', text: 'Add subtle urgency element to pricing' },
    ],
  },

  'landing-page:retro-futurism:review': {
    consensus: [
      { text: 'Most visually distinctive and memorable', type: 'agree' },
      { text: 'Gradient text-clip shows technical craft', type: 'agree' },
      { text: 'Accessibility failures for color-deficient users', type: 'disagree' },
      { text: 'GPU-intensive effects drain mobile batteries', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add shape/size cues alongside color for accessibility' },
      { priority: 'high', text: 'Reduce glow effects on mobile for performance' },
      { priority: 'med', text: 'Remove glow from body text \u2014 headlines only' },
      { priority: 'med', text: 'Add trust signals to balance visual spectacle' },
      { priority: 'low', text: 'Consider slight desaturation for body areas' },
    ],
  },

  // E-commerce expert review bundles
  'e-commerce:brutalist:review': {
    consensus: [
      { text: 'Monospace pricing is a distinctive brand statement', type: 'agree' },
      { text: 'Inverted cart drawer is the strongest design moment', type: 'agree' },
      { text: 'Fixed 3-column grid breaks on mobile viewports', type: 'disagree' },
      { text: 'No trust signals near payment — checkout abandonment risk', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add responsive breakpoint — single column below 640px' },
      { priority: 'high', text: 'Add trust badges and SSL icon near checkout payment fields' },
      { priority: 'med', text: 'Bump product description font size from 12px to 14px' },
      { priority: 'med', text: 'Add category filtering for product discovery' },
      { priority: 'low', text: 'Add cross-sell suggestions in cart drawer' },
    ],
  },

  // E-commerce kaizen review bundles
  'e-commerce:brutalist:kaizen': {
    consensus: [
      { text: 'BLACK/WHITE contrast is excellent for readability', type: 'agree' },
      { text: 'Cart drawer inverted palette feels like VIP access', type: 'agree' },
      { text: 'ALL CAPS everywhere creates uppercase fatigue', type: 'disagree' },
      { text: 'Fixed grid is unusable on mobile phones', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Make product grid responsive — single column on mobile' },
      { priority: 'high', text: 'Add non-color affordances to RED CTA buttons' },
      { priority: 'med', text: 'Increase description text to 14px minimum' },
      { priority: 'med', text: 'Reserve ALL CAPS for headings only — use sentence case for descriptions' },
      { priority: 'low', text: 'Add shape cues (arrow, icon) alongside color on checkout CTA' },
    ],
  },

  // E-commerce neo-minimal expert review bundle
  'e-commerce:neo-minimal:review': {
    consensus: [
      { text: 'Compressed price typography is a genuine brand signature', type: 'agree' },
      { text: 'SVG icons and focus rings create solid accessibility foundation', type: 'agree' },
      { text: 'No product filtering or sorting \u2014 discovery does not scale', type: 'disagree' },
      { text: 'No trust signals near payment \u2014 checkout abandonment risk', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add trust badges or "Secure checkout" near payment fields' },
      { priority: 'high', text: 'Add category filtering or search for product discovery' },
      { priority: 'med', text: 'Add persistent floating labels to form inputs' },
      { priority: 'med', text: 'Add itemized order summary to payment step' },
      { priority: 'low', text: 'Add "Popular" or social proof badges to top products' },
    ],
  },

  // E-commerce neo-minimal kaizen review bundle
  'e-commerce:neo-minimal:kaizen': {
    consensus: [
      { text: 'Blue focus rings make keyboard navigation excellent', type: 'agree' },
      { text: '2px accent bar on cart drawer is an elegant context signal', type: 'agree' },
      { text: 'Placeholder-only form labels lose context when typing', type: 'disagree' },
      { text: 'Weight 300 is better but still faint on low-DPI mobile screens', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add floating labels to checkout form inputs' },
      { priority: 'high', text: 'Add product search or category tabs for discovery' },
      { priority: 'med', text: 'Add "Secure checkout" trust signal near card number field' },
      { priority: 'med', text: 'Test font weight 300 on budget Android devices' },
      { priority: 'low', text: 'Add cross-sell suggestion in cart drawer' },
    ],
  },

  // Kaizen (persona) review bundles (per variation)
  'landing-page:brutalist:kaizen': {
    consensus: [
      { text: 'Hero headline is clear and hooks immediately', type: 'agree' },
      { text: 'Page loads fast on mobile \u2014 no jank', type: 'agree' },
      { text: 'No proof \u2014 frustrated users see marketing fluff', type: 'disagree' },
      { text: '"Archetypes" jargon confuses novice users', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add proof \u2014 case study, before/after, or real example' },
      { priority: 'high', text: 'Add ROI metrics for decision-maker personas' },
      { priority: 'med', text: 'Replace "archetypes" with plain language' },
      { priority: 'med', text: 'Add non-color cue to featured pricing card' },
      { priority: 'low', text: 'Add icons to feature cards for visual scanning' },
    ],
  },

  'landing-page:neo-minimal:kaizen': {
    consensus: [
      { text: 'Cleanest layout \u2014 easy to scan quickly', type: 'agree' },
      { text: 'FAQ toggles are intuitive', type: 'agree' },
      { text: 'Thin fonts are hard to read on phones', type: 'disagree' },
      { text: 'Hover feedback is effectively invisible', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Increase font weight for mobile readability' },
      { priority: 'high', text: 'Add visible hover/focus feedback' },
      { priority: 'med', text: 'Push primary CTA above the fold' },
      { priority: 'low', text: 'Add size variation to active dot navigation' },
    ],
  },

  'landing-page:maximalist:kaizen': {
    consensus: [
      { text: 'Most memorable color palette', type: 'agree' },
      { text: 'Serif typography adds personality', type: 'agree' },
      { text: 'Too much visual noise \u2014 hard to focus', type: 'disagree' },
      { text: 'Rotation hover confuses novice users', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Simplify feature section for easier scanning' },
      { priority: 'high', text: 'Remove card rotation on hover' },
      { priority: 'med', text: 'Reduce shadow intensity on mobile' },
      { priority: 'low', text: 'Add text labels alongside decorative elements' },
    ],
  },

  'landing-page:dark-industrial:kaizen': {
    consensus: [
      { text: 'Developer-focused audience will love it', type: 'agree' },
      { text: 'Premium gold accent creates authority', type: 'agree' },
      { text: 'Non-technical users feel excluded', type: 'disagree' },
      { text: 'Unusable in outdoor sunlight', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add light-mode alternative for outdoor use' },
      { priority: 'high', text: 'Improve card boundary visibility' },
      { priority: 'med', text: 'Add labels to [+] toggle controls' },
      { priority: 'low', text: 'Add focus-visible equivalent for gold glow hover' },
    ],
  },

  'landing-page:warm-organic:kaizen': {
    consensus: [
      { text: 'Most welcoming and approachable variation', type: 'agree' },
      { text: 'Serif text is comfortable to read', type: 'agree' },
      { text: 'Bouncy animations slow down task completion', type: 'disagree' },
      { text: 'Blob gradients cause jank on budget phones', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Optimize blob gradients for mobile GPU' },
      { priority: 'med', text: 'Speed up animation timing for repeated actions' },
      { priority: 'med', text: 'Add text labels alongside emoji features' },
      { priority: 'low', text: 'Add subtle urgency cue to CTA' },
    ],
  },

  'landing-page:retro-futurism:kaizen': {
    consensus: [
      { text: 'Unforgettable visual experience', type: 'agree' },
      { text: 'Strong visual hierarchy from contrast', type: 'agree' },
      { text: 'Neon colors fail for colorblind users', type: 'disagree' },
      { text: 'Battery drain is severe on mobile', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add non-color cues for all neon-dependent UI' },
      { priority: 'high', text: 'Auto-reduce glow effects after initial load' },
      { priority: 'med', text: 'Use solid borders instead of gradient borders' },
      { priority: 'low', text: 'Add brief onboarding for unfamiliar interaction patterns' },
    ],
  },

  // SLAP review bundles
  'landing-page:slap:review': {
    consensus: [
      { text: 'Page loads fast — system fonts and minimal CSS', type: 'agree' },
      { text: 'Standard layout is scannable and familiar', type: 'agree' },
      { text: 'Every design choice is a default — zero brand signature', type: 'disagree' },
      { text: 'No proof, no metrics, no reason to choose this over competitors', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Replace default purple with intentional brand color' },
      { priority: 'high', text: 'Add case study or ROI metrics' },
      { priority: 'med', text: 'Choose a distinctive typeface' },
      { priority: 'med', text: 'Design custom hover/focus states' },
      { priority: 'low', text: 'Add one memorable visual element' },
    ],
  },

  'landing-page:slap:kaizen': {
    consensus: [
      { text: 'Text is readable and layout is clear', type: 'agree' },
      { text: 'No animation jank or performance issues', type: 'agree' },
      { text: 'Looks like every other AI-generated website — nothing to remember', type: 'disagree' },
      { text: 'Purple accent with no supporting palette feels random', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Establish a real color system beyond one accent' },
      { priority: 'high', text: 'Add personality to interactions' },
      { priority: 'med', text: 'Choose typography that conveys brand voice' },
      { priority: 'low', text: 'Add subtle motion that tells a story' },
    ],
  },

  'e-commerce:slap:review': {
    consensus: [
      { text: 'Shared components keep cart/checkout consistent', type: 'agree' },
      { text: 'Basic e-commerce flow works end-to-end', type: 'agree' },
      { text: 'Product presentation is placeholder-quality — colored blocks', type: 'disagree' },
      { text: 'No filtering, sorting, or discovery — 8 products max', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Design actual product card presentation' },
      { priority: 'high', text: 'Add category filtering or search' },
      { priority: 'med', text: 'Add trust signals near checkout' },
      { priority: 'med', text: 'Replace default red with brand accent' },
      { priority: 'low', text: 'Add product quick-view or comparison' },
    ],
  },

  'e-commerce:slap:kaizen': {
    consensus: [
      { text: 'Cart drawer and checkout steps are functional', type: 'agree' },
      { text: 'Responsive grid works on mobile', type: 'agree' },
      { text: 'Indistinguishable from any template store', type: 'disagree' },
      { text: 'Colored placeholder blocks look broken, not designed', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add product imagery or illustrations' },
      { priority: 'high', text: 'Add non-color affordances to CTA buttons' },
      { priority: 'med', text: 'Design a distinctive cart experience' },
      { priority: 'low', text: 'Add loading states and micro-interactions' },
    ],
  },

  // ─── MEMPHIS / NEO-POP BUNDLES ─────────────────────────────────

  'landing-page:memphis:review': {
    consensus: [
      { text: 'Multi-color accent system creates instant visual identity — impossible to confuse with AI slop', type: 'agree' },
      { text: 'Impact + Trebuchet MS are system fonts with zero loading penalty', type: 'agree' },
      { text: 'Offset shadow system is the strongest signature element of any variation', type: 'agree' },
      { text: 'Playful aesthetic may undercut trust for enterprise B2B buyers', type: 'disagree' },
      { text: 'Color cycling risks cognitive overload in feature-dense sections', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add a "professional" color mode with muted Memphis accents for B2B contexts' },
      { priority: 'high', text: 'Limit visible accent colors to 2 per viewport to reduce cognitive load' },
      { priority: 'med', text: 'Add subtle entrance animations that match the playful personality' },
      { priority: 'med', text: 'Consider social proof elements (logos, metrics) to balance playfulness with trust' },
      { priority: 'low', text: 'Add geometric background shapes as CSS-only decorations for more Memphis personality' },
    ],
  },

  'landing-page:memphis:kaizen': {
    consensus: [
      { text: 'This page is unforgettable — the bold colors and shapes make it impossible to ignore', type: 'agree' },
      { text: 'Offset shadows make every button and card feel tangible and clickable', type: 'agree' },
      { text: 'The color energy might overwhelm users who just want information', type: 'disagree' },
      { text: 'Impact font at large sizes could feel aggressive to some readers', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add non-color cues to all interactive elements for accessibility' },
      { priority: 'high', text: 'Ensure color contrast meets WCAG AA across all accent combinations' },
      { priority: 'med', text: 'Add a calmer hero variant for users who prefer less visual intensity' },
      { priority: 'low', text: 'Consider animation on scroll to reveal sections progressively' },
    ],
  },

  'e-commerce:memphis:review': {
    consensus: [
      { text: 'Product cards with offset shadows and cycling colors create memorable browsing experience', type: 'agree' },
      { text: 'Cart drawer maintains Memphis personality throughout purchase flow', type: 'agree' },
      { text: 'System fonts and CSS-only decorations mean zero performance overhead', type: 'agree' },
      { text: 'Playful checkout styling may reduce purchase confidence for cautious buyers', type: 'disagree' },
      { text: 'Bold aesthetic limits addressable market to creative/lifestyle brands', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add trust signals (security badges, guarantee) near checkout CTA' },
      { priority: 'high', text: 'Ensure product image areas have sufficient contrast for product visibility' },
      { priority: 'med', text: 'Add category filtering with Memphis-styled filter chips' },
      { priority: 'med', text: 'Consider slightly toned-down checkout for higher purchase confidence' },
      { priority: 'low', text: 'Add add-to-cart animation with Memphis personality' },
    ],
  },

  'e-commerce:memphis:kaizen': {
    consensus: [
      { text: 'Shopping here feels like visiting a pop art gallery — fun and memorable', type: 'agree' },
      { text: 'Bold buttons and thick borders make everything feel clickable and interactive', type: 'agree' },
      { text: 'Colored product placeholders actually look intentional with this aesthetic', type: 'agree' },
      { text: 'The visual energy might tire users during extended browsing sessions', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add product quick-view without leaving the grid' },
      { priority: 'med', text: 'Ensure quantity controls in cart have generous touch targets' },
      { priority: 'med', text: 'Add order confirmation with Memphis-styled celebration' },
      { priority: 'low', text: 'Add wishlist functionality with Memphis star/heart icon' },
    ],
  },

  // ─── ART DECO BUNDLES ──────────────────────────────────────────

  'landing-page:art-deco:review': {
    consensus: [
      { text: 'Gold-navy-cream palette creates unmistakable luxury positioning', type: 'agree' },
      { text: 'Geometric ornaments and stepped borders are historically grounded and intentional', type: 'agree' },
      { text: 'Georgia + Optima provide premium typography with minimal font loading', type: 'agree' },
      { text: 'Luxury aesthetic may alienate budget-conscious or startup audiences', type: 'disagree' },
      { text: 'Gold accents could feel overdone if not carefully balanced', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Ensure gold text on cream backgrounds meets WCAG AA contrast (4.5:1)' },
      { priority: 'high', text: 'Add responsive behavior for diamond ornaments on mobile' },
      { priority: 'med', text: 'Consider a dark-mode variant with gold on deep navy for evening viewing' },
      { priority: 'med', text: 'Add subtle parallax on geometric decorative elements' },
      { priority: 'low', text: 'Add a keyline/rule pattern between sections for stronger Art Deco feel' },
    ],
  },

  'landing-page:art-deco:kaizen': {
    consensus: [
      { text: 'This page feels like entering a luxury hotel lobby — prestigious and confident', type: 'agree' },
      { text: 'Diamond ornaments between sections create elegant breathing room', type: 'agree' },
      { text: 'Serif typography adds authority that sans-serif pages lack', type: 'agree' },
      { text: 'The formal tone might feel unapproachable for casual users', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Verify gold accent color is distinguishable from surrounding cream for colorblind users' },
      { priority: 'med', text: 'Add keyboard focus states that use gold outline for consistency' },
      { priority: 'med', text: 'Consider slightly warmer body text for more inviting feel' },
      { priority: 'low', text: 'Add subtle hover animations on cards with Art Deco geometric transitions' },
    ],
  },

  'e-commerce:art-deco:review': {
    consensus: [
      { text: 'Product cards feel like luxury display cases — gold borders and cream backgrounds elevate every product', type: 'agree' },
      { text: 'Checkout maintains premium feel through payment flow — builds purchase confidence', type: 'agree' },
      { text: 'CSS-only decorations mean zero performance cost for the luxury aesthetic', type: 'agree' },
      { text: 'Premium positioning may create price expectation mismatch for affordable products', type: 'disagree' },
      { text: 'Serif typography at small sizes may reduce readability on product details', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Ensure serif body text remains readable at mobile product-card sizes' },
      { priority: 'high', text: 'Add trust signals (security, guarantee) styled with Art Deco borders' },
      { priority: 'med', text: 'Add product filtering with gold-accented filter chips' },
      { priority: 'med', text: 'Consider product zoom/quick-view in an Art Deco framed modal' },
      { priority: 'low', text: 'Add order confirmation with Art Deco ornamental success state' },
    ],
  },

  'e-commerce:art-deco:kaizen': {
    consensus: [
      { text: 'Shopping here feels like browsing a jewelry store — everything feels valuable', type: 'agree' },
      { text: 'Gold borders and geometric ornaments make even simple products feel special', type: 'agree' },
      { text: 'The formal design might intimidate users expecting a casual shopping experience', type: 'disagree' },
      { text: 'Diamond decorations on smaller screens might feel cramped', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Ensure add-to-cart buttons have sufficient size and non-color affordances' },
      { priority: 'med', text: 'Add product count or "items in cart" badge with Art Deco styling' },
      { priority: 'med', text: 'Scale down ornamental elements on mobile to preserve content space' },
      { priority: 'low', text: 'Add wishlist with Art Deco star bookmark icon' },
    ],
  },


  // ─── E-COMMERCE: MAXIMALIST BUNDLES ──────────────────────────

  'e-commerce:maximalist:review': {
    consensus: [
      { text: 'Navy-coral-gold triad is a complete and premium brand system', type: 'agree' },
      { text: 'Offset shadows create a distinctive tactile depth effect', type: 'agree' },
      { text: 'Visual density may overwhelm deliberate comparison shoppers', type: 'disagree' },
      { text: 'No trust signals near payment fields — checkout abandonment risk', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add trust badges and SSL icon near checkout payment fields' },
      { priority: 'high', text: 'Add category filtering or search for product discovery' },
      { priority: 'med', text: 'Add numeric rating labels alongside star glyphs for quick scanning' },
      { priority: 'med', text: 'Use sans-serif font for form input text in checkout' },
      { priority: 'low', text: 'Add "complete the look" cross-sell suggestions in cart drawer' },
    ],
  },

  'e-commerce:maximalist:kaizen': {
    consensus: [
      { text: 'Gold serif prices on navy feel premium and aspirational', type: 'agree' },
      { text: 'Coral CTAs with offset shadows are playful and clearly interactive', type: 'agree' },
      { text: 'Serif body text in checkout forms slows reading and form-filling', type: 'disagree' },
      { text: '8px shadows on every element creates visual fatigue when browsing', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add product filtering — the dense visual grid makes scanning harder' },
      { priority: 'high', text: 'Increase touch targets — gold quantity buttons need to be 36px minimum' },
      { priority: 'med', text: 'Reduce shadow intensity on secondary elements to establish hierarchy' },
      { priority: 'med', text: 'Add material/origin details to justify premium price positioning' },
      { priority: 'low', text: 'Add curated bundle suggestions in cart for maximalist shoppers' },
    ],
  },

  // ─── E-COMMERCE: DARK INDUSTRIAL BUNDLES ─────────────────────

  'e-commerce:dark-industrial:review': {
    consensus: [
      { text: 'Zero border-radius and one-accent discipline is the most committed design thesis', type: 'agree' },
      { text: 'Code-comment section headers are a genuine design innovation', type: 'agree' },
      { text: 'Ghost buttons look disabled to mainstream shoppers', type: 'disagree' },
      { text: 'No trust signals at checkout — critical for a cold, technical aesthetic', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add security messaging near payment fields — "// ENCRYPTED" in monospace' },
      { priority: 'high', text: 'Add product specifications that the industrial audience expects' },
      { priority: 'med', text: 'Increase quantity button size from 26px to 36px for mobile' },
      { priority: 'med', text: 'Add category filtering or keyboard-driven search for power users' },
      { priority: 'low', text: 'Add subtle border-color differentiation between surface levels' },
    ],
  },

  'e-commerce:dark-industrial:kaizen': {
    consensus: [
      { text: 'Single amber accent on near-black is focused and distinctive', type: 'agree' },
      { text: 'Monospace everything creates a genuine spec-sheet identity', type: 'agree' },
      { text: 'All-monospace flattens hierarchy — everything is the same visual weight', type: 'disagree' },
      { text: 'Near-black surface colors are indistinguishable on low-quality displays', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add font-weight variation within monospace to create hierarchy' },
      { priority: 'high', text: 'Increase button touch targets from 26px to minimum 36px' },
      { priority: 'med', text: 'Brighten surface borders for better field visibility on TN panels' },
      { priority: 'med', text: 'Add "most ordered" or stock count badges for social proof' },
      { priority: 'low', text: 'Add keyboard shortcuts for power-user navigation (j/k for grid)' },
    ],
  },

  // ─── E-COMMERCE: WARM ORGANIC BUNDLES ────────────────────────

  'e-commerce:warm-organic:review': {
    consensus: [
      { text: 'Most emotionally coherent variation — every element tells the same organic story', type: 'agree' },
      { text: '"Lovingly prepared" confirmation copy is perfectly on-brand', type: 'agree' },
      { text: 'Sage-green borders may fail WCAG non-text contrast requirements', type: 'disagree' },
      { text: 'No product filtering in a catalog that invites slow browsing', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add category tabs — "Kitchen," "Garden," "Wellness" for discovery' },
      { priority: 'high', text: 'Add origin/sustainability info to match the brand promise' },
      { priority: 'med', text: 'Darken sage borders from #A7C4A0 to #7DA37A for WCAG compliance' },
      { priority: 'med', text: 'Add "secure checkout" messaging with a leaf-shield icon' },
      { priority: 'low', text: 'Add "pairs well with" product suggestions in cart drawer' },
    ],
  },

  'e-commerce:warm-organic:kaizen': {
    consensus: [
      { text: 'Forest-green on cream is trustworthy and naturally inviting', type: 'agree' },
      { text: 'Pill-shaped buttons and circular elements create a cohesive organic language', type: 'agree' },
      { text: 'Sage-green input borders are too subtle on cream — field boundaries unclear', type: 'disagree' },
      { text: 'No sustainability messaging despite the organic aesthetic promise', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add product category navigation for the browsing-oriented shopper' },
      { priority: 'high', text: 'Darken form field borders for better non-text contrast' },
      { priority: 'med', text: 'Add origin badges or "organic certified" labels to product cards' },
      { priority: 'med', text: 'Add order itemization at payment step for deliberate purchasers' },
      { priority: 'low', text: 'Add basket emoji or leaf icon to cart badge for brand consistency' },
    ],
  },

  // ─── E-COMMERCE: RETRO FUTURISM BUNDLES ──────────────────────

  'e-commerce:retro-futurism:review': {
    consensus: [
      { text: 'Most visually distinctive variation — the gradient system is unreplicable', type: 'agree' },
      { text: 'Glow effects create an immersive sci-fi shopping experience', type: 'agree' },
      { text: 'Gradient-text prices sacrifice readability for visual impact', type: 'disagree' },
      { text: 'No trust signals — futuristic aesthetic needs explicit security cues', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add fallback color for gradient text in browsers lacking backgroundClip support' },
      { priority: 'high', text: 'Add security/trust messaging near payment — "// ENCRYPTED" with glow' },
      { priority: 'med', text: 'Add category navigation or search for product discovery' },
      { priority: 'med', text: 'Increase line-height on dark-background body text for readability' },
      { priority: 'low', text: 'Add item count to order summary at payment step' },
    ],
  },

  'e-commerce:retro-futurism:kaizen': {
    consensus: [
      { text: 'Three-color gradient applied everywhere creates total brand immersion', type: 'agree' },
      { text: 'Purple glow on hover feels like activating a neon sign — delightful', type: 'agree' },
      { text: 'Lavender-on-dark text may cause eye strain during extended browsing', type: 'disagree' },
      { text: 'Multiple simultaneous glow animations may lag on lower-end devices', type: 'disagree' },
    ],
    actions: [
      { priority: 'high', text: 'Add solid-color fallback for gradient text for accessibility and browser support' },
      { priority: 'high', text: 'Increase body text contrast — bump lavender to lighter #D8D0FF or white' },
      { priority: 'med', text: 'Throttle glow animations to max 3 simultaneous for mobile performance' },
      { priority: 'med', text: 'Add product filtering for the visually dense dark grid' },
      { priority: 'low', text: 'Add order itemization with gradient line items at checkout' },
    ],
  },
};

export function getExpertFinding(
  slug: string,
  variationId: string,
  expertId: string,
): ExpertFinding | undefined {
  return expertFindings[`${slug}:${variationId}:${expertId}`];
}

export function getAllExpertFindings(
  slug: string,
  variationId: string,
): { expert: ExpertDef; finding: ExpertFinding }[] {
  return experts
    .map((expert) => {
      const finding = expertFindings[`${slug}:${variationId}:${expert.id}`];
      return finding ? { expert, finding } : null;
    })
    .filter((item): item is { expert: ExpertDef; finding: ExpertFinding } => item !== null);
}

export function getReviewBundle(
  slug: string,
  variationId: string,
  mode: 'review' | 'kaizen',
): ReviewBundle | undefined {
  return reviewBundles[`${slug}:${variationId}:${mode}`];
}
