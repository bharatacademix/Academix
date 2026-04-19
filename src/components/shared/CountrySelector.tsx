import { COUNTRIES, type CountryCode } from '../../lib/constants'
import { usePreferences } from '../../state/preferences'
import { cn } from '../../lib/cn'
import { Select } from './Select'

export function CountrySelector({ fullWidth }: { fullWidth?: boolean }) {
  const prefs = usePreferences()

  return (
    <Select
      aria-label="Select your country"
      value={prefs.country}
      onChange={(v) => prefs.setCountry(v as CountryCode)}
      className={cn(fullWidth && 'w-full')}
      options={COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.label}`,
      }))}
    />
  )
}

