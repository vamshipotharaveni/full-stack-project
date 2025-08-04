# House Rental Application

A full-stack house rental application built with Spring Boot 3.x (backend) and React 18 (frontend).

## Features

### Backend (Spring Boot)
- **JWT Authentication** - Secure user authentication and authorization
- **User Management** - User registration, login, and profile management
- **House Management** - Add, search, and manage house listings
- **Image Upload** - Upload and serve house images
- **Location-based Search** - Search houses by district and city
- **MySQL Database** - Persistent data storage with JPA/Hibernate

### Frontend (React)
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Protected Routes** - Authentication-based route protection
- **Image Upload** - Drag-and-drop image upload with preview
- **Advanced Search** - Filter houses by type, location with autocomplete
- **Real-time Updates** - Dynamic content updates
- **Telangana Districts/Cities** - Pre-loaded location data

## Technology Stack

### Backend
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- MySQL 8.0
- Maven
- Lombok
- BCrypt password encoding

### Frontend
- React 18.2.0
- React Router DOM 6.8.0
- Axios for API calls
- Tailwind CSS for styling
- JavaScript ES6+

## Project Structure

```
house-rental/
├── backend/
│   ├── src/main/java/com/example/houserental/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── security/        # Security configuration
│   │   └── service/         # Business logic services
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── data/           # Static data (Telangana districts)
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   └── utils/          # Utility functions
    ├── package.json
    └── tailwind.config.js
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0
- Maven 3.6+

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd house-rental
   ```

2. **Configure Database**
   
   Create a MySQL database and update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/house_rental
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
   
   For Railway MySQL (Production):
   ```properties
   spring.datasource.url=jdbc:mysql://<RAILWAY_URL>/<DB_NAME>
   spring.datasource.username=root
   spring.datasource.password=<PASSWORD>
   ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   
   Backend will run on http://localhost:8080

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile (Protected)
- `POST /api/user/update` - Update user profile (Protected)

### House Management
- `POST /api/houses/add` - Add new house (Protected, Multipart)
- `GET /api/houses/search` - Search houses (Query params: district, city)
- `GET /api/houses/my` - Get user's houses (Protected)

### File Serving
- `GET /uploads/**` - Serve uploaded images

## Environment Variables

### Backend
```properties
# JWT Configuration
app.jwt.secret=mySecretKey
app.jwt.expiration=86400000

# CORS Configuration  
app.cors.allowed-origins=http://localhost:3000
```

### Frontend
Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## Deployment

### Railway Deployment (Backend)

1. **Create Railway account** and new project

2. **Add MySQL service** to your project

3. **Update application.properties** with Railway MySQL credentials

4. **Deploy via GitHub** or Railway CLI:
   ```bash
   railway login
   railway link
   railway up
   ```

### Vercel Deployment (Frontend)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Update API URL** in environment variables to point to Railway backend

## Features in Detail

### Authentication & Security
- JWT-based stateless authentication
- Password encryption with BCrypt
- Protected routes with automatic token validation
- Automatic logout on token expiration

### User Management
- User registration with validation
- Profile management with editable fields
- Email uniqueness validation

### House Listings
- Add houses with image upload
- Location-based categorization (Telangana districts/cities)
- Contact information management
- User-specific house listings

### Search & Filter
- Search by district and city
- Filter by house type
- Real-time filtering without API calls
- Responsive grid layout for results

### File Management
- Secure image upload with validation
- Automatic file naming with UUID
- Static file serving
- Image preview before upload

## Database Schema

### Users Table
```sql
users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20)
)
```

### Houses Table
```sql
houses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  district VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP,
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@houserental.com or create an issue in the GitHub repository.