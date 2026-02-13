export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Props' | 'Costumes' | 'Gags' | 'Sets';
  description: string;
  rating: number;
}

export const categories = ['Props', 'Costumes', 'Gags', 'Sets'] as const;

export const categoryColors: Record<string, string> = {
  Props: '#3B82F6',
  Costumes: '#8B5CF6',
  Gags: '#F59E0B',
  Sets: '#10B981',
};

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Professional-Grade Banana Peel',
    price: 12.99,
    category: 'Props',
    description: 'Experience physical comedy the way it was meant to be performed. This industry-leading banana peel features our proprietary SlipShield\u2122 technology, delivering an unprecedented 30-foot slide radius of consistent, crystal-clear pratfall trajectory that redefines what premium slapstick equipment can be.',
    rating: 5,
  },
  {
    id: 'prod-2',
    name: 'Intelligent Timing Metronome',
    price: 199.99,
    category: 'Props',
    description: 'More than a metronome \u2014 a comedy revolution. This innovative device leverages cutting-edge comedic timing sensors and AI-powered punchline prediction to transform your daily performance practice. Beat detection, pause analysis, and over 50 timing templates seamlessly integrated into one elegant package.',
    rating: 4,
  },
  {
    id: 'prod-3',
    name: 'Essential Oversized Checkered Trousers',
    price: 24.99,
    category: 'Costumes',
    description: 'Crafted with meticulous attention to comedic detail from 100% premium organic cotton, these oversized trousers represent the perfect intersection of physical comedy and sustainability. Available in a thoughtfully curated palette of checks, each pair is designed to elevate your everyday pratfall routine.',
    rating: 4,
  },
  {
    id: 'prod-4',
    name: 'Heritage Squirting Flower Lapel',
    price: 89.99,
    category: 'Costumes',
    description: 'A timeless gag reimagined for the modern comedian. This carefully constructed squirting flower features a contemporary slim reservoir, artisanal brass nozzle hardware, and a versatile spray pattern that only gets funnier with repetition. An investment piece that tells your audience everything they need to know.',
    rating: 5,
  },
  {
    id: 'prod-5',
    name: 'Artisan Whoopee Cushion',
    price: 49.99,
    category: 'Gags',
    description: 'Where traditional craftsmanship meets modern comedic innovation. This genuine rubber whoopee cushion features state-of-the-art acoustic engineering seamlessly integrated into a classic design. Thin enough for any chair, resonant enough for any boardroom.',
    rating: 4,
  },
  {
    id: 'prod-6',
    name: 'Precision-Engineered Joy Buzzer',
    price: 129.99,
    category: 'Gags',
    description: 'Engineered for those who refuse to compromise on handshake comedy. This precision-crafted joy buzzer combines military-grade vibration motors with an ultra-lightweight titanium housing, delivering unparalleled shock and delight. Surprise the world the way it deserves to be surprised.',
    rating: 3,
  },
  {
    id: 'prod-7',
    name: 'Artisan Breakaway Chair',
    price: 34.99,
    category: 'Sets',
    description: 'Each piece is a unique expression of destructive artisanal excellence. Hand-crafted by skilled prop artisans using time-honored balsa wood techniques, this breakaway chair brings a touch of curated mayhem to any stage. No two breaks are exactly alike \u2014 because your pratfall deserves better than mass production.',
    rating: 5,
  },
  {
    id: 'prod-8',
    name: 'Curated Foam Brick Collection',
    price: 19.99,
    category: 'Sets',
    description: 'Transform your stage, transform your act. This thoughtfully curated trio of premium foam bricks \u2014 red for dramatic impact, gray for realism, white for versatility \u2014 creates a multi-sensory throwing experience that elevates your everyday slapstick moments into intentional rituals of comedic excellence.',
    rating: 4,
  },
];
