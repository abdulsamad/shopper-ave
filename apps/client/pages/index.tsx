import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { getProducts } from '@api/user';
import Banner from '@components/user/banner';
import Products from '@components/user/products';
import Ad from '@components/user/ad';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery(['products'], getProducts, {
    enabled: true,
    staleTime: Infinity,
  });

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
        {isLoading ? (
          <div>
            <h1>loading...</h1>
          </div>
        ) : (
          <section className="col-span-4 lg:col-span-4">
            {data?.products && <Products products={data.products} />}
          </section>
        )}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
