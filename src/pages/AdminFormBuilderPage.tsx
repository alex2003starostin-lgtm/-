import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Trash2, ChevronUp, ChevronDown, Save, ArrowLeft, RotateCcw } from 'lucide-react'
import { useCatalog } from '../data/useCatalog'
import { findFormLocation } from '../data/catalog'
import { getFormFields } from '../data/formSchemas'
import { useAdminStore } from '../store/adminStore'
import { useAdminAuthStore } from '../store/adminAuthStore'
import { findIconName } from '../data/icons'
import IconPicker from '../components/IconPicker'
import ColorPicker from '../components/ColorPicker'
import FieldRenderer, { type FieldValue } from '../components/FieldRenderer'
import type { FieldType, FormField } from '../data/types'

const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  text: 'Короткий текст',
  textarea: 'Длинный текст',
  select: 'Выпадающий список',
  multiselect: 'Мультивыбор (чипы)',
  radio: 'Один из вариантов',
  checkbox: 'Флажок (да/нет)',
  date: 'Дата',
  file: 'Файл',
  number: 'Число',
  info: 'Информационный блок (без ввода)',
}

const FIELD_TYPES = Object.keys(FIELD_TYPE_LABELS) as FieldType[]

function randomFieldId(): string {
  return `field-${Math.random().toString(36).slice(2, 9)}`
}

function defaultField(type: FieldType): FormField {
  const base: FormField = { id: randomFieldId(), label: '', type }
  if (type === 'select' || type === 'radio' || type === 'multiselect') {
    return { ...base, options: [{ value: 'option-1', label: 'Вариант 1' }] }
  }
  if (type === 'info') return { ...base, content: '' }
  return base
}

