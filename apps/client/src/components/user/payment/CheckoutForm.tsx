import React, { useEffect, FormEvent } from 'react';
import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LockClosedIcon } from '@heroicons/react/24/outline';

import Button from '@utils/Button';

interface ICheckoutForm {
  amount: number;
}

const CheckoutForm = ({ amount }: ICheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;

      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const card = elements?.getElement(CardElement);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_DOMAIN,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      // setError(error.message)
    } else {
      // Unexpedted errror occurred.
    }

    setIsLoading(false);
  };

  return (
    <div className="text-center">
      <h1 className="my-5 text-center text-xl">
        Pay with <span className="text-primary">Credit Card</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <PaymentElement options={{ layout: 'tabs' }} />
        <Button
          type="submit"
          isLoading={isLoading}
          className="bg-primary my-3 flex items-center py-2 text-lg uppercase text-white">
          <LockClosedIcon className="mr-2 h-6 w-6" />
          Pay Securely
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
