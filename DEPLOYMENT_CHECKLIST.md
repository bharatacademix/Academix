# 📋 Deployment Checklist

Use this checklist to ensure smooth deployment of your Global Academic Assist project with Google OAuth.

## Phase 1: Local Development ✓ COMPLETED

- [x] Backend Express.js server created
- [x] Google OAuth endpoints implemented
- [x] Frontend React components for auth created
- [x] Auth context with OAuth integration set up
- [x] Social auth buttons implemented
- [x] OAuth callback handler created
- [x] Project builds without errors
- [x] Environment variables configured
- [x] Documentation created

## Phase 2: Local Testing (DO THIS FIRST)

### 2.1 Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Git installed (`git --version`)

### 2.2 Google OAuth Credentials
- [ ] Google Cloud project created at [console.cloud.google.com](https://console.cloud.google.com/)
- [ ] Google+ API enabled
- [ ] OAuth 2.0 Web Application credentials created
- [ ] Client ID copied
- [ ] Client Secret copied
- [ ] Redirect URI configured: `http://localhost:3001/api/auth/google/callback`

### 2.3 Backend Setup
```bash
cd server
npm install
```
- [ ] Dependencies installed without errors

### 2.3 Backend Configuration
- [ ] `server/.env` file created
- [ ] `GOOGLE_CLIENT_ID` added to `.env`
- [ ] `GOOGLE_CLIENT_SECRET` added to `.env`
- [ ] `JWT_SECRET` generated and added (use: `openssl rand -base64 32`)
- [ ] `FRONTEND_URL` set to `http://localhost:5173`
- [ ] File permissions set (chmod +x server/.env if needed)

### 2.4 Frontend Setup
```bash
npm install
```
- [ ] Dependencies installed without errors
- [ ] `.env.local` file exists with `VITE_API_URL=http://localhost:3001`

### 2.5 Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
- [ ] Backend starts successfully
- [ ] Shows message: "Backend server running on http://localhost:3001"
- [ ] No error messages in logs

**Terminal 2 - Frontend:**
```bash
npm run dev
```
- [ ] Frontend starts successfully
- [ ] Shows message: "Local: http://localhost:5173"
- [ ] No error messages in logs

### 2.6 Manual Testing
1. [ ] Open http://localhost:5173 in browser
2. [ ] Navigate to `/signin` or `/signup`
3. [ ] Click "Continue with Google"
4. [ ] Redirected to Google login (check URL starts with accounts.google.com)
5. [ ] Complete Google authentication
6. [ ] Redirected back to application
7. [ ] User info displayed in navbar
8. [ ] Can click "Sign Out"
9. [ ] LocalStorage contains auth token

### 2.7 Browser Dev Tools Check
- [ ] No CORS errors in Console
- [ ] No TypeScript/JavaScript errors
- [ ] Network tab shows successful `/api/auth/google/callback` POST
- [ ] Cookies/Storage section shows `auth_token` or similar

## Phase 3: Production Preparation

### 3.1 Code Review
- [ ] No `console.log()` or debug code left in production
- [ ] All environment variables use process.env
- [ ] No hardcoded credentials anywhere
- [ ] Error messages are user-friendly
- [ ] Build completes without warnings: `npm run build`

### 3.2 Security Audit
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] `.gitignore` includes `node_modules`
- [ ] All secrets in environment variables, never in code
- [ ] JWT_SECRET is strong (generated with openssl)
- [ ] CORS configured for production domain only
- [ ] HttpOnly cookies configured for production
- [ ] HTTPS enforced in production

### 3.3 Documentation Review
- [ ] QUICKSTART.md is accurate
- [ ] DEPLOYMENT_GUIDE.md is complete
- [ ] server/README.md covers all endpoints
- [ ] Environment variables documented
- [ ] Troubleshooting guide updated

