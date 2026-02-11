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
  headline: 'Ship beautiful products faster than ever',
  subheadline:
    'The modern platform that helps teams design, build, and launch world-class digital experiences with confidence.',
  ctaPrimary: 'Request a Demo',
  ctaSecondary: 'Learn More',
};

export const faqItems: FAQItem[] = [
  {
    question: 'How does the 14-day free trial work?',
    answer:
      'You get full access to all features for 14 days with no credit card required. At the end of the trial you can choose a plan that fits your needs or continue with our free tier.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Is there a limit on team members?',
    answer:
      'The Starter plan supports up to 5 team members. The Pro plan supports up to 25, and the Enterprise plan offers unlimited seats along with advanced role-based permissions.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes. If you are not satisfied within the first 30 days of a paid plan we will issue a full refund, no questions asked.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'All plans include email support with a 24-hour response time. Pro plans add live chat during business hours, and Enterprise customers receive a dedicated account manager with priority SLA.',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    features: [
      'Up to 5 team members',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      'API access',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: [
      'Up to 25 team members',
      '100 GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: [
      'Unlimited team members',
      '1 TB storage',
      'Enterprise analytics',
      'Dedicated account manager',
      'SSO & audit logs',
    ],
    highlighted: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'VP of Product',
    company: 'Luminary Inc.',
    quote:
      'This platform transformed how our team collaborates. We shipped our last release two weeks ahead of schedule.',
    avatarInitial: 'S',
  },
  {
    name: 'Marcus Rivera',
    role: 'Engineering Lead',
    company: 'NovaTech',
    quote:
      'The developer experience is outstanding. Our onboarding time dropped from days to hours after switching.',
    avatarInitial: 'M',
  },
  {
    name: 'Aisha Patel',
    role: 'Head of Design',
    company: 'Craft Studio',
    quote:
      'Finally a tool that designers and developers both love. The handoff process is seamless.',
    avatarInitial: 'A',
  },
  {
    name: 'James Okonkwo',
    role: 'CTO',
    company: 'ScaleForge',
    quote:
      'We evaluated a dozen platforms before choosing this one. Best decision we made all year.',
    avatarInitial: 'J',
  },
];

export const emailSignup = {
  placeholder: 'Enter your email address',
  buttonText: 'Get Early Access',
  successMessage: 'Thanks for signing up!',
};
