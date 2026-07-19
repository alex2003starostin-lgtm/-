import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Moon, Sun, ListChecks, ShieldCheck, User as UserIcon } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { useProfileStore } from '../store/profileStore'
import SearchPalette from './SearchPalette'
import ProfileModal from './ProfileModal'
import { LogoMark } from './Logo'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { profile } = useProfileStore()
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase()
    : null

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-canvas-dark/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <LogoMark size={30} className="shadow-sm group-hover:shadow-md transition-shadow rounded-[9px]" />
            <span className="font-semibold tracking-tight text-[15px] hidden sm:inline">GTDesk</span>
          </Link>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-1 max-w-md items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-surface-2 dark:bg-surface-2-dark px-4 py-2 text-sm text-subtle hover:border-black/20 dark:hover:border-white/20 transition-colors mx-2"
          >
            <Search size={15} />
            <span className="flex-1 text-left truncate">Найти заявку…</span>
            <kbd className="hidden sm:inline-block rounded-md border border-black/10 dark:border-white/15 px-1.5 py-0.5 text-[10px] font-sans text-subtle">
              ⌘K
            </kbd>
          </button>

          <nav className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => navigate('/tickets')}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink dark:text-ink-dark hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block"
            >
              Мои заявки
            </button>
            <button
              onClick={() => navigate('/tickets')}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors sm:hidden"
              aria-label="Мои заявки"
            >
              <ListChecks size={16} />
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Админ-панель"
            >
              <ShieldCheck size={16} />
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Переключить тему"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-xs hover:bg-accent/15 transition-colors"
              aria-label="Профиль"
            >
              {initials ?? <UserIcon size={15} />}
            </button>
          </nav>
        </div>
      </header>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}
