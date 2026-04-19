import { MessageCircle } from 'lucide-react'
import { BRAND } from '../../lib/constants'

export function WhatsAppFab() {
  return (
    <a
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[color:var(--emerald)] px-4 py-3 text-sm font-extrabold text-[color:var(--navy)] shadow-lg shadow-black/10 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--emerald)]/60"
      href={`https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
        'HELP',
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-5" />
      WhatsApp
    </a>
  )
}

