import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { ShoppingCartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

import { Product as IProduct } from 'shared-types';

import { useCart } from '@store/index';
import { getProduct } from '@api/user';
import Button from '@utils/Button';
import { formatCurrency } from '@utils/index';
import Photos from '@components/user/product/Photos';
import Review from '@components/user/review';
import Stars from '@utils/Stars';

const Index: NextPage<IProduct> = (product: IProduct) => {
  const { name, brand, photos, price, category, description, ratings } = product;
  const { actions } = useCart();

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 place-items-center p-5">
        <Photos photos={photos} name={name} />
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold">{brand}</h2>
            <h1 className="mt-3 text-3xl font-light">{name}</h1>
            <div className="mb-2 flex">
              <Stars ratings={ratings} />
            </div>
            <p className="m-0">{category}</p>
            <p className="text my-2 text-xl font-bold capitalize">{formatCurrency(price)}</p>
            <p className="">{description}</p>
          </div>
          <div className="flex gap-6">
            <Button type="button" className="bg-primary text-white">
              <ShoppingBagIcon className="mr-3 h-5 w-5" /> Buy Now
            </Button>
            <Button
              type="button"
              className="border-primary text-primary hover:bg-primary border border-solid py-2 transition duration-300 ease-out hover:text-white"
              onClick={() => {
                actions.add(product);
              }}>
              <ShoppingCartIcon className="mr-3 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </section>
        <section className="col-span-2 my-8">
          <Review id={product._id} />
        </section>
      </div>
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
