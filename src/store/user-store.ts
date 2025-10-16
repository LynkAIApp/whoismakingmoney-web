import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

interface UserState {
  user: User | null;
  isLoading: boolean;
  lastLoginTime: number | null;
  loginCount: number;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  recordLogin: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      lastLoginTime: null,
      loginCount: 0,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      recordLogin: () => set((state) => ({
        lastLoginTime: Date.now(),
        loginCount: state.loginCount + 1
      })),
      clearUser: () => set({ 
        user: null, 
        lastLoginTime: null,
        loginCount: 0 
      }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        lastLoginTime: state.lastLoginTime,
        loginCount: state.loginCount,
      }),
    }
  )
);
