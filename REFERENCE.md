# 🔐 Development & Production URLs Reference

Quick reference guide for all URLs and credentials needed for development and production.

## 🏠 Local Development URLs

### Frontend
- **Development Server:** http://localhost:5173
- **Sign In Page:** http://localhost:5173/signin
- **Sign Up Page:** http://localhost:5173/signup
- **Home Page:** http://localhost:5173/

### Backend
- **API Server:** http://localhost:3001
- **Health Check:** http://localhost:3001/api/health
- **Google Auth URL:** http://localhost:3001/api/auth/google-url
- **Google Callback:** http://localhost:3001/api/auth/google/callback

### Database (Optional Future)
- **MongoDB Local:** mongodb://localhost:27017
- **PostgreSQL Local:** localhost:5432

---

## 📋 Google OAuth - Development Setup

### Redirect URIs for Development
```
http://localhost:3001/api/auth/google/callback
```

### Environment Variables (server/.env)
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=[Your Google Client ID]
GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
JWT_SECRET=[Generate with: openssl rand -base64 32]
```

### Environment Variables (Frontend .env.local)
```
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Global Academic Assist
```

---

## 🌐 Production URLs

### Vercel Frontend (Example)
- **Frontend Domain:** https://global-academic-assist.vercel.app
- **Sign In:** https://global-academic-assist.vercel.app/signin
- **Sign Up:** https://global-academic-assist.vercel.app/signup

### Railway Backend (Example)
- **API Domain:** https://api-prod.railway.app
- **Health Check:** https://api-prod.railway.app/api/health

### Google OAuth - Production Setup

#### Redirect URIs for Production
```
https://api-prod.railway.app/api/auth/google/callback
```

#### Production Environment Variables (Backend)
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://global-academic-assist.vercel.app
GOOGLE_CLIENT_ID=[Your Production Google Client ID]
GOOGLE_CLIENT_SECRET=[Your Production Google Client Secret]
GOOGLE_REDIRECT_URI=https://api-prod.railway.app/api/auth/google/callback
JWT_SECRET=[Strong secret - CHANGE FROM DEVELOPMENT]
```

#### Production Environment Variables (Frontend - Vercel)
```
VITE_API_URL=https://api-prod.railway.app
VITE_APP_NAME=Global Academic Assist
```

---

## 🔗 Key OAuth Endpoints

### Get Google OAuth URL
```
GET /api/auth/google-url

Response:
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### Google OAuth Callback
```
POST /api/auth/google/callback

Request:
{
  "code": "authorization_code_from_google"
}

Response:
{
  "success": true,
  "user": {
    "id": "google_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://...",
    "provider": "google",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token"
}
```

### Verify Token
```
POST /api/auth/verify

Request:
{
  "token": "jwt_token_here"
}

Response:
{
  "valid": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Get Current User
```
GET /api/auth/me

Headers:
Authorization: Bearer jwt_token

Response:
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Logout
```
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🛠️ Dev Tools & Test Accounts

### Testing Google Accounts
Use any of your personal Google accounts for testing:
- Your main Gmail account
- Any secondary Gmail account
- Test accounts created in Google Cloud Console

### Browser DevTools
- **Chrome DevTools:** F12 or Cmd+Option+I
- **Firefox DevTools:** F12 or Cmd+Option+I
- **Safari:** Cmd+Option+I (enable in settings first)

### Testing Tools
- **Postman:** Test API endpoints - https://www.postman.com/
- **JWT Decoder:** Decode tokens - https://jwt.io/
- **Base64 Decoder:** Decode base64 - https://www.base64decode.org/
- **CORS Checker:** Check CORS headers - https://www.test-cors.org/

---

## 📊 Useful Ports & Services

### Standard Ports
| Service | Default Port | Our Config |
|---------|---|---|
| HTTP | 80 | - |
| React Dev | 5173 | 5173 |
| Express | 3000+ | 3001 |
| MongoDB | 27017 | 27017 |
| PostgreSQL | 5432 | 5432 |
| Redis | 6379 | 6379 |

### Port Availability Check
```bash
# macOS/Linux
lsof -i :3001
lsof -i :5173

# Windows
netstat -ano | findstr :3001
netstat -ano | findstr :5173
```

---

## 🔐 Secrets Management

### Generating Security Secrets
```bash
# Generate JWT Secret
openssl rand -base64 32

# Generate API Key
openssl rand -hex 32

# Generate Random String (macOS)
openssl rand -base64 20
```

### Storing Secrets Securely
- ✅ Environment variables (.env files)
- ✅ GitHub Secrets (for CI/CD)
- ✅ Platform Environment Variables (Vercel, Railway)
- ❌ Never commit to Git
- ❌ Never in source code
- ❌ Never in comments

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup guide |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Complete deployment guide |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Deployment checklist |
| [server/README.md](./server/README.md) | Backend API documentation |
| [OAUTH_SETUP_SUMMARY.md](./OAUTH_SETUP_SUMMARY.md) | OAuth implementation summary |

---

## 🚀 Quick Commands Reference

### Development
```bash
# Start backend
cd server && npm run dev

# Start frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
```bash
# Deploy to Vercel
vercel --prod

# Deploy to Railway
railway up

# Deploy with Docker
docker-compose up -d
```

### Debugging
```bash
# Check if ports are in use
lsof -i :3001
lsof -i :5173

# View backend logs
tail -f server/logs.txt

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules && npm install
```

---

## 🔍 Troubleshooting URLs & Resources

### Google OAuth Help
- Google OAuth Documentation: https://developers.google.com/identity/protocols/oauth2
- Google Cloud Console: https://console.cloud.google.com/
- OAuth Playground: https://developers.google.com/oauthplayground

### Deployment Help
- Vercel Status: https://www.vercel-status.com/
- Railway Status: https://railway.app/status
- GitHub Status: https://www.githubstatus.com/

### Debugging Tools
- Network Analysis: Chrome DevTools Network tab
- JWT Debugger: https://jwt.io/
- CORS Tester: https://www.test-cors.org/
- API Tester: Postman (https://www.postman.com/)

---

## 📞 Contact & Support

### Project Resources
- Project Repository: [Your GitHub URL]
- Main README: [./README.md](./README.md)
- Issues Tracker: [Your GitHub Issues]

### External Resources
- Node.js Docs: https://nodejs.org/en/docs/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev/
- Vite Docs: https://vitejs.dev/

---

## 🎯 Quick Reference Cheat Sheet

### Environment Variable Quick Copy

**For .env (Backend):**
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
JWT_SECRET=
```

**For .env.local (Frontend):**
```
VITE_API_URL=http://localhost:3001
```

---

**Last Updated:** April 18, 2026  
**Version:** 1.0  
**Status:** Production Ready ✓