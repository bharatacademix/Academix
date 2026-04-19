import { CheckCircle2, FileCheck2, ScanSearch, Shield } from 'lucide-react'
import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'

export function QualityPage() {
  return (
    <div>
      <PageHeader
        title="Quality & Originality"
        subtitle="A transparent workflow designed for clarity, originality, and confidence."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="text-sm font-semibold text-[var(--subtext)]">
            How we guarantee originality
          </div>
          <div className="mt-5 space-y-4">
            {[
              {
                icon: <ScanSearch className="size-5 text-[color:var(--emerald)]" />,
                title: '🔍 Pre-scan',
                body: 'We run structure and similarity checks early to reduce rework later.',
              },
              {
                icon: <Shield className="size-5 text-[color:var(--gold)]" />,
                title: '✍️ Human expert workflow',
                body: 'Subject-matter experts focus on clarity, citations, and policy-safe improvements.',
              },
              {
                icon: <FileCheck2 className="size-5 text-[color:var(--emerald)]" />,
                title: '✅ Dual reports',
                body: 'We can share a similarity report and an AI-writing indicator report when requested.',
              },
            ].map((s) => (
              <div
                key={s.title}
                className="flex gap-3 rounded-2xl border border-[var(--border)] bg-white/30 p-4"
              >
                <div className="mt-1">{s.icon}</div>
                <div>
                  <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                    {s.title}
                  </div>
                  <div className="mt-1 text-sm text-[var(--subtext)]">
                    {s.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {[
              ' Originality-first process',
              ' Similarity and AI Plagiarism Free Work',
              ' Revisions for feedback',
            ].map((b) => (
              <div
                key={b}
                className="rounded-2xl border border-[var(--border)] bg-[color:var(--gold)]/20 px-3 py-2 text-sm font-extrabold text-[var(--navy)] dark:text-[var(--text)]"
              >
                {b}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold text-[var(--subtext)]">
            Confidence promise
          </div>
          <div className="mt-5 space-y-3">
            {[
              {
                title: 'Timely completion',
                body: 'Clear deadline commitment and updates.',
              },
              {
                title: 'Fully confidential',
                body: 'NDA available on request. Your work is never resold.',
              },
              {
                title: 'Quality-first revisions',
                body: 'We revise based on supervisor/professor feedback (limits apply by package).',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[var(--border)] bg-white/30 p-4"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[color:var(--emerald)]" />
                  <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                    {p.title}
                  </div>
                </div>
                <div className="mt-1 text-sm text-[var(--subtext)]">
                  {p.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--subtext)]">
            <span className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              Tip:
            </span>{' '}
            Ask for a sample-first option for small tasks (where available) so
            you can validate tone and structure before proceeding.
          </div>
        </Card>
      </div>
    </div>
  )
}

