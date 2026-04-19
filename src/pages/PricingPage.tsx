import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'
import { PRICING_ROWS } from '../lib/constants'
import { usePreferences } from '../state/preferences'

export function PricingPage() {
  const prefs = usePreferences()

  return (
    <div>
      <PageHeader
        title="Pricing Guide"
        subtitle="Transparent estimated ranges. Final pricing depends on deadline, complexity, and length."
      />

      <Card className="overflow-x-auto">
        <div className="mb-4 text-sm text-[var(--subtext)]">
          Display currency:{' '}
          <span className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
            {prefs.currency}
          </span>
        </div>
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-[var(--subtext)]">
              <th className="border-b border-[var(--border)] px-3 py-3">
                Service
              </th>
              <th className="border-b border-[var(--border)] px-3 py-3">
                India (₹)
              </th>
              <th className="border-b border-[var(--border)] px-3 py-3">
                USA ($)
              </th>
              <th className="border-b border-[var(--border)] px-3 py-3">
                UK (£)
              </th>
              <th className="border-b border-[var(--border)] px-3 py-3">
                Canada (C$)
              </th>
              <th className="border-b border-[var(--border)] px-3 py-3">
                Australia (A$)
              </th>
            </tr>
          </thead>
          <tbody>
            {PRICING_ROWS.map((r) => (
              <tr key={r.service} className="align-top">
                <td className="border-b border-[var(--border)] px-3 py-4 font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                  {r.service}
                </td>
                <td className="border-b border-[var(--border)] px-3 py-4 text-[var(--subtext)]">
                  {r.INR}
                </td>
                <td className="border-b border-[var(--border)] px-3 py-4 text-[var(--subtext)]">
                  {r.USD}
                </td>
                <td className="border-b border-[var(--border)] px-3 py-4 text-[var(--subtext)]">
                  {r.GBP}
                </td>
                <td className="border-b border-[var(--border)] px-3 py-4 text-[var(--subtext)]">
                  {r.CAD}
                </td>
                <td className="border-b border-[var(--border)] px-3 py-4 text-[var(--subtext)]">
                  {r.AUD}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[color:var(--gold)]/20 p-4 text-sm text-[var(--navy)] dark:text-[var(--text)]">
          <span className="font-extrabold">Note:</span> Final price depends on
          deadline, complexity, and length. WhatsApp for an exact quote.
        </div>
      </Card>
    </div>
  )
}

