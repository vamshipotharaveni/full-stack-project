import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await authService.getProfile();
      setProfile(data);
    } catch (error) {
      setError('Failed to fetch profile. Please try again.');
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-primary-600">
                {profile?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">
                  {profile?.username}
                </h1>
                <p className="text-primary-100">
                  Member since {new Date(profile?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                        {profile?.username}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                        {profile?.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                        {profile?.phoneNumber}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Created
                      </label>
                      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                        {new Date(profile?.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Account Statistics
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">🏠</div>
                        <div>
                          <div className="text-sm text-gray-600">Properties Listed</div>
                          <div className="text-xl font-semibold text-primary-600">
                            View in My Houses
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">📅</div>
                        <div>
                          <div className="text-sm text-gray-600">Days Active</div>
                          <div className="text-xl font-semibold text-green-600">
                            {Math.floor((new Date() - new Date(profile?.createdAt)) / (1000 * 60 * 60 * 24))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">✅</div>
                        <div>
                          <div className="text-sm text-gray-600">Account Status</div>
                          <div className="text-xl font-semibold text-blue-600">
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <a
                      href="/add-house"
                      className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-center font-medium transition-colors"
                    >
                      Add New House Listing
                    </a>
                    
                    <a
                      href="/my-houses"
                      className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-center font-medium transition-colors"
                    >
                      Manage My Houses
                    </a>
                    
                    <a
                      href="/search"
                      className="block w-full border border-primary-600 text-primary-600 hover:bg-primary-50 py-2 px-4 rounded-md text-center font-medium transition-colors"
                    >
                      Search Houses
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;