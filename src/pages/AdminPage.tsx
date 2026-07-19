import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Plus, Trash2, LogOut } from 'lucide-react'
import { useCatalog } from '../data/useCatalog'
import { useAdminStore } from '../store/adminStore'
import { useAdminAuthStore } from '../store/adminAuthStore'
import { LogoMark } from '../components/Logo'

export default function AdminPage() {
  const { isAdmin, setIsAdmin } = useAdminAuthStore()
  const departments = useCatalog()
  const { customDepartments, customCategories, customForms, removeDepartment, removeCategory, removeForm } =
    useAdminStore()

  if (!isAdmin) return <AdminGate />

  const totalForms = departments.reduce(
    (sum, d) => sum + d.directForms.length + d.categories.reduce((s, c) => s + c.forms.length, 0),
    0,
  )

  return (
    <div className="mx-auto max-w-4xl px-5 pt-8 pb-24">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Админ-панель</h1>
          <p className="text-subtle dark:text-subtle-dark text-[14px] mt-0.5">
            Управление каталогом заявок GTDesk
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/new"
            className="flex items-center gap-1.5 rounded-full bg-accent hover:bg-accent-hover text-white font-medium px-4 py-2.5 text-sm transition-colors"
          >
            <Plus size={15} /> Новая форма
          </Link>
          <button
            onClick={() => setIsAdmin(false)}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 px-3.5 py-2.5 text-sm text-subtle hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <LogOut size={14} /> Выйти
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <StatCard label="Направлений" value={departments.length} />
        <StatCard label="Всего заявок" value={totalForms} />
        <StatCard label="Добавлено вами" value={customForms.length + customDepartments.length} />
      </div>

      <div className="space-y-6">
        {departments.map((department, index) => {
          const isCustomDept = customDepartments.some((d) => d.id === department.id)
          const Icon = department.icon
          const sections = [
            ...(department.directForms.length
              ? [{ id: 'main', title: 'Основные заявки', forms: department.directForms }]
              : []),
            ...department.categories.map((c) => ({ id: c.id, title: c.title, forms: c.forms })),
          ]

          return (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
              className="rounded-3xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] p-5"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${department.color}1a`, color: department.color }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-[15px]">{department.title}</h2>
                      <Badge custom={isCustomDept} />
                    </div>
                  </div>
                </div>
                {isCustomDept && (
                  <button
                    onClick={() => {
                      if (confirm(`Удалить направление «${department.title}» и все его заявки?`)) {
                        removeDepartment(department.id)
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-subtle hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Удалить направление"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {sections.map((section) => {
                  const isCustomCat = customCategories.some((c) => c.id === section.id)
                  return (
                    <div key={section.id}>
                      <div className="flex items-center gap-2 mb-1.5 px-1">
                        <h3 className="text-xs font-semibold text-subtle dark:text-subtle-dark uppercase tracking-wide">
                          {section.title}
                        </h3>
                        {section.id !== 'main' && <Badge custom={isCustomCat} small />}
                        {isCustomCat && (
                          <button
                            onClick={() => {
                              if (confirm(`Удалить категорию «${section.title}» и её заявки?`)) {
                                removeCategory(section.id)
                              }
                            }}
                            className="text-subtle hover:text-red-500 transition-colors"
                            aria-label="Удалить категорию"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                      <div className="rounded-2xl border border-black/5 dark:border-white/5 divide-y divide-black/5 dark:divide-white/5 overflow-hidden">
                        {section.forms.map((form) => {
                          const isCustomForm = customForms.some((f) => f.id === form.id)
                          return (
                            <div key={form.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <form.icon size={14} className="text-subtle shrink-0" />
                                <span className="text-sm truncate">{form.title}</span>
                                <Badge custom={isCustomForm} small />
                              </div>
                              {isCustomForm && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Удалить заявку «${form.title}»?`)) removeForm(form.id)
                                  }}
                                  className="flex h-6 w-6 items-center justify-center rounded-full text-subtle hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                                  aria-label="Удалить заявку"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-surface-dark shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-8px_rgba(0,0,0,0.08)] p-4 text-center">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-subtle dark:text-subtle-dark mt-0.5">{label}</div>
    </div>
  )
}

function Badge({ custom, small }: { custom: boolean; small?: boolean }) {
  const size = small ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'
  return custom ? (
    <span className={`rounded-full bg-accent/10 text-accent font-medium shrink-0 ${size}`}>Добавлено вами</span>
  ) : (
    <span
      className={`rounded-full bg-black/5 dark:bg-white/10 text-subtle dark:text-subtle-dark font-medium shrink-0 ${size}`}
    >
      Встроенная
    </span>
  )
}

function AdminGate() {
  const { setIsAdmin } = useAdminAuthStore()

  return (
    <div className="mx-auto max-w-md px-5 pt-24 pb-24 text-center">
      <div className="flex justify-center mb-6">
        <LogoMark size={48} className="rounded-[14px] shadow-lg shadow-accent/20" />
      </div>
      <div className="flex justify-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <ShieldCheck size={22} />
        </div>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Раздел для администраторов</h1>
      <p className="text-subtle dark:text-subtle-dark text-[14px] mb-8 leading-relaxed">
        Здесь можно добавлять новые заявки и направления в каталог GTDesk. В этом демо-прототипе нет
        реальной авторизации — войдите в демо-режим администратора, чтобы продолжить.
      </p>
      <button
        onClick={() => setIsAdmin(true)}
        className="rounded-full bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 text-sm transition-colors"
      >
        Войти как администратор
      </button>
    </div>
  )
}
