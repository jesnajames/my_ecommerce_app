import React, { useState } from 'react';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderConfirmation from './OrderConfirmation';
import { useCart } from '../../context/CartContext';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { cart, clearCart } = useCart();

  const handleShippingSubmit = (details: ShippingDetails) => {
    setShippingDetails(details);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setOrderId(paymentIntentId);
    setCurrentStep('confirmation');
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Checkout Progress */}
        <div className="flex items-center justify-center mb-8">
          {['shipping', 'payment', 'confirmation'].map((step, index) => (
            <React.Fragment key={step}>
              <div className={`flex items-center ${currentStep === step ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep === step ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                  {index + 1}
                </div>
                <span className="ml-2 capitalize">{step}</span>
              </div>
              {index < 2 && (
                <div className="w-24 h-1 mx-4 bg-gray-200">
                  <div className={`h-full bg-blue-600 transition-all ${
                    ['shipping', 'payment', 'confirmation'].indexOf(currentStep) > index ? 'w-full' : 'w-0'
                  }`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 'shipping' && (
          <ShippingForm onSubmit={handleShippingSubmit} />
        )}

        {currentStep === 'payment' && shippingDetails && (
          <PaymentForm 
            shippingDetails={shippingDetails}
            amount={cart.total}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentStep === 'confirmation' && orderId && (
          <OrderConfirmation orderId={orderId} />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
