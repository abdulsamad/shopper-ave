import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import { Product } from 'shared-types';

import { getProducts } from '@api/user';
import Banner from '@components/user/banner';
import Products from '@components/user/products';
import Ad from '@components/user/ad';

interface Products {
  products: Product[];
}

const Home: NextPage<Products> = ({ products }: Products) => {
  return (
    <div>
      <Head>
        <title>Shopper Ave</title>
        <meta name="description" content="An E-Commerce store built with MERN stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-4">
        <section className="col-span-4">
          <Banner />
        </section>
        <section className="col-span-4 flex h-[60px]">
          <Ad />
        </section>
        <section className="col-span-4 lg:col-span-4">
          <Products products={products} />
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = (await getProducts()).products;

  return {
    props: {
      products,
    },
  };
};

export default Home;
