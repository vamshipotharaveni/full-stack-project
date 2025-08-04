import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import houseService from '../services/houseService';
import { getDistrictsList, getCitiesByDistrict, houseTypes } from '../utils/telanganaData';

const SearchHouses = () => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({
    houseType: '',
    district: '',
    city: ''
  });
  const [cities, setCities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Parse URL parameters on component mount
    const params = new URLSearchParams(location.search);
    const initialForm = {
      houseType: params.get('houseType') || '',
      district: params.get('district') || '',
      city: params.get('city') || ''
    };
    setSearchForm(initialForm);
    
    if (initialForm.district) {
      setCities(getCitiesByDistrict(initialForm.district));
    }
    
    // Perform initial search
    searchHouses(initialForm);
  }, [location.search]);

  const searchHouses = async (searchParams = searchForm) => {
    setIsLoading(true);
    try {
      // Filter out empty values
      const params = {};
      if (searchParams.houseType) params.houseType = searchParams.houseType;
      if (searchParams.district) params.district = searchParams.district;
      if (searchParams.city) params.city = searchParams.city;
      
      const data = await houseService.searchHouses(params);
      setHouses(data);
    } catch (error) {
      console.error('Error searching houses:', error);
      setHouses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistrictChange = (district) => {
    const newForm = {
      ...searchForm,
      district,
      city: ''
    };
    setSearchForm(newForm);
    setCities(getCitiesByDistrict(district));
  };

  const handleFormChange = (field, value) => {
    const newForm = { ...searchForm, [field]: value };
    setSearchForm(newForm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchHouses();
  };

  const clearFilters = () => {
    const emptyForm = { houseType: '', district: '', city: '' };
    setSearchForm(emptyForm);
    setCities([]);
    searchHouses(emptyForm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Rental Houses
          </h1>
          <p className="text-lg text-gray-600">
            Find your perfect rental home in Telangana
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House Type
                </label>
                <select
                  value={searchForm.houseType}
                  onChange={(e) => handleFormChange('houseType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                  onChange={(e) => handleFormChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  disabled={!searchForm.district}
                >
                  <option value="">Any City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end space-x-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching houses...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Search Results
                </h2>
                <span className="text-gray-600">
                  {houses.length} {houses.length === 1 ? 'house' : 'houses'} found
                </span>
              </div>

              {houses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {houses.map(house => (
                    <HouseCard key={house.id} house={house} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No houses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria to find more results.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHouses;