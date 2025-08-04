#!/bin/bash

# Rental Finder Deployment Script
# This script helps deploy both backend and frontend

echo "🏠 Rental Finder Deployment Helper"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📥 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Rental Finder full-stack application"
    echo "✅ Git repository initialized"
else
    echo "📝 Git repository already exists"
fi

echo ""
echo "📋 DEPLOYMENT CHECKLIST"
echo "======================="

echo ""
echo "BACKEND DEPLOYMENT (Railway):"
echo "1. Push code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/rental-finder.git"
echo "   git push -u origin main"
echo ""
echo "2. Create Railway project:"
echo "   - Go to https://railway.app"
echo "   - Create new project"
echo "   - Add MySQL database service"
echo "   - Connect your GitHub repository"
echo "   - Railway will auto-deploy the backend"
echo ""
echo "3. Note your backend URL (e.g., https://rental-finder-backend.up.railway.app)"

echo ""
echo "FRONTEND DEPLOYMENT (Netlify):"
echo "1. Update frontend/.env.production with your Railway backend URL"
echo "2. Build the frontend:"
echo "   cd frontend && npm run build"
echo "3. Deploy to Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Drag and drop the 'build' folder"
echo "   - Or connect GitHub for continuous deployment"

echo ""
echo "🚀 QUICK DEPLOYMENT COMMANDS:"
echo "============================="

# Ask user if they want to build frontend
echo ""
read -p "Do you want to build the frontend now? (y/n): " build_frontend

if [ "$build_frontend" = "y" ] || [ "$build_frontend" = "Y" ]; then
    echo "🔨 Building frontend..."
    cd frontend
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    
    echo "🏗️ Building production build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend build completed successfully!"
        echo "📁 Build files are in frontend/build/"
        echo "🌐 You can now deploy the build folder to Netlify"
    else
        echo "❌ Frontend build failed!"
        exit 1
    fi
    
    cd ..
fi

echo ""
echo "📝 NEXT STEPS:"
echo "============="
echo "1. Create GitHub repository and push code"
echo "2. Deploy backend to Railway"
echo "3. Update frontend/.env.production with backend URL"
echo "4. Deploy frontend to Netlify"
echo "5. Test the full application"

echo ""
echo "🔗 USEFUL LINKS:"
echo "==============="
echo "Railway: https://railway.app"
echo "Netlify: https://netlify.com"
echo "GitHub: https://github.com"

echo ""
echo "✨ Deployment script completed!"