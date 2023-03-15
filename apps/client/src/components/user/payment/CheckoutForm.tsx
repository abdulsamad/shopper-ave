import React, { useState, FormEvent } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LockClosedIcon } from '@heroicons/react/24/solid';

import Button from '@utils/Button';
import Alert from '@utils/Alert';
import { useCart } from '@store/index';
import { createOrder } from '@api/user';

interface ICheckoutForm {
  clientSecret: string;
}

const CheckoutForm = ({ clientSecret }: ICheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, amount, actions } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!stripe || !elements || !items || !amount) {
      return;
    }

    setIsLoading(true);

    // Create Order
    const {
      order: { _id, shippingInfo },
    } = await createOrder(items, {
      shippingInfo: {
        address: '124 Bombay',
        city: 'Peddar Road',
        country: 'India',
        phoneNo: '222333444',
        postalCode: '400001',
        state: 'Maharashtra',
      },
      paymentInfo: {
        id: clientSecret,
      },
      shippingAmount: 0,
      totalAmount: amount,
      taxAmount: 0,
    });

    // Empty cart
    actions.reset();

    // Confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          process.env.NEXT_PUBLIC_DOMAIN +
          `/success?orderId=${_id}&address=${shippingInfo.address}&city=${shippingInfo.city}&postalCode=${shippingInfo.postalCode}&state=${shippingInfo.state}&country=${shippingInfo.country}&amount=${amount}`,
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
