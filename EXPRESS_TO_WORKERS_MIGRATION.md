# Express.js to Cloudflare Workers (Hono) Migration Guide

This document explains the key changes made to migrate from Express.js to Cloudflare Workers using the Hono framework.

## 🔄 Architecture Changes

### Before (Express.js)
```
Your Laptop → Express Server (localhost:3001)
                ↓
           OAuth Providers
           
           → Deployed on Railway/Heroku/VPS
```

### After (Cloudflare Workers)
```
Your Laptop → Cloudflare Edge Network (api.your-domain.com)
                ↓
           OAuth Providers
           
           → Deployed globally on Cloudflare Workers
           → No servers to manage
           → Automatic scaling
```

---

## 📝 Key File Changes

### 1. **API Handler: `server/server.js` → `server/worker.ts`**

**Express.js Pattern** (Old):
```javascript
import express from 'express'
const app = express()

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(3001)
```

**Hono Pattern** (New):
```typescript
import { Hono } from 'hono'
const app = new Hono()

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' })
})

export default app
```

### 2. **Configuration: New `wrangler.toml`**

Replaces environment variables and deployment configuration:
```toml
name = "global-academic-assist-api"
main = "server/worker.ts"
compatibility_date = "2024-12-16"
```

### 3. **Build Process**

**Old (Express)**:
```bash
npm start              # Direct Node.js execution
```

**New (Workers)**:
```bash
npm run build:worker   # TypeScript compilation
npm run dev:worker     # Local development with Wrangler
npm run deploy:worker  # Deploy to production
```

---

## 🔑 Code Migration Examples

### Middleware

**Express**:
```javascript
app.use(cors())
app.use(express.json())
```

**Hono**:
```typescript
app.use(cors())
// JSON parsing is automatic
```

### Route Handlers

**Express**:
```javascript
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body
  res.json({ user })
})
```

**Hono**:
```typescript
app.post('/api/auth/verify', async (c) => {
  const { token } = await c.req.json()
  return c.json({ user })
})
```

### Cookies

**Express**:
```javascript
res.cookie('auth_token', token, { httpOnly: true })
res.clearCookie('auth_token')
```

**Hono**:
```typescript
c.header('Set-Cookie', `auth_token=${token}; HttpOnly; Secure`)
c.header('Set-Cookie', 'auth_token=; Max-Age=0')
```

### Error Handling

**Express**:
```javascript
try {
  // code
} catch (error) {
  res.status(500).json({ error: error.message })
}
```

**Hono**:
```typescript
try {
  // code
} catch (error) {
  return c.json({ error: error.message }, 500)
}
```

---

## 🌍 Environment Variables

### Express (Express - `.env` file)
```env
PORT=3001
GOOGLE_CLIENT_ID=xxx
FRONTEND_URL=http://localhost:5173
```

### Workers (Wrangler - CLI secrets)
```bash
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put FRONTEND_URL
```

**Why?** Workers don't have file system access. Secrets are:
- Encrypted
- Not included in code
- Isolated per environment
- Automatically injected at runtime

---

## 🚀 Deployment Model

### Express (Server-based)
- Rent a server (Digital Ocean, Heroku, Railway)
- Pay per server size/usage
- Manual scaling
- Manage uptime/monitoring

### Workers (Serverless Edge)
- No servers to manage
- Pay per request + storage
- Automatic scaling
- Built-in global CDN
- Instant worldwide deployment

---

## ⚡ Performance Improvements

| Aspect | Express | Workers |
|--------|---------|---------|
| **Cold Start** | 2-5 seconds | 50ms |
| **Global Latency** | 200-500ms (single region) | 10-50ms (nearest edge) |
| **Scaling** | Manual/complex | Automatic |
| **Cost** | Fixed (per server) | Variable (pay-per-use) |

---

## 🔐 Security Considerations

### Old (Express)
- Environment variables in `.env` file
- Possible to accidentally commit secrets
- Manual certificate management

### New (Workers)
- Secrets stored in Cloudflare vault
- Never included in code
- Automatic SSL/TLS certificates
- DDoS protection included

---

## 🧪 Testing & Development

### Express (Local Server)
```bash
npm start              # Runs on :3001
curl http://localhost:3001/api/health
```

### Workers (Local with Wrangler)
```bash
npm run dev:worker     # Runs on :8787
curl http://localhost:8787/api/health
```

### Differences
- Workers simulate Cloudflare environment locally
- No need for different dev/prod code
- Closer to production than Express dev server

---

## 📦 Dependency Changes

### Removed
- `express` - Replaced by Hono
- `cookie-parser` - Built into Hono
- Standard Node.js HTTP modules

### Added
- `hono` - Full framework replacement
- `wrangler` - Deployment & development tool
- `@cloudflare/workers-types` - TypeScript types

### Unchanged
- `axios` - Still used for OAuth API calls
- `jsonwebtoken` - Still used for JWT
- `dotenv` - For local development

---

## 🔄 Request/Response Cycle

### Express
```
Request → Middleware → Route Handler → Response
```

### Workers
```
Request → Worker Bindings → Middleware → Route Handler → Response
```

Workers add bindings layer for KV storage, D1 database, environment secrets, etc.

---

## 💾 Database Integration

### Express + MongoDB
```javascript
import mongoose from 'mongoose'
await mongoose.connect(process.env.MONGODB_URI)
```

### Workers + D1 (Cloudflare)
```typescript
const db = c.env.DB // D1 binding
const result = await db.prepare('SELECT * FROM users').all()
```

Current setup doesn't use a database (stateless auth). To add:
1. Supabase: Add via HTTPS endpoint
2. D1: Add to `wrangler.toml` as binding
3. MongoDB Atlas: Use via HTTPS endpoint

---

## ✅ Migration Checklist

- [x] Hono framework installed
- [x] Express routes converted to Hono
- [x] JWT and cookies adapted for Workers
- [x] OAuth flows migrated
- [x] wrangler.toml created
- [x] Type definitions added
- [x] Build process configured
- [ ] Deploy and test in production
- [ ] Monitor performance
- [ ] Set up alerting

---

## 🆘 Troubleshooting

### Issue: "Cannot find module 'express'"
**Cause**: Old `server.js` still being used  
**Solution**: Ensure deployment uses `worker.ts`

### Issue: Cookies not persisting
**Cause**: Missing `Secure` or `SameSite` flags  
**Solution**: Use template from `server/worker.ts`

### Issue: CORS errors
**Cause**: `FRONTEND_URL` doesn't match origin  
**Solution**: Set correct secret and verify origin matching

### Issue: Worker timeout (>30 seconds)
**Cause**: Long-running operation  
**Solution**: Implement caching or move to background job

---

## 📚 References

- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers Guide](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/cli-wrangler/)
- [Express vs Hono Comparison](https://hono.dev/concepts/comparison)

