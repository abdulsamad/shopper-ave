import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

import { getOrders } from '@api/admin';
import AdminLayout from '@components/admin/layout';

const Index: NextPage = () => {
  const { data } = useQuery(['admin-orders'], getOrders, { enabled: true, staleTime: Infinity });

  return (
    <AdminLayout
      title={
        <>
          Manage <span className="text-primary">Orders</span>
        </>
      }>
      <section className="mx-auto max-w-[600px] overflow-y-auto">
        <table>
          <thead></thead>
          <tbody>
            {data?.orders.map(
              ({
                _id,
                orderItems,
                __v,
                createdAt,
                deliveredAt,
                orderStatus,
                paymentInfo,
                shippingAmount,
                shippingInfo,
                taxAmount,
                totalAmount,
                updatedAt,
                user,
              }) => (
                <tr key={_id}>
                  <td>{totalAmount}</td>
                  <td>{orderStatus}</td>
                  <td>{totalAmount}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['admin-orders'],
    queryFn: getOrders,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
