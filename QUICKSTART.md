# 🚀 Quick Start Guide - Global Academic Assist

## Project Structure

```
.
├── src/                          # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── auth/                # Authentication components
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   └── SocialAuthButtons.tsx
│   │   ├── layout/              # Layout components
│   │   └── shared/              # Shared components
│   ├── pages/                   # Page components
│   ├── state/
│   │   ├── auth.tsx             # Auth context (OAuth integration)
│   │   └── preferences.tsx      # User preferences
│   └── App.tsx
├── server/                       # Backend (Express.js)
│   ├── server.js                # Main server file
│   ├── .env                     # Environment variables
│   └── README.md                # Backend documentation
├── DEPLOYMENT_GUIDE.md          # Complete deployment guide
└── setup.sh                     # Setup script
```

## Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Google OAuth Credentials** - [Get credentials](https://console.cloud.google.com/)

## 5-Minute Setup

### 1️⃣ Run Setup Script
```bash
chmod +x setup.sh
./setup.sh
```

### 2️⃣ Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3001/api/auth/google/callback`

### 3️⃣ Configure Environment Variables

**Backend (server/.env):**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
JWT_SECRET=your-secret-key-here
```

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:3001
```

### 4️⃣ Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Backend runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### 5️⃣ Test Authentication
1. Open http://localhost:5173
2. Click "Sign In" or "Sign Up"
3. Click "Continue with Google"
4. Complete Google authentication

## 📚 Key Files

### Frontend Authentication
- **src/state/auth.tsx** - Auth context with Google OAuth
- **src/components/auth/SignIn.tsx** - Sign in form
- **src/components/auth/SignUp.tsx** - Sign up form
- **src/components/auth/SocialAuthButtons.tsx** - Social auth buttons
- **src/pages/GoogleCallbackPage.tsx** - OAuth callback handler

### Backend API
- **server/server.js** - Express.js server with OAuth endpoints
- **server/.env** - Backend configuration
- **server/README.md** - API documentation

## 🔗 Important Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/auth/google-url` | GET | Get Google OAuth URL |
| `/api/auth/google/callback` | POST | Handle Google callback |
| `/api/auth/me` | GET | Get current user |
| `/api/auth/logout` | POST | Logout user |

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended for Frontend)
```bash
# Deploy frontend
vercel --prod

# Set environment variables
vercel env add VITE_API_URL https://your-api-domain.com
```

### Option 2: Railway.app (Recommended for Backend)
```bash
# Deploy backend
railway link
railway up

# Get public URL from Railway dashboard
```

### Option 3: Docker
```bash
# Build Docker image
docker build -t global-academic-assist .

# Run container
docker run -p 3001:3001 -p 5173:5173 global-academic-assist
```

## 🔐 Security Tips

- ✅ Never commit `.env` files
- ✅ Use strong `JWT_SECRET` (generate with `openssl rand -base64 32`)
- ✅ Enable HTTPS in production
- ✅ Regenerate Google OAuth credentials in production
- ✅ Use environment variables for all secrets
- ✅ Enable CORS only for your domain

## 📝 Common Commands

```bash
# Frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint

# Backend
cd server
npm run dev        # Start development server
npm run start      # Start production server
```

## 🆘 Troubleshooting

### Google Authentication Not Working
1. Check Google OAuth credentials are correct
2. Verify redirect URI matches exactly
3. Ensure backend `.env` is configured
4. Check browser console for errors

### CORS Errors
1. Verify `FRONTEND_URL` in backend `.env`
2. Check backend is running on correct port
3. Clear browser cache and cookies

### Build Errors
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear TypeScript cache: `npm run build -- --clean`
3. Check Node.js version: `node --version`

## 📞 Support

For detailed information, see:
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete setup and deployment
- **[server/README.md](./server/README.md)** - Backend API documentation
- **[README.md](./README.md)** - Main project README

## 🎉 What's Next?

1. ✅ Set up Google OAuth
2. ✅ Configure environment variables
3. ✅ Start development servers
4. ✅ Test Google authentication
5. → Add Facebook & GitHub OAuth (see DEPLOYMENT_GUIDE.md)
6. → Deploy to production
7. → Monitor and maintain

---

**Happy coding! 🚀**