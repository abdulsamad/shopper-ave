import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { getProducts } from '@api/admin';
import AdminLayout from '@components/admin/layout';
import Product from '@components/admin/product';

const Index: NextPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: getProducts });

  return (
    <AdminLayout
      isLoading={isLoading}
      title={
        <>
          Manage <span className="text-primary">Products</span>
        </>
      }>
      <section className="space-y-5 py-4 text-center">
        {data?.products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </section>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
