import React from 'react';

import Sidebar from '@components/admin/sidebar';

interface AdminLayout {
  title: React.ReactNode | string;
  children: React.ReactNode;
}

const AdminLayout = ({ title, children }: AdminLayout) => {
  return (
    <div className="grid flex-1 grid-cols-12">
      <Sidebar />
      <div className="col-span-10">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
