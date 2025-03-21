import React from 'react';
import { useCart } from '../../context/CartContext';

const OrderSummary: React.FC = () => {
  const { cart } = useCart();

  const shipping = 9.99;
  const tax = cart.total * 0.1; // 10% tax
  const finalTotal = cart.total + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Order Items ({cart.items.length})</h3>
        <div className="space-y-2">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>{item.product.title} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
