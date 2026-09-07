import React from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AdminLayout from '@components/admin/layout';
import Button from '@utils/Button';
import Alert from '@utils/Alert';
import { deleteCategory, getCategories } from '@api/admin';

const Index: NextPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['admin-categories'], getCategories);
  const mutation = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries(['admin-categories']),
  });

  return (
    <AdminLayout
      isLoading={isLoading}
      title={
        <>
          Manage <span className="text-primary">Categories</span>
        </>
      }>
      {mutation.isError && <Alert type="error" message="Unable to delete category" />}
      <section className="mx-auto max-w-[700px] space-y-3 p-5">
        {data?.categories.map((category) => (
          <div key={category._id} className="flex items-center justify-between rounded border p-3">
            <span className="capitalize">{category.name}</span>
            <Button
              type="button"
              className="bg-danger text-white"
              isLoading={mutation.isLoading && mutation.variables === category._id}
              onClick={() => mutation.mutate(category._id)}>
              Delete
            </Button>
          </div>
        ))}
        {!data?.categories.length && <p className="text-center">No categories found.</p>}
      </section>
    </AdminLayout>
  );
};

export default Index;
