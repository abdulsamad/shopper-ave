import React from 'react';

import Sidebar from '@components/admin/sidebar';

interface Layout {
  title: React.ReactNode | string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, isLoading, children }: Layout) => {
  return (
    <div className="grid max-h-[calc(100vh-124px)] flex-1 grid-cols-12 overflow-y-hidden">
      <Sidebar />
      <div className="col-span-10 overflow-auto">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">{title}</h1>
        </div>
        <div className="h-[400px]">
          {isLoading ? (
            <div>
              <h1>loading...</h1>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
