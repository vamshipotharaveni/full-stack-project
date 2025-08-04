import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import houseService from '../services/houseService';
import { getDistrictsList, getCitiesByDistrict, houseTypes } from '../utils/telanganaData';

const AddHouse = () => {
  const [formData, setFormData] = useState({
    houseType: '',
    phoneNumber: '',
    district: '',
    city: '',
    description: '',
    rent: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cities, setCities] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData({
      ...formData,
      district,
      city: ''
    });
    setCities(getCitiesByDistrict(district));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const houseData = {
        ...formData,
        rent: formData.rent ? parseFloat(formData.rent) : null
      };

      if (imageFile) {
        houseData.image = imageFile;
      }

      await houseService.createHouse(houseData);
      setSuccess('House listed successfully!');
      
      setTimeout(() => {
        navigate('/my-houses');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create house listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              List Your Rental House
            </h1>
            <p className="text-lg text-gray-600">
              Fill in the details to create your rental listing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House Type *
                </label>
                <select
                  name="houseType"
                  value={formData.houseType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select House Type</option>
                  {houseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select District</option>
                  {getDistrictsList().map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={!formData.district}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent (₹)
              </label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter monthly rent amount"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your property (amenities, nearby facilities, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload a photo of your property (optional)
              </p>
              
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating Listing...' : 'Create Listing'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/my-houses')}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHouse;