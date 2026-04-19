import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { COUNTRIES, type CountryCode, type CurrencyCode } from '../lib/constants'

type Preferences = {
  country: CountryCode
  currency: CurrencyCode
  timezoneLabel: string
  setCountry: (code: CountryCode) => void
  setCurrency: (code: CurrencyCode) => void
}

const PreferencesContext = createContext<Preferences | null>(null)

const STORAGE_KEY = 'gaa:preferences:v1'

function getDefaults(): Pick<Preferences, 'country' | 'currency' | 'timezoneLabel'> {
  const fallbackCountry = 'IN' satisfies CountryCode
  const c = COUNTRIES.find((x) => x.code === fallbackCountry) ?? COUNTRIES[0]
  return { country: c.code, currency: c.currency, timezoneLabel: c.tz }
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const defaults = useMemo(() => getDefaults(), [])
  const [country, setCountryState] = useState<CountryCode>(defaults.country)
  const [currency, setCurrencyState] = useState<CurrencyCode>(defaults.currency)
  const [timezoneLabel, setTimezoneLabel] = useState(defaults.timezoneLabel)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as {
        country?: CountryCode
        currency?: CurrencyCode
      }
      if (parsed.country) setCountryState(parsed.country)
      if (parsed.currency) setCurrencyState(parsed.currency)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    const c = COUNTRIES.find((x) => x.code === country)
    if (c) setTimezoneLabel(c.tz)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ country, currency }))
    } catch {
      // ignore
    }
  }, [country, currency])

  const value: Preferences = useMemo(
    () => ({
      country,
      currency,
      timezoneLabel,
      setCountry: (code) => {
        setCountryState(code)
        const c = COUNTRIES.find((x) => x.code === code)
        if (c) setCurrencyState(c.currency)
      },
      setCurrency: (code) => setCurrencyState(code),
    }),
    [country, currency, timezoneLabel],
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return ctx
}

