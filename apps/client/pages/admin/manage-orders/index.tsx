import React from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteOrder, getOrders, updateOrder } from '@api/admin';
import AdminLayout from '@components/admin/layout';
import Button from '@utils/Button';

const statuses = ['processing', 'dispatched', 'out_for_delivery', 'delivered', 'canceled'] as const;

const Index: NextPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['admin-orders'], getOrders);
  const updateMutation = useMutation(({ id, status }: { id: string; status: (typeof statuses)[number] }) => updateOrder(id, status), {
    onSuccess: () => queryClient.invalidateQueries(['admin-orders']),
  });
  const deleteMutation = useMutation(deleteOrder, {
    onSuccess: () => queryClient.invalidateQueries(['admin-orders']),
  });

  return (
    <AdminLayout isLoading={isLoading} title={<>Manage <span className="text-primary">Orders</span></>}>
      <section className="mx-auto max-w-[900px] overflow-x-auto p-5">
        <table className="w-full text-left">
          <thead><tr><th className="p-2">Order</th><th className="p-2">Total</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {data?.orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order._id}</td><td className="p-2">{order.totalAmount}</td>
                <td className="p-2"><select value={order.orderStatus} onChange={(event) => updateMutation.mutate({ id: order._id, status: event.target.value as (typeof statuses)[number] })}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
                <td className="p-2"><Button type="button" className="bg-danger text-white" onClick={() => deleteMutation.mutate(order._id)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
};

export default Index;
