import { create } from 'zustand';
import { User } from '../types';
import { setAccessToken } from '../api/axios';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (user, accessToken) => {
    setAccessToken(accessToken);
    set({ user, isAuthenticated: true, isLoading: false });
  },
  clearAuth: () => {
    setAccessToken(null);
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));
