# 🏠 Rental Finder - Full Stack Application

A modern full-stack rental property management and search application built with Spring Boot and React.

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Deploy to Netlify]
- **Backend API**: [Coming Soon - Deploy to Railway]

## 📋 Features

### Backend (Spring Boot)
- ✅ RESTful API with CRUD operations
- ✅ Advanced search and filtering
- ✅ MySQL database integration
- ✅ Input validation and error handling
- ✅ CORS configuration for frontend integration
- ✅ Railway deployment ready

### Frontend (React)
- ✅ Modern, responsive UI design
- ✅ Real-time search and filtering
- ✅ Backend connectivity monitoring
- ✅ Mobile-friendly interface
- ✅ Environment-based configuration
- ✅ Netlify deployment ready

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.1
- **Language**: Java 21
- **Database**: MySQL 8.0
- **Build Tool**: Maven
- **Deployment**: Railway

### Frontend
- **Framework**: React 18
- **Styling**: CSS3 with modern design
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Deployment**: Netlify

## 📁 Project Structure

```
rental-finder/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/rentalfinder/backend/
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data repositories
│   │       └── controller/  # REST controllers
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── railway.toml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── App.js
│   ├── public/
│   │   └── _redirects       # Netlify redirects
│   ├── .env                 # Development config
│   └── .env.production      # Production config
├── deploy.sh                # Deployment helper script
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 16+
- Maven 3.6+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/rental-finder.git
cd rental-finder
```

### 2. Run Backend Locally
```bash
cd backend
mvn spring-boot:run
```
Backend will run on `http://localhost:8080`

### 3. Run Frontend Locally
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Automated Deployment
Run the deployment helper script:
```bash
./deploy.sh
```

### Manual Deployment

#### Backend (Railway)
1. **Create Railway Project**
   - Go to [Railway](https://railway.app)
   - Create new project
   - Add MySQL database service

2. **Deploy Backend**
   - Connect your GitHub repository
   - Railway auto-detects Spring Boot
   - Note your backend URL

3. **Environment Variables**
   Railway provides automatically:
   - `DATABASE_URL`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `PORT`

#### Frontend (Netlify)
1. **Update Configuration**
   ```bash
   # Update frontend/.env.production
   REACT_APP_API_URL=https://your-backend.up.railway.app
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop `build` folder
   - Or connect GitHub for auto-deployment

## 📊 API Documentation

### Base URL
- Development: `http://localhost:8080/api`
- Production: `https://your-backend.up.railway.app/api`

### Endpoints

#### Rentals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rentals` | Get all rentals |
| GET | `/rentals/{id}` | Get rental by ID |
| POST | `/rentals` | Create new rental |
| PUT | `/rentals/{id}` | Update rental |
| DELETE | `/rentals/{id}` | Delete rental |
| GET | `/rentals/search` | Search with filters |

#### Search Parameters
- `location` - Filter by location
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms

### Example Requests

```bash
# Get all rentals
curl https://your-backend.up.railway.app/api/rentals

# Search rentals
curl "https://your-backend.up.railway.app/api/rentals/search?location=New%20York&minPrice=1000&maxPrice=3000"

# Create rental
curl -X POST https://your-backend.up.railway.app/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern Apartment",
    "description": "Beautiful 2BR apartment in downtown",
    "price": 2500,
    "location": "New York, NY",
    "bedrooms": 2,
    "bathrooms": 2,
    "contactEmail": "owner@example.com"
  }'
```

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help with deployment:
1. Check the individual README files in `backend/` and `frontend/` directories
2. Run `./deploy.sh` for guided deployment
3. Open an issue on GitHub

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Image upload for rental properties
- [ ] Advanced filtering (pet-friendly, parking, etc.)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Mobile app (React Native)

---

**Happy Coding!** 🚀