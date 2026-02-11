export interface BrandAssessment {
  headline: string;
  assessment: string;
  strengths: string[];
  concerns: string[];
}

const brandAssessments: Record<string, BrandAssessment> = {
  'landing-page:brutalist': {
    headline: 'Raw authority, zero warmth',
    assessment:
      'This variation commands attention through sheer typographic force — 900-weight uppercase headlines on stark white deliver undeniable hierarchy. The monospace testimonials and thick 3-4px borders reinforce an uncompromising aesthetic. However, the red-only CTA palette and total absence of softening elements may repel audiences who need approachability alongside authority.',
    strengths: [
      'High-contrast black-on-white ensures instant readability',
      'Typography hierarchy is decisive — 900 weight headlines leave no doubt',
      'Zero radius, zero shadows creates a distinctive anti-design signature',
      'Red #FF0000 CTAs are impossible to miss against the white field',
    ],
    concerns: [
      'Red-only CTAs lack brand warmth and feel like warning signals',
      'Monospace body text limits comfortable reading at scale',
      'No visual softness anywhere may read as hostile rather than bold',
      'Thick borders everywhere compete with content for attention',
    ],
  },

  'landing-page:neo-minimal': {
    headline: 'Calm confidence, borderline invisible',
    assessment:
      'The light gray background with blue (#2563EB) accent creates a restrained, professional impression. Ultra-light weight 200-300 typography whispers rather than shouts, and the 4px radius softens without being playful. Dot navigation and +/- FAQ toggles show design restraint. The risk is that scale(1.01) hovers and subtle styling make interactive elements nearly invisible.',
    strengths: [
      'Blue accent on light gray is clean and universally professional',
      'Dot navigation is unobtrusive and space-efficient',
      '+/- FAQ toggles are minimal yet clearly interactive',
      'Consistent 4px radius creates visual cohesion without excess',
    ],
    concerns: [
      'Weight 200-300 type may feel too delicate for confident messaging',
      'scale(1.01) hover is so subtle users may miss interactive affordance',
      'Light gray background with light typography could feel washed out',
      'Minimal palette risks blending in with every other SaaS landing page',
    ],
  },

  'landing-page:maximalist': {
    headline: 'Unforgettable energy, chaotic brand signal',
    assessment:
      'Navy (#1B1F3B), coral (#FF6B6B), and gold (#D4A574) create a rich, layered palette that demands attention. Georgia serif headlines mixed with sans-serif body establish typographic personality. The 3-column grid with large shadows, rotation hovers, and decorative circles deliver maximum visual richness. But the sheer density of styling choices may dilute any single brand message.',
    strengths: [
      'Three-color palette (navy, coral, gold) is distinctive and memorable',
      'Serif headlines in Georgia add editorial authority and warmth',
      'Decorative circles and large shadows create visual depth and personality',
      'Rotation hover effects signal playful confidence',
    ],
    concerns: [
      'Navy + coral + gold is a lot of personality — could overwhelm the message',
      'Rotation hovers on cards may feel disorienting rather than delightful',
      'Large shadows on a 3-column grid creates visual heaviness',
      'Decorative circles risk feeling arbitrary without clear brand meaning',
    ],
  },

  'landing-page:dark-industrial': {
    headline: 'Terminal authority, zero approachability',
    assessment:
      'Near-black (#0A0A0F) background with charcoal cards and gold (#D4A574) accents creates a developer-tool aesthetic. Monospace everything with terminal-style > prefixes and [+] toggles commits fully to the industrial metaphor. Gold glow hovers reinforce the premium-tech positioning. The trade-off is a UI that feels like infrastructure tooling rather than a welcoming product.',
    strengths: [
      'Gold accent on near-black feels premium and technically credible',
      'Terminal-style > prefixes create an unmistakable brand voice',
      '[+] toggles are clever and consistent with the industrial metaphor',
      'Monospace typography with charcoal cards reads as engineered precision',
    ],
    concerns: [
      'Near-black background alienates non-technical audiences immediately',
      'Monospace everything sacrifices readability for aesthetic commitment',
      'Gold glow hovers on dark may feel like a hacker terminal, not a product',
      'Zero warm elements make conversion-focused messaging feel cold',
    ],
  },

  'landing-page:warm-organic': {
    headline: 'Approachable and human, potentially too soft',
    assessment:
      'Cream (#FDF6EE) background with forest green and warm brown creates an immediately trustworthy, natural feel. Serif headlines with 16px radius and blob gradients deliver softness at every touchpoint. Emoji features and bouncy easing add playful personality. The concern is whether this much warmth undermines perception of technical capability or seriousness.',
    strengths: [
      'Cream background with earth tones feels welcoming and trustworthy',
      'Serif headlines add editorial warmth and gravitas',
      '16px radius and blob gradients create a distinctly organic identity',
      'Bouncy easing and emoji features inject genuine personality',
    ],
    concerns: [
      'Emoji in features list may undercut professional perception',
      'Bouncy easing could feel juvenile for enterprise audiences',
      'Warm brown + forest green palette may read as a wellness brand, not tech',
      'Blob gradients add visual complexity without clear information purpose',
    ],
  },

  'landing-page:retro-futurism': {
    headline: 'Maximum spectacle, maximum risk',
    assessment:
      'Dark (#0F0B1A) background with teal, purple, and pink neon gradients creates a cinematic, immersive experience. Gradient text-clip effects and glow shadows push CSS to its limits for visual impact. Gradient borders at max saturation deliver a vaporwave aesthetic that is instantly recognizable. The risk is that this level of visual intensity overwhelms the content and alienates anyone outside the target aesthetic tribe.',
    strengths: [
      'Neon gradient palette is instantly recognizable and unforgettable',
      'Gradient text-clip effects demonstrate technical craft and ambition',
      'Glow shadows create depth and atmosphere on the dark canvas',
      'Maximum saturation and motion signal boldness and creative confidence',
    ],
    concerns: [
      'Teal/purple/pink neon may alienate conservative or enterprise audiences',
      'Gradient borders and glow effects compete with content for attention',
      'Max saturation and motion could trigger discomfort or fatigue',
      'Dark background with heavy glow effects drains device batteries',
    ],
  },
};

export function getBrandAssessment(
  slug: string,
  variationId: string,
): BrandAssessment | undefined {
  return brandAssessments[`${slug}:${variationId}`];
}
