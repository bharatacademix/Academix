# Global Academic Assist - Complete Setup & Deployment Guide

## 🚀 Quick Start

This project consists of a React frontend (Vite) and Node.js/Express backend for OAuth authentication.

### Prerequisites
- Node.js 18+ installed
- Google OAuth credentials
- (Optional) Facebook and GitHub OAuth credentials
- Vercel account (for deployment)

---

## 📋 Step 1: Get Google OAuth Credentials

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "Global Academic Assist"
3. Enable the "Google+ API"

### 1.2 Create OAuth 2.0 Credentials
1. Navigate to **Credentials** in the left sidebar
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Add authorised redirect URIs:
   - **Development**: `http://localhost:3001/api/auth/google/callback`
   - **Production**: `https://your-domain.com/api/auth/google/callback`
5. Copy your **Client ID** and **Client Secret**

### 1.3 Store Credentials Securely
Save these credentials - you'll need them for environment variables.

---

## 🛠️ Step 2: Local Development Setup

### 2.1 Install Backend Dependencies
```bash
cd server
npm install
```

### 2.2 Configure Backend Environment
Create/edit `server/.env`:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
JWT_SECRET=your-secret-key-change-in-production
```

### 2.3 Start Backend Server
```bash
cd server
npm run dev
# Server runs on http://localhost:3001
```

### 2.4 Configure Frontend Environment
Create/edit `.env.local`:
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Global Academic Assist
```

### 2.5 Start Frontend Development Server
```bash
npm run dev
# App runs on http://localhost:5173
```

### 2.6 Test Authentication
1. Open http://localhost:5173
2. Navigate to Sign Up or Sign In
3. Click "Continue with Google"
4. Complete Google authentication flow

---

## 🌐 Step 3: Deployment on Vercel

### 3.1 Deploy Frontend on Vercel (Recommended)

#### Option A: Deploy via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New → Project**
3. Import your GitHub repository
4. Configure environment variables:
   - Add `VITE_API_URL` with your backend API URL
5. Click **Deploy**

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
vercel --prod
```

### 3.2 Deploy Backend on Vercel (Recommended)

Vercel now supports serverless Node.js! Here's how:

#### Option A: Using Vercel Functions (Recommended)
1. Create `api/` directory in your project root:
```bash
mkdir -p api
```

2. Create `api/auth.js`:
```javascript
import app from '../server/server.js'

export default app
```

3. Update `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/auth.js" }
  ]
}
```

4. Deploy with environment variables:
```bash
vercel --prod --env GOOGLE_CLIENT_ID=your_id --env GOOGLE_CLIENT_SECRET=your_secret
```

#### Option B: Use a Traditional Node.js Hosting Service
If Vercel serverless doesn't work for your use case:

**Heroku (Free Tier Deprecated - Use Railway or Fly.io)**
- [Railway.app](https://railway.app/) - Free tier available
- [Fly.io](https://fly.io/) - Free tier available

For Railway.app:
```bash
# Install Railway CLI
npm i -g railway

# Login and deploy
railway login
railway up
```

### 3.3 Configure Production Environment Variables

In your deployment platform (Vercel, Railway, etc.), add:

**Backend Variables:**
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app

GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_REDIRECT_URI=https://your-backend-url/api/auth/google/callback

JWT_SECRET=generate-a-strong-random-string-here
```

**Frontend Variables (in Vercel):**
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🔒 Security Checklist

- [ ] Generate strong `JWT_SECRET` (use `openssl rand -base64 32`)
- [ ] Use HTTPS in production
- [ ] Keep environment variables in .env files (never commit to git)
- [ ] Add `.env` and `server/.env` to `.gitignore`
- [ ] Change default credentials after setup
- [ ] Enable CORS only for your domain
- [ ] Use secure cookies (HttpOnly, Secure, SameSite)

---

## 📱 Google OAuth URLs for Production

When deploying to production, update these in Google Cloud Console:

**Authorized redirect URIs:**
```
https://your-backend-domain/api/auth/google/callback
```

**OAuth consent screen settings:**
- App name: Global Academic Assist
- User support email: your-email@example.com
- Developer contact: your-email@example.com

---

## 🚢 Full Deployment Example (Vercel + Railway)

### Frontend on Vercel:
1. Push code to GitHub
2. Connect Vercel project
3. Set `VITE_API_URL` environment variable
4. Deploy

### Backend on Railway:
1. Create Railway project
2. Connect GitHub repository (server folder)
3. Set all environment variables
4. Deploy
5. Get public URL (e.g., `https://api-prod.railway.app`)
6. Update frontend `VITE_API_URL` with this URL

---

## 🆘 Troubleshooting

### Google OAuth Not Working
- Check Client ID and Secret are correct
- Verify redirect URI matches exactly (including protocol and domain)
- Check Google OAuth consent screen is configured
- Ensure CORS is enabled on backend

### CORS Errors
- Update `FRONTEND_URL` in backend .env
- Check `express-cors` is properly configured
- Verify credentials: 'include' in fetch requests

### Token Verification Fails
- JWT_SECRET must be same on frontend and backend
- Check token expiry time
- Verify token is being sent correctly

### Deployment Issues
- Check all environment variables are set
- Verify Node.js version compatibility
- Check backend logs for errors
- Ensure ports are not blocked by firewall

---

## 📝 Additional Facebook & GitHub OAuth Setup

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app
3. Add Facebook Login product
4. Set redirect URIs and get App ID/Secret
5. Add to `server/.env`:
```env
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_REDIRECT_URI=https://your-domain/auth/facebook/callback
```

### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL
4. Get Client ID and Secret
5. Add to `server/.env`:
```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_REDIRECT_URI=https://your-domain/auth/github/callback
```

---

## 📚 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Railway.app Documentation](https://docs.railway.app/)
- [Express.js Documentation](https://expressjs.com/)
- [React OAuth Guide](https://developers.google.com/identity/gsi/web)

---

## 🎯 Next Steps

1. Complete Google OAuth setup
2. Configure environment variables
3. Test locally with backend running
4. Deploy frontend on Vercel
5. Deploy backend on Railway/Fly.io
6. Test complete flow on production
7. Add Facebook and GitHub OAuth if needed
8. Monitor for errors and adjust as needed

---

**Questions or issues?** Refer to the troubleshooting section or check the service documentation.