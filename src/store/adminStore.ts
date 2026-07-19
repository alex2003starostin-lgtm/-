import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FormField } from '../data/types'

export interface CustomDepartment {
  id: string
  title: string
  description: string
  iconName: string
  color: string
}

export interface CustomCategory {
  id: string
  title: string
  departmentId: string
}

export interface CustomForm {
  id: string
  title: string
  description: string
  iconName: string
  departmentId: string
  categoryId?: string
  fields: FormField[]
  disabled?: boolean
  disabledNote?: string
  createdAt: string
}

interface AdminState {
  customDepartments: CustomDepartment[]
  customCategories: CustomCategory[]
  customForms: CustomForm[]
  addDepartment: (department: Omit<CustomDepartment, 'id'>) => string
  addCategory: (category: Omit<CustomCategory, 'id'>) => string
  addForm: (form: Omit<CustomForm, 'id' | 'createdAt'>) => string
  removeDepartment: (id: string) => void
  removeCategory: (id: string) => void
  removeForm: (id: string) => void
}

function newId(prefix: string): string {
  return `custom-${prefix}-${crypto.randomUUID()}`
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      customDepartments: [],
      customCategories: [],
      customForms: [],

      addDepartment: (department) => {
        const id = newId('dept')
        set((state) => ({
          customDepartments: [...state.customDepartments, { ...department, id }],
        }))
        return id
      },

      addCategory: (category) => {
        const id = newId('cat')
        set((state) => ({
          customCategories: [...state.customCategories, { ...category, id }],
        }))
        return id
      },

      addForm: (form) => {
        const id = newId('form')
        set((state) => ({
          customForms: [...state.customForms, { ...form, id, createdAt: new Date().toISOString() }],
        }))
        return id
      },

      removeDepartment: (id) =>
        set((state) => ({
          customDepartments: state.customDepartments.filter((d) => d.id !== id),
          customCategories: state.customCategories.filter((c) => c.departmentId !== id),
          customForms: state.customForms.filter((f) => f.departmentId !== id),
        })),

      removeCategory: (id) =>
        set((state) => ({
          customCategories: state.customCategories.filter((c) => c.id !== id),
          customForms: state.customForms.filter((f) => f.categoryId !== id),
        })),

      removeForm: (id) =>
        set((state) => ({
          customForms: state.customForms.filter((f) => f.id !== id),
        })),
    }),
    { name: 'support-portal-admin' },
  ),
)
