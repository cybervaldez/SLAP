/**
 * FlowBoard review data — placeholder reviews.
 *
 * These are minimal reviews for the FlowBoard haiku version so the
 * overlay system is functional. Run /experts and /kaizen on the
 * actual page to generate real, opinionated reviews.
 */

import type { Review } from './reviews';

export const flowboardReviews: Record<string, Review> = {

  // ─── Marketing (Sarah) ─────────────────────────────────
  'flowboard:haiku:marketing': {
    score: 4.5,
    verdict: 'Generic AI copy top to bottom. "Organize Your Team\'s Work Effortlessly" could be any PM tool from 2018. Zero proof, zero differentiation. The testimonials are clearly fabricated — "Sarah Johnson, CEO" with a gradient circle avatar. Pricing is the only semi-honest section.',
    shortVerdict: 'Cookie-cutter PM page. No proof, no voice.',
    sections: {
      hero: [
        { text: 'Headline is category-generic', light: 'red', comment: '"Organize Your Team\'s Work Effortlessly" — name one PM tool this wouldn\'t describe. Where\'s the hook?', ref: 'hero-headline' },
        { text: 'No social proof in hero', light: 'yellow', comment: 'No user count, no logos, no metric. Just a promise.', ref: 'hero-subhead' },
      ],
      features: [
        { text: 'Feature names are commodity', light: 'yellow', comment: '"Intuitive Boards", "Team Collaboration", "Smart Analytics" — these are table stakes, not differentiators.', ref: 'feature-boards' },
        { text: '"100+ integrations" with zero specifics', light: 'yellow', comment: 'Listing Slack/GitHub is fine but show the actual integration UI, not just a claim.', ref: 'feature-integrations' },
      ],
      pricing: [
        { text: 'Free tier is reasonable', light: 'green', comment: '$0 with 5 projects and 10 members — clear constraints. Pro at $12 is competitive.', ref: 'tier-free' },
        { text: 'Enterprise has no anchor price', light: 'yellow', comment: '"Custom/month" says nothing. Even a "starts at" figure helps qualify leads.', ref: 'tier-enterprise' },
      ],
      testimonials: [
        { text: 'Testimonials are clearly fabricated', light: 'red', comment: 'All 5 stars, gradient circle avatars instead of photos, generic titles ("CEO, TechStart Inc."). This actively damages trust.', ref: 'testimonial-sarah' },
      ],
      cta: [
        { text: 'CTA repeats hero promise verbatim', light: 'yellow', comment: '"Ready to Transform Your Workflow?" — same generic language. By this point you should close with proof, not promises.', ref: 'cta-headline' },
      ],
    },
  },

  // ─── UX (James) ────────────────────────────────────────
  'flowboard:haiku:ux': {
    score: 5.0,
    verdict: 'Structurally sound but personality-free. The layout follows a safe hero → features → pricing → testimonials → CTA formula. Every section does its job at a C+ level. Nothing is broken, but nothing invites exploration either.',
    shortVerdict: 'Safe formula, zero personality.',
    sections: {
      hero: [
        { text: 'Hero text/button ratio is fine', light: 'green', comment: 'One headline, one paragraph, one CTA. Clean information hierarchy.', ref: 'hero-cta' },
      ],
      features: [
        { text: '6 cards is too many to scan', light: 'yellow', comment: 'Users won\'t read all 6. Lead with 3, let the rest be discovered. Or group by use case.', ref: 'features-headline' },
        { text: 'Hover states are nice but inconsistent', light: 'yellow', comment: 'Feature cards lift on hover but pricing cards only highlight the border. Pick one interaction pattern.', ref: 'feature-boards' },
      ],
      pricing: [
        { text: 'Featured tier scale(1.05) is clean', light: 'green', comment: 'Subtle visual hierarchy — the Pro card stands out without being obnoxious.', ref: 'tier-pro' },
      ],
      testimonials: [
        { text: 'Testimonial grid is responsive', light: 'green', comment: 'Collapses to single column on mobile. Left border accent is a nice touch.', ref: 'testimonial-marcus' },
      ],
      cta: [
        { text: 'Final CTA gradient is the only bold moment', light: 'yellow', comment: 'The purple gradient stands out from the rest of the page. More of this confidence throughout would help.', ref: 'cta-button' },
      ],
    },
  },

  // ─── Dev (Frank) ───────────────────────────────────────
  'flowboard:haiku:dev': {
    score: 6.0,
    verdict: 'Technically competent single-file HTML. CSS variables for theming, responsive breakpoints, smooth scroll. No framework bloat. But the inline onclick handlers and localStorage theme are amateur patterns. The markup is semantic enough.',
    shortVerdict: 'Clean HTML/CSS, amateur JS patterns.',
    sections: {
      hero: [
        { text: 'onclick="alert()" is a toy pattern', light: 'red', comment: 'The CTA button has an inline alert(). In production this would be a form submission or route change.', ref: 'hero-cta' },
      ],
      features: [
        { text: 'CSS grid with auto-fit is correct', light: 'green', comment: 'minmax(280px, 1fr) handles the responsive layout without media queries. Good use of modern CSS.', ref: 'features-headline' },
      ],
      pricing: [
        { text: 'Pricing structure is accessible', light: 'green', comment: 'Feature lists use <ul> with semantic markup. Screen readers can navigate this.', ref: 'tier-pro' },
      ],
      testimonials: [
        { text: 'No lazy loading on avatars', light: 'yellow', comment: 'The gradient circles are fine but if these were real photos, they\'d need loading="lazy".', ref: 'testimonials-headline' },
      ],
      cta: [
        { text: 'Duplicate onclick handler', light: 'yellow', comment: 'Same alert() pattern as hero CTA. At minimum these should be different actions.', ref: 'cta-button' },
      ],
    },
  },
};
