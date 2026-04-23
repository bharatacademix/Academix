# Cloudflare Deployment - Build Configuration Fix

## Issue Resolved

**Problem**: Cloudflare Pages was trying to use the Workers `wrangler.toml` file, which doesn't have `pages_build_output_dir`, causing the build to fail.

**Solution**: Separated Pages and Workers configurations:

- **Root `wrangler.toml`**: Pages configuration (frontend build)
- **`server/wrangler.toml`**: Workers configuration (backend API)

---

## 📋 Updated Structure

```
/
├── wrangler.toml              ← Pages config (for Cloudflare Pages)
├── package.json               ← Frontend build scripts
├── src/                        ← React frontend
└── server/
    ├── wrangler.toml          ← Workers config (for Cloudflare Workers)
    ├── worker.ts              ← OAuth API endpoints
    ├── package.json           ← Backend dependencies
    └── tsconfig.json
```

---

## 🚀 Deployment Instructions

### Frontend (Cloudflare Pages)

**Via Cloudflare Dashboard:**
1. Go to **Pages** → **Create a project** → **Connect to Git**
2. Select your GitHub repository
3. Build settings should auto-detect:
   - **Framework**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Add environment variable: `VITE_API_URL=https://api.your-domain.com`
5. Deploy

### Backend (Cloudflare Workers)

```bash
cd server

# Set secrets
wrangler secret put GOOGLE_CLIENT_ID --env production
wrangler secret put GOOGLE_CLIENT_SECRET --env production
wrangler secret put JWT_SECRET --env production
wrangler secret put FRONTEND_URL --env production

# Deploy
wrangler publish --env production
```

---

## ✅ What's Fixed

- ✅ Root `wrangler.toml` now has `pages_build_output_dir = "dist"`
- ✅ Workers config moved to `server/wrangler.toml`
- ✅ Build commands properly separated
- ✅ No more "Next.js detection" errors
- ✅ Pages deployment should now work automatically

---

## 📝 Configuration Details

### Root `wrangler.toml` (Pages)
```toml
name = "global-academic-assist"
pages_build_output_dir = "dist"

[build]
command = "npm run build"
```

### `server/wrangler.toml` (Workers)
```toml
name = "global-academic-assist-api"
main = "worker.ts"
type = "service"
```

---

## 🔄 Next Steps

1. **Commit** these configuration fixes:
   ```bash
   git add wrangler.toml server/wrangler.toml
   git commit -m "fix: Separate Pages and Workers wrangler configurations"
   git push origin main
   ```

2. **Trigger Cloudflare Pages rebuild**:
   - Go to Cloudflare Dashboard
   - Pages → Your project → Deployments
   - Click on a previous failed deployment
   - Click **"Retry deployment"**

3. **Deploy Workers backend**:
   ```bash
   cd server
   npm run deploy:worker
   ```

---

## 🆘 If Build Still Fails

1. **Clear cache**: In Pages settings, clear cache and retry
2. **Check build logs**: Pages Dashboard shows detailed logs
3. **Verify environment variables**: Make sure `VITE_API_URL` is set
4. **Test locally**: Run `npm run build` to verify it works

---

