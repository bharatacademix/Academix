import { cn } from '../../lib/cn'

type Option = {
  value: string
  label: string
}

export function Select({
  value,
  onChange,
  options,
  className,
  'aria-label': ariaLabel,
}: {
  value: string
  onChange: (v: string) => void
  options: Option[]
  className?: string
  'aria-label': string
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-10 rounded-2xl border border-[var(--border)] bg-white/40 px-3 text-sm font-semibold text-[var(--navy)] shadow-sm',
        'hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--emerald)]/60 focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
        className,
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

