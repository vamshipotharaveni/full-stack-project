import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import houseService from '../services/houseService';

const MyHouses = () => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserHouses();
  }, []);

  const fetchUserHouses = async () => {
    try {
      const data = await houseService.getUserHouses();
      setHouses(data);
    } catch (error) {
      setError('Failed to fetch your houses. Please try again.');
      console.error('Error fetching user houses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHouse = async (houseId) => {
    try {
      await houseService.deleteHouse(houseId);
      setHouses(houses.filter(house => house.id !== houseId));
    } catch (error) {
      setError('Failed to delete house. Please try again.');
      console.error('Error deleting house:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My House Listings
            </h1>
            <p className="text-lg text-gray-600">
              Manage your rental property listings
            </p>
          </div>
          
          <Link
            to="/add-house"
            className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
          >
            Add New House
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your houses...</p>
          </div>
        ) : houses.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                You have {houses.length} {houses.length === 1 ? 'listing' : 'listings'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.map(house => (
                <HouseCard 
                  key={house.id} 
                  house={house} 
                  showActions={true}
                  onDelete={handleDeleteHouse}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No Houses Listed Yet
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Start by creating your first rental listing to attract potential tenants.
            </p>
            
            <Link
              to="/add-house"
              className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-md font-medium text-lg transition-colors"
            >
              List Your First House
            </Link>
            
            <div className="mt-12 max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Why list with Rental Finder?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-gray-900">Targeted Reach</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Connect with serious tenants in Telangana
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-sm font-medium text-gray-900">Easy Management</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Simple tools to manage your listings
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm font-medium text-gray-900">Free Listing</div>
                  <div className="text-xs text-gray-600 mt-1">
                    No charges for listing your property
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHouses;