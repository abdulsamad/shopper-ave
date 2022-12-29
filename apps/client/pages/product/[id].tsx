import React from 'react';
import { NextPage, GetServerSideProps } from 'next';

import { Product as IProduct } from 'shared-types';

import { getProduct } from '@api/index';
import Product from '@components/user/product';

const Index: NextPage<IProduct> = (product) => {
  console.log({ product });

  return (
    <>
      <Product {...product} />;
    </>
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
