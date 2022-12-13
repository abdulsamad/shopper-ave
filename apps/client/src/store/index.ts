import { useAuthStore } from './auth';

// Auth
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useToken = () => useAuthStore((state) => state.token);
export const useUser = () => useAuthStore((state) => state.user);
