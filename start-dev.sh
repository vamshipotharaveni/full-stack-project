#!/bin/bash

# Rental Finder - Development Startup Script

echo "🏠 Starting Rental Finder Development Environment..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 21 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Start backend in background
echo "🚀 Starting Spring Boot backend..."
mvn spring-boot:run &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 10

# Start frontend
echo "🎨 Starting React frontend..."
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating environment file..."
    cp .env.example .env
fi

# Start React app
npm start &
FRONTEND_PID=$!

echo "✅ Both servers started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Function to cleanup processes
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup INT

# Wait for processes
wait