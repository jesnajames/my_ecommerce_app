import { Product } from './types/product';
import { v4 as uuidv4 } from 'uuid';

export const products: Product[] = [
  {
    id: uuidv4(),
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128
  },
  {
    id: uuidv4(),
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Electronics',
    rating: 4.3,
    reviews: 95
  },
  {
    id: uuidv4(),
    title: 'Premium Coffee Maker',
    description: 'Brew perfect coffee with this programmable coffee maker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: 203
  },
  {
    id: uuidv4(),
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable cotton t-shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    category: 'Clothing',
    rating: 4.4,
    reviews: 156
  },
  {
    id: uuidv4(),
    title: 'Professional DSLR Camera',
    description: 'High-end digital camera for professional photography',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    category: 'Electronics',
    rating: 4.8,
    reviews: 89
  },
  {
    id: uuidv4(),
    title: 'Yoga Mat',
    description: 'Non-slip exercise mat for yoga and fitness',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8',
    category: 'Sports & Fitness',
    rating: 4.6,
    reviews: 245
  },
  {
    id: uuidv4(),
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle for hot and cold beverages',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    category: 'Sports & Fitness',
    rating: 4.5,
    reviews: 178
  },
  {
    id: uuidv4(),
    title: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID protection',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    category: 'Accessories',
    rating: 4.3,
    reviews: 134
  },
  {
    id: uuidv4(),
    title: 'Smart LED TV',
    description: '55-inch 4K Ultra HD Smart TV',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1',
    category: 'Electronics',
    rating: 4.7,
    reviews: 312
  },
  {
    id: uuidv4(),
    title: 'Robot Vacuum Cleaner',
    description: 'Smart robot vacuum with mapping technology',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1590164409291-450e859ccb87',
    category: 'Home & Kitchen',
    rating: 4.4,
    reviews: 167
  },
  {
    id: uuidv4(),
    title: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
    category: 'Gaming',
    rating: 4.6,
    reviews: 198
  },
  {
    id: uuidv4(),
    title: 'Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
    category: 'Gaming',
    rating: 4.5,
    reviews: 245
  },
  {
    id: uuidv4(),
    title: 'Air Purifier',
    description: 'HEPA air purifier for clean indoor air',
    price: 199.99,
    image: 'https://media.istockphoto.com/id/1307151703/photo/aroma-oil-diffuser-on-chair-against-in-the-bedroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=MDQ7qdoGhif21cWwPXiVSrzIDP0jGTi45Fs6j3P4ftI=',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: 156
  },
  {
    id: uuidv4(),
    title: 'Running Shoes',
    description: 'Lightweight running shoes with cushioning',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Sports & Fitness',
    rating: 4.4,
    reviews: 289
  },
  {
    id: uuidv4(),
    title: 'Backpack',
    description: 'Water-resistant laptop backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Accessories',
    rating: 4.5,
    reviews: 167
  },
  {
    id: uuidv4(),
    title: 'Wireless Earbuds',
    description: 'True wireless earbuds with charging case',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605',
    category: 'Electronics',
    rating: 4.6,
    reviews: 234
  },
  {
    id: uuidv4(),
    title: 'Smart Door Lock',
    description: 'Keyless entry smart door lock',
    price: 199.99,
    image: 'https://plus.unsplash.com/premium_photo-1729574858839-5a145c914bac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjBkb29yJTIwbG9ja3xlbnwwfHwwfHx8MA%3D%3D',
    category: 'Smart Home',
    rating: 4.3,
    reviews: 145
  },
  {
    id: uuidv4(),
    title: 'Blender',
    description: 'High-speed blender for smoothies and more',
    price: 79.99,
    image: 'https://plus.unsplash.com/premium_photo-1666649675105-1750f2bcd692?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2Vob2xkJTIwYXBwbGlhbmNlc3xlbnwwfHwwfHx8MA%3D%3D',
    category: 'Home & Kitchen',
    rating: 4.5,
    reviews: 178
  },
  {
    id: uuidv4(),
    title: 'Denim Jeans',
    description: 'Classic fit denim jeans',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    category: 'Clothing',
    rating: 4.4,
    reviews: 223
  },
  {
    id: uuidv4(),
    title: 'Smart Thermostat',
    description: 'WiFi-enabled smart thermostat',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c21hcnQlMjBhcHBsaWFuY2V8ZW58MHx8MHx8fDA%3D',
    category: 'Smart Home',
    rating: 4.7,
    reviews: 156
  },
  {
    id: uuidv4(),
    title: 'Gaming Console',
    description: 'Next-gen gaming console',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f',
    category: 'Gaming',
    rating: 4.8,
    reviews: 345
  },
  {
    id: uuidv4(),
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad for smartphones',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1587749090881-1ea18126ab3a',
    category: 'Electronics',
    rating: 4.3,
    reviews: 189
  },
  {
    id: uuidv4(),
    title: 'Desk Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b',
    category: 'Furniture',
    rating: 4.6,
    reviews: 167
  },
  {
    id: uuidv4(),
    title: 'Smart Security Camera',
    description: 'WiFi security camera with night vision',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549109926-58f039549485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D',
    category: 'Smart Home',
    rating: 4.4,
    reviews: 198
  },
  {
    id: uuidv4(),
    title: 'Electric Toothbrush',
    description: 'Smart electric toothbrush with timer',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1553091844-4204b59e3661?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjB0b290aGJydXNofGVufDB8fDB8fHww',
    category: 'Personal Care',
    rating: 4.5,
    reviews: 234
  }
];