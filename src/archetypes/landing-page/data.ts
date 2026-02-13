export interface HeroData {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarInitial: string;
}

export const heroData: HeroData = {
  headline: 'Master the Art of the Perfectly Timed Fall',
  subheadline:
    'Our innovative, best-in-class academy leverages cutting-edge comedic methodology to seamlessly streamline your pratfall technique, drive meaningful audience engagement, and deliver transformative laughs across every touchpoint in your performer\u2019s journey.',
  ctaPrimary: 'Start Your Training',
  ctaSecondary: 'Watch the Reel',
};

export const faqItems: FAQItem[] = [
  {
    question: 'What makes your academy different from other comedy schools?',
    answer:
      'Great question. Our academy is built from the ground up with a performer-first philosophy that prioritizes comedic timing, physical commitment, and audience scalability. We believe that the best pratfalls are the ones that just land \u2014 and we are confident that ours do.',
  },
  {
    question: 'How quickly can my troupe get stage-ready?',
    answer:
      'Getting started could not be easier. Our streamlined onboarding process has been optimized to minimize time-to-laughter and maximize your troupe\u2019s comedic output from day one. Most performers are fully pratfall-certified within minutes.',
  },
  {
    question: 'Is my comedic integrity secure?',
    answer:
      'Artistic integrity is not just a feature \u2014 it is a core pillar of everything we teach. Our curriculum employs industry-leading timing frameworks, SOC 2 compliant joke structures, and a zero-hack architecture that ensures your material is always protected. We take comedy seriously.',
  },
  {
    question: 'What if I need to scale my act?',
    answer:
      'We designed our methodology with scalability as a foundational principle. Whether you are a solo act of one or an ensemble of five thousand, our techniques scale seamlessly to meet your evolving comedic needs. Growing your audience is what we do.',
  },
  {
    question: 'Do you really offer a free class with no strings attached?',
    answer:
      'Absolutely. We are so confident in the laughs our academy delivers that we offer a full-featured introductory masterclass with zero commitment. No credit card required, no hidden fees, no rubber chickens. We believe the pratfall speaks for itself.',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Opener',
    price: '$9',
    period: '/month',
    features: [
      'Seamless pratfall onboarding',
      'Intuitive timing analytics dashboard',
      'World-class heckling support',
      'Robust slapstick framework',
      'Industry-standard pie delivery',
    ],
    highlighted: false,
  },
  {
    name: 'Headliner',
    price: '$29',
    period: '/month',
    features: [
      'Everything in Opener, plus more',
      'Advanced AI-powered timing insights',
      'Priority green room support',
      'Seamless ensemble integrations',
      'Collaborative writers\u2019 room workspace',
    ],
    highlighted: true,
  },
  {
    name: 'Legendary',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Headliner, elevated',
      'Bespoke routines tailored to you',
      'Dedicated comedy success partner',
      'Legendary-grade audience compliance',
      'Custom SLA(P) guarantees',
    ],
    highlighted: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Chief Comedy Officer',
    company: 'Synergy Laughs',
    quote:
      'This academy completely revolutionized how we think about thinking about our comedic workflow. Our troupe alignment went from good to incredible. We could not be more thrilled with the pratfalls.',
    avatarInitial: 'S',
  },
  {
    name: 'David K.',
    role: 'VP of Comedic Transformation',
    company: 'NexusPunchline',
    quote:
      'After evaluating numerous comedy schools in the space, we chose this academy and have never looked back. The impact on our laugh line has been significant and measurable.',
    avatarInitial: 'D',
  },
  {
    name: 'Priya R.',
    role: 'Head of Strategic Hilarity',
    company: 'Luminos Gag Group',
    quote:
      'The seamless ensemble integration capabilities alone made this a game-changer for our organization. Our audience members were impressed from joke one.',
    avatarInitial: 'P',
  },
  {
    name: 'Michael T.',
    role: 'Director of Operational Comedy',
    company: 'Pinnacle Punchlines',
    quote:
      'We saw a meaningful improvement in audience laughter almost immediately. This academy truly understands the modern comedy enterprise.',
    avatarInitial: 'M',
  },
];

export const emailSignup = {
  placeholder: 'Enter your email to get started',
  buttonText: 'Unlock Your Punchline',
  successMessage: 'Welcome to the stage!',
};
