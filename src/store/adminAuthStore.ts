import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminAuthState {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      setIsAdmin: (value) => set({ isAdmin: value }),
    }),
    { name: 'support-portal-admin-auth' },
  ),
)
