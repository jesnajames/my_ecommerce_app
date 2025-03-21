import React from 'react';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex items-center py-4 border-b">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.product.title}</h3>
                      <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaPlus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">${cart.total.toFixed(2)}</span>
                </div>
                <button 
                  className="btn-primary w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
