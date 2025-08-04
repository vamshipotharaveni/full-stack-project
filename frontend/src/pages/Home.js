import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import houseService from '../services/houseService';
import { getDistrictsList, getCitiesByDistrict, houseTypes } from '../utils/telanganaData';

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchForm, setSearchForm] = useState({
    houseType: '',
    district: '',
    city: ''
  });
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchRecentHouses();
  }, []);

  const fetchRecentHouses = async () => {
    try {
      const data = await houseService.getAllHouses();
      // Show only latest 6 houses on home page
      setHouses(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching houses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistrictChange = (district) => {
    setSearchForm({
      ...searchForm,
      district,
      city: ''
    });
    setCities(getCitiesByDistrict(district));
  };

  const handleQuickSearch = () => {
    // Construct search URL with parameters
    const params = new URLSearchParams();
    if (searchForm.houseType) params.append('houseType', searchForm.houseType);
    if (searchForm.district) params.append('district', searchForm.district);
    if (searchForm.city) params.append('city', searchForm.city);
    
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Rental Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover thousands of rental properties across Telangana
            </p>
            
            {/* Quick Search */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    House Type
                  </label>
                  <select
                    value={searchForm.houseType}
                    onChange={(e) => setSearchForm({...searchForm, houseType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  >
                    <option value="">Any Type</option>
                    {houseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <select
                    value={searchForm.district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  >
                    <option value="">Any District</option>
                    {getDistrictsList().map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={searchForm.city}
                    onChange={(e) => setSearchForm({...searchForm, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                    disabled={!searchForm.district}
                  >
                    <option value="">Any City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleQuickSearch}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    Search Houses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
            <div className="text-gray-600">Active Listings</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">33</div>
            <div className="text-gray-600">Districts Covered</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>

      {/* Recent Houses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recent Listings
          </h2>
          <p className="text-lg text-gray-600">
            Check out the latest rental properties in Telangana
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading houses...</p>
          </div>
        ) : houses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.map(house => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                to="/search"
                className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-md font-medium text-lg transition-colors"
              >
                View All Houses
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No houses available yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list your rental property!
            </p>
            <Link
              to="/add-house"
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              Add Your House
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to List Your Property?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of property owners and start earning rental income today
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary-600 hover:bg-gray-100 py-3 px-8 rounded-md font-medium text-lg transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;