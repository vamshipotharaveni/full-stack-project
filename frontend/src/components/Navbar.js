import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-primary-600">
                🏠 Rental Finder
              </div>
              <span className="ml-2 text-sm text-gray-600">Telangana</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>

            <Link
              to="/search"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/search') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              Search Houses
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-houses"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/my-houses') 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  My Houses
                </Link>

                <Link
                  to="/add-house"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/add-house') 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  Add House
                </Link>

                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile') 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  Profile
                </Link>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;