import { useEffect } from 'react'

export function GoogleCallbackPage() {
  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      const error = params.get('error')

      if (error) {
        alert(`Authentication error: ${error}`)
        window.location.href = '/signin'
        return
      }

      if (code) {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
          const response = await fetch(`${API_URL}/api/auth/google/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success && data.user) {
              // Store user and redirect
              localStorage.setItem('gaa:auth:v1', JSON.stringify({ user: data.user, token: data.token }))
              window.location.href = '/'
            } else {
              const message = data.details || data.error || 'Authentication failed'
              throw new Error(typeof message === 'object' ? JSON.stringify(message) : message)
            }
          } else {
            const errorBody = await response.json().catch(() => ({}))
            const message = errorBody.details || errorBody.error || 'Authentication failed'
            throw new Error(typeof message === 'object' ? JSON.stringify(message) : message)
          }
        } catch (err) {
          console.error('Google callback error:', err)
          const message = err instanceof Error ? err.message : JSON.stringify(err)
          alert(`Authentication failed: ${message}`)
          window.location.href = '/signin'
        }
      } else {
        window.location.href = '/signin'
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--muted)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--emerald)] mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-[var(--text)]">Completing Google Authentication...</h1>
        <p className="text-[var(--subtext)] mt-2">Please wait while we verify your credentials</p>
      </div>
    </div>
  )
}