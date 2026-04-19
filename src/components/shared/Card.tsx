import { cn } from '../../lib/cn'

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-[var(--border)] bg-white/30 p-6 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

