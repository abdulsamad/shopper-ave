import React, { useEffect, useState, FormEvent } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LockClosedIcon } from '@heroicons/react/24/solid';

import Button from '@utils/Button';
import Alert from '@utils/Alert';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      if (error instanceof Error) setError(error.message);
    } else {
      // Unexpedted errror occurred.
      setError('An unexpected error occurred!');
    }

    setIsLoading(false);
  };

  return (
    <div className="text-center">
      <h1 className="my-5 text-center text-xl">
        Pay with <span className="text-primary">Credit Card</span>
      </h1>
      <form onSubmit={handleSubmit}>
        {message && <Alert message={message} />}
        {error && <Alert message={error} type="error" />}
        <PaymentElement options={{ layout: 'tabs' }} />
        <Button
          type="submit"
          isLoading={isLoading}
          className="from-primary-600 to-primary-400 hover:bg-primary-500 my-6 flex w-full items-center bg-gradient-to-r py-2 uppercase text-white">
          <LockClosedIcon className="mr-2 h-6 w-6" />
          Pay Securely
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
