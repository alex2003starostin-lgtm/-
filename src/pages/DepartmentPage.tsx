import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { departments } from '../data/catalog'
import Breadcrumbs from '../components/Breadcrumbs'
import FormTile from '../components/FormTile'
import NotFoundPage from './NotFoundPage'

export default function DepartmentPage() {
  const { deptId } = useParams()
  const department = departments.find((d) => d.id === deptId)

  if (!department) return <NotFoundPage />

  const Icon = department.icon
  const sections = [
    ...(department.directForms.length
      ? [{ id: 'main', title: 'Основные заявки', forms: department.directForms }]
      : []),
    ...department.categories.map((c) => ({ id: c.id, title: c.title, forms: c.forms })),
  ]

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20">
      <Breadcrumbs items={[{ label: department.title }]} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 mt-6 mb-4"
      >
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${department.color}1a`, color: department.color }}
        >
          <Icon size={26} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{department.title}</h1>
          <p className="text-subtle dark:text-subtle-dark text-[14px] mt-0.5">{department.description}</p>
        </div>
      </motion.div>

      {sections.length > 1 && (
        <div className="flex flex-wrap gap-2 my-6">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="rounded-full border border-black/10 dark:border-white/10 px-3.5 py-1.5 text-xs font-medium text-subtle hover:text-accent hover:border-accent transition-colors"
            >
              {s.title}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-10 mt-8">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-sm font-semibold text-subtle dark:text-subtle-dark uppercase tracking-wide mb-2 px-1">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.forms.map((form, i) => (
                <FormTile key={form.id} form={form} index={i} accentColor={department.color} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-subtle dark:text-subtle-dark mb-2">Не нашли подходящую заявку?</p>
        <Link to="/form/other-freeform" className="text-accent hover:text-accent-hover font-medium text-sm">
          Отправить свободную форму →
        </Link>
      </div>
    </div>
  )
}
