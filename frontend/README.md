# Rental Finder Frontend

A React application for browsing and searching rental properties.

## Features

- Browse all available rentals
- Search and filter by location, price, bedrooms, bathrooms
- Responsive design for mobile and desktop
- Real-time backend connectivity status
- Modern, clean UI with smooth animations

## Local Development

### Prerequisites
- Node.js 16 or later
- npm or yarn

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Environment Configuration

### Development (.env)
```
REACT_APP_API_URL=http://localhost:8080
GENERATE_SOURCEMAP=false
```

### Production (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.up.railway.app
GENERATE_SOURCEMAP=false
```

## Deployment

### Option 1: Netlify (Recommended)

#### Step 1: Build the Application
```bash
npm run build
```

#### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop the `build` folder to deploy
3. Or connect your GitHub repository for continuous deployment

#### Step 3: Configure Redirects
The `public/_redirects` file is already configured for React Router.

#### Step 4: Set Environment Variables
In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add `REACT_APP_API_URL` with your Railway backend URL

### Option 2: GitHub Pages

#### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 2: Add to package.json
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Step 3: Deploy
```bash
npm run deploy
```

## Backend Integration

The frontend automatically detects backend connectivity and displays the connection status. Ensure your backend is deployed and accessible before deploying the frontend.

### API Service
The `src/services/api.js` file handles all backend communication with:
- Automatic request/response logging
- Error handling
- Environment-based URL configuration

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Deployment Checklist

1. ✅ Backend deployed on Railway
2. ✅ Database configured and connected
3. ✅ Update `.env.production` with backend URL
4. ✅ Build the frontend application
5. ✅ Deploy to Netlify or GitHub Pages
6. ✅ Verify connectivity between frontend and backend
