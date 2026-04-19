import { NavLink } from 'react-router-dom'
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { BRAND, COUNTRIES } from '../../lib/constants'
import { cn } from '../../lib/cn'
import { CountrySelector } from '../shared/CountrySelector'
import { CurrencySelector } from '../shared/CurrencySelector'
import { usePreferences } from '../../state/preferences'
import { useAuth } from '../../state/auth'

const navItems = [
  { to: '/coverage', label: 'Coverage' },
  { to: '/services', label: 'Services' },
  { to: '/quality', label: 'Quality' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
] as const

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const prefs = usePreferences()
  const { user, signOut } = useAuth()
  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === prefs.country) ?? COUNTRIES[0],
    [prefs.country],
  )
  const currentTime = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: country.timeZone,
      }).format(now)
    } catch {
      return '--:--'
    }
  }, [country.timeZone, now])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="grid size-10 place-items-center rounded-xl bg-white shadow-sm">
            <img
              src="/images/bharatacademixlogo.png"
              alt="Bharat Academix logo"
              className="h-10 w-10 rounded-xl object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight">{BRAND.name}</span>
              <span className="hidden rounded-full bg-[color:var(--gold)]/25 px-2 py-0.5 text-xs font-semibold text-[color:var(--navy)] md:inline">
                Trusted Worldwide
              </span>
            </div>
            <div className="text-xs text-[var(--subtext)]">
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="size-3" />
                {BRAND.tagline}
              </span>
            </div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-3 md:flex">
          <div className="hidden items-center gap-2 lg:flex">
            <CountrySelector />
            <CurrencySelector />
          </div>
          <div className="hidden rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-sm lg:block">
            <span className="font-medium"></span>{''}
            <span className="opacity-70">
              ({country.tz} • {currentTime})
            </span>
          </div>

          {/* Authentication buttons */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1">
                  <User className="size-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/40 px-3 py-1 text-sm font-medium text-[var(--navy)] shadow-sm hover:bg-white/60"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/signin"
                  className="rounded-full border border-[var(--border)] bg-white/40 px-3 py-1 text-sm font-medium text-[var(--navy)] shadow-sm hover:bg-white/60"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-full bg-[color:var(--emerald)] px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-[color:var(--emerald)]/90"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white/40 p-2 text-[var(--navy)] shadow-sm hover:bg-white/60 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className={cn('md:hidden', open ? 'block' : 'hidden')}>
        <div className="mx-auto max-w-6xl space-y-3 px-4 pb-4">
          {/* Authentication section for mobile */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-3">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white/40 py-2 text-sm font-medium text-[var(--navy)] shadow-sm hover:bg-white/60"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">

                <div className="flex gap-2">
                  <NavLink
                    to="/signin"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl border border-[var(--border)] bg-white/40 py-2 text-center text-sm font-medium text-[var(--navy)] shadow-sm hover:bg-white/60"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-xl bg-[color:var(--emerald)] py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-[color:var(--emerald)]/90"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <CountrySelector fullWidth />
            <CurrencySelector fullWidth />
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-3 text-sm">
            <span className="font-medium">Timezone:</span>{' '}
            <span className="font-semibold">
              {country.flag} {country.tz}
            </span>
            <div className="mt-1 text-[var(--subtext)]">
              Current local time: {currentTime}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-2xl border px-3 py-2 text-sm font-medium',
                    'border-[var(--border)] bg-white/30 hover:bg-white/50',
                    isActive && 'bg-[color:var(--emerald)]/15',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="hidden border-t border-[var(--border)] md:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-sm text-[var(--subtext)] md:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5',
                  isActive && 'bg-[color:var(--emerald)]/15 text-[var(--text)]',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

