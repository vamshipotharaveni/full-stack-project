# 🚀 Rental Finder Deployment Guide

Complete step-by-step guide for deploying the Rental Finder application to Railway (backend) and Netlify (frontend).

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Railway account (free tier available)
- ✅ Netlify account (free tier available)
- ✅ Project code ready in Git repository

## 🎯 Deployment Overview

1. **Backend (Railway)**: Spring Boot + MySQL Database
2. **Frontend (Netlify)**: React Application
3. **Total Time**: ~15-20 minutes

---

## 🔧 Backend Deployment (Railway)

### Step 1: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Connect and authorize your GitHub account

### Step 2: Set Up MySQL Database
1. In your Railway project dashboard
2. Click "New Service" → "Database" → "MySQL"
3. Wait for provisioning (2-3 minutes)
4. Note the connection details (automatically set as environment variables)

### Step 3: Deploy Backend Service
1. Click "New Service" → "GitHub Repo"
2. Select your rental-finder repository
3. Railway auto-detects Spring Boot application
4. Click "Deploy"
5. Wait for build and deployment (5-10 minutes)

### Step 4: Configure Environment Variables
Railway automatically provides:
```
DATABASE_URL=mysql://user:password@host:port/database
MYSQLUSER=your_mysql_user
MYSQLPASSWORD=your_mysql_password
PORT=8080
```

### Step 5: Get Backend URL
1. Go to your backend service in Railway
2. Click "Settings" → "Domains"
3. Note your public URL (e.g., `https://rentalfinder-backend.up.railway.app`)

### Step 6: Test Backend
```bash
curl https://your-backend-url.up.railway.app/api/rentals/health
# Should return: "Rental Finder Backend is running!"
```

---

## 🌐 Frontend Deployment (Netlify)

### Step 1: Update Environment Configuration
1. Open `frontend/.env.production`
2. Update with your Railway backend URL:
```
REACT_APP_API_URL=https://your-backend-url.up.railway.app
GENERATE_SOURCEMAP=false
```

### Step 2: Build Frontend
```bash
cd frontend
npm run build
```

### Step 3: Deploy to Netlify

#### Option A: Drag & Drop (Quick)
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag the `frontend/build` folder to the deploy area
4. Your site is live instantly!

#### Option B: Git Integration (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add environment variables:
   - `REACT_APP_API_URL`: Your Railway backend URL
6. Click "Deploy site"

### Step 4: Configure Custom Domain (Optional)
1. In Netlify dashboard → "Domain settings"
2. Add custom domain if you have one
3. Netlify provides free SSL certificates

---

## ✅ Verification Checklist

### Backend Verification
- [ ] Railway service is running
- [ ] Database is connected
- [ ] Health check endpoint works: `/api/rentals/health`
- [ ] CORS is configured for frontend domain

### Frontend Verification
- [ ] Frontend builds successfully
- [ ] Environment variables are set correctly
- [ ] Backend connectivity indicator shows "Connected"
- [ ] Can search and view rentals (even if empty)

### Full Stack Integration
- [ ] Frontend can communicate with backend
- [ ] No CORS errors in browser console
- [ ] API calls work correctly
- [ ] Error handling works when backend is unavailable

---

## 🔧 Troubleshooting

### Common Backend Issues

**Build Failed on Railway**
```bash
# Check Java version in pom.xml
<java.version>21</java.version>

# Ensure all dependencies are correct
mvn clean install
```

**Database Connection Issues**
- Verify DATABASE_URL format
- Check if MySQL service is running
- Wait for database to fully provision

**CORS Errors**
- Verify `FRONTEND_URL` environment variable
- Check CORS configuration in `RentalController.java`

### Common Frontend Issues

**Build Failed**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API Connection Issues**
- Verify `REACT_APP_API_URL` in `.env.production`
- Check if backend URL is accessible
- Inspect Network tab in browser developer tools

**Environment Variables Not Working**
- Environment variables must start with `REACT_APP_`
- Rebuild after changing environment variables
- Check Netlify environment variable settings

---

## 🚀 Quick Deployment Script

Use the provided script for guided deployment:

```bash
./deploy.sh
```

This script will:
1. Initialize Git repository
2. Guide you through configuration
3. Build the frontend
4. Provide deployment instructions

---

## 📝 Post-Deployment Tasks

### 1. Test the Application
- Create a test rental listing
- Search and filter functionality
- Verify all CRUD operations

### 2. Set Up Monitoring
- Check Railway logs for backend issues
- Monitor Netlify analytics for frontend usage
- Set up alerts for service downtime

### 3. Configure Custom Domains (Optional)
- Point your domain to Netlify
- Update CORS configuration with new domain

### 4. Performance Optimization
- Enable Netlify CDN features
- Configure caching headers
- Monitor Railway resource usage

---

## 💡 Tips for Success

1. **Deploy Backend First**: Always deploy and test backend before frontend
2. **Use Environment Variables**: Never hardcode URLs or credentials
3. **Test Locally**: Ensure everything works locally before deploying
4. **Monitor Logs**: Check Railway and Netlify logs for issues
5. **Version Control**: Tag releases for easy rollbacks

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Logs**:
   - Railway: Service → "Deployments" → View logs
   - Netlify: Site → "Deploys" → View logs

2. **Common Resources**:
   - [Railway Documentation](https://docs.railway.app)
   - [Netlify Documentation](https://docs.netlify.com)
   - [Spring Boot on Railway](https://docs.railway.app/guides/spring-boot)

3. **Debug Steps**:
   - Test backend health endpoint
   - Check environment variables
   - Verify CORS configuration
   - Test with Postman/curl

---

**🎉 Congratulations!** Your Rental Finder application is now live and ready for users!