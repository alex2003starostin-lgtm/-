import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User } from 'lucide-react'
import { useProfileStore, DEMO_PROFILES } from '../store/profileStore'

export default function ProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, setProfile } = useProfileStore()
  const [name, setName] = useState(profile?.name ?? '')
  const [department, setDepartment] = useState(profile?.department ?? '')
  const [email, setEmail] = useState(profile?.email ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !department.trim() || !email.trim()) return
    setProfile({ name: name.trim(), department: department.trim(), email: email.trim() })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-surface-dark p-7 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <User size={18} />
                </div>
                <h2 className="text-lg font-semibold tracking-tight">Ваш профиль</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-subtle hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-subtle dark:text-subtle-dark mb-5 leading-relaxed">
              Эти данные будут автоматически подставляться в заявки. Это демо-профиль без реальной
              авторизации.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-subtle dark:text-subtle-dark mb-1.5">
                  ФИО
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-subtle dark:text-subtle-dark mb-1.5">
                  Отдел
                </label>
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Например, Отдел продаж"
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-subtle dark:text-subtle-dark mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.ru"
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-accent hover:bg-accent-hover text-white font-medium py-2.5 text-sm transition-colors mt-2"
              >
                Сохранить
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-black/5 dark:border-white/10">
              <p className="text-xs text-subtle dark:text-subtle-dark mb-2.5">Или выбрать демо-пользователя:</p>
              <div className="flex flex-wrap gap-2">
                {DEMO_PROFILES.map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => {
                      setName(demo.name)
                      setDepartment(demo.department)
                      setEmail(demo.email)
                    }}
                    className="rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    {demo.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
