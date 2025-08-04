import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { housesAPI } from '../services/api';
import telanganaData from '../data/telangana.json';

const AddHousePage = () => {
  const [formData, setFormData] = useState({
    type: '',
    phone: '',
    district: '',
    city: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update available cities when district changes
    if (name === 'district') {
      const selectedDistrict = telanganaData.districts.find(d => d.name === value);
      setAvailableCities(selectedDistrict ? selectedDistrict.cities : []);
      setFormData(prev => ({ ...prev, city: '' })); // Reset city when district changes
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('type', formData.type);
      submitData.append('phone', formData.phone);
      submitData.append('district', formData.district);
      submitData.append('city', formData.city);
      
      if (selectedImage) {
        submitData.append('image', selectedImage);
      }

      await housesAPI.addHouse(submitData);
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add house. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add New House</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
              House Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select house type</option>
              {houseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter contact phone number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select district</option>
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
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.district}
              >
                <option value="">Select city</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              House Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Adding House...' : 'Add House'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHousePage;