import { cn } from '../../lib/cn'

export type Tab<T extends string> = { id: T; label: string }

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly Tab<T>[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            'rounded-full border px-4 py-2 text-sm font-extrabold shadow-sm transition',
            'border-[var(--border)]',
            value === t.id
              ? 'bg-[color:var(--emerald)] text-[color:var(--navy)]'
              : 'bg-white/30 text-[var(--navy)] hover:bg-white/50 dark:text-[var(--text)]',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

