import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Department } from '../data/types'

export default function DepartmentCard({ department, index, count }: { department: Department; index: number; count: number }) {
  const Icon = department.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/dept/${department.id}`}
        className="group relative flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-surface-dark p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-12px_rgba(0,0,0,0.16)] hover:-translate-y-1 transition-all duration-300"
      >
        <div>
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${department.color}1a`, color: department.color }}
          >
            <Icon size={20} strokeWidth={2} />
          </div>
          <h3 className="text-[17px] font-semibold tracking-tight mb-1.5">{department.title}</h3>
          <p className="text-[13px] text-subtle dark:text-subtle-dark leading-relaxed line-clamp-2">
            {department.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <span className="text-xs text-subtle dark:text-subtle-dark">{count} {formsWord(count)}</span>
          <ArrowUpRight
            size={16}
            className="text-subtle opacity-0 group-hover:opacity-100 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
            style={{ color: department.color }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

function formsWord(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'заявок'
  if (mod10 === 1) return 'заявка'
  if (mod10 >= 2 && mod10 <= 4) return 'заявки'
  return 'заявок'
}
