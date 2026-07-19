import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import type { FormEntry } from '../data/types'

export default function FormTile({
  form,
  index,
  accentColor,
}: {
  form: FormEntry
  index: number
  accentColor: string
}) {
  const Icon = form.icon

  const content = (
    <div
      className={`group flex h-full flex-col rounded-3xl bg-white dark:bg-surface-dark p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        form.disabled
          ? 'opacity-50'
          : 'hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-10px_rgba(0,0,0,0.16)] hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${accentColor}1a`, color: accentColor }}
        >
          <Icon size={19} strokeWidth={2} />
        </div>
        {form.disabled && <Lock size={13} className="text-subtle shrink-0 mt-1" />}
      </div>
      <h3 className="text-[15px] font-semibold tracking-tight mb-1 leading-snug">{form.title}</h3>
      <p className="text-[13px] text-subtle dark:text-subtle-dark leading-relaxed line-clamp-2">
        {form.disabled ? form.disabledNote : form.description}
      </p>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
      className="h-full"
    >
      {form.disabled ? (
        <div className="h-full cursor-not-allowed">{content}</div>
      ) : (
        <Link to={`/form/${form.id}`} className="block h-full">
          {content}
        </Link>
      )}
    </motion.div>
  )
}
