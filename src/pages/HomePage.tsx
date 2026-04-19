import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react'
import { BRAND, COUNTRIES, SERVICE_FIELDS, TRUST_STRIP, type CountryCode } from '../lib/constants'
import { Button } from '../components/shared/Button'
import { Card } from '../components/shared/Card'
import { Chatbot } from '../components/shared/Chatbot'
import { usePreferences } from '../state/preferences'
import { cn } from '../lib/cn'
import { HomeServicesOneByOne } from '../components/sections/HomeServicesOneByOne'

function useTypingText(text: string, speedMs = 55) {
  const [value, setValue] = useState('')
  useEffect(() => {
    let i = 0
    setValue('')
    const t = window.setInterval(() => {
      i += 1
      setValue(text.slice(0, i))
      if (i >= text.length) window.clearInterval(t)
    }, speedMs)
    return () => window.clearInterval(t)
  }, [text, speedMs])
  return value
}

function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div className="marquee overflow-hidden rounded-2xl border border-[var(--border)] bg-white/30">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-6 px-5 py-3 text-sm font-semibold text-[var(--navy)] dark:text-[var(--text)]">
        {[...items, ...items].map((x, idx) => (
          <span key={`${x}-${idx}`} className="whitespace-nowrap">
            {x}
          </span>
        ))}
      </div>
    </div>
  )
}

