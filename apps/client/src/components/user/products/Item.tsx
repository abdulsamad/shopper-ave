import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from 'shared-types';

import { formatCurrency } from '@utils/index';

const Item = ({ _id, name, category, photos, price }: Product) => {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl shadow">
      <Link className="flex h-full flex-col" href={`/product/${encodeURIComponent(_id)}`}>
        <Image
          width={300}
          height={200}
          src={photos[0].secure_url}
          className="mx-auto h-full object-cover"
          alt={name}
        />
        <div className="bg-gray-100 p-4">
          <h3 className="text-lg font-light">{name}</h3>
          <h4 className="text-sm capitalize text-gray-400">{category}</h4>
          <h5 className="text-bold my-2 font-semibold">{formatCurrency(price)}</h5>
        </div>
      </Link>
      <div className="flex">
        <button
          type="button"
          onClick={(ev) => ev.stopPropagation()}
          className="w-1/2 bg-gradient-to-r from-cyan-300 to-blue-400 p-2 text-white">
          Buy Now
        </button>
        <button
          type="button"
          onClick={(ev) => ev.stopPropagation()}
          className="from-primary-400 to-primary-600 w-1/2 bg-gradient-to-r p-2 text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
