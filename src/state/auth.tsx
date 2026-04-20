import { createContext, useContext, useEffect, useState } from 'react'

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  provider?: string
  createdAt: string
}

type AuthState = {
  user: User | null
  isLoading: boolean
  token: string | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => void

}

const AuthContext = createContext<AuthState | null>(null)

const STORAGE_KEY = 'gaa:auth:v1'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const { user: storedUser, token: storedToken } = JSON.parse(stored)
        setUser(storedUser)
        setToken(storedToken)
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveAuth = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
  }

  const signIn = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call - in a real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      }

      const mockToken = `mock-token-${Date.now()}`
      saveAuth(mockUser, mockToken)
      return true
    } catch (error) {
      console.error('Sign in failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        createdAt: new Date().toISOString(),
      }

      const mockToken = `mock-token-${Date.now()}`
      saveAuth(mockUser, mockToken)
      return true
    } catch (error) {
      console.error('Sign up failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }



  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
    // Call logout endpoint
    fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(console.error)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        token,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}