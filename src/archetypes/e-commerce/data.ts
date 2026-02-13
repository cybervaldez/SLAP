export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Electronics' | 'Clothing' | 'Accessories' | 'Home';
  description: string;
  rating: number;
}

export const categories = ['Electronics', 'Clothing', 'Accessories', 'Home'] as const;

export const categoryColors: Record<string, string> = {
  Electronics: '#3B82F6',
  Clothing: '#8B5CF6',
  Accessories: '#F59E0B',
  Home: '#10B981',
};

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'Experience audio the way it was meant to be heard. These industry-leading wireless headphones feature our proprietary NoiseShield\u2122 technology, delivering an unprecedented 30 hours of immersive, crystal-clear sound that redefines what premium listening can be.',
    rating: 5,
  },
  {
    id: 'prod-2',
    name: 'Intelligent Fitness Companion',
    price: 199.99,
    category: 'Electronics',
    description: 'More than a watch \u2014 a lifestyle revolution. This innovative wearable leverages cutting-edge biometric sensors and AI-powered insights to transform your daily wellness journey. Heart rate, GPS, sleep tracking, and over 50 workout modes seamlessly integrated into one elegant package.',
    rating: 4,
  },
  {
    id: 'prod-3',
    name: 'Essential Cotton Crew-Neck',
    price: 24.99,
    category: 'Clothing',
    description: 'Crafted with meticulous attention to detail from 100% premium organic cotton, this crew-neck represents the perfect intersection of comfort and sustainability. Available in a thoughtfully curated palette of colors, each piece is designed to elevate your everyday wardrobe.',
    rating: 4,
  },
  {
    id: 'prod-4',
    name: 'Heritage Denim Jacket',
    price: 89.99,
    category: 'Clothing',
    description: 'A timeless silhouette reimagined for the modern individual. This carefully constructed denim jacket features a contemporary slim fit, artisanal brass hardware, and a versatile wash that only gets better with age. An investment piece that tells your story.',
    rating: 5,
  },
  {
    id: 'prod-5',
    name: 'Artisan Leather Bifold',
    price: 49.99,
    category: 'Accessories',
    description: 'Where traditional craftsmanship meets modern innovation. This genuine leather bifold wallet features state-of-the-art RFID-blocking technology seamlessly integrated into a classic design. Slim enough for your front pocket, spacious enough for your entire life.',
    rating: 4,
  },
  {
    id: 'prod-6',
    name: 'Precision Polarized Sunglasses',
    price: 129.99,
    category: 'Accessories',
    description: 'Engineered for those who refuse to compromise. These precision-crafted sunglasses combine military-grade UV400 polarized lenses with an ultra-lightweight titanium frame, delivering unparalleled clarity and comfort. See the world the way it deserves to be seen.',
    rating: 3,
  },
  {
    id: 'prod-7',
    name: 'Artisan Ceramic Vessel',
    price: 34.99,
    category: 'Home',
    description: 'Each piece is a unique expression of artisanal excellence. Hand-crafted by skilled artisans using time-honored techniques, this matte-finish ceramic vessel brings a touch of curated sophistication to any space. No two pieces are exactly alike \u2014 because your home deserves better than mass production.',
    rating: 5,
  },
  {
    id: 'prod-8',
    name: 'Curated Aromatherapy Collection',
    price: 19.99,
    category: 'Home',
    description: 'Transform your space, transform your mindset. This thoughtfully curated trio of premium soy wax candles \u2014 lavender for tranquility, vanilla for warmth, sandalwood for grounding \u2014 creates a multi-sensory experience that elevates your everyday moments into intentional rituals of self-care.',
    rating: 4,
  },
];
