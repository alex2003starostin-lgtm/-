import { ICON_OPTIONS } from '../data/icons'

export default function IconPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (name: string) => void
}) {
  return (
    <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto rounded-xl border border-black/10 dark:border-white/10 p-2 bg-surface-2 dark:bg-surface-2-dark">
      {ICON_OPTIONS.map(({ name, icon: Icon }) => {
        const active = value === name
        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              active
                ? 'bg-accent text-white'
                : 'text-ink dark:text-ink-dark hover:bg-black/5 dark:hover:bg-white/10'
            }`}
          >
            <Icon size={16} />
          </button>
        )
      })}
    </div>
  )
}
