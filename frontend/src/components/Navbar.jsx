import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            House Rental
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/search" 
              className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Search
            </Link>
            
            {isAuthenticated() ? (
              <>
                <Link 
                  to="/add-house" 
                  className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  Add House
                </Link>
                <Link 
                  to="/profile" 
                  className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  Profile
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Hello, {user?.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;