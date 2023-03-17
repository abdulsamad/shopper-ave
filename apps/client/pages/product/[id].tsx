import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ShoppingCartIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

import { Product as IProduct, Review as IReview } from 'shared-types';

import { useCart } from '@store/index';
import { getProduct, getReviews } from '@api/user';
import Button from '@utils/Button';
import { formatCurrency } from '@utils/index';
import Photos from '@components/user/product/Photos';
import Review from '@components/user/review';
import Stars from '@utils/Stars';

interface IProps {
  product: IProduct;
  reviews: IReview[];
}

const Index: NextPage<IProps> = ({ product, reviews }: IProps) => {
  const router = useRouter();
  const { actions, items: cartItems } = useCart();

  const { name, brand, photos, price, category, description, ratings } = product;
  const isAddedToCart = cartItems.some((item) => item._id === product._id);

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
                await actions.add(product);
                router.push('/checkout');
              }}>
              <ShoppingBagIcon className="mr-3 h-5 w-5" /> Buy Now
            </Button>
            <Button
              type="button"
              className="border-primary text-primary hover:bg-primary border border-solid py-2 transition duration-300 ease-out hover:text-white"
              onClick={() => {
                actions.add(product);
              }}>
              <ShoppingCartIcon className="mr-3 h-5 w-5" />{' '}
              {isAddedToCart ? 'Add More to Cart' : 'Add to Cart'}
            </Button>
          </div>
        </section>
        <section className="col-span-2 mt-20 w-full">
          <Review productId={product._id} reviews={reviews} />
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  const product = (await getProduct(id)).product;
  const reviews = (await getReviews(id)).reviews;

  return {
    props: {
      product,
      reviews,
    },
  };
};

export default Index;
