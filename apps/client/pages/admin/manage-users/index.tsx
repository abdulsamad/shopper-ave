import React from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AdminLayout from '@components/admin/layout';
import Button from '@utils/Button';
import { deleteUser, getUsers, updateUserRole } from '@api/admin';

const Index: NextPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['admin-users'], getUsers);
  const updateMutation = useMutation(({ id, role }: { id: string; role: 'user' | 'manager' | 'admin' }) => updateUserRole(id, role), {
    onSuccess: () => queryClient.invalidateQueries(['admin-users']),
  });
  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => queryClient.invalidateQueries(['admin-users']),
  });

  return (
    <AdminLayout isLoading={isLoading} title={<>Manage <span className="text-primary">Users</span></>}>
      <section className="mx-auto max-w-[900px] overflow-x-auto p-5">
        <table className="w-full text-left">
          <thead><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {data?.users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <select value={user.role} onChange={(event) => updateMutation.mutate({ id: user._id, role: event.target.value as 'user' | 'manager' | 'admin' })}>
                    <option value="user">User</option><option value="manager">Manager</option><option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-2"><Button type="button" className="bg-danger text-white" onClick={() => deleteMutation.mutate(user._id)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
};

export default Index;
