import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'

export function HowItWorksPage() {
  const steps = [
    {
      title: 'STEP 1 — WhatsApp your request',
      body: 'Send your country, service needed, brief/topic, deadline, and level (UG/PG/PhD).',
      icon: '📞',
    },
    {
      title: 'STEP 2 — Share details',
      body: 'Upload instructions, rubric, and any drafts. We confirm scope and timeline.',
      icon: '📄',
    },
    {
      title: 'STEP 3 — Quote & pay advance (50%)',
      body: 'You receive a transparent estimate. Start with an advance; balance after delivery.',
      icon: '💰',
    },
    {
      title: 'STEP 4 — Receive complete work',
      body: 'Download deliverables + reports (as applicable) and request revisions for feedback.',
      icon: '🎉',
    },
  ] as const

  return (
    <div>
      <PageHeader
        title="How It Works"
        subtitle="A simple, predictable workflow designed for fast turnaround and clear communication."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.title} className="relative">
            <div className="text-3xl">{s.icon}</div>
            <div className="mt-3 font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              {s.title}
            </div>
            <div className="mt-2 text-sm text-[var(--subtext)]">{s.body}</div>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
            Detailed steps
          </div>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--subtext)]">
            <li>Send WhatsApp → share requirement + deadline</li>
            <li>Get quote → response within ~2 hours (typical)</li>
            <li>Approve & pay → 50% advance, 50% after delivery</li>
            <li>Download → deliverables + revision loop (if needed)</li>
          </ol>
        </Card>

        <Card>
          <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
            What to expect
          </div>
          <div className="mt-4 space-y-3 text-sm text-[var(--subtext)]">
            <p>
              Every order is managed with clarity: a confirmed timeline, progress updates, and the option for revisions until you are satisfied.
            </p>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
              <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                Transparent delivery
              </div>
              <p className="mt-1">
                Clear milestones, secure file handover, and consistent academic quality.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
              <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                Reviewer support
              </div>
              <p className="mt-1">
                Specialist assistance for your discipline, with editing and formatting built in.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

