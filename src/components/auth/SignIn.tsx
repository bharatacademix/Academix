import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, ArrowLeft, Mail } from 'lucide-react'
import { useAuth } from '../../state/auth'
import { Button } from '../shared/Button'

type View = 'signin' | 'forgot'

export function SignIn() {
  const [view, setView] = useState<View>('signin')

  // Sign-in state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  // Forgot-password state
  const [resetEmail, setResetEmail] = useState('')
  const [resetSending, setResetSending] = useState(false)
  const [resetError, setResetError] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const { signIn, resetPassword, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    const { error } = await signIn(email, password)
    if (error) {
      setError(error)
    } else {
      navigate('/')
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetError('')
    if (!resetEmail) {
      setResetError('Please enter your email address.')
      return
    }
    setResetSending(true)
    const { error } = await resetPassword(resetEmail)
    setResetSending(false)
    if (error) {
      setResetError(error)
    } else {
      setResetSent(true)
    }
  }

  /* ─── Forgot Password Panel ─── */
  if (view === 'forgot') {
    return (
      <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 shadow-lg">
        <button
          onClick={() => { setView('signin'); setResetSent(false); setResetError('') }}
          className="flex items-center gap-1.5 text-sm text-[var(--subtext)] hover:text-[var(--text)] transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[var(--emerald)]/10">
            <Mail className="size-7 text-[var(--emerald)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Forgot password?</h1>
          <p className="mt-2 text-sm text-[var(--subtext)]">
            Enter the email you signed up with and we'll send you a reset link.
          </p>
        </div>

        {resetSent ? (
          <div className="rounded-xl border border-[var(--emerald)] bg-[var(--emerald)]/10 px-4 py-4 text-center text-sm">
            <p className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">Check your inbox ✉️</p>
            <p className="mt-1 text-[var(--subtext)]">
              A password reset link has been sent to <span className="font-medium">{resetEmail}</span>.
              Check your spam folder if you don't see it.
            </p>
            <button
              onClick={() => { setResetSent(false); setResetEmail('') }}
              className="mt-3 text-xs font-medium text-[var(--emerald)] hover:underline"
            >
              Didn't receive it? Send again
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-[var(--text)]">
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)] placeholder-[var(--subtext)] focus:border-[var(--emerald)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald)]"
                placeholder="you@example.com"
                required
              />
            </div>

            {resetError && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {resetError}
              </div>
            )}

            <Button type="submit" disabled={resetSending} className="w-full">
              {resetSending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
          </form>
        )}
      </div>
    )
  }

  /* ─── Sign In Panel ─── */
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--text)]">Welcome Back</h1>
        <p className="mt-2 text-[var(--subtext)]">
          Sign in to your account to access personalized features
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)] placeholder-[var(--subtext)] focus:border-[var(--emerald)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald)]"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text)]">
              Password
            </label>
            <button
              type="button"
              onClick={() => { setView('forgot'); setResetEmail(email) }}
              className="text-xs font-medium text-[var(--emerald)] hover:text-[var(--emerald)]/80 hover:underline transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 pr-10 text-[var(--text)] placeholder-[var(--subtext)] focus:border-[var(--emerald)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald)]"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--subtext)] hover:text-[var(--text)]"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-[var(--subtext)]">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-[var(--emerald)] hover:text-[var(--emerald)]/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}