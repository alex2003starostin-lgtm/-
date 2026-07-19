import { useMemo } from 'react'
import { builtInDepartments } from './catalog'
import { resolveIcon } from './icons'
import { useAdminStore, type FormOverride } from '../store/adminStore'
import type { Department, FormEntry } from './types'

function applyOverride(form: FormEntry, override: FormOverride | undefined): FormEntry {
  if (!override) return form
  return {
    ...form,
    title: override.title ?? form.title,
    description: override.description ?? form.description,
    icon: override.iconName ? resolveIcon(override.iconName) : form.icon,
    disabled: override.disabled ?? form.disabled,
    disabledNote: override.disabledNote ?? form.disabledNote,
  }
}

/** Merges the built-in catalog with admin-added departments/categories/forms (and edits) into one reactive list. */
export function useCatalog(): Department[] {
  const customDepartments = useAdminStore((s) => s.customDepartments)
  const customCategories = useAdminStore((s) => s.customCategories)
  const customForms = useAdminStore((s) => s.customForms)
  const formOverrides = useAdminStore((s) => s.formOverrides)

  return useMemo(() => {
    const departmentMap = new Map<string, Department>()

    for (const department of builtInDepartments) {
      departmentMap.set(department.id, {
        ...department,
        categories: department.categories.map((category) => ({
          ...category,
          forms: category.forms.map((form) => applyOverride(form, formOverrides[form.id])),
        })),
        directForms: department.directForms.map((form) => applyOverride(form, formOverrides[form.id])),
      })
    }

    for (const customDept of customDepartments) {
      departmentMap.set(customDept.id, {
        id: customDept.id,
        title: customDept.title,
        description: customDept.description,
        icon: resolveIcon(customDept.iconName),
        color: customDept.color,
        categories: [],
        directForms: [],
      })
    }

    for (const customCat of customCategories) {
      const department = departmentMap.get(customCat.departmentId)
      if (!department) continue
      department.categories = [...department.categories, { id: customCat.id, title: customCat.title, forms: [] }]
    }

    for (const customForm of customForms) {
      const department = departmentMap.get(customForm.departmentId)
      if (!department) continue
      const formEntry: FormEntry = {
        id: customForm.id,
        title: customForm.title,
        description: customForm.description,
        icon: resolveIcon(customForm.iconName),
        disabled: customForm.disabled,
        disabledNote: customForm.disabledNote,
      }
      if (customForm.categoryId) {
        const category = department.categories.find((c) => c.id === customForm.categoryId)
        if (category) {
          category.forms = [...category.forms, formEntry]
          continue
        }
      }
      department.directForms = [...department.directForms, formEntry]
    }

    return Array.from(departmentMap.values())
  }, [customDepartments, customCategories, customForms, formOverrides])
}
