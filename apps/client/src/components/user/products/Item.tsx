import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from 'shared-types';

import { formatCurrency } from '@utils/index';

const Item = ({ _id, name, category, photos, price }: Product) => {
  return (
    <Link
      href={`/product/${encodeURIComponent(_id)}`}
      className="flex h-full flex-col justify-between overflow-hidden rounded-2xl shadow">
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
        <h5 className="text-bold my-3 font-semibold">{formatCurrency(price)}</h5>
      </div>
    </Link>
  );
};

export default Item;
