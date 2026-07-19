import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { findFormLocation } from '../data/catalog'
import { useCatalog } from '../data/useCatalog'
import { useFormFields } from '../data/useFormFields'
import Breadcrumbs from '../components/Breadcrumbs'
import FieldRenderer, { type FieldValue } from '../components/FieldRenderer'
import NotFoundPage from './NotFoundPage'
import { useProfileStore } from '../store/profileStore'
import { useTicketStore, generateTicketNumber } from '../store/ticketStore'
import type { Ticket } from '../data/types'

export default function FormPage() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const departments = useCatalog()
  const location = formId ? findFormLocation(departments, formId) : null
  const { profile, setProfile } = useProfileStore()
  const { addTicket } = useTicketStore()

  const [requesterName, setRequesterName] = useState(profile?.name ?? '')
  const [requesterDept, setRequesterDept] = useState(profile?.department ?? '')
  const [requesterEmail, setRequesterEmail] = useState(profile?.email ?? '')
  const [values, setValues] = useState<Record<string, FieldValue>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const fields = useFormFields(
    location?.form.id ?? '',
    location?.form.title ?? '',
    location?.category?.title,
  )

  if (!location) return <NotFoundPage />
  const { department, category, form } = location

  if (form.disabled) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">{form.title} недоступна</h1>
        <p className="text-subtle dark:text-subtle-dark mb-6">{form.disabledNote}</p>
        <Link to={`/dept/${department.id}`} className="text-accent font-medium">
          ← Вернуться в раздел «{department.title}»
        </Link>
      </div>
    )
  }

  function updateValue(id: string, value: FieldValue) {
    setValues((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}
    if (!requesterName.trim()) nextErrors.requesterName = 'Укажите ваше ФИО'
    if (!requesterDept.trim()) nextErrors.requesterDept = 'Укажите ваш отдел'
    if (!requesterEmail.trim()) nextErrors.requesterEmail = 'Укажите email'

    for (const field of fields) {
      if (field.type === 'info') continue
      if (!field.required) continue
      const value = values[field.id]
      const empty =
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      if (empty) nextErrors[field.id] = 'Обязательное поле'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    setSubmitting(true)

    setProfile({ name: requesterName.trim(), department: requesterDept.trim(), email: requesterEmail.trim() })

    const serializedValues: Record<string, unknown> = {}
    for (const field of fields) {
      if (field.type === 'info') continue
      const v = values[field.id]
      serializedValues[field.id] = v instanceof Array && v[0] instanceof File ? (v as File[]).map((f) => f.name) : v
    }

    window.setTimeout(() => {
      const now = Date.now()
      const ticket: Ticket = {
        id: crypto.randomUUID(),
        number: generateTicketNumber(now),
        createdAt: new Date(now).toISOString(),
        departmentId: department.id,
        departmentTitle: department.title,
        categoryTitle: category?.title,
        formId: form.id,
        formTitle: form.title,
        status: 'new',
        values: serializedValues,
        requester: {
          name: requesterName.trim(),
          department: requesterDept.trim(),
          email: requesterEmail.trim(),
        },
      }
      addTicket(ticket)
      navigate(`/confirmation/${ticket.id}`)
    }, 650)
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8 pb-24">
      <Breadcrumbs
        items={[
          { label: department.title, to: `/dept/${department.id}` },
          ...(category ? [{ label: category.title, to: `/dept/${department.id}` }] : []),
          { label: form.title },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">{form.title}</h1>
        <p className="text-subtle dark:text-subtle-dark text-[15px] leading-relaxed">{form.description}</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="rounded-3xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] p-6 sm:p-8 space-y-6"
      >
        <div>
          <h2 className="text-xs font-semibold text-subtle dark:text-subtle-dark uppercase tracking-wide mb-3">
            От кого заявка
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <input
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                placeholder="ФИО"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
              />
              {errors.requesterName && <p className="text-xs text-red-500 mt-1">{errors.requesterName}</p>}
            </div>
            <div>
              <input
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                placeholder="Отдел"
                value={requesterDept}
                onChange={(e) => setRequesterDept(e.target.value)}
              />
              {errors.requesterDept && <p className="text-xs text-red-500 mt-1">{errors.requesterDept}</p>}
            </div>
            <div>
              <input
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                placeholder="Email"
                type="email"
                value={requesterEmail}
                onChange={(e) => setRequesterEmail(e.target.value)}
              />
              {errors.requesterEmail && <p className="text-xs text-red-500 mt-1">{errors.requesterEmail}</p>}
            </div>
          </div>
        </div>

        <div className="h-px bg-black/5 dark:bg-white/10" />

        <div className="space-y-5">
          {fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={values[field.id]}
              onChange={(v) => updateValue(field.id, v)}
              error={errors[field.id]}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-70 text-white font-medium py-3 text-[15px] transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Отправляем…
            </>
          ) : (
            <>
              <Send size={15} /> Отправить заявку
            </>
          )}
        </button>
      </motion.form>
    </div>
  )
}
