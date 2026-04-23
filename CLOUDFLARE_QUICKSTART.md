# Cloudflare Deployment - Quick Start Guide

## ✅ What's Been Configured

Your project has been set up for full Cloudflare deployment:

- **Frontend**: Cloudflare Pages (automatic deployments)
- **Backend**: Cloudflare Workers (OAuth API)
- **Framework**: Hono (Cloudflare Workers-native framework)
- **Infrastructure**: Global edge network with automatic SSL

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Authenticate with Cloudflare
```bash
wrangler login
```

### Step 2: Set Worker Secrets
```bash
cd server

# Add OAuth credentials
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
wrangler secret put JWT_SECRET  # Use: openssl rand -base64 32
wrangler secret put FRONTEND_URL
```

### Step 3: Update Configuration
Edit `wrangler.toml`:
```toml
routes = [
  { pattern = "https://api.your-domain.com/api/*", zone_name = "your-domain.com" }
]
```

### Step 4: Deploy
```bash
# Test locally
npm run dev:worker

# Deploy to production
npm run deploy:worker
```

### Step 5: Configure Pages
1. Push to GitHub
2. Go to Cloudflare Dashboard → Pages
3. Connect repository
4. Add environment variable: `VITE_API_URL=https://api.your-domain.com`
5. Deploy

---

## 📁 New Files Created

| File | Purpose |
|------|---------|
| `server/worker.ts` | Cloudflare Workers API handler (replaces Express) |
| `wrangler.toml` | Cloudflare Workers configuration |
| `server/package.json` | Updated with Hono and Wrangler |
| `CLOUDFLARE_DEPLOYMENT.md` | Complete deployment guide |
| `CLOUDFLARE_COMMANDS.md` | Quick command reference |
| `.github/workflows/deploy-cloudflare.yml` | CI/CD pipeline |
| `cloudflare-deploy.sh` | Setup helper script |

---

## 🔄 Workflow

**Development**:
```bash
npm run dev              # Frontend (http://localhost:5173)
cd server && npm run dev:worker  # Backend (http://localhost:8787)
```

**Production**:
```bash
git push origin main    # Auto-deploys frontend to Pages
cd server && npm run deploy:worker  # Manually deploy backend
```

---

## ⚡ Key Features

✅ **Global Deployment**: Instant worldwide CDN  
✅ **No Cold Starts**: Cloudflare Workers architecture  
✅ **Auto SSL/TLS**: Free certificates included  
✅ **Git Integration**: Auto-deploy on push  
✅ **Environment Management**: Staging and production  
✅ **Secure Secrets**: Not exposed in code or logs  

---

## 📚 Next Steps

1. **Review** `CLOUDFLARE_DEPLOYMENT.md` for detailed steps
2. **Test locally** with `npm run dev:worker`
3. **Update OAuth providers** with new redirect URIs
4. **Deploy** backend: `npm run deploy:worker`
5. **Connect frontend** to Pages in Cloudflare Dashboard
6. **Monitor** with `wrangler tail --env production`

---

## 🆘 Need Help?

- **Wrangler Issues**: `wrangler --version` and update if needed
- **OAuth Errors**: Check redirect URIs in provider dashboards
- **CORS Problems**: Verify `FRONTEND_URL` environment variable
- **Build Errors**: Run `npm run build:worker` locally first

---

## 📖 Full Documentation

See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for:
- Step-by-step setup instructions
- OAuth provider configuration
- Custom domain routing
- Troubleshooting guide
- Monitoring and logging

