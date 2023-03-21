import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ShoppingCartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { useCart } from '@store/index';
import { getProduct } from '@api/user';
import Button from '@utils/Button';
import { formatCurrency } from '@utils/index';
import Photos from '@components/user/product/Photos';
import Review from '@components/user/review';
import Stars from '@utils/Stars';

const Index: NextPage = () => {
  const router = useRouter();
  const { actions, items: cartItems } = useCart();
  const productId = typeof router.query?.id === 'string' ? router.query.id : '';
  const { data, isLoading } = useQuery(['product', productId], () => getProduct(productId), {
    enabled: true,
    staleTime: Infinity,
  });

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  const { name, brand, photos, price, category, description, ratings } = data.product;
  const isAddedToCart = cartItems.some((item) => item._id === productId);

  return (
    <div className="flex-1">
      <div className="container grid grid-cols-2 p-5">
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
            <Button
              type="button"
              className="bg-primary text-white"
              onClick={async () => {
                actions.reset();
                await actions.add(data.product);
                router.push('/checkout');
              }}>
              <ShoppingBagIcon className="mr-3 h-5 w-5" /> Buy Now
            </Button>
            <Button
              type="button"
              className="border-primary text-primary hover:bg-primary border border-solid py-2 transition duration-300 ease-out hover:text-white"
              onClick={() => {
                actions.add(data.product);
              }}>
              <ShoppingCartIcon className="mr-3 h-5 w-5" />{' '}
              {isAddedToCart ? 'Add More to Cart' : 'Add to Cart'}
            </Button>
          </div>
        </section>
        <section className="col-span-2 mt-20 w-full">
          <Review productId={data.product._id} reviews={data.product.reviews} />
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['product', id], () => getProduct(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
