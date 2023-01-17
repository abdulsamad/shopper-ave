import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@components/admin/sidebar';
import { formatCurrency, formatNumber } from '@utils/index';

const Admin: NextPage = () => {
  return (
    <div className="border-5 grid grid-cols-12 border-solid border-red-500">
      <Sidebar />
      <div className="col-span-10">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">
            Welcome to <span className="text-primary">Admin Area</span>
          </h1>
          <section className="grid grid-cols-2 gap-6 px-5 py-3">
            <div className="border-primary flex flex-col rounded-lg border-l-8 border-solid bg-white p-3 text-center shadow-lg">
              <div className="text-lg">Total Registered Users</div>
              <h2 className="mt-3 text-5xl text-gray-400">{formatCurrency(20000)}</h2>
            </div>
            <div className="border-primary flex flex-col rounded-lg border-l-8 border-solid bg-white p-3 text-center shadow-lg">
              <div className="text-lg">Total Items Ordered</div>
              <h2 className="mt-3 text-5xl text-gray-400">{formatNumber(10000)}</h2>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
