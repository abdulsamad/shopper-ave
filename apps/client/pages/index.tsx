import type { NextPage } from 'next';
import Head from 'next/head';

import Banner from '@components/banner';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Shopper Ave</title>
        <meta name="description" content="An E-Commerce store built with MERN stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-4 place-items-center">
        <section className="col-span-4">
          <Banner />
        </section>
        <section className="col-span-4 flex h-[60px] w-full">
          <div className="flex w-full items-center justify-center">Ad</div>
        </section>
        <aside className="bg-danger h-[500px] w-full">
          <div className="flex h-full w-full items-center justify-center">Sidebar</div>
        </aside>
        <section className="bg-info col-span-3 h-[500px] w-full">
          <div className="flex h-full w-full items-center justify-center">Product</div>
        </section>
      </main>
    </div>
  );
};

export default Home;
