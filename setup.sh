#!/bin/bash

# Global Academic Assist - Setup Script

echo "🚀 Global Academic Assist - Setup Script"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "✅ .env file created - Please fill in your Google OAuth credentials"
else
    echo "✅ Backend .env file already exists"
fi

cd ..

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating frontend .env.local file..."
    cat > .env.local << EOF
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Global Academic Assist
EOF
    echo "✅ Frontend .env.local created"
else
    echo "✅ Frontend .env.local already exists"
fi

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add your Google OAuth credentials to server/.env"
echo "2. Read DEPLOYMENT_GUIDE.md for Google OAuth setup instructions"
echo ""
echo "🚀 To start development:"
echo "   Terminal 1: cd server && npm run dev  # Backend on :3001"
echo "   Terminal 2: npm run dev               # Frontend on :5173"
echo ""
echo "📚 Documentation:"
echo "   - DEPLOYMENT_GUIDE.md - Complete setup and deployment guide"
echo "   - server/README.md     - Backend API documentation"
echo ""