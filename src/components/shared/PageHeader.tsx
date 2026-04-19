import { cn } from '../../lib/cn'

export function PageHeader({
  title,
  subtitle,
  right,
  className,
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)] md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-3xl text-[var(--subtext)]">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  )
}

