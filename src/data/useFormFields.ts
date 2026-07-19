import { useAdminStore } from '../store/adminStore'
import { getFormFields } from './formSchemas'
import type { FormField } from './types'

/** Resolves a form's field schema: admin-defined custom fields take priority, else built-in/generic schema. */
export function useFormFields(formId: string, title: string, categoryTitle?: string): FormField[] {
  const customForm = useAdminStore((s) => s.customForms.find((f) => f.id === formId))
  if (customForm) return customForm.fields
  return getFormFields(formId, title, categoryTitle)
}
