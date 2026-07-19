import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Profile {
  name: string
  department: string
  email: string
}

interface ProfileState {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}

export const DEMO_PROFILES: Profile[] = [
  { name: 'Анна Смирнова', department: 'Отдел продаж', email: 'a.smirnova@company.ru' },
  { name: 'Игорь Петров', department: 'Логистика', email: 'i.petrov@company.ru' },
  { name: 'Мария Кузнецова', department: 'Финансы', email: 'm.kuznecova@company.ru' },
  { name: 'Дмитрий Волков', department: 'Маркетинг', email: 'd.volkov@company.ru' },
]

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    { name: 'support-portal-profile' },
  ),
)
