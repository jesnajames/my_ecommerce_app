import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBox, FaShippingFast, FaCheckCircle, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  status: string;
  created_at: string;
  amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shippin_country: string;
  shipping_postal_code: string;
}

interface UserProfile {
  full_name: string;
  phone: string;
}

const TrackOrder: React.FC = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderAndProfile = async () => {
      if (!user || !orderId) return;

      try {
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (orderError || !orderData) {
          console.error('Error fetching order:', orderError);
          navigate('/orders');
          return;
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, phone')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setUserProfile(profileData);
        }

        setOrder(orderData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchOrderAndProfile();
  }, [orderId, user, navigate]);

  const getStatusStep = () => {
    if (!order) return 0;
    switch (order.status) {
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-center text-gray-600">Order not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Track Order</h1>
      
      {userProfile && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <h2 className="font-semibold">Customer Details</h2>
          </div>
          <p className="text-gray-600">{userProfile.full_name}</p>
          <p className="text-gray-600">{userProfile.phone}</p>
        </div>
      )}

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <h2 className="font-semibold">Shipping Address</h2>
        </div>
        <p className="text-gray-600">{order.shipping_address}</p>
        <p className="text-gray-600">
          {order.shipping_city || "Bengaluru"}, {order.shipping_state || "Karnataka"} {order.shipping_postal_code || "560103"}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">Order ID: {orderId}</p>
        <p className="text-gray-600">
          Ordered on: {new Date(order.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Total Amount: ${order.amount?.toFixed(2)}
        </p>
      </div>

      <div className="relative">
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusStep() >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <FaBox className="text-white" />
            </div>
            <span className="text-sm mt-2">Processing</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusStep() >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <FaShippingFast className="text-white" />
            </div>
            <span className="text-sm mt-2">Shipped</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusStep() >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}>
              <FaCheckCircle className="text-white" />
            </div>
            <span className="text-sm mt-2">Delivered</span>
          </div>
        </div>
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(getStatusStep() - 1) * 50}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-semibold mb-2">Current Status</h2>
        <p className="text-gray-600 capitalize">{order.status}</p>
      </div>

      <button 
        className="btn-secondary mt-6 w-full"
        onClick={() => navigate('/orders')}
      >
        Back to Orders
      </button>
    </div>
  );
};

export default TrackOrder;
