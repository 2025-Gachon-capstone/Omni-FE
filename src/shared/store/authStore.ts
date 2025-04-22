import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  memberId: number;
  sponsorId: number;
  role: 'USER' | 'ADMIN' | 'SPONSOR';
  memberName: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (payload: { user: User; isLoggedIn: boolean }) => void;
  getUser: () => User | null;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      setAuth: ({ isLoggedIn, user }) => set({ isLoggedIn, user }),
      getUser: () => get().user,
      clearAuth: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: 'authStorage',
    },
  ),
);
