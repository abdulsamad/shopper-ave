import React, { useState, FormEvent, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LockClosedIcon } from '@heroicons/react/24/solid';

import { User } from 'shared-types';

import Button from '@utils/Button';
import Alert from '@utils/Alert';
import { useCart } from '@store/index';
import { IProduct } from '@store/cart';
import { createOrder } from '@api/user';

interface ICheckoutForm {
  clientSecret: string;
  items: IProduct[];
  amount: number;
  user: User;
}

const CheckoutForm = ({ clientSecret, items, amount, user }: ICheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();
  const params = useSearchParams();
  const { actions } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();

      const addressId = params.get('id');
      const phoneNo = params.get('phone');

      if (
        !stripe ||
        !elements ||
        !items ||
        !amount ||
        !user ||
        !user.addresses ||
        !phoneNo ||
        !addressId
      ) {
        return null;
      }

      setIsLoading(true);

      const selectedAddress = user.addresses.find((item) => item._id === addressId);

      if (!selectedAddress) return null;

      const { address, city, country, postalCode, state } = selectedAddress;

      // Create Order
      const {
        order: { _id, shippingInfo },
      } = await createOrder(items, {
        shippingInfo: {
          address,
          city,
          country,
          phoneNo,
          postalCode,
          state,
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
    },
    [actions, amount, clientSecret, elements, items, stripe, user]
  );

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