### 3.4 Git Repository
- [ ] Code committed: `git add . && git commit -m "Add Google OAuth"`
- [ ] Remote added: `git remote add origin your-repo-url`
- [ ] Initial push: `git push -u origin main`
- [ ] GitHub repository is public/private as needed

## Phase 4: Deployment - Option A: Vercel + Railway (Recommended)

### 4.1 Deploy Backend on Railway.app

#### Step 1: Create Railway Account
- [ ] Go to [railway.app](https://railway.app/)
- [ ] Sign in with GitHub
- [ ] Create new project

#### Step 2: Connect Backend Repository
- [ ] Click "Deploy from GitHub"
- [ ] Connect your GitHub repository
- [ ] Select service: Node.js
- [ ] Select root directory: `server`

#### Step 3: Configure Environment Variables on Railway
In Railway Dashboard → Variables:
- [ ] `PORT` = `3001`
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = `https://your-frontend-domain.vercel.app`
- [ ] `GOOGLE_CLIENT_ID` = (your production credentials)
- [ ] `GOOGLE_CLIENT_SECRET` = (your production credentials)
- [ ] `GOOGLE_REDIRECT_URI` = `https://your-api-domain.railway.app/api/auth/google/callback`
- [ ] `JWT_SECRET` = (new strong secret for production)

#### Step 4: Deploy & Get URL
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Get public URL (e.g., `https://api-prod.railway.app`)
- [ ] Note this URL - you'll need it for frontend

#### Step 5: Update Google Console
In Google Cloud Console → OAuth consent screen:
- [ ] Add production redirect URI: `https://your-api-domain/api/auth/google/callback`
- [ ] Add production JavaScript origins if needed

### 4.2 Deploy Frontend on Vercel

#### Step 1: Create Vercel Account
- [ ] Go to [vercel.com](https://vercel.com/)
- [ ] Sign in with GitHub
- [ ] Grant repository access

#### Step 2: Import Project
- [ ] Click "Add New" → "Project"
- [ ] Select your GitHub repository
- [ ] Click "Import"

#### Step 3: Configure Vercel Build
- [ ] Framework: "Vite"
- [ ] Build Command: `npm run build`
- [ ] Install Command: `npm install`
- [ ] Output Directory: `dist`

#### Step 4: Add Environment Variables
In Vercel Project Settings → Environment Variables:
- [ ] `VITE_API_URL` = `https://your-railway-backend-url`
- Example: `https://api-prod.railway.app`

#### Step 5: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Get production URL (e.g., `https://your-app.vercel.app`)

#### Step 6: Update Backend
- [ ] Go back to Railway Dashboard
- [ ] Update `FRONTEND_URL` variable with Vercel URL
- [ ] Redeploy backend

### 4.3 Test Production Deployment
- [ ] Visit frontend URL in browser
- [ ] Click "Sign In" or "Sign Up"
- [ ] Click "Continue with Google"
- [ ] Complete authentication
- [ ] Should be logged in
- [ ] Try signing out
- [ ] Try signing in again with different Google account

## Phase 5: Deployment - Option B: Heroku (Legacy)

### Note: Heroku free tier no longer available. Use Railway or Fly.io instead.

## Phase 5: Deployment - Option C: Self-Hosted

### 5.1 Server Setup
- [ ] Server provisioned (AWS, DigitalOcean, Linode, etc.)
- [ ] SSH access configured
- [ ] Node.js 18+ installed
- [ ] PM2 or similar process manager installed

### 5.2 Deploy Backend
```bash
git clone your-repo
cd server
npm install --production
```
- [ ] Code cloned successfully
- [ ] Dependencies installed
- [ ] Environment variables set

### 5.3 Deploy Frontend
```bash
npm run build
# Upload dist folder to cdn or nginx
```
- [ ] Build completed
- [ ] Static files uploaded
- [ ] Web server configured

### 5.4 Configure Nginx/Apache
- [ ] Reverse proxy configured for backend
- [ ] Static files serving configured
- [ ] SSL/HTTPS configured
- [ ] Redirects set up

## Phase 6: Post-Deployment Verification

### 6.1 Live Testing
- [ ] Visit production frontend URL
- [ ] Sign up with Google - works ✓
- [ ] Sign in with Google - works ✓
- [ ] Sign out - works ✓
- [ ] User data persists - works ✓
- [ ] Try on mobile - responsive ✓

### 6.2 Error Monitoring
- [ ] Set up error logging (Sentry or similar)
- [ ] Check backend logs for errors
- [ ] Check frontend console for errors
- [ ] Monitor API response times

### 6.3 Google OAuth Validation
- [ ] Multiple sign-ins work smoothly
- [ ] Different Google accounts tested
- [ ] Callback URL working correctly
- [ ] Token generation successful
- [ ] Token validation working

### 6.4 Security Verification
- [ ] HTTPS/SSL enabled
- [ ] No sensitive data in localStorage (except token)
- [ ] Cookies are secure (HttpOnly, Secure flag)
- [ ] CORS headers correct
- [ ] No console errors or warnings
- [ ] No mixed content warnings

### 6.5 Performance Check
- [ ] Page loads in < 3 seconds
- [ ] OAuth redirect < 2 seconds
- [ ] No performance warnings in Lighthouse
- [ ] Mobile performance good

### 6.6 Email Notifications (Optional)
- [ ] Set up alerts for high error rates
- [ ] Set up downtime alerts
- [ ] Configure team notifications

## Phase 7: Maintenance & Monitoring

### 7.1 Regular Checks (Daily)
- [ ] Frontend loads successfully
- [ ] Google OAuth working
- [ ] No errors in logs
- [ ] Response times normal

### 7.2 Weekly Reviews
- [ ] Check error logs for issues
- [ ] Verify performance metrics
- [ ] Test sign-in/sign-up flow
- [ ] Check user feedback/support tickets

### 7.3 Monthly Tasks
- [ ] Review security logs
- [ ] Update dependencies: `npm update`
- [ ] Check for new security vulnerabilities
- [ ] Review analytics and usage
- [ ] Backup database (if added)

### 7.4 Future Enhancements
- [ ] Add Facebook OAuth
- [ ] Add GitHub OAuth
- [ ] Add email verification
- [ ] Add password reset
- [ ] Add user database
- [ ] Add user profile page

## Phase 8: Optional Enhancements

### 8.1 Email Verification
- [ ] Email service integrated (SendGrid, Mailgun)
- [ ] Verification emails sent
- [ ] User can resend verification
- [ ] Unverified users have limited access

### 8.2 Database Integration
- [ ] Database chosen (MongoDB, PostgreSQL)
- [ ] User model created
- [ ] User persistence implemented
- [ ] User data properly stored and retrieved

### 8.3 Facebook OAuth
- [ ] Facebook App created at developers.facebook.com
- [ ] Facebook auth endpoints implemented
- [ ] Frontend buttons added
- [ ] Production testing completed

### 8.4 GitHub OAuth
- [ ] GitHub OAuth App created
- [ ] GitHub auth endpoints implemented
- [ ] Frontend buttons added
- [ ] Production testing completed

## Success Criteria ✓

Your deployment is successful when:
- ✓ Frontend loads without errors
- ✓ Google OAuth login works
- ✓ User data persists
- ✓ Mobile responsive
- ✓ HTTPS working
- ✓ No console errors
- ✓ Response times < 2s
- ✓ Lighthouse score > 80

---

## Support & Resources

- 📚 [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide
- 📚 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment guide
- 📚 [server/README.md](./server/README.md) - Backend API docs
- 📞 [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- 📞 [Vercel Docs](https://vercel.com/docs)
- 📞 [Railway Docs](https://docs.railway.app/)

---

**Last Updated:** April 18, 2026  
**Status:** Ready for Deployment ✓