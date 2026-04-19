import { useMemo } from 'react'
import { COUNTRIES, type CurrencyCode } from '../../lib/constants'
import { usePreferences } from '../../state/preferences'
import { cn } from '../../lib/cn'
import { Select } from './Select'

export function CurrencySelector({ fullWidth }: { fullWidth?: boolean }) {
  const prefs = usePreferences()
  const options = useMemo(() => {
    const unique = new Map<string, string>()
    for (const c of COUNTRIES) unique.set(c.currency, c.currency)
    return [...unique.values()].map((x) => ({ value: x, label: x }))
  }, [])

  return (
    <Select
      aria-label="Select your currency"
      value={prefs.currency}
      onChange={(v) => prefs.setCurrency(v as CurrencyCode)}
      className={cn(fullWidth && 'w-full')}
      options={options}
    />
  )
}

