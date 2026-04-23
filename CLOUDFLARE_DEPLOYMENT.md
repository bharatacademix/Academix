# Cloudflare Deployment Guide - Global Academic Assist

Complete guide to deploy your Global Academic Assist project to Cloudflare (Pages + Workers).

## 📋 Prerequisites

- Cloudflare account (free or paid)
- GitHub repository linked to your project
- Custom domain added to Cloudflare
- OAuth credentials (Google, GitHub, Facebook)
- Node.js 18+ locally installed

---

## 🔧 Step 1: Local Setup & Configuration

### 1.1 Install Wrangler CLI
```bash
npm install -g wrangler
```

### 1.2 Install Server Dependencies
```bash
cd server
npm install
```

### 1.3 Build Worker Code
```bash
npm run build:worker
```

---

## 🌐 Step 2: Frontend Deployment (Cloudflare Pages)

### 2.1 Connect Repository to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain
3. Go to **Workers & Pages** → **Pages**
4. Click **Connect to Git**
5. Select GitHub and authorize
6. Choose your `global-academic-assist` repository
7. Select main branch (or your default branch)

### 2.2 Configure Build Settings

In the Pages deployment settings:

**Framework**: Vite
**Build command**: `npm run build`
**Build output directory**: `dist`
**Root directory**: `/` (leave empty)

### 2.3 Set Environment Variables

Add to Cloudflare Pages environment variables:

```
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=Global Academic Assist
```

Replace `your-domain.com` with your actual domain.

### 2.4 Deploy Frontend

Click **Save and Deploy**. Cloudflare will:
- Build your Vite project
- Deploy to Cloudflare's global network
- Provide a live URL immediately

---

## ⚙️ Step 3: Backend Deployment (Cloudflare Workers)

### 3.1 Authenticate with Cloudflare

```bash
wrangler login
```

This opens your browser to authorize Wrangler with your Cloudflare account.

### 3.2 Update wrangler.toml

Edit `wrangler.toml` and update:

```toml
# Replace with your actual worker domain
routes = [
  { pattern = "https://api.your-domain.com/api/*", zone_name = "your-domain.com" }
]
```

If you want to use a Workers subdomain instead:
```toml
routes = [
  { pattern = "https://*.your-domain.com/api/*", zone_name = "your-domain.com" }
]
```

### 3.3 Set Worker Environment Variables

Create a `.wrangler.toml.local` file (gitignored) with secrets:

```bash
wrangler secret put GOOGLE_CLIENT_ID
# Paste your Google Client ID, then press Enter twice

wrangler secret put GOOGLE_CLIENT_SECRET
# Paste your Google Client Secret

wrangler secret put JWT_SECRET
# Generate with: openssl rand -base64 32

wrangler secret put FRONTEND_URL
# Set to: https://your-domain.com

# Optional: GitHub OAuth
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET

# Optional: Facebook OAuth
wrangler secret put FACEBOOK_APP_ID
wrangler secret put FACEBOOK_APP_SECRET
```

### 3.4 Test Locally

```bash
cd server
npm run dev:worker
```

This starts a local development server on `http://localhost:8787`.

Test the API:
```bash
curl http://localhost:8787/api/health
```

### 3.5 Deploy to Production

```bash
npm run deploy:worker
```

### 3.6 Deploy to Staging Environment

```bash
npm run deploy:staging
```

---

## 🔐 Step 4: Update OAuth Providers

### 4.1 Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **Credentials** → **OAuth 2.0 Client IDs** (Web application)
4. Update **Authorized redirect URIs**:
   - Remove: `http://localhost:3001/api/auth/google/callback`
   - Add: `https://api.your-domain.com/api/auth/google/callback`

### 4.2 GitHub OAuth (if using)

1. Go to GitHub Settings → **Developer settings** → **OAuth Apps**
2. Edit your app
3. Update **Authorization callback URL**:
   - `https://api.your-domain.com/api/auth/github/callback`

