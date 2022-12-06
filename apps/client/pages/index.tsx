import type { NextPage } from 'next';
import Head from 'next/head';

import Banner from '@components/banner';
import Sidebar from '@components/sidebar';
import Products from '@components/products';
import Ad from '@components/ad';

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
        <section className="col-span-4 flex h-[60px]">
          <Ad />
        </section>
        <aside className="fixed top-0 left-0 h-full w-[250px] sm:opacity-0 lg:relative lg:opacity-100">
          <Sidebar />
        </aside>
        <section className="col-span-4 lg:col-span-3">
          <Products />
        </section>
      </main>
    </div>
  );
};

export default Home;
