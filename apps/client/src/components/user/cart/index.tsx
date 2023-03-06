import React from 'react';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import { IProduct, ICartStore } from '@store/cart';
import { LinkButton } from '@utils/Button';

interface ICart {
  items: IProduct[];
  actions: ICartStore['actions'];
  isCartEmpty: boolean;
}

const Cart = ({ items, actions, isCartEmpty }: ICart) => {
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
      {items.map(({ _id, name, photos, quantity }) => (
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
            <div>
              <span className="italic">Quantity:</span>
              <span className="ml-2">{quantity}</span>
            </div>
          </div>
          <div>
            <button onClick={() => actions.remove(_id)}>
              <MinusCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
      <LinkButton href="/checkout" className="bg-primary w-full text-white">
        Proceed to Checkout
      </LinkButton>
    </div>
  );
};

export default Cart;
