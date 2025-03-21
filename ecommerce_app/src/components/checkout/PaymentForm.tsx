import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShippingDetails } from './CheckoutPage';

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

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          shipping: shippingDetails,
        }),
      });

      const { clientSecret } = await response.json();

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
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (err) {
      setError('An error occurred while processing your payment');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>

      <div className="bg-gray-50 p-6 rounded-lg">
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
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`btn-primary w-full ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
