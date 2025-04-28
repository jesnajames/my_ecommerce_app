import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShippingDetails } from './CheckoutPage';
import { createPaymentIntent } from '../../utils/stripeUtils';
import toast from 'react-hot-toast';

interface PaymentFormProps {
  shippingDetails: ShippingDetails;
  amount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  shippingDetails,
  amount,
  onPaymentSuccess
}) => {
    const { user } = useAuth();
    console.log(user);
    
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      console.log("shipping Details", shippingDetails)
      const { clientSecret } = await createPaymentIntent(amount, shippingDetails, user.id);

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
              email: shippingDetails.email,
              address: {
                line1: shippingDetails.address,
                city: shippingDetails.city,
                state: shippingDetails.state,
                postal_code: shippingDetails.zipCode,
              },
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'An error occurred');
        toast.error(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      setError('An error occurred while processing your payment');
      toast.error(err.message || 'Payment failed');
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
            ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
