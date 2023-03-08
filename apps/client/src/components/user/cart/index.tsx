import React, { useState } from 'react';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
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
  const [outOfStockItem, setOutOfStockItem] = useState('');

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
    <div className="max-w[400px] mx-auto space-y-2 px-5 md:max-w-[600px]">
      {outOfStockItem && (
        <Alert
          message={
            <div>
              <strong>&quot;{outOfStockItem}&quot;</strong> is out of stock now.
            </div>
          }
          type="error"
        />
      )}
      <div className="relative">
        <h1 className="text-center text-2xl">My Cart</h1>
        <span className="absolute left-[calc(50%+10ch)] top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-slate-200 p-1 text-sm shadow-sm">
          {items.length} Items
        </span>
      </div>
      {items.map(({ _id, name, photos, price, quantity, stock }) => (
        <div key={_id} className="flex items-center">
          <Image
            height={100}
            width={100}
            src={photos[0].secure_url}
            alt={name}
            className="rounded-lg"
            quality={50}
          />
          <div className="ml-4 flex-1 overflow-hidden">
            <h6 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg">{name}</h6>
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
                if (quantity + 1 === stock) setOutOfStockItem(name);

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
      <div className="flex justify-between py-2 text-center text-xl italic text-slate-700">
        <span>Total Price:&nbsp;</span>
        <span>{formatCurrency(amount)}</span>
      </div>
      <LinkButton
        href="/checkout"
        className="from-primary-600 to-primary-400 flex w-full whitespace-nowrap bg-gradient-to-r py-2 px-0 text-white">
        <ShoppingBagIcon className="mr-2 h-6 w-6" /> Proceed to Checkout
      </LinkButton>
    </div>
  );
};

export default Cart;
