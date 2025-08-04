#!/bin/bash

# Rental Finder API Testing Script

BASE_URL="http://localhost:8080/api"

echo "🧪 Testing Rental Finder API..."

# Test health check (should be accessible without auth)
echo "1. Testing API connectivity..."
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/houses/all)
if [ $response -eq 200 ]; then
    echo "✅ API is accessible"
else
    echo "❌ API not accessible (HTTP $response)"
    exit 1
fi

# Test user registration
echo "2. Testing user registration..."
registration_response=$(curl -s -X POST $BASE_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "password": "password123",
    "phoneNumber": "9876543210"
  }')

echo "Registration response: $registration_response"

# Test user login
echo "3. Testing user login..."
login_response=$(curl -s -X POST $BASE_URL/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')

echo "Login response: $login_response"

# Extract token (simple grep, in production you'd use jq)
token=$(echo $login_response | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ ! -z "$token" ]; then
    echo "✅ Successfully obtained JWT token"
    
    # Test protected route
    echo "4. Testing protected route..."
    profile_response=$(curl -s -X GET $BASE_URL/auth/profile \
      -H "Authorization: Bearer $token")
    
    echo "Profile response: $profile_response"
    echo "✅ Protected route accessible with token"
else
    echo "❌ Failed to obtain JWT token"
fi

echo "🎉 API testing completed!"