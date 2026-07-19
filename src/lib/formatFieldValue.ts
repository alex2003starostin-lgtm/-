import type { FieldOption } from '../data/types'

export function formatFieldValue(
  value: unknown,
  field: { options?: FieldOption[] },
): string {
  if (Array.isArray(value)) {
    if (field.options) {
      return value
        .map((v) => field.options?.find((o) => o.value === v)?.label ?? String(v))
        .join(', ')
    }
    return value.join(', ')
  }
  if (typeof value === 'boolean') return value ? 'Да' : 'Нет'
  if (field.options) {
    return field.options.find((o) => o.value === value)?.label ?? String(value)
  }
  return String(value)
}

export function isFieldValueEmpty(value: unknown): boolean {
  return value === undefined || value === '' || (Array.isArray(value) && value.length === 0)
}