export function HomePage() {
  const prefs = usePreferences()
  const typing = useTypingText('Your Academic Success Partner')

  const [contactName, setContactName] = useState('')
  const [contactCountry, setContactCountry] = useState<CountryCode>(prefs.country)
  const [contactUniversity, setContactUniversity] = useState('')
  const [contactService, setContactService] = useState('Project')
  const [contactDeadline, setContactDeadline] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  const contactCountryOptions = useMemo(
    () =>
      COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.label}
        </option>
      )),
    [],
  )

  const onContactSubmit = () => {
    const msg = [
      'HELP',
      '',
      `Name: ${contactName || '-'}`,
      `Country: ${contactCountry || '-'}`,
      `University: ${contactUniversity || '-'}`,
      `Service needed: ${contactService || '-'}`,
      `Deadline: ${contactDeadline || '-'}`,
      `Message: ${contactMessage || '-'}`,
    ].join('\n')

    const url = `https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--muted)] p-6 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/40 px-3 py-1 text-sm font-semibold text-[var(--navy)]">
              <Globe2 className="size-4" />
              Serving India & International Universities
            </div>

            <div className="mt-5 text-sm font-semibold tracking-wide text-[var(--subtext)]">
              <span className="opacity-80">Typing:</span>{' '}
              <span className="text-[var(--navy)] dark:text-[var(--text)]">
                {typing}
                <span className="ml-1 inline-block w-2 animate-pulse">|</span>
              </span>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)] md:text-5xl">
              We Complete What You Started
            </h1>
            <p className="mt-3 text-lg font-semibold text-[var(--subtext)]">
              Major / Minor Projects • Research Support • Thesis Editing • Patent
              Drafting Support • Presentations • Assignments
            </p>

            <p className="mt-5 leading-relaxed text-[var(--subtext)]">
              End-to-end support for major/minor projects (mentoring + code
              review), research papers (UG/PG/scientific), literature reviews,
              book chapters, thesis/dissertation editing, project reports, patent
              documentation support, PPTs, and software projects across
              departments.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
                  'HELP',
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="w-full sm:w-auto">
                  💬 WhatsApp Us Now <ArrowRight className="size-4" />
                </Button>
              </a>

            </div>

            <div className="mt-3 text-sm text-[var(--subtext)]">
              Whatsapp Contact:{' '}
              <span className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                {BRAND.whatsappE164}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-[var(--border)] bg-white/35 p-6">
              <div className="text-sm font-semibold text-[var(--subtext)]">
                Global trust elements
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-3">
                  <div className="font-semibold">Countries</div>
                  <div className="mt-1 text-[var(--subtext)]">
                    🇮🇳 🇺🇸 🇬🇧 🇨🇦 🇦🇺 🇸🇬 🇦🇪
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-3">
                  <div className="font-semibold">Trusted</div>
                  <div className="mt-1 text-[var(--subtext)]">
                    Students from <span className="font-semibold">25+</span>{' '}
                    countries
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-3">
                  <div className="font-semibold">Currency</div>
                  <div className="mt-1 text-[var(--subtext)]">
                    INR | USD | GBP | AUD | CAD
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-3">
                  <div className="font-semibold">Timezone</div>
                  <div className="mt-1 text-[var(--subtext)]">
                    We work in <span className="font-semibold">YOUR</span>{' '}
                    timezone
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Major/Minor projects (all colleges)',
                'Research paper editing + formatting',
                'Thesis/dissertation coaching + edits',
                'Confidential workflow + NDA on request',
              ].map((x) => (
                <div
                  key={x}
                  className={cn(
                    'flex items-start gap-2 rounded-2xl border border-[var(--border)] bg-white/35 p-4',
                  )}
                >
                  <CheckCircle2 className="mt-0.5 size-4 text-[color:var(--emerald)]" />
                  <div className="text-sm font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                    {x}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-8 space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--subtext)]">
            Services available in all these disciplines
          </div>
          <Marquee items={SERVICE_FIELDS} />
          <Marquee items={TRUST_STRIP} />
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--emerald)]/10 via-white/20 to-[var(--emerald)]/10 p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="relative">
          <p className="text-lg md:text-xl font-semibold text-[var(--navy)] dark:text-[var(--text)] leading-relaxed">
            Explore your skills – coding, design, business, innovation, or whatever excites you. We are here to help you achieve your goal and happily support you in your journey. That's our promise.
          </p>
        </div>
      </section>

      <Chatbot />

      <HomeServicesOneByOne />

      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--emerald)]/10 via-white/20 to-[var(--emerald)]/10 p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="relative">
          <p className="text-lg md:text-xl font-semibold text-[var(--navy)] dark:text-[var(--text)] leading-relaxed">
            We are more than a service – we are your academic success partner. With expert support, transparent communication, and a commitment to your goals, we help you finish stronger and achieve the results you deserve.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
            Contact & Support
          </div>
          <div className="mt-4 text-sm text-[var(--subtext)]">
            Need the full contact page experience? Fill the form and we will respond with a detailed quote, timeline, and next steps.
          </div>

          <div className="mt-6 space-y-4 text-sm text-[var(--subtext)]">
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
              <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">Primary contact</div>
              <div className="mt-2">💬 WhatsApp: {BRAND.whatsappE164}</div>
              <div className="mt-1">📧 Email: {BRAND.email}</div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
              <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">Why reach out</div>
              <ul className="mt-2 space-y-2">
                <li>Fast, transparent WhatsApp guidance</li>
                <li>Global-friendly hours and secure handling</li>
                <li>Clear quote, timeline, and review support</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--subtext)]">
            <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              Working hours (typical)
            </div>
            <div className="mt-2 grid gap-1">
              <div>India: 9 AM – 11 PM IST</div>
              <div>USA: 8 AM – 10 PM EST</div>
              <div>UK: 9 AM – 9 PM GMT</div>

              <div>UAE: 10 AM – 10 PM GST</div>
              <div>Germany: 9 AM – 9 PM CET</div>
            </div>
          </div>

        </Card>

        <Card className="h-full">
          <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">Quick request form</div>
          <div className="mt-4 grid gap-3 text-sm">
            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">Name</span>
              <input
                className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">Country</span>
              <select
                className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3 font-semibold"
                value={contactCountry}
                onChange={(e) => setContactCountry(e.target.value as CountryCode)}
              >
                {contactCountryOptions}
              </select>
            </label>

            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">University</span>
              <input
                className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3"
                value={contactUniversity}
                onChange={(e) => setContactUniversity(e.target.value)}
                placeholder="University / College"
              />
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="font-semibold text-[var(--subtext)]">Service needed</span>
                <select
                  className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3 font-semibold"
                  value={contactService}
                  onChange={(e) => setContactService(e.target.value)}
                >
                  {['Project', 'Paper', 'Thesis', 'Assignment', 'Patent', 'Other'].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1">
                <span className="font-semibold text-[var(--subtext)]">Deadline</span>
                <input
                  className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3"
                  type="date"
                  value={contactDeadline}
                  onChange={(e) => setContactDeadline(e.target.value)}
                />
              </label>
            </div>

            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">Message</span>
              <textarea
                className="min-h-28 rounded-2xl border border-[var(--border)] bg-white/40 px-3 py-2"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Topic/brief (2–3 lines), requirements, format, etc."
              />
            </label>

            <Button type="button" onClick={onContactSubmit} className="w-full">
              Submit → Send on WhatsApp
            </Button>
          </div>
        </Card>
      </section>

      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[color:var(--navy)] p-8 text-white">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <div>
            <div className="text-2xl font-black">
              🎓 Turn academic pressure into progress with the right support.
            </div>
            <div className="mt-2 text-white/80">
              Get expert support and complete your work with confidence.
            </div>
            <div className="mt-4 text-sm text-white/80">
              Share a few key details and we’ll quickly connect you with the best academic help.
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-[color:var(--emerald)] px-5 py-3 font-extrabold text-[color:var(--navy)]"
                href={`https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
                  'HELP',
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                💬 SEND WHATSAPP MESSAGE NOW – FREE CONSULTATION 💬
              </a>
            </div>
            <div className="mt-3 font-semibold">{BRAND.whatsappE164}</div>

            <div className="mt-6 grid gap-3 text-sm text-white">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="font-semibold">Fast academic turnaround</div>
                <div className="mt-1 text-white/80">From order confirmation to final delivery, we keep your schedule first.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="font-semibold">Expert review & editing</div>
                <div className="mt-1 text-white/80">Receive polished, university-ready documents with clear formatting.</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-2">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/images/contactcall.png"
                alt="Student working with support"
                className="h-full w-full rounded-3xl object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm text-white">
                <div className="font-semibold">Instant academic help</div>
                <div className="mt-1 text-white/80">
                  Connect via WhatsApp for fast, confidential support.
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-white">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                <div className="font-semibold">24/7 support access</div>
                <div className="mt-1 text-white/80">Reach out any time for deadline-sensitive assistance.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-3xl border border-[var(--border)] bg-white/30 p-6 text-center">
          <div className="text-sm font-semibold text-[var(--navy)] dark:text-[var(--text)]">
            Trusted by learners across the world for fast, reliable, and results-driven academic support.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              k: '5000+',
              v: 'Projects supported',
              description: 'Guiding students through every stage to deliver winning work.',
            },
            {
              k: '500+',
              v: 'Universities served',
              description: 'Trusted by top institutions across India and abroad.',
            },
            {
              k: '150+',
              v: 'Countries covered',
              description: 'Global support with local academic insight and care.',
            },
            {
              k: '1hr',
              v: 'Avg response time',
              description: 'Quick help when deadlines are closing in.',
            },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-3xl border border-[var(--border)] bg-white/30 p-6"
            >
              <div className="text-3xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)]">
                {s.k}
              </div>
              <div className="mt-1 text-sm font-semibold text-[var(--subtext)]">
                {s.v}
              </div>
              <div className="mt-2 text-xs text-[var(--subtext)]">
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

