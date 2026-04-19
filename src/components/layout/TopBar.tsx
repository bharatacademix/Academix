import { BRAND, COUNTRIES } from '../../lib/constants'

export function TopBar() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--navy)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium">
            🌍 Serving Students Across 6 Continents
          </span>
          <span className="opacity-80">|</span>
          <span className="opacity-95">
            {COUNTRIES.filter((c) =>
              ['IN', 'US', 'GB', 'CA', 'AU'].includes(c.code),
            )
              .map((c) => `${c.flag} ${c.label}`)
              .join(' | ')}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="opacity-90">📞 24/7 Support:</span>
          <a
            className="font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-white/80"
            href={`https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
              'HELP',
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            {BRAND.whatsappE164} (WhatsApp Global)
          </a>
        </div>
      </div>
    </div>
  )
}

