import React, { useState, useEffect } from 'react';
import { userAPI, housesAPI } from '../services/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const [userResponse, housesResponse] = await Promise.all([
        userAPI.getProfile(),
        housesAPI.getMyHouses(),
      ]);
      
      setUser(userResponse.data);
      setHouses(housesResponse.data);
      setFormData({
        name: userResponse.data.name,
        email: userResponse.data.email,
        phoneNumber: userResponse.data.phoneNumber || '',
      });
    } catch (error) {
      setError('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await userAPI.updateProfile(formData);
      setUser(response.data);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError(error.response?.data || 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {editMode ? (
          <form onSubmit={handleUpdateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={updating}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong className="text-gray-700">Name:</strong>
              <p className="text-gray-900">{user?.name}</p>
            </div>
            <div>
              <strong className="text-gray-700">Email:</strong>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <strong className="text-gray-700">Phone:</strong>
              <p className="text-gray-900">{user?.phoneNumber || 'Not provided'}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">My Houses ({houses.length})</h3>
        
        {houses.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            You haven't added any houses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <div key={house.id} className="border border-gray-300 rounded-lg p-4">
                {house.imageUrl && (
                  <img
                    src={`http://localhost:8080${house.imageUrl}`}
                    alt={house.type}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">{house.type}</h4>
                  <p className="text-gray-600">📍 {house.city}, {house.district}</p>
                  <p className="text-gray-600">📞 {house.phone}</p>
                  <p className="text-sm text-gray-500">
                    Posted on: {formatDate(house.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;