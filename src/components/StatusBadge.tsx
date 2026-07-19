import type { Ticket } from '../data/types'

const STATUS_MAP: Record<Ticket['status'], { label: string; className: string }> = {
  new: { label: 'Новая', className: 'bg-accent/10 text-accent' },
  in_progress: { label: 'В работе', className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  done: { label: 'Выполнена', className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
}

export default function StatusBadge({ status }: { status: Ticket['status'] }) {
  const info = STATUS_MAP[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${info.className}`}>
      {info.label}
    </span>
  )
}
