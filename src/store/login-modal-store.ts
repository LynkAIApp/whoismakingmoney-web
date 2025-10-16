import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginModalStore {
  isLoginModalOpen: boolean;
  currentImageUrl: string | null;
  lastLoginAttempt: number | null;
  loginAttempts: number;
  openLoginModal: (imageUrl?: string) => void;
  closeLoginModal: () => void;
  recordLoginAttempt: () => void;
  resetLoginAttempts: () => void;
}

export const useLoginModalStore = create<LoginModalStore>()(
  persist(
    (set) => ({
      isLoginModalOpen: false,
      currentImageUrl: null,
      lastLoginAttempt: null,
      loginAttempts: 0,
      openLoginModal: (imageUrl) => set({ 
        isLoginModalOpen: true, 
        currentImageUrl: imageUrl || null 
      }),
      closeLoginModal: () => set({ 
        isLoginModalOpen: false, 
        currentImageUrl: null 
      }),
      recordLoginAttempt: () => set((state) => ({
        lastLoginAttempt: Date.now(),
        loginAttempts: state.loginAttempts + 1
      })),
      resetLoginAttempts: () => set({
        lastLoginAttempt: null,
        loginAttempts: 0
      }),
    }),
    {
      name: 'login-modal-storage',
      partialize: (state) => ({
        lastLoginAttempt: state.lastLoginAttempt,
        loginAttempts: state.loginAttempts,
      }),
    }
  )
);
