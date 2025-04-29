import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface OrderConfirmationProps {
  orderId: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-4">
        Your order has been successfully placed and will be processed shortly.
      </p>
      <p className="text-gray-600 mb-8">
        Order ID: <span className="font-semibold">{orderId}</span>
      </p>
      <div className="space-y-4">
        <button 
          className="btn-primary w-full"
          onClick={() => navigate(`/track-order/${orderId}`)}
        >
          Track Order
        </button>
        <button 
          className="btn-secondary w-full"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
