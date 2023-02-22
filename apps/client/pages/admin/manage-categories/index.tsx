import React from 'react';
import type { NextPage } from 'next';

import Sidebar from '@components/admin/sidebar';

const Index: NextPage = () => {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-10">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">
            Manage <span className="text-primary">Categories</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Index;