export default function AdminFormBuilderPage() {
  const { isAdmin } = useAdminAuthStore()
  const { formId: editFormId } = useParams()
  const departments = useCatalog()
  const {
    addDepartment,
    addCategory,
    addForm,
    updateForm,
    setFormOverride,
    clearFormOverride,
    customForms,
    formOverrides,
  } = useAdminStore()
  const navigate = useNavigate()

  const customForm = editFormId ? customForms.find((f) => f.id === editFormId) : undefined
  const location = editFormId ? findFormLocation(departments, editFormId) : null
  const isEdit = Boolean(editFormId)
  const isBuiltInEdit = isEdit && !customForm && Boolean(location)
  const override = editFormId ? formOverrides[editFormId] : undefined
  const hasOverride = isBuiltInEdit && Boolean(override)

  const [deptMode, setDeptMode] = useState<'existing' | 'new'>('existing')
  const [selectedDeptId, setSelectedDeptId] = useState(
    () => customForm?.departmentId ?? location?.department.id ?? departments[0]?.id ?? '',
  )
  const [newDeptTitle, setNewDeptTitle] = useState('')
  const [newDeptDescription, setNewDeptDescription] = useState('')
  const [newDeptIcon, setNewDeptIcon] = useState('Building2')
  const [newDeptColor, setNewDeptColor] = useState('#0071e3')

  const [catMode, setCatMode] = useState<'none' | 'existing' | 'new'>(() =>
    customForm?.categoryId ? 'existing' : 'none',
  )
  const [selectedCatId, setSelectedCatId] = useState(() => customForm?.categoryId ?? '')
  const [newCatTitle, setNewCatTitle] = useState('')

  const [title, setTitle] = useState(() => customForm?.title ?? override?.title ?? location?.form.title ?? '')
  const [description, setDescription] = useState(
    () => customForm?.description ?? override?.description ?? location?.form.description ?? '',
  )
  const [iconName, setIconName] = useState(() => {
    if (customForm) return customForm.iconName
    if (override?.iconName) return override.iconName
    if (location) return findIconName(location.form.icon)
    return 'HelpCircle'
  })
  const [fields, setFields] = useState<FormField[]>(() => {
    if (customForm) return customForm.fields
    if (override?.fields) return override.fields
    if (location) return getFormFields(location.form.id, location.form.title, location.category?.title)
    return [defaultField('textarea')]
  })
  const [disabled, setDisabled] = useState(
    () => customForm?.disabled ?? override?.disabled ?? location?.form.disabled ?? false,
  )
  const [disabledNote, setDisabledNote] = useState(
    () => customForm?.disabledNote ?? override?.disabledNote ?? location?.form.disabledNote ?? '',
  )
  const [previewValues, setPreviewValues] = useState<Record<string, FieldValue>>({})
  const [error, setError] = useState('')

  const activeDept = departments.find((d) => d.id === selectedDeptId)
  const categoryOptions = deptMode === 'existing' ? activeDept?.categories ?? [] : []

  if (!isAdmin) return <Navigate to="/admin" replace />
  if (isEdit && !customForm && !location) return <Navigate to="/admin" replace />

  function updateField(index: number, patch: Partial<FormField>) {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)))
  }

  function changeFieldType(index: number, type: FieldType) {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...defaultField(type), label: f.label } : f)))
  }

  function addFieldRow() {
    setFields((prev) => [...prev, defaultField('text')])
  }

  function removeFieldRow(index: number) {
    setFields((prev) => prev.filter((_, i) => i !== index))
  }

  function moveFieldRow(index: number, dir: -1 | 1) {
    setFields((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  function addOption(fieldIndex: number) {
    setFields((prev) =>
      prev.map((f, i) => {
        if (i !== fieldIndex) return f
        const options = f.options ?? []
        const n = options.length + 1
        return { ...f, options: [...options, { value: `option-${n}`, label: `Вариант ${n}` }] }
      }),
    )
  }

  function updateOption(fieldIndex: number, optionIndex: number, label: string) {
    setFields((prev) =>
      prev.map((f, i) => {
        if (i !== fieldIndex) return f
        const options = (f.options ?? []).map((o, oi) =>
          oi === optionIndex ? { value: `option-${oi + 1}`, label } : o,
        )
        return { ...f, options }
      }),
    )
  }

  function removeOption(fieldIndex: number, optionIndex: number) {
    setFields((prev) =>
      prev.map((f, i) => (i === fieldIndex ? { ...f, options: (f.options ?? []).filter((_, oi) => oi !== optionIndex) } : f)),
    )
  }

  const previewTitle = title.trim() || 'Название заявки'
  const previewDescription = description.trim() || 'Короткое описание того, что и зачем'

  function handleSave() {
    setError('')

    if (!isBuiltInEdit) {
      if (deptMode === 'new' && !newDeptTitle.trim()) {
        setError('Укажите название нового направления')
        return
      }
      if (deptMode === 'existing' && !selectedDeptId) {
        setError('Выберите направление')
        return
      }
      if (catMode === 'new' && !newCatTitle.trim()) {
        setError('Укажите название новой категории')
        return
      }
      if (catMode === 'existing' && !selectedCatId) {
        setError('Выберите категорию')
        return
      }
    }
    if (!title.trim()) {
      setError('Укажите название заявки')
      return
    }
    if (!description.trim()) {
      setError('Укажите короткое описание заявки')
      return
    }
    for (const field of fields) {
      if (field.type === 'info' && !field.content?.trim()) {
        setError('Заполните текст информационного блока')
        return
      }
      if (field.type !== 'info' && !field.label.trim()) {
        setError('У каждого поля формы должна быть подпись')
        return
      }
    }
    if (disabled && !disabledNote.trim()) {
      setError('Укажите причину, по которой заявка временно отключена')
      return
    }

    if (isBuiltInEdit && editFormId) {
      setFormOverride(editFormId, {
        title: title.trim(),
        description: description.trim(),
        iconName,
        fields,
        disabled,
        disabledNote: disabled ? disabledNote.trim() : undefined,
      })
      navigate('/admin')
      return
    }

    let departmentId = selectedDeptId
    if (deptMode === 'new') {
      departmentId = addDepartment({
        title: newDeptTitle.trim(),
        description: newDeptDescription.trim() || newDeptTitle.trim(),
        iconName: newDeptIcon,
        color: newDeptColor,
      })
    }

    let categoryId: string | undefined
    if (catMode === 'existing') categoryId = selectedCatId
    if (catMode === 'new') {
      categoryId = addCategory({ title: newCatTitle.trim(), departmentId })
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      iconName,
      departmentId,
      categoryId,
      fields,
      disabled,
      disabledNote: disabled ? disabledNote.trim() : undefined,
    }

    if (customForm) {
      updateForm(customForm.id, payload)
    } else {
      addForm(payload)
    }

    navigate('/admin')
  }

  function handleRevert() {
    if (!editFormId) return
    clearFormOverride(editFormId)
    navigate('/admin')
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-24">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-1.5 text-sm text-subtle hover:text-ink dark:hover:text-ink-dark transition-colors mb-4"
      >
        <ArrowLeft size={15} /> Назад в админ-панель
      </button>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {isEdit ? 'Редактирование заявки' : 'Новая форма заявки'}
        </h1>
        {hasOverride && (
          <button
            onClick={handleRevert}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 px-3.5 py-1.5 text-xs font-medium text-subtle hover:border-accent hover:text-accent transition-colors"
          >
            <RotateCcw size={13} /> Восстановить исходный вариант
          </button>
        )}
      </div>
      <p className="text-subtle dark:text-subtle-dark text-[14px] mb-8">
        {isEdit
          ? 'Измените поля слева — предпросмотр справа обновляется сразу'
          : 'Заполните конструктор слева — предпросмотр справа обновляется сразу'}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {isBuiltInEdit ? (
            <Section title="Направление">
              <p className="text-sm text-subtle">
                {location?.department.title}
                {location?.category ? ` · ${location.category.title}` : ''}
              </p>
              <p className="text-xs text-subtle mt-1.5">
                У встроенных заявок нельзя изменить направление или категорию.
              </p>
            </Section>
          ) : (
            <>
              <Section title="Направление">
                <ModeToggle
                  options={[
                    { value: 'existing', label: 'Существующее' },
                    { value: 'new', label: '+ Новое направление' },
                  ]}
                  value={deptMode}
                  onChange={(v) => setDeptMode(v as typeof deptMode)}
                />
                {deptMode === 'existing' ? (
                  <select
                    value={selectedDeptId}
                    onChange={(e) => {
                      setSelectedDeptId(e.target.value)
                      setCatMode('none')
                      setSelectedCatId('')
                    }}
                    className={inputClass}
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-3">
                    <input
                      value={newDeptTitle}
                      onChange={(e) => setNewDeptTitle(e.target.value)}
                      placeholder="Название направления"
                      className={inputClass}
                    />
                    <input
                      value={newDeptDescription}
                      onChange={(e) => setNewDeptDescription(e.target.value)}
                      placeholder="Короткое описание направления"
                      className={inputClass}
                    />
                    <div>
                      <p className="text-xs text-subtle mb-1.5">Иконка</p>
                      <IconPicker value={newDeptIcon} onChange={setNewDeptIcon} />
                    </div>
                    <div>
                      <p className="text-xs text-subtle mb-1.5">Цвет</p>
                      <ColorPicker value={newDeptColor} onChange={setNewDeptColor} />
                    </div>
                  </div>
                )}
              </Section>

              <Section title="Категория (необязательно)">
                <ModeToggle
                  options={[
                    { value: 'none', label: 'Без категории' },
                    ...(deptMode === 'existing' && categoryOptions.length
                      ? [{ value: 'existing', label: 'Существующая' }]
                      : []),
                    { value: 'new', label: '+ Новая категория' },
                  ]}
                  value={catMode}
                  onChange={(v) => setCatMode(v as typeof catMode)}
                />
                {catMode === 'existing' && (
                  <select
                    value={selectedCatId}
                    onChange={(e) => setSelectedCatId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Выберите категорию…
                    </option>
                    {categoryOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                )}
                {catMode === 'new' && (
                  <input
                    value={newCatTitle}
                    onChange={(e) => setNewCatTitle(e.target.value)}
                    placeholder="Название категории"
                    className={inputClass}
                  />
                )}
              </Section>
            </>
          )}

          <Section title="Заявка">
            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название заявки"
                className={inputClass}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Короткое описание: что это и зачем нужно"
                className={`${inputClass} min-h-[70px] resize-y`}
              />
              <div>
                <p className="text-xs text-subtle mb-1.5">Иконка</p>
                <IconPicker value={iconName} onChange={setIconName} />
              </div>
              <div className="pt-1">
                <label className="flex items-center gap-1.5 text-xs text-subtle">
                  <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
                  Временно отключить эту заявку
                </label>
                {disabled && (
                  <input
                    value={disabledNote}
                    onChange={(e) => setDisabledNote(e.target.value)}
                    placeholder="Причина (покажем вместо формы), например «Раздел временно не используется»"
                    className={`${inputClass} mt-2`}
                  />
                )}
              </div>
            </div>
          </Section>

          <Section title="Поля формы">
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-2xl border border-black/10 dark:border-white/10 p-3.5 space-y-2.5"
                >
                  <div className="flex items-center gap-2">
                    <select
                      value={field.type}
                      onChange={(e) => changeFieldType(index, e.target.value as FieldType)}
                      className={`${inputClass} flex-1`}
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {FIELD_TYPE_LABELS[t]}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => moveFieldRow(index, -1)}
                      disabled={index === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFieldRow(index, 1)}
                      disabled={index === fields.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors shrink-0"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFieldRow(index)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {field.type === 'info' ? (
                    <textarea
                      value={field.content ?? ''}
                      onChange={(e) => updateField(index, { content: e.target.value })}
                      placeholder="Текст, который увидит сотрудник"
                      className={`${inputClass} min-h-[60px] resize-y`}
                    />
                  ) : (
                    <>
                      <input
                        value={field.label}
                        onChange={(e) => updateField(index, { label: e.target.value })}
                        placeholder="Подпись поля"
                        className={inputClass}
                      />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5 text-xs text-subtle">
                          <input
                            type="checkbox"
                            checked={field.required ?? false}
                            onChange={(e) => updateField(index, { required: e.target.checked })}
                          />
                          Обязательное
                        </label>
                      </div>

                      {(field.type === 'select' || field.type === 'radio' || field.type === 'multiselect') && (
                        <div className="space-y-1.5">
                          <p className="text-xs text-subtle">Варианты</p>
                          {(field.options ?? []).map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-1.5">
                              <input
                                value={opt.label}
                                onChange={(e) => updateOption(index, oi, e.target.value)}
                                className={`${inputClass} flex-1`}
                              />
                              <button
                                type="button"
                                onClick={() => removeOption(index, oi)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addOption(index)}
                            className="text-xs text-accent font-medium"
                          >
                            + Добавить вариант
                          </button>
                        </div>
                      )}

                      {field.type === 'file' && (
                        <label className="flex items-center gap-1.5 text-xs text-subtle">
                          <input
                            type="checkbox"
                            checked={field.multiple ?? false}
                            onChange={(e) => updateField(index, { multiple: e.target.checked })}
                          />
                          Несколько файлов
                        </label>
                      )}

                      <input
                        value={field.helpText ?? ''}
                        onChange={(e) => updateField(index, { helpText: e.target.value })}
                        placeholder="Подсказка под полем (необязательно)"
                        className={inputClass}
                      />
                    </>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addFieldRow}
                className="flex items-center gap-1.5 rounded-xl border border-dashed border-black/15 dark:border-white/15 px-4 py-2.5 text-sm text-subtle hover:border-accent hover:text-accent transition-colors w-full justify-center"
              >
                <Plus size={14} /> Добавить поле
              </button>
            </div>
          </Section>

          {error && <p className="rounded-xl bg-red-500/10 text-red-500 text-sm px-4 py-3">{error}</p>}

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium py-3 text-[15px] transition-colors"
          >
            <Save size={16} /> {isEdit ? 'Сохранить изменения' : 'Сохранить и опубликовать форму'}
          </button>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <p className="text-xs font-semibold text-subtle uppercase tracking-wide mb-3 px-1">Предпросмотр</p>
          <motion.div className="rounded-3xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight mb-1.5">{previewTitle}</h2>
            <p className="text-subtle dark:text-subtle-dark text-sm mb-6">{previewDescription}</p>
            <div className="space-y-5">
              {fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  value={previewValues[field.id]}
                  onChange={(v) => setPreviewValues((prev) => ({ ...prev, [field.id]: v }))}
                />
              ))}
              {fields.length === 0 && (
                <p className="text-sm text-subtle text-center py-6">Добавьте хотя бы одно поле</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors placeholder:text-subtle'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] p-5">
      <h2 className="text-xs font-semibold text-subtle dark:text-subtle-dark uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </div>
  )
}

function ModeToggle({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
            value === opt.value
              ? 'bg-accent text-white border-accent'
              : 'border-black/10 dark:border-white/10 text-subtle hover:border-accent hover:text-accent'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
