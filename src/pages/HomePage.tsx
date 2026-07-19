import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Lock } from 'lucide-react'
import { departments, allSearchableForms } from '../data/catalog'
import { searchForms } from '../lib/search'
import DepartmentCard from '../components/DepartmentCard'
import FormTile from '../components/FormTile'
import { LogoMark } from '../components/Logo'
import { useProfileStore } from '../store/profileStore'

const POPULAR_IDS = [
  'it-workplace',
  'it-access',
  'it-incident',
  'hr-dms',
  'axo-cards',
  'ib-endpoint-web',
  'other-freeform',
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const { profile } = useProfileStore()
  const hits = useMemo(() => searchForms(query, 6), [query])
  const totalForms = useMemo(() => allSearchableForms().length, [])

  const popular = useMemo(() => {
    const all = allSearchableForms()
    return POPULAR_IDS.map((id) => all.find((entry) => entry.form.id === id)).filter(
      (entry): entry is NonNullable<typeof entry> => Boolean(entry),
    )
  }, [])

  const firstName = profile?.name.split(' ')[0]

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <div className="flex justify-center mb-5">
          <LogoMark size={56} className="rounded-[16px] shadow-lg shadow-accent/20" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          {firstName ? `${firstName}, чем помочь?` : 'Чем мы можем помочь?'}
        </h1>
        <p className="text-subtle dark:text-subtle-dark text-[15px]">
          {totalForms} видов заявок в {departments.length} направлениях — найдите нужную за пару секунд
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto mb-8"
      >
        <div className="relative">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например: доступ, визитки, ДМС, ошибка 1С…"
            className="w-full rounded-full bg-white dark:bg-surface-dark border border-black/10 dark:border-white/10 pl-12 pr-5 py-4 text-[15px] shadow-sm outline-none focus:border-accent focus:shadow-md transition-all"
          />
        </div>

        {query.trim() !== '' && (
          <div className="mt-2 rounded-2xl bg-white dark:bg-surface-dark border border-black/5 dark:border-white/10 shadow-lg overflow-hidden">
            {hits.length === 0 ? (
              <p className="px-5 py-4 text-sm text-subtle text-center">
                Ничего не нашлось. Попробуйте «Прочие услуги — Свободная форма».
              </p>
            ) : (
              hits.map((hit) => (
                <Link
                  key={hit.formId}
                  to={hit.disabled ? '#' : `/form/${hit.formId}`}
                  className={`flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors border-b border-black/5 dark:border-white/5 last:border-0 ${hit.disabled ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{hit.title}</span>
                      {hit.disabled && <Lock size={12} className="text-subtle shrink-0" />}
                    </div>
                    <p className="text-xs text-subtle truncate">
                      {hit.departmentTitle}
                      {hit.categoryTitle ? ` · ${hit.categoryTitle}` : ''}
                    </p>
                  </div>
                  <ArrowRight size={15} className="text-subtle shrink-0" />
                </Link>
              ))
            )}
          </div>
        )}
      </motion.div>

      {query.trim() === '' && (
        <div className="mb-16">
          <h2 className="text-xl font-semibold tracking-tight mb-5">Часто спрашивают</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map(({ form, department }, index) => (
              <FormTile key={form.id} form={form} index={index} accentColor={department.color} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-5">Все направления</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((department, index) => (
            <DepartmentCard
              key={department.id}
              department={department}
              index={index}
              count={
                department.directForms.length +
                department.categories.reduce((sum, c) => sum + c.forms.length, 0)
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
