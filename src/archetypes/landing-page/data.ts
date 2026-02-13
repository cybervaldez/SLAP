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
  headline: 'Empower Your Team to Achieve More, Together',
  subheadline:
    'Our innovative, best-in-class platform leverages cutting-edge technology to seamlessly streamline your workflow, drive meaningful engagement, and deliver transformative results across every touchpoint in your organization\u2019s digital journey.',
  ctaPrimary: 'Start Your Journey',
  ctaSecondary: 'See the Difference',
};

export const faqItems: FAQItem[] = [
  {
    question: 'What makes your platform different from the competition?',
    answer:
      'Great question. Our platform is built from the ground up with a customer-first philosophy that prioritizes user experience, innovation, and scalability. We believe that the best products are the ones that just work \u2014 and we are confident that ours does.',
  },
  {
    question: 'How quickly can my team get started?',
    answer:
      'Getting started could not be easier. Our streamlined onboarding process has been optimized to minimize time-to-value and maximize your team\u2019s productivity from day one. Most teams are fully operational within minutes.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is not just a feature \u2014 it is a core pillar of everything we build. Our platform employs industry-leading encryption, SOC 2 compliance, and a zero-trust architecture that ensures your data is always protected. We take security seriously.',
  },
  {
    question: 'What if I need to scale?',
    answer:
      'We designed our platform with scalability as a foundational principle. Whether you are a team of five or an organization of five thousand, our infrastructure scales seamlessly to meet your evolving needs. Growing with you is what we do.',
  },
  {
    question: 'Do you really offer a free trial with no strings attached?',
    answer:
      'Absolutely. We are so confident in the value our platform delivers that we offer a full-featured 14-day trial with zero commitment. No credit card required, no hidden fees, no surprises. We believe the product speaks for itself.',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    features: [
      'Seamless onboarding experience',
      'Intuitive analytics dashboard',
      'World-class email support',
      'Robust API framework',
      'Industry-standard security',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$29',
    period: '/month',
    features: [
      'Everything in Starter, plus more',
      'Advanced AI-powered insights',
      'Priority white-glove support',
      'Seamless third-party integrations',
      'Collaborative team workspace',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Growth, elevated',
      'Bespoke solutions tailored to you',
      'Dedicated success partner',
      'Enterprise-grade compliance',
      'Custom SLA guarantees',
    ],
    highlighted: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Chief Innovation Officer',
    company: 'Synergy Labs',
    quote:
      'This platform completely revolutionized how we think about thinking about our workflow. Our team alignment went from good to incredible. We could not be more thrilled with the results.',
    avatarInitial: 'S',
  },
  {
    name: 'David K.',
    role: 'VP of Digital Transformation',
    company: 'NexusPoint',
    quote:
      'After evaluating numerous solutions in the space, we chose this platform and have never looked back. The impact on our bottom line has been significant and measurable.',
    avatarInitial: 'D',
  },
  {
    name: 'Priya R.',
    role: 'Head of Strategic Initiatives',
    company: 'Luminos Group',
    quote:
      'The seamless integration capabilities alone made this a game-changer for our organization. Our stakeholders were impressed from day one.',
    avatarInitial: 'P',
  },
  {
    name: 'Michael T.',
    role: 'Director of Operational Excellence',
    company: 'Pinnacle Systems',
    quote:
      'We saw a meaningful improvement in team productivity almost immediately. This platform truly understands the modern enterprise.',
    avatarInitial: 'M',
  },
];

export const emailSignup = {
  placeholder: 'Enter your email to get started',
  buttonText: 'Unlock Your Potential',
  successMessage: 'Welcome to the journey!',
};
