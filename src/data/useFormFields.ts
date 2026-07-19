import { useAdminStore } from '../store/adminStore'
import { getFormFields } from './formSchemas'
import type { FormField } from './types'

/** Resolves a form's field schema: an admin override or custom form's fields take priority, else built-in/generic schema. */
export function useFormFields(formId: string, title: string, categoryTitle?: string): FormField[] {
  const override = useAdminStore((s) => s.formOverrides[formId])
  const customForm = useAdminStore((s) => s.customForms.find((f) => f.id === formId))
  if (override?.fields) return override.fields
  if (customForm) return customForm.fields
  return getFormFields(formId, title, categoryTitle)
}
