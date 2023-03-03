import React from 'react';
import type { NextPage } from 'next';

import AdminLayout from '@components/admin/layout';

const Index: NextPage = () => {
  return (
    <AdminLayout
      title={
        <>
          Manage <span className="text-primary">Categories</span>
        </>
      }>
      <h1 className="text-center">Coming soon...</h1>
    </AdminLayout>
  );
};

export default Index;
