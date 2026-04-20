import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../../state/auth'
import { Button } from '../shared/Button'


export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { signIn, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--text)]">Welcome Back</h1>
        <p className="mt-2 text-[var(--subtext)]">
          Sign in to your account to access personalized features
        </p>
      </div>



      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label htmlFor="password" className="block text-sm font-medium text-[var(--text)]">
            Password
          </label>
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

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
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
          <Link
            to="/signup"
            className="font-medium text-[var(--emerald)] hover:text-[var(--emerald)]/80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}