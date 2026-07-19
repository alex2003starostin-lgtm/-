import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Inbox } from 'lucide-react'
import { useTicketStore } from '../store/ticketStore'
import StatusBadge from '../components/StatusBadge'
import { useFormFields } from '../data/useFormFields'
import { formatFieldValue, isFieldValueEmpty } from '../lib/formatFieldValue'
import type { Ticket } from '../data/types'

export default function MyTicketsPage() {
  const tickets = useTicketStore((s) => s.tickets)
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-3xl px-5 pt-8 pb-24">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">Мои заявки</h1>
      <p className="text-subtle dark:text-subtle-dark text-[14px] mb-8">
        {tickets.length > 0
          ? `Всего заявок: ${tickets.length}`
          : 'Здесь появятся заявки, которые вы отправите'}
      </p>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white dark:bg-surface-dark py-20 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)]">
          <Inbox size={32} className="text-subtle mb-3" />
          <p className="text-subtle dark:text-subtle-dark mb-4">Пока нет ни одной заявки</p>
          <Link to="/" className="text-accent font-medium text-sm">
            Создать первую заявку →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket, i) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              index={i}
              isOpen={expanded === ticket.id}
              onToggle={() => setExpanded(expanded === ticket.id ? null : ticket.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TicketRow({
  ticket,
  index,
  isOpen,
  onToggle,
}: {
  ticket: Ticket
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const fields = useFormFields(ticket.formId, ticket.formTitle, ticket.categoryTitle).filter(
    (f) => f.type !== 'info',
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-2xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-medium">{ticket.formTitle}</span>
            <StatusBadge status={ticket.status} />
          </div>
          <p className="text-xs text-subtle mt-1">
            {ticket.number} · {ticket.departmentTitle}
            {ticket.categoryTitle ? ` · ${ticket.categoryTitle}` : ''} ·{' '}
            {new Date(ticket.createdAt).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <ChevronDown size={17} className={`text-subtle shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-black/5 dark:border-white/10 space-y-2">
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
