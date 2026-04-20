import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Helper function to create JWT token
const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  )
}

// Helper function to verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})


// Get Facebook OAuth URL (for future implementation)
app.get('/api/auth/facebook-url', (req, res) => {
  const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
  if (!FACEBOOK_APP_ID) {
    return res.status(500).json({ error: 'Facebook OAuth not configured' })
  }

  const params = new URLSearchParams({
    client_id: FACEBOOK_APP_ID,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI || `${FRONTEND_URL}/auth/facebook/callback`,
    response_type: 'code',
    scope: 'email,public_profile',
  })

  const url = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`
  res.json({ url })
})

// Get GitHub OAuth URL (for future implementation)
app.get('/api/auth/github-url', (req, res) => {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  if (!GITHUB_CLIENT_ID) {
    return res.status(500).json({ error: 'GitHub OAuth not configured' })
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URI || `${FRONTEND_URL}/auth/github/callback`,
    scope: 'user:email',
    allow_signup: 'true',
  })

  const url = `https://github.com/login/oauth/authorize?${params.toString()}`
  res.json({ url })
})

// Verify token endpoint
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  const user = verifyToken(token)
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  res.json({ valid: true, user })
})

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('auth_token')
  res.json({ success: true, message: 'Logged out successfully' })
})

// Get current user (from token)
app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const user = verifyToken(token)
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  res.json(user)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📍 Frontend URL: ${FRONTEND_URL}`)
  console.log(`📍 Google Redirect URI: ${GOOGLE_REDIRECT_URI}`)
})