### 4.3 Facebook OAuth (if using)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Go to **Settings** → **Basic** and **Products**
4. Update **Valid OAuth Redirect URIs**:
   - `https://api.your-domain.com/api/auth/facebook/callback`

---

## 🔗 Step 5: Connect Frontend to Backend

### 5.1 Update API Routes

The frontend will automatically use `VITE_API_URL` from environment variables. Ensure:

1. **Pages environment variable** is set:
   ```
   VITE_API_URL=https://api.your-domain.com
   ```

2. **Frontend API calls** use this variable (check `src/lib/supabase.ts` or auth context)

3. **CORS is properly configured** in `server/worker.ts`:
   ```typescript
   origin: (origin) => env.FRONTEND_URL
   ```

### 5.2 Test Authentication Flow

1. Visit `https://your-domain.com`
2. Click "Sign In" or "Sign Up"
3. Choose "Continue with Google" (or other providers)
4. Complete authentication
5. Check browser cookies for `auth_token`

---

## 📊 Step 6: Setup Custom Domain Routing

If using separate subdomains:

### 6.1 DNS Configuration

In Cloudflare DNS:

**For Pages (Frontend)**:
- Name: `@` (or your domain)
- Type: `CNAME`
- Content: `your-project.pages.dev`

**For Workers (API)**:
- Name: `api`
- Type: `CNAME`
- Content: `api.your-domain.com.workers.dev`

Or use Worker routes in `wrangler.toml` to handle all traffic through Pages and delegate API calls.

---

## 🚀 Step 7: Production Deployment Checklist

- [ ] Cloudflare account created and domain added
- [ ] GitHub repository connected to Pages
- [ ] Frontend build settings configured
- [ ] Frontend environment variables set (`VITE_API_URL`)
- [ ] Backend secrets added to Workers (`GOOGLE_CLIENT_ID`, etc.)
- [ ] `wrangler.toml` updated with correct routes
- [ ] OAuth providers updated with Cloudflare URLs
- [ ] Worker deployed successfully
- [ ] Frontend deployed and builds passing
- [ ] Authentication flow tested end-to-end
- [ ] Custom domain DNS configured
- [ ] SSL/TLS certificate auto-enabled (Cloudflare handles this)

---

## 🧪 Testing Deployment

### Test Frontend
```bash
curl https://your-domain.com
```

### Test Backend Health
```bash
curl https://api.your-domain.com/api/health
```

### Test Google OAuth URL
```bash
curl https://api.your-domain.com/api/auth/google-url
```

---

## 📝 Environment Variables Reference

### Frontend (Cloudflare Pages)
```
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=Global Academic Assist
```

### Backend (Cloudflare Workers - Secrets)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=https://your-domain.com
GITHUB_CLIENT_ID=optional
GITHUB_CLIENT_SECRET=optional
FACEBOOK_APP_ID=optional
```

---

## 🔄 Redeployment & Updates

### Deploy Frontend Changes
```bash
git push origin main
# Cloudflare Pages auto-deploys on main branch push
```

### Deploy Backend Changes
```bash
cd server
npm run build:worker
npm run deploy:worker
```

### Deploy to Staging
```bash
npm run deploy:staging
```

---

## 🛠️ Troubleshooting

### CORS Errors
- Check `FRONTEND_URL` environment variable in Worker
- Ensure CORS headers are properly configured
- Verify `origin` matches frontend domain

### Authentication Not Working
- Verify OAuth credentials are set as secrets in Wrangler
- Check OAuth redirect URIs match your Cloudflare domain
- Review Worker logs: `wrangler tail`

### Build Failures
- Check `wrangler.toml` syntax
- Verify build command outputs to correct directory
- Ensure TypeScript compiles without errors

### Check Worker Logs
```bash
wrangler tail --env production
```

---

## 📚 Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Framework Documentation](https://hono.dev/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/cli-wrangler/)

---

## ⚡ Next Steps

1. Implement caching strategies for improved performance
2. Set up analytics and monitoring
3. Configure custom error pages
4. Add rate limiting for API endpoints
5. Implement database integration (D1 or external)

