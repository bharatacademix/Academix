# Global Academic Assist - Backend Server

This is the Express.js backend server that handles OAuth authentication and API endpoints for the Global Academic Assist application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Google OAuth credentials (see setup guide)

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start development server
npm run dev
```

The server will run on `http://localhost:3001`

## 📋 Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

# JWT
JWT_SECRET=your-secret-key-here
```

## 🔗 API Endpoints

### Authentication Endpoints

#### `GET /api/health`
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### `GET /api/auth/google-url`
Get the Google OAuth authorization URL.

**Response:**
```json
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

#### `POST /api/auth/google/callback`
Exchange authorization code for user data and JWT token.

**Request:**
```json
{
  "code": "authorization_code_from_google"
}
```

**Response:**
```json
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
  "token": "jwt_token_here"
}
```

#### `POST /api/auth/verify`
Verify a JWT token.

**Request:**
```json
{
  "token": "jwt_token_here"
}
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### `POST /api/auth/logout`
Logout user and clear session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### `GET /api/auth/me`
Get current authenticated user from token.

**Response:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe"
}
```

## 🔐 Security Features

- JWT-based authentication with 7-day expiration
- HttpOnly, Secure, SameSite cookies
- CORS protection
- Environment variable configuration
- Secure password handling

## 📱 OAuth Flow

1. Frontend requests Google OAuth URL
2. User redirects to Google for authentication
3. Google redirects back with authorization code
4. Backend exchanges code for access token
5. Backend fetches user info from Google
6. Backend creates JWT and returns to frontend
7. Frontend stores token and user data
8. User is logged in

## 🚀 Deployment

### Vercel with Serverless Functions
```bash
# Deploy
vercel --prod

# Set environment variables
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add JWT_SECRET
```

### Railway.app
```bash
# Install Railway CLI
npm i -g railway

# Deploy
railway up
```

### Heroku (Legacy - Use Railway or Fly.io)
```bash
# Create app
heroku create your-app-name

# Set environment variables
heroku config:set GOOGLE_CLIENT_ID=your_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

## 🆘 Debugging

### Enable detailed logging
```bash
DEBUG=* npm run dev
```

### Common Issues

**"Google OAuth not configured"**
- Check `.env` file has `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Verify credentials are correct from Google Cloud Console

**CORS errors**
- Ensure `FRONTEND_URL` is set correctly in `.env`
- Check `express-cors` is properly imported and used

**Token verification fails**
- JWT_SECRET must be the same on frontend and backend
- Check token hasn't expired
- Verify token is being sent correctly

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [JWT.io](https://jwt.io/)
- [CORS - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 📝 Future Enhancements

- [ ] Facebook OAuth integration
- [ ] GitHub OAuth integration
- [ ] Database integration for user storage
- [ ] Rate limiting
- [ ] Request logging middleware
- [ ] Email verification
- [ ] Password reset flow
- [ ] Refresh token rotation

## 📄 License

This project is part of Global Academic Assist.

---

For complete setup and deployment instructions, see [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md)