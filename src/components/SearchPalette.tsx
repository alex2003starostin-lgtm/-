import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Lock } from 'lucide-react'
import { searchForms } from '../lib/search'

export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const hits = useMemo(() => searchForms(query), [query])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  function go(formId: string, disabled?: boolean) {
    if (disabled) return
    onClose()
    navigate(`/form/${formId}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl rounded-3xl bg-white/95 dark:bg-surface-dark/95 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5 dark:border-white/10">
              <Search size={18} className="text-subtle shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Какая заявка вам нужна?"
                className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-subtle"
              />
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full text-subtle hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
                aria-label="Закрыть поиск"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {query.trim() === '' && (
                <p className="px-4 py-6 text-sm text-subtle text-center">
                  Начните вводить название заявки, отдела или категории
                </p>
              )}
              {query.trim() !== '' && hits.length === 0 && (
                <p className="px-4 py-6 text-sm text-subtle text-center">
                  Ничего не нашлось. Попробуйте другой запрос или отправьте свободную заявку.
                </p>
              )}
              {hits.map((hit) => (
                <button
                  key={hit.formId}
                  onClick={() => go(hit.formId, hit.disabled)}
                  disabled={hit.disabled}
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-black/[0.035] dark:hover:bg-white/[0.06] transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-medium truncate">{hit.title}</span>
                      {hit.disabled && <Lock size={12} className="text-subtle shrink-0" />}
                    </div>
                    <p className="text-xs text-subtle truncate mt-0.5">
                      {hit.departmentTitle}
                      {hit.categoryTitle ? ` · ${hit.categoryTitle}` : ''}
                    </p>
                  </div>
                  {!hit.disabled && (
                    <ArrowRight
                      size={15}
                      className="text-subtle shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
