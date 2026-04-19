import { useMemo, useState } from 'react'
import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'
import { BRAND, COUNTRIES } from '../lib/constants'
import { usePreferences } from '../state/preferences'
import { Button } from '../components/shared/Button'
import type { CountryCode } from '../lib/constants'

function buildWhatsAppMessage(params: {
  name: string
  country: string
  university: string
  service: string
  deadline: string
  message: string
}) {
  return [
    'HELP',
    '',
    `Name: ${params.name || '-'}`,
    `Country: ${params.country || '-'}`,
    `University: ${params.university || '-'}`,
    `Service needed: ${params.service || '-'}`,
    `Deadline: ${params.deadline || '-'}`,
    `Message: ${params.message || '-'}`,
  ].join('\n')
}

export function ContactPage() {
  const prefs = usePreferences()
  const [name, setName] = useState('')
  const [country, setCountry] = useState<CountryCode>(prefs.country)
  const [university, setUniversity] = useState('')
  const [service, setService] = useState('Project')
  const [deadline, setDeadline] = useState('')
  const [message, setMessage] = useState('')

  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.label}
        </option>
      )),
    [],
  )

  const onSubmit = () => {
    const msg = buildWhatsAppMessage({
      name,
      country,
      university,
      service,
      deadline,
      message,
    })
    const url = `https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
      msg,
    )}`
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <div>
      <PageHeader
        title="Contact & Support"
        subtitle="Start your academic journey today. Fast response, global-friendly hours."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full flex flex-col justify-between">
          <div>
            <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              Primary contact
            </div>
            <div className="mt-4 space-y-2 text-sm text-[var(--subtext)]">
              <div>
                💬 WhatsApp:{' '}
                <a
                  className="font-extrabold text-[var(--navy)] underline decoration-black/20 underline-offset-4 dark:text-[var(--text)]"
                  href={`https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
                    'HELP',
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {BRAND.whatsappE164}
                </a>{' '}
                (24/7)
              </div>
              <div>
                📧 Email:{' '}
                <a
                  className="font-extrabold text-[var(--navy)] underline decoration-black/20 underline-offset-4 dark:text-[var(--text)]"
                  href={`mailto:${BRAND.email}`}
                >
                  {BRAND.email}
                </a>{' '}
                (response within ~1 hour)
              </div>
              <div>📞 Call/Video: schedule via WhatsApp</div>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--subtext)]">
              <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                Working hours (typical)
              </div>
              <div className="mt-2 grid gap-1">
                <div>India: 9 AM – 11 PM IST</div>
                <div>USA: 8 AM – 10 PM EST</div>
                <div>UK: 9 AM – 9 PM GMT</div>
                <div>Australia: 9 AM – 9 PM AEST</div>
                <div>Singapore: 9 AM – 9 PM SGT</div>
                <div>UAE: 10 AM – 10 PM GST</div>
                <div>Germany: 9 AM – 9 PM CET</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--emerald)]/5 p-4 text-sm text-[var(--navy)] dark:text-[var(--text)]">
            <div className="font-semibold">Why students contact us</div>
            <ul className="mt-3 space-y-2 text-[var(--subtext)]">
              <li>Fast response on WhatsApp and email</li>
              <li>Transparent fees and global payment options</li>
              <li>Three-step onboarding for university projects</li>
            </ul>
          </div>
        </Card>

        <Card className="h-full">
          <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
            Quick request form
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">Name</span>
              <input
                className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">Country</span>
              <select
                className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3 font-semibold"
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
              >
                {countryOptions}
              </select>
            </label>

            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">
                University
              </span>
              <input
                className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="University / College"
              />
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="font-semibold text-[var(--subtext)]">
                  Service needed
                </span>
                <select
                  className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3 font-semibold"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {[
                    'Project',
                    'Paper',
                    'Thesis',
                    'Assignment',
                    'Patent',
                    'Other',
                  ].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1">
                <span className="font-semibold text-[var(--subtext)]">
                  Deadline
                </span>
                <input
                  className="h-11 rounded-2xl border border-[var(--border)] bg-white/40 px-3"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </label>
            </div>

            <label className="grid gap-1">
              <span className="font-semibold text-[var(--subtext)]">Message</span>
              <textarea
                className="min-h-28 rounded-2xl border border-[var(--border)] bg-white/40 px-3 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Topic/brief (2–3 lines), requirements, format, etc."
              />
            </label>

            <Button type="button" onClick={onSubmit} className="w-full">
              Submit → Send on WhatsApp
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[color:var(--navy)] p-8 text-white">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <div>
            <div className="text-2xl font-black">
              🎓 Don’t let deadlines steal your degree.
            </div>
            <div className="mt-2 text-white/80">
              Get expert support and complete your work with confidence.
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
      </div>
    </div>
  )
}

