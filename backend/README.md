# Rental Finder Backend

A Spring Boot REST API for managing rental properties.

## Features

- CRUD operations for rental properties
- Search and filter functionality
- MySQL database integration
- Railway deployment ready

## Local Development

### Prerequisites
- Java 21 or later
- Maven 3.6 or later
- MySQL 8.0 or later

### Setup
1. Clone the repository
2. Configure local MySQL database
3. Update `application.properties` with local database credentials
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## Railway Deployment

### Step 1: Create MySQL Database on Railway
1. Go to [Railway](https://railway.app)
2. Create a new project
3. Add a MySQL database service
4. Note the connection details provided by Railway

### Step 2: Configure Environment Variables
Railway will automatically provide these environment variables:
- `DATABASE_URL` - MySQL connection URL
- `MYSQLUSER` - Database username
- `MYSQLPASSWORD` - Database password
- `PORT` - Application port (set by Railway)

### Step 3: Deploy to Railway
1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Spring Boot application
3. The `railway.toml` file configures the deployment settings
4. Your API will be available at: `https://your-app-name.up.railway.app`

### Step 4: Update Frontend Configuration
After deployment, update your frontend's `.env.production` file with the Railway URL:
```
REACT_APP_API_URL=https://your-backend-url.up.railway.app
```

## API Endpoints

### Rentals
- `GET /api/rentals` - Get all rentals
- `GET /api/rentals/{id}` - Get rental by ID
- `POST /api/rentals` - Create new rental
- `PUT /api/rentals/{id}` - Update rental
- `DELETE /api/rentals/{id}` - Delete rental
- `GET /api/rentals/search` - Search rentals with filters

### Health Check
- `GET /api/rentals/health` - Application health check

## Search Parameters

The search endpoint accepts the following query parameters:
- `location` - Filter by location (case-insensitive partial match)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms

Example: `/api/rentals/search?location=New York&minPrice=1000&maxPrice=3000&bedrooms=2`