import React from 'react';
import type { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '@utils/index';

const Success: NextPage = () => {
  const params = useSearchParams();
  const paymentIntent = params.get('payment_intent');
  const paymentIntentClient = params.get('payment_intent_client_secret');
  const redirectStatus = params.get('redirect_status');
  const orderId = params.get('orderId');
  const address = params.get('address');
  const city = params.get('city');
  const postalCode = params.get('postalCode');
  const state = params.get('state');
  const country = params.get('country');
  const amount = params.get('amount');

  if (!paymentIntent || !paymentIntentClient || !amount) return null;

  return (
    <section className="flex-1 p-5">
      {redirectStatus === 'succeeded' ? (
        <>
          <div className="py-10 text-center">
            <span className="bg-success inline-block rounded-full p-1">
              <CheckIcon className="h-8 w-8 text-white" />
            </span>
            <h1 className="my-3 text-xl font-bold">Order Placed!</h1>
            <h2 className="">
              Thank you for your order, you will receive it in{' '}
              <span className="font-bold">few days</span>
            </h2>
          </div>
          <h3 className="text-center text-2xl">Order Details</h3>
          <div className="mx-auto my-5 flex max-w-[500px] flex-col space-y-3 border border-solid border-slate-100 p-5 text-center shadow-lg">
            <div>
              <div className="mb-1 font-semibold">Order ID</div>
              <div className="select-all italic text-slate-500">#{orderId}</div>
            </div>
            <div>
              <div className="mb-1 font-semibold">Order Amount</div>
              <div className="select-all text-lg text-slate-500">{formatCurrency(~~amount)}</div>
            </div>
            <div>
              <div className="mb-1 font-semibold">Address</div>
              <address className="max-w[450px] text-slate-500">
                {address} <br />
                {city}, {postalCode} <br />
                {state}, {country}
              </address>
            </div>
          </div>
        </>
      ) : (
        <div className="py-10 text-center">
          <span className="bg-danger inline-block rounded-full p-1">
            <XMarkIcon className="h-8 w-8 text-white" />
          </span>
          <h1 className="my-3 text-xl font-bold">Order Not Placed!</h1>
          <h2 className="">Sorry! Something went wrong.</h2>
        </div>
      )}
    </section>
  );
};

export default Success;
