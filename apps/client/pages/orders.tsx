import React from 'react';
import type { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';

import { getMyOrders } from '@api/user';
import OrderItem from '@components/user/order/OrderItem';

const Index: NextPage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: getMyOrders });

  if (isLoading || !data) return null;

  return (
    <section className="flex-1 p-5 text-center">
      <h2 className="text-2xl">
        Orders <span className="text-primary">History</span>
      </h2>
      <div className="my-5 space-y-8">
        {data.orders.map((order) => (
          <OrderItem key={order._id} {...order} />
        ))}
      </div>
    </section>
  );
};

export default Index;
