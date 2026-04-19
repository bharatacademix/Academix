import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { TopBar } from './TopBar'
import { WhatsAppFab } from '../shared/WhatsAppFab'

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
      <TopBar />
      <NavBar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}

