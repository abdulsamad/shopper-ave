import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { isAxiosError } from 'axios';

import { AddressItem, User } from 'shared-types';

import { login, loginReqData, register, logout, updateUser } from '@api/auth';
import { addAddress, removeAddress } from '@api/user';

export interface IAuthStore {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  actions: {
    login: ({ email, password }: loginReqData) => Promise<void | Error>;
    register: (userInfo: FormData) => Promise<void | Error>;
    logout: () => void;
    updateUser: (data: FormData) => Promise<void | Error>;
    addAddress: (address: Omit<AddressItem, '_id'>) => Promise<void | Error>;
    removeAddress: (addressId: string) => Promise<void | Error>;
  };
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        token: null,
        actions: {
          login: async (data) => {
            try {
              const { user, token } = await login(data);

              // Set token in local storage
              localStorage.setItem('token', token);

              set(() => ({ user, token, isAuthenticated: true }));
            } catch (err) {
              set(() => ({ user: null, token: null, isAuthenticated: false }));

              if (isAxiosError(err)) {
                throw new Error(err.response?.data.err, {
                  cause: 'invalid-credentials',
                });
              }
            }
          },
          register: async (data) => {
            try {
              const { user, token } = await register(data);

              set(() => ({ user, token, isAuthenticated: true }));
            } catch (err) {
              set(() => ({ user: null, token: null, isAuthenticated: false }));

              if (isAxiosError(err)) {
                throw new Error(err.response?.data.err, {
                  cause: 'invalid-credentials',
                });
              }
            }
          },
          logout: async () => {
            await logout();

            // Remove token from local storage
            localStorage.removeItem('token');

            set(() => ({ isAuthenticated: false, token: null, user: null }));
          },
          updateUser: async (formData) => {
            try {
              const { user } = await updateUser(formData);

              set(() => ({ user }));
            } catch (err) {
              if (isAxiosError(err)) {
                throw new Error(err.response?.data.err, {
                  cause: 'invalid-credentials',
                });
              }
            }
          },
          addAddress: async (address) => {
            await addAddress(address);
          },
          removeAddress: async (addressId) => {
            try {
              await removeAddress(addressId);

              set((state) => ({
                user:
                  state.user && state.user.addresses
                    ? {
                        ...state.user,
                        addresses: state.user.addresses.filter(
                          (address) => address._id !== addressId
                        ),
                      }
                    : null,
              }));
            } catch (err) {
              if (isAxiosError(err)) {
                throw new Error(err.response?.data.err, {
                  cause: 'invalid-credentials',
                });
              }
            }
          },
        },
      }),
      {
        name: 'auth',
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !['actions'].includes(key))),
      }
    )
  )
);

export default useAuthStore;
