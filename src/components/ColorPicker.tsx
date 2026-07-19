import { Check } from 'lucide-react'
import { COLOR_OPTIONS } from '../data/icons'

export default function ColorPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (hex: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map(({ name, hex }) => {
        const active = value === hex
        return (
          <button
            key={hex}
            type="button"
            onClick={() => onChange(hex)}
            title={name}
            className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-surface-2 dark:ring-offset-surface-2-dark transition-all"
            style={{ backgroundColor: hex, ['--tw-ring-color' as string]: active ? hex : 'transparent' }}
          >
            {active && <Check size={14} className="text-white" />}
          </button>
        )
      })}
    </div>
  )
}
