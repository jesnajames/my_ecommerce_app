import { v4 as uuidv4 } from 'uuid';
   
export interface Product {
  id: any; // Ensure ID is always string type
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

export type Category = string;
