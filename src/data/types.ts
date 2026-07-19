import type { LucideIcon } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file'
  | 'number'
  | 'info'

export interface FieldOption {
  value: string
  label: string
}

export interface FormField {
  id: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  helpText?: string
  options?: FieldOption[]
  accept?: string
  multiple?: boolean
  content?: string
}

export interface FormEntry {
  id: string
  title: string
  description: string
  icon: LucideIcon
  disabled?: boolean
  disabledNote?: string
}

export interface Category {
  id: string
  title: string
  forms: FormEntry[]
}

export interface Department {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  categories: Category[]
  directForms: FormEntry[]
}

export interface SearchableForm {
  form: FormEntry
  department: Department
  category?: Category
}

export interface Ticket {
  id: string
  number: string
  createdAt: string
  departmentId: string
  departmentTitle: string
  categoryTitle?: string
  formId: string
  formTitle: string
  status: 'new' | 'in_progress' | 'done'
  values: Record<string, unknown>
  requester: {
    name: string
    department: string
    email: string
  }
}
