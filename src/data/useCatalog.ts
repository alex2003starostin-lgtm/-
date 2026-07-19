import { useMemo } from 'react'
import { builtInDepartments } from './catalog'
import { resolveIcon } from './icons'
import { useAdminStore } from '../store/adminStore'
import type { Department } from './types'

/** Merges the built-in catalog with admin-added departments/categories/forms into one reactive list. */
export function useCatalog(): Department[] {
  const customDepartments = useAdminStore((s) => s.customDepartments)
  const customCategories = useAdminStore((s) => s.customCategories)
  const customForms = useAdminStore((s) => s.customForms)

  return useMemo(() => {
    const departmentMap = new Map<string, Department>()

    for (const department of builtInDepartments) {
      departmentMap.set(department.id, {
        ...department,
        categories: department.categories.map((category) => ({ ...category, forms: [...category.forms] })),
        directForms: [...department.directForms],
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
      const formEntry = {
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
  }, [customDepartments, customCategories, customForms])
}
