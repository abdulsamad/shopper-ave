import React, { FormEvent } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Button from '@utils/Button';
import { capturePayment } from '@api/user';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const card = elements?.getElement(CardElement);

    const capture = await capturePayment(78);

    if (elements == null || stripe == null || card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    console.log({ paymentMethod, error });
  };

  return (
    <div className="text-center">
      <h1 className="my-5 text-center text-xl">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ iconStyle: 'solid' }} />
        <Button type="submit" className="bg-primary my-3 text-white">
          Pay
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
