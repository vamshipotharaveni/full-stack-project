import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Rental API functions
export const rentalAPI = {
  // Get all rentals
  getAllRentals: () => api.get('/rentals'),
  
  // Get rental by ID
  getRentalById: (id) => api.get(`/rentals/${id}`),
  
  // Create new rental
  createRental: (rental) => api.post('/rentals', rental),
  
  // Update rental
  updateRental: (id, rental) => api.put(`/rentals/${id}`, rental),
  
  // Delete rental
  deleteRental: (id) => api.delete(`/rentals/${id}`),
  
  // Search rentals with filters
  searchRentals: (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    return api.get(`/rentals/search?${params.toString()}`);
  },
  
  // Health check
  healthCheck: () => api.get('/rentals/health'),
};

export default api;