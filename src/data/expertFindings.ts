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
