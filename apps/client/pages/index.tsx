import React from 'react';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { Product } from 'shared-types';

import { getProducts } from '@api/index';

import Banner from '@components/user/banner';
import Sidebar from '@components/user/sidebar';
import Products from '@components/user/products';
import Ad from '@components/user/ad';

interface Products {
  products: Product[];
}

const Home: NextPage<InferGetStaticPropsType<typeof Products>> = ({ products }: Products) => {
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
        <aside className="fixed top-0 left-0 hidden h-full w-[250px] lg:relative lg:flex">
          <Sidebar />
        </aside>
        <section className="col-span-4 lg:col-span-3">
          <Products />
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products: Product = (await getProducts()).products;

  return {
    props: {
      products,
    },
  };
};

export default Home;
