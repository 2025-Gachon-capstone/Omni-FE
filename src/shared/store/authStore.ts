import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  memberId: number;
  sponsorId: number;
  loginId: string | number;
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
      setAuth: ({ isLoggedIn, user }) => {
        const userId = user.role === 'SPONSOR' ? user.sponsorId : user.loginId;
        set({ isLoggedIn, user: { ...user, loginId: userId } });
      },
      getUser: () => get().user,
      clearAuth: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: 'authStorage',
    },
  ),
);
