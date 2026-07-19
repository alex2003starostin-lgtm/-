import { useRef } from 'react'
import { Info, Upload, X, Check } from 'lucide-react'
import type { FormField } from '../data/types'

export type FieldValue = string | number | boolean | string[] | File[] | undefined

interface Props {
  field: FormField
  value: FieldValue
  onChange: (value: FieldValue) => void
  error?: string
}

const inputClass =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors placeholder:text-subtle'

export default function FieldRenderer({ field, value, onChange, error }: Props) {
  if (field.type === 'info') {
    return (
      <div className="flex gap-3 rounded-2xl bg-accent/[0.07] px-4 py-3.5 text-[13px] text-ink dark:text-ink-dark leading-relaxed">
        <Info size={17} className="text-accent shrink-0 mt-0.5" />
        <p>{field.content}</p>
      </div>
    )
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {field.label}
        {field.required && <span className="text-accent ml-0.5">*</span>}
      </label>

      {field.type === 'text' && (
        <input
          className={inputClass}
          type="text"
          value={(value as string) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === 'number' && (
        <input
          className={inputClass}
          type="number"
          value={(value as number) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        />
      )}

      {field.type === 'date' && (
        <input
          className={inputClass}
          type="date"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={(value as string) ?? ''}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === 'select' && (
        <select
          className={`${inputClass} appearance-none`}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Выберите…
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === 'radio' && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const active = value === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  active
                    ? 'bg-accent text-white border-accent'
                    : 'border-black/10 dark:border-white/10 hover:border-accent text-ink dark:text-ink-dark'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}

      {field.type === 'multiselect' && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const arr = (value as string[]) ?? []
            const active = arr.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onChange(active ? arr.filter((v) => v !== opt.value) : [...arr, opt.value])
                }
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  active
                    ? 'bg-accent text-white border-accent'
                    : 'border-black/10 dark:border-white/10 hover:border-accent text-ink dark:text-ink-dark'
                }`}
              >
                {active && <Check size={13} />}
                {opt.label}
              </button>
            )
          })}
        </div>
      )}

      {field.type === 'checkbox' && (
        <button
          type="button"
          onClick={() => onChange(!(value as boolean))}
          className="flex items-center gap-2.5 text-sm"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
              value ? 'bg-accent border-accent' : 'border-black/20 dark:border-white/20'
            }`}
          >
            {value ? <Check size={13} className="text-white" /> : null}
          </span>
          <span className="text-subtle dark:text-subtle-dark">{field.helpText ?? 'Да'}</span>
        </button>
      )}

      {field.type === 'file' && <FileInput field={field} value={value as File[] | undefined} onChange={onChange} />}

      {field.helpText && field.type !== 'checkbox' && (
        <p className="text-xs text-subtle dark:text-subtle-dark mt-1.5">{field.helpText}</p>
      )}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}

function FileInput({
  field,
  value,
  onChange,
}: {
  field: FormField
  value: File[] | undefined
  onChange: (value: FieldValue) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const files = value ?? []

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 rounded-xl border border-dashed border-black/15 dark:border-white/15 px-4 py-3 text-sm text-subtle hover:border-accent hover:text-accent transition-colors w-full justify-center"
      >
        <Upload size={15} />
        Прикрепить файл{field.multiple ? 'ы' : ''}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={field.accept}
        multiple={field.multiple}
        className="hidden"
        onChange={(e) => {
          const list = e.target.files ? Array.from(e.target.files) : []
          onChange(field.multiple ? [...files, ...list] : list)
        }}
      />
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-lg bg-surface-2 dark:bg-surface-2-dark px-3 py-1.5 text-xs"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
                className="text-subtle hover:text-red-500 shrink-0 ml-2"
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
