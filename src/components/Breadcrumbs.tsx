import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface Crumb {
  label: string
  to?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-subtle dark:text-subtle-dark flex-wrap">
      <Link to="/" className="flex items-center hover:text-ink dark:hover:text-ink-dark transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="opacity-50" />
          {item.to ? (
            <Link to={item.to} className="hover:text-ink dark:hover:text-ink-dark transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink dark:text-ink-dark font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
