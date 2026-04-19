import { ArrowUpRight } from 'lucide-react'
import { BRAND, SUPPORT_AREAS } from '../../lib/constants'
import { Card } from '../shared/Card'

export function SupportAreasSection({
  title = 'End-to-End Academic Support Areas',
  subtitle = 'Choose your service area and message us directly with one click.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)] md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-[var(--subtext)]">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUPPORT_AREAS.map((area) => {
          const href = `https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
            `HELP\nService Needed: ${area.whatsappText}`,
          )}`
          return (
            <Card key={area.title} className="overflow-hidden p-0">
              <img
                src={area.image}
                alt={area.title}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                  {area.title}
                </div>
                <p className="mt-1 text-sm text-[var(--subtext)]">{area.summary}</p>
                <a
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[color:var(--emerald)]"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask on WhatsApp <ArrowUpRight className="size-4" />
                </a>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

