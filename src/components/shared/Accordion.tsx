import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/cn'

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const open = openIndex === idx
        return (
          <div
            key={it.q}
            className="rounded-3xl border border-[var(--border)] bg-white/30"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              onClick={() => setOpenIndex((v) => (v === idx ? null : idx))}
            >
              <span className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                {it.q}
              </span>
              <ChevronDown
                className={cn(
                  'size-5 shrink-0 transition',
                  open ? 'rotate-180' : 'rotate-0',
                )}
              />
            </button>
            {open ? (
              <div className="px-5 pb-5 text-[var(--subtext)]">{it.a}</div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

