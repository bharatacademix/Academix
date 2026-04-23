#!/bin/bash

# Cloudflare Deployment Setup Script
# This script helps prepare your project for Cloudflare deployment

echo "🚀 Global Academic Assist - Cloudflare Deployment Setup"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI globally..."
    npm install -g wrangler
fi

echo "✅ Wrangler installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# Build worker code
echo "🔨 Building Worker code..."
cd server
npm run build:worker
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Run: wrangler login"
echo "2. Update wrangler.toml with your domain"
echo "3. Run: npm run deploy:worker (from server directory)"
echo ""
echo "📖 For detailed instructions, see CLOUDFLARE_DEPLOYMENT.md"
