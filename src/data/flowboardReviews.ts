import type { Review } from './reviews';

export const flowboardReviews: Record<string, Review> = {
  // ─── EXPERTS (5) ──────────────────────────────────────

  'flowboard:haiku:marketing': {
    score: 4.5,
    verdict:
      'This page could be selling any PM tool built since 2015. "Organize Your Team\'s Work Effortlessly" is the most generic SaaS headline possible — it says nothing about why FlowBoard exists when Asana, Monday, and Linear already do. The pricing is transparent, which is good, but there\'s zero urgency, zero social proof numbers, and testimonials that will get Googled and found wanting.',
    shortVerdict: 'Generic SaaS template. Nothing says "FlowBoard" specifically.',
    sections: {
      hero: [
        {
          text: 'Headline is commodity copy — no differentiation',
          light: 'red',
          comment:
            '"Organize Your Team\'s Work Effortlessly" could be Monday.com, Asana, Trello, or any of 50 PM tools. A team lead comparing 3 options will not remember this headline. Need a specific claim: what does FlowBoard do that others cannot?',
          ref: 'hero-headline',
        },
        {
          text: 'Subhead adds detail but still generic',
          light: 'yellow',
          comment:
            '"From planning to execution, we\'ve got you covered" — covered how? Every competitor says this. Replace with a specific outcome: "Teams ship 2x faster with half the meetings."',
          ref: 'hero-subhead',
        },
        {
          text: 'CTA uses proven "free" language',
          light: 'green',
          comment:
            '"Get Started Free" reduces commitment anxiety. The word "Free" is doing the selling here. Good baseline, but adding "No credit card required" below the button would remove the last friction point.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'Six features listed are all table stakes — none are differentiators',
          light: 'red',
          comment:
            'Boards, collaboration, analytics, integrations, security, speed. Every PM tool has these. This section should answer "why switch FROM your current tool" not "what a PM tool does." Where is the one killer feature?',
          ref: 'feature-boards',
        },
        {
          text: '"100+ tools" integration claim is unsubstantiated',
          light: 'yellow',
          comment:
            'Connect with 100+ tools but no link to the integration directory. Users will wonder if THEIR tools are included. Show logos of the top 5 integrations (Slack, GitHub, Google Drive) inline.',
          ref: 'feature-integrations',
        },
      ],
      pricing: [
        {
          text: 'Pricing is transparent and well-structured',
          light: 'green',
          comment:
            '$0 / $12 / Custom is clear. Showing actual numbers instead of "contact us" for Free and Pro builds trust. The pricing hierarchy makes sense.',
          ref: 'pricing-headline',
        },
        {
          text: 'No competitive positioning in pricing',
          light: 'yellow',
          comment:
            'At $12/mo, FlowBoard is slightly above Monday ($9) and Asana ($10.99). Is this premium positioning or accidental? A "Compare plans" link showing how FlowBoard stacks against competitors would convert doubters.',
          ref: 'tier-pro',
        },
        {
          text: 'Enterprise "Custom/month" hides the number',
          light: 'yellow',
          comment:
            'Enterprise buyers want a ballpark before committing to a sales call. "Starting at $X/seat" with "Contact Sales for volume pricing" would be more inviting. "Custom" signals either "expensive" or "we have not figured out pricing yet."',
          ref: 'tier-enterprise',
        },
      ],
      testimonials: [
        {
          text: 'All 5-star ratings destroy credibility',
          light: 'red',
          comment:
            'Three testimonials, all 5 stars. Nobody gives a PM tool 5 stars. A mix of 4 and 5 stars with specific outcomes ("cut standup time by 50%") would be far more believable.',
          ref: 'testimonial-sarah',
        },
        {
          text: 'Company names will not survive a Google search',
          light: 'red',
          comment:
            '"TechStart Inc." and "Creative Co." are not real companies. Anyone doing due diligence will Google these and find nothing. Use real customer names or remove the section entirely.',
          ref: 'testimonial-marcus',
        },
      ],
      cta: [
        {
          text: '"Join thousands of teams" — which thousands?',
          light: 'yellow',
          comment:
            'Vague social proof is worse than no social proof. "Join thousands" invites skepticism. Either use a specific number ("2,400+ teams") or remove the claim.',
          ref: 'cta-subhead',
        },
        {
          text: 'CTA repeats hero without adding urgency',
          light: 'yellow',
          comment:
            'By this point the user has scrolled past everything. "Start Your Free Trial" is fine but identical to hero. Add urgency: "Start Free — Setup Takes 30 Seconds."',
          ref: 'cta-button',
        },
      ],
    },
  },

  'flowboard:haiku:ux': {
    score: 5.8,
    verdict:
      'The page follows a clear information hierarchy — hero, features, pricing, social proof, CTA — and the primary flow (understand → compare → act) works at a basic level. But the 6-card feature grid creates cognitive overload, the pricing card interaction pattern is inconsistent between desktop and mobile, and the testimonial section adds no decision-making value. A user scanning this page will get the gist but will not feel guided toward a decision.',
    shortVerdict: 'Scannable but not guided. The user drifts more than decides.',
    sections: {
      hero: [
        {
          text: 'Hero establishes clear page purpose in under 3 seconds',
          light: 'green',
          comment:
            'Headline + subhead + CTA is the right structure. A user landing here knows immediately: PM tool, free tier, team-focused. The content hierarchy works.',
          ref: 'hero-headline',
        },
        {
          text: 'No visual context for what FlowBoard looks like',
          light: 'yellow',
          comment:
            'The hero is text-only. Users evaluating PM tools want to see the product. A hero screenshot or brief animation showing a board in action would dramatically increase comprehension and trust.',
          ref: 'hero-subhead',
        },
      ],
      features: [
        {
          text: 'Six equal-weight cards create scanning fatigue',
          light: 'red',
          comment:
            'All 6 feature cards have identical visual weight — same size, same icon treatment, same text length. Research shows users process 3-4 items before attention drops. Consider highlighting 3 primary features and collapsing the rest behind "See all features."',
          ref: 'feature-boards',
        },
        {
          text: 'Feature descriptions mix jargon levels',
          light: 'yellow',
          comment:
            '"Kanban-style boards" assumes knowledge that "Real-time comments" does not. A non-PM user will understand some cards but not others, creating an inconsistent comprehension experience.',
          ref: 'feature-collab',
        },
      ],
      pricing: [
        {
          text: 'Tier comparison requires mental effort',
          light: 'yellow',
          comment:
            'Three separate cards force the user to mentally compare features across cards. A comparison table with checkmarks would let users scan vertically instead of reading three separate lists. The current layout works on desktop but becomes a scroll marathon on mobile.',
          ref: 'tier-free',
        },
        {
          text: 'Featured card scale(1.05) creates visual hierarchy',
          light: 'green',
          comment:
            'The Pro tier is visually promoted with border color, shadow, and scale. This correctly guides the user toward the recommended tier without being aggressive.',
          ref: 'tier-pro',
        },
        {
          text: 'Inconsistent CTA labels across tiers',
          light: 'yellow',
          comment:
            '"Start Free" vs "Start Free Trial" vs "Contact Sales" — three different actions with three different labels. Users will wonder: is "Start Free" different from "Start Free Trial"? Standardize the language.',
          ref: 'pricing-cta',
        },
      ],
      testimonials: [
        {
          text: 'Testimonials are structurally sound but disconnected from features',
          light: 'yellow',
          comment:
            'Each testimonial has stars, quote, author — the pattern is correct. But none reference specific features or pricing tiers. "Cut project delivery time by 40%" — which feature enabled that? Connecting testimonials to claims would strengthen both sections.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: 'Final CTA provides clear terminal action',
          light: 'green',
          comment:
            'The gradient background creates visual separation from the rest of the page, signaling "this is the end, take action." The button contrast is strong. A user who scrolled this far gets a clear exit point.',
          ref: 'cta-button',
        },
      ],
    },
  },

  'flowboard:haiku:product': {
    score: 4.2,
    verdict:
      'This landing page fails to answer the single most important question for its target audience: "Why should I switch from my current PM tool?" Every feature listed is table stakes. There is no migration story, no competitive positioning, and no specific use case targeting. The free tier is well-structured for conversion, but the page reads like a category definition rather than a product pitch.',
    shortVerdict: 'Describes a category, not a product. No reason to switch.',
    sections: {
      hero: [
        {
          text: 'Hero answers "what" but not "why switch"',
          light: 'red',
          comment:
            '"Organize Your Team\'s Work Effortlessly" describes what every PM tool does. The hero should answer: "You\'re frustrated with Monday.com because X. FlowBoard fixes that." Without a switching reason, this is a brochure, not a pitch.',
          ref: 'hero-headline',
        },
        {
          text: '"Get Started Free" is the right first-action CTA',
          light: 'green',
          comment:
            'Free tier as the primary CTA is smart product strategy. Users try before committing. The friction is low. This is the one thing the page gets right from a product perspective.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'All 6 features are commodity — zero differentiation',
          light: 'red',
          comment:
            'Boards, collaboration, analytics, integrations, security, speed. This is the minimum viable feature list for any PM tool. Not one feature explains why FlowBoard is better than Asana at this specific thing. Pick 1-2 genuinely unique capabilities and lead with those.',
          ref: 'features-headline',
        },
        {
          text: 'No migration path mentioned anywhere',
          light: 'red',
          comment:
            'The biggest barrier to PM tool switching is migration. "Import from Monday/Asana/Trello in 2 clicks" would be more compelling than any feature card. Its absence suggests the product has not thought about how users actually adopt PM tools.',
          ref: 'feature-integrations',
        },
      ],
      pricing: [
        {
          text: 'Free tier boundaries are well-defined',
          light: 'green',
          comment:
            '5 projects, 10 team members, basic views, 1 GB — these are clear constraints that a user can evaluate against their actual needs. The free tier delivers real value while creating natural upgrade triggers.',
          ref: 'tier-free',
        },
        {
          text: 'Pro at $12/mo is positioned against nothing',
          light: 'yellow',
          comment:
            '$12/mo exists in a vacuum. Is it cheaper than Monday? More expensive than Linear? The pricing page should acknowledge competitors because users are already comparing. Ignoring the comparison makes FlowBoard look unaware of its market.',
          ref: 'tier-pro',
        },
        {
          text: 'Enterprise tier has no self-serve path',
          light: 'yellow',
          comment:
            '"Contact Sales" is a dead end for the self-serve buyer. Many enterprise teams want to start with Pro and upgrade later. Consider "Start with Pro — Upgrade to Enterprise anytime" or at minimum, a starting price.',
          ref: 'tier-enterprise',
        },
      ],
      testimonials: [
        {
          text: 'Testimonials cite outcomes without product specifics',
          light: 'yellow',
          comment:
            '"Cut project delivery time by 40%" is a strong claim but says nothing about which FlowBoard feature enabled it. Was it the boards? The analytics? The integrations? Generic praise does not help users imagine their own success.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: '"Transform Your Workflow" is category-level messaging',
          light: 'yellow',
          comment:
            'Even the final CTA describes the category, not the product. "Start managing projects the FlowBoard way" or "See why teams switch from Monday" would be product-specific.',
          ref: 'cta-headline',
        },
      ],
    },
  },

  'flowboard:haiku:technical': {
    score: 6.8,
    verdict:
      'The technical implementation is surprisingly solid for an AI-generated page. Single-file HTML with no external dependencies, CSS variables for theming, clamp() for responsive typography, and CSS Grid with auto-fit/minmax for layouts. No JavaScript frameworks, minimal JS footprint. The main concerns are the pricing card scale(1.05) on mobile, emoji-as-icons lacking proper accessibility semantics, and the inline onclick pattern that was stripped during annotation.',
    shortVerdict: 'Clean markup, solid CSS patterns. Accessibility gaps in feature icons.',
    sections: {
      hero: [
        {
          text: 'Responsive typography with clamp() is well-implemented',
          light: 'green',
          comment:
            'clamp(2rem, 8vw, 3.5rem) for the H1 and clamp(1rem, 2vw, 1.25rem) for the subhead. Scales smoothly between 320px and 1200px viewports without breakpoint jumps. This is the correct modern pattern.',
          ref: 'hero-headline',
        },
        {
          text: 'Hero CTA has adequate touch target size',
          light: 'green',
          comment:
            'padding: 1rem 2.5rem gives approximately 48px height with the default font-size. Meets WCAG 2.5.5 minimum target size. The 100% width on mobile (@media 480px) is a good touch.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'Feature icons are emoji in divs without alt text or aria-labels',
          light: 'red',
          comment:
            'The feature-icon divs contain emoji characters (📋 🤝 📊) inside a decorative gradient box. Screen readers will either read the emoji name ("clipboard") or skip them entirely depending on the reader. These need aria-hidden="true" on the icon div with the heading providing the semantic meaning, OR proper aria-label on each icon.',
          ref: 'feature-boards',
        },
        {
          text: 'Grid minmax(280px, 1fr) handles responsive wrapping well',
          light: 'green',
          comment:
            'auto-fit with minmax(280px, 1fr) creates 3-column at 1200px, 2-column at ~600px, and 1-column below 480px (via media query). The wrapping is clean and avoids orphan columns. Solid pattern.',
          ref: 'feature-analytics',
        },
      ],
      pricing: [
        {
          text: 'Featured card scale(1.05) resets to scale(1) on mobile',
          light: 'green',
          comment:
            'The media query at 768px sets .pricing-card.featured { transform: scale(1) }. This prevents overflow issues on small viewports. Correctly handled.',
          ref: 'tier-pro',
        },
        {
          text: 'Pricing list uses CSS :before pseudo-element for checkmarks',
          light: 'yellow',
          comment:
            'The ✓ checkmark is generated via content: "\\2713" in a :before pseudo-element. Some screen readers skip pseudo-element content. Consider using an inline SVG or actual text character with aria-hidden for the visual checkmark.',
          ref: 'tier-free',
        },
      ],
      testimonials: [
        {
          text: 'Avatar divs use gradient backgrounds instead of images',
          light: 'yellow',
          comment:
            'The author-avatar divs are 50x50px gradient circles with initials. No <img> tag, no loading concern, no broken image risk. But they also have no alt text and announce as meaningless text to screen readers. Add aria-hidden="true" to these divs.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: 'CTA gradient section has proper color contrast',
          light: 'green',
          comment:
            'White text on purple gradient (#5B4DE8 → #7B63FF) passes WCAG AA for large text. The white CTA button on purple background provides strong contrast. The inverted hover state (light gray on purple) also passes.',
          ref: 'cta-headline',
        },
      ],
    },
  },

  'flowboard:haiku:design': {
    score: 4.0,
    verdict:
      'This page is a template, not a brand. Remove the logo and nothing says "FlowBoard." The purple primary is the only design decision — everything else is default SaaS aesthetics: rounded cards, gradient icons, translateY hover states, system font stack. The emoji-in-gradient-box feature icons are the biggest visual liability — they read as mockup art, not shipped product. The gradient CTA section at the bottom is the one moment where the design has confidence.',
    shortVerdict: 'Template aesthetics. The brand is the logo and nothing else.',
    sections: {
      hero: [
        {
          text: 'Hero is text-only with no visual identity',
          light: 'yellow',
          comment:
            'No illustration, no product screenshot, no custom typography. Just a heading, a paragraph, and a button. The system font stack means this hero could render identically on any SaaS landing page. There is no visual hook to remember.',
          ref: 'hero-headline',
        },
        {
          text: 'CTA button uses the primary purple effectively',
          light: 'green',
          comment:
            'The box-shadow with color-matched opacity (rgba 91,77,232,0.3) creates a subtle glow that elevates the button above the flat page. The hover lift (translateY -2px) is standard but functional.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'Emoji icons in gradient boxes look like placeholder art',
          light: 'red',
          comment:
            'The 📋 🤝 📊 🔗 🔒 ⚡ emoji inside 50x50 gradient squares are the most template-looking element on the page. These are what a designer puts in a wireframe meaning "icon goes here." Real product pages use custom icons, illustrations, or product screenshots in this position.',
          ref: 'feature-boards',
        },
        {
          text: 'Card hover effect is the default SaaS pattern',
          light: 'yellow',
          comment:
            'translateY(-4px) on hover with shadow increase. This is the #1 most common card hover effect in SaaS templates. It works, but it signals "I used a template" to anyone who has seen 5+ SaaS landing pages.',
          ref: 'feature-collab',
        },
        {
          text: 'Feature grid has no visual grouping or hierarchy',
          light: 'yellow',
          comment:
            'Six cards in a flat grid, all identical size and treatment. No visual hierarchy suggests "these 3 are core" and "these 3 are supporting." The eye has no path through this section.',
          ref: 'feature-speed',
        },
      ],
      pricing: [
        {
          text: 'Featured tier scale creates visual hierarchy',
          light: 'green',
          comment:
            'The scale(1.05) with purple border and shadow on the Pro tier is the correct pattern — guide the eye to the recommended option. The visual promotion is subtle enough to not feel manipulative.',
          ref: 'tier-pro',
        },
        {
          text: 'Pricing card typography is clean but unremarkable',
          light: 'yellow',
          comment:
            'The price display uses clamp() sizing and purple color for emphasis. Functional but generic. A bolder type treatment — display weight, larger contrast — would make the price feel more confident.',
          ref: 'pricing-headline',
        },
      ],
      testimonials: [
        {
          text: 'Gradient circle avatars signal "no real users"',
          light: 'red',
          comment:
            'The linear-gradient(135deg, primary, primary-light) circle with white initials is a design convention that means "placeholder avatar." Every user who has seen a SaaS landing page knows this means there are no real photos. This actively undermines trust.',
          ref: 'testimonial-marcus',
        },
        {
          text: 'Left border accent on testimonial cards is intentional',
          light: 'green',
          comment:
            'The 4px solid primary left border creates a quote-like visual treatment. It is one of the few intentional design choices on the page that goes beyond defaults.',
          ref: 'testimonial-emily',
        },
      ],
      cta: [
        {
          text: 'Gradient CTA section is the boldest design moment',
          light: 'green',
          comment:
            'The full-width gradient (primary to primary-light) with white text is the only section where the design shows confidence. The inverted button (white on purple) creates strong contrast. This section hints at what the rest of the page could feel like.',
          ref: 'cta-headline',
        },
      ],
    },
  },

  // ─── PERSONAS (8) ─────────────────────────────────────

  'flowboard:haiku:frank': {
    score: 3.5,
    verdict:
      'Four minutes and I am already tired. "Organize Your Team\'s Work Effortlessly" — that is what Monday said, and Asana said, and Clickup said. I scrolled past six feature cards that told me nothing new, past testimonials from companies that do not exist, to finally find the pricing. $12? Fine. But nothing on this page told me why I should go through the pain of switching AGAIN.',
    shortVerdict: 'Another PM tool that thinks "effortlessly" is a selling point.',
    sections: {
      hero: [
        {
          text: '"Effortlessly" — the most overused word in SaaS',
          light: 'red',
          comment:
            'I have heard "effortlessly" from every PM tool I have been forced to use. None of them were effortless. This headline tells me the marketing team has never actually migrated a 15-person team from one tool to another.',
          ref: 'hero-headline',
        },
        {
          text: '"Get Started Free" — but how many clicks to my first board?',
          light: 'yellow',
          comment:
            'Free is fine. But "Get Started" is vague. Will I need to create an account, verify email, set up a workspace, invite my team? Just tell me: "First board in 30 seconds." That I would click.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'Six cards describing every PM tool since 2015',
          light: 'red',
          comment:
            'Boards. Collaboration. Analytics. Integrations. Security. Speed. Congratulations, you have described the minimum viable PM tool. Not one of these tells me why I should endure another migration. Where is "Import from Monday.com in 2 minutes"?',
          ref: 'feature-boards',
        },
        {
          text: 'I had to scroll past all 6 to get to pricing',
          light: 'yellow',
          comment:
            'I do not care about your feature list right now. I need two things: the price and a reason to switch. Put the price in the hero or at least let me skip ahead. This feature section is a wall between me and the information I actually need.',
          ref: 'feature-speed',
        },
      ],
      pricing: [
        {
          text: '$12/mo is a real number — thank you',
          light: 'green',
          comment:
            'Finally. An actual price. $12 is in the ballpark. I can forward this to my boss with a number attached. The one thing this page does right.',
          ref: 'tier-pro',
        },
        {
          text: '"Custom/month" — just say the number',
          light: 'yellow',
          comment:
            'I do not have time for a sales call to learn your Enterprise pricing. If it is $25/seat, say $25/seat. "Custom" means "more than you want to pay and we know it."',
          ref: 'tier-enterprise',
        },
      ],
      testimonials: [
        {
          text: '"TechStart Inc." — that is not a real company',
          light: 'red',
          comment:
            'Sarah Johnson, CEO, TechStart Inc. Right. I Googled it. Nothing. If your testimonials are fake, what else on this page is fake? This section actively makes me trust you less.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: '"Transform Your Workflow" — I just saw "Effortlessly" up top',
          light: 'yellow',
          comment:
            'Did anyone proofread this page? The hero says "Effortlessly" and the CTA says "Transform." Pick one message and commit to it. This reads like two different copywriters who never talked to each other.',
          ref: 'cta-headline',
        },
      ],
    },
  },

  'flowboard:haiku:elena': {
    score: 5.2,
    verdict:
      'The heading structure is correct — H1 for the hero, H2 for each section, H3 for feature cards and pricing tiers. I can navigate by headings and understand the page structure. But the feature icons announce nothing useful — six decorative divs with emoji that my screen reader either skips or reads as "clipboard" which is meaningless in context. The pricing tier structure works but the CSS checkmarks may not be announced. If the landing page has these gaps, I worry about the actual product.',
    shortVerdict: 'Good heading structure. Feature icons are invisible to me.',
    sections: {
      hero: [
        {
          text: 'H1 headline with descriptive text reads well',
          light: 'green',
          comment:
            'My screen reader announces "Heading level 1: Organize Your Team\'s Work Effortlessly" immediately. I know what this page is about. The paragraph after gives context. This is how a hero should work for me.',
          ref: 'hero-headline',
        },
        {
          text: '"Get Started Free" button needs more context',
          light: 'yellow',
          comment:
            'I hear "button: Get Started Free" — free what? Where does this take me? "Get Started Free with FlowBoard" or even "Start your free FlowBoard account" tells me what I am committing to.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'Feature icons are decorative divs with no accessible name',
          light: 'red',
          comment:
            'Six feature cards. Each starts with a div containing an emoji character. My screen reader either says "clipboard" or nothing at all, depending on the emoji. The meaningful content is the H3 heading and paragraph that follow, but the icon div creates confusing noise before them. Add aria-hidden="true" to these icon divs.',
          ref: 'feature-boards',
        },
        {
          text: 'Feature headings and descriptions read in logical order',
          light: 'green',
          comment:
            'Once I get past the icon, each card reads: "Heading level 3: Intuitive Boards" then the description paragraph. This is the correct reading order. The content itself is accessible even if the icons are not.',
          ref: 'feature-collab',
        },
      ],
      pricing: [
        {
          text: 'Pricing tiers need explicit plan labels for screen readers',
          light: 'yellow',
          comment:
            'I hear "Heading level 3: Free" then "$0/month" then a list. But when I tab between tiers, there is no aria-label telling me which plan I am in. If I jump to the second tier, I hear "Heading level 3: Pro" which works, but the overall pricing region has no landmark or label.',
          ref: 'tier-free',
        },
        {
          text: 'Checkmark pseudo-elements may be invisible to screen readers',
          light: 'yellow',
          comment:
            'The ✓ before each pricing feature is generated via CSS :before content. NVDA reads this in some browsers but not all. I might hear the feature text without knowing it is an included feature. Use an actual checkmark character or aria-label to ensure the semantic meaning is conveyed.',
          ref: 'tier-pro',
        },
      ],
      testimonials: [
        {
          text: 'Testimonial structure reads in correct order',
          light: 'green',
          comment:
            'Stars, then quote text, then author name and company. My screen reader handles this well. The star characters (★) announce as "black star" which is understandable. I can tell these are positive reviews.',
          ref: 'testimonial-emily',
        },
        {
          text: 'Avatar divs announce meaningless content',
          light: 'yellow',
          comment:
            'The gradient circle divs with initials "SJ" and "MR" are read by my screen reader. These initials add nothing — the full name follows immediately after. Add aria-hidden="true" to the avatar divs to reduce noise.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: 'Final CTA button has clear label',
          light: 'green',
          comment:
            '"Start Your Free Trial" is descriptive enough. I know what this button does. Consistent with the Pro tier CTA, which helps me understand the page structure.',
          ref: 'cta-button',
        },
      ],
    },
  },

  'flowboard:haiku:carlos': {
    score: 3.2,
    verdict:
      'I have 90 seconds and this page gives me nothing I can take to the board. No customer count, no revenue metrics, no compliance badges, no enterprise case study. The testimonials are from companies I have never heard of. The Enterprise tier says "Custom" — I will not waste my time on a sales call without a ballpark. This looks like a startup, not an enterprise-ready platform. I would forward the Asana link instead.',
    shortVerdict: 'No enterprise proof. Not bringing this to the board.',
    sections: {
      hero: [
        {
          text: 'Hero says nothing about scale or reliability',
          light: 'red',
          comment:
            '"Organize Your Team\'s Work Effortlessly" — how many users can it handle? What is the uptime? I need "Trusted by 500+ companies" or "99.99% uptime" in the first scroll. This tells me nothing about whether it works for a 200-person company.',
          ref: 'hero-headline',
        },
      ],
      features: [
        {
          text: '"Enterprise Security" with no specifics',
          light: 'red',
          comment:
            'A lock emoji and "Industry-leading encryption, SSO, and compliance." What encryption? Which SSO providers? What compliance certifications? SOC 2? GDPR? ISO 27001? My security team will ask these questions and this page has no answers.',
          ref: 'feature-security',
        },
        {
          text: '"100+ integrations" — does it include Salesforce and our SSO?',
          light: 'yellow',
          comment:
            'My company uses Salesforce, Okta, and Jira. I need to know if FlowBoard integrates with our stack before I even consider it. "100+ tools" is meaningless without a list.',
          ref: 'feature-integrations',
        },
      ],
      pricing: [
        {
          text: 'Pro tier shows a real number — I can estimate budget quickly',
          light: 'green',
          comment:
            '$12/mo per seat is a concrete number I can multiply by headcount and put in a memo. At 200 seats that is $2,400/mo. I can compare that to our Jira license in 10 seconds. Transparency here saves me a meeting.',
          ref: 'tier-pro',
        },
        {
          text: 'Enterprise tier hides the number behind "Custom"',
          light: 'yellow',
          comment:
            'I need the Enterprise tier and it says "Custom/month." I need a ballpark before I bring this to finance. "Starting at $20/seat/month for 100+ users" would at least let me estimate budget. "Custom" means another meeting I do not have time for.',
          ref: 'tier-enterprise',
        },
      ],
      testimonials: [
        {
          text: 'No enterprise-scale social proof',
          light: 'red',
          comment:
            'CEO of TechStart Inc. — I have never heard of them. Design Director at Creative Co. — same. I need a VP or CTO at a company I recognize. A 200-person deployment testimonial. A Fortune 500 logo. This social proof is for startups, not for someone approving a $50K budget.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: '"Start Your Free Trial" is not my action',
          light: 'yellow',
          comment:
            'I am not personally trialing anything. I need "Talk to Sales" or "Request Enterprise Demo" or "See Enterprise Case Study." The free trial is for individual contributors. The CTA does not know who I am.',
          ref: 'cta-button',
        },
      ],
    },
  },

  'flowboard:haiku:jasmine': {
    score: 5.0,
    verdict:
      'If we adopt FlowBoard, I am going to get tickets about this page. "Start Free" vs "Start Free Trial" — users will ask which one to click. The free tier limits (5 projects, 10 members) will surprise teams who sign up without reading the fine print. There is no FAQ, no help link, no "How it works" section. I can already see the support queue forming. The page is functional but does not anticipate user confusion.',
    shortVerdict: 'No FAQ, inconsistent CTAs — my ticket queue will fill fast.',
    sections: {
      hero: [
        {
          text: 'Clean layout means fewer "where do I click?" tickets',
          light: 'green',
          comment:
            'One headline, one subhead, one button. Users will not get confused about what to do first. Simple pages generate fewer support tickets than clever ones. I appreciate the restraint here.',
          ref: 'hero-headline',
        },
        {
          text: '"Get Started Free" — users will ask what happens next',
          light: 'yellow',
          comment:
            'When someone clicks this, do they create an account? See a demo? Start a trial? I will get tickets asking "I clicked Get Started Free but it asked for my credit card" (it probably will not, but the ambiguity creates anxiety that becomes tickets).',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: '"Connect with 100+ tools" but no integration directory link',
          light: 'yellow',
          comment:
            'Users will ask "does it integrate with [their specific tool]?" and I will have to look it up every time. A link to an integration directory would deflect these tickets. Right now I have nothing to send them.',
          ref: 'feature-integrations',
        },
        {
          text: '"Enterprise Security" links to nothing',
          light: 'yellow',
          comment:
            'When enterprise clients ask about our security posture, I need a trust center page to send them. "Enterprise Security" with no link means I have to write those answers myself or escalate every security question.',
          ref: 'feature-security',
        },
      ],
      pricing: [
        {
          text: 'Free tier limits will cause "why can\'t I" tickets',
          light: 'red',
          comment:
            '"Up to 5 projects" and "Up to 10 team members" — I guarantee team number 11 will file a ticket asking why they cannot join. And project number 6 will generate a confused email. These limits are not prominent enough. Users will hit walls they did not expect.',
          ref: 'tier-free',
        },
        {
          text: '"Start Free" vs "Start Free Trial" — inconsistent language',
          light: 'red',
          comment:
            'Free tier says "Start Free." Pro tier says "Start Free Trial." Users will ask: "What is the difference? Is the free one also a trial that expires?" This inconsistency will generate tickets. Standardize to one CTA label per intent.',
          ref: 'pricing-cta',
        },
      ],
      testimonials: [
        {
          text: 'Testimonials are fine but do not help reduce support load',
          light: 'yellow',
          comment:
            'Nice quotes but no help resources nearby. Where is the "How to Get Started" link? Where is the help center? This section could include "Read how TechStart set up FlowBoard in 10 minutes" — a guide that prevents setup tickets.',
          ref: 'testimonial-emily',
        },
      ],
      cta: [
        {
          text: 'No FAQ section before the final CTA',
          light: 'red',
          comment:
            'Most landing pages have an FAQ accordion before the final CTA. "What happens when I reach 10 team members?" "Is the free plan really free forever?" "Can I import from Monday.com?" Every question not answered here becomes a ticket for me.',
          ref: 'cta-subhead',
        },
      ],
    },
  },

  'flowboard:haiku:sam': {
    score: 4.8,
    verdict:
      'I am on the subway with one thumb. The hero loads fast and I get the gist — PM tool, free. But then I have to scroll past six feature cards stacking vertically. That is a LOT of thumb-scrolling before I find the price. $12/mo — OK, noted. But I had to work for that information. The page needs a mobile summary or at least a sticky bottom CTA so I can act without scrolling back up.',
    shortVerdict: 'Too much scrolling before the price. Needs a mobile shortcut.',
    sections: {
      hero: [
        {
          text: 'Headline scales well with clamp() on mobile',
          light: 'green',
          comment:
            'The clamp() responsive text sizing means I can read the headline on my phone without pinching. "Get Started Free" is a tappable button. Good so far — I understand what this is in 3 seconds.',
          ref: 'hero-headline',
        },
        {
          text: 'CTA button goes 100% width on mobile — easy to tap',
          light: 'green',
          comment:
            'On my phone, the button stretches full-width. I can hit it with one thumb no matter where my hand is. Good touch target. This is one of the things the page gets right for mobile.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: 'Six feature cards stack into a very long scroll on mobile',
          light: 'red',
          comment:
            'On my phone, 6 cards stack vertically into what feels like infinite scrolling. I do not need to know about "Smart Analytics" right now — I just need the price and a reason to bookmark this. Show me 3 key features with "See all" expandable.',
          ref: 'feature-boards',
        },
      ],
      pricing: [
        {
          text: 'Had to scroll past 6 features to find the price',
          light: 'yellow',
          comment:
            'On mobile, the features section is a wall between the hero and pricing. I am on a bumpy train and I almost gave up scrolling. The price should be discoverable faster — a "See Pricing" link in the hero, or a sticky bottom bar with the price.',
          ref: 'pricing-headline',
        },
        {
          text: 'Pricing cards stack cleanly at 1-column on mobile',
          light: 'green',
          comment:
            'Once I reach pricing, the three cards stack vertically and the featured tier scale resets to 1.0. No overflow, no horizontal scrolling. The layout works on my phone.',
          ref: 'tier-pro',
        },
      ],
      testimonials: [
        {
          text: 'I do not care about testimonials on mobile right now',
          light: 'yellow',
          comment:
            'I have 3 stops left. Testimonials are not helping me decide faster. On mobile, this section should be collapsed or much shorter. I need the price and a way to save this link for later.',
          ref: 'testimonials-headline',
        },
      ],
      cta: [
        {
          text: 'Full-width button is easy to tap — but I scrolled a long time to get here',
          light: 'yellow',
          comment:
            'The CTA is tappable, which is good. But I have been scrolling for 30+ seconds past features and testimonials to reach it. A sticky bottom bar with "Try Free — $12/mo Pro" would let me act at any point without scrolling back.',
          ref: 'cta-button',
        },
      ],
    },
  },

  'flowboard:haiku:sarah': {
    score: 3.0,
    verdict:
      'I Googled "TechStart Inc." — nothing. I Googled "Creative Co." — nothing. These testimonials are fabricated. The page says "Join thousands of teams" but shows no number, no logos, no evidence. There is no About page link, no team bios, no funding announcement, no press section. The privacy policy is buried in the footer under "Legal." Last time I trusted a tool like this, it folded in 8 months. I am not recommending this to my boss.',
    shortVerdict: 'Fake testimonials, no proof of existence. Hard pass.',
    sections: {
      hero: [
        {
          text: '"We\'ve got you covered" — covered how? Where is the proof?',
          light: 'yellow',
          comment:
            'This is a claim with no backing. What does "covered" mean? SLA guarantees? 24/7 support? Data backups? Give me something concrete or do not say it.',
          ref: 'hero-subhead',
        },
      ],
      features: [
        {
          text: '"100+ integrations" — show me the list',
          light: 'yellow',
          comment:
            'A number without a link is a claim I cannot verify. I want to click "100+ integrations" and see the actual directory. If the list exists, link to it. If it does not exist, do not claim 100+.',
          ref: 'feature-integrations',
        },
        {
          text: '"Enterprise Security" — where is the cert?',
          light: 'red',
          comment:
            '"Industry-leading encryption, SSO, and compliance." Which industry? What compliance? Where is the SOC 2 Type II badge? Where is the trust center? Claiming "enterprise security" without evidence is worse than saying nothing — it tells me you do not actually have it.',
          ref: 'feature-security',
        },
      ],
      pricing: [
        {
          text: 'Free tier is honest about its limits — that builds trust',
          light: 'green',
          comment:
            '"Up to 5 projects, Up to 10 team members, 1 GB storage" — these are clear, specific limits. I appreciate the honesty. This is the one section where the page does not over-promise.',
          ref: 'tier-free',
        },
        {
          text: '"Custom/month" for Enterprise is evasive',
          light: 'yellow',
          comment:
            'What are you hiding? If Enterprise is $30/seat, say $30/seat. "Custom" in my experience means "more expensive than you expect and we want to lock you into a call first."',
          ref: 'tier-enterprise',
        },
      ],
      testimonials: [
        {
          text: 'Fabricated company names destroy all credibility',
          light: 'red',
          comment:
            'I Googled "TechStart Inc." — zero results. I Googled "Creative Co." — zero results. I Googled "Global Solutions" — too generic to verify. If these are real companies, use their real websites. If they are made up, you have just told me this entire page is fiction.',
          ref: 'testimonial-sarah',
        },
        {
          text: 'All 5-star ratings — statistically impossible',
          light: 'red',
          comment:
            'Three reviews, all 5 stars. No product in history has a 100% 5-star rating from real users. A 4-star review with specific feedback would be infinitely more believable than three perfect scores.',
          ref: 'testimonial-marcus',
        },
        {
          text: 'Gradient circle avatars signal "no real users"',
          light: 'red',
          comment:
            'These purple gradient circles with initials are not photos. They are placeholders. If you had real customers, you would have real photos. This confirms what the company names already told me — these testimonials are fake.',
          ref: 'testimonial-emily',
        },
      ],
      cta: [
        {
          text: '"Join thousands of teams" — which thousands?',
          light: 'red',
          comment:
            'Name one. Show me one logo I recognize. Give me a specific number. "Thousands" is what you say when the real number is embarrassing. The last tool I trusted also claimed "thousands of teams" and folded with 47 paying customers.',
          ref: 'cta-subhead',
        },
      ],
    },
  },

  'flowboard:haiku:dorothy': {
    score: 4.5,
    verdict:
      'I read the whole page and I still do not understand what FlowBoard actually looks like. "Kanban-style boards" — I do not know what Kanban means. "Real-time collaboration" — is that not just sending an email? The pricing says "5 projects" but I do not know if each client is a project or each week is a project. I would need someone to walk me through this because the page assumes I already know what a project management tool does.',
    shortVerdict: 'Too much jargon. Show me what it looks like.',
    sections: {
      hero: [
        {
          text: '"Organize Your Team\'s Work" — I already do that with my spreadsheet',
          light: 'yellow',
          comment:
            'What does this do that my Excel spreadsheet does not? The headline tells me to organize work but I already organize work. It does not tell me what is different or better about doing it this way.',
          ref: 'hero-headline',
        },
        {
          text: '"Get Started Free" is clear enough to click',
          light: 'green',
          comment:
            'At least I know it is free. I might click this just to see what it looks like, since the page does not show me. "Free" removes my worry about accidentally paying for something.',
          ref: 'hero-cta',
        },
      ],
      features: [
        {
          text: '"Kanban-style boards" — what does Kanban mean?',
          light: 'red',
          comment:
            'I have no idea what Kanban is. Is it a language? A company? Why would I want boards in a style I do not know? Just say "a shared to-do list for your team" and I would understand immediately.',
          ref: 'feature-boards',
        },
        {
          text: '"Real-time collaboration" — is that not just talking to someone?',
          light: 'yellow',
          comment:
            'I collaborate in real time every day — I walk over to Karen\'s desk and ask her a question. What does "real-time collaboration" mean in a computer? Show me a picture of what it looks like.',
          ref: 'feature-collab',
        },
        {
          text: '"SSO & advanced security" — what is SSO?',
          light: 'yellow',
          comment:
            'I see this in the Enterprise pricing tier and I have no idea what SSO means. Single sign-on? Single... I do not know. If this is important, tell me in plain English what it does for me.',
          ref: 'feature-security',
        },
      ],
      pricing: [
        {
          text: '"Up to 5 projects" — I do not know if that is a lot or a little',
          light: 'yellow',
          comment:
            'Is each client a project? Each task? Each week? I have 12 clients and a weekly staff meeting — does that mean I need 13 projects? Or is my whole job one project? The page does not explain what a "project" is in FlowBoard terms.',
          ref: 'tier-free',
        },
        {
          text: '"Free" means I can try it without asking my boss for money',
          light: 'green',
          comment:
            'I was told to set this up. If it is free, I can just try it without getting approval. That makes my life easier. Thank you for putting a free option first.',
          ref: 'pricing-headline',
        },
      ],
      testimonials: [
        {
          text: '"Cut project delivery time by 40%" — I do not know what project delivery time is',
          light: 'yellow',
          comment:
            'Is that how long it takes to finish a project? I just want to know if this will help me keep track of who is doing what. Numbers and percentages do not help me understand the product.',
          ref: 'testimonial-sarah',
        },
      ],
      cta: [
        {
          text: '"Transform Your Workflow" — what is a workflow?',
          light: 'yellow',
          comment:
            'I keep seeing this word "workflow" and I do not know what it means. I have tasks. I have a to-do list. I do not have a workflow. Please just say "Make your to-do list easier to share" or something I understand.',
          ref: 'cta-headline',
        },
      ],
    },
  },

  'flowboard:haiku:mike': {
    score: 5.5,
    verdict:
      'I need to present this to my team of 25 during the Monday all-hands. The hero is clean enough — I can point to the headline and explain what it does. But the features section with six identical cards is hard to narrate during a screen-share. The emoji icons look like a school project. And if I scroll to testimonials, my team will immediately call out the gradient circle avatars. The CTA section is actually a decent closer — "Ready to Transform Your Workflow?" works as a final slide.',
    shortVerdict: 'Presentable but those emoji icons will get questions.',
    sections: {
      hero: [
        {
          text: 'Hero is clean enough for a screen-share opening',
          light: 'green',
          comment:
            'I can share my screen, point to the headline, and say "This is FlowBoard, it helps us organize our work." The layout is simple and professional enough. Good starting point for a 3-minute walkthrough.',
          ref: 'hero-headline',
        },
      ],
      features: [
        {
          text: 'Six identical cards are hard to narrate during a demo',
          light: 'yellow',
          comment:
            'When I am screen-sharing, I need to pick 2-3 features to highlight. But they all look the same — same size, same icon treatment, same layout. I cannot quickly point and say "these are the main three things." I need a visual hierarchy that guides my narration.',
          ref: 'feature-boards',
        },
        {
          text: 'Emoji icons look like a school project on a shared screen',
          light: 'red',
          comment:
            'My team will see 📋 🤝 📊 on a big conference room screen and think this is a student project. Real PM tools use custom illustrations or product screenshots. These emoji icons will undermine my pitch before I even start explaining features.',
          ref: 'feature-analytics',
        },
      ],
      pricing: [
        {
          text: 'Pricing comparison is clear enough to present',
          light: 'green',
          comment:
            'I can scroll here and say "$12/mo for Pro, which covers our team of 25." The three tiers are visually distinct with the Pro tier highlighted. I can cover this in 30 seconds during the demo.',
          ref: 'tier-pro',
        },
        {
          text: '"Custom/month" for Enterprise might get questions',
          light: 'yellow',
          comment:
            'Someone on my team will ask "what does Custom mean?" and I will not have an answer. If I am presenting this as a recommendation, I need to know the Enterprise price beforehand or my team loses confidence in my research.',
          ref: 'tier-enterprise',
        },
      ],
      testimonials: [
        {
          text: 'Gradient circle avatars will get called out by my team',
          light: 'red',
          comment:
            'If I scroll past this section during the screen-share, someone will say "those are not real people." The gradient circles are an obvious placeholder. I am skipping this section entirely during the demo to avoid the embarrassment.',
          ref: 'testimonial-marcus',
        },
      ],
      cta: [
        {
          text: '"Ready to Transform Your Workflow?" works as a closing line',
          light: 'green',
          comment:
            'I can end the demo on this section. The purple gradient looks confident on a big screen. "Ready to Transform Your Workflow?" is a decent rhetorical closer. I would say "So, ready to try it?" and the button is right there.',
          ref: 'cta-headline',
        },
      ],
    },
  },
};
