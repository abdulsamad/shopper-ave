import type { NextPage } from 'next';
import Head from 'next/head';

import Banner from '@components/banner';
import Sidebar from '@components/sidebar';
import Products from '@components/products';

const Home: NextPage = () => {
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
        <section className="col-span-4 flex h-[60px] w-full bg-cyan-400">
          <div className="flex w-full items-center justify-center">Ad</div>
        </section>
        <Sidebar />
        <section className="col-span-3">
          <Products />
        </section>
      </main>
    </div>
  );
};

export default Home;
