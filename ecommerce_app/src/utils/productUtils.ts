import { supabase } from '../lib/supabase';
import { products } from '../mockData';
import { Product } from '../types/product';

export const insertProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews
      })));

    if (error) {
      console.error('Error inserting products:', error);
      return false;
    }

    console.log('Products inserted successfully:', data);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export const fetchProducts = async (category?: string | null): Promise<Product[]> => {
  try {
    let query = supabase.from('products').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data as Product[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data as Product;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};