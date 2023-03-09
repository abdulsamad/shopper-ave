import { useState, useEffect } from 'react';

import { useAuthStore } from './auth';
import { useCartStore } from './cart';

/* Custom hook for persisted store / hydration error */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

// Auth
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useToken = () => useAuthStore((state) => state.token);
export const useUser = () => useAuthStore((state) => state.user);

export const useCart = () => useCartStore((state) => state);
