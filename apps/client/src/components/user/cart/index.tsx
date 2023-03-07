import React from 'react';
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { IProduct, ICartStore } from '@store/cart';
import Button, { LinkButton } from '@utils/Button';
import { formatCurrency } from '@utils/index';
import Alert from '@utils/Alert';

interface ICart {
  items: IProduct[];
  actions: ICartStore['actions'];
  isCartEmpty: boolean;
  amount: number;
}

const Cart = ({ items, actions, isCartEmpty, amount }: ICart) => {
  if (isCartEmpty) {
    return (
      <div className="p-5 text-center">
        <h6 className="mt-5 mb-3">Your cart is empty!</h6>
        <LinkButton href="/" className="bg-secondary text-white">
          Shop now
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[500px] space-y-2 p-5">
      {items.map(({ _id, name, photos, price, quantity, stock }) => (
        <div key={_id} className="flex items-center">
          <Image
            height={100}
            width={100}
            src={photos[0].secure_url}
            alt={name}
            className="rounded-lg "
          />
          <div className="ml-4 flex-1">
            <h6 className="text-lg">{name}</h6>
            <div className="text-sm">
              <span className="italic">Price:</span>
              <span className="ml-2">{formatCurrency(price)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              disabled={quantity === 1}
              className="disabled:text-slate-400"
              onClick={() => {
                if (!quantity) return;

                actions.updateQuantity(_id, quantity - 1);
              }}>
              <MinusCircleIcon className="h-6 w-6" />
            </button>
            <span className="bg-primary-100 mx-2 rounded-lg px-2 py-1 text-lg">{quantity}</span>
            <button
              type="button"
              disabled={quantity === stock}
              className="disabled:text-slate-400"
              onClick={() => {
                if (!quantity) return;

                actions.updateQuantity(_id, quantity + 1);
              }}>
              <PlusCircleIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="ml-2">
            <Button type="button" className="bg-slate-100 px-1">
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="text-center text-xl font-bold">
        <span>Total Price:&nbsp;</span>
        {formatCurrency(amount)}
      </div>
      <div className="py-2">
        <LinkButton
          href="/checkout"
          className="from-primary-600 to-primary-400 w-full bg-gradient-to-r text-white  ">
          <ShoppingBagIcon className="mr-2 h-6 w-6" /> Proceed to Checkout
        </LinkButton>
      </div>
    </div>
  );
};

export default Cart;
