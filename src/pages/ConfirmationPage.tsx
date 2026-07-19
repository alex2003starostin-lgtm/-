import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useTicketStore } from '../store/ticketStore'
import { useFormFields } from '../data/useFormFields'
import { formatFieldValue, isFieldValueEmpty } from '../lib/formatFieldValue'
import NotFoundPage from './NotFoundPage'

export default function ConfirmationPage() {
  const { ticketId } = useParams()
  const ticket = useTicketStore((s) => s.tickets.find((t) => t.id === ticketId))
  const fields = useFormFields(
    ticket?.formId ?? '',
    ticket?.formTitle ?? '',
    ticket?.categoryTitle,
  ).filter((f) => f.type !== 'info')

  if (!ticket) return <NotFoundPage />

  return (
    <div className="mx-auto max-w-lg px-5 pt-16 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="flex justify-center mb-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 size={34} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Заявка отправлена</h1>
        <p className="text-subtle dark:text-subtle-dark mb-1">
          Номер заявки <span className="font-medium text-ink dark:text-ink-dark">{ticket.number}</span>
        </p>
        <p className="text-subtle dark:text-subtle-dark text-sm mb-8">
          Мы уведомим вас на {ticket.requester.email}, когда статус изменится
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="rounded-3xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] p-6 text-left space-y-4"
      >
        <div>
          <p className="text-xs text-subtle uppercase tracking-wide font-semibold mb-1">Заявка</p>
          <p className="text-[15px] font-medium">{ticket.formTitle}</p>
          <p className="text-xs text-subtle mt-0.5">
            {ticket.departmentTitle}
            {ticket.categoryTitle ? ` · ${ticket.categoryTitle}` : ''}
          </p>
        </div>

        <div className="h-px bg-black/5 dark:bg-white/10" />

        <div>
          <p className="text-xs text-subtle uppercase tracking-wide font-semibold mb-1">От кого</p>
          <p className="text-sm">{ticket.requester.name}</p>
          <p className="text-xs text-subtle">
            {ticket.requester.department} · {ticket.requester.email}
          </p>
        </div>

        {fields.some((f) => !isFieldValueEmpty(ticket.values[f.id])) && (
          <>
            <div className="h-px bg-black/5 dark:bg-white/10" />
            <div className="space-y-2.5">
              <p className="text-xs text-subtle uppercase tracking-wide font-semibold">Детали</p>
              {fields.map((f) => {
                const v = ticket.values[f.id]
                if (isFieldValueEmpty(v)) return null
                return (
                  <div key={f.id} className="flex justify-between gap-4 text-sm">
                    <span className="text-subtle shrink-0">{f.label}</span>
                    <span className="text-right font-medium">{formatFieldValue(v, f)}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
      >
        <Link
          to="/tickets"
          className="rounded-xl bg-accent hover:bg-accent-hover text-white font-medium py-2.5 px-6 text-sm transition-colors"
        >
          Мои заявки
        </Link>
        <Link
          to="/"
          className="rounded-xl border border-black/10 dark:border-white/10 font-medium py-2.5 px-6 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          На главную
        </Link>
      </motion.div>
    </div>
  )
}
