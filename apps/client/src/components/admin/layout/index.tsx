import React from 'react';

import Sidebar from '@components/admin/sidebar';

interface Layout {
  title: React.ReactNode | string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: Layout) => {
  return (
    <div className="grid max-h-[calc(100vh-120px)] flex-1 grid-cols-12 overflow-hidden">
      <Sidebar />
      <div className="col-span-10 overflow-auto">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
