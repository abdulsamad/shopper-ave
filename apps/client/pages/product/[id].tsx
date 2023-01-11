import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';
import { ShoppingCartIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

import { Product as IProduct } from 'shared-types';

import { getProduct } from '@api/index';
import Button from '@utils/Button';
import { formatCurrency } from '@utils/index';

const Index: NextPage<IProduct> = ({
  name,
  brand,
  photos,
  price,
  category,
  description,
  ratings,
}: IProduct) => {
  return (
    <div className="grid grid-cols-2 place-items-center p-5">
      {photos && (
        <div className="">
          <Image
            src={photos[0].secure_url}
            alt={name}
            className="mx-auto"
            height={180}
            width={340}
          />
        </div>
      )}
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold">{brand}</h2>
          <h1 className="mt-3 text-3xl font-light">{name}</h1>
          <div className="mb-4 flex">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= ratings ? (
                <StarIcon key={star} className="h-4 w-4 text-yellow-500" />
              ) : (
                <StarIconOutline key={star} className="h-4 w-4" />
              )
            )}
          </div>
          <p className="text my-2 text-xl font-bold capitalize">{formatCurrency(price)}</p>
          <p className="">{description}</p>
        </div>
        <div className="flex gap-6">
          <Button type="button" className="bg-primary text-white">
            <ShoppingBagIcon className="mr-3 h-5 w-5" /> Buy Now
          </Button>
          <Button
            type="button"
            className="border-primary text-primary hover:bg-primary border border-solid py-2 transition duration-300 ease-out hover:text-white">
            <ShoppingCartIcon className="mr-3 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const product = (await getProduct(id)).product;

  return {
    props: {
      ...product,
    },
  };
};

export default Index;
