import React, { useState, useEffect } from 'react';
import { housesAPI } from '../services/api';
import telanganaData from '../data/telangana.json';

const SearchPage = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    district: '',
    city: '',
    type: '',
  });
  const [availableCities, setAvailableCities] = useState([]);

  const houseTypes = [
    '1 BHK Apartment',
    '2 BHK Apartment',
    '3 BHK Apartment',
    '4 BHK Apartment',
    'Studio Apartment',
    'Independent House',
    'Villa',
    'Duplex',
    'Penthouse',
    'PG/Hostel',
    'Commercial Space',
    'Office Space'
  ];

  useEffect(() => {
    fetchAllHouses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [houses, filters]);

  const fetchAllHouses = async () => {
    try {
      const response = await housesAPI.searchHouses({});
      setHouses(response.data);
    } catch (error) {
      setError('Failed to load houses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });

    // Update available cities when district changes
    if (name === 'district') {
      const selectedDistrict = telanganaData.districts.find(d => d.name === value);
      setAvailableCities(selectedDistrict ? selectedDistrict.cities : []);
      setFilters(prev => ({ ...prev, city: '' })); // Reset city when district changes
    }
  };

  const applyFilters = () => {
    let filtered = houses;

    if (filters.district) {
      filtered = filtered.filter(house => 
        house.district.toLowerCase().includes(filters.district.toLowerCase())
      );
    }

    if (filters.city) {
      filtered = filtered.filter(house => 
        house.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(house => 
        house.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    setFilteredHouses(filtered);
  };

  const clearFilters = () => {
    setFilters({
      district: '',
      city: '',
      type: '',
    });
    setAvailableCities([]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading houses...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Perfect House</h1>
        
        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">
                District
              </label>
              <select
                id="district"
                name="district"
                value={filters.district}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Districts</option>
                {telanganaData.districts.map((district) => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <select
                id="city"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!filters.district}
              >
                <option value="">All Cities</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
                House Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {houseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredHouses.length} of {houses.length} houses
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Houses Grid */}
        {filteredHouses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {houses.length === 0 ? 'No houses available.' : 'No houses match your search criteria.'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHouses.map((house) => (
              <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {house.imageUrl ? (
                  <img
                    src={`http://localhost:8080${house.imageUrl}`}
                    alt={house.type}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{house.type}</h3>
                  
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">📍</span>
                      {house.city}, {house.district}
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">📞</span>
                      <a href={`tel:${house.phone}`} className="hover:text-blue-600">
                        {house.phone}
                      </a>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Posted on: {formatDate(house.createdAt)}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <a
                      href={`tel:${house.phone}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      Call Now
                    </a>
                    <a
                      href={`sms:${house.phone}`}
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition-colors"
                    >
                      SMS
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;