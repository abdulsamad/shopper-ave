import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { UserCircleIcon, UserIcon } from '@heroicons/react/24/outline';

import { useUser } from '@store/index';
import AdminLayout from '@components/admin/layout';
import { formatCurrency, formatNumber } from '@utils/index';

const Admin: NextPage = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <AdminLayout
      title={
        <>
          Welcome to <span className="text-primary">Admin Area</span>
        </>
      }>
      <section className="grid grid-cols-2 gap-10 px-5 py-3">
        {/* Revenue */}
        <div className="border-primary-500 flex flex-col rounded border-l-[5px] border-solid bg-white p-3 text-center shadow-xl">
          <div className="text-xl">Total Revenue</div>
          <h2 className="mt-3 text-5xl text-gray-400">{formatCurrency(20000)}</h2>
        </div>
        {/* Orders */}
        <div className="border-primary flex flex-col rounded border-l-[5px] border-solid bg-white p-3 text-center shadow-xl">
          <div className="text-lg">Total Items Ordered</div>
          <h2 className="mt-3 text-5xl text-gray-400">{formatNumber(10000)}</h2>
        </div>
        {/* Products */}
        <div></div>
        {/* Admin Card */}
        <div className="overflow-hidden rounded-lg shadow">
          <div className="bg-primary relative flex py-5 px-3 text-xl text-white">
            <UserIcon className="h-6 w-6" />
            <h2 className="ml-2">Admin Details</h2>
            {user.photo ? (
              <Image
                src={user.photo.secure_url}
                alt="admin"
                height={70}
                width={70}
                className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full"
              />
            ) : (
              <UserCircleIcon className="absolute bottom-0 left-1/2 h-16 w-16 translate-y-1/2 -translate-x-1/2 rounded-full bg-white text-black" />
            )}
          </div>
          <div className="flex h-full items-center bg-slate-100 p-5">
            <div className="h-full">
              <div>
                <strong>Name:</strong>
                <span className="ml-2">{user.name}</span>
              </div>
              <div>
                <strong>Email:</strong>
                <span className="ml-2">{user.email}</span>
              </div>
              <div className="my-2">
                <span className="bg-danger rounded-lg py-1 px-2 text-xs text-white">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Admin;
