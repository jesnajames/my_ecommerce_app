import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/product';
import { Cart, CartItem } from '../types/cart';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };

    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }

    case 'REMOVE_FROM_CART': {
      const item = state.items.find(item => item.product.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        total: state.total - (item ? item.product.price * item.quantity : 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      let newTotal = 0;
      const newItems = state.items.map(item => {
        if (item.product.id === productId) {
          newTotal += item.product.price * quantity;
          return { ...item, quantity };
        }
        newTotal += item.product.price * item.quantity;
        return item;
      });

      return {
        ...state,
        items: newItems,
        total: newTotal
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;

    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      if (!cartItems) {
        dispatch({ type: 'LOAD_CART', payload: [] });
        return;
      }

      const formattedItems: CartItem[] = cartItems.map(item => ({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          description: item.description,
          author: item.author,
          condition: item.condition,
          stock: item.stock
        },
        quantity: item.quantity
      }));

      dispatch({ type: 'LOAD_CART', payload: formattedItems });
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) return;

    try {
      const { data: existingItems, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('id', product.id);

      if (checkError) {
        console.error('Error checking cart item:', checkError);
        return;
      }

      if (existingItems && existingItems.length > 0) {
        const existingItem = existingItems[0];
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('user_id', user.id)
          .eq('id', product.id);

        if (updateError) {
          console.error('Error updating cart item:', updateError);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            id: product.id,
            quantity: 1,
          });

        if (insertError) {
          console.error('Error adding to cart:', insertError);
          return;
        }
      }

      await loadCart();
    } catch (error) {
      console.error('Cart operation failed:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('id', productId);

      if (error) {
        console.error('Error removing from cart:', error);
        return;
      }

      await loadCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity === 0) {
        return removeFromCart(productId);
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('id', productId);

      if (error) {
        console.error('Error updating quantity:', error);
        return;
      }

      await loadCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing cart:', error);
        return;
      }

      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};