import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  const styles =
    variant === 'primary'
      ? 'bg-[color:var(--emerald)] text-[color:var(--navy)] hover:brightness-95'
      : variant === 'secondary'
        ? 'bg-[color:var(--navy)] text-white hover:bg-[color:var(--navy)]/90'
        : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5'

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold',
        'border border-[var(--border)] shadow-sm transition',
        'focus:outline-none focus:ring-2 focus:ring-[color:var(--emerald)]/60 focus:ring-offset-2 focus:ring-offset-[var(--bg)]',
        styles,
        className,
      )}
      {...props}
    />
  )
}

