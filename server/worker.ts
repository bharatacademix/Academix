import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import axios from 'axios'

type Env = {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  JWT_SECRET: string
  FRONTEND_URL: string
  GITHUB_CLIENT_ID?: string
  GITHUB_CLIENT_SECRET?: string
  FACEBOOK_APP_ID?: string
  AUTH_CACHE?: KVNamespace
}

interface User {
  id: string
  email: string
  name: string
  iat?: number
  exp?: number
}

const app = new Hono<{ Bindings: Env }>()

// Configure CORS
app.use(
  '*',
  cors({
    origin: (origin) => {
      const env = app.getEnv() as Env
      return env.FRONTEND_URL || 'http://localhost:5173'
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

// Helper function to create JWT token
const createToken = async (user: Omit<User, 'iat' | 'exp'>, secret: string) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  }
  
  const now = Math.floor(Date.now() / 1000)
  const token = await jwt.sign(
    {
      ...payload,
      iat: now,
      exp: now + 7 * 24 * 60 * 60, // 7 days
    },
    secret
  )
  
  return token
}

// Helper function to verify token
const verifyToken = async (token: string, secret: string): Promise<User | null> => {
  try {
    const decoded = await jwt.verify(token, secret) as User
    return decoded
  } catch {
    return null
  }
}

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'Server is running' })
})

// Get Google OAuth URL
app.get('/api/auth/google-url', (c) => {
  const env = c.env as Env
  const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID
  
  if (!GOOGLE_CLIENT_ID) {
    return c.json({ error: 'Google OAuth not configured' }, 500)
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${env.FRONTEND_URL || 'http://localhost:5173'}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
  })

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  return c.json({ url })
})

// Google OAuth callback
app.get('/api/auth/google/callback', async (c) => {
  const env = c.env as Env
  const code = c.req.query('code')
  const state = c.req.query('state')

  if (!code) {
    return c.json({ error: 'Authorization code missing' }, 400)
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${env.FRONTEND_URL || 'http://localhost:5173'}/api/auth/google/callback`,
    })

    const { access_token } = tokenResponse.data

    // Get user info
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    const { id, email, name, picture } = userResponse.data

    // Create JWT token
    const token = await createToken(
      {
        id,
        email,
        name,
      },
      env.JWT_SECRET
    )

    // Set secure HttpOnly cookie
    c.header('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`)

    // Redirect to frontend with token
    return c.redirect(`${env.FRONTEND_URL || 'http://localhost:5173'}?auth_token=${token}`)
  } catch (error) {
    console.error('Google OAuth error:', error)
    return c.json({ error: 'Authentication failed' }, 500)
  }
})

// Get GitHub OAuth URL
app.get('/api/auth/github-url', (c) => {
  const env = c.env as Env
  const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID
  
  if (!GITHUB_CLIENT_ID) {
    return c.json({ error: 'GitHub OAuth not configured' }, 500)
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${env.FRONTEND_URL || 'http://localhost:5173'}/api/auth/github/callback`,
    scope: 'user:email',
    allow_signup: 'true',
  })

  const url = `https://github.com/login/oauth/authorize?${params.toString()}`
  return c.json({ url })
})

// Get Facebook OAuth URL
app.get('/api/auth/facebook-url', (c) => {
  const env = c.env as Env
  const FACEBOOK_APP_ID = env.FACEBOOK_APP_ID
  
  if (!FACEBOOK_APP_ID) {
    return c.json({ error: 'Facebook OAuth not configured' }, 500)
  }

  const params = new URLSearchParams({
    client_id: FACEBOOK_APP_ID,
    redirect_uri: `${env.FRONTEND_URL || 'http://localhost:5173'}/api/auth/facebook/callback`,
    response_type: 'code',
    scope: 'email,public_profile',
  })

  const url = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`
  return c.json({ url })
})

// Verify token endpoint
app.post('/api/auth/verify', async (c) => {
  const env = c.env as Env
  const { token } = await c.req.json()

  if (!token) {
    return c.json({ error: 'Token missing' }, 401)
  }

  const user = await verifyToken(token, env.JWT_SECRET)

  if (!user) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }

  return c.json({ user })
})

// Logout endpoint
app.post('/api/auth/logout', (c) => {
  c.header('Set-Cookie', 'auth_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0')
  return c.json({ message: 'Logged out successfully' })
})

export default app
