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
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    rating: 5,
  },
  {
    id: 'prod-2',
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    rating: 4,
  },
  {
    id: 'prod-3',
    name: 'Cotton T-Shirt',
    price: 24.99,
    category: 'Clothing',
    description: 'Soft organic cotton crew-neck t-shirt available in multiple colors.',
    rating: 4,
  },
  {
    id: 'prod-4',
    name: 'Denim Jacket',
    price: 89.99,
    category: 'Clothing',
    description: 'Classic denim jacket with a modern slim fit and brass buttons.',
    rating: 5,
  },
  {
    id: 'prod-5',
    name: 'Leather Wallet',
    price: 49.99,
    category: 'Accessories',
    description: 'Genuine leather bifold wallet with RFID-blocking technology.',
    rating: 4,
  },
  {
    id: 'prod-6',
    name: 'Sunglasses',
    price: 129.99,
    category: 'Accessories',
    description: 'Polarized UV400 sunglasses with lightweight titanium frame.',
    rating: 3,
  },
  {
    id: 'prod-7',
    name: 'Ceramic Vase',
    price: 34.99,
    category: 'Home',
    description: 'Hand-crafted ceramic vase with a matte finish, perfect for fresh flowers.',
    rating: 5,
  },
  {
    id: 'prod-8',
    name: 'Scented Candle Set',
    price: 19.99,
    category: 'Home',
    description: 'Set of 3 soy wax candles in lavender, vanilla, and sandalwood.',
    rating: 4,
  },
];
