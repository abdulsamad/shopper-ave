import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { logout } from '@api/index';

export interface IRootStore {
  isAuthenticated: boolean;
  user: null | object;
  token: null | object;
  actions: {
    login: ({ email, password }: { email: string; password: string }) => void;
    register: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<IRootStore>()(
  devtools((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    actions: {
      login: async ({ email, password }) => {
        console.log({ email, password });
      },
      register: async ({ email, password, name }) => {
        console.log({ email, password, name });
      },
      logout: async () => {
        await logout();

        set(() => ({ isAuthenticated: false, token: null, user: null }));
      },
    },
  }))
);

export default useAuthStore;
