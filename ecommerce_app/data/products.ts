import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    price: 299.99,
    description: 'Premium wireless headphones with active noise cancellation',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    rating: 4.5,
    reviews: 2456
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    price: 399.99,
    description: 'Latest smartwatch with health tracking features',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a',
    category: 'Electronics',
    rating: 4.7,
    reviews: 1823
  },
  // Add more products as needed
];
