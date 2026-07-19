import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight mb-3">Страница не найдена</h1>
      <p className="text-subtle dark:text-subtle-dark mb-6">
        Похоже, такой заявки или раздела не существует.
      </p>
      <Link to="/" className="text-accent hover:text-accent-hover font-medium">
        Вернуться на главную →
      </Link>
    </div>
  )
}
