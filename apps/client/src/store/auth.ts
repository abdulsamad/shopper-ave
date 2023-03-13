import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { isAxiosError } from 'axios';

import { User } from 'shared-types';

import { login, loginReqData, register, logout } from '@api/auth';

export interface IAuthStore {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  actions: {
    login: ({ email, password }: loginReqData) => Promise<void | Error>;
    register: (userInfo: FormData) => Promise<void | Error>;
    logout: () => void;
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
