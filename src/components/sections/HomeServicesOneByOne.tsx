import {
  ArrowUpRight,
  BadgeCheck,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import { BRAND, SUPPORT_AREAS } from '../../lib/constants'
import { cn } from '../../lib/cn'

const studentImages = [
  '/images/majorproject1.avif',
  '/images/research1.jpg',
  '/images/literature.jpg',
  '/images/bookchapter.webp',
  '/images/thesis1.jpg',
  '/images/project report.webp',
  '/images/patent.jpeg',
  '/images/ppt.webp',
  
  '/images/software.jpg',
] as const

export function HomeServicesOneByOne() {
  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--muted)] p-6 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[color:var(--emerald)]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-14 left-16 h-40 w-40 rounded-full bg-[color:var(--gold)]/20 blur-2xl" />

        <h2 className="relative text-2xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)] md:text-3xl">
          We’re Here to Help You Succeed
        </h2>
        <p className="relative mt-2 max-w-3xl text-[var(--subtext)]">
          From your first idea to your final submission—covering projects, research, thesis, and software—we stand by you with complete academic support, guidance, and expertise at every step of the journey.

        </p>
        <div className="relative mt-4 flex flex-wrap gap-2">
          {[
            { label: '150+ Countries', icon: <Star className="size-3.5" /> },
            { label: 'Fast Response', icon: <TrendingUp className="size-3.5" /> },
            { label: 'Verified Process', icon: <BadgeCheck className="size-3.5" /> },
          ].map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/60 px-3 py-1 text-xs font-bold text-[var(--navy)] dark:bg-white/10 dark:text-[var(--text)]"
            >
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {SUPPORT_AREAS.map((service, index) => {
          const image = studentImages[index % studentImages.length]
          const variant = index % 3
          const href = `https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
            `HELP\nService Needed: ${service.whatsappText}\nPlease share details and quote.`,
          )}`

          return (
            <article
              key={service.title}
              className={cn(
                'group overflow-hidden rounded-3xl border border-[var(--border)] bg-white/30 shadow-sm transition hover:shadow-lg hover:shadow-black/10',
                variant === 0 && 'lg:grid lg:grid-cols-[1.1fr_0.9fr]',
                variant === 1 && 'lg:grid lg:grid-cols-[0.9fr_1.1fr]',
                variant === 2 && 'lg:grid lg:grid-cols-[1fr_1fr]',
              )}
            >
              <div
                className={cn(
                  'relative overflow-hidden',
                  variant === 1 && 'lg:order-2',
                  variant === 2 && 'lg:max-h-[290px]',
                )}
              >
                <img
                  src={image}
                  alt={`${service.title} student`}
                  className={cn(
                    'h-full min-h-64 w-full object-cover transition duration-500 group-hover:scale-[1.05]',
                    variant === 2 && 'lg:min-h-[290px]',
                  )}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/student-1.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-black text-[var(--navy)]">
                  <Sparkles className="size-3.5" />
                  Service {index + 1}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="line-clamp-2 text-lg font-black text-white drop-shadow-sm">
                    {service.title}
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'relative flex flex-col justify-center p-6 md:p-8',
                  variant === 2 && 'lg:min-h-[290px]',
                )}
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[color:var(--emerald)]/15 blur-xl" />
                <div className="relative text-xs font-bold uppercase tracking-wide text-[var(--subtext)]">
                  Premium Support Track
                </div>
                <h3 className="relative mt-2 text-2xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)]">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-[var(--subtext)]">
                  {service.summary}
                </p>

                <div className="relative mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-[var(--subtext)]">
                  <div className="rounded-lg border border-[var(--border)] bg-white/50 px-2 py-1">
                    Dedicated guidance
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-white/50 px-2 py-1">
                    Topic-focused delivery
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-xl bg-[color:var(--emerald)] px-4 py-2 text-sm font-extrabold text-[color:var(--navy)] shadow-sm transition hover:brightness-95"
                  >
                    Ask on WhatsApp <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href="/services"
                    className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white/50 px-4 py-2 text-sm font-bold text-[var(--navy)] transition hover:bg-white/70 dark:text-[var(--text)]"
                  >
                    View Service Details
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

