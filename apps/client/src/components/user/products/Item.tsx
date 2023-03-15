import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Product as IProduct } from 'shared-types';

import { formatCurrency } from '@utils/index';
import { useCart } from '@store/index';
import Button from '@utils/Button';

const Item = (product: IProduct) => {
  const router = useRouter();

  const { _id, name, category, photos, price } = product;
  const { actions, items: cartItems } = useCart();
  const isAddedToCart = cartItems.some((item) => item._id === _id);

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl shadow">
      <Link className="flex h-full flex-col" href={`/product/${encodeURIComponent(_id)}`}>
        <div className="relative h-[250px] w-full lg:h-[400px]">
          <Image src={photos[0].secure_url} alt={name} className="mx-auto object-cover" fill />
        </div>
        <div className="bg-gray-100 p-4">
          <h3 className="text-lg font-light">{name}</h3>
          <h4 className="text-sm capitalize text-gray-400">{category}</h4>
          <h5 className="text-bold my-2 font-semibold">{formatCurrency(price)}</h5>
        </div>
      </Link>
      {isAddedToCart ? (
        <div className="flex">
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-slate-200 to-slate-300 p-2 text-slate-500">
            Added to Cart
          </Button>
        </div>
      ) : (
        <div className="flex">
          <Button
            type="button"
            onClick={async (ev) => {
              ev.stopPropagation();
              actions.reset();
              await actions.add(product);
              router.push('/checkout');
            }}
            className="w-1/2 rounded-none bg-gradient-to-r from-cyan-300 to-blue-400 p-2 text-white">
            Buy Now
          </Button>
          <Button
            type="button"
            onClick={(ev) => {
              ev.stopPropagation();
              actions.add(product);
            }}
            className="from-primary-400 to-primary-600 w-1/2 rounded-none bg-gradient-to-r p-2 text-white">
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Item;
