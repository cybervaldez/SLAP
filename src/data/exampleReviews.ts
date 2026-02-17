/**
 * Example project review data — 46 entries (23 reviewers x 2 versions).
 *
 * v1 avg ~5.8 (AI slop)
 * v2 avg ~7.3 (after SLAP review)
 *
 * Key format: 'example:{versionId}:{reviewerId}'
 */

import type { Review } from './reviews';

export const exampleReviews: Record<string, Review> = {
  // ═══════════════════════════════════════════════════════════
  // V1 REVIEWS (avg ~5.8)
  // ═══════════════════════════════════════════════════════════

  // ─── Experts ────────────────────────────────────────────────

  'example:v1:marketing': {
    score: 6,
    verdict: 'The value prop is there but it reads like every other SaaS page. "Unlock the Power of" is the AI version of elevator music. No urgency, no specificity, no reason to act now.',
    shortVerdict: 'Generic CTA, no urgency.',
    sections: {
      hero: [
        { text: 'Headline uses "Unlock the Power of" cliche', light: 'yellow', comment: 'This is the #1 most common AI-generated headline. It says nothing specific.', ref: 'Unlock the Power of Seamless Workflow Automation' },
        { text: 'CTA "Get Started Free" lacks urgency', light: 'yellow', comment: 'Try time-bounded language: "Start Free Today" or "Ship in 4 Minutes".', ref: 'Get Started Free' },
      ],
      features: [
        { text: 'Feature names are generic buzzwords', light: 'yellow', comment: '"Seamless Integration" could be on any SaaS page. What specifically integrates?', ref: 'Seamless Integration' },
      ],
      pricing: [
        { text: 'No anchor pricing visible', light: 'red', comment: 'Show the premium tier first to anchor value. Users need a reference point.' },
        { text: 'All tiers have equal visual weight', light: 'yellow', comment: 'The recommended plan should stand out immediately.' },
      ],
      cta: [
        { text: '"Get Started Today" is too vague', light: 'yellow', comment: 'Restate the core value prop. What are they getting started with?', ref: 'Get Started Today' },
      ],
    },
  },

  'example:v1:ux': {
    score: 5,
    verdict: 'Navigation gaps everywhere. No skip-to-content, no focus indicators, heading hierarchy jumps from H1 to H3. Mobile users will struggle with the pricing grid.',
    shortVerdict: 'Navigation gaps, no skip-to-content.',
    sections: {
      hero: [
        { text: 'No skip-to-content link', light: 'red', comment: 'Screen reader users have no way to bypass repeated navigation.' },
        { text: 'Gradient text may fail contrast check', light: 'yellow', comment: 'Purple-on-light gradients often dip below 4.5:1 ratio.' },
      ],
      features: [
        { text: 'Heading hierarchy broken: H1 then H3', light: 'red', comment: 'H2 is skipped entirely. Screen readers announce this as a document structure error.' },
        { text: 'Feature icons have no alt text', light: 'yellow', comment: 'Decorative gradient squares convey no meaning to assistive tech.' },
      ],
      pricing: [
        { text: 'No keyboard focus indicators on buttons', light: 'yellow', comment: 'Tab users cannot see which button is focused.' },
      ],
      cta: [
        { text: 'CTA section has low contrast white-on-purple', light: 'yellow', comment: 'Body text at 0.8 opacity on gradient may fail WCAG AA.' },
      ],
    },
  },

  'example:v1:product': {
    score: 7,
    verdict: 'Value prop exists but it is buried under generic language. "Streamline your team productivity" could be any tool. The three pricing tiers make sense but the differentiation is unclear.',
    shortVerdict: 'Value prop exists but buried.',
    sections: {
      hero: [
        { text: 'Value proposition present in first scroll', light: 'green', comment: 'User understands "workflow automation" within 5 seconds.', ref: 'Workflow Automation' },
        { text: 'No specific use case or persona targeting', light: 'yellow', comment: 'Who is this for? Developers? Managers? Everyone means no one.' },
      ],
      features: [
        { text: 'Three features is the right number', light: 'green', comment: 'Cognitive load is manageable. Good instinct.' },
      ],
      pricing: [
        { text: 'Tier differentiation is unclear', light: 'yellow', comment: 'What makes Pro worth 3x Starter? Lead with the differentiator.' },
      ],
      cta: [
        { text: '"Join thousands" is unverifiable social proof', light: 'yellow', comment: 'Specific numbers ("2,400 teams") are more believable than "thousands".', ref: 'Join thousands' },
      ],
    },
  },

  'example:v1:technical': {
    score: 4,
    verdict: 'No lazy loading on any images. Gradient backgrounds are rendered as large paints. No semantic HTML — everything is divs. This will crawl on 3G connections.',
    shortVerdict: 'No lazy loading, large gradient paints.',
    sections: {
      hero: [
        { text: 'Large gradient paint on initial load', light: 'red', comment: 'The full-screen gradient forces a large composite layer. Use a solid color with a subtle overlay.' },
      ],
      features: [
        { text: 'No lazy loading on feature section', light: 'yellow', comment: 'Below-fold content should defer rendering.' },
        { text: 'No semantic HTML elements used', light: 'red', comment: 'All divs — no article, nav, or aside. SEO and accessibility suffer.' },
      ],
      pricing: [
        { text: 'Grid layout works on mobile', light: 'green', comment: 'Auto-fit with minmax handles responsive correctly.' },
      ],
      cta: [
        { text: 'Decorative blob elements add to DOM complexity', light: 'yellow', comment: 'Two absolutely-positioned circles add nothing for screen readers.' },
      ],
    },
  },

  'example:v1:design': {
    score: 5,
    verdict: 'This looks like every other AI-generated landing page. Purple gradients, rounded corners, generic sans-serif. Nothing about this says "we made intentional choices."',
    shortVerdict: 'Looks like every other AI design.',
    sections: {
      hero: [
        { text: 'Purple gradient is the #1 AI default', light: 'red', comment: 'This exact gradient (6366F1 to A855F7) appears in thousands of AI-generated pages.', ref: 'Unlock the Power of Seamless Workflow Automation' },
        { text: 'Typography uses system sans-serif', light: 'yellow', comment: 'No font choice was made. This is the absence of design.' },
      ],
      features: [
        { text: 'Rounded-2xl cards feel generic', light: 'yellow', comment: 'Border-radius 16px is Tailwind default. It communicates "I used a template."' },
      ],
      pricing: [
        { text: 'Card layout is clean and readable', light: 'green', comment: 'Grid works well here. Spacing is adequate.' },
      ],
      cta: [
        { text: 'Decorative blobs are AI design hallmarks', light: 'yellow', comment: 'Random circle shapes behind CTAs are a known AI pattern.' },
      ],
    },
  },

  // ─── Personas ───────────────────────────────────────────────

  'example:v1:marcus': {
    score: 6,
    verdict: 'Low contrast on the gradient background will be invisible to me. The purple-on-light hero and white-on-purple CTA are both problematic for deuteranopia.',
    shortVerdict: 'Low contrast on gradient bg.',
    sections: {
      hero: [
        { text: 'Gradient text fails color-blind contrast', light: 'red', comment: 'Purple gradient on light background becomes muddy gray for deuteranopia.', ref: 'Unlock the Power of Seamless Workflow Automation' },
      ],
      features: [
        { text: 'Gradient icon squares have no shape distinction', light: 'yellow', comment: 'All three icons look identical to me — same purple square.' },
      ],
      pricing: [
        { text: 'Price numbers are readable', light: 'green', comment: 'Black on white, good contrast.' },
      ],
      cta: [
        { text: 'White on purple gradient is borderline', light: 'yellow', comment: 'Depending on the gradient point, contrast dips below 4.5:1.' },
      ],
    },
  },

  'example:v1:elena': {
    score: 4,
    verdict: 'Heading hierarchy is broken. No aria labels on anything. Feature icons are empty divs. I cannot navigate this page with a screen reader at all.',
    shortVerdict: 'Heading hierarchy broken, no aria.',
    sections: {
      hero: [
        { text: 'No landmark roles defined', light: 'red', comment: 'No nav, main, or footer landmarks. Screen reader users are lost.' },
        { text: 'CTA button has no accessible description', light: 'yellow', comment: '"Get Started Free" — started with what? Context is missing.', ref: 'Get Started Free' },
      ],
      features: [
        { text: 'Feature icons are empty divs', light: 'red', comment: 'A screen reader reads nothing. These should have aria-label or alt text.' },
        { text: 'H1 to H3 skip — H2 missing', light: 'red', comment: 'Screen reader heading navigation breaks when hierarchy is violated.' },
      ],
      pricing: [
        { text: 'Pricing list uses semantic ul/li', light: 'green', comment: 'Good — screen reader announces "list of 5 items".' },
      ],
      cta: [
        { text: 'Decorative blobs are in the tab order', light: 'yellow', comment: 'Absolutely positioned divs should have aria-hidden="true".' },
      ],
    },
  },

  'example:v1:priya': {
    score: 6,
    verdict: 'Touch targets are OK. Buttons are large enough. But the pricing cards are too close together on mobile — I will tap the wrong one.',
    shortVerdict: 'Touch targets OK, buttons large enough.',
    sections: {
      hero: [
        { text: 'CTA button is large enough (44px+)', light: 'green', comment: 'Padding 14px makes this comfortably tappable.' },
      ],
      features: [
        { text: 'Feature cards are not interactive', light: 'green', comment: 'No tap targets to worry about here.' },
      ],
      pricing: [
        { text: 'Pricing buttons too close together on mobile', light: 'yellow', comment: 'Grid gap of 1.5rem is tight for motor-impaired users.' },
      ],
      cta: [
        { text: 'CTA button is adequately sized', light: 'green', comment: 'Good padding and width.' },
      ],
    },
  },

  'example:v1:dorothy': {
    score: 5,
    verdict: 'What does "seamless integration" even mean? And "cutting-edge platform"? I just want to know what this thing does in plain English.',
    shortVerdict: 'Jargon-heavy language throughout.',
    sections: {
      hero: [
        { text: '"Workflow Automation" is tech jargon', light: 'red', comment: 'My grandson would understand this. I do not.', ref: 'Workflow Automation' },
        { text: '"Cutting-edge platform" means nothing', light: 'yellow', comment: 'Every website says this. Tell me what it actually does.', ref: 'cutting-edge platform' },
      ],
      features: [
        { text: '"Seamless Integration" is meaningless', light: 'red', comment: 'Integrates with what? Just say "works with Gmail and Slack".', ref: 'Seamless Integration' },
      ],
      pricing: [
        { text: 'Pricing is clear and simple', light: 'green', comment: 'I can see the numbers. This part makes sense.' },
      ],
      cta: [
        { text: '"Transforming their workflow" — more jargon', light: 'yellow', comment: 'Just say "making their work easier".', ref: 'transforming their workflow' },
      ],
    },
  },

  'example:v1:kevin': {
    score: 7,
    verdict: 'Loads fast enough for me. Layout is clean. But nothing here makes me want to stay. I have seen this exact page 100 times this week.',
    shortVerdict: 'Loads fast, nothing memorable.',
    sections: {
      hero: [
        { text: 'Page loads quickly', light: 'green', comment: 'No blocking resources. Good.' },
        { text: 'Nothing grabs my attention', light: 'yellow', comment: 'I am already reaching for the back button.' },
      ],
      features: [
        { text: 'Three cards are easy to scan', light: 'green', comment: 'I can skim this in 2 seconds.' },
      ],
      pricing: [
        { text: 'Pricing loads without scroll', light: 'green', comment: 'Good — I hate scrolling for prices.' },
      ],
      cta: [
        { text: 'CTA is identical to the hero', light: 'yellow', comment: 'Why am I seeing "Get Started" again? Give me something new.' },
      ],
    },
  },

  'example:v1:raj': {
    score: 4,
    verdict: 'Zero keyboard navigation. No shortcuts. Cannot tab through features. No CLI documentation. This was built for mouse-only users.',
    shortVerdict: 'Zero keyboard navigation.',
    sections: {
      hero: [
        { text: 'No keyboard shortcut for CTA', light: 'red', comment: 'A power user should be able to press Enter or / to jump to action.' },
      ],
      features: [
        { text: 'Feature cards are not focusable', light: 'red', comment: 'Tab key skips the entire features section.' },
      ],
      pricing: [
        { text: 'Pricing buttons are tab-accessible', light: 'green', comment: 'Buttons are in the tab order. At least that works.' },
      ],
      cta: [
        { text: 'No mention of CLI or API', light: 'yellow', comment: 'Power users want to know if there is a programmatic interface.' },
      ],
    },
  },

  'example:v1:carlos': {
    score: 6,
    verdict: 'I can tell what this is in 5 seconds but I cannot tell what it costs in 5 seconds. The pricing is below the fold. Lead with value.',
    shortVerdict: 'Cannot tell cost in 5 seconds.',
    sections: {
      hero: [
        { text: 'Understands "workflow automation" quickly', light: 'green', comment: 'Good — I know the category immediately.' },
      ],
      features: [
        { text: 'Features are too generic for a CEO pitch', light: 'yellow', comment: 'I need ROI numbers, not "lightning fast" claims.' },
      ],
      pricing: [
        { text: 'Pricing is below the fold', light: 'red', comment: 'I am not scrolling. Put the price on screen one.' },
      ],
      cta: [
        { text: '"Free trial" is fine but what is the commitment?', light: 'yellow', comment: 'Tell me the total cost of adoption.' },
      ],
    },
  },

  'example:v1:jasmine': {
    score: 6,
    verdict: 'No FAQ section. No troubleshooting. When users ask me about pricing I cannot link them to a clear answer because there is no pricing anchor.',
    shortVerdict: 'No FAQ, pricing confusion.',
    sections: {
      hero: [
        { text: 'Clear product category for support context', light: 'green', comment: 'I can tell customers what this product does.' },
      ],
      features: [
        { text: 'Feature descriptions are too vague for support', light: 'yellow', comment: 'When users ask "does it do X?" I cannot tell from this page.' },
      ],
      pricing: [
        { text: 'No FAQ or comparison table', light: 'red', comment: 'I get 3 tickets a day about "what is the difference between Pro and Enterprise?"' },
      ],
      cta: [
        { text: 'No support contact information', light: 'yellow', comment: 'Users need to know they can get help before signing up.' },
      ],
    },
  },

  'example:v1:tommy': {
    score: 7,
    verdict: 'Looks clean and easy to scan. I can understand the pricing. The purple is a bit much but overall this is professional enough.',
    shortVerdict: 'Looks clean, easy to scan.',
    sections: {
      hero: [
        { text: 'Layout is clean and modern', light: 'green', comment: 'Looks like a real product. I would show this to my manager.' },
      ],
      features: [
        { text: 'Three features easy to digest', light: 'green', comment: 'I get it in one glance.' },
      ],
      pricing: [
        { text: 'Pricing is straightforward', light: 'green', comment: 'Three tiers, clear prices. Good.' },
      ],
      cta: [
        { text: 'Purple gradient CTA is a bit aggressive', light: 'yellow', comment: 'It screams "CLICK ME" in a way that feels desperate.' },
      ],
    },
  },

  'example:v1:frank': {
    score: 2,
    verdict: 'Pricing buried. Generic everything. "Unlock the Power" made me close the tab. This is a template with variables filled in, not a design.',
    shortVerdict: 'Pricing buried, generic everything.',
    sections: {
      hero: [
        { text: '"Unlock the Power of" is insulting', light: 'red', comment: 'You had one chance to tell me what this does and you wasted it on a cliche.', ref: 'Unlock the Power of' },
        { text: 'No specific number or claim', light: 'red', comment: 'How fast? How much saved? Give me ONE specific thing.' },
      ],
      features: [
        { text: '"Seamless" and "Lightning Fast" are empty words', light: 'red', comment: 'Every product claims this. It means nothing.', ref: 'Lightning Fast' },
      ],
      pricing: [
        { text: 'I had to scroll to find prices', light: 'red', comment: 'I almost left before seeing this section.' },
      ],
      cta: [
        { text: '"Join thousands" is lazy copywriting', light: 'yellow', comment: 'Name one customer. Give me one specific testimonial.', ref: 'Join thousands' },
      ],
    },
  },

  'example:v1:diana': {
    score: 7,
    verdict: 'The color palette is harmonious at least. Purple gradient is overused but the application is consistent. Typography could be more intentional.',
    shortVerdict: 'Color palette is harmonious.',
    sections: {
      hero: [
        { text: 'Color gradient is well-executed', light: 'green', comment: 'The purple transition is smooth. Nice easing.' },
        { text: 'Typography lacks intentionality', light: 'yellow', comment: 'System sans-serif says "I did not choose a typeface."' },
      ],
      features: [
        { text: 'Card spacing is consistent', light: 'green', comment: 'The grid gaps are uniform. Good rhythm.' },
      ],
      pricing: [
        { text: 'Visual hierarchy is flat', light: 'yellow', comment: 'All three cards compete for attention equally.' },
      ],
      cta: [
        { text: 'Gradient CTA continues the color story', light: 'green', comment: 'At least the palette is consistent throughout.' },
      ],
    },
  },

  'example:v1:sarah': {
    score: 3,
    verdict: 'No real testimonials. No case studies. No trust signals. Who uses this? Where is the privacy policy? I do not trust this page at all.',
    shortVerdict: 'No testimonials, no trust.',
    sections: {
      hero: [
        { text: 'No trust signals visible', light: 'red', comment: 'No logos, no testimonials, no certifications. Why should I trust you?' },
      ],
      features: [
        { text: '"Military-grade encryption" is a red flag', light: 'red', comment: 'This phrase is used by companies that do not actually understand security.', ref: 'military-grade encryption' },
      ],
      pricing: [
        { text: 'No money-back guarantee mentioned', light: 'yellow', comment: 'What if I do not like it? Am I stuck?' },
      ],
      cta: [
        { text: '"Join thousands" with no proof', light: 'red', comment: 'Name them. Show me a real person who uses this.', ref: 'Join thousands' },
      ],
    },
  },

  'example:v1:sam': {
    score: 5,
    verdict: 'CTA button is too wide for one-thumb operation on the subway. Pricing cards will stack vertically on mobile which means lots of scrolling.',
    shortVerdict: 'CTA too wide for thumb.',
    sections: {
      hero: [
        { text: 'Hero text is readable on mobile', light: 'green', comment: 'Clamp() font sizing works well.' },
      ],
      features: [
        { text: 'Feature cards stack well on narrow screens', light: 'green', comment: 'Grid auto-fit handles this.' },
      ],
      pricing: [
        { text: 'Three pricing cards means lots of mobile scrolling', light: 'yellow', comment: 'On a phone, this is 3 full screens of scrolling just for pricing.' },
      ],
      cta: [
        { text: 'CTA button padding too wide for thumb reach', light: 'red', comment: '40px horizontal padding pushes the button edges beyond comfortable one-hand reach.', ref: 'Start Your Free Trial' },
      ],
    },
  },

  'example:v1:maya': {
    score: 6,
    verdict: 'Too much text per section. I have 30 seconds and this page wants me to read 4 paragraphs before I understand the product.',
    shortVerdict: 'Too much text per section.',
    sections: {
      hero: [
        { text: 'Subtitle is too long for scanning', light: 'yellow', comment: 'Two lines of body text in the hero. I stopped reading after "Streamline".', ref: 'Streamline your team' },
      ],
      features: [
        { text: 'Feature descriptions are paragraph-length', light: 'yellow', comment: 'Each card has 2 sentences. Should be 1 sentence max.' },
      ],
      pricing: [
        { text: 'Feature lists in pricing are scannable', light: 'green', comment: 'Checkmark lists work. I can compare quickly.' },
      ],
      cta: [
        { text: 'CTA text is redundant with hero', light: 'yellow', comment: 'I already saw "Get Started." Give me a reason to act NOW.' },
      ],
    },
  },

  'example:v1:mike': {
    score: 6,
    verdict: 'Professional enough that I would not be embarrassed to show this in a screen share. But it is also so generic that nobody would be impressed.',
    shortVerdict: 'Professional enough for screen share.',
    sections: {
      hero: [
        { text: 'Clean, professional appearance', light: 'green', comment: 'This will not embarrass me in a demo.' },
        { text: 'Nothing impressive or memorable', light: 'yellow', comment: 'My team will forget this 5 minutes after the meeting.' },
      ],
      features: [
        { text: 'Feature section is standard SaaS layout', light: 'green', comment: 'Expected and professional.' },
      ],
      pricing: [
        { text: 'Pricing is clear for team discussion', light: 'green', comment: 'Easy to point at and discuss in a meeting.' },
      ],
      cta: [
        { text: 'CTA is generic but inoffensive', light: 'yellow', comment: 'Fine for a demo but will not close the deal.' },
      ],
    },
  },

  'example:v1:yuki': {
    score: 5,
    verdict: 'I have seen this design 1000 times. Every AI tool produces this exact purple gradient, these exact rounded corners, this exact layout. There is no intention here.',
    shortVerdict: 'Seen this design 1000 times.',
    sections: {
      hero: [
        { text: 'Purple gradient is the most overused AI pattern', light: 'red', comment: 'Midjourney, ChatGPT, and every AI tool default to this exact palette.' },
      ],
      features: [
        { text: 'Rounded-lg cards are template default', light: 'yellow', comment: 'Border-radius 16px is the CSS equivalent of "I did not think about this."' },
      ],
      pricing: [
        { text: 'Grid layout is functional', light: 'green', comment: 'It works. It is just not beautiful.' },
      ],
      cta: [
        { text: 'Blob shapes are AI decoration cliches', light: 'yellow', comment: 'Random circles behind CTAs appear in every AI-generated design.' },
      ],
    },
  },

  'example:v1:dex': {
    score: 2,
    verdict: 'This is a template, not a design. Every startup looks like this because they all used the same AI prompt. Zero personality, zero edge, zero soul.',
    shortVerdict: 'Template, not a design.',
    sections: {
      hero: [
        { text: 'Cookie-cutter SaaS hero', light: 'red', comment: 'Gradient text, centered layout, vague subtitle. I have seen this on 500 landing pages.', ref: 'Unlock the Power of Seamless Workflow Automation' },
      ],
      features: [
        { text: 'Three identical cards with gradient icons', light: 'red', comment: 'This is what happens when you ask AI to "make a features section."' },
      ],
      pricing: [
        { text: 'Standard three-tier pricing', light: 'yellow', comment: 'Functional but completely soulless.' },
      ],
      cta: [
        { text: 'Gradient CTA with floating blobs', light: 'red', comment: 'The most corporate, AI-generated ending imaginable.' },
      ],
    },
  },

  'example:v1:nora': {
    score: 5,
    verdict: 'Nothing premium about this. The purple gradient feels cheap, the typography is default, and the layout screams "free template." I would not pay premium prices for a product that presents itself like this.',
    shortVerdict: 'Nothing premium about this.',
    sections: {
      hero: [
        { text: 'Purple gradient feels cheap', light: 'red', comment: 'Premium brands use restraint. This is the opposite of restraint.' },
      ],
      features: [
        { text: 'No visual distinction between features', light: 'yellow', comment: 'Premium products highlight their signature feature differently.' },
      ],
      pricing: [
        { text: 'Enterprise at $99 feels undervalued', light: 'yellow', comment: 'The presentation does not justify the price point.' },
      ],
      cta: [
        { text: 'CTA feels like a hard sell', light: 'yellow', comment: 'Premium brands invite. They do not push.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════
  // V2 REVIEWS (avg ~7.3)
  // ═══════════════════════════════════════════════════════════

  // ─── Experts ────────────────────────────────────────────────

  'example:v2:marketing': {
    score: 8,
    verdict: 'Now we are talking. "Ship your first feature in 4 minutes" is specific, urgent, and provable. Anchor pricing with the "Most Popular" badge works. The CTA repeats the trust message.',
    shortVerdict: 'Urgency language, anchor pricing.',
    sections: {
      hero: [
        { text: '"Ship in 4 minutes" is specific and urgent', light: 'green', comment: 'This is a claim users can verify. That builds trust.', ref: 'Ship your first feature in 4 minutes.' },
        { text: 'Social proof with specific numbers (2,400+ teams)', light: 'green', comment: 'Specific > vague. "2,400" beats "thousands" every time.', ref: '2,400+ teams' },
      ],
      features: [
        { text: 'Benefit-focused copy instead of feature names', light: 'green', comment: '"One-command deploy" tells me what I get. "Seamless integration" did not.', ref: 'One-command deploy' },
      ],
      pricing: [
        { text: 'Anchor pricing with Most Popular badge', light: 'green', comment: 'Pro tier draws the eye. Users anchor on $29 and feel good about it.', ref: 'MOST POPULAR' },
      ],
      cta: [
        { text: 'Real testimonial quotes add trust', light: 'green', comment: 'Named people with titles. This feels real.' },
        { text: 'Could add urgency to CTA button text', light: 'yellow', comment: '"CREATE ACCOUNT" is fine but "START SHIPPING NOW" would be stronger.', ref: 'CREATE ACCOUNT' },
      ],
    },
  },

  'example:v2:ux': {
    score: 7,
    verdict: 'Proper heading hierarchy now. Feature icons have aria-labels. Dark theme has good contrast ratios. Still missing skip-to-content but major improvements.',
    shortVerdict: 'Proper heading hierarchy, focus states.',
    sections: {
      hero: [
        { text: 'Left-aligned text improves readability', light: 'green', comment: 'Left-align is easier to scan than centered for long content.' },
      ],
      features: [
        { text: 'Icons have aria-label attributes', light: 'green', comment: 'Screen readers can now describe what each feature icon represents.' },
        { text: 'Heading hierarchy is correct (H1, H2, H3)', light: 'green', comment: 'Proper nesting. Screen reader navigation works.' },
      ],
      pricing: [
        { text: 'Focus states should be more visible on dark bg', light: 'yellow', comment: 'Default browser focus ring is hard to see on #0D0D1A.' },
      ],
      cta: [
        { text: 'Still missing skip-to-content link', light: 'yellow', comment: 'Should be added as first focusable element in the page.' },
      ],
    },
  },

  'example:v2:product': {
    score: 8,
    verdict: 'Value prop is front and center. "Ship in 4 minutes" is a clear, testable claim. Pricing is visible and differentiated. The dark theme creates a distinct brand identity.',
    shortVerdict: 'Value prop front and center.',
    sections: {
      hero: [
        { text: 'Value proposition is immediate and specific', light: 'green', comment: '"4 minutes" is a testable claim. Users will try it to verify.', ref: 'Ship your first feature in 4 minutes.' },
        { text: 'Target audience is clear: developers and teams', light: 'green', comment: 'The language speaks to builders, not everyone.' },
      ],
      features: [
        { text: 'Features map to user needs not product capabilities', light: 'green', comment: '"One-command deploy" = I save time. "SOC 2 from day one" = I save headaches.', ref: 'One-command deploy' },
      ],
      pricing: [
        { text: 'Clear tier differentiation', light: 'green', comment: 'Solo builders, growing teams, scale. Each tier has a persona.' },
      ],
      cta: [
        { text: 'Testimonials reinforce the "4 minutes" claim', light: 'green', comment: '"We cut our deploy time from 45 minutes to 4" — specific, believable, compelling.', ref: 'We cut our deploy time from 45 minutes to 4' },
      ],
    },
  },

  'example:v2:technical': {
    score: 7,
    verdict: 'Semantic HTML improved. Dark background is a single color, not a gradient paint. Feature cards use border-left instead of gradient icons. Still could add lazy loading.',
    shortVerdict: 'Semantic HTML, reduced paint.',
    sections: {
      hero: [
        { text: 'Solid background color reduces paint cost', light: 'green', comment: '#0D0D1A is one flat color. No gradient compositing needed.' },
      ],
      features: [
        { text: 'Border-left accents are CSS-only', light: 'green', comment: 'No image assets needed. Zero additional network requests.' },
        { text: 'Role attributes added to icons', light: 'green', comment: 'role="img" with aria-label is correct usage.' },
      ],
      pricing: [
        { text: 'Could benefit from lazy loading below fold', light: 'yellow', comment: 'Pricing section is below the fold on most viewports.' },
      ],
      cta: [
        { text: 'No decorative elements cluttering DOM', light: 'green', comment: 'Clean markup. No floating blobs or unnecessary divs.' },
      ],
    },
  },

  'example:v2:design': {
    score: 8,
    verdict: 'Now this is intentional design. Dark theme with monospace font creates a distinct identity. Gold accents on dark feel premium and technical. Every choice looks deliberate.',
    shortVerdict: 'Distinctive, intentional choices.',
    sections: {
      hero: [
        { text: 'Left-aligned, dark theme is distinctive', light: 'green', comment: 'This immediately looks different from AI-generated pages.' },
        { text: 'Monospace font reinforces technical positioning', light: 'green', comment: 'Courier New says "we build for builders." The font IS the brand.' },
      ],
      features: [
        { text: 'Color-coded borders create visual hierarchy', light: 'green', comment: 'Red, gold, green borders differentiate features at a glance.' },
      ],
      pricing: [
        { text: 'Gold "Most Popular" badge is effective anchoring', light: 'green', comment: 'The eye goes straight to the recommended tier.' },
      ],
      cta: [
        { text: 'CTA section continues the brand language', light: 'green', comment: 'Consistent dark theme, monospace text, gold accents throughout.' },
      ],
    },
  },

  // ─── Personas ───────────────────────────────────────────────

  'example:v2:marcus': {
    score: 7,
    verdict: 'Dark theme works much better for my color vision. Gold on dark has excellent contrast. The border-left color coding uses both color AND position to differentiate.',
    shortVerdict: 'Dark theme, excellent contrast.',
    sections: {
      hero: [
        { text: 'Light text on dark bg is high contrast', light: 'green', comment: '#F5F0E1 on #0D0D1A passes all contrast checks easily.' },
      ],
      features: [
        { text: 'Border-left uses position + color for distinction', light: 'green', comment: 'Even if I cannot distinguish the colors, the positions differ.' },
      ],
      pricing: [
        { text: 'Gold on dark is visible to all color vision types', light: 'green', comment: 'Yellow/gold is one of the most universally visible colors.' },
      ],
      cta: [
        { text: 'Monochrome text section is fully accessible', light: 'green', comment: 'No color-dependent information in the CTA.' },
      ],
    },
  },

  'example:v2:elena': {
    score: 6,
    verdict: 'Semantic HTML improved. Aria-labels on icons. Heading hierarchy is correct. Still needs landmark roles and skip-to-content, but this is a huge improvement.',
    shortVerdict: 'Semantic HTML, aria-labels added.',
    sections: {
      hero: [
        { text: 'Heading hierarchy correct', light: 'green', comment: 'H1 in hero, H2 in sections, H3 in cards. Proper nesting.' },
      ],
      features: [
        { text: 'Icons have aria-label attributes', light: 'green', comment: 'role="img" with aria-label describes each feature icon.' },
        { text: 'Still needs landmark roles', light: 'yellow', comment: 'main, nav, footer landmarks would complete the picture.' },
      ],
      pricing: [
        { text: 'Feature lists use ul/li correctly', light: 'green', comment: 'Screen reader announces list structure.' },
      ],
      cta: [
        { text: 'Testimonials are readable by screen reader', light: 'green', comment: 'Plain text quotes. No complex markup to trip over.' },
      ],
    },
  },

  'example:v2:priya': {
    score: 7,
    verdict: 'Button sizes are good. The dark theme reduces visual noise. Touch targets in pricing are well-spaced. Full-width buttons in pricing cards are easy to hit.',
    shortVerdict: 'Good button sizes, well-spaced.',
    sections: {
      hero: [
        { text: 'CTA button has adequate padding', light: 'green', comment: '14px vertical padding exceeds the 44px minimum.' },
      ],
      features: [
        { text: 'Feature cards are not interactive', light: 'green', comment: 'No tap targets to worry about.' },
      ],
      pricing: [
        { text: 'Full-width buttons are easy to tap', light: 'green', comment: 'width: 100% means the entire card width is tappable.' },
      ],
      cta: [
        { text: 'CTA button has good size and spacing', light: 'green', comment: 'Large enough for motor-impaired tapping.' },
      ],
    },
  },

  'example:v2:dorothy': {
    score: 6,
    verdict: 'Better. "Ship your first feature in 4 minutes" is clearer than "Unlock the Power." But "SOC 2" and "SAML" are still tech jargon I do not understand.',
    shortVerdict: 'Clearer language, some jargon remains.',
    sections: {
      hero: [
        { text: '"Ship your first feature in 4 minutes" is clear', light: 'green', comment: 'I understand what "feature" and "4 minutes" mean.', ref: 'Ship your first feature in 4 minutes.' },
      ],
      features: [
        { text: '"One-command deploy" is still technical', light: 'yellow', comment: 'What is a "deploy"? I need plainer English.', ref: 'One-command deploy' },
      ],
      pricing: [
        { text: '"SOC 2" and "SAML" are jargon', light: 'yellow', comment: 'I have no idea what these acronyms mean.', ref: 'SOC 2 from day one' },
      ],
      cta: [
        { text: 'Testimonials use plain language', light: 'green', comment: '"We cut our deploy time" — I understand "cut time." Good.' },
      ],
    },
  },

  'example:v2:kevin': {
    score: 8,
    verdict: 'Dark mode! Finally. The page feels fast and the gold accents pop. The hero tells me exactly what I get without making me scroll. Much better.',
    shortVerdict: 'Dark mode, fast, gold pops.',
    sections: {
      hero: [
        { text: 'Dark mode immediately grabs attention', light: 'green', comment: 'Finally a page that does not blind me.' },
        { text: 'Value prop in 4 words: "Ship in 4 minutes"', light: 'green', comment: 'I am hooked before I even think about scrolling.', ref: 'Ship your first feature in 4 minutes.' },
      ],
      features: [
        { text: 'Feature cards are scannable', light: 'green', comment: 'Short titles, brief descriptions. Perfect for my attention span.' },
      ],
      pricing: [
        { text: 'Most Popular badge guides my decision', light: 'green', comment: 'I do not want to think about pricing tiers. Just tell me which one.' },
      ],
      cta: [
        { text: '"Create Account" is a clear action', light: 'green', comment: 'No ambiguity about what happens when I click.' },
      ],
    },
  },

  'example:v2:raj': {
    score: 5,
    verdict: 'Monospace font is a nice touch for developers. But still no keyboard shortcuts, no CLI documentation link, and no power-user features. Better visually, same functionally.',
    shortVerdict: 'Better visual, still no keyboard nav.',
    sections: {
      hero: [
        { text: 'Monospace font signals developer tool', light: 'green', comment: 'I immediately know this is for people like me.' },
      ],
      features: [
        { text: '"One-command deploy" speaks my language', light: 'green', comment: 'Show me the command. I want to type it right now.', ref: 'One-command deploy' },
      ],
      pricing: [
        { text: 'Still no keyboard navigation enhancements', light: 'red', comment: 'Tab order works but no shortcuts to jump between tiers.' },
      ],
      cta: [
        { text: 'No link to CLI docs or API reference', light: 'yellow', comment: 'Developer tools should link to their developer documentation.' },
      ],
    },
  },

  'example:v2:carlos': {
    score: 7,
    verdict: 'Better. The pricing is visible and the "Most Popular" badge tells me what most teams pick. The dark theme feels premium. I would show this to the board.',
    shortVerdict: 'Pricing visible, premium feel.',
    sections: {
      hero: [
        { text: '"2,400+ teams" provides social proof', light: 'green', comment: 'Specific enough to be credible for a board presentation.', ref: '2,400+ teams' },
      ],
      features: [
        { text: '"40ms cold start" is a concrete metric', light: 'green', comment: 'I can compare this to competitors. Data I can use.', ref: '40ms cold start' },
      ],
      pricing: [
        { text: 'Most Popular badge guides decision', light: 'green', comment: 'I know what most companies pick. That is my default.' },
      ],
      cta: [
        { text: 'Named testimonials with titles', light: 'green', comment: '"Engineering Lead" and "CTO" are peer-level endorsements.' },
      ],
    },
  },

  'example:v2:jasmine': {
    score: 6,
    verdict: 'Pricing is clearer now with tier descriptions ("For solo builders", "For growing teams"). Still no FAQ section though, which means more support tickets for me.',
    shortVerdict: 'Clearer pricing, still no FAQ.',
    sections: {
      hero: [
        { text: 'Clear product positioning helps support', light: 'green', comment: 'I can tell customers what FlowStack is and who it is for.' },
      ],
      features: [
        { text: 'Specific features help answer support questions', light: 'green', comment: '"Does it support SOC 2?" Yes. I can point to this page.' },
      ],
      pricing: [
        { text: 'Tier descriptions help but no FAQ', light: 'yellow', comment: '"For growing teams" helps but people still ask "what counts as growing?"' },
      ],
      cta: [
        { text: 'Still no support contact or chat widget', light: 'yellow', comment: 'Users need a way to ask questions before committing.' },
      ],
    },
  },

  'example:v2:tommy': {
    score: 8,
    verdict: 'Love the dark mode! The gold accents look really cool. The monospace font makes it feel like a real developer tool. Way more impressive than the purple version.',
    shortVerdict: 'Dark mode looks impressive.',
    sections: {
      hero: [
        { text: 'Dark theme looks modern and cool', light: 'green', comment: 'I would show this to my friends. It looks like it was made by someone who cares.' },
      ],
      features: [
        { text: 'Color-coded borders add visual interest', light: 'green', comment: 'Red, gold, green — it is like a traffic light system. Intuitive.' },
      ],
      pricing: [
        { text: 'Gold highlight on Pro tier is eye-catching', light: 'green', comment: 'I immediately know which plan is recommended.' },
      ],
      cta: [
        { text: 'Real testimonials make it feel legit', light: 'green', comment: 'Named people with titles. This company feels real.' },
      ],
    },
  },

  'example:v2:frank': {
    score: 6,
    verdict: 'Better. "Ship in 4 minutes" gave me a reason to care. Pricing is visible. But the page is still too long. Cut it in half and I might stick around.',
    shortVerdict: 'Better hook, still too long.',
    sections: {
      hero: [
        { text: '"4 minutes" is a specific, bold claim', light: 'green', comment: 'Finally a number I can challenge. That made me scroll down.', ref: '4 minutes' },
      ],
      features: [
        { text: 'Three features is right but descriptions are too long', light: 'yellow', comment: 'One sentence per feature. Not two.' },
      ],
      pricing: [
        { text: 'Pricing visible without scrolling a mile', light: 'green', comment: 'Better placement. I can see costs before losing interest.' },
      ],
      cta: [
        { text: 'Testimonials are named — that helps', light: 'green', comment: 'Real names with real titles. I believe these might be actual people.' },
      ],
    },
  },

  'example:v2:diana': {
    score: 8,
    verdict: 'Now every choice is intentional. Dark theme, monospace, gold accents — each reinforces the brand. The border-left color coding adds meaning. This feels crafted.',
    shortVerdict: 'Intentional, crafted design.',
    sections: {
      hero: [
        { text: 'Monospace font is a deliberate brand choice', light: 'green', comment: 'This says "we chose this font because we build for builders."' },
        { text: 'Left alignment creates visual tension', light: 'green', comment: 'Asymmetry is more interesting than centered. Shows confidence.' },
      ],
      features: [
        { text: 'Border-left colors map to meaning', light: 'green', comment: 'Red for action, gold for speed, green for safety. Intentional.' },
      ],
      pricing: [
        { text: 'Gold accent system is consistent', light: 'green', comment: 'The same gold appears in headings, badges, and CTA buttons.' },
      ],
      cta: [
        { text: 'Typography is restrained and confident', light: 'green', comment: 'No gradient text, no ALL CAPS on everything, no visual shouting.' },
      ],
    },
  },

  'example:v2:sarah': {
    score: 7,
    verdict: 'Trust signals improved massively. Named testimonials with titles. Specific user count. G2 rating. SOC 2 compliance mentioned. I would actually consider trying this.',
    shortVerdict: 'Trust signals, real-feeling quotes.',
    sections: {
      hero: [
        { text: '"4.9/5 on G2" is verifiable social proof', light: 'green', comment: 'I can check this claim. That makes me trust it.', ref: '4.9/5 on G2' },
        { text: '"2,400+ teams" with G2 backing', light: 'green', comment: 'Third-party validation is the strongest trust signal.', ref: '2,400+ teams' },
      ],
      features: [
        { text: '"SOC 2 from day one" addresses security concerns', light: 'green', comment: 'As a skeptic, seeing compliance certifications matters.', ref: 'SOC 2 from day one' },
      ],
      pricing: [
        { text: 'No money-back guarantee still missing', light: 'yellow', comment: 'I want a safety net before I commit my credit card.' },
      ],
      cta: [
        { text: 'Named testimonials with job titles', light: 'green', comment: '"Sarah K., Engineering Lead" — I can look this person up.' },
      ],
    },
  },

  'example:v2:sam': {
    score: 6,
    verdict: 'Better. Dark theme is easier on eyes in a dark subway car. Full-width buttons in pricing are easier to tap. But the page is still long for one-thumb scrolling.',
    shortVerdict: 'Dark theme, full-width buttons.',
    sections: {
      hero: [
        { text: 'Left-aligned content is thumb-reachable', light: 'green', comment: 'On a phone held in right hand, left-side content is easiest to read.' },
      ],
      features: [
        { text: 'Cards stack well on mobile', light: 'green', comment: 'Grid auto-fit handles narrow screens.' },
      ],
      pricing: [
        { text: 'Full-width buttons easier to tap', light: 'green', comment: 'The entire width of the card is a tap target.' },
      ],
      cta: [
        { text: 'Page is still very long for mobile scrolling', light: 'yellow', comment: 'Four full sections means a lot of thumb movement on a subway.' },
      ],
    },
  },

  'example:v2:maya': {
    score: 6,
    verdict: 'Better. Hero gets the point across faster. But I still need to scroll through 4 sections. The Most Popular badge saves me decision time on pricing though.',
    shortVerdict: 'Faster hero, still long page.',
    sections: {
      hero: [
        { text: '"Ship in 4 minutes" is scannable', light: 'green', comment: 'I get the point in 3 seconds. That is my budget.', ref: 'Ship your first feature in 4 minutes.' },
      ],
      features: [
        { text: 'Feature titles are benefit-focused', light: 'green', comment: 'I understand what I get without reading descriptions.' },
      ],
      pricing: [
        { text: 'Most Popular badge saves decision time', light: 'green', comment: 'I do not need to compare three tiers. Just pick the highlighted one.' },
      ],
      cta: [
        { text: 'Still too much to read in the CTA', light: 'yellow', comment: 'Two testimonials plus a paragraph. I have 10 seconds left.' },
      ],
    },
  },

  'example:v2:mike': {
    score: 7,
    verdict: 'The dark theme with gold accents looks premium in a screen share. Named testimonials add credibility when presenting to my team. Much more impressive than the purple version.',
    shortVerdict: 'Premium look for presentations.',
    sections: {
      hero: [
        { text: 'Dark theme looks impressive on a projector', light: 'green', comment: 'Dark backgrounds show well on conference room screens.' },
      ],
      features: [
        { text: 'Specific metrics ("40ms cold start") aid discussion', light: 'green', comment: 'My team can evaluate concrete claims, not vague promises.', ref: '40ms cold start' },
      ],
      pricing: [
        { text: 'Clear tier structure for team decision', light: 'green', comment: '"For growing teams" helps the team self-identify.' },
      ],
      cta: [
        { text: 'Testimonials from recognizable roles', light: 'green', comment: '"CTO" and "Engineering Lead" speak to my team composition.' },
      ],
    },
  },

  'example:v2:yuki': {
    score: 7,
    verdict: 'This has personality now. The dark theme with gold feels like someone made choices — not defaults. Monospace typeface is distinctive. Still could use more visual texture.',
    shortVerdict: 'Has personality, distinctive.',
    sections: {
      hero: [
        { text: 'Dark + gold palette is intentional', light: 'green', comment: 'This does not look like AI output. Someone chose this.' },
      ],
      features: [
        { text: 'Border-left accents add subtle visual interest', light: 'green', comment: 'Small details like colored borders show care.' },
      ],
      pricing: [
        { text: 'Could use more visual texture in cards', light: 'yellow', comment: 'The flat dark cards could benefit from subtle gradients or patterns.' },
      ],
      cta: [
        { text: 'Typography creates consistent mood', light: 'green', comment: 'Monospace throughout feels cohesive and intentional.' },
      ],
    },
  },

  'example:v2:dex': {
    score: 5,
    verdict: 'Has actual personality now. The dark theme and monospace font feel anti-establishment compared to every purple-gradient startup page. Still too corporate for my taste but way better.',
    shortVerdict: 'Has actual personality now.',
    sections: {
      hero: [
        { text: 'Dark theme feels anti-establishment', light: 'green', comment: 'Not another white page with purple gradients. This has edge.' },
      ],
      features: [
        { text: 'Monospace font has DIY energy', light: 'green', comment: 'Courier New on a landing page is a bold choice. I respect that.' },
      ],
      pricing: [
        { text: 'Still a three-tier SaaS pricing page', light: 'yellow', comment: 'The structure is still corporate. But at least it looks different.' },
      ],
      cta: [
        { text: 'Testimonials feel corporate', light: 'yellow', comment: 'Real quotes from named people are better but still feel polished.' },
      ],
    },
  },

  'example:v2:nora': {
    score: 7,
    verdict: 'Dark theme feels premium. Gold accents signal luxury without being gaudy. The monospace font is unexpected for a premium product but it works because it signals craftsmanship.',
    shortVerdict: 'Dark theme feels premium.',
    sections: {
      hero: [
        { text: 'Dark palette signals premium positioning', light: 'green', comment: 'Black and gold is the universal language of luxury.' },
      ],
      features: [
        { text: 'Restrained design shows confidence', light: 'green', comment: 'No visual clutter. Each element earns its space.' },
      ],
      pricing: [
        { text: 'Gold "Most Popular" badge feels premium', light: 'green', comment: 'The gold badge treatment makes Pro feel like the aspirational choice.' },
      ],
      cta: [
        { text: 'Could add more white space for breathing room', light: 'yellow', comment: 'Premium products let their content breathe more.' },
      ],
    },
  },
};
