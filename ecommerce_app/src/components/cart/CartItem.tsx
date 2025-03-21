import React from 'react';
import { CartItem as CartItemType } from '../../types/cart';
import { FaTrash } from 'react-icons/fa';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <img 
        src={item.product.image} 
        alt={item.product.title}
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold">{item.product.title}</h3>
        <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <select
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(Number(e.target.value))}
          className="input-field w-20"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        
        <button 
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
