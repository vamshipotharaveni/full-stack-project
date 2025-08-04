# Rental Finder - Telangana

A full-stack web application for finding and listing rental houses in Telangana, India. Built with React 18 frontend and Spring Boot 3.x backend.

## 🏠 Features

### User Authentication
- JWT-based signup and login
- Secure password handling with BCrypt
- Protected routes for authenticated users
- User profile management

### House Listings
- Add rental house listings with images
- Search houses by district, city, and house type
- Filter by 1BHK, 2BHK, 3BHK, etc.
- Image upload and storage as BLOB in MySQL
- Comprehensive Telangana districts and cities data

### User Dashboard
- View and manage personal house listings
- Delete own listings
- User profile with account statistics

### Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful, modern interface
- Loading states and error handling
- Mobile-friendly design

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Modern JavaScript (ES6+)**

### Backend
- **Java 21** - Latest LTS Java version
- **Spring Boot 3.x** - Enterprise Java framework
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Stateless authentication
- **JPA/Hibernate** - Object-relational mapping
- **Maven** - Dependency management

### Database
- **MySQL** - Relational database
- **Railway MySQL** - Cloud-hosted database
- **BLOB storage** - Images stored in database

### Deployment
- **Backend**: Railway
- **Frontend**: Netlify
- **Database**: Railway MySQL

## 📋 Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- npm or yarn
- MySQL (for local development)
- Git

## 🚀 Local Development Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rental-finder
   ```

2. **Configure Database**
   - Update `src/main/resources/application.properties` with your local MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/rental_finder
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the Backend**
   ```bash
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` if needed:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The frontend will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Houses
- `GET /api/houses/all` - Get all houses
- `GET /api/houses/search` - Search houses with filters
- `POST /api/houses/create` - Create new house listing (protected)
- `GET /api/houses/my-houses` - Get user's houses (protected)
- `GET /api/houses/{id}` - Get house by ID
- `GET /api/houses/image/{id}` - Get house image
- `DELETE /api/houses/{id}` - Delete house (protected)

### Request/Response Examples

**User Registration:**
```json
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "9876543210"
}
```

**House Creation:**
```json
POST /api/houses/create (multipart/form-data)
{
  "houseType": "2BHK",
  "phoneNumber": "9876543210",
  "district": "Hyderabad",
  "city": "Gachibowli",
  "description": "Spacious 2BHK with modern amenities",
  "rent": 25000,
  "image": [file]
}
```

## 🌐 Deployment

### Backend Deployment (Railway)

1. **Connect your GitHub repository to Railway**
2. **Set environment variables:**
   ```
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-secret-key
   ```
3. **Railway will automatically build and deploy using Maven**

### Frontend Deployment (Netlify)

1. **Connect your GitHub repository to Netlify**
2. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
3. **Set environment variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```

### Database Setup (Railway)

1. **Create a MySQL database on Railway**
2. **Copy the connection string**
3. **Update your backend environment variables**

## 📁 Project Structure

```
rental-finder/
├── src/main/java/com/rentalfinder/
│   ├── controller/          # REST controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── model/              # JPA entities
│   ├── repository/         # Data repositories
│   ├── security/           # Security configuration
│   └── service/            # Business logic
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── public/
│   └── package.json
├── pom.xml
└── README.md
```

## 🎯 Key Features Details

### Telangana Coverage
- **33 Districts** covered
- **500+ Cities** included
- Comprehensive location data for accurate search

### House Types Supported
- 1RK, 1BHK, 2BHK, 3BHK, 4BHK
- Studio Apartments
- Independent Houses
- Villas

### Security Features
- JWT-based authentication
- Password encryption with BCrypt
- Protected API endpoints
- CORS configuration for cross-origin requests

### Image Handling
- File upload with preview
- BLOB storage in MySQL
- Image compression and validation
- Support for common image formats

## 🔧 Configuration

### Backend Configuration (application.properties)
```properties
# Database
spring.datasource.url=jdbc:mysql://host:port/database
spring.datasource.username=username
spring.datasource.password=password

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
app.jwt.secret=mySecretKey
app.jwt.expiration=86400000

# Server
server.port=8080

# File Upload
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Image compression could be improved for better performance
- Advanced search filters could be added
- Real-time notifications for new listings

## 🚀 Future Enhancements

- [ ] Advanced search filters (price range, amenities)
- [ ] Google Maps integration
- [ ] Real-time chat between users
- [ ] Email notifications
- [ ] Mobile app development
- [ ] Payment integration
- [ ] Reviews and ratings system

## 📞 Support

For support, email support@rentalfinder.com or create an issue in this repository.

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- React team for the amazing framework
- Tailwind CSS for the beautiful styling system
- Railway and Netlify for hosting platforms