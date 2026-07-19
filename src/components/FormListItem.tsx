import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import type { FormEntry } from '../data/types'

export default function FormListItem({
  form,
  index,
  accentColor,
}: {
  form: FormEntry
  index: number
  accentColor: string
}) {
  const content = (
    <div className="group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-medium truncate">{form.title}</h3>
          {form.disabled && <Lock size={13} className="text-subtle shrink-0" />}
        </div>
        <p className="text-[13px] text-subtle dark:text-subtle-dark mt-0.5 line-clamp-1">
          {form.disabled ? form.disabledNote : form.description}
        </p>
      </div>
      {!form.disabled && (
        <ArrowRight
          size={16}
          className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
          style={{ color: accentColor }}
        />
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      {form.disabled ? (
        <div className="opacity-50 cursor-not-allowed">{content}</div>
      ) : (
        <Link to={`/form/${form.id}`}>{content}</Link>
      )}
    </motion.div>
  )
}
