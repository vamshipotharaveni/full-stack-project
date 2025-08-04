import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchHouses from './pages/SearchHouses';
import AddHouse from './pages/AddHouse';
import MyHouses from './pages/MyHouses';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchHouses />} />
            
            {/* Protected Routes */}
            <Route path="/add-house" element={
              <ProtectedRoute>
                <AddHouse />
              </ProtectedRoute>
            } />
            <Route path="/my-houses" element={
              <ProtectedRoute>
                <MyHouses />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Page Not Found
                  </h1>
                  <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist.
                  </p>
                  <a
                    href="/"
                    className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